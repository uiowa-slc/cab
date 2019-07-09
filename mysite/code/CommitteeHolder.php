<?php

use SilverStripe\Forms\TextField;
class CommitteeHolder extends Page {

	private static $db = array(
		"PageTitle" => "Text",
		
		);

	private static $has_one = array(
	
	);

	private static $icon_class = 'font-icon-torsos-all';
	
	
	private static $allowed_children = array('CommitteePage');
	
	public function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->addFieldToTab('Root.Main', new TextField('PageTitle', 'Headline'));
		$fields->removeFieldFromTab("Root.Main","Content");	

		return $fields;
	}
}
