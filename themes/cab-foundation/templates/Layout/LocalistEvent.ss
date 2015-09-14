<div class="row">
	<div class="large-12 medium-centered columns">
		<div id="header-bg-image" style="background-image: url('$Image.URL');"></div>
	</div>

</div>

<div class="row" id="content">
	<div class="large-10 columns large-centered">

		<div class="row">
			<% if $Venue.Title || $Location %>
				<div class="large-8 columns">
			<% else %>
				<div class="large-12">
			<% end_if %>
				<h2>$Title</h2>
				<% include LocalistEventDate %>
				<p>Cost: $Cost</p>
				$Content
			</div>

			<% if $Venue.Title || $Location %>
			<div class="large-4 columns">
				<div class="event-details">
					<% include LocalistEventVenueInfo %>
				</div>
			</div>
			<% end_if %>
		</div>
	</div>

</div>

<% include NextTiles %>


