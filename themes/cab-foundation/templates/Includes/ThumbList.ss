<ul class="small-block-grid-2 medium-block-grid-3 large-block-grid-4">
	<% loop RSSDisplay(99,"http://afterclass.uiowa.edu/events/categoriesrss/cab") %>
	<li data-tooltip data-options="disable_for_touch:true" class="has-tip" title="<h4>$Title</h4><span>$Dates</span><% if $Location %> at $Location <% end_if %>">
		<a class="th" href="$Link"><img style="margin: 0 auto;" src="http://dummyimage.com/200x200/000/fff.jpg&text=Testing+123+Testing+123" /></a>
	</li>
	<% end_loop %> 
</ul>
