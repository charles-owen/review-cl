<?php
/** @file
 * Unit tests for the class Reviews
 * @cond 
 */
require_once __DIR__ . '/init.php';
require_once __DIR__ . '/cls/ReviewDatabaseTestBase.php';

use CL\Users\Users;
use CL\Course\Member;
use CL\Course\Members;
use CL\Review\ReviewAssignments;
use CL\Review\Reviews;
use CL\Review\Review;


class ReviewsTest extends ReviewDatabaseTestBase {
	/**
	 * @return PHPUnit_Extensions_Database_DataSet_IDataSet
	 */
	public function getDataSet() {
		return $this->dataSets(['user-many.xml', 'member.xml', 'reviewassignment.xml', 'review.xml']);
	}

	public function ensureTables() {
		$this->ensureTable(new Users($this->site->db));
		$this->ensureTable(new Members($this->site->db));
		$this->ensureTable(new ReviewAssignments($this->site->db));
		$this->ensureTable(new Reviews($this->site->db));
	}

	public function test() {
		$reviews = new Reviews($this->site->db);

		// Create a review
		$review1 = new Review();

		$time1 = time() + 112345;
		$review1->set('step1', 22, 35, "This is a review!", $time1, [12]);

		$reviews->add($review1);

		$time2 = $time1 + 1010;
		$review2 = new Review();
		$review2->set('step1', 22, 35, "This is another review!", $time2, [15]);
		$reviews->add($review2);

		$recent = $reviews->get_assigned_review_date('step1', 22, 35);
		$this->assertEquals($time2, $recent);

		$recent = $reviews->get_recent_review_date('step1', 35);
		$this->assertEquals($time2, $recent);


		$recent = $reviews->get_assigned_review_date('step1', 22, 37);
		$this->assertNull($recent);

		$this->assertTrue($reviews->has_reviewed('step1', 22, 35));
		$this->assertFalse($reviews->has_reviewed('step1', 22, 37));

    }

//    public function test_get_reviews() {
//        global $course;
//        $assignment = $course->get_section('001')->get_assignment('design1');
//
//        $users = new \Users($course);
//        $user14 = $users->get_user(14);
//
//        $table = new \Review\Reviews($course);
//
//        $reviews = $table->get_reviews($assignment, $user14);
//
//        $this->assertEquals(2, count($reviews));
//
//        $review = $reviews[0];
//        $this->assertEquals(16, $review['reviewer']);
//        $this->assertEquals(strtotime("2015-01-12 14:02:11"), $review['date']);
//        $this->assertEquals("I am not impressed", $review['review']);
//        $this->assertEquals("Barton, Fin", $review['name']);
//        $this->assertEquals(User::STUDENT, $review['role']);
//
//        $review = $reviews[1];
//        $this->assertEquals(5, $review['reviewer']);
//        $this->assertEquals(strtotime("2015-01-10 14:02:11"), $review['date']);
//        $this->assertEquals("I am just so impressed", $review['review']);
//        $this->assertEquals("Parker, Bob", $review['name']);
//        $this->assertEquals(User::STUDENT, $review['role']);
//    }
//
//    public function test_get_assigned_review_date() {
//        global $course;
//        $assignment = $course->get_section('001')->get_assignment('design1');
//
//        $users = new \Users($course);
//        $user5 = $users->get_user(5);
//        $user14 = $users->get_user(14);
//        $user18 = $users->get_user(18);
//
//        $table = new \Review\Reviews($course);
//        $date = $table->get_assigned_review_date($assignment, $user5, $user14);
//        $this->assertEquals(strtotime("2015-01-10 14:02:11"), $date);
//
//        $this->assertNull($table->get_assigned_review_date($assignment, $user5, $user18));
//    }
//
//    public function test_add_review() {
//        global $course;
//        $assignment = $course->get_section('001')->get_assignment('design3');
//
//        $users = new \Users($course);
//        $user14 = $users->get_user(14);
//        $user17 = $users->get_user(17);
//
//        $table = new \Review\Reviews($course);
//
//        $reviews = $table->get_reviews($assignment, $user17);
//        $this->assertEquals(0, count($reviews));
//
//        $time = time() + 12345;
//        $table->add_review($assignment, $user14, $user17->get_id(), $time, "This is a review",
//            array(89, 97));
//
//        $reviews = $table->get_reviews($assignment, $user17);
//        $this->assertEquals(1, count($reviews));
//
//        $review = $reviews[0];
//
//        $this->assertEquals(14, $review['reviewer']);
//        $this->assertEquals($time, $review['date']);
//        $this->assertEquals("This is a review", $review['review']);
//        $this->assertEquals("Arbitrary, Student", $review['name']);
//        $this->assertEquals(User::STUDENT, $review['role']);
//     //  $this->assertEquals(89, $review['submissionid']);
//    }
//
//    public function test_add_submissions() {
//        global $course;
//
//        $rs = new \Review\ReviewSubmissions($course);
//
//        $rs->add_submissions(97, array(21, 23));
//
//        $subs = $rs->get_submissions(97);
//        $this->assertEquals(2, count($subs));
//        $this->assertEquals(21, $subs[0]);
//        $this->assertEquals(23, $subs[1]);
//    }
//
//    public function test_review_counts() {
//        global $course;
//        $table = new \Review\Reviews($course);
//
//        $section = $course->get_section("001");
//        $assignment = $section->get_assignment('design3');
//
//        $counts = $table->review_counts($assignment, $section);
//        $this->assertEquals(0, count($counts));
//
//        $users = new \Users($course);
//        $user5 = $users->get_user(5);
//        $user14 = $users->get_user(14);
//        $user15 = $users->get_user(15);
//
//        $time = time() + 12345;
//        $table->add_review($assignment, $user5, $user14->get_id(), $time, "This is a review",
//            array(89, 97));
//
//        $counts = $table->review_counts($assignment, $section);
//        $this->assertEquals(1, count($counts));
//        $c = $counts[0];
//        $this->assertEquals(5, $c['reviewer']);
//        $this->assertEquals(14, $c['reviewee']);
//        $this->assertEquals(1, $c['count']);
//      //  $this->assert
//
//        $table->add_review($assignment, $user5, $user15->get_id(), $time, "This is a review",
//            array(89, 97));
//        $counts = $table->review_counts($assignment, $section);
//        $this->assertEquals(2, count($counts));
//        $c = $counts[0];
//        $this->assertEquals(5, $c['reviewer']);
//        $this->assertEquals(14, $c['reviewee']);
//        $this->assertEquals(1, $c['count']);
//
//        $c = $counts[1];
//        $this->assertEquals(5, $c['reviewer']);
//        $this->assertEquals(15, $c['reviewee']);
//        $this->assertEquals(1, $c['count']);
//
//        for($i=0; $i<5; $i++) {
//            $table->add_review($assignment, $user5, $user14->get_id(), $time, "This is a review",
//                array(89, 97));
//        }
//
//        $counts = $table->review_counts($assignment, $section);
//        $this->assertEquals(2, count($counts));
//        $c = $counts[0];
//        $this->assertEquals(5, $c['reviewer']);
//        $this->assertEquals(14, $c['reviewee']);
//        $this->assertEquals(6, $c['count']);
//
//        $c = $counts[1];
//        $this->assertEquals(5, $c['reviewer']);
//        $this->assertEquals(15, $c['reviewee']);
//        $this->assertEquals(1, $c['count']);
//
//    }

}

/// @endcond
?>
