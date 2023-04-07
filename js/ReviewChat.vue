<template>
  <div class="cl-reviewChat">
    <p class="incoming-id" v-show="chat.length!==0">R{{incoming.slice(1,)}}: {{recipient}}</p>
    <div class="cl-chat-div" v-show="chat.length!==0">
      <div v-for="review in chat" class="message-div">
        <div>
          <div v-if="review.context === context" class="cl-review-present cl-chat-bubble cl-chat-outgoing">
            {{review.review}}<br><div class="cl-chat-time">{{formatTime(review.time)}}</div></div>

          <div v-else-if="review.annotation !== null" class="cl-review-present cl-chat-bubble cl-chat-incoming cl_chat_annotation">
            <a href="#" @click.prevent="selected_review = review;">{{review.review}}</a><br><div class="cl-chat-time">{{formatTime(review.time)}}</div></div>

          <div v-else="" class="cl-review-present cl-chat-bubble cl-chat-incoming">
            {{review.review}}<br><div class="cl-chat-time">{{formatTime(review.time)}}</div></div>
        </div>
      </div>
    </div>
    <form method="post" @submit.prevent="submit" v-show="!(chat.length === 0 && context === 'reviewee')">
      <div ref="editor" class="shadow"></div>
      <input type="submit" value="Send">
    </form>
    <review-annotation :chat="chat" :review="selected_review"></review-annotation>
  </div>
</template>

<script>

import ReviewAnnotationVue from './ReviewAnnotation.vue'

export default {
  props: ['json', 'context', 'chat_id'],
  emit: ['submit'],
  inheritAttrs: false,
  data: function () {
    return {
      chat: this.json.reviewing.filter(this.filterChatId),
      selected_review: null,
      incoming: this.context === 'reviewer' ? 'reviewee' : 'reviewer',
      recipient: "",
      timer: null,
    }
  },
  components: {
    reviewAnnotation: ReviewAnnotationVue,
  },
  mounted() {
    const element = this.$refs['editor'];
    this.editor = new this.$site.Editor(element, {
      height: '1em',
      classes: ['#F3F3F3']
    });
    let submissions = {};
    for (const submission of this.json.submissions) {
      submissions[submission.tag] = {
        'id': submission.id,
        'date': submission.date
      };
    }

    this.submissions = submissions;

    this.chat = new Chat(this.chat_id);

    this.setName();

    this.chat.startPolling();

    // this.timer = setInterval(() => {
    //   this.refreshChat()
    // }, 1000)
  },
  updated() {
    this.setName();
  },
  beforeDestroy() {
    this.$chat.endPolling();
    //clearInterval(this.timer);
  },
  methods: {
    submit() {
      const text = this.editor.textarea.value.trim();
      if (text === '') {
        Site.toast(this, 'You must enter some text to submit');
        return;
      }

      let params = {
        type: 'text/plain',
        text: text,
        submissions: this.submissions,
        context: this.context,
      }

      // Request backend data API
      // this.$site.api.post(`/api/review/review/${this.chat_id}`, params)
      //     .then((response) => {
      //       if (!response.hasError()) {
      //         this.editor.textarea.value = '';
      //         var latestMessage = response.getData('reviewing').attributes;
      //         this.chat.unshift({
      //           by: this.chat_id,
      //           review: latestMessage.meta.review.review,
      //           time: latestMessage.time,
      //           context: latestMessage.meta.review.context,
      //         });
      //         this.$emit('submit', latestMessage.id);
      //       } else {
      //         this.$site.toast(this, response);
      //       }
      //
      //     })
      //     .catch((error) => {
      //       this.$site.toast(this, error);
      //     });
    },
    formatTime(time) {
      return this.$site.TimeFormatter.relativeUNIX(time, null);
    },    refreshChat() {
      this.$site.api.post(`/api/review/reviews_chat/${this.chat_id}`)
        .then((response) => {
          if (!response.hasError()) {
            this.chat = response.getData('reviewing').attributes.filter(this.filterChatId);
          } else {
            console.log(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setName() {
      if (this.recipient === "" && this.chat.length !== 0) this.recipient = this.chat[0][this.incoming];
    }

  }
}
</script>

<style scoped>
  .cl-chat-div{
    height: 48vh;
    min-height: 30vh;
    border: solid 1px;
    overflow-x: hidden;
    display: flex;
    flex-direction: column-reverse;
    margin: 0;
  }
  .cl-chat-bubble {
    min-width: 40%;
    max-width: 60%;
    border: solid 1px;
    border-radius: 13px;
    font-size: 12px;
    padding: 9px 12px;
    word-wrap: break-word;
  }
  .cl-chat-incoming {
    float: left;
  }

  .cl-chat-outgoing{
    background-color: #0c5645;
    color: white;
    float: right;
    text-align: left;
  }

  .incoming-id{
    margin:0;
    color: #204c42;
    font-weight: bold;
    font-size: small;
  }

  .cl-chat-time {
    opacity: 0.5;
    text-align: right;
  }

  .message-div {
    padding: 5px 10px;
  }

  .message-div:first-child {
    padding: 5px 10px 10px;
  }

</style>
