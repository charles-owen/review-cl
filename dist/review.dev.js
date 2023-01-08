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
/* harmony import */ var users_cl_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! users-cl/index */ "./vendor/cl/users/index.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }


/**
 * This is the page for a review of an assignment by a member.
 * /cl/review/:id
 * @constructor ReviewVue
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'extends': users_cl_index__WEBPACK_IMPORTED_MODULE_0__.UserVueBase,
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
/**
 * This is the inline vue for reviews of an assignment used by the
 * submission and page the course console grading page.
 *
 * @constructor ReviewsVue
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aUMseU5BQWUsQ0FBQyw4RUFBTSxhQUFhLGdGQUFNO0FBQzFFO0FBQ0EsSUFBSSxLQUFVLEVBQUUsRUFZZjs7O0FBR0QsaUVBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEJ3RDtBQUNWO0FBQ0w7O0FBRXhELENBQWdOO0FBQ2hOLGlDQUFpQyx5TkFBZSxDQUFDLCtFQUFNLGFBQWEsaUZBQU07QUFDMUU7QUFDQSxJQUFJLEtBQVUsRUFBRSxFQVlmOzs7QUFHRCxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7O0FDdEI4Wjs7Ozs7Ozs7Ozs7Ozs7O0FDQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jc2UzMzUvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL1Jldmlld1Z1ZS52dWUiLCJ3ZWJwYWNrOi8vY3NlMzM1Ly4vdmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdzVnVlLnZ1ZSIsIndlYnBhY2s6Ly9jc2UzMzUvLi92ZW5kb3IvY2wvcmV2aWV3L2luZGV4LmpzIiwid2VicGFjazovL2NzZTMzNS8uL3ZlbmRvci9jbC9yZXZpZXcvX3Jldmlldy5zY3NzIiwid2VicGFjazovL2NzZTMzNS8uL3ZlbmRvci9jbC9yZXZpZXcvX3Jldmlldy5zY3NzPzg2NWIiLCJ3ZWJwYWNrOi8vY3NlMzM1Ly4vdmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdWdWUudnVlPzA4M2EiLCJ3ZWJwYWNrOi8vY3NlMzM1Ly4vdmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdzVnVlLnZ1ZT9jNjk2Iiwid2VicGFjazovL2NzZTMzNS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3VnVlLnZ1ZT84ZTJiIiwid2VicGFjazovL2NzZTMzNS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3c1Z1ZS52dWU/ZTYwMSIsIndlYnBhY2s6Ly9jc2UzMzUvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL1Jldmlld1Z1ZS52dWU/NjM5ZCIsIndlYnBhY2s6Ly9jc2UzMzUvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL1Jldmlld3NWdWUudnVlPzJiMjAiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxuICAgIDxkaXYgY2xhc3M9XCJmdWxsXCI+XG4gICAgICA8ZGl2IHYtZm9yPVwic3VibWlzc2lvbiBpbiBqc29uLnN1Ym1pc3Npb25zXCIgY2xhc3M9XCJjbC1zdWJtaXNzaW9uLXZpZXdcIj5cbiAgICAgICAgPGgyPnt7c3VibWlzc2lvbi5uYW1lfX08L2gyPlxuICAgICAgICA8cHJlIHYtaWY9XCJzdWJtaXNzaW9uLnR5cGUgPT09ICd0ZXh0J1wiIGNsYXNzPVwiY2wtcHJldmlldyB5ZWxsb3ctcGFkXCI+e3tzdWJtaXNzaW9uLnRleHR9fTwvcHJlPlxuICAgICAgICA8ZmlndXJlIHYtaWY9XCJzdWJtaXNzaW9uLnR5cGUgPT09ICdpbWFnZSdcIiBjbGFzcz1cImNsLXByZXZpZXdcIj48aW1nIDpzcmM9XCJwcmV2aWV3SW1nKHN1Ym1pc3Npb24pXCI+PC9maWd1cmU+XG4gICAgICAgIDxwIGNsYXNzPVwiY2wtcHJldmlldy10aW1lXCI+e3tmb3JtYXRUaW1lKHN1Ym1pc3Npb24uZGF0ZSl9fTwvcD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8aDI+UmV2aWV3PC9oMj5cbiAgICAgIDxmb3JtIG1ldGhvZD1cInBvc3RcIiBAc3VibWl0LnByZXZlbnQ9XCJzdWJtaXRcIj5cbiAgICAgICAgPGRpdiByZWY9XCJlZGl0b3JcIiBjbGFzcz1cInNoYWRvd1wiPjwvZGl2PlxuICAgICAgICA8cD48aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU3VibWl0IFJldmlld1wiPjwvcD5cbiAgICAgIDwvZm9ybT5cblxuICAgICAgPGgyPlByZXZpb3VzIFJldmlld3M8L2gyPlxuICAgICAgPHAgY2xhc3M9XCJjbC1yZXZpZXdzLW5vbmVcIiB2LWlmPVwicmV2aWV3aW5nLmxlbmd0aCA9PT0gMFwiPioqKiBOb25lIFlldCAqKio8L3A+XG4gICAgICA8ZGl2IHYtZm9yPVwicmV2aWV3IGluIHJldmlld2luZ1wiIGNsYXNzPVwiY2wtcmV2aWV3XCI+XG4gICAgICAgIDxoMz57e2Zvcm1hdFRpbWUocmV2aWV3LnRpbWUpfX0gUmV2aWV3IGJ5IE1lXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjbC1zdWJtaXR0ZWRcIj57e3Nob3dTdWJtaXNzaW9ucyhyZXZpZXcpfX08L3NwYW4+PC9oMz5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsLXJldmlldy1wcmVzZW50XCI+e3tyZXZpZXcubWV0YS5yZXZpZXcucmV2aWV3fX08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQge1VzZXJWdWVCYXNlfSBmcm9tICd1c2Vycy1jbC9pbmRleCdcblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBwYWdlIGZvciBhIHJldmlldyBvZiBhbiBhc3NpZ25tZW50IGJ5IGEgbWVtYmVyLlxuICogL2NsL3Jldmlldy86aWRcbiAqIEBjb25zdHJ1Y3RvciBSZXZpZXdWdWVcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICAnZXh0ZW5kcyc6IFVzZXJWdWVCYXNlLFxuICBwcm9wczogWydqc29uJ10sXG4gIGRhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmV2aWV3aW5nOiBbXSxcbiAgICAgIHN1Ym1pc3Npb25zOiB7fVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLnNldFRpdGxlKCdQZWVyIFJldmlld2luZycpO1xuICAgIHRoaXMucmV2aWV3aW5nID0gdGhpcy5qc29uLnJldmlld2luZztcblxuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLiRyZWZzWydlZGl0b3InXTtcbiAgICB0aGlzLmVkaXRvciA9IG5ldyB0aGlzLiRzaXRlLkVkaXRvcihlbGVtZW50LCB7XG4gICAgICBoZWlnaHQ6ICcxMGVtJyxcbiAgICAgIGNsYXNzZXM6IFsneWVsbG93LXBhZCddXG4gICAgfSk7XG5cbiAgICBsZXQgc3VibWlzc2lvbnMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IHN1Ym1pc3Npb24gb2YgdGhpcy5qc29uLnN1Ym1pc3Npb25zKSB7XG4gICAgICBzdWJtaXNzaW9uc1tzdWJtaXNzaW9uLnRhZ10gPSB7XG4gICAgICAgICdpZCc6IHN1Ym1pc3Npb24uaWQsXG4gICAgICAgICdkYXRlJzogc3VibWlzc2lvbi5kYXRlXG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMuc3VibWlzc2lvbnMgPSBzdWJtaXNzaW9ucztcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHN1Ym1pdCgpIHtcbiAgICAgIGNvbnN0IHRleHQgPSB0aGlzLmVkaXRvci50ZXh0YXJlYS52YWx1ZS50cmltKCk7XG4gICAgICBpZiAodGV4dCA9PT0gJycpIHtcbiAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCAnWW91IG11c3QgZW50ZXIgc29tZSB0ZXh0IHRvIHN1Ym1pdCcpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgIHR5cGU6ICd0ZXh0L3BsYWluJyxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgc3VibWlzc2lvbnM6IHRoaXMuc3VibWlzc2lvbnNcbiAgICAgIH1cblxuICAgICAgdGhpcy4kc2l0ZS5hcGkucG9zdChgL2FwaS9yZXZpZXcvcmV2aWV3LyR7dGhpcy5qc29uLmlkfWAsIHBhcmFtcylcbiAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UuaGFzRXJyb3IoKSkge1xuICAgICAgICAgICAgICB0aGlzLmVkaXRvci50ZXh0YXJlYS52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICB0aGlzLnJldmlld2luZyA9IHJlc3BvbnNlLmdldERhdGEoJ3Jldmlld2luZycpLmF0dHJpYnV0ZXM7XG5cbiAgICAgICAgICAgICAgdGhpcy4kc2l0ZS50b2FzdCh0aGlzLCBcIlJldmlldyBzdWNjZXNzZnVsbHkgc2F2ZWQgdG8gdGhlIHNlcnZlclwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuJHNpdGUudG9hc3QodGhpcywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRzaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIGZvcm1hdFRpbWUodGltZSkge1xuICAgICAgcmV0dXJuIHRoaXMuJHNpdGUuVGltZUZvcm1hdHRlci5yZWxhdGl2ZVVOSVgodGltZSwgbnVsbCk7XG4gICAgfSxcbiAgICBzaG93U3VibWlzc2lvbnMocmV2aWV3KSB7XG4gICAgICBsZXQgcGFzdCA9IGZhbHNlO1xuICAgICAgY29uc3Qgc3VibWlzc2lvbnMgPSByZXZpZXcubWV0YS5yZXZpZXcuc3VibWlzc2lvbnM7XG4gICAgICBmb3IgKGxldCB0YWcgaW4gc3VibWlzc2lvbnMpIHtcbiAgICAgICAgaWYgKHN1Ym1pc3Npb25zW3RhZ10uaWQgIT09IHRoaXMuc3VibWlzc2lvbnNbdGFnXS5pZCkge1xuICAgICAgICAgIHBhc3QgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXN0KSB7XG4gICAgICAgIHJldHVybiAnRm9yIGEgcGFzdCBzdWJtaXNzaW9uJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICcnO1xuICAgIH0sXG4gICAgcHJldmlld0ltZyhzdWJtaXNzaW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy4kc2l0ZS5yb290ICsgJy9jbC9yZXZpZXcvaW1nLycgKyBzdWJtaXNzaW9uLmlkO1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY2wtcmV2aWV3c1wiPlxuICAgIDxoMz5SZXZpZXdzIG9mIHRoaXMgYXNzaWdubWVudCBhcHBlYXIgaGVyZS48L2gzPlxuICAgIDxwIGNsYXNzPVwiY2wtcmV2aWV3cy1ub25lXCIgdi1pZj1cInJldmlld3MubGVuZ3RoID09PSAwXCI+KioqIE5vbmUgWWV0ICoqKjwvcD5cbiAgICA8ZGl2IHYtZm9yPVwicmV2aWV3IGluIHJldmlld3NcIiBjbGFzcz1cImNsLXJldmlld1wiPlxuICAgICAgPGgzIDpjbGFzcz1cInJldmlldy5yb2xlICE9PSB1bmRlZmluZWQgPyAnc3RhZmYnIDogJydcIj57e2Zvcm1hdFRpbWUocmV2aWV3LnRpbWUpfX1cbiAgICAgICAgPHNwYW4gdi1pZj1cInJldmlldy5yb2xlICE9PSB1bmRlZmluZWRcIj5TdGFmZiBSZXZpZXc8L3NwYW4+XG4gICAgICAgIDxzcGFuIHYtZWxzZT5SZXZpZXc8L3NwYW4+IGJ5IHt7cmV2aWV3LmJ5fX1cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjbC1zdWJtaXR0ZWRcIj57e3Nob3dTdWJtaXNzaW9ucyhyZXZpZXcpfX08L3NwYW4+PC9oMz5cbiAgICAgIDxkaXYgY2xhc3M9XCJjbC1yZXZpZXctcHJlc2VudFwiPnt7cmV2aWV3LnJldmlld319PC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbi8qKlxuICogVGhpcyBpcyB0aGUgaW5saW5lIHZ1ZSBmb3IgcmV2aWV3cyBvZiBhbiBhc3NpZ25tZW50IHVzZWQgYnkgdGhlXG4gKiBzdWJtaXNzaW9uIGFuZCBwYWdlIHRoZSBjb3Vyc2UgY29uc29sZSBncmFkaW5nIHBhZ2UuXG4gKlxuICogQGNvbnN0cnVjdG9yIFJldmlld3NWdWVcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczogWydqc29uJ10sXG4gIGRhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXNzaWduVGFnOiAnJyxcbiAgICAgIHJldmlld3M6IFtdXG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIHRoaXMuYXNzaWduVGFnID0gdGhpcy5qc29uLmFzc2lnblRhZztcbiAgICB0aGlzLnJldmlld3MgPSB0aGlzLmpzb24ucmV2aWV3cztcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGZvcm1hdFRpbWUodGltZSkge1xuICAgICAgcmV0dXJuIHRoaXMuJHNpdGUuVGltZUZvcm1hdHRlci5yZWxhdGl2ZVVOSVgodGltZSwgbnVsbCk7XG4gICAgfSxcbiAgICBzaG93U3VibWlzc2lvbnMocmV2aWV3KSB7XG4gICAgICBsZXQgcmV0ID0gJyc7XG4gICAgICBmb3IgKGxldCB0YWcgaW4gcmV2aWV3LnN1Ym1pc3Npb25zKSB7XG4gICAgICAgIGlmIChyZXQgIT09ICcnKSB7XG4gICAgICAgICAgcmV0ICs9ICcgLyAnO1xuICAgICAgICB9XG4gICAgICAgIHJldCArPSB0aGlzLiRzaXRlLlRpbWVGb3JtYXR0ZXIuYWJzb2x1dGVVTklYKHJldmlldy5zdWJtaXNzaW9uc1t0YWddLmRhdGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAocmV0ID09PSAnJykge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnU3VibWlzc2lvbjogJyArIHJldDtcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PiIsIi8qXG4gKiBUaGUgbWFpbiBSZXZpZXcgc3lzdGVtIGVudHJ5IHBvaW50XG4gKi9cblxuaW1wb3J0ICcuL19yZXZpZXcuc2Nzcyc7XG5pbXBvcnQgUmV2aWV3VnVlIGZyb20gJy4vanMvUmV2aWV3VnVlLnZ1ZSc7XG5pbXBvcnQgUmV2aWV3c1Z1ZSBmcm9tICcuL2pzL1Jldmlld3NWdWUudnVlJztcblxuaWYoIVNpdGUuUmV2aWV3KSB7XG5cdC8vXG5cdC8vIENyZWF0ZSB0aGUgaW5saW5lIGFuZCBwYWdlIGNvbXBvbmVudHNcblx0Ly9cblx0U2l0ZS5yZWFkeSgoKSA9PiB7XG5cdFx0U2l0ZS5QYWdlVnVlLmNyZWF0ZSgnZGl2LmNsLXJldmlldycsICdSZXZpZXcgVnVlJywgUmV2aWV3VnVlKVxuXHRcdFNpdGUuSW5saW5lVnVlLmNyZWF0ZSgnZGl2LmNsLXJldmlld3MnLCBSZXZpZXdzVnVlKVxuXHR9KVxuXG5cdFNpdGUuUmV2aWV3ID0gdHJ1ZVxufVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2Nzcy1sb2FkZXItdmlydHVhbC0yZGU3ZmFiZDE1LzAvY2FjaGUvY3NzLWxvYWRlci1ucG0tNi43LjMtNjNhYTkzMzQwMC00NzNjYzMyYjZjLnppcC9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vY3NzLWxvYWRlci12aXJ0dWFsLTJkZTdmYWJkMTUvMC9jYWNoZS9jc3MtbG9hZGVyLW5wbS02LjcuMy02M2FhOTMzNDAwLTQ3M2NjMzJiNmMuemlwL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImRpdi5jbC1yZXZpZXdpbmcgdGQuY2wtZW1wdHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZjdmMztcXG59XFxuXFxucC5jbC1yZXZpZXdzLW5vbmUge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6ICMwMDcyM2Y7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcblxcbmRpdi5jbC1yZXZpZXdzIGgzIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJhY2tncm91bmQ6ICMwMDcyM2Y7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcblxcbmRpdi5jbC1yZXZpZXcge1xcbiAgbWFyZ2luOiAxZW0gMDtcXG59XFxuZGl2LmNsLXJldmlldyBoMyB7XFxuICBmb250LXNpemU6IDAuODVlbTtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiAjMDA3MjNmO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMwMDcyM2Y7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG5kaXYuY2wtcmV2aWV3IGgzIHNwYW4uY2wtc3VibWl0dGVkIHtcXG4gIGZsb2F0OiByaWdodDtcXG4gIGNvbG9yOiAjMDA5MDllO1xcbiAgZm9udC1zaXplOiAwLjllbTtcXG59XFxuZGl2LmNsLXJldmlldyBoMy5zdGFmZiB7XFxuICBjb2xvcjogcmVkO1xcbn1cXG5kaXYuY2wtcmV2aWV3IHByZSB7XFxuICBtYXJnaW46IDA7XFxuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XFxufVxcbmRpdi5jbC1yZXZpZXcgZGl2LmNsLXJldmlldy1wcmVzZW50IHtcXG4gIG1hcmdpbjogMDtcXG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vdmVuZG9yL2NsL3Jldmlldy9fcmV2aWV3LnNjc3NcIixcIndlYnBhY2s6Ly8uL3ZlbmRvci9jbC9zaXRlL3Nhc3MvbW9kdWxlcy9fY29sb3JzLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBR0U7RUFDRSx5QkNVaUI7QURackI7O0FBTUE7RUFDRSxrQkFBQTtFQUNBLGNDRVE7RUREUixrQkFBQTtBQUhGOztBQVFFO0VBQ0Usa0JBQUE7RUFDQSxtQkNOTTtFRE9OLFlBQUE7QUFMSjs7QUFTQTtFQUNFLGFBQUE7QUFORjtBQVFFO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQ25CTTtFRG9CTixnQ0FBQTtFQUNBLGdCQUFBO0FBTko7QUFRSTtFQUNFLFlBQUE7RUFDQSxjQ25CSTtFRG9CSixnQkFBQTtBQU5OO0FBV0U7RUFDRSxVQUFBO0FBVEo7QUFZRTtFQUNFLFNBQUE7RUFDQSxxQkFBQTtBQVZKO0FBYUU7RUFDRSxTQUFBO0VBQ0EscUJBQUE7QUFYSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0ICd+c2l0ZS1jbC9zYXNzL21vZHVsZXMvY29sb3JzJztcXG5cXG5kaXYuY2wtcmV2aWV3aW5nIHtcXG4gIHRkLmNsLWVtcHR5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHZlcnktbGlnaHQtcHJpbWFyeTtcXG4gIH1cXG59XFxuXFxucC5jbC1yZXZpZXdzLW5vbmUge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6ICRwcmltYXJ5O1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5cXG5kaXYuY2wtcmV2aWV3cyB7XFxuXFxuICBoMyB7XFxuICAgIHRleHQtYWxpZ246Y2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kOiAkcHJpbWFyeTtcXG4gICAgY29sb3I6d2hpdGU7XFxuICB9XFxufVxcblxcbmRpdi5jbC1yZXZpZXcge1xcbiAgbWFyZ2luOiAxZW0gMDtcXG5cXG4gIGgzIHtcXG4gICAgZm9udC1zaXplOiAwLjg1ZW07XFxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgIGNvbG9yOiAkcHJpbWFyeTtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRwcmltYXJ5O1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcblxcbiAgICBzcGFuLmNsLXN1Ym1pdHRlZCB7XFxuICAgICAgZmxvYXQ6IHJpZ2h0O1xcbiAgICAgIGNvbG9yOiAkc2Vjb25kYTtcXG4gICAgICBmb250LXNpemU6IDAuOWVtO1xcbiAgICB9XFxuICB9XFxuXFxuXFxuICBoMy5zdGFmZiB7XFxuICAgIGNvbG9yOiByZWQ7XFxuICB9XFxuXFxuICBwcmUge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcXG4gIH1cXG5cXG4gIGRpdi5jbC1yZXZpZXctcHJlc2VudCB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xcbiAgfVxcbn1cXG5cIixcIi8vIFRoZSBtYWpvciBjb2xvcnNcXHJcXG4vLyBXZSBoYXZlIGEgcHJpbWFyeSBjb2xvciwgdHdvIHNlY29uZGFyeSBjb2xvcnMsIGFuZCBhIGNvbXBsZW1lbnRhcnkgY29sb3IuXFxyXFxuJGFjY2VudDogIzYwN0Q4QjtcXHJcXG5cXHJcXG4kdG9hc3QtYmFja2dyb3VuZDogIzE1MTUxNTtcXHJcXG4kdG9hc3QtdGV4dDogd2hpdGU7XFxyXFxuXFxyXFxuJGhlYWRlci1iYWNrZ3JvdW5kOiAjNTM1MDU0O1xcclxcbiRoZWFkZXItdGV4dDogI2VlZWVlZTtcXHJcXG5cXHJcXG4vLyBUaGUgbWFqb3IgY29sb3JzXFxyXFxuLy8gV2UgaGF2ZSBhIHByaW1hcnkgY29sb3IsIHR3byBzZWNvbmRhcnkgY29sb3JzLCBhbmQgYSBjb21wbGVtZW50YXJ5IGNvbG9yLlxcclxcbiRwcmltYXJ5OiAjMDA3MjNmO1xcclxcbiRsaWdodC1wcmltYXJ5OiAjNDRhMjZiO1xcclxcbiR2ZXJ5LWxpZ2h0LXByaW1hcnk6ICNlOGY3ZjM7XFxyXFxuJGRhcmstcHJpbWFyeTogIzAwNTIyMztcXHJcXG4kcHJpbWFyeS10ZXh0OiAjMjEyMTIxO1xcclxcblxcclxcbiRzZWNvbmRhOiAjMDA5MDllO1xcclxcbiRzZWNvbmRiOiAjZmNhZjE3O1xcclxcbiRzZWNvbmRjOiAjYzg5YTU4OyAvLyAjZThkOWI1O1xcclxcblxcclxcbiRjb21wOiAjYzQxNDI1O1xcclxcbiRibGluZDogI2VmYzZmZjtcXHJcXG4kY29tcC1iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoIzU3MDEwMiwgIzk2MDYwNiwgIzU3MDEwMik7XFxyXFxuJGNvbXAtYm9yZGVyOiAjYzdiZGJiO1xcclxcblxcclxcbi8vIE1lbnVzXFxyXFxuJGZvY3VzOiAjMDA4MTgzO1xcclxcbiRtZW51LWJhY2tncm91bmQ6ICNlOGU4ZTg7XFxyXFxuJG1lbnUtaG92ZXI6ICNkMGQwZDA7XFxyXFxuJG1lbnUtY29sb3I6IGJsYWNrO1xcclxcblxcclxcbi8vIFBhZ2UgYmFja2dyb3VuZFxcclxcbiRiYWNrZ3JvdW5kOiAjZWVlZWVlO1xcclxcblxcclxcbi8vIE5hdlxcclxcbiRuYXYtY29sb3I6IHdoaXRlO1xcclxcbiRuYXYtYmFja2dyb3VuZDogdXJsKCdpbWcvbmF2X3BhdHRlcm4ucG5nJyk7XFxyXFxuJG5hdi0yLWNvbG9yOiAjZmZmZjk5O1xcclxcbiRuYXYtMi1iYWNrZ3JvdW5kOiB1cmwoJ2ltZy9uYXZfcGF0dGVybi0yLnBuZycpO1xcclxcblxcclxcbi8vIFRhYmxlc1xcclxcbiR0YWJsZS1ncmFkaWVudC1mcm9tOiAjMjA0YzQyO1xcclxcbiR0YWJsZS1ncmFkaWVudC10bzogIzM4OWI1NDtcXHJcXG5cXHJcXG4vLyBEaWFsb2cgYm94ZXNcXHJcXG4kZGlhbG9nLWdyYWRpZW50LWZyb206ICMyMDRjNDI7XFxyXFxuJGRpYWxvZy1ncmFkaWVudC10bzogIzM4OWI1NDtcXHJcXG4kZGlhbG9nLWJhci1jb2xvcjogd2hpdGU7XFxyXFxuXFxyXFxuLy8gTGluayBjb2xvcnNcXHJcXG4kbGluazogIzgwODA4MDtcXHJcXG4kdmlzaXRlZDogIzk2ODQ0MzsgIC8vICNiMDlkNWI7XFxyXFxuJGhvdmVyOiAjMzM2NmNjO1xcclxcblxcclxcbiR2ZXJ5LWxpZ2h0LXByaW1hcnktbGluazogIzkwMDAwMDtcXHJcXG4kdmVyeS1saWdodC1wcmltYXJ5LWhvdmVyOiAjYzAwMDAwO1xcclxcblxcclxcblxcclxcbiRwcmltYXJ5LWxpbms6IHdoaXRlO1xcclxcbiRwcmltYXJ5LXZpc2l0ZWQ6ICNkZGRkZGQ7XFxyXFxuJHNlY29uZGItdmlzaXRlZDogIzU1NTU1NTtcXHJcXG4kYXV0b2JhY2stbGluazogIzg4MjIyMjtcXHJcXG4kYXV0b2JhY2stbGluay1ob3ZlcjogI2NjMjIyMjtcXHJcXG5cXHJcXG4kc2hhZG93LXg6IDNweDtcXHJcXG4kc2hhZG93LXk6IDNweDtcXHJcXG4kc2hhZG93LXJhZGl1czogOHB4O1xcclxcbiRzaGFkb3ctY29sb3I6ICNjY2M7XFxyXFxuXFxyXFxuJHRvZ2dsZS1saW5rLWhvdmVyLWNvbG9yOiAjMDA2NjAwO1xcclxcblxcclxcbi8vIEJveGVzXFxyXFxuJGJveC1ib3JkZXItY29sb3I6ICNiZGJkYmQ7XFxyXFxuXFxyXFxuLy8gQ2FyZHNcXHJcXG4kY2FyZC1oZWFkaW5nLWJhY2tncm91bmQ6ICNmMmYyZjI7XFxyXFxuJGNhcmQtYm9yZGVyLWNvbG9yOiAjY2NjY2NjO1xcclxcblxcclxcbiVzaGFkb3cge1xcclxcbiAgLW1vei1ib3gtc2hhZG93OiAkc2hhZG93LXggJHNoYWRvdy15ICRzaGFkb3ctcmFkaXVzICRzaGFkb3ctY29sb3I7XFxyXFxuICAtd2Via2l0LWJveC1zaGFkb3c6ICRzaGFkb3cteCAkc2hhZG93LXkgJHNoYWRvdy1yYWRpdXMgJHNoYWRvdy1jb2xvcjtcXHJcXG4gIGJveC1zaGFkb3c6ICRzaGFkb3cteCAkc2hhZG93LXkgJHNoYWRvdy1yYWRpdXMgJHNoYWRvdy1jb2xvcjtcXHJcXG59XFxyXFxuXFxyXFxuJW5vc2hhZG93IHtcXHJcXG4gIC1tb3otYm94LXNoYWRvdzogbm9uZTtcXHJcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZTtcXHJcXG4gIGJveC1zaGFkb3c6IG5vbmU7XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9zdHlsZS1sb2FkZXItdmlydHVhbC00MDc1NDNlMTMzLzAvY2FjaGUvc3R5bGUtbG9hZGVyLW5wbS0zLjMuMS00YmJiNmVjNzdmLTQ3MGZlZWY2ODAuemlwL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3N0eWxlLWxvYWRlci12aXJ0dWFsLTQwNzU0M2UxMzMvMC9jYWNoZS9zdHlsZS1sb2FkZXItbnBtLTMuMy4xLTRiYmI2ZWM3N2YtNDcwZmVlZjY4MC56aXAvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3N0eWxlLWxvYWRlci12aXJ0dWFsLTQwNzU0M2UxMzMvMC9jYWNoZS9zdHlsZS1sb2FkZXItbnBtLTMuMy4xLTRiYmI2ZWM3N2YtNDcwZmVlZjY4MC56aXAvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9zdHlsZS1sb2FkZXItdmlydHVhbC00MDc1NDNlMTMzLzAvY2FjaGUvc3R5bGUtbG9hZGVyLW5wbS0zLjMuMS00YmJiNmVjNzdmLTQ3MGZlZWY2ODAuemlwL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3N0eWxlLWxvYWRlci12aXJ0dWFsLTQwNzU0M2UxMzMvMC9jYWNoZS9zdHlsZS1sb2FkZXItbnBtLTMuMy4xLTRiYmI2ZWM3N2YtNDcwZmVlZjY4MC56aXAvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3N0eWxlLWxvYWRlci12aXJ0dWFsLTQwNzU0M2UxMzMvMC9jYWNoZS9zdHlsZS1sb2FkZXItbnBtLTMuMy4xLTRiYmI2ZWM3N2YtNDcwZmVlZjY4MC56aXAvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2Nzcy1sb2FkZXItdmlydHVhbC0yZGU3ZmFiZDE1LzAvY2FjaGUvY3NzLWxvYWRlci1ucG0tNi43LjMtNjNhYTkzMzQwMC00NzNjYzMyYjZjLnppcC9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi8ueWFybi9jYWNoZS9yZXNvbHZlLXVybC1sb2FkZXItbnBtLTUuMC4wLTliNDQxMDY3YzktNmQ0ODM3MzNhNC56aXAvbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9zYXNzLWxvYWRlci12aXJ0dWFsLWM3Y2E0ZjFkMWEvMC9jYWNoZS9zYXNzLWxvYWRlci1ucG0tMTMuMi4wLTY0MjFjNWZmN2ItZWQ2Y2RiNWY1NS56aXAvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTQudXNlWzNdIS4vX3Jldmlldy5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vY3NzLWxvYWRlci12aXJ0dWFsLTJkZTdmYWJkMTUvMC9jYWNoZS9jc3MtbG9hZGVyLW5wbS02LjcuMy02M2FhOTMzNDAwLTQ3M2NjMzJiNmMuemlwL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uLy55YXJuL2NhY2hlL3Jlc29sdmUtdXJsLWxvYWRlci1ucG0tNS4wLjAtOWI0NDEwNjdjOS02ZDQ4MzczM2E0LnppcC9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Nhc3MtbG9hZGVyLXZpcnR1YWwtYzdjYTRmMWQxYS8wL2NhY2hlL3Nhc3MtbG9hZGVyLW5wbS0xMy4yLjAtNjQyMWM1ZmY3Yi1lZDZjZGI1ZjU1LnppcC9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtNC51c2VbM10hLi9fcmV2aWV3LnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiLi9SZXZpZXdWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTRlZWIzMjYyXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUmV2aWV3VnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qc1wiXG5leHBvcnQgKiBmcm9tIFwiLi9SZXZpZXdWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzXCJcblxuaW1wb3J0IGV4cG9ydENvbXBvbmVudCBmcm9tIFwiL1VzZXJzL2NoYXJsZXNvd2VuL3dlYi9jc2UzMzUvLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWExYTRiMTg3YzMvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNy4wLjEtZjU1MmI4MjgwNS00MmNjOGM4ZmYwLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L2V4cG9ydEhlbHBlci5qc1wiXG5jb25zdCBfX2V4cG9ydHNfXyA9IC8qI19fUFVSRV9fKi9leHBvcnRDb21wb25lbnQoc2NyaXB0LCBbWydyZW5kZXInLHJlbmRlcl0sWydfX2ZpbGUnLFwidmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdWdWUudnVlXCJdXSlcbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIF9fZXhwb3J0c19fLl9faG1ySWQgPSBcIjRlZWIzMjYyXCJcbiAgY29uc3QgYXBpID0gX19WVUVfSE1SX1JVTlRJTUVfX1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghYXBpLmNyZWF0ZVJlY29yZCgnNGVlYjMyNjInLCBfX2V4cG9ydHNfXykpIHtcbiAgICBhcGkucmVsb2FkKCc0ZWViMzI2MicsIF9fZXhwb3J0c19fKVxuICB9XG4gIFxuICBtb2R1bGUuaG90LmFjY2VwdChcIi4vUmV2aWV3VnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00ZWViMzI2MlwiLCAoKSA9PiB7XG4gICAgYXBpLnJlcmVuZGVyKCc0ZWViMzI2MicsIHJlbmRlcilcbiAgfSlcblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IF9fZXhwb3J0c19fIiwiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIi4vUmV2aWV3c1Z1ZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MDk0ZmU0NDdcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9SZXZpZXdzVnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qc1wiXG5leHBvcnQgKiBmcm9tIFwiLi9SZXZpZXdzVnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qc1wiXG5cbmltcG9ydCBleHBvcnRDb21wb25lbnQgZnJvbSBcIi9Vc2Vycy9jaGFybGVzb3dlbi93ZWIvY3NlMzM1Ly55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1hMWE0YjE4N2MzLzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTcuMC4xLWY1NTJiODI4MDUtNDJjYzhjOGZmMC56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9leHBvcnRIZWxwZXIuanNcIlxuY29uc3QgX19leHBvcnRzX18gPSAvKiNfX1BVUkVfXyovZXhwb3J0Q29tcG9uZW50KHNjcmlwdCwgW1sncmVuZGVyJyxyZW5kZXJdLFsnX19maWxlJyxcInZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3c1Z1ZS52dWVcIl1dKVxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgX19leHBvcnRzX18uX19obXJJZCA9IFwiMDk0ZmU0NDdcIlxuICBjb25zdCBhcGkgPSBfX1ZVRV9ITVJfUlVOVElNRV9fXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFhcGkuY3JlYXRlUmVjb3JkKCcwOTRmZTQ0NycsIF9fZXhwb3J0c19fKSkge1xuICAgIGFwaS5yZWxvYWQoJzA5NGZlNDQ3JywgX19leHBvcnRzX18pXG4gIH1cbiAgXG4gIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9SZXZpZXdzVnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wOTRmZTQ0N1wiLCAoKSA9PiB7XG4gICAgYXBpLnJlcmVuZGVyKCcwOTRmZTQ0NycsIHJlbmRlcilcbiAgfSlcblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IF9fZXhwb3J0c19fIiwiZXhwb3J0IHsgZGVmYXVsdCB9IGZyb20gXCItIS4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2JhYmVsLWxvYWRlci12aXJ0dWFsLTU4YTA0M2YzMmEvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTkuMS4wLTY0NjcxNjJjYmYtNzc0NzU4ZmViZC56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMi51c2UhLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWExYTRiMTg3YzMvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNy4wLjEtZjU1MmI4MjgwNS00MmNjOGM4ZmYwLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L2luZGV4LmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzldLnVzZVswXSEuL1Jldmlld1Z1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anNcIjsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vYmFiZWwtbG9hZGVyLXZpcnR1YWwtNThhMDQzZjMyYS8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOS4xLjAtNjQ2NzE2MmNiZi03NzQ3NThmZWJkLnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yLnVzZSEuLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTFhNGIxODdjMy8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE3LjAuMS1mNTUyYjgyODA1LTQyY2M4YzhmZjAuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbOV0udXNlWzBdIS4vUmV2aWV3VnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qc1wiIiwiZXhwb3J0IHsgZGVmYXVsdCB9IGZyb20gXCItIS4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2JhYmVsLWxvYWRlci12aXJ0dWFsLTU4YTA0M2YzMmEvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTkuMS4wLTY0NjcxNjJjYmYtNzc0NzU4ZmViZC56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMi51c2UhLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWExYTRiMTg3YzMvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNy4wLjEtZjU1MmI4MjgwNS00MmNjOGM4ZmYwLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L2luZGV4LmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzldLnVzZVswXSEuL1Jldmlld3NWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzXCI7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2JhYmVsLWxvYWRlci12aXJ0dWFsLTU4YTA0M2YzMmEvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTkuMS4wLTY0NjcxNjJjYmYtNzc0NzU4ZmViZC56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMi51c2UhLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWExYTRiMTg3YzMvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNy4wLjEtZjU1MmI4MjgwNS00MmNjOGM4ZmYwLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L2luZGV4LmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzldLnVzZVswXSEuL1Jldmlld3NWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9iYWJlbC1sb2FkZXItdmlydHVhbC01OGEwNDNmMzJhLzAvY2FjaGUvYmFiZWwtbG9hZGVyLW5wbS05LjEuMC02NDY3MTYyY2JmLTc3NDc1OGZlYmQuemlwL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTIudXNlIS4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1lZmM1ODRhNGJhLzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTcuMC4xLWY1NTJiODI4MDUtNDJjYzhjOGZmMC56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC90ZW1wbGF0ZUxvYWRlci5qcz8/cnVsZVNldFsxXS5ydWxlc1syXSEuLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTFhNGIxODdjMy8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE3LjAuMS1mNTUyYjgyODA1LTQyY2M4YzhmZjAuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbOV0udXNlWzBdIS4vUmV2aWV3VnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00ZWViMzI2MlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vYmFiZWwtbG9hZGVyLXZpcnR1YWwtNThhMDQzZjMyYS8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOS4xLjAtNjQ2NzE2MmNiZi03NzQ3NThmZWJkLnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yLnVzZSEuLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtZWZjNTg0YTRiYS8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE3LjAuMS1mNTUyYjgyODA1LTQyY2M4YzhmZjAuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvdGVtcGxhdGVMb2FkZXIuanM/P3J1bGVTZXRbMV0ucnVsZXNbMl0hLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWExYTRiMTg3YzMvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNy4wLjEtZjU1MmI4MjgwNS00MmNjOGM4ZmYwLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L2luZGV4LmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzldLnVzZVswXSEuL1Jldmlld3NWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTA5NGZlNDQ3XCIiXSwibmFtZXMiOlsiVXNlclZ1ZUJhc2UiLCJwcm9wcyIsImRhdGEiLCJyZXZpZXdpbmciLCJzdWJtaXNzaW9ucyIsIm1vdW50ZWQiLCJzZXRUaXRsZSIsImpzb24iLCJlbGVtZW50IiwiJHJlZnMiLCJlZGl0b3IiLCIkc2l0ZSIsIkVkaXRvciIsImhlaWdodCIsImNsYXNzZXMiLCJzdWJtaXNzaW9uIiwidGFnIiwiaWQiLCJkYXRlIiwibWV0aG9kcyIsInN1Ym1pdCIsInRleHQiLCJ0ZXh0YXJlYSIsInZhbHVlIiwidHJpbSIsIlNpdGUiLCJ0b2FzdCIsInBhcmFtcyIsInR5cGUiLCJhcGkiLCJwb3N0IiwidGhlbiIsInJlc3BvbnNlIiwiaGFzRXJyb3IiLCJnZXREYXRhIiwiYXR0cmlidXRlcyIsImVycm9yIiwiZm9ybWF0VGltZSIsInRpbWUiLCJUaW1lRm9ybWF0dGVyIiwicmVsYXRpdmVVTklYIiwic2hvd1N1Ym1pc3Npb25zIiwicmV2aWV3IiwicGFzdCIsIm1ldGEiLCJwcmV2aWV3SW1nIiwicm9vdCIsImFzc2lnblRhZyIsInJldmlld3MiLCJyZXQiLCJhYnNvbHV0ZVVOSVgiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwicmVmIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9ob2lzdGVkXzEiLCJfaG9pc3RlZF8yIiwiX0ZyYWdtZW50IiwiJHByb3BzIiwiX2hvaXN0ZWRfMyIsIm5hbWUiLCJfaG9pc3RlZF80IiwiX2hvaXN0ZWRfNSIsInNyYyIsIiRvcHRpb25zIiwiX2hvaXN0ZWRfNyIsIl9ob2lzdGVkXzgiLCJtZXRob2QiLCJvblN1Ym1pdCIsIl9ob2lzdGVkXzkiLCJfaG9pc3RlZF8xMCIsIl9ob2lzdGVkXzExIiwiX2N0eCIsImxlbmd0aCIsIl9ob2lzdGVkXzEyIiwiX2hvaXN0ZWRfMTMiLCJfaG9pc3RlZF8xNCIsIl9ob2lzdGVkXzE1IiwiX25vcm1hbGl6ZUNsYXNzIiwicm9sZSIsInVuZGVmaW5lZCIsImJ5IiwiUmV2aWV3VnVlIiwiUmV2aWV3c1Z1ZSIsIlJldmlldyIsInJlYWR5IiwiUGFnZVZ1ZSIsImNyZWF0ZSIsIklubGluZVZ1ZSJdLCJzb3VyY2VSb290IjoiIn0=