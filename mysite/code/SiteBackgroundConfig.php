<?php
 
class SiteBackgroundConfig extends DataExtension {
     

    static $db = array(
        'BackgroundImage' => 'Text'
    );
 
    public function updateCMSFields(FieldList $fields) {
    
    	$background_list = array("cultural", "cultural_otheroption", "movie", "movie_otheroption", "variety", "variety_otheroption", "roads", "roads_otheroption", "comedy", "comedy_otheroption", "nighthawks", "nighthawks_otheroption", );
    	
       $fields->addFieldToTab('Root.Main', new DropdownField('BackgroundImage', 'Background Image', $background_list) );
    }
}