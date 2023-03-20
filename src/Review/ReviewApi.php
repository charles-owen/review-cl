<?php
/**
 * @file
 * API Resource for /api/review
 */
namespace CL\Review;

use CL\Course\Submission\Submissions;
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
	 * @param array $properties Properties extracted from the route (not used for endpoints)
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

            case 'saveContent':
                return $this->saveContent($site, $server, $params, $time);

			// /api/review/notify/:assigntag
			case 'notify':
				return $this->notify($site, $server, $params, $time);

            // /api/review/reassign/:assigntag
            case 'reassign':
                return $this->reassign($site, $server, $params, $time);

            // /api/review/remove/:assigntag
            case 'remove':
                return $this->remove($site, $server, $params, $time);

            case 'getReviewerContent':
                return $this->getReviewerContent($site, $server, $params, $time);
		}
		throw new APIException("Invalid API Path", APIException::INVALID_API_PATH);
	}

    /**
     * Support for reviews by the course staff
     *
     * /api/review/staffreview/:assigntag/:memberid
     * This is used on the assignment grading page
     *
     * Returns all reviews by and for a user
     *
     * @param Site $site The Site object
     * @param Server $server The server
     * @param array $params Parameters for the route
     * @param int $time Current time
     * @return JsonAPI
     * @throws APIException
     */
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
		$this->ensure($post, ['text', 'submissions']);
		$text = strip_tags($post['text']);
		$reviewing = $assignment->reviewing->submit($user, $reviewee, $text, $post['submissions'], $time);

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
	 * Also returns the current submissions for this member
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

		$submissions = new Submissions($site->db);

		$json = new JsonAPI();
		$json->addData('reviews-by-for', $memberId, $data);
		$json->addData('assignment-submissions', 0, $submissions->getAssignmentSubmissions($memberId, $assignTag));

		return $json;
	}

    /**
     * Get all reviews by and for a given user.
     * @param Site $site The Site object
     * @param string $assignTag Assignment tag
     * @param int $memberId Member ID we are fetching for
     * @return array[] with keys 'for' and 'by', each an array
     */
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

    /**
     * Submit a review
     *
     * /api/review/review/:id
     *
     * @param Site $site The Site object
     * @param User $user Requesting user
     * @param Server $server The server
     * @param array $params Parameters for the route
     * @param int $time Current time
     * @return JsonAPI
     * @throws APIException
     */
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
		$this->ensure($post, ['text', 'submissions']);
		$text = strip_tags($post['text']);
		$reviewing = $assignment->reviewing->submit($user, $reviewee, $text, $post['submissions'], $time);

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

            //dropped user logic here
            //query to see if the reviewer is a student
            $reviewer = $members->query(['semester'=>$semester, 'section'=>$sectionId,'id' => $assignment['reviewer'] ,'role'=>Member::STUDENT]);
            //query to see if the reviewee is a student
            $reviewee = $members->query(['semester'=>$semester, 'section'=>$sectionId,'id' => $assignment['reviewee'] ,'role'=>Member::STUDENT]);


            //if both are students then only add to data list
            if(count($reviewer) > 0 and count($reviewee) > 0) {
                $count = isset($mapping[+$assignment['reviewer']]) &&
                isset($mapping[+$assignment['reviewer']][+$assignment['reviewee']]) ?
                    $mapping[+$assignment['reviewer']][+$assignment['reviewee']] : 0;

                $data[] = [+$assignment['reviewer'], +$assignment['reviewee'], $count];
            }
		}

		$json = new JsonAPI();
		$json->addData('reviewers', 0, $data);
		return $json;
	}

    /**
     * Save the reply data
     */
    protected function saveContent(Site $site, Server $server, array $params, $time)
    {
        //todo Accepted parameters
        $content = strip_tags($_POST['content']);
        $userid = $_POST['memberid'];   //The member_id passed in from the database
        //week 7 new added content
        if (empty($content) || empty($userid)){
            echo "<script>alert('You must enter some text to send!');location.href='".$_SERVER["HTTP_REFERER"]."';</script>";
        }
        $memberId = $GLOBALS['user']->dataJWT['member_id']; //Get the member_id of the current user ；member_id = ad
        //Reference ReviewAssignments class; prepare for querying the database later
        $time = date('Y-m-d H:i:s',time());//Time data
        $reviewerid = $memberId;
        $revieweeid = $userid;
        $metadata = json_encode([
            'review' => [
                'review' => $content,
                'submissions' => [],
            ]
        ],JSON_UNESCAPED_UNICODE);
        //start
        $review = new ReviewAssignments($site->db);
        if ($review->saveContent($time,$metadata,$reviewerid,$revieweeid)){
            echo "<script>alert('Submit successfully!');location.href='".$_SERVER["HTTP_REFERER"]."';</script>";
        }else{
            return false;
        }
    }
    /**
     * 获取作业评价的内容
     * @param Site $site
     * @param Server $server
     * @param array $params
     * @param $time
     * @return false|string
     */
    protected function getReviewerContent(Site $site, Server $server, array $params, $time)
    {
        $assignmentViewClass = new AssignmentView($site,'design3');
        $res = $assignmentViewClass->getReviewerContent();
        return json_encode([
            'code' => 200,
            'msg' => 'success',
            'data' => $res
        ]);
    }

    /**
     * Handles the post request for notifying a individual
     *
     * /api/review/notify/:assigntag
     *
     * @param Site $site
     * @param Server $server
     * @param array $params
     * @param $time
     * @return JsonAPI
     * @throws APIException
     */
    private function notify(Site $site, Server $server, array $params, $time)
    {
        $user = $this->isUser($site, Member::STAFF);
        $post = $server->post;
        $this->ensure($post, ['userId', 'isClass']);  // Check that all required params are present
        $isClass = $post['isClass'];
        $assignTag = $params[1];

        // Get the assignment
        $section = $site->course->get_section_for($user);
        $assignment = $section->get_assignment($assignTag);
        $reviewing = $assignment->reviewing;
        if($assignment === null || $assignment->reviewing === null) {
            throw new APIException("Review assignment does not exist");
        }

        // Get the assignment's reviews
        $reviewAssignments = new ReviewAssignments($site->db);
        $reviews = new Reviews($site->db);

        //grabbing the semseter and semester id for the user
        $semester = $user->member->semester;
        $sectionId = $user->member->sectionId;

        // Members of the class
        $members = new Members($site->db);

        // If it is a class notification then the member list to notify is the list of all members
        if ($isClass) {
            $membersList = $members->query(['semester'=>$semester,
                'section'=>$sectionId]);
        }
        // If it is not a class reminder send to the certain individual provided
        else {
            $userId = $post['userId'];
            $membersList = $members->query(['semester'=>$semester, 'section'=>$sectionId,'userId' => $userId ,'role'=>Member::STUDENT]);
        }
        // Variable to keep track of the number of reviews sent for return.
        $notificationsSent = 0;
        // Variable to keep track of if a notification was unable to send (If users have not submitted yet)
        $notificationUnavailable = false;

        // Send the notifications if the user has completed the assignment and has not done all reviews
        foreach($membersList as $user) {
            // Ignore any guest users or drops
            if(!$user->atLeast(Member::STUDENT)) {
                continue;
            }
            $shouldNotify = false;
            // For each of the users reviewees check if they have reviewed, if not mark that the user should be notified
            $reviewees = $reviewAssignments->getMemberReviewees($user->member->id, $assignTag);
            foreach($reviewees as $reviewee) {
                // If the reviewee has not submitted the user should not be notified
                if(!$reviewing->has_submitted($reviewee['reviewee'])) {
                    continue;
                }
                if(!$reviews->has_reviewed($assignTag, $user->member->id, $reviewee['reviewee']->member->id)) {
                    $shouldNotify = true;
                }
            }


            // If the flag to notify is true then call maybe_remind which ensures the user has finished the assignment
            // then notifies, then return.
            if($shouldNotify)
            {
                if($reviewing->maybe_remind($user)) {
                    $notificationsSent++;
                }
                else {
                    $notificationUnavailable = true;
                }
            }
        }

        $json = new JsonAPI();  // Must return this object in post requests
        $json->addData('notificationsSent', 0, $notificationsSent);
        $json->addData('notificationUnavailable', 0, $notificationUnavailable);
        return $json;

    }

    /**
     * Handles the post request for reassigning reviewers/reviewees
     *
     * /api/review/reassign/:assigntag
     *
     * @param Site $site
     * @param Server $server
     * @param array $params
     * @param $time
     * @return JsonAPI
     * @throws APIException
     */

    private function reassign(Site $site, Server $server, array $params, $time)
    {
        $user = $this->isUser($site, Member::STAFF);
        $reviewAssignments = new ReviewAssignments($site->db);
        $members = new Members($site->db);
        if(count($params) < 2) {
            throw new APIException("Invalid API Path", APIException::INVALID_API_PATH);
        }
        //grabbing the semseter and semester id for the user
        $semester = $user->member->semester;
        $sectionId = $user->member->sectionId;
        $assignTag = $params[1];
        if($server->requestMethod === 'POST') {
            $post = $server->post;
            $this->ensure($post, ['reviewer', 'reviewee']);  // Check that all required params are present
            //get the reviewer and reviewee passed into the params from reassign dialog box
            $reviewer_post = $post['reviewer'];
            $reviewee_post = $post['reviewee'];

            //grab reviewer and reviewee memberid
            $reviewer = $members->query(['semester'=>$semester, 'section'=>$sectionId,'userId' => $reviewer_post['id'] ,'role'=>Member::STUDENT])[0];
            $reviewee = $members->query(['semester'=>$semester, 'section'=>$sectionId,'userId' => $reviewee_post['id'] ,'role'=>Member::STUDENT])[0];

            //check if the combination of reviewer reviewee is a duplicate
            if(!$reviewAssignments->isReviewer($reviewer->member->id, $reviewee->member->id, $assignTag)){
                  //if not go ahead and assign the combination
                $reviewAssignments->assignReviewing($reviewer->member->id, $reviewee->member->id, $assignTag);
            }
            else{
                //otherwise give error that this is already a combination
                throw new APIException("This is already a reviewer/reviewee combination");
            }

        }
        return $this->generatePairingJSON($site, $params);
    }

    /**
     * Handles the post request for removing reviewers
     *
     * /api/review/remove/:assigntag
     *
     * @param Site $site
     * @param Server $server
     * @param array $params
     * @param $time
     * @return JsonAPI
     * @throws APIException
     */
    private function remove(Site $site, Server $server, array $params, $time)
    {
        $user = $this->isUser($site, Member::STAFF);
        $reviewAssignments = new ReviewAssignments($site->db);
        $members = new Members($site->db);
        if(count($params) < 2) {
            throw new APIException("Invalid API Path", APIException::INVALID_API_PATH);
        }
        //grabbing the semseter and semester id for the user
        $semester = $user->member->semester;
        $sectionId = $user->member->sectionId;
        $assignTag = $params[1];
        if($server->requestMethod === 'POST') {
            $post = $server->post;
            $this->ensure($post, ['reviewer', 'reviewee']);  // Check that all required params are present
            //get the reviewer and reviewee passed into the params from reassign dialog box
            $reviewer_post = $post['reviewer'];
            $reviewee_post = $post['reviewee'];

            //grab reviewer and reviewee memberid
            $reviewer = $members->query(['semester'=>$semester, 'section'=>$sectionId,'userId' => $reviewer_post['id'] ,'role'=>Member::STUDENT])[0];
            $reviewee = $members->query(['semester'=>$semester, 'section'=>$sectionId,'userId' => $reviewee_post['id'] ,'role'=>Member::STUDENT])[0];

            //check if the combination of reviewer reviewee exists
            if($reviewAssignments->isReviewer($reviewer->member->id, $reviewee->member->id, $assignTag)){
                //if yes remove the review
                $reviewAssignments->removeReviewing($reviewer->member->id, $reviewee->member->id, $assignTag);
            }
            else{
                //otherwise give error that the combination does not exist
                throw new APIException("This reviewer/reviewee pairing does not exist");
            }

        }
        return $this->generatePairingJSON($site, $params);
    }

    /**
     * Generates reviewer/reviewee pairings to allow for live updating
     *
     * @param Site $site
     * @param $params
     * @return JsonAPI
     * @throws APIException
     */
    private function generatePairingJSON(Site $site, $params)
    {
        $user = $this->isUser($site, Member::STAFF);
        $reviewAssignments = new ReviewAssignments($site->db);
        $members = new Members($site->db);
        //grabbing the semseter and semester id for the user
        $semester = $user->member->semester;
        $sectionId = $user->member->sectionId;
        $assignTag = $params[1];
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

            //dropped user logic here
            //query to see if the reviewer is a student
            $reviewer = $members->query(['semester'=>$semester, 'section'=>$sectionId,'id' => $assignment['reviewer'] ,'role'=>Member::STUDENT]);
            //query to see if the reviewee is a student
            $reviewee = $members->query(['semester'=>$semester, 'section'=>$sectionId,'id' => $assignment['reviewee'] ,'role'=>Member::STUDENT]);

            //if both are students then only add to data list
            if(count($reviewer) > 0 and count($reviewee) > 0) {
                $count = isset($mapping[+$assignment['reviewer']]) &&
                isset($mapping[+$assignment['reviewer']][+$assignment['reviewee']]) ?
                    $mapping[+$assignment['reviewer']][+$assignment['reviewee']] : 0;

                $data[] = [+$assignment['reviewer'], +$assignment['reviewee'], $count];
            }
        }

        $json = new JsonAPI();
        $json->addData('reviewers', 0, $data);
        return $json;
    }

}
