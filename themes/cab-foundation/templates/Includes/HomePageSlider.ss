<% if SliderEvents || $AfterClassEvents("CAB") %>
				<ul class="orbit-slider" data-orbit data-options="animation:fade; resume_on_mouseout:true;">
					<% if SliderEvents %>
						<% loop SliderEvents %>
							<% include SliderEvent %>
						<% end_loop %>
					<% else %>
						<% loop $AfterClassEvents("CAB") %>
							<% include SliderEvent %>
						<% end_loop %>
					<% end_if %>
				</ul>
			<% end_if %>       