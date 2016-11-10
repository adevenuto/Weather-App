function initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

$(function(){

  // Get Geo-Location
  var latitude;
  var longitude;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      weather();
    });
  }
  // Call Dark Sky Api
  function weather() {

    $.ajax({                                 // HIDE THIS API KEY BEFORE LAUNCHING
        url: "https://api.darksky.net/forecast/ea51c0e9ee90a905091f7b35ec31d2b9/" + latitude + ',' + longitude + "/", // src
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {}, // Additional parameters here
        dataType: 'jsonp',
        success: function(data) {
          console.log(data);
        },
        error: function(err) {
          alert(err);
        }
    });

  }
  // Google maps

});



// var style = [
//     {
//     stylers: [
//       { saturation: "-100" },
//       { lightness: "20" }
//     ]
//     },{
//     featureType: "poi",
//     stylers: [
//       { visibility: "off" }
//     ]
//     },{
//     featureType: "transit",
//     stylers: [
//       { visibility: "off" }
//     ]
//     },{
//     featureType: "road",
//     stylers: [
//       { lightness: "50" },
//       { visibility: "on" }
//     ]
//     },{
//     featureType: "landscape",
//     stylers: [
//       { lightness: "50" }
//     ]
//     }
//   ];