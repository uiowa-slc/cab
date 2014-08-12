<div id ="content" class = "row">
    <div id="interior" class="large-12 large-centered column">
		<h2>Upcoming Events</h2>
	   	<% if $EventList %>
        <ul class="event-list xlarge-block-grid-4 large-block-grid-3 medium-block-grid-2">
	            <% loop $EventList %>
                    <% include EventCard %>
	            <% end_loop %>
        </ul>
        <% else %>
        <div class="row">
            <div class="large-8 columns">
            	<% with Page("home") %>
                    $NoEvents
                <% end_with %>
            </div>
         </div>
        <% end_if %>
       
    </div>  
</div>