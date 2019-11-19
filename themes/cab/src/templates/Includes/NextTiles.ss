<% with $Calendar %>
	<% if EventList %>
		<div class="row">
			<div class="large-12 columns">
			<hr />
				<h2 class="text-center">Next up:</h2>
				 <ul class="event-list xlarge-block-grid-4 large-block-grid-3 medium-block-grid-2 small-block-grid-1">
		            <% loop $EventList %>
		                <% include EventCard %>
		            <% end_loop %>
		        </ul>
	        </div>
        </div>
	<% end_if %>
<% end_with %>