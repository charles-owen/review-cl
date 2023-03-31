<template>
    <div class="cl-reviewAnnotation">
      <!-- <figure v-if="previewImg !== null" class="cl-preview"> -->
      <figure v-if="annotation !== null" class="cl-preview">
        <div class="cl-review-diagram">
          <img :src="image_src">
          <svg xmlns="http://www.w3.org/2000/svg" v-html="annotation" :height="height" :width="width"></svg>
        </div>
      </figure>
    </div>
</template>

<script>
export default {
  props: ['chat', 'review'],
  inheritAttrs: false,
  data: function () {
    return {
      annotation: null,
      width: null,
      height: null,
      image_src: null,
    }
  },
  mounted() {
  },
  methods: {
  },
  watch: {
    review: function(val) {
      this.annotation = val.annotation.annotation;
      this.width = val.annotation.width;
      this.height = val.annotation.height;
      this.image_src = this.$site.root + '/cl/course/submission/view/' + Object.values(val.submissions)[0].id;
    }
  },
}

</script>