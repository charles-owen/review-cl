<template>
  <div class="cl-reviews">
    <h3>Reviews of this assignment appear here.</h3>

    <p class="cl-reviews-none" v-if="reviewing.length === 0">*** None Yet ***</p>
    <div v-for="id in json.ids" class="cl-review">
      <review-chat :json="json" :context="context" :chat_id="id"></review-chat>
    </div>
    <button class="instruction_button" v-if="reviewing.length !== 0" @click="instructionvisiable">
      <img v-if="!showInstruction" src="../../site/img/expand.png">
      <img v-if="showInstruction" src="../../site/img/retract.png">
    </button>
    <span class="span" v-if="reviewing.length !== 0" @click="instructionvisiable">How to use the chat feature</span>

    <p v-show="showInstruction" class="Instruction_content">
      How to use the chat feature
    </p>
  </div>
</template>

<script>

import ReviewChatVue from './ReviewChat.vue'

/**
 * This is the inline vue for reviews of an assignment used by the
 * submission and page the course console grading page.
 *
 * @constructor ReviewsVue
 */
export default {
  props: ['json'],
  data: function () {
    return {
      assignTag: '',
      shownAnnotation: null,
      reviewing: [],
      context: "reviewee", // context of the current file
      showInstruction: false,
      clickCount: 0
    }
  },
  components: {
    reviewChat: ReviewChatVue,
  },
  mounted() {
    this.assignTag = this.json.assignTag;
    this.reviewing = this.json.reviewing;
  },
  methods: {
    formatTime(time) {
      return this.$site.TimeFormatter.relativeUNIX(time, null);
    },
    showSubmissions(review) {
      let ret = '';
      for (let tag in review.submissions) {
        if (ret !== '') {
          ret += ' / ';
        }
        ret += this.$site.TimeFormatter.absoluteUNIX(review.submissions[tag].date);
      }

      if (ret === '') {
        return '';
      }

      return 'Submission: ' + ret;
    },
    show(svg, width, height, image_src) {
      this.shownAnnotation = {
        svg: svg,
        width: width,
        height: height,
        image_src: image_src
      };
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
  }
}
</script>

<style>
.Instruction_content{
  position: relative;
  border: 1pt gray solid;
  word-wrap: normal;
  background: #f0f0f0;
  color: #000;
  padding: 5px;
  cursor: text;
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
}
</style>
