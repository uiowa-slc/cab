<li>
    <a href="{$Link}" target="_blank" class="image-container" style="background-image: url('{$Image.URL}');"></a>
    <h3 class="event-title"><a href="{$Link}" target="_blank">$Title.LimitCharacters(50)</a></h3>
    <p class="date-location">
        <span class="next-date-time">$NextDateTime.Format("D, F j") $NextDateTime.Time</span> <span class="location"><% if $Location %>at $Location<% end_if %><% if $Venue %>, $Venue.Title<% end_if %> <% if $DateTimeCount > "1" %><a href="$Link">(more times)</a><% end_if %></span>

        <% if $FacebookEventLink %><a href="$FacebookEventLink" class="facebook" target="_blank">View Facebook Event</a><% end_if %>
    </p>
</li>