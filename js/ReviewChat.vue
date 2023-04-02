<template>
  <div class="cl-reviewChat" @click="formvisable">
    <div v-if="chat.length!==0 && context === 'reviewee'" @click="showInstructions = true"  @click.stop>
      <button class="Instruction_button"  title="How to use the chat feature">Instruction</button>
    </div>
    <div class="cl-popup" v-if="showInstructions" @click.stop>
      <div class="cl-popup-content">
        <span class="cl-popup-close" @click="closeInstructions">&times;</span>
        <p >How to use the chat feature</p>
      </div>
    </div>
    <div style="width: 769px; height: 400px; border: solid 1px; overflow-x: hidden;
    cursor: pointer; margin-bottom: 20px; text-align: center;" v-if="chat.length!==0">
      <div v-for="review in chat.slice().reverse()" class="cl-review">
        <div>
          <p @click.stop v-if="review.context === context && review.by == chat_id" class="cl-review-present cl_chat_outgoing">
            {{review.review}}<br>{{formatTime(review.time)}}</p>

          <p @click.stop v-else-if="review.by == chat_id" class="cl-review-present cl_chat_incoming">
            {{review.review}}<br>{{formatTime(review.time)}}</p>
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
  </div>
</template>

<script>
export default {
  props: ['json', 'context', 'chat_id'],
  inheritAttrs: false,
  data: function () {
    return {
      chat: this.json.reviewing.filter(this.filterChatId),
      showForm: false,
      showInstructions: false,
      clickCount: 0
    }
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
    formvisable() {
      if (this.clickCount === 0) {
        this.showForm = true;
      }
      this.clickCount++;

      if (this.clickCount >= 3) {
        this.showForm = false;
        this.clickCount = 0;
      }
    },
    closeInstructions() {
      this.showInstructions = false;
    }
  }
}
</script>

<style scoped>
.cl_chat_incoming {
  width: 300px;
  border: solid 1px;
  border-radius: 10px;
  padding: 5px;
  font-size: 12px;
  clear: right;
  padding: 10px;
  cursor: text;
}

.cl_chat_outgoing{
  width: 300px;
  border: solid 1px;
  border-radius: 10px;
  padding: 5px;
  font-size: 12px;
  background-color: #0c5645;
  color: white;
  float: right;
  clear: right;
  padding: 10px;
  cursor: text;
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

.Instruction_button
{
  position: fixed;
  transform-origin: top left;
  text-align: center;
  cursor: pointer;
  transform: rotate(-90deg);
  top: 65%;
  right: -66px;
  width: 90px;
  height: 28px;
  z-index: 1;
  font-size: 12px;
  background-color: #1f5b3f;
  color: #eaeaea;

}

.cl-popup {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.cl-popup-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  max-width: 500px;
  cursor: text;
}

.cl-popup-close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.cl-popup-close:hover,
.cl-popup-close:focus {
  color: #1f5b3f;
  text-decoration: none;
  cursor: pointer;
}
</style>



