		<div id="next-up">
			<h2>next up:</h2>	
			<ul id="next-up-list" class="small-block-grid-2 medium-block-grid-3 large-block-grid-4">
				<% loop $EventList.limit(8) %>
				<li class="event-{$ID}">
					<div class="bg"></div>
					<div class="event-content">
					<a href="$Link" target="_blank">
					<span class="event-title">$Title</span><p><span class="next-date-time">$NextDateTime.Format("D, F j") $NextDateTime.Time</span></p>
				</a>
				</div>

			</li>
				<% end_loop %> 		
			 <p><a href="events/" class="button" target="_blank">view all movies and events</a></p>
		</div>