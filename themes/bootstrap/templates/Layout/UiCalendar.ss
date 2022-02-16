<% include Header %>

<main class="container-xl my-5">
	<div class="row justify-content-center">
		<div class="col-lg-7">
            <%-- $Breadcrumbs --%>
			<article id="content">
			<h1>$Title</h1>
		       $Content
        </article>

    </div>

    <div class="row justify-content-center">
		<div class="col-lg-12">
	            <% if $EventList %>
	            <hr />
	             <h2>Up next:</h2>
                 <div class="row">
                <% loop $EventList %>
                    <div class="col-lg-4"><% include ShowCard %></div>
                <% end_loop %>
                </div>
	            <% else %>
	                  <p>No events are currently listed. Please check back soon.</p>
	            <% end_if %><!-- end upcoming shows if statement -->
		 
			</article>
			$Form
			$PageComments

		</div>
		<% if $Menu(2) %>
            <% include SideBar %>
		<% end_if %>
	</div>
</main>
<% include SocialMedia %>
