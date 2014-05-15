<div id="top-content" class="row">
	<!-- LEFT COLUMN -->
 	<div class="medium-7 large-7 columns">  
 		<div data-equalizer-watch>
 		<% cached %>
 			<% if AfterClassEvents %>
	 		<% include HomePageSlider %>
			<% include HomePageEventList %>
			<div class="addInfo">
				<p>$AdditionalInfo</p>
			</div>
			<% else %>
				<p> There are no events! </p>
			<% end_if %>
		<% end_cached %>
        <% include SocialMediaButtons %>
        <% include PinterestWidget %>
	</div>
		
	</div><!-- END LEFT COLUMN -->
	<!-- Right Column -->
	<div class="medium-5 end large-5 columns">
		<% include FacebookWidget %>
		<% include HomePageFeatureBox %>
 		<% include TwitterWidget %>
	</div>
</div><!-- end top-content -->     
