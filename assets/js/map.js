  /////////////////////////////
  // initiate/create google map
  /////////////////////////////
  function initMap(lat, lng) {
  // Styles a map in night mode.
    var latLng = {lat: lat, lng: lng};
    map = new google.maps.Map(document.getElementById('map'), {
      center: latLng,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        { "featureType": "all", "elementType": "geometry", "stylers": [ { "color": "#eeeee7" } ] }, { "featureType": "all", "elementType": "labels.text.fill", "stylers": [ { "color": "#4b4b4b" } ] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [ { "color": "#f5f1e6" } ] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [ { "color": "#c9b2a6" } ] }, { "featureType": "administrative.land_parcel", "elementType": "geometry.stroke", "stylers": [ { "color": "#dcd2be" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#e3e3d7" } ] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [ { "color": "#e3e3d7" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#e3e3d7" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#93817c" } ] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#527042" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#447530" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#f5f1e6" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#fac613" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#e9bc62" } ] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [ { "color": "#ff9900" } ] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry.stroke", "stylers": [ { "color": "#db8555" } ] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "color": "#fdfcf8" } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#806b63" } ] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "color": "#e3e3d7" } ] }, { "featureType": "transit.line", "elementType": "labels.text.fill", "stylers": [ { "color": "#8f7d77" } ] }, { "featureType": "transit.line", "elementType": "labels.text.stroke", "stylers": [ { "color": "#eeeee7" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#e3e3d7" } ] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#1e6aaa" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#1e6aaa" } ] }
      ]
    });
  addMarker(latLng, map);
  }

//////////////////////////////////////////////
// Creating dynamic marker w/ information box
//////////////////////////////////////////////
function addMarker(markerPos, map) {
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;
  geocoder.geocode({'location': markerPos}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        map.setZoom(9);
        var marker = new google.maps.Marker({
          position: markerPos, map,
          map: map
        });
        google.maps.event.addListener(marker, 'mousedown', function() {
            infowindow.setContent(results[1].formatted_address);
            infowindow.open(map, marker);
          });
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

////////////////////////////
// Retreive current location
////////////////////////////
function locationReq() {
  // Get Geo-Location
  var point = [];
  if (navigator.geolocation) {
    // Activate spinner
    $('.spinner').attr('id', 'circularG');
    navigator.geolocation.getCurrentPosition(function(position) {
      point.push(position.coords.latitude);
      point.push(position.coords.longitude);
      // populate lat/lng input fields
      $('#lat').val(point[0]);
      $('#lng').val(point[1]);
      // Disable spinner
      $('.spinner').removeAttr('id');
      initMap(point[0],point[1]);
    });
  }
}
/////////////////////////////////////
// Grab User input from search field
/////////////////////////////////////
$('.search-btn').on('click', function() {
  var request = $('#search').val();
  var geocoder =  new google.maps.Geocoder();
  geocoder.geocode( { 'address': request}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var newMarker = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
      alert("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng());
      console.log(map)
      console.log(newMarker);
    } else {
      alert("Something went wrong " + status);
    }
  });
});

