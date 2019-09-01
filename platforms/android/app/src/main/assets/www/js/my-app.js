// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
        swipe: 'left',
    },
    // Add default routes
    routes: [{
            path: '/about/',
            url: 'about.html',
        }, ]
        // ... other parameters
});

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    var f = new Date();
    var fecha = ("0" + f.getDate()).slice(-2) + "" + ("0" + (f.getMonth() + 1)).slice(-2) + "" + f.getFullYear();
    console.log("Device is ready!");
    $.ajax({
        type: "GET",
        url: "http://arrau.chillan.ubiobio.cl:8075/ubbiot/web/mediciones/medicionespordia/DY6A0fMetu/E1yGxKAcrg/" + fecha,
        cache: false,
        dataType: "text",
        success: function(data) {
            var onionarray = [];
            incoming = JSON.parse(data);
            onionarray = incoming.data;
            var tamaño = onionarray.length;
            var valor = ((parseInt(onionarray[tamaño - 1].valor) * 100) / 60) / 100;
            demoGauge.update({
                value: valor,
                valueText: onionarray[tamaño - 1].valor + "°C",
                labelText: "Temperatura"
            })
        }
    });
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function(e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function(e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
})

// Init top demo gauge
var demoGauge = app.gauge.create({
    el: '.gauge-init',
    type: 'semicircle',
    value: 0,
    size: 500,
    borderColor: 'hsl(60, 100%, 50%)',
    borderWidth: 10,
    valueText: " ",
    valueFontSize: 100,
    valueTextColor: 'hsl(60, 100%, 50%)',
    labelText: " ",
    labelTextColor: 'white',
    labelFontSize: 30,
});

// Change demo gauge on button click
$$('.button').on('click', function() {
    var value = $$(this).attr('data-value');
    demoGauge.update({
        value: value / 100,
        valueText: value + '%'
    });
});

$$('#temp').on('click', function() {
    var f = new Date();
    var fecha = ("0" + f.getDate()).slice(-2) + "" + ("0" + (f.getMonth() + 1)).slice(-2) + "" + f.getFullYear();
    $.ajax({
        type: "GET",
        url: "http://arrau.chillan.ubiobio.cl:8075/ubbiot/web/mediciones/medicionespordia/DY6A0fMetu/E1yGxKAcrg/" + fecha,
        cache: false,
        dataType: "text",
        success: function(data) {
            var onionarray = [];
            incoming = JSON.parse(data);
            onionarray = incoming.data;
            var tamaño = onionarray.length;
            var valor = ((parseInt(onionarray[tamaño - 1].valor) * 100) / 60) / 100;
            demoGauge.update({
                value: valor,
                valueText: onionarray[tamaño - 1].valor + "°C",
                labelText: "Temperatura"
            })
        }
    });
});
$$('#rad').on('click', function() {
    var f = new Date();
    var fecha = ("0" + f.getDate()).slice(-2) + "" + ("0" + (f.getMonth() + 1)).slice(-2) + "" + f.getFullYear();
    $.ajax({
        type: "GET",
        url: "http://arrau.chillan.ubiobio.cl:8075/ubbiot/web/mediciones/medicionespordia/DY6A0fMetu/8IvrZCP3qa/" + fecha,
        cache: false,
        dataType: "text",
        success: function(data) {
            var onionarray = [];
            incoming = JSON.parse(data);
            onionarray = incoming.data;
            var tamaño = onionarray.length;
            var valor = ((parseInt(onionarray[tamaño - 1].valor) * 100) / 1600) / 100;
            demoGauge.update({
                value: valor,
                valueText: onionarray[tamaño - 1].valor + "nm",
                labelText: "Radiación Ultravioleta"
            })
        }
    });
});
$$('#hum').on('click', function() {
    var f = new Date();
    var fecha = ("0" + f.getDate()).slice(-2) + "" + ("0" + (f.getMonth() + 1)).slice(-2) + "" + f.getFullYear();
    $.ajax({
        type: "GET",
        url: "http://arrau.chillan.ubiobio.cl:8075/ubbiot/web/mediciones/medicionespordia/DY6A0fMetu/VIbSnGKyLW/" + fecha,
        cache: false,
        dataType: "text",
        success: function(data) {
            var onionarray = [];
            incoming = JSON.parse(data);
            onionarray = incoming.data;
            var tamaño = onionarray.length;
            var valor = ((parseInt(onionarray[tamaño - 1].valor) / 100));
            demoGauge.update({
                value: valor,
                valueText: onionarray[tamaño - 1].valor + "%RH",
                labelText: "Humedad Relativa"
            })
        }
    });
});