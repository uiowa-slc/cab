<?php
class HomePage extends Page {

	private static $db = array(
		"RedLightHeadline" => "Text",
		"RedLightDescription" => "HTMLText",
		"AdditionalInfo" => "HTMLText",
		"NoEvents" => "HTMLText"
	);

	private static $has_one = array(
		"SliderFeature1" => "Int",
		"SliderFeature2" => "Int",
		"SliderFeature3" => "Int",
		"SliderFeature4" => "Int",
		"SliderFeature5" => "Int",
		"SliderFeature6" => "Int"
	);
	
	function getCMSFields() {
		$fields = parent::getCMSFields();

		$fields->removeByName("Content");

		$fields->addFieldToTab("Root.Main", new HTMLEditorField('AdditionalInfo','Show under the "Next Up" Event List.'));
		$fields->addFieldToTab("Root.Main", new HTMLEditorField('NoEvents','Show the following message if there aren\'t any events.'));

		$fields->addFieldToTab("Root.Main", new HTMLEditorField('RedLightDescription', 'Feature Box Content'));
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

	public function SliderEvents(){
		/*
		$events = new ArrayList();
		for ($i = 1; $i <= 6; $i++){
		    $propertyName = "SliderFeature".$i."ID";
		    if ($this->$propertyName){
		    	$event = $this->AfterClassEvent($this->$propertyName);
				if($event) {$events->push($event);} 
		    }
		}
		return $events;
		*/
	}
}
?>