<?php

namespace CL\Review;

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
        if($user === null) {
            // If the user is logged out
            return;
        }

    }
}
