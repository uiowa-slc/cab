<% if EventList %>
<div class="row" id="next-tiles" >
	<div class="small-12 columns">
		<ul class="next-tiles tiles small-block-grid-4 medium-block-grid-4 large-block-grid-6" style="margin-bottom: 1em;">
			<li class="live-tile" data-mode="flip" id="up-next">
				<div>
					<h2>Coming up next:</h2>
				</div>
				<div>
					<h2>Cool Events</h2>
				</div>
			</li>
			<% loop EventList.limit(5) %>
				<%--<li data-tooltip data-options="disable_for_touch:true" class="has-tip" title="<h4>$Title</h4><% if $Venue %> at $Venue.Title $Location <% end_if %>">
				--%>
			<li class="live-tile" data-mode="flip">
				<div class="tile-bg-image" style="background-image: url('$Image.URL'); width: 100%;">
				</div>
				<div>
					<h4><a href="$Link">$title</a></h4>
				</div>
			</li>
			<% end_loop %> 
		</ul>
	</div>
</div>
<% end_if %>