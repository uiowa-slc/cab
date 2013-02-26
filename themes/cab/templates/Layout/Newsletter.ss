 <link href='http://fonts.googleapis.com/css?family=Arimo&v1' rel='stylesheet' type='text/css'>

<link rel="stylesheet" href="css/nivo-slider.css" type="text/css" media="screen" />
	
		<% require themedCSS(interior) %> 
 
	
		
 <div id ="content">
    <div id="interior">
    	<h2 class="float">$FirstWords<span class="fontweight">$LastWords</span></h2>
        <h3 class="tagline">$Tagline</h3>
        <div class="clear"></div>
        <form>
        	<div class="labels">
                <label for="name" class="name1">Your Name</label><br/>
                <label for="email" class="email1">Your Email</label><br/>
                <label for="student" class="student1">Student at the University of Iowa?</label>
                <label for="format" class="format1">Preferred Format</label>

            </div>
            <div class="inputs">
                <input type="name" name="name" /> 
                <input type="name" name="email" /> 
					<div class="field-group">
    					<ul class="interestgroup_field" id="MERGE3">
                        	<li><input type="radio" name="MERGE3" id="MERGE3-0" value="Yes"> <label for="MERGE3-0">Yes</label></li>
                            <li><input type="radio" name="MERGE3" id="MERGE3-1" value="No"> <label for="MERGE3-1">No</label></li>
                         </ul>
					</div>
                  	<div class="mergeRow">
                        <div class="field-group groups">
                            <ul class="interestgroup_field">
                                <li><input type="radio" name="EMAILTYPE" id="EMAILTYPE_HTML" value="html" checked=""><label for="EMAILTYPE_HTML">HTML</label></li>
                                <li><input type="radio" name="EMAILTYPE" id="EMAILTYPE_TEXT" value="text"><label for="EMAILTYPE_TEXT">Text</label></li>
                                <li><input type="radio" name="EMAILTYPE" id="EMAILTYPE_MOBILE" value="mobile"><label for="EMAILTYPE_MOBILE">Mobile</label></li>
                            </ul>
                        </div>
                    </div>
                  <input class="subscribe newsletter" type="submit" value="Subscribe"> 

                <div class="clear"></div>
              </div>	
            <div class="clear"></div>
        
        
        
        
        
			

		</form>
        	
    
    </div>
    </div>