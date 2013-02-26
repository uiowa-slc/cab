<?php
class Page extends SiteTree {

	public static $db = array(
	);

	public static $has_one = array(
	
	);
	
	function getCMSFields() {
		$fields = parent::getCMSFields();
		return $fields;
	}
	function BlogPosts() {
		$lectures = DataObject::get("BlogEntry", "Date <= CURDATE()", "EventDate ASC", "");
		return $lectures;
	}


}
class Page_Controller extends ContentController {

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
	
	public function EventList($number = 0) {
		#Date > NOW() AND EndDate IS NULL OR EndDate > NOW()
		$events = DataObject::get("EventListing","IF(EndDate IS NULL,Date > NOW(),EndDate > NOW())","Date ASC",null,$number);
		#$events->sort("EventDate","DESC");
		return $events;
	}
	
	public function AllEvents(){
		$events = DataObject::get("EventListing");
		$events->sort("EventDate","DESC");
		return $events;
	}
	
	public function BlogList(){
		$blogPosts = DataObject::get("BlogEntry",null,"Date DESC",null,"3");
		if($blogPosts){
			return $blogPosts;
		}
	}
	
	public function BlogPosts(){
		$blogPosts = DataObject::get("BlogEntry");
		if($blogPosts){
			return $blogPosts;
		}
	}
	
	function SearchForm() {
        $searchText = isset($this->Query) ? $this->Query : 'Search';
         
        $fields = new FieldSet(
            new TextField("Search", "", $searchText)
        );
 
        $actions = new FieldSet(
            new FormAction('results', 'Go')
        );
         
        return new SearchForm($this, "SearchForm", $fields, $actions);
    }
	
	function results($data, $form){
        $data = array(
            'Results' => $form->getResults(),
            'Query' => $form->getSearchQuery(),
            'Title' => 'Search Results'
        );
        $this->Query = $form->getSearchQuery();
     
        return $this->customise($data)->renderWith(array('Page_results', 'Page'));
    }

	public function init() {
		parent::init();

		// Note: you should use SS template require tags inside your templates 
		// instead of putting Requirements calls here.  However these are 
		// included so that our older themes still work

	}
}