<% include Header %>

<main class="container-xl my-5">
	<div class="row">
		<div class="col-lg-12">
            <%-- $Breadcrumbs --%>
			<article id="content">
				<h1>$Title</h1>
                $Content
                <div class="row">
				<% loop Children %>
				
				<div class="col-lg-6">
					<div class="row my-md-5">
			   			<div class="col-3 committee-image">

			   				<% if $Image %>
			   				<img src="$Image.URL" class="w-100 d-block" style="border-radius: 300px" alt="" role="presentation">
			   				<% end_if %>
			   				
			   			</div>
			   		 	<div class="col-9">
			   		 		<h3 class="$URLSegment">$Title</h3>
							$Content
						</div>
					</div>
				</div>
				
				<% end_loop %>
				</div>
			</article>
			$Form
			$PageComments

		</div>

	</div>
</main>
<% include SocialMedia %>
<% include InstaFeed %>




