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
  const map = new google.maps.Map(
      document.getElementById('map'),
      {center: {lat: 46.87665, lng: -121.735556}, zoom: 3});
  
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

  // HAVE NOT BEEN //
  
  // Alaska
  var gates = new google.maps.LatLng(67.823341, -153.416829);
  var katmai = new google.maps.LatLng(58.6054, -155.0795);
  var kobuk = new google.maps.LatLng(67.324378, -159.141685);
  var clark = new google.maps.LatLng(60.394000, -154.363396);
  var wrangell = new google.maps.LatLng(61.720936, -143.093490);

  // American Samoa
  var samoa = new google.maps.LatLng(-14.260012, -170.682827);

   //Arizona
  var petrified = new google.maps.LatLng(34.886701, -109.746980);

  //Arkansas
  var springs = new google.maps.LatLng(34.522638, -93.043032);

  // california
  var channel = new google.maps.LatLng(33.979635, -119.805107);

  // colorado
  var black = new google.maps.LatLng(38.568397, -107.741012);
  var dunes = new google.maps.LatLng(37.809958, -105.562620);
  var mesa = new google.maps.LatLng(37.183180, -108.492330);
  var rocky = new google.maps.LatLng(40.344891, -105.686101);

  // florida
  var tortugas = new google.maps.LatLng(24.628406, -82.873203);

  // hawaii
  var haleakala = new google.maps.LatLng(20.719238, -156.164239);

  //kentucky
  var mammoth = new google.maps.LatLng(37.189619, -86.100772);

  // maine
  var acadia = new google.maps.LatLng(44.349746, -68.273472);

  //michagan
  var isle = new google.maps.LatLng(47.981304, -88.916668);

  //minnesota
  var voyageurs = new google.maps.LatLng(48.483596, -92.834633);
  
  //montana
  var glacier = new google.maps.LatLng(48.744099, -113.834899);

  //nevada
  var basin = new google.maps.LatLng(38.979696, -114.299785);

  //n. dakota
  var teddy = new google.maps.LatLng(46.971918, -103.539331);

  // ohio
  var cuyahoga = new google.maps.LatLng(41.277088, -81.569399);

  //s. carolina
  var congaree = new google.maps.LatLng(33.791811, -80.776682);

  //s. dakota
  var badlands = new google.maps.LatLng(43.850659, -102.376615);
  var wind = new google.maps.LatLng(43.604643, -103.431733);

  // texas
  var bigbend = new google.maps.LatLng(29.125427, -103.242108);

  // virgin islands
  var virgin = new google.maps.LatLng(18.342095, -64.750327); 

  // utah
  var arches = new google.maps.LatLng(38.728538, -109.591144); 
  var capitol = new google.maps.LatLng(38.365846, -111.269305); 
  var canyonlands = new google.maps.LatLng(38.316107, -109.884148); 

  // virginia
  var shenandoah = new google.maps.LatLng(38.267851, -78.709071); 

  // washington
  var ncascades = new google.maps.LatLng(48.768568, -121.305044);

  // Alaska
  let denaliMark = new google.maps.Marker({
    position: denali,
    title:"Denali",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  });

  denaliMark.setMap(map);

  let glacierbayMark = new google.maps.Marker({
    position: glacierbay,
    title:"Glacier Bay",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  });
  glacierbayMark.setMap(map);

  let kenaiMark = new google.maps.Marker({
    position: kenai,
    title:"Kenai Fjords",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  });
  kenaiMark.setMap(map);

  // Arizona
  let grandcanyonMark = new google.maps.Marker({
    position: grandcanyon,
    title:"Grand Canyon",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  });
  grandcanyonMark.setMap(map);

  let saguaroMark = new google.maps.Marker({
    position: saguaro,
    title:"Saguaro",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  });
  saguaroMark.setMap(map);
  
  // California
  let deathvalleyMark = new google.maps.Marker({
    position: deathvalley,
    title:"Death Valley",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  }); 
  deathvalleyMark.setMap(map);

  let joshuatreeMark = new google.maps.Marker({
    position: joshuatree,
    title:"Joshua Tree",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  }); 
  joshuatreeMark.setMap(map);

  let kingscanyonMark = new google.maps.Marker({
    position: kingscanyon,
    title:"Kings Canyon",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  }); 
  kingscanyonMark.setMap(map);

  let lassenvolcanicMark = new google.maps.Marker({
    position: lassenvolcanic,
    title:"Lassen Volcanic",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  }); 
  lassenvolcanicMark.setMap(map);

  let redwoodMark = new google.maps.Marker({
    position: redwood,
    title:"Redwood",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  }); 
  redwoodMark.setMap(map);

  let sequoiaMark = new google.maps.Marker({
    position: sequoia,
    title:"Sequoia",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  }); 
  sequoiaMark.setMap(map);

  let yosemiteMark = new google.maps.Marker({
    position: yosemite,
    title:"Yosemite",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  });  
  yosemiteMark.setMap(map);

  // Florida
  let biscayneMark = new google.maps.Marker({
    position: biscayne,
    title:"Biscayne",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  }); 
  biscayneMark.setMap(map);

  let evergladesMark = new google.maps.Marker({
    position: everglades,
    title:"Everglades",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  });  
  evergladesMark.setMap(map);

  // Hawaii
  let hawaiiVolcMark = new google.maps.Marker({
    position: hawaiivolcanoes,
    title:"Hawaii Volcanoes",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  });  
  hawaiiVolcMark.setMap(map);

  // New Mexico
  let carlsbadMark = new google.maps.Marker({
    position: carlsbad,
    title:"Carlsbad Caverns",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  });  
  carlsbadMark.setMap(map);

  // Oregon
  let craterlakeMark = new google.maps.Marker({
    position: craterlake,
    title:"Crater Lake",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  });  
  craterlakeMark.setMap(map);

  // Tennessee
  let greatsmokyMark = new google.maps.Marker({
    position: greatsmoky,
    title:"Great Smoky Mountains",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  });  
  greatsmokyMark.setMap(map);

  // Texas
  let guadalupeMark = new google.maps.Marker({
    position: guadalupe,
    title:"Guadalupe Mountains",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  });  
  guadalupeMark.setMap(map);

  // Utah
  let bryceMark = new google.maps.Marker({
    position: bryce,
    title:"Bryce Canyon",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  }); 
  bryceMark.setMap(map);

  let zionMark = new google.maps.Marker({
    position: zion,
    title:"Zion",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  });  
  zionMark.setMap(map);
  
  // Washington
  let rainierMark = new google.maps.Marker({
    position: rainier,
    title:"Mount Rainier",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  }); 
  rainierMark.setMap(map);

  let olympicMark = new google.maps.Marker({
    position: olympic,
    title:"Olympic",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  });  
  olympicMark.setMap(map);
 
  // Wyoming
  let tetonMark = new google.maps.Marker({
    position: teton,
    title:"Grand Teton",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  }); 
  tetonMark.setMap(map);

  let yellowstoneMark = new google.maps.Marker({
    position: yellowstone,
    title:"Yellowstone",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  });  
  yellowstoneMark.setMap(map);

//not been
let gatesMark = new google.maps.Marker({
    position: gates,
    title:"Gates of the Arctic",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });

gatesMark.setMap(map);

  let katmaiMark = new google.maps.Marker({
    position: katmai,
    title:"Katmai",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });
  katmaiMark.setMap(map);

  let kobukMark = new google.maps.Marker({
    position: kobuk,
    title:"Kobuk Valley",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });

  kobukMark.setMap(map);

let clarkMark = new google.maps.Marker({
    position: clark,
    title:"Lake Clark",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });
  clarkMark.setMap(map);

let wrangellMark = new google.maps.Marker({
    position: wrangell,
    title:"Wrangell-St. Elias",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });

wrangellMark.setMap(map);

let samoaMark = new google.maps.Marker({
    position: samoa,
    title:"American Samoa",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });
samoaMark.setMap(map);

let petrifiedMark = new google.maps.Marker({
    position: petrified,
    title:"Petrified Forest",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });

petrifiedMark.setMap(map);

let springsMark = new google.maps.Marker({
    position: springs,
    title:"Hot Springs",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });
springsMark.setMap(map);

let channelMark = new google.maps.Marker({
    position: channel,
    title:"Channel Islands",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });

channelMark.setMap(map);

let blackMark = new google.maps.Marker({
    position: black,
    title:"Black Canyon of the Gunnison",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });

blackMark.setMap(map);

let dunesMark = new google.maps.Marker({
    position: dunes,
    title:"Great Sand Dunes",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });

dunesMark.setMap(map);

let mesaMark = new google.maps.Marker({
    position: mesa,
    title:"Mesa Verde",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });

mesaMark.setMap(map);

let rockyMark = new google.maps.Marker({
    position: rocky,
    title:"Rocky Mountain",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });

rockyMark.setMap(map);

let tortMark = new google.maps.Marker({
    position: tortugas,
    title:"Dry Tortugas",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });

tortMark.setMap(map);

let haleakalaMark = new google.maps.Marker({
    position: haleakala,
    title:"Haleakala",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });

haleakalaMark.setMap(map);

let mammothMark = new google.maps.Marker({
    position: mammoth,
    title:"Mammoth Cave",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });

mammothMark.setMap(map);

let acadiaMark = new google.maps.Marker({
    position: acadia,
    title:"Acadia",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });

acadiaMark.setMap(map);

let isleMark = new google.maps.Marker({
    position: isle,
    title:"Isle Royale",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });

isleMark.setMap(map);

let voyageursMark = new google.maps.Marker({
    position: voyageurs,
    title:"Voyageurs",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });

voyageursMark.setMap(map);

let glacierMark = new google.maps.Marker({
    position: glacier,
    title:"Glacier",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });

glacierMark.setMap(map);

let basinMark = new google.maps.Marker({
    position: basin,
    title:"Great Basin",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
  });

basinMark.setMap(map);

let teddyMark = new google.maps.Marker({
    position: teddy,
    title:"Theodore Roosevelt",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
});

teddyMark.setMap(map);

let cuyahogaMark = new google.maps.Marker({
    position: cuyahoga,
    title:"Cuyahoga Valley",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
});

cuyahogaMark.setMap(map);

let congareeMark = new google.maps.Marker({
    position: congaree,
    title:"Congaree",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
});

congareeMark.setMap(map);

let badlandsMark = new google.maps.Marker({
    position: badlands,
    title:"Badlands",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
});

badlandsMark.setMap(map);

let windMark = new google.maps.Marker({
    position: wind,
    title:"Wind Cave",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
});

windMark.setMap(map);

let bigbendMark = new google.maps.Marker({
    position: bigbend,
    title:"Big Bend",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
});

bigbendMark.setMap(map);

let virginMark = new google.maps.Marker({
    position: virgin,
    title:"Virgin Islands",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
});

virginMark.setMap(map);

let archesMark = new google.maps.Marker({
    position: arches,
    title:"Arches",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
});

archesMark.setMap(map);

let capitolMark = new google.maps.Marker({
    position: capitol,
    title:"Capitol Reef",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
});

capitolMark.setMap(map);

let canyonlandsMark = new google.maps.Marker({
    position: canyonlands,
    title:"Canyonlands",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
});

canyonlandsMark.setMap(map);

let shenandoahMark = new google.maps.Marker({
    position: shenandoah,
    title:"Shenandoah",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
});

shenandoahMark.setMap(map);

let ncascadesMark = new google.maps.Marker({
    position: ncascades,
    title:"North Cascades",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
});

ncascadesMark.setMap(map);

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
