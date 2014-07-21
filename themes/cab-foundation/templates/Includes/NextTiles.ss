<% if EventList %>
<div class="row" id="next-tiles" >
	<div class="small-12 columns">
		<ul class="next-tiles small-block-grid-4 medium-block-grid-4 large-block-grid-6" style="margin-bottom: 1em;">
			<li><h2>Coming up next:</h2></li>
			<% loop EventList.limit(5) %>
				<%--<li data-tooltip data-options="disable_for_touch:true" class="has-tip" title="<h4>$Title</h4><% if $Venue %> at $Venue.Title $Location <% end_if %>">
				--%>
			<li>
				<button class="tile-bg-image" href="$Link" target="_blank" style="background-image: url('$Image.URL'); width: 100%;"><%--<img style="margin: 0 auto;" src="$Image.URL" />--%></button>
			</li>
			<% end_loop %> 
		</ul>
	</div>
</div>
<% end_if %>