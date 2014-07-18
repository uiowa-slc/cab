<% if EventList %>
<ul class="next-tiles small-block-grid-2 medium-block-grid-2 large-block-grid-2" style="margin-bottom: 1em;">
	<li><h2>Coming up next:</h2></li>
	<% loop EventList.limit(11) %>
		<li data-tooltip data-options="disable_for_touch:true" class="has-tip" title="<h4>$Title</h4><% if $Venue %> at $Venue.Title $Location <% end_if %>">
		<button class="th tile-bg-image " href="$Link" target="_blank" style="background-image: url('$Image.URL');"><%--<img style="margin: 0 auto;" src="$Image.URL" />--%></button>
	</li>
	<% end_loop %> 
</ul>
<% end_if %>