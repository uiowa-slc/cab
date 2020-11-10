<% include Header %>

<main class="container-xl my-5">
	<div class="row">
		<div class="<% if $Menu(2) %>col-lg-8 col-xl-9 <% else %>col-md-10 offset-md-1<% end_if %>">
			<article id="content">
				 <% if $Photo %>
                    <img src="$Photo.ScaleWidth(300).URL" alt="Photo of $Title" class="float-md-right mb-3 ml-md-3 img-thumbnail" />
                <% end_if %>
                $Breadcrumbs
                <h1>$Title</h1>
                <hr />
                <% if $Position %>
                    <h4>$Position</h4>
                <% end_if %>
                <% if $EmailAddress %>
                    <p>
                        <% if $EmailAddress %>Email: <a href="mailto:$EmailAddress">$EmailAddress</a><% end_if %>
                    </p>
                <% end_if %>
				<div class="content">$Content</div>
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
<% include InstaFeed %>