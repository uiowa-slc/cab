<div id ="content" class="row">
	<article class="large-7 columns">
		<div class = "row">
			<img src='$Image.URL' />
		</div>
		<div class="row">
			<div class= "small-12 columns">
				<h2>$Title </h2> 
			</div>
		</div>
		<div class="row contentrow">
			<div class = "small-12 columns">
				<% if $URLSegment == 'contact' %><h3 class="contactInfo">145 Iowa memorial Union </br> cab@uiowa.edu</h3> 
				<% else %>
				$Content
				$Form
				<% end_if %>
			</div>
		</div>
		<div class="row when-where">
			<div class="small-12 medium-6 large-6 columns where">
				<% if $Venue %>
					<% with $Venue %>
					<h5> Happening at the $Title</h5>
					<div class="map-container">
						<div id="mini-map" style="width: 100%; height: 100%;"  data-link="$Link" data-lat="$Latitude" data-lng="$Longitude" data-address="$Address" data-title="$Title.LimitCharacters(20)"></div>
					</div>
					<% end_with %>
				<% else %>
				<div><p>No location information provided</p></div>
				<% end_if %>
			</div>
			<div class="small-12 medium-6 large-6 columns when">
				<% if $Dates %>
				<h5> on </h5>
				<ul>
				<% loop $Dates.limit(11) %>
				<li>$Format(l), $Format(F j)</li>
				<% end_loop %>
				</ul>
				<% else %>
				<div><p>No Date Information provided</p></div>
				<% end_if %>
			</div>
		</div>
	</article>
	<div class="large-5 columns">
		<% include NextTiles %>
	</div>
</div>