/**
 * @file
 * Review system console components
 */

import ReviewReviewersVue from './ReviewReviewers.vue';

export let ReviewConsole = function() {
}

ReviewConsole.setup = function(Console) {
    Console.tables.add({
        title: 'Review',
        order: 16,
        api: '/api/review/tables'
    });

    Console.components.addRoute(
        {route: '/review/reviewers/:assigntag', component: ReviewReviewersVue, props: true}
    );

    // Console.components.addRoute(
    //     {route: '/quiz/result/:memberid/:assigntag/:quiztag', component: QuizResultComponent, props: true}
    // );

    Console.course.assignmentLink('review', 'reviewers', '/review/reviewers/:assigntag');
}

