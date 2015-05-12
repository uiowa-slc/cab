<% if $FeaturedEvents || $EventsList %>
	<% if $FeaturedEvents %>

		<% if $FeaturedEvents.Count == 1 %>
				<% loop $FeaturedEvents.Limit(1) %>
					<% include EventCardLarge %>
				<% end_loop %>

		<% else_if $FeaturedEvents.Count == 3 %>
			<% loop $FeaturedEvents.Limit(1) %>
				<% include EventCardLarge %>
			<% end_loop %>
			<ul class="event-list small-block-grid-1 medium-block-grid-2">
				<% loop $FeaturedEvents.Limit(2,1) %>
					<% include EventCard %>
				<% end_loop %>
			</ul>

		<% else %>
			<ul class="event-list small-block-grid-1 medium-block-grid-2">
				<% loop $FeaturedEvents.Limit(4) %>
					<% include EventCard %>
				<% end_loop %>
			</ul>
		<% end_if %>

	<% else %>
		<ul class="event-list small-block-grid-1 medium-block-grid-2">
		<% loop $EventList.Limit(4) %>
			<% include EventCard %>
		<% end_loop %>
		</ul>
	<% end_if %>

<% else %>
	
	$NoEvents

<% end_if %>       