<div id="top-content" class="row">
	<!-- LEFT COLUMN, TOP -->
 	<div class="medium-6 large-6 columns">  
 		<div data-equalizer-watch>
			<ul class="orbit-slider" data-orbit data-options="animation:fade; resume_on_mouseout:true;">
				<% loop RSSDisplay(6,"http://afterclass.uiowa.edu/events/categoriesrss/cab") %>
				<li>	
					<img src="$ImageURL" alt="slide 1" />
					<div class="orbit-caption">	
				         <a href="$Link"><span class="featurename">$Title</span><br>on $Dates at $Location</a>
					</div>
				</li>
				<% end_loop %>
			</ul>       
		<!-- NEXT UP -->
		<% if $EventList %>
		<div id="next-up">
			<h2>$NextUp</h2>	
			<ul id="next-up-list">
				<% loop RSSDisplay("20","http://afterclass.uiowa.edu/events/categoriesrss/CAB") %>
				<a href="$Link"><li>
					<span>$Title</span> $Dates <% if $Location %> at $Location <% end_if %>
				</li></a>
				<% end_loop %> 
			</ul>			
			<ul class="button-group">
			  <li><a href="{$BaseHref}/movies" class="tiny button radius">view all movies</a></li>
			  <li><a href="{$BaseHref}/events" class="tiny button radius">view all events</a></li>
			</ul>
		</div>	
	</div>
        <% else %>
        	<h4>No upcoming shows. Please check back soon.</h4>
        <% end_if %>
		<!-- END NEXT UP -->
	</div><!-- END LEFT COLUMN, TOP -->
	<div class="medium-6 end large-6 columns">
		<div id="blog-box" class="hide-for-small-only">
			<h2 id="cabfare"><img src="$ThemeDir/images/cabfarecutout_628.png" alt="Cabfare" /></h2>
			<div id="facebook-feed">
			<!-- FACEBOOK WIDGET -->
			<iframe src="//www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fuiowacab&amp;width=525&amp;height=700&amp;colorscheme=light&amp;show_faces=false&amp;header=false&amp;stream=true&amp;show_border=false&amp;appId=470713492967451" frameborder="0" style="border:none; width:100%; background-color: #fff;" allowTransparency="true"></iframe>
			</div>	     		
	    </div>
	</div>
</div>       
<!-- END TOP/ START BOTTOM CONTENT -->
<div id="bottom-content" class="row">
	<div id="social-media" class="medium-6 large-6 columns">

		<!--<div class="widget">
			<h5>Check Out: &nbsp; <a href="http://www.youtube.com/user/IowaCAB" target="_blank"><img src="$ThemeDir/images/icons/youtube.png" /></a>
			<a href="http://www.flickr.com/photos/uiowacab" target="_blank"><img src="$ThemeDir/images/icons/flickr.png" /></a>
			</h5>
		</div>-->
		<!-- TWITTER FEED -->
    	<div id="twitter-feed"> 
        	<a id="twitter-widget" class="twitter-timeline" data-show-faces="false"  data-chrome="transparent" href="https://twitter.com/search?q=%40uiowacab"  data-widget-id="432916008848728066">Tweets about "@uiowacab"</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
		</div>
		<!-- FLICKR, YOUTUBE -->
	</div><!-- end widgets -->	
	<div class="feature-box medium-6 large-6 columns">
        <!-- GET INVOLVED -->
        <div class="feature-box-content">
       		<h2>$RedLightHeadline</h2>
				$RedLightDescription         
        </div>
        <!-- end GET INVOLVED -->
	</div>
</div>