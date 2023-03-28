<template>
  <p>Student: {{reassignUser.name}}</p>
  <div>
    <label>{{assignType}}: </label>
    <select id="cl-review-reassign-selector">
      <option v-for="user in sortedUsers">{{user}}</option>
    </select>
  </div>

</template>

<script>
import VueDialogVue from 'site-cl/js/Vue/VueDialog.vue';

export default {
  extends: VueDialogVue,
  inheritAttrs: false,
  props: ['sortedUsers', 'reassignUser', 'assignType'],
  name: "ReviewReassign",
  data: function () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
