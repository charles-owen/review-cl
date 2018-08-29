<?php
/** @file
 * Base class for database tests.
 */

use CL\Site\Test\DatabaseTestBase;
use CL\Course\Course;


/**
 * Base class for database tests.
 */
abstract class ReviewDatabaseTestBase extends DatabaseTestBase {

	public function __construct() {
		parent::__construct(__DIR__ . '/..');
	}

	protected function createSite() {
		$site = parent::createSite();

		return $site;
	}
}
