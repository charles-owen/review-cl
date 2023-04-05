<template>
  <div class="content">
    <div class="full">
      <div v-for="submission in json.submissions" class="cl-submission-view">
        <h2>{{submission.name}}</h2>
        <pre v-if="submission.type === 'text'" class="cl-preview yellow-pad">{{submission.text}}</pre>
        <review-drawing v-if="submission.type === 'image'" :chat_id="chat_id" :submission="submission" :image="previewImg(submission)" ref="reviewDrawing"></review-drawing>

        <p class="cl-preview-time">{{formatTime(submission.date)}}</p>
      </div>

      <h3 style="text-align: center;background: #00723f;color: white;">Review &amp; Chat</h3>
      <p class="cl-reviews-none" v-if="reviewing.length === 0">
        *** None Yet ***
      </p>
      <review-chat :json="json" :context="context" :chat_id="chat_id" @submit="submit"></review-chat>
    </div>
    <button class="instruction_button" v-if="reviewing.length !== 0" @click="instructionvisiable">
      <img v-if="!showInstruction" src="../../site/img/expand.png">
      <img v-if="showInstruction" src="../../site/img/retract.png">
    </button>
    <span class="span" v-if="reviewing.length !== 0" @click="instructionvisiable">How to use the chat feature</span>


    <p v-show="showInstruction" class="Instruction_content">How to use the chat feature</p>
  </div>
</template>

<style scoped> @import "./styles.css" </style>

<script>
import {UserVueBase} from 'users-cl/index'
import ReviewChatVue from './ReviewChat.vue'
import ReviewDrawing from './ReviewDrawing.vue';

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
      showInstruction: false,
      clickCount: 0

    }
  },
  components: {
    reviewChat: ReviewChatVue,
    reviewDrawing: ReviewDrawing,
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
    submit(review_id) {
      this.$refs.reviewDrawing[0].submit(review_id);
    },
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
    },
    instructionvisiable() {
      if (this.clickCount === 0) {
        this.showInstruction = true;
      }
      this.clickCount++;
      if (this.clickCount >= 2) {
        this.showInstruction = false;
        this.clickCount = 0;
      }
    }
  },
}
</script>

<style>
.Instruction_content{
  border: 1pt gray solid;
  word-wrap: normal;
  background: #f0f0f0;
  color: #000;
  padding: 5px;
  cursor: text;
  text-align: justify;
  display: block;
}

.span{
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  font-family: Verdana,Geneva,sans-serif;
  padding-left: 2px;

}

.instruction_button{
  background-color: transparent;
  border: none;
  padding: 0;
  background-repeat: no-repeat;

}

.instruction-button img {
  display: block;
  object-fit: contain;
  hight: 80%;
  width:80%;
}
</style>
