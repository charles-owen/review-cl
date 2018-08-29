<?php
/**
 * @file
 * API Resource for /api/review
 */
namespace CL\Review;

use CL\Site\Api\JsonAPI;
use CL\Site\Site;
use CL\Site\System\Server;
use CL\Site\Api\APIException;
use CL\Users\User;
use CL\Course\Member;
use CL\Course\Members;


/**
 * API Resource for /api/review
 */
class ReviewApi extends \CL\Users\Api\Resource {
	/**
	 * GradesApi constructor.
	 */
	public function __construct() {
		parent::__construct();
	}

	/**
	 * Dispatch the API routing.
	 * @param Site $site The Site object
	 * @param Server $server The Server object
	 * @param array $params Parameters from the router
	 * @param array $properties Properties extracted from the route
	 * @param int $time Current time
	 * @return JsonAPI response
	 * @throws APIException If an error occurs.
	 */
	public function dispatch(Site $site, Server $server, array $params, array $properties, $time) {
		$user = $this->isUser($site, Member::STUDENT);

		if(count($params) < 1) {
			throw new APIException("Invalid API Path", APIException::INVALID_API_PATH);
		}

		switch($params[0]) {
			// /api/review/reviewers/:assigntag
			case 'reviewers':
				return $this->reviewers($site, $server, $params, $time);

			// /api/review/reviews/:assigntag/:memberid
			case 'reviews':
				return $this->reviews($site, $server, $params, $time);

			// /api/review/staffreview/:assigntag/:memberid
			case 'staffreview':
				return $this->staffreview($site, $server, $params, $time);

			// /api/review/review/:id
			// Submit a review
			case 'review':
				return $this->review($site, $user, $server, $params, $time);

			// /api/review/tables
			case 'tables':
				return $this->tables($site, $server, new ReviewTables($site->db));
		}

		throw new APIException("Invalid API Path", APIException::INVALID_API_PATH);
	}


	private function staffreview(Site $site, Server $server, array $params, $time) {
		$user = $this->isUser($site, Member::STAFF);

		if(count($params) < 3) {
			throw new APIException("Invalid API Path", APIException::INVALID_API_PATH);
		}

		$assignTag = $params[1];
		$memberId = $params[2];

		// Get the reviewee
		$members = new Members($site->db);
		$reviewee = $members->getAsUser($memberId);
		if($reviewee === null) {
			throw new APIException("Reviewee member does not exist");
		}

		// Get the assignment
		$section = $site->course->get_section_for($user);
		$assignment = $section->get_assignment($assignTag);
		if($assignment === null || $assignment->reviewing === null) {
			throw new APIException("Review assignment does not exist");
		}

		$post = $server->post;
		$this->ensure($post, 'text');
		$text = strip_tags($post['text']);
		$reviewing = $assignment->reviewing->submit($user, $reviewee, $text, [], $time);

		$data = $this->getByFor($site, $assignTag, $memberId);

		$json = new JsonAPI();
		$json->addData('reviews-by-for', $memberId, $data);
		return $json;
	}

	/**
	 * Get all assignment reviews by and for a member.
	 *
	 * /api/review/reviews/:assigntag/:memberid
	 * This is used on the assignment grading page
	 *
	 * @param Site $site The Site object
	 * @param Server $server The server
	 * @param array $params Parameters for the route
	 * @param int $time Current time
	 * @return JsonAPI
	 * @throws APIException
	 */
	private function reviews(Site $site, Server $server, array $params, $time) {
		$user = $this->isUser($site, Member::STAFF);

		if(count($params) < 3) {
			throw new APIException("Invalid API Path", APIException::INVALID_API_PATH);
		}

		$assignTag = $params[1];
		$memberId = $params[2];

		$data = $this->getByFor($site, $assignTag, $memberId);

		$json = new JsonAPI();
		$json->addData('reviews-by-for', $memberId, $data);
		return $json;
	}

	private function getByFor(Site $site, $assignTag, $memberId) {
		$reviews = new Reviews($site->db);
		$by = $reviews->get_reviews_by($memberId, $assignTag);
		$for = $reviews->get_reviews($memberId, $assignTag);

		$forData = [];
		foreach($for as $review) {
			$forData[] = [
				'id'=>$review->id,
				'time'=>$review->time,
				'meta'=>$review->meta->data,
				'reviewer'=>$review->reviewer->data()
			];
		}


		$byData = [];
		foreach($by as $review) {
			$byData[] = [
				'id'=>$review->id,
				'time'=>$review->time,
				'meta'=>$review->meta->data,
				'reviewee'=>$review->reviewee->data()
			];
		}

		return [
			'for'=>$forData,
			'by'=>$byData
		];
	}

	private function review(Site $site, User $user, Server $server, array $params, $time) {
		if(count($params) < 2) {
			throw new APIException("Invalid API Path", APIException::INVALID_API_PATH);
		}

		$id = $params[1];
		$reviewAssignments = new ReviewAssignments($site->db);
		$reviewAssign = $reviewAssignments->get($id);
		if($reviewAssign === null) {
			throw new APIException("Review assignment does not exist");
		}

		if($reviewAssign['reviewerid'] != $user->member->id) {
			throw new APIException("Not authorized", APIException::NOT_AUTHORIZED);
		}

		// Get the assignment
		$section = $site->course->get_section_for($user);
		$assignment = $section->get_assignment($reviewAssign['assigntag']);
		if($assignment === null || $assignment->reviewing === null) {
			throw new APIException("Review assignment does not exist");
		}

		$members = new Members($site->db);
		$reviewee = $members->getAsUser($reviewAssign['revieweeid']);
		if($reviewee === null) {
			throw new APIException("Review assignment does not exist");
		}

		$post = $server->post;
		$this->ensure($post, 'text');
		$text = strip_tags($post['text']);
		$reviewing = $assignment->reviewing->submit($user, $reviewee, $text, [], $time);

		$json = new JsonAPI();
		$json->addData('reviewing', 0, $reviewing);
		return $json;
	}

	/**
	 * Get/Post reviewing assignments for an assignment.
	 *
	 * /api/review/reviewers/:assigntag
	 *
	 * @param Site $site
	 * @param Server $server
	 * @param array $params
	 * @param $time
	 * @return JsonAPI
	 * @throws APIException
	 */
	private function reviewers(Site $site, Server $server, array $params, $time) {
		$user = $this->isUser($site, Member::STAFF);
		$reviewAssignments = new ReviewAssignments($site->db);
		$members = new Members($site->db);

		if(count($params) < 2) {
			throw new APIException("Invalid API Path", APIException::INVALID_API_PATH);
		}

		$semester = $user->member->semester;
		$sectionId = $user->member->sectionId;

		$assignTag = $params[1];

		if($server->requestMethod === 'POST') {
			$post = $server->post;
			$this->ensure($post, 'cnt');
			$cnt = +$post['cnt'];

			// Clear any existing assignment
			$reviewAssignments->clear($semester, $sectionId, $assignTag);

			// Get all students
			$students = $members->query(['semester'=>$semester, 'section'=>$sectionId, 'role'=>Member::STUDENT]);
			$numStudents = count($students);
			if($numStudents <= $cnt) {
				$cnt = $numStudents - 1;
			}

			// Shuffle...
			shuffle($students);

			for($i=0; $i<$numStudents; $i++) {
				for($r=1; $r <= $cnt; $r++) {
					$reviewer = $students[$i];
					$reviewee = $students[($i + $r) % $numStudents];

					$reviewAssignments->assignReviewing($reviewer->member->id, $reviewee->member->id, $assignTag);
				}
			}

		}

		$reviews = new Reviews($site->db);
		$counts = $reviews->get_review_counts($semester, $sectionId, $assignTag);
		$mapping = [];
		foreach($counts as $count) {
			if(!isset($mapping[+$count['reviewerid']])) {
				$mapping[+$count['reviewerid']] = [];
			}

			$mapping[+$count['reviewerid']][+$count['revieweeid']] = $count['count'];
		}

		$assignments = $reviewAssignments->getReviewers($semester, $sectionId, $assignTag);
		$data = [];
		foreach($assignments as $assignment) {
			$count = isset($mapping[+$assignment['reviewer']]) &&
				isset($mapping[+$assignment['reviewer']][+$assignment['reviewee']]) ?
				$mapping[+$assignment['reviewer']][+$assignment['reviewee']] : 0;

			$data[] = [+$assignment['reviewer'], +$assignment['reviewee'], $count];
		}

		$json = new JsonAPI();
		$json->addData('reviewers', 0, $data);
		return $json;
	}


}