 <link href='http://fonts.googleapis.com/css?family=Arimo&v1' rel='stylesheet' type='text/css'>

<link rel="stylesheet" href="css/nivo-slider.css" type="text/css" media="screen" />
	
		<% require themedCSS(interior) %> 
 
	
		

  <div id ="content">
        <div id="interior">
        
        
            <div id="aboutus">
                <h2 class="float">$FirstWords<span class="fontweight"> $LastWords</span></h2>
                <h3 class="tagline">our mission - <br />entertainment done right</h3>
                <div class="clear"></div>
                <div class="info">
                	<p>$MissionStatement</p>
                    <a href="https://orgsync.com/17245/forms/66329">Become a CAB member!</a>
                </div>
                <div class="photo">
                	$Image
                </div>

            </div>
            
            
            
            <div id="board">
               <h2 class="float">$WordOne<span class="fontweight"> $WordTwo</span></h2>
                <div class="clear"></div>	
				
				<% loop Children %>
						 <div class="profile">
							<div class="img">
								$Image
							</div>
							<div class="info">
								<h4>$BoardMember</h4>
								<h5>$MemberTitle <br />
								$Email</h5>
								<a href="mailto:someone@example.com?Subject=Hello%20again" target="_top">
Send Mail</a>
								<ul>
							 
									<li>major: $Major</li>
									<li>year: $Year</li>
								</ul>
							</div>
											<div class="clear"></div>
						</div>
				<% end_loop %>
				
				
               
                
            </div>
            
            
        </div>
    </div>            