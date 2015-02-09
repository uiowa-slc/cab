		<div id="next-up">
			<h2>next up:</h2>	
			<ul id="next-up-list" class="small-block-grid-2 medium-block-grid-3 large-block-grid-4">
				<% loop $EventList.limit(8) %>
				<li class="event-{$ID}">
					<div class="event-content">
					<a href="$Link">
					<span class="event-title">$Title.LimitCharacters(30)</span>
					<p><span class="next-date-time">
						<% loop $Dates.Limit(1) %>
							<% include LocalistDateShortNoLinks %>
						<% end_loop %>
					</span>
				</p>
				</a>
				</div>

			</li>
				<% end_loop %> 	
			</ul>	
			 <p><a href="events/" class="button">view all movies and events</a></p>
		</div>