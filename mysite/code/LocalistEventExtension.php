<?php
class LocalistEventExtension extends DataExtension{

	public function Committees(){
		$owner = $this->owner;
		$tags = $owner->Tags;
		$committees = new ArrayList();

		foreach($tags as $tag){
			$committeePageTemp = CommitteePage::get()->filter(array("Title" => $tag->Title))->First();
			if(isset($committeePageTemp)){
				$committees->push($committeePageTemp);
				unset($committeePageTemp);
			}
		}
		return $committees;
	}
}