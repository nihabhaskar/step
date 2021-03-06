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

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Task;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content.*/
@WebServlet("/data")
public class DataServlet extends HttpServlet {

    int numComments;

  @Override
  // LIST TASKS / COMMENTS
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Task").addSort("timestamp", SortDirection.DESCENDING);
    
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    List<Task> tasks = new ArrayList<>();                  
    
    for (Entity entity : results.asIterable()) {
      long id = entity.getKey().getId();
      String name = (String) entity.getProperty("name");
      String comments = (String) entity.getProperty("comments");
      long timestamp = (long) entity.getProperty("timestamp");
     
      Task task = new Task(id, name, comments, timestamp);
      tasks.add(task);
    }
    
    Gson gson = new Gson();
    
    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(tasks));
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String name = request.getParameter("name");
    String comments = request.getParameter("comments");
    long timestamp = System.currentTimeMillis();
    
    /*
    numComments = getPlayerChoice(request);
    
    if (numComments == -1) {
      response.sendRedirect("/index.html");
      response.getWriter().println("Please enter an integer greater than 0.");
      return;
    }
    */

    Entity taskEntity = new Entity("Task");
    taskEntity.setProperty("name", name);
    taskEntity.setProperty("comments", comments);
    taskEntity.setProperty("timestamp", timestamp);
    
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(taskEntity);

    response.sendRedirect("/index.html");
  }

  /**
   * Converts a ServerStats instance into a JSON string using the Gson library. Note: We first added
   * the Gson library dependency to pom.xml.
   */
  private String convertToJsonUsingGson(ArrayList<String> messages) {
    Gson gson = new Gson();
    String json = gson.toJson(messages);
    return json;
  }

  /**
   * @return the request parameter, or the default value if the parameter
   *         was not specified by the client
   */
  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    return value == null ? defaultValue : value;
  }

  /** Returns the choice entered by the player, or -1 if the choice was invalid. */
  private int getPlayerChoice(HttpServletRequest request) {
    // Get the input from the form.
    String playerChoiceString = request.getParameter("player-choice");

    // Convert the input to an int.
    int playerChoice;
    try {
      playerChoice = Integer.parseInt(playerChoiceString);
    } catch (NumberFormatException e) {
      System.err.println("Could not convert to int: " + playerChoiceString);
      return -1;
    }

    // Check that the input is between 1 and 3.
    if (playerChoice < 1) {
      System.err.println("Player choice is out of range: " + playerChoiceString);
      return -1;
    }

    return playerChoice;
  }

}
