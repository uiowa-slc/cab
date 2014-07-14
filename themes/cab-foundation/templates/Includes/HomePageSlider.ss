<% if SliderEvents || $AfterClassEvents %>
<div class="flexslider">
  <ul class="slides">
		<% if SliderEvents %>
			<ul class="event-list xlarge-block-grid-4 large-block-grid-3 medium-block-grid-2">
				<% loop SliderEvents %>
					<% include SliderEvent %>
				<% end_loop %>
			</ul>
		<% else %>
			<ul class="event-list xlarge-block-grid-4 large-block-grid-3 medium-block-grid-2">
				<% loop $AfterClassEvents.Limit(5) %>
					<% include SliderEvent %>
				<% end_loop %>
			</ul>
		<% end_if %>
  </ul>
</div>
<% end_if %>       