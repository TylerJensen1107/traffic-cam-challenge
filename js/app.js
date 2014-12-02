// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box
var apiKey = "AIzaSyDO7Pus2PDjH66QhK_zIakk5vm1_K71lOA"

$( document ).ready(function() {
	var markers = [];

  	var mapOptions = {
         center: { lat: 47.6, lng: -122.3},
         zoom: 12
    };

    //initialize the map
    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    var infowindow = new google.maps.InfoWindow({
    });
	var json = $.getJSON( "http://data.seattle.gov/resource/65fc-btcc.json", function( data ) {
		for(var i = 0; i < data.length; i++) {
			//Create the marker, store the relevant data
			var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(data[i].ypos, data[i].xpos),
			    map: map,
			    cameralabel: data[i].cameralabel,
			    imgsrc: data[i].imageurl.url
			});
			//Push marker into the array, this is later used for the search
			markers.push(marker);

			//Add click listening to markers
			google.maps.event.addListener(marker, 'click', function() {
		    	map.panTo(this.getPosition());
		    	infowindow.open(map, this);
		    	infowindow.setContent('<p>' + this.cameralabel + '</p><img src = "'+ this.imgsrc + '" />');
		    	console.log(this);	    	
		    });
		}
        
	}).fail(function(err) {
		alert("Error : " + err);
	});

	//On search, filter markers
	$('#search').bind("search keyup", function() {
		var searchString = this.value.toLowerCase();
		for(var i = 0; i < markers.length; i++) {
			var currentMarker = markers[i];
			if (currentMarker.cameralabel.toLowerCase().indexOf(searchString) !== -1) {
				currentMarker.setMap(map);
			} else {
				currentMarker.setMap(null);
			}
		}

	})

});