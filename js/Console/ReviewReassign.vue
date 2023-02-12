<template>
  <select id="cl-review-reassign-selector">
    <option v-for="user in sortedUsers">{{user}}</option>
  </select>
</template>

<script>
import VueDialogVue from 'site-cl/js/Vue/VueDialog.vue';

export default {
  extends: VueDialogVue,
  inheritAttrs: false,
  props: ['sortedUsers', 'reassignUser'],
  name: "ReviewReassign",
  data: function () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
