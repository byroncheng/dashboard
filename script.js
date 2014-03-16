$(document).ready(function() {

    var apiKey = "047a228973952d4d1076f8d0f2968744";
    var latitude = "37.424123";
    var longitude = "-122.103233";

    $('#GetLoc').click(function(){
        if (navigator.geolocation){
          navigator.geolocation.getCurrentPosition(showPosition);
        }
        else {
            $('#Location').innerHTML="Geolocation is not supported by this browser.";
        }
    });

    function showPosition(position){
      $('#Location').innerHTML="Latitude: " + position.coords.latitude + 
      "<br>Longitude: " + position.coords.longitude;    
    };


    var weatherAPI = "https://api.forecast.io/forecast/";
    $('button').click(function() {
        $.getJSON(weatherAPI + apiKey + "/" + latitude + "," + longitude + "?callback=?", function(data) {
          $('#data').append('The temperature is : ' + data.currently.temperature);

        });
    });

});
