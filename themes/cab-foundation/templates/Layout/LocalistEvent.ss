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
	<section class="small-12 medium-6 large-7 columns">
		<div id="header-bg-image" style="background-image: url('$Image.URL');"></div>			 
	</section>
	<section class="small-12 medium-6 large-5 columns">
		<% if $Venue %>
			<% with $Venue %>
			<div class="map-container">
				<div id="mini-map" style="width: 100%; height: 100%;"  data-link="$Link" data-lat="$Latitude" data-lng="$Longitude" data-address="$Address" data-title="$Title.LimitCharacters(20)"></div>
			</div>
			<h4><span> Happening at:</span>  the $Title </h4>
			<% end_with %>
		<% else %>
		<div><p>No location information provided</p></div>
		<% end_if %>
		<% if $Dates %>
			<h4><span> Next Date:</span>  <% loop $Dates.limit(1) %>  $Format(l), $Format(F j) at $Format(g):$Format(i) $Format(A)<% end_loop %> </h4>
			<a href="#" class="tiny button" data-dropdown='more-dates'>See all upcoming dates</a>
			<div id="more-dates" data-dropdown-content class="f-dropdown content">
				<ul>
				<% loop $Dates.limit(11) %>
				<li>$Format(l), $Format(F j)</li>
				<% end_loop %>
				</ul>
			</div>
			<% else %>
			<div><p>No Date Information provided</p></div>
		<% end_if %>					
	</section>
</div>
<div class="row" id="content" >
	<div class="small-12 medium-6 large-7 columns">
		$Content
		$Form
	</div>
	<div class="small-12 medium-6 large-5 columns">
		<div class="row">
   			<div class="large-3 columns show-for-large-up committee-image"><img src="themes/cab-foundation/images/committees/comedy.png"></div>
   		 	<div class="large-9 columns">
   		 		<h3 class="comedy">Comedy</h3>
				<p>The Comedy committee brings top acts from across the country! You may see these comedians on <em>VH1</em>, <em>Comedy Central</em>, or <em>Last Comic Standing</em>. We guarantee you will be laughing until your sides hurt!</p>
			</div>
		</div>			
	</div>
</div>
<%-- included in page.ss
<% include NextTiles %>
--%>

