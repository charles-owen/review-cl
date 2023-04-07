<?php

namespace CL\Review;

use CL\Site\Api\APIException;
use CL\Site\Api\JsonAPI;
use CL\Site\Site;
use CL\Site\System\Server;
use CL\Course\Member;

/*
 * Handle polling requests to the review chat system
 */
class ChatPolling
{
    public function poll(Site $site, Server $server, array $post, JsonAPI $json, $time)
    {
        $user = $site->users->user;
        if ($user === null) {
            // If the user is logged out
            return;
        }

        $this->reviews_chat($site, $user, $server, $post, $time, $json);

    }

    /**
     * Get all assignment chat messages for requesting user
     *
     * /api/review/reviews_chat/:assigntag/
     * This is used on the assignment grading page
     *
     * @param Site $site The Site object
     * @param Server $server The server
     * @param array $params Parameters for the route
     * @param int $time Current time
     * @return JsonAPI
     * @throws APIException
     */
    private function reviews_chat(Site $site, User $user, Server $server, array $params, $time, JsonAPI $json)
    {
        if (count($params) < 1) {
            throw new APIException("Invalid API Path", APIException::INVALID_API_PATH);
        }

        $id = $params["chat_id"];
        $reviewAssignments = new ReviewAssignments($site->db);
        $reviewAssign = $reviewAssignments->get($id);

        // Get the assignment
        $section = $site->course->get_section_for($user);
        $assignment = $section->get_assignment($reviewAssign['assigntag']);
        if ($assignment === null || $assignment->reviewing === null) {
            throw new APIException("Review assignment does not exist");
        }

        $members = new Members($site->db);
        $reviewee = $members->getAsUser($reviewAssign['revieweeid']);

        $json->addData('reviewing', $id, $assignment->reviewing->reviewsData($reviewee));
    }
}
