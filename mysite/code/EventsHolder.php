<?php
class EventsHolder extends Page {

	private static $db = array(

	);

	private static $has_one = array(
	);
	
	
	
	public function getCMSFields() {
		$fields = parent::getCMSFields();

		$fields->removeFieldFromTab("Root.Main","Content");

		return $fields;
	}
}
