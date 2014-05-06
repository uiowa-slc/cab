<% require themedCSS(interior) %> 
<div id ="content" class ="row">
    <div id="interior" class="large-12 column">
    	<h2>$PageTitle</h2>	    	
		<ul class="committee-list">
         <% loop Children %> 	   
		   		<li>
		   		 <h3 class= "committeeName">$Title</h3>			
		   		 	<% if $Image %>
		   		 	<div class= "categoryImage">
		   		 		$Image
		   		 	</div>		   
		   		 	<% end_if %>		
					<div class="committee_description_large eventListing">
						$CommitteeDescription
					</div>
				</li>
        <% end_loop %>
        </ul>
    </div>
    </hr>
    <% include NextTilesForOtherPages %>
</div>