<% include Header %>
    <section class="bg-dark social-media text-white py-3 py-sm-6">
    <div class="container-xl">
        <div class="row d-flex align-items-center justify-content-center">
            <div class="col-lg-10">
                <h2 class="hero-header">Entertainment Done Right.</h2>
               <p class="lead">CAB is your source for entertainment on campus! We provide a wide range of awesome activities for students every week throughout the year! Whether you're laughing yourself silly at one of our great comedy shows, or on the edge of your seat watching one of our incredible weekend movie series, we guarantee that you'll leave satisfied! We are entertainment DONE RIGHT!</p>

            </div>
         
        </div>
    </div>
</section>


<main id="content" class="my-3 mb-5 my-lg-6">
    <div class="container-xl">
        <div class="row justify-content-center">

            <div class="col-lg-10">
                $Content
            </div>

        </div>
        <% if $Calendar.EventList %>
            <hr class="my-5" />
            <div class="row justify-content-center">
                <div class="col-lg-7">
                    <% with $Calendar %>
                        <h2>Up next:</h2>
                        <% loop $EventList %>
                            <% include ShowCard %>
                        <% end_loop %>
                        <p class="text-center">
                            <a href="calendar/" class="btn btn-outline-primary text-center">View Calendar</a>
                        </p> 
                    <% end_with %>
                </div>
            </div>
        <% end_if %>
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