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

}

/// @endcond
