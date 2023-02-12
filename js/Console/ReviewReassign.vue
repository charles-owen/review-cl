<template>
  <p v-for="user in sortedUsers">{{user}}</p>
</template>

<script>
import VueDialogVue from 'site-cl/js/Vue/VueDialog.vue';

export default {
  extends: VueDialogVue,
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
