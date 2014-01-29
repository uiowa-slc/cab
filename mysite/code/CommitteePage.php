<?php
class CommitteePage extends Page {

	private static $db = array(
				"CommitteeName" => "Text",
				'CommitteeDescription' => 'HTMLText',	
				"CommitteeEvent" => "Text",
				"EventDate" => "Text",
				"CommitteeEvent1" => "Text",
				"EventDate1" => "Text",
				"CommitteeEvent2" => "Text",
				"EventDate2" => "Text",

		);

	private static $has_one = array(
				"Image" => "Image",

	);
	
    private static $has_many = array(
        'EventListings' => 'EventListing'
    );
    
	function getCMSFields() {
		$fields = parent::getCMSFields();
	$fields->addFieldToTab('Root.Main', new TextField('CommitteeName', 'CommitteeName'));
	
	$fields->addFieldToTab("Root.Main", new HTMLEditorField('CommitteeDescription'));
	$fields->addFieldToTab('Root.Main', new TextField('CommitteeEvent', 'Committee Event'));
	$fields->addFieldToTab('Root.Main', new TextField('EventDate', 'Event Date'));
	$fields->addFieldToTab('Root.Main', new TextField('CommitteeEvent1', 'Committee Event 1'));
	$fields->addFieldToTab('Root.Main', new TextField('EventDate1', 'Event Date 1'));
	$fields->addFieldToTab('Root.Main', new TextField('CommitteeEvent2', 'Committee Event 2'));
	$fields->addFieldToTab('Root.Main', new TextField('EventDate2', 'Event Date 2'));
	



			  $fields->removeFieldFromTab("Root.Main","Content");

		return $fields;
	}
}
class CommitteePage_Controller extends Page_Controller {

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