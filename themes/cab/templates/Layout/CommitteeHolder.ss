 <link href='http://fonts.googleapis.com/css?family=Arimo&v1' rel='stylesheet' type='text/css'>

<link rel="stylesheet" href="css/nivo-slider.css" type="text/css" media="screen" />
		<% require themedCSS(interior) %> 
	

     <div id ="content">
    <div id="interior">
    	<h2>$PageTitle</h2>
        	<ul class="subgroups">
                 <% control Children %>
               <li><h3>$CommitteeName</h3>
			   		<% if EventListings %>
                    <ul class="events">
                    <% control EventListings %>
                        <li><a href="$Link">$Title<span class="date">$EventDate</span></a></li>
                    <% end_control %>
		
                    </ul>
					<div class="committee_description_small">
						$CommitteeDescription
					</div>
					<% else %>
						<div class="committee_description_large">
						$CommitteeDescription
						</div>
					<% end_if %>
                    
                    <div class="clear"></div>
                </li>
				
                <% end_control %>
        	</ul>
    
    
    </div>
    </div>