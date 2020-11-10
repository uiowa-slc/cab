<?php

use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\TextField;

class Board extends Page {

	private static $db = array(
		"BoardMember" => "Text",
		"MemberTitle" => "Text",
		"Email" => "Text",
		"Major" => "Text",
		"Year" => "Text",

	);

	private static $has_one = array(
		"Image" => Image::class,
	);

	private static $owns = array(
		'Image',
	);

	private static $icon_class = 'font-icon-p-profile';

	public function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->addFieldToTab('Root.Main', new TextField('BoardMember', 'First and Last Name'));
		$fields->addFieldToTab('Root.Main', new TextField('MemberTitle', 'Title/Position'));
		$fields->addFieldToTab('Root.Main', new TextField('Email', 'Email Address'));
		$fields->addFieldToTab('Root.Main', new TextField('Major', 'Major'));
		$fields->addFieldToTab('Root.Main', new TextField('Year', 'Year in school'));

		$fields->addFieldToTab('Root.Main', new UploadField('Image', 'Image'));

		$fields->removeFieldFromTab("Root.Main", "Content");

		return $fields;
	}
}
