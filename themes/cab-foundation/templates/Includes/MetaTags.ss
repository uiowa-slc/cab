<meta name="description" content="$MetaDescription.ATT" />
<%--http://ogp.me/--%>
<meta property="og:site_name" content="$SiteConfig.Title.ATT" />
<meta property="og:type" content="website" />
<meta property="og:title" content="$Title.ATT" />
<% if $Content %>
	<meta property="og:description" content="$Content.Summary(200)" />
<% else %>
	<meta property="og:description" content="$MetaDescription.ATT" />
<% end_if %>
<meta property="og:url" content="$AbsoluteLink.ATT" />
<% if $Image %>
	<meta property="og:image" content="$Image.URL" />
	<meta property="og:image:width" content="$Image.Width" />
	<meta property="og:image:height" content="$Image.Height" />
<% end_if %>