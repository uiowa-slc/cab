<footer class="footer clearfix" role="contentinfo">
	<div class="row">
		<div class="medium-6 large-5 columns">
			<a href="http://studentlife.uiowa.edu" class="hide-print footer-logo"><img src="{$ThemeDir}/images/dosl-uiowa.png" alt="Division Of Student Life"></a><br>
				<p>The Division of Student Life fosters student success by creating and promoting inclusive educationally purposeful services and activities within and beyond the classroom.</p>
				<p>145 iowa memorial union<br>
				cab@uiowa.edu
				</p>
				
			<p>$SiteConfig.Address
				<% if $SiteConfig.PhoneNumber %>
					<br />Phone: $SiteConfig.PhoneNumber
				<% end_if %>
				<% if $SiteConfig.EmailAddress %>
					<br />Email: <a href="mailto:{$EmailAddress}">$SiteConfig.EmailAddress</a>
				<% end_if %>
			</p>
		</div>
		<div class="medium-6 large-4 columns">
			<div class="row">
				<div class="small-6 columns">
					<ul class="border-list">
						<% loop Menu(1) %>
							<li><a href="$Link">$MenuTitle</a></li>
						<% end_loop %>
					</ul>
				</div>
				<div class="small-6 columns">
 					<ul class="border-list">
						<li><a href="https://www.facebook.com/uiowacab" target="_blank"><i class="icon-facebook"></i> Facebook</a></li>
						<li><a href="https://twitter.com/uiowaCAB" target="_blank"><i class="icon-twitter"></i> Twitter</a></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="medium-12 large-3 columns">
			<p>Individuals with disabilities are encouraged to attend all University of Iowa - sponsored events. If you are a person with a disability who requires an accommodation in order to participate in this program, please contact the Center for Student Involvement and Leadership in advance at 319-335-3059.</p> 
		</div>
	</div>
	<div class="row">
		<div class="small-12 columns">
			<hr>
			<p>&copy; $Now.Year The University of Iowa. All Rights Reserved.</p>
		</div>
	</div>
</footer>