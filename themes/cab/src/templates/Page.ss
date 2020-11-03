<!doctype html>
<html class="no-js" lang="$ContentLocale.ATT" dir="$i18nScriptDirection.ATT">
<head>
    $GlobalAnalytics
	<% base_tag %>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title><% if $MetaTitle %>$MetaTitle<% else %>$Title<% end_if %> | $SiteConfig.Title | The University of Iowa</title>
	<% include MetaTags %>
	<% include FavIconTags %>
	<link href="$ThemeDir/dist/css/main.css" rel="stylesheet">
	<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/themes/smoothness/jquery-ui.css" />
	<script type="text/javascript" src="//use.typekit.net/qjk7tjr.js"></script>
	<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
</head>
<body class="$ClassName.ATT">
	<% include UiowaBar %>
	<% include TopBar %>

	<div class="main typography $ClassName" role="main">
		$Layout
	</div>
	<% include Footer %>
<%-- 	<% include MdBar %> --%>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js"></script>
  	<script src="https://maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyBQT5P05OYFuDebkjpf-pj6oZhjGXtc4SA"></script>
	<script src="$ThemeDir/dist/scripts/main.min.js"></script>
	$Analytics
	<script>(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=270867676312194&version=v2.4";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</script>
</body>
</html>
