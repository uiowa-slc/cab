<?php

use SilverStripe\Dev\BuildTask;

class MigrateClassBuildTask extends BuildTask {

	protected $title = 'Migrate old custom classes to more standard content fields, etc';

	protected $enabled = true;

	public function run($request) {

		echo '<ul>';

		/*$boardHolders = BoardHolder::get();

			// print_r($boardHolders->toArray());

			foreach ($boardHolders as $boardHolder) {

				echo '<li>Working on BoardHolder and making StaffHolder and StaffPages</li>';
				$staffHolder = new StaffHolderPage();
				$staffHolder->Title = $boardHolder->Title;
				$staffHolder->Content = '<p><img src="' . $boardHolder->obj("Image")->getURL() . ' alt="CAB members from this year." /></p>';
				$staffHolder->Content .= $boardHolder->MissionStatement;

				$staffHolder->write();

				$boards = $boardHolder->Children();

				foreach ($boards as $board) {
					$staffPage = new StaffPage();
					$boardNameExploded = explode(' ', $board->BoardMember);
					$staffPage->ParentID = $staffHolder->ID;
					$staffPage->Title = $board->Title;
					$staffPage->FirstName = $boardNameExploded[0];
					$staffPage->LastName = $boardNameExploded[1];
					$staffPage->EmailAddress = $board->Email;
					$staffPage->Content = 'Year: ' . $board->Year . '<br />' . 'Major: ' . $board->Major;

					$staffPage->PhotoID = $board->ImageID;

					$staffPage->write();

					if ($board->isPublished()) {
						$staffPage->publish('Stage', 'Live');
					}

				}

				echo '<li>Done.</li>';

				echo '<li>Working on HomePage fields</li>';

				$homePage = HomePage::get()->First();

				$homePage->Content = $homePage->AdditionalInfo;
				$homePage->Content .= $homePage->RedLightDescription;

				$homePage->write();
				$homePage->publish('Stage', 'Live');

				echo '<li>Done.</li>';

				echo '<li>Working on Contact fields</li>';

				$contactPage = Contact::get()->First();
				$contactPage->Content = $contactPage->Tagline;
				$contectPage->write();
				$contactPage->publish('Stage', 'Live');

				echo '</ul>';
		*/
		echo '<li>Working on Committee fields</li>';

		$comms = CommitteePage::get();

		foreach ($comms as $comm) {
			$comm->Content = $comm->CommitteeDescription;

			$comm->write();
			$comm->publish('Stage', 'Live');

		}

		echo '<li>Done.</li>';
	}

}
