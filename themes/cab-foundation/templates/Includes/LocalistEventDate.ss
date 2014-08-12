<div class="event-dates">
	<% if $Dates %>
		<h4><span> Next Date:</span>  <% loop $Dates.limit(1) %>  $Format(l), $Format(F j) at $Format(g):$Format(i) $Format(A)<% end_loop %> </h4>
		<% if $Dates.Count > 1 %><a href="#" class="tiny button" data-dropdown='more-dates'>See all upcoming dates</a><% end_if %>
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
</div>