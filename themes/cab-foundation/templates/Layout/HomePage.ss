<div id="top-content" class="row" data-equalizer>
	<!-- LEFT COLUMN, TOP -->
 	<div class="small-12 medium-9 large-6 columns">  
 		<div data-equalizer-watch>
			<ul class="orbit-slider" data-orbit data-options="animation:fade; resume_on_mouseout:true;">
				<% loop RSSDisplay(6,"http://afterclass.uiowa.edu/events/categoriesrss/cab") %>
				<li>	
					<img src="http://afterclass.uiowa.edu/assets/Uploads/_resampled/croppedimage730462-Speed-Dating-AC.jpeg" alt="slide 1" />
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
				<% loop RSSDisplay(20,"http://afterclass.uiowa.edu/events/categoriesrss/cab") %>
				<a href="$Link"><li>
					<span>$Title</span> $Dates <% if $Location %> at $Location <% end_if %>
				</li></a>
				<% end_loop %> 
			</ul>			
			<hr>
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
	<div class="small-12 medium-7 end large-6 columns" data-equalizer-watch>
		<div id="blog-box" style="height: 100%;">
			<h2 id="cabfare"><img src="$ThemeDir/images/cabfarecutout_628.png" alt="Cabfare" /></h2>
			<div id="facebook-feed" style="height: 99%;">
			<!-- FACEBOOK WIDGET -->
			<iframe src="//www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fuiowacab&amp;width=525&amp;height=1500&amp;colorscheme=light&amp;show_faces=false&amp;header=false&amp;stream=true&amp;show_border=false&amp;appId=470713492967451" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100%; height:90%; background-color: #fff;" allowTransparency="true"></iframe>
			</div>	     		
	    </div>
	</div>
</div>       
<!-- END TOP/ START BOTTOM CONTENT -->
<div id="bottom-content" class="row" data-equalizer>
	<div id="social-media" class="small-12 medium-8 large-5 columns">
		<!-- TWITTER FEED -->
    	<div id="twitter-feed" data-equalizer-watch> 
        	<a id="twitter-widget" class="twitter-timeline" data-show-faces="false"  data-chrome="transparent" href="https://twitter.com/search?q=%40uiowacab"  data-widget-id="432916008848728066">Tweets about "@uiowacab"</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
		</div>
		<hr>
		<!-- FLICKR, YOUTUBE -->
		<div class="widget">
			<h5>Check Out: &nbsp; <a href="http://www.youtube.com/user/IowaCAB" target="_blank"><img src="$ThemeDir/images/icons/youtube.png" /></a>
			<a href="http://www.flickr.com/photos/uiowacab" target="_blank"><img src="$ThemeDir/images/icons/flickr.png" /></a>
			</h5>
		</div>
	</div><!-- end widgets -->	
	<div id="get-involved" class="small-12 medium-11 end large-7 columns" data-equalizer-watch>
        <!-- GET INVOLVED -->
        <div>
       		<h2>$RedLightHeadline</h2>
				$RedLightDescription         
        </div>
        <!-- end GET INVOLVED -->
	</div>
</div>