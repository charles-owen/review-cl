<?php
/**
 * @file
 * Assignment reviewing page.
 * /cl/review/:id
 */

namespace CL\Review;

use CL\Site\Site;
use CL\Course\View;
use CL\Site\System\Server;
use CL\Course\Member;
use CL\Course\Members;
use CL\Course\Submission\Submissions;

/**
 * /cl/review/:id
 * Reviewing page
 */
class ReviewView extends View {
	/**
	 * ReviewView constructor.
	 * @param Site $site The Site object
	 * @param Server $server The Server object
	 */
	public function __construct(Site $site, Server $server, array $properties) {
		parent::__construct($site, ['at-least'=>Member::STUDENT]);

		//
		// Get the reviewing assignment
		//
		$id = $properties['id'];
		$reviewAssignments = new ReviewAssignments($site->db);
		$reviewAssign = $reviewAssignments->get($id);
		if($reviewAssign === null) {
			$server->redirect($site->root . '/');
		}

		//
		// Get the course assignment
		//
		$assignment = $this->section->get_assignment($reviewAssign['assigntag']);
		if($assignment === null || $assignment->reviewing === null) {
			$server->redirect($site->root . '/');
		}

		$assignment->load();

		$members = new Members($site->db);
		$submissions = new Submissions($site->db);
		$reviewer = $members->getAsUser($reviewAssign['reviewerid']);
		$reviewee = $members->getAsUser($reviewAssign['revieweeid']);

		$submissionsData = [];
		foreach($assignment->submissions->submissions as $submission) {
			$submitted = $submissions->get_submissions($reviewee->member->id, $assignment->tag,
				$submission->tag, true);
			if(count($submitted) === 0) {
				$server->redirect($site->root . '/');
			}

			$data = $submission->data();
			$data['id'] = $submitted[0]['id'];
			$data['date'] = $submitted[0]['date'];
			$data['type'] = $submission->type;

			switch($submission->type) {
				case 'text':
					$text = $submissions->get_text($submitted[0]['id']);
					$data['text'] = $text['text'];
					break;
			}

			$submissionsData[] = $data;
		}

		$reviews = new Reviews($site->db);
		$reviewing = $reviews->get_reviewing($assignment->tag,
			$reviewer->member->id, $reviewee->member->id);

		$this->addJS('review');
		$data = ['id'=>$properties['id'],
			'submissions'=>$submissionsData,
			'reviewing'=>$reviewing];
		$this->addCLS('cl-review', json_encode($data));
	}

}