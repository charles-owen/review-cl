<template>
    <router-link :to="root + '/cl/console/grading/' + assigntag + '/' + statusUser.member.id" v-if="statusUser !== null" :title="statusUser.name">{{statusUser.userId}}/{{count}}</router-link>
</template>

<script>
    /**
     * @constructor StatusPresentVue
     * Displays the status of a reviewer or reviewee.
     * Used by ReviewReviewers.vue
     */
    export default {
        'extends': Site.Site.ConsoleComponentBase,
        props: ['assigntag', 'statusUser', 'count']
    }
</script>