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
					<% control Children %>
					
                	<tr>
						
                    	<td><a href="$Link">$FirstWords $LastWords</a></td>
                        <td><a href="$Link">$Date.format(n).$Date.format(j).$Date.format(y)</a></td>
                        <td><a href="$Link">$EventTime</a></td>
                        <td><a href="$Link">$EventLocation</a></td>
                    </tr>
					<% end_control %>
                   
                </tbody>
            
            </table>

    </div>
    </div>