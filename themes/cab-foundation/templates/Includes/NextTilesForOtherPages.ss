<% with $Calendar %>
<% if $EventList %>
<ul class="next-tiles small-block-grid-2 medium-block-grid-3" style="margin-bottom: 1em;">
	<li><h2>up next:</h2></li>
	<% loop EventList.Limit(11) %>
		<li data-tooltip data-options="disable_for_touch:true" class="has-tip" title="<h4>$Title</h4><% loop $Dates.Limit(1) %>
				<% include LocalistDateShortNoLinks %>
			<% end_loop %><% if $Location %> at $Location <% end_if %>">
		<a class="th" href="$Link" target="_blank"><img style="margin: 0 auto;" src="$Image.URL" /></a>
	</li>
	<% end_loop %> 
</ul>
<% end_if %>
<% end_with %>