
<div id ="content" class ="row">
    <div id="interior" class="large-12 column">
    	<h2 class="text-center">$PageTitle</h2>	    	
		<ul class="committee-list">
         <% loop Children %> 	   
		   		<li>
		   			<div class="row">
			   			<div class="large-3 columns show-for-large-up committee-image">
			   				$RenderedImage
			   				
			   			</div>
			   		 	<div class="large-9 columns">
			   		 		<h3 class="$URLSegment">$Title</h3>
							$CommitteeDescription
						</div>
					</div>
				</li>
        <% end_loop %>
        </ul>
    </div>
    </hr>
    <% include NextTiles %>
</div>