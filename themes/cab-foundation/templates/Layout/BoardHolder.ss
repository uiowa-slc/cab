<div id ="content" class = "row">
    <div id="interior" class="large-12 large-centered column">            
        <div class= "row">
        	<div class="info large-3 column">
        		
        		<h2 class="float">$FirstWords<span class="fontweight"> $LastWords</span></h2>
        		<p>$MissionStatement</p>
        	    <a href="https://orgsync.com/17245/forms/66329">Become a CAB member!</a>
			</div>
        	<!--- Image currently not working --->
        	<div class="photo large-9 column">
        		$Image
			</div>
        </div>             
        <div id="board" class="row">
           <div class = "large-12 column">
           <h2>$WordOne<span class="fontweight"> $WordTwo</span></h2>
			<ul class = "info small-block-grid-1 medium-block-grid-3 large-block-grid-4">
			<% loop Children %>
				<li>					
					 	<!--- Image currently not working --->
						$Image															
						<h4>$BoardMember</h4>
						<h5>$MemberTitle <br />
						$Email</h5>
						major: $Major <br />
						year: $Year
				</li>
			<% end_loop %>
			</ul>
			</div>
        </div>   
        <% include NextTiles %>       
    </div>
</div>            