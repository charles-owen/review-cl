<?php
/** @file
 * Base class for database tests for review components
 */

use CL\Site\Test\DatabaseTestBase;
use CL\Course\Section;

/**
 * Base class for database tests.
 */
abstract class ReviewDatabaseTestBase extends DatabaseTestBase {

	public function __construct() {
		parent::__construct(__DIR__ . '/..');
	}

	protected function createSite() {
		$site = parent::createSite();
        $site->config = 'course';

        $course = $site->course;
        $course->define("cse999", 	// Course account name
            "CSE999", 				// Course name
            "Course Software Development"
        );

        // Add a section
        $course->add_section('FS18', '799', Section::Online);


        return $site;
	}
}
