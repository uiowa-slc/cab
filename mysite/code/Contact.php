<?php
use SilverStripe\UserForms\Model\UserDefinedForm;

class Contact extends UserDefinedForm {

	private static $db = array(
		"FirstWords" => "Text",
		"LastWords" => "Text",
		'Tagline' => 'Text',
	);

	private static $has_one = array(

	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();

		return $fields;
	}
}
