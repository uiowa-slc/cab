<div class="row" id="content" >
	<div class="medium-7 large-8 columns">
		<div id="header-bg-image" style="background-image: url('$Image.URL');"></div>
		<h2>$Title</h2>
		<% include LocalistEventDate %>
		<p>Cost: $Cost</p>
		$Content
		<hr />
		<p><% if $FacebookEventLink %><a href="{$ParsedFacebookEventLink}" class="facebook button" target="_blank">Facebook Event</a><% end_if %><a href="{$AfterClassLink}" target="_blank" class="button after-class">View on After Class</a></p>
	</div>
	<div class="medium-5 large-4 columns">
		<div class="event-details">
			<% include LocalistEventVenueInfo %>
			
		</div>
		<hr />
		<% loop $Committees %>
			<div class="row committee $URLSegment">
	   		 	<div class="large-9 columns">
	   		 		<h3>$Title</h3>
					$CommitteeDescription
				</div>
	   			<div class="large-3 columns show-for-large-up committee-image">$RenderedImage</div>
			</div>
			<hr />
			<a href="committees/" class="button">See all Committees</a>
		<% end_loop %>		
	</div>
</div>
<% include NextTiles %>


