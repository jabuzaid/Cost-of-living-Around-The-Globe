// **************************************************************
// UC berkeley Data Analytics Bootcamp
// UCBSAN201811DATA2  - 2018-2019
// Project 2 :   **** Cost of living around the world ****
// Cora Gnikobou, Joe Abuzaid, Eric Chee, Alex Davis, Jesus Lara
// **************************************************************
//
// Define variables for our streetmap base layers
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 3,
id: "mapbox.streets",
accessToken: API_KEY
});

// Define variables for our darkmap base layers
var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 3,
id: "mapbox.dark",
accessToken: API_KEY
});

// Create a baseMaps object
var baseMaps = {
"Street Map": streetmap,
"Dark Map": darkmap
};

// Reading, filtering & storing the data from the 2016 csv data file
d3.csv("cost_of_living_data_combine.csv").then(data => {
    data2016 = data.filter(d => d.Year === '2016');
    data2017 = data.filter(d => d.Year === '2017');
    data2018 = data.filter(d => d.Year === '2018');
    var dataMarkers2016 = [];
    var dataMarkers2017 = [];
    var dataMarkers2018 = [];
    // Storing the City data in cities

    // Generating the cities markers using the coordinates and bind popups with information for each year
    data2016.forEach(d => {
        dataMarkers2016.push(L.marker([parseFloat(d.latitude), parseFloat(d.longitude)])
        .bindPopup("<h4>" + d.City + ", " + d.Country + "</h4>" + "<h6>" + "Rent Index: " + d.RentIndex + "</h6>" + "<h6>" + "Local Purchasing Power Index: " + d.LocalPurchasingPowerIndex + "</h6>"));
    });

    data2017.forEach(d => {
        dataMarkers2017.push(L.marker([parseFloat(d.latitude), parseFloat(d.longitude)])
        .bindPopup("<h4>" + d.City + ", " + d.Country + "</h4>" + "<h6>" + "Rent Index: " + d.RentIndex + "</h6>" + "<h6>" + "Local Purchasing Power Index: " + d.LocalPurchasingPowerIndex + "</h6>"));
    });

    data2018.forEach(d => {
        dataMarkers2018.push(L.marker([parseFloat(d.latitude), parseFloat(d.longitude)])
        .bindPopup("<h4>" + d.City + ", " + d.Country + "</h4>" + "<h6>" + "Rent Index: " + d.RentIndex + "</h6>" + "<h6>" + "Local Purchasing Power Index: " + d.LocalPurchasingPowerIndex + "</h6>"));
    });

    // Create an overlay objects for the three years
    var dataLayers2016 = L.layerGroup(dataMarkers2016);
    var dataLayers2017 = L.layerGroup(dataMarkers2017);
    var dataLayers2018 = L.layerGroup(dataMarkers2018);

    var overlayMaps = {
        "2016 data": dataLayers2016,
        "2017 data": dataLayers2017,
        "2018 data": dataLayers2018
    };

    // Define a map object
    var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap, dataLayers2016, dataLayers2017, dataLayers2018]
    });

    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(myMap);
});
