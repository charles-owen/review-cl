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
	 * Set up for testing by creating the necessary tables.
	 * @return void
	 */
	protected function setUp() : void {
		$this->ensureTable(new Users($this->site->db));
		$this->ensureTable(new Members($this->site->db));
		$this->ensureTable(new ReviewAssignments($this->site->db));
		$this->ensureTable(new Reviews($this->site->db));
	}

	public function test_get_assigned_review_date() {
		$this->dataSets(['db/user.xml', 'db/member.xml']);

		$reviews = new Reviews($this->site->db);

		// Create a review member 22 reviewing 35
		$time1 = time() + 112345;
		$review1 = new Review();
		$review1->set('step1', 22, 35, "This is a review!", $time1, [12]);
		$reviews->add($review1);

		// Create a second (later) review member 22 reviewing 35
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

	public function test_get_reviews() {
		$this->dataSets(['db/user.xml', 'db/member.xml']);

		$reviews = new Reviews($this->site->db);

		// Create a review member 22 reviewing 35
		$time1 = time() + 112345;
		$review1 = new Review();
		$review1->set('step1', 22, 35, "This is a review!", $time1, [12]);
		$reviews->add($review1);

		// Create a review member 10 reviewing 35
		$time2 = $time1 + 1010;
		$review2 = new Review();
		$review2->set('step1', 10, 35, "This is another review!", $time2, [15]);
		$reviews->add($review2);

		$reviewsOf35 = $reviews->get_reviews(35, 'step1');
		$this->assertEquals(2, count($reviewsOf35));

		$review1a = $reviewsOf35[0];
		// Reviews are in reverse time order, so the 10/35 review is first
		$this->assertEquals(10, $review1a->reviewer->member->id);
		$this->assertEquals(35, $review1a->revieweeId);
		$this->assertEquals($time2, $review1a->time);
		$this->assertEquals('step1', $review1a->assignTag);
		$meta1 = $review1a->meta;
		$this->assertEquals("This is another review!", $meta1->get('review', 'review'));

		$review2a = $reviewsOf35[1];

		// Reviews are in reverse time order, so the 11/35 review is second
		$this->assertEquals(22, $review2a->reviewer->member->id);
		$this->assertEquals(35, $review2a->revieweeId);
		$this->assertEquals($time1, $review2a->time);
		$this->assertEquals('step1', $review2a->assignTag);
		$meta2 = $review2a->meta;
		$this->assertEquals("This is a review!", $meta2->get('review', 'review'));
	}

	public function test_get_reviews_by()
	{
		$this->dataSets(['db/user.xml', 'db/member.xml']);

		$reviews = new Reviews($this->site->db);

		// Create a review member 22 reviewing 35
		$time1 = time() + 112345;
		$review1 = new Review();
		$review1->set('step1', 22, 35, "This is a review!", $time1, [12]);
		$reviews->add($review1);

		// Create a review member 22 reviewing 10
		$time2 = $time1 + 1010;
		$review2 = new Review();
		$review2->set('step1', 22, 10, "This is another review!", $time2, [15]);
		$reviews->add($review2);

		$reviewsBy22 = $reviews->get_reviews_by(22, 'step1');
		$this->assertEquals(2, count($reviewsBy22));

		$review1a = $reviewsBy22[0];
		// Reviews are in reverse time order, so the 22/10 review is first
		$this->assertEquals(22, $review1a->reviewerId);
		$this->assertEquals(10, $review1a->reviewee->member->id);
		$this->assertEquals($time2, $review1a->time);
		$this->assertEquals('step1', $review1a->assignTag);
		$meta1 = $review1a->meta;
		$this->assertEquals("This is another review!", $meta1->get('review', 'review'));

		$review2a = $reviewsBy22[1];

		// Reviews are in reverse time order, so the 22/35 review is second
		$this->assertEquals(22, $review2a->reviewerId);
		$this->assertEquals(35, $review2a->reviewee->member->id);
		$this->assertEquals($time1, $review2a->time);
		$this->assertEquals('step1', $review2a->assignTag);
		$meta2 = $review2a->meta;
		$this->assertEquals("This is a review!", $meta2->get('review', 'review'));
	}

	public function test_get_review_counts() {
		$data = [[10, 22], [10,35], [22, 10], [22, 35], [35, 10]];

		$this->dataSets(['db/user.xml', 'db/member.xml']);

		$reviews = new Reviews($this->site->db);

		// Initially empty!
		$result = $reviews->get_review_counts("FS18", "799", "step1");
		$this->assertEquals(0, count($result));

		$time1 = time() + 112345;
		$time = $time1;

		foreach($data as $pair) {
			$reviewerId = $pair[0];
			$revieweeId = $pair[1];

			// Create a review
			$review1 = new Review();
			$review1->set('step1', $reviewerId, $revieweeId, "This is review " . $reviewerId . " of " . $revieweeId, $time);
			$reviews->add($review1);

			$time += 1000;
		}

		$result = $reviews->get_review_counts("FS18", "799", "step1");

		$this->assertEquals(5, count($result));

		for($i=0; $i<5; $i++) {
			$result1 = $result[$i];
			$expected = $data[$i];

			$this->assertEquals($expected[0], $result1['reviewerid']);
			$this->assertEquals($expected[1], $result1['revieweeid']);
			$this->assertEquals(1, $result1['count']);
		}

		$review1 = new Review();
		$review1->set('step1', 10, 22, "This is another 10/22 review" . $revieweeId, $time);
		$reviews->add($review1);
		$time += 1000;

		$review1 = new Review();
		$review1->set('step1', 10, 22, "This is yet another 10/22 review" . $revieweeId, $time);
		$reviews->add($review1);
		$time += 1000;

		$result = $reviews->get_review_counts("FS18", "799", "step1");
		$this->assertEquals(5, count($result));

		$result1 = $result[0];
		$expected = $data[0];

		$this->assertEquals($expected[0], $result1['reviewerid']);
		$this->assertEquals($expected[1], $result1['revieweeid']);
		$this->assertEquals(3, $result1['count']);
	}

}

/// @endcond
?>
