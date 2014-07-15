<% if SliderEvents || $AfterClassEvents %>
		<% if SliderEvents %>
			<ul class="event-list small-block-grid-1 medium-block-grid-2">
				<% loop SliderEvents.Limit(4) %>
					<% include EventCard %>
				<% end_loop %>
			</ul>
		<% else %>
			<ul class="event-list small-block-grid-1 medium-block-grid-2">
			<% loop $AfterClassEvents.Limit(4) %>
				<% include EventCard %>
			<% end_loop %>
			</ul>
		<% end_if %>

<% end_if %>       