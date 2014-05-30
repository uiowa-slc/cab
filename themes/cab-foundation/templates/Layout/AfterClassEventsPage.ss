<div id ="content" class = "row">
    <div id="interior" class="large-12 large-centered column">
		<h2>Upcoming Events</h2>
	   	<% if AfterClassEvents %>
        <ul class="event-list xlarge-block-grid-4 large-block-grid-3 medium-block-grid-2">
	            <% loop AfterClassEvents %>
	                <li>
	                    <a href="{$Link}" target="_blank"><img src="$ImageURL" alt="Photo for $Title" /></a>
                        <h3 class="event-title"><a href="{$Link}" target="_blank">$Title.LimitCharacters(30)</a></h3>
                        <p class="event-types">tagged as: $EventTypes</p>
	                    <p class="date-location">
	                        <span class="next-date-time">Next Date: $NextDateTime.Format("D, F j") $NextDateTime.Time</span> <span class="location"><% if $Location %>at $Location<% end_if %><% if $Venue %>, $Venue<% end_if %> <% if $DateTimeCount > "1" %><a href="$Link">(more times)</a><% end_if %></span>
	
	                        <% if $FacebookEventLink %><a href="$FacebookEventLink" class="facebook" target="_blank">View Facebook Event</a><% end_if %>
	                    </p>
	                </li>
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