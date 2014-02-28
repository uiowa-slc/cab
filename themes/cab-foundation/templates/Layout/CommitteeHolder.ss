<link href='http://fonts.googleapis.com/css?family=Arimo&v1' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="css/nivo-slider.css" type="text/css" media="screen" />
<% require themedCSS(interior) %> 
<div id ="content" class ="row">
    <div id="interior" class="large-7 column">
    	<h2>$PageTitle</h2>	    	
		<ul class="committee-list">
         <% loop Children %> 	   
		   		<li>
		   		 <h3 class= "committeeName">$CommitteeName</h3>					   		
					<div class="committee_description_large eventListing">
						$CommitteeDescription
					</div>
				</li>
        <% end_loop %>
        </ul>
    </div>
    <div class="large-5 column">
    	<% include NextTiles %>
    </div>
</div>