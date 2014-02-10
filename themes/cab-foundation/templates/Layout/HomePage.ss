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
		<div id="next-up">
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
			<div id="calendar">
			  <a href="{$BaseHref}/movies">view all movies</a><br />
			  <a href="{$BaseHref}/events">view all events</a>
			</div>
		</div>
				<!-- wrap the loop RSSDISPlay in format from below --> 
               <% else %>
               	<h4>No upcoming shows. Please check back soon.</h4>
               <% end_if %>
			   <!-- END NEXT UP -->
	</div><!-- END LEFT COLUMN, TOP -->
	<div class="small-12 medium-6 large-6 columns">
		<div id="social-media"><p>Social Media links will go here</p></div>
			<div id="blog-box">
			<h2 id="cabfare"><img src="http://cab.uiowa.edu/themes/cab/images/cabfarecutout.png" alt="Cabfare" /></h2>
			<div class="white-bg">
				<% include BlogSample %>
				<hr>
				<a class="more" href="/blog/">view all</a>
			</div>
	    </div>
	</div> <!-- END COLUMN -->
</div> <!-- END ROW -->
<div class="clear"></div>           
<!-- END TOP ROW CONTENT -->
<!-- BOTTOM CONTENT -->
    <div id="bottomcontent">
    
    	<!-- OPACITY CONTAINER --> 
    	<div id="opacitycontainer" class="row">
        	<!-- Clipping Mask -->
            <div id="clippingmask" class="small-12 medium-5 large-5 columns">
                <h2>Everyone Talking Cab</h2>
                	<!-- FEEDS -->
                    <div id="feeds">
                    	<!-- TWITTER FEED -->
                    	<div id="twitterfeed"> 
                           <script src="http://widgets.twimg.com/j/2/widget.js"></script>
								<a class="twitter-timeline"  href="https://twitter.com/search?q=%40uiowacab"  data-widget-id="432916008848728066">Tweets about "@uiowacab"</a>
    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
                			</div>
                       <!-- END TWITTER FEED -->
                       
						<!-- FB FEED -->
                        <iframe src="http://www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FCampus-Activities-Board%2F31817664925&amp;width=380&amp;colorscheme=light&amp;show_faces=false&amp;border_color&amp;stream=true&amp;header=false&amp;height=215" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:380px; height:215px;" allowTransparency="false"></iframe>
                        <!-- END FB FEED -->

                     </div>
                     <!-- end FEEDS -->
            </div>
            <!--END Clipping Mask -->

           <!-- SIDEBAR -->
            <div id="sidebar" class="small-12 medium-7 large-6 large-offset-1 columns">
            	<!-- GET INVOLVED -->
            	<div id="involve">
                    <h4> <span class="bold">$RedLightHeadline</span> </h4> <!--Add field to CMS for editing -->
                  <img id="redlight" src="$ThemeDir/images/key.png" />
                    <h5>Win <span class="uppercase">big</span> prizes from Apple by earning <strong>10 punches</strong> at <strong>10 CAB events</strong>! Each completed card gives you the chance to win in every <strong> Red Light Raffle </strong>until you graduate! </h5>                  
                      <div class="clear"></div>

                    <ol>
                        <li>Enjoy yourself at 10 CAB events</li>
                        <li>Show your completed punchcard to a CAB member working your 10th event</li>
                        <li>Fill out the information sticker on your punchcard</li>
                        <li>Get to work on your new punchcard and wait for a call/email from CAB telling you what you've won!</li>
                    </ol>
           		 </div>
             <!-- end GET INVOLVED -->
			</div>
            <!-- END SIDEBAR -->
            <div class="clear"></div>
        </div>
        
        <!-- end OPACITY CONTAINER --> 
    </div>