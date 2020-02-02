// alert("Welcome to New Map Directions! Begin by slecting anywhere on the map to set your <b>starting point</b> or destination. To enter address use the routing box in the upper right corner. Let begin!");

swal("Welcome to New Map Directions!", "Begin by slecting anywhere on the map to set your Starting Point or destination. To enter address use the routing box in the upper right corner. Let's begin!");

swal({
  title: "Welcome to New Map Directions!",
  text: "Begin by selecting anywhere on the map to set your Starting Point or Destination. To enter address, use the Routing Box in the upper right corner.",
  button: "Let's Begin!",
});

var map = L.map('map').setView([47.25, -122.44], 11);

var light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'dnilsen/ck62sk9vt01vw1imr7lom1aqg',
    accessToken: 'pk.eyJ1IjoiZG5pbHNlbiIsImEiOiJjazIzeHFyd3kwMm03M25rNGkyNnJuODFjIn0.THS8KaBhpFTcgWOjMpp6_g',
}).addTo(map);

var dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'dnilsen/ck62s50yu01yc1jmau4t403zj',
    accessToken: 'pk.eyJ1IjoiZG5pbHNlbiIsImEiOiJjazIzeHFyd3kwMm03M25rNGkyNnJuODFjIn0.THS8KaBhpFTcgWOjMpp6_g',
}).addTo(map);

var satellite = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-streets-v11',
    accessToken: 'pk.eyJ1IjoiZG5pbHNlbiIsImEiOiJjazIzeHFyd3kwMm03M25rNGkyNnJuODFjIn0.THS8KaBhpFTcgWOjMpp6_g',
}).addTo(map);

var control = L.Routing.control({
    router: L.Routing.mapbox('pk.eyJ1IjoiZG5pbHNlbiIsImEiOiJjazIzeHFyd3kwMm03M25rNGkyNnJuODFjIn0.THS8KaBhpFTcgWOjMpp6_g'),
    geocoder: L.Control.Geocoder.mapbox('pk.eyJ1IjoiZG5pbHNlbiIsImEiOiJjazIzeHFyd3kwMm03M25rNGkyNnJuODFjIn0.THS8KaBhpFTcgWOjMpp6_g'),
    waypoints: [
      null
        // L.latLng(47.246587, -122.438830),
        // L.latLng(47.318017, -122.542970),
        // L.latLng(47.258024, -122.444725)
    ],
    units:'imperial',
    collapsible: true,
    show: false,
    routeWhileDragging: true
}).addTo(map);

function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Start Here', container),
        destBtn = createButton('Go Here', container);

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);

    L.DomEvent.on(startBtn, 'click', function() {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
          });

    L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        control.show();
        map.closePopup();
          });

 });

 var baseLayers ={
  "Light": light,
  "Dark" : dark,
  "Satellite" : satellite
};

L.control.layers(baseLayers).addTo(map);



L.easyButton("fas fa-crosshairs", function(btn, map){
    map.locate({setView: true, maxZoom: 16});
}).addTo(map);
