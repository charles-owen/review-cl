<?php
/**
 * @file
 * Representation of a single review in the system.
 */

namespace CL\Review;

use CL\Site\MetaData;


class Review {

	public function __construct() {
		$this->metaData = new MetaData();
	}

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
}