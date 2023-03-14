<template>
  <p>Student: {{removeUser.name}}</p>
  <div>
    <label>{{removeType}}: </label>
    <select id="cl-review-remove-selector">
      <option v-for="user in assignedReviews">{{user}}</option>
    </select>
  </div>

</template>

<script>
import VueDialogVue from 'site-cl/js/Vue/VueDialog.vue';

export default {
  extends: VueDialogVue,
  inheritAttrs: false,
  props: ['assignedReviews', 'removeUser', 'removeType'],
  name: "ReviewRemove",
  data: function () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
