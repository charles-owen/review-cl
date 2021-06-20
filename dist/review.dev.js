/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _StatusPresent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StatusPresent.vue */ "./vendor/cl/review/js/Console/StatusPresent.vue");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'extends': Site.Site.ConsoleComponentBase,
  props: ['assigntag'],
  data: function data() {
    return {
      assignment: null,
      reviewerCnt: 2,
      reviewing: 'x',
      instructor: Site.Site.Member.INSTRUCTOR,
      reviewer: null,
      reviewee: null,
      maxReviewer: 0,
      maxReviewee: 0
    };
  },
  components: {
    'membersfetcher': Site.MembersFetcherComponentVue,
    'status-present': _StatusPresent_vue__WEBPACK_IMPORTED_MODULE_0__.default
  },
  mounted: function mounted() {
    var _this = this;

    var member = this.$store.state.user.user.member;
    this.section = this.$store.getters['course/section'](member.semester, member.section);
    this.assignment = this.section.getAssignment(this.assigntag);
    this.setTitle(': ' + this.assignment.shortname + ' Reviewing');
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
    assignReviews: function assignReviews() {
      var _this2 = this;

      if (this.maxReviewer > 0 || this.maxReviewee > 0) {
        new this.$site.Dialog.MessageBox('Are you sure?', 'Are you sure you want to assign reviewers? This will replace the existing reviewing assignments.', this.$site.Dialog.MessageBox.OKCANCEL, function () {
          _this2.assignReviewsActual();
        });
      } else {
        this.assignReviewsActual();
      }
    },
    assignReviewsActual: function assignReviewsActual() {
      var _this3 = this;

      this.reviewer = null;
      this.reviewee = null;
      this.maxReviewer = 0;
      this.maxReviewee = 0;
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
    take: function take(response) {
      var data = response.getData('reviewers').attributes;
      this.reviewer = {};
      this.reviewee = {};
      this.maxReviewer = 0;
      this.maxReviewee = 0;

      var _iterator = _createForOfIteratorHelper(data),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var assign = _step.value;
          var reviewer = +assign[0];
          var reviewee = +assign[1];
          var cnt = +assign[2];

          if (this.reviewer[reviewer] === undefined) {
            this.reviewer[reviewer] = [];
          }

          this.reviewer[reviewer].push([reviewee, cnt]);

          if (this.reviewer[reviewer].length > this.maxReviewer) {
            this.maxReviewer = this.reviewer[reviewer].length;
          }

          if (this.reviewee[reviewee] === undefined) {
            this.reviewee[reviewee] = [];
          }

          this.reviewee[reviewee].push([reviewer, cnt]);

          if (this.reviewee[reviewee].length > this.maxReviewee) {
            this.maxReviewee = this.reviewer[reviewer].length;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
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
    cls: function cls(assign, i) {
      if (assign === undefined || i >= assign.length) {
        return '';
      }

      return assign[i][1] < 1 ? 'cl-empty' : '';
    }
  }
});

/***/ }),

/***/ "./.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

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
        console.log(this.submissions[tag]);
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

/***/ "./.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//

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

/***/ "./.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/***/ "./.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/***/ "./vendor/cl/review/index.js":
/*!***********************************!*\
  !*** ./vendor/cl/review/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _review_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_review.scss */ "./vendor/cl/review/_review.scss");
/* harmony import */ var _js_Console_ReviewConsole__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/Console/ReviewConsole */ "./vendor/cl/review/js/Console/ReviewConsole.js");
/* harmony import */ var _js_ReviewVue_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/ReviewVue.vue */ "./vendor/cl/review/js/ReviewVue.vue");
/* harmony import */ var _js_ReviewsVue_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/ReviewsVue.vue */ "./vendor/cl/review/js/ReviewsVue.vue");
/*
 * The main Review system entry point
 */



 //
// Install the console components
//

if (Site.Site.console !== undefined) {
  _js_Console_ReviewConsole__WEBPACK_IMPORTED_MODULE_1__.ReviewConsole.setup(Site.Site.console);
} //
// Create the inline and page components
//


Site.Site.ready(function () {
  Site.Site.PageVue.create('div.cl-review', 'Review Vue', _js_ReviewVue_vue__WEBPACK_IMPORTED_MODULE_2__.default);
  Site.Site.InlineVue.create('div.cl-reviews', _js_ReviewsVue_vue__WEBPACK_IMPORTED_MODULE_3__.default);
});

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
    'reviewsbyfor': _ReviewsByForMember_vue__WEBPACK_IMPORTED_MODULE_1__.default
  };
  Console.tables.add({
    title: 'Review',
    order: 70,
    api: '/api/review/tables'
  });
  Console.components.addRoute({
    route: '/review/reviewers/:assigntag',
    component: _ReviewReviewers_vue__WEBPACK_IMPORTED_MODULE_0__.default,
    props: true
  });
  Console.course.assignmentLink('review', 'reviewers', '/review/reviewers/:assigntag');
};

/***/ }),

/***/ "./.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/cjs.js!./.yarn/$$virtual/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-04e9f91dc8.zip/node_modules/resolve-url-loader/index.js!./.yarn/$$virtual/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-75f523e64c.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./vendor/cl/review/_review.scss":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/cjs.js!./.yarn/$$virtual/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-04e9f91dc8.zip/node_modules/resolve-url-loader/index.js!./.yarn/$$virtual/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-75f523e64c.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./vendor/cl/review/_review.scss ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/runtime/api.js */ "./.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "div.cl-reviewing td.cl-empty {\n  background-color: #e8f7f3;\n}\n\np.cl-reviews-none {\n  text-align: center;\n  color: #00723f;\n  font-style: italic;\n}\n\ndiv.cl-reviews h3 {\n  text-align: center;\n  background: #00723f;\n  color: white;\n}\n\ndiv.cl-review {\n  margin: 1em 0;\n}\ndiv.cl-review h3 {\n  font-size: 0.85em;\n  font-style: italic;\n  font-weight: normal;\n  background: transparent;\n  color: #00723f;\n  border-bottom: 1px solid #00723f;\n  text-align: left;\n}\ndiv.cl-review h3 span.cl-submitted {\n  float: right;\n  color: #00909e;\n  font-size: 0.9em;\n}\ndiv.cl-review h3.staff {\n  color: red;\n}\ndiv.cl-review pre {\n  margin: 0;\n  white-space: pre-wrap;\n}\ndiv.cl-review div.cl-review-present {\n  margin: 0;\n  white-space: pre-wrap;\n}", "",{"version":3,"sources":["webpack://./vendor/cl/review/_review.scss","webpack://./vendor/cl/site/sass/modules/_colors.scss"],"names":[],"mappings":"AAGE;EACE,yBCUiB;ADZrB;;AAMA;EACE,kBAAA;EACA,cCEQ;EDDR,kBAAA;AAHF;;AAQE;EACE,kBAAA;EACA,mBCNM;EDON,YAAA;AALJ;;AASA;EACE,aAAA;AANF;AAQE;EACE,iBAAA;EACA,kBAAA;EACA,mBAAA;EACA,uBAAA;EACA,cCnBM;EDoBN,gCAAA;EACA,gBAAA;AANJ;AAQI;EACE,YAAA;EACA,cCnBI;EDoBJ,gBAAA;AANN;AAWE;EACE,UAAA;AATJ;AAYE;EACE,SAAA;EACA,qBAAA;AAVJ;AAaE;EACE,SAAA;EACA,qBAAA;AAXJ","sourcesContent":["@import '~site-cl/sass/modules/colors';\r\n\r\ndiv.cl-reviewing {\r\n  td.cl-empty {\r\n    background-color: $very-light-primary;\r\n  }\r\n}\r\n\r\np.cl-reviews-none {\r\n  text-align: center;\r\n  color: $primary;\r\n  font-style: italic;\r\n}\r\n\r\ndiv.cl-reviews {\r\n\r\n  h3 {\r\n    text-align:center;\r\n    background: $primary;\r\n    color:white;\r\n  }\r\n}\r\n\r\ndiv.cl-review {\r\n  margin: 1em 0;\r\n\r\n  h3 {\r\n    font-size: 0.85em;\r\n    font-style: italic;\r\n    font-weight: normal;\r\n    background: transparent;\r\n    color: $primary;\r\n    border-bottom: 1px solid $primary;\r\n    text-align: left;\r\n\r\n    span.cl-submitted {\r\n      float: right;\r\n      color: $seconda;\r\n      font-size: 0.9em;\r\n    }\r\n  }\r\n\r\n\r\n  h3.staff {\r\n    color: red;\r\n  }\r\n\r\n  pre {\r\n    margin: 0;\r\n    white-space: pre-wrap;\r\n  }\r\n\r\n  div.cl-review-present {\r\n    margin: 0;\r\n    white-space: pre-wrap;\r\n  }\r\n}\r\n","// The major colors\r\n// We have a primary color, two secondary colors, and a complementary color.\r\n$accent: #607D8B;\r\n\r\n$toast-background: #151515;\r\n$toast-text: white;\r\n\r\n$header-background: #535054;\r\n$header-text: #eeeeee;\r\n\r\n// The major colors\r\n// We have a primary color, two secondary colors, and a complementary color.\r\n$primary: #00723f;\r\n$light-primary: #44a26b;\r\n$very-light-primary: #e8f7f3;\r\n$dark-primary: #005223;\r\n$primary-text: #212121;\r\n\r\n$seconda: #00909e;\r\n$secondb: #fcaf17;\r\n$secondc: #c89a58; // #e8d9b5;\r\n\r\n$comp: #c41425;\r\n$blind: #efc6ff;\r\n$comp-background: linear-gradient(#570102, #960606, #570102);\r\n$comp-border: #c7bdbb;\r\n\r\n// Menus\r\n$focus: #008183;\r\n$menu-background: #e8e8e8;\r\n$menu-hover: #d0d0d0;\r\n$menu-color: black;\r\n\r\n// Page background\r\n$background: #eeeeee;\r\n\r\n// Nav\r\n$nav-color: white;\r\n$nav-background: url('img/nav_pattern.png');\r\n$nav-2-color: #ffff99;\r\n$nav-2-background: url('img/nav_pattern-2.png');\r\n\r\n// Tables\r\n$table-gradient-from: #204c42;\r\n$table-gradient-to: #389b54;\r\n\r\n// Dialog boxes\r\n$dialog-gradient-from: #204c42;\r\n$dialog-gradient-to: #389b54;\r\n$dialog-bar-color: white;\r\n\r\n// Link colors\r\n$link: #808080;\r\n$visited: #968443;  // #b09d5b;\r\n$hover: #3366cc;\r\n\r\n$very-light-primary-link: #900000;\r\n$very-light-primary-hover: #c00000;\r\n\r\n\r\n$primary-link: white;\r\n$primary-visited: #dddddd;\r\n$secondb-visited: #555555;\r\n$autoback-link: #882222;\r\n$autoback-link-hover: #cc2222;\r\n\r\n$shadow-x: 3px;\r\n$shadow-y: 3px;\r\n$shadow-radius: 8px;\r\n$shadow-color: #ccc;\r\n\r\n$toggle-link-hover-color: #006600;\r\n\r\n// Boxes\r\n$box-border-color: #bdbdbd;\r\n\r\n// Cards\r\n$card-heading-background: #f2f2f2;\r\n$card-border-color: #cccccc;\r\n\r\n%shadow {\r\n  -moz-box-shadow: $shadow-x $shadow-y $shadow-radius $shadow-color;\r\n  -webkit-box-shadow: $shadow-x $shadow-y $shadow-radius $shadow-color;\r\n  box-shadow: $shadow-x $shadow-y $shadow-radius $shadow-color;\r\n}\r\n\r\n%noshadow {\r\n  -moz-box-shadow: none;\r\n  -webkit-box-shadow: none;\r\n  box-shadow: none;\r\n}\r\n"],"sourceRoot":""}]);
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
/* harmony import */ var _yarn_$$virtual_style_loader_virtual_862606f393_0_cache_style_loader_npm_2_0_0_b9a5c4a2aa_ffc3054882_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../.yarn/$$virtual/style-loader-virtual-862606f393/0/cache/style-loader-npm-2.0.0-b9a5c4a2aa-ffc3054882.zip/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./.yarn/$$virtual/style-loader-virtual-862606f393/0/cache/style-loader-npm-2.0.0-b9a5c4a2aa-ffc3054882.zip/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _yarn_$$virtual_style_loader_virtual_862606f393_0_cache_style_loader_npm_2_0_0_b9a5c4a2aa_ffc3054882_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_yarn_$$virtual_style_loader_virtual_862606f393_0_cache_style_loader_npm_2_0_0_b9a5c4a2aa_ffc3054882_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_cjs_js_yarn_$$virtual_resolve_url_loader_virtual_ec75d2a09e_0_cache_resolve_url_loader_npm_4_0_0_2a9c18d86b_04e9f91dc8_zip_node_modules_resolve_url_loader_index_js_yarn_$$virtual_sass_loader_virtual_3857f5e9f1_0_cache_sass_loader_npm_12_1_0_6188089e12_75f523e64c_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_review_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/cjs.js!../../../.yarn/$$virtual/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-04e9f91dc8.zip/node_modules/resolve-url-loader/index.js!../../../.yarn/$$virtual/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-75f523e64c.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./_review.scss */ "./.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/cjs.js!./.yarn/$$virtual/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-04e9f91dc8.zip/node_modules/resolve-url-loader/index.js!./.yarn/$$virtual/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-75f523e64c.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./vendor/cl/review/_review.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _yarn_$$virtual_style_loader_virtual_862606f393_0_cache_style_loader_npm_2_0_0_b9a5c4a2aa_ffc3054882_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_cjs_js_yarn_$$virtual_resolve_url_loader_virtual_ec75d2a09e_0_cache_resolve_url_loader_npm_4_0_0_2a9c18d86b_04e9f91dc8_zip_node_modules_resolve_url_loader_index_js_yarn_$$virtual_sass_loader_virtual_3857f5e9f1_0_cache_sass_loader_npm_12_1_0_6188089e12_75f523e64c_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_review_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_cjs_js_yarn_$$virtual_resolve_url_loader_virtual_ec75d2a09e_0_cache_resolve_url_loader_npm_4_0_0_2a9c18d86b_04e9f91dc8_zip_node_modules_resolve_url_loader_index_js_yarn_$$virtual_sass_loader_virtual_3857f5e9f1_0_cache_sass_loader_npm_12_1_0_6188089e12_75f523e64c_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_review_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_$$virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_362bb71573_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewReviewers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!../../../../../.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./ReviewReviewers.vue?vue&type=script&lang=js& */ "./.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_$$virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_362bb71573_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewReviewers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_$$virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_362bb71573_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsByForMember_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!../../../../../.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./ReviewsByForMember.vue?vue&type=script&lang=js& */ "./.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_$$virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_362bb71573_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsByForMember_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_$$virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_362bb71573_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusPresent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!../../../../../.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./StatusPresent.vue?vue&type=script&lang=js& */ "./.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_$$virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_362bb71573_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusPresent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_$$virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_362bb71573_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!../../../../.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./ReviewVue.vue?vue&type=script&lang=js& */ "./.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_$$virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_362bb71573_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_$$virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_362bb71573_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!../../../../.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./ReviewsVue.vue?vue&type=script&lang=js& */ "./.yarn/$$virtual/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-362bb71573.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_$$virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_362bb71573_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc&":
/*!****************************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_$$virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewReviewers_vue_vue_type_template_id_bec5dfdc___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _yarn_$$virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewReviewers_vue_vue_type_template_id_bec5dfdc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _yarn_$$virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewReviewers_vue_vue_type_template_id_bec5dfdc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./ReviewReviewers.vue?vue&type=template&id=bec5dfdc& */ "./.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc&");


/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76&":
/*!*******************************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_$$virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsByForMember_vue_vue_type_template_id_7b36fe76___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _yarn_$$virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsByForMember_vue_vue_type_template_id_7b36fe76___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _yarn_$$virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsByForMember_vue_vue_type_template_id_7b36fe76___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./ReviewsByForMember.vue?vue&type=template&id=7b36fe76& */ "./.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76&");


/***/ }),

/***/ "./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=template&id=4445c565&":
/*!**************************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=template&id=4445c565& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_$$virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusPresent_vue_vue_type_template_id_4445c565___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _yarn_$$virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusPresent_vue_vue_type_template_id_4445c565___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _yarn_$$virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusPresent_vue_vue_type_template_id_4445c565___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./StatusPresent.vue?vue&type=template&id=4445c565& */ "./.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=template&id=4445c565&");


/***/ }),

/***/ "./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262&":
/*!**************************************************************************!*\
  !*** ./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_$$virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewVue_vue_vue_type_template_id_4eeb3262___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _yarn_$$virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewVue_vue_vue_type_template_id_4eeb3262___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _yarn_$$virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewVue_vue_vue_type_template_id_4eeb3262___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./ReviewVue.vue?vue&type=template&id=4eeb3262& */ "./.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262&");


/***/ }),

/***/ "./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447&":
/*!***************************************************************************!*\
  !*** ./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_$$virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsVue_vue_vue_type_template_id_094fe447___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _yarn_$$virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsVue_vue_vue_type_template_id_094fe447___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _yarn_$$virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsVue_vue_vue_type_template_id_094fe447___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./ReviewsVue.vue?vue&type=template&id=094fe447& */ "./.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447&");


/***/ }),

/***/ "./.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "content" }, [
    _c(
      "div",
      { staticClass: "full cl-reviewing" },
      [
        _c("membersfetcher", {
          attrs: { fetching: _vm.reviewer === null },
          scopedSlots: _vm._u([
            {
              key: "default",
              fn: function(fetcher) {
                return [
                  _vm.user.atLeast(_vm.instructor)
                    ? _c("div", [
                        _c(
                          "form",
                          {
                            attrs: { method: "post" },
                            on: {
                              submit: function($event) {
                                $event.preventDefault()
                                return _vm.assignReviews.apply(null, arguments)
                              }
                            }
                          },
                          [
                            _c("p", { staticClass: "center" }, [
                              _c("button", { attrs: { type: "submit" } }, [
                                _vm._v("Assign Reviews")
                              ]),
                              _vm._v(" "),
                              _c(
                                "select",
                                {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.reviewerCnt,
                                      expression: "reviewerCnt"
                                    }
                                  ],
                                  on: {
                                    change: function($event) {
                                      var $$selectedVal = Array.prototype.filter
                                        .call($event.target.options, function(
                                          o
                                        ) {
                                          return o.selected
                                        })
                                        .map(function(o) {
                                          var val =
                                            "_value" in o ? o._value : o.value
                                          return val
                                        })
                                      _vm.reviewerCnt = $event.target.multiple
                                        ? $$selectedVal
                                        : $$selectedVal[0]
                                    }
                                  }
                                },
                                _vm._l(6, function(num) {
                                  return _c(
                                    "option",
                                    { domProps: { value: num } },
                                    [_vm._v(_vm._s(num))]
                                  )
                                }),
                                0
                              )
                            ])
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "table",
                    { staticClass: "small" },
                    [
                      _c(
                        "tr",
                        [
                          _c("th", [_vm._v("Name")]),
                          _vm._v(" "),
                          _c("th", [_vm._v("User ID")]),
                          _vm._v(" "),
                          _vm._l(_vm.maxReviewer, function(i) {
                            return _c("th", [_vm._v("reviewee")])
                          }),
                          _vm._v(" "),
                          _vm._l(_vm.maxReviewee, function(i) {
                            return _c("th", [_vm._v("reviewer")])
                          })
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _vm._l(fetcher.users, function(user) {
                        return _c(
                          "tr",
                          [
                            _c(
                              "td",
                              { staticClass: "small" },
                              [
                                _c(
                                  "router-link",
                                  {
                                    attrs: {
                                      title: user.name,
                                      to:
                                        _vm.root +
                                        "/cl/console/grading/" +
                                        _vm.assigntag +
                                        "/" +
                                        user.member.id
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                " +
                                        _vm._s(user.name) +
                                        "\n              "
                                    )
                                  ]
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "td",
                              [
                                _c(
                                  "router-link",
                                  {
                                    attrs: {
                                      title: user.name,
                                      to:
                                        _vm.root +
                                        "/cl/console/grading/" +
                                        _vm.assigntag +
                                        "/" +
                                        user.member.id
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                " +
                                        _vm._s(user.userId) +
                                        "\n              "
                                    )
                                  ]
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _vm._l(_vm.maxReviewer, function(i) {
                              return _c(
                                "td",
                                {
                                  class: _vm.cls(
                                    _vm.reviewer[user.member.id],
                                    i - 1
                                  )
                                },
                                [
                                  _c("status-present", {
                                    attrs: {
                                      assigntag: _vm.assigntag,
                                      "status-user": _vm.displayUser(
                                        fetcher.users,
                                        _vm.reviewer[user.member.id],
                                        i - 1
                                      ),
                                      count:
                                        _vm.reviewer[user.member.id] !==
                                        undefined
                                          ? _vm.reviewer[user.member.id][
                                              i - 1
                                            ][1]
                                          : 0
                                    }
                                  })
                                ],
                                1
                              )
                            }),
                            _vm._v(" "),
                            _vm._l(_vm.maxReviewee, function(i) {
                              return _c(
                                "td",
                                {
                                  class: _vm.cls(
                                    _vm.reviewee[user.member.id],
                                    i - 1
                                  )
                                },
                                [
                                  _c("status-present", {
                                    attrs: {
                                      assigntag: _vm.assigntag,
                                      "status-user": _vm.displayUser(
                                        fetcher.users,
                                        _vm.reviewee[user.member.id],
                                        i - 1
                                      ),
                                      count:
                                        _vm.reviewer[user.member.id] !==
                                        undefined
                                          ? _vm.reviewer[user.member.id][
                                              i - 1
                                            ][1]
                                          : 0
                                    }
                                  })
                                ],
                                1
                              )
                            })
                          ],
                          2
                        )
                      })
                    ],
                    2
                  )
                ]
              }
            }
          ])
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "cl-reviews" },
    [
      _c("h2", [_vm._v("Staff Review")]),
      _vm._v(" "),
      _c(
        "form",
        {
          attrs: { method: "post" },
          on: {
            submit: function($event) {
              $event.preventDefault()
              return _vm.submit.apply(null, arguments)
            }
          }
        },
        [_c("div", { ref: "editor" }), _vm._v(" "), _vm._m(0)]
      ),
      _vm._v(" "),
      _c("h3", [_vm._v("Reviews by this user.")]),
      _vm._v(" "),
      _vm.byReviews.length === 0
        ? _c("p", { staticClass: "center" }, [_vm._v("None")])
        : _vm._e(),
      _vm._v(" "),
      _vm._l(_vm.byReviews, function(review) {
        return _c("div", { staticClass: "cl-review" }, [
          _c(
            "h3",
            { class: review.reviewee.atLeast(_vm.staffRole) ? "staff" : "" },
            [
              _vm._v(
                _vm._s(_vm.formatTime(review.time)) +
                  " Review by " +
                  _vm._s(review.reviewee.name) +
                  "\n      "
              ),
              _c("span", { staticClass: "cl-submitted" }, [
                _vm._v(_vm._s(_vm.showSubmissions(review)))
              ])
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "cl-review-present" }, [
            _vm._v(_vm._s(review.meta.review.review))
          ])
        ])
      }),
      _vm._v(" "),
      _c("h3", [_vm._v("Reviews of this user's assignment.")]),
      _vm._v(" "),
      _vm.forReviews.length === 0
        ? _c("p", { staticClass: "center" }, [_vm._v("None")])
        : _vm._e(),
      _vm._v(" "),
      _vm._l(_vm.forReviews, function(review) {
        return _c("div", { staticClass: "cl-review" }, [
          _c(
            "h3",
            { class: review.reviewer.atLeast(_vm.staffRole) ? "staff" : "" },
            [
              _vm._v(_vm._s(_vm.formatTime(review.time)) + "\n      "),
              review.reviewer.atLeast(_vm.staffRole)
                ? _c("span", [_vm._v("Staff Review")])
                : _c("span", [_vm._v("Review")]),
              _vm._v(" by " + _vm._s(review.reviewer.name) + "\n      "),
              _c("span", { staticClass: "cl-submitted" }, [
                _vm._v(_vm._s(_vm.showSubmissions(review)))
              ])
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "cl-review-present" }, [
            _vm._v(_vm._s(review.meta.review.review))
          ])
        ])
      })
    ],
    2
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _c("input", { attrs: { type: "submit", value: "Submit Review" } })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=template&id=4445c565&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=template&id=4445c565& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.statusUser !== null
    ? _c(
        "router-link",
        {
          attrs: {
            to:
              _vm.root +
              "/cl/console/grading/" +
              _vm.assigntag +
              "/" +
              _vm.statusUser.member.id,
            title: _vm.statusUser.name
          }
        },
        [_vm._v(_vm._s(_vm.statusUser.userId) + "/" + _vm._s(_vm.count))]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "content" }, [
    _c(
      "div",
      { staticClass: "full" },
      [
        _vm._l(_vm.json.submissions, function(submission) {
          return _c("div", { staticClass: "cl-submission-view" }, [
            _c("h2", [_vm._v(_vm._s(submission.name))]),
            _vm._v(" "),
            submission.type === "text"
              ? _c("pre", { staticClass: "cl-preview yellow-pad" }, [
                  _vm._v(_vm._s(submission.text))
                ])
              : _vm._e(),
            _vm._v(" "),
            submission.type === "image"
              ? _c("figure", { staticClass: "cl-preview" }, [
                  _c("img", { attrs: { src: _vm.previewImg(submission) } })
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("p", { staticClass: "cl-preview-time" }, [
              _vm._v(_vm._s(_vm.formatTime(submission.date)))
            ])
          ])
        }),
        _vm._v(" "),
        _c("h2", [_vm._v("Review")]),
        _vm._v(" "),
        _c(
          "form",
          {
            attrs: { method: "post" },
            on: {
              submit: function($event) {
                $event.preventDefault()
                return _vm.submit.apply(null, arguments)
              }
            }
          },
          [
            _c("div", { ref: "editor", staticClass: "shadow" }),
            _vm._v(" "),
            _vm._m(0)
          ]
        ),
        _vm._v(" "),
        _c("h2", [_vm._v("Previous Reviews")]),
        _vm._v(" "),
        _vm.reviewing.length === 0
          ? _c("p", { staticClass: "cl-reviews-none" }, [
              _vm._v("*** None Yet ***")
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm._l(_vm.reviewing, function(review) {
          return _c("div", { staticClass: "cl-review" }, [
            _c("h3", [
              _vm._v(
                _vm._s(_vm.formatTime(review.time)) + " Review by Me\n        "
              ),
              _c("span", { staticClass: "cl-submitted" }, [
                _vm._v(_vm._s(_vm.showSubmissions(review)))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "cl-review-present" }, [
              _vm._v(_vm._s(review.meta.review.review))
            ])
          ])
        })
      ],
      2
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _c("input", { attrs: { type: "submit", value: "Submit Review" } })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/$$virtual/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "cl-reviews" },
    [
      _c("h3", [_vm._v("Reviews of this assignment appear here.")]),
      _vm._v(" "),
      _vm.reviews.length === 0
        ? _c("p", { staticClass: "cl-reviews-none" }, [
            _vm._v("*** None Yet ***")
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm._l(_vm.reviews, function(review) {
        return _c("div", { staticClass: "cl-review" }, [
          _c("h3", { class: review.role !== undefined ? "staff" : "" }, [
            _vm._v(_vm._s(_vm.formatTime(review.time)) + "\n      "),
            review.role !== undefined
              ? _c("span", [_vm._v("Staff Review")])
              : _c("span", [_vm._v("Review")]),
            _vm._v(" by " + _vm._s(review.by) + "\n      "),
            _c("span", { staticClass: "cl-submitted" }, [
              _vm._v(_vm._s(_vm.showSubmissions(review)))
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "cl-review-present" }, [
            _vm._v(_vm._s(review.review))
          ])
        ])
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



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
/* harmony import */ var _ReviewReviewers_vue_vue_type_template_id_bec5dfdc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewReviewers.vue?vue&type=template&id=bec5dfdc& */ "./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc&");
/* harmony import */ var _ReviewReviewers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReviewReviewers.vue?vue&type=script&lang=js& */ "./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js&");
/* harmony import */ var _yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _ReviewReviewers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _ReviewReviewers_vue_vue_type_template_id_bec5dfdc___WEBPACK_IMPORTED_MODULE_0__.render,
  _ReviewReviewers_vue_vue_type_template_id_bec5dfdc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "vendor/cl/review/js/Console/ReviewReviewers.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

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
/* harmony import */ var _ReviewsByForMember_vue_vue_type_template_id_7b36fe76___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewsByForMember.vue?vue&type=template&id=7b36fe76& */ "./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76&");
/* harmony import */ var _ReviewsByForMember_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReviewsByForMember.vue?vue&type=script&lang=js& */ "./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js&");
/* harmony import */ var _yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _ReviewsByForMember_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _ReviewsByForMember_vue_vue_type_template_id_7b36fe76___WEBPACK_IMPORTED_MODULE_0__.render,
  _ReviewsByForMember_vue_vue_type_template_id_7b36fe76___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "vendor/cl/review/js/Console/ReviewsByForMember.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

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
/* harmony import */ var _StatusPresent_vue_vue_type_template_id_4445c565___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StatusPresent.vue?vue&type=template&id=4445c565& */ "./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=template&id=4445c565&");
/* harmony import */ var _StatusPresent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StatusPresent.vue?vue&type=script&lang=js& */ "./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=script&lang=js&");
/* harmony import */ var _yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _StatusPresent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _StatusPresent_vue_vue_type_template_id_4445c565___WEBPACK_IMPORTED_MODULE_0__.render,
  _StatusPresent_vue_vue_type_template_id_4445c565___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "vendor/cl/review/js/Console/StatusPresent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

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
/* harmony import */ var _ReviewVue_vue_vue_type_template_id_4eeb3262___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewVue.vue?vue&type=template&id=4eeb3262& */ "./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262&");
/* harmony import */ var _ReviewVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReviewVue.vue?vue&type=script&lang=js& */ "./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js&");
/* harmony import */ var _yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _ReviewVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _ReviewVue_vue_vue_type_template_id_4eeb3262___WEBPACK_IMPORTED_MODULE_0__.render,
  _ReviewVue_vue_vue_type_template_id_4eeb3262___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "vendor/cl/review/js/ReviewVue.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

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
/* harmony import */ var _ReviewsVue_vue_vue_type_template_id_094fe447___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewsVue.vue?vue&type=template&id=094fe447& */ "./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447&");
/* harmony import */ var _ReviewsVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReviewsVue.vue?vue&type=script&lang=js& */ "./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js&");
/* harmony import */ var _yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./.yarn/$$virtual/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-48c7785a24.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_yarn_$$virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_48c7785a24_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _ReviewsVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _ReviewsVue_vue_vue_type_template_id_094fe447___WEBPACK_IMPORTED_MODULE_0__.render,
  _ReviewsVue_vue_vue_type_template_id_094fe447___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "vendor/cl/review/js/ReviewsVue.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"Review": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcourselib"] = self["webpackChunkcourselib"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./vendor/cl/review/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3Vyc2VsaWIvdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1Jldmlld1Jldmlld2Vycy52dWUiLCJ3ZWJwYWNrOi8vY291cnNlbGliL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdzQnlGb3JNZW1iZXIudnVlIiwid2VicGFjazovL2NvdXJzZWxpYi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvU3RhdHVzUHJlc2VudC52dWUiLCJ3ZWJwYWNrOi8vY291cnNlbGliL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3VnVlLnZ1ZSIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvdmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdzVnVlLnZ1ZSIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvLi92ZW5kb3IvY2wvcmV2aWV3L2luZGV4LmpzIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdDb25zb2xlLmpzIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC9yZXZpZXcvX3Jldmlldy5zY3NzIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC9yZXZpZXcvX3Jldmlldy5zY3NzPzQ0OTEiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1Jldmlld1Jldmlld2Vycy52dWU/NmE0MSIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZT85ODEzIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9TdGF0dXNQcmVzZW50LnZ1ZT8zODcyIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3VnVlLnZ1ZT80ODEwIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3c1Z1ZS52dWU/YzRjNiIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3UmV2aWV3ZXJzLnZ1ZT8zNWQ1Iiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdzQnlGb3JNZW1iZXIudnVlPzcwZGEiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1N0YXR1c1ByZXNlbnQudnVlPzRiMWYiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdWdWUudnVlP2EyMmQiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdzVnVlLnZ1ZT9lMDkzIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdSZXZpZXdlcnMudnVlIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdzQnlGb3JNZW1iZXIudnVlIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9TdGF0dXNQcmVzZW50LnZ1ZSIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL1Jldmlld1Z1ZS52dWUiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdzVnVlLnZ1ZSIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY291cnNlbGliL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY291cnNlbGliL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY291cnNlbGliL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vY291cnNlbGliL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY291cnNlbGliL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY291cnNlbGliL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vY291cnNlbGliL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOlsiU2l0ZSIsImNvbnNvbGUiLCJ1bmRlZmluZWQiLCJSZXZpZXdDb25zb2xlIiwicmVhZHkiLCJQYWdlVnVlIiwiY3JlYXRlIiwiUmV2aWV3VnVlIiwiSW5saW5lVnVlIiwiUmV2aWV3c1Z1ZSIsInNldHVwIiwiQ29uc29sZSIsIlJldmlldyIsIlJldmlld3NCeUZvck1lbWJlclZ1ZSIsInRhYmxlcyIsImFkZCIsInRpdGxlIiwib3JkZXIiLCJhcGkiLCJjb21wb25lbnRzIiwiYWRkUm91dGUiLCJyb3V0ZSIsImNvbXBvbmVudCIsIlJldmlld1Jldmlld2Vyc1Z1ZSIsInByb3BzIiwiY291cnNlIiwiYXNzaWdubWVudExpbmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtREE7QUFFQTtBQUNBLDJDQURBO0FBRUEsc0JBRkE7QUFHQTtBQUNBO0FBQ0Esc0JBREE7QUFFQSxvQkFGQTtBQUdBLG9CQUhBO0FBSUEsNkNBSkE7QUFLQSxvQkFMQTtBQU1BLG9CQU5BO0FBT0Esb0JBUEE7QUFRQTtBQVJBO0FBVUEsR0Fk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QUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsNEc7Ozs7O1VDOUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoicmV2aWV3LmRldi5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImZ1bGwgY2wtcmV2aWV3aW5nXCI+XHJcblxyXG4gICAgICA8bWVtYmVyc2ZldGNoZXIgOmZldGNoaW5nPVwicmV2aWV3ZXIgPT09IG51bGxcIj5cclxuICAgICAgICA8dGVtcGxhdGUgc2xvdC1zY29wZT1cImZldGNoZXJcIj5cclxuICAgICAgICAgIDxkaXYgdi1pZj1cInVzZXIuYXRMZWFzdChpbnN0cnVjdG9yKVwiPlxyXG4gICAgICAgICAgICA8Zm9ybSBtZXRob2Q9XCJwb3N0XCIgQHN1Ym1pdC5wcmV2ZW50PVwiYXNzaWduUmV2aWV3c1wiPlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2VudGVyXCI+PGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+QXNzaWduIFJldmlld3M8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxzZWxlY3Qgdi1tb2RlbD1cInJldmlld2VyQ250XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdi1mb3I9XCJudW0gaW4gNlwiIDp2YWx1ZT1cIm51bVwiPnt7bnVtfX08L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPHRhYmxlIGNsYXNzPVwic21hbGxcIj5cclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgIDx0aD5OYW1lPC90aD5cclxuICAgICAgICAgICAgICA8dGg+VXNlciBJRDwvdGg+XHJcbiAgICAgICAgICAgICAgPHRoIHYtZm9yPVwiaSBpbiBtYXhSZXZpZXdlclwiPnJldmlld2VlPC90aD5cclxuICAgICAgICAgICAgICA8dGggdi1mb3I9XCJpIGluIG1heFJldmlld2VlXCI+cmV2aWV3ZXI8L3RoPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICA8dHIgdi1mb3I9XCJ1c2VyIGluIGZldGNoZXIudXNlcnNcIj5cclxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJzbWFsbFwiPlxyXG4gICAgICAgICAgICAgICAgPHJvdXRlci1saW5rIDp0aXRsZT1cInVzZXIubmFtZVwiIDp0bz1cInJvb3QgKyAnL2NsL2NvbnNvbGUvZ3JhZGluZy8nICsgYXNzaWdudGFnICsgJy8nICsgdXNlci5tZW1iZXIuaWRcIj5cclxuICAgICAgICAgICAgICAgICAge3t1c2VyLm5hbWV9fVxyXG4gICAgICAgICAgICAgICAgPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayA6dGl0bGU9XCJ1c2VyLm5hbWVcIiA6dG89XCJyb290ICsgJy9jbC9jb25zb2xlL2dyYWRpbmcvJyArIGFzc2lnbnRhZyArICcvJyArIHVzZXIubWVtYmVyLmlkXCI+XHJcbiAgICAgICAgICAgICAgICAgIHt7dXNlci51c2VySWR9fVxyXG4gICAgICAgICAgICAgICAgPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgIDx0ZCB2LWZvcj1cImkgaW4gbWF4UmV2aWV3ZXJcIiA6Y2xhc3M9XCJjbHMocmV2aWV3ZXJbdXNlci5tZW1iZXIuaWRdLCBpLTEpXCI+XHJcbiAgICAgICAgICAgICAgICA8c3RhdHVzLXByZXNlbnQgOmFzc2lnbnRhZz1cImFzc2lnbnRhZ1wiIDpzdGF0dXMtdXNlcj1cImRpc3BsYXlVc2VyKGZldGNoZXIudXNlcnMsIHJldmlld2VyW3VzZXIubWVtYmVyLmlkXSwgaS0xKVwiIDpjb3VudD1cInJldmlld2VyW3VzZXIubWVtYmVyLmlkXSAhPT0gdW5kZWZpbmVkID8gcmV2aWV3ZXJbdXNlci5tZW1iZXIuaWRdW2ktMV1bMV0gOiAwXCI+PC9zdGF0dXMtcHJlc2VudD5cclxuICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgIDx0ZCB2LWZvcj1cImkgaW4gbWF4UmV2aWV3ZWVcIiA6Y2xhc3M9XCJjbHMocmV2aWV3ZWVbdXNlci5tZW1iZXIuaWRdLCBpLTEpXCI+XHJcbiAgICAgICAgICAgICAgICA8c3RhdHVzLXByZXNlbnQgOmFzc2lnbnRhZz1cImFzc2lnbnRhZ1wiIDpzdGF0dXMtdXNlcj1cImRpc3BsYXlVc2VyKGZldGNoZXIudXNlcnMsIHJldmlld2VlW3VzZXIubWVtYmVyLmlkXSwgaS0xKVwiIDpjb3VudD1cInJldmlld2VyW3VzZXIubWVtYmVyLmlkXSAhPT0gdW5kZWZpbmVkID8gcmV2aWV3ZXJbdXNlci5tZW1iZXIuaWRdW2ktMV1bMV0gOiAwXCI+PC9zdGF0dXMtcHJlc2VudD5cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgPC90ZW1wbGF0ZT5cclxuICAgICAgPC9tZW1iZXJzZmV0Y2hlcj5cclxuXHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblxyXG4gIGltcG9ydCBTdGF0dXNQcmVzZW50VnVlIGZyb20gJy4vU3RhdHVzUHJlc2VudC52dWUnO1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICAnZXh0ZW5kcyc6IFNpdGUuU2l0ZS5Db25zb2xlQ29tcG9uZW50QmFzZSxcclxuICAgIHByb3BzOiBbJ2Fzc2lnbnRhZyddLFxyXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGFzc2lnbm1lbnQ6IG51bGwsXHJcbiAgICAgICAgcmV2aWV3ZXJDbnQ6IDIsXHJcbiAgICAgICAgcmV2aWV3aW5nOiAneCcsXHJcbiAgICAgICAgaW5zdHJ1Y3RvcjogU2l0ZS5TaXRlLk1lbWJlci5JTlNUUlVDVE9SLFxyXG4gICAgICAgIHJldmlld2VyOiBudWxsLFxyXG4gICAgICAgIHJldmlld2VlOiBudWxsLFxyXG4gICAgICAgIG1heFJldmlld2VyOiAwLFxyXG4gICAgICAgIG1heFJldmlld2VlOiAwXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRzOiB7XHJcbiAgICAgICdtZW1iZXJzZmV0Y2hlcic6IFNpdGUuTWVtYmVyc0ZldGNoZXJDb21wb25lbnRWdWUsXHJcbiAgICAgICdzdGF0dXMtcHJlc2VudCc6IFN0YXR1c1ByZXNlbnRWdWVcclxuICAgIH0sXHJcbiAgICBtb3VudGVkKCkge1xyXG4gICAgICBjb25zdCBtZW1iZXIgPSB0aGlzLiRzdG9yZS5zdGF0ZS51c2VyLnVzZXIubWVtYmVyO1xyXG5cclxuICAgICAgdGhpcy5zZWN0aW9uID0gdGhpcy4kc3RvcmUuZ2V0dGVyc1snY291cnNlL3NlY3Rpb24nXShtZW1iZXIuc2VtZXN0ZXIsIG1lbWJlci5zZWN0aW9uKTtcclxuICAgICAgdGhpcy5hc3NpZ25tZW50ID0gdGhpcy5zZWN0aW9uLmdldEFzc2lnbm1lbnQodGhpcy5hc3NpZ250YWcpO1xyXG5cclxuICAgICAgdGhpcy5zZXRUaXRsZSgnOiAnICsgdGhpcy5hc3NpZ25tZW50LnNob3J0bmFtZSArICcgUmV2aWV3aW5nJyk7XHJcblxyXG4gICAgICB0aGlzLiRzaXRlLmFwaS5nZXQoJy9hcGkvcmV2aWV3L3Jldmlld2Vycy8nICsgdGhpcy5hc3NpZ250YWcsIHt9KVxyXG4gICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5oYXNFcnJvcigpKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudGFrZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRzaXRlLnRvYXN0KHRoaXMsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcclxuICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICBhc3NpZ25SZXZpZXdzKCkge1xyXG4gICAgICAgIGlmKHRoaXMubWF4UmV2aWV3ZXIgPiAwIHx8IHRoaXMubWF4UmV2aWV3ZWUgPiAwKSB7XHJcbiAgICAgICAgICBuZXcgdGhpcy4kc2l0ZS5EaWFsb2cuTWVzc2FnZUJveCgnQXJlIHlvdSBzdXJlPycsICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gYXNzaWduIHJldmlld2Vycz8gVGhpcyB3aWxsIHJlcGxhY2UgdGhlIGV4aXN0aW5nIHJldmlld2luZyBhc3NpZ25tZW50cy4nLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRzaXRlLkRpYWxvZy5NZXNzYWdlQm94Lk9LQ0FOQ0VMLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hc3NpZ25SZXZpZXdzQWN0dWFsKCk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmFzc2lnblJldmlld3NBY3R1YWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGFzc2lnblJldmlld3NBY3R1YWwoKSB7XHJcbiAgICAgICAgdGhpcy5yZXZpZXdlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5yZXZpZXdlZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5tYXhSZXZpZXdlciA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXhSZXZpZXdlZSA9IDA7XHJcblxyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICBjbnQ6IHRoaXMucmV2aWV3ZXJDbnRcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy4kc2l0ZS5hcGkucG9zdCgnL2FwaS9yZXZpZXcvcmV2aWV3ZXJzLycgKyB0aGlzLmFzc2lnbnRhZywgcGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuaGFzRXJyb3IoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFrZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2l0ZS50b2FzdCh0aGlzLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRzaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgfSxcclxuICAgICAgdGFrZShyZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5nZXREYXRhKCdyZXZpZXdlcnMnKS5hdHRyaWJ1dGVzO1xyXG5cclxuICAgICAgICB0aGlzLnJldmlld2VyID0ge307XHJcbiAgICAgICAgdGhpcy5yZXZpZXdlZSA9IHt9O1xyXG4gICAgICAgIHRoaXMubWF4UmV2aWV3ZXIgPSAwO1xyXG4gICAgICAgIHRoaXMubWF4UmV2aWV3ZWUgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBhc3NpZ24gb2YgZGF0YSkge1xyXG4gICAgICAgICAgY29uc3QgcmV2aWV3ZXIgPSArYXNzaWduWzBdO1xyXG4gICAgICAgICAgY29uc3QgcmV2aWV3ZWUgPSArYXNzaWduWzFdO1xyXG4gICAgICAgICAgY29uc3QgY250ID0gK2Fzc2lnblsyXTtcclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5yZXZpZXdlcltyZXZpZXdlcl0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJldmlld2VyW3Jldmlld2VyXSA9IFtdO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMucmV2aWV3ZXJbcmV2aWV3ZXJdLnB1c2goW3Jldmlld2VlLCBjbnRdKTtcclxuICAgICAgICAgIGlmICh0aGlzLnJldmlld2VyW3Jldmlld2VyXS5sZW5ndGggPiB0aGlzLm1heFJldmlld2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF4UmV2aWV3ZXIgPSB0aGlzLnJldmlld2VyW3Jldmlld2VyXS5sZW5ndGg7XHJcbiAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgIGlmICh0aGlzLnJldmlld2VlW3Jldmlld2VlXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV2aWV3ZWVbcmV2aWV3ZWVdID0gW107XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy5yZXZpZXdlZVtyZXZpZXdlZV0ucHVzaChbcmV2aWV3ZXIsIGNudF0pO1xyXG4gICAgICAgICAgaWYgKHRoaXMucmV2aWV3ZWVbcmV2aWV3ZWVdLmxlbmd0aCA+IHRoaXMubWF4UmV2aWV3ZWUpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXhSZXZpZXdlZSA9IHRoaXMucmV2aWV3ZXJbcmV2aWV3ZXJdLmxlbmd0aDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICB9LFxyXG4gICAgICBkaXNwbGF5VXNlcih1c2VycywgYXNzaWduLCBpKSB7XHJcbiAgICAgICAgaWYgKGFzc2lnbiA9PT0gdW5kZWZpbmVkIHx8IGkgPj0gYXNzaWduLmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCB1c2VyIG9mIHVzZXJzKSB7XHJcbiAgICAgICAgICBpZiAodXNlci5tZW1iZXIuaWQgPT09IGFzc2lnbltpXVswXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXNlcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9LFxyXG4gICAgICBjbHMoYXNzaWduLCBpKSB7XHJcbiAgICAgICAgaWYgKGFzc2lnbiA9PT0gdW5kZWZpbmVkIHx8IGkgPj0gYXNzaWduLmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFzc2lnbltpXVsxXSA8IDEgPyAnY2wtZW1wdHknIDogJyc7XHJcblxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJjbC1yZXZpZXdzXCI+XHJcbiAgICA8aDI+U3RhZmYgUmV2aWV3PC9oMj5cclxuICAgIDxmb3JtIG1ldGhvZD1cInBvc3RcIiBAc3VibWl0LnByZXZlbnQ9XCJzdWJtaXRcIj5cclxuICAgICAgPGRpdiByZWY9XCJlZGl0b3JcIj48L2Rpdj5cclxuICAgICAgPHA+PGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlN1Ym1pdCBSZXZpZXdcIj48L3A+XHJcbiAgICA8L2Zvcm0+XHJcblxyXG4gICAgPGgzPlJldmlld3MgYnkgdGhpcyB1c2VyLjwvaDM+XHJcbiAgICA8cCB2LWlmPVwiYnlSZXZpZXdzLmxlbmd0aCAgPT09IDBcIiBjbGFzcz1cImNlbnRlclwiPk5vbmU8L3A+XHJcbiAgICA8ZGl2IHYtZm9yPVwicmV2aWV3IGluIGJ5UmV2aWV3c1wiIGNsYXNzPVwiY2wtcmV2aWV3XCI+XHJcbiAgICAgIDxoMyA6Y2xhc3M9XCJyZXZpZXcucmV2aWV3ZWUuYXRMZWFzdChzdGFmZlJvbGUpID8gJ3N0YWZmJyA6ICcnXCI+e3tmb3JtYXRUaW1lKHJldmlldy50aW1lKX19IFJldmlldyBieSB7e3Jldmlldy5yZXZpZXdlZS5uYW1lfX1cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImNsLXN1Ym1pdHRlZFwiPnt7c2hvd1N1Ym1pc3Npb25zKHJldmlldyl9fTwvc3Bhbj48L2gzPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2wtcmV2aWV3LXByZXNlbnRcIj57e3Jldmlldy5tZXRhLnJldmlldy5yZXZpZXd9fTwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8aDM+UmV2aWV3cyBvZiB0aGlzIHVzZXIncyBhc3NpZ25tZW50LjwvaDM+XHJcbiAgICA8cCB2LWlmPVwiZm9yUmV2aWV3cy5sZW5ndGggID09PSAwXCIgY2xhc3M9XCJjZW50ZXJcIj5Ob25lPC9wPlxyXG4gICAgPGRpdiB2LWZvcj1cInJldmlldyBpbiBmb3JSZXZpZXdzXCIgY2xhc3M9XCJjbC1yZXZpZXdcIj5cclxuICAgICAgPGgzIDpjbGFzcz1cInJldmlldy5yZXZpZXdlci5hdExlYXN0KHN0YWZmUm9sZSkgPyAnc3RhZmYnIDogJydcIj57e2Zvcm1hdFRpbWUocmV2aWV3LnRpbWUpfX1cclxuICAgICAgICA8c3BhbiB2LWlmPVwicmV2aWV3LnJldmlld2VyLmF0TGVhc3Qoc3RhZmZSb2xlKVwiPlN0YWZmIFJldmlldzwvc3Bhbj5cclxuICAgICAgICA8c3BhbiB2LWVsc2U+UmV2aWV3PC9zcGFuPiBieSB7e3Jldmlldy5yZXZpZXdlci5uYW1lfX1cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImNsLXN1Ym1pdHRlZFwiPnt7c2hvd1N1Ym1pc3Npb25zKHJldmlldyl9fTwvc3Bhbj48L2gzPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2wtcmV2aWV3LXByZXNlbnRcIj57e3Jldmlldy5tZXRhLnJldmlldy5yZXZpZXd9fTwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuXHQvKipcclxuICAgKiBQcmVzZW50IHJldmlld3MgYnkgYW5kIGZvciBhIG1lbWJlciBhbmQgdGhlIHN0YWZmIHJldmlld2luZyBmb3JtLlxyXG4gICAqIEBjb25zdHJ1Y3RvciBSZXZpZXdzQnlGb3JNZW1iZXJWdWVcclxuICAgKi9cclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gIFx0cHJvcHM6IFsndXNlcicsICdhc3NpZ250YWcnXSxcclxuICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xyXG4gIFx0XHRyZXR1cm4ge1xyXG4gICAgICAgIGZvclJldmlld3M6IFtdLFxyXG4gICAgICAgIGJ5UmV2aWV3czogW10sXHJcbiAgICAgICAgc3RhZmZSb2xlOiBTaXRlLlNpdGUuTWVtYmVyLlNUQUZGLFxyXG4gICAgICAgIHN1Ym1pc3Npb25zOiBbXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgd2F0Y2g6IHtcclxuICBcdFx0dXNlcigpIHtcclxuICBcdFx0XHR0aGlzLmZvclJldmlld3MgPSBbXTtcclxuICBcdFx0XHR0aGlzLmJ5UmV2aWV3cyA9IFtdO1xyXG4gIFx0XHRcdHRoaXMuc3VibWlzc2lvbnMgPSBbXTtcclxuICBcdFx0XHR0aGlzLmZldGNoKCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb3VudGVkKCkge1xyXG5cdCAgICBjb25zdCBlbGVtZW50ID0gdGhpcy4kcmVmc1snZWRpdG9yJ107XHJcblx0ICAgIHRoaXMuZWRpdG9yID0gbmV3IHRoaXMuJHNpdGUuRWRpdG9yKGVsZW1lbnQsIHtcclxuXHRcdCAgICBoZWlnaHQ6ICcxMGVtJyxcclxuXHRcdCAgICBjbGFzc2VzOiBbJ3llbGxvdy1wYWQnXVxyXG5cdCAgICB9KTtcclxuXHJcblx0ICAgIHRoaXMuZmV0Y2goKTtcclxuICAgIH0sXHJcblx0ICBtZXRob2RzOiB7XHJcbiAgXHRcdGZldGNoKCkge1xyXG4gICAgICAgIHRoaXMuJHNpdGUuYXBpLmdldCgnL2FwaS9yZXZpZXcvcmV2aWV3cy8nICsgdGhpcy5hc3NpZ250YWcgKyAnLycgKyB0aGlzLnVzZXIubWVtYmVyLmlkLCB7fSlcclxuICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcclxuICAgICAgICAgICAgICB0aGlzLnRha2UocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgICAgIHRoaXMuJHNpdGUudG9hc3QodGhpcywgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuXHQgICAgICAgICAgdGhpcy4kc2l0ZS50b2FzdCh0aGlzLCBlcnJvcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICBcdFx0dGFrZShyZXNwb25zZSkge1xyXG4gICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZ2V0RGF0YSgncmV2aWV3cy1ieS1mb3InKS5hdHRyaWJ1dGVzO1xyXG4gICAgICAgIGxldCBzdWJtaXREYXRhID0gcmVzcG9uc2UuZ2V0RGF0YSgnYXNzaWdubWVudC1zdWJtaXNzaW9ucycpO1xyXG4gICAgICAgIGlmKHN1Ym1pdERhdGEgIT09IG51bGwpIHtcclxuXHQgICAgICAgIHRoaXMuc3VibWlzc2lvbnMgPSBzdWJtaXREYXRhLmF0dHJpYnV0ZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IobGV0IHJldmlldyBvZiBkYXRhLmZvcikge1xyXG5cdCAgICAgICAgcmV2aWV3LnJldmlld2VyID0gbmV3IFNpdGUuVXNlcihyZXZpZXcucmV2aWV3ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IHJldmlldyBvZiBkYXRhLmJ5KSB7XHJcblx0ICAgICAgICByZXZpZXcucmV2aWV3ZWUgPSBuZXcgU2l0ZS5Vc2VyKHJldmlldy5yZXZpZXdlZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmZvclJldmlld3MgPSBkYXRhLmZvcjtcclxuICAgICAgICB0aGlzLmJ5UmV2aWV3cyA9IGRhdGEuYnk7XHJcbiAgICAgIH0sXHJcblx0ICAgIHN1Ym1pdCgpIHtcclxuXHRcdCAgICBjb25zdCB0ZXh0ID0gdGhpcy5lZGl0b3IudGV4dGFyZWEudmFsdWUudHJpbSgpO1xyXG5cdFx0ICAgIGlmKHRleHQgPT09ICcnKSB7XHJcblx0XHRcdCAgICBTaXRlLnRvYXN0KHRoaXMsICdZb3UgbXVzdCBlbnRlciBzb21lIHRleHQgdG8gc3VibWl0Jyk7XHJcblx0XHRcdCAgICByZXR1cm47XHJcblx0XHQgICAgfVxyXG5cclxuXHRcdCAgICBsZXQgc3VibWlzc2lvbnMgPSB7fTtcclxuXHRcdCAgICBmb3IobGV0IHRhZyBpbiB0aGlzLnN1Ym1pc3Npb25zKSB7XHJcblx0XHQgICAgXHRjb25zb2xlLmxvZyh0aGlzLnN1Ym1pc3Npb25zW3RhZ10pO1xyXG5cdFx0ICAgIFx0c3VibWlzc2lvbnNbdGFnXSA9IHtcclxuXHRcdCAgICAgICAgJ2lkJzogdGhpcy5zdWJtaXNzaW9uc1t0YWddWzBdLmlkLFxyXG4gICAgICAgICAgICAnZGF0ZSc6IHRoaXMuc3VibWlzc2lvbnNbdGFnXVswXS5kYXRlXHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cdFx0ICAgIGxldCBwYXJhbXMgPSB7XHJcblx0XHRcdCAgICB0eXBlOiAndGV4dC9wbGFpbicsXHJcblx0XHRcdCAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgICAgc3VibWlzc2lvbnM6IHN1Ym1pc3Npb25zXHJcblx0XHQgICAgfVxyXG5cclxuXHRcdCAgICBTaXRlLmFwaS5wb3N0KGAvYXBpL3Jldmlldy9zdGFmZnJldmlldy8ke3RoaXMuYXNzaWdudGFnfS8ke3RoaXMudXNlci5tZW1iZXIuaWR9YCwgcGFyYW1zKVxyXG5cdFx0XHQgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0ICAgIGlmICghcmVzcG9uc2UuaGFzRXJyb3IoKSkge1xyXG5cdFx0XHRcdFx0ICAgIHRoaXMuZWRpdG9yLnRleHRhcmVhLnZhbHVlID0gJyc7XHJcblx0XHRcdFx0XHQgICAgdGhpcy50YWtlKHJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdCAgICBTaXRlLnRvYXN0KHRoaXMsIFwiUmV2aWV3IHN1Y2Nlc3NmdWxseSBzYXZlZCB0byB0aGUgc2VydmVyXCIpO1xyXG5cdFx0XHRcdCAgICB9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ICAgIFNpdGUudG9hc3QodGhpcywgcmVzcG9uc2UpO1xyXG5cdFx0XHRcdCAgICB9XHJcblxyXG5cdFx0XHQgICAgfSlcclxuXHRcdFx0ICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuXHRcdFx0XHQgICAgU2l0ZS50b2FzdCh0aGlzLCBlcnJvcik7XHJcblx0XHRcdCAgICB9KTtcclxuXHQgICAgfSxcclxuXHRcdCAgZm9ybWF0VGltZSh0aW1lKSB7XHJcblx0XHRcdCAgcmV0dXJuIHRoaXMuJHNpdGUuVGltZUZvcm1hdHRlci5yZWxhdGl2ZVVOSVgodGltZSwgbnVsbCk7XHJcblx0XHQgIH0sXHJcblx0ICAgIHNob3dTdWJtaXNzaW9ucyhyZXZpZXcpIHtcclxuICBcdFx0XHRsZXQgc3VibWlzc2lvbnMgPSByZXZpZXcubWV0YS5yZXZpZXcuc3VibWlzc2lvbnM7XHJcblxyXG5cdFx0ICAgIGxldCByZXQgPSAnJztcclxuXHRcdCAgICBmb3IobGV0IHRhZyBpbiBzdWJtaXNzaW9ucykge1xyXG5cdFx0XHQgICAgcmV0ICs9IHRoaXMuJHNpdGUuVGltZUZvcm1hdHRlci5hYnNvbHV0ZVVOSVgoc3VibWlzc2lvbnNbdGFnXS5kYXRlKTtcclxuXHRcdCAgICB9XHJcblxyXG5cdFx0ICAgIGlmKHJldCA9PT0gJycpIHtcclxuXHRcdFx0ICAgIHJldHVybiAnJztcclxuXHRcdCAgICB9XHJcblxyXG5cdFx0ICAgIHJldHVybiAnU3VibWlzc2lvbjogJyArIHJldDtcclxuXHQgICAgfVxyXG5cdCAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPlxyXG4gICAgPHJvdXRlci1saW5rIDp0bz1cInJvb3QgKyAnL2NsL2NvbnNvbGUvZ3JhZGluZy8nICsgYXNzaWdudGFnICsgJy8nICsgc3RhdHVzVXNlci5tZW1iZXIuaWRcIiB2LWlmPVwic3RhdHVzVXNlciAhPT0gbnVsbFwiIDp0aXRsZT1cInN0YXR1c1VzZXIubmFtZVwiPnt7c3RhdHVzVXNlci51c2VySWR9fS97e2NvdW50fX08L3JvdXRlci1saW5rPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yIFN0YXR1c1ByZXNlbnRWdWVcclxuICAgICAqIERpc3BsYXlzIHRoZSBzdGF0dXMgb2YgYSByZXZpZXdlciBvciByZXZpZXdlZS5cclxuICAgICAqIFVzZWQgYnkgUmV2aWV3UmV2aWV3ZXJzLnZ1ZVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICAgICAgJ2V4dGVuZHMnOiBTaXRlLlNpdGUuQ29uc29sZUNvbXBvbmVudEJhc2UsXHJcbiAgICAgICAgcHJvcHM6IFsnYXNzaWdudGFnJywgJ3N0YXR1c1VzZXInLCAnY291bnQnXVxyXG4gICAgfVxyXG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJmdWxsXCI+XHJcbiAgICAgIDxkaXYgdi1mb3I9XCJzdWJtaXNzaW9uIGluIGpzb24uc3VibWlzc2lvbnNcIiBjbGFzcz1cImNsLXN1Ym1pc3Npb24tdmlld1wiPlxyXG4gICAgICAgIDxoMj57e3N1Ym1pc3Npb24ubmFtZX19PC9oMj5cclxuICAgICAgICA8cHJlIHYtaWY9XCJzdWJtaXNzaW9uLnR5cGUgPT09ICd0ZXh0J1wiIGNsYXNzPVwiY2wtcHJldmlldyB5ZWxsb3ctcGFkXCI+e3tzdWJtaXNzaW9uLnRleHR9fTwvcHJlPlxyXG4gICAgICAgIDxmaWd1cmUgdi1pZj1cInN1Ym1pc3Npb24udHlwZSA9PT0gJ2ltYWdlJ1wiIGNsYXNzPVwiY2wtcHJldmlld1wiPjxpbWcgOnNyYz1cInByZXZpZXdJbWcoc3VibWlzc2lvbilcIj48L2ZpZ3VyZT5cclxuICAgICAgICA8cCBjbGFzcz1cImNsLXByZXZpZXctdGltZVwiPnt7Zm9ybWF0VGltZShzdWJtaXNzaW9uLmRhdGUpfX08L3A+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGgyPlJldmlldzwvaDI+XHJcbiAgICAgIDxmb3JtIG1ldGhvZD1cInBvc3RcIiBAc3VibWl0LnByZXZlbnQ9XCJzdWJtaXRcIj5cclxuICAgICAgICA8ZGl2IHJlZj1cImVkaXRvclwiIGNsYXNzPVwic2hhZG93XCI+PC9kaXY+XHJcbiAgICAgICAgPHA+PGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlN1Ym1pdCBSZXZpZXdcIj48L3A+XHJcbiAgICAgIDwvZm9ybT5cclxuXHJcbiAgICAgIDxoMj5QcmV2aW91cyBSZXZpZXdzPC9oMj5cclxuICAgICAgPHAgY2xhc3M9XCJjbC1yZXZpZXdzLW5vbmVcIiB2LWlmPVwicmV2aWV3aW5nLmxlbmd0aCA9PT0gMFwiPioqKiBOb25lIFlldCAqKio8L3A+XHJcbiAgICAgIDxkaXYgdi1mb3I9XCJyZXZpZXcgaW4gcmV2aWV3aW5nXCIgY2xhc3M9XCJjbC1yZXZpZXdcIj5cclxuICAgICAgICA8aDM+e3tmb3JtYXRUaW1lKHJldmlldy50aW1lKX19IFJldmlldyBieSBNZVxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjbC1zdWJtaXR0ZWRcIj57e3Nob3dTdWJtaXNzaW9ucyhyZXZpZXcpfX08L3NwYW4+PC9oMz5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2wtcmV2aWV3LXByZXNlbnRcIj57e3Jldmlldy5tZXRhLnJldmlldy5yZXZpZXd9fTwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICAnZXh0ZW5kcyc6IFNpdGUuU2l0ZS5Vc2VyVnVlQmFzZSxcclxuICAgIHByb3BzOiBbJ2pzb24nXSxcclxuICAgIGRhdGE6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICByZXZpZXdpbmc6IFtdLFxyXG4gICAgICAgIHN1Ym1pc3Npb25zOiB7fVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW91bnRlZCgpIHtcclxuICAgICAgdGhpcy5zZXRUaXRsZSgnUGVlciBSZXZpZXdpbmcnKTtcclxuICAgICAgdGhpcy5yZXZpZXdpbmcgPSB0aGlzLmpzb24ucmV2aWV3aW5nO1xyXG5cclxuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuJHJlZnNbJ2VkaXRvciddO1xyXG4gICAgICB0aGlzLmVkaXRvciA9IG5ldyB0aGlzLiRzaXRlLkVkaXRvcihlbGVtZW50LCB7XHJcbiAgICAgICAgaGVpZ2h0OiAnMTBlbScsXHJcbiAgICAgICAgY2xhc3NlczogWyd5ZWxsb3ctcGFkJ11cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBsZXQgc3VibWlzc2lvbnMgPSB7fTtcclxuICAgICAgZm9yIChjb25zdCBzdWJtaXNzaW9uIG9mIHRoaXMuanNvbi5zdWJtaXNzaW9ucykge1xyXG4gICAgICAgIHN1Ym1pc3Npb25zW3N1Ym1pc3Npb24udGFnXSA9IHtcclxuICAgICAgICAgICdpZCc6IHN1Ym1pc3Npb24uaWQsXHJcbiAgICAgICAgICAnZGF0ZSc6IHN1Ym1pc3Npb24uZGF0ZVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuc3VibWlzc2lvbnMgPSBzdWJtaXNzaW9ucztcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIHN1Ym1pdCgpIHtcclxuICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy5lZGl0b3IudGV4dGFyZWEudmFsdWUudHJpbSgpO1xyXG4gICAgICAgIGlmICh0ZXh0ID09PSAnJykge1xyXG4gICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCAnWW91IG11c3QgZW50ZXIgc29tZSB0ZXh0IHRvIHN1Ym1pdCcpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICAgIHR5cGU6ICd0ZXh0L3BsYWluJyxcclxuICAgICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICBzdWJtaXNzaW9uczogdGhpcy5zdWJtaXNzaW9uc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4kc2l0ZS5hcGkucG9zdChgL2FwaS9yZXZpZXcvcmV2aWV3LyR7dGhpcy5qc29uLmlkfWAsIHBhcmFtcylcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci50ZXh0YXJlYS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV2aWV3aW5nID0gcmVzcG9uc2UuZ2V0RGF0YSgncmV2aWV3aW5nJykuYXR0cmlidXRlcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2l0ZS50b2FzdCh0aGlzLCBcIlJldmlldyBzdWNjZXNzZnVsbHkgc2F2ZWQgdG8gdGhlIHNlcnZlclwiKTtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzaXRlLnRvYXN0KHRoaXMsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuJHNpdGUudG9hc3QodGhpcywgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZvcm1hdFRpbWUodGltZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRzaXRlLlRpbWVGb3JtYXR0ZXIucmVsYXRpdmVVTklYKHRpbWUsIG51bGwpO1xyXG4gICAgICB9LFxyXG4gICAgICBzaG93U3VibWlzc2lvbnMocmV2aWV3KSB7XHJcbiAgICAgICAgbGV0IHBhc3QgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBzdWJtaXNzaW9ucyA9IHJldmlldy5tZXRhLnJldmlldy5zdWJtaXNzaW9ucztcclxuICAgICAgICBmb3IgKGxldCB0YWcgaW4gc3VibWlzc2lvbnMpIHtcclxuICAgICAgICAgIGlmIChzdWJtaXNzaW9uc1t0YWddLmlkICE9PSB0aGlzLnN1Ym1pc3Npb25zW3RhZ10uaWQpIHtcclxuICAgICAgICAgICAgcGFzdCA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFzdCkge1xyXG4gICAgICAgICAgcmV0dXJuICdGb3IgYSBwYXN0IHN1Ym1pc3Npb24nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgICBwcmV2aWV3SW1nKHN1Ym1pc3Npb24pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kc2l0ZS5yb290ICsgJy9jbC9yZXZpZXcvaW1nLycgKyBzdWJtaXNzaW9uLmlkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cImNsLXJldmlld3NcIj5cclxuICAgIDxoMz5SZXZpZXdzIG9mIHRoaXMgYXNzaWdubWVudCBhcHBlYXIgaGVyZS48L2gzPlxyXG4gICAgPHAgY2xhc3M9XCJjbC1yZXZpZXdzLW5vbmVcIiB2LWlmPVwicmV2aWV3cy5sZW5ndGggPT09IDBcIj4qKiogTm9uZSBZZXQgKioqPC9wPlxyXG4gICAgPGRpdiB2LWZvcj1cInJldmlldyBpbiByZXZpZXdzXCIgY2xhc3M9XCJjbC1yZXZpZXdcIj5cclxuICAgICAgPGgzIDpjbGFzcz1cInJldmlldy5yb2xlICE9PSB1bmRlZmluZWQgPyAnc3RhZmYnIDogJydcIj57e2Zvcm1hdFRpbWUocmV2aWV3LnRpbWUpfX1cclxuICAgICAgICA8c3BhbiB2LWlmPVwicmV2aWV3LnJvbGUgIT09IHVuZGVmaW5lZFwiPlN0YWZmIFJldmlldzwvc3Bhbj5cclxuICAgICAgICA8c3BhbiB2LWVsc2U+UmV2aWV3PC9zcGFuPiBieSB7e3Jldmlldy5ieX19XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjbC1zdWJtaXR0ZWRcIj57e3Nob3dTdWJtaXNzaW9ucyhyZXZpZXcpfX08L3NwYW4+PC9oMz5cclxuICAgICAgPGRpdiBjbGFzcz1cImNsLXJldmlldy1wcmVzZW50XCI+e3tyZXZpZXcucmV2aWV3fX08L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBwcm9wczogWydqc29uJ10sXHJcbiAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgYXNzaWduVGFnOiAnJyxcclxuICAgICAgICByZXZpZXdzOiBbXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW91bnRlZCgpIHtcclxuICAgICAgdGhpcy5hc3NpZ25UYWcgPSB0aGlzLmpzb24uYXNzaWduVGFnO1xyXG4gICAgICB0aGlzLnJldmlld3MgPSB0aGlzLmpzb24ucmV2aWV3cztcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIGZvcm1hdFRpbWUodGltZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRzaXRlLlRpbWVGb3JtYXR0ZXIucmVsYXRpdmVVTklYKHRpbWUsIG51bGwpO1xyXG4gICAgICB9LFxyXG4gICAgICBzaG93U3VibWlzc2lvbnMocmV2aWV3KSB7XHJcbiAgICAgICAgbGV0IHJldCA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IHRhZyBpbiByZXZpZXcuc3VibWlzc2lvbnMpIHtcclxuICAgICAgICAgIGlmKHJldCAhPT0gJycpIHtcclxuICAgICAgICAgICAgcmV0ICs9ICcgLyAnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0ICs9IHRoaXMuJHNpdGUuVGltZUZvcm1hdHRlci5hYnNvbHV0ZVVOSVgocmV2aWV3LnN1Ym1pc3Npb25zW3RhZ10uZGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmV0ID09PSAnJykge1xyXG4gICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuICdTdWJtaXNzaW9uOiAnICsgcmV0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD4iLCIvKlxyXG4gKiBUaGUgbWFpbiBSZXZpZXcgc3lzdGVtIGVudHJ5IHBvaW50XHJcbiAqL1xyXG5cclxuaW1wb3J0ICcuL19yZXZpZXcuc2Nzcyc7XHJcbmltcG9ydCB7UmV2aWV3Q29uc29sZX0gZnJvbSAnLi9qcy9Db25zb2xlL1Jldmlld0NvbnNvbGUnO1xyXG5pbXBvcnQgUmV2aWV3VnVlIGZyb20gJy4vanMvUmV2aWV3VnVlLnZ1ZSc7XHJcbmltcG9ydCBSZXZpZXdzVnVlIGZyb20gJy4vanMvUmV2aWV3c1Z1ZS52dWUnO1xyXG5cclxuLy9cclxuLy8gSW5zdGFsbCB0aGUgY29uc29sZSBjb21wb25lbnRzXHJcbi8vXHJcbmlmKFNpdGUuU2l0ZS5jb25zb2xlICE9PSB1bmRlZmluZWQpIHtcclxuXHRSZXZpZXdDb25zb2xlLnNldHVwKFNpdGUuU2l0ZS5jb25zb2xlKTtcclxufVxyXG5cclxuLy9cclxuLy8gQ3JlYXRlIHRoZSBpbmxpbmUgYW5kIHBhZ2UgY29tcG9uZW50c1xyXG4vL1xyXG5TaXRlLlNpdGUucmVhZHkoKCkgPT4ge1xyXG4gICAgU2l0ZS5TaXRlLlBhZ2VWdWUuY3JlYXRlKCdkaXYuY2wtcmV2aWV3JywgJ1JldmlldyBWdWUnLCBSZXZpZXdWdWUpO1xyXG5cdFNpdGUuU2l0ZS5JbmxpbmVWdWUuY3JlYXRlKCdkaXYuY2wtcmV2aWV3cycsIFJldmlld3NWdWUpO1xyXG59KTsiLCJcclxuXHJcbmltcG9ydCBSZXZpZXdSZXZpZXdlcnNWdWUgZnJvbSAnLi9SZXZpZXdSZXZpZXdlcnMudnVlJztcclxuaW1wb3J0IFJldmlld3NCeUZvck1lbWJlclZ1ZSBmcm9tICcuL1Jldmlld3NCeUZvck1lbWJlci52dWUnO1xyXG5cclxuLyoqXHJcbiAqIFJldmlldyBzeXN0ZW0gY29uc29sZSBjb21wb25lbnRzXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGxldCBSZXZpZXdDb25zb2xlID0gZnVuY3Rpb24oKSB7XHJcbn1cclxuXHJcblJldmlld0NvbnNvbGUuc2V0dXAgPSBmdW5jdGlvbihDb25zb2xlKSB7XHJcbiAgICBDb25zb2xlLlJldmlldyA9IHtcclxuICAgICAgICAncmV2aWV3c2J5Zm9yJzogUmV2aWV3c0J5Rm9yTWVtYmVyVnVlXHJcbiAgICB9O1xyXG5cclxuICAgIENvbnNvbGUudGFibGVzLmFkZCh7XHJcbiAgICAgICAgdGl0bGU6ICdSZXZpZXcnLFxyXG4gICAgICAgIG9yZGVyOiA3MCxcclxuICAgICAgICBhcGk6ICcvYXBpL3Jldmlldy90YWJsZXMnXHJcbiAgICB9KTtcclxuXHJcbiAgICBDb25zb2xlLmNvbXBvbmVudHMuYWRkUm91dGUoXHJcbiAgICAgICAge3JvdXRlOiAnL3Jldmlldy9yZXZpZXdlcnMvOmFzc2lnbnRhZycsIGNvbXBvbmVudDogUmV2aWV3UmV2aWV3ZXJzVnVlLCBwcm9wczogdHJ1ZX1cclxuICAgICk7XHJcblxyXG4gICAgQ29uc29sZS5jb3Vyc2UuYXNzaWdubWVudExpbmsoJ3JldmlldycsICdyZXZpZXdlcnMnLCAnL3Jldmlldy9yZXZpZXdlcnMvOmFzc2lnbnRhZycpO1xyXG59XHJcblxyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vLnlhcm4vJCR2aXJ0dWFsL2Nzcy1sb2FkZXItdmlydHVhbC0xZGRjNjhiNGExLzAvY2FjaGUvY3NzLWxvYWRlci1ucG0tNS4yLjYtMTE4YzZkNDA5ZS1iOWU1YTMyMjQ2LnppcC9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vLnlhcm4vJCR2aXJ0dWFsL2Nzcy1sb2FkZXItdmlydHVhbC0xZGRjNjhiNGExLzAvY2FjaGUvY3NzLWxvYWRlci1ucG0tNS4yLjYtMTE4YzZkNDA5ZS1iOWU1YTMyMjQ2LnppcC9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJkaXYuY2wtcmV2aWV3aW5nIHRkLmNsLWVtcHR5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlOGY3ZjM7XFxufVxcblxcbnAuY2wtcmV2aWV3cy1ub25lIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiAjMDA3MjNmO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5cXG5kaXYuY2wtcmV2aWV3cyBoMyB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kOiAjMDA3MjNmO1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG5kaXYuY2wtcmV2aWV3IHtcXG4gIG1hcmdpbjogMWVtIDA7XFxufVxcbmRpdi5jbC1yZXZpZXcgaDMge1xcbiAgZm9udC1zaXplOiAwLjg1ZW07XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogIzAwNzIzZjtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMDA3MjNmO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxuZGl2LmNsLXJldmlldyBoMyBzcGFuLmNsLXN1Ym1pdHRlZCB7XFxuICBmbG9hdDogcmlnaHQ7XFxuICBjb2xvcjogIzAwOTA5ZTtcXG4gIGZvbnQtc2l6ZTogMC45ZW07XFxufVxcbmRpdi5jbC1yZXZpZXcgaDMuc3RhZmYge1xcbiAgY29sb3I6IHJlZDtcXG59XFxuZGl2LmNsLXJldmlldyBwcmUge1xcbiAgbWFyZ2luOiAwO1xcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xcbn1cXG5kaXYuY2wtcmV2aWV3IGRpdi5jbC1yZXZpZXctcHJlc2VudCB7XFxuICBtYXJnaW46IDA7XFxuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3ZlbmRvci9jbC9yZXZpZXcvX3Jldmlldy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi92ZW5kb3IvY2wvc2l0ZS9zYXNzL21vZHVsZXMvX2NvbG9ycy5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUdFO0VBQ0UseUJDVWlCO0FEWnJCOztBQU1BO0VBQ0Usa0JBQUE7RUFDQSxjQ0VRO0VERFIsa0JBQUE7QUFIRjs7QUFRRTtFQUNFLGtCQUFBO0VBQ0EsbUJDTk07RURPTixZQUFBO0FBTEo7O0FBU0E7RUFDRSxhQUFBO0FBTkY7QUFRRTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsY0NuQk07RURvQk4sZ0NBQUE7RUFDQSxnQkFBQTtBQU5KO0FBUUk7RUFDRSxZQUFBO0VBQ0EsY0NuQkk7RURvQkosZ0JBQUE7QUFOTjtBQVdFO0VBQ0UsVUFBQTtBQVRKO0FBWUU7RUFDRSxTQUFBO0VBQ0EscUJBQUE7QUFWSjtBQWFFO0VBQ0UsU0FBQTtFQUNBLHFCQUFBO0FBWEpcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCAnfnNpdGUtY2wvc2Fzcy9tb2R1bGVzL2NvbG9ycyc7XFxyXFxuXFxyXFxuZGl2LmNsLXJldmlld2luZyB7XFxyXFxuICB0ZC5jbC1lbXB0eSB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR2ZXJ5LWxpZ2h0LXByaW1hcnk7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbnAuY2wtcmV2aWV3cy1ub25lIHtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGNvbG9yOiAkcHJpbWFyeTtcXHJcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG59XFxyXFxuXFxyXFxuZGl2LmNsLXJldmlld3Mge1xcclxcblxcclxcbiAgaDMge1xcclxcbiAgICB0ZXh0LWFsaWduOmNlbnRlcjtcXHJcXG4gICAgYmFja2dyb3VuZDogJHByaW1hcnk7XFxyXFxuICAgIGNvbG9yOndoaXRlO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5kaXYuY2wtcmV2aWV3IHtcXHJcXG4gIG1hcmdpbjogMWVtIDA7XFxyXFxuXFxyXFxuICBoMyB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMC44NWVtO1xcclxcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxyXFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcclxcbiAgICBjb2xvcjogJHByaW1hcnk7XFxyXFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkcHJpbWFyeTtcXHJcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG5cXHJcXG4gICAgc3Bhbi5jbC1zdWJtaXR0ZWQge1xcclxcbiAgICAgIGZsb2F0OiByaWdodDtcXHJcXG4gICAgICBjb2xvcjogJHNlY29uZGE7XFxyXFxuICAgICAgZm9udC1zaXplOiAwLjllbTtcXHJcXG4gICAgfVxcclxcbiAgfVxcclxcblxcclxcblxcclxcbiAgaDMuc3RhZmYge1xcclxcbiAgICBjb2xvcjogcmVkO1xcclxcbiAgfVxcclxcblxcclxcbiAgcHJlIHtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBkaXYuY2wtcmV2aWV3LXByZXNlbnQge1xcclxcbiAgICBtYXJnaW46IDA7XFxyXFxuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXCIsXCIvLyBUaGUgbWFqb3IgY29sb3JzXFxyXFxuLy8gV2UgaGF2ZSBhIHByaW1hcnkgY29sb3IsIHR3byBzZWNvbmRhcnkgY29sb3JzLCBhbmQgYSBjb21wbGVtZW50YXJ5IGNvbG9yLlxcclxcbiRhY2NlbnQ6ICM2MDdEOEI7XFxyXFxuXFxyXFxuJHRvYXN0LWJhY2tncm91bmQ6ICMxNTE1MTU7XFxyXFxuJHRvYXN0LXRleHQ6IHdoaXRlO1xcclxcblxcclxcbiRoZWFkZXItYmFja2dyb3VuZDogIzUzNTA1NDtcXHJcXG4kaGVhZGVyLXRleHQ6ICNlZWVlZWU7XFxyXFxuXFxyXFxuLy8gVGhlIG1ham9yIGNvbG9yc1xcclxcbi8vIFdlIGhhdmUgYSBwcmltYXJ5IGNvbG9yLCB0d28gc2Vjb25kYXJ5IGNvbG9ycywgYW5kIGEgY29tcGxlbWVudGFyeSBjb2xvci5cXHJcXG4kcHJpbWFyeTogIzAwNzIzZjtcXHJcXG4kbGlnaHQtcHJpbWFyeTogIzQ0YTI2YjtcXHJcXG4kdmVyeS1saWdodC1wcmltYXJ5OiAjZThmN2YzO1xcclxcbiRkYXJrLXByaW1hcnk6ICMwMDUyMjM7XFxyXFxuJHByaW1hcnktdGV4dDogIzIxMjEyMTtcXHJcXG5cXHJcXG4kc2Vjb25kYTogIzAwOTA5ZTtcXHJcXG4kc2Vjb25kYjogI2ZjYWYxNztcXHJcXG4kc2Vjb25kYzogI2M4OWE1ODsgLy8gI2U4ZDliNTtcXHJcXG5cXHJcXG4kY29tcDogI2M0MTQyNTtcXHJcXG4kYmxpbmQ6ICNlZmM2ZmY7XFxyXFxuJGNvbXAtYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCM1NzAxMDIsICM5NjA2MDYsICM1NzAxMDIpO1xcclxcbiRjb21wLWJvcmRlcjogI2M3YmRiYjtcXHJcXG5cXHJcXG4vLyBNZW51c1xcclxcbiRmb2N1czogIzAwODE4MztcXHJcXG4kbWVudS1iYWNrZ3JvdW5kOiAjZThlOGU4O1xcclxcbiRtZW51LWhvdmVyOiAjZDBkMGQwO1xcclxcbiRtZW51LWNvbG9yOiBibGFjaztcXHJcXG5cXHJcXG4vLyBQYWdlIGJhY2tncm91bmRcXHJcXG4kYmFja2dyb3VuZDogI2VlZWVlZTtcXHJcXG5cXHJcXG4vLyBOYXZcXHJcXG4kbmF2LWNvbG9yOiB3aGl0ZTtcXHJcXG4kbmF2LWJhY2tncm91bmQ6IHVybCgnaW1nL25hdl9wYXR0ZXJuLnBuZycpO1xcclxcbiRuYXYtMi1jb2xvcjogI2ZmZmY5OTtcXHJcXG4kbmF2LTItYmFja2dyb3VuZDogdXJsKCdpbWcvbmF2X3BhdHRlcm4tMi5wbmcnKTtcXHJcXG5cXHJcXG4vLyBUYWJsZXNcXHJcXG4kdGFibGUtZ3JhZGllbnQtZnJvbTogIzIwNGM0MjtcXHJcXG4kdGFibGUtZ3JhZGllbnQtdG86ICMzODliNTQ7XFxyXFxuXFxyXFxuLy8gRGlhbG9nIGJveGVzXFxyXFxuJGRpYWxvZy1ncmFkaWVudC1mcm9tOiAjMjA0YzQyO1xcclxcbiRkaWFsb2ctZ3JhZGllbnQtdG86ICMzODliNTQ7XFxyXFxuJGRpYWxvZy1iYXItY29sb3I6IHdoaXRlO1xcclxcblxcclxcbi8vIExpbmsgY29sb3JzXFxyXFxuJGxpbms6ICM4MDgwODA7XFxyXFxuJHZpc2l0ZWQ6ICM5Njg0NDM7ICAvLyAjYjA5ZDViO1xcclxcbiRob3ZlcjogIzMzNjZjYztcXHJcXG5cXHJcXG4kdmVyeS1saWdodC1wcmltYXJ5LWxpbms6ICM5MDAwMDA7XFxyXFxuJHZlcnktbGlnaHQtcHJpbWFyeS1ob3ZlcjogI2MwMDAwMDtcXHJcXG5cXHJcXG5cXHJcXG4kcHJpbWFyeS1saW5rOiB3aGl0ZTtcXHJcXG4kcHJpbWFyeS12aXNpdGVkOiAjZGRkZGRkO1xcclxcbiRzZWNvbmRiLXZpc2l0ZWQ6ICM1NTU1NTU7XFxyXFxuJGF1dG9iYWNrLWxpbms6ICM4ODIyMjI7XFxyXFxuJGF1dG9iYWNrLWxpbmstaG92ZXI6ICNjYzIyMjI7XFxyXFxuXFxyXFxuJHNoYWRvdy14OiAzcHg7XFxyXFxuJHNoYWRvdy15OiAzcHg7XFxyXFxuJHNoYWRvdy1yYWRpdXM6IDhweDtcXHJcXG4kc2hhZG93LWNvbG9yOiAjY2NjO1xcclxcblxcclxcbiR0b2dnbGUtbGluay1ob3Zlci1jb2xvcjogIzAwNjYwMDtcXHJcXG5cXHJcXG4vLyBCb3hlc1xcclxcbiRib3gtYm9yZGVyLWNvbG9yOiAjYmRiZGJkO1xcclxcblxcclxcbi8vIENhcmRzXFxyXFxuJGNhcmQtaGVhZGluZy1iYWNrZ3JvdW5kOiAjZjJmMmYyO1xcclxcbiRjYXJkLWJvcmRlci1jb2xvcjogI2NjY2NjYztcXHJcXG5cXHJcXG4lc2hhZG93IHtcXHJcXG4gIC1tb3otYm94LXNoYWRvdzogJHNoYWRvdy14ICRzaGFkb3cteSAkc2hhZG93LXJhZGl1cyAkc2hhZG93LWNvbG9yO1xcclxcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAkc2hhZG93LXggJHNoYWRvdy15ICRzaGFkb3ctcmFkaXVzICRzaGFkb3ctY29sb3I7XFxyXFxuICBib3gtc2hhZG93OiAkc2hhZG93LXggJHNoYWRvdy15ICRzaGFkb3ctcmFkaXVzICRzaGFkb3ctY29sb3I7XFxyXFxufVxcclxcblxcclxcbiVub3NoYWRvdyB7XFxyXFxuICAtbW96LWJveC1zaGFkb3c6IG5vbmU7XFxyXFxuICAtd2Via2l0LWJveC1zaGFkb3c6IG5vbmU7XFxyXFxuICBib3gtc2hhZG93OiBub25lO1xcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uLy4uLy4uLy55YXJuLyQkdmlydHVhbC9zdHlsZS1sb2FkZXItdmlydHVhbC04NjI2MDZmMzkzLzAvY2FjaGUvc3R5bGUtbG9hZGVyLW5wbS0yLjAuMC1iOWE1YzRhMmFhLWZmYzMwNTQ4ODIuemlwL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vLi4vLi4vLnlhcm4vJCR2aXJ0dWFsL2Nzcy1sb2FkZXItdmlydHVhbC0xZGRjNjhiNGExLzAvY2FjaGUvY3NzLWxvYWRlci1ucG0tNS4yLjYtMTE4YzZkNDA5ZS1iOWU1YTMyMjQ2LnppcC9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi8ueWFybi8kJHZpcnR1YWwvcmVzb2x2ZS11cmwtbG9hZGVyLXZpcnR1YWwtZWM3NWQyYTA5ZS8wL2NhY2hlL3Jlc29sdmUtdXJsLWxvYWRlci1ucG0tNC4wLjAtMmE5YzE4ZDg2Yi0wNGU5ZjkxZGM4LnppcC9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy55YXJuLyQkdmlydHVhbC9zYXNzLWxvYWRlci12aXJ0dWFsLTM4NTdmNWU5ZjEvMC9jYWNoZS9zYXNzLWxvYWRlci1ucG0tMTIuMS4wLTYxODgwODllMTItNzVmNTIzZTY0Yy56aXAvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTRbMF0ucnVsZXNbMF0udXNlWzNdIS4vX3Jldmlldy5zY3NzXCI7XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY29udGVudC5sb2NhbHMgfHwge307IiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi8ueWFybi8kJHZpcnR1YWwvYmFiZWwtbG9hZGVyLXZpcnR1YWwtOGQ3OGY0MmQ0My8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOC4yLjItYjRlNjAwYzJjNS0zNjJiYjcxNTczLnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yWzBdLnJ1bGVzWzBdLnVzZSEuLi8uLi8uLi8uLi8uLi8ueWFybi8kJHZpcnR1YWwvdnVlLWxvYWRlci12aXJ0dWFsLWRkMGRjOWJmMzQvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjctYzkyY2NlMzQ4ZS00OGM3Nzg1YTI0LnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jldmlld1Jldmlld2Vycy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLnlhcm4vJCR2aXJ0dWFsL2JhYmVsLWxvYWRlci12aXJ0dWFsLThkNzhmNDJkNDMvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTguMi4yLWI0ZTYwMGMyYzUtMzYyYmI3MTU3My56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMlswXS5ydWxlc1swXS51c2UhLi4vLi4vLi4vLi4vLi4vLnlhcm4vJCR2aXJ0dWFsL3Z1ZS1sb2FkZXItdmlydHVhbC1kZDBkYzliZjM0LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS43LWM5MmNjZTM0OGUtNDhjNzc4NWEyNC56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXZpZXdSZXZpZXdlcnMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi8ueWFybi8kJHZpcnR1YWwvYmFiZWwtbG9hZGVyLXZpcnR1YWwtOGQ3OGY0MmQ0My8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOC4yLjItYjRlNjAwYzJjNS0zNjJiYjcxNTczLnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yWzBdLnJ1bGVzWzBdLnVzZSEuLi8uLi8uLi8uLi8uLi8ueWFybi8kJHZpcnR1YWwvdnVlLWxvYWRlci12aXJ0dWFsLWRkMGRjOWJmMzQvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjctYzkyY2NlMzQ4ZS00OGM3Nzg1YTI0LnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jldmlld3NCeUZvck1lbWJlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLnlhcm4vJCR2aXJ0dWFsL2JhYmVsLWxvYWRlci12aXJ0dWFsLThkNzhmNDJkNDMvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTguMi4yLWI0ZTYwMGMyYzUtMzYyYmI3MTU3My56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMlswXS5ydWxlc1swXS51c2UhLi4vLi4vLi4vLi4vLi4vLnlhcm4vJCR2aXJ0dWFsL3Z1ZS1sb2FkZXItdmlydHVhbC1kZDBkYzliZjM0LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS43LWM5MmNjZTM0OGUtNDhjNzc4NWEyNC56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXZpZXdzQnlGb3JNZW1iZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi8ueWFybi8kJHZpcnR1YWwvYmFiZWwtbG9hZGVyLXZpcnR1YWwtOGQ3OGY0MmQ0My8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOC4yLjItYjRlNjAwYzJjNS0zNjJiYjcxNTczLnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yWzBdLnJ1bGVzWzBdLnVzZSEuLi8uLi8uLi8uLi8uLi8ueWFybi8kJHZpcnR1YWwvdnVlLWxvYWRlci12aXJ0dWFsLWRkMGRjOWJmMzQvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjctYzkyY2NlMzQ4ZS00OGM3Nzg1YTI0LnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1N0YXR1c1ByZXNlbnQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uLy55YXJuLyQkdmlydHVhbC9iYWJlbC1sb2FkZXItdmlydHVhbC04ZDc4ZjQyZDQzLzAvY2FjaGUvYmFiZWwtbG9hZGVyLW5wbS04LjIuMi1iNGU2MDBjMmM1LTM2MmJiNzE1NzMuemlwL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTJbMF0ucnVsZXNbMF0udXNlIS4uLy4uLy4uLy4uLy4uLy55YXJuLyQkdmlydHVhbC92dWUtbG9hZGVyLXZpcnR1YWwtZGQwZGM5YmYzNC8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuNy1jOTJjY2UzNDhlLTQ4Yzc3ODVhMjQuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vU3RhdHVzUHJlc2VudC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy55YXJuLyQkdmlydHVhbC9iYWJlbC1sb2FkZXItdmlydHVhbC04ZDc4ZjQyZDQzLzAvY2FjaGUvYmFiZWwtbG9hZGVyLW5wbS04LjIuMi1iNGU2MDBjMmM1LTM2MmJiNzE1NzMuemlwL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTJbMF0ucnVsZXNbMF0udXNlIS4uLy4uLy4uLy4uLy55YXJuLyQkdmlydHVhbC92dWUtbG9hZGVyLXZpcnR1YWwtZGQwZGM5YmYzNC8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuNy1jOTJjY2UzNDhlLTQ4Yzc3ODVhMjQuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmV2aWV3VnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8ueWFybi8kJHZpcnR1YWwvYmFiZWwtbG9hZGVyLXZpcnR1YWwtOGQ3OGY0MmQ0My8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOC4yLjItYjRlNjAwYzJjNS0zNjJiYjcxNTczLnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yWzBdLnJ1bGVzWzBdLnVzZSEuLi8uLi8uLi8uLi8ueWFybi8kJHZpcnR1YWwvdnVlLWxvYWRlci12aXJ0dWFsLWRkMGRjOWJmMzQvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjctYzkyY2NlMzQ4ZS00OGM3Nzg1YTI0LnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jldmlld1Z1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy55YXJuLyQkdmlydHVhbC9iYWJlbC1sb2FkZXItdmlydHVhbC04ZDc4ZjQyZDQzLzAvY2FjaGUvYmFiZWwtbG9hZGVyLW5wbS04LjIuMi1iNGU2MDBjMmM1LTM2MmJiNzE1NzMuemlwL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTJbMF0ucnVsZXNbMF0udXNlIS4uLy4uLy4uLy4uLy55YXJuLyQkdmlydHVhbC92dWUtbG9hZGVyLXZpcnR1YWwtZGQwZGM5YmYzNC8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuNy1jOTJjY2UzNDhlLTQ4Yzc3ODVhMjQuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmV2aWV3c1Z1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLnlhcm4vJCR2aXJ0dWFsL2JhYmVsLWxvYWRlci12aXJ0dWFsLThkNzhmNDJkNDMvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTguMi4yLWI0ZTYwMGMyYzUtMzYyYmI3MTU3My56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMlswXS5ydWxlc1swXS51c2UhLi4vLi4vLi4vLi4vLnlhcm4vJCR2aXJ0dWFsL3Z1ZS1sb2FkZXItdmlydHVhbC1kZDBkYzliZjM0LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS43LWM5MmNjZTM0OGUtNDhjNzc4NWEyNC56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXZpZXdzVnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250ZW50XCIgfSwgW1xuICAgIF9jKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZnVsbCBjbC1yZXZpZXdpbmdcIiB9LFxuICAgICAgW1xuICAgICAgICBfYyhcIm1lbWJlcnNmZXRjaGVyXCIsIHtcbiAgICAgICAgICBhdHRyczogeyBmZXRjaGluZzogX3ZtLnJldmlld2VyID09PSBudWxsIH0sXG4gICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihmZXRjaGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgIF92bS51c2VyLmF0TGVhc3QoX3ZtLmluc3RydWN0b3IpXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgbWV0aG9kOiBcInBvc3RcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJtaXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmFzc2lnblJldmlld3MuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcImNlbnRlclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiYnV0dG9uXCIsIHsgYXR0cnM6IHsgdHlwZTogXCJzdWJtaXRcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiQXNzaWduIFJldmlld3NcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnJldmlld2VyQ250LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInJldmlld2VyQ250XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJCRzZWxlY3RlZFZhbCA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbCgkZXZlbnQudGFyZ2V0Lm9wdGlvbnMsIGZ1bmN0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG8uc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24obykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX3ZhbHVlXCIgaW4gbyA/IG8uX3ZhbHVlIDogby52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5yZXZpZXdlckNudCA9ICRldmVudC50YXJnZXQubXVsdGlwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICQkc2VsZWN0ZWRWYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICQkc2VsZWN0ZWRWYWxbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbCg2LCBmdW5jdGlvbihudW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9wdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkb21Qcm9wczogeyB2YWx1ZTogbnVtIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKG51bSkpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ0YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInNtYWxsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0clwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInRoXCIsIFtfdm0uX3YoXCJOYW1lXCIpXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidGhcIiwgW192bS5fdihcIlVzZXIgSURcIildKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS5tYXhSZXZpZXdlciwgZnVuY3Rpb24oaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcInRoXCIsIFtfdm0uX3YoXCJyZXZpZXdlZVwiKV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLm1heFJldmlld2VlLCBmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwidGhcIiwgW192bS5fdihcInJldmlld2VyXCIpXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChmZXRjaGVyLnVzZXJzLCBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJzbWFsbFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdXNlci5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ucm9vdCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIvY2wvY29uc29sZS9ncmFkaW5nL1wiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uYXNzaWdudGFnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIi9cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5tZW1iZXIuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyh1c2VyLm5hbWUpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnJvb3QgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiL2NsL2NvbnNvbGUvZ3JhZGluZy9cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmFzc2lnbnRhZyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIvXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIubWVtYmVyLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3ModXNlci51c2VySWQpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0ubWF4UmV2aWV3ZXIsIGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IF92bS5jbHMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ucmV2aWV3ZXJbdXNlci5tZW1iZXIuaWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAtIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInN0YXR1cy1wcmVzZW50XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbnRhZzogX3ZtLmFzc2lnbnRhZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGF0dXMtdXNlclwiOiBfdm0uZGlzcGxheVVzZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hlci51c2VycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ucmV2aWV3ZXJbdXNlci5tZW1iZXIuaWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgLSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5yZXZpZXdlclt1c2VyLm1lbWJlci5pZF0gIT09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF92bS5yZXZpZXdlclt1c2VyLm1lbWJlci5pZF1bXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAtIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVsxXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS5tYXhSZXZpZXdlZSwgZnVuY3Rpb24oaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogX3ZtLmNscyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5yZXZpZXdlZVt1c2VyLm1lbWJlci5pZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpIC0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3RhdHVzLXByZXNlbnRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdudGFnOiBfdm0uYXNzaWdudGFnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXR1cy11c2VyXCI6IF92bS5kaXNwbGF5VXNlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaGVyLnVzZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5yZXZpZXdlZVt1c2VyLm1lbWJlci5pZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAtIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnJldmlld2VyW3VzZXIubWVtYmVyLmlkXSAhPT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX3ZtLnJldmlld2VyW3VzZXIubWVtYmVyLmlkXVtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpIC0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdKVxuICAgICAgICB9KVxuICAgICAgXSxcbiAgICAgIDFcbiAgICApXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHsgc3RhdGljQ2xhc3M6IFwiY2wtcmV2aWV3c1wiIH0sXG4gICAgW1xuICAgICAgX2MoXCJoMlwiLCBbX3ZtLl92KFwiU3RhZmYgUmV2aWV3XCIpXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwiZm9ybVwiLFxuICAgICAgICB7XG4gICAgICAgICAgYXR0cnM6IHsgbWV0aG9kOiBcInBvc3RcIiB9LFxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICBzdWJtaXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICByZXR1cm4gX3ZtLnN1Ym1pdC5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbX2MoXCJkaXZcIiwgeyByZWY6IFwiZWRpdG9yXCIgfSksIF92bS5fdihcIiBcIiksIF92bS5fbSgwKV1cbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJoM1wiLCBbX3ZtLl92KFwiUmV2aWV3cyBieSB0aGlzIHVzZXIuXCIpXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmJ5UmV2aWV3cy5sZW5ndGggPT09IDBcbiAgICAgICAgPyBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJjZW50ZXJcIiB9LCBbX3ZtLl92KFwiTm9uZVwiKV0pXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLl9sKF92bS5ieVJldmlld3MsIGZ1bmN0aW9uKHJldmlldykge1xuICAgICAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjbC1yZXZpZXdcIiB9LCBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImgzXCIsXG4gICAgICAgICAgICB7IGNsYXNzOiByZXZpZXcucmV2aWV3ZWUuYXRMZWFzdChfdm0uc3RhZmZSb2xlKSA/IFwic3RhZmZcIiA6IFwiXCIgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uZm9ybWF0VGltZShyZXZpZXcudGltZSkpICtcbiAgICAgICAgICAgICAgICAgIFwiIFJldmlldyBieSBcIiArXG4gICAgICAgICAgICAgICAgICBfdm0uX3MocmV2aWV3LnJldmlld2VlLm5hbWUpICtcbiAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtc3VibWl0dGVkXCIgfSwgW1xuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLnNob3dTdWJtaXNzaW9ucyhyZXZpZXcpKSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjbC1yZXZpZXctcHJlc2VudFwiIH0sIFtcbiAgICAgICAgICAgIF92bS5fdihfdm0uX3MocmV2aWV3Lm1ldGEucmV2aWV3LnJldmlldykpXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgIH0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiaDNcIiwgW192bS5fdihcIlJldmlld3Mgb2YgdGhpcyB1c2VyJ3MgYXNzaWdubWVudC5cIildKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uZm9yUmV2aWV3cy5sZW5ndGggPT09IDBcbiAgICAgICAgPyBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJjZW50ZXJcIiB9LCBbX3ZtLl92KFwiTm9uZVwiKV0pXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLl9sKF92bS5mb3JSZXZpZXdzLCBmdW5jdGlvbihyZXZpZXcpIHtcbiAgICAgICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtcmV2aWV3XCIgfSwgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJoM1wiLFxuICAgICAgICAgICAgeyBjbGFzczogcmV2aWV3LnJldmlld2VyLmF0TGVhc3QoX3ZtLnN0YWZmUm9sZSkgPyBcInN0YWZmXCIgOiBcIlwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLmZvcm1hdFRpbWUocmV2aWV3LnRpbWUpKSArIFwiXFxuICAgICAgXCIpLFxuICAgICAgICAgICAgICByZXZpZXcucmV2aWV3ZXIuYXRMZWFzdChfdm0uc3RhZmZSb2xlKVxuICAgICAgICAgICAgICAgID8gX2MoXCJzcGFuXCIsIFtfdm0uX3YoXCJTdGFmZiBSZXZpZXdcIildKVxuICAgICAgICAgICAgICAgIDogX2MoXCJzcGFuXCIsIFtfdm0uX3YoXCJSZXZpZXdcIildKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIGJ5IFwiICsgX3ZtLl9zKHJldmlldy5yZXZpZXdlci5uYW1lKSArIFwiXFxuICAgICAgXCIpLFxuICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJjbC1zdWJtaXR0ZWRcIiB9LCBbXG4gICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uc2hvd1N1Ym1pc3Npb25zKHJldmlldykpKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXJldmlldy1wcmVzZW50XCIgfSwgW1xuICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhyZXZpZXcubWV0YS5yZXZpZXcucmV2aWV3KSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgfSlcbiAgICBdLFxuICAgIDJcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJwXCIsIFtcbiAgICAgIF9jKFwiaW5wdXRcIiwgeyBhdHRyczogeyB0eXBlOiBcInN1Ym1pdFwiLCB2YWx1ZTogXCJTdWJtaXQgUmV2aWV3XCIgfSB9KVxuICAgIF0pXG4gIH1cbl1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfdm0uc3RhdHVzVXNlciAhPT0gbnVsbFxuICAgID8gX2MoXG4gICAgICAgIFwicm91dGVyLWxpbmtcIixcbiAgICAgICAge1xuICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICB0bzpcbiAgICAgICAgICAgICAgX3ZtLnJvb3QgK1xuICAgICAgICAgICAgICBcIi9jbC9jb25zb2xlL2dyYWRpbmcvXCIgK1xuICAgICAgICAgICAgICBfdm0uYXNzaWdudGFnICtcbiAgICAgICAgICAgICAgXCIvXCIgK1xuICAgICAgICAgICAgICBfdm0uc3RhdHVzVXNlci5tZW1iZXIuaWQsXG4gICAgICAgICAgICB0aXRsZTogX3ZtLnN0YXR1c1VzZXIubmFtZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLnN0YXR1c1VzZXIudXNlcklkKSArIFwiL1wiICsgX3ZtLl9zKF92bS5jb3VudCkpXVxuICAgICAgKVxuICAgIDogX3ZtLl9lKClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29udGVudFwiIH0sIFtcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcImZ1bGxcIiB9LFxuICAgICAgW1xuICAgICAgICBfdm0uX2woX3ZtLmpzb24uc3VibWlzc2lvbnMsIGZ1bmN0aW9uKHN1Ym1pc3Npb24pIHtcbiAgICAgICAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjbC1zdWJtaXNzaW9uLXZpZXdcIiB9LCBbXG4gICAgICAgICAgICBfYyhcImgyXCIsIFtfdm0uX3YoX3ZtLl9zKHN1Ym1pc3Npb24ubmFtZSkpXSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgc3VibWlzc2lvbi50eXBlID09PSBcInRleHRcIlxuICAgICAgICAgICAgICA/IF9jKFwicHJlXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtcHJldmlldyB5ZWxsb3ctcGFkXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhzdWJtaXNzaW9uLnRleHQpKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgc3VibWlzc2lvbi50eXBlID09PSBcImltYWdlXCJcbiAgICAgICAgICAgICAgPyBfYyhcImZpZ3VyZVwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXByZXZpZXdcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfYyhcImltZ1wiLCB7IGF0dHJzOiB7IHNyYzogX3ZtLnByZXZpZXdJbWcoc3VibWlzc2lvbikgfSB9KVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtcHJldmlldy10aW1lXCIgfSwgW1xuICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5mb3JtYXRUaW1lKHN1Ym1pc3Npb24uZGF0ZSkpKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICB9KSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJoMlwiLCBbX3ZtLl92KFwiUmV2aWV3XCIpXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwiZm9ybVwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IG1ldGhvZDogXCJwb3N0XCIgfSxcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIHN1Ym1pdDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnN1Ym1pdC5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgcmVmOiBcImVkaXRvclwiLCBzdGF0aWNDbGFzczogXCJzaGFkb3dcIiB9KSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfdm0uX20oMClcbiAgICAgICAgICBdXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiaDJcIiwgW192bS5fdihcIlByZXZpb3VzIFJldmlld3NcIildKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX3ZtLnJldmlld2luZy5sZW5ndGggPT09IDBcbiAgICAgICAgICA/IF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXJldmlld3Mtbm9uZVwiIH0sIFtcbiAgICAgICAgICAgICAgX3ZtLl92KFwiKioqIE5vbmUgWWV0ICoqKlwiKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfdm0uX2woX3ZtLnJldmlld2luZywgZnVuY3Rpb24ocmV2aWV3KSB7XG4gICAgICAgICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtcmV2aWV3XCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJoM1wiLCBbXG4gICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmZvcm1hdFRpbWUocmV2aWV3LnRpbWUpKSArIFwiIFJldmlldyBieSBNZVxcbiAgICAgICAgXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtc3VibWl0dGVkXCIgfSwgW1xuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLnNob3dTdWJtaXNzaW9ucyhyZXZpZXcpKSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtcmV2aWV3LXByZXNlbnRcIiB9LCBbXG4gICAgICAgICAgICAgIF92bS5fdihfdm0uX3MocmV2aWV3Lm1ldGEucmV2aWV3LnJldmlldykpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF0pXG4gICAgICAgIH0pXG4gICAgICBdLFxuICAgICAgMlxuICAgIClcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwicFwiLCBbXG4gICAgICBfYyhcImlucHV0XCIsIHsgYXR0cnM6IHsgdHlwZTogXCJzdWJtaXRcIiwgdmFsdWU6IFwiU3VibWl0IFJldmlld1wiIH0gfSlcbiAgICBdKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImNsLXJldmlld3NcIiB9LFxuICAgIFtcbiAgICAgIF9jKFwiaDNcIiwgW192bS5fdihcIlJldmlld3Mgb2YgdGhpcyBhc3NpZ25tZW50IGFwcGVhciBoZXJlLlwiKV0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5yZXZpZXdzLmxlbmd0aCA9PT0gMFxuICAgICAgICA/IF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXJldmlld3Mtbm9uZVwiIH0sIFtcbiAgICAgICAgICAgIF92bS5fdihcIioqKiBOb25lIFlldCAqKipcIilcbiAgICAgICAgICBdKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5fbChfdm0ucmV2aWV3cywgZnVuY3Rpb24ocmV2aWV3KSB7XG4gICAgICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXJldmlld1wiIH0sIFtcbiAgICAgICAgICBfYyhcImgzXCIsIHsgY2xhc3M6IHJldmlldy5yb2xlICE9PSB1bmRlZmluZWQgPyBcInN0YWZmXCIgOiBcIlwiIH0sIFtcbiAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLmZvcm1hdFRpbWUocmV2aWV3LnRpbWUpKSArIFwiXFxuICAgICAgXCIpLFxuICAgICAgICAgICAgcmV2aWV3LnJvbGUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICA/IF9jKFwic3BhblwiLCBbX3ZtLl92KFwiU3RhZmYgUmV2aWV3XCIpXSlcbiAgICAgICAgICAgICAgOiBfYyhcInNwYW5cIiwgW192bS5fdihcIlJldmlld1wiKV0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIGJ5IFwiICsgX3ZtLl9zKHJldmlldy5ieSkgKyBcIlxcbiAgICAgIFwiKSxcbiAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXN1Ym1pdHRlZFwiIH0sIFtcbiAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uc2hvd1N1Ym1pc3Npb25zKHJldmlldykpKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtcmV2aWV3LXByZXNlbnRcIiB9LCBbXG4gICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKHJldmlldy5yZXZpZXcpKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICB9KVxuICAgIF0sXG4gICAgMlxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9SZXZpZXdSZXZpZXdlcnMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWJlYzVkZmRjJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1Jldmlld1Jldmlld2Vycy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1Jldmlld1Jldmlld2Vycy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uLy55YXJuLyQkdmlydHVhbC92dWUtbG9hZGVyLXZpcnR1YWwtZGQwZGM5YmYzNC8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuNy1jOTJjY2UzNDhlLTQ4Yzc3ODVhMjQuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9uZURyaXZlXFxcXFByb2plY3RzXFxcXENvdXJzZUxpYlxcXFxjb21wbGV0ZVxcXFwueWFyblxcXFxjYWNoZVxcXFx2dWUtaG90LXJlbG9hZC1hcGktbnBtLTIuMy40LTU0OWFlMjYzMzctZGVkZWZiODcyOC56aXBcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnYmVjNWRmZGMnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnYmVjNWRmZGMnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnYmVjNWRmZGMnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1Jldmlld1Jldmlld2Vycy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YmVjNWRmZGMmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignYmVjNWRmZGMnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdSZXZpZXdlcnMudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9SZXZpZXdzQnlGb3JNZW1iZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTdiMzZmZTc2JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1Jldmlld3NCeUZvck1lbWJlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1Jldmlld3NCeUZvck1lbWJlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uLy55YXJuLyQkdmlydHVhbC92dWUtbG9hZGVyLXZpcnR1YWwtZGQwZGM5YmYzNC8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuNy1jOTJjY2UzNDhlLTQ4Yzc3ODVhMjQuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9uZURyaXZlXFxcXFByb2plY3RzXFxcXENvdXJzZUxpYlxcXFxjb21wbGV0ZVxcXFwueWFyblxcXFxjYWNoZVxcXFx2dWUtaG90LXJlbG9hZC1hcGktbnBtLTIuMy40LTU0OWFlMjYzMzctZGVkZWZiODcyOC56aXBcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnN2IzNmZlNzYnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnN2IzNmZlNzYnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnN2IzNmZlNzYnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1Jldmlld3NCeUZvck1lbWJlci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9N2IzNmZlNzYmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignN2IzNmZlNzYnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdzQnlGb3JNZW1iZXIudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9TdGF0dXNQcmVzZW50LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00NDQ1YzU2NSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9TdGF0dXNQcmVzZW50LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vU3RhdHVzUHJlc2VudC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uLy55YXJuLyQkdmlydHVhbC92dWUtbG9hZGVyLXZpcnR1YWwtZGQwZGM5YmYzNC8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuNy1jOTJjY2UzNDhlLTQ4Yzc3ODVhMjQuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9uZURyaXZlXFxcXFByb2plY3RzXFxcXENvdXJzZUxpYlxcXFxjb21wbGV0ZVxcXFwueWFyblxcXFxjYWNoZVxcXFx2dWUtaG90LXJlbG9hZC1hcGktbnBtLTIuMy40LTU0OWFlMjYzMzctZGVkZWZiODcyOC56aXBcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNDQ0NWM1NjUnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNDQ0NWM1NjUnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNDQ0NWM1NjUnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1N0YXR1c1ByZXNlbnQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQ0NDVjNTY1JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzQ0NDVjNTY1Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJ2ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvU3RhdHVzUHJlc2VudC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1Jldmlld1Z1ZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NGVlYjMyNjImXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUmV2aWV3VnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUmV2aWV3VnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLnlhcm4vJCR2aXJ0dWFsL3Z1ZS1sb2FkZXItdmlydHVhbC1kZDBkYzliZjM0LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS43LWM5MmNjZTM0OGUtNDhjNzc4NWEyNC56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT25lRHJpdmVcXFxcUHJvamVjdHNcXFxcQ291cnNlTGliXFxcXGNvbXBsZXRlXFxcXC55YXJuXFxcXGNhY2hlXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaS1ucG0tMi4zLjQtNTQ5YWUyNjMzNy1kZWRlZmI4NzI4LnppcFxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc0ZWViMzI2MicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc0ZWViMzI2MicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc0ZWViMzI2MicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vUmV2aWV3VnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00ZWViMzI2MiZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc0ZWViMzI2MicsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwidmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdWdWUudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9SZXZpZXdzVnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wOTRmZTQ0NyZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9SZXZpZXdzVnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUmV2aWV3c1Z1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy55YXJuLyQkdmlydHVhbC92dWUtbG9hZGVyLXZpcnR1YWwtZGQwZGM5YmYzNC8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuNy1jOTJjY2UzNDhlLTQ4Yzc3ODVhMjQuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9uZURyaXZlXFxcXFByb2plY3RzXFxcXENvdXJzZUxpYlxcXFxjb21wbGV0ZVxcXFwueWFyblxcXFxjYWNoZVxcXFx2dWUtaG90LXJlbG9hZC1hcGktbnBtLTIuMy40LTU0OWFlMjYzMzctZGVkZWZiODcyOC56aXBcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnMDk0ZmU0NDcnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMDk0ZmU0NDcnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMDk0ZmU0NDcnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1Jldmlld3NWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTA5NGZlNDQ3JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzA5NGZlNDQ3Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJ2ZW5kb3IvY2wvcmV2aWV3L2pzL1Jldmlld3NWdWUudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHJlc3VsdCA9IGZuKCk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIlJldmlld1wiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHR9XG5cdH1cblx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRzW2ldXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2NvdXJzZWxpYlwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjb3Vyc2VsaWJcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3ZlbmRvci9jbC9yZXZpZXcvaW5kZXguanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=