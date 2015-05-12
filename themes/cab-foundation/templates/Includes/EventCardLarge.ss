<div class="row">
	<div class="large-4 columns">
		<a href="$Link" target="_blank"><img src="$Image.URL" alt="Image for $Title" /></a>
	</div>
	<div class="large-8 columns">
		<h3><a href="$Link">$Title</a></h3>
        	<% loop $Dates.Limit(1) %>
				<% include LocalistDateShortNoLinks %>
			<% end_loop %><br />
         	$Content.Summary(50)
         	</p>
	</div>
</div>
