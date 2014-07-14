<li>
    <a href="{$Link}" target="_blank"><img src="$ImageURL" alt="Photo for $Title" /></a>
    <h3 class="event-title"><a href="{$Link}" target="_blank">$Title.LimitCharacters(50)</a></h3>
    <p class="event-types">tagged as: $EventTypes</p>
    <p class="date-location">
        <span class="next-date-time">Next Date: $NextDateTime.Format("D, F j") $NextDateTime.Time</span> <span class="location"><% if $Location %>at $Location<% end_if %><% if $Venue %>, $Venue<% end_if %> <% if $DateTimeCount > "1" %><a href="$Link">(more times)</a><% end_if %></span>

        <% if $FacebookEventLink %><a href="$FacebookEventLink" class="facebook" target="_blank">View Facebook Event</a><% end_if %>
    </p>
</li>