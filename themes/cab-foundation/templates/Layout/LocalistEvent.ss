<div class="row">
	<div class="small-12 columns">
		<div class="row">
			<div class="small-12 columns">
				<h2>$Title </h2>
			</div> 
		</div>
	</div>
</div>
<div class="row event-head">
	<section class="small-12 medium-6 large-6 columns">
		<div id="header-bg-image" style="background-image: url('$Image.URL');"></div>			 
	</section>
	<section class="small-12 medium-6 large-3 columns">
		<div class="row when-where">
			<div class="small-12 where">
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
		</div>
	</section>
	<section class="small-12 medium-6 large-3 columns">
		<div class="row when-where">
			<div class="small-12 columns when">
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
	</section>
</div>
<div class="row" id="content" >
	<div class="small-12 medium-7 columns end">
		$Content
		$Form
	</div>
</div>

