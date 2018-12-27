<?php
/**
 * @file
 * View class for view image content of submissions.
 */

namespace CL\Review;

use CL\Course\Submission\Submissions;
use CL\Site\Site;
use CL\Course\View;
use CL\Site\System\Server;
use CL\Course\Member;

/**
 * View class for view image content of submissions.
 */
class ReviewImageView extends View {
	/**
	 * SubmissionImageView constructor.
	 * @param Site $site The Site object
	 * @param Server $server The Server object
	 * @param array $vars Parameters passed to route ('id')
	 */
	public function __construct(Site $site, Server $server, $vars) {
		parent::__construct($site, ['at-least'=>Member::STUDENT]);

		$this->server = $server;
		$this->id = $vars['id'];
	}

	/**
	 * Present the whole file including header configuration.
	 * @return string Downloaded file
	 */
	public function whole() {
		$fs = new Submissions($this->site->db);
		$file = $fs->get_file($this->id);
		if($file === null) {
			return "<p>No such file</p>";
		}

		$this->file = $file;

		// Determine if the user is a valid reviewer
		$assignTag = $file['assigntag'];
		$memberId = $file['memberid'];
		$user = $this->user;

		if(!$this->user->atLeast(Member::STAFF)) {
			// If not staff, only allow download of
			// submissions that are our own
			$reviewAssignments = new ReviewAssignments($this->site->db);
			if(!$reviewAssignments->isReviewer($user->member->id, $memberId, $assignTag)) {
				return '<p>You are not authorized to view this submission</p>';
			}
		}

		$server = $this->server;
		$server->header('Content-Type: ' . $file['type']);
		return $file['binary'];
	}

	protected $server;      ///< Server object
	private $id;
	protected $file;        ///< File data for the submission
}