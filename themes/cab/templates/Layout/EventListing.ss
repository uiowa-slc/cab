 <link href='http://fonts.googleapis.com/css?family=Arimo&v1' rel='stylesheet' type='text/css'>

<link rel="stylesheet" href="css/nivo-slider.css" type="text/css" media="screen" />
	
		<% require themedCSS(interior) %> 
 
	
		
<div id ="content">
   
        <div id="interior">
            <div id="listingcontain">
                <h2 id="eventheadline"><span class="fontweight">$FirstWords</span> $LastWords</h2>
                
                
                  <div id="rightcolumn">
				  	<div id="promomedia">
					
				  	<% if Youtube %>
					 <div class="youtube" style="padding: 0px; border:0px; width:465px;">
						<object width="465" height="325"><param name="wmode" value="transparent"><param name="movie" value="http://www.youtube.com/v/$Youtube?fs=1&hl=en_US"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value=		"always"></param><embed wmode="transparent" src="http://www.youtube.com/v/$Youtube?fs=1&hl=en_US" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="465" height="325"></embed></object>
					</div>
					<% else_if Image %>
					 
					 $Image
					 
					 <% else %>
					 
					 
					 
					
					<% end_if %>
					</div>
                    <h4><span id="viewall"><a href="http://www.youtube.com/user/IowaCAB" target="_blank">View all of our videos</a></span></h4>
                    
                    <h4 id="nextupinterior">next up:</h4>
                    <ul class="interiornextup">
                      
                        <% loop EventList(6) %>
                    <li><a href="$Link" >
						$Title
						$Date.Format('n.j.y')
						<% if $EndDate = $Date %><%else_if 1%>
							- $EndDate.Format('n.j.y')						
						<% end_if %>
					 	| $EventTime at $EventLocation
					</a></li>
               <% end_loop %>
                  
                    </ul>
					
					
					
					
                    <div id="calendar">
				<a href="{$BaseHref}/movies">view all movies</a><br />
			   <a href="{$BaseHref}/events">view all events</a></div>
                  </div>
                 <div id="leftcolumn">
                         <div id="eventdetails">
                            <h3>
								$Date.Format('n.j.y')
								<% if $EndDate = $Date %><%else_if 1%>
							- $EndDate.Format('n.j.y')						
								<% end_if %>
							</h3>
                            <h3>$EventTime</h3>
                            <h3>$EventLocation</h3>
                        </div>
                        <div id="eventdescription">
                          $EventDescription
                        </div>          
        
                </div>
                <div class="clear"></div>
             </div>
        </div>
    </div>