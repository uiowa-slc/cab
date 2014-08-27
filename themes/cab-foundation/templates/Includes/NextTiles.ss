<% with $Calendar %>
<% if EventList %>
<div class="row scooch-down" id="next-tiles" >
	<div class="small-12 columns">
		<ul class="tiles small-block-grid-2 medium-block-grid-4 large-block-grid-6">
			<li>
				<div class="live-tile" data-mode="flip" id="up-next">
					<div>
						<h2>Coming up: </h2>
					</div>
					<div>
						<h2>Cool Events</h2>
					</div>
				</div>
			</li>
			<% loop EventList.limit(11) %>
				<%--<li data-tooltip data-options="disable_for_touch:true" class="has-tip" title="<h4>$Title</h4><% if $Venue %> at $Venue.Title $Location <% end_if %>">
				--%>

			<li>
				<div class="live-tile" data-mode="flip">
				<a href="$Link">
				<div class="tile-bg-image" style="background-image: url('$Image.URL');">
				</div>
				</a>
				<a href="$Link">
				<div>
					<h4>
					<span>$Title</span>
					</h4>
				</div>
				</a>
				</div>
			</li>
			<% end_loop %> 
		</ul>
	</div>
</div>
<% end_if %>
<% end_with %>