<?php
class HomePageSlider extends Page {

	public static $db = array(
				"FeatureTitle" => "Text",
				"FeatureDay" => "Text",
				"FeatureTime" => "Text",
				"FeatureLocation" => "Text",
	);

	public static $has_one = array(
				"Image" => "Image",
				"EventListing" => "EventListing"
	);
	
	function getCMSFields() {
		$fields = parent::getCMSFields();
		
		//$eventListings = DataObject::get("EventListing");
		
		$eventListings = EventListing::get();
		$eventListings->sort('Title');
		$eventListingsSource = $eventListings->toDropDownMap('ID','Title'); 
		
	$fields->addFieldToTab('Root.Main', new TextField('FeatureTitle', 'Event Title'));
	$fields->addFieldToTab('Root.Main', new TextField('FeatureDay', 'Event Day'));	
	$fields->addFieldToTab('Root.Main', new TextField('FeatureTime', 'Event Time'));	
	$fields->addFieldToTab('Root.Main', new TextField('FeatureLocation', 'Event Location'));	

	$fields->addFieldToTab('Root.Main', new UploadField('Image', 'Image'));
	//$fields->addFieldToTab('Root.Content.Main', new TreeDropDownField('EventListingID', 'Link slider to this event:', $eventListingsSource));
	//$fields->addFieldToTab('Root.Content.Main', new LabelField('EventRequired', 'This is REQUIRED'));
	
	
	



			  $fields->removeFieldFromTab("Root.Main","Content");

		return $fields;
	}
}
class HomePageSlider_Controller extends Page_Controller {

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
	public static $allowed_actions = array (
	);

	public function init() {
		parent::init();

	}
}