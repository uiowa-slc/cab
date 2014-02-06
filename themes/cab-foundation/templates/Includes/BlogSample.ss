
<ul class="blog">            
<% if BlogPosts %>
	<% loop BlogPosts %>
		<li>
			<h3><a href="$Link" title="<% _t('VIEWFULL', 'View full post titled -') %> '$Title'">$MenuTitle</a></h3>
			<h4>posted on $Date.Format('n.j.y') by $Author.XML</h4>
			<p>$Content
			<br /><a href="$Link" class="readmore" title="Read Full Post">Read more</a>
			</p>
		</li>
	<% end_loop %>
<% end_if %>
</ul>