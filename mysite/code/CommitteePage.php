<?php

use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;

class CommitteePage extends Page {

	private static $db = array(
		'CommitteeDescription' => 'HTMLText',

	);

	private static $has_one = array(
		'Image' => Image::class,

	);

	private static $owns = array(
		'Image',
	);

	private static $has_many = array(

	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->addFieldToTab('Root.Main', new UploadField('Image', 'Committee Image'), 'Content');

		return $fields;
	}

}
