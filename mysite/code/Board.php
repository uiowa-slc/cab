<?php
class Board extends Page {

	public static $db = array(
				"BoardMember" => "Text",
				"MemberTitle" => "Text",
				"Email" => "Text",
				"Major" => "Text",
				"Year" => "Text",


							
			


		);

	public static $has_one = array(
				"Image" => "Image",
				

	);
	
	function getCMSFields() {
		$fields = parent::getCMSFields();
	$fields->addFieldToTab('Root.Content.Main', new TextField('BoardMember', 'Board member name'));
	$fields->addFieldToTab('Root.Content.Main', new TextField('MemberTitle', 'Member title'));	
	$fields->addFieldToTab('Root.Content.Main', new TextField('Email', 'Member email'));	
	$fields->addFieldToTab('Root.Content.Main', new TextField('Major', 'Member major'));	
	$fields->addFieldToTab('Root.Content.Main', new TextField('Year', 'Member year in school'));	

	$fields->addFieldToTab('Root.Content.Main', new ImageField('Image', 'Image'));

	
	
	



			  $fields->removeFieldFromTab("Root.Content.Main","Content");

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
	public static $allowed_actions = array (
	);

	public function init() {
		parent::init();

	}
}