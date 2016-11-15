
/////////////////
// Weather Icons
/////////////////
var icons = {
  "clear-day": "img/clear-day.png",
  "clear-night": "img/clear-night.png",
  "cloudy": "img/cloudy.png",
  "fog": "img/fog.png",
  "partly-cloudy-day": "img/partly-cloudy-day.png",
  "partly-cloudy-night": "img/partly-cloudy-night.png",
  "snow": "img/snow.png",
  "rain": "img/rain.png",
  "thunderstorm": "img/thunderstorm.png",
  "wind": "img/wind.png"
};
/////////////////
// Days of the week
/////////////////
var days = {
  0: "Mon",
  1: "Tues",
  2: "Wed",
  3: "Thur",
  4: "Fri",
  5: "Sat",
  6: "Sun",
  7: "Mon"
};
/////////////////////////
// Retreive Current Temp
/////////////////////////
var currentName;
function retreiveCurrentTemp(data) {
  var name = data.currently.icon;
    for (var property in icons) {
    if (icons.hasOwnProperty(data.currently.icon)) {
        currentName = name;
        $('#summary').html("<strong>" +data.currently.summary + "</strong>");
        $('#temperature').html(Math.round(data.currently.temperature)+"&#176");
        console.log(icons[name]);
        $('#currentWeather').append("<img id='currentWeatherIcon' src='"+ icons[name] +"'>");
        return;
    }
  }
}
//////////
// F to C
//////////
var fahrenheit = false;
$('#c').on('click', function(){
  if(!fahrenheit) {
    $('.temp').each(function(i, obj) {
    var curTemp = $(this).html();
    var toCel = (parseInt(curTemp) - 32)/1.8;
    $(this).html(Math.round(toCel.toString())+"&#x2109");
    fahrenheit = true;
    });
  }
});

//////////
// C to F
//////////
$('#f').on('click', function(){
  if(fahrenheit) {
    $('.temp').each(function(i, obj) {
    var curTemp = $(this).html();
    var toFah = (parseInt(curTemp) * 1.8) + 32;
    $(this).html(Math.round(toFah.toString())+"&#176;");
    fahrenheit = false;
    });
  }
});

////////////////////////////
// Get weather
////////////////////////////
function weather(lat, lng) {
  $.ajax({                                 // HIDE THIS API KEY BEFORE LAUNCHING
      url: "https://api.darksky.net/forecast/ea51c0e9ee90a905091f7b35ec31d2b9/" + lat + ',' + lng + "/", // src
      type: 'GET',
      data: {}, // Additional parameters
      dataType: 'jsonp',
      success: function(data) {
        retreiveCurrentTemp(data);
        $("#forecast").empty();
        $("#currentWeatherIcon").empty();
        for(var i = 0;i<data.daily['data'].length;i++) {
          var thisIcon = icons[data.daily['data'][i].icon];
          console.log(thisIcon);
          $('#forecast').append("<div class='day'>" +
                                  "<p><strong>" + days[i] + "</strong></p>" +
                                  "<p class='temp'>" + Math.round(data.daily['data'][i].temperatureMax) + "&#176 </p>" +
                                  "<p class='temp'>" + Math.round(data.daily['data'][i].temperatureMin) + "&#176 </p>" +
                                  "<img class='forecastIcon' src='"+ thisIcon +"'>" +
                                "</div>");

        }



        console.log(data);
      },
      error: function(err) {
        alert(err);
      }
  });
}

