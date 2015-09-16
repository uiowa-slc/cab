<div class="row event-card-large">
	<div class="event-large-list large-4 columns">

		<a href="{$Link}" class="image-container b-lazy" data-src="$Image.URL" style="background-image: data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==; text-indent: -9999px;"></a>
	
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
