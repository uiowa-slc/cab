<?php
class EventsHolder extends Page {

	private static $db = array(
		"PageTitle" => "Text",
		"PageTitle1" => "Text",
		);

	private static $has_one = array(
	);
	
	
	private static $allowed_children = array(	'EventListing');
	
	function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->addFieldToTab('Root.Main', new TextField('PageTitle', 'Headline, first word'));
		$fields->addFieldToTab('Root.Main', new TextField('PageTitle1', 'Same headline, second word'));
			 $fields->removeFieldFromTab("Root.Main","Content");

		return $fields;
	}
}
class EventsHolder_Controller extends Page_Controller {

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
