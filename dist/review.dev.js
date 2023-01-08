"use strict";
(self["webpackChunkcse335"] = self["webpackChunkcse335"] || []).push([["Review"],{

/***/ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'extends': Site.Site.UserVueBase,
  props: ['json'],
  data: function data() {
    return {
      reviewing: [],
      submissions: {}
    };
  },
  mounted: function mounted() {
    this.setTitle('Peer Reviewing');
    this.reviewing = this.json.reviewing;
    var element = this.$refs['editor'];
    this.editor = new this.$site.Editor(element, {
      height: '10em',
      classes: ['yellow-pad']
    });
    var submissions = {};
    var _iterator = _createForOfIteratorHelper(this.json.submissions),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var submission = _step.value;
        submissions[submission.tag] = {
          'id': submission.id,
          'date': submission.date
        };
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    this.submissions = submissions;
  },
  methods: {
    submit: function submit() {
      var _this = this;
      var text = this.editor.textarea.value.trim();
      if (text === '') {
        Site.toast(this, 'You must enter some text to submit');
        return;
      }
      var params = {
        type: 'text/plain',
        text: text,
        submissions: this.submissions
      };
      this.$site.api.post("/api/review/review/".concat(this.json.id), params).then(function (response) {
        if (!response.hasError()) {
          _this.editor.textarea.value = '';
          _this.reviewing = response.getData('reviewing').attributes;
          _this.$site.toast(_this, "Review successfully saved to the server");
        } else {
          _this.$site.toast(_this, response);
        }
      })["catch"](function (error) {
        _this.$site.toast(_this, error);
      });
    },
    formatTime: function formatTime(time) {
      return this.$site.TimeFormatter.relativeUNIX(time, null);
    },
    showSubmissions: function showSubmissions(review) {
      var past = false;
      var submissions = review.meta.review.submissions;
      for (var tag in submissions) {
        if (submissions[tag].id !== this.submissions[tag].id) {
          past = true;
        }
      }
      if (past) {
        return 'For a past submission';
      }
      return '';
    },
    previewImg: function previewImg(submission) {
      return this.$site.root + '/cl/review/img/' + submission.id;
    }
  }
});

/***/ }),

/***/ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['json'],
  data: function data() {
    return {
      assignTag: '',
      reviews: []
    };
  },
  mounted: function mounted() {
    this.assignTag = this.json.assignTag;
    this.reviews = this.json.reviews;
  },
  methods: {
    formatTime: function formatTime(time) {
      return this.$site.TimeFormatter.relativeUNIX(time, null);
    },
    showSubmissions: function showSubmissions(review) {
      var ret = '';
      for (var tag in review.submissions) {
        if (ret !== '') {
          ret += ' / ';
        }
        ret += this.$site.TimeFormatter.absoluteUNIX(review.submissions[tag].date);
      }
      if (ret === '') {
        return '';
      }
      return 'Submission: ' + ret;
    }
  }
});

/***/ }),

/***/ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262 ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./.yarn/cache/vue-npm-3.2.45-06b4b60efe-df60ca80cb.zip/node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "content"
};
var _hoisted_2 = {
  "class": "full"
};
var _hoisted_3 = {
  "class": "cl-submission-view"
};
var _hoisted_4 = {
  key: 0,
  "class": "cl-preview yellow-pad"
};
var _hoisted_5 = {
  key: 1,
  "class": "cl-preview"
};
var _hoisted_6 = ["src"];
var _hoisted_7 = {
  "class": "cl-preview-time"
};
var _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, "Review", -1 /* HOISTED */);
var _hoisted_9 = {
  ref: "editor",
  "class": "shadow"
};
var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
  type: "submit",
  value: "Submit Review"
})], -1 /* HOISTED */);
var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, "Previous Reviews", -1 /* HOISTED */);
var _hoisted_12 = {
  key: 0,
  "class": "cl-reviews-none"
};
var _hoisted_13 = {
  "class": "cl-review"
};
var _hoisted_14 = {
  "class": "cl-submitted"
};
var _hoisted_15 = {
  "class": "cl-review-present"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.json.submissions, function (submission) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(submission.name), 1 /* TEXT */), submission.type === 'text' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("pre", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(submission.text), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), submission.type === 'image' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("figure", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
      src: $options.previewImg(submission)
    }, null, 8 /* PROPS */, _hoisted_6)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime(submission.date)), 1 /* TEXT */)]);
  }), 256 /* UNKEYED_FRAGMENT */)), _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    method: "post",
    onSubmit: _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
      return $options.submit && $options.submit.apply($options, arguments);
    }, ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, null, 512 /* NEED_PATCH */), _hoisted_10], 32 /* HYDRATE_EVENTS */), _hoisted_11, _ctx.reviewing.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_12, "*** None Yet ***")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.reviewing, function (review) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime(review.time)) + " Review by Me ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.showSubmissions(review)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(review.meta.review.review), 1 /* TEXT */)]);
  }), 256 /* UNKEYED_FRAGMENT */))])]);
}

/***/ }),

/***/ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447 ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./.yarn/cache/vue-npm-3.2.45-06b4b60efe-df60ca80cb.zip/node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "cl-reviews"
};
var _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Reviews of this assignment appear here.", -1 /* HOISTED */);
var _hoisted_3 = {
  key: 0,
  "class": "cl-reviews-none"
};
var _hoisted_4 = {
  "class": "cl-review"
};
var _hoisted_5 = {
  key: 0
};
var _hoisted_6 = {
  key: 1
};
var _hoisted_7 = {
  "class": "cl-submitted"
};
var _hoisted_8 = {
  "class": "cl-review-present"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_hoisted_2, _ctx.reviews.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_3, "*** None Yet ***")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.reviews, function (review) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(review.role !== undefined ? 'staff' : '')
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime(review.time)) + " ", 1 /* TEXT */), review.role !== undefined ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_5, "Staff Review")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_6, "Review")), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" by " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(review.by) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.showSubmissions(review)), 1 /* TEXT */)], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(review.review), 1 /* TEXT */)]);
  }), 256 /* UNKEYED_FRAGMENT */))]);
}

/***/ }),

/***/ "./vendor/cl/review/index.js":
/*!***********************************!*\
  !*** ./vendor/cl/review/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _review_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_review.scss */ "./vendor/cl/review/_review.scss");
/* harmony import */ var _js_ReviewVue_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/ReviewVue.vue */ "./vendor/cl/review/js/ReviewVue.vue");
/* harmony import */ var _js_ReviewsVue_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/ReviewsVue.vue */ "./vendor/cl/review/js/ReviewsVue.vue");
/*
 * The main Review system entry point
 */




if (!Site.Review) {
  //
  // Create the inline and page components
  //
  Site.ready(function () {
    Site.PageVue.create('div.cl-review', 'Review Vue', _js_ReviewVue_vue__WEBPACK_IMPORTED_MODULE_1__["default"]);
    Site.InlineVue.create('div.cl-reviews', _js_ReviewsVue_vue__WEBPACK_IMPORTED_MODULE_2__["default"]);
  });
  Site.Review = true;
}

/***/ }),

/***/ "./.yarn/__virtual__/css-loader-virtual-2de7fabd15/0/cache/css-loader-npm-6.7.3-63aa933400-473cc32b6c.zip/node_modules/css-loader/dist/cjs.js!./.yarn/cache/resolve-url-loader-npm-5.0.0-9b441067c9-6d483733a4.zip/node_modules/resolve-url-loader/index.js!./.yarn/__virtual__/sass-loader-virtual-c7ca4f1d1a/0/cache/sass-loader-npm-13.2.0-6421c5ff7b-ed6cdb5f55.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4.use[3]!./vendor/cl/review/_review.scss":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/css-loader-virtual-2de7fabd15/0/cache/css-loader-npm-6.7.3-63aa933400-473cc32b6c.zip/node_modules/css-loader/dist/cjs.js!./.yarn/cache/resolve-url-loader-npm-5.0.0-9b441067c9-6d483733a4.zip/node_modules/resolve-url-loader/index.js!./.yarn/__virtual__/sass-loader-virtual-c7ca4f1d1a/0/cache/sass-loader-npm-13.2.0-6421c5ff7b-ed6cdb5f55.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4.use[3]!./vendor/cl/review/_review.scss ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_css_loader_virtual_2de7fabd15_0_cache_css_loader_npm_6_7_3_63aa933400_473cc32b6c_zip_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../.yarn/__virtual__/css-loader-virtual-2de7fabd15/0/cache/css-loader-npm-6.7.3-63aa933400-473cc32b6c.zip/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./.yarn/__virtual__/css-loader-virtual-2de7fabd15/0/cache/css-loader-npm-6.7.3-63aa933400-473cc32b6c.zip/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _yarn_virtual_css_loader_virtual_2de7fabd15_0_cache_css_loader_npm_6_7_3_63aa933400_473cc32b6c_zip_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_css_loader_virtual_2de7fabd15_0_cache_css_loader_npm_6_7_3_63aa933400_473cc32b6c_zip_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _yarn_virtual_css_loader_virtual_2de7fabd15_0_cache_css_loader_npm_6_7_3_63aa933400_473cc32b6c_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../.yarn/__virtual__/css-loader-virtual-2de7fabd15/0/cache/css-loader-npm-6.7.3-63aa933400-473cc32b6c.zip/node_modules/css-loader/dist/runtime/api.js */ "./.yarn/__virtual__/css-loader-virtual-2de7fabd15/0/cache/css-loader-npm-6.7.3-63aa933400-473cc32b6c.zip/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _yarn_virtual_css_loader_virtual_2de7fabd15_0_cache_css_loader_npm_6_7_3_63aa933400_473cc32b6c_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_css_loader_virtual_2de7fabd15_0_cache_css_loader_npm_6_7_3_63aa933400_473cc32b6c_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _yarn_virtual_css_loader_virtual_2de7fabd15_0_cache_css_loader_npm_6_7_3_63aa933400_473cc32b6c_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_yarn_virtual_css_loader_virtual_2de7fabd15_0_cache_css_loader_npm_6_7_3_63aa933400_473cc32b6c_zip_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "div.cl-reviewing td.cl-empty {\n  background-color: #e8f7f3;\n}\n\np.cl-reviews-none {\n  text-align: center;\n  color: #00723f;\n  font-style: italic;\n}\n\ndiv.cl-reviews h3 {\n  text-align: center;\n  background: #00723f;\n  color: white;\n}\n\ndiv.cl-review {\n  margin: 1em 0;\n}\ndiv.cl-review h3 {\n  font-size: 0.85em;\n  font-style: italic;\n  font-weight: normal;\n  background: transparent;\n  color: #00723f;\n  border-bottom: 1px solid #00723f;\n  text-align: left;\n}\ndiv.cl-review h3 span.cl-submitted {\n  float: right;\n  color: #00909e;\n  font-size: 0.9em;\n}\ndiv.cl-review h3.staff {\n  color: red;\n}\ndiv.cl-review pre {\n  margin: 0;\n  white-space: pre-wrap;\n}\ndiv.cl-review div.cl-review-present {\n  margin: 0;\n  white-space: pre-wrap;\n}", "",{"version":3,"sources":["webpack://./vendor/cl/review/_review.scss","webpack://./vendor/cl/site/sass/modules/_colors.scss"],"names":[],"mappings":"AAGE;EACE,yBCUiB;ADZrB;;AAMA;EACE,kBAAA;EACA,cCEQ;EDDR,kBAAA;AAHF;;AAQE;EACE,kBAAA;EACA,mBCNM;EDON,YAAA;AALJ;;AASA;EACE,aAAA;AANF;AAQE;EACE,iBAAA;EACA,kBAAA;EACA,mBAAA;EACA,uBAAA;EACA,cCnBM;EDoBN,gCAAA;EACA,gBAAA;AANJ;AAQI;EACE,YAAA;EACA,cCnBI;EDoBJ,gBAAA;AANN;AAWE;EACE,UAAA;AATJ;AAYE;EACE,SAAA;EACA,qBAAA;AAVJ;AAaE;EACE,SAAA;EACA,qBAAA;AAXJ","sourcesContent":["@import '~site-cl/sass/modules/colors';\n\ndiv.cl-reviewing {\n  td.cl-empty {\n    background-color: $very-light-primary;\n  }\n}\n\np.cl-reviews-none {\n  text-align: center;\n  color: $primary;\n  font-style: italic;\n}\n\ndiv.cl-reviews {\n\n  h3 {\n    text-align:center;\n    background: $primary;\n    color:white;\n  }\n}\n\ndiv.cl-review {\n  margin: 1em 0;\n\n  h3 {\n    font-size: 0.85em;\n    font-style: italic;\n    font-weight: normal;\n    background: transparent;\n    color: $primary;\n    border-bottom: 1px solid $primary;\n    text-align: left;\n\n    span.cl-submitted {\n      float: right;\n      color: $seconda;\n      font-size: 0.9em;\n    }\n  }\n\n\n  h3.staff {\n    color: red;\n  }\n\n  pre {\n    margin: 0;\n    white-space: pre-wrap;\n  }\n\n  div.cl-review-present {\n    margin: 0;\n    white-space: pre-wrap;\n  }\n}\n","// The major colors\r\n// We have a primary color, two secondary colors, and a complementary color.\r\n$accent: #607D8B;\r\n\r\n$toast-background: #151515;\r\n$toast-text: white;\r\n\r\n$header-background: #535054;\r\n$header-text: #eeeeee;\r\n\r\n// The major colors\r\n// We have a primary color, two secondary colors, and a complementary color.\r\n$primary: #00723f;\r\n$light-primary: #44a26b;\r\n$very-light-primary: #e8f7f3;\r\n$dark-primary: #005223;\r\n$primary-text: #212121;\r\n\r\n$seconda: #00909e;\r\n$secondb: #fcaf17;\r\n$secondc: #c89a58; // #e8d9b5;\r\n\r\n$comp: #c41425;\r\n$blind: #efc6ff;\r\n$comp-background: linear-gradient(#570102, #960606, #570102);\r\n$comp-border: #c7bdbb;\r\n\r\n// Menus\r\n$focus: #008183;\r\n$menu-background: #e8e8e8;\r\n$menu-hover: #d0d0d0;\r\n$menu-color: black;\r\n\r\n// Page background\r\n$background: #eeeeee;\r\n\r\n// Nav\r\n$nav-color: white;\r\n$nav-background: url('img/nav_pattern.png');\r\n$nav-2-color: #ffff99;\r\n$nav-2-background: url('img/nav_pattern-2.png');\r\n\r\n// Tables\r\n$table-gradient-from: #204c42;\r\n$table-gradient-to: #389b54;\r\n\r\n// Dialog boxes\r\n$dialog-gradient-from: #204c42;\r\n$dialog-gradient-to: #389b54;\r\n$dialog-bar-color: white;\r\n\r\n// Link colors\r\n$link: #808080;\r\n$visited: #968443;  // #b09d5b;\r\n$hover: #3366cc;\r\n\r\n$very-light-primary-link: #900000;\r\n$very-light-primary-hover: #c00000;\r\n\r\n\r\n$primary-link: white;\r\n$primary-visited: #dddddd;\r\n$secondb-visited: #555555;\r\n$autoback-link: #882222;\r\n$autoback-link-hover: #cc2222;\r\n\r\n$shadow-x: 3px;\r\n$shadow-y: 3px;\r\n$shadow-radius: 8px;\r\n$shadow-color: #ccc;\r\n\r\n$toggle-link-hover-color: #006600;\r\n\r\n// Boxes\r\n$box-border-color: #bdbdbd;\r\n\r\n// Cards\r\n$card-heading-background: #f2f2f2;\r\n$card-border-color: #cccccc;\r\n\r\n%shadow {\r\n  -moz-box-shadow: $shadow-x $shadow-y $shadow-radius $shadow-color;\r\n  -webkit-box-shadow: $shadow-x $shadow-y $shadow-radius $shadow-color;\r\n  box-shadow: $shadow-x $shadow-y $shadow-radius $shadow-color;\r\n}\r\n\r\n%noshadow {\r\n  -moz-box-shadow: none;\r\n  -webkit-box-shadow: none;\r\n  box-shadow: none;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./vendor/cl/review/_review.scss":
/*!***************************************!*\
  !*** ./vendor/cl/review/_review.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../.yarn/__virtual__/style-loader-virtual-407543e133/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./.yarn/__virtual__/style-loader-virtual-407543e133/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../.yarn/__virtual__/style-loader-virtual-407543e133/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./.yarn/__virtual__/style-loader-virtual-407543e133/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../.yarn/__virtual__/style-loader-virtual-407543e133/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/insertBySelector.js */ "./.yarn/__virtual__/style-loader-virtual-407543e133/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../.yarn/__virtual__/style-loader-virtual-407543e133/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./.yarn/__virtual__/style-loader-virtual-407543e133/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../.yarn/__virtual__/style-loader-virtual-407543e133/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./.yarn/__virtual__/style-loader-virtual-407543e133/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../.yarn/__virtual__/style-loader-virtual-407543e133/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./.yarn/__virtual__/style-loader-virtual-407543e133/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _yarn_virtual_css_loader_virtual_2de7fabd15_0_cache_css_loader_npm_6_7_3_63aa933400_473cc32b6c_zip_node_modules_css_loader_dist_cjs_js_yarn_cache_resolve_url_loader_npm_5_0_0_9b441067c9_6d483733a4_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_c7ca4f1d1a_0_cache_sass_loader_npm_13_2_0_6421c5ff7b_ed6cdb5f55_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_use_3_review_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../.yarn/__virtual__/css-loader-virtual-2de7fabd15/0/cache/css-loader-npm-6.7.3-63aa933400-473cc32b6c.zip/node_modules/css-loader/dist/cjs.js!../../../.yarn/cache/resolve-url-loader-npm-5.0.0-9b441067c9-6d483733a4.zip/node_modules/resolve-url-loader/index.js!../../../.yarn/__virtual__/sass-loader-virtual-c7ca4f1d1a/0/cache/sass-loader-npm-13.2.0-6421c5ff7b-ed6cdb5f55.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4.use[3]!./_review.scss */ "./.yarn/__virtual__/css-loader-virtual-2de7fabd15/0/cache/css-loader-npm-6.7.3-63aa933400-473cc32b6c.zip/node_modules/css-loader/dist/cjs.js!./.yarn/cache/resolve-url-loader-npm-5.0.0-9b441067c9-6d483733a4.zip/node_modules/resolve-url-loader/index.js!./.yarn/__virtual__/sass-loader-virtual-c7ca4f1d1a/0/cache/sass-loader-npm-13.2.0-6421c5ff7b-ed6cdb5f55.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4.use[3]!./vendor/cl/review/_review.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _yarn_virtual_style_loader_virtual_407543e133_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_yarn_virtual_css_loader_virtual_2de7fabd15_0_cache_css_loader_npm_6_7_3_63aa933400_473cc32b6c_zip_node_modules_css_loader_dist_cjs_js_yarn_cache_resolve_url_loader_npm_5_0_0_9b441067c9_6d483733a4_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_c7ca4f1d1a_0_cache_sass_loader_npm_13_2_0_6421c5ff7b_ed6cdb5f55_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_use_3_review_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_virtual_css_loader_virtual_2de7fabd15_0_cache_css_loader_npm_6_7_3_63aa933400_473cc32b6c_zip_node_modules_css_loader_dist_cjs_js_yarn_cache_resolve_url_loader_npm_5_0_0_9b441067c9_6d483733a4_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_c7ca4f1d1a_0_cache_sass_loader_npm_13_2_0_6421c5ff7b_ed6cdb5f55_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_use_3_review_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _yarn_virtual_css_loader_virtual_2de7fabd15_0_cache_css_loader_npm_6_7_3_63aa933400_473cc32b6c_zip_node_modules_css_loader_dist_cjs_js_yarn_cache_resolve_url_loader_npm_5_0_0_9b441067c9_6d483733a4_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_c7ca4f1d1a_0_cache_sass_loader_npm_13_2_0_6421c5ff7b_ed6cdb5f55_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_use_3_review_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _yarn_virtual_css_loader_virtual_2de7fabd15_0_cache_css_loader_npm_6_7_3_63aa933400_473cc32b6c_zip_node_modules_css_loader_dist_cjs_js_yarn_cache_resolve_url_loader_npm_5_0_0_9b441067c9_6d483733a4_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_c7ca4f1d1a_0_cache_sass_loader_npm_13_2_0_6421c5ff7b_ed6cdb5f55_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_use_3_review_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./vendor/cl/review/js/ReviewVue.vue":
/*!*******************************************!*\
  !*** ./vendor/cl/review/js/ReviewVue.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ReviewVue_vue_vue_type_template_id_4eeb3262__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewVue.vue?vue&type=template&id=4eeb3262 */ "./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262");
/* harmony import */ var _ReviewVue_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReviewVue.vue?vue&type=script&lang=js */ "./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js");
/* harmony import */ var _Users_charlesowen_web_cse335_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/exportHelper.js */ "./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Users_charlesowen_web_cse335_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_ReviewVue_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ReviewVue_vue_vue_type_template_id_4eeb3262__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"vendor/cl/review/js/ReviewVue.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./vendor/cl/review/js/ReviewsVue.vue":
/*!********************************************!*\
  !*** ./vendor/cl/review/js/ReviewsVue.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ReviewsVue_vue_vue_type_template_id_094fe447__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewsVue.vue?vue&type=template&id=094fe447 */ "./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447");
/* harmony import */ var _ReviewsVue_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReviewsVue.vue?vue&type=script&lang=js */ "./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js");
/* harmony import */ var _Users_charlesowen_web_cse335_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/exportHelper.js */ "./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Users_charlesowen_web_cse335_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_ReviewsVue_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ReviewsVue_vue_vue_type_template_id_094fe447__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"vendor/cl/review/js/ReviewsVue.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js":
/*!*******************************************************************!*\
  !*** ./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_ReviewVue_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_ReviewVue_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!../../../../.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./ReviewVue.vue?vue&type=script&lang=js */ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js":
/*!********************************************************************!*\
  !*** ./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_ReviewsVue_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_ReviewsVue_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!../../../../.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./ReviewsVue.vue?vue&type=script&lang=js */ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262":
/*!*************************************************************************!*\
  !*** ./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262 ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_efc584a4ba_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_ReviewVue_vue_vue_type_template_id_4eeb3262__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_efc584a4ba_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_ReviewVue_vue_vue_type_template_id_4eeb3262__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!../../../../.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./ReviewVue.vue?vue&type=template&id=4eeb3262 */ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262");


/***/ }),

/***/ "./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447":
/*!**************************************************************************!*\
  !*** ./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447 ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_efc584a4ba_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_ReviewsVue_vue_vue_type_template_id_094fe447__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_efc584a4ba_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_ReviewsVue_vue_vue_type_template_id_094fe447__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!../../../../.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./ReviewsVue.vue?vue&type=template&id=094fe447 */ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447");


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor","Course","Users","common"], () => (__webpack_exec__("./vendor/cl/review/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFlLENBQUMsOEVBQU0sYUFBYSxnRkFBTTtBQUMxRTtBQUNBLElBQUksS0FBVSxFQUFFLEVBWWY7OztBQUdELGlFQUFlOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCd0Q7QUFDVjtBQUNMOztBQUV4RCxDQUFnTjtBQUNoTixpQ0FBaUMseU5BQWUsQ0FBQywrRUFBTSxhQUFhLGlGQUFNO0FBQzFFO0FBQ0EsSUFBSSxLQUFVLEVBQUUsRUFZZjs7O0FBR0QsaUVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQ3RCOFo7Ozs7Ozs7Ozs7Ozs7OztBQ0FDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3NlMzM1Ly4vdmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdWdWUudnVlIiwid2VicGFjazovL2NzZTMzNS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3c1Z1ZS52dWUiLCJ3ZWJwYWNrOi8vY3NlMzM1Ly4vdmVuZG9yL2NsL3Jldmlldy9pbmRleC5qcyIsIndlYnBhY2s6Ly9jc2UzMzUvLi92ZW5kb3IvY2wvcmV2aWV3L19yZXZpZXcuc2NzcyIsIndlYnBhY2s6Ly9jc2UzMzUvLi92ZW5kb3IvY2wvcmV2aWV3L19yZXZpZXcuc2Nzcz84NjViIiwid2VicGFjazovL2NzZTMzNS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3VnVlLnZ1ZT8wODNhIiwid2VicGFjazovL2NzZTMzNS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3c1Z1ZS52dWU/YzY5NiIsIndlYnBhY2s6Ly9jc2UzMzUvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL1Jldmlld1Z1ZS52dWU/OGUyYiIsIndlYnBhY2s6Ly9jc2UzMzUvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL1Jldmlld3NWdWUudnVlP2U2MDEiLCJ3ZWJwYWNrOi8vY3NlMzM1Ly4vdmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdWdWUudnVlPzYzOWQiLCJ3ZWJwYWNrOi8vY3NlMzM1Ly4vdmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdzVnVlLnZ1ZT8yYjIwIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZnVsbFwiPlxuICAgICAgPGRpdiB2LWZvcj1cInN1Ym1pc3Npb24gaW4ganNvbi5zdWJtaXNzaW9uc1wiIGNsYXNzPVwiY2wtc3VibWlzc2lvbi12aWV3XCI+XG4gICAgICAgIDxoMj57e3N1Ym1pc3Npb24ubmFtZX19PC9oMj5cbiAgICAgICAgPHByZSB2LWlmPVwic3VibWlzc2lvbi50eXBlID09PSAndGV4dCdcIiBjbGFzcz1cImNsLXByZXZpZXcgeWVsbG93LXBhZFwiPnt7c3VibWlzc2lvbi50ZXh0fX08L3ByZT5cbiAgICAgICAgPGZpZ3VyZSB2LWlmPVwic3VibWlzc2lvbi50eXBlID09PSAnaW1hZ2UnXCIgY2xhc3M9XCJjbC1wcmV2aWV3XCI+PGltZyA6c3JjPVwicHJldmlld0ltZyhzdWJtaXNzaW9uKVwiPjwvZmlndXJlPlxuICAgICAgICA8cCBjbGFzcz1cImNsLXByZXZpZXctdGltZVwiPnt7Zm9ybWF0VGltZShzdWJtaXNzaW9uLmRhdGUpfX08L3A+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGgyPlJldmlldzwvaDI+XG4gICAgICA8Zm9ybSBtZXRob2Q9XCJwb3N0XCIgQHN1Ym1pdC5wcmV2ZW50PVwic3VibWl0XCI+XG4gICAgICAgIDxkaXYgcmVmPVwiZWRpdG9yXCIgY2xhc3M9XCJzaGFkb3dcIj48L2Rpdj5cbiAgICAgICAgPHA+PGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlN1Ym1pdCBSZXZpZXdcIj48L3A+XG4gICAgICA8L2Zvcm0+XG5cbiAgICAgIDxoMj5QcmV2aW91cyBSZXZpZXdzPC9oMj5cbiAgICAgIDxwIGNsYXNzPVwiY2wtcmV2aWV3cy1ub25lXCIgdi1pZj1cInJldmlld2luZy5sZW5ndGggPT09IDBcIj4qKiogTm9uZSBZZXQgKioqPC9wPlxuICAgICAgPGRpdiB2LWZvcj1cInJldmlldyBpbiByZXZpZXdpbmdcIiBjbGFzcz1cImNsLXJldmlld1wiPlxuICAgICAgICA8aDM+e3tmb3JtYXRUaW1lKHJldmlldy50aW1lKX19IFJldmlldyBieSBNZVxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2wtc3VibWl0dGVkXCI+e3tzaG93U3VibWlzc2lvbnMocmV2aWV3KX19PC9zcGFuPjwvaDM+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbC1yZXZpZXctcHJlc2VudFwiPnt7cmV2aWV3Lm1ldGEucmV2aWV3LnJldmlld319PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICBleHBvcnQgZGVmYXVsdCB7XG4gICAgJ2V4dGVuZHMnOiBTaXRlLlNpdGUuVXNlclZ1ZUJhc2UsXG4gICAgcHJvcHM6IFsnanNvbiddLFxuICAgIGRhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJldmlld2luZzogW10sXG4gICAgICAgIHN1Ym1pc3Npb25zOiB7fVxuICAgICAgfVxuICAgIH0sXG4gICAgbW91bnRlZCgpIHtcbiAgICAgIHRoaXMuc2V0VGl0bGUoJ1BlZXIgUmV2aWV3aW5nJyk7XG4gICAgICB0aGlzLnJldmlld2luZyA9IHRoaXMuanNvbi5yZXZpZXdpbmc7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLiRyZWZzWydlZGl0b3InXTtcbiAgICAgIHRoaXMuZWRpdG9yID0gbmV3IHRoaXMuJHNpdGUuRWRpdG9yKGVsZW1lbnQsIHtcbiAgICAgICAgaGVpZ2h0OiAnMTBlbScsXG4gICAgICAgIGNsYXNzZXM6IFsneWVsbG93LXBhZCddXG4gICAgICB9KTtcblxuICAgICAgbGV0IHN1Ym1pc3Npb25zID0ge307XG4gICAgICBmb3IgKGNvbnN0IHN1Ym1pc3Npb24gb2YgdGhpcy5qc29uLnN1Ym1pc3Npb25zKSB7XG4gICAgICAgIHN1Ym1pc3Npb25zW3N1Ym1pc3Npb24udGFnXSA9IHtcbiAgICAgICAgICAnaWQnOiBzdWJtaXNzaW9uLmlkLFxuICAgICAgICAgICdkYXRlJzogc3VibWlzc2lvbi5kYXRlXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3VibWlzc2lvbnMgPSBzdWJtaXNzaW9ucztcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgIHN1Ym1pdCgpIHtcbiAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMuZWRpdG9yLnRleHRhcmVhLnZhbHVlLnRyaW0oKTtcbiAgICAgICAgaWYgKHRleHQgPT09ICcnKSB7XG4gICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCAnWW91IG11c3QgZW50ZXIgc29tZSB0ZXh0IHRvIHN1Ym1pdCcpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgICAgdHlwZTogJ3RleHQvcGxhaW4nLFxuICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgc3VibWlzc2lvbnM6IHRoaXMuc3VibWlzc2lvbnNcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJHNpdGUuYXBpLnBvc3QoYC9hcGkvcmV2aWV3L3Jldmlldy8ke3RoaXMuanNvbi5pZH1gLCBwYXJhbXMpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0b3IudGV4dGFyZWEudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXZpZXdpbmcgPSByZXNwb25zZS5nZXREYXRhKCdyZXZpZXdpbmcnKS5hdHRyaWJ1dGVzO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHNpdGUudG9hc3QodGhpcywgXCJSZXZpZXcgc3VjY2Vzc2Z1bGx5IHNhdmVkIHRvIHRoZSBzZXJ2ZXJcIik7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzaXRlLnRvYXN0KHRoaXMsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy4kc2l0ZS50b2FzdCh0aGlzLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZm9ybWF0VGltZSh0aW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzaXRlLlRpbWVGb3JtYXR0ZXIucmVsYXRpdmVVTklYKHRpbWUsIG51bGwpO1xuICAgICAgfSxcbiAgICAgIHNob3dTdWJtaXNzaW9ucyhyZXZpZXcpIHtcbiAgICAgICAgbGV0IHBhc3QgPSBmYWxzZTtcbiAgICAgICAgY29uc3Qgc3VibWlzc2lvbnMgPSByZXZpZXcubWV0YS5yZXZpZXcuc3VibWlzc2lvbnM7XG4gICAgICAgIGZvciAobGV0IHRhZyBpbiBzdWJtaXNzaW9ucykge1xuICAgICAgICAgIGlmIChzdWJtaXNzaW9uc1t0YWddLmlkICE9PSB0aGlzLnN1Ym1pc3Npb25zW3RhZ10uaWQpIHtcbiAgICAgICAgICAgIHBhc3QgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXN0KSB7XG4gICAgICAgICAgcmV0dXJuICdGb3IgYSBwYXN0IHN1Ym1pc3Npb24nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSxcbiAgICAgIHByZXZpZXdJbWcoc3VibWlzc2lvbikge1xuICAgICAgICByZXR1cm4gdGhpcy4kc2l0ZS5yb290ICsgJy9jbC9yZXZpZXcvaW1nLycgKyBzdWJtaXNzaW9uLmlkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY2wtcmV2aWV3c1wiPlxuICAgIDxoMz5SZXZpZXdzIG9mIHRoaXMgYXNzaWdubWVudCBhcHBlYXIgaGVyZS48L2gzPlxuICAgIDxwIGNsYXNzPVwiY2wtcmV2aWV3cy1ub25lXCIgdi1pZj1cInJldmlld3MubGVuZ3RoID09PSAwXCI+KioqIE5vbmUgWWV0ICoqKjwvcD5cbiAgICA8ZGl2IHYtZm9yPVwicmV2aWV3IGluIHJldmlld3NcIiBjbGFzcz1cImNsLXJldmlld1wiPlxuICAgICAgPGgzIDpjbGFzcz1cInJldmlldy5yb2xlICE9PSB1bmRlZmluZWQgPyAnc3RhZmYnIDogJydcIj57e2Zvcm1hdFRpbWUocmV2aWV3LnRpbWUpfX1cbiAgICAgICAgPHNwYW4gdi1pZj1cInJldmlldy5yb2xlICE9PSB1bmRlZmluZWRcIj5TdGFmZiBSZXZpZXc8L3NwYW4+XG4gICAgICAgIDxzcGFuIHYtZWxzZT5SZXZpZXc8L3NwYW4+IGJ5IHt7cmV2aWV3LmJ5fX1cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjbC1zdWJtaXR0ZWRcIj57e3Nob3dTdWJtaXNzaW9ucyhyZXZpZXcpfX08L3NwYW4+PC9oMz5cbiAgICAgIDxkaXYgY2xhc3M9XCJjbC1yZXZpZXctcHJlc2VudFwiPnt7cmV2aWV3LnJldmlld319PC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgZXhwb3J0IGRlZmF1bHQge1xuICAgIHByb3BzOiBbJ2pzb24nXSxcbiAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhc3NpZ25UYWc6ICcnLFxuICAgICAgICByZXZpZXdzOiBbXVxuICAgICAgfVxuICAgIH0sXG4gICAgbW91bnRlZCgpIHtcbiAgICAgIHRoaXMuYXNzaWduVGFnID0gdGhpcy5qc29uLmFzc2lnblRhZztcbiAgICAgIHRoaXMucmV2aWV3cyA9IHRoaXMuanNvbi5yZXZpZXdzO1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgZm9ybWF0VGltZSh0aW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzaXRlLlRpbWVGb3JtYXR0ZXIucmVsYXRpdmVVTklYKHRpbWUsIG51bGwpO1xuICAgICAgfSxcbiAgICAgIHNob3dTdWJtaXNzaW9ucyhyZXZpZXcpIHtcbiAgICAgICAgbGV0IHJldCA9ICcnO1xuICAgICAgICBmb3IgKGxldCB0YWcgaW4gcmV2aWV3LnN1Ym1pc3Npb25zKSB7XG4gICAgICAgICAgaWYocmV0ICE9PSAnJykge1xuICAgICAgICAgICAgcmV0ICs9ICcgLyAnO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXQgKz0gdGhpcy4kc2l0ZS5UaW1lRm9ybWF0dGVyLmFic29sdXRlVU5JWChyZXZpZXcuc3VibWlzc2lvbnNbdGFnXS5kYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXQgPT09ICcnKSB7XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICdTdWJtaXNzaW9uOiAnICsgcmV0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuPC9zY3JpcHQ+IiwiLypcbiAqIFRoZSBtYWluIFJldmlldyBzeXN0ZW0gZW50cnkgcG9pbnRcbiAqL1xuXG5pbXBvcnQgJy4vX3Jldmlldy5zY3NzJztcbmltcG9ydCBSZXZpZXdWdWUgZnJvbSAnLi9qcy9SZXZpZXdWdWUudnVlJztcbmltcG9ydCBSZXZpZXdzVnVlIGZyb20gJy4vanMvUmV2aWV3c1Z1ZS52dWUnO1xuXG5pZighU2l0ZS5SZXZpZXcpIHtcblx0Ly9cblx0Ly8gQ3JlYXRlIHRoZSBpbmxpbmUgYW5kIHBhZ2UgY29tcG9uZW50c1xuXHQvL1xuXHRTaXRlLnJlYWR5KCgpID0+IHtcblx0XHRTaXRlLlBhZ2VWdWUuY3JlYXRlKCdkaXYuY2wtcmV2aWV3JywgJ1JldmlldyBWdWUnLCBSZXZpZXdWdWUpXG5cdFx0U2l0ZS5JbmxpbmVWdWUuY3JlYXRlKCdkaXYuY2wtcmV2aWV3cycsIFJldmlld3NWdWUpXG5cdH0pXG5cblx0U2l0ZS5SZXZpZXcgPSB0cnVlXG59XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vY3NzLWxvYWRlci12aXJ0dWFsLTJkZTdmYWJkMTUvMC9jYWNoZS9jc3MtbG9hZGVyLW5wbS02LjcuMy02M2FhOTMzNDAwLTQ3M2NjMzJiNmMuemlwL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9jc3MtbG9hZGVyLXZpcnR1YWwtMmRlN2ZhYmQxNS8wL2NhY2hlL2Nzcy1sb2FkZXItbnBtLTYuNy4zLTYzYWE5MzM0MDAtNDczY2MzMmI2Yy56aXAvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiZGl2LmNsLXJldmlld2luZyB0ZC5jbC1lbXB0eSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThmN2YzO1xcbn1cXG5cXG5wLmNsLXJldmlld3Mtbm9uZSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogIzAwNzIzZjtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuXFxuZGl2LmNsLXJldmlld3MgaDMge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZDogIzAwNzIzZjtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuZGl2LmNsLXJldmlldyB7XFxuICBtYXJnaW46IDFlbSAwO1xcbn1cXG5kaXYuY2wtcmV2aWV3IGgzIHtcXG4gIGZvbnQtc2l6ZTogMC44NWVtO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgY29sb3I6ICMwMDcyM2Y7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzAwNzIzZjtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcbmRpdi5jbC1yZXZpZXcgaDMgc3Bhbi5jbC1zdWJtaXR0ZWQge1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgY29sb3I6ICMwMDkwOWU7XFxuICBmb250LXNpemU6IDAuOWVtO1xcbn1cXG5kaXYuY2wtcmV2aWV3IGgzLnN0YWZmIHtcXG4gIGNvbG9yOiByZWQ7XFxufVxcbmRpdi5jbC1yZXZpZXcgcHJlIHtcXG4gIG1hcmdpbjogMDtcXG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcXG59XFxuZGl2LmNsLXJldmlldyBkaXYuY2wtcmV2aWV3LXByZXNlbnQge1xcbiAgbWFyZ2luOiAwO1xcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi92ZW5kb3IvY2wvcmV2aWV3L19yZXZpZXcuc2Nzc1wiLFwid2VicGFjazovLy4vdmVuZG9yL2NsL3NpdGUvc2Fzcy9tb2R1bGVzL19jb2xvcnMuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFHRTtFQUNFLHlCQ1VpQjtBRFpyQjs7QUFNQTtFQUNFLGtCQUFBO0VBQ0EsY0NFUTtFRERSLGtCQUFBO0FBSEY7O0FBUUU7RUFDRSxrQkFBQTtFQUNBLG1CQ05NO0VET04sWUFBQTtBQUxKOztBQVNBO0VBQ0UsYUFBQTtBQU5GO0FBUUU7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGNDbkJNO0VEb0JOLGdDQUFBO0VBQ0EsZ0JBQUE7QUFOSjtBQVFJO0VBQ0UsWUFBQTtFQUNBLGNDbkJJO0VEb0JKLGdCQUFBO0FBTk47QUFXRTtFQUNFLFVBQUE7QUFUSjtBQVlFO0VBQ0UsU0FBQTtFQUNBLHFCQUFBO0FBVko7QUFhRTtFQUNFLFNBQUE7RUFDQSxxQkFBQTtBQVhKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgJ35zaXRlLWNsL3Nhc3MvbW9kdWxlcy9jb2xvcnMnO1xcblxcbmRpdi5jbC1yZXZpZXdpbmcge1xcbiAgdGQuY2wtZW1wdHkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkdmVyeS1saWdodC1wcmltYXJ5O1xcbiAgfVxcbn1cXG5cXG5wLmNsLXJldmlld3Mtbm9uZSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogJHByaW1hcnk7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcblxcbmRpdi5jbC1yZXZpZXdzIHtcXG5cXG4gIGgzIHtcXG4gICAgdGV4dC1hbGlnbjpjZW50ZXI7XFxuICAgIGJhY2tncm91bmQ6ICRwcmltYXJ5O1xcbiAgICBjb2xvcjp3aGl0ZTtcXG4gIH1cXG59XFxuXFxuZGl2LmNsLXJldmlldyB7XFxuICBtYXJnaW46IDFlbSAwO1xcblxcbiAgaDMge1xcbiAgICBmb250LXNpemU6IDAuODVlbTtcXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgY29sb3I6ICRwcmltYXJ5O1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHByaW1hcnk7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuXFxuICAgIHNwYW4uY2wtc3VibWl0dGVkIHtcXG4gICAgICBmbG9hdDogcmlnaHQ7XFxuICAgICAgY29sb3I6ICRzZWNvbmRhO1xcbiAgICAgIGZvbnQtc2l6ZTogMC45ZW07XFxuICAgIH1cXG4gIH1cXG5cXG5cXG4gIGgzLnN0YWZmIHtcXG4gICAgY29sb3I6IHJlZDtcXG4gIH1cXG5cXG4gIHByZSB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xcbiAgfVxcblxcbiAgZGl2LmNsLXJldmlldy1wcmVzZW50IHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XFxuICB9XFxufVxcblwiLFwiLy8gVGhlIG1ham9yIGNvbG9yc1xcclxcbi8vIFdlIGhhdmUgYSBwcmltYXJ5IGNvbG9yLCB0d28gc2Vjb25kYXJ5IGNvbG9ycywgYW5kIGEgY29tcGxlbWVudGFyeSBjb2xvci5cXHJcXG4kYWNjZW50OiAjNjA3RDhCO1xcclxcblxcclxcbiR0b2FzdC1iYWNrZ3JvdW5kOiAjMTUxNTE1O1xcclxcbiR0b2FzdC10ZXh0OiB3aGl0ZTtcXHJcXG5cXHJcXG4kaGVhZGVyLWJhY2tncm91bmQ6ICM1MzUwNTQ7XFxyXFxuJGhlYWRlci10ZXh0OiAjZWVlZWVlO1xcclxcblxcclxcbi8vIFRoZSBtYWpvciBjb2xvcnNcXHJcXG4vLyBXZSBoYXZlIGEgcHJpbWFyeSBjb2xvciwgdHdvIHNlY29uZGFyeSBjb2xvcnMsIGFuZCBhIGNvbXBsZW1lbnRhcnkgY29sb3IuXFxyXFxuJHByaW1hcnk6ICMwMDcyM2Y7XFxyXFxuJGxpZ2h0LXByaW1hcnk6ICM0NGEyNmI7XFxyXFxuJHZlcnktbGlnaHQtcHJpbWFyeTogI2U4ZjdmMztcXHJcXG4kZGFyay1wcmltYXJ5OiAjMDA1MjIzO1xcclxcbiRwcmltYXJ5LXRleHQ6ICMyMTIxMjE7XFxyXFxuXFxyXFxuJHNlY29uZGE6ICMwMDkwOWU7XFxyXFxuJHNlY29uZGI6ICNmY2FmMTc7XFxyXFxuJHNlY29uZGM6ICNjODlhNTg7IC8vICNlOGQ5YjU7XFxyXFxuXFxyXFxuJGNvbXA6ICNjNDE0MjU7XFxyXFxuJGJsaW5kOiAjZWZjNmZmO1xcclxcbiRjb21wLWJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgjNTcwMTAyLCAjOTYwNjA2LCAjNTcwMTAyKTtcXHJcXG4kY29tcC1ib3JkZXI6ICNjN2JkYmI7XFxyXFxuXFxyXFxuLy8gTWVudXNcXHJcXG4kZm9jdXM6ICMwMDgxODM7XFxyXFxuJG1lbnUtYmFja2dyb3VuZDogI2U4ZThlODtcXHJcXG4kbWVudS1ob3ZlcjogI2QwZDBkMDtcXHJcXG4kbWVudS1jb2xvcjogYmxhY2s7XFxyXFxuXFxyXFxuLy8gUGFnZSBiYWNrZ3JvdW5kXFxyXFxuJGJhY2tncm91bmQ6ICNlZWVlZWU7XFxyXFxuXFxyXFxuLy8gTmF2XFxyXFxuJG5hdi1jb2xvcjogd2hpdGU7XFxyXFxuJG5hdi1iYWNrZ3JvdW5kOiB1cmwoJ2ltZy9uYXZfcGF0dGVybi5wbmcnKTtcXHJcXG4kbmF2LTItY29sb3I6ICNmZmZmOTk7XFxyXFxuJG5hdi0yLWJhY2tncm91bmQ6IHVybCgnaW1nL25hdl9wYXR0ZXJuLTIucG5nJyk7XFxyXFxuXFxyXFxuLy8gVGFibGVzXFxyXFxuJHRhYmxlLWdyYWRpZW50LWZyb206ICMyMDRjNDI7XFxyXFxuJHRhYmxlLWdyYWRpZW50LXRvOiAjMzg5YjU0O1xcclxcblxcclxcbi8vIERpYWxvZyBib3hlc1xcclxcbiRkaWFsb2ctZ3JhZGllbnQtZnJvbTogIzIwNGM0MjtcXHJcXG4kZGlhbG9nLWdyYWRpZW50LXRvOiAjMzg5YjU0O1xcclxcbiRkaWFsb2ctYmFyLWNvbG9yOiB3aGl0ZTtcXHJcXG5cXHJcXG4vLyBMaW5rIGNvbG9yc1xcclxcbiRsaW5rOiAjODA4MDgwO1xcclxcbiR2aXNpdGVkOiAjOTY4NDQzOyAgLy8gI2IwOWQ1YjtcXHJcXG4kaG92ZXI6ICMzMzY2Y2M7XFxyXFxuXFxyXFxuJHZlcnktbGlnaHQtcHJpbWFyeS1saW5rOiAjOTAwMDAwO1xcclxcbiR2ZXJ5LWxpZ2h0LXByaW1hcnktaG92ZXI6ICNjMDAwMDA7XFxyXFxuXFxyXFxuXFxyXFxuJHByaW1hcnktbGluazogd2hpdGU7XFxyXFxuJHByaW1hcnktdmlzaXRlZDogI2RkZGRkZDtcXHJcXG4kc2Vjb25kYi12aXNpdGVkOiAjNTU1NTU1O1xcclxcbiRhdXRvYmFjay1saW5rOiAjODgyMjIyO1xcclxcbiRhdXRvYmFjay1saW5rLWhvdmVyOiAjY2MyMjIyO1xcclxcblxcclxcbiRzaGFkb3cteDogM3B4O1xcclxcbiRzaGFkb3cteTogM3B4O1xcclxcbiRzaGFkb3ctcmFkaXVzOiA4cHg7XFxyXFxuJHNoYWRvdy1jb2xvcjogI2NjYztcXHJcXG5cXHJcXG4kdG9nZ2xlLWxpbmstaG92ZXItY29sb3I6ICMwMDY2MDA7XFxyXFxuXFxyXFxuLy8gQm94ZXNcXHJcXG4kYm94LWJvcmRlci1jb2xvcjogI2JkYmRiZDtcXHJcXG5cXHJcXG4vLyBDYXJkc1xcclxcbiRjYXJkLWhlYWRpbmctYmFja2dyb3VuZDogI2YyZjJmMjtcXHJcXG4kY2FyZC1ib3JkZXItY29sb3I6ICNjY2NjY2M7XFxyXFxuXFxyXFxuJXNoYWRvdyB7XFxyXFxuICAtbW96LWJveC1zaGFkb3c6ICRzaGFkb3cteCAkc2hhZG93LXkgJHNoYWRvdy1yYWRpdXMgJHNoYWRvdy1jb2xvcjtcXHJcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogJHNoYWRvdy14ICRzaGFkb3cteSAkc2hhZG93LXJhZGl1cyAkc2hhZG93LWNvbG9yO1xcclxcbiAgYm94LXNoYWRvdzogJHNoYWRvdy14ICRzaGFkb3cteSAkc2hhZG93LXJhZGl1cyAkc2hhZG93LWNvbG9yO1xcclxcbn1cXHJcXG5cXHJcXG4lbm9zaGFkb3cge1xcclxcbiAgLW1vei1ib3gtc2hhZG93OiBub25lO1xcclxcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBub25lO1xcclxcbiAgYm94LXNoYWRvdzogbm9uZTtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3N0eWxlLWxvYWRlci12aXJ0dWFsLTQwNzU0M2UxMzMvMC9jYWNoZS9zdHlsZS1sb2FkZXItbnBtLTMuMy4xLTRiYmI2ZWM3N2YtNDcwZmVlZjY4MC56aXAvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc3R5bGUtbG9hZGVyLXZpcnR1YWwtNDA3NTQzZTEzMy8wL2NhY2hlL3N0eWxlLWxvYWRlci1ucG0tMy4zLjEtNGJiYjZlYzc3Zi00NzBmZWVmNjgwLnppcC9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc3R5bGUtbG9hZGVyLXZpcnR1YWwtNDA3NTQzZTEzMy8wL2NhY2hlL3N0eWxlLWxvYWRlci1ucG0tMy4zLjEtNGJiYjZlYzc3Zi00NzBmZWVmNjgwLnppcC9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3N0eWxlLWxvYWRlci12aXJ0dWFsLTQwNzU0M2UxMzMvMC9jYWNoZS9zdHlsZS1sb2FkZXItbnBtLTMuMy4xLTRiYmI2ZWM3N2YtNDcwZmVlZjY4MC56aXAvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc3R5bGUtbG9hZGVyLXZpcnR1YWwtNDA3NTQzZTEzMy8wL2NhY2hlL3N0eWxlLWxvYWRlci1ucG0tMy4zLjEtNGJiYjZlYzc3Zi00NzBmZWVmNjgwLnppcC9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc3R5bGUtbG9hZGVyLXZpcnR1YWwtNDA3NTQzZTEzMy8wL2NhY2hlL3N0eWxlLWxvYWRlci1ucG0tMy4zLjEtNGJiYjZlYzc3Zi00NzBmZWVmNjgwLnppcC9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vY3NzLWxvYWRlci12aXJ0dWFsLTJkZTdmYWJkMTUvMC9jYWNoZS9jc3MtbG9hZGVyLW5wbS02LjcuMy02M2FhOTMzNDAwLTQ3M2NjMzJiNmMuemlwL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uLy55YXJuL2NhY2hlL3Jlc29sdmUtdXJsLWxvYWRlci1ucG0tNS4wLjAtOWI0NDEwNjdjOS02ZDQ4MzczM2E0LnppcC9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Nhc3MtbG9hZGVyLXZpcnR1YWwtYzdjYTRmMWQxYS8wL2NhY2hlL3Nhc3MtbG9hZGVyLW5wbS0xMy4yLjAtNjQyMWM1ZmY3Yi1lZDZjZGI1ZjU1LnppcC9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtNC51c2VbM10hLi9fcmV2aWV3LnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9jc3MtbG9hZGVyLXZpcnR1YWwtMmRlN2ZhYmQxNS8wL2NhY2hlL2Nzcy1sb2FkZXItbnBtLTYuNy4zLTYzYWE5MzM0MDAtNDczY2MzMmI2Yy56aXAvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vLnlhcm4vY2FjaGUvcmVzb2x2ZS11cmwtbG9hZGVyLW5wbS01LjAuMC05YjQ0MTA2N2M5LTZkNDgzNzMzYTQuemlwL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc2Fzcy1sb2FkZXItdmlydHVhbC1jN2NhNGYxZDFhLzAvY2FjaGUvc2Fzcy1sb2FkZXItbnBtLTEzLjIuMC02NDIxYzVmZjdiLWVkNmNkYjVmNTUuemlwL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcz8/Y2xvbmVkUnVsZVNldC00LnVzZVszXSEuL19yZXZpZXcuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsImltcG9ydCB7IHJlbmRlciB9IGZyb20gXCIuL1Jldmlld1Z1ZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NGVlYjMyNjJcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9SZXZpZXdWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzXCJcbmV4cG9ydCAqIGZyb20gXCIuL1Jldmlld1Z1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anNcIlxuXG5pbXBvcnQgZXhwb3J0Q29tcG9uZW50IGZyb20gXCIvVXNlcnMvY2hhcmxlc293ZW4vd2ViL2NzZTMzNS8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTFhNGIxODdjMy8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE3LjAuMS1mNTUyYjgyODA1LTQyY2M4YzhmZjAuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvZXhwb3J0SGVscGVyLmpzXCJcbmNvbnN0IF9fZXhwb3J0c19fID0gLyojX19QVVJFX18qL2V4cG9ydENvbXBvbmVudChzY3JpcHQsIFtbJ3JlbmRlcicscmVuZGVyXSxbJ19fZmlsZScsXCJ2ZW5kb3IvY2wvcmV2aWV3L2pzL1Jldmlld1Z1ZS52dWVcIl1dKVxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgX19leHBvcnRzX18uX19obXJJZCA9IFwiNGVlYjMyNjJcIlxuICBjb25zdCBhcGkgPSBfX1ZVRV9ITVJfUlVOVElNRV9fXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFhcGkuY3JlYXRlUmVjb3JkKCc0ZWViMzI2MicsIF9fZXhwb3J0c19fKSkge1xuICAgIGFwaS5yZWxvYWQoJzRlZWIzMjYyJywgX19leHBvcnRzX18pXG4gIH1cbiAgXG4gIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9SZXZpZXdWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTRlZWIzMjYyXCIsICgpID0+IHtcbiAgICBhcGkucmVyZW5kZXIoJzRlZWIzMjYyJywgcmVuZGVyKVxuICB9KVxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgX19leHBvcnRzX18iLCJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiLi9SZXZpZXdzVnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wOTRmZTQ0N1wiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1Jldmlld3NWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzXCJcbmV4cG9ydCAqIGZyb20gXCIuL1Jldmlld3NWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzXCJcblxuaW1wb3J0IGV4cG9ydENvbXBvbmVudCBmcm9tIFwiL1VzZXJzL2NoYXJsZXNvd2VuL3dlYi9jc2UzMzUvLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWExYTRiMTg3YzMvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNy4wLjEtZjU1MmI4MjgwNS00MmNjOGM4ZmYwLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L2V4cG9ydEhlbHBlci5qc1wiXG5jb25zdCBfX2V4cG9ydHNfXyA9IC8qI19fUFVSRV9fKi9leHBvcnRDb21wb25lbnQoc2NyaXB0LCBbWydyZW5kZXInLHJlbmRlcl0sWydfX2ZpbGUnLFwidmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdzVnVlLnZ1ZVwiXV0pXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICBfX2V4cG9ydHNfXy5fX2htcklkID0gXCIwOTRmZTQ0N1wiXG4gIGNvbnN0IGFwaSA9IF9fVlVFX0hNUl9SVU5USU1FX19cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIWFwaS5jcmVhdGVSZWNvcmQoJzA5NGZlNDQ3JywgX19leHBvcnRzX18pKSB7XG4gICAgYXBpLnJlbG9hZCgnMDk0ZmU0NDcnLCBfX2V4cG9ydHNfXylcbiAgfVxuICBcbiAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1Jldmlld3NWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTA5NGZlNDQ3XCIsICgpID0+IHtcbiAgICBhcGkucmVyZW5kZXIoJzA5NGZlNDQ3JywgcmVuZGVyKVxuICB9KVxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgX19leHBvcnRzX18iLCJleHBvcnQgeyBkZWZhdWx0IH0gZnJvbSBcIi0hLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vYmFiZWwtbG9hZGVyLXZpcnR1YWwtNThhMDQzZjMyYS8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOS4xLjAtNjQ2NzE2MmNiZi03NzQ3NThmZWJkLnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yLnVzZSEuLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTFhNGIxODdjMy8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE3LjAuMS1mNTUyYjgyODA1LTQyY2M4YzhmZjAuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbOV0udXNlWzBdIS4vUmV2aWV3VnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qc1wiOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9iYWJlbC1sb2FkZXItdmlydHVhbC01OGEwNDNmMzJhLzAvY2FjaGUvYmFiZWwtbG9hZGVyLW5wbS05LjEuMC02NDY3MTYyY2JmLTc3NDc1OGZlYmQuemlwL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTIudXNlIS4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1hMWE0YjE4N2MzLzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTcuMC4xLWY1NTJiODI4MDUtNDJjYzhjOGZmMC56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1s5XS51c2VbMF0hLi9SZXZpZXdWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzXCIiLCJleHBvcnQgeyBkZWZhdWx0IH0gZnJvbSBcIi0hLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vYmFiZWwtbG9hZGVyLXZpcnR1YWwtNThhMDQzZjMyYS8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOS4xLjAtNjQ2NzE2MmNiZi03NzQ3NThmZWJkLnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yLnVzZSEuLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTFhNGIxODdjMy8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE3LjAuMS1mNTUyYjgyODA1LTQyY2M4YzhmZjAuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbOV0udXNlWzBdIS4vUmV2aWV3c1Z1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anNcIjsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vYmFiZWwtbG9hZGVyLXZpcnR1YWwtNThhMDQzZjMyYS8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOS4xLjAtNjQ2NzE2MmNiZi03NzQ3NThmZWJkLnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yLnVzZSEuLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTFhNGIxODdjMy8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE3LjAuMS1mNTUyYjgyODA1LTQyY2M4YzhmZjAuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbOV0udXNlWzBdIS4vUmV2aWV3c1Z1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anNcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2JhYmVsLWxvYWRlci12aXJ0dWFsLTU4YTA0M2YzMmEvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTkuMS4wLTY0NjcxNjJjYmYtNzc0NzU4ZmViZC56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMi51c2UhLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWVmYzU4NGE0YmEvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNy4wLjEtZjU1MmI4MjgwNS00MmNjOGM4ZmYwLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L3RlbXBsYXRlTG9hZGVyLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzJdIS4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1hMWE0YjE4N2MzLzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTcuMC4xLWY1NTJiODI4MDUtNDJjYzhjOGZmMC56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1s5XS51c2VbMF0hLi9SZXZpZXdWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTRlZWIzMjYyXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9iYWJlbC1sb2FkZXItdmlydHVhbC01OGEwNDNmMzJhLzAvY2FjaGUvYmFiZWwtbG9hZGVyLW5wbS05LjEuMC02NDY3MTYyY2JmLTc3NDc1OGZlYmQuemlwL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTIudXNlIS4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1lZmM1ODRhNGJhLzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTcuMC4xLWY1NTJiODI4MDUtNDJjYzhjOGZmMC56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC90ZW1wbGF0ZUxvYWRlci5qcz8/cnVsZVNldFsxXS5ydWxlc1syXSEuLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTFhNGIxODdjMy8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE3LjAuMS1mNTUyYjgyODA1LTQyY2M4YzhmZjAuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbOV0udXNlWzBdIS4vUmV2aWV3c1Z1ZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MDk0ZmU0NDdcIiJdLCJuYW1lcyI6WyJTaXRlIiwiVXNlclZ1ZUJhc2UiLCJwcm9wcyIsImRhdGEiLCJyZXZpZXdpbmciLCJzdWJtaXNzaW9ucyIsIm1vdW50ZWQiLCJzZXRUaXRsZSIsImpzb24iLCJlbGVtZW50IiwiJHJlZnMiLCJlZGl0b3IiLCIkc2l0ZSIsIkVkaXRvciIsImhlaWdodCIsImNsYXNzZXMiLCJzdWJtaXNzaW9uIiwidGFnIiwiaWQiLCJkYXRlIiwibWV0aG9kcyIsInN1Ym1pdCIsInRleHQiLCJ0ZXh0YXJlYSIsInZhbHVlIiwidHJpbSIsInRvYXN0IiwicGFyYW1zIiwidHlwZSIsImFwaSIsInBvc3QiLCJ0aGVuIiwicmVzcG9uc2UiLCJoYXNFcnJvciIsImdldERhdGEiLCJhdHRyaWJ1dGVzIiwiZXJyb3IiLCJmb3JtYXRUaW1lIiwidGltZSIsIlRpbWVGb3JtYXR0ZXIiLCJyZWxhdGl2ZVVOSVgiLCJzaG93U3VibWlzc2lvbnMiLCJyZXZpZXciLCJwYXN0IiwibWV0YSIsInByZXZpZXdJbWciLCJyb290IiwiYXNzaWduVGFnIiwicmV2aWV3cyIsInJldCIsImFic29sdXRlVU5JWCIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJyZWYiLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX2hvaXN0ZWRfMSIsIl9ob2lzdGVkXzIiLCJfRnJhZ21lbnQiLCIkcHJvcHMiLCJfaG9pc3RlZF8zIiwibmFtZSIsIl9ob2lzdGVkXzQiLCJfaG9pc3RlZF81Iiwic3JjIiwiJG9wdGlvbnMiLCJfaG9pc3RlZF83IiwiX2hvaXN0ZWRfOCIsIm1ldGhvZCIsIm9uU3VibWl0IiwiX2hvaXN0ZWRfOSIsIl9ob2lzdGVkXzEwIiwiX2hvaXN0ZWRfMTEiLCJfY3R4IiwibGVuZ3RoIiwiX2hvaXN0ZWRfMTIiLCJfaG9pc3RlZF8xMyIsIl9ob2lzdGVkXzE0IiwiX2hvaXN0ZWRfMTUiLCJfbm9ybWFsaXplQ2xhc3MiLCJyb2xlIiwidW5kZWZpbmVkIiwiYnkiLCJSZXZpZXdWdWUiLCJSZXZpZXdzVnVlIiwiUmV2aWV3IiwicmVhZHkiLCJQYWdlVnVlIiwiY3JlYXRlIiwiSW5saW5lVnVlIl0sInNvdXJjZVJvb3QiOiIifQ==