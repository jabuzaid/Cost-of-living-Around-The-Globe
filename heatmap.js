// **************************************************************
// UC berkeley Data Analytics Bootcamp
// UCBSAN201811DATA2  - 2018-2019
// Project 2 :   **** Cost of living around the world ****
// Cora Gnikobou, Joe Abuzaid, Eric Chee, Alex Davis, Jesus Lara
// **************************************************************
// Heat Map

// Reading, filtering & storing the data from the csv data file
d3.csv("cost_of_living_data_combine.csv").then(data => {
    data2016 = data.filter(d => d.Year === '2016');
    data2017 = data.filter(d => d.Year === '2017');
    data2018 = data.filter(d => d.Year === '2018');
    var heatData2016 = [];
    var heatData2017 = [];
    var heatData2018 = [];
    // Storing the City data in cities

    // Generating the cities markers using the coordinates and bind popups with information for each year
    data2016.forEach(d => {
        heatData2016.push([parseFloat(d.latitude), parseFloat(d.longitude), parseFloat(d.RentIndex)])
        // .bindPopup("<h4>" + d.City + ", " + d.Country + "</h4>" + "<h6>" + "Rent Index: " + d.RentIndex + "</h6>" + "<h6>"
        // + "Local Purchasing Power Index: " + d.LocalPurchasingPowerIndex + "</h6>"));
    });

    data2017.forEach(d => {
        heatData2017.push([parseFloat(d.latitude), parseFloat(d.longitude), parseFloat(d.RentIndex)])
        // .bindPopup("<h4>" + d.City + ", " + d.Country + "</h4>" + "<h6>" + "Rent Index: " + d.RentIndex + "</h6>" + "<h6>"
        // + "Local Purchasing Power Index: " + d.LocalPurchasingPowerIndex + "</h6>"));
    });

    data2018.forEach(d => {
        heatData2018.push([parseFloat(d.latitude), parseFloat(d.longitude), parseFloat(d.RentIndex)])
        // .bindPopup("<h4>" + d.City + ", " + d.Country + "</h4>" + "<h6>" + "Rent Index: " + d.RentIndex + "</h6>" + "<h6>"
        //+ "Local Purchasing Power Index: " + d.LocalPurchasingPowerIndex + "</h6>"));
    });

    // Create an overlay objects for the three years
    var dataLayers2016 = L.layerGroup(heatData2016);
    var dataLayers2017 = L.layerGroup(heatData2017);
    var dataLayers2018 = L.layerGroup(heatData2018);

        // Define a map object
    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5
        });

    var streetLayer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
        }).addTo(myMap);

    var heat2016 = L.heatLayer(heatData2016, {
        container: document.getElementById('heatmapContainer'),
        radius: 20,
        max: 1.0,
        maxOpacity: .75,
        minOpacity: .5,
        blur: 1,
        gradient: {
            // enter n keys between 0 and 1 here
            // for gradient color customization
            '.4': 'blue',
            '1': 'red',
            '.65': 'lime'
        }
      }).addTo(myMap);

    var heat2017 = L.heatLayer(heatData2017, {
        container: document.getElementById('heatmapContainer'),
        radius: 20,
        max: 1.0,
        maxOpacity: .75,
        minOpacity: .5,
        blur: 1,
        gradient: {
            // enter n keys between 0 and 1 here
            // for gradient color customization
            '.4': 'blue',
            '1': 'red',
            '.65': 'lime'
        }
      }).addTo(myMap);

      var heat2018 = L.heatLayer(heatData2018, {
        container: document.getElementById('heatmapContainer'),
        radius: 20,
        max: 1.0,
        maxOpacity: .75,
        minOpacity: .5,
        blur: 1,
        gradient: {
            // enter n keys between 0 and 1 here
            // for gradient color customization
            '.4': 'blue',
            '1': 'red',
            '.65': 'lime'
        }
      }).addTo(myMap);

    var baseMaps = {"Street Layer": streetLayer};

    var overlayMaps = {
        "Heat Rent Index 2016": heat2016,
        "Heat Rent Index 2017": heat2017,
        "Heat Rent Index 2018": heat2018
    };


    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(myMap);
});
