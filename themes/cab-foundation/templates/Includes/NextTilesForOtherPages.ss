<ul class="next-tiles small-block-grid-2 medium-block-grid-4 large-block-grid-5" style="margin-bottom: 1em;">
	<li><h2>Coming up next:</h2></li>
	<% loop AfterClassEvents("http://afterclass.uiowa.edu/events/categories/CAB/feed/json") %>
		<li data-tooltip data-options="disable_for_touch:true" class="has-tip" title="<h4>$Title</h4><span>$Dates</span><% if $Location %> at $Location <% end_if %>">
		<a class="th" href="$Link"><img style="margin: 0 auto;" src="$ImageURL" /></a>
	</li>
	<% end_loop %> 
</ul>
