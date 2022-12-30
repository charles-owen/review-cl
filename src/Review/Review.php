<?php
/**
 * @file
 * Representation of a single peer review
 */

namespace CL\Review;

use CL\Course\Member;
use CL\Site\MetaData;
use CL\Users\User;

/**
 * Representation of a single peer review
 *
 * @property string $assignTag The assignment tag
 * @property int $id Review record id
 * @property int $time Review time
 * @property User $reviewee The reviewee (optional, may not always be available)
 * @property User $reviewer The reviewer (optional, may not always be available)
 * @property MetaData $meta Any metadata associated with the review

 */
class Review {
	/**
	 * Review constructor.
	 * @param array $row Database row
	 * @param string $prefix Prefix on names.
	 */
	public function __construct($row = null, $prefix='review_') {
		if($row !== null) {
			$this->id = +$row[$prefix . 'id'];
			$this->revieweeId = +$row[$prefix . 'revieweeid'];
			$this->reviewerId = +$row[$prefix . 'reviewerid'];
			$this->time = strtotime($row[$prefix . 'time']);
			$this->metaData = new MetaData(null, $row[$prefix . 'metadata']);

			if(!empty($row['member_id'])) {
				$this->reviewer = new User($row, 'user_');
				$this->reviewer->member = new Member($row, 'member_');
			}

			if(!empty($row['reviewee_id'])) {
				$this->reviewee = new User($row, 'user_');
				$this->reviewee->member = new Member($row, 'reviewee_');
			}

		} else {
			$this->metaData = new MetaData();
		}

	}

	/**
	 * Set the fields in this object.
	 * @param string $assignTag
	 * @param int $reviewerId
	 * @param int $revieweeId
	 * @param string $review
	 * @param int $time
	 * @param array $submissions Submission ID's this review is associated with.
	 */
	public function set($assignTag, $reviewerId, $revieweeId, $review, $time, array $submissions=null) {
		$this->assignTag = $assignTag;
		$this->reviewerId = $reviewerId;
		$this->revieweeId = $revieweeId;
		$this->time = $time;

		$this->metaData->set('review', 'review', $review);
		if($submissions !== null) {
			$this->metaData->set('review', 'submissions', $submissions);
		}
	}

	/**
	 * Property get magic method
	 *
	 * <b>Properties</b>
	 * Property | Type | Description
	 * -------- | ---- | -----------
     * assignTag | string | The assignment tag
	 * id | int | Review record id
     * reviewee | User | The reviewee
     * reviewer | User | The reviewer
     * time | int | Review time
     * meta | MetaData | Any metadata associated with the review
     *
	 *
	 * @param string $property Property name
	 * @return mixed
	 */
	public function __get($property) {
		switch($property) {
			case 'assignTag':
				return $this->assignTag;

			case 'id':
				return $this->id;

			case 'time':
				return $this->time;

			case 'reviewee':
				return $this->reviewee;

			case 'reviewer':
				return $this->reviewer;

			case 'meta':
				return $this->metaData;

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
     * id | int | Review record id
	 *
	 * @param string $property Property name
	 * @param mixed $value Value to set
	 */
	public function __set($property, $value) {
		switch($property) {
			case 'id':
				$this->id = $value;
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
	 * Build an SQL exec array consisting of:
	 * assignTag, time, metadata, reviewerId, revieweeId
	 *
	 * @param Reviews $reviews The review table class.
	 * @return array
	 */
	public function exec(Reviews $reviews) {
		return [$this->assignTag, $reviews->timeStr($this->time), $this->metaData->json(),
			$this->reviewerId, $this->revieweeId];
	}

	private $id = 0;        // Internal ID for this review
	private $assignTag;     // Assignment tag
	private $reviewerId;    // Member ID for the reviewer
	private $revieweeId;    // Member ID for the reviewee
	private $metaData;      // Metadata containing reviews and discussions
	private $time;          // When the review was first created

	private $reviewer = null; // Optional User object for reviewer
	private $reviewee = null; // Optional User object for reviewee
}