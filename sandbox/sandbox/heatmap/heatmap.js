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
    var costIndex2016 = [];
    var costIndex2017 = [];
    var costIndex2018 = [];
    var purchaseIndex2016 = [];
    var purchaseIndex2017 = [];
    var purchaseIndex2018 = [];
    // Storing the City data in cities
        
    // Generating the heat data using the coordinates and Cost of Living Index for each year separately
    data2016.forEach(d => {
        costIndex2016.push([parseFloat(d.latitude), parseFloat(d.longitude), parseFloat(d.CostofLivingIndex)])
    });

    data2017.forEach(d => {
        costIndex2017.push([parseFloat(d.latitude), parseFloat(d.longitude), parseFloat(d.CostofLivingIndex)])
    });
        
    data2018.forEach(d => { 
        costIndex2018.push([parseFloat(d.latitude), parseFloat(d.longitude), parseFloat(d.CostofLivingIndex)])
    });


    // Generating the heat data using the coordinates and Cost of Living Index for each year separately
    data2016.forEach(d => {
        purchaseIndex2016.push([parseFloat(d.latitude), parseFloat(d.longitude), parseFloat(d.LocalPurchasingPowerIndex)])
    });

    data2017.forEach(d => {
        purchaseIndex2017.push([parseFloat(d.latitude), parseFloat(d.longitude), parseFloat(d.LocalPurchasingPowerIndex)])
    });
        
    data2018.forEach(d => { 
        purchaseIndex2018.push([parseFloat(d.latitude), parseFloat(d.longitude), parseFloat(d.LocalPurchasingPowerIndex)])
    });
    
    // Create an overlay objects for Cost of Living Index for 2016-2018
    var costLayers2016 = L.layerGroup(costIndex2016);
    var costLayers2017 = L.layerGroup(costIndex2017);
    var costLayers2018 = L.layerGroup(costIndex2018);

    // Create an overlay objects for Local Purchasing Power Index for 2016-2018
    var purchaseLayers2016 = L.layerGroup(purchaseIndex2016);
    var purchaseLayers2017 = L.layerGroup(purchaseIndex2017);
    var purchaseLayers2018 = L.layerGroup(purchaseIndex2018);


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

    var costHeat2016 = L.heatLayer(costIndex2016, {
        container: document.getElementById('heatmapContainer'),
        maxZoom: 16,
        radius: 20,
        max: 1.0,
        maxOpacity: .95,
        minOpacity: .45,
        blur: 10,
        gradient: {
            // enter n keys between 0 and 1 here
            // for gradient color customization
            '.5': 'red',
            '.5': 'lime',
            '.6': 'blue'
        }
      }).addTo(myMap);
      
    var costHeat2017 = L.heatLayer(costIndex2017, {
        container: document.getElementById('heatmapContainer'),
        maxZoom: 16,
        radius: 20,
        max: 1.0,
        maxOpacity: .95,
        minOpacity: .45,
        blur: 10,
        gradient: {
            // enter n keys between 0 and 1 here
            // for gradient color customization
            '.5': 'red',
            '.5': 'lime',
            '.6': 'blue'
        }
      }).addTo(myMap);
    
      var costHeat2018 = L.heatLayer(costIndex2018, {
        container: document.getElementById('heatmapContainer'),
        maxZoom: 16,
        radius: 20,
        max: 1.0,
        maxOpacity: .95,
        minOpacity: .45,
        blur: 10,
        gradient: {
            // enter n keys between 0 and 1 here
            // for gradient color customization
            '.5': 'red',
            '.5': 'lime',
            '.6': 'blue'
        }
      }).addTo(myMap);

      var purchaseHeat2016 = L.heatLayer(purchaseIndex2016, {
        container: document.getElementById('heatmapContainer'),
        maxZoom: 10,
        minZoom: 5,
        radius: 25,
        max: .5,
        maxOpacity: .75,
        minOpacity: .4,
        blur: 20,
        gradient: {
            // enter n keys between 0 and 1 here
            // for gradient color customization
            '.4': 'blue',
            '.4': 'lime',
            '.6': 'red'
        }
      }).addTo(myMap);

      var purchaseHeat2017 = L.heatLayer(purchaseIndex2017, {
        container: document.getElementById('heatmapContainer'),
        maxZoom: 10,
        minZoom: 5,
        radius: 25,
        max: .5,
        maxOpacity: .75,
        minOpacity: .4,
        blur: 20,
        gradient: {
            // enter n keys between 0 and 1 here
            // for gradient color customization
            '.4': 'blue',
            '.4': 'lime',
            '.6': 'red'
        }
      }).addTo(myMap);

      var purchaseHeat2018 = L.heatLayer(purchaseIndex2018, {
        container: document.getElementById('heatmapContainer'),
        maxZoom: 10,
        minZoom: 5,
        radius: 25,
        max: .5,
        maxOpacity: .75,
        minOpacity: .4,
        blur: 20,
        gradient: {
            // enter n keys between 0 and 1 here
            // for gradient color customization
            '.4': 'blue',
            '.4': 'lime',
            '.6': 'red'
        }
      }).addTo(myMap);

    var baseMaps = {"Street Layer": streetLayer};

    var overlayMaps = {
        "Cost of Living Index 2016": costHeat2016,
        "Cost of Living Index 2017": costHeat2017,
        "Cost of Living Index 2018": costHeat2018,
        "Local Purchasing Power Index 2016": purchaseHeat2016,
        "Local Purchasing Power Index 2017": purchaseHeat2017,
        "Local Purchasing Power Index 2018": purchaseHeat2018
    };


    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(myMap);
});