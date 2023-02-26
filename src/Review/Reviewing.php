<?php
/**
 * @file
 * Class that manages peer review for an assignment
 */

/**
 * Classes in the peer review system
 */
namespace CL\Review;

use CL\Course\Assignment;
use CL\Users\User;
use CL\Course\Submission\Submission;
use CL\Course\Submission\Submissions;
use CL\Site\Email;

/**
 * Class that manages peer review for an assignment
 *
 * If an assignment uses peer review, one of these will be attached to the assignment object
 */
class Reviewing {
	/**
	 * Constructor
	 * @param Assignment $assignment The assignment we are reviewing
	 */
    public function __construct(Assignment $assignment) {
        $this->assignment = $assignment;
    //    $this->email = new \Email($assignment->get_course());
    }

    /**
     * Property get magic method
     *
     * <b>Properties</b>
     * Property | Type | Description
     * -------- | ---- | -----------
     *
     * @param string $property Property name
     * @return mixed
     */
    public function __get($property) {
        switch($property) {
	        case 'email':
	        	if($this->email === null) {
	        		$this->email = new Email($this->assignment->site);
		        }

		        return $this->email;

	        case 'due':
	        	return $this->due;

            default:
                $trace = debug_backtrace();
                trigger_error(
                    'Undefined property ' . $property .
                    ' in ' . $trace[0]['file'] .
                    ' on line ' . $trace[0]['line'],
                    E_USER_NOTICE);
                return null;
        }
    }

    /**
     * Property set magic method
     *
     * <b>Properties</b>
     * Property | Type | Description
     * -------- | ---- | -----------
     *
     * @param string $property Property name
     * @param mixed $value Value to set
     */
    public function __set($property, $value) {
    	switch($property) {
		    case 'email':
		    	$this->email = $value;
		    	break;

    		default:
    			$trace = debug_backtrace();
    			trigger_error(
    				'Undefined property ' . $property .
    				' in ' . $trace[0]['file'] .
    				' on line ' . $trace[0]['line'],
    				E_USER_NOTICE);
    			break;
    	}
    }



    /**
     * Get any extended due date for a user due to a review
     * @param User $user User we are checking
     * @return int null if no revision date, otherwise a valid time
     */
    public function get_revision_due(User $user) {
        /*
         * Has the user submitted all assignment parts?
         */
        if(!$this->has_submitted($user)) {
            return null;
        }

        /*
         * What is the most recent review?
         */
        $reviewsTable = new Reviews($this->assignment->site->db);
        $date = $reviewsTable->get_recent_review_date($this->assignment->tag, $user->member->id);

        if($date === null) {
            return null;
        }

        return $date + ($this->revisionHours * 60 * 60);
    }

    /**
     * The reviews due date
     * @param string  $due The due date (time as a string as in '9/02/2014 11:55pm')
     * @param int $revisionHours Number of hours after review for resubmission, default is 24
     * @param bool $revised true if the due date is a revision
     */
    public function set_due($due, $revisionHours = 24, $revised = false) {
        $this->due = $this->assignment->relative_time($due); // strtotime($due);
        $this->revisionHours = $revisionHours;
        $this->revised = $revised;
    }

//	/**
//	 * Get the review due date
//	 * @return int Review due date
//	 */
//    public function get_due() {
//        return $this->due;
//    }

	public function get_available_due() {
		return $this->due + ($this->revisionHours * 60 * 60);
	}

	/**
	 * Test if a time is after the due date for reviews
	 * @param int $time Test we are testing
	 * @return bool true if time is after due date
	 */
    public function after_due($time) {
        return $time > $this->due;
    }

//	/**
//	 * Get the number of hours after a review that a user can revised
//	 * @return int Number of hours
//	 */
//    public function get_revision_hours() {
//        return $this->revisionHours;
//    }
//
//    /** Due date revised? */
//    public function is_duerevised() {return $this->revised;}
//
//	/**
//	 * Create a view object for this reviewing
//	 * @return ReviewingView Object
//	 */
//    public function create_view() {
//        return new ReviewingView($this);
//    }
//
//	/**
//	 * Get the assignment we are reviewing
//	 * @return Assignment The assignment object
//	 */
//    public function get_assignment() {
//        return $this->assignment;
//    }

    /**
     * Determine if a user has submitted in all assignment categories.
     *
     * A user is not allowed to review unless they have submitted in all categories.
     * @param User $user
     * @return bool True if the user has submitted in all assignment categories
     */
    private function has_submitted(User $user) {
        $this->assignment->load();
        $submissions = $this->assignment->submissions;
        $submissiontags = [];
        foreach($submissions->submissions as $submission) {
            $submissiontags[] = $submission->tag;
        }

        /*
         * A user is only able to do reviews if they have submitted in all
         * categories.
         */
        $submissions = new Submissions($this->assignment->site->db);
        foreach($submissiontags as $tag) {
            if(!$submissions->has_submissions($user, $this->assignment->tag, $tag)) {
                return false;
            }
        }

        return true;
    }

	/**
	 * Get all reviews a user can do.
	 *
	 * A review is available if there is a submission in all submission categories.
	 *
	 * Notice: Does not check times!
	 *
	 * @param User $user User we are checking (reviewer)
	 * @param int $onlyRevieweeId If supplied, only get the reviews that can be done for one reviewee
	 * @return array with one entry per pending. Each entry consists of
	 * an array with keys:
	 * reviewee => User object,  submittime => Last submission time for reviewee,
	 */
    public function get_reviews_can_do(User $user, $onlyRevieweeId = null) {
        /*
         * A user is only able to do reviews if they have submitted in all
         * categories.
         */
        if(!$this->has_submitted($user)) {
            return null;
        }

        /*
         * Collect up all submission tags for this assignment
         */
        $this->assignment->load();
        $submissions = $this->assignment->submissions;
        $submissiontags = [];
        foreach($submissions->submissions as $submission) {
            $submissiontags[] = $submission->tag;
        }

        /*
         * Loop over all assignment reviewees
         */
        $site = $this->assignment->site;
        $submissions = new Submissions($site->db);
        $reviewAssignments = new ReviewAssignments($site->db);
        $reviews = new Reviews($site->db);

        $result = [];
        foreach($reviewAssignments->getMemberReviewees($user->member->id, $this->assignment->tag) as $assign) {

        	$reviewee = $assign['reviewee'];

            if($onlyRevieweeId !== null && $reviewee['reviewee'] != $onlyRevieweeId) {
                continue;
            }

            /*
             * Has this reviewee submitted both assignments and what are the dates?
             * Determine the last submission time for this reviewee
             */
            $revieweeSubmitTime = 0;
            $submissionIds = [];
            foreach($submissiontags as $tag) {
            	$submits = $submissions->get_submissions($reviewee->member->id, $this->assignment->tag, $tag);
                if(count($submits) === 0) {
                    $revieweeSubmitTime = 0;
                    break;
                }

                $submissionIds[] = $submits[0]['id'];

                if($submits[0]['date'] > $revieweeSubmitTime) {
                    $revieweeSubmitTime = $submits[0]['date'];
                }
            }

            // If not, we can't review this user
            if($revieweeSubmitTime == 0) {
                continue;
            }

            /*
             * We can review this reviewee!!!
             *
             * Have we reviewed before and, if so, what was the date?
             */
            $date = $reviews->get_assigned_review_date($this->assignment->tag,
	            $user->member->id, $reviewee->member->id);

            $result[] = ['id'=>$assign['id'],
	            'reviewee' => $reviewee,
	            'submittime' => $revieweeSubmitTime,
                'reviewtime' => $date,
	            'submissions' => $submissionIds];
        }

        return $result;
    }

	/**
	 * Present the views for a user as a hidden DIV for passing to client
	 * @param User $user User we are presenting for
	 * @return string HTML
	 */
    public function presentReviews(User $user) {
    	$data = [
    		'assigntag'=>$this->assignment->tag,
    		'reviews'=>$this->reviewsData($user)
	    ];

	    $json = htmlspecialchars(json_encode($data), ENT_NOQUOTES);

	    return <<<HTML
<div class="cl-reviews" style="display:none">$json</div>
HTML;
    }

	/**
	 * Get all reviews data for a user and this assignment.
	 * @param User $user Reviewee
	 * @return array Data
	 */
    public function reviewsData(User $user) {
    	$site = $this->assignment->site;
	    $reviews = new Reviews($site->db);
	    $all = $reviews->get_reviews($user->member->id, $this->assignment->tag);

	    $data = [];
	    $anon = [];
	    foreach($all as $review) {
		    $reviewData = [
			    'id'=>$review->id,
			    'time'=>$review->time,
			    'review'=>$review->meta->get('review', 'review'),
			    'submissions'=>$review->meta->get('review', 'submissions', [])
		    ];

		    $reviewer = $review->reviewer;
		    if($reviewer->staff) {
			    $reviewData['by'] = $reviewer->displayName;
			    $reviewData['role'] = $reviewer->roleName;
		    } else {
			    if(!isset($anon[$reviewer->id])) {
				    $anon[$reviewer->id] = count($anon);
			    }

			    $reviewData['by'] = 'Student ' . chr(ord('A') + $anon[$reviewer->id]);
		    }

		    $data[] = $reviewData;
	    }

	    return $data;
    }

	/**
	 * This function is called whenever a new submission occurs.
	 *
	 * This checks to see if pending review is open on this submission. If so,
	 * it tells the pending review system so it can test the results
	 * @param User $user The user the submission is for
	 * @param Submission $submission The Submission object this is for
	 * @param int $time Time of the new submission
	 * @return bool If successful
	 */
    public function submitted(User $user, Submission $submission, $time) {
        /*
         * Ensure we can still do reviews...
         */
        if($this->after_due($time)) {
            return false;
        }

        /*
         * A user is only able to do reviews or be reviewed if they have submitted in all
         * categories.
         */
        if(!$this->has_submitted($user)) {
            return false;
        }

        // Get the reviewers for this submission
        $reviewAssignments = new ReviewAssignments($this->assignment->site->db);
        $reviewers = $reviewAssignments->getMemberReviewers($user->member->id, $this->assignment->tag);

        /*
         * Iterate over the reviewers
         */
        foreach($reviewers as $reviewer) {
            $this->maybe_notify($reviewer['reviewer'], $user, $time);
        }

        /*
         * If this is a first submission for this user, they may be
         * in a position to now review other posts
         */
        $submissions = new Submissions($this->assignment->site->db);
        $subs = $submissions->get_submissions($user->member->id, $this->assignment->tag, $submission->tag);
        if(count($subs) == 1) {
            /*
             * This is a first submission
             * Iterate over the reviewees. If any are ready, notify this user.
             */
            $reviewees = $reviewAssignments->getMemberReviewees($user->member->id, $this->assignment->tag);
            foreach($reviewees as $reviewee) {
                if($this->has_submitted($reviewee['reviewee'])) {
                    $this->notify($user);
                    break;
                }
            }
        }
    }

    /**
     * Notify a reviewer that they have new reviews ready to do, but only if possible to review
     * @param User $reviewer
     * @param User $reviewee
     * @param $time
     * @return true if mail was sent
     */
    private function maybe_notify(User $reviewer, User $reviewee, $time) {
        /*
         * A user is only able to do reviews if they have submitted in all
         * categories.
         */
        if(!$this->has_submitted($reviewer)) {
            return false;
        }

        $this->notify($reviewer, $reviewee);

        return true;
    }

    /**
     * Remind a reviewer they have reviews ready to do if they can.
     * @param User $reviewer
     * @return true if mail was sent
     */
    public function maybe_remind(User $reviewer) {
        /*
         * A user is only able to do reviews if they have submitted in all
         * categories.
         */
        if(!$this->has_submitted($reviewer)) {
            return false;
        }

        $this->notify($reviewer);

        return true;
    }


	/**
	 * Notify a reviewer than a submission has occurred
	 * @param User $reviewer The reviewer
	 * @param User|null $reviewee The reviewee
	 */
    private function notify(User $reviewer, User $reviewee=null) {
        /*
         * Have we done any reviews up to now?
         */
        $site = $this->assignment->site;
        $reviews = new Reviews($site->db);
        $hasReviewed = $reviewee !== null &&
            $reviews->has_reviewed($this->assignment->tag, $reviewer->member->id, $reviewee->member->id);


        $coursename = $site->siteName;
        $url = $site->server . $site->root . '/cl/reviews/pending';

        $message = <<<MSG
<p>You have a review pending in the peer review system.</p>
<p>Please go to the <a href="$url">Peer Reviewing
Status Page</a> to see what reviews are pending.</p>
MSG;

        if($hasReviewed) {
            $message .= <<<MSG
<p>The system indicates that you have done at least one review for this
user's assignment. You are only required to do one review, but it will be
to the benefit of both you and your reviewee to look at any revisions they
may have done and maybe do another review.</p>
MSG;
        }

        $email = $this->__get('email');
        $email->send($site, $reviewer->email, $reviewer->displayName,
	        "$coursename Peer Review Pending", $message);
    }


	/**
	 * Handle a submission of a review
	 * @param User $reviewer The reviewer
	 * @param User $reviewee The reviewee
	 * @param string $text Review text
	 * @param array $submissionIds Submissions this review is for
	 * @param int $time Time of the review
	 * @return array of reviews
	 */
    public function submit(User $reviewer, User $reviewee, $text, $submissionIds, $time) {
        $reviews = new Reviews($this->assignment->site->db);
	    $review = new Review();
	    $review->set($this->assignment->tag, $reviewer->member->id,
		    $reviewee->member->id, $text, $time, $submissionIds);
	    $reviews->add($review);

        $this->notify_reviewed($reviewee, $text);

	    return $reviews->get_reviewing($this->assignment->tag, $reviewer->member->id, $reviewee->member->id);
    }

    private function notify_reviewed(User $reviewee, $review) {
        $site = $this->assignment->site;
        $coursename = $site->siteName;
        $assignname = $this->assignment->name;
        $url = $site->server . $site->root . '/' . $this->assignment->rawUrl;

        $message = <<<MSG
<p>You have a new peer review for <a href="$url">$assignname</a>.</p>
<p>$review</p>
MSG;

        $email = $this->__get('email');
	    $email->send($site, $reviewee->email, $reviewee->displayName,
		    "$coursename Peer Review Received", $message);
    }

    private $assignment;            // Assignment we are reviewing
    private $due = 0;               // Due date for the review
    private $revised = false;       // Due date has been revised
    private $revisionHours = 24;    // Number of hours after last review for revision
    private $email = null;
}
