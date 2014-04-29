<div id="top-content" class="row">
	<!-- LEFT COLUMN, TOP -->
 	<div class="medium-6 large-6 columns">  
 		<div data-equalizer-watch>
			<ul class="orbit-slider" data-orbit data-options="animation:fade; resume_on_mouseout:true;">
				<% loop AfterClassFeed("http://afterclass.uiowa.edu/events/categories/CAB/feed/json").Limit(6) %>
				<li>	
					<a href="$Link"><img src="$ImageURL" alt="Image for $Title" /></a>
					<div class="orbit-caption">	
				         <a href="$Link" target="_blank"><span class="featurename">$Title</span>
				         	<br><% include ACDateLocation %>
				         	<% if $DateTimeCount > "1" %>(more times)<% end_if %></a>
					</div>
				</li>
				<% end_loop %>
			</ul>       
		<!-- NEXT UP -->
		<% if $EventList %>
		<div id="next-up">
			<h2>$NextUp</h2>	
			<ul id="next-up-list">
				<% loop AfterClassFeed("http://afterclass.uiowa.edu/events/categories/CAB/feed/json").Limit(6) %>
				<a href="$Link" target="_blank"><li>
					<span>$Title</span><p><% include ACDateLocation %></p>
				</li></a>
				<% end_loop %> 
			</ul>			
			<ul class="button-group">
			  <li><a href="events/" class="tiny button radius" target="_blank">view all movies and events</a></li>
			</ul>
		</div>
		<!-- GET INVOLVED -->
        <div class="feature-box-content">
       		<h2>$RedLightHeadline</h2>
				$RedLightDescription         
        </div>
		<div class="widget instagram hide-for-small-only">
		<!-- SnapWidget -->
			<iframe src="http://snapwidget.com/sc/?u=dWlvd2FjYWJ8aW58MjUwfDN8M3x8bm98NXxub25lfG9uU3RhcnR8eWVz&v=14414" title="Instagram Widget" allowTransparency="true" frameborder="0" scrolling="no" style="border:none; overflow:hidden; width:100%; height:250px"></iframe>
		</div>
		<hr>
		<h4>Cab is on Pinterest, Tumblr, and Vine; follow Us!</h4>
		<div class='row'>
			<div class='small-2 medium-2 columns'><a href="http://www.pinterest.com/uiowacab/" target="_blank"><image style='display: block; margin: auto;' src="$ThemeDir/images/icons/social-media/pinterest.png" alt='pinterest' /></a></div>
			<div class='small-2 medium-2 columns'><a href="http://uicab.tumblr.com/" target="_blank"> <image style='display: block; margin: auto;' src="$ThemeDir/images/icons/social-media/tumblr.png" alt='tumblr' /></a></div>
			<div class='small-2 medium-2 columns'><a href="https://vine.co/u/931375171250561024" target="_blank"> <image style='display: block; margin: auto;' src="$ThemeDir/images/icons/social-media/vine.png" alt='vine' /></a></div>
			<div class='small-2 medium-2 columns'><a href="https://twitter.com/uiowaCAB" target="_blank"> <image style='display: block; margin: auto;' src="$ThemeDir/images/icons/social-media/twitter.png" alt='vine' /></a></div>
			<div class='small-2 medium-2 columns'><a href="http://instagram.com/uiowacab" target="_blank"> <image style='display: block; margin: auto;' src="$ThemeDir/images/icons/social-media/instagram.png" alt='vine' /></a></div>
			<div class='small-2 medium-2 columns'><a href="https://www.facebook.com/uiowacab" target="_blank"> <image style='display: block; margin: auto;' src="$ThemeDir/images/icons/social-media/facebook.png" alt='vine' /></a></div>
		</div>
		<hr>

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
	    			<!-- TWITTER FEED -->
    	<div id="twitter-feed"> 
        	<a id="twitter-widget" class="twitter-timeline" data-show-faces="false"  data-chrome="transparent" href="https://twitter.com/search?q=%40uiowacab"  data-widget-id="432916008848728066">Tweets about "@uiowacab"</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
		</div>
	</div>
</div><!-- end top-content -->     
