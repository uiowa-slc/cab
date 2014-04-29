<div id ="content" class = "row">
    <div id="interior" class="large-12 large-centered column">
		<h2>$PageTitle <span class="fontweight">$PageTitle1</span></h2>
    	<table class="event-table">
            <thead>
            	<tr>
                	<td>event</td>
                    <td>date + time</td>
                    <td>location</td>
                </tr>
            </thead>
            <tbody>
				<% loop AfterClassFeed("http://afterclass.uiowa.edu/events/categories/CAB/feed/json") %>
            	<tr>
                	<td><a href="$Link" target="_blank">$Title</a></td>
                    <td><a href="$Link" target="_blank">$NextDateTime.Format("D, F n")<% if $NextDateTime.Time %> at<% end_if %> $NextDateTime.Time <% if $DateTimeCount > "1" %> (more)<% end_if %> </a></td>
                    <td><a href="$Link" target="_blank">$Location<%if $Location %>,<% end_if %> $Venue</a></td>
            	</tr>
				<% end_loop %>
            </tbody>
       	</table>
    </div>  
</div>