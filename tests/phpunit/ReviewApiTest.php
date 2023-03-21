<?php
/** @file
 * Unit tests for the class ReviewApi
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
use CL\Review\ReviewApi;
use CL\Site\Test\ServerMock;
use CL\Course\Submission\Submissions;

class ReviewApiTest extends ReviewDatabaseTestBase {
    /**
     * Set up for testing by creating the necessary tables.
     * @return void
     */
    protected function setUp() : void {
        $this->ensureTable(new Users($this->site->db));
        $this->ensureTable(new Members($this->site->db));
        $this->ensureTable(new ReviewAssignments($this->site->db));
        $this->ensureTable(new Reviews($this->site->db));
        $this->ensureTable(new Submissions($this->site->db));
    }

    /**
     * Tests for the API end point /api/review/reviewers
     * @return void
     * @throws Exception
     */
	public function test_review_reviewers() {
        $this->dataSets(['db/user.xml', 'db/member.xml', 'db/reviewassignment.xml']);

        // Create a site that has the modules we need. The modules
        // that are installed are defined by cl/installed.php
        $site = $this->createSite();

        // Get an instructor member and set as the
        // current user in the Site object
        $members = new Members($this->site->db);
        $admin = $members->getAsUser(1);
        $site->users->user = $admin;

        // Open the site.
		$site->start(['open'=>true]);

        // Object to test
        $api = new ReviewApi();

		$time1 = strtotime('1/10/2023 12:01am');
		$server = new ServerMock();

        // This is how you test a server endpoint. The first
        // function tells what the URL should look like. The
        // second directly calls the API with the parameters
        // from the URL and any passed properties
		$server->setServer('REQUEST_URI', '/api/review/reviewers/design2');
		$ret = $api->apiDispatch($site, $server, ['reviewers', 'design2'], [], $time1);

        $json = json_decode($ret, true);
        $reviewers = $json['data'][0]['attributes'];

        // These are the reviewer/reviewee assignments we expect to see
        // These come from the file db/reviewassignment.xml that we
        // load into the database.
        $expected = [
            [22, 35],
            [22, 47],
            [35, 47],
            [35, 49],
            [47, 22],
            [47, 35]
        ];

        $this->assertEquals(6, count($reviewers));
        foreach($expected as $pair) {
            $this->assertContains([$pair[0], $pair[1], 0], $reviewers);
        }
	}

    /**
     * Tests for the API endpoint /api/review/notify for individual reminder
     * @return void
     * @throws Exception
     */
    public function test_review_notify_individual() {
        $this->dataSets(['db/user.xml', 'db/member.xml', 'db/reviewassignment.xml']);

        // Create a site that has the modules we need. The modules
        // that are installed are defined by cl/installed.php
        $site = $this->createSite();

        // Get an instructor member and set as the
        // current user in the Site object
        $members = new Members($this->site->db);
        $admin = $members->getAsUser(1);
        $site->users->user = $admin;

        // Open the site.
        $site->start(['open'=>true]);

        // Object to test
        $api = new ReviewApi();

        $time1 = strtotime('1/10/2023 12:01am');
        $server = new ServerMock();

        $submissions = new Submissions($this->site->db);
        $reviews = new Reviews($this->site->db);

        // Start by testing a individual reminder to user with userid 5 and memberid 22
        $server->setServer('REQUEST_URI', '/api/review/notify/design2');
        $server->setPost('userId', 5);
        $server->setPost('isClass', false);
        $ret = $api->apiDispatch($site, $server, ['notify', 'design2'], [], $time1);

        // Grab the return data and ensure values are as expected
        $json = json_decode($ret, true);
        $notificationsSent = $json['data'][0]['attributes'];
        $notificationUnavailable = $json['data'][1]['attributes'];
        $this->assertEquals(1, $notificationsSent);
        $this->assertEquals(0, $notificationUnavailable);

        // Have user 5 (member 22) submit both their reviews then send again and ensure they are not notified
        $review = new Review();
        $review->set('design2', 22, 35, "review", $time1);
        $reviews->add($review);
        $review = new Review();
        $review->set('design2', 22, 47, "review", $time1);
        $reviews->add($review);

        // Recall the api call, this time 1 notification should send since user 5 submitted and someone he is reviewing did
        $ret = $api->apiDispatch($site, $server, ['notify', 'design2'], [], $time1);
        $json = json_decode($ret, true);
        $notificationsSent = $json['data'][0]['attributes'];
        $notificationUnavailable = $json['data'][1]['attributes'];
        $this->assertEquals(0, $notificationsSent);  // No notifications sent since user did reviews
        $this->assertEquals(0, $notificationUnavailable);  // Notifications are available since user submitted
    }

    /**
     * Tests for the API endpoint /api/review/notify for class reminder
     * @return void
     * @throws Exception
     */
    public function test_review_notify_class() {
        $this->dataSets(['db/user.xml', 'db/member.xml', 'db/reviewassignment.xml']);

        // Create a site that has the modules we need. The modules
        // that are installed are defined by cl/installed.php
        $site = $this->createSite();

        // Get an instructor member and set as the
        // current user in the Site object
        $members = new Members($this->site->db);
        $admin = $members->getAsUser(1);
        $site->users->user = $admin;

        // Open the site.
        $site->start(['open'=>true]);

        // Object to test
        $api = new ReviewApi();

        $time1 = strtotime('1/10/2023 12:01am');
        $server = new ServerMock();

        $submissions = new Submissions($this->site->db);
        $reviews = new Reviews($this->site->db);

        // Start by testing a class reminder
        $server->setServer('REQUEST_URI', '/api/review/notify/design2');
        $server->setPost('userId', 'null');
        $server->setPost('isClass', true);
        $ret = $api->apiDispatch($site, $server, ['notify', 'design2'], [], $time1);

        // Grab the return data and ensure values are as expected
        $json = json_decode($ret, true);
        $notificationsSent = $json['data'][0]['attributes'];
        $this->assertEquals(3, $notificationsSent);  // Since 3 people have reviews assigned this should be 3 at first

        // Have user 5 (member 22) submit both their reviews then send again and ensure they are not notified
        $review = new Review();
        $review->set('design2', 22, 35, "review", $time1);
        $reviews->add($review);
        $review = new Review();
        $review->set('design2', 22, 47, "review", $time1);
        $reviews->add($review);

        // Recall the api call, this time 1 notification should send since user 5 submitted and someone he is reviewing did
        $ret = $api->apiDispatch($site, $server, ['notify', 'design2'], [], $time1);
        $json = json_decode($ret, true);
        $notificationsSent = $json['data'][0]['attributes'];
        $this->assertEquals(2, $notificationsSent);  // Now that member 22 did reviews, 2 notifications are sent

        // Have remaining members with reviews (35 and 47) submit their reviews
        $review = new Review();
        $review->set('design2', 35, 47, "review", $time1);
        $reviews->add($review);
        $review = new Review();
        $review->set('design2', 35, 49, "review", $time1);
        $reviews->add($review);
        $review = new Review();
        $review->set('design2', 47, 22, "review", $time1);
        $reviews->add($review);
        $review = new Review();
        $review->set('design2', 47, 35, "review", $time1);
        $reviews->add($review);

        // Recall the api this time there should be 0 reminders sent since everyone did their reviews
        $ret = $api->apiDispatch($site, $server, ['notify', 'design2'], [], $time1);
        $json = json_decode($ret, true);
        $notificationsSent = $json['data'][0]['attributes'];
        $this->assertEquals(0, $notificationsSent);  // Now that member 22 did reviews, 2 notifications are sent
    }

}

/// @endcond
