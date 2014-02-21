<nav class="top-bar small-12 columns" role="navigation" data-topbar>
	<div class="main-header">
	<h1><a href="{$BaseHref}"><img src="{$ThemeDir}/images/cablogo.png" alt="$SiteConfig.Title" /></a></h1><h2>entertainment done right.</h2>
	</div>
	<section class="top-bar-section">
		<%-- Left Nav Section --%>
		<ul class="left">
			<% loop Menu(1) %>
			<li class="<% if $LinkingMode == "current" || $LinkingMode == "section" %>active<% end_if %>">
				<a href="$Link" title="Go to the $Title.ATT">$MenuTitle</a>
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