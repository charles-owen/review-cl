<template>
  <p></p>
</template>

<script>

  export default {
  	props: ['json'],
    mounted() {
  		console.log(this.json);
    }
  }
</script>