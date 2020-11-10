<% include Header %>
    <section class="bg-dark social-media text-white py-3 py-sm-6">
    <div class="container-xl">
        <div class="row d-flex align-items-center justify-content-center">
            <div class="col-lg-10">
                <h2 class="hero-header">Entertainment Done Right.</h2>
               <p class="lead">CAB is your source for entertainment on campus! We provide a wide range of awesome activities for students every week throughout the year! Whether you're laughing yourself silly at one of our great comedy shows, or on the edge of your seat watching one of our incredible weekend movie series, we guarantee that you'll leave satisfied! We are entertainment DONE RIGHT!</p>

            </div>
            
<%--                 <div class="col-sm-4 offset-md-1">
                    <div id="twitter-root"></div>
                     <div><a class="twitter-timeline" data-theme="light" data-width="600" data-height="300" href="$SiteConfig.TwitterLink">Tweets by uilectures</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></div>
                </div> --%>
         
        </div>
    </div>
</section>

<%-- <section class="py-3 py-sm-6 my-5 bg-gray">
    <div class="container-xl">
        <div class="row">
            <div class="col-sm-6">
                <h3 class="display-3">Our Mission</h3>
            </div>
            <div class="col-sm-6">
                <p class="lead">CAB is your source for entertainment on campus! We provide a wide range of awesome activities for students every week throughout the year! Whether you're laughing yourself silly at one of our great comedy shows, or on the edge of your seat watching one of our incredible weekend movie series, we guarantee that you'll leave satisfied! We are entertainment DONE RIGHT!</p>
            </div>
        </div>
    </div>
</section> --%>

<main id="content" class="my-3 mb-5 my-lg-6">
    <div class="container-xl">
        <div class="row justify-content-center">

            <div class="col-lg-10">
                $Content

            </div>

        </div>
        <hr class="my-5" />
        <div class="row justify-content-center">

            <div class="col-lg-8">
                    <% with $Calendar %>
                        <% if $EventList %>
                             <h2>Up next:</h2>
                            <% loop $EventList %>
                                <% include ShowCard %>
                            <% end_loop %>
                                        <p class="text-center">
            <a href="calendar/" class="btn btn-outline-primary text-center">View Calendar</a>
            </p>
                        <% else %>
                              $Top.NoEvents
                        <% end_if %><!-- end upcoming shows if statement -->
                    <% end_with %>
            </div>

        </div>

    </div>
</main>




<section class="py-5">
    <div class="container-xl">
        <h2 class="text-center display-3 mb-5">Meet Our Directors</h2>
        <div class="stafflist">
            <ul class="stafflist__list list-unstyled">
                <% loop RandomStaffMembers(8) %>
                    <% include StaffPageListItem %>
                <% end_loop %>
            </ul>
            <p class="text-center">
            <a href="about/" class="btn btn-outline-primary text-center">View all Directors</a>
            </p>
        </div>
    </div>
</section>




<% include SocialMedia %>

<% include InstaFeed %>