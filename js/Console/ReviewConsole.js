

import ReviewReviewersVue from './ReviewReviewers.vue';
import ReviewsByForMemberVue from './ReviewsByForMember.vue';

/**
 * Review system console components
 * @constructor
 */
export let ReviewConsole = function() {
}

ReviewConsole.setup = function(Console) {
    Console.Review = {
        'reviewsbyfor': ReviewsByForMemberVue
    };

    Console.tables.add({
        title: 'Review',
        order: 70,
        api: '/api/review/tables'
    });

    Console.components.addRoute(
        {route: '/review/reviewers/:assigntag', component: ReviewReviewersVue, props: true}
    );

    Console.course.assignmentLink('review', 'reviewers', '/review/reviewers/:assigntag');
}

