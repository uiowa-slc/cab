<div id="top-content" class="row">
	<!-- LEFT COLUMN, TOP -->
 	<div class="medium-6 large-6 columns">  
 		<div data-equalizer-watch>
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
		<% end_cached %>
		<!-- GET INVOLVED -->
		
        <div class="feature-box-content">
       		<h2>$RedLightHeadline</h2>
			$RedLightDescription         
        </div>
        <% include PinterestWidget %>
	</div>
		<!-- END NEXT UP -->
	</div><!-- END LEFT COLUMN, TOP -->
	<div class="medium-6 end large-6 columns">
		<% include FacebookWidget %>
		<% include SocialMediaButtons %>
 		<% include TwitterWidget %>
	</div>
</div><!-- end top-content -->     
