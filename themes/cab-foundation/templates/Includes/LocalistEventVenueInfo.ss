<% if $Venue.Title %>
	<% with $Venue %>
		<div class="map-container">
			<div id="mini-map" style="width: 100%; height: 100%;"  data-link="$Link" data-lat="$Latitude" data-lng="$Longitude" data-address="$Address" data-title="$Title.LimitCharacters(20)"></div>
		</div>
		<h4><span> Happening at:</span> $Title </h4>
		<a class="button get-directions" href="$DirectionsLink" target="_blank">Get Directions</a>
		<a href="$LocalistLink" class="button" target="_blank">More Events Here</a></p>
	<% end_with %>
<% else %>
	<div><p>No location information provided</p></div>
<% end_if %>