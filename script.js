$(document).ready(function() {
    var apiKey = "047a228973952d4d1076f8d0f2968744";
    var latitude = "37.424123";
    var longitude = "-122.103233";

    //var weatherAPI = "https://api.forecast.io/forecast/047a228973952d4d1076f8d0f2968744/37.424123,-122.103233";
    var weatherAPI = "https://api.forecast.io/forecast/";
    $('button').click(function() {
        //$.getJSON (weatherAPI)
        /*$.getJSON( weatherAPI, {apikey:apiKey, latitude:latitude, logitude:longitude, callback:"true"}, function( data ) {
          var items = [];
          $.each( data, function( key, val ) {
            items.push( "<li id='" + key + "'>" + val + "</li>" );
          });
    */

        $.getJSON(weatherAPI + apiKey + "/" + latitude + "," + longitude + "?callback=?", function(data) {
          $('#data').append('The temperature is : ' + data.currently.temperature);

    /*
              $( "<ul/>", {
                "class": "my-new-list",
                html: items.join( "" )
            }).appendTo( "body" );*/
        });
    });
/*
    .done(function( json ) {
        $("#data").append(json)
    });

    .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        $("#data").append( "Request Failed: " + err );
    });
*/
});
