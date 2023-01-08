"use strict";
(self["webpackChunkcse335"] = self["webpackChunkcse335"] || []).push([["ReviewConsole"],{

/***/ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _StatusPresent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StatusPresent.vue */ "./vendor/cl/review/js/Console/StatusPresent.vue");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }


/**
 * View for Review assignments. Indicates the assignments of students to review
 * other students and the number of reviews that have been done. Also supports
 * creating new review assignments.
 *
 * /cl/console/review/reviewers/:assignment
 *
 * @constructor ReviewReviewers
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  // This is a standard console comoponent
  'extends': Site.Site.ConsoleComponentBase,
  props: ['assigntag' // The assignment the reviewing is for
  ],

  data: function data() {
    return {
      assignment: null,
      // Object that defines an entire assignment
      reviewerCnt: 2,
      // Number of reviewers to assign for each student
      instructor: Site.Member.INSTRUCTOR,
      reviewers: null,
      // All of the reviews by member ID
      reviewees: null,
      // All of the reviewee by member ID
      maxReviewees: 0,
      // Maximum number of reviewees for any reviewer
      maxReviewers: 0 // Maximum number of reviewers for any reviewee
    };
  },

  components: {
    'membersfetcher': Site.MembersFetcherComponentVue,
    'status-present': _StatusPresent_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  mounted: function mounted() {
    var _this = this;
    // Get the member object for the site user
    var member = this.$store.state.user.user.member;

    // Get the course section and the assignmment we are reviewing (so we know the name)
    this.section = this.$store.getters['course/section'](member.semester, member.section);
    this.assignment = this.section.getAssignment(this.assigntag);

    // Set the console page title
    this.setTitle(': ' + this.assignment.shortname + ' Reviewing');

    // Ask the server for the review assignments (if any)
    this.$site.api.get('/api/review/reviewers/' + this.assigntag, {}).then(function (response) {
      if (!response.hasError()) {
        _this.take(response);
      } else {
        _this.$site.toast(_this, response);
      }
    })["catch"](function (error) {
      _this.$site.toast(_this, error);
    });
  },
  methods: {
    /**
     * Assign new reviewers. This uses a message box to ensure we
     * really want to do this!
     */
    assignReviews: function assignReviews() {
      var _this2 = this;
      if (this.maxReviewees > 0 || this.maxReviewers > 0) {
        new this.$site.Dialog.MessageBox('Are you sure?', 'Are you sure you want to assign reviewers? This will replace the existing reviewing assignments.', this.$site.Dialog.MessageBox.OKCANCEL, function () {
          _this2.assignReviewsActual();
        });
      } else {
        this.assignReviewsActual();
      }
    },
    /**
     * Actually tell the server to assign reviewers
     */
    assignReviewsActual: function assignReviewsActual() {
      var _this3 = this;
      this.reviewers = null;
      this.reviewees = null;
      this.maxReviewees = 0;
      this.maxReviewers = 0;
      var params = {
        cnt: this.reviewerCnt
      };
      this.$site.api.post('/api/review/reviewers/' + this.assigntag, params).then(function (response) {
        if (!response.hasError()) {
          _this3.take(response);
        } else {
          _this3.$site.toast(_this3, response);
        }
      })["catch"](function (error) {
        _this3.$site.toast(_this3, error);
      });
    },
    /**
     * Take a new supplied server response.
     * @param response Response with all reviewers in it.
     */
    take: function take(response) {
      var data = response.getData('reviewers').attributes;

      // For each reviewer and reviewee that we find, we
      // create an array of reviewee and reviewer
      this.reviewers = {};
      this.reviewees = {};

      // This is to keep track of the maximum number of reviewers
      // and reviewees for any member we have so we can create the
      // right number of columns in the results table.
      this.maxReviewees = 0;
      this.maxReviewers = 0;
      var _iterator = _createForOfIteratorHelper(data),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var assign = _step.value;
          var reviewer = +assign[0];
          var reviewee = +assign[1];
          var cnt = +assign[2];

          // If this is the first time we have seen this reviewer
          if (this.reviewers[reviewer] === undefined) {
            this.reviewers[reviewer] = [];
          }
          this.reviewers[reviewer].push([reviewee, cnt]);
          if (this.reviewers[reviewer].length > this.maxReviewees) {
            this.maxReviewees = this.reviewers[reviewer].length;
          }
          if (this.reviewees[reviewee] === undefined) {
            this.reviewees[reviewee] = [];
          }
          this.reviewees[reviewee].push([reviewer, cnt]);
          if (this.reviewees[reviewee].length > this.maxReviewers) {
            this.maxReviewers = this.reviewers[reviewer].length;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    /**
     * Display a user based on the reviewer or reviewee assignments for a user.
     * @param users Collection of all users as fetched from the server
     * @param assign The list is reviewers or reviewees
     * @param i Index into assign for the one we want to display
     * @returns {*|null} User if it exists.
     */
    displayUser: function displayUser(users, assign, i) {
      if (assign === undefined || i >= assign.length) {
        return null;
      }
      var _iterator2 = _createForOfIteratorHelper(users),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var user = _step2.value;
          if (user.member.id === assign[i][0]) {
            return user;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return null;
    },
    /**
     * Choose a class to use for the table cell. This is what
     * makes the cells where there has been no review have a
     * filled green color.
     * @param assign Array of review assignments
     * @param i Index into assign
     * @returns {string|string}
     */
    cls: function cls(assign, i) {
      if (assign === undefined || i >= assign.length) {
        return '';
      }
      return assign[i][1] < 1 ? 'cl-empty' : '';
    }
  }
});

/***/ }),

/***/ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Present reviews by and for a member and the staff reviewing form.
 * @constructor ReviewsByForMemberVue
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['user', 'assigntag'],
  data: function data() {
    return {
      forReviews: [],
      byReviews: [],
      staffRole: Site.Site.Member.STAFF,
      submissions: []
    };
  },
  watch: {
    user: function user() {
      this.forReviews = [];
      this.byReviews = [];
      this.submissions = [];
      this.fetch();
    }
  },
  mounted: function mounted() {
    var element = this.$refs['editor'];
    this.editor = new this.$site.Editor(element, {
      height: '10em',
      classes: ['yellow-pad']
    });
    this.fetch();
  },
  methods: {
    fetch: function fetch() {
      var _this = this;
      this.$site.api.get('/api/review/reviews/' + this.assigntag + '/' + this.user.member.id, {}).then(function (response) {
        if (!response.hasError()) {
          _this.take(response);
        } else {
          _this.$site.toast(_this, response);
        }
      })["catch"](function (error) {
        _this.$site.toast(_this, error);
      });
    },
    take: function take(response) {
      var data = response.getData('reviews-by-for').attributes;
      var submitData = response.getData('assignment-submissions');
      if (submitData !== null) {
        this.submissions = submitData.attributes;
      }
      var _iterator = _createForOfIteratorHelper(data["for"]),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var review = _step.value;
          review.reviewer = new Site.User(review.reviewer);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var _iterator2 = _createForOfIteratorHelper(data.by),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _review = _step2.value;
          _review.reviewee = new Site.User(_review.reviewee);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      this.forReviews = data["for"];
      this.byReviews = data.by;
    },
    submit: function submit() {
      var _this2 = this;
      var text = this.editor.textarea.value.trim();
      if (text === '') {
        Site.toast(this, 'You must enter some text to submit');
        return;
      }
      var submissions = {};
      for (var tag in this.submissions) {
        submissions[tag] = {
          'id': this.submissions[tag][0].id,
          'date': this.submissions[tag][0].date
        };
      }
      var params = {
        type: 'text/plain',
        text: text,
        submissions: submissions
      };
      Site.api.post("/api/review/staffreview/".concat(this.assigntag, "/").concat(this.user.member.id), params).then(function (response) {
        if (!response.hasError()) {
          _this2.editor.textarea.value = '';
          _this2.take(response);
          Site.toast(_this2, "Review successfully saved to the server");
        } else {
          Site.toast(_this2, response);
        }
      })["catch"](function (error) {
        Site.toast(_this2, error);
      });
    },
    formatTime: function formatTime(time) {
      return this.$site.TimeFormatter.relativeUNIX(time, null);
    },
    showSubmissions: function showSubmissions(review) {
      var submissions = review.meta.review.submissions;
      var ret = '';
      for (var tag in submissions) {
        ret += this.$site.TimeFormatter.absoluteUNIX(submissions[tag].date);
      }
      if (ret === '') {
        return '';
      }
      return 'Submission: ' + ret;
    }
  }
});

/***/ }),

/***/ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @constructor StatusPresentVue
 * Displays the status of a reviewer or reviewee.
 * Used by ReviewReviewers.vue
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'extends': Site.Site.ConsoleComponentBase,
  props: ['assigntag', 'statusUser', 'count']
});

/***/ }),

/***/ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "full cl-reviewing"
};
var _hoisted_3 = {
  key: 0
};
var _hoisted_4 = {
  "class": "center"
};
var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
  type: "submit"
}, "Assign Reviews", -1 /* HOISTED */);
var _hoisted_6 = ["value"];
var _hoisted_7 = {
  "class": "small"
};
var _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Name", -1 /* HOISTED */);
var _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "User ID", -1 /* HOISTED */);
var _hoisted_10 = {
  "class": "small"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-link");
  var _component_status_present = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("status-present");
  var _component_membersfetcher = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("membersfetcher");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_membersfetcher, {
    fetching: _ctx.reviewers === null
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (fetcher) {
      return [_ctx.user.atLeast(_ctx.instructor) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
        method: "post",
        onSubmit: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
          return $options.assignReviews && $options.assignReviews.apply($options, arguments);
        }, ["prevent"]))
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_4, [_hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          return _ctx.reviewerCnt = $event;
        })
      }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(6, function (num) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
          value: num
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(num), 9 /* TEXT, PROPS */, _hoisted_6);
      }), 64 /* STABLE_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.reviewerCnt]])])], 32 /* HYDRATE_EVENTS */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [_hoisted_8, _hoisted_9, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.maxReviewees, function (i) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("th", null, "reviewee");
      }), 256 /* UNKEYED_FRAGMENT */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.maxReviewers, function (i) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("th", null, "reviewer");
      }), 256 /* UNKEYED_FRAGMENT */))]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(fetcher.users, function (user) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_link, {
          title: user.name,
          to: _ctx.root + '/cl/console/grading/' + $props.assigntag + '/' + user.member.id
        }, {
          "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
            return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.name), 1 /* TEXT */)];
          }),

          _: 2 /* DYNAMIC */
        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["title", "to"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_link, {
          title: user.name,
          to: _ctx.root + '/cl/console/grading/' + $props.assigntag + '/' + user.member.id
        }, {
          "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
            return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.userId), 1 /* TEXT */)];
          }),

          _: 2 /* DYNAMIC */
        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["title", "to"])]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.maxReviewees, function (i) {
          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("td", {
            "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($options.cls(_ctx.reviewers[user.member.id], i - 1))
          }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_status_present, {
            assigntag: $props.assigntag,
            "status-user": $options.displayUser(fetcher.users, _ctx.reviewers[user.member.id], i - 1),
            count: _ctx.reviewers[user.member.id] !== undefined ? _ctx.reviewers[user.member.id][i - 1][1] : 0
          }, null, 8 /* PROPS */, ["assigntag", "status-user", "count"])], 2 /* CLASS */);
        }), 256 /* UNKEYED_FRAGMENT */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.maxReviewers, function (i) {
          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("td", {
            "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($options.cls(_ctx.reviewees[user.member.id], i - 1))
          }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_status_present, {
            assigntag: $props.assigntag,
            "status-user": $options.displayUser(fetcher.users, _ctx.reviewees[user.member.id], i - 1),
            count: _ctx.reviewees[user.member.id] !== undefined ? _ctx.reviewees[user.member.id][i - 1][1] : 0
          }, null, 8 /* PROPS */, ["assigntag", "status-user", "count"])], 2 /* CLASS */);
        }), 256 /* UNKEYED_FRAGMENT */))]);
      }), 256 /* UNKEYED_FRAGMENT */))])];
    }),

    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["fetching"])])]);
}

/***/ }),

/***/ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76 ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./.yarn/cache/vue-npm-3.2.45-06b4b60efe-df60ca80cb.zip/node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "cl-reviews"
};
var _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, "Staff Review", -1 /* HOISTED */);
var _hoisted_3 = {
  ref: "editor"
};
var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
  type: "submit",
  value: "Submit Review"
})], -1 /* HOISTED */);
var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Reviews by this user.", -1 /* HOISTED */);
var _hoisted_6 = {
  key: 0,
  "class": "center"
};
var _hoisted_7 = {
  "class": "cl-review"
};
var _hoisted_8 = {
  "class": "cl-submitted"
};
var _hoisted_9 = {
  "class": "cl-review-present"
};
var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Reviews of this user's assignment.", -1 /* HOISTED */);
var _hoisted_11 = {
  key: 1,
  "class": "center"
};
var _hoisted_12 = {
  "class": "cl-review"
};
var _hoisted_13 = {
  key: 0
};
var _hoisted_14 = {
  key: 1
};
var _hoisted_15 = {
  "class": "cl-submitted"
};
var _hoisted_16 = {
  "class": "cl-review-present"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    method: "post",
    onSubmit: _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
      return $options.submit && $options.submit.apply($options, arguments);
    }, ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, null, 512 /* NEED_PATCH */), _hoisted_4], 32 /* HYDRATE_EVENTS */), _hoisted_5, _ctx.byReviews.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_6, "None")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.byReviews, function (review) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(review.reviewee.atLeast(_ctx.staffRole) ? 'staff' : '')
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime(review.time)) + " Review by " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(review.reviewee.name) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.showSubmissions(review)), 1 /* TEXT */)], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(review.meta.review.review), 1 /* TEXT */)]);
  }), 256 /* UNKEYED_FRAGMENT */)), _hoisted_10, _ctx.forReviews.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_11, "None")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.forReviews, function (review) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(review.reviewer.atLeast(_ctx.staffRole) ? 'staff' : '')
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime(review.time)) + " ", 1 /* TEXT */), review.reviewer.atLeast(_ctx.staffRole) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_13, "Staff Review")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_14, "Review")), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" by " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(review.reviewer.name) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.showSubmissions(review)), 1 /* TEXT */)], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(review.meta.review.review), 1 /* TEXT */)]);
  }), 256 /* UNKEYED_FRAGMENT */))]);
}

/***/ }),

/***/ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=template&id=4445c565":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=template&id=4445c565 ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./.yarn/cache/vue-npm-3.2.45-06b4b60efe-df60ca80cb.zip/node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-link");
  return $props.statusUser !== null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_router_link, {
    key: 0,
    to: _ctx.root + '/cl/console/grading/' + $props.assigntag + '/' + $props.statusUser.member.id,
    title: $props.statusUser.name
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.statusUser.userId) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.count), 1 /* TEXT */)];
    }),

    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["to", "title"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true);
}

/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewConsole.js":
/*!******************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewConsole.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReviewConsole": () => (/* binding */ ReviewConsole)
/* harmony export */ });
/* harmony import */ var _ReviewReviewers_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewReviewers.vue */ "./vendor/cl/review/js/Console/ReviewReviewers.vue");
/* harmony import */ var _ReviewsByForMember_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReviewsByForMember.vue */ "./vendor/cl/review/js/Console/ReviewsByForMember.vue");



/**
 * Review system console components
 * @constructor
 */
var ReviewConsole = function ReviewConsole() {};
ReviewConsole.setup = function (Console) {
  Console.Review = {
    'reviewsbyfor': _ReviewsByForMember_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  };
  Console.tables.add({
    title: 'Review',
    order: 70,
    api: '/api/review/tables'
  });
  Console.components.addRoute({
    route: '/review/reviewers/:assigntag',
    component: _ReviewReviewers_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    props: true
  });
  Console.course.assignmentLink('review', 'reviewers', '/review/reviewers/:assigntag');
};

/***/ }),

/***/ "./vendor/cl/review/js/Console/index.js":
/*!**********************************************!*\
  !*** ./vendor/cl/review/js/Console/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _review_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_review.scss */ "./vendor/cl/review/_review.scss");
/* harmony import */ var _ReviewConsole__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReviewConsole */ "./vendor/cl/review/js/Console/ReviewConsole.js");
/*
 * The Review Console system entry point
 */



if (Site.Console && !Site.Console.Review) {
  //
  // Install the console components
  //
  _ReviewConsole__WEBPACK_IMPORTED_MODULE_1__.ReviewConsole.setup(Site.Console);
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

/***/ "./vendor/cl/review/js/Console/ReviewReviewers.vue":
/*!*********************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewReviewers.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ReviewReviewers_vue_vue_type_template_id_bec5dfdc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewReviewers.vue?vue&type=template&id=bec5dfdc */ "./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc");
/* harmony import */ var _ReviewReviewers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReviewReviewers.vue?vue&type=script&lang=js */ "./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js");
/* harmony import */ var _Users_charlesowen_web_cse335_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/exportHelper.js */ "./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Users_charlesowen_web_cse335_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_ReviewReviewers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ReviewReviewers_vue_vue_type_template_id_bec5dfdc__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"vendor/cl/review/js/Console/ReviewReviewers.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewsByForMember.vue":
/*!************************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewsByForMember.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ReviewsByForMember_vue_vue_type_template_id_7b36fe76__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewsByForMember.vue?vue&type=template&id=7b36fe76 */ "./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76");
/* harmony import */ var _ReviewsByForMember_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReviewsByForMember.vue?vue&type=script&lang=js */ "./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js");
/* harmony import */ var _Users_charlesowen_web_cse335_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/exportHelper.js */ "./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Users_charlesowen_web_cse335_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_ReviewsByForMember_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ReviewsByForMember_vue_vue_type_template_id_7b36fe76__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"vendor/cl/review/js/Console/ReviewsByForMember.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./vendor/cl/review/js/Console/StatusPresent.vue":
/*!*******************************************************!*\
  !*** ./vendor/cl/review/js/Console/StatusPresent.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _StatusPresent_vue_vue_type_template_id_4445c565__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StatusPresent.vue?vue&type=template&id=4445c565 */ "./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=template&id=4445c565");
/* harmony import */ var _StatusPresent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StatusPresent.vue?vue&type=script&lang=js */ "./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=script&lang=js");
/* harmony import */ var _Users_charlesowen_web_cse335_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/exportHelper.js */ "./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Users_charlesowen_web_cse335_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_StatusPresent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_StatusPresent_vue_vue_type_template_id_4445c565__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"vendor/cl/review/js/Console/StatusPresent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js":
/*!*********************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_ReviewReviewers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_ReviewReviewers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!../../../../../.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./ReviewReviewers.vue?vue&type=script&lang=js */ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js":
/*!************************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_ReviewsByForMember_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_ReviewsByForMember_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!../../../../../.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./ReviewsByForMember.vue?vue&type=script&lang=js */ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=script&lang=js":
/*!*******************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=script&lang=js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_StatusPresent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_StatusPresent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!../../../../../.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./StatusPresent.vue?vue&type=script&lang=js */ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc":
/*!***************************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_efc584a4ba_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_ReviewReviewers_vue_vue_type_template_id_bec5dfdc__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_efc584a4ba_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_ReviewReviewers_vue_vue_type_template_id_bec5dfdc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!../../../../../.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./ReviewReviewers.vue?vue&type=template&id=bec5dfdc */ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc");


/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76":
/*!******************************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76 ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_efc584a4ba_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_ReviewsByForMember_vue_vue_type_template_id_7b36fe76__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_efc584a4ba_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_ReviewsByForMember_vue_vue_type_template_id_7b36fe76__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!../../../../../.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./ReviewsByForMember.vue?vue&type=template&id=7b36fe76 */ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76");


/***/ }),

/***/ "./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=template&id=4445c565":
/*!*************************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=template&id=4445c565 ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_efc584a4ba_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_StatusPresent_vue_vue_type_template_id_4445c565__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_babel_loader_virtual_58a043f32a_0_cache_babel_loader_npm_9_1_0_6467162cbf_774758febd_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_use_yarn_virtual_vue_loader_virtual_efc584a4ba_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_yarn_virtual_vue_loader_virtual_a1a4b187c3_0_cache_vue_loader_npm_17_0_1_f552b82805_42cc8c8ff0_zip_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_9_use_0_StatusPresent_vue_vue_type_template_id_4445c565__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!../../../../../.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./StatusPresent.vue?vue&type=template&id=4445c565 */ "./.yarn/__virtual__/babel-loader-virtual-58a043f32a/0/cache/babel-loader-npm-9.1.0-6467162cbf-774758febd.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2.use!./.yarn/__virtual__/vue-loader-virtual-efc584a4ba/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./.yarn/__virtual__/vue-loader-virtual-a1a4b187c3/0/cache/vue-loader-npm-17.0.1-f552b82805-42cc8c8ff0.zip/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[9].use[0]!./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=template&id=4445c565");


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor","Console","Course","Users","common"], () => (__webpack_exec__("./vendor/cl/review/js/Console/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FDdEJnRTtBQUNWO0FBQ0w7O0FBRWhFLENBQWdOO0FBQ2hOLGlDQUFpQyx5TkFBZSxDQUFDLHVGQUFNLGFBQWEseUZBQU07QUFDMUU7QUFDQSxJQUFJLEtBQVUsRUFBRSxFQVlmOzs7QUFHRCxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0QjJEO0FBQ1Y7QUFDTDs7QUFFM0QsQ0FBZ047QUFDaE4saUNBQWlDLHlOQUFlLENBQUMsa0ZBQU0sYUFBYSxvRkFBTTtBQUMxRTtBQUNBLElBQUksS0FBVSxFQUFFLEVBWWY7OztBQUdELGlFQUFlOzs7Ozs7Ozs7Ozs7Ozs7QUN0QjBhOzs7Ozs7Ozs7Ozs7Ozs7QUNBRzs7Ozs7Ozs7Ozs7Ozs7O0FDQUwiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jc2UzMzUvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3UmV2aWV3ZXJzLnZ1ZSIsIndlYnBhY2s6Ly9jc2UzMzUvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZSIsIndlYnBhY2s6Ly9jc2UzMzUvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvU3RhdHVzUHJlc2VudC52dWUiLCJ3ZWJwYWNrOi8vY3NlMzM1Ly4vdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1Jldmlld0NvbnNvbGUuanMiLCJ3ZWJwYWNrOi8vY3NlMzM1Ly4vdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL2luZGV4LmpzIiwid2VicGFjazovL2NzZTMzNS8uL3ZlbmRvci9jbC9yZXZpZXcvX3Jldmlldy5zY3NzIiwid2VicGFjazovL2NzZTMzNS8uL3ZlbmRvci9jbC9yZXZpZXcvX3Jldmlldy5zY3NzPzg2NWIiLCJ3ZWJwYWNrOi8vY3NlMzM1Ly4vdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1Jldmlld1Jldmlld2Vycy52dWU/NWUzNCIsIndlYnBhY2s6Ly9jc2UzMzUvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZT83NWRjIiwid2VicGFjazovL2NzZTMzNS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9TdGF0dXNQcmVzZW50LnZ1ZT8zMGFjIiwid2VicGFjazovL2NzZTMzNS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdSZXZpZXdlcnMudnVlPzY1ZDUiLCJ3ZWJwYWNrOi8vY3NlMzM1Ly4vdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1Jldmlld3NCeUZvck1lbWJlci52dWU/MzhlZiIsIndlYnBhY2s6Ly9jc2UzMzUvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvU3RhdHVzUHJlc2VudC52dWU/MmQ5NCIsIndlYnBhY2s6Ly9jc2UzMzUvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3UmV2aWV3ZXJzLnZ1ZT9mOTg4Iiwid2VicGFjazovL2NzZTMzNS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdzQnlGb3JNZW1iZXIudnVlPzc2YjQiLCJ3ZWJwYWNrOi8vY3NlMzM1Ly4vdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1N0YXR1c1ByZXNlbnQudnVlPzExMWMiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxuICAgIDxkaXYgY2xhc3M9XCJmdWxsIGNsLXJldmlld2luZ1wiPlxuXG4gICAgICA8bWVtYmVyc2ZldGNoZXIgOmZldGNoaW5nPVwicmV2aWV3ZXJzID09PSBudWxsXCI+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q9XCJmZXRjaGVyXCI+XG4gICAgICAgICAgPGRpdiB2LWlmPVwidXNlci5hdExlYXN0KGluc3RydWN0b3IpXCI+XG4gICAgICAgICAgICA8Zm9ybSBtZXRob2Q9XCJwb3N0XCIgQHN1Ym1pdC5wcmV2ZW50PVwiYXNzaWduUmV2aWV3c1wiPlxuICAgICAgICAgICAgICA8cCBjbGFzcz1cImNlbnRlclwiPjxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkFzc2lnbiBSZXZpZXdzPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPHNlbGVjdCB2LW1vZGVsPVwicmV2aWV3ZXJDbnRcIj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdi1mb3I9XCJudW0gaW4gNlwiIDp2YWx1ZT1cIm51bVwiPnt7bnVtfX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPHRhYmxlIGNsYXNzPVwic21hbGxcIj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRoPk5hbWU8L3RoPlxuICAgICAgICAgICAgICA8dGg+VXNlciBJRDwvdGg+XG4gICAgICAgICAgICAgIDx0aCB2LWZvcj1cImkgaW4gbWF4UmV2aWV3ZWVzXCI+cmV2aWV3ZWU8L3RoPlxuICAgICAgICAgICAgICA8dGggdi1mb3I9XCJpIGluIG1heFJldmlld2Vyc1wiPnJldmlld2VyPC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8dHIgdi1mb3I9XCJ1c2VyIGluIGZldGNoZXIudXNlcnNcIj5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwic21hbGxcIj5cbiAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgOnRpdGxlPVwidXNlci5uYW1lXCIgOnRvPVwicm9vdCArICcvY2wvY29uc29sZS9ncmFkaW5nLycgKyBhc3NpZ250YWcgKyAnLycgKyB1c2VyLm1lbWJlci5pZFwiPlxuICAgICAgICAgICAgICAgICAge3t1c2VyLm5hbWV9fVxuICAgICAgICAgICAgICAgIDwvcm91dGVyLWxpbms+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgOnRpdGxlPVwidXNlci5uYW1lXCIgOnRvPVwicm9vdCArICcvY2wvY29uc29sZS9ncmFkaW5nLycgKyBhc3NpZ250YWcgKyAnLycgKyB1c2VyLm1lbWJlci5pZFwiPlxuICAgICAgICAgICAgICAgICAge3t1c2VyLnVzZXJJZH19XG4gICAgICAgICAgICAgICAgPC9yb3V0ZXItbGluaz5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPHRkIHYtZm9yPVwiaSBpbiBtYXhSZXZpZXdlZXNcIiA6Y2xhc3M9XCJjbHMocmV2aWV3ZXJzW3VzZXIubWVtYmVyLmlkXSwgaS0xKVwiPlxuICAgICAgICAgICAgICAgIDxzdGF0dXMtcHJlc2VudCA6YXNzaWdudGFnPVwiYXNzaWdudGFnXCIgOnN0YXR1cy11c2VyPVwiZGlzcGxheVVzZXIoZmV0Y2hlci51c2VycywgcmV2aWV3ZXJzW3VzZXIubWVtYmVyLmlkXSwgaS0xKVwiIDpjb3VudD1cInJldmlld2Vyc1t1c2VyLm1lbWJlci5pZF0gIT09IHVuZGVmaW5lZCA/IHJldmlld2Vyc1t1c2VyLm1lbWJlci5pZF1baS0xXVsxXSA6IDBcIj48L3N0YXR1cy1wcmVzZW50PlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8dGQgdi1mb3I9XCJpIGluIG1heFJldmlld2Vyc1wiIDpjbGFzcz1cImNscyhyZXZpZXdlZXNbdXNlci5tZW1iZXIuaWRdLCBpLTEpXCI+XG4gICAgICAgICAgICAgICAgPHN0YXR1cy1wcmVzZW50IDphc3NpZ250YWc9XCJhc3NpZ250YWdcIiA6c3RhdHVzLXVzZXI9XCJkaXNwbGF5VXNlcihmZXRjaGVyLnVzZXJzLCByZXZpZXdlZXNbdXNlci5tZW1iZXIuaWRdLCBpLTEpXCIgOmNvdW50PVwicmV2aWV3ZWVzW3VzZXIubWVtYmVyLmlkXSAhPT0gdW5kZWZpbmVkID8gcmV2aWV3ZWVzW3VzZXIubWVtYmVyLmlkXVtpLTFdWzFdIDogMFwiPjwvc3RhdHVzLXByZXNlbnQ+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgPC9tZW1iZXJzZmV0Y2hlcj5cblxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cbmltcG9ydCBTdGF0dXNQcmVzZW50VnVlIGZyb20gJy4vU3RhdHVzUHJlc2VudC52dWUnO1xuXG4vKipcbiAqIFZpZXcgZm9yIFJldmlldyBhc3NpZ25tZW50cy4gSW5kaWNhdGVzIHRoZSBhc3NpZ25tZW50cyBvZiBzdHVkZW50cyB0byByZXZpZXdcbiAqIG90aGVyIHN0dWRlbnRzIGFuZCB0aGUgbnVtYmVyIG9mIHJldmlld3MgdGhhdCBoYXZlIGJlZW4gZG9uZS4gQWxzbyBzdXBwb3J0c1xuICogY3JlYXRpbmcgbmV3IHJldmlldyBhc3NpZ25tZW50cy5cbiAqXG4gKiAvY2wvY29uc29sZS9yZXZpZXcvcmV2aWV3ZXJzLzphc3NpZ25tZW50XG4gKlxuICogQGNvbnN0cnVjdG9yIFJldmlld1Jldmlld2Vyc1xuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8vIFRoaXMgaXMgYSBzdGFuZGFyZCBjb25zb2xlIGNvbW9wb25lbnRcbiAgJ2V4dGVuZHMnOiBTaXRlLlNpdGUuQ29uc29sZUNvbXBvbmVudEJhc2UsXG4gIHByb3BzOiBbXG4gICAgICAnYXNzaWdudGFnJyAgICAgLy8gVGhlIGFzc2lnbm1lbnQgdGhlIHJldmlld2luZyBpcyBmb3JcbiAgXSxcbiAgZGF0YTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhc3NpZ25tZW50OiBudWxsLCAvLyBPYmplY3QgdGhhdCBkZWZpbmVzIGFuIGVudGlyZSBhc3NpZ25tZW50XG4gICAgICByZXZpZXdlckNudDogMiwgICAvLyBOdW1iZXIgb2YgcmV2aWV3ZXJzIHRvIGFzc2lnbiBmb3IgZWFjaCBzdHVkZW50XG4gICAgICBpbnN0cnVjdG9yOiBTaXRlLk1lbWJlci5JTlNUUlVDVE9SLFxuICAgICAgcmV2aWV3ZXJzOiBudWxsLCAgLy8gQWxsIG9mIHRoZSByZXZpZXdzIGJ5IG1lbWJlciBJRFxuICAgICAgcmV2aWV3ZWVzOiBudWxsLCAgLy8gQWxsIG9mIHRoZSByZXZpZXdlZSBieSBtZW1iZXIgSURcbiAgICAgIG1heFJldmlld2VlczogMCwgIC8vIE1heGltdW0gbnVtYmVyIG9mIHJldmlld2VlcyBmb3IgYW55IHJldmlld2VyXG4gICAgICBtYXhSZXZpZXdlcnM6IDAgICAvLyBNYXhpbXVtIG51bWJlciBvZiByZXZpZXdlcnMgZm9yIGFueSByZXZpZXdlZVxuICAgIH1cbiAgfSxcbiAgY29tcG9uZW50czoge1xuICAgICdtZW1iZXJzZmV0Y2hlcic6IFNpdGUuTWVtYmVyc0ZldGNoZXJDb21wb25lbnRWdWUsXG4gICAgJ3N0YXR1cy1wcmVzZW50JzogU3RhdHVzUHJlc2VudFZ1ZVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIC8vIEdldCB0aGUgbWVtYmVyIG9iamVjdCBmb3IgdGhlIHNpdGUgdXNlclxuICAgIGNvbnN0IG1lbWJlciA9IHRoaXMuJHN0b3JlLnN0YXRlLnVzZXIudXNlci5tZW1iZXI7XG5cbiAgICAvLyBHZXQgdGhlIGNvdXJzZSBzZWN0aW9uIGFuZCB0aGUgYXNzaWdubW1lbnQgd2UgYXJlIHJldmlld2luZyAoc28gd2Uga25vdyB0aGUgbmFtZSlcbiAgICB0aGlzLnNlY3Rpb24gPSB0aGlzLiRzdG9yZS5nZXR0ZXJzWydjb3Vyc2Uvc2VjdGlvbiddKG1lbWJlci5zZW1lc3RlciwgbWVtYmVyLnNlY3Rpb24pO1xuICAgIHRoaXMuYXNzaWdubWVudCA9IHRoaXMuc2VjdGlvbi5nZXRBc3NpZ25tZW50KHRoaXMuYXNzaWdudGFnKTtcblxuICAgIC8vIFNldCB0aGUgY29uc29sZSBwYWdlIHRpdGxlXG4gICAgdGhpcy5zZXRUaXRsZSgnOiAnICsgdGhpcy5hc3NpZ25tZW50LnNob3J0bmFtZSArICcgUmV2aWV3aW5nJyk7XG5cbiAgICAvLyBBc2sgdGhlIHNlcnZlciBmb3IgdGhlIHJldmlldyBhc3NpZ25tZW50cyAoaWYgYW55KVxuICAgIHRoaXMuJHNpdGUuYXBpLmdldCgnL2FwaS9yZXZpZXcvcmV2aWV3ZXJzLycgKyB0aGlzLmFzc2lnbnRhZywge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmICghcmVzcG9uc2UuaGFzRXJyb3IoKSkge1xuICAgICAgICAgICAgdGhpcy50YWtlKHJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kc2l0ZS50b2FzdCh0aGlzLCByZXNwb25zZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aGlzLiRzaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcbiAgICAgICAgfSk7XG5cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIC8qKlxuICAgICAqIEFzc2lnbiBuZXcgcmV2aWV3ZXJzLiBUaGlzIHVzZXMgYSBtZXNzYWdlIGJveCB0byBlbnN1cmUgd2VcbiAgICAgKiByZWFsbHkgd2FudCB0byBkbyB0aGlzIVxuICAgICAqL1xuICAgIGFzc2lnblJldmlld3MoKSB7XG4gICAgICBpZiAodGhpcy5tYXhSZXZpZXdlZXMgPiAwIHx8IHRoaXMubWF4UmV2aWV3ZXJzID4gMCkge1xuICAgICAgICBuZXcgdGhpcy4kc2l0ZS5EaWFsb2cuTWVzc2FnZUJveCgnQXJlIHlvdSBzdXJlPycsICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gYXNzaWduIHJldmlld2Vycz8gVGhpcyB3aWxsIHJlcGxhY2UgdGhlIGV4aXN0aW5nIHJldmlld2luZyBhc3NpZ25tZW50cy4nLFxuICAgICAgICAgICAgdGhpcy4kc2l0ZS5EaWFsb2cuTWVzc2FnZUJveC5PS0NBTkNFTCwgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmFzc2lnblJldmlld3NBY3R1YWwoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hc3NpZ25SZXZpZXdzQWN0dWFsKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBBY3R1YWxseSB0ZWxsIHRoZSBzZXJ2ZXIgdG8gYXNzaWduIHJldmlld2Vyc1xuICAgICAqL1xuICAgIGFzc2lnblJldmlld3NBY3R1YWwoKSB7XG4gICAgICB0aGlzLnJldmlld2VycyA9IG51bGw7XG4gICAgICB0aGlzLnJldmlld2VlcyA9IG51bGw7XG4gICAgICB0aGlzLm1heFJldmlld2VlcyA9IDA7XG4gICAgICB0aGlzLm1heFJldmlld2VycyA9IDA7XG5cbiAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgIGNudDogdGhpcy5yZXZpZXdlckNudFxuICAgICAgfVxuICAgICAgdGhpcy4kc2l0ZS5hcGkucG9zdCgnL2FwaS9yZXZpZXcvcmV2aWV3ZXJzLycgKyB0aGlzLmFzc2lnbnRhZywgcGFyYW1zKVxuICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5oYXNFcnJvcigpKSB7XG4gICAgICAgICAgICAgIHRoaXMudGFrZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLiRzaXRlLnRvYXN0KHRoaXMsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhpcy4kc2l0ZS50b2FzdCh0aGlzLCBlcnJvcik7XG4gICAgICAgICAgfSk7XG5cbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFRha2UgYSBuZXcgc3VwcGxpZWQgc2VydmVyIHJlc3BvbnNlLlxuICAgICAqIEBwYXJhbSByZXNwb25zZSBSZXNwb25zZSB3aXRoIGFsbCByZXZpZXdlcnMgaW4gaXQuXG4gICAgICovXG4gICAgdGFrZShyZXNwb25zZSkge1xuICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmdldERhdGEoJ3Jldmlld2VycycpLmF0dHJpYnV0ZXNcblxuICAgICAgLy8gRm9yIGVhY2ggcmV2aWV3ZXIgYW5kIHJldmlld2VlIHRoYXQgd2UgZmluZCwgd2VcbiAgICAgIC8vIGNyZWF0ZSBhbiBhcnJheSBvZiByZXZpZXdlZSBhbmQgcmV2aWV3ZXJcbiAgICAgIHRoaXMucmV2aWV3ZXJzID0ge31cbiAgICAgIHRoaXMucmV2aWV3ZWVzID0ge31cblxuICAgICAgLy8gVGhpcyBpcyB0byBrZWVwIHRyYWNrIG9mIHRoZSBtYXhpbXVtIG51bWJlciBvZiByZXZpZXdlcnNcbiAgICAgIC8vIGFuZCByZXZpZXdlZXMgZm9yIGFueSBtZW1iZXIgd2UgaGF2ZSBzbyB3ZSBjYW4gY3JlYXRlIHRoZVxuICAgICAgLy8gcmlnaHQgbnVtYmVyIG9mIGNvbHVtbnMgaW4gdGhlIHJlc3VsdHMgdGFibGUuXG4gICAgICB0aGlzLm1heFJldmlld2VlcyA9IDBcbiAgICAgIHRoaXMubWF4UmV2aWV3ZXJzID0gMFxuXG4gICAgICBmb3IgKGxldCBhc3NpZ24gb2YgZGF0YSkge1xuICAgICAgICBjb25zdCByZXZpZXdlciA9ICthc3NpZ25bMF07XG4gICAgICAgIGNvbnN0IHJldmlld2VlID0gK2Fzc2lnblsxXTtcbiAgICAgICAgY29uc3QgY250ID0gK2Fzc2lnblsyXTtcblxuICAgICAgICAvLyBJZiB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lIHdlIGhhdmUgc2VlbiB0aGlzIHJldmlld2VyXG4gICAgICAgIGlmICh0aGlzLnJldmlld2Vyc1tyZXZpZXdlcl0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMucmV2aWV3ZXJzW3Jldmlld2VyXSA9IFtdO1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLnJldmlld2Vyc1tyZXZpZXdlcl0ucHVzaChbcmV2aWV3ZWUsIGNudF0pO1xuICAgICAgICBpZiAodGhpcy5yZXZpZXdlcnNbcmV2aWV3ZXJdLmxlbmd0aCA+IHRoaXMubWF4UmV2aWV3ZWVzKSB7XG4gICAgICAgICAgdGhpcy5tYXhSZXZpZXdlZXMgPSB0aGlzLnJldmlld2Vyc1tyZXZpZXdlcl0ubGVuZ3RoO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodGhpcy5yZXZpZXdlZXNbcmV2aWV3ZWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLnJldmlld2Vlc1tyZXZpZXdlZV0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmV2aWV3ZWVzW3Jldmlld2VlXS5wdXNoKFtyZXZpZXdlciwgY250XSk7XG4gICAgICAgIGlmICh0aGlzLnJldmlld2Vlc1tyZXZpZXdlZV0ubGVuZ3RoID4gdGhpcy5tYXhSZXZpZXdlcnMpIHtcbiAgICAgICAgICB0aGlzLm1heFJldmlld2VycyA9IHRoaXMucmV2aWV3ZXJzW3Jldmlld2VyXS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH0sXG4gICAgLyoqXG4gICAgICogRGlzcGxheSBhIHVzZXIgYmFzZWQgb24gdGhlIHJldmlld2VyIG9yIHJldmlld2VlIGFzc2lnbm1lbnRzIGZvciBhIHVzZXIuXG4gICAgICogQHBhcmFtIHVzZXJzIENvbGxlY3Rpb24gb2YgYWxsIHVzZXJzIGFzIGZldGNoZWQgZnJvbSB0aGUgc2VydmVyXG4gICAgICogQHBhcmFtIGFzc2lnbiBUaGUgbGlzdCBpcyByZXZpZXdlcnMgb3IgcmV2aWV3ZWVzXG4gICAgICogQHBhcmFtIGkgSW5kZXggaW50byBhc3NpZ24gZm9yIHRoZSBvbmUgd2Ugd2FudCB0byBkaXNwbGF5XG4gICAgICogQHJldHVybnMgeyp8bnVsbH0gVXNlciBpZiBpdCBleGlzdHMuXG4gICAgICovXG4gICAgZGlzcGxheVVzZXIodXNlcnMsIGFzc2lnbiwgaSkge1xuICAgICAgaWYgKGFzc2lnbiA9PT0gdW5kZWZpbmVkIHx8IGkgPj0gYXNzaWduLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgdXNlciBvZiB1c2Vycykge1xuICAgICAgICBpZiAodXNlci5tZW1iZXIuaWQgPT09IGFzc2lnbltpXVswXSkge1xuICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQ2hvb3NlIGEgY2xhc3MgdG8gdXNlIGZvciB0aGUgdGFibGUgY2VsbC4gVGhpcyBpcyB3aGF0XG4gICAgICogbWFrZXMgdGhlIGNlbGxzIHdoZXJlIHRoZXJlIGhhcyBiZWVuIG5vIHJldmlldyBoYXZlIGFcbiAgICAgKiBmaWxsZWQgZ3JlZW4gY29sb3IuXG4gICAgICogQHBhcmFtIGFzc2lnbiBBcnJheSBvZiByZXZpZXcgYXNzaWdubWVudHNcbiAgICAgKiBAcGFyYW0gaSBJbmRleCBpbnRvIGFzc2lnblxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8c3RyaW5nfVxuICAgICAqL1xuICAgIGNscyhhc3NpZ24sIGkpIHtcbiAgICAgIGlmIChhc3NpZ24gPT09IHVuZGVmaW5lZCB8fCBpID49IGFzc2lnbi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXNzaWduW2ldWzFdIDwgMSA/ICdjbC1lbXB0eScgOiAnJztcblxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJjbC1yZXZpZXdzXCI+XG4gICAgPGgyPlN0YWZmIFJldmlldzwvaDI+XG4gICAgPGZvcm0gbWV0aG9kPVwicG9zdFwiIEBzdWJtaXQucHJldmVudD1cInN1Ym1pdFwiPlxuICAgICAgPGRpdiByZWY9XCJlZGl0b3JcIj48L2Rpdj5cbiAgICAgIDxwPjxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJTdWJtaXQgUmV2aWV3XCI+PC9wPlxuICAgIDwvZm9ybT5cblxuICAgIDxoMz5SZXZpZXdzIGJ5IHRoaXMgdXNlci48L2gzPlxuICAgIDxwIHYtaWY9XCJieVJldmlld3MubGVuZ3RoICA9PT0gMFwiIGNsYXNzPVwiY2VudGVyXCI+Tm9uZTwvcD5cbiAgICA8ZGl2IHYtZm9yPVwicmV2aWV3IGluIGJ5UmV2aWV3c1wiIGNsYXNzPVwiY2wtcmV2aWV3XCI+XG4gICAgICA8aDMgOmNsYXNzPVwicmV2aWV3LnJldmlld2VlLmF0TGVhc3Qoc3RhZmZSb2xlKSA/ICdzdGFmZicgOiAnJ1wiPnt7Zm9ybWF0VGltZShyZXZpZXcudGltZSl9fSBSZXZpZXcgYnkge3tyZXZpZXcucmV2aWV3ZWUubmFtZX19XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2wtc3VibWl0dGVkXCI+e3tzaG93U3VibWlzc2lvbnMocmV2aWV3KX19PC9zcGFuPjwvaDM+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2wtcmV2aWV3LXByZXNlbnRcIj57e3Jldmlldy5tZXRhLnJldmlldy5yZXZpZXd9fTwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxoMz5SZXZpZXdzIG9mIHRoaXMgdXNlcidzIGFzc2lnbm1lbnQuPC9oMz5cbiAgICA8cCB2LWlmPVwiZm9yUmV2aWV3cy5sZW5ndGggID09PSAwXCIgY2xhc3M9XCJjZW50ZXJcIj5Ob25lPC9wPlxuICAgIDxkaXYgdi1mb3I9XCJyZXZpZXcgaW4gZm9yUmV2aWV3c1wiIGNsYXNzPVwiY2wtcmV2aWV3XCI+XG4gICAgICA8aDMgOmNsYXNzPVwicmV2aWV3LnJldmlld2VyLmF0TGVhc3Qoc3RhZmZSb2xlKSA/ICdzdGFmZicgOiAnJ1wiPnt7Zm9ybWF0VGltZShyZXZpZXcudGltZSl9fVxuICAgICAgICA8c3BhbiB2LWlmPVwicmV2aWV3LnJldmlld2VyLmF0TGVhc3Qoc3RhZmZSb2xlKVwiPlN0YWZmIFJldmlldzwvc3Bhbj5cbiAgICAgICAgPHNwYW4gdi1lbHNlPlJldmlldzwvc3Bhbj4gYnkge3tyZXZpZXcucmV2aWV3ZXIubmFtZX19XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2wtc3VibWl0dGVkXCI+e3tzaG93U3VibWlzc2lvbnMocmV2aWV3KX19PC9zcGFuPjwvaDM+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2wtcmV2aWV3LXByZXNlbnRcIj57e3Jldmlldy5tZXRhLnJldmlldy5yZXZpZXd9fTwvZGl2PlxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbi8qKlxuICogUHJlc2VudCByZXZpZXdzIGJ5IGFuZCBmb3IgYSBtZW1iZXIgYW5kIHRoZSBzdGFmZiByZXZpZXdpbmcgZm9ybS5cbiAqIEBjb25zdHJ1Y3RvciBSZXZpZXdzQnlGb3JNZW1iZXJWdWVcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczogWyd1c2VyJywgJ2Fzc2lnbnRhZyddLFxuICBkYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZvclJldmlld3M6IFtdLFxuICAgICAgYnlSZXZpZXdzOiBbXSxcbiAgICAgIHN0YWZmUm9sZTogU2l0ZS5TaXRlLk1lbWJlci5TVEFGRixcbiAgICAgIHN1Ym1pc3Npb25zOiBbXVxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICB1c2VyKCkge1xuICAgICAgdGhpcy5mb3JSZXZpZXdzID0gW107XG4gICAgICB0aGlzLmJ5UmV2aWV3cyA9IFtdO1xuICAgICAgdGhpcy5zdWJtaXNzaW9ucyA9IFtdO1xuICAgICAgdGhpcy5mZXRjaCgpO1xuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy4kcmVmc1snZWRpdG9yJ107XG4gICAgdGhpcy5lZGl0b3IgPSBuZXcgdGhpcy4kc2l0ZS5FZGl0b3IoZWxlbWVudCwge1xuICAgICAgaGVpZ2h0OiAnMTBlbScsXG4gICAgICBjbGFzc2VzOiBbJ3llbGxvdy1wYWQnXVxuICAgIH0pO1xuXG4gICAgdGhpcy5mZXRjaCgpO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgZmV0Y2goKSB7XG4gICAgICB0aGlzLiRzaXRlLmFwaS5nZXQoJy9hcGkvcmV2aWV3L3Jldmlld3MvJyArIHRoaXMuYXNzaWdudGFnICsgJy8nICsgdGhpcy51c2VyLm1lbWJlci5pZCwge30pXG4gICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcbiAgICAgICAgICAgICAgdGhpcy50YWtlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuJHNpdGUudG9hc3QodGhpcywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRzaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIHRha2UocmVzcG9uc2UpIHtcbiAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZ2V0RGF0YSgncmV2aWV3cy1ieS1mb3InKS5hdHRyaWJ1dGVzO1xuICAgICAgbGV0IHN1Ym1pdERhdGEgPSByZXNwb25zZS5nZXREYXRhKCdhc3NpZ25tZW50LXN1Ym1pc3Npb25zJyk7XG4gICAgICBpZiAoc3VibWl0RGF0YSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnN1Ym1pc3Npb25zID0gc3VibWl0RGF0YS5hdHRyaWJ1dGVzO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCByZXZpZXcgb2YgZGF0YS5mb3IpIHtcbiAgICAgICAgcmV2aWV3LnJldmlld2VyID0gbmV3IFNpdGUuVXNlcihyZXZpZXcucmV2aWV3ZXIpO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgcmV2aWV3IG9mIGRhdGEuYnkpIHtcbiAgICAgICAgcmV2aWV3LnJldmlld2VlID0gbmV3IFNpdGUuVXNlcihyZXZpZXcucmV2aWV3ZWUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZvclJldmlld3MgPSBkYXRhLmZvcjtcbiAgICAgIHRoaXMuYnlSZXZpZXdzID0gZGF0YS5ieTtcbiAgICB9LFxuICAgIHN1Ym1pdCgpIHtcbiAgICAgIGNvbnN0IHRleHQgPSB0aGlzLmVkaXRvci50ZXh0YXJlYS52YWx1ZS50cmltKCk7XG4gICAgICBpZiAodGV4dCA9PT0gJycpIHtcbiAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCAnWW91IG11c3QgZW50ZXIgc29tZSB0ZXh0IHRvIHN1Ym1pdCcpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBzdWJtaXNzaW9ucyA9IHt9O1xuICAgICAgZm9yIChsZXQgdGFnIGluIHRoaXMuc3VibWlzc2lvbnMpIHtcbiAgICAgICAgc3VibWlzc2lvbnNbdGFnXSA9IHtcbiAgICAgICAgICAnaWQnOiB0aGlzLnN1Ym1pc3Npb25zW3RhZ11bMF0uaWQsXG4gICAgICAgICAgJ2RhdGUnOiB0aGlzLnN1Ym1pc3Npb25zW3RhZ11bMF0uZGF0ZVxuICAgICAgICB9O1xuXG4gICAgICB9XG5cbiAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgIHR5cGU6ICd0ZXh0L3BsYWluJyxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgc3VibWlzc2lvbnM6IHN1Ym1pc3Npb25zXG4gICAgICB9XG5cbiAgICAgIFNpdGUuYXBpLnBvc3QoYC9hcGkvcmV2aWV3L3N0YWZmcmV2aWV3LyR7dGhpcy5hc3NpZ250YWd9LyR7dGhpcy51c2VyLm1lbWJlci5pZH1gLCBwYXJhbXMpXG4gICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5lZGl0b3IudGV4dGFyZWEudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgdGhpcy50YWtlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCBcIlJldmlldyBzdWNjZXNzZnVsbHkgc2F2ZWQgdG8gdGhlIHNlcnZlclwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIFNpdGUudG9hc3QodGhpcywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBTaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIGZvcm1hdFRpbWUodGltZSkge1xuICAgICAgcmV0dXJuIHRoaXMuJHNpdGUuVGltZUZvcm1hdHRlci5yZWxhdGl2ZVVOSVgodGltZSwgbnVsbCk7XG4gICAgfSxcbiAgICBzaG93U3VibWlzc2lvbnMocmV2aWV3KSB7XG4gICAgICBsZXQgc3VibWlzc2lvbnMgPSByZXZpZXcubWV0YS5yZXZpZXcuc3VibWlzc2lvbnM7XG5cbiAgICAgIGxldCByZXQgPSAnJztcbiAgICAgIGZvciAobGV0IHRhZyBpbiBzdWJtaXNzaW9ucykge1xuICAgICAgICByZXQgKz0gdGhpcy4kc2l0ZS5UaW1lRm9ybWF0dGVyLmFic29sdXRlVU5JWChzdWJtaXNzaW9uc1t0YWddLmRhdGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAocmV0ID09PSAnJykge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnU3VibWlzc2lvbjogJyArIHJldDtcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT5cbiAgICA8cm91dGVyLWxpbmsgOnRvPVwicm9vdCArICcvY2wvY29uc29sZS9ncmFkaW5nLycgKyBhc3NpZ250YWcgKyAnLycgKyBzdGF0dXNVc2VyLm1lbWJlci5pZFwiIHYtaWY9XCJzdGF0dXNVc2VyICE9PSBudWxsXCIgOnRpdGxlPVwic3RhdHVzVXNlci5uYW1lXCI+e3tzdGF0dXNVc2VyLnVzZXJJZH19L3t7Y291bnR9fTwvcm91dGVyLWxpbms+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvciBTdGF0dXNQcmVzZW50VnVlXG4gICAgICogRGlzcGxheXMgdGhlIHN0YXR1cyBvZiBhIHJldmlld2VyIG9yIHJldmlld2VlLlxuICAgICAqIFVzZWQgYnkgUmV2aWV3UmV2aWV3ZXJzLnZ1ZVxuICAgICAqL1xuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgJ2V4dGVuZHMnOiBTaXRlLlNpdGUuQ29uc29sZUNvbXBvbmVudEJhc2UsXG4gICAgICAgIHByb3BzOiBbJ2Fzc2lnbnRhZycsICdzdGF0dXNVc2VyJywgJ2NvdW50J11cbiAgICB9XG48L3NjcmlwdD4iLCJcblxuaW1wb3J0IFJldmlld1Jldmlld2Vyc1Z1ZSBmcm9tICcuL1Jldmlld1Jldmlld2Vycy52dWUnO1xuaW1wb3J0IFJldmlld3NCeUZvck1lbWJlclZ1ZSBmcm9tICcuL1Jldmlld3NCeUZvck1lbWJlci52dWUnO1xuXG4vKipcbiAqIFJldmlldyBzeXN0ZW0gY29uc29sZSBjb21wb25lbnRzXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZXhwb3J0IGxldCBSZXZpZXdDb25zb2xlID0gZnVuY3Rpb24oKSB7XG59XG5cblJldmlld0NvbnNvbGUuc2V0dXAgPSBmdW5jdGlvbihDb25zb2xlKSB7XG4gICAgQ29uc29sZS5SZXZpZXcgPSB7XG4gICAgICAgICdyZXZpZXdzYnlmb3InOiBSZXZpZXdzQnlGb3JNZW1iZXJWdWVcbiAgICB9O1xuXG4gICAgQ29uc29sZS50YWJsZXMuYWRkKHtcbiAgICAgICAgdGl0bGU6ICdSZXZpZXcnLFxuICAgICAgICBvcmRlcjogNzAsXG4gICAgICAgIGFwaTogJy9hcGkvcmV2aWV3L3RhYmxlcydcbiAgICB9KTtcblxuICAgIENvbnNvbGUuY29tcG9uZW50cy5hZGRSb3V0ZShcbiAgICAgICAge3JvdXRlOiAnL3Jldmlldy9yZXZpZXdlcnMvOmFzc2lnbnRhZycsIGNvbXBvbmVudDogUmV2aWV3UmV2aWV3ZXJzVnVlLCBwcm9wczogdHJ1ZX1cbiAgICApO1xuXG4gICAgQ29uc29sZS5jb3Vyc2UuYXNzaWdubWVudExpbmsoJ3JldmlldycsICdyZXZpZXdlcnMnLCAnL3Jldmlldy9yZXZpZXdlcnMvOmFzc2lnbnRhZycpO1xufVxuXG4iLCIvKlxuICogVGhlIFJldmlldyBDb25zb2xlIHN5c3RlbSBlbnRyeSBwb2ludFxuICovXG5cbmltcG9ydCAnLi4vLi4vX3Jldmlldy5zY3NzJztcbmltcG9ydCB7UmV2aWV3Q29uc29sZX0gZnJvbSAnLi9SZXZpZXdDb25zb2xlJztcblxuaWYoU2l0ZS5Db25zb2xlICYmICFTaXRlLkNvbnNvbGUuUmV2aWV3KSB7XG5cdC8vXG5cdC8vIEluc3RhbGwgdGhlIGNvbnNvbGUgY29tcG9uZW50c1xuXHQvL1xuXHRSZXZpZXdDb25zb2xlLnNldHVwKFNpdGUuQ29uc29sZSlcbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9jc3MtbG9hZGVyLXZpcnR1YWwtMmRlN2ZhYmQxNS8wL2NhY2hlL2Nzcy1sb2FkZXItbnBtLTYuNy4zLTYzYWE5MzM0MDAtNDczY2MzMmI2Yy56aXAvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2Nzcy1sb2FkZXItdmlydHVhbC0yZGU3ZmFiZDE1LzAvY2FjaGUvY3NzLWxvYWRlci1ucG0tNi43LjMtNjNhYTkzMzQwMC00NzNjYzMyYjZjLnppcC9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJkaXYuY2wtcmV2aWV3aW5nIHRkLmNsLWVtcHR5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlOGY3ZjM7XFxufVxcblxcbnAuY2wtcmV2aWV3cy1ub25lIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiAjMDA3MjNmO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5cXG5kaXYuY2wtcmV2aWV3cyBoMyB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kOiAjMDA3MjNmO1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG5kaXYuY2wtcmV2aWV3IHtcXG4gIG1hcmdpbjogMWVtIDA7XFxufVxcbmRpdi5jbC1yZXZpZXcgaDMge1xcbiAgZm9udC1zaXplOiAwLjg1ZW07XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogIzAwNzIzZjtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMDA3MjNmO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxuZGl2LmNsLXJldmlldyBoMyBzcGFuLmNsLXN1Ym1pdHRlZCB7XFxuICBmbG9hdDogcmlnaHQ7XFxuICBjb2xvcjogIzAwOTA5ZTtcXG4gIGZvbnQtc2l6ZTogMC45ZW07XFxufVxcbmRpdi5jbC1yZXZpZXcgaDMuc3RhZmYge1xcbiAgY29sb3I6IHJlZDtcXG59XFxuZGl2LmNsLXJldmlldyBwcmUge1xcbiAgbWFyZ2luOiAwO1xcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xcbn1cXG5kaXYuY2wtcmV2aWV3IGRpdi5jbC1yZXZpZXctcHJlc2VudCB7XFxuICBtYXJnaW46IDA7XFxuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3ZlbmRvci9jbC9yZXZpZXcvX3Jldmlldy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi92ZW5kb3IvY2wvc2l0ZS9zYXNzL21vZHVsZXMvX2NvbG9ycy5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUdFO0VBQ0UseUJDVWlCO0FEWnJCOztBQU1BO0VBQ0Usa0JBQUE7RUFDQSxjQ0VRO0VERFIsa0JBQUE7QUFIRjs7QUFRRTtFQUNFLGtCQUFBO0VBQ0EsbUJDTk07RURPTixZQUFBO0FBTEo7O0FBU0E7RUFDRSxhQUFBO0FBTkY7QUFRRTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsY0NuQk07RURvQk4sZ0NBQUE7RUFDQSxnQkFBQTtBQU5KO0FBUUk7RUFDRSxZQUFBO0VBQ0EsY0NuQkk7RURvQkosZ0JBQUE7QUFOTjtBQVdFO0VBQ0UsVUFBQTtBQVRKO0FBWUU7RUFDRSxTQUFBO0VBQ0EscUJBQUE7QUFWSjtBQWFFO0VBQ0UsU0FBQTtFQUNBLHFCQUFBO0FBWEpcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCAnfnNpdGUtY2wvc2Fzcy9tb2R1bGVzL2NvbG9ycyc7XFxuXFxuZGl2LmNsLXJldmlld2luZyB7XFxuICB0ZC5jbC1lbXB0eSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR2ZXJ5LWxpZ2h0LXByaW1hcnk7XFxuICB9XFxufVxcblxcbnAuY2wtcmV2aWV3cy1ub25lIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiAkcHJpbWFyeTtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuXFxuZGl2LmNsLXJldmlld3Mge1xcblxcbiAgaDMge1xcbiAgICB0ZXh0LWFsaWduOmNlbnRlcjtcXG4gICAgYmFja2dyb3VuZDogJHByaW1hcnk7XFxuICAgIGNvbG9yOndoaXRlO1xcbiAgfVxcbn1cXG5cXG5kaXYuY2wtcmV2aWV3IHtcXG4gIG1hcmdpbjogMWVtIDA7XFxuXFxuICBoMyB7XFxuICAgIGZvbnQtc2l6ZTogMC44NWVtO1xcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICBjb2xvcjogJHByaW1hcnk7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkcHJpbWFyeTtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG5cXG4gICAgc3Bhbi5jbC1zdWJtaXR0ZWQge1xcbiAgICAgIGZsb2F0OiByaWdodDtcXG4gICAgICBjb2xvcjogJHNlY29uZGE7XFxuICAgICAgZm9udC1zaXplOiAwLjllbTtcXG4gICAgfVxcbiAgfVxcblxcblxcbiAgaDMuc3RhZmYge1xcbiAgICBjb2xvcjogcmVkO1xcbiAgfVxcblxcbiAgcHJlIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XFxuICB9XFxuXFxuICBkaXYuY2wtcmV2aWV3LXByZXNlbnQge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcXG4gIH1cXG59XFxuXCIsXCIvLyBUaGUgbWFqb3IgY29sb3JzXFxyXFxuLy8gV2UgaGF2ZSBhIHByaW1hcnkgY29sb3IsIHR3byBzZWNvbmRhcnkgY29sb3JzLCBhbmQgYSBjb21wbGVtZW50YXJ5IGNvbG9yLlxcclxcbiRhY2NlbnQ6ICM2MDdEOEI7XFxyXFxuXFxyXFxuJHRvYXN0LWJhY2tncm91bmQ6ICMxNTE1MTU7XFxyXFxuJHRvYXN0LXRleHQ6IHdoaXRlO1xcclxcblxcclxcbiRoZWFkZXItYmFja2dyb3VuZDogIzUzNTA1NDtcXHJcXG4kaGVhZGVyLXRleHQ6ICNlZWVlZWU7XFxyXFxuXFxyXFxuLy8gVGhlIG1ham9yIGNvbG9yc1xcclxcbi8vIFdlIGhhdmUgYSBwcmltYXJ5IGNvbG9yLCB0d28gc2Vjb25kYXJ5IGNvbG9ycywgYW5kIGEgY29tcGxlbWVudGFyeSBjb2xvci5cXHJcXG4kcHJpbWFyeTogIzAwNzIzZjtcXHJcXG4kbGlnaHQtcHJpbWFyeTogIzQ0YTI2YjtcXHJcXG4kdmVyeS1saWdodC1wcmltYXJ5OiAjZThmN2YzO1xcclxcbiRkYXJrLXByaW1hcnk6ICMwMDUyMjM7XFxyXFxuJHByaW1hcnktdGV4dDogIzIxMjEyMTtcXHJcXG5cXHJcXG4kc2Vjb25kYTogIzAwOTA5ZTtcXHJcXG4kc2Vjb25kYjogI2ZjYWYxNztcXHJcXG4kc2Vjb25kYzogI2M4OWE1ODsgLy8gI2U4ZDliNTtcXHJcXG5cXHJcXG4kY29tcDogI2M0MTQyNTtcXHJcXG4kYmxpbmQ6ICNlZmM2ZmY7XFxyXFxuJGNvbXAtYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCM1NzAxMDIsICM5NjA2MDYsICM1NzAxMDIpO1xcclxcbiRjb21wLWJvcmRlcjogI2M3YmRiYjtcXHJcXG5cXHJcXG4vLyBNZW51c1xcclxcbiRmb2N1czogIzAwODE4MztcXHJcXG4kbWVudS1iYWNrZ3JvdW5kOiAjZThlOGU4O1xcclxcbiRtZW51LWhvdmVyOiAjZDBkMGQwO1xcclxcbiRtZW51LWNvbG9yOiBibGFjaztcXHJcXG5cXHJcXG4vLyBQYWdlIGJhY2tncm91bmRcXHJcXG4kYmFja2dyb3VuZDogI2VlZWVlZTtcXHJcXG5cXHJcXG4vLyBOYXZcXHJcXG4kbmF2LWNvbG9yOiB3aGl0ZTtcXHJcXG4kbmF2LWJhY2tncm91bmQ6IHVybCgnaW1nL25hdl9wYXR0ZXJuLnBuZycpO1xcclxcbiRuYXYtMi1jb2xvcjogI2ZmZmY5OTtcXHJcXG4kbmF2LTItYmFja2dyb3VuZDogdXJsKCdpbWcvbmF2X3BhdHRlcm4tMi5wbmcnKTtcXHJcXG5cXHJcXG4vLyBUYWJsZXNcXHJcXG4kdGFibGUtZ3JhZGllbnQtZnJvbTogIzIwNGM0MjtcXHJcXG4kdGFibGUtZ3JhZGllbnQtdG86ICMzODliNTQ7XFxyXFxuXFxyXFxuLy8gRGlhbG9nIGJveGVzXFxyXFxuJGRpYWxvZy1ncmFkaWVudC1mcm9tOiAjMjA0YzQyO1xcclxcbiRkaWFsb2ctZ3JhZGllbnQtdG86ICMzODliNTQ7XFxyXFxuJGRpYWxvZy1iYXItY29sb3I6IHdoaXRlO1xcclxcblxcclxcbi8vIExpbmsgY29sb3JzXFxyXFxuJGxpbms6ICM4MDgwODA7XFxyXFxuJHZpc2l0ZWQ6ICM5Njg0NDM7ICAvLyAjYjA5ZDViO1xcclxcbiRob3ZlcjogIzMzNjZjYztcXHJcXG5cXHJcXG4kdmVyeS1saWdodC1wcmltYXJ5LWxpbms6ICM5MDAwMDA7XFxyXFxuJHZlcnktbGlnaHQtcHJpbWFyeS1ob3ZlcjogI2MwMDAwMDtcXHJcXG5cXHJcXG5cXHJcXG4kcHJpbWFyeS1saW5rOiB3aGl0ZTtcXHJcXG4kcHJpbWFyeS12aXNpdGVkOiAjZGRkZGRkO1xcclxcbiRzZWNvbmRiLXZpc2l0ZWQ6ICM1NTU1NTU7XFxyXFxuJGF1dG9iYWNrLWxpbms6ICM4ODIyMjI7XFxyXFxuJGF1dG9iYWNrLWxpbmstaG92ZXI6ICNjYzIyMjI7XFxyXFxuXFxyXFxuJHNoYWRvdy14OiAzcHg7XFxyXFxuJHNoYWRvdy15OiAzcHg7XFxyXFxuJHNoYWRvdy1yYWRpdXM6IDhweDtcXHJcXG4kc2hhZG93LWNvbG9yOiAjY2NjO1xcclxcblxcclxcbiR0b2dnbGUtbGluay1ob3Zlci1jb2xvcjogIzAwNjYwMDtcXHJcXG5cXHJcXG4vLyBCb3hlc1xcclxcbiRib3gtYm9yZGVyLWNvbG9yOiAjYmRiZGJkO1xcclxcblxcclxcbi8vIENhcmRzXFxyXFxuJGNhcmQtaGVhZGluZy1iYWNrZ3JvdW5kOiAjZjJmMmYyO1xcclxcbiRjYXJkLWJvcmRlci1jb2xvcjogI2NjY2NjYztcXHJcXG5cXHJcXG4lc2hhZG93IHtcXHJcXG4gIC1tb3otYm94LXNoYWRvdzogJHNoYWRvdy14ICRzaGFkb3cteSAkc2hhZG93LXJhZGl1cyAkc2hhZG93LWNvbG9yO1xcclxcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAkc2hhZG93LXggJHNoYWRvdy15ICRzaGFkb3ctcmFkaXVzICRzaGFkb3ctY29sb3I7XFxyXFxuICBib3gtc2hhZG93OiAkc2hhZG93LXggJHNoYWRvdy15ICRzaGFkb3ctcmFkaXVzICRzaGFkb3ctY29sb3I7XFxyXFxufVxcclxcblxcclxcbiVub3NoYWRvdyB7XFxyXFxuICAtbW96LWJveC1zaGFkb3c6IG5vbmU7XFxyXFxuICAtd2Via2l0LWJveC1zaGFkb3c6IG5vbmU7XFxyXFxuICBib3gtc2hhZG93OiBub25lO1xcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc3R5bGUtbG9hZGVyLXZpcnR1YWwtNDA3NTQzZTEzMy8wL2NhY2hlL3N0eWxlLWxvYWRlci1ucG0tMy4zLjEtNGJiYjZlYzc3Zi00NzBmZWVmNjgwLnppcC9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9zdHlsZS1sb2FkZXItdmlydHVhbC00MDc1NDNlMTMzLzAvY2FjaGUvc3R5bGUtbG9hZGVyLW5wbS0zLjMuMS00YmJiNmVjNzdmLTQ3MGZlZWY2ODAuemlwL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9zdHlsZS1sb2FkZXItdmlydHVhbC00MDc1NDNlMTMzLzAvY2FjaGUvc3R5bGUtbG9hZGVyLW5wbS0zLjMuMS00YmJiNmVjNzdmLTQ3MGZlZWY2ODAuemlwL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc3R5bGUtbG9hZGVyLXZpcnR1YWwtNDA3NTQzZTEzMy8wL2NhY2hlL3N0eWxlLWxvYWRlci1ucG0tMy4zLjEtNGJiYjZlYzc3Zi00NzBmZWVmNjgwLnppcC9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9zdHlsZS1sb2FkZXItdmlydHVhbC00MDc1NDNlMTMzLzAvY2FjaGUvc3R5bGUtbG9hZGVyLW5wbS0zLjMuMS00YmJiNmVjNzdmLTQ3MGZlZWY2ODAuemlwL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9zdHlsZS1sb2FkZXItdmlydHVhbC00MDc1NDNlMTMzLzAvY2FjaGUvc3R5bGUtbG9hZGVyLW5wbS0zLjMuMS00YmJiNmVjNzdmLTQ3MGZlZWY2ODAuemlwL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9jc3MtbG9hZGVyLXZpcnR1YWwtMmRlN2ZhYmQxNS8wL2NhY2hlL2Nzcy1sb2FkZXItbnBtLTYuNy4zLTYzYWE5MzM0MDAtNDczY2MzMmI2Yy56aXAvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vLnlhcm4vY2FjaGUvcmVzb2x2ZS11cmwtbG9hZGVyLW5wbS01LjAuMC05YjQ0MTA2N2M5LTZkNDgzNzMzYTQuemlwL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc2Fzcy1sb2FkZXItdmlydHVhbC1jN2NhNGYxZDFhLzAvY2FjaGUvc2Fzcy1sb2FkZXItbnBtLTEzLjIuMC02NDIxYzVmZjdiLWVkNmNkYjVmNTUuemlwL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcz8/Y2xvbmVkUnVsZVNldC00LnVzZVszXSEuL19yZXZpZXcuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2Nzcy1sb2FkZXItdmlydHVhbC0yZGU3ZmFiZDE1LzAvY2FjaGUvY3NzLWxvYWRlci1ucG0tNi43LjMtNjNhYTkzMzQwMC00NzNjYzMyYjZjLnppcC9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi8ueWFybi9jYWNoZS9yZXNvbHZlLXVybC1sb2FkZXItbnBtLTUuMC4wLTliNDQxMDY3YzktNmQ0ODM3MzNhNC56aXAvbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9zYXNzLWxvYWRlci12aXJ0dWFsLWM3Y2E0ZjFkMWEvMC9jYWNoZS9zYXNzLWxvYWRlci1ucG0tMTMuMi4wLTY0MjFjNWZmN2ItZWQ2Y2RiNWY1NS56aXAvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTQudXNlWzNdIS4vX3Jldmlldy5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIi4vUmV2aWV3UmV2aWV3ZXJzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1iZWM1ZGZkY1wiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1Jldmlld1Jldmlld2Vycy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anNcIlxuZXhwb3J0ICogZnJvbSBcIi4vUmV2aWV3UmV2aWV3ZXJzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qc1wiXG5cbmltcG9ydCBleHBvcnRDb21wb25lbnQgZnJvbSBcIi9Vc2Vycy9jaGFybGVzb3dlbi93ZWIvY3NlMzM1Ly55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1hMWE0YjE4N2MzLzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTcuMC4xLWY1NTJiODI4MDUtNDJjYzhjOGZmMC56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9leHBvcnRIZWxwZXIuanNcIlxuY29uc3QgX19leHBvcnRzX18gPSAvKiNfX1BVUkVfXyovZXhwb3J0Q29tcG9uZW50KHNjcmlwdCwgW1sncmVuZGVyJyxyZW5kZXJdLFsnX19maWxlJyxcInZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdSZXZpZXdlcnMudnVlXCJdXSlcbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIF9fZXhwb3J0c19fLl9faG1ySWQgPSBcImJlYzVkZmRjXCJcbiAgY29uc3QgYXBpID0gX19WVUVfSE1SX1JVTlRJTUVfX1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghYXBpLmNyZWF0ZVJlY29yZCgnYmVjNWRmZGMnLCBfX2V4cG9ydHNfXykpIHtcbiAgICBhcGkucmVsb2FkKCdiZWM1ZGZkYycsIF9fZXhwb3J0c19fKVxuICB9XG4gIFxuICBtb2R1bGUuaG90LmFjY2VwdChcIi4vUmV2aWV3UmV2aWV3ZXJzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1iZWM1ZGZkY1wiLCAoKSA9PiB7XG4gICAgYXBpLnJlcmVuZGVyKCdiZWM1ZGZkYycsIHJlbmRlcilcbiAgfSlcblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IF9fZXhwb3J0c19fIiwiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIi4vUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03YjM2ZmU3NlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1Jldmlld3NCeUZvck1lbWJlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anNcIlxuZXhwb3J0ICogZnJvbSBcIi4vUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qc1wiXG5cbmltcG9ydCBleHBvcnRDb21wb25lbnQgZnJvbSBcIi9Vc2Vycy9jaGFybGVzb3dlbi93ZWIvY3NlMzM1Ly55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1hMWE0YjE4N2MzLzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTcuMC4xLWY1NTJiODI4MDUtNDJjYzhjOGZmMC56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9leHBvcnRIZWxwZXIuanNcIlxuY29uc3QgX19leHBvcnRzX18gPSAvKiNfX1BVUkVfXyovZXhwb3J0Q29tcG9uZW50KHNjcmlwdCwgW1sncmVuZGVyJyxyZW5kZXJdLFsnX19maWxlJyxcInZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdzQnlGb3JNZW1iZXIudnVlXCJdXSlcbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIF9fZXhwb3J0c19fLl9faG1ySWQgPSBcIjdiMzZmZTc2XCJcbiAgY29uc3QgYXBpID0gX19WVUVfSE1SX1JVTlRJTUVfX1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghYXBpLmNyZWF0ZVJlY29yZCgnN2IzNmZlNzYnLCBfX2V4cG9ydHNfXykpIHtcbiAgICBhcGkucmVsb2FkKCc3YjM2ZmU3NicsIF9fZXhwb3J0c19fKVxuICB9XG4gIFxuICBtb2R1bGUuaG90LmFjY2VwdChcIi4vUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03YjM2ZmU3NlwiLCAoKSA9PiB7XG4gICAgYXBpLnJlcmVuZGVyKCc3YjM2ZmU3NicsIHJlbmRlcilcbiAgfSlcblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IF9fZXhwb3J0c19fIiwiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIi4vU3RhdHVzUHJlc2VudC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDQ0NWM1NjVcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9TdGF0dXNQcmVzZW50LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qc1wiXG5leHBvcnQgKiBmcm9tIFwiLi9TdGF0dXNQcmVzZW50LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qc1wiXG5cbmltcG9ydCBleHBvcnRDb21wb25lbnQgZnJvbSBcIi9Vc2Vycy9jaGFybGVzb3dlbi93ZWIvY3NlMzM1Ly55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1hMWE0YjE4N2MzLzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTcuMC4xLWY1NTJiODI4MDUtNDJjYzhjOGZmMC56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9leHBvcnRIZWxwZXIuanNcIlxuY29uc3QgX19leHBvcnRzX18gPSAvKiNfX1BVUkVfXyovZXhwb3J0Q29tcG9uZW50KHNjcmlwdCwgW1sncmVuZGVyJyxyZW5kZXJdLFsnX19maWxlJyxcInZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9TdGF0dXNQcmVzZW50LnZ1ZVwiXV0pXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICBfX2V4cG9ydHNfXy5fX2htcklkID0gXCI0NDQ1YzU2NVwiXG4gIGNvbnN0IGFwaSA9IF9fVlVFX0hNUl9SVU5USU1FX19cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIWFwaS5jcmVhdGVSZWNvcmQoJzQ0NDVjNTY1JywgX19leHBvcnRzX18pKSB7XG4gICAgYXBpLnJlbG9hZCgnNDQ0NWM1NjUnLCBfX2V4cG9ydHNfXylcbiAgfVxuICBcbiAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1N0YXR1c1ByZXNlbnQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQ0NDVjNTY1XCIsICgpID0+IHtcbiAgICBhcGkucmVyZW5kZXIoJzQ0NDVjNTY1JywgcmVuZGVyKVxuICB9KVxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgX19leHBvcnRzX18iLCJleHBvcnQgeyBkZWZhdWx0IH0gZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vYmFiZWwtbG9hZGVyLXZpcnR1YWwtNThhMDQzZjMyYS8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOS4xLjAtNjQ2NzE2MmNiZi03NzQ3NThmZWJkLnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yLnVzZSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTFhNGIxODdjMy8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE3LjAuMS1mNTUyYjgyODA1LTQyY2M4YzhmZjAuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbOV0udXNlWzBdIS4vUmV2aWV3UmV2aWV3ZXJzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qc1wiOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9iYWJlbC1sb2FkZXItdmlydHVhbC01OGEwNDNmMzJhLzAvY2FjaGUvYmFiZWwtbG9hZGVyLW5wbS05LjEuMC02NDY3MTYyY2JmLTc3NDc1OGZlYmQuemlwL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTIudXNlIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1hMWE0YjE4N2MzLzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTcuMC4xLWY1NTJiODI4MDUtNDJjYzhjOGZmMC56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1s5XS51c2VbMF0hLi9SZXZpZXdSZXZpZXdlcnMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzXCIiLCJleHBvcnQgeyBkZWZhdWx0IH0gZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vYmFiZWwtbG9hZGVyLXZpcnR1YWwtNThhMDQzZjMyYS8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOS4xLjAtNjQ2NzE2MmNiZi03NzQ3NThmZWJkLnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yLnVzZSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTFhNGIxODdjMy8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE3LjAuMS1mNTUyYjgyODA1LTQyY2M4YzhmZjAuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbOV0udXNlWzBdIS4vUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qc1wiOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9iYWJlbC1sb2FkZXItdmlydHVhbC01OGEwNDNmMzJhLzAvY2FjaGUvYmFiZWwtbG9hZGVyLW5wbS05LjEuMC02NDY3MTYyY2JmLTc3NDc1OGZlYmQuemlwL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTIudXNlIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1hMWE0YjE4N2MzLzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTcuMC4xLWY1NTJiODI4MDUtNDJjYzhjOGZmMC56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1s5XS51c2VbMF0hLi9SZXZpZXdzQnlGb3JNZW1iZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzXCIiLCJleHBvcnQgeyBkZWZhdWx0IH0gZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vYmFiZWwtbG9hZGVyLXZpcnR1YWwtNThhMDQzZjMyYS8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOS4xLjAtNjQ2NzE2MmNiZi03NzQ3NThmZWJkLnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yLnVzZSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTFhNGIxODdjMy8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE3LjAuMS1mNTUyYjgyODA1LTQyY2M4YzhmZjAuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbOV0udXNlWzBdIS4vU3RhdHVzUHJlc2VudC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anNcIjsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vYmFiZWwtbG9hZGVyLXZpcnR1YWwtNThhMDQzZjMyYS8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOS4xLjAtNjQ2NzE2MmNiZi03NzQ3NThmZWJkLnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yLnVzZSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTFhNGIxODdjMy8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE3LjAuMS1mNTUyYjgyODA1LTQyY2M4YzhmZjAuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbOV0udXNlWzBdIS4vU3RhdHVzUHJlc2VudC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anNcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2JhYmVsLWxvYWRlci12aXJ0dWFsLTU4YTA0M2YzMmEvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTkuMS4wLTY0NjcxNjJjYmYtNzc0NzU4ZmViZC56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMi51c2UhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWVmYzU4NGE0YmEvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNy4wLjEtZjU1MmI4MjgwNS00MmNjOGM4ZmYwLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L3RlbXBsYXRlTG9hZGVyLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzJdIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1hMWE0YjE4N2MzLzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTcuMC4xLWY1NTJiODI4MDUtNDJjYzhjOGZmMC56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1s5XS51c2VbMF0hLi9SZXZpZXdSZXZpZXdlcnMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWJlYzVkZmRjXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9iYWJlbC1sb2FkZXItdmlydHVhbC01OGEwNDNmMzJhLzAvY2FjaGUvYmFiZWwtbG9hZGVyLW5wbS05LjEuMC02NDY3MTYyY2JmLTc3NDc1OGZlYmQuemlwL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTIudXNlIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1lZmM1ODRhNGJhLzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTcuMC4xLWY1NTJiODI4MDUtNDJjYzhjOGZmMC56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC90ZW1wbGF0ZUxvYWRlci5qcz8/cnVsZVNldFsxXS5ydWxlc1syXSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTFhNGIxODdjMy8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE3LjAuMS1mNTUyYjgyODA1LTQyY2M4YzhmZjAuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbOV0udXNlWzBdIS4vUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03YjM2ZmU3NlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vYmFiZWwtbG9hZGVyLXZpcnR1YWwtNThhMDQzZjMyYS8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOS4xLjAtNjQ2NzE2MmNiZi03NzQ3NThmZWJkLnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yLnVzZSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtZWZjNTg0YTRiYS8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE3LjAuMS1mNTUyYjgyODA1LTQyY2M4YzhmZjAuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvdGVtcGxhdGVMb2FkZXIuanM/P3J1bGVTZXRbMV0ucnVsZXNbMl0hLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWExYTRiMTg3YzMvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNy4wLjEtZjU1MmI4MjgwNS00MmNjOGM4ZmYwLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L2luZGV4LmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzldLnVzZVswXSEuL1N0YXR1c1ByZXNlbnQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQ0NDVjNTY1XCIiXSwibmFtZXMiOlsiU3RhdHVzUHJlc2VudFZ1ZSIsIlNpdGUiLCJDb25zb2xlQ29tcG9uZW50QmFzZSIsInByb3BzIiwiZGF0YSIsImFzc2lnbm1lbnQiLCJyZXZpZXdlckNudCIsImluc3RydWN0b3IiLCJNZW1iZXIiLCJJTlNUUlVDVE9SIiwicmV2aWV3ZXJzIiwicmV2aWV3ZWVzIiwibWF4UmV2aWV3ZWVzIiwibWF4UmV2aWV3ZXJzIiwiY29tcG9uZW50cyIsIk1lbWJlcnNGZXRjaGVyQ29tcG9uZW50VnVlIiwibW91bnRlZCIsIm1lbWJlciIsIiRzdG9yZSIsInN0YXRlIiwidXNlciIsInNlY3Rpb24iLCJnZXR0ZXJzIiwic2VtZXN0ZXIiLCJnZXRBc3NpZ25tZW50IiwiYXNzaWdudGFnIiwic2V0VGl0bGUiLCJzaG9ydG5hbWUiLCIkc2l0ZSIsImFwaSIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsImhhc0Vycm9yIiwidGFrZSIsInRvYXN0IiwiZXJyb3IiLCJtZXRob2RzIiwiYXNzaWduUmV2aWV3cyIsIkRpYWxvZyIsIk1lc3NhZ2VCb3giLCJPS0NBTkNFTCIsImFzc2lnblJldmlld3NBY3R1YWwiLCJwYXJhbXMiLCJjbnQiLCJwb3N0IiwiZ2V0RGF0YSIsImF0dHJpYnV0ZXMiLCJhc3NpZ24iLCJyZXZpZXdlciIsInJldmlld2VlIiwidW5kZWZpbmVkIiwicHVzaCIsImxlbmd0aCIsImRpc3BsYXlVc2VyIiwidXNlcnMiLCJpIiwiaWQiLCJjbHMiLCJmb3JSZXZpZXdzIiwiYnlSZXZpZXdzIiwic3RhZmZSb2xlIiwiU1RBRkYiLCJzdWJtaXNzaW9ucyIsIndhdGNoIiwiZmV0Y2giLCJlbGVtZW50IiwiJHJlZnMiLCJlZGl0b3IiLCJFZGl0b3IiLCJoZWlnaHQiLCJjbGFzc2VzIiwic3VibWl0RGF0YSIsInJldmlldyIsIlVzZXIiLCJieSIsInN1Ym1pdCIsInRleHQiLCJ0ZXh0YXJlYSIsInZhbHVlIiwidHJpbSIsInRhZyIsImRhdGUiLCJ0eXBlIiwiZm9ybWF0VGltZSIsInRpbWUiLCJUaW1lRm9ybWF0dGVyIiwicmVsYXRpdmVVTklYIiwic2hvd1N1Ym1pc3Npb25zIiwibWV0YSIsInJldCIsImFic29sdXRlVU5JWCIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX2hvaXN0ZWRfMSIsIl9ob2lzdGVkXzIiLCJfY3JlYXRlVk5vZGUiLCJfY29tcG9uZW50X21lbWJlcnNmZXRjaGVyIiwiZmV0Y2hpbmciLCJfY3R4IiwiZmV0Y2hlciIsImF0TGVhc3QiLCJtZXRob2QiLCJvblN1Ym1pdCIsIiRvcHRpb25zIiwiX2hvaXN0ZWRfNCIsIl9ob2lzdGVkXzUiLCJfRnJhZ21lbnQiLCJudW0iLCJfaG9pc3RlZF83IiwiX2hvaXN0ZWRfOCIsIl9ob2lzdGVkXzkiLCJfaG9pc3RlZF8xMCIsIl9jb21wb25lbnRfcm91dGVyX2xpbmsiLCJ0aXRsZSIsIm5hbWUiLCJ0byIsIiRwcm9wcyIsInVzZXJJZCIsIl9ub3JtYWxpemVDbGFzcyIsIl9jb21wb25lbnRfc3RhdHVzX3ByZXNlbnQiLCJjb3VudCIsInJlZiIsIl9ob2lzdGVkXzMiLCJfaG9pc3RlZF82IiwiX2hvaXN0ZWRfMTEiLCJfaG9pc3RlZF8xMiIsIl9ob2lzdGVkXzE1IiwiX2hvaXN0ZWRfMTYiLCJfY3JlYXRlQmxvY2siLCJSZXZpZXdSZXZpZXdlcnNWdWUiLCJSZXZpZXdzQnlGb3JNZW1iZXJWdWUiLCJSZXZpZXdDb25zb2xlIiwic2V0dXAiLCJDb25zb2xlIiwiUmV2aWV3IiwidGFibGVzIiwiYWRkIiwib3JkZXIiLCJhZGRSb3V0ZSIsInJvdXRlIiwiY29tcG9uZW50IiwiY291cnNlIiwiYXNzaWdubWVudExpbmsiXSwic291cmNlUm9vdCI6IiJ9