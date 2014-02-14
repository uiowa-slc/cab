 <link href='http://fonts.googleapis.com/css?family=Arimo&v1' rel='stylesheet' type='text/css'>

<link rel="stylesheet" href="css/nivo-slider.css" type="text/css" media="screen" />
		<% require themedCSS(interior) %> 

   <div id ="content">
    <div id="interior">
    	<h2>$PageTitle <span class="fontweight">$PageTitle1</span></h2>
        	<table class="events">
            	<thead>
                	<tr>
                    	<td>event</td>
                        <td>date</td>
                        <td>time</td>
                        <td>location</td>
                    </tr>
                </thead>
                
                <tbody>
				<tr>
					<td style="height:10px;"></td>
					<td style="height:10px;"></td>
					<td style="height:10px;"></td>
					<td style="height:10px;"></td>
				</tr>
				    <% if $URLSegment == "movies" %>
						<% loop RSSDisplay(6,"http://afterclass.uiowa.edu/events/categoriesrss/cab") %>
	
	                	<tr>
							
	                    	<td><a href="$Link" target="_blank">$Title</a></td>
	                        <td><a href="$Link" target="_blank">$Dates</a></td>
	                        <td><a href="$Link" target="_blank">View Times<img src="$ThemeDir/images/externalLink.jpeg" class = "externalLink"/></a></td>
	                        <td><a href="$Link" target="_blank">$Location</a></td>
	                	</tr>
						<% end_loop %>
                   <% else_if $URLSegment == "events" %>
	                   <% loop RSSDisplay(6,"http://afterclass.uiowa.edu/events/categoriesrss/cab") %>
	
	                	<tr>
							
	                    	<td><a href="$Link" target="_blank">$Title</a></td>
	                        <td><a href="$Link" target="_blank">$Dates</a></td>
	                        <td><a href="$Link" target="_blank">View Times<img src="$ThemeDir/images/externalLink.jpeg" class = "externalLink"/></a></td>
	                        <td><a href="$Link" target="_blank">$Location</a></td>
	                	</tr>
						<% end_loop %>
					<% end_if %>
                   
                </tbody>
            
            </table>

    </div>
    </div>