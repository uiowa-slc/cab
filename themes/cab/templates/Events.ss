 <link href='http://fonts.googleapis.com/css?family=Arimo&v1' rel='stylesheet' type='text/css'>

<link rel="stylesheet" href="css/nivo-slider.css" type="text/css" media="screen" />
		<% require themedCSS(cab) %> 
		<% require themedCSS(nivo-slider) %> 
		<% require themedCSS(default) %> 
		<div id="topcontent">
    	<!-- LEFT COLUMN, TOP -->
        <div id="leftcolumn">
            <!-- NIVO SLIDER -->
            <div class="slider-wrapper theme-default">
                <div class="ribbon"></div>
                <div id="slider" class="nivoSlider">
                        <a href="/"><img src="$ThemeDir/images/kidcudi.jpg" alt="" title="#htmlcaption" /></a>
                        <a href="/"><img src="$ThemeDir/images/ratatat.jpg" alt="" title="#htmlcaption1" /></a>
                        <a href="/"><img src="$ThemeDir/images/tmoe.jpg" alt="" title="#htmlcaption2" /></a>
                        <a href="/"><img src="$ThemeDir/images/mgmt.jpg" alt="" title="#htmlcaption3" /></a>
                        <a href="/"><img src="$ThemeDir/images/florence.jpg" alt="" title="#htmlcaption4" /></a>
                </div>
			</div>
            <!-- CAPTIONS -->
                        <div id="htmlcaption" class="nivo-html-caption">
                             <a href="#"><span class="featurename">Kid Cudi</span><br /> august 23 6:30 pm @ imu</a>.
                        </div>
                         <div id="htmlcaption1" class="nivo-html-caption">
                             <a href="#"><span class="featurename">Ratatat</span><br /> october 13 9:30 pm @ imu</a>.
                        </div>
                         <div id="htmlcaption2" class="nivo-html-caption">
                             <a href="#"><span class="featurename">Tallest Man on Earth</span><br /> august 23 6:30 pm @ imu</a>.
                        </div>
                         <div id="htmlcaption3" class="nivo-html-caption">
                             <a href="#"><span class="featurename">MGMT</span><br /> august 23 6:30 pm @ imu</a>.
                        </div>
                         <div id="htmlcaption4" class="nivo-html-caption">
                             <a href="#"><span class="featurename">Florence + the Machine</span><br /> august 23 6:30 pm @ imu</a>.
                        </div>
            <!-- END CAPTIONS -->
           <!-- END NIVO SLIDER -->
			<!-- NEXT UP -->
            <div id="nextup">
                <h4>Next Up:</h4>
                <ul>
                    <li><span class="uppercase">Kid Cudi</span> 8.23 | 6:30 p.m. at imu</li>
                    <li><span class="uppercase">Ratatat</span> 8.23 | 6:30 p.m. at imu</li>
                    <li><span class="uppercase">Tallest Man on Earth</span> 8.23 | 6:30 p.m. at imu</li>
                    <li><span class="uppercase">MGMT</span> 8.23 | 6:30 p.m. at imu</li>
                    <li><span class="uppercase">Florence + the Machine</span> 8.23 | 6:30 p.m. at imu</li>
                </ul>
            </div>
         	<!-- END NEXT UP -->

        </div>
        <!-- END LEFT COLUMN, TOP -->
        
		<!-- RIGHT COLUMN, TOP -->
        <div id="rtcolumn">
        	<!-- SOCIAL MEDIA feature -->
        	<div id="socialmedia">
                <h2 class="connect">Never miss an event.</h2>
                    <ul class="sm">
                        <li id="fb"><a href="http://facebook.com"></a></li>
                        <li id="twitter"><a href="http://facebook.com"></a></li>
                        <li id="youtube"><a href="http://facebook.com"></a></li>
                        <li id="foursquare"><a href="http://facebook.com"></a></li>
                        <li id="flickr"><a href="http://facebook.com"></a></li>
                        <li id="rss"><a href="http://facebook.com"></a></li>
                    </ul>
                    <div class="clear"></div>
             </div>
             <!-- end SOCIAL MEDIA feature -->
             
			<!-- BLOG -->
        	<h2 id="cabfare">CabFare</h2>
           		 <!-- container -->
                <div id="blogcontainer">
                    <!-- blog posts -->
                    <ul class="blog">
                        <li><h3>A Blog Post</h3><h4>posted on 5.7.2011 by aslade</h4><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...<br /><a href="">read more</a></p>
                        </li>
                        <li><h3>A Blog Post</h3><h4>posted on 5.7.2011 by aslade</h4><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...<br /><a href="">read more</a></p>
                        </li><li><h3>A Blog Post</h3><h4>posted on 5.7.2011 by aslade</h4><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...<br /><a href="">read more</a></p>
                        </li> 
                        <li><a class="more" href="">view all</a></li>
                    </ul>
                    <!-- end blog posts -->
    
                    <!-- Subscribe to email -->
                    <div id="emailform">
                        <h2>Sign Up for Updates</h2>
                          <form class="updates" action="/" method="post">
                             <p>
                               <input class="updates" type="text" id="email" value="email address"><BR>
                              <input class="subscribe" type="submit" value="Subscribe"> 
                            </p>
                        </form>
                   </div>
                  <!-- end Subscribe to email -->
               </div>
               <!-- end container -->
             <!-- end BLOG -->
        </div>
        <!-- END RIGHT COLUMN, TOP -->
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
                                  height: 150,
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
                    <h4>Red Light <span class="bold">Raffle</span> </h4>
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