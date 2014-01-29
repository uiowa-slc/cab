<?php
class HomePage extends Page {

	private static $db = array(
			"NextUp" => "Text",
			"RedLightHeadline" => "Text",
			'RedLightDescription' => 'HTMLText',

	);

	private static $has_one = array(
		"SliderFeature1" => "SiteTree",
		"SliderFeature2" => "SiteTree",
		"SliderFeature3" => "SiteTree",
		"SliderFeature4" => "SiteTree",
		"SliderFeature5" => "SiteTree",
		"SliderFeature6" => "SiteTree",


	);
	private static $allowed_children = array(	'HomePageSlider');
	
	function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->addFieldToTab("Root.Main", new TextField('NextUp', 'Headline for upcoming events'));
		$fields->addFieldToTab("Root.Main", new TextField('RedLightHeadline', 'RedLightHeadline'));
		$fields->addFieldToTab("Root.Main", new HTMLEditorField('RedLightDescription'));
		
		$simpleTree1 = new TreeDropdownField('SliderFeature1ID', 'First Slider Event (To remove the slider, select the very first empty item on top)', 'EventListing');
		//$simpleTree1->setHasEmptyDefault(true);
		$fields->addFieldToTab("Root.SliderEvents",$simpleTree1);

		$simpleTree2 = new TreeDropdownField('SliderFeature2ID', 'Second Slider Event', 'EventListing');
		//$simpleTree2->setHasEmptyDefault(true);
		$fields->addFieldToTab("Root.SliderEvents",$simpleTree2);
		
		$simpleTree3 = new TreeDropdownField('SliderFeature3ID', 'Third Slider Event', 'EventListing');
		//$simpleTree3->setHasEmptyDefault(true);
		$fields->addFieldToTab("Root.SliderEvents",$simpleTree3);

		$simpleTree4 = new TreeDropdownField('SliderFeature4ID', 'Fourth Slider Event', 'EventListing');
		//$simpleTree4->setHasEmptyDefault(true);
		$fields->addFieldToTab("Root.SliderEvents",$simpleTree4);	
		
		$simpleTree5 = new TreeDropdownField('SliderFeature5ID', 'Fifth Slider Event', 'EventListing');
		//$simpleTree5->setHasEmptyDefault(true);
		$fields->addFieldToTab("Root.SliderEvents",$simpleTree5);	
	
		
		$simpleTree6 = new TreeDropdownField('SliderFeature6ID', 'Sixth Slider Event', 'EventListing');
		//$simpleTree6->setHasEmptyDefault(true);
		$fields->addFieldToTab("Root.SliderEvents",$simpleTree6);	
		
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
		//$events = DataObject::get("EventListing");	
		$events = EventListing::get(); 
		if($events)
			return $events;
			
	}
	
	
	
}
?>