		<div id="next-up">
			<h2>next up:</h2>	
			<ul id="next-up-list" class="medium-block-grid-4">
				<% loop AfterClassEvents("http://afterclass.uiowa.edu/events/categories/CAB/feed/json").Limit(12) %>
				<li class="event-{$ID}">
					<div class="bg"></div>
					<div class="event-content">
					<a href="$Link" target="_blank">
					<span class="event-title">$Title</span><p>Next Date: <% include ACDateLocation %></p>
				</a>
				</div>

			</li>
				<% end_loop %> 
			</ul>			
			<ul class="button-group">
			  <li><a href="events/" class="tiny button radius more-events-button" target="_blank">view all movies and events</a></li>
			</ul>
		</div>