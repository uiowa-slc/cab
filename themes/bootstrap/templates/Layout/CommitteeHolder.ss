<% include Header %>

<main class="container-xl my-5">
	<div class="row">
		<div class="col-md-10 offset-md-1">
            <%-- $Breadcrumbs --%>
			<article id="content">
				<h1>$Title</h1>
                $Content

				<% loop Children %> 
					<div class="row my-md-5">
			   			<div class="col-3 committee-image">

			   				<% if $Image %>
			   				<img src="$Image.URL" class="w-100 d-block" style="border-radius: 300px" alt="" role="presentation">
			   				<% else %>
			   				$RenderedImage
			   				<% end_if %>
			   				
			   			</div>
			   		 	<div class="col-9 my-lg-4">
			   		 		<h3 class="$URLSegment">$Title</h3>
							$CommitteeDescription
						</div>
					</div>
				<% end_loop %>

			</article>
			$Form
			$PageComments

		</div>

	</div>
</main>





