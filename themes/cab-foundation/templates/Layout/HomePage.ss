<link rel="stylesheet" href="css/nivo-slider.css" type="text/css" media="screen" />
		<% require themedCSS(cab) %> 
		<% require themedCSS(nivo-slider) %> 
		<% require themedCSS(default) %> 

<div id="topcontent" class="row">
	<!-- LEFT COLUMN, TOP -->
 	<div class="small-12 medium-6 large-6 columns">    
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
		<div id="next-up" class="panel radius">
			<h3>$NextUp</h3>	
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
	<div class="small-12 medium-6 large-6 columns">
		<div id="blog-box">
			<div id="socialmedia">
                <h2 class="connect">Never miss an event.</h2>
                    <ul class="sm">
                        <li id="fb"><a href="https://www.facebook.com/pages/Campus-Activities-Board/31817664925"></a></li>
                        <li id="twitter"><a href="http://twitter.com/#!/uiowaCAB"></a></li>
                        <li id="youtube"><a href="http://www.youtube.com/user/IowaCAB"></a></li>
						<!--<li id="foursquare"><a href="http://facebook.com"></a></li>-->
                        <li id="flickr"><a href="http://www.flickr.com/photos/uiowacab"></a></li>
                        <!--<li id="rss"><a href="http://facebook.com"></a></li>-->
                    </ul>
				<div class="clear"></div>
	        </div>
			<h2 id="cabfare"><img src="$THemeDir/images/cabfarecutout3.png" alt="Cabfare" /></h2>
			<div class="white-box">
				<% include BlogSample %>
				<hr>
				<button href="/blog/">view all</a>
			</div>
	    </div>
	</div>
</div>
<div class="clear"></div>           
<!-- END TOP/ START BOTTOM CONTENT -->
<div id="bottomcontent">
	<!-- OPACITY CONTAINER --> 
	<div id="opacitycontainer" class="row">
		<div id="get-involved" class="small-12 large-4 columns">
            <!-- GET INVOLVED -->
            <div class="">
           		<h4>$RedLightHeadline</h4>
				$RedLightDescription           
            </div>
            <!-- end GET INVOLVED -->
		</div>
		<div id="widgets" class="small-12 large-8 columns">
			<img src="" alt="everybody Talking CAB" />
			<!--<h2>Everyone Talking Cab</h2>-->
			<div class="row">
				<div id="facebook" class="small-12 medium-6 large-6 columns">                    	                       
						<!-- FB FEED -->
					<div class="widget">
                     <iframe src="//www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fuiowacab&amp;width=355&amp;height=590&amp;colorscheme=light&amp;show_faces=true&amp;header=true&amp;stream=true&amp;show_border=true&amp;appId=470713492967451" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:355px; height:590px; background-color: #fff;" allowTransparency="true"></iframe>
					</div>
                        <!-- END FB FEED -->
            </div>
				<div id="twitter" class="small-12 medium-6 large-6 columns">
            <!-- TWITTER FEED -->
            	<div id="twitterfeed" class="widget"> 
                	<a class="twitter-timeline"  href="https://twitter.com/search?q=%40uiowacab"  data-widget-id="432916008848728066">Tweets about "@uiowacab"</a>    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
				</div>
            </div>
			</div><!-- end row -->	
		</div>
    </div><!-- end OPACITY CONTAINER --> 
	<div class="clear"></div>   
</div>