<template>
  <div class="cl-reviewChat" @click="formvisable">
    <div v-if="chat.length!==0 && context === 'reviewee'" @click="showInstructions = true"  @click.stop>
    </div>
    <p class="incoming-id" v-show="chat.length!==0">R{{incoming.slice(1,)}}: {{recipient}}</p>
    <div class="cl-chat-div" v-show="chat.length!==0">
      <div v-for="review in chat" class="message-div">
        <div>
          <div v-if="review.context === context && review.by == chat_id" @click.stop="showButton(review.id)"
               class="cl-review-present cl-chat-bubble cl-chat-outgoing">
            <p :id="'p'+review.id">{{review.review}}</p>
            <form action="" :id="'show'+review.id"
                  style="display: none;" method="post"
                  @click.stop>
              <input type="hidden" name="reviewID" :value=review.id>
              <input :id="'youText'+review.id" type="text" name="review" class="edit_input" value="">
<!--              <div contenteditable="true"></div>-->
              <div class="button-container">
                <div class="Confirm" @click.stop="save_edit(review.id,review.review)">Save</div>
                <div class="Confirm" @click.stop="Cancel(review.id)">Cancel</div>
              </div>

            </form>
            <br>
            <div class="cl-chat-time">{{formatTime(review.time)}}</div>
            <br>
            <button :id="'del'+review.id" class="showDiv" title="Delete" @click.stop="deleteContent(review.id)">
              <img src="../../site/img/delete.png" >
            </button>
            <button :id="'edit'+review.id" class="showDiv" title="Edit" @click.stop="editContent(review.id,review.review)">
              <img src="../../site/img/edit.png" >
            </button>

          </div>

          <div @click.stop v-else-if="review.annotation !== null"
               class="cl-review-present cl-chat-bubble cl-chat-incoming cl_chat_annotation">
            <a href="#" @click.prevent="selected_review = review;">{{review.review}}</a>
            <br>
            <div class="cl-chat-time">{{formatTime(review.time)}}</div>
          </div>

          <div @click.stop v-else="" class="cl-review-present cl-chat-bubble cl-chat-incoming">
            {{review.review}}<br><div class="cl-chat-time">{{formatTime(review.time)}}</div></div>
        </div>
      </div>
    </div>
    <form id="form" method="post" @submit.prevent="submit"
          v-show="context === 'reviewee' ? showForm : true"
          class="form-container" @click.stop>

      <textarea ref="textArea" style="border: 3px solid;
      padding-left: 5px;"  rows=1 cols="78"></textarea>

      <input type="submit" value="Send" class="sendbutton">
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
      showForm: false,
      showEdit: false,
      clickCount: 0
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
              // mytext.value = '';
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
            } else {
              this.$site.toast(this, response);
            }
          })
          .catch((error) => {
            this.$site.toast(this, error);
          });
    },
    save_edit(reviewId,review) {
      var youText = document.getElementById("youText"+reviewId).value;
      if (youText == ""){
        youText = review;
      }
      this.$site.api.post(`/api/review/editReview/${reviewId}/${youText}`)
          .then((response) => {
            if (!response.hasError()) {
              console.log("Edit successfully");
              var delID = document.getElementById('del'+reviewId);
              var editID = document.getElementById('edit'+reviewId);
              editID.style.display='none';
              delID.style.display='none';
              document.getElementById('show'+reviewId).style.display="none";
              document.getElementById('p'+reviewId).style.display="block";
            } else {
              console.log("Edit Failure");
              this.$site.toast(this, response);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
    Cancel(reviewId){
      document.getElementById('show'+reviewId).style.display="none";
      document.getElementById('p'+reviewId).style.display="block";
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
              console.log(response.getData('reviewing'));
              this.chat = response.getData('reviewing').attributes.filter(this.filterChatId);
            } else {
              this.$site.toast(this, response);
            }
          })
          .catch((error) => {
            this.$site.toast(this, error);
          });
    },
    setName() {
      if (this.recipient === "" && this.chat.length !== 0) this.recipient = this.chat[0][this.incoming];
    },
    formvisable() {
      if (this.clickCount === 0) {
        this.showForm = true;
      }
      this.clickCount++;

      if (this.clickCount >= 2) {
        this.showForm = false;
        this.clickCount = 0;
      }
    },
    showButton(reviewId){
      var delID = document.getElementById('del'+reviewId);
      var editID = document.getElementById('edit'+reviewId);

      if(editID.style.display=='block'){
        editID.style.display='none'
      }else{
        editID.style.display='block'
      }

      if(delID.style.display=='block'){
        delID.style.display='none'
      }else{
        delID.style.display='block'
      }
    },
    deleteContent(reviewId){
      new this.$site.Dialog.MessageBox('Are You Sure?', 'Are you sure you want to withdraw this message?',
          this.$site.Dialog.MessageBox.OKCANCEL, () => {
            this.$site.api.post(`/api/review/removeReview/${reviewId}`)
                .then((response) => {
                  if (!response.hasError()) {
                    var delID = document.getElementById('del'+reviewId);
                    var editID = document.getElementById('edit'+reviewId);
                    editID.style.display='none';
                    delID.style.display='none';
                    this.$site.toast(this, 'The message has been withdrawn!');
                  } else {
                    document.getElementsByClassName('showDiv').style.display = "none";
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
.showDiv{
  display: none;
  float: right;
  border-radius: 5px;
}
.cl-chat-div{
  cursor: pointer;
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

.Confirm{
  padding: 3px 4px;
  background-color: #ffffff;
  color: black;
  margin-top: 10px;
  border-radius: 5px;
  width: 42px;
  min-width:2vw;
  font-size:8px;
  text-align:center;
}

</style>
