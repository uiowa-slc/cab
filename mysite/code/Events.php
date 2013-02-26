<?php
class Events extends Page {

	public static $db = array(
		'LeftColumn' => 'HTMLText',
		'RightColumn' => 'HTMLText',	
		);

	public static $has_one = array(
	);
	
	function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->addFieldToTab("Root.Content.LeftColumn", new HTMLEditorField('LeftColumn'));

		$fields->addFieldToTab("Root.Content.RightColumn", new HTMLEditorField('RightColumn'));
			  $fields->removeFieldFromTab("Root.Content.Main","Content");

		return $fields;
	}
}
class Events_Controller extends Page_Controller {

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