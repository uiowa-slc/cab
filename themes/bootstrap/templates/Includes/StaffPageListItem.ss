<li class="stafflist__item card">
	<% if not $Parent.HideLinksToStaffPages && not $HidePageLink %>

		<% if $Photo %>
			<% if $Parent.PhotoOrientation == "Portrait" %>
				<a href="$Link">
					<img src="$Photo.FocusFill(234,350).URL" alt="Photograph of $FirstName $LastName" class="card-img-top" loading="lazy" />
				</a>
			<% else %>
				<a href="$Link">
					<img src="$Photo.FocusFill(350,234).URL" alt="Photograph of $FirstName $LastName" class="card-img-top" loading="lazy" />
				</a>
			<% end_if %>
		<% else %>
			<% if $Parent.PhotoOrientation == "Portrait" %>
				<a href="$Link">
					<img src="{$ThemeDir}/dist/images/dosl.gif" alt="Placeholder photo for $FirstName $LastName" class="card-img-top" loading="lazy" />
				</a>
			<% else %>
				<a href="$Link">
					<img src="{$ThemeDir}/dist/images/dosl.gif" alt="Placeholder photo for $FirstName $LastName" class="card-img-top" loading="lazy" />
				</a>
			<% end_if %>
		<% end_if %>
		<div class="stafflist__text card-body">
			<h5 class="stafflist__name card-title">
				<a href="$Link">$FirstName $LastName</a>
			</h5>
			<% if $Position %>
				<p class="card-text small">
					<em class="stafflist__position">$Position</em>
				</p>
			<% end_if %>
		</div>
	<% else %>
		<div class="stafflist__link">
			<% if $Photo %>
				<div class="stafflist__img">
					<% if $Parent.PhotoOrientation == "Portrait" %>
						<img src="$Photo.Fill(234,350).URL" alt="Photograph of $FirstName $LastName" class="card-img-top" loading="lazy" />
					<% else %>
						<img src="$Photo.Fill(350,234).URL" alt="Photograph of $FirstName $LastName" class="card-img-top" loading="lazy" />
					<% end_if %>
				</div>
			<% else %>
				<div href="$Link" class="stafflist__img">
					<% if $Parent.PhotoOrientation == "Portrait" %>
						<img src="{$ThemeDir}/dist/images/dosl.png" alt="Placeholder photo for $FirstName $LastName" class="card-img-top" loading="lazy" />
					<% else %>
						<img src="{$ThemeDir}/dist/images/dosl.png" alt="Placeholder photo for $FirstName $LastName" class="card-img-top" loading="lazy" />
					<% end_if %>
				</div>
			<% end_if %>
			<div class="stafflist__text card-body">
				<h5 class="stafflist__name card-title">$FirstName $LastName</h5>
				<% if $Position %>
					<p class="card-text">
						<em class="stafflist__position">$Position</em>
					</p>
				<% end_if %>
			</div>
		</div>
	<% end_if %>
</li>