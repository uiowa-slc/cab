<?php

use SilverStripe\Assets\Image;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use SilverStripe\AssetAdmin\Forms\UploadField;
class BoardHolder extends Page {

	private static $db = array(
		"MissionStatement" => "HTMLText",
	);

	private static $has_one = array(
		"Image" => Image::class,
	);
	private static $allowed_children = array(	'Board');
	private static $icon_class = 'font-icon-torsos-all';
	public function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->addFieldToTab("Root.Main", new HTMLEditorField('MissionStatement'));
		$fields->addFieldToTab('Root.Main', new UploadField('Image', 'Image'));	
		$fields->removeFieldFromTab("Root.Main","Content");

		return $fields;
	}
}
