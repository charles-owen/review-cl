<?php
/** @file
 * Unit tests for the class ReviewAssignments
 * @cond 
 */

require_once __DIR__ . '/init.php';
require_once __DIR__ . '/cls/ReviewDatabaseTestBase.php';

use CL\Users\Users;
use CL\Course\Member;
use CL\Course\Members;
use CL\Review\ReviewAssignments;

class ReviewAssignmentsTest extends ReviewDatabaseTestBase {
	/**
	 * @return PHPUnit_Extensions_Database_DataSet_IDataSet
	 */
	public function getDataSet() {
		return $this->dataSets(['user-many.xml', 'member.xml', 'reviewassignment.xml']);
	}

	public function ensureTables() {
		$this->ensureTable(new Users($this->site->db));
		$this->ensureTable(new Members($this->site->db));
		$this->ensureTable(new ReviewAssignments($this->site->db));
	}

	public function test() {

		$reviewAssignments = new ReviewAssignments($this->site->db);
		$this->assertTrue($reviewAssignments->assignReviewing(22, 35, 'step1'));

		$assigns = $reviewAssignments->getMemberReviewers(35, "step1");
		$this->assertCount(1, $assigns);

		$reviewers = $reviewAssignments->getReviewers('FS18', '799', 'step1');
		$this->assertCount(1, $reviewers);

		$reviewAssignments->clear('FS17', '799', 'step1');
		$reviewers = $reviewAssignments->getReviewers('FS18', '799', 'step1');
		$this->assertCount(1, $reviewers);

		$reviewAssignments->clear('FS18', '899', 'step1');
		$reviewers = $reviewAssignments->getReviewers('FS18', '799', 'step1');
		$this->assertCount(1, $reviewers);


		$reviewAssignments->clear('FS18', '799', 'step1');

		$reviewers = $reviewAssignments->getReviewers('FS18', '799', 'step1');
		$this->assertCount(0, $reviewers);

	}


}

/// @endcond
