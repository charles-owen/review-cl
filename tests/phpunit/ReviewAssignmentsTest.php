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
use CL\Review\Reviews;

class ReviewAssignmentsTest extends ReviewDatabaseTestBase {
    /**
     * Set up for testing by creating the necessary tables.
     * @return void
     */
    protected function setUp() : void {
        $this->ensureTable(new Users($this->site->db));
        $this->ensureTable(new Members($this->site->db));
        $this->ensureTable(new ReviewAssignments($this->site->db));
        $this->ensureTable(new Reviews($this->site->db));
    }

	public function test_getReviewers() {
        $this->dataSets(['db/user.xml', 'db/member.xml']);

		$reviewAssignments = new ReviewAssignments($this->site->db);
		$this->assertTrue($reviewAssignments->assignReviewing(22, 35, 'step1'));

		$assigns = $reviewAssignments->getMemberReviewers(35, "step1");
		$this->assertCount(1, $assigns);

        $reviewers = $reviewAssignments->getReviewers('FS18', '799', 'step1');
        $this->assertCount(1, $reviewers);

        $this->assertEquals(22, $reviewers[0]['reviewer']);
        $this->assertEquals(35, $reviewers[0]['reviewee']);

        $reviewers = $reviewAssignments->getReviewers('FS19', '799', 'step1');
        $this->assertCount(0, $reviewers);

        $this->assertTrue($reviewAssignments->assignReviewing(35, 10, 'step1'));
        $this->assertTrue($reviewAssignments->assignReviewing(22, 10, 'step1'));

        $reviewers = $reviewAssignments->getReviewers('FS18', '799', 'step1');
        $this->assertCount(3, $reviewers);

        $this->assertEquals(22, $reviewers[0]['reviewer']);
        $this->assertEquals(10, $reviewers[0]['reviewee']);
        $this->assertEquals(22, $reviewers[1]['reviewer']);
        $this->assertEquals(35, $reviewers[1]['reviewee']);
        $this->assertEquals(35, $reviewers[2]['reviewer']);
        $this->assertEquals(10, $reviewers[2]['reviewee']);
    }

    public function test_getMemberReviewees() {
        $this->dataSets(['db/user.xml', 'db/member.xml']);

        $reviewAssignments = new ReviewAssignments($this->site->db);
        $this->assertTrue($reviewAssignments->assignReviewing(22, 35, 'step1'));
        $this->assertTrue($reviewAssignments->assignReviewing(35, 10, 'step1'));
        $this->assertTrue($reviewAssignments->assignReviewing(22, 10, 'step1'));

        $reviews = $reviewAssignments->getMemberReviewees(22, 'step1');
        $this->assertEquals(2, count($reviews));
        $this->assertEquals(10, $reviews[0]['reviewee']->member->id);
        $this->assertEquals(35, $reviews[1]['reviewee']->member->id);
    }

    public function test_getMemberReviewers() {
        $this->dataSets(['db/user.xml', 'db/member.xml']);

        $reviewAssignments = new ReviewAssignments($this->site->db);
        $this->assertTrue($reviewAssignments->assignReviewing(22, 35, 'step1'));
        $this->assertTrue($reviewAssignments->assignReviewing(35, 10, 'step1'));
        $this->assertTrue($reviewAssignments->assignReviewing(22, 10, 'step1'));

        $reviews = $reviewAssignments->getMemberReviewers(10, 'step1');
        $this->assertEquals(2, count($reviews));
        $this->assertEquals(22, $reviews[0]['reviewer']->member->id);
        $this->assertEquals(35, $reviews[1]['reviewer']->member->id);
    }

    public function test_clear() {
        $this->dataSets(['db/user.xml', 'db/member.xml']);

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

    public function test_remove_reviewing() {
        $this->dataSets(['db/user.xml', 'db/member.xml']);

        $reviewAssignments = new ReviewAssignments($this->site->db);
        $this->assertTrue($reviewAssignments->assignReviewing(22, 35, 'step1'));

        $assigns = $reviewAssignments->getMemberReviewers(35, "step1");
        $this->assertCount(1, $assigns);

        $this->assertTrue($reviewAssignments->removeReviewing(22, 35, 'step1'));

        $assigns = $reviewAssignments->getMemberReviewers(35, "step1");
        $this->assertCount(0, $assigns);
    }

}

/// @endcond
