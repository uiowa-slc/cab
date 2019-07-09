<?php

use SilverStripe\Assets\Image;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Control\Director;
class CommitteePage extends Page {

	private static $db = array(
		'CommitteeDescription' => 'HTMLText',

	);

	private static $has_one = array(
		'Image' => Image::class,

	);

	private static $has_many = array(

	);
		private static $icon_class = 'font-icon-torsos-all';
	public function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->addFieldToTab('Root.Main', new HTMLEditorField('CommitteeDescription'));
		$fields->addFieldToTab('Root.Main', new UploadField(Image::class, 'Committee Image'));
		$fields->removeFieldFromTab('Root.Main', 'Content');

		return $fields;
	}
	public function RenderedImage() {

		$absolutePath = Director::baseFolder();
		$name = $this->URLSegment;
		$imagePath = $absolutePath . '/themes/cab-foundation/images/committees/' . $name . '.png';

		if (file_exists($imagePath)) {
			$image = '<img src="themes/cab-foundation/images/committees/' . $name . '.png" />';
			return $image;
		} else {
			return false;
		}

	}
	
}
