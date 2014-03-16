$(document).ready(function() {

    /*var latitude = "37.424123";
    var longitude = "-122.103233";*/

    var latitude;
    var longitude;

    $('#GetLoc').click(function(){
        if (navigator.geolocation){
          navigator.geolocation.getCurrentPosition(showPosition);
        }
        else {
            $('#Location').innerHTML="Geolocation is not supported by this browser.";
        }
    });

    function showPosition(position){
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      $('#Location').html("Latitude: " + latitude + 
      "<br>Longitude: " + longitude);    
    };


    var weatherAPI = "https://api.forecast.io/forecast/";
    var apiKey = "047a228973952d4d1076f8d0f2968744";

    $('#GetWeather').click(function() {
        $.getJSON(weatherAPI + apiKey + "/" + latitude + "," + longitude + "?callback=?", function(data) {
          $('#Weather').html('The temperature is : ' + data.currently.temperature +'<br>The possibility of precipitation is ' + data.currently.precipProbability*100 +'%');

        });
    });

});
