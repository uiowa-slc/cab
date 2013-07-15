 <link href='http://fonts.googleapis.com/css?family=Arimo&v1' rel='stylesheet' type='text/css'>

<link rel="stylesheet" href="css/nivo-slider.css" type="text/css" media="screen" />
	
		<% require themedCSS(interior) %> 
 
	
		
  <div id ="content">
      <div id="interior" class="content">
		 <h2 >search results</h2>
		 <p>You searched for '{$Query}' :</p>
 <% if Results %>
	    <ul id="SearchResults">
	      <% loop Results %>
	        <li>
	            <% if MenuTitle %>
	              <h3><a class="searchResultHeader" href="$Link">$MenuTitle</a></h3>
	            <% else %>
	              <h3><a class="searchResultHeader" href="$Link">$Title</a></h3>
	            <% end_if %>
	        </li>
	      <% end_loop %>
	    </ul>
	  <% else %>
	    <p>
				<%-- Example of a translatable string (see http://doc.silverstripe.org/i18n) --%>
				<% _t("Page_results.ss.NORESULTS", "Sorry, your search query did not return any results.") %>
				<%-- By the way, template comments marked like this will be excluded from the HTML output --%>
			</p>
	  <% end_if %>

	  <% if Results.MoreThanOnePage %>
	    <div id="PageNumbers">
	      <% if Results.NotLastPage %>
	        <a class="next" href="$Results.NextLink" title="View the next page">Next</a>
	      <% end_if %>
	      <% if Results.NotFirstPage %>
	        <a class="prev" href="$Results.PrevLink" title="View the previous page">Prev</a>
	      <% end_if %>
	      <span>
	        <% loop Results.SummaryPagination(5) %>
	          <% if CurrentBool %>
	            $PageNum
	          <% else %>
	            <a href="$Link" title="View page number $PageNum">$PageNum</a>
	          <% end_if %>
	        <% end_loop %>
	      </span>
      
	    </div>
	 <% end_if %>   
    
    </div>
    </div>
	
</div>