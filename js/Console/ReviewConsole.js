import ReviewReviewersVue from './ReviewReviewers.vue';
import ReviewsByForMemberVue from './ReviewsByForMember.vue';

/**
 * Review system console components
 * @constructor
 */
export let ReviewConsole = function() {
}

ReviewConsole.setup = function(Console) {
    // Install into the console for the grading system to use
    Console.Review = {
        'reviewsbyfor': ReviewsByForMemberVue
    };

    // Add the link to the tables management page
    Console.tables.add({
        title: 'Review',    // Name of the link
        order: 70,          // Allows us to specify an order they appear in
        api: '/api/review/tables'   // The link to manage the tables
    });

    // Add the reviewers selection page
    Console.components.addRoute(
        {route: '/review/reviewers/:assigntag', component: ReviewReviewersVue, props: true}
    );

    // Add the link on the assignments page for reviewers
    Console.course.assignmentLink('review', 'reviewers', '/review/reviewers/:assigntag');
}

