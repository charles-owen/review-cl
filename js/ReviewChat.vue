<template>
  <div class="cl-reviewChat" @click="formVisible">
    <div v-if="chat.length!==0 && context === 'reviewee'" @click="showInstructions = true"  @click.stop>
    </div>
    <p class="incoming-id" v-show="chat.length!==0">R{{incoming.slice(1,)}}: {{recipient}}</p>
    <div class="cl-chat-div" v-show="chat.length!==0">
      <div v-for="review in chat" class="message-div">
        <div>
          <div @click.stop v-if="review.context === context" class="cl-review-present cl-chat-bubble cl-chat-outgoing">
            {{review.review}}<br><div class="cl-chat-time">{{formatTime(review.time)}}</div></div>

          <div @click.stop v-else-if="review.annotation !== null" class="cl-review-present cl-chat-bubble cl-chat-incoming cl_chat_annotation">
            <a href="#" @click.prevent="selected_review = review;">{{review.review}}</a><br><div class="cl-chat-time">{{formatTime(review.time)}}</div></div>

          <div @click.stop v-else="" class="cl-review-present cl-chat-bubble cl-chat-incoming">
            {{review.review}}<br><div class="cl-chat-time">{{formatTime(review.time)}}</div></div>
        </div>
      </div>
    </div>
    <form id="form" method="post" @submit.prevent="submit"
          v-show="context === 'reviewee' ? showForm : true"
          class="form-container" @click.stop>

      <textarea ref="textArea" style="border: 3px solid;
      padding-left: 5px;"  rows=1 cols="55"></textarea>

      <input type="submit" value="Send" class="sendbutton">
    </form>
    <div class="instruction_container"  v-show="showInstructions && chat.length!==0">
      <button class="instruction_button" @click.stop="instructionvisiable">
        <img v-if="!showInstruction" src="../../site/img/expand.png">
        <img v-if="showInstruction" src="../../site/img/retract.png">
      </button>
      <span class="span" @click.stop="instructionvisiable">How to use the chat feature</span>
      <p v-show="showInstruction" class="Instruction_content">How to use the chat feature</p>
    </div>
  </div>
</template>

<script>
import ReviewAnnotationVue from './ReviewAnnotation.vue'
export default {
  props: ['json', 'context', 'chat_id','showInstructions'],
  emit: ['submit'],
  inheritAttrs: false,
  data: function () {
    return {
      chat: this.json.reviewing.filter(this.filterChatId),
      selected_review: null,
      incoming: this.context === 'reviewer' ? 'reviewee' : 'reviewer',
      recipient: "",
      timer: null,
      showForm: false,
      showInstruction: false,
      clickCount: 0,
      ClickCount: 0

    }
  },
  components: {
    reviewAnnotation: ReviewAnnotationVue,
  },
  mounted() {
    let submissions = {};
    for (const submission of this.json.submissions) {
      submissions[submission.tag] = {
        'id': submission.id,
        'date': submission.date
      };
    }
    this.submissions = submissions;
    this.setName();
    this.timer = setInterval(() => {
      this.refreshChat()
    }, 1000)
    const textArea = this.$refs.textArea;
    textArea.addEventListener('input', () => {
      textArea.style.height = 'auto';
      textArea.style.height = `${textArea.scrollHeight}px`;
      if (textArea.value.length > 49) {
        textArea.style.width = '769px';
        textArea.style.width = `${textArea.scrollWidth}px`;
      } else {
        textArea.style.width = '';
      }
    });
  },
  updated() {
    this.setName();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    submit() {
      const text = this.$el.querySelector('textarea').value.trim();
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
              this.$el.querySelector('textarea').value = '';
              var latestMessage = response.getData('reviewing').attributes;
              this.chat.unshift({
                by: this.chat_id,
                review: latestMessage.meta.review.review,
                time: latestMessage.time,
                context: latestMessage.meta.review.context,
              });
              this.$emit('submit', latestMessage.id);
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
    },
    refreshChat() {
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
    },
    formVisible() {
      if (this.clickCount === 0) {
        this.showForm = true;
      }
      this.clickCount++;
      if (this.clickCount >= 2) {
        this.showForm = false;
        this.clickCount = 0;
      }
    },
    instructionvisiable() {
      if (this.ClickCount === 0) {
        this.showInstruction = true;
      }
      this.ClickCount++;
      if (this.ClickCount >= 2) {
        this.showInstruction = false;
        this.ClickCount = 0;
      }
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
  cursor: pointer;
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
  cursor: text;
}
.cl-chat-outgoing{
  background-color: #0c5645;
  color: white;
  float: right;
  text-align: left;
  cursor: text;
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
.form-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  margin-top:15px;
}
textarea {
  display: block;
  margin: 0 auto;
  overflow: hidden;
  resize: none;
  border-radius: 8px;
  shadow: black;
}
.sendbutton{
  margin-left: 10px;
  border-radius: 3px;
}

.instruction_container{
  padding-bottom: 10px;
}

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
