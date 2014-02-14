
<ul class="blog">            
<% if BlogPosts %>
	<% loop BlogPosts.limit(2) %>
		<li>
			<h3><a href="$Link" title="<% _t('VIEWFULL', 'View full post titled -') %> '$Title'">$MenuTitle</a></h3>
			<p>posted on $Date.Format('n.j.y') by $Author.XML</p>
			<p>$Content</p>
			<br />
			<p><a href="$Link" class="readmore" title="Read Full Post">Read more</a>
			</p>
		</li>
	<% end_loop %>
<% end_if %>
</ul>