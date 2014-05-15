<?php
class HomePage extends AfterClassEventsPage {

	private static $db = array(
		"RedLightHeadline" => "Text",
		"RedLightDescription" => "HTMLText",
		"AdditionalInfo" => "Text"
	);

	private static $has_one = array(
		"SliderFeature1" => "Int",
		"SliderFeature2" => "Int",
		"SliderFeature3" => "Int",
		"SliderFeature4" => "Int",
		"SliderFeature5" => "Int",
		"SliderFeature6" => "Int"
	);
	
	private static $allowed_children = array('HomePageSlider');
	
	function getCMSFields() {
		$fields = parent::getCMSFields();

		$fields->removeByName("Content");
		
		$fields->addFieldToTab("Root.Main", new TextField('AdditionalInfo','Additional Info'));
		
		$fields->addFieldToTab("Root.Main", new AfterClassEventPickerField("SliderFeature1ID", "Slider Event 1", null, null, null, 15));
		$fields->addFieldToTab("Root.Main", new AfterClassEventPickerField("SliderFeature2ID", "Slider Event 2", null, null, null, 15));
		$fields->addFieldToTab("Root.Main", new AfterClassEventPickerField("SliderFeature3ID", "Slider Event 3", null, null, null, 15));
		$fields->addFieldToTab("Root.Main", new AfterClassEventPickerField("SliderFeature4ID", "Slider Event 4", null, null, null, 15));
		$fields->addFieldToTab("Root.Main", new AfterClassEventPickerField("SliderFeature5ID", "Slider Event 5", null, null, null, 15));
		$fields->addFieldToTab("Root.Main", new AfterClassEventPickerField("SliderFeature6ID", "Slider Event 6", null, null, null, 15));

		$fields->addFieldToTab("Root.Main", new TextField('RedLightHeadline', 'Feature Box Title'));
		$fields->addFieldToTab("Root.Main", new HTMLEditorField('RedLightDescription', 'Feature Box Content'));
		return $fields;
		
	}
}
class HomePage_Controller extends AfterClassEventsPage_Controller {

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

	public function SliderEvents(){
		$events = new ArrayList();
		for ($i = 1; $i <= 6; $i++){
		    $propertyName = "SliderFeature".$i."ID";
		    if ($this->$propertyName){
		    	$event = $this->AfterClassEvent($this->$propertyName);
				if($event) {$events->push($event);} 
		    }
		}
		return $events;
	}
}
?>