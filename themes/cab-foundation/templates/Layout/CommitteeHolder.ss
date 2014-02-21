 <link href='http://fonts.googleapis.com/css?family=Arimo&v1' rel='stylesheet' type='text/css'>

<link rel="stylesheet" href="css/nivo-slider.css" type="text/css" media="screen" />
		<% require themedCSS(interior) %> 
	

    <div id ="content" class ="row">
	    <div id="interior" class="large-12 large-centered column">
	    	<h2>$PageTitle</h2>	    	
	        		<ul class="committee-list small-block-grid-1 ">
	                 <% loop Children %>
	
					   	   
					   		<li>
					   		 <h3 class= "committeeName">$CommitteeName</h3>
						   		<% if EventListings %>
			                    <div class="small-5 large-4 column eventListing">
				                    <ul>
						            <% loop EventListings %>
						                  <li><a href="$Link">$Title<span class="date">$EventDate</span></a></li>
						            <% end_loop %>
						            </ul>
				                   
			                    </div>
								<div class="committee_description_small small-7 large-6 column eventListing">
									$CommitteeDescription
								</div>
								<% else %>
									<div class="committee_description_large eventListing">
										$CommitteeDescription
									</div>
								<% end_if %>
							</li>
					
	                <% end_loop %>
	                </ul>
	    </div>
    </div>