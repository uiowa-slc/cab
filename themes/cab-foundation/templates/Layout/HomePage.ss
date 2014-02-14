<link rel="stylesheet" href="css/nivo-slider.css" type="text/css" media="screen" />
		<% require themedCSS(cab) %> 
		<% require themedCSS(nivo-slider) %> 
		<% require themedCSS(default) %> 

<div id="topcontent" class="row" data-equalizer>
	<!-- LEFT COLUMN, TOP -->
 	<div class="small-12 medium-6 large-6 columns" data-equalizer-watch>    
			<ul class="example-orbit" data-orbit>
				<% loop RSSDisplay(6,"http://afterclass.uiowa.edu/events/categoriesrss/cab") %>
				<li>	
					<img src="http://cab.uiowa.edu/assets/Uploads/Speed-Dating-CAB.jpeg" alt="slide 1" />
					<div class="orbit-caption">
					 <!-- <div id="htmlcaption{$Pos}" class="nivo-html-caption"> -->
				         <a href="$Link"><span class="featurename">$Title</span><br /> on $Dates at $Location</a>.
						<!-- </div> -->			
					</div>
				</li>
				<% end_loop %>
			</ul>           
		<!-- NEXT UP -->
		<% if $EventList %>
		<div id="next-up">
			<h2>$NextUp</h2>	
			<ul>
				<% loop RSSDisplay(99,"http://afterclass.uiowa.edu/events/categoriesrss/cab") %>
				<li>
					<a href="$Link" class="uppercase">
					$Title <span class="differentiate">	$Dates|at $Location</span>
					</a>
				</li>
				<% end_loop %> 
			</ul>
			<hr>
			<ul class="button-group [radius round]">
			  <li><a href="{$BaseHref}/movies" class="button">view all movies</a></li>
			  <li><a href="{$BaseHref}/events" class="button">view all events</a></li>
			</ul>
		</div>
				
				<!-- wrap the loop RSSDISPlay in format from below --> 
               
               <% else %>
               	<h4>No upcoming shows. Please check back soon.</h4>
               <% end_if %>
			   <!-- END NEXT UP -->
	</div><!-- END LEFT COLUMN, TOP -->
	<div class="small-12 medium-6 large-6 columns" data-equalizer-watch>
		<div id="blog-box">
			<h2 id="cabfare"><img src="$THemeDir/images/cabfarecutout3.png" alt="Cabfare" /></h2>
			<div>
			<iframe src="//www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fuiowacab&amp;width=525&amp;height=558&amp;colorscheme=light&amp;show_faces=true&amp;header=false&amp;stream=true&amp;show_border=false&amp;appId=470713492967451" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100%; height:606px; background-color: #fff;" allowTransparency="true"></iframe>
			</div>	                    		
	    </div>
	</div>
</div>
<div class="clear"></div>           
<!-- END TOP/ START BOTTOM CONTENT -->
<div id="bottomcontent" class="row">
	<div id="social-media" class="small-12 large-5 columns">
		<!-- TWITTER FEED -->
    	<div id="twitter-feed"> 
        	<a id="twitter-widget" class="twitter-timeline" data-show-faces="false"  data-chrome="transparent" href="https://twitter.com/search?q=%40uiowacab"  data-widget-id="432916008848728066">Tweets about "@uiowacab"</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
		</div>
		<hr>
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