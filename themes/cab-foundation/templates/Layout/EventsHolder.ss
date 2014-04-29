<div id ="content" class = "row">
    <div id="interior" class="large-12 large-centered column">
		<h2>$PageTitle <span class="fontweight">$PageTitle1</span></h2>
    	<table class="event-table">
            <thead>
            	<tr>
                	<td>event</td>
                    <td>date</td>
                    <td>time</td>
                    <td>location</td>
                </tr>
            </thead>
            <tbody>
				<% loop RSSDisplay(100,"http://afterclass.uiowa.edu/events/categories/CAB/feed/rss") %>
            	<tr>
                	<td><a href="$Link" target="_blank">$Title</a></td>
                    <td><a href="$Link" target="_blank">$Dates</a></td>
                    <td><a href="$Link" target="_blank">View Times &rarr;</a></td>
                    <td><a href="$Link" target="_blank">$Location</a></td>
            	</tr>
				<% end_loop %>
            </tbody>
       	</table>
    </div>  
</div>