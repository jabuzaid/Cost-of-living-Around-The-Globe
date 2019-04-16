
// Reading & storing the data from the csv file for 2016

var cities = []
var coordinates = []
d3.csv("cost_of_living_data_2016.csv", function(error, data2016) {
  if (error) throw error;
    cities = data2016.map(row => row[`City`]);
    var countries = data2016.map(row => row[`Country`]);
    var livingIndex2016 = data2016.map(row => row[`Cost of Living Index`]);
    var rentIndex2016 = data2016.map(row => row[`Rent Index`]);
    var livingRentIndex2016 = data2016.map(row => row[`Cost of Living Plus Rent Index`]);
    var groceriesIndex2016 = data2016.map(row => row[`Groceries Index`]);
    var restaurantIndex2016 = data2016.map(row => row[`Restaurant Price Index`]);
    var localPurchanigPowerIndex2016 = data2016.map(row => row[`Local Purchasing Power Index`]);
    coordinates = data2016.map(row => row.latitude + ", " + row.longitude);
    console.log(cities);
    // console.log(countries);
    console.log(coordinates);
});
// Reading & storing the data from the csv file for 2017
d3.csv("cost_of_living_data_2017.csv", function(error, data2017) {
  if (error) throw error;
    var livingIndex2017 = data2017.map(row => row[`Cost of Living Index`]);
    var rentIndex2017 = data2017.map(row => row[`Rent Index`]);
    var livingRentIndex2017 = data2017.map(row => row[`Cost of Living Plus Rent Index`]);
    var groceriesIndex2017 = data2017.map(row => row[`Groceries Index`]);
    var restaurantIndex2017 = data2017.map(row => row[`Restaurant Price Index`]);
    var localPurchanigPowerIndex2017 = data2017.map(row => row[`Local Purchasing Power Index`]);
    console.log(livingIndex2017);
    console.log(rentIndex2017);
});

// Reading & storing the data from the csv file for 2018
d3.csv("cost_of_living_data_2018.csv", function(error, data2018) {
  if (error) throw error;
    var livingIndex2018 = data2018.map(row => row[`Cost of Living Index`]);
    var rentIndex2018 = data2018.map(row => row[`Rent Index`]);
    var livingRentIndex2018 = data2018.map(row => row[`Cost of Living Plus Rent Index`]);
    var groceriesIndex2018 = data2018.map(row => row[`Groceries Index`]);
    var restaurantIndex2018 = data2018.map(row => row[`Restaurant Price Index`]);
    var localPurchanigPowerIndex2018 = data2018.map(row => row[`Local Purchasing Power Index`]);
    console.log(livingIndex2018);
    console.log(rentIndex2018);
});



// Define arrays to hold the data city markers
var data2016Markers = [];
var data2017Markers = [];
var data2018Markers = [];

// Loop through 2016 Ccities data to create markers
for (var i = 0; i < cities.length; i++) {
  // Setting the marker radius for the state by passing population into the markerSize function
  data2016Markers.push(
    L.markers(coordinates[i], {
      stroke: false,
      fillOpacity: 0.75,
      color: "blue",
      fillColor: "white"
    })
  );
}
console.log(data2016Markers);
// Loop through 2017 cities data to create markers
for (var i = 0; i < cities.length; i++) {
  // Setting the marker radius for the state by passing population into the markerSize function
  data2017Markers.push(
    L.markers(coordinates[i], {
      stroke: false,
      fillOpacity: 0.75,
      color: "blue",
      fillColor: "white"
    })
  );
}

// Loop through 2018 cities data to create markers
for (var i = 0; i < cities.length; i++) {
  // Setting the marker radius for the state by passing population into the markerSize function
  data2018Markers.push(
    L.markers(coordinates[i], {
      stroke: false,
      fillOpacity: 0.75,
      color: "blue",
      fillColor: "white"
    })
  );
}

// Define variables for our base layers
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

// Create three separate layer groups: one for each year
var data2016 = L.layerGroup(data2016Markers);
var data2017 = L.layerGroup(data2017Markers);
var data2018 = L.layerGroup(data2018Markers);


// Create a baseMaps object
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap
};

// Create an overlay object
var overlayMaps = {
  "2016 data": data2016,
  "2017 data": data2017,
  "2018 data": data2018

};

// Define a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [streetmap, data2016, data2017, data2018]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
