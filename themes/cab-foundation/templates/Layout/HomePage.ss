<div id="top-content" class="row">
 	<div class="medium-8 large-8 columns"> 
 		<% with $Calendar %>
 		<% if $EventList %>
	 		<% include HomePageFeaturedEvents %>
	 		<hr />
			<% include HomePageEventList %>
			<div class="addInfo">
				<p>$AdditionalInfo</p>
			</div>
		<% else %>
			<div class="no-events">
				$NoEvents
			</div>
		<% end_if %>
 		<% end_with %>
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

<style>
	<%--<% loop $EventList %>
		#next-up-list .event-{$ID}:hover .bg{
			background-image: url('$Image.URL');
				-webkit-filter: blur(0px);
			  -moz-filter: blur(0px);
			  -o-filter: blur(0px);
			  -ms-filter: blur(0px);
			  filter: blur(0px)		
		}

		#next-up-list .event-{$ID} .bg{
			background-image: url('$Image.URL');
			-webkit-filter: blur(5px);
			  -moz-filter: blur(5px);
			  -o-filter: blur(5px);
			  -ms-filter: blur(5px);
			  filter: blur(5px);
		}
	}
	<% end_loop %>--%>
</style>