<div class="big-header-container">
	<div class="row big-header show-for-medium-up">
		<div class="large-12 columns">
			<h1><a href="{$BaseHref}"><img src="{$ThemeDir}/images/cablogo.png" alt="$SiteConfig.Title" /></a></h1>
			<p class="tagline"><span>Entertainment Done Right</span></p>
		</div>
	</div>
</div>

</div>
<div class="contain-to-grid">
<nav class="top-bar" role="navigation" data-topbar>
	<ul class="title-area">
		<li class="name hide-for-medium-up"><h1><a href="{$BaseHref}"><img src="{$ThemeDir}/images/cablogo.png" alt="$SiteConfig.Title" /></a></h1></li>
		<li class="toggle-topbar menu-icon"><a href="#"><span></span></a></li>
  	</ul>
	<section class="top-bar-section">
		<ul class="left top-menu-items">
			<% loop Menu(1) %>
			<li class="<% if $LinkingMode == "current" || $LinkingMode == "section" %>active<% end_if %>">
				<a href="$Link" title="Go to the $Title.ATT">$MenuTitle</a>
			</li>
			<% end_loop %>
		</ul>
	</section>
</nav>
<div class="row alert">
	<div class="large-12 columns text-center">
		$SiteConfig.AlertText 
	</div>
</div>
</div>