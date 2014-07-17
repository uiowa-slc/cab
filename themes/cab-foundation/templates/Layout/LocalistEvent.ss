<div id ="content" class="row">
	<article class="large-7 columns">
		<div class = "row">
			<img src='$Image.URL' style='' />
		</div>
		<div class = "row">
			<div class= "small-12 columns">
				<h2>$Title </h2> 
			</div>
		</div>
		<div class= "row">
			<div class = "small-12 columns">
				<% if $URLSegment == 'contact' %><h3 class="contactInfo">145 Iowa memorial Union </br> cab@uiowa.edu</h3> 
				<% else %>
				$Content
				$Form
				<% end_if %>
			</div>
		</div>
		<div class="row single-event-details">
			<div class="small-12 medium-6 large-4 columns">
				<% if $Venue %>
				<% with $Venue %>
				<div> Happening at $Title</div>
				<% end_with %>
				<% else %>
				<div><p>No location information provided</p></div>
				<% end_if %>
			</div>
			<div class="small-12 medium-6 large-4 columns">
				<% if $Dates %>
				<div> on
				<% loop $Dates %>
				<p>$Format(l), $Format(F j)</p>
				<% end_loop %>
				</div>
				<% else %>
				<div><p>No Date Information provided</p></div>
				<% end_if %>
			</div>
			<div class="small-12 medium-6 large-4 columns">
				$ID
			</div>
		</div>
	</article>
	<div class="large-5 columns">
		<% include NextTiles %>
	</div>
</div>