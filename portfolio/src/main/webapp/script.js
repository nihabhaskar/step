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

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

/**
 * Adds a random greeting to the page.
 */
function addRandomFact() {
  const facts =
        ['I have been to 35 National parks', 'I enjoy eating and making ice cream', 'Sunflowers are my favorite flower'];

  // Pick a random greeting.
  const fact = facts[Math.floor(Math.random() * facts.length)];

  // Add it to the page.
  const factContainer = document.getElementById('fact-container');
  factContainer.innerText = fact;
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

/**
 * Shows slideshow.
 */
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function getGreetingUsingArrowFunctions() {
  fetch('/data').then(response => response.text()).then((quote) => {
    document.getElementById('quote-container').innerText = quote;
  });
}

function loadTasks() {
  fetch('/data').then(response => response.json()).then((tasks) => {
    const taskListElement = document.getElementById('task-list');
    tasks.forEach((task) => {
      taskListElement.appendChild(createTaskElement(task));
    })
  });
}

/** Creates an element that represents a task, including its delete button. */
function createTaskElement(task) {
  const taskElement = document.createElement('li');
  taskElement.className = 'task';

  const nameElement = document.createElement('span');
  var name = task.name.bold();
  nameElement.innerHTML = name + "<br />" + task.comments;

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';

  deleteButtonElement.addEventListener('click', () => {
    deleteTask(task);

    // Remove the task from the DOM.
    taskElement.remove();
  });

  taskElement.appendChild(nameElement);
  taskElement.appendChild(deleteButtonElement);
  return taskElement;
}

/** Tells the server to delete the task. */
function deleteTask(task) {
  const params = new URLSearchParams();
  params.append('id', task.id);
  fetch('/delete-task', {method: 'POST', body: params});
}

/** Creates map */
function createMap() {
  // Alaska
  var denali = new google.maps.LatLng(63.121372,-151.178617);
  var glacierbay = new google.maps.LatLng(58.7856,-136.9268);
  var kenai = new google.maps.LatLng(60.156065,-149.804792);
  
  // Arizona
  var grandcanyon = new google.maps.LatLng(36.220248,-112.179097);
  var saguaro = new google.maps.LatLng(32.359005,-111.177392);

  // California
  var deathvalley = new google.maps.LatLng(36.508674,-117.105201);
  var joshuatree = new google.maps.LatLng(33.875724,-115.908787);
  var kingscanyon = new google.maps.LatLng(36.886163,-119.551665);
  var lassenvolcanic = new google.maps.LatLng(40.505232,-121.430138);
  var redwood = new google.maps.LatLng(41.222411,-124.028536);
  var sequoia = new google.maps.LatLng(36.483583,-118.578925);
  var yosemite = new google.maps.LatLng(37.845534,-119.620267);

  // Florida
  var biscayne = new google.maps.LatLng(25.489450,-80.203801);
  var everglades = new google.maps.LatLng(25.295031,-80.910865);

  // Hawaii
  var hawaiivolcanoes = new google.maps.LatLng(19.385035,-155.200520);

  // New Mexico
  var carlsbad = new google.maps.LatLng(32.142490,-104.560068);

  // Oregon
  var craterlake = new google.maps.LatLng(42.866853,-122.159599);

  // Tennessee
  var greatsmoky = new google.maps.LatLng(35.662499,-83.475346);

  // Texas
  var guadalupe = new google.maps.LatLng(31.923552,-104.864366);

  // Utah
  var bryce = new google.maps.LatLng(37.590166,-112.207162);
  var zion = new google.maps.LatLng(37.293362,-113.043274);

  // Washington
  var rainier = new google.maps.LatLng(46.87665,-121.735556);
  var olympic = new google.maps.LatLng(47.806572,-123.588136);

  // Wyoming
  var teton = new google.maps.LatLng(43.785527,-110.696789);
  var yellowstone = new google.maps.LatLng(44.413990,-110.602084);

  const map = new google.maps.Map(
      document.getElementById('map'),
      {center: {lat: 46.87665, lng: -121.735556}, zoom: 3});

  // Alaska
  var denaliMark = new google.maps.Marker({
    position: denali,
    title:"Denali"
  });
  denaliMark.setMap(map);

  var glacierbayMark = new google.maps.Marker({
    position: glacierbay,
    title:"Glacier Bay"
  });
  glacierbayMark.setMap(map);

  var kenaiMark = new google.maps.Marker({
    position: kenai,
    title:"Kenai Fjords"
  });
  kenaiMark.setMap(map);

  // Arizona
  var grandcanyonMark = new google.maps.Marker({
    position: grandcanyon,
    title:"Grand Canyon"
  });
  grandcanyonMark.setMap(map);

  var saguaroMark = new google.maps.Marker({
    position: saguaro,
    title:"Saguaro"
  });
  saguaroMark.setMap(map);
  
  // California
  var deathvalleyMark = new google.maps.Marker({
    position: deathvalley,
    title:"Death Valley"
  }); 
  deathvalleyMark.setMap(map);

  var joshuatreeMark = new google.maps.Marker({
    position: joshuatree,
    title:"Joshua Tree"
  }); 
  joshuatreeMark.setMap(map);

  var kingscanyonMark = new google.maps.Marker({
    position: kingscanyon,
    title:"Kings Canyon"
  }); 
  kingscanyonMark.setMap(map);

  var lassenvolcanicMark = new google.maps.Marker({
    position: lassenvolcanic,
    title:"Lassen Volcanic"
  }); 
  lassenvolcanicMark.setMap(map);

  var redwoodMark = new google.maps.Marker({
    position: redwood,
    title:"Redwood"
  }); 
  redwoodMark.setMap(map);

  var sequoiaMark = new google.maps.Marker({
    position: sequoia,
    title:"Sequoia"
  }); 
  sequoiaMark.setMap(map);

  var yosemiteMark = new google.maps.Marker({
    position: yosemite,
    title:"Yosemite"
  });  
  yosemiteMark.setMap(map);

  // Florida
  var biscayneMark = new google.maps.Marker({
    position: biscayne,
    title:"Biscayne"
  }); 
  biscayneMark.setMap(map);

  var evergladesMark = new google.maps.Marker({
    position: everglades,
    title:"Everglades"
  });  
  evergladesMark.setMap(map);

  // Hawaii
  var hawaiiVolcMark = new google.maps.Marker({
    position: hawaiivolcanoes,
    title:"Hawaii Volcanoes"
  });  
  hawaiiVolcMark.setMap(map);

  // New Mexico
  var carlsbadMark = new google.maps.Marker({
    position: carlsbad,
    title:"Carlsbad Caverns"
  });  
  carlsbadMark.setMap(map);

  // Oregon
  var craterlakeMark = new google.maps.Marker({
    position: craterlake,
    title:"Crater Lake"
  });  
  craterlakeMark.setMap(map);

  // Tennessee
  var greatsmokyMark = new google.maps.Marker({
    position: greatsmoky,
    title:"Great Smoky Mountains"
  });  
  greatsmokyMark.setMap(map);

  // Texas
  var guadalupeMark = new google.maps.Marker({
    position: guadalupe,
    title:"Guadalupe Mountains"
  });  
  guadalupeMark.setMap(map);

  // Utah
  var bryceMark = new google.maps.Marker({
    position: bryce,
    title:"Bryce Canyon"
  }); 
  bryceMark.setMap(map);

  var zionMark = new google.maps.Marker({
    position: zion,
    title:"Zion"
  });  
  zionMark.setMap(map);
  
  // Washington
  var rainierMark = new google.maps.Marker({
    position: rainier,
    title:"Mount Rainier"
  }); 
  rainierMark.setMap(map);

  var olympicMark = new google.maps.Marker({
    position: olympic,
    title:"Olympic"
  });  
  olympicMark.setMap(map);
 
  // Wyoming
  var tetonMark = new google.maps.Marker({
    position: teton,
    title:"Grand Teton"
  }); 
  tetonMark.setMap(map);

  var yellowstoneMark = new google.maps.Marker({
    position: yellowstone,
    title:"Yellowstone"
  });  
  yellowstoneMark.setMap(map);
}

/** Creates a chart and adds it to the page. */
function drawChart() {
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Genres');
  data.addColumn('number', 'Count');
    data.addRows([
        ['Historical Fiction', 5],
        ['Non Fiction', 8],
        ['Fiction', 7],
        ['Biography',3]
    ]);

  const options = {
    chartArea:{left:0,top:0,width:"100%",height:"100%"},
    'width':400,
    'height':400,
    is3D: true,
    colors: ['#785964', '#ad929c', '#d1c0c6', '#ebe4e6'],
    'backgroundColor': 'transparent'
  };

  const chart = new google.visualization.PieChart(
    document.getElementById('chart-container'));
  chart.draw(data, options);
}
