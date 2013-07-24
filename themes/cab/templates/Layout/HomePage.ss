<link href='http://fonts.googleapis.com/css?family=Arimo&v1' rel='stylesheet' type='text/css'>

<link rel="stylesheet" href="css/nivo-slider.css" type="text/css" media="screen" />
		<% require themedCSS(cab) %> 
		<% require themedCSS(nivo-slider) %> 
		<% require themedCSS(default) %> 

 <div id="topcontent">
    	<!-- LEFT COLUMN, TOP -->
        <div id="leftcolumn">
            <!-- NIVO SLIDER -->
            <% if AllEvents %>
            <div class="slider-wrapper theme-default">
                <div class="ribbon"></div>
                <div id="slider" class="nivoSlider">
				
					<% if $SliderFeature1 %>
					<% loop $SliderFeature1 %>
                        <a href="$Link"><img src="$Image.URL" alt="" title="#htmlcaption1" /></a>
					<% end_loop %>
					<% end_if %>
					
					<% if $SliderFeature2 %>
					<% loop $SliderFeature2 %>
                        <a href="$Link"><img src="$Image.URL" alt="" title="#htmlcaption2" /></a>
					<% end_loop %>
					<% end_if %>
					
					<% if $SliderFeature3 %>
					<% loop $SliderFeature3 %>
                        <a href="$Link"><img src="$Image.URL" alt="" title="#htmlcaption3" /></a>
					<% end_loop %>
					<% end_if %>
					
					<% if $SliderFeature4 %>
					<% loop $SliderFeature4 %>
                        <a href="$Link"><img src="$Image.URL" alt="" title="#htmlcaption4" /></a>
					<% end_loop %>
					<% end_if %>
					
					<% if $SliderFeature5 %>
					<% loop $SliderFeature5 %>
                        <a href="$Link"><img src="$Image.URL" alt="" title="#htmlcaption5" /></a>
					<% end_loop %>
					<% end_if %>	
					
					<% if $SliderFeature6 %>
					<% loop $SliderFeature6 %>
                        <a href="$Link"><img src="$Image.URL" alt="" title="#htmlcaption6" /></a>
					<% end_loop %>	
					<% end_if %>	
								
                </div>
			</div>
			
            <!-- CAPTIONS -->
           
			<% if $SliderFeature1 %>
				<% loop $SliderFeature1 %>
				  <div id="htmlcaption1" class="nivo-html-caption">
				         <a href="$Link"><span class="featurename">$Title</span><br /> $Date.Format('F j') <% if EndDate %> - $EndDate.Format('F j') <% end_if %> at $EventTime @ $EventLocation</a>.
				    </div>
				<% end_loop %>		
			<% end_if %>
			
			<% if $SliderFeature2 %>
				<% loop $SliderFeature2 %>
				  <div id="htmlcaption2" class="nivo-html-caption">
				         <a href="$Link"><span class="featurename">$Title</span><br /> $Date.Format('F j') <% if EndDate %> - $EndDate.Format('F j') <% end_if %> at $EventTime @ $EventLocation</a>.
				    </div>
				<% end_loop %>		
			<% end_if %>
			
			<% if $SliderFeature3 %>
				<% loop $SliderFeature3 %>
				  <div id="htmlcaption3" class="nivo-html-caption">
				         <a href="$Link"><span class="featurename">$Title</span><br /> $Date.Format('F j') <% if EndDate %> - $EndDate.Format('F j') <% end_if %> at $EventTime @ $EventLocation</a>.
				    </div>
				<% end_loop %>		
			<% end_if %>
			
			<% if $SliderFeature4 %>
				<% loop $SliderFeature4 %>
				  <div id="htmlcaption4" class="nivo-html-caption">
				         <a href="$Link"><span class="featurename">$Title</span><br /> $Date.Format('F j') <% if EndDate %> - $EndDate.Format('F j') <% end_if %> at $EventTime @ $EventLocation</a>.
				    </div>
				<% end_loop %>		
			<% end_if %>
			
			<% if $SliderFeature5 %>
				<% loop $SliderFeature5 %>
				  <div id="htmlcaption5" class="nivo-html-caption">
				         <a href="$Link"><span class="featurename">$Title</span><br /> $Date.Format('F j') <% if EndDate %> - $EndDate.Format('F j') <% end_if %> at $EventTime @ $EventLocation</a>.
				    </div>
				<% end_loop %>		
			<% end_if %>

			<% if $SliderFeature6 %>
				<% loop $SliderFeature6 %>
				  <div id="htmlcaption6" class="nivo-html-caption">
				         <a href="$Link"><span class="featurename">$Title</span><br /> $Date.Format('F j') <% if EndDate %> - $EndDate.Format('F j') <% end_if %> at $EventTime @ $EventLocation</a>.
				    </div>
				<% end_loop %>		
			<% end_if %>					
			
			<% loop EventList(6) %>
              
			<% end_loop %>
                         
            <!-- END CAPTIONS -->
           <!-- END NIVO SLIDER -->
			<!-- NEXT UP -->
           <% end_if %>
			<div id="nextup">
				<% if $EventList %>
                <h4>$NextUp</h4>
				
                <ul> <% loop EventList %>
                    <li><a href="$Link" class="uppercase">
						$Title <span class="differentiate">
						$Date.Format('n.j.y')
						<% if EndDate %>
							- $EndDate.Format('n.j.y')						<% end_if %>
						| $EventTime at $EventLocation</span>
					</a></li>
               <% end_loop %> </ul>
               <% else %>
               	<h4>No upcoming shows. Please check back soon.</h4>
               <% end_if %>
			   <div id="calendar">
			   <a href="{$BaseHref}/movies">view all movies</a><br />
			   <a href="{$BaseHref}/events">view all events</a>
				</div>
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
                        <li id="fb"><a href="https://www.facebook.com/pages/Campus-Activities-Board/31817664925"></a></li>
                        <li id="twitter"><a href="http://twitter.com/#!/uiowaCAB"></a></li>
                        <li id="youtube"><a href="http://www.youtube.com/user/IowaCAB"></a></li>
						<!--<li id="foursquare"><a href="http://facebook.com"></a></li>-->
                        <li id="flickr"><a href="http://www.flickr.com/photos/uiowacab"></a></li>
                        <!--<li id="rss"><a href="http://facebook.com"></a></li>-->
                    </ul>
                    <div class="clear"></div>
             </div>
             <!-- end SOCIAL MEDIA feature -->
             
			<!-- BLOG -->
        	<h2 id="cabfare">CabFare</h2>
           		 <!-- container -->
                <div id="blogcontainer">
                    <!-- blog posts -->
					<% include BlogSample %>
					
                    <ul class="blog">
                        
                        <li><a class="more" href="/blog/">view all</a></li>
                    </ul>
                    <!-- end blog posts -->
    
                    <!-- Subscribe to email -->

					
                  <!--  <div id="emailform">
                        <h2>Sign Up for Updates</h2>
                          <form class="updates" action="/" method="post">
                             <p>
                               <input class="updates" type="text" id="email" value="email address"><BR>
                              <input class="subscribe" type="submit" value="Subscribe"> 
                            </p>
                        </form>
                   </div>-->
                  <!-- end Subscribe to email -->
               </div>
			   
<div id="email_subscription">
<!-- Begin MailChimp Signup Form -->
<script type="text/javascript">
// delete this script tag and use a "div.mce_inline_error{ XXX !important}" selector
// or fill this in and it will be inlined when errors are generated
var mc_custom_error_style = '';
</script>
<div id="mc_embed_signup">
<form action="http://uiowa.us2.list-manage.com/subscribe/post?u=c61b1cddac92babd42d7d628e&amp;id=8e3635391c" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
	<fieldset>
	<legend style="white-space:normal"><h3>Sign up for the Now@IMU newsletter to hear about the latest CAB events!</h3><span></span></legend>
<div class="indicate-required"></div>
<div class="mc-field-group">
<label for="mce-EMAIL">Email Address</label>
<input type="text" value="" name="EMAIL" class="required email" id="mce-EMAIL">
</div>
		<div id="mce-responses">
			<div class="response" id="mce-error-response" style="display:none"></div>
			<div class="response" id="mce-success-response" style="display:none"></div>
		</div>
		<div><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="btn"></div>
	</fieldset>	
</form>
</div>
<!--End mc_embed_signup-->
</div>
			   
			   
			   <div class="clear"></div>

               <!-- end container -->
             <!-- end BLOG -->
			 
        </div>
		    <div class="clear"></div> 

        <!-- END RIGHT COLUMN, TOP -->
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