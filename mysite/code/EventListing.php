<?php
class EventListing extends Page {

	private static $db = array(
				"FirstWords" => "Text",
				"LastWords" => "Text",
				"Date" => "Date",
				"EndDate" => "Date",
				"EventDate" => "Text",
				"EventTime" => "Text",
				"EventLocation" => "Text",
				'EventDescription' => 'HTMLText',
				'Youtube' => 'Text'
		);

	private static $has_one = array(
				"Image" => "Image",
				"CommitteePage" => "CommitteePage"
	);
	
	function getCMSFields() {
		//$committees = DataObject::get('CommitteePage');
		$committees = CommitteePage::get(); 
		$committees_source = $committees->map('ID','Title'); 
	
		$fields = parent::getCMSFields();
		$fields->addFieldToTab('Root.Main', new DropdownField('CommitteePageID', 'Committee', $committees_source) );
		$fields->addFieldToTab('Root.Main', new TextField('FirstWords', 'FirstWords'));
		$fields->addFieldToTab('Root.Main', new TextField('LastWords', 'LastWords'));
		
		$datefield = new DateField('Date','Start Date (Even if event is one day, fill out both Date fields.)');
		$datefield->setConfig('showcalendar', true);
		$fields->addFieldToTab('Root.Main', $datefield);
		
		$datefield2 = new DateField('EndDate','End Date (Please fill out)');
		$datefield2->setConfig('showcalendar', true);
		$fields->addFieldToTab('Root.Main', $datefield2);
		
		//$fields->addFieldToTab('Root.Content.Main', new TextField('EventDate', 'Old EventDate - Will be removed.'));
		$fields->addFieldToTab('Root.Main', new TextField('EventTime', 'EventTime'));
		$fields->addFieldToTab('Root.Main', new TextField('EventLocation', 'EventLocation'));
		$fields->addFieldToTab("Root.Main", new HTMLEditorField('EventDescription'));
		$fields->addFieldToTab("Root.Main", new TextField('Youtube','YouTube ID'));
		$fields->addFieldToTab('Root.Main', new UploadField('Image', 'Image'));
		$fields->removeFieldFromTab("Root.Main","Content");
		return $fields;
	}
}
class EventListing_Controller extends Page_Controller {

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

	public function init() {
		parent::init();

	}
}