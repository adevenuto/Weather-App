$(function(){
  // Get Geo-Location
  var latitude;
  var longitude;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
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

});



