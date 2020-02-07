<?php

use SilverStripe\Assets\Image;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Control\Director;
use SilverStripe\ORM\FieldType\DBHTMLText;
class CommitteePage extends Page {

	private static $db = array(
		'CommitteeDescription' => 'HTMLText',

	);

	private static $has_one = array(
		'Image' => Image::class,

	);

	private static $owns = array(
		'Image'
	);

	private static $has_many = array(

	);
		private static $icon_class = 'font-icon-torsos-all';
	public function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->addFieldToTab('Root.Main', new HTMLEditorField('CommitteeDescription'));
		$fields->addFieldToTab('Root.Main', new UploadField('Image', 'Committee Image'));
		$fields->removeFieldFromTab('Root.Main', 'Content');

		return $fields;
	}
	public function RenderedImage() {

		$absolutePath = Director::baseFolder();
		$name = $this->URLSegment;
		$imagePath = $absolutePath . '/themes/cab/dist/images/committees/' . $name . '.png';
		$image = new DBHTMLText();
		if (file_exists($imagePath)) {
			$image->setValue('<img alt="" role="presentation" src="_resources/themes/cab/dist/images/committees/' . $name . '.png" />');
			return $image;
		} else {
			return false;
		}

	}
	
}
