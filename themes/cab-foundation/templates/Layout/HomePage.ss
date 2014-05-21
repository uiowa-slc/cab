<div id="top-content" class="row">
	<!-- LEFT COLUMN -->
 	<div class="medium-7 large-7 columns">  
 		<div data-equalizer-watch>
<<<<<<< HEAD
 			<% cached %>
 			<% if SliderEvents || $AfterClassEvents %>
				<ul class="orbit-slider" data-orbit data-options="animation:fade; resume_on_mouseout:true;">
					<% if SliderEvents %>
						<% loop SliderEvents %>
							<% include SliderEvent %>
						<% end_loop %>
					<% else %>
						<% loop $AfterClassEvents %>
							<% include SliderEvent %>
						<% end_loop %>
					<% end_if %>
				</ul>
			<% end_if %>       
		<!-- NEXT UP -->

		<div id="next-up">
			<h2>$NextUp</h2>	
			<ul id="next-up-list">
				<% loop AfterClassEvents.Limit(6) %>
				<a href="$Link" target="_blank"><li>
					<span class="event-title">$Title</span><p><% include ACDateLocation %></p>
				</li></a>
				<% end_loop %> 
			</ul>			
			<ul class="button-group">
			  <li><a href="events/" class="tiny button radius" target="_blank">view all movies and events</a></li>
			</ul>
		</div>
=======
 		<% cached %>
 			<% if AfterClassEvents %>
	 		<% include HomePageSlider %>
			<% include HomePageEventList %>
			<div class="addInfo">
				<p>$AdditionalInfo</p>
			</div>
			<% else %>
			<div class="noEvents">
				<p> $NoEvents </p>
			</div>
			<% end_if %>
>>>>>>> 785574376e9c12dd43a558e7c79f1b7a503f3b46
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
