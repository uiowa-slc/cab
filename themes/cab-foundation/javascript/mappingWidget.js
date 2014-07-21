function GetLocation(address) {
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({ 'address': address }, function (results, status) {
	  if (status == google.maps.GeocoderStatus.OK) {
	    //ParseLocation(results[0].geometry.location);
	    return results[0].geometry.location;
	  } else {
	    alert('error: ' + status);
	  }
	});
}
  
function initialize() {
  
    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
	var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

	// Create a map object, and include the MapTypeId to add
	// to the map type control.
	var mapOptions = {
	    zoom: 15,
	    scrollwheel: false,
	    draggable: true,
	    panControl: false,
	    center: new google.maps.LatLng(55.6468, 37.581),
	    mapTypeControlOptions: {
	      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
	    }
	  };

	jQuery('#mini-map').each(function(index, element) {
		var name = jQuery(this).data("title");
		var lat = jQuery(this).data("lat");
		var lng = jQuery(this).data("lng");
		var address = jQuery(this).data("address");
		var venueLatLng;
		var venue = this;

		if (lat && lng) {
			var place = new google.maps.LatLng(lat, lng);
			mapOptions['center'] = place;
			//var myOptions = {zoom: 16, center: place, mapTypeId: google.maps.MapTypeId.ROADMAP };
	   		var map = new google.maps.Map(document.getElementById("mini-map"),mapOptions);
	   		var geomarker = new google.maps.Marker({ map: map, position: place });
		    map.mapTypes.set('map_style', styledMap);
		    map.setMapTypeId('map_style');
		} else {
	    	var geocoder = new google.maps.Geocoder();
	  		geocoder.geocode({ 'address': address }, function (results, status) {
		        if (status == google.maps.GeocoderStatus.OK) {
			        place = results[0].geometry.location;
			        mapOptions['center'] = place;
			        var map = new google.maps.Map(document.getElementById("mini-map"),mapOptions);
			        var geomarker = new google.maps.Marker({ map: map, position: place });  
					map.mapTypes.set('map_style', styledMap);
					map.setMapTypeId('map_style');
		      	}
		    });
	    }
	});
}

window.onload = initialize();