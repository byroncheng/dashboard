$(document).ready(function() {

    /*var latitude = "37.424123";
    var longitude = "-122.103233";*/

    var latitude;
    var longitude;
    var weatherData;

    var weatherAPI = "https://api.forecast.io/forecast/";
    var apiKey = "047a228973952d4d1076f8d0f2968744";

    $('#GetData').click(function(){
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getPosition);
      }
      else {
        $('#Location').innerHTML="Geolocation is not supported by this browser.";
      }
    });

    function getPosition(position){
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      $('#Location').html("Latitude: " + latitude + "<br>Longitude: " + longitude);
      getWeather();
    };

    function getWeather(){
      $.getJSON(weatherAPI + apiKey + "/" + latitude + "," + longitude + "?callback=?", function(data) {
        weatherData=data;
      }
    )}


    $('#ShowData').click(function() {
      $('#Weather').html(
        'The temperature is : ' + weatherData.currently.temperature
        +'<br>The possibility of precipitation is '+ weatherData.currently.precipProbability*100
        +'%<br>The current conditions are ' + weatherData.currently.icon
        + getPrecipType()
        );
    });

    function getPrecipType(){
      if (weatherData.currently.precipIntensity != 0) {return '<br>It is currently ' + weatherData.currently.precipType;}
      else {return "";}
    }



  });
