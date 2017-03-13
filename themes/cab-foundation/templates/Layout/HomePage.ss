<div id="top-content" class="row">
 	<div class="medium-8 large-8 columns"> 
 		<% with $Calendar %>
 		<% if $EventList %>
	 		<% include HomePageFeaturedEvents %>
			<% include HomePageEventList %>
			<div class="addInfo">
				$Top.AdditionalInfo
			</div>
		<% else %>
			<div class="no-events">
				$Top.NoEvents
			</div>
		<% end_if %>
 		<% end_with %>
 		<hr />
 		<% include InstagramWidget %>
		
	</div><!-- END LEFT COLUMN -->
	<!-- Right Column -->
	<div class="medium-4 end large-4 columns">
		<% include FacebookWidget %>
		<% include SocialMediaButtons %>
		<% include HomePageFeatureBox %>
 		<% include TwitterWidget %>
	</div>
</div><!-- end top-content -->