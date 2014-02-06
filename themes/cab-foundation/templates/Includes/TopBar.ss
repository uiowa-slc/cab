<nav class="top-bar" role="navigation" data-topbar>

	<section class="top-bar-section">

	<div class="main-header">
	<h1><a href="{$BaseHref}"><img src="{$ThemeDir}/images/cablogo.png" alt="$SiteConfig.Title" /></a></h1><h2>entertainment done right.</h2>
	
	</div>
		<%-- Left Nav Section --%>
		<ul class="left">
			<% loop Menu(1) %>
			<li class="<% if $LinkingMode == "current" || $LinkingMode == "section" %>active<% end_if %><% if $Children %> has-dropdown<% end_if %>">
				<a href="$Link" title="Go to the $Title.ATT">$MenuTitle</a>
				<% if $Children %>
				<ul class="dropdown">
					<li><label>$MenuTitle</label></li>
					<% loop $Children %>
					<li class="<% if $LinkingMode == "current" || $LinkingMode == "section" %>active<% end_if %><% if $Children %> has-dropdown<% end_if %>">
						<a href="$Link" title="Go to the $Title.ATT">$MenuTitle</a>
						<% if $Children %>
						<ul class="dropdown">
							<% loop $Children %>
							<li class="<% if $LinkingMode == "current" || $LinkingMode == "section" %>active<% end_if %>"><a href="$Link" title="Go to the $Title.ATT">$MenuTitle</a></li>
							<% end_loop %>
						</ul>
						<% end_if %>
					</li>
					<% end_loop %>
					<li><a href="$Link">See all &rarr;</a></li>
				</ul>
				<% end_if %>
			</li>
			<% if not $Last %><li class="divider"></li><% end_if %>
			<% end_loop %>
		</ul>
		<%-- Right Nav Section --%>
		<ul class="right">
			<li class="toggle-topbar menu-icon"><a href=""><span>Menu</span></a></li>
		</ul>
	</section>
</nav>
