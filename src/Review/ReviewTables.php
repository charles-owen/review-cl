<?php
/**
 * @file
 * Table maker for the Review subsystem tables
 */

namespace CL\Review;

use CL\Tables\Config;

/**
 * Table maker for the Review subsystem tables
 */
class ReviewTables extends \CL\Tables\TableMaker {

	/**
	 * Table maker for the Review subsystem tables
	 * @param Config $config Database configuration object
	 */
	public function __construct(Config $config) {
		parent::__construct($config);

		$this->add(new ReviewAssignments($config));
		$this->add(new Reviews($config));
		$this->add(new Annotations($config));
	}
}
