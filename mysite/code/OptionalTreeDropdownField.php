<?php 
/** 
* TreeDropdown-like field that gives you a tree of items including an empty field, using ajax. 
* Author: Marijn Kampf www.exadium.com 
* Date: 24 Nov 2009 
* Version: 2.0 
* Revision date: 17 June 2010 
* Changes: Updated to work with SilverStripe 2.4, tree function added. 
*/ 
class OptionalTreeDropdownField extends TreeDropdownField { 
private static $postTree = '</li></ul>';

/** 
* Helper function to return the header (rather than defining same line twice). 
*/ 
function preTree() { 
    
return '<li id="0" class="l"> <a>' . _t('OptionalTreeDropdownField.NONE', "(None)", PR_MEDIUM, 'Non selected value of a dropdown') . '</a>'; 
}

/** 
* Return the site tree 
* For version 2.3 and earlier 
*/ 
/*function gettree() { 
echo $this->preTree(); 
parent::gettree(); 
echo $this->postTree; 
}*/

/** 
* Get the whole tree of a part of the tree via an AJAX request with empty / none item prepended. 
* 
* @param SS_HTTPRequest $request 
* @return string 
* for version 2.4 and later 
*/ 
function tree($request) { 
return $this->preTree() . parent::tree($request) . $this->postTree; 
} 
} 
?>