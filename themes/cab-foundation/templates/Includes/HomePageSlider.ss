<% if SliderEvents || $AfterClassEvents %>
<div class="flexslider">
  <ul class="slides">
		<% if SliderEvents %>
			<% loop SliderEvents %>
				<% include SliderEvent %>
			<% end_loop %>
		<% else %>
			<% loop $AfterClassEvents.Limit(5) %>
				<% include SliderEvent %>
			<% end_loop %>
		<% end_if %>
  </ul>
</div>
<% end_if %>       