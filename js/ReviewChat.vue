<template>
  <div class="cl-reviewChat">
    <div style="width: 769px; height: 400px; border: solid 1px; overflow-x: scroll;" v-if="reviewing.length!==0">
      <div v-for="review in chat" class="cl-review">
        <div>
          <p v-if="review.isReview" style="width: 300px; border: solid 1px; border-radius: 10px; padding: 5px; font-size: 12px;clear: right; padding: 10px;" class="cl-review-present">
            {{review.meta.review.review}}{{formatTime(review.time)}}</p>

          <p v-else="" style="width: 300px; border: solid 1px; border-radius: 10px; padding: 5px; font-size: 12px; background-color: #0c5645;color: white;float: right; clear: right;padding: 10px;"
             class="cl-review-present">
            {{review.meta.review.review}}{{formatTime(review.time)}}</p>
        </div>
      </div>
    </div>
    <form method="post" @submit.prevent="submit">
      <div ref="editor" class="shadow"></div>
      <input type="submit" value="Send">
    </form>
  </div>
</template>

<script>
export default {
  props: ['reviewing', 'json'],
  inheritAttrs: false,
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
    this.chat = this.json.reviewing;
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
        submissions: this.submissions
      }
      // Request backend data API
      this.$site.api.post(`/api/review/review/${this.json.id}`, params)
          .then((response) => {
            if (!response.hasError()) {
              this.editor.textarea.value = '';
              this.chat.push(response.getData('reviewing').attributes.slice(-1)[0]);

              this.$site.toast(this, "Review successfully saved to the server");
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
    }
  }
}
</script>

<style scoped>

</style>
