<template>
  <div class="content">
    <div class="full">
      <div v-for="submission in json.submissions" class="cl-submission-view">
        <h2>{{submission.name}}</h2>
        <pre v-if="submission.type === 'text'" class="cl-preview yellow-pad">{{submission.text}}</pre>
        <figure v-if="submission.type === 'image'" class="cl-preview"><img :src="previewImg(submission)"></figure>
        <p class="cl-preview-time">{{formatTime(submission.date)}}</p>
      </div>
      <h3 style="text-align: center;background: #00723f;color: white;">Review & Chat</h3>
      <p class="cl-reviews-none" v-if="reviewing.length === 0">
        *** None Yet ***
      </p>
      <review-chat :reviewing="reviewing" :json="json" :context="context" :chat_id="chat_id"></review-chat>
    </div>
  </div>
</template>

<script>
import {UserVueBase} from 'users-cl/index'
import ReviewChatVue from './ReviewChat.vue'

/**
 * This is the page for a review of an assignment by a member.
 * /cl/review/:id
 * @constructor ReviewVue
 */
export default {
  'extends': UserVueBase,
  props: ['json'],
  data: function () {
    return {
      reviewing: [],
      submissions: {},
      chat_id: this.json.id,
      context: "reviewer", // context of the current file
    }
  },
  components: {
    reviewChat: ReviewChatVue
  },
  mounted() {
    this.setTitle('Peer Reviewing');
    this.reviewing = this.json.reviewing;


    let submissions = {};
    for (const submission of this.json.submissions) {
      submissions[submission.tag] = {
        'id': submission.id,
        'date': submission.date
      };
    }

    this.submissions = submissions;
  },
  methods: {
    formatTime(time) {
      return this.$site.TimeFormatter.relativeUNIX(time, null);
    },
    showSubmissions(review) {
      let past = false;
      const submissions = review.meta.review.submissions;
      for (let tag in submissions) {
        if (submissions[tag].id !== this.submissions[tag].id) {
          past = true;
        }
      }

      if (past) {
        return 'For a past submission';
      }

      return '';
    },
    previewImg(submission) {
      return this.$site.root + '/cl/review/img/' + submission.id;
    }
  }
}
</script>