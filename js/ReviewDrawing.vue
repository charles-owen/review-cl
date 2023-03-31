<template>
    <div class="cl-reviewDrawing">
        <div class="hue-slider-container">
            Line width: {{ widthValue }}
            <input
                type="range"
                min="1"
                max="50"
                id="widthSlider"
                v-model="widthValue"
                class="slider"
            />
        </div>
        <figure class="cl-preview cl-review-diagram">
            <div class="top-bar">
              <div class="hue-selector red" @click="color='red'"></div>
              <div class="hue-selector orange" @click="color='orange'"></div>
              <div class="hue-selector yellow" @click="color='yellow'"></div>
              <div class="hue-selector green" @click="color='green'"></div>
              <div class="hue-selector blue" @click="color='blue'"></div>
              <div class="hue-selector purple" @click="color='purple'"></div>
              <div class="hue-selector violet" @click="color='violet'"></div>
              <div class="hue-selector custom"><input type="color" @input="color = $event.target.value"></div>
            </div>
            <div class="cl-review-diagram">
            <img ref="diagramImage" :src="image">
            <canvas class="canvas-drawing" id="drawing"></canvas>
            <svg ref="svgImage" id="drawing-svg" xmlns="http://www.w3.org/2000/svg"></svg>
            </div>
        </figure>
    </div>
</template>

<script>
import {CanvasHandler} from './canvas_handler'

var handler = new CanvasHandler();

export default {
  props: ['submission', 'image', 'chat_id'],
  inheritAttrs: false,
  data: function () {
    return {
      resizeObserver: null,
      color: 0,
      widthValue: 0,
      annotation_width: 0,
      annotation_height: 0,
    }
  },
  mounted() {
    this.annotation = this.$refs['svgImage'];

    this.resizeObserver = new ResizeObserver(this.onMutate);
    this.resizeObserver.observe(this.$refs['diagramImage']);
    window.addEventListener('scroll', this.onMutate);

    handler.init();
    this.onMutate();
    this.color = 'red';
    this.widthValue = 5;

  },
  beforeUnmount() {
    this.resizeObserver.unobserve(this.$refs.diagramImage[0]);
    window.removeEventListener('scroll', this.onMutate);
  },
  methods: {
    submit(review_id) {
      const annotation = this.annotation.innerHTML;

      if (annotation !== "") {
        let annotation_params = {
          annotation: annotation,
          width: this.annotation_width,
          height: this.annotation_height,
          review_id: review_id,
        };

        this.$site.api.post(`/api/review/annotate/${this.chat_id}`, annotation_params)
          .then((response) => {
            if (!response.hasError()) {
              this.$site.toast(this, "Annotation successfully saved to the server");
            } else {
              this.$site.toast(this, response);
            }

          })
          .catch((error) => {
            this.$site.toast(this, error);
          });
    },
    onMutate() {
      handler.setSize(this.$refs['diagramImage']);
      this.annotation_width = this.$refs['diagramImage'].clientWidth;
      this.annotation_height = this.$refs['diagramImage'].clientHeight;
    },
  },
  watch: {
    color(newVal){
      handler.color = newVal;
    },
    widthValue(newVal){
      handler.line_width = newVal;
    }
  },
}

</script>

<style scoped>

.top-bar {
  height: 50px;
  width: 100%;
  overflow: hidden;

  display: flex;
  justify-content: space-around;
  align-items: center;

  background-color: gainsboro   ;
}

.hue-selector {
  border-radius: 50%;
  width: 30px;
  height: 30px;
}

.red { background-color: red; }
.orange { background-color: orange; }
.yellow { background-color: yellow; }
.green { background-color: green; }
.blue { background-color: blue; }
.purple { background-color: purple; }
.violet { background-color: violet; }
.custom {
  background: conic-gradient(
        rgba(255, 0, 0, 1) 0%,
        rgba(255, 154, 0, 1) 10%,
        rgba(208, 222, 33, 1) 20%,
        rgba(79, 220, 74, 1) 30%,
        rgba(63, 218, 216, 1) 40%,
        rgba(47, 201, 226, 1) 50%,
        rgba(28, 127, 238, 1) 60%,
        rgba(95, 21, 242, 1) 70%,
        rgba(186, 12, 248, 1) 80%,
        rgba(251, 7, 217, 1) 90%,
        rgba(255, 0, 0, 1) 100%
    );
}

.custom input {
  opacity: 0;
}

</style>