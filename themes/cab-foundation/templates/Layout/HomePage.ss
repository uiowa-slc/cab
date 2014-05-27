<div id="top-content" class="row">
 	<div class="medium-7 large-7 columns"> 
 		<% if $AfterClassEvents("CAB") %>
	 		<% include HomePageSlider %>
			<% include HomePageEventList %>
			<div class="addInfo">
				<p>$AdditionalInfo</p>
			</div>
		<% else %>
			<div class="no-events">
				<p> $NoEvents </p>
			</div>
		<% end_if %>

        <% include SocialMediaButtons %>
        <% include PinterestWidget %>
		
	</div><!-- END LEFT COLUMN -->
	<!-- Right Column -->
	<div class="medium-5 end large-5 columns">
		<% include FacebookWidget %>
		<% include HomePageFeatureBox %>
 		<% include TwitterWidget %>
	</div>
</div><!-- end top-content -->     
