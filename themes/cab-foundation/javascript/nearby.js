var markerArray = [];
var infowindow = new google.maps.InfoWindow({
	content: "holding...",
	maxWidth: 340
	});	
var iowaCity = new google.maps.LatLng(41.661736, -91.540017);
var	countVenue = 0;
var venueFromMe = {};
var venueCount = jQuery("#venuesWithEvents section").length;


function makeMarker(options){
   var pushPin = new google.maps.Marker({map:map});
   pushPin.setOptions(options);
   google.maps.event.addListener(pushPin, 'click', function(){
     infoWindow.setOptions(options);
     infoWindow.open(map, pushPin);
   });
   markerArray.push(pushPin);
   return pushPin;
}

function pinAndDist(initLocal, venueLatLng, venue) {
	var venueDistance = google.maps.geometry.spherical.computeDistanceBetween(initLocal, venueLatLng);	
	var venueID = venue.id;
	var venueName = jQuery('#' + venueID).data("title");
	var venueLink = jQuery('#' + venueID).data("link");
		venueFromMe[venueID] = venueDistance;		
	var marker = new google.maps.Marker({
			position: venueLatLng,
			map: map
		});				    
	var eventsHere = [];
	var eventsHereString = '';
	var eventBubbleString = '';
	
	eventsHere.push("<a class='button tag' href='" + venueLink + "'>" + venueName + "</a>");
	
	jQuery(venue).children('div').each(function(index, Element) {
		var eventTitle = jQuery(this).data('title');
		var eventImage = jQuery(this).data('image');
		var eventCancel = jQuery(this).data('cancel');
		var eventLink = jQuery(this).data('link');
		var eventCost = jQuery(this).data('cost');
		var startDate = jQuery(this).data('startdate');
		var startTime = jQuery(this).data('starttime');	

		var eventStringSeg = 
		"<div> <h3> <a href='" + eventLink + "'>" + eventTitle + "</a> </h3> <ul class='infobox-list'>" + 
			"<li>" + startDate + ", " + startTime + ((eventCost  !== "") ? ", Cost: " + eventCost : "") + "</li>" 
			+ "</ul></div>";
				
		eventsHere.push(eventStringSeg);
	});
	
	eventsHereString = eventsHere.join(' ');
	eventBubbleString = 
		"<div class='event_bubble'>" +
		eventsHereString +
		"</div>";

    google.maps.event.addListener(marker, 'click', function () {
  		infowindow.setContent(eventBubbleString);
  		infowindow.open(map, this);	
  		//infowindow.maxWidth(200);
	});
	
	if(countVenue == venueCount) {
		var nearestVenues = [];
		for (var venueID in venueFromMe) {
			nearestVenues.push([venueID, venueFromMe[venueID]])
		}	
		nearestVenues.sort(function(a,b) {return a[1] - b[1]})
		for (var v=0; v < nearestVenues.length; v++) {
			//console.log('sorting...');
			var vid = nearestVenues[v];
			jQuery("#venuesWithEvents").append( jQuery("#" + vid) );
		}
	}		
}

function venueGen(initLocal, callback) {			
	jQuery('.venue').each(function(index, element) {
		var title = jQuery(this).data("title");
		var lat = jQuery(this).data("lat");
		var lng = jQuery(this).data("lng");
		var address = jQuery(this).data("address");
		var venueLatLng;
		var venueDistance;
		var venue = this;
		
		if(lat && lng) {
			countVenue = ++countVenue;
			venueLatLng = new google.maps.LatLng(lat, lng);
			callback(initLocal, venueLatLng, venue);
		} else {
			geocoder.geocode( { 'address': address}, function(results, status) {
				countVenue = ++countVenue;
				if (status == google.maps.GeocoderStatus.OK) {
					venueLatLng = results[0].geometry.location;
					callback(initLocal, venueLatLng, venue);
				}				
			});
		}			
	});	
}

function getInitLocal(callback) {
	var initialLocation;
	//DON'T CHANGE IDs in NearMePage.ss
	if(navigator.geolocation) {
		//console.log("Browser DOES support Geolocation");
	    var browserSupportFlag = true;
	    navigator.geolocation.getCurrentPosition(function(position) {
			initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			//initialLocation = new google.maps.LatLng(41.664468, -91.535157)
			var distanceFromInitialLocation = google.maps.geometry.spherical.computeDistanceBetween(initialLocation,iowaCity);	
			// If the current position is too far away from Iowa City, just default to centering around Iowa City	
			if (distanceFromInitialLocation < 32186.9) {
				map.setCenter(initialLocation);
				var image = 'themes/afterclass2/images/position-indicator.png';
				var initalMarker = new google.maps.Marker({
					position: initialLocation,
					map: map,
					icon: image
				});  
				initalMarker.setMap(map);
				//$('#mapStart').prepend("Your location is indicated on the map with this icon: ");
				//$('#mapStart').append("<img src='themes/afterclass2/images/position-indicator.png' />");
				//$('#mapMark').prepend("To see nearby, upcoming events, touch a marker: ");
				//$('#mapMark').append("<img src='themes/afterclass2/images/marker.png' />");
			} else {
				$('#mapLoaded').text("You're too far away from Iowa City. Here are events in Iowa City");
			}
			callback(initialLocation, pinAndDist);								  
	    }, function() {
	      handleNoGeolocation(browserSupportFlag);
	    });	     
	} else {
		// Browser does not support Geolocation
		//console.log("Browser doesn't support Geolocation");
	    browserSupportFlag = false;
	    var initialLocation = handleNoGeolocation(browserSupportFlag);
	}	
}

function genMap() {
	// map generation
	// Create an array of styles.
	
	var geocoder = new google.maps.Geocoder();	
	var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
    var mapcanvas = document.createElement('div');	
		mapcanvas.id = 'mapcanvas';
		mapcanvas.class = 'map-canvas';
		mapcanvas.style.width = '100%';	
	jQuery('.NearMePage .map-container').append(mapcanvas);
	var nearMeMapOptions = {
	    zoom: 15,
	    center: iowaCity,
	    panControl: false,
	    mapTypeControl: false,
	    //navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
	    disableDefaultUI: false,
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    streetViewControl: false,
	    zoomControlOptions: {
    		position: google.maps.ControlPosition.LEFT_BOTTOM
  		}
	};
	map = new google.maps.Map(document.getElementById("mapcanvas"), nearMeMapOptions);
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
	
	getInitLocal(venueGen);
	
}

function handleNoGeolocation(errorFlag) {   	
	initialLocation = iowaCity;
    map.setCenter(initialLocation);
    $('#status').text("Your location couldn't be detected. Showing events in Iowa City.");
    return initialLocation;
}  

function error(msg) {
  var s = document.querySelector('#status');
  s.innerHTML = typeof msg == 'string' ? msg : "failed";
  s.className = 'fail';
}

$(document).ready(function() {
	if( $('.NearMePage .map-container').length ){
		genMap();
	}
});