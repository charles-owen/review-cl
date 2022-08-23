/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    'status-present': _StatusPresent_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
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

/***/ "./.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  Site.Site.PageVue.create('div.cl-review', 'Review Vue', _js_ReviewVue_vue__WEBPACK_IMPORTED_MODULE_2__["default"]);
  Site.Site.InlineVue.create('div.cl-reviews', _js_ReviewsVue_vue__WEBPACK_IMPORTED_MODULE_3__["default"]);
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

/***/ "./.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/cjs.js!./.yarn/cache/resolve-url-loader-npm-5.0.0-9b441067c9-6d483733a4.zip/node_modules/resolve-url-loader/index.js!./.yarn/__virtual__/sass-loader-virtual-28c0e7b474/0/cache/sass-loader-npm-13.0.2-ca68afd73d-6306712cc7.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./vendor/cl/review/_review.scss":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/cjs.js!./.yarn/cache/resolve-url-loader-npm-5.0.0-9b441067c9-6d483733a4.zip/node_modules/resolve-url-loader/index.js!./.yarn/__virtual__/sass-loader-virtual-28c0e7b474/0/cache/sass-loader-npm-13.0.2-ca68afd73d-6306712cc7.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./vendor/cl/review/_review.scss ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/runtime/api.js */ "./.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
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
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/insertBySelector.js */ "./.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_cjs_js_yarn_cache_resolve_url_loader_npm_5_0_0_9b441067c9_6d483733a4_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_28c0e7b474_0_cache_sass_loader_npm_13_0_2_ca68afd73d_6306712cc7_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_review_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/cjs.js!../../../.yarn/cache/resolve-url-loader-npm-5.0.0-9b441067c9-6d483733a4.zip/node_modules/resolve-url-loader/index.js!../../../.yarn/__virtual__/sass-loader-virtual-28c0e7b474/0/cache/sass-loader-npm-13.0.2-ca68afd73d-6306712cc7.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./_review.scss */ "./.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/cjs.js!./.yarn/cache/resolve-url-loader-npm-5.0.0-9b441067c9-6d483733a4.zip/node_modules/resolve-url-loader/index.js!./.yarn/__virtual__/sass-loader-virtual-28c0e7b474/0/cache/sass-loader-npm-13.0.2-ca68afd73d-6306712cc7.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./vendor/cl/review/_review.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_cjs_js_yarn_cache_resolve_url_loader_npm_5_0_0_9b441067c9_6d483733a4_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_28c0e7b474_0_cache_sass_loader_npm_13_0_2_ca68afd73d_6306712cc7_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_review_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_cjs_js_yarn_cache_resolve_url_loader_npm_5_0_0_9b441067c9_6d483733a4_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_28c0e7b474_0_cache_sass_loader_npm_13_0_2_ca68afd73d_6306712cc7_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_review_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_cjs_js_yarn_cache_resolve_url_loader_npm_5_0_0_9b441067c9_6d483733a4_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_28c0e7b474_0_cache_sass_loader_npm_13_0_2_ca68afd73d_6306712cc7_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_review_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_cjs_js_yarn_cache_resolve_url_loader_npm_5_0_0_9b441067c9_6d483733a4_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_28c0e7b474_0_cache_sass_loader_npm_13_0_2_ca68afd73d_6306712cc7_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_review_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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
/* harmony import */ var _yarn_virtual_babel_loader_virtual_d726bcbadc_0_cache_babel_loader_npm_8_2_5_e749e26bb5_a660555788_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewReviewers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!../../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./ReviewReviewers.vue?vue&type=script&lang=js& */ "./.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_virtual_babel_loader_virtual_d726bcbadc_0_cache_babel_loader_npm_8_2_5_e749e26bb5_a660555788_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewReviewers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

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
/* harmony import */ var _yarn_virtual_babel_loader_virtual_d726bcbadc_0_cache_babel_loader_npm_8_2_5_e749e26bb5_a660555788_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsByForMember_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!../../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./ReviewsByForMember.vue?vue&type=script&lang=js& */ "./.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_virtual_babel_loader_virtual_d726bcbadc_0_cache_babel_loader_npm_8_2_5_e749e26bb5_a660555788_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsByForMember_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

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
/* harmony import */ var _yarn_virtual_babel_loader_virtual_d726bcbadc_0_cache_babel_loader_npm_8_2_5_e749e26bb5_a660555788_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusPresent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!../../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./StatusPresent.vue?vue&type=script&lang=js& */ "./.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_virtual_babel_loader_virtual_d726bcbadc_0_cache_babel_loader_npm_8_2_5_e749e26bb5_a660555788_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusPresent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

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
/* harmony import */ var _yarn_virtual_babel_loader_virtual_d726bcbadc_0_cache_babel_loader_npm_8_2_5_e749e26bb5_a660555788_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./ReviewVue.vue?vue&type=script&lang=js& */ "./.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_virtual_babel_loader_virtual_d726bcbadc_0_cache_babel_loader_npm_8_2_5_e749e26bb5_a660555788_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

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
/* harmony import */ var _yarn_virtual_babel_loader_virtual_d726bcbadc_0_cache_babel_loader_npm_8_2_5_e749e26bb5_a660555788_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./ReviewsVue.vue?vue&type=script&lang=js& */ "./.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_virtual_babel_loader_virtual_d726bcbadc_0_cache_babel_loader_npm_8_2_5_e749e26bb5_a660555788_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc&":
/*!****************************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewReviewers_vue_vue_type_template_id_bec5dfdc___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewReviewers_vue_vue_type_template_id_bec5dfdc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewReviewers_vue_vue_type_template_id_bec5dfdc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./ReviewReviewers.vue?vue&type=template&id=bec5dfdc& */ "./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc&");


/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76&":
/*!*******************************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsByForMember_vue_vue_type_template_id_7b36fe76___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsByForMember_vue_vue_type_template_id_7b36fe76___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsByForMember_vue_vue_type_template_id_7b36fe76___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./ReviewsByForMember.vue?vue&type=template&id=7b36fe76& */ "./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76&");


/***/ }),

/***/ "./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=template&id=4445c565&":
/*!**************************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=template&id=4445c565& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusPresent_vue_vue_type_template_id_4445c565___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusPresent_vue_vue_type_template_id_4445c565___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusPresent_vue_vue_type_template_id_4445c565___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./StatusPresent.vue?vue&type=template&id=4445c565& */ "./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=template&id=4445c565&");


/***/ }),

/***/ "./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262&":
/*!**************************************************************************!*\
  !*** ./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewVue_vue_vue_type_template_id_4eeb3262___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewVue_vue_vue_type_template_id_4eeb3262___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewVue_vue_vue_type_template_id_4eeb3262___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./ReviewVue.vue?vue&type=template&id=4eeb3262& */ "./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262&");


/***/ }),

/***/ "./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447&":
/*!***************************************************************************!*\
  !*** ./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsVue_vue_vue_type_template_id_094fe447___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsVue_vue_vue_type_template_id_094fe447___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsVue_vue_vue_type_template_id_094fe447___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./ReviewsVue.vue?vue&type=template&id=094fe447& */ "./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447&");


/***/ }),

/***/ "./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=template&id=4445c565&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/Console/StatusPresent.vue?vue&type=template&id=4445c565& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
/* harmony import */ var _yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ReviewReviewers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
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
/* harmony import */ var _yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ReviewsByForMember_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
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
/* harmony import */ var _yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StatusPresent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
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
/* harmony import */ var _yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ReviewVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
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
/* harmony import */ var _yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ReviewsVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
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
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
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
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcourselib"] = self["webpackChunkcourselib"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ0pBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7V0NoREE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NvdXJzZWxpYi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3UmV2aWV3ZXJzLnZ1ZSIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1Jldmlld3NCeUZvck1lbWJlci52dWUiLCJ3ZWJwYWNrOi8vY291cnNlbGliL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9TdGF0dXNQcmVzZW50LnZ1ZSIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvdmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdWdWUudnVlIiwid2VicGFjazovL2NvdXJzZWxpYi92ZW5kb3IvY2wvcmV2aWV3L2pzL1Jldmlld3NWdWUudnVlIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC9yZXZpZXcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1Jldmlld0NvbnNvbGUuanMiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3Jldmlldy9fcmV2aWV3LnNjc3MiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3Jldmlldy9fcmV2aWV3LnNjc3M/Y2E0NSIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3UmV2aWV3ZXJzLnZ1ZT81ODY3Iiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdzQnlGb3JNZW1iZXIudnVlPzkzY2IiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1N0YXR1c1ByZXNlbnQudnVlP2Y1ZTciLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdWdWUudnVlPzBhOWIiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdzVnVlLnZ1ZT9hODM4Iiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdSZXZpZXdlcnMudnVlP2U4MzMiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1Jldmlld3NCeUZvck1lbWJlci52dWU/N2EwZCIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvU3RhdHVzUHJlc2VudC52dWU/ZDIxNyIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL1Jldmlld1Z1ZS52dWU/ZDk3YSIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL1Jldmlld3NWdWUudnVlPzFjYTIiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1Jldmlld1Jldmlld2Vycy52dWU/ODQ2YSIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZT83YWVmIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9TdGF0dXNQcmVzZW50LnZ1ZT9hMmMxIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3VnVlLnZ1ZT9kYmE2Iiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3c1Z1ZS52dWU/ZjkyYiIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3UmV2aWV3ZXJzLnZ1ZSIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZSIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvU3RhdHVzUHJlc2VudC52dWUiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdWdWUudnVlIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3c1Z1ZS52dWUiLCJ3ZWJwYWNrOi8vY291cnNlbGliL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY291cnNlbGliL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4gICAgPGRpdiBjbGFzcz1cImZ1bGwgY2wtcmV2aWV3aW5nXCI+XG5cbiAgICAgIDxtZW1iZXJzZmV0Y2hlciA6ZmV0Y2hpbmc9XCJyZXZpZXdlciA9PT0gbnVsbFwiPlxuICAgICAgICA8dGVtcGxhdGUgc2xvdC1zY29wZT1cImZldGNoZXJcIj5cbiAgICAgICAgICA8ZGl2IHYtaWY9XCJ1c2VyLmF0TGVhc3QoaW5zdHJ1Y3RvcilcIj5cbiAgICAgICAgICAgIDxmb3JtIG1ldGhvZD1cInBvc3RcIiBAc3VibWl0LnByZXZlbnQ9XCJhc3NpZ25SZXZpZXdzXCI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2VudGVyXCI+PGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+QXNzaWduIFJldmlld3M8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8c2VsZWN0IHYtbW9kZWw9XCJyZXZpZXdlckNudFwiPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2LWZvcj1cIm51bSBpbiA2XCIgOnZhbHVlPVwibnVtXCI+e3tudW19fTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8dGFibGUgY2xhc3M9XCJzbWFsbFwiPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGg+TmFtZTwvdGg+XG4gICAgICAgICAgICAgIDx0aD5Vc2VyIElEPC90aD5cbiAgICAgICAgICAgICAgPHRoIHYtZm9yPVwiaSBpbiBtYXhSZXZpZXdlclwiPnJldmlld2VlPC90aD5cbiAgICAgICAgICAgICAgPHRoIHYtZm9yPVwiaSBpbiBtYXhSZXZpZXdlZVwiPnJldmlld2VyPC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8dHIgdi1mb3I9XCJ1c2VyIGluIGZldGNoZXIudXNlcnNcIj5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwic21hbGxcIj5cbiAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgOnRpdGxlPVwidXNlci5uYW1lXCIgOnRvPVwicm9vdCArICcvY2wvY29uc29sZS9ncmFkaW5nLycgKyBhc3NpZ250YWcgKyAnLycgKyB1c2VyLm1lbWJlci5pZFwiPlxuICAgICAgICAgICAgICAgICAge3t1c2VyLm5hbWV9fVxuICAgICAgICAgICAgICAgIDwvcm91dGVyLWxpbms+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgOnRpdGxlPVwidXNlci5uYW1lXCIgOnRvPVwicm9vdCArICcvY2wvY29uc29sZS9ncmFkaW5nLycgKyBhc3NpZ250YWcgKyAnLycgKyB1c2VyLm1lbWJlci5pZFwiPlxuICAgICAgICAgICAgICAgICAge3t1c2VyLnVzZXJJZH19XG4gICAgICAgICAgICAgICAgPC9yb3V0ZXItbGluaz5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPHRkIHYtZm9yPVwiaSBpbiBtYXhSZXZpZXdlclwiIDpjbGFzcz1cImNscyhyZXZpZXdlclt1c2VyLm1lbWJlci5pZF0sIGktMSlcIj5cbiAgICAgICAgICAgICAgICA8c3RhdHVzLXByZXNlbnQgOmFzc2lnbnRhZz1cImFzc2lnbnRhZ1wiIDpzdGF0dXMtdXNlcj1cImRpc3BsYXlVc2VyKGZldGNoZXIudXNlcnMsIHJldmlld2VyW3VzZXIubWVtYmVyLmlkXSwgaS0xKVwiIDpjb3VudD1cInJldmlld2VyW3VzZXIubWVtYmVyLmlkXSAhPT0gdW5kZWZpbmVkID8gcmV2aWV3ZXJbdXNlci5tZW1iZXIuaWRdW2ktMV1bMV0gOiAwXCI+PC9zdGF0dXMtcHJlc2VudD5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPHRkIHYtZm9yPVwiaSBpbiBtYXhSZXZpZXdlZVwiIDpjbGFzcz1cImNscyhyZXZpZXdlZVt1c2VyLm1lbWJlci5pZF0sIGktMSlcIj5cbiAgICAgICAgICAgICAgICA8c3RhdHVzLXByZXNlbnQgOmFzc2lnbnRhZz1cImFzc2lnbnRhZ1wiIDpzdGF0dXMtdXNlcj1cImRpc3BsYXlVc2VyKGZldGNoZXIudXNlcnMsIHJldmlld2VlW3VzZXIubWVtYmVyLmlkXSwgaS0xKVwiIDpjb3VudD1cInJldmlld2VyW3VzZXIubWVtYmVyLmlkXSAhPT0gdW5kZWZpbmVkID8gcmV2aWV3ZXJbdXNlci5tZW1iZXIuaWRdW2ktMV1bMV0gOiAwXCI+PC9zdGF0dXMtcHJlc2VudD5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L21lbWJlcnNmZXRjaGVyPlxuXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cblxuICBpbXBvcnQgU3RhdHVzUHJlc2VudFZ1ZSBmcm9tICcuL1N0YXR1c1ByZXNlbnQudnVlJztcblxuICBleHBvcnQgZGVmYXVsdCB7XG4gICAgJ2V4dGVuZHMnOiBTaXRlLlNpdGUuQ29uc29sZUNvbXBvbmVudEJhc2UsXG4gICAgcHJvcHM6IFsnYXNzaWdudGFnJ10sXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYXNzaWdubWVudDogbnVsbCxcbiAgICAgICAgcmV2aWV3ZXJDbnQ6IDIsXG4gICAgICAgIHJldmlld2luZzogJ3gnLFxuICAgICAgICBpbnN0cnVjdG9yOiBTaXRlLlNpdGUuTWVtYmVyLklOU1RSVUNUT1IsXG4gICAgICAgIHJldmlld2VyOiBudWxsLFxuICAgICAgICByZXZpZXdlZTogbnVsbCxcbiAgICAgICAgbWF4UmV2aWV3ZXI6IDAsXG4gICAgICAgIG1heFJldmlld2VlOiAwXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAnbWVtYmVyc2ZldGNoZXInOiBTaXRlLk1lbWJlcnNGZXRjaGVyQ29tcG9uZW50VnVlLFxuICAgICAgJ3N0YXR1cy1wcmVzZW50JzogU3RhdHVzUHJlc2VudFZ1ZVxuICAgIH0sXG4gICAgbW91bnRlZCgpIHtcbiAgICAgIGNvbnN0IG1lbWJlciA9IHRoaXMuJHN0b3JlLnN0YXRlLnVzZXIudXNlci5tZW1iZXI7XG5cbiAgICAgIHRoaXMuc2VjdGlvbiA9IHRoaXMuJHN0b3JlLmdldHRlcnNbJ2NvdXJzZS9zZWN0aW9uJ10obWVtYmVyLnNlbWVzdGVyLCBtZW1iZXIuc2VjdGlvbik7XG4gICAgICB0aGlzLmFzc2lnbm1lbnQgPSB0aGlzLnNlY3Rpb24uZ2V0QXNzaWdubWVudCh0aGlzLmFzc2lnbnRhZyk7XG5cbiAgICAgIHRoaXMuc2V0VGl0bGUoJzogJyArIHRoaXMuYXNzaWdubWVudC5zaG9ydG5hbWUgKyAnIFJldmlld2luZycpO1xuXG4gICAgICB0aGlzLiRzaXRlLmFwaS5nZXQoJy9hcGkvcmV2aWV3L3Jldmlld2Vycy8nICsgdGhpcy5hc3NpZ250YWcsIHt9KVxuICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudGFrZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuJHNpdGUudG9hc3QodGhpcywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc2l0ZS50b2FzdCh0aGlzLCBlcnJvcik7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICBhc3NpZ25SZXZpZXdzKCkge1xuICAgICAgICBpZih0aGlzLm1heFJldmlld2VyID4gMCB8fCB0aGlzLm1heFJldmlld2VlID4gMCkge1xuICAgICAgICAgIG5ldyB0aGlzLiRzaXRlLkRpYWxvZy5NZXNzYWdlQm94KCdBcmUgeW91IHN1cmU/JywgJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBhc3NpZ24gcmV2aWV3ZXJzPyBUaGlzIHdpbGwgcmVwbGFjZSB0aGUgZXhpc3RpbmcgcmV2aWV3aW5nIGFzc2lnbm1lbnRzLicsXG4gICAgICAgICAgICAgICAgICB0aGlzLiRzaXRlLkRpYWxvZy5NZXNzYWdlQm94Lk9LQ0FOQ0VMLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXNzaWduUmV2aWV3c0FjdHVhbCgpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5hc3NpZ25SZXZpZXdzQWN0dWFsKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBhc3NpZ25SZXZpZXdzQWN0dWFsKCkge1xuICAgICAgICB0aGlzLnJldmlld2VyID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZXZpZXdlZSA9IG51bGw7XG4gICAgICAgIHRoaXMubWF4UmV2aWV3ZXIgPSAwO1xuICAgICAgICB0aGlzLm1heFJldmlld2VlID0gMDtcblxuICAgICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICAgIGNudDogdGhpcy5yZXZpZXdlckNudFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJHNpdGUuYXBpLnBvc3QoJy9hcGkvcmV2aWV3L3Jldmlld2Vycy8nICsgdGhpcy5hc3NpZ250YWcsIHBhcmFtcylcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuaGFzRXJyb3IoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRha2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2l0ZS50b2FzdCh0aGlzLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuJHNpdGUudG9hc3QodGhpcywgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICB9LFxuICAgICAgdGFrZShyZXNwb25zZSkge1xuICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuZ2V0RGF0YSgncmV2aWV3ZXJzJykuYXR0cmlidXRlcztcblxuICAgICAgICB0aGlzLnJldmlld2VyID0ge307XG4gICAgICAgIHRoaXMucmV2aWV3ZWUgPSB7fTtcbiAgICAgICAgdGhpcy5tYXhSZXZpZXdlciA9IDA7XG4gICAgICAgIHRoaXMubWF4UmV2aWV3ZWUgPSAwO1xuXG4gICAgICAgIGZvciAobGV0IGFzc2lnbiBvZiBkYXRhKSB7XG4gICAgICAgICAgY29uc3QgcmV2aWV3ZXIgPSArYXNzaWduWzBdO1xuICAgICAgICAgIGNvbnN0IHJldmlld2VlID0gK2Fzc2lnblsxXTtcbiAgICAgICAgICBjb25zdCBjbnQgPSArYXNzaWduWzJdO1xuXG4gICAgICAgICAgaWYgKHRoaXMucmV2aWV3ZXJbcmV2aWV3ZXJdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmV2aWV3ZXJbcmV2aWV3ZXJdID0gW107XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5yZXZpZXdlcltyZXZpZXdlcl0ucHVzaChbcmV2aWV3ZWUsIGNudF0pO1xuICAgICAgICAgIGlmICh0aGlzLnJldmlld2VyW3Jldmlld2VyXS5sZW5ndGggPiB0aGlzLm1heFJldmlld2VyKSB7XG4gICAgICAgICAgICB0aGlzLm1heFJldmlld2VyID0gdGhpcy5yZXZpZXdlcltyZXZpZXdlcl0ubGVuZ3RoO1xuICAgICAgICAgIH1cblxuXG4gICAgICAgICAgaWYgKHRoaXMucmV2aWV3ZWVbcmV2aWV3ZWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmV2aWV3ZWVbcmV2aWV3ZWVdID0gW107XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5yZXZpZXdlZVtyZXZpZXdlZV0ucHVzaChbcmV2aWV3ZXIsIGNudF0pO1xuICAgICAgICAgIGlmICh0aGlzLnJldmlld2VlW3Jldmlld2VlXS5sZW5ndGggPiB0aGlzLm1heFJldmlld2VlKSB7XG4gICAgICAgICAgICB0aGlzLm1heFJldmlld2VlID0gdGhpcy5yZXZpZXdlcltyZXZpZXdlcl0ubGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICB9LFxuICAgICAgZGlzcGxheVVzZXIodXNlcnMsIGFzc2lnbiwgaSkge1xuICAgICAgICBpZiAoYXNzaWduID09PSB1bmRlZmluZWQgfHwgaSA+PSBhc3NpZ24ubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCB1c2VyIG9mIHVzZXJzKSB7XG4gICAgICAgICAgaWYgKHVzZXIubWVtYmVyLmlkID09PSBhc3NpZ25baV1bMF0pIHtcbiAgICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcbiAgICAgIGNscyhhc3NpZ24sIGkpIHtcbiAgICAgICAgaWYgKGFzc2lnbiA9PT0gdW5kZWZpbmVkIHx8IGkgPj0gYXNzaWduLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhc3NpZ25baV1bMV0gPCAxID8gJ2NsLWVtcHR5JyA6ICcnO1xuXG4gICAgICB9XG4gICAgfVxuICB9XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImNsLXJldmlld3NcIj5cbiAgICA8aDI+U3RhZmYgUmV2aWV3PC9oMj5cbiAgICA8Zm9ybSBtZXRob2Q9XCJwb3N0XCIgQHN1Ym1pdC5wcmV2ZW50PVwic3VibWl0XCI+XG4gICAgICA8ZGl2IHJlZj1cImVkaXRvclwiPjwvZGl2PlxuICAgICAgPHA+PGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlN1Ym1pdCBSZXZpZXdcIj48L3A+XG4gICAgPC9mb3JtPlxuXG4gICAgPGgzPlJldmlld3MgYnkgdGhpcyB1c2VyLjwvaDM+XG4gICAgPHAgdi1pZj1cImJ5UmV2aWV3cy5sZW5ndGggID09PSAwXCIgY2xhc3M9XCJjZW50ZXJcIj5Ob25lPC9wPlxuICAgIDxkaXYgdi1mb3I9XCJyZXZpZXcgaW4gYnlSZXZpZXdzXCIgY2xhc3M9XCJjbC1yZXZpZXdcIj5cbiAgICAgIDxoMyA6Y2xhc3M9XCJyZXZpZXcucmV2aWV3ZWUuYXRMZWFzdChzdGFmZlJvbGUpID8gJ3N0YWZmJyA6ICcnXCI+e3tmb3JtYXRUaW1lKHJldmlldy50aW1lKX19IFJldmlldyBieSB7e3Jldmlldy5yZXZpZXdlZS5uYW1lfX1cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjbC1zdWJtaXR0ZWRcIj57e3Nob3dTdWJtaXNzaW9ucyhyZXZpZXcpfX08L3NwYW4+PC9oMz5cbiAgICAgIDxkaXYgY2xhc3M9XCJjbC1yZXZpZXctcHJlc2VudFwiPnt7cmV2aWV3Lm1ldGEucmV2aWV3LnJldmlld319PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGgzPlJldmlld3Mgb2YgdGhpcyB1c2VyJ3MgYXNzaWdubWVudC48L2gzPlxuICAgIDxwIHYtaWY9XCJmb3JSZXZpZXdzLmxlbmd0aCAgPT09IDBcIiBjbGFzcz1cImNlbnRlclwiPk5vbmU8L3A+XG4gICAgPGRpdiB2LWZvcj1cInJldmlldyBpbiBmb3JSZXZpZXdzXCIgY2xhc3M9XCJjbC1yZXZpZXdcIj5cbiAgICAgIDxoMyA6Y2xhc3M9XCJyZXZpZXcucmV2aWV3ZXIuYXRMZWFzdChzdGFmZlJvbGUpID8gJ3N0YWZmJyA6ICcnXCI+e3tmb3JtYXRUaW1lKHJldmlldy50aW1lKX19XG4gICAgICAgIDxzcGFuIHYtaWY9XCJyZXZpZXcucmV2aWV3ZXIuYXRMZWFzdChzdGFmZlJvbGUpXCI+U3RhZmYgUmV2aWV3PC9zcGFuPlxuICAgICAgICA8c3BhbiB2LWVsc2U+UmV2aWV3PC9zcGFuPiBieSB7e3Jldmlldy5yZXZpZXdlci5uYW1lfX1cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjbC1zdWJtaXR0ZWRcIj57e3Nob3dTdWJtaXNzaW9ucyhyZXZpZXcpfX08L3NwYW4+PC9oMz5cbiAgICAgIDxkaXYgY2xhc3M9XCJjbC1yZXZpZXctcHJlc2VudFwiPnt7cmV2aWV3Lm1ldGEucmV2aWV3LnJldmlld319PC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuXHQvKipcbiAgICogUHJlc2VudCByZXZpZXdzIGJ5IGFuZCBmb3IgYSBtZW1iZXIgYW5kIHRoZSBzdGFmZiByZXZpZXdpbmcgZm9ybS5cbiAgICogQGNvbnN0cnVjdG9yIFJldmlld3NCeUZvck1lbWJlclZ1ZVxuICAgKi9cblxuICBleHBvcnQgZGVmYXVsdCB7XG4gIFx0cHJvcHM6IFsndXNlcicsICdhc3NpZ250YWcnXSxcbiAgICBkYXRhOiBmdW5jdGlvbigpIHtcbiAgXHRcdHJldHVybiB7XG4gICAgICAgIGZvclJldmlld3M6IFtdLFxuICAgICAgICBieVJldmlld3M6IFtdLFxuICAgICAgICBzdGFmZlJvbGU6IFNpdGUuU2l0ZS5NZW1iZXIuU1RBRkYsXG4gICAgICAgIHN1Ym1pc3Npb25zOiBbXVxuICAgICAgfVxuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgXHRcdHVzZXIoKSB7XG4gIFx0XHRcdHRoaXMuZm9yUmV2aWV3cyA9IFtdO1xuICBcdFx0XHR0aGlzLmJ5UmV2aWV3cyA9IFtdO1xuICBcdFx0XHR0aGlzLnN1Ym1pc3Npb25zID0gW107XG4gIFx0XHRcdHRoaXMuZmV0Y2goKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG5cdCAgICBjb25zdCBlbGVtZW50ID0gdGhpcy4kcmVmc1snZWRpdG9yJ107XG5cdCAgICB0aGlzLmVkaXRvciA9IG5ldyB0aGlzLiRzaXRlLkVkaXRvcihlbGVtZW50LCB7XG5cdFx0ICAgIGhlaWdodDogJzEwZW0nLFxuXHRcdCAgICBjbGFzc2VzOiBbJ3llbGxvdy1wYWQnXVxuXHQgICAgfSk7XG5cblx0ICAgIHRoaXMuZmV0Y2goKTtcbiAgICB9LFxuXHQgIG1ldGhvZHM6IHtcbiAgXHRcdGZldGNoKCkge1xuICAgICAgICB0aGlzLiRzaXRlLmFwaS5nZXQoJy9hcGkvcmV2aWV3L3Jldmlld3MvJyArIHRoaXMuYXNzaWdudGFnICsgJy8nICsgdGhpcy51c2VyLm1lbWJlci5pZCwge30pXG4gICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcbiAgICAgICAgICAgICAgdGhpcy50YWtlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHRoaXMuJHNpdGUudG9hc3QodGhpcywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG5cdCAgICAgICAgICB0aGlzLiRzaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0sXG4gIFx0XHR0YWtlKHJlc3BvbnNlKSB7XG4gICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZ2V0RGF0YSgncmV2aWV3cy1ieS1mb3InKS5hdHRyaWJ1dGVzO1xuICAgICAgICBsZXQgc3VibWl0RGF0YSA9IHJlc3BvbnNlLmdldERhdGEoJ2Fzc2lnbm1lbnQtc3VibWlzc2lvbnMnKTtcbiAgICAgICAgaWYoc3VibWl0RGF0YSAhPT0gbnVsbCkge1xuXHQgICAgICAgIHRoaXMuc3VibWlzc2lvbnMgPSBzdWJtaXREYXRhLmF0dHJpYnV0ZXM7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IHJldmlldyBvZiBkYXRhLmZvcikge1xuXHQgICAgICAgIHJldmlldy5yZXZpZXdlciA9IG5ldyBTaXRlLlVzZXIocmV2aWV3LnJldmlld2VyKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHJldmlldyBvZiBkYXRhLmJ5KSB7XG5cdCAgICAgICAgcmV2aWV3LnJldmlld2VlID0gbmV3IFNpdGUuVXNlcihyZXZpZXcucmV2aWV3ZWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb3JSZXZpZXdzID0gZGF0YS5mb3I7XG4gICAgICAgIHRoaXMuYnlSZXZpZXdzID0gZGF0YS5ieTtcbiAgICAgIH0sXG5cdCAgICBzdWJtaXQoKSB7XG5cdFx0ICAgIGNvbnN0IHRleHQgPSB0aGlzLmVkaXRvci50ZXh0YXJlYS52YWx1ZS50cmltKCk7XG5cdFx0ICAgIGlmKHRleHQgPT09ICcnKSB7XG5cdFx0XHQgICAgU2l0ZS50b2FzdCh0aGlzLCAnWW91IG11c3QgZW50ZXIgc29tZSB0ZXh0IHRvIHN1Ym1pdCcpO1xuXHRcdFx0ICAgIHJldHVybjtcblx0XHQgICAgfVxuXG5cdFx0ICAgIGxldCBzdWJtaXNzaW9ucyA9IHt9O1xuXHRcdCAgICBmb3IobGV0IHRhZyBpbiB0aGlzLnN1Ym1pc3Npb25zKSB7XG5cdFx0ICAgIFx0Y29uc29sZS5sb2codGhpcy5zdWJtaXNzaW9uc1t0YWddKTtcblx0XHQgICAgXHRzdWJtaXNzaW9uc1t0YWddID0ge1xuXHRcdCAgICAgICAgJ2lkJzogdGhpcy5zdWJtaXNzaW9uc1t0YWddWzBdLmlkLFxuICAgICAgICAgICAgJ2RhdGUnOiB0aGlzLnN1Ym1pc3Npb25zW3RhZ11bMF0uZGF0ZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfVxuXG5cdFx0ICAgIGxldCBwYXJhbXMgPSB7XG5cdFx0XHQgICAgdHlwZTogJ3RleHQvcGxhaW4nLFxuXHRcdFx0ICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgc3VibWlzc2lvbnM6IHN1Ym1pc3Npb25zXG5cdFx0ICAgIH1cblxuXHRcdCAgICBTaXRlLmFwaS5wb3N0KGAvYXBpL3Jldmlldy9zdGFmZnJldmlldy8ke3RoaXMuYXNzaWdudGFnfS8ke3RoaXMudXNlci5tZW1iZXIuaWR9YCwgcGFyYW1zKVxuXHRcdFx0ICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHQgICAgaWYgKCFyZXNwb25zZS5oYXNFcnJvcigpKSB7XG5cdFx0XHRcdFx0ICAgIHRoaXMuZWRpdG9yLnRleHRhcmVhLnZhbHVlID0gJyc7XG5cdFx0XHRcdFx0ICAgIHRoaXMudGFrZShyZXNwb25zZSk7XG5cdFx0XHRcdFx0ICAgIFNpdGUudG9hc3QodGhpcywgXCJSZXZpZXcgc3VjY2Vzc2Z1bGx5IHNhdmVkIHRvIHRoZSBzZXJ2ZXJcIik7XG5cdFx0XHRcdCAgICB9IGVsc2Uge1xuXHRcdFx0XHRcdCAgICBTaXRlLnRvYXN0KHRoaXMsIHJlc3BvbnNlKTtcblx0XHRcdFx0ICAgIH1cblxuXHRcdFx0ICAgIH0pXG5cdFx0XHQgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0XHQgICAgU2l0ZS50b2FzdCh0aGlzLCBlcnJvcik7XG5cdFx0XHQgICAgfSk7XG5cdCAgICB9LFxuXHRcdCAgZm9ybWF0VGltZSh0aW1lKSB7XG5cdFx0XHQgIHJldHVybiB0aGlzLiRzaXRlLlRpbWVGb3JtYXR0ZXIucmVsYXRpdmVVTklYKHRpbWUsIG51bGwpO1xuXHRcdCAgfSxcblx0ICAgIHNob3dTdWJtaXNzaW9ucyhyZXZpZXcpIHtcbiAgXHRcdFx0bGV0IHN1Ym1pc3Npb25zID0gcmV2aWV3Lm1ldGEucmV2aWV3LnN1Ym1pc3Npb25zO1xuXG5cdFx0ICAgIGxldCByZXQgPSAnJztcblx0XHQgICAgZm9yKGxldCB0YWcgaW4gc3VibWlzc2lvbnMpIHtcblx0XHRcdCAgICByZXQgKz0gdGhpcy4kc2l0ZS5UaW1lRm9ybWF0dGVyLmFic29sdXRlVU5JWChzdWJtaXNzaW9uc1t0YWddLmRhdGUpO1xuXHRcdCAgICB9XG5cblx0XHQgICAgaWYocmV0ID09PSAnJykge1xuXHRcdFx0ICAgIHJldHVybiAnJztcblx0XHQgICAgfVxuXG5cdFx0ICAgIHJldHVybiAnU3VibWlzc2lvbjogJyArIHJldDtcblx0ICAgIH1cblx0ICB9XG4gIH1cbjwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT5cbiAgICA8cm91dGVyLWxpbmsgOnRvPVwicm9vdCArICcvY2wvY29uc29sZS9ncmFkaW5nLycgKyBhc3NpZ250YWcgKyAnLycgKyBzdGF0dXNVc2VyLm1lbWJlci5pZFwiIHYtaWY9XCJzdGF0dXNVc2VyICE9PSBudWxsXCIgOnRpdGxlPVwic3RhdHVzVXNlci5uYW1lXCI+e3tzdGF0dXNVc2VyLnVzZXJJZH19L3t7Y291bnR9fTwvcm91dGVyLWxpbms+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvciBTdGF0dXNQcmVzZW50VnVlXG4gICAgICogRGlzcGxheXMgdGhlIHN0YXR1cyBvZiBhIHJldmlld2VyIG9yIHJldmlld2VlLlxuICAgICAqIFVzZWQgYnkgUmV2aWV3UmV2aWV3ZXJzLnZ1ZVxuICAgICAqL1xuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgJ2V4dGVuZHMnOiBTaXRlLlNpdGUuQ29uc29sZUNvbXBvbmVudEJhc2UsXG4gICAgICAgIHByb3BzOiBbJ2Fzc2lnbnRhZycsICdzdGF0dXNVc2VyJywgJ2NvdW50J11cbiAgICB9XG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4gICAgPGRpdiBjbGFzcz1cImZ1bGxcIj5cbiAgICAgIDxkaXYgdi1mb3I9XCJzdWJtaXNzaW9uIGluIGpzb24uc3VibWlzc2lvbnNcIiBjbGFzcz1cImNsLXN1Ym1pc3Npb24tdmlld1wiPlxuICAgICAgICA8aDI+e3tzdWJtaXNzaW9uLm5hbWV9fTwvaDI+XG4gICAgICAgIDxwcmUgdi1pZj1cInN1Ym1pc3Npb24udHlwZSA9PT0gJ3RleHQnXCIgY2xhc3M9XCJjbC1wcmV2aWV3IHllbGxvdy1wYWRcIj57e3N1Ym1pc3Npb24udGV4dH19PC9wcmU+XG4gICAgICAgIDxmaWd1cmUgdi1pZj1cInN1Ym1pc3Npb24udHlwZSA9PT0gJ2ltYWdlJ1wiIGNsYXNzPVwiY2wtcHJldmlld1wiPjxpbWcgOnNyYz1cInByZXZpZXdJbWcoc3VibWlzc2lvbilcIj48L2ZpZ3VyZT5cbiAgICAgICAgPHAgY2xhc3M9XCJjbC1wcmV2aWV3LXRpbWVcIj57e2Zvcm1hdFRpbWUoc3VibWlzc2lvbi5kYXRlKX19PC9wPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxoMj5SZXZpZXc8L2gyPlxuICAgICAgPGZvcm0gbWV0aG9kPVwicG9zdFwiIEBzdWJtaXQucHJldmVudD1cInN1Ym1pdFwiPlxuICAgICAgICA8ZGl2IHJlZj1cImVkaXRvclwiIGNsYXNzPVwic2hhZG93XCI+PC9kaXY+XG4gICAgICAgIDxwPjxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJTdWJtaXQgUmV2aWV3XCI+PC9wPlxuICAgICAgPC9mb3JtPlxuXG4gICAgICA8aDI+UHJldmlvdXMgUmV2aWV3czwvaDI+XG4gICAgICA8cCBjbGFzcz1cImNsLXJldmlld3Mtbm9uZVwiIHYtaWY9XCJyZXZpZXdpbmcubGVuZ3RoID09PSAwXCI+KioqIE5vbmUgWWV0ICoqKjwvcD5cbiAgICAgIDxkaXYgdi1mb3I9XCJyZXZpZXcgaW4gcmV2aWV3aW5nXCIgY2xhc3M9XCJjbC1yZXZpZXdcIj5cbiAgICAgICAgPGgzPnt7Zm9ybWF0VGltZShyZXZpZXcudGltZSl9fSBSZXZpZXcgYnkgTWVcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNsLXN1Ym1pdHRlZFwiPnt7c2hvd1N1Ym1pc3Npb25zKHJldmlldyl9fTwvc3Bhbj48L2gzPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2wtcmV2aWV3LXByZXNlbnRcIj57e3Jldmlldy5tZXRhLnJldmlldy5yZXZpZXd9fTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgZXhwb3J0IGRlZmF1bHQge1xuICAgICdleHRlbmRzJzogU2l0ZS5TaXRlLlVzZXJWdWVCYXNlLFxuICAgIHByb3BzOiBbJ2pzb24nXSxcbiAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXZpZXdpbmc6IFtdLFxuICAgICAgICBzdWJtaXNzaW9uczoge31cbiAgICAgIH1cbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICB0aGlzLnNldFRpdGxlKCdQZWVyIFJldmlld2luZycpO1xuICAgICAgdGhpcy5yZXZpZXdpbmcgPSB0aGlzLmpzb24ucmV2aWV3aW5nO1xuXG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy4kcmVmc1snZWRpdG9yJ107XG4gICAgICB0aGlzLmVkaXRvciA9IG5ldyB0aGlzLiRzaXRlLkVkaXRvcihlbGVtZW50LCB7XG4gICAgICAgIGhlaWdodDogJzEwZW0nLFxuICAgICAgICBjbGFzc2VzOiBbJ3llbGxvdy1wYWQnXVxuICAgICAgfSk7XG5cbiAgICAgIGxldCBzdWJtaXNzaW9ucyA9IHt9O1xuICAgICAgZm9yIChjb25zdCBzdWJtaXNzaW9uIG9mIHRoaXMuanNvbi5zdWJtaXNzaW9ucykge1xuICAgICAgICBzdWJtaXNzaW9uc1tzdWJtaXNzaW9uLnRhZ10gPSB7XG4gICAgICAgICAgJ2lkJzogc3VibWlzc2lvbi5pZCxcbiAgICAgICAgICAnZGF0ZSc6IHN1Ym1pc3Npb24uZGF0ZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN1Ym1pc3Npb25zID0gc3VibWlzc2lvbnM7XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICBzdWJtaXQoKSB7XG4gICAgICAgIGNvbnN0IHRleHQgPSB0aGlzLmVkaXRvci50ZXh0YXJlYS52YWx1ZS50cmltKCk7XG4gICAgICAgIGlmICh0ZXh0ID09PSAnJykge1xuICAgICAgICAgIFNpdGUudG9hc3QodGhpcywgJ1lvdSBtdXN0IGVudGVyIHNvbWUgdGV4dCB0byBzdWJtaXQnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICAgIHR5cGU6ICd0ZXh0L3BsYWluJyxcbiAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgIHN1Ym1pc3Npb25zOiB0aGlzLnN1Ym1pc3Npb25zXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRzaXRlLmFwaS5wb3N0KGAvYXBpL3Jldmlldy9yZXZpZXcvJHt0aGlzLmpzb24uaWR9YCwgcGFyYW1zKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5oYXNFcnJvcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLnRleHRhcmVhLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV2aWV3aW5nID0gcmVzcG9uc2UuZ2V0RGF0YSgncmV2aWV3aW5nJykuYXR0cmlidXRlcztcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzaXRlLnRvYXN0KHRoaXMsIFwiUmV2aWV3IHN1Y2Nlc3NmdWxseSBzYXZlZCB0byB0aGUgc2VydmVyXCIpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2l0ZS50b2FzdCh0aGlzLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuJHNpdGUudG9hc3QodGhpcywgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGZvcm1hdFRpbWUodGltZSkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc2l0ZS5UaW1lRm9ybWF0dGVyLnJlbGF0aXZlVU5JWCh0aW1lLCBudWxsKTtcbiAgICAgIH0sXG4gICAgICBzaG93U3VibWlzc2lvbnMocmV2aWV3KSB7XG4gICAgICAgIGxldCBwYXN0ID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHN1Ym1pc3Npb25zID0gcmV2aWV3Lm1ldGEucmV2aWV3LnN1Ym1pc3Npb25zO1xuICAgICAgICBmb3IgKGxldCB0YWcgaW4gc3VibWlzc2lvbnMpIHtcbiAgICAgICAgICBpZiAoc3VibWlzc2lvbnNbdGFnXS5pZCAhPT0gdGhpcy5zdWJtaXNzaW9uc1t0YWddLmlkKSB7XG4gICAgICAgICAgICBwYXN0ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFzdCkge1xuICAgICAgICAgIHJldHVybiAnRm9yIGEgcGFzdCBzdWJtaXNzaW9uJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0sXG4gICAgICBwcmV2aWV3SW1nKHN1Ym1pc3Npb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHNpdGUucm9vdCArICcvY2wvcmV2aWV3L2ltZy8nICsgc3VibWlzc2lvbi5pZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbjwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImNsLXJldmlld3NcIj5cbiAgICA8aDM+UmV2aWV3cyBvZiB0aGlzIGFzc2lnbm1lbnQgYXBwZWFyIGhlcmUuPC9oMz5cbiAgICA8cCBjbGFzcz1cImNsLXJldmlld3Mtbm9uZVwiIHYtaWY9XCJyZXZpZXdzLmxlbmd0aCA9PT0gMFwiPioqKiBOb25lIFlldCAqKio8L3A+XG4gICAgPGRpdiB2LWZvcj1cInJldmlldyBpbiByZXZpZXdzXCIgY2xhc3M9XCJjbC1yZXZpZXdcIj5cbiAgICAgIDxoMyA6Y2xhc3M9XCJyZXZpZXcucm9sZSAhPT0gdW5kZWZpbmVkID8gJ3N0YWZmJyA6ICcnXCI+e3tmb3JtYXRUaW1lKHJldmlldy50aW1lKX19XG4gICAgICAgIDxzcGFuIHYtaWY9XCJyZXZpZXcucm9sZSAhPT0gdW5kZWZpbmVkXCI+U3RhZmYgUmV2aWV3PC9zcGFuPlxuICAgICAgICA8c3BhbiB2LWVsc2U+UmV2aWV3PC9zcGFuPiBieSB7e3Jldmlldy5ieX19XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2wtc3VibWl0dGVkXCI+e3tzaG93U3VibWlzc2lvbnMocmV2aWV3KX19PC9zcGFuPjwvaDM+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2wtcmV2aWV3LXByZXNlbnRcIj57e3Jldmlldy5yZXZpZXd9fTwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gIGV4cG9ydCBkZWZhdWx0IHtcbiAgICBwcm9wczogWydqc29uJ10sXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYXNzaWduVGFnOiAnJyxcbiAgICAgICAgcmV2aWV3czogW11cbiAgICAgIH1cbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICB0aGlzLmFzc2lnblRhZyA9IHRoaXMuanNvbi5hc3NpZ25UYWc7XG4gICAgICB0aGlzLnJldmlld3MgPSB0aGlzLmpzb24ucmV2aWV3cztcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgIGZvcm1hdFRpbWUodGltZSkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc2l0ZS5UaW1lRm9ybWF0dGVyLnJlbGF0aXZlVU5JWCh0aW1lLCBudWxsKTtcbiAgICAgIH0sXG4gICAgICBzaG93U3VibWlzc2lvbnMocmV2aWV3KSB7XG4gICAgICAgIGxldCByZXQgPSAnJztcbiAgICAgICAgZm9yIChsZXQgdGFnIGluIHJldmlldy5zdWJtaXNzaW9ucykge1xuICAgICAgICAgIGlmKHJldCAhPT0gJycpIHtcbiAgICAgICAgICAgIHJldCArPSAnIC8gJztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0ICs9IHRoaXMuJHNpdGUuVGltZUZvcm1hdHRlci5hYnNvbHV0ZVVOSVgocmV2aWV3LnN1Ym1pc3Npb25zW3RhZ10uZGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmV0ID09PSAnJykge1xuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnU3VibWlzc2lvbjogJyArIHJldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbjwvc2NyaXB0PiIsIi8qXG4gKiBUaGUgbWFpbiBSZXZpZXcgc3lzdGVtIGVudHJ5IHBvaW50XG4gKi9cblxuaW1wb3J0ICcuL19yZXZpZXcuc2Nzcyc7XG5pbXBvcnQge1Jldmlld0NvbnNvbGV9IGZyb20gJy4vanMvQ29uc29sZS9SZXZpZXdDb25zb2xlJztcbmltcG9ydCBSZXZpZXdWdWUgZnJvbSAnLi9qcy9SZXZpZXdWdWUudnVlJztcbmltcG9ydCBSZXZpZXdzVnVlIGZyb20gJy4vanMvUmV2aWV3c1Z1ZS52dWUnO1xuXG4vL1xuLy8gSW5zdGFsbCB0aGUgY29uc29sZSBjb21wb25lbnRzXG4vL1xuaWYoU2l0ZS5TaXRlLmNvbnNvbGUgIT09IHVuZGVmaW5lZCkge1xuXHRSZXZpZXdDb25zb2xlLnNldHVwKFNpdGUuU2l0ZS5jb25zb2xlKTtcbn1cblxuLy9cbi8vIENyZWF0ZSB0aGUgaW5saW5lIGFuZCBwYWdlIGNvbXBvbmVudHNcbi8vXG5TaXRlLlNpdGUucmVhZHkoKCkgPT4ge1xuICAgIFNpdGUuU2l0ZS5QYWdlVnVlLmNyZWF0ZSgnZGl2LmNsLXJldmlldycsICdSZXZpZXcgVnVlJywgUmV2aWV3VnVlKTtcblx0U2l0ZS5TaXRlLklubGluZVZ1ZS5jcmVhdGUoJ2Rpdi5jbC1yZXZpZXdzJywgUmV2aWV3c1Z1ZSk7XG59KTsiLCJcblxuaW1wb3J0IFJldmlld1Jldmlld2Vyc1Z1ZSBmcm9tICcuL1Jldmlld1Jldmlld2Vycy52dWUnO1xuaW1wb3J0IFJldmlld3NCeUZvck1lbWJlclZ1ZSBmcm9tICcuL1Jldmlld3NCeUZvck1lbWJlci52dWUnO1xuXG4vKipcbiAqIFJldmlldyBzeXN0ZW0gY29uc29sZSBjb21wb25lbnRzXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZXhwb3J0IGxldCBSZXZpZXdDb25zb2xlID0gZnVuY3Rpb24oKSB7XG59XG5cblJldmlld0NvbnNvbGUuc2V0dXAgPSBmdW5jdGlvbihDb25zb2xlKSB7XG4gICAgQ29uc29sZS5SZXZpZXcgPSB7XG4gICAgICAgICdyZXZpZXdzYnlmb3InOiBSZXZpZXdzQnlGb3JNZW1iZXJWdWVcbiAgICB9O1xuXG4gICAgQ29uc29sZS50YWJsZXMuYWRkKHtcbiAgICAgICAgdGl0bGU6ICdSZXZpZXcnLFxuICAgICAgICBvcmRlcjogNzAsXG4gICAgICAgIGFwaTogJy9hcGkvcmV2aWV3L3RhYmxlcydcbiAgICB9KTtcblxuICAgIENvbnNvbGUuY29tcG9uZW50cy5hZGRSb3V0ZShcbiAgICAgICAge3JvdXRlOiAnL3Jldmlldy9yZXZpZXdlcnMvOmFzc2lnbnRhZycsIGNvbXBvbmVudDogUmV2aWV3UmV2aWV3ZXJzVnVlLCBwcm9wczogdHJ1ZX1cbiAgICApO1xuXG4gICAgQ29uc29sZS5jb3Vyc2UuYXNzaWdubWVudExpbmsoJ3JldmlldycsICdyZXZpZXdlcnMnLCAnL3Jldmlldy9yZXZpZXdlcnMvOmFzc2lnbnRhZycpO1xufVxuXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vY3NzLWxvYWRlci12aXJ0dWFsLWMyOWUwMGNmMGUvMC9jYWNoZS9jc3MtbG9hZGVyLW5wbS02LjcuMS1iOTNhMmRlMGQ0LTE3MGZkYmM2MzAuemlwL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9jc3MtbG9hZGVyLXZpcnR1YWwtYzI5ZTAwY2YwZS8wL2NhY2hlL2Nzcy1sb2FkZXItbnBtLTYuNy4xLWI5M2EyZGUwZDQtMTcwZmRiYzYzMC56aXAvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiZGl2LmNsLXJldmlld2luZyB0ZC5jbC1lbXB0eSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThmN2YzO1xcbn1cXG5cXG5wLmNsLXJldmlld3Mtbm9uZSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogIzAwNzIzZjtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuXFxuZGl2LmNsLXJldmlld3MgaDMge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZDogIzAwNzIzZjtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuZGl2LmNsLXJldmlldyB7XFxuICBtYXJnaW46IDFlbSAwO1xcbn1cXG5kaXYuY2wtcmV2aWV3IGgzIHtcXG4gIGZvbnQtc2l6ZTogMC44NWVtO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgY29sb3I6ICMwMDcyM2Y7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzAwNzIzZjtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcbmRpdi5jbC1yZXZpZXcgaDMgc3Bhbi5jbC1zdWJtaXR0ZWQge1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgY29sb3I6ICMwMDkwOWU7XFxuICBmb250LXNpemU6IDAuOWVtO1xcbn1cXG5kaXYuY2wtcmV2aWV3IGgzLnN0YWZmIHtcXG4gIGNvbG9yOiByZWQ7XFxufVxcbmRpdi5jbC1yZXZpZXcgcHJlIHtcXG4gIG1hcmdpbjogMDtcXG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcXG59XFxuZGl2LmNsLXJldmlldyBkaXYuY2wtcmV2aWV3LXByZXNlbnQge1xcbiAgbWFyZ2luOiAwO1xcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi92ZW5kb3IvY2wvcmV2aWV3L19yZXZpZXcuc2Nzc1wiLFwid2VicGFjazovLy4vdmVuZG9yL2NsL3NpdGUvc2Fzcy9tb2R1bGVzL19jb2xvcnMuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFHRTtFQUNFLHlCQ1VpQjtBRFpyQjs7QUFNQTtFQUNFLGtCQUFBO0VBQ0EsY0NFUTtFRERSLGtCQUFBO0FBSEY7O0FBUUU7RUFDRSxrQkFBQTtFQUNBLG1CQ05NO0VET04sWUFBQTtBQUxKOztBQVNBO0VBQ0UsYUFBQTtBQU5GO0FBUUU7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGNDbkJNO0VEb0JOLGdDQUFBO0VBQ0EsZ0JBQUE7QUFOSjtBQVFJO0VBQ0UsWUFBQTtFQUNBLGNDbkJJO0VEb0JKLGdCQUFBO0FBTk47QUFXRTtFQUNFLFVBQUE7QUFUSjtBQVlFO0VBQ0UsU0FBQTtFQUNBLHFCQUFBO0FBVko7QUFhRTtFQUNFLFNBQUE7RUFDQSxxQkFBQTtBQVhKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgJ35zaXRlLWNsL3Nhc3MvbW9kdWxlcy9jb2xvcnMnO1xcblxcbmRpdi5jbC1yZXZpZXdpbmcge1xcbiAgdGQuY2wtZW1wdHkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkdmVyeS1saWdodC1wcmltYXJ5O1xcbiAgfVxcbn1cXG5cXG5wLmNsLXJldmlld3Mtbm9uZSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogJHByaW1hcnk7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcblxcbmRpdi5jbC1yZXZpZXdzIHtcXG5cXG4gIGgzIHtcXG4gICAgdGV4dC1hbGlnbjpjZW50ZXI7XFxuICAgIGJhY2tncm91bmQ6ICRwcmltYXJ5O1xcbiAgICBjb2xvcjp3aGl0ZTtcXG4gIH1cXG59XFxuXFxuZGl2LmNsLXJldmlldyB7XFxuICBtYXJnaW46IDFlbSAwO1xcblxcbiAgaDMge1xcbiAgICBmb250LXNpemU6IDAuODVlbTtcXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgY29sb3I6ICRwcmltYXJ5O1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHByaW1hcnk7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuXFxuICAgIHNwYW4uY2wtc3VibWl0dGVkIHtcXG4gICAgICBmbG9hdDogcmlnaHQ7XFxuICAgICAgY29sb3I6ICRzZWNvbmRhO1xcbiAgICAgIGZvbnQtc2l6ZTogMC45ZW07XFxuICAgIH1cXG4gIH1cXG5cXG5cXG4gIGgzLnN0YWZmIHtcXG4gICAgY29sb3I6IHJlZDtcXG4gIH1cXG5cXG4gIHByZSB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xcbiAgfVxcblxcbiAgZGl2LmNsLXJldmlldy1wcmVzZW50IHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XFxuICB9XFxufVxcblwiLFwiLy8gVGhlIG1ham9yIGNvbG9yc1xcclxcbi8vIFdlIGhhdmUgYSBwcmltYXJ5IGNvbG9yLCB0d28gc2Vjb25kYXJ5IGNvbG9ycywgYW5kIGEgY29tcGxlbWVudGFyeSBjb2xvci5cXHJcXG4kYWNjZW50OiAjNjA3RDhCO1xcclxcblxcclxcbiR0b2FzdC1iYWNrZ3JvdW5kOiAjMTUxNTE1O1xcclxcbiR0b2FzdC10ZXh0OiB3aGl0ZTtcXHJcXG5cXHJcXG4kaGVhZGVyLWJhY2tncm91bmQ6ICM1MzUwNTQ7XFxyXFxuJGhlYWRlci10ZXh0OiAjZWVlZWVlO1xcclxcblxcclxcbi8vIFRoZSBtYWpvciBjb2xvcnNcXHJcXG4vLyBXZSBoYXZlIGEgcHJpbWFyeSBjb2xvciwgdHdvIHNlY29uZGFyeSBjb2xvcnMsIGFuZCBhIGNvbXBsZW1lbnRhcnkgY29sb3IuXFxyXFxuJHByaW1hcnk6ICMwMDcyM2Y7XFxyXFxuJGxpZ2h0LXByaW1hcnk6ICM0NGEyNmI7XFxyXFxuJHZlcnktbGlnaHQtcHJpbWFyeTogI2U4ZjdmMztcXHJcXG4kZGFyay1wcmltYXJ5OiAjMDA1MjIzO1xcclxcbiRwcmltYXJ5LXRleHQ6ICMyMTIxMjE7XFxyXFxuXFxyXFxuJHNlY29uZGE6ICMwMDkwOWU7XFxyXFxuJHNlY29uZGI6ICNmY2FmMTc7XFxyXFxuJHNlY29uZGM6ICNjODlhNTg7IC8vICNlOGQ5YjU7XFxyXFxuXFxyXFxuJGNvbXA6ICNjNDE0MjU7XFxyXFxuJGJsaW5kOiAjZWZjNmZmO1xcclxcbiRjb21wLWJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgjNTcwMTAyLCAjOTYwNjA2LCAjNTcwMTAyKTtcXHJcXG4kY29tcC1ib3JkZXI6ICNjN2JkYmI7XFxyXFxuXFxyXFxuLy8gTWVudXNcXHJcXG4kZm9jdXM6ICMwMDgxODM7XFxyXFxuJG1lbnUtYmFja2dyb3VuZDogI2U4ZThlODtcXHJcXG4kbWVudS1ob3ZlcjogI2QwZDBkMDtcXHJcXG4kbWVudS1jb2xvcjogYmxhY2s7XFxyXFxuXFxyXFxuLy8gUGFnZSBiYWNrZ3JvdW5kXFxyXFxuJGJhY2tncm91bmQ6ICNlZWVlZWU7XFxyXFxuXFxyXFxuLy8gTmF2XFxyXFxuJG5hdi1jb2xvcjogd2hpdGU7XFxyXFxuJG5hdi1iYWNrZ3JvdW5kOiB1cmwoJ2ltZy9uYXZfcGF0dGVybi5wbmcnKTtcXHJcXG4kbmF2LTItY29sb3I6ICNmZmZmOTk7XFxyXFxuJG5hdi0yLWJhY2tncm91bmQ6IHVybCgnaW1nL25hdl9wYXR0ZXJuLTIucG5nJyk7XFxyXFxuXFxyXFxuLy8gVGFibGVzXFxyXFxuJHRhYmxlLWdyYWRpZW50LWZyb206ICMyMDRjNDI7XFxyXFxuJHRhYmxlLWdyYWRpZW50LXRvOiAjMzg5YjU0O1xcclxcblxcclxcbi8vIERpYWxvZyBib3hlc1xcclxcbiRkaWFsb2ctZ3JhZGllbnQtZnJvbTogIzIwNGM0MjtcXHJcXG4kZGlhbG9nLWdyYWRpZW50LXRvOiAjMzg5YjU0O1xcclxcbiRkaWFsb2ctYmFyLWNvbG9yOiB3aGl0ZTtcXHJcXG5cXHJcXG4vLyBMaW5rIGNvbG9yc1xcclxcbiRsaW5rOiAjODA4MDgwO1xcclxcbiR2aXNpdGVkOiAjOTY4NDQzOyAgLy8gI2IwOWQ1YjtcXHJcXG4kaG92ZXI6ICMzMzY2Y2M7XFxyXFxuXFxyXFxuJHZlcnktbGlnaHQtcHJpbWFyeS1saW5rOiAjOTAwMDAwO1xcclxcbiR2ZXJ5LWxpZ2h0LXByaW1hcnktaG92ZXI6ICNjMDAwMDA7XFxyXFxuXFxyXFxuXFxyXFxuJHByaW1hcnktbGluazogd2hpdGU7XFxyXFxuJHByaW1hcnktdmlzaXRlZDogI2RkZGRkZDtcXHJcXG4kc2Vjb25kYi12aXNpdGVkOiAjNTU1NTU1O1xcclxcbiRhdXRvYmFjay1saW5rOiAjODgyMjIyO1xcclxcbiRhdXRvYmFjay1saW5rLWhvdmVyOiAjY2MyMjIyO1xcclxcblxcclxcbiRzaGFkb3cteDogM3B4O1xcclxcbiRzaGFkb3cteTogM3B4O1xcclxcbiRzaGFkb3ctcmFkaXVzOiA4cHg7XFxyXFxuJHNoYWRvdy1jb2xvcjogI2NjYztcXHJcXG5cXHJcXG4kdG9nZ2xlLWxpbmstaG92ZXItY29sb3I6ICMwMDY2MDA7XFxyXFxuXFxyXFxuLy8gQm94ZXNcXHJcXG4kYm94LWJvcmRlci1jb2xvcjogI2JkYmRiZDtcXHJcXG5cXHJcXG4vLyBDYXJkc1xcclxcbiRjYXJkLWhlYWRpbmctYmFja2dyb3VuZDogI2YyZjJmMjtcXHJcXG4kY2FyZC1ib3JkZXItY29sb3I6ICNjY2NjY2M7XFxyXFxuXFxyXFxuJXNoYWRvdyB7XFxyXFxuICAtbW96LWJveC1zaGFkb3c6ICRzaGFkb3cteCAkc2hhZG93LXkgJHNoYWRvdy1yYWRpdXMgJHNoYWRvdy1jb2xvcjtcXHJcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogJHNoYWRvdy14ICRzaGFkb3cteSAkc2hhZG93LXJhZGl1cyAkc2hhZG93LWNvbG9yO1xcclxcbiAgYm94LXNoYWRvdzogJHNoYWRvdy14ICRzaGFkb3cteSAkc2hhZG93LXJhZGl1cyAkc2hhZG93LWNvbG9yO1xcclxcbn1cXHJcXG5cXHJcXG4lbm9zaGFkb3cge1xcclxcbiAgLW1vei1ib3gtc2hhZG93OiBub25lO1xcclxcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBub25lO1xcclxcbiAgYm94LXNoYWRvdzogbm9uZTtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3N0eWxlLWxvYWRlci12aXJ0dWFsLTQ1Zjc1YmNiNGIvMC9jYWNoZS9zdHlsZS1sb2FkZXItbnBtLTMuMy4xLTRiYmI2ZWM3N2YtNDcwZmVlZjY4MC56aXAvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc3R5bGUtbG9hZGVyLXZpcnR1YWwtNDVmNzViY2I0Yi8wL2NhY2hlL3N0eWxlLWxvYWRlci1ucG0tMy4zLjEtNGJiYjZlYzc3Zi00NzBmZWVmNjgwLnppcC9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc3R5bGUtbG9hZGVyLXZpcnR1YWwtNDVmNzViY2I0Yi8wL2NhY2hlL3N0eWxlLWxvYWRlci1ucG0tMy4zLjEtNGJiYjZlYzc3Zi00NzBmZWVmNjgwLnppcC9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3N0eWxlLWxvYWRlci12aXJ0dWFsLTQ1Zjc1YmNiNGIvMC9jYWNoZS9zdHlsZS1sb2FkZXItbnBtLTMuMy4xLTRiYmI2ZWM3N2YtNDcwZmVlZjY4MC56aXAvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc3R5bGUtbG9hZGVyLXZpcnR1YWwtNDVmNzViY2I0Yi8wL2NhY2hlL3N0eWxlLWxvYWRlci1ucG0tMy4zLjEtNGJiYjZlYzc3Zi00NzBmZWVmNjgwLnppcC9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc3R5bGUtbG9hZGVyLXZpcnR1YWwtNDVmNzViY2I0Yi8wL2NhY2hlL3N0eWxlLWxvYWRlci1ucG0tMy4zLjEtNGJiYjZlYzc3Zi00NzBmZWVmNjgwLnppcC9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vY3NzLWxvYWRlci12aXJ0dWFsLWMyOWUwMGNmMGUvMC9jYWNoZS9jc3MtbG9hZGVyLW5wbS02LjcuMS1iOTNhMmRlMGQ0LTE3MGZkYmM2MzAuemlwL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uLy55YXJuL2NhY2hlL3Jlc29sdmUtdXJsLWxvYWRlci1ucG0tNS4wLjAtOWI0NDEwNjdjOS02ZDQ4MzczM2E0LnppcC9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Nhc3MtbG9hZGVyLXZpcnR1YWwtMjhjMGU3YjQ3NC8wL2NhY2hlL3Nhc3MtbG9hZGVyLW5wbS0xMy4wLjItY2E2OGFmZDczZC02MzA2NzEyY2M3LnppcC9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtNFswXS5ydWxlc1swXS51c2VbM10hLi9fcmV2aWV3LnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9jc3MtbG9hZGVyLXZpcnR1YWwtYzI5ZTAwY2YwZS8wL2NhY2hlL2Nzcy1sb2FkZXItbnBtLTYuNy4xLWI5M2EyZGUwZDQtMTcwZmRiYzYzMC56aXAvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vLnlhcm4vY2FjaGUvcmVzb2x2ZS11cmwtbG9hZGVyLW5wbS01LjAuMC05YjQ0MTA2N2M5LTZkNDgzNzMzYTQuemlwL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc2Fzcy1sb2FkZXItdmlydHVhbC0yOGMwZTdiNDc0LzAvY2FjaGUvc2Fzcy1sb2FkZXItbnBtLTEzLjAuMi1jYTY4YWZkNzNkLTYzMDY3MTJjYzcuemlwL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcz8/Y2xvbmVkUnVsZVNldC00WzBdLnJ1bGVzWzBdLnVzZVszXSEuL19yZXZpZXcuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vYmFiZWwtbG9hZGVyLXZpcnR1YWwtZDcyNmJjYmFkYy8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOC4yLjUtZTc0OWUyNmJiNS1hNjYwNTU1Nzg4LnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yWzBdLnJ1bGVzWzBdLnVzZSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTdkNGI0Y2Y3Ni8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuOC00MzhmNGQwZmYwLWNhNGM5OWIyNjEuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmV2aWV3UmV2aWV3ZXJzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9iYWJlbC1sb2FkZXItdmlydHVhbC1kNzI2YmNiYWRjLzAvY2FjaGUvYmFiZWwtbG9hZGVyLW5wbS04LjIuNS1lNzQ5ZTI2YmI1LWE2NjA1NTU3ODguemlwL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTJbMF0ucnVsZXNbMF0udXNlIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1hN2Q0YjRjZjc2LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS44LTQzOGY0ZDBmZjAtY2E0Yzk5YjI2MS56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXZpZXdSZXZpZXdlcnMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9iYWJlbC1sb2FkZXItdmlydHVhbC1kNzI2YmNiYWRjLzAvY2FjaGUvYmFiZWwtbG9hZGVyLW5wbS04LjIuNS1lNzQ5ZTI2YmI1LWE2NjA1NTU3ODguemlwL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTJbMF0ucnVsZXNbMF0udXNlIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1hN2Q0YjRjZjc2LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS44LTQzOGY0ZDBmZjAtY2E0Yzk5YjI2MS56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXZpZXdzQnlGb3JNZW1iZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2JhYmVsLWxvYWRlci12aXJ0dWFsLWQ3MjZiY2JhZGMvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTguMi41LWU3NDllMjZiYjUtYTY2MDU1NTc4OC56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMlswXS5ydWxlc1swXS51c2UhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWE3ZDRiNGNmNzYvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjgtNDM4ZjRkMGZmMC1jYTRjOTliMjYxLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jldmlld3NCeUZvck1lbWJlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2JhYmVsLWxvYWRlci12aXJ0dWFsLWQ3MjZiY2JhZGMvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTguMi41LWU3NDllMjZiYjUtYTY2MDU1NTc4OC56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMlswXS5ydWxlc1swXS51c2UhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWE3ZDRiNGNmNzYvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjgtNDM4ZjRkMGZmMC1jYTRjOTliMjYxLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1N0YXR1c1ByZXNlbnQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2JhYmVsLWxvYWRlci12aXJ0dWFsLWQ3MjZiY2JhZGMvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTguMi41LWU3NDllMjZiYjUtYTY2MDU1NTc4OC56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMlswXS5ydWxlc1swXS51c2UhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWE3ZDRiNGNmNzYvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjgtNDM4ZjRkMGZmMC1jYTRjOTliMjYxLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1N0YXR1c1ByZXNlbnQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9iYWJlbC1sb2FkZXItdmlydHVhbC1kNzI2YmNiYWRjLzAvY2FjaGUvYmFiZWwtbG9hZGVyLW5wbS04LjIuNS1lNzQ5ZTI2YmI1LWE2NjA1NTU3ODguemlwL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTJbMF0ucnVsZXNbMF0udXNlIS4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1hN2Q0YjRjZjc2LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS44LTQzOGY0ZDBmZjAtY2E0Yzk5YjI2MS56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXZpZXdWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2JhYmVsLWxvYWRlci12aXJ0dWFsLWQ3MjZiY2JhZGMvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTguMi41LWU3NDllMjZiYjUtYTY2MDU1NTc4OC56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMlswXS5ydWxlc1swXS51c2UhLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWE3ZDRiNGNmNzYvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjgtNDM4ZjRkMGZmMC1jYTRjOTliMjYxLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jldmlld1Z1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2JhYmVsLWxvYWRlci12aXJ0dWFsLWQ3MjZiY2JhZGMvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTguMi41LWU3NDllMjZiYjUtYTY2MDU1NTc4OC56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMlswXS5ydWxlc1swXS51c2UhLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWE3ZDRiNGNmNzYvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjgtNDM4ZjRkMGZmMC1jYTRjOTliMjYxLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jldmlld3NWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2JhYmVsLWxvYWRlci12aXJ0dWFsLWQ3MjZiY2JhZGMvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTguMi41LWU3NDllMjZiYjUtYTY2MDU1NTc4OC56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMlswXS5ydWxlc1swXS51c2UhLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWE3ZDRiNGNmNzYvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjgtNDM4ZjRkMGZmMC1jYTRjOTliMjYxLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jldmlld3NWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLTgwNjYxNDRmYTYvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjgtNDM4ZjRkMGZmMC1jYTRjOTliMjYxLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1hN2Q0YjRjZjc2LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS44LTQzOGY0ZDBmZjAtY2E0Yzk5YjI2MS56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXZpZXdSZXZpZXdlcnMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWJlYzVkZmRjJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLTgwNjYxNDRmYTYvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjgtNDM4ZjRkMGZmMC1jYTRjOTliMjYxLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1hN2Q0YjRjZjc2LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS44LTQzOGY0ZDBmZjAtY2E0Yzk5YjI2MS56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXZpZXdzQnlGb3JNZW1iZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTdiMzZmZTc2JlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLTgwNjYxNDRmYTYvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjgtNDM4ZjRkMGZmMC1jYTRjOTliMjYxLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1hN2Q0YjRjZjc2LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS44LTQzOGY0ZDBmZjAtY2E0Yzk5YjI2MS56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9TdGF0dXNQcmVzZW50LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00NDQ1YzU2NSZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC04MDY2MTQ0ZmE2LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS44LTQzOGY0ZDBmZjAtY2E0Yzk5YjI2MS56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTdkNGI0Y2Y3Ni8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuOC00MzhmNGQwZmYwLWNhNGM5OWIyNjEuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmV2aWV3VnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00ZWViMzI2MiZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC04MDY2MTQ0ZmE2LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS44LTQzOGY0ZDBmZjAtY2E0Yzk5YjI2MS56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTdkNGI0Y2Y3Ni8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuOC00MzhmNGQwZmYwLWNhNGM5OWIyNjEuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmV2aWV3c1Z1ZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MDk0ZmU0NDcmXCIiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29udGVudFwiIH0sIFtcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcImZ1bGwgY2wtcmV2aWV3aW5nXCIgfSxcbiAgICAgIFtcbiAgICAgICAgX2MoXCJtZW1iZXJzZmV0Y2hlclwiLCB7XG4gICAgICAgICAgYXR0cnM6IHsgZmV0Y2hpbmc6IF92bS5yZXZpZXdlciA9PT0gbnVsbCB9LFxuICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBrZXk6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICBmbjogZnVuY3Rpb24oZmV0Y2hlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICBfdm0udXNlci5hdExlYXN0KF92bS5pbnN0cnVjdG9yKVxuICAgICAgICAgICAgICAgICAgICA/IF9jKFwiZGl2XCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IG1ldGhvZDogXCJwb3N0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VibWl0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5hc3NpZ25SZXZpZXdzLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJjZW50ZXJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImJ1dHRvblwiLCB7IGF0dHJzOiB7IHR5cGU6IFwic3VibWl0XCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIkFzc2lnbiBSZXZpZXdzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5yZXZpZXdlckNudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJyZXZpZXdlckNudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICQkc2VsZWN0ZWRWYWwgPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoJGV2ZW50LnRhcmdldC5vcHRpb25zLCBmdW5jdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvLnNlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIl92YWx1ZVwiIGluIG8gPyBvLl92YWx1ZSA6IG8udmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ucmV2aWV3ZXJDbnQgPSAkZXZlbnQudGFyZ2V0Lm11bHRpcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAkJHNlbGVjdGVkVmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAkJHNlbGVjdGVkVmFsWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woNiwgZnVuY3Rpb24obnVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvcHRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZG9tUHJvcHM6IHsgdmFsdWU6IG51bSB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhudW0pKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJzbWFsbFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ0aFwiLCBbX3ZtLl92KFwiTmFtZVwiKV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInRoXCIsIFtfdm0uX3YoXCJVc2VyIElEXCIpXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0ubWF4UmV2aWV3ZXIsIGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXCJ0aFwiLCBbX3ZtLl92KFwicmV2aWV3ZWVcIildKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS5tYXhSZXZpZXdlZSwgZnVuY3Rpb24oaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcInRoXCIsIFtfdm0uX3YoXCJyZXZpZXdlclwiKV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woZmV0Y2hlci51c2VycywgZnVuY3Rpb24odXNlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwic21hbGxcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnJvb3QgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiL2NsL2NvbnNvbGUvZ3JhZGluZy9cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmFzc2lnbnRhZyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIvXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIubWVtYmVyLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3ModXNlci5uYW1lKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3V0ZXItbGlua1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB1c2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5yb290ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIi9jbC9jb25zb2xlL2dyYWRpbmcvXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5hc3NpZ250YWcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiL1wiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLm1lbWJlci5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKHVzZXIudXNlcklkKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLm1heFJldmlld2VyLCBmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBfdm0uY2xzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnJldmlld2VyW3VzZXIubWVtYmVyLmlkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgLSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzdGF0dXMtcHJlc2VudFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ250YWc6IF92bS5hc3NpZ250YWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RhdHVzLXVzZXJcIjogX3ZtLmRpc3BsYXlVc2VyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoZXIudXNlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnJldmlld2VyW3VzZXIubWVtYmVyLmlkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpIC0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ucmV2aWV3ZXJbdXNlci5tZW1iZXIuaWRdICE9PVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfdm0ucmV2aWV3ZXJbdXNlci5tZW1iZXIuaWRdW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgLSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1bMV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0ubWF4UmV2aWV3ZWUsIGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IF92bS5jbHMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ucmV2aWV3ZWVbdXNlci5tZW1iZXIuaWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAtIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInN0YXR1cy1wcmVzZW50XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbnRhZzogX3ZtLmFzc2lnbnRhZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGF0dXMtdXNlclwiOiBfdm0uZGlzcGxheVVzZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hlci51c2VycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ucmV2aWV3ZWVbdXNlci5tZW1iZXIuaWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgLSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5yZXZpZXdlclt1c2VyLm1lbWJlci5pZF0gIT09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF92bS5yZXZpZXdlclt1c2VyLm1lbWJlci5pZF1bXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAtIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVsxXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSlcbiAgICAgICAgfSlcbiAgICAgIF0sXG4gICAgICAxXG4gICAgKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImNsLXJldmlld3NcIiB9LFxuICAgIFtcbiAgICAgIF9jKFwiaDJcIiwgW192bS5fdihcIlN0YWZmIFJldmlld1wiKV0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImZvcm1cIixcbiAgICAgICAge1xuICAgICAgICAgIGF0dHJzOiB7IG1ldGhvZDogXCJwb3N0XCIgfSxcbiAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgc3VibWl0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgcmV0dXJuIF92bS5zdWJtaXQuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW19jKFwiZGl2XCIsIHsgcmVmOiBcImVkaXRvclwiIH0pLCBfdm0uX3YoXCIgXCIpLCBfdm0uX20oMCldXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiaDNcIiwgW192bS5fdihcIlJldmlld3MgYnkgdGhpcyB1c2VyLlwiKV0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5ieVJldmlld3MubGVuZ3RoID09PSAwXG4gICAgICAgID8gX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2VudGVyXCIgfSwgW192bS5fdihcIk5vbmVcIildKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5fbChfdm0uYnlSZXZpZXdzLCBmdW5jdGlvbihyZXZpZXcpIHtcbiAgICAgICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtcmV2aWV3XCIgfSwgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJoM1wiLFxuICAgICAgICAgICAgeyBjbGFzczogcmV2aWV3LnJldmlld2VlLmF0TGVhc3QoX3ZtLnN0YWZmUm9sZSkgPyBcInN0YWZmXCIgOiBcIlwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmZvcm1hdFRpbWUocmV2aWV3LnRpbWUpKSArXG4gICAgICAgICAgICAgICAgICBcIiBSZXZpZXcgYnkgXCIgK1xuICAgICAgICAgICAgICAgICAgX3ZtLl9zKHJldmlldy5yZXZpZXdlZS5uYW1lKSArXG4gICAgICAgICAgICAgICAgICBcIlxcbiAgICAgIFwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXN1Ym1pdHRlZFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5zaG93U3VibWlzc2lvbnMocmV2aWV3KSkpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtcmV2aWV3LXByZXNlbnRcIiB9LCBbXG4gICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKHJldmlldy5tZXRhLnJldmlldy5yZXZpZXcpKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICB9KSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImgzXCIsIFtfdm0uX3YoXCJSZXZpZXdzIG9mIHRoaXMgdXNlcidzIGFzc2lnbm1lbnQuXCIpXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmZvclJldmlld3MubGVuZ3RoID09PSAwXG4gICAgICAgID8gX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2VudGVyXCIgfSwgW192bS5fdihcIk5vbmVcIildKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5fbChfdm0uZm9yUmV2aWV3cywgZnVuY3Rpb24ocmV2aWV3KSB7XG4gICAgICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXJldmlld1wiIH0sIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiaDNcIixcbiAgICAgICAgICAgIHsgY2xhc3M6IHJldmlldy5yZXZpZXdlci5hdExlYXN0KF92bS5zdGFmZlJvbGUpID8gXCJzdGFmZlwiIDogXCJcIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5mb3JtYXRUaW1lKHJldmlldy50aW1lKSkgKyBcIlxcbiAgICAgIFwiKSxcbiAgICAgICAgICAgICAgcmV2aWV3LnJldmlld2VyLmF0TGVhc3QoX3ZtLnN0YWZmUm9sZSlcbiAgICAgICAgICAgICAgICA/IF9jKFwic3BhblwiLCBbX3ZtLl92KFwiU3RhZmYgUmV2aWV3XCIpXSlcbiAgICAgICAgICAgICAgICA6IF9jKFwic3BhblwiLCBbX3ZtLl92KFwiUmV2aWV3XCIpXSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBieSBcIiArIF92bS5fcyhyZXZpZXcucmV2aWV3ZXIubmFtZSkgKyBcIlxcbiAgICAgIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtc3VibWl0dGVkXCIgfSwgW1xuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLnNob3dTdWJtaXNzaW9ucyhyZXZpZXcpKSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjbC1yZXZpZXctcHJlc2VudFwiIH0sIFtcbiAgICAgICAgICAgIF92bS5fdihfdm0uX3MocmV2aWV3Lm1ldGEucmV2aWV3LnJldmlldykpXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgIH0pXG4gICAgXSxcbiAgICAyXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwicFwiLCBbXG4gICAgICBfYyhcImlucHV0XCIsIHsgYXR0cnM6IHsgdHlwZTogXCJzdWJtaXRcIiwgdmFsdWU6IFwiU3VibWl0IFJldmlld1wiIH0gfSlcbiAgICBdKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX3ZtLnN0YXR1c1VzZXIgIT09IG51bGxcbiAgICA/IF9jKFxuICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgdG86XG4gICAgICAgICAgICAgIF92bS5yb290ICtcbiAgICAgICAgICAgICAgXCIvY2wvY29uc29sZS9ncmFkaW5nL1wiICtcbiAgICAgICAgICAgICAgX3ZtLmFzc2lnbnRhZyArXG4gICAgICAgICAgICAgIFwiL1wiICtcbiAgICAgICAgICAgICAgX3ZtLnN0YXR1c1VzZXIubWVtYmVyLmlkLFxuICAgICAgICAgICAgdGl0bGU6IF92bS5zdGF0dXNVc2VyLm5hbWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS5zdGF0dXNVc2VyLnVzZXJJZCkgKyBcIi9cIiArIF92bS5fcyhfdm0uY291bnQpKV1cbiAgICAgIClcbiAgICA6IF92bS5fZSgpXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbnRlbnRcIiB9LCBbXG4gICAgX2MoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBzdGF0aWNDbGFzczogXCJmdWxsXCIgfSxcbiAgICAgIFtcbiAgICAgICAgX3ZtLl9sKF92bS5qc29uLnN1Ym1pc3Npb25zLCBmdW5jdGlvbihzdWJtaXNzaW9uKSB7XG4gICAgICAgICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtc3VibWlzc2lvbi12aWV3XCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJoMlwiLCBbX3ZtLl92KF92bS5fcyhzdWJtaXNzaW9uLm5hbWUpKV0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIHN1Ym1pc3Npb24udHlwZSA9PT0gXCJ0ZXh0XCJcbiAgICAgICAgICAgICAgPyBfYyhcInByZVwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXByZXZpZXcgeWVsbG93LXBhZFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3Moc3VibWlzc2lvbi50ZXh0KSlcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIHN1Ym1pc3Npb24udHlwZSA9PT0gXCJpbWFnZVwiXG4gICAgICAgICAgICAgID8gX2MoXCJmaWd1cmVcIiwgeyBzdGF0aWNDbGFzczogXCJjbC1wcmV2aWV3XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJpbWdcIiwgeyBhdHRyczogeyBzcmM6IF92bS5wcmV2aWV3SW1nKHN1Ym1pc3Npb24pIH0gfSlcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXByZXZpZXctdGltZVwiIH0sIFtcbiAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uZm9ybWF0VGltZShzdWJtaXNzaW9uLmRhdGUpKSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXSlcbiAgICAgICAgfSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiaDJcIiwgW192bS5fdihcIlJldmlld1wiKV0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcImZvcm1cIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhdHRyczogeyBtZXRob2Q6IFwicG9zdFwiIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBzdWJtaXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zdWJtaXQuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcImRpdlwiLCB7IHJlZjogXCJlZGl0b3JcIiwgc3RhdGljQ2xhc3M6IFwic2hhZG93XCIgfSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX3ZtLl9tKDApXG4gICAgICAgICAgXVxuICAgICAgICApLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcImgyXCIsIFtfdm0uX3YoXCJQcmV2aW91cyBSZXZpZXdzXCIpXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF92bS5yZXZpZXdpbmcubGVuZ3RoID09PSAwXG4gICAgICAgICAgPyBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJjbC1yZXZpZXdzLW5vbmVcIiB9LCBbXG4gICAgICAgICAgICAgIF92bS5fdihcIioqKiBOb25lIFlldCAqKipcIilcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX3ZtLl9sKF92bS5yZXZpZXdpbmcsIGZ1bmN0aW9uKHJldmlldykge1xuICAgICAgICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXJldmlld1wiIH0sIFtcbiAgICAgICAgICAgIF9jKFwiaDNcIiwgW1xuICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5mb3JtYXRUaW1lKHJldmlldy50aW1lKSkgKyBcIiBSZXZpZXcgYnkgTWVcXG4gICAgICAgIFwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXN1Ym1pdHRlZFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5zaG93U3VibWlzc2lvbnMocmV2aWV3KSkpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXJldmlldy1wcmVzZW50XCIgfSwgW1xuICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKHJldmlldy5tZXRhLnJldmlldy5yZXZpZXcpKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICB9KVxuICAgICAgXSxcbiAgICAgIDJcbiAgICApXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW1xuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcInBcIiwgW1xuICAgICAgX2MoXCJpbnB1dFwiLCB7IGF0dHJzOiB7IHR5cGU6IFwic3VibWl0XCIsIHZhbHVlOiBcIlN1Ym1pdCBSZXZpZXdcIiB9IH0pXG4gICAgXSlcbiAgfVxuXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgeyBzdGF0aWNDbGFzczogXCJjbC1yZXZpZXdzXCIgfSxcbiAgICBbXG4gICAgICBfYyhcImgzXCIsIFtfdm0uX3YoXCJSZXZpZXdzIG9mIHRoaXMgYXNzaWdubWVudCBhcHBlYXIgaGVyZS5cIildKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0ucmV2aWV3cy5sZW5ndGggPT09IDBcbiAgICAgICAgPyBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJjbC1yZXZpZXdzLW5vbmVcIiB9LCBbXG4gICAgICAgICAgICBfdm0uX3YoXCIqKiogTm9uZSBZZXQgKioqXCIpXG4gICAgICAgICAgXSlcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uX2woX3ZtLnJldmlld3MsIGZ1bmN0aW9uKHJldmlldykge1xuICAgICAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjbC1yZXZpZXdcIiB9LCBbXG4gICAgICAgICAgX2MoXCJoM1wiLCB7IGNsYXNzOiByZXZpZXcucm9sZSAhPT0gdW5kZWZpbmVkID8gXCJzdGFmZlwiIDogXCJcIiB9LCBbXG4gICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5mb3JtYXRUaW1lKHJldmlldy50aW1lKSkgKyBcIlxcbiAgICAgIFwiKSxcbiAgICAgICAgICAgIHJldmlldy5yb2xlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgPyBfYyhcInNwYW5cIiwgW192bS5fdihcIlN0YWZmIFJldmlld1wiKV0pXG4gICAgICAgICAgICAgIDogX2MoXCJzcGFuXCIsIFtfdm0uX3YoXCJSZXZpZXdcIildKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBieSBcIiArIF92bS5fcyhyZXZpZXcuYnkpICsgXCJcXG4gICAgICBcIiksXG4gICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJjbC1zdWJtaXR0ZWRcIiB9LCBbXG4gICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLnNob3dTdWJtaXNzaW9ucyhyZXZpZXcpKSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXJldmlldy1wcmVzZW50XCIgfSwgW1xuICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhyZXZpZXcucmV2aWV3KSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgfSlcbiAgICBdLFxuICAgIDJcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUmV2aWV3UmV2aWV3ZXJzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1iZWM1ZGZkYyZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9SZXZpZXdSZXZpZXdlcnMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9SZXZpZXdSZXZpZXdlcnMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTdkNGI0Y2Y3Ni8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuOC00MzhmNGQwZmYwLWNhNGM5OWIyNjEuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy9jaGFybGVzb3dlbi93ZWIvY29tcGxldGUvLnlhcm4vY2FjaGUvdnVlLWhvdC1yZWxvYWQtYXBpLW5wbS0yLjMuNC01NDlhZTI2MzM3LTliZWZjMGIzZDYuemlwL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJ2JlYzVkZmRjJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJ2JlYzVkZmRjJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJ2JlYzVkZmRjJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9SZXZpZXdSZXZpZXdlcnMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWJlYzVkZmRjJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJ2JlYzVkZmRjJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJ2ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3UmV2aWV3ZXJzLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03YjM2ZmU3NiZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9SZXZpZXdzQnlGb3JNZW1iZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9SZXZpZXdzQnlGb3JNZW1iZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTdkNGI0Y2Y3Ni8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuOC00MzhmNGQwZmYwLWNhNGM5OWIyNjEuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy9jaGFybGVzb3dlbi93ZWIvY29tcGxldGUvLnlhcm4vY2FjaGUvdnVlLWhvdC1yZWxvYWQtYXBpLW5wbS0yLjMuNC01NDlhZTI2MzM3LTliZWZjMGIzZDYuemlwL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzdiMzZmZTc2JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzdiMzZmZTc2JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzdiMzZmZTc2JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9SZXZpZXdzQnlGb3JNZW1iZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTdiMzZmZTc2JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzdiMzZmZTc2Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJ2ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vU3RhdHVzUHJlc2VudC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDQ0NWM1NjUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vU3RhdHVzUHJlc2VudC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1N0YXR1c1ByZXNlbnQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTdkNGI0Y2Y3Ni8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuOC00MzhmNGQwZmYwLWNhNGM5OWIyNjEuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy9jaGFybGVzb3dlbi93ZWIvY29tcGxldGUvLnlhcm4vY2FjaGUvdnVlLWhvdC1yZWxvYWQtYXBpLW5wbS0yLjMuNC01NDlhZTI2MzM3LTliZWZjMGIzZDYuemlwL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzQ0NDVjNTY1JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzQ0NDVjNTY1JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzQ0NDVjNTY1JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9TdGF0dXNQcmVzZW50LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00NDQ1YzU2NSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc0NDQ1YzU2NScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwidmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1N0YXR1c1ByZXNlbnQudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9SZXZpZXdWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTRlZWIzMjYyJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1Jldmlld1Z1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1Jldmlld1Z1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1hN2Q0YjRjZjc2LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS44LTQzOGY0ZDBmZjAtY2E0Yzk5YjI2MS56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL2NoYXJsZXNvd2VuL3dlYi9jb21wbGV0ZS8ueWFybi9jYWNoZS92dWUtaG90LXJlbG9hZC1hcGktbnBtLTIuMy40LTU0OWFlMjYzMzctOWJlZmMwYjNkNi56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNGVlYjMyNjInKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNGVlYjMyNjInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNGVlYjMyNjInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1Jldmlld1Z1ZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NGVlYjMyNjImXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNGVlYjMyNjInLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3VnVlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUmV2aWV3c1Z1ZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MDk0ZmU0NDcmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUmV2aWV3c1Z1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1Jldmlld3NWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTdkNGI0Y2Y3Ni8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuOC00MzhmNGQwZmYwLWNhNGM5OWIyNjEuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy9jaGFybGVzb3dlbi93ZWIvY29tcGxldGUvLnlhcm4vY2FjaGUvdnVlLWhvdC1yZWxvYWQtYXBpLW5wbS0yLjMuNC01NDlhZTI2MzM3LTliZWZjMGIzZDYuemlwL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzA5NGZlNDQ3JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzA5NGZlNDQ3JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzA5NGZlNDQ3JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9SZXZpZXdzVnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wOTRmZTQ0NyZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCcwOTRmZTQ0NycsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwidmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdzVnVlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJSZXZpZXdcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY291cnNlbGliXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2NvdXJzZWxpYlwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi92ZW5kb3IvY2wvcmV2aWV3L2luZGV4LmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOlsicHJvcHMiLCJkYXRhIiwiYXNzaWdubWVudCIsInJldmlld2VyQ250IiwicmV2aWV3aW5nIiwiaW5zdHJ1Y3RvciIsInJldmlld2VyIiwicmV2aWV3ZWUiLCJtYXhSZXZpZXdlciIsIm1heFJldmlld2VlIiwiY29tcG9uZW50cyIsIm1vdW50ZWQiLCJ0aGVuIiwibWV0aG9kcyIsImFzc2lnblJldmlld3MiLCJhc3NpZ25SZXZpZXdzQWN0dWFsIiwiY250IiwidGFrZSIsInJlc3BvbnNlIiwiZGlzcGxheVVzZXIiLCJ1c2VycyIsImFzc2lnbiIsImkiLCJjbHMiLCJmb3JSZXZpZXdzIiwiYnlSZXZpZXdzIiwic3RhZmZSb2xlIiwic3VibWlzc2lvbnMiLCJ3YXRjaCIsInVzZXIiLCJoZWlnaHQiLCJjbGFzc2VzIiwiZmV0Y2giLCJyZXZpZXciLCJzdWJtaXQiLCJTaXRlIiwiY29uc29sZSIsInR5cGUiLCJ0ZXh0IiwiZm9ybWF0VGltZSIsInRpbWUiLCJzaG93U3VibWlzc2lvbnMiLCJyZXQiLCJwYXN0IiwicHJldmlld0ltZyIsInN1Ym1pc3Npb24iLCJhc3NpZ25UYWciLCJyZXZpZXdzIiwiUmV2aWV3Q29uc29sZSIsIlJldmlld1Z1ZSIsIlJldmlld3NWdWUiLCJ1bmRlZmluZWQiLCJzZXR1cCIsInJlYWR5IiwiUGFnZVZ1ZSIsImNyZWF0ZSIsIklubGluZVZ1ZSIsIlJldmlld1Jldmlld2Vyc1Z1ZSIsIlJldmlld3NCeUZvck1lbWJlclZ1ZSIsIkNvbnNvbGUiLCJSZXZpZXciLCJ0YWJsZXMiLCJhZGQiLCJ0aXRsZSIsIm9yZGVyIiwiYXBpIiwiYWRkUm91dGUiLCJyb3V0ZSIsImNvbXBvbmVudCIsImNvdXJzZSIsImFzc2lnbm1lbnRMaW5rIl0sInNvdXJjZVJvb3QiOiIifQ==