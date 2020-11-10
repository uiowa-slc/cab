<div class="card mb-4">
	<% if $Image.URL %>
			<a href="$Link">
				<img src="$Image.URL" class="card-img" alt="$Title" loading="lazy">
			</a>
	<% end_if %>
	<div class="row no-gutters">

		<div class="col-md-12">
			<div class="card-body">
				<h3 class="card-title my-2">
					<a href="$Link">$Title</a>
				</h3>               
				<p class="card-subtitle">
                <!-- Date/Time -->
				<ul class="list-group ">
					<li class="list-group-item"><strong>Date:</strong> 

						<% if $Dates %>
							<% loop $Dates.Limit(1) %>
								<% with $StartDateTime %>
									<time itemprop="startDate" datetime="$Rfc3339">$Format("EEEE, MMM d, h:mm a")</time>
								<% end_with %>
								<% if $EndDate %>
								 - 
								<% with $EndDate %>
									<time itemprop="endDate" datetime="$Rfc3339">$Format("EEEE, MMM d, h:mm a")</time>
								<% end_with %>
								<% end_if %>
							<% end_loop %>
						<% end_if %>
							<% if $Dates.Count > "1" %>
							<a href="$AbsoluteLink" class="btn btn-sm btn-outline-primary">more dates</a> 
						<% end_if %> 
					</li>
					<% if $isOnline || $Venue %>
						<li class="list-group-item">
					    <% if not $isOnline %>
					    	<% if $Venue %>
					    		<% with $Venue %>
					    			 @
					    			<a href="$Link"><span itemprop="location">$Title.LimitCharacters(25)</span></a>
					    		<% end_with %>
					    	<% else_if $Location %>
					    		@ <span itemprop="location">$Location</span>
					    	<% end_if %>
					    <% else %>
					        Online Event <i aria-hidden="true" class="fas fa-laptop-house"></i>
					    <% end_if %>
					</li>
					<% end_if %>

				</ul>
				</p>
                <a href="$Link" class="btn btn-primary d-block d-sm-inline-block mb-2 mb-sm-0">See Details</a>
			</div>
		</div>
	</div>
</div>