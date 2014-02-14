<div id="top-content" class="row" data-equalizer>
	<!-- LEFT COLUMN, TOP -->
 	<div class="small-12 medium-6 large-6 columns" data-equalizer-watch>  
 		<div> 
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
		</div>         
		<!-- NEXT UP -->
		<% if $EventList %>
		<div id="next-up">
			<h2>$NextUp</h2>	
			<ul class="small-block-grid-2 medium-block-grid-3 large-block-grid-4">
				<% loop RSSDisplay(99,"http://afterclass.uiowa.edu/events/categoriesrss/cab") %>
				<li data-tooltip data-options="disable_for_touch:true" class="has-tip" title="<h4>$Title</h4><span>$Dates</span><% if $Location %> at $Location <% end_if %>">
					<a class="th" href="$Link"><img style="margin: 0 auto;" src="http://dummyimage.com/200x200/000/fff.jpg&text=Testing+123+Testing+123" />
					</a>
				</li>
				<% end_loop %> 
			</ul>
			<hr>
			<ul class="button-group">
			  <li><a href="{$BaseHref}/movies" class="tiny button radius">view all movies</a></li>
			  <li><a href="{$BaseHref}/events" class="tiny button radius">view all events</a></li>
			</ul>
		</div>	
        <% else %>
        	<h4>No upcoming shows. Please check back soon.</h4>
        <% end_if %>
		<!-- END NEXT UP -->
	</div><!-- END LEFT COLUMN, TOP -->
	<div class="small-12 medium-6 large-6 columns" data-equalizer-watch>
		<div id="blog-box">
			<h2 id="cabfare"><img src="$THemeDir/images/cabfarecutout_628.png" alt="Cabfare" /></h2>
			<div id="facebook-feed">
			<!-- FACEBOOK WIDGET -->
			<iframe src="//www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fuiowacab&amp;width=525&amp;height=558&amp;colorscheme=light&amp;show_faces=true&amp;header=false&amp;stream=true&amp;show_border=false&amp;appId=470713492967451" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100%; height:580px; background-color: #fff;" allowTransparency="true"></iframe>
			</div>	                    		
	    </div>
	</div>
</div>       
<!-- END TOP/ START BOTTOM CONTENT -->
<div id="bottom-content" class="row">
	<div id="social-media" class="small-12 large-5 columns">
		<!-- TWITTER FEED -->
    	<div id="twitter-feed"> 
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
	<div id="get-involved" class="small-12 large-7 columns ">
        <!-- GET INVOLVED -->
        <div class="">
       		<h2>$RedLightHeadline</h2>
			$RedLightDescription           
        </div>
        <!-- end GET INVOLVED -->
	</div>
</div>