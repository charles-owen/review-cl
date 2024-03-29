<template>
    <div class="cl-reviewDrawing">
        <div class="slider-container">
          Line width
          <input
                type="range"
                min="1"
                max="50"
                id="widthSlider"
                v-model="widthValue"
                class="slider"
            />
            {{ widthValue }}
        </div>
        <figure class="cl-preview cl-review-diagram">
            <div class="top-bar">
              <div :class="{ active: color == 'red' }" class="button hue-selector red" @click="color='red'"></div>
              <div :class="{ active: color == 'orange' }" class="button hue-selector orange" @click="color='orange'"></div>
              <div :class="{ active: color == 'yellow' }" class="button hue-selector yellow" @click="color='yellow'"></div>
              <div :class="{ active: color == 'green' }" class="button hue-selector green" @click="color='green'"></div>
              <div :class="{ active: color == 'blue' }" class="button hue-selector blue" @click="color='blue'"></div>
              <div :class="{ active: color == 'purple' }" class="button hue-selector purple" @click="color='purple'"></div>
              <div :class="{ active: color == 'violet' }" class="button hue-selector violet" @click="color='violet'"></div>
              <div :class="{ active: customColor }" class="button hue-selector custom"><input type="color" @input="color = $event.target.value"></div>
              <div :class="{ active: tool == 'pen' }" class="button pencil" @click="tool='pen'"></div>
              <div :class="{ active: tool == 'line_tool' }" class="button linetool" @click="tool='line_tool'"></div>
              <div :class="{ active: tool == 'arrow_tool' }" class="button arrowtool" @click="tool='arrow_tool'"></div>
              <div :class="{ active: tool == 'rect_tool' }" class="button recttool" @click="tool='rect_tool'"></div>
              <div :class="{ active: tool == 'eraser' }" class="button eraser" @click="tool='eraser'"></div>
              <div :class="{ active: tool == 'segment_eraser' }" class="button segmenteraser" @click="tool='segment_eraser'"></div>
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
      customColor: false,
      tool: 'pen',
      widthValue: 0,
      annotation_width: 0,
      annotation_height: 0,
      pencil_url: "url(" + this.$site.root + "/vendor/cl/site/img/pencil.svg)",
      eraser_url: "url(" + this.$site.root + "/vendor/cl/site/img/eraser.svg)",
      line_url: "url(" + this.$site.root + "/vendor/cl/site/img/line.svg)",
      arrow_url: "url(" + this.$site.root + "/vendor/cl/site/img/arrow.svg)",
      rectangle_url: "url(" + this.$site.root + "/vendor/cl/site/img/rectangle.svg)",
    }
  },
  mounted() {
    this.annotation = this.$refs['svgImage'];

    this.resizeObserver = new ResizeObserver(this.onMutate);
    this.resizeObserver.observe(document.body);
    window.addEventListener('scroll', this.onMutate);

    handler.init();
    this.onMutate();
    this.color = 'red';
    this.widthValue = 5;

  },
  beforeUnmount() {
    this.resizeObserver.unobserve(document.body);
    window.removeEventListener('scroll', this.onMutate);
  },
  methods: {
    /**
     * Function to submit the annotation
     * @param review_id - the id of the review
     */
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
            if (response.hasError()) {
              this.$site.toast(this, response);
            }
          })
          .catch((error) => {
            this.$site.toast(this, error);
          });
      }
    },
    onMutate() {
      handler.setSize(this.$refs['diagramImage']);
      this.annotation_width = this.$refs['diagramImage'].clientWidth;
      this.annotation_height = this.$refs['diagramImage'].clientHeight;
    },
  },
  watch: {
    /**
     * Update the color to the new color
     * @param newVal - the new color we want to update to
     */
    color(newVal){
      this.customColor = newVal.includes('#');
      handler.color = newVal;
    },
    /**
     * Update the tool selected
     * @param newVal - the new tool we want to update to
     */
    tool(newVal){
      handler.tool = newVal;
    },
    /**
     * Update the line width
     * @param newVal- the new line width we want to update to
     */
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

  background-color: gainsboro;
}

.button {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.hue-selector {
  border-radius: 50%;
}

.pencil::before {
  content: v-bind('pencil_url');
}

.eraser::before {
  content: v-bind('eraser_url');
}

.segmenteraser::before {
  content: v-bind('eraser_url');
  background-color: red;
}

.linetool::before {
  content: v-bind('line_url');
}

.arrowtool::before {
  content: v-bind('arrow_url');
}

.recttool::before {
  content: v-bind('rectangle_url');
}


.active {
  outline:3px solid gray;
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

.slider-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.custom input {
  opacity: 0;
}

</style>
