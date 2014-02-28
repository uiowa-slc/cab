<div id ="content" class = "row">
    <div id="interior" class="large-12 large-centered column">            
        <div class= "row">
        	<div class="info large-3 column">
        		<h2>About Us</h2>
        		<p>$MissionStatement</p>
        	    <a href="https://orgsync.com/17245/forms/66329">Become a CAB member!</a>
			</div>
        	<div class="photo large-9 column">
        		$Image
			</div>
        </div>             
        <div id="board" class="row">
           <div class = "large-12 column">
           <h2>Executive Board</h2>
			<ul class = "info small-block-grid-2 medium-block-grid-4 large-block-grid-5">
			<% loop Children %>
				<li>					
						$Image.SetHeight("200")														
						<h3>$BoardMember</h3>
                        <h4>$MemberTitle</h4>
						<p>
						<strong>major:</strong> $Major <br />
						<strong>year:</strong> $Year
                    </p>
				</li>
			<% end_loop %>
			</ul>
			</div>
        </div>      
    </div>
</div>            