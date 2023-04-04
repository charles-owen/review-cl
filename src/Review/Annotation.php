<?php
/**
 * @file
 * Representation of a single annotation
 */

namespace CL\Review;

/**
 * Representation of a single annotation
 *
 * @property int $id Annotation record id
 * @property string $annotation
 * @property int $width
 * @property int $height
 * @property int $review_id
 * @property int $time Annotation time
 */

class Annotation {
	/**
	 * Annotation constructor.
	 * @param array $row Database row
     * @param string $annotation
     * @param int $width
     * @param int $height
     * @param int $review_id
     * @param int $time
	 * @param string $prefix Prefix on names.
	 */
	public function __construct($row = null, $prefix='annotation_') {
		if($row !== null) {
			$this->id = +$row[$prefix . 'id'];
            $this->annotation = +$row[$prefix . 'annotation'];
            $this->width = +$row[$prefix . 'width'];
            $this->height = +$row[$prefix . 'height'];
            $this->review_id = +$row[$prefix . 'review_id'];
            $this->time = strtotime($row[$prefix . 'time']);
		}
	}

	/**
	 * Set the fields in this object.
	 * @param string $review
	 * @param int $time
	 * @param string $context
	 * @param array $submissions Submission ID's this review is associated with.
	 */
	public function set($annotation, $width, $height, $review_id, $time) {
        $this->annotation = $annotation;
        $this->width = $width;
        $this->height = $height;
        $this->review_id = $review_id;
		$this->time = $time;
	}

	/**
	 * Property get magic method
	 *
	 * <b>Properties</b>
	 * Property | Type | Description
	 * -------- | ---- | -----------
	 * id | int | Review record id
     * reviewee | User | The reviewee
     * revieweeId | int | The reviewee member ID
     * reviewer | User | The reviewer
     * reviewerId | int | The reviewer member ID
     * time | int | Review time
     * meta | MetaData | Any metadata associated with the review
     *
	 *
	 * @param string $property Property name
	 * @return mixed
	 */
	public function __get($property) {
		switch($property) {
			case 'id':
				return $this->id;

			case 'time':
				return $this->time;

            case 'annotation':
                return $this->annotation;

            case 'width':
                return $this->width;;

            case 'height':
                return $this->height;

            case 'review_id':
                return $this->review_id;

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
	 * time, metadata, reviewerId, revieweeId
	 *
	 * @param Annotations $annotations The review table class.
	 * @return array
	 */
	public function exec(Annotations $annotations) {
		return [$this->annotation, $this->width, $this->height, $this->review_id, $annotations->timeStr($this->time)];
	}

	private $id = 0;        // Internal ID for this review
    private $annotation;
    private $width;
    private $height;
    private $review_id;
    private $time;          // When the review was first created
}
