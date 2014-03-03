<div class="contain-to-grid">
<nav class="top-bar" role="navigation" data-topbar>
	<ul class="title-area">
		<li class="name"><h1><a href="{$BaseHref}"><img src="{$ThemeDir}/images/cablogo.png" alt="$SiteConfig.Title" /></a></h1></li>
		<li class="toggle-topbar menu-icon"><a href="#"></a></li>
  	</ul>
	<section class="top-bar-section">
		<ul class="right top-menu-items">
			<% loop Menu(1) %>
			<li class="<% if $LinkingMode == "current" || $LinkingMode == "section" %>active<% end_if %>">
				<a href="$Link" title="Go to the $Title.ATT">$MenuTitle</a>
			</li>
			<% end_loop %>
		</ul>
		<ul class="left show-for-large-up">
      		<li><span>entertainment</span> done right.</li>
    	</ul>
	</section>
</nav>
</div>