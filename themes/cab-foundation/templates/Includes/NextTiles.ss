<div class="row">
	<div class="small-12 column">
		<hr>
		<ul class="small-block-grid-3 medium-block-grid-4 large-block-grid-6" style="margin-bottom: 1em;">
			<li><h2>Coming up next:</h2></li>
			<% loop RSSDisplay(99,"http://afterclass.uiowa.edu/events/categoriesrss/cab") %>
			<li data-tooltip data-options="disable_for_touch:true" class="has-tip" title="<h4>$Title</h4><span>$Dates</span><% if $Location %> at $Location <% end_if %>">
				<a class="th" href="$Link"><img style="margin: 0 auto;" src="http://dummyimage.com/200x200/000/fff.jpg&text=Testing+123+Testing+123" /></a>
			</li>
			<% end_loop %> 
		</ul>
	</div>
</div>
