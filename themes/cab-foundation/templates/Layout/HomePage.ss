<div id="top-content" class="row">
 	<div class="medium-8 large-8 columns"> 
 		<% if $AfterClassEvents %>
	 		<% include HomePageSlider %>
			<% include HomePageEventList %>
			<div class="addInfo">
				<p>$AdditionalInfo</p>
			</div>
		<% else %>
			<div class="no-events">
				$NoEvents
			</div>
		<% end_if %>
        <% include PinterestWidget %>
		
	</div><!-- END LEFT COLUMN -->
	<!-- Right Column -->
	<div class="medium-4 end large-4 columns">
		<% include FacebookWidget %>
		 <% include SocialMediaButtons %>
		<% include HomePageFeatureBox %>
 		<% include TwitterWidget %>
	</div>
</div><!-- end top-content -->     
