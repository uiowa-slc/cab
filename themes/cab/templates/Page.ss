<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<% base_tag %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Campus Activities Board at The University of Iowa</title>
<link href='http://fonts.googleapis.com/css?family=Arimo&v1' rel='stylesheet' type='text/css'>

<link rel="stylesheet" href="css/nivo-slider.css" type="text/css" media="screen" />
<link rel="stylesheet" href="division-bar/css/_division-bar.css" />
		<% require themedCSS(cab) %> 
		<% require themedCSS(nivo-slider) %> 
		<% require themedCSS(default) %> 



	<script type="text/javascript" src="$ThemeDir/javascript/js/backstretch/lib/jquery-1.4.2.min.js"></script>
	    <script type="text/javascript" src="$ThemeDir/javascript/js/backstretch/jquery.backstretch.min.js"></script>
	<% loop SiteConfig %>
	<script type="text/javascript" src="$ThemeDir/javascript/js/backstretch/backstretch_{$BackgroundImage}.js"></script> 
	<% end_loop %>
	

    <script src="$ThemeDir/javascript/js/jquery.min.js" type="text/javascript"></script>
    <script src="$ThemeDir/javascript/js/jquery.nivo.slider.pack.js" type="text/javascript"></script>
    <script src="$ThemeDir/javascript/js/nivoslider.js" type="text/javascript"></script>
    <script type="text/javascript" src="{$BaseHref}/division-bar/js/division-bar.js"></script>

</head>

<body class = "ZBody">
	<%include DivisionBar%> 
	<div id="preheader">	
    		<h1><a href="/">Cab</a> </h1>
            <h2><a href="/">Entertainment Done <span class="white">Right.</span></a></h2>
            <a href="http://uiowa.edu"><img id="dome" src="$ThemeDir/images/dome.png" /></a>
           <!-- <div id="search_box">
            
            
            <form class="search" action="/home/SearchForm" method="get" enctype="application/x-www-form-urlencoded">
<input class="searcheverything" type="text" name="Search" value="" placeholder="search everything" >
<input class="action " id="SearchForm_SearchForm_action_results" type="submit" name="action_results" value="Go" title="Go" style="display: none;">
			</form>
            
			
            </div>-->
            <div class="clear"></div>
            
    </div>
	
	 <div id="nav">
		<% include Navigation %>
	</div>
 


$Layout


	<div id="footer"> 
	<div class="margin">

        
        <p class="copy"> Copyright © <a href="http://uiowa.edu">The University of Iowa.</a> $Now.Year All rights reserved</p> 
       <% include Navigation %>
        <p>Individuals with disabilities are encouraged to attend all University of Iowa - sponsored events. If you are a person with a disability who requires an accommodation in order to participate in this program, please contact the Center for Student Involvement and Leadership in advance at 319-335-3059. </p>
	</div><!-- end margin -->
</div>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-426753-39']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</body>
</html>