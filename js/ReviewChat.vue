<template>
  <div class="cl-reviewChat">
    <div class = "cl-chat-div" v-if="chat.length!==0">
      <div v-for="review in chat" class="cl-review message-div">
        <p class = "incoming-id" v-if="review.context === incoming && review.by == chat_id">R{{incoming.slice(1,)}}: {{review[incoming]}}</p>
        <div>
          <p v-if="review.context === context && review.by == chat_id"
             class="cl-review-present cl-chat-outgoing">
            {{review.review}}<br>{{formatTime(review.time)}}</p>

          <p v-else-if="review.by == chat_id" class="cl-review-present cl-chat-incoming">
            {{review.review}}<br>{{formatTime(review.time)}}</p>
        </div>
      </div>
    </div>
    <form method="post" @submit.prevent="submit" v-show="!(chat.length === 0 && context === 'reviewee')">
      <div ref="editor" class="shadow"></div>
      <input type="submit" value="Send">
    </form>
  </div>
</template>

<script>
export default {
  props: ['json', 'context', 'chat_id'],
  inheritAttrs: false,
  data: function () {
    return {
      chat: this.json.reviewing.filter(this.filterChatId),

      //the other side of context(ex: context = reviewer incoming = reviewee)
      incoming: this.context === 'reviewer' ? 'reviewee' : 'reviewer'

    }
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
      this.$site.api.post(`/api/review/review/${this.chat_id}`, params)
          .then((response) => {
            if (!response.hasError()) {
              this.editor.textarea.value = '';
              var latestMessage = response.getData('reviewing').attributes;
              this.chat.unshift({
                by: this.chat_id,
                review: latestMessage.meta.review.review,
                time: latestMessage.time,
                context: latestMessage.meta.review.context,
              });
            } else {
              this.$site.toast(this, response);
            }

          })
          .catch((error) => {
            this.$site.toast(this, error);
          });
    },
    formatTime(time) {
      return this.$site.TimeFormatter.relativeUNIX(time, null);
    },
    filterChatId(review){
      return this.chat_id == review.by;
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
  }
  .cl-chat-incoming {
    width: 200px;
    border: solid 1px;
    border-radius: 10px;
    font-size: 12px;
    clear: right;
    padding: 10px;
    word-wrap: break-word;
  }

  .cl-chat-outgoing{
    width: 200px;
    border: solid 1px;
    border-radius: 10px;
    font-size: 12px;
    background-color: #0c5645;
    color: white;
    float: right;
    clear: right;
    padding: 10px;
    word-wrap: break-word;
  }

  .incoming-id{
    margin:0;
    color: #204c42;
    font-weight: bold;
    font-size: small;
  }

  .message-div{
    padding: 5px;
  }

</style>
