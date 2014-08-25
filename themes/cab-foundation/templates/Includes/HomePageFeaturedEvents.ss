<% if $FeaturedEvents || $EventsList %>
	<% if $FeaturedEvents %>
		<ul class="event-list small-block-grid-1 medium-block-grid-2">
			<% loop $FeaturedEvents.Limit(2) %>
				<% include EventCard %>
			<% end_loop %>
		</ul>
	<% else %>
		<ul class="event-list small-block-grid-1 medium-block-grid-2">
		<% loop $EventList.Limit(2) %>
			<% include EventCard %>
		<% end_loop %>
		</ul>
	<% end_if %>

<% else %>
	
	$NoEvents

<% end_if %>       