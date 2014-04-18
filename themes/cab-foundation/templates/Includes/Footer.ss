
<footer class="footer clearfix" role="contentinfo">
    <div class="row ">
        <div class="colgroup large-12 ">
			<div class="col-1-2">
				<a href="http://studentlife.uiowa.edu" class="hide-print"><img src="$ThemeDir/images/dosl-uiowa.png" alt="Division Of Student Life" style="margin-top: -20px;"></a><br>
				<% if $SiteConfig.GroupSummary %>
					<p>$SiteConfig.GroupSummary</p>
				<% else %>

					<p>The Division of Student Life fosters student success by creating and promoting inclusive educationally purposeful services and activities within and beyond the classroom.</p>
				<% end_if %>
				<p>145 iowa memorial union<br>
				cab@uiowa.edu
				</p>
				
			</div>
			<div class="col-1-4 hide-print">
				<div class="colgroup">
					<ul class="footer-nav">
						<% if $SiteConfig.FacebookLink %>
						<li><a href="//$SiteConfig.FacebookLink" target="_blank"><i class="icon-facebook"></i> Facebook</a></li>
						<% end_if %>
						<% if $SiteConfig.TwitterLink %>
						<li><a href="//$SiteConfig.TwitterLink" target="_blank"><i class="icon-twitter"></i> Twitter</a></li>
						<% end_if %>
					</ul>
					<ul class="footer-nav">
						<% loop Menu(1) %>
							<li><a href="$Link">$MenuTitle</a></li>
						<% end_loop %>
					</ul>
				</div>
			</div>
			<div class="col-1-4 hide-print">
				<p>Individuals with disabilities are encouraged to attend all University of Iowa - sponsored events. If you are a person with a disability who requires an accommodation in order to participate in this program, please contact the Center for Student Involvement and Leadership in advance at 319-335-3059.</p> 
				<!--<h4>Support The Division</h4>-->
				
				<!--<a href="https://www.givetoiowa.org/GiveToIowa/WebObjects/GiveToIowa.woa/wa/goTo?area=studentlife" class="appt-btn">Give Online Now</a> -->
			</div>
        </div>
        <hr>
        <p>&copy; $Now.Year <a href="http://www.uiowa.edu/" target="_blank">The University of Iowa</a>. All Rights Reserved.</p>
    </div>
</footer>
