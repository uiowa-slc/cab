<div class="col-lg-4 col-xl-3">
	<% if Menu(2) %>
		<nav class="sidebar" aria-label="Section Navigation">
			<%-- <% if Menu(2) %>
				<% with Level(1) %>
					<h3 class="sidebar__title text-light">
						<% if $LinkOrCurrent = "current" %>$MenuTitle<% else %><a href="$Link" class="text-light">$MenuTitle</a><% end_if %>
					</h3>
				<% end_with %>
			<% end_if %> --%>
			<ul class="sidebar__list">
				<% loop Menu(2) %>
					<li class="$LinkingMode">
						<a href="$Link" class="sidebar__link sidebar__link--$LinkingMode">$MenuTitle</a>

						<%-- second level nav --%>
						<% if $LinkOrSection = "section" && Children %>
							<ul class="sidebar__list sidebar__list--sub">
								<% loop Children %>
									<li class="">
										<a href="$Link" class="sidebar__link sidebar__link--sub">$MenuTitle</a>
									</li>
								<% end_loop %>
							</ul>
						<% end_if %>
						<%-- end second level --%>

					</li>
				<% end_loop %>

			</ul>
		</nav>
	<% end_if %>
</div>