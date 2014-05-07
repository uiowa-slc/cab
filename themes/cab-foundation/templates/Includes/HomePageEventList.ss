		<div id="next-up">
			<h2>$NextUp</h2>	
			<ul id="next-up-list">
				<% loop AfterClassEvents("http://afterclass.uiowa.edu/events/categories/CAB/feed/json").Limit(6) %>
				<a href="$Link" target="_blank"><li>
					<span class="event-title">$Title</span><p><% include ACDateLocation %></p>
				</li></a>
				<% end_loop %> 
			</ul>			
			<ul class="button-group">
			  <li><a href="events/" class="tiny button radius more-events-button" target="_blank">view all movies and events</a></li>
			</ul>
		</div>