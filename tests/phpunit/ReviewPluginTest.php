<?php
/** @file
 * Unit tests for the class ReviewPlugin
 *
 * This is mainly to test that we are getting the plugin installed
 * in a test environment that will work for tests like ReviewApiTest
 *
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

class ReviewPluginTest extends ReviewDatabaseTestBase {
    /**
     * Set up for testing by creating the necessary tables.
     * @return void
     */
    protected function setUp() : void {
        $this->ensureTable(new Users($this->site->db));
        $this->ensureTable(new Members($this->site->db));
    }

    /**
     * Test getting an assignment during a test. This ensures
     * the assignment is being loaded correctly from the
     * assignments file.
     * @return void
     * @throws Exception
     */
    public function testGetAssignment() {
        // Preload the database
        $this->dataSets(['db/user.xml', 'db/member.xml']);

        // Create a site that has the modules we need. The modules
        // that are installed are defined by cl/installed.php
        $site = $this->createSite();

        // Get an instructor member and set as the
        // current user in the Site object
        $members = new Members($this->site->db);
        $admin = $members->getAsUser(1);
        $site->users->user = $admin;

        // Open the site. This will load course/assignments.fs18.799.php
        // which will create some assignments we can refer to.
        $site->start(['open'=>true]);

        // How to get an assignment
        $section = $site->course->getDefaultSection();
        $assignment = $section->assignments->get_assignment('design2');

        $this->assertNotNull($assignment);
        $this->assertEquals('design2', $assignment->tag);
    }
}

/// @endcond
