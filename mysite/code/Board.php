<?php
class Board extends Page {

	private static $db = array(
				"BoardMember" => "Text",
				"MemberTitle" => "Text",
				"Email" => "Text",
				"Major" => "Text",
				"Year" => "Text",


							
			


		);

	private static $has_one = array(
				"Image" => "Image",
				

	);
	
	function getCMSFields() {
		$fields = parent::getCMSFields();
	$fields->addFieldToTab('Root.Main', new TextField('BoardMember', 'Board member name'));
	$fields->addFieldToTab('Root.Main', new TextField('MemberTitle', 'Member title'));	
	$fields->addFieldToTab('Root.Main', new TextField('Email', 'Member email'));	
	$fields->addFieldToTab('Root.Main', new TextField('Major', 'Member major'));	
	$fields->addFieldToTab('Root.Main', new TextField('Year', 'Member year in school'));	

	$fields->addFieldToTab('Root.Main', new UploadField('Image', 'Image'));

	
	
	



			  $fields->removeFieldFromTab("Root.Main","Content");

		return $fields;
	}
}
class Board_Controller extends Page_Controller {

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