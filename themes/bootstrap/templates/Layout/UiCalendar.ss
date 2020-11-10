<% include Header %>

<main class="container-xl my-5">
	<div class="row">
		<div class="<% if $Menu(2) %>col-lg-8 col-xl-9 <% else %>col-md-10 offset-md-1<% end_if %>">
            <%-- $Breadcrumbs --%>
			<article id="content">
		       
		            <% if $EventList %>
		                <% loop $EventList %>
		                    <% include ShowCard %>
		                <% end_loop %>
		            <% else %>
		                  $Top.NoEvents
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
