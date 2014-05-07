$(document).ready(function() {

    /*var latitude = "37.424123";
    var longitude = "-122.103233";*/

    var latitude;
    var longitude;
    var weatherData;

    var weatherAPI = "https://api.forecast.io/forecast/";
    var apiKey = "047a228973952d4d1076f8d0f2968744";

    var geoNamesAPI = "http://api.geonames.org/findNearbyPlaceNameJSON?cities=cities1000"

    // $('#GetData').click(function(){
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getPosition,showGeoError);
        $('#debug').append("<p>Got location</p>");
      }
      else {
        $('#Location').html("Geolocation is not supported by this browser.");
      };
    // });

    function getPosition(position){
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      $('#Location').html("Latitude: " + latitude + "<br>Longitude: " + longitude);
      $('#debug').append("<p>function getPosition</p>");

      $('#debug').append("<p>enter function getWeather</p>");
      getWeather();

      $('#debug').append("<p>enter function getCity</p>");
      getCity();
    }

    function getCity(){
      $.getJSON( geoNamesAPI + "&lat=" + latitude + "&lng=" + longitude + "&username=byroncheng", function(data) {
        locationName = data;
        cityName = data.geonames[0].toponymName;
        console.log(locationName);
        $('#Location').append("<p>"+cityName+"</p>");
      })
      $('#debug').append("<p>exit function getCity</p>");
    }


    function showGeoError(error)
      {
      switch(error.code) 
        {
        case error.PERMISSION_DENIED:
          $('#Location').html("<p>User denied the request for Geolocation.</p>");
          break;
        case error.POSITION_UNAVAILABLE:
          $('#Location').html("<p>Location information is unavailable.</p>");
          break;
        case error.TIMEOUT:
          $('#Location').html("<p>The request to get user location timed out.</p>");
          break;
        case error.UNKNOWN_ERROR:
          $('#Location').html("<p>An unknown error occurred.</p>");
          break;
        }
      }

    // Manually show weather data
    $('#ShowData').click(function() {
        getWeather();
    });

    // Use Forecast.io API to get JSON representation of weather data
    function getWeather(){
      
      $.getJSON(weatherAPI + apiKey + "/" + latitude + "," + longitude + "?callback=?", function(data) {
        weatherData=data;
        displayWeather(weatherData);
        console.log(weatherData);
        $('#debug').append("<p>exit function getWeather</p>");
      }
    )}

    // Displays weather data on the page
    function displayWeather( data ){
      $('#Weather').html(
        'Right now it\'s ' + Math.round(data.currently.temperature) + '&#176; F'
        +'<br>The current possibility of precipitation is '+ data.currently.precipProbability*100
        +'%<br>The current conditions are ' + data.currently.icon
        + '<p>' + getPrecipType() + '<br>' + getWeatherAlert() + '</p>'
        );
    }

    // Gets and displays precipitation data
    function getPrecipType(){
      if ( weatherData.currently.precipIntensity != 0) {return 'The current preciptiation type is ' + weatherData.currently.precipType;}
      else {return 'It is not precipitating';}
    }

    // Gets and displays weather alerts
    function getWeatherAlert(){
      if (typeof weatherData.alerts != 'undefined') {return '<div class="alert">' + weatherData.alerts.title + '</div>';}
      else {return 'No active weather alerts';}
    }

  });
