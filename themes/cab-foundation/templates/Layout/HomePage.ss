<link rel="stylesheet" href="css/nivo-slider.css" type="text/css" media="screen" />
		<% require themedCSS(cab) %> 
		<% require themedCSS(nivo-slider) %> 
		<% require themedCSS(default) %> 

 <div id="topcontent" class="row">
	<!-- LEFT COLUMN, TOP -->
 	<div class="small-6 large-6 columns">
            <!-- NIVO SLIDER -->
            <% if AllEvents %>
	            <div class="slider-wrapper theme-default">
	                <div class="ribbon"></div>
	                <div id="slider" class="nivoSlider">
					
					<% loop RSSDisplay(6,"http://afterclass.uiowa.edu/events/categoriesrss/cab") %>
						<a href="$Link"><img src="$Image" alt="" title="#htmlcaption{$Pos}" class="homeSliderImage" /></a>
					<% end_loop %> 						
									
	                </div>
				</div>
			
            <!-- CAPTIONS -->
		
				<% loop RSSDisplay(6,"http://afterclass.uiowa.edu/events/categoriesrss/cab") %>
				  <div id="htmlcaption{$Pos}" class="nivo-html-caption">
				         <a href="$Link"><span class="featurename">$Title</span><br /> on $Dates at $Location</a>.
				    </div>
				<% end_loop %>					
				<% loop EventList(6) %>              
				<% end_loop %>
	                         
            <!-- END CAPTIONS -->
            <!-- END NIVO SLIDER -->
			<!-- NEXT UP -->
			<% end_if %>
			<% if $EventList %>
				<h4>$NextUp</h4>	
				<ul><% loop RSSDisplay(99,"http://afterclass.uiowa.edu/events/categoriesrss/cab") %>
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
				
				<!-- wrap the loop RSSDISPlay in format from below --> 
               
               <% else %>
               	<h4>No upcoming shows. Please check back soon.</h4>
               <% end_if %>

			
         	<!-- END NEXT UP -->
        <!-- END LEFT COLUMN, TOP -->
	
	</div>
</div>
	
	
	
	
	    <div class="clear"></div> 
	</div>
	                   

  <!-- END TOP CONTENT -->
  

<!-- BOTTOM CONTENT -->
    <div id="bottomcontent">
    
    	<!-- OPACITY CONTAINER --> 
    	<div id="opacitycontainer">
        	<!-- Clipping Mask -->
            <div id="clippingmask">
                <h2>Everyone Talking Cab</h2>
                	<!-- FEEDS -->
                    <div id="feeds">
                    	<!-- TWITTER FEED -->
                    	<div id="twitterfeed"> 
                           <script src="http://widgets.twimg.com/j/2/widget.js"></script>
								<script>
                                new TWTR.Widget({
                                  version: 2,
                                  type: 'search',
                                  search: '@uiowacab',
                                  interval: 6000,
                                  title: 'UIowa CAB',
                                  subject: 'UI Campus Activities Board',
                                  width: 380,
                                  height: 120,
                                  theme: {
                                    shell: {
                                      background: '#312828',
                                      color: '#ffffff'
                                    },
                                    tweets: {
                                      background: '#ffffff',
                                      color: '#444444',
                                      links: '#919191'
                                    }
                                  },
                                  features: {
                                    scrollbar: false,
                                    loop: true,
                                    live: true,
                                    hashtags: true,
                                    timestamp: true,
                                    avatars: false,
                                    toptweets: true,
                                    behavior: 'default'
                                  }
                                }).render().start();
                                </script>
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
            <div id="sidebar">
            	<!-- GET INVOLVED -->
            	<div id="involve">
                    <h4> <span class="bold">$RedLightHeadline</span> </h4>
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