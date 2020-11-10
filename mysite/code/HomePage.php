<?php

use SilverStripe\Forms\HTMLEditor\HTMLEditorField;

class HomePage extends Page {

	private static $db = array(
		"RedLightHeadline" => "Text",
		"RedLightDescription" => "HTMLText",
		"AdditionalInfo" => "HTMLText",
		"NoEvents" => "HTMLText",
	);

	private static $has_one = array(
		"SliderFeature1" => "Int",
		"SliderFeature2" => "Int",
		"SliderFeature3" => "Int",
		"SliderFeature4" => "Int",
		"SliderFeature5" => "Int",
		"SliderFeature6" => "Int",
	);

	private static $icon_class = 'font-icon-p-home';

	public function getCMSFields() {
		$fields = parent::getCMSFields();

		// $fields->removeByName("Content");

		// $fields->addFieldToTab("Root.Main", new HTMLEditorField('AdditionalInfo','Show under the "Next Up" Event List.'));
		$fields->addFieldToTab("Root.Main", new HTMLEditorField('NoEvents', 'Show the following message if there aren\'t any events.'));

		// $fields->addFieldToTab("Root.Main", new HTMLEditorField('RedLightDescription', 'Feature Box Content'));
		return $fields;

	}
}
