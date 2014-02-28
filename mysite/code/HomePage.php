<?php
class HomePage extends Page {

	private static $db = array(
			"NextUp" => "Text",
			"RedLightHeadline" => "Text",
			"RedLightDescription" => "HTMLText"
			
	);

	private static $has_one = array(
		"SliderFeature1" => "SiteTree",
		"SliderFeature2" => "SiteTree",
		"SliderFeature3" => "SiteTree",
		"SliderFeature4" => "SiteTree",
		"SliderFeature5" => "SiteTree",
		"SliderFeature6" => "SiteTree"
	);
	
	private static $allowed_children = array('HomePageSlider');
	
	function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->addFieldToTab("Root.Main", new TextField('NextUp', 'Headline for upcoming events'));
		$fields->addFieldToTab("Root.Main", new TextField('RedLightHeadline', 'Feature Box Title'));
		$fields->addFieldToTab("Root.Main", new HTMLEditorField('Feature Box Content'));
		return $fields;
		
	}
}
class HomePage_Controller extends Page_Controller {

	/**
	 * An array of actions that can be accessed via a request. Each array element should be an action name, and the
	 * permissions or conditions required to allow the user to access it.
	 *
	 * <code>
	 * array (
	 *     'action', // anyone can access this action
	 *     'action' => true, // same as above
	 *     'action' => 'ADMIN', // you must have ADMIN permissions to access this action
	 *     'action' => '->checkAction' // you can only access this action if $this->checkAction() returns true
	 * );
	 * </code>
	 *
	 * @var array
	 */
private static $allowed_actions = array (
	);

	public function Events(){
		$events = EventListing::get(); 
		if($events)
			return $events;
			
	}
	
	public function OrbitEvents(){
		
	}
	
	
}
?>