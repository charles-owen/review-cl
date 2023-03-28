<template>
  <p>To: {{to}}</p>
  <p><label>Subject: </label><input id="cl-review-notify-subject" placeholder="Email Subject"></p>
  <div>
    <label>Reminder: </label>
    <br>
    <textarea id="cl-review-notify-body" style="resize:none" placeholder="Enter reminder text" rows="6" cols="30"></textarea>
  </div>

</template>

<script>
import VueDialogVue from 'site-cl/js/Vue/VueDialog.vue';

export default {
  extends: VueDialogVue,
  inheritAttrs: false,
  props: ['to'],
  name: "ReviewReminder",
  data: function () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
