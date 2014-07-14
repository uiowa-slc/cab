<div class="row">
	<div class="large-4 columns">
		<a href="$Link" target="_blank"><img src="$ImageURL" alt="Image for $Title" /></a>
	</div>
	<div class="large-8 columns">
		<h3><a href="$Link">$Title</a></h3>
         	<p>Next Date: <% include ACDateLocation %>
         	<% if $DateTimeCount > "1" %>(more times)<% end_if %></a><br />
         	$Content.Summary(50)
         	</p>
	</div>
</div>
