<template>
  <div class="cl-reviewChat">
    <p class="incoming-id" v-show="chat.length!==0">R{{incoming.slice(1,)}}:
      <span v-if="chat_id !== '-1'">{{recipient}}</span>
      <span v-else>Staff</span>
    </p>
    <div class="cl-chat-div" v-show="chat.length!==0">
      <div v-for="review in chat">
        <div v-if="review.status == 'displayed' || review.context == 'staff'" class="message-div">
          <!-- Outgoing messages-->
          <div v-if="review.context === context && review.by == chat_id && (review.status == 'displayed' || review.context == 'staff')"
               class="cl-review-present cl-chat-bubble cl-chat-outgoing">
            <p :id="'p'+review.id" class="cl-chat-text">{{review.review}}</p>
            <form action="" :id="'show'+review.id" style="display: none;" method="post" @click.stop>
              <input type="hidden" name="reviewID" :value=review.id>
              <input :id="'youText'+review.id" type="text" name="review" class="edit_input" value="">
              <div class="button-container">
                <div class="confirm" @click.stop="saveEdit(review.id,review.review)">Save</div>
                <div class="confirm" @click.stop="cancel(review.id)">Cancel</div>
              </div>
            </form>
            <div class="cl-chat-format">
              <button :id="'del'+review.id" title="Delete" @click.stop="deleteContent(review.id)">
                <img src="../../site/img/delete.png" >
              </button>
              <button :id="'edit'+review.id" title="Edit" @click.stop="editContent(review.id,review.review)">
                <img src="../../site/img/edit.png" >
              </button>
              <div class="cl-chat-time cl-chat-space">{{formatTime(review.time)}}</div>
            </div>
          </div>

          <!-- Incoming chats-->
          <div @click.stop v-else-if="review.annotation !== null" class="cl-review-present cl-chat-bubble cl-chat-incoming cl_chat_annotation" v-if="review.status == 'displayed' || review.context == 'staff'">
            <a href="#" @click.prevent="selected_review = review;">{{review.review}}</a><div class="cl-chat-time">{{formatTime(review.time)}}</div>
          </div>
          <div @click.stop v-else="" class="cl-review-present cl-chat-bubble cl-chat-incoming">
            {{review.review}}
            <div class="cl-chat-time">{{formatTime(review.time)}}</div>
          </div>

        </div>
      </div>
    </div>
    <form id="form" method="post" @submit.prevent="submit"
          v-show="!(chat.length === 0 && context === 'reviewee') && chat_id !== '-1'"
          class="form-container" @click.stop>

      <textarea ref="textArea" class="cl-chat-input" rows="1" cols="78" contenteditable="true"></textarea>

      <input type="submit" value="Send" class="sendbutton">
    </form>

    <div @click.stop>
      <review-annotation :chat="chat" :review="selected_review "></review-annotation>
    </div>

  </div>
</template>

<script>

import ReviewAnnotationVue from './ReviewAnnotation.vue'
import {Chat} from './Chat.js'

export default {
  props: ['json', 'context', 'chat_id', 'anon_index'],
  emit: ['submit'],
  inheritAttrs: false,
  data: function () {
    return {
      chat: this.json.reviewing.filter(this.filterChatId),
      selected_review: null,
      incoming: this.context === 'reviewer' ? 'reviewee' : 'reviewer',
      recipient: "",
      polling: null,
      showForm: false,
      showEdit: false,
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

    const textArea = this.$refs.textArea;

    textArea.addEventListener('input', () => {
      textArea.style.height = 'auto';
      textArea.style.height = `${textArea.scrollHeight}px`;
    });


    this.submissions = submissions;

    if(this.chat_id != '-1') {
      this.polling = new Chat(this.$site, this.chat_id, this);

      this.polling.startPolling();
    }

    this.setName();
  },

  beforeDestroy() {
    if (this.chat_id != '-1') {
      this.polling.endPolling();
    }
  },
  methods: {
    /**
     * Function to submit/send the chat
     */
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

      //Request backend data API
      this.$site.api.post(`/api/review/review/${this.chat_id}`, params)
          .then((response) => {
            if (!response.hasError()) {
              this.$el.querySelector('textarea').value = '';
              this.$nextTick(() => {
                this.$refs.textArea.style.height = "";
              });
              var latestMessage = response.getData('reviewing').attributes;
              this.chat.unshift({
                by: this.chat_id,
                review: latestMessage.meta.review.review,
                time: latestMessage.time,
                context: latestMessage.meta.review.context,
              });
              this.$emit('submit', latestMessage.id);
              this.chat[0].status = 'displayed';
            } else {
              this.$site.toast(this, response);
            }

          })
          .catch((error) => {
            this.$site.toast(this, error);
          });
    },
    /**
     * Function to save the edit made to a message
     * @param reviewId - the id of the chat we are editing
     * @param review - the edited message
     */
    saveEdit(reviewId,review) {
      var youText = document.getElementById("youText"+reviewId).value.trim();
      if (youText == ""){
        youText = review;
      }
      let params = {
        type: 'text/plain',
        text: youText,
      }
      this.$site.api.post(`/api/review/editReview/${reviewId}`,params)
          .then((response) => {
            if (!response.hasError()) {
              var delID = document.getElementById('del'+reviewId);
              var editID = document.getElementById('edit'+reviewId);
              document.getElementById('show'+reviewId).style.display="none";
              document.getElementById('p'+reviewId).style.display="block";
              this.$site.toast(this, "Edit Saved!");
            } else {
              this.$site.toast(this, response);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
    cancel(reviewId){
      document.getElementById('show'+reviewId).style.display="none";
      document.getElementById('p'+reviewId).style.display="block";
    },
    formatTime(time) {
      return this.$site.TimeFormatter.relativeUNIX(time, null);
    },
    /**
     * Function to filter the chats by their associated chat ids so they are split into their respective chat windows
     * @param review
     * @returns {boolean}
     */
    filterChatId(review){
      return this.chat_id == review.by;
    },

    /**
     * Set the name of the recipient of the message- if anonymous make it Student A,B,etc.
     */
    setName() {
      // if (this.recipient === "" && this.chat.length !== 0) this.recipient = this.chat[0][this.incoming];
      if(this.recipient === "" && this.chat.length !== 0){
        if(this.chat[0]["anonymous"] === true){
          let letter = "A"
          let result = letter.charCodeAt(0) + this.anon_index;
          this.recipient = 'Student ' + String.fromCharCode(result);
        }
        else{
          this.recipient = this.chat[0][this.incoming];
        }
      }
    },
    /**
     * Bringing up the dialog box to confirm the deletion of the message and updating its status in the back end
     * @param reviewId - the id of the review that we are deleting
     */
    deleteContent(reviewId){
      new this.$site.Dialog.MessageBox('Are You Sure?', 'Are you sure you want to delete this message?',
          this.$site.Dialog.MessageBox.OKCANCEL, () => {
            this.$site.api.post(`/api/review/removeReview/${reviewId}`)
                .then((response) => {
                  if (!response.hasError()) {
                    var delID = document.getElementById('del'+reviewId);
                    var editID = document.getElementById('edit'+reviewId);
                    this.$site.toast(this, 'Message Deleted!');
                  } else {
                    this.$site.toast(this, response);
                  }
                })
                .catch((error) => {
                  this.$site.toast(this, error);
                });
          });
    },
    editContent(reviewId,review){
      var showID = document.getElementById('show'+reviewId);
      var pid = document.getElementById('p'+reviewId);
      var youText = document.getElementById('youText'+reviewId);

      if(showID.style.display=='block'){
        showID.style.display='none'
        pid.style.display='block'
        youText.value = review;
      }else{
        showID.style.display='block'
        pid.style.display='none'
        youText.value = review;
      }
    }
  }
}
</script>

<style scoped>
.cl-chat-div{
  cursor: pointer;
  display: flex;
  max-height: 48vh;
  min-height: 10vh;
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
  background-color: #eeeeee;
}
.cl-chat-outgoing{
  background-color: #0c5645;
  color: white;
  float: right;
  text-align: left;
}

.cl-chat-text {
  padding: 0;
  margin: 0;
}
.incoming-id{
  margin:0;
  color: #204c42;
  font-weight: bold;
  font-size: small;
}

.cl-chat-format {
  text-align: right;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

}

.cl-chat-space {
  margin: 5px;
}

.cl-chat-time {
  opacity: 0.5;
}

.cl-chat-input {
  border: 3px solid;
  padding-left: 5px;
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

.edit_input{
  border:3px solid;
  color: black;
  border-radius: 8px;
  width: 100%;
}

.button-container {
  display: grid;
  grid-template-columns: 0fr min-content 0fr;
  grid-gap: 5%;
}

.confirm{
  padding: 3px 4px;
  background-color: #ffffff;
  color: black;
  margin-top: 10px;
  border-radius: 5px;
  width: 48px;
  min-width:2vw;
  font-size:8px;
  text-align:center;
}

</style>

