// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.Collection;
import java.util.*;
import java.lang.*;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {

    // Times possible to return
    Collection<TimeRange> fitRequest = new ArrayList<TimeRange>();
    
    // length of request duration
    long dur = request.getDuration();

    // Get all timeslots
    Collection<TimeRange> allTimeSlots = getAllTimeSlots(dur);

    // Attendees of request
    Collection<String> attendees = request.getAttendees();
    
    // Contains events which requested attendess must attend
    Collection<Event> curEvents = new ArrayList<Event>();
    
    // Contains TimeRange's which are busy
    Collection<TimeRange> busy = new ArrayList<TimeRange>();

    // Get events/TimeRange's which attendees are scheduled to attend
    for(Event e: events) {
        
        Collection<String> attendeesEvent = e.getAttendees();

        boolean contains = false;
        for (Iterator<String> iterator = attendees.iterator(); iterator.hasNext();) {
            if( attendeesEvent.contains(iterator.next())) {
                contains = true;
            }
        }

        if (contains == true) { 
            curEvents.add(e);
            busy.add(e.getWhen());
        }
    }

    // Get all timeslots
    Collection<TimeRange> allTimeSlotsTemp = getAllTimeSlots(dur);
    
    // difference between all time slots & busy ones
    for (Iterator<TimeRange> busyIterator = busy.iterator(); busyIterator.hasNext();) {
        
        TimeRange current = busyIterator.next();

        for (Iterator<TimeRange> iterator = allTimeSlotsTemp.iterator(); iterator.hasNext();) {
            TimeRange timeSlot = iterator.next();
            if( current.overlaps(timeSlot) ) {
                allTimeSlots.remove(timeSlot);
            }
        }
    }

    // merge intervals from allTimeSlots
    fitRequest = mergeIntervals(allTimeSlots);
    
    return fitRequest;
  }

  /*
    Returns all the timeslots for the day
  */
  public Collection<TimeRange> getAllTimeSlots(long dur) {
      Collection<TimeRange> results = new ArrayList<TimeRange>();
      int durTime = (int) dur;
      int numIntervals = (24*60) / durTime;
      for( int i = 0; i < numIntervals; i++ ) {
        TimeRange toAdd = TimeRange.fromStartDuration(i*durTime, durTime);
        results.add(toAdd);
      }
      return results;
  }

  /*
    Merges the intervals that are opentimes
  */
  public Collection<TimeRange> mergeIntervals(Collection<TimeRange> bMerge ) {

      LinkedList<TimeRange> merged = new LinkedList<TimeRange>();

      for( TimeRange interval: bMerge ) {
          // if the list of merged intervals is empty or if the current interval 
          // does not overlap with the previos then append it
          if( merged.isEmpty() || merged.getLast().end() < interval.start()) {
              merged.add(interval);
          // otherwise, there is overlap, so we merge the current & previous intervals
          } else {
              int maxTime = Math.max(merged.getLast().end(), interval.end());
              int theDur = maxTime - merged.getLast().start();
              TimeRange newRange = TimeRange.fromStartDuration(merged.getLast().start(), theDur);
              merged.removeLast();
              merged.add(newRange);
          }
      }

      List<TimeRange> list = new ArrayList<TimeRange>(merged);
      
      return list;
  }
}
