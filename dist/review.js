(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Review"] = factory();
	else
		root["Review"] = factory();
})(window, function() {
return (window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["Review"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/console/js/ConsoleComponentBase.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/console/js/ConsoleComponentBase.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var users_cl_js_Vue_UserVueBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! users-cl/js/Vue/UserVueBase.vue */ "./vendor/cl/users/js/Vue/UserVueBase.vue");
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  'extends': users_cl_js_Vue_UserVueBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  methods: {
    /**
     * Add an option to the nav2 menu.
     * @param title Title of the option to add.
     * @param order Order in the menu.
     * @param closure Function to call when selected.
     */
    addNav2: function addNav2(title, order, closure) {
      var item = this.$site.console.components.addNav2Link(this, title, order, closure);
      this.components1.push(item);
      return item;
    },

    /**
     * Add an option to the nav2 menu that is a router link
     * @param title Title of the option to add.
     * @param order Order in the menu.
     * @param link Link without Site.root
     */
    addNav2Link: function addNav2Link(title, order, link) {
      var _this = this;

      this.addNav2(title, order, function () {
        _this.$router.push(Site.root + link);
      });
    },
    removeNav2: function removeNav2(item) {
      var i = this.components1.indexOf(item);

      if (i >= 0) {
        this.components1.splice(i, 1);
      }

      this.$site.console.components.removeNav2(this, item);
    }
  },
  created: function created() {
    this.components1 = [];
  },
  beforeDestroy: function beforeDestroy() {
    this.$site.console.components.removeNav2(this, this.components1);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/course/js/Console/Members/MembersFetcherComponent.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/course/js/Console/Members/MembersFetcherComponent.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var users_cl_js_Lib_FetcherVue_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! users-cl/js/Lib/FetcherVue.vue */ "./vendor/cl/users/js/Lib/FetcherVue.vue");
/* harmony import */ var _Members_Member__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Members/Member */ "./vendor/cl/course/js/Members/Member.js");
/* harmony import */ var _StudentsOnly__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StudentsOnly */ "./vendor/cl/course/js/Console/Members/StudentsOnly.js");
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
 * Member fetcher component that can be used by views.
 *
 * @constructor MembersFetcherComponentVue
 */

/* harmony default export */ __webpack_exports__["default"] = ({
  // If the fetching value it true, the using client
  // is fetching more than just the membership and we will
  // wait for that as well.
  props: {
    fetching: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      students: false,
      studentsElement: null
    };
  },
  methods: {
    fetchMore: function fetchMore() {
      this.$store.dispatch('members/more');
    },

    /**
     * Add "Students Only" to the menu bar
     * @memberof MembersFetcherComponentVue
     */
    addStudentsOnly: function addStudentsOnly() {
      this.students = _StudentsOnly__WEBPACK_IMPORTED_MODULE_3__["StudentsOnly"].get();
      var element = this.$refs['students-only'];
      element.parentNode.removeChild(element);
      var extra = document.querySelector('div.cl-section-component span.extra');
      extra.appendChild(element);
      element.style.display = 'inline-block';
      this.studentsElement = element;
    },
    studentsOnlyChanged: function studentsOnlyChanged() {
      _StudentsOnly__WEBPACK_IMPORTED_MODULE_3__["StudentsOnly"].set(this.students);
    }
  },
  computed: Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    users: function users(state) {
      if (this.students) {
        return state.members.users.filter(function (user) {
          return user.role() === _Members_Member__WEBPACK_IMPORTED_MODULE_2__["Member"].STUDENT;
        });
      } else {
        return state.members.users;
      }
    },
    fetcher: function fetcher(state) {
      return state.members.fetcher;
    }
  }),
  components: {
    'fetcher': users_cl_js_Lib_FetcherVue_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  mounted: function mounted() {
    var _this = this;

    this.students = _StudentsOnly__WEBPACK_IMPORTED_MODULE_3__["StudentsOnly"].get();
    var member = this.$store.state.user.user.member;
    var query = {
      semester: member.semester,
      section: member.section
    };
    this.$store.commit('members/query', query);
    this.$store.dispatch('members/fetch');
    setTimeout(function () {
      _this.addStudentsOnly();
    }, 100);
  },
  beforeDestroy: function beforeDestroy() {
    this.studentsElement.parentNode.removeChild(this.studentsElement);
    var extras = document.querySelectorAll('div.cl-section-component span.extra');
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var course_cl_js_Members_Member__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! course-cl/js/Members/Member */ "./vendor/cl/course/js/Members/Member.js");
/* harmony import */ var console_cl_js_ConsoleComponentBase_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! console-cl/js/ConsoleComponentBase.vue */ "./vendor/cl/console/js/ConsoleComponentBase.vue");
/* harmony import */ var course_cl_js_Console_Members_MembersFetcherComponent_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! course-cl/js/Console/Members/MembersFetcherComponent.vue */ "./vendor/cl/course/js/Console/Members/MembersFetcherComponent.vue");
/* harmony import */ var site_cl_js_Vue_Mask_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! site-cl/js/Vue/Mask.vue */ "./vendor/cl/site/js/Vue/Mask.vue");
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




/* harmony default export */ __webpack_exports__["default"] = ({
  'extends': console_cl_js_ConsoleComponentBase_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
  props: ['assigntag'],
  data: function data() {
    return {
      assignment: null,
      reviewerCnt: 2,
      reviewing: 'x',
      instructor: course_cl_js_Members_Member__WEBPACK_IMPORTED_MODULE_0__["Member"].INSTRUCTOR,
      reviewer: null,
      reviewee: null,
      maxReviewer: 0,
      maxReviewee: 0,
      mask: false
    };
  },
  components: {
    'membersfetcher': course_cl_js_Console_Members_MembersFetcherComponent_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    maskVue: site_cl_js_Vue_Mask_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  mounted: function mounted() {
    var _this = this;

    var member = this.$store.state.user.user.member;
    this.section = this.$store.getters['course/section'](member.semester, member.section);
    this.assignment = this.section.getAssignment(this.assigntag);
    this.setTitle(': ' + this.assignment.shortname + ' Reviewing');
    this.mask = true;
    Site.api.get('/api/review/reviewers/' + this.assigntag, {}).then(function (response) {
      _this.mask = false;

      if (!response.hasError()) {
        _this.take(response);
      } else {
        Site.toast(_this, response);
      }
    }).catch(function (error) {
      _this.mask = false;
      Site.toast(_this, error);
    });
  },
  methods: {
    assignReviews: function assignReviews() {
      var _this2 = this;

      this.mask = true;
      var params = {
        cnt: this.reviewerCnt
      };
      Site.api.post('/api/review/reviewers/' + this.assigntag, params).then(function (response) {
        _this2.mask = false;

        if (!response.hasError()) {
          _this2.take(response);
        } else {
          Site.toast(_this2, response);
        }
      }).catch(function (error) {
        _this2.mask = false;
        Site.toast(_this2, error);
      });
    },
    take: function take(response) {
      var data = response.getData('reviewers').attributes;
      this.reviewer = {};
      this.reviewee = {};
      this.maxReviewer = 0;
      this.maxReviewee = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var assign = _step.value;
          var reviewer = assign[0];
          var reviewee = assign[1];
          var cnt = assign[2];

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
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    },
    display: function display(users, assign, i) {
      if (assign === undefined || i >= assign.length) {
        return ' ';
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = users[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var user = _step2.value;

          if (user.member.id === assign[i][0]) {
            return "<a title=\"".concat(user.name, "\">").concat(user.userId, "</a>/").concat(assign[i][1]); // user.userId + '/' + assign[i][1];
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return ' ';
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var site_cl_js_TimeFormatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! site-cl/js/TimeFormatter */ "./vendor/cl/site/js/TimeFormatter.js");
/* harmony import */ var site_cl_js_UI_Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! site-cl/js/UI/Editor */ "./vendor/cl/site/js/UI/Editor.js");
/* harmony import */ var course_cl_js_Members_Member__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! course-cl/js/Members/Member */ "./vendor/cl/course/js/Members/Member.js");
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



/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['user', 'assigntag'],
  data: function data() {
    return {
      forReviews: [],
      byReviews: [],
      staffRole: course_cl_js_Members_Member__WEBPACK_IMPORTED_MODULE_2__["Member"].STAFF,
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
    this.editor = new site_cl_js_UI_Editor__WEBPACK_IMPORTED_MODULE_1__["Editor"](element, {
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
      }).catch(function (error) {
        _this.$site.toast(_this, error);
      });
    },
    take: function take(response) {
      var data = response.getData('reviews-by-for').attributes;
      var submitData = response.getData('assignment-submissions');

      if (submitData !== null) {
        this.submissions = submitData.attributes;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data.for[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var review = _step.value;
          review.reviewer = new Users.User(review.reviewer);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = data.by[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _review = _step2.value;
          _review.reviewee = new Users.User(_review.reviewee);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this.forReviews = data.for;
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
      }).catch(function (error) {
        Site.toast(_this2, error);
      });
    },
    formatTime: function formatTime(time) {
      return site_cl_js_TimeFormatter__WEBPACK_IMPORTED_MODULE_0__["TimeFormatter"].relativeUNIX(time, null);
    },
    showSubmissions: function showSubmissions(review) {
      var submissions = review.meta.review.submissions;
      var ret = '';

      for (var tag in submissions) {
        ret += site_cl_js_TimeFormatter__WEBPACK_IMPORTED_MODULE_0__["TimeFormatter"].absoluteUNIX(submissions[tag].date);
      }

      if (ret === '') {
        return '';
      }

      return 'Submission: ' + ret;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var users_cl_js_Vue_UserVueBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! users-cl/js/Vue/UserVueBase.vue */ "./vendor/cl/users/js/Vue/UserVueBase.vue");
/* harmony import */ var site_cl_js_UI_Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! site-cl/js/UI/Editor */ "./vendor/cl/site/js/UI/Editor.js");
/* harmony import */ var site_cl_js_TimeFormatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! site-cl/js/TimeFormatter */ "./vendor/cl/site/js/TimeFormatter.js");
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



/* harmony default export */ __webpack_exports__["default"] = ({
  'extends': users_cl_js_Vue_UserVueBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
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
    this.editor = new site_cl_js_UI_Editor__WEBPACK_IMPORTED_MODULE_1__["Editor"](element, {
      height: '10em',
      classes: ['yellow-pad']
    });
    var submissions = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.json.submissions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var submission = _step.value;
        submissions[submission.tag] = {
          'id': submission.id,
          'date': submission.date
        };
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
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
      Site.api.post("/api/review/review/".concat(this.json.id), params).then(function (response) {
        if (!response.hasError()) {
          _this.editor.textarea.value = '';
          _this.reviewing = response.getData('reviewing').attributes;
          Site.toast(_this, "Review successfully saved to the server");
        } else {
          Site.toast(_this, response);
        }
      }).catch(function (error) {
        Site.toast(_this, error);
      });
    },
    formatTime: function formatTime(time) {
      return site_cl_js_TimeFormatter__WEBPACK_IMPORTED_MODULE_2__["TimeFormatter"].relativeUNIX(time, null);
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
      return Site.root + '/cl/review/img/' + submission.id;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var site_cl_js_TimeFormatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! site-cl/js/TimeFormatter */ "./vendor/cl/site/js/TimeFormatter.js");
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

/* harmony default export */ __webpack_exports__["default"] = ({
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
      return site_cl_js_TimeFormatter__WEBPACK_IMPORTED_MODULE_0__["TimeFormatter"].relativeUNIX(time, null);
    },
    showSubmissions: function showSubmissions(review) {
      var ret = '';

      for (var tag in review.submissions) {
        ret += site_cl_js_TimeFormatter__WEBPACK_IMPORTED_MODULE_0__["TimeFormatter"].absoluteUNIX(review.submissions[tag].date);
      }

      if (ret === '') {
        return '';
      }

      return 'Submission: ' + ret;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/site/js/Vue/Mask.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/site/js/Vue/Mask.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//

/**
 * Masking Vue component.
 *
 * When enabled, a translucent mask with an optional message
 * is displayed and controls are disabled.
 *
 * Must be a child of an element with a position setting
 * in CSS. When mask is true, the interface is disabled by
 * an overlay mask.
 * @constructor MaskVue
 * @example
 * // Include this component
 * import MaskVue from 'site-cl/js/Vue/Mask.vue';
 * @example
 *      data: function() {
 *        return {
 *            mask: false
 *        }
 *     },
 *     components: {
 *      maskVue: MaskVue
 *     }
 * @example
 * <mask-vue :mask="mask">Sending Email...</mask-vue>
 * @example
 * this.mask = true;  // Enable the mask
 * this.mask = false; // Disable the mask
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['mask'],
  data: function data() {
    return {
      slotDelay: true,
      timer: null
    };
  },
  watch: {
    mask: function mask() {
      var _this = this;

      if (this.timer !== null) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.slotDelay = false;
      this.timer = setTimeout(function () {
        _this.slotDelay = true;
      }, 1000);
    }
  },
  computed: {
    maskClass: function maskClass() {
      return this.mask ? 'cl-mask mask' : 'cl-mask';
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/site/js/Vue/PageVueBase.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/site/js/Vue/PageVueBase.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
  * Base component for pages.
  * @constructor PageVueBase
  */
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      /**
        * Site object
        * @memberof PageVueBase
        * @instance
        * @member {Site} site
        */
      site: Site,

      /**
        * Site root path (Site.root)
        * @memberof PageVueBase
        * @instance
        * @member {string} root
        */
      root: Site.root
    };
  },
  methods: {
    /**
      * Set the page title
      * @memberof PageVueBase
      * @instance
     * @param {string} title
     */
    setTitle: function setTitle(title) {
      this.$parent.setTitle(title);
    },
    setMenu: function setMenu(menu) {
      this.$parent.setMenu(menu);
    },
    getMenu: function getMenu() {
      return this.$parent.getMenu();
    },
    clearMenu: function clearMenu() {
      this.setMenu([]);
    },

    /**
     * Add an option to the nav2 menu.
     * @param title Title of the option to add.
     * @param closure Function to call when selected.
     */
    addMenu: function addMenu(title, closure) {
      var menu = this.getMenu();
      menu.push({
        name: title,
        click: closure
      });
      this.setMenu(menu);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: Fetcher, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fetcher", function() { return Fetcher; });
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
 * @file
 * Fetcher component displays "Fetching" and a "more" button.
 */

/**
 * Fetcher function used to update this object.
 * @constructor
 */
var Fetcher = function Fetcher() {
  this.more = false; // Indicates there is more to fetch

  this.fetching = false; // Set true while we are fetching

  this.fetched = false; // Set true when we have fetched something...

  this.start = function (single) {
    this.fetching = true;

    if (single !== true) {
      this.more = false;
    }
  };

  this.done = function (single) {
    this.fetching = false;

    if (single !== true) {
      this.fetched = true;
    }
  };

  this.reset = function () {
    this.more = false;
    this.fetching = false;
    this.fetched = false;
  };
};
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    fetcher: {
      type: Object,
      'default': null
    },
    fetching: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    'fetcher.fetching': function fetcherFetching(to, from) {
      this.setFetching();
    },
    fetching: function fetching(to, from) {
      this.setFetching();
    }
  },
  data: function data() {
    return {
      showFetching: false,
      delayedFetching: false,
      timer: null
    };
  },
  mounted: function mounted() {
    this.setFetching();
  },
  methods: {
    fetchMore: function fetchMore() {
      this.$parent.fetchMore();
    },
    setFetching: function setFetching() {
      var _this = this;

      // Are we currently fetching?
      var showFetching = this.fetcher !== null && this.fetcher.fetching || this.fetching;

      if (showFetching && !this.showFetching) {
        // Fetching is becoming active
        this.timer = setTimeout(function () {
          _this.delayedFetching = true;
        }, 1000);
      } else if (!showFetching && this.showFetching) {
        clearTimeout(this.timer);
        this.time = null;
        this.delayedFetching = false;
      }

      this.showFetching = showFetching;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Vue/UserVueBase.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/users/js/Vue/UserVueBase.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var site_cl_js_Vue_PageVueBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! site-cl/js/Vue/PageVueBase.vue */ "./vendor/cl/site/js/Vue/PageVueBase.vue");
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  'extends': site_cl_js_Vue_PageVueBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  computed: {
    user: function user() {
      return this.$store.state.user.user;
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./vendor/cl/review/_review.scss":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js?sourceMap!./vendor/cl/review/_review.scss ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "div.cl-reviewing td.cl-empty {\n  background-color: #e8f7f3;\n}\n\np.cl-reviews-none {\n  text-align: center;\n  color: #00723f;\n  font-style: italic;\n}\n\ndiv.cl-reviews h3 {\n  text-align: center;\n  background: #00723f;\n  color: white;\n}\n\ndiv.cl-review {\n  margin: 1em 0;\n}\n\ndiv.cl-review h3 {\n  font-size: 0.85em;\n  font-style: italic;\n  font-weight: normal;\n  background: transparent;\n  color: #00723f;\n  border-bottom: 1px solid #00723f;\n  text-align: left;\n}\n\ndiv.cl-review h3 span.cl-submitted {\n  float: right;\n  color: #00909e;\n  font-size: 0.9em;\n}\n\ndiv.cl-review h3.staff {\n  color: red;\n}\n\ndiv.cl-review pre {\n  margin: 0;\n}\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./vendor/cl/site/js/UI/_editor.scss":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js?sourceMap!./vendor/cl/site/js/UI/_editor.scss ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "div.cl-editor {\n  position: relative;\n  box-sizing: border-box;\n  width: 100%;\n  min-height: 5em;\n  height: 10em;\n  padding: 0;\n  overflow: hidden;\n  margin: 1em 0;\n}\n\ndiv.cl-editor textarea {\n  position: absolute;\n  box-sizing: border-box;\n  resize: none;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\ndiv.fetching[data-v-43b26bcb] {\n  height: 28px;\n  margin: 1em 0;\n}\ndiv.fetching p[data-v-43b26bcb] {\n  text-align: center;\n  font-style: italic;\n  color: #c41425;\n  padding-top: 2px;\n}\n.more[data-v-43b26bcb] {\n  text-align: center;\n}\n.more button[data-v-43b26bcb] {\n  font-size: 0.8em;\n  height: 28px;\n  margin: 0;\n}\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/course/js/Console/Members/MembersFetcherComponent.vue?vue&type=template&id=3eab44d2&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/course/js/Console/Members/MembersFetcherComponent.vue?vue&type=template&id=3eab44d2& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("label", { ref: "students-only", staticStyle: { display: "none" } }, [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.students,
              expression: "students"
            }
          ],
          attrs: { type: "checkbox" },
          domProps: {
            checked: Array.isArray(_vm.students)
              ? _vm._i(_vm.students, null) > -1
              : _vm.students
          },
          on: {
            change: [
              function($event) {
                var $$a = _vm.students,
                  $$el = $event.target,
                  $$c = $$el.checked ? true : false
                if (Array.isArray($$a)) {
                  var $$v = null,
                    $$i = _vm._i($$a, $$v)
                  if ($$el.checked) {
                    $$i < 0 && (_vm.students = $$a.concat([$$v]))
                  } else {
                    $$i > -1 &&
                      (_vm.students = $$a
                        .slice(0, $$i)
                        .concat($$a.slice($$i + 1)))
                  }
                } else {
                  _vm.students = $$c
                }
              },
              _vm.studentsOnlyChanged
            ]
          }
        }),
        _vm._v(" Students Only")
      ]),
      _vm._v(" "),
      _c(
        "fetcher",
        { attrs: { fetcher: _vm.fetcher, fetching: _vm.fetching } },
        [
          _vm._t("default", null, { users: _vm.users, students: _vm.students }),
          _vm._v(" "),
          _vm.users.length == 0
            ? _c("p", { staticClass: "centerbox comp center" }, [
                _vm._v(
                  "\n        There are currently no members enrolled in this section."
                )
              ])
            : _vm._e()
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc& ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "content" }, [
    _c(
      "div",
      { staticClass: "full cl-reviewing" },
      [
        _c("mask-vue", { attrs: { mask: _vm.mask } }, [
          _vm._v("Communicating with server...")
        ]),
        _vm._v(" "),
        _c("membersfetcher", {
          attrs: { fetching: _vm.reviewing === null },
          scopedSlots: _vm._u([
            {
              key: "default",
              fn: function(fetcher) {
                return [
                  _vm.reviewing !== null && _vm.user.atLeast(_vm.instructor)
                    ? _c("div", [
                        _c(
                          "form",
                          {
                            attrs: { method: "post" },
                            on: {
                              submit: function($event) {
                                $event.preventDefault()
                                return _vm.assignReviews($event)
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
                                })
                              )
                            ])
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.reviewing !== null
                    ? _c(
                        "table",
                        { staticClass: "small" },
                        [
                          _c(
                            "tr",
                            [
                              _c("th", [_vm._v("User")]),
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
                                _c("td", [
                                  _c("a", { attrs: { title: user.name } }, [
                                    _vm._v(_vm._s(user.userId))
                                  ])
                                ]),
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
                                      _c("span", {
                                        domProps: {
                                          innerHTML: _vm._s(
                                            _vm.display(
                                              fetcher.users,
                                              _vm.reviewer[user.member.id],
                                              i - 1
                                            )
                                          )
                                        }
                                      })
                                    ]
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
                                      _c("span", {
                                        domProps: {
                                          innerHTML: _vm._s(
                                            _vm.display(
                                              fetcher.users,
                                              _vm.reviewee[user.member.id],
                                              i - 1
                                            )
                                          )
                                        }
                                      })
                                    ]
                                  )
                                })
                              ],
                              2
                            )
                          })
                        ],
                        2
                      )
                    : _vm._e()
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
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
              return _vm.submit($event)
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
          _c("pre", [_vm._v(_vm._s(review.meta.review.review))])
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
          _c("pre", [_vm._v(_vm._s(review.meta.review.review))])
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262& ***!
  \********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
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
                return _vm.submit($event)
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
                _vm._s(_vm.formatTime(review.time)) + " Review by Me\n    "
              ),
              _c("span", { staticClass: "cl-submitted" }, [
                _vm._v(_vm._s(_vm.showSubmissions(review)))
              ])
            ]),
            _vm._v(" "),
            _c("pre", [_vm._v(_vm._s(review.meta.review.review))])
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
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
          _c("pre", [_vm._v(_vm._s(review.review))])
        ])
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/site/js/Vue/Mask.vue?vue&type=template&id=78d04e00&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/site/js/Vue/Mask.vue?vue&type=template&id=78d04e00& ***!
  \*****************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: _vm.maskClass }, [
    _vm.slotDelay ? _c("p", [_vm._t("default")], 2) : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.delayedFetching
        ? _c("div", { staticClass: "fetching" }, [
            _c("p", [_vm._v("Fetching from server...")])
          ])
        : _vm._e(),
      _vm._v(" "),
      (_vm.fetcher === null || !_vm.fetcher.fetching) && !_vm.fetching
        ? _vm._t("default")
        : _vm._e(),
      _vm._v(" "),
      _vm.fetcher !== null && _vm.fetcher.more
        ? _c("p", { staticClass: "more" }, [
            _c(
              "button",
              {
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.fetchMore($event)
                  }
                }
              },
              [_vm._v("MORE")]
            )
          ])
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("451ec1a4", content, false, {});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&", function() {
     var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&");
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./vendor/cl/console/js/ConsoleComponentBase.vue":
/*!*******************************************************!*\
  !*** ./vendor/cl/console/js/ConsoleComponentBase.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ConsoleComponentBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConsoleComponentBase.vue?vue&type=script&lang=js& */ "./vendor/cl/console/js/ConsoleComponentBase.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _ConsoleComponentBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ "./node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('69e355a8', component.options)
    } else {
      api.reload('69e355a8', component.options)
    }
    
  }
}
component.options.__file = "vendor/cl/console/js/ConsoleComponentBase.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./vendor/cl/console/js/ConsoleComponentBase.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./vendor/cl/console/js/ConsoleComponentBase.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ConsoleComponentBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ConsoleComponentBase.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/console/js/ConsoleComponentBase.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ConsoleComponentBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./vendor/cl/course/js/Console/Members/MembersFetcherComponent.vue":
/*!*************************************************************************!*\
  !*** ./vendor/cl/course/js/Console/Members/MembersFetcherComponent.vue ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MembersFetcherComponent_vue_vue_type_template_id_3eab44d2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MembersFetcherComponent.vue?vue&type=template&id=3eab44d2& */ "./vendor/cl/course/js/Console/Members/MembersFetcherComponent.vue?vue&type=template&id=3eab44d2&");
/* harmony import */ var _MembersFetcherComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MembersFetcherComponent.vue?vue&type=script&lang=js& */ "./vendor/cl/course/js/Console/Members/MembersFetcherComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MembersFetcherComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MembersFetcherComponent_vue_vue_type_template_id_3eab44d2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MembersFetcherComponent_vue_vue_type_template_id_3eab44d2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ "./node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('3eab44d2', component.options)
    } else {
      api.reload('3eab44d2', component.options)
    }
    module.hot.accept(/*! ./MembersFetcherComponent.vue?vue&type=template&id=3eab44d2& */ "./vendor/cl/course/js/Console/Members/MembersFetcherComponent.vue?vue&type=template&id=3eab44d2&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _MembersFetcherComponent_vue_vue_type_template_id_3eab44d2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MembersFetcherComponent.vue?vue&type=template&id=3eab44d2& */ "./vendor/cl/course/js/Console/Members/MembersFetcherComponent.vue?vue&type=template&id=3eab44d2&");
(function () {
      api.rerender('3eab44d2', {
        render: _MembersFetcherComponent_vue_vue_type_template_id_3eab44d2___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _MembersFetcherComponent_vue_vue_type_template_id_3eab44d2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "vendor/cl/course/js/Console/Members/MembersFetcherComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./vendor/cl/course/js/Console/Members/MembersFetcherComponent.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./vendor/cl/course/js/Console/Members/MembersFetcherComponent.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MembersFetcherComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--2!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./MembersFetcherComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/course/js/Console/Members/MembersFetcherComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MembersFetcherComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./vendor/cl/course/js/Console/Members/MembersFetcherComponent.vue?vue&type=template&id=3eab44d2&":
/*!********************************************************************************************************!*\
  !*** ./vendor/cl/course/js/Console/Members/MembersFetcherComponent.vue?vue&type=template&id=3eab44d2& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MembersFetcherComponent_vue_vue_type_template_id_3eab44d2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./MembersFetcherComponent.vue?vue&type=template&id=3eab44d2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/course/js/Console/Members/MembersFetcherComponent.vue?vue&type=template&id=3eab44d2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MembersFetcherComponent_vue_vue_type_template_id_3eab44d2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MembersFetcherComponent_vue_vue_type_template_id_3eab44d2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./vendor/cl/course/js/Console/Members/StudentsOnly.js":
/*!*************************************************************!*\
  !*** ./vendor/cl/course/js/Console/Members/StudentsOnly.js ***!
  \*************************************************************/
/*! exports provided: StudentsOnly */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentsOnly", function() { return StudentsOnly; });
var LOCAL_STORAGE_STUDENTS_ONLY = 'cl_students_only';
/**
 * Item in local storage that maintains the state of
 * "students only" in the console.
 * @constructor
 */

var StudentsOnly = function StudentsOnly() {};

StudentsOnly.get = function () {
  var localStorage = window.localStorage;
  var s = localStorage.getItem(LOCAL_STORAGE_STUDENTS_ONLY);
  return s === 'yes';
};

StudentsOnly.set = function (students) {
  var localStorage = window.localStorage;
  localStorage.setItem(LOCAL_STORAGE_STUDENTS_ONLY, students ? 'yes' : 'no');
};

/***/ }),

/***/ "./vendor/cl/course/js/Members/Member.js":
/*!***********************************************!*\
  !*** ./vendor/cl/course/js/Members/Member.js ***!
  \***********************************************/
/*! exports provided: Member */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Member", function() { return Member; });
/* harmony import */ var _users_js_Users_Membership_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../users/js/Users/Membership.js */ "./vendor/cl/users/js/Users/Membership.js");
/**
 * @file Member of a course
 * Attaches to a user Object
 */


var Member = function Member(json) {
  _users_js_Users_Membership_js__WEBPACK_IMPORTED_MODULE_0__["Membership"].call(this);
  var role = 'G';

  if (json !== undefined) {
    this.id = json.id;
    this.semester = json.semester;
    this.section = json.section;
    role = json.role;
  } else {
    this.id = 0; // System membership ID

    this.semester = null; // Semester code

    this.section = null; // Section Id

    role = null; // Membership role
  }

  this.role = function () {
    return role;
  };

  this.setRole = function (role_) {
    role = role_;
  };
};

Member.prototype = Object.create(_users_js_Users_Membership_js__WEBPACK_IMPORTED_MODULE_0__["Membership"].prototype);
Member.prototype.constructor = Member;
/**
 * Get the course section for a member
 * @param store Vuex store
 * @returns {*}
 */

Member.prototype.getSection = function (store) {
  return store.getters['course/section'](this.semester, this.section);
};
/**
 * Get an assignment for a member
 * @param store Vuex store
 * @param assigntag Assignment tag
 */


Member.prototype.getAssignment = function (store, assigntag) {
  var section = this.getSection(store);
  return section.getAssignment(assigntag);
}; // The possible member roles
// Must match values in Member.php


Member.GUEST = 'G'; ///< Guest user visiting the site

Member.USER = 'U'; ///< Standard user from User, don't use for Member

Member.DROPPED = 'D'; ///< User has dropped the course

Member.STUDENT = 'T'; ///< Enrolled student in course

Member.STAFF = 'S'; ///< Any course staff

Member.GRADER = 'R'; ///< Graders

Member.TA = 'E'; ///< Teaching assistant

Member.INSTRUCTOR = 'I'; ///< Course instructor

Member.ADMIN = 'A'; ///< Admin

Member.prototype.getRoles = function () {
  var roles = {};
  roles[Member.GUEST] = {
    name: 'Guest',
    priority: 1
  };
  roles[Member.DROPPED] = {
    name: 'Dropped',
    priority: 2
  };
  roles[Member.USER] = {
    name: 'User',
    priority: 3,
    skip: true
  };
  roles[Member.STUDENT] = {
    name: 'Student',
    priority: 4
  };
  roles[Member.STAFF] = {
    name: 'Staff',
    priority: 5,
    skip: true
  };
  roles[Member.GRADER] = {
    name: 'Grader',
    priority: 6
  };
  roles[Member.TA] = {
    name: 'Teaching Assistant',
    priority: 7
  };
  roles[Member.INSTRUCTOR] = {
    name: 'Instructor',
    priority: 8
  };
  roles[Member.ADMIN] = {
    name: 'Admin',
    priority: 100
  };
  return roles;
};



/***/ }),

/***/ "./vendor/cl/review/_review.scss":
/*!***************************************!*\
  !*** ./vendor/cl/review/_review.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/resolve-url-loader!../../../node_modules/sass-loader/lib/loader.js?sourceMap!./_review.scss */ "./node_modules/css-loader/index.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./vendor/cl/review/_review.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("0918f7c4", content, false, {});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/resolve-url-loader!../../../node_modules/sass-loader/lib/loader.js?sourceMap!./_review.scss */ "./node_modules/css-loader/index.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./vendor/cl/review/_review.scss", function() {
     var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/resolve-url-loader!../../../node_modules/sass-loader/lib/loader.js?sourceMap!./_review.scss */ "./node_modules/css-loader/index.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./vendor/cl/review/_review.scss");
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./vendor/cl/review/index.js":
/*!***********************************!*\
  !*** ./vendor/cl/review/index.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _review_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_review.scss */ "./vendor/cl/review/_review.scss");
/* harmony import */ var _review_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_review_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_Console_ReviewConsole__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/Console/ReviewConsole */ "./vendor/cl/review/js/Console/ReviewConsole.js");
/* harmony import */ var _js_ReviewVue_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/ReviewVue.vue */ "./vendor/cl/review/js/ReviewVue.vue");
/* harmony import */ var site_cl_js_Vue_PageVue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! site-cl/js/Vue/PageVue */ "./vendor/cl/site/js/Vue/PageVue.js");
/* harmony import */ var site_cl_js_Vue_InlineVue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! site-cl/js/Vue/InlineVue */ "./vendor/cl/site/js/Vue/InlineVue.js");
/* harmony import */ var _js_ReviewsVue_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/ReviewsVue.vue */ "./vendor/cl/review/js/ReviewsVue.vue");
/**
 * @file
 * The main Review system entry point
 */
//
// Install the console components
//







if (Site.Console !== undefined) {
  _js_Console_ReviewConsole__WEBPACK_IMPORTED_MODULE_1__["ReviewConsole"].setup(Site.Console);
}

Site.Site.ready(function () {
  site_cl_js_Vue_PageVue__WEBPACK_IMPORTED_MODULE_3__["PageVue"].create('div.cl-review', 'Review Vue', _js_ReviewVue_vue__WEBPACK_IMPORTED_MODULE_2__["default"]);
  site_cl_js_Vue_InlineVue__WEBPACK_IMPORTED_MODULE_4__["InlineVue"].create('div.cl-reviews', _js_ReviewsVue_vue__WEBPACK_IMPORTED_MODULE_5__["default"]);
});

/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewConsole.js":
/*!******************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewConsole.js ***!
  \******************************************************/
/*! exports provided: ReviewConsole */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReviewConsole", function() { return ReviewConsole; });
/* harmony import */ var _ReviewReviewers_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewReviewers.vue */ "./vendor/cl/review/js/Console/ReviewReviewers.vue");
/* harmony import */ var _ReviewsByForMember_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReviewsByForMember.vue */ "./vendor/cl/review/js/Console/ReviewsByForMember.vue");
/**
 * @file
 * Review system console components
 */


var ReviewConsole = function ReviewConsole() {};

ReviewConsole.setup = function (Console) {
  Console.Review = {
    'reviewsbyfor': _ReviewsByForMember_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  };
  Console.tables.add({
    title: 'Review',
    order: 16,
    api: '/api/review/tables'
  });
  Console.components.addRoute({
    route: '/review/reviewers/:assigntag',
    component: _ReviewReviewers_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    props: true
  }); // Console.components.addRoute(
  //     {route: '/quiz/result/:memberid/:assigntag/:quiztag', component: QuizResultComponent, props: true}
  // );

  Console.course.assignmentLink('review', 'reviewers', '/review/reviewers/:assigntag');
};

/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewReviewers.vue":
/*!*********************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewReviewers.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReviewReviewers_vue_vue_type_template_id_bec5dfdc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewReviewers.vue?vue&type=template&id=bec5dfdc& */ "./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc&");
/* harmony import */ var _ReviewReviewers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReviewReviewers.vue?vue&type=script&lang=js& */ "./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ReviewReviewers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ReviewReviewers_vue_vue_type_template_id_bec5dfdc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ReviewReviewers_vue_vue_type_template_id_bec5dfdc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ "./node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('bec5dfdc', component.options)
    } else {
      api.reload('bec5dfdc', component.options)
    }
    module.hot.accept(/*! ./ReviewReviewers.vue?vue&type=template&id=bec5dfdc& */ "./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _ReviewReviewers_vue_vue_type_template_id_bec5dfdc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewReviewers.vue?vue&type=template&id=bec5dfdc& */ "./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc&");
(function () {
      api.rerender('bec5dfdc', {
        render: _ReviewReviewers_vue_vue_type_template_id_bec5dfdc___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _ReviewReviewers_vue_vue_type_template_id_bec5dfdc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "vendor/cl/review/js/Console/ReviewReviewers.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewReviewers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ReviewReviewers.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewReviewers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc&":
/*!****************************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewReviewers_vue_vue_type_template_id_bec5dfdc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ReviewReviewers.vue?vue&type=template&id=bec5dfdc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/review/js/Console/ReviewReviewers.vue?vue&type=template&id=bec5dfdc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewReviewers_vue_vue_type_template_id_bec5dfdc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewReviewers_vue_vue_type_template_id_bec5dfdc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewsByForMember.vue":
/*!************************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewsByForMember.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReviewsByForMember_vue_vue_type_template_id_7b36fe76___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewsByForMember.vue?vue&type=template&id=7b36fe76& */ "./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76&");
/* harmony import */ var _ReviewsByForMember_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReviewsByForMember.vue?vue&type=script&lang=js& */ "./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ReviewsByForMember_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ReviewsByForMember_vue_vue_type_template_id_7b36fe76___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ReviewsByForMember_vue_vue_type_template_id_7b36fe76___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ "./node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('7b36fe76', component.options)
    } else {
      api.reload('7b36fe76', component.options)
    }
    module.hot.accept(/*! ./ReviewsByForMember.vue?vue&type=template&id=7b36fe76& */ "./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _ReviewsByForMember_vue_vue_type_template_id_7b36fe76___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewsByForMember.vue?vue&type=template&id=7b36fe76& */ "./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76&");
(function () {
      api.rerender('7b36fe76', {
        render: _ReviewsByForMember_vue_vue_type_template_id_7b36fe76___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _ReviewsByForMember_vue_vue_type_template_id_7b36fe76___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "vendor/cl/review/js/Console/ReviewsByForMember.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsByForMember_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ReviewsByForMember.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsByForMember_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76&":
/*!*******************************************************************************************!*\
  !*** ./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsByForMember_vue_vue_type_template_id_7b36fe76___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ReviewsByForMember.vue?vue&type=template&id=7b36fe76& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/review/js/Console/ReviewsByForMember.vue?vue&type=template&id=7b36fe76&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsByForMember_vue_vue_type_template_id_7b36fe76___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsByForMember_vue_vue_type_template_id_7b36fe76___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./vendor/cl/review/js/ReviewVue.vue":
/*!*******************************************!*\
  !*** ./vendor/cl/review/js/ReviewVue.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReviewVue_vue_vue_type_template_id_4eeb3262___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewVue.vue?vue&type=template&id=4eeb3262& */ "./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262&");
/* harmony import */ var _ReviewVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReviewVue.vue?vue&type=script&lang=js& */ "./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ReviewVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ReviewVue_vue_vue_type_template_id_4eeb3262___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ReviewVue_vue_vue_type_template_id_4eeb3262___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ "./node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('4eeb3262', component.options)
    } else {
      api.reload('4eeb3262', component.options)
    }
    module.hot.accept(/*! ./ReviewVue.vue?vue&type=template&id=4eeb3262& */ "./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _ReviewVue_vue_vue_type_template_id_4eeb3262___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewVue.vue?vue&type=template&id=4eeb3262& */ "./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262&");
(function () {
      api.rerender('4eeb3262', {
        render: _ReviewVue_vue_vue_type_template_id_4eeb3262___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _ReviewVue_vue_vue_type_template_id_4eeb3262___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "vendor/cl/review/js/ReviewVue.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ReviewVue.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/review/js/ReviewVue.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262&":
/*!**************************************************************************!*\
  !*** ./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewVue_vue_vue_type_template_id_4eeb3262___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ReviewVue.vue?vue&type=template&id=4eeb3262& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/review/js/ReviewVue.vue?vue&type=template&id=4eeb3262&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewVue_vue_vue_type_template_id_4eeb3262___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewVue_vue_vue_type_template_id_4eeb3262___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./vendor/cl/review/js/ReviewsVue.vue":
/*!********************************************!*\
  !*** ./vendor/cl/review/js/ReviewsVue.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReviewsVue_vue_vue_type_template_id_094fe447___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewsVue.vue?vue&type=template&id=094fe447& */ "./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447&");
/* harmony import */ var _ReviewsVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReviewsVue.vue?vue&type=script&lang=js& */ "./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ReviewsVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ReviewsVue_vue_vue_type_template_id_094fe447___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ReviewsVue_vue_vue_type_template_id_094fe447___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ "./node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('094fe447', component.options)
    } else {
      api.reload('094fe447', component.options)
    }
    module.hot.accept(/*! ./ReviewsVue.vue?vue&type=template&id=094fe447& */ "./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _ReviewsVue_vue_vue_type_template_id_094fe447___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewsVue.vue?vue&type=template&id=094fe447& */ "./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447&");
(function () {
      api.rerender('094fe447', {
        render: _ReviewsVue_vue_vue_type_template_id_094fe447___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _ReviewsVue_vue_vue_type_template_id_094fe447___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "vendor/cl/review/js/ReviewsVue.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ReviewsVue.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/review/js/ReviewsVue.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447&":
/*!***************************************************************************!*\
  !*** ./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsVue_vue_vue_type_template_id_094fe447___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ReviewsVue.vue?vue&type=template&id=094fe447& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/review/js/ReviewsVue.vue?vue&type=template&id=094fe447&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsVue_vue_vue_type_template_id_094fe447___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReviewsVue_vue_vue_type_template_id_094fe447___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./vendor/cl/site/js/TimeFormatter.js":
/*!********************************************!*\
  !*** ./vendor/cl/site/js/TimeFormatter.js ***!
  \********************************************/
/*! exports provided: TimeFormatter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeFormatter", function() { return TimeFormatter; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/*
 * Utility functions to format times.
 */

/**
 * Utility functions to format times.
 * @constructor
 */

var TimeFormatter = function TimeFormatter() {};
/**
 * Convert a time to the format we display
 * Time is relative to a specified time (or current time)
 * @param {moment} time Time to convert (moment)
 * @param {moment} currentTime Current time (moment)
 * @param {string} format Moment format
 * @returns {string}
 */

TimeFormatter.relative = function (time, currentTime, format) {
  if (currentTime === undefined || currentTime === null) {
    currentTime = moment__WEBPACK_IMPORTED_MODULE_0___default.a.now();
  }

  var elapsed = currentTime.diff(time);

  if (elapsed < 60000) {
    return '<1 min ago';
  }

  if (elapsed < 3600000) {
    // Within an hour ago
    var mins = Math.floor(elapsed / 60000);
    return '' + mins + ' min ago';
  }
  /*
   * Determine if it was today
   */


  if (time.date() === currentTime.date() && time.month() === currentTime.month() && time.year() === currentTime.year()) {
    var hour = time.hour();
    var am = 'am';

    if (hour === 0) {
      hour = 12;
    } else if (hour === 12) {
      am = 'pm';
    } else if (hour > 12) {
      am = 'pm';
      hour -= 12;
    }

    var minute = time.minute();

    if (minute < 10) {
      minute = '0' + minute;
    }

    return "Today at " + hour + ':' + minute + am;
  }

  if (format === undefined) {
    format = 'M-DD-YYYY h:mm:ssa';
  }

  return time.format(format);
};
/**
 * Display a Unix time as an absolute time.
 * @param {int} time Unix time (seconds)
 * @param {string} format Moment format or 'long' or 'short' for days inclusion.
 */


TimeFormatter.absoluteUNIX = function (time, format) {
  var t = moment__WEBPACK_IMPORTED_MODULE_0___default.a.unix(time);

  if (format === undefined) {
    format = 'M-DD-YYYY h:mm:ssa';
  } else if (format === 'short') {
    format = 'ddd, M-DD-YYYY h:mm:ssa';
  } else if (format === 'long') {
    format = 'dddd, M-DD-YYYY h:mm:ssa';
  } else if (format === 'long-date') {
    format = 'dddd, M-DD-YYYY';
  } else if (format === 'short-time') {
    format = 'h:mma';
  }

  return t.format(format);
};
/**
 * Display a Unix time as a relative time.
 * @param {int} time Unix time (seconds)
 * @param {int} currentTime Current time as UNIX time (optional)
 * @param {string} format Moment format or 'long' or 'short' for days inclusion.
 */


TimeFormatter.relativeUNIX = function (time, currentTime, format) {
  var t = moment__WEBPACK_IMPORTED_MODULE_0___default.a.unix(time);
  var c = currentTime !== null ? moment__WEBPACK_IMPORTED_MODULE_0___default.a.unix(currentTime) : moment__WEBPACK_IMPORTED_MODULE_0___default()();
  return this.relative(t, c, format);
};

/***/ }),

/***/ "./vendor/cl/site/js/UI/Editor.js":
/*!****************************************!*\
  !*** ./vendor/cl/site/js/UI/Editor.js ***!
  \****************************************/
/*! exports provided: Editor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Editor", function() { return Editor; });
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_editor.scss */ "./vendor/cl/site/js/UI/_editor.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_editor_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var resizer_cl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! resizer-cl */ "./packages/resizer-cl/src/app.modules.js");
/* harmony import */ var _EditorOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditorOptions */ "./vendor/cl/site/js/UI/EditorOptions.js");
/*
 * Javascript support for the Editor
 */



/**
 * Javascript object in support of textarea-based editor
 *
 * If editor has the code style, line numbers are displayed.
 * Set member .tab to support smart tabs
 * Set member .autoIndent to support automatic indentation
 * @param {HTMLElement} element The element for the textarea we are turning into an editor
 * @param {Object} options Options to pass to the editor
 * @constructor
 */

var Editor = function Editor(element, options) {
  if (options !== undefined) {
    options = new _EditorOptions__WEBPACK_IMPORTED_MODULE_2__["EditorOptions"](options);
  } else {
    options = new _EditorOptions__WEBPACK_IMPORTED_MODULE_2__["EditorOptions"](JSON.parse(element.textContent));
  }

  element.classList.add('cl-editor');
  element.style.display = 'block';
  var resizer = new resizer_cl__WEBPACK_IMPORTED_MODULE_1__["default"](element, {
    resize: options.resize,
    handle: options.handle,
    grabSize: options.grabSize
  });
  var ta = document.createElement('textarea');
  this.textarea = ta;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = options.classes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var cls = _step.value;
      ta.classList.add(cls);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  element.innerHTML = '';
  element.appendChild(ta);
  ta.value = options.value;

  if (options.name !== null) {
    ta.name = options.name;
  }

  if (options.code) {
    ta.classList.add('code');
  }

  if (options.height !== null) {
    element.style.height = options.height;
  }

  if (options.minHeight !== null) {
    element.style.minHeight = options.minHeight;
  }

  ta.spellcheck = options.spellcheck; // IE11 and some older browsers do not support
  // the insertText command. This determines if it
  // is available. This may be revised it the attempt to
  // use them fails.

  var insertTextSupported = document.queryCommandSupported("insertText");
  var deleteSupported = document.queryCommandSupported("delete"); // Set true after we auto-indent

  var justIndented = false;

  if (options.tab || options.autoIndent) {
    ta.addEventListener('keydown', function (event) {
      if (options.tab && event.which === 9) {
        // Tab character
        event.preventDefault();

        if (!event.shiftKey) {
          tabAtCaret();
          justIndented = true;
        } else {
          unTab();
          justIndented = false;
        }

        return false;
      }

      if (options.autoIndent) {
        if (event.which == 13) {
          // Return character
          event.preventDefault();
          justIndented = returnWithIndent();
          return false;
        } else if (justIndented && event.which == 8) {
          // Backspace after we just indented!
          if (unDent()) {
            event.preventDefault();
            return false;
          }
        } else {
          justIndented = false;
        }
      }

      return true;
    });
  }
  /*
   * This is the magic that syncs the background with the
   * line numbers in it.
   */


  ta.addEventListener('scroll', function (event) {
    var top = ta.scrollTop;
    var left = ta.scrollLeft;
    ta.style.backgroundPosition = -left + 'px ' + -top + 'px';
  });
  /*
   * Insert a tab at the current edit location in the textarea
   */

  function tabAtCaret() {
    var dSel = ta;

    if (dSel.selectionStart || dSel.selectionStart == '0') {
      //For browsers like Firefox and Webkit based
      var startPos = dSel.selectionStart;
      var endPos = dSel.selectionEnd;

      if (startPos == endPos) {
        // Tabbing at the current location
        var before = dSel.value.substring(0, startPos);
        var split = before.split("\n");
        var lastLine = split[split.length - 1];
        var lastLen = lastLine.length;
        var toAdd = options.tabSize - lastLen % options.tabSize;
        var spaces = '';

        for (var i = 0; i < toAdd; i++) {
          spaces += ' ';
        }

        insertText(dSel, spaces);
        dSel.selectionStart = startPos + toAdd;
        dSel.selectionEnd = startPos + toAdd;
      } else {
        // Tabbing a selection
        var val = dSel.value;
        var split = val.split("\n");
        var linePos = 0; // Find the line the selection starts on

        for (var line = 0; line < split.length; line++) {
          var nextLinePos = linePos + split[line].length + 1;

          if (startPos >= linePos && startPos < nextLinePos) {
            break;
          }

          linePos = nextLinePos;
        }

        spaces = '';

        for (var i = 0; i < options.tabSize; i++) {
          spaces += ' ';
        }

        var insertions = 0; // Indent until we are done

        for (; line < split.length; line++) {
          dSel.selectionStart = linePos + insertions;
          dSel.selectionEnd = linePos + insertions;
          insertText(dSel, spaces);
          insertions += options.tabSize;
          nextLinePos = linePos + split[line].length + 1;

          if (endPos <= nextLinePos) {
            // We are done
            break;
          }

          linePos = nextLinePos;
        }

        dSel.selectionStart = startPos + options.tabSize;
        dSel.selectionEnd = endPos + insertions;
      }
    } else {
      dSel.value += " ";
      dSel.focus();
    }
  }
  /*
   * Handle the Shift-TAB combination (untabbing)
   */


  function unTab() {
    // Selection DOM object
    var dSel = ta;
    var startPos = dSel.selectionStart;
    var endPos = dSel.selectionEnd; // Untabbing a selection

    var val = dSel.value;
    var split = val.split("\n");
    var linePos = 0; // Find the line the selection starts on

    for (var line = 0; line < split.length; line++) {
      var nextLinePos = linePos + split[line].length + 1;

      if (startPos >= linePos && startPos < nextLinePos) {
        break;
      }

      linePos = nextLinePos;
    }

    var deletions = 0;
    var firstLine = true; // Undent until we are done

    for (; line < split.length; line++) {
      for (var spaces = 0; spaces < options.tabSize && spaces < split[line].length; spaces++) {
        if (split[line][spaces] != ' ') {
          break;
        }
      }

      if (spaces > 0) {
        dSel.selectionStart = linePos - deletions;
        dSel.selectionEnd = linePos - deletions + spaces;
        deleteText(dSel);
        deletions += spaces;
      }

      if (firstLine) {
        startPos -= spaces;

        if (startPos < linePos) {
          startPos = linePos;
        }

        firstLine = false;
      }

      nextLinePos = linePos + split[line].length + 1;

      if (endPos <= nextLinePos) {
        // We are done
        break;
      }

      linePos = nextLinePos;
    }

    dSel.selectionStart = startPos;
    dSel.selectionEnd = endPos - deletions;
  }
  /*
   * Insert a return character and enough spaces to indent
   * the text so as to match the previous line.
   */


  function returnWithIndent() {
    // Selection DOM object
    var dSel = ta; // How many spaces will be put before the first non-space?

    var space = 0;

    if (dSel.selectionStart || dSel.selectionStart == '0') {
      var startPos = dSel.selectionStart;
      var endPos = dSel.selectionEnd;
      var scrollTop = dSel.scrollTop;
      var before = dSel.value.substring(0, startPos);
      var after = dSel.value.substring(endPos, dSel.value.length);
      var split = before.split("\n"); // What is the last line before the caret?

      var last = split[split.length - 1];

      for (var i = 0; i < last.length; i++) {
        if (last.charAt(i) != ' ') {
          break;
        }

        space++;
      } // Create the return


      var myValue = "\n";

      for (i = 0; i < space; i++) {
        myValue += ' ';
      }

      insertText(dSel, myValue);
      dSel.selectionStart = startPos + myValue.length;
      dSel.selectionEnd = startPos + myValue.length;
    } else {
      dSel.value += "\n";
      dSel.focus();
    }

    return space > 0;
  }
  /*
   * Remove the last tabSize spaces at the current location
   * @return true if was un-dented
   */


  function unDent() {
    // Selection DOM object
    var dSel = ta;

    if (dSel.selectionStart || dSel.selectionStart == '0') {
      var startPos = dSel.selectionStart;
      var endPos = dSel.selectionEnd;
      var scrollTop = dSel.scrollTop;
      var before = dSel.value.substring(0, startPos);
      var spaceStr = '';

      for (var i = 0; i < options.tabSize; i++) {
        spaceStr += ' ';
      }

      if (before.length >= options.tabSize && before.substr(before.length - options.tabSize, options.tabSize) === spaceStr) {
        dSel.selectionStart = before.length - options.tabSize;
        dSel.selectionEnd = before.length - 1;
        deleteText(dSel);
        dSel.selectionStart = before.length - options.tabSize;
        dSel.selectionEnd = dSel.selectionStart;
        return true;
      }
    }

    return false;
  }
  /*
   * Insert text in a textarea at the current selection.
   *
   * This is provided to allow for fallback to a non-undoable version
   * for Internet explorer and Firefox.
   * @param textarea Textarea we are modifying
   * @param text Text to insert
   */


  function insertText(textarea, text) {
    if (insertTextSupported) {
      if (!document.execCommand("insertText", false, text)) {
        insertTextSupported = false;
        insertText(textarea, text);
      }
    } else {
      // Backup version for Internet Explorer 11
      var pos = textarea.selectionStart;
      var scrollTop = textarea.scrollTop;
      var value = textarea.value;
      textarea.value = value.substring(0, pos) + text + value.substring(pos);
      textarea.focus();
      textarea.scrollTop = scrollTop;
    }
  }
  /*
   * Delete text in a textarea at the current selection.
   *
   * This is provided to allow for fallback to a non-undoable version
   * for Internet explorer and Firefox.
   * @param textarea
   */


  function deleteText(textarea) {
    if (deleteSupported) {
      if (!document.execCommand("delete")) {
        deleteSupported = false;
        deleteText(textarea);
      }
    } else {
      // Backup version for Internet Explorer 11
      // and Firefox
      var startPos = textarea.selectionStart;
      var endPos = textarea.selectionEnd;
      var scrollTop = textarea.scrollTop;
      var value = textarea.value;
      textarea.value = value.substring(0, startPos) + value.substring(endPos);
      textarea.focus();
      textarea.scrollTop = scrollTop;
    }
  }
};

/***/ }),

/***/ "./vendor/cl/site/js/UI/EditorOptions.js":
/*!***********************************************!*\
  !*** ./vendor/cl/site/js/UI/EditorOptions.js ***!
  \***********************************************/
/*! exports provided: EditorOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorOptions", function() { return EditorOptions; });
/*
 * Various interface options we can select
 */

/**
 * Editor interface options.
 *
 * This is used by Editor to provide default values for the editor options.
 *
 * @param options User provided options that override the default values.
 * @constructor
 */
var EditorOptions = function EditorOptions(options) {
  options = options ? options : {}; /// Options: vertical, horizontal, both

  this.resize = 'vertical'; /// The resizing handle

  this.handle = 'bar'; /// Range for grabbing

  this.grabSize = 10; /// Is this for source code?

  this.code = false; /// Initial textarea value

  this.value = ''; /// Height value to use

  this.height = null; /// Name for the control

  this.name = null; /// Use handle the tab key?

  this.tab = false; /// Automatically indent code?

  this.autoIndent = false; /// Minimum height to set

  this.minHeight = null; /// Spellcheck the textarea?

  this.spellcheck = false; /// Size of a tab stop in characters.

  this.tabSize = 4; /// Classes to add to the textarea

  this.classes = [];

  for (var property in options) {
    if (options.hasOwnProperty(property)) {
      if (!this.hasOwnProperty(property)) {
        throw new Error("Invalid option " + property);
      }

      this[property] = options[property];
    }
  }
};

/***/ }),

/***/ "./vendor/cl/site/js/UI/_editor.scss":
/*!*******************************************!*\
  !*** ./vendor/cl/site/js/UI/_editor.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!./_editor.scss */ "./node_modules/css-loader/index.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./vendor/cl/site/js/UI/_editor.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("33597a9a", content, false, {});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!./_editor.scss */ "./node_modules/css-loader/index.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./vendor/cl/site/js/UI/_editor.scss", function() {
     var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!./_editor.scss */ "./node_modules/css-loader/index.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./vendor/cl/site/js/UI/_editor.scss");
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./vendor/cl/site/js/Vue/InlineVue.js":
/*!********************************************!*\
  !*** ./vendor/cl/site/js/Vue/InlineVue.js ***!
  \********************************************/
/*! exports provided: InlineVue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InlineVue", function() { return InlineVue; });
/**
 * Basic Vue-based site inline content starter
 * @constructor InlineVue
 */
var InlineVue = function InlineVue() {};
/*
 *
 * How to use:

 * site.ready(() => {
 *    InlineVue.create('div.cl-reviews', ReviewsVue);
 * });
 *
 */

/**
 * Create an inline VUE component, replacing the provided
 * selector. The selector is assumed to contain JSON data that is
 * then provided to the component in the json property.
 *
 * @param sel Selector for a div to replace with the view.
 * @param component Component to display (Vue)
 */

InlineVue.create = function (sel, component) {
  var element = document.querySelector(sel);

  if (element === null) {
    return;
  }

  var template = "<div>\n<page-vue :json=\"json\"></page-vue>\n</div>";
  var json = JSON.parse(element.textContent);
  var store = Site.store;
  var components = {
    'page-vue': component
  };
  new Site.Vue({
    el: element,
    store: store,
    data: {
      json: json
    },
    template: template,
    components: components,
    methods: {}
  });
};

/***/ }),

/***/ "./vendor/cl/site/js/Vue/Mask.vue":
/*!****************************************!*\
  !*** ./vendor/cl/site/js/Vue/Mask.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Mask_vue_vue_type_template_id_78d04e00___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Mask.vue?vue&type=template&id=78d04e00& */ "./vendor/cl/site/js/Vue/Mask.vue?vue&type=template&id=78d04e00&");
/* harmony import */ var _Mask_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Mask.vue?vue&type=script&lang=js& */ "./vendor/cl/site/js/Vue/Mask.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Mask_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Mask_vue_vue_type_template_id_78d04e00___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Mask_vue_vue_type_template_id_78d04e00___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ "./node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('78d04e00', component.options)
    } else {
      api.reload('78d04e00', component.options)
    }
    module.hot.accept(/*! ./Mask.vue?vue&type=template&id=78d04e00& */ "./vendor/cl/site/js/Vue/Mask.vue?vue&type=template&id=78d04e00&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Mask_vue_vue_type_template_id_78d04e00___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Mask.vue?vue&type=template&id=78d04e00& */ "./vendor/cl/site/js/Vue/Mask.vue?vue&type=template&id=78d04e00&");
(function () {
      api.rerender('78d04e00', {
        render: _Mask_vue_vue_type_template_id_78d04e00___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _Mask_vue_vue_type_template_id_78d04e00___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "vendor/cl/site/js/Vue/Mask.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./vendor/cl/site/js/Vue/Mask.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./vendor/cl/site/js/Vue/Mask.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Mask_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Mask.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/site/js/Vue/Mask.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Mask_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./vendor/cl/site/js/Vue/Mask.vue?vue&type=template&id=78d04e00&":
/*!***********************************************************************!*\
  !*** ./vendor/cl/site/js/Vue/Mask.vue?vue&type=template&id=78d04e00& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Mask_vue_vue_type_template_id_78d04e00___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Mask.vue?vue&type=template&id=78d04e00& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/site/js/Vue/Mask.vue?vue&type=template&id=78d04e00&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Mask_vue_vue_type_template_id_78d04e00___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Mask_vue_vue_type_template_id_78d04e00___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./vendor/cl/site/js/Vue/PageVue.js":
/*!******************************************!*\
  !*** ./vendor/cl/site/js/Vue/PageVue.js ***!
  \******************************************/
/*! exports provided: PageVue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageVue", function() { return PageVue; });
/**
 * Basic Vue-based site page starter
 *
 * How to use:
 * @code
 * site.ready(() => {
 *    PageVue.create('div.cl-grade-assignment', 'Assignment Grade', GradeAssignmentVue);
 *    PageVue.create('div.cl-grades', 'Grades', GradesVue);
 * });
 * @endcode
 *
 * @constructor PageVue
 */
var PageVue = function PageVue() {};
/**
 * Create a page in a given component, replacing the provided
 * selector. The selector is assumed to contain JSON data that is
 * then provided to the component in the json property.
 *
 * @param sel Selector for a div to replace with the view.
 * @param title Initial title to apply to the page
 * @param component Component to display (Vue)
 * @param nav Optional navigation component, like PageNav
 */

PageVue.create = function (sel, title, component, nav) {
  var element = document.querySelector(sel);

  if (element === null) {
    return;
  }

  var navtag = nav !== undefined ? '<page-nav :menu="menu"></page-nav>' : '';
  var template = "<div><site-header :title=\"title\">".concat(navtag, "</site-header>\n<page-vue :json=\"json\"></page-vue><site-footer></site-footer>\n</div>");
  var Header = Site.info.header.component();
  var Footer = Site.info.footer.component();
  var json = JSON.parse(element.textContent);
  var store = Site.store;
  var components = {
    'site-header': Header,
    'site-footer': Footer,
    'page-vue': component
  };

  if (nav !== undefined) {
    components['page-nav'] = nav;
  }

  var site = Site.Site;
  new Site.Vue({
    el: element,
    site: site,
    store: store,
    data: {
      title: title,
      json: json,
      menu: []
    },
    template: template,
    components: components,
    methods: {
      /**
       * Set the site title. This can be used from
       * the child Vue's using this.$parent.setTitle('')
       * @memberof PageVue
       * @instance
       * @param {string} title Title to set
       */
      setTitle: function setTitle(title) {
        this.title = title;
        document.title = Site.info.siteName + ' ' + title;
      },
      setMenu: function setMenu(menu) {
        this.menu = menu;
      },
      getMenu: function getMenu() {
        return this.menu;
      }
    }
  });
};

/***/ }),

/***/ "./vendor/cl/site/js/Vue/PageVueBase.vue":
/*!***********************************************!*\
  !*** ./vendor/cl/site/js/Vue/PageVueBase.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PageVueBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PageVueBase.vue?vue&type=script&lang=js& */ "./vendor/cl/site/js/Vue/PageVueBase.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _PageVueBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ "./node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('12bbaef8', component.options)
    } else {
      api.reload('12bbaef8', component.options)
    }
    
  }
}
component.options.__file = "vendor/cl/site/js/Vue/PageVueBase.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./vendor/cl/site/js/Vue/PageVueBase.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./vendor/cl/site/js/Vue/PageVueBase.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PageVueBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PageVueBase.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/site/js/Vue/PageVueBase.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PageVueBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./vendor/cl/users/js/Lib/FetcherVue.vue":
/*!***********************************************!*\
  !*** ./vendor/cl/users/js/Lib/FetcherVue.vue ***!
  \***********************************************/
/*! exports provided: default, Fetcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true& */ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true&");
/* harmony import */ var _FetcherVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FetcherVue.vue?vue&type=script&lang=js& */ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=script&lang=js&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fetcher", function() { return _FetcherVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["Fetcher"]; });

/* harmony import */ var _FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& */ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _FetcherVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "43b26bcb",
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ "./node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('43b26bcb', component.options)
    } else {
      api.reload('43b26bcb', component.options)
    }
    module.hot.accept(/*! ./FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true& */ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true& */ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true&");
(function () {
      api.rerender('43b26bcb', {
        render: _FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "vendor/cl/users/js/Lib/FetcherVue.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default, Fetcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FetcherVue.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=script&lang=js&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fetcher", function() { return _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["Fetcher"]; });

 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true&":
/*!******************************************************************************************!*\
  !*** ./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./vendor/cl/users/js/Users/Membership.js":
/*!************************************************!*\
  !*** ./vendor/cl/users/js/Users/Membership.js ***!
  \************************************************/
/*! exports provided: Membership */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Membership", function() { return Membership; });
/**
 * @file
 * A membership associated with a user.
 *
 * This is a base object that will be inherited by
 * actual membership objects.
 */
var Membership = function Membership() {
  /// The User object for this membership
  this.user = null;
};



/***/ }),

/***/ "./vendor/cl/users/js/Vue/UserVueBase.vue":
/*!************************************************!*\
  !*** ./vendor/cl/users/js/Vue/UserVueBase.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserVueBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserVueBase.vue?vue&type=script&lang=js& */ "./vendor/cl/users/js/Vue/UserVueBase.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _UserVueBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ "./node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('c7e4e49e', component.options)
    } else {
      api.reload('c7e4e49e', component.options)
    }
    
  }
}
component.options.__file = "vendor/cl/users/js/Vue/UserVueBase.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./vendor/cl/users/js/Vue/UserVueBase.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./vendor/cl/users/js/Vue/UserVueBase.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserVueBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserVueBase.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Vue/UserVueBase.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserVueBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ })

},[["./vendor/cl/review/index.js","runtime","vendor"]]]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1tuYW1lXS92ZW5kb3IvY2wvY29uc29sZS9qcy9Db25zb2xlQ29tcG9uZW50QmFzZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdL3ZlbmRvci9jbC9jb3Vyc2UvanMvQ29uc29sZS9NZW1iZXJzL01lbWJlcnNGZXRjaGVyQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly9bbmFtZV0vdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1Jldmlld1Jldmlld2Vycy52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdzQnlGb3JNZW1iZXIudnVlIiwid2VicGFjazovL1tuYW1lXS92ZW5kb3IvY2wvcmV2aWV3L2pzL1Jldmlld1Z1ZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3c1Z1ZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdL3ZlbmRvci9jbC9zaXRlL2pzL1Z1ZS9NYXNrLnZ1ZSIsIndlYnBhY2s6Ly9bbmFtZV0vdmVuZG9yL2NsL3NpdGUvanMvVnVlL1BhZ2VWdWVCYXNlLnZ1ZSIsIndlYnBhY2s6Ly9bbmFtZV0vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9GZXRjaGVyVnVlLnZ1ZSIsIndlYnBhY2s6Ly9bbmFtZV0vdmVuZG9yL2NsL3VzZXJzL2pzL1Z1ZS9Vc2VyVnVlQmFzZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3Jldmlldy9fcmV2aWV3LnNjc3MiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3NpdGUvanMvVUkvX2VkaXRvci5zY3NzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWU/OGU4MCIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL2NvdXJzZS9qcy9Db25zb2xlL01lbWJlcnMvTWVtYmVyc0ZldGNoZXJDb21wb25lbnQudnVlP2E3NzciLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1Jldmlld1Jldmlld2Vycy52dWU/YWYxMiIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZT9hZWUyIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3VnVlLnZ1ZT81MDU4Iiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3c1Z1ZS52dWU/NDNkZiIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvc2l0ZS9qcy9WdWUvTWFzay52dWU/OWM0NSIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTGliL0ZldGNoZXJWdWUudnVlP2U3MjUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9GZXRjaGVyVnVlLnZ1ZT83YTAwIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9jb25zb2xlL2pzL0NvbnNvbGVDb21wb25lbnRCYXNlLnZ1ZSIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvY29uc29sZS9qcy9Db25zb2xlQ29tcG9uZW50QmFzZS52dWU/ODhkMSIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvY291cnNlL2pzL0NvbnNvbGUvTWVtYmVycy9NZW1iZXJzRmV0Y2hlckNvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL2NvdXJzZS9qcy9Db25zb2xlL01lbWJlcnMvTWVtYmVyc0ZldGNoZXJDb21wb25lbnQudnVlPzhjYzUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL2NvdXJzZS9qcy9Db25zb2xlL01lbWJlcnMvTWVtYmVyc0ZldGNoZXJDb21wb25lbnQudnVlP2YyYWYiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL2NvdXJzZS9qcy9Db25zb2xlL01lbWJlcnMvU3R1ZGVudHNPbmx5LmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9jb3Vyc2UvanMvTWVtYmVycy9NZW1iZXIuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3Jldmlldy9fcmV2aWV3LnNjc3M/NTVhNSIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvcmV2aWV3L2luZGV4LmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdDb25zb2xlLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdSZXZpZXdlcnMudnVlIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdSZXZpZXdlcnMudnVlP2Q2M2IiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1Jldmlld1Jldmlld2Vycy52dWU/ZWM0YSIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZSIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZT81OTRlIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdzQnlGb3JNZW1iZXIudnVlP2JjMDkiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdWdWUudnVlIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3VnVlLnZ1ZT82MTY0Iiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3VnVlLnZ1ZT9iMzNkIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3c1Z1ZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdzVnVlLnZ1ZT80Y2MwIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3c1Z1ZS52dWU/NTVmMCIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvc2l0ZS9qcy9UaW1lRm9ybWF0dGVyLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9zaXRlL2pzL1VJL0VkaXRvci5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvc2l0ZS9qcy9VSS9FZGl0b3JPcHRpb25zLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9zaXRlL2pzL1VJL19lZGl0b3Iuc2Nzcz8yYWViIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9zaXRlL2pzL1Z1ZS9JbmxpbmVWdWUuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3NpdGUvanMvVnVlL01hc2sudnVlIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9zaXRlL2pzL1Z1ZS9NYXNrLnZ1ZT9mYzQ1Iiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9zaXRlL2pzL1Z1ZS9NYXNrLnZ1ZT85YWQ2Iiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9zaXRlL2pzL1Z1ZS9QYWdlVnVlLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9zaXRlL2pzL1Z1ZS9QYWdlVnVlQmFzZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3NpdGUvanMvVnVlL1BhZ2VWdWVCYXNlLnZ1ZT8xMThhIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9GZXRjaGVyVnVlLnZ1ZT83MjY4Iiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWU/NDk3YiIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTGliL0ZldGNoZXJWdWUudnVlPzJmMTIiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL1VzZXJzL01lbWJlcnNoaXAuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL1Z1ZS9Vc2VyVnVlQmFzZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL1Z1ZS9Vc2VyVnVlQmFzZS52dWU/YjZlMSJdLCJuYW1lcyI6WyJMT0NBTF9TVE9SQUdFX1NUVURFTlRTX09OTFkiLCJTdHVkZW50c09ubHkiLCJnZXQiLCJsb2NhbFN0b3JhZ2UiLCJ3aW5kb3ciLCJzIiwiZ2V0SXRlbSIsInNldCIsInN0dWRlbnRzIiwic2V0SXRlbSIsIk1lbWJlciIsImpzb24iLCJNZW1iZXJzaGlwIiwiY2FsbCIsInJvbGUiLCJ1bmRlZmluZWQiLCJpZCIsInNlbWVzdGVyIiwic2VjdGlvbiIsInNldFJvbGUiLCJyb2xlXyIsInByb3RvdHlwZSIsIk9iamVjdCIsImNyZWF0ZSIsImNvbnN0cnVjdG9yIiwiZ2V0U2VjdGlvbiIsInN0b3JlIiwiZ2V0dGVycyIsImdldEFzc2lnbm1lbnQiLCJhc3NpZ250YWciLCJHVUVTVCIsIlVTRVIiLCJEUk9QUEVEIiwiU1RVREVOVCIsIlNUQUZGIiwiR1JBREVSIiwiVEEiLCJJTlNUUlVDVE9SIiwiQURNSU4iLCJnZXRSb2xlcyIsInJvbGVzIiwibmFtZSIsInByaW9yaXR5Iiwic2tpcCIsIlNpdGUiLCJDb25zb2xlIiwiUmV2aWV3Q29uc29sZSIsInNldHVwIiwicmVhZHkiLCJQYWdlVnVlIiwiSW5saW5lVnVlIiwiUmV2aWV3IiwiUmV2aWV3c0J5Rm9yTWVtYmVyVnVlIiwidGFibGVzIiwiYWRkIiwidGl0bGUiLCJvcmRlciIsImFwaSIsImNvbXBvbmVudHMiLCJhZGRSb3V0ZSIsInJvdXRlIiwiY29tcG9uZW50IiwicHJvcHMiLCJjb3Vyc2UiLCJhc3NpZ25tZW50TGluayIsIlRpbWVGb3JtYXR0ZXIiLCJyZWxhdGl2ZSIsInRpbWUiLCJjdXJyZW50VGltZSIsImZvcm1hdCIsIm5vdyIsImVsYXBzZWQiLCJkaWZmIiwibWlucyIsIk1hdGgiLCJmbG9vciIsImRhdGUiLCJtb250aCIsInllYXIiLCJob3VyIiwiYW0iLCJtaW51dGUiLCJhYnNvbHV0ZVVOSVgiLCJ0IiwidW5peCIsInJlbGF0aXZlVU5JWCIsImMiLCJFZGl0b3IiLCJlbGVtZW50Iiwib3B0aW9ucyIsIkpTT04iLCJwYXJzZSIsInRleHRDb250ZW50IiwiY2xhc3NMaXN0Iiwic3R5bGUiLCJkaXNwbGF5IiwicmVzaXplciIsInJlc2l6ZSIsImhhbmRsZSIsImdyYWJTaXplIiwidGEiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0YXJlYSIsImNsYXNzZXMiLCJjbHMiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsInZhbHVlIiwiY29kZSIsImhlaWdodCIsIm1pbkhlaWdodCIsInNwZWxsY2hlY2siLCJpbnNlcnRUZXh0U3VwcG9ydGVkIiwicXVlcnlDb21tYW5kU3VwcG9ydGVkIiwiZGVsZXRlU3VwcG9ydGVkIiwianVzdEluZGVudGVkIiwidGFiIiwiYXV0b0luZGVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIndoaWNoIiwicHJldmVudERlZmF1bHQiLCJzaGlmdEtleSIsInRhYkF0Q2FyZXQiLCJ1blRhYiIsInJldHVybldpdGhJbmRlbnQiLCJ1bkRlbnQiLCJ0b3AiLCJzY3JvbGxUb3AiLCJsZWZ0Iiwic2Nyb2xsTGVmdCIsImJhY2tncm91bmRQb3NpdGlvbiIsImRTZWwiLCJzZWxlY3Rpb25TdGFydCIsInN0YXJ0UG9zIiwiZW5kUG9zIiwic2VsZWN0aW9uRW5kIiwiYmVmb3JlIiwic3Vic3RyaW5nIiwic3BsaXQiLCJsYXN0TGluZSIsImxlbmd0aCIsImxhc3RMZW4iLCJ0b0FkZCIsInRhYlNpemUiLCJzcGFjZXMiLCJpIiwiaW5zZXJ0VGV4dCIsInZhbCIsImxpbmVQb3MiLCJsaW5lIiwibmV4dExpbmVQb3MiLCJpbnNlcnRpb25zIiwiZm9jdXMiLCJkZWxldGlvbnMiLCJmaXJzdExpbmUiLCJkZWxldGVUZXh0Iiwic3BhY2UiLCJhZnRlciIsImxhc3QiLCJjaGFyQXQiLCJteVZhbHVlIiwic3BhY2VTdHIiLCJzdWJzdHIiLCJ0ZXh0IiwiZXhlY0NvbW1hbmQiLCJwb3MiLCJFZGl0b3JPcHRpb25zIiwicHJvcGVydHkiLCJoYXNPd25Qcm9wZXJ0eSIsIkVycm9yIiwic2VsIiwicXVlcnlTZWxlY3RvciIsInRlbXBsYXRlIiwiVnVlIiwiZWwiLCJkYXRhIiwibWV0aG9kcyIsIm5hdiIsIm5hdnRhZyIsIkhlYWRlciIsImluZm8iLCJoZWFkZXIiLCJGb290ZXIiLCJmb290ZXIiLCJzaXRlIiwibWVudSIsInNldFRpdGxlIiwic2l0ZU5hbWUiLCJzZXRNZW51IiwiZ2V0TWVudSIsInVzZXIiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RBO0FBRUE7QUFDQSxvRkFEQTtBQUVBO0FBQ0E7Ozs7OztBQU1BLFdBUEEsbUJBT0EsS0FQQSxFQU9BLEtBUEEsRUFPQSxPQVBBLEVBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQVhBOztBQWFBOzs7Ozs7QUFNQSxlQW5CQSx1QkFtQkEsS0FuQkEsRUFtQkEsS0FuQkEsRUFtQkEsSUFuQkEsRUFtQkE7QUFBQTs7QUFDQTtBQUNBO0FBQ0EsT0FGQTtBQUdB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUcsRUFBQyxDIiwiZmlsZSI6InJldmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlJldmlld1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJSZXZpZXdcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIjwhLS1cclxuQGZpbGVcclxuQmFzZSBjb21wb25lbnQgZm9yIGNvbnNvbGUgcGFnZXMuXHJcblxyXG5Qcm92aWRlczpcclxubmF2MiBtZW51IHN1cHBvcnQgd2l0aCBhdXRvbWF0aWMgcmVtb3ZhbC5cclxuLS0+XHJcblxyXG48c2NyaXB0PlxyXG4gICAgaW1wb3J0IFVzZXJWdWVCYXNlIGZyb20gJ3VzZXJzLWNsL2pzL1Z1ZS9Vc2VyVnVlQmFzZS52dWUnO1xyXG5cclxuICAgIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgICAgJ2V4dGVuZHMnOiBVc2VyVnVlQmFzZSxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBBZGQgYW4gb3B0aW9uIHRvIHRoZSBuYXYyIG1lbnUuXHJcbiAgICAgICAgICAgKiBAcGFyYW0gdGl0bGUgVGl0bGUgb2YgdGhlIG9wdGlvbiB0byBhZGQuXHJcbiAgICAgICAgICAgKiBAcGFyYW0gb3JkZXIgT3JkZXIgaW4gdGhlIG1lbnUuXHJcbiAgICAgICAgICAgKiBAcGFyYW0gY2xvc3VyZSBGdW5jdGlvbiB0byBjYWxsIHdoZW4gc2VsZWN0ZWQuXHJcbiAgICAgICAgICAgKi9cclxuICAgICAgICAgIGFkZE5hdjIodGl0bGUsIG9yZGVyLCBjbG9zdXJlKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuJHNpdGUuY29uc29sZS5jb21wb25lbnRzLmFkZE5hdjJMaW5rKHRoaXMsIHRpdGxlLCBvcmRlciwgY2xvc3VyZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzMS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEFkZCBhbiBvcHRpb24gdG8gdGhlIG5hdjIgbWVudSB0aGF0IGlzIGEgcm91dGVyIGxpbmtcclxuICAgICAgICAgICAqIEBwYXJhbSB0aXRsZSBUaXRsZSBvZiB0aGUgb3B0aW9uIHRvIGFkZC5cclxuICAgICAgICAgICAqIEBwYXJhbSBvcmRlciBPcmRlciBpbiB0aGUgbWVudS5cclxuICAgICAgICAgICAqIEBwYXJhbSBsaW5rIExpbmsgd2l0aG91dCBTaXRlLnJvb3RcclxuICAgICAgICAgICAqL1xyXG4gICAgICAgICAgYWRkTmF2MkxpbmsodGl0bGUsIG9yZGVyLCBsaW5rKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5hZGROYXYyKHRpdGxlLCBvcmRlciwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaChTaXRlLnJvb3QgKyBsaW5rKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgcmVtb3ZlTmF2MihpdGVtKSB7XHJcbiAgICAgICAgICAgICAgbGV0IGkgPSB0aGlzLmNvbXBvbmVudHMxLmluZGV4T2YoaXRlbSk7XHJcbiAgICAgICAgICAgICAgaWYoaSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50czEuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcblx0ICAgICAgICAgIHRoaXMuJHNpdGUuY29uc29sZS5jb21wb25lbnRzLnJlbW92ZU5hdjIodGhpcywgaXRlbSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGNyZWF0ZWQoKSB7XHJcbiAgICAgIFx0dGhpcy5jb21wb25lbnRzMSA9IFtdO1xyXG4gICAgICB9LFxyXG4gICAgICBiZWZvcmVEZXN0cm95KCkge1xyXG4gICAgICBcdHRoaXMuJHNpdGUuY29uc29sZS5jb21wb25lbnRzLnJlbW92ZU5hdjIodGhpcywgdGhpcy5jb21wb25lbnRzMSk7XHJcbiAgICAgIH1cclxuICB9XHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgICAgPGxhYmVsIHN0eWxlPVwiZGlzcGxheTpub25lXCIgcmVmPVwic3R1ZGVudHMtb25seVwiID48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgdi1tb2RlbD1cInN0dWRlbnRzXCIgQGNoYW5nZT1cInN0dWRlbnRzT25seUNoYW5nZWRcIj4gU3R1ZGVudHMgT25seTwvbGFiZWw+XHJcbiAgICAgIDxmZXRjaGVyIDpmZXRjaGVyPVwiZmV0Y2hlclwiIDpmZXRjaGluZz1cImZldGNoaW5nXCI+XHJcbiAgICAgICAgPHNsb3QgOnVzZXJzPVwidXNlcnNcIiA6c3R1ZGVudHM9XCJzdHVkZW50c1wiPjwvc2xvdD5cclxuICAgICAgICA8cCB2LWlmPVwidXNlcnMubGVuZ3RoID09IDBcIiBjbGFzcz1cImNlbnRlcmJveCBjb21wIGNlbnRlclwiPlxyXG4gICAgICAgICAgVGhlcmUgYXJlIGN1cnJlbnRseSBubyBtZW1iZXJzIGVucm9sbGVkIGluIHRoaXMgc2VjdGlvbi48L3A+XHJcbiAgICAgIDwvZmV0Y2hlcj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgICBpbXBvcnQge21hcFN0YXRlfSBmcm9tICd2dWV4JztcclxuICAgIGltcG9ydCBGZXRjaGVyVnVlIGZyb20gJ3VzZXJzLWNsL2pzL0xpYi9GZXRjaGVyVnVlLnZ1ZSc7XHJcbiAgICBpbXBvcnQge01lbWJlcn0gZnJvbSAnLi4vLi4vTWVtYmVycy9NZW1iZXInXHJcbiAgICBpbXBvcnQge1N0dWRlbnRzT25seX0gZnJvbSAnLi9TdHVkZW50c09ubHknO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWVtYmVyIGZldGNoZXIgY29tcG9uZW50IHRoYXQgY2FuIGJlIHVzZWQgYnkgdmlld3MuXHJcbiAgICAgKlxyXG4gICAgICogQGNvbnN0cnVjdG9yIE1lbWJlcnNGZXRjaGVyQ29tcG9uZW50VnVlXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgICAgICAvLyBJZiB0aGUgZmV0Y2hpbmcgdmFsdWUgaXQgdHJ1ZSwgdGhlIHVzaW5nIGNsaWVudFxyXG4gICAgICAgIC8vIGlzIGZldGNoaW5nIG1vcmUgdGhhbiBqdXN0IHRoZSBtZW1iZXJzaGlwIGFuZCB3ZSB3aWxsXHJcbiAgICAgICAgLy8gd2FpdCBmb3IgdGhhdCBhcyB3ZWxsLlxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGZldGNoaW5nOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdHVkZW50czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzdHVkZW50c0VsZW1lbnQ6IG51bGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgICAgICBmZXRjaE1vcmUoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnbWVtYmVycy9tb3JlJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBBZGQgXCJTdHVkZW50cyBPbmx5XCIgdG8gdGhlIG1lbnUgYmFyXHJcbiAgICAgICAgICAgICAqIEBtZW1iZXJvZiBNZW1iZXJzRmV0Y2hlckNvbXBvbmVudFZ1ZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgYWRkU3R1ZGVudHNPbmx5KCkge1xyXG4gICAgICAgICAgICBcdHRoaXMuc3R1ZGVudHMgPSBTdHVkZW50c09ubHkuZ2V0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLiRyZWZzWydzdHVkZW50cy1vbmx5J107XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGV4dHJhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmNsLXNlY3Rpb24tY29tcG9uZW50IHNwYW4uZXh0cmEnKTtcclxuICAgICAgICAgICAgICAgIGV4dHJhLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHVkZW50c0VsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdHVkZW50c09ubHlDaGFuZ2VkKCkge1xyXG4gICAgICAgICAgICBcdFN0dWRlbnRzT25seS5zZXQodGhpcy5zdHVkZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXB1dGVkOiBtYXBTdGF0ZSh7XHJcbiAgICAgICAgICAgIHVzZXJzKHN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdHVkZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZS5tZW1iZXJzLnVzZXJzLmZpbHRlcigodXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlci5yb2xlKCkgPT09IE1lbWJlci5TVFVERU5UXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZS5tZW1iZXJzLnVzZXJzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmZXRjaGVyOiBzdGF0ZSA9PiBzdGF0ZS5tZW1iZXJzLmZldGNoZXJcclxuXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgY29tcG9uZW50czoge1xyXG4gICAgICAgICAgICAnZmV0Y2hlcic6IEZldGNoZXJWdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdW50ZWQoKSB7XHJcblx0ICAgICAgICB0aGlzLnN0dWRlbnRzID0gU3R1ZGVudHNPbmx5LmdldCgpO1xyXG4gICAgICAgICAgICBjb25zdCBtZW1iZXIgPSB0aGlzLiRzdG9yZS5zdGF0ZS51c2VyLnVzZXIubWVtYmVyO1xyXG4gICAgICAgICAgICBsZXQgcXVlcnkgPSB7XHJcbiAgICAgICAgICAgICAgICBzZW1lc3RlcjogbWVtYmVyLnNlbWVzdGVyLFxyXG4gICAgICAgICAgICAgICAgc2VjdGlvbjogbWVtYmVyLnNlY3Rpb25cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdtZW1iZXJzL3F1ZXJ5JywgcXVlcnkpO1xyXG4gICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnbWVtYmVycy9mZXRjaCcpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFN0dWRlbnRzT25seSgpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJlZm9yZURlc3Ryb3koKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R1ZGVudHNFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zdHVkZW50c0VsZW1lbnQpO1xyXG4gICAgICAgICAgICBsZXQgZXh0cmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2LmNsLXNlY3Rpb24tY29tcG9uZW50IHNwYW4uZXh0cmEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZnVsbCBjbC1yZXZpZXdpbmdcIj5cclxuICAgICAgPG1hc2stdnVlIDptYXNrPVwibWFza1wiPkNvbW11bmljYXRpbmcgd2l0aCBzZXJ2ZXIuLi48L21hc2stdnVlPlxyXG5cclxuICAgICAgPG1lbWJlcnNmZXRjaGVyIDpmZXRjaGluZz1cInJldmlld2luZyA9PT0gbnVsbFwiPlxyXG4gICAgICAgIDx0ZW1wbGF0ZSBzbG90LXNjb3BlPVwiZmV0Y2hlclwiPlxyXG4gICAgICAgICAgPGRpdiB2LWlmPVwicmV2aWV3aW5nICE9PSBudWxsICYmIHVzZXIuYXRMZWFzdChpbnN0cnVjdG9yKVwiPlxyXG4gICAgICAgICAgICA8Zm9ybSBtZXRob2Q9XCJwb3N0XCIgQHN1Ym1pdC5wcmV2ZW50PVwiYXNzaWduUmV2aWV3c1wiPlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2VudGVyXCI+PGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+QXNzaWduIFJldmlld3M8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxzZWxlY3Qgdi1tb2RlbD1cInJldmlld2VyQ250XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdi1mb3I9XCJudW0gaW4gNlwiIDp2YWx1ZT1cIm51bVwiPnt7bnVtfX08L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPHRhYmxlIHYtaWY9XCJyZXZpZXdpbmchPT1udWxsXCIgY2xhc3M9XCJzbWFsbFwiPlxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgPHRoPlVzZXI8L3RoPlxyXG4gICAgICAgICAgICAgIDx0aCB2LWZvcj1cImkgaW4gbWF4UmV2aWV3ZXJcIj5yZXZpZXdlZTwvdGg+XHJcbiAgICAgICAgICAgICAgPHRoIHYtZm9yPVwiaSBpbiBtYXhSZXZpZXdlZVwiPnJldmlld2VyPC90aD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgPHRyIHYtZm9yPVwidXNlciBpbiBmZXRjaGVyLnVzZXJzXCI+XHJcbiAgICAgICAgICAgICAgPHRkPjxhIDp0aXRsZT1cInVzZXIubmFtZVwiPnt7dXNlci51c2VySWR9fTwvYT48L3RkPlxyXG4gICAgICAgICAgICAgIDx0ZCB2LWZvcj1cImkgaW4gbWF4UmV2aWV3ZXJcIiA6Y2xhc3M9XCJjbHMocmV2aWV3ZXJbdXNlci5tZW1iZXIuaWRdLCBpLTEpXCI+PHNwYW4gdi1odG1sPVwiZGlzcGxheShmZXRjaGVyLnVzZXJzLCByZXZpZXdlclt1c2VyLm1lbWJlci5pZF0sIGktMSlcIj48L3NwYW4+PC90ZD5cclxuICAgICAgICAgICAgICA8dGQgdi1mb3I9XCJpIGluIG1heFJldmlld2VlXCIgOmNsYXNzPVwiY2xzKHJldmlld2VlW3VzZXIubWVtYmVyLmlkXSwgaS0xKVwiPjxzcGFuIHYtaHRtbD1cImRpc3BsYXkoZmV0Y2hlci51c2VycywgcmV2aWV3ZWVbdXNlci5tZW1iZXIuaWRdLCBpLTEpXCI+PC9zcGFuPjwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICAgIDwvbWVtYmVyc2ZldGNoZXI+XHJcblxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIGltcG9ydCB7TWVtYmVyfSBmcm9tICdjb3Vyc2UtY2wvanMvTWVtYmVycy9NZW1iZXInO1xyXG5cdGltcG9ydCBDb25zb2xlQ29tcG9uZW50QmFzZSBmcm9tICdjb25zb2xlLWNsL2pzL0NvbnNvbGVDb21wb25lbnRCYXNlLnZ1ZSc7XHJcblx0aW1wb3J0IE1lbWJlcnNGZXRjaGVyQ29tcG9uZW50IGZyb20gJ2NvdXJzZS1jbC9qcy9Db25zb2xlL01lbWJlcnMvTWVtYmVyc0ZldGNoZXJDb21wb25lbnQudnVlJztcclxuICBpbXBvcnQgTWFza1Z1ZSBmcm9tICdzaXRlLWNsL2pzL1Z1ZS9NYXNrLnZ1ZSc7XHJcblxyXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdCdleHRlbmRzJzogQ29uc29sZUNvbXBvbmVudEJhc2UsXHJcblx0XHRwcm9wczogWydhc3NpZ250YWcnXSxcclxuXHRcdGRhdGE6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdGFzc2lnbm1lbnQ6IG51bGwsXHJcbiAgICAgICAgcmV2aWV3ZXJDbnQ6IDIsXHJcbiAgICAgICAgcmV2aWV3aW5nOiAneCcsXHJcbiAgICAgICAgaW5zdHJ1Y3RvcjogTWVtYmVyLklOU1RSVUNUT1IsXHJcbiAgICAgICAgcmV2aWV3ZXI6IG51bGwsXHJcbiAgICAgICAgcmV2aWV3ZWU6IG51bGwsXHJcbiAgICAgICAgbWF4UmV2aWV3ZXI6IDAsXHJcbiAgICAgICAgbWF4UmV2aWV3ZWU6IDAsXHJcblx0XHQgICAgbWFzazogZmFsc2VcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGNvbXBvbmVudHM6IHtcclxuXHRcdFx0J21lbWJlcnNmZXRjaGVyJzogTWVtYmVyc0ZldGNoZXJDb21wb25lbnQsXHJcbiAgICAgIG1hc2tWdWU6IE1hc2tWdWVcclxuXHRcdH0sXHJcblx0XHRtb3VudGVkKCkge1xyXG5cdFx0XHRjb25zdCBtZW1iZXIgPSB0aGlzLiRzdG9yZS5zdGF0ZS51c2VyLnVzZXIubWVtYmVyO1xyXG5cclxuXHRcdFx0dGhpcy5zZWN0aW9uID0gdGhpcy4kc3RvcmUuZ2V0dGVyc1snY291cnNlL3NlY3Rpb24nXShtZW1iZXIuc2VtZXN0ZXIsIG1lbWJlci5zZWN0aW9uKTtcclxuXHRcdFx0dGhpcy5hc3NpZ25tZW50ID0gdGhpcy5zZWN0aW9uLmdldEFzc2lnbm1lbnQodGhpcy5hc3NpZ250YWcpO1xyXG5cclxuXHRcdFx0dGhpcy5zZXRUaXRsZSgnOiAnICsgdGhpcy5hc3NpZ25tZW50LnNob3J0bmFtZSArICcgUmV2aWV3aW5nJyk7XHJcbiAgICAgIHRoaXMubWFzayA9IHRydWU7XHJcblxyXG4gICAgICBTaXRlLmFwaS5nZXQoJy9hcGkvcmV2aWV3L3Jldmlld2Vycy8nICsgdGhpcy5hc3NpZ250YWcsIHt9KVxyXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIFx0dGhpcy5tYXNrID0gZmFsc2U7XHJcbiAgICAgICAgICBpZiAoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcclxuICAgICAgICAgICAgdGhpcy50YWtlKHJlc3BvbnNlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFNpdGUudG9hc3QodGhpcywgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICBcdHRoaXMubWFzayA9IGZhbHNlO1xyXG4gICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCBlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cdFx0fSxcclxuXHRcdG1ldGhvZHM6IHtcclxuXHRcdFx0YXNzaWduUmV2aWV3cygpIHtcclxuXHRcdFx0XHR0aGlzLm1hc2sgPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRsZXQgcGFyYW1zID0ge1xyXG5cdFx0XHQgICAgY250OiB0aGlzLnJldmlld2VyQ250XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFNpdGUuYXBpLnBvc3QoJy9hcGkvcmV2aWV3L3Jldmlld2Vycy8nICsgdGhpcy5hc3NpZ250YWcsIHBhcmFtcylcclxuXHRcdFx0XHQgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdCAgICAgICAgICB0aGlzLm1hc2sgPSBmYWxzZTtcclxuXHRcdFx0XHQgICAgICAgIGlmICghcmVzcG9uc2UuaGFzRXJyb3IoKSkge1xyXG5cdFx0XHQgICAgICAgICAgICB0aGlzLnRha2UocmVzcG9uc2UpO1xyXG5cdFx0XHRcdCAgICAgICAgfSBlbHNlIHtcclxuXHRcdFx0XHQgICAgICAgICAgICBTaXRlLnRvYXN0KHRoaXMsIHJlc3BvbnNlKTtcclxuXHRcdFx0XHQgICAgICAgIH1cclxuXHJcblx0XHRcdFx0ICAgIH0pXHJcblx0XHRcdFx0ICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuXHRcdFx0ICAgICAgICAgIHRoaXMubWFzayA9IGZhbHNlO1xyXG5cdFx0XHRcdCAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCBlcnJvcik7XHJcblx0XHRcdFx0ICAgIH0pO1xyXG5cclxuICAgICAgfSxcclxuICAgICAgdGFrZShyZXNwb25zZSkge1xyXG5cdFx0XHRcdGNvbnN0IGRhdGEgPSByZXNwb25zZS5nZXREYXRhKCdyZXZpZXdlcnMnKS5hdHRyaWJ1dGVzO1xyXG5cclxuXHRcdFx0XHR0aGlzLnJldmlld2VyID0ge307XHJcblx0XHRcdFx0dGhpcy5yZXZpZXdlZSA9IHt9O1xyXG5cdCAgICAgIHRoaXMubWF4UmV2aWV3ZXIgPSAwO1xyXG5cdCAgICAgIHRoaXMubWF4UmV2aWV3ZWUgPSAwO1xyXG5cclxuXHRcdFx0XHRmb3IobGV0IGFzc2lnbiBvZiBkYXRhKSB7XHJcblx0XHRcdFx0XHRjb25zdCByZXZpZXdlciA9IGFzc2lnblswXTtcclxuXHRcdFx0XHRcdGNvbnN0IHJldmlld2VlID0gYXNzaWduWzFdO1xyXG5cdFx0XHRcdFx0Y29uc3QgY250ID0gYXNzaWduWzJdO1xyXG5cclxuXHRcdFx0XHRcdGlmKHRoaXMucmV2aWV3ZXJbcmV2aWV3ZXJdID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5yZXZpZXdlcltyZXZpZXdlcl0gPSBbXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLnJldmlld2VyW3Jldmlld2VyXS5wdXNoKFtyZXZpZXdlZSwgY250XSk7XHJcblx0XHRcdFx0XHRpZih0aGlzLnJldmlld2VyW3Jldmlld2VyXS5sZW5ndGggPiB0aGlzLm1heFJldmlld2VyKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMubWF4UmV2aWV3ZXIgPSB0aGlzLnJldmlld2VyW3Jldmlld2VyXS5sZW5ndGg7XHJcbiAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgIGlmKHRoaXMucmV2aWV3ZWVbcmV2aWV3ZWVdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXZpZXdlZVtyZXZpZXdlZV0gPSBbXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLnJldmlld2VlW3Jldmlld2VlXS5wdXNoKFtyZXZpZXdlciwgY250XSk7XHJcbiAgICAgICAgICBpZih0aGlzLnJldmlld2VlW3Jldmlld2VlXS5sZW5ndGggPiB0aGlzLm1heFJldmlld2VlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF4UmV2aWV3ZWUgPSB0aGlzLnJldmlld2VyW3Jldmlld2VyXS5sZW5ndGg7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSxcclxuICAgICAgZGlzcGxheSh1c2VycywgYXNzaWduLCBpKSB7XHJcblx0XHRcdFx0aWYoYXNzaWduID09PSB1bmRlZmluZWQgfHwgaSA+PSBhc3NpZ24ubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gJyAnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCB1c2VyIG9mIHVzZXJzKSB7XHJcbiAgICAgICAgXHRpZih1c2VyLm1lbWJlci5pZCA9PT0gYXNzaWduW2ldWzBdKSB7XHJcbiAgICAgICAgXHRcdHJldHVybiBgPGEgdGl0bGU9XCIke3VzZXIubmFtZX1cIj4ke3VzZXIudXNlcklkfTwvYT4vJHthc3NpZ25baV1bMV19YDsgIC8vIHVzZXIudXNlcklkICsgJy8nICsgYXNzaWduW2ldWzFdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuICcgJztcclxuICAgICAgfSxcclxuICAgICAgY2xzKGFzc2lnbiwgaSkge1xyXG4gICAgICAgIGlmKGFzc2lnbiA9PT0gdW5kZWZpbmVkIHx8IGkgPj0gYXNzaWduLmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFzc2lnbltpXVsxXSA8IDEgPyAnY2wtZW1wdHknIDogJyc7XHJcblxyXG4gICAgICB9XHJcblx0XHR9XHJcblx0fVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJjbC1yZXZpZXdzXCI+XHJcbiAgICA8aDI+U3RhZmYgUmV2aWV3PC9oMj5cclxuICAgIDxmb3JtIG1ldGhvZD1cInBvc3RcIiBAc3VibWl0LnByZXZlbnQ9XCJzdWJtaXRcIj5cclxuICAgICAgPGRpdiByZWY9XCJlZGl0b3JcIj48L2Rpdj5cclxuICAgICAgPHA+PGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlN1Ym1pdCBSZXZpZXdcIj48L3A+XHJcbiAgICA8L2Zvcm0+XHJcblxyXG4gICAgPGgzPlJldmlld3MgYnkgdGhpcyB1c2VyLjwvaDM+XHJcbiAgICA8cCB2LWlmPVwiYnlSZXZpZXdzLmxlbmd0aCAgPT09IDBcIiBjbGFzcz1cImNlbnRlclwiPk5vbmU8L3A+XHJcbiAgICA8ZGl2IHYtZm9yPVwicmV2aWV3IGluIGJ5UmV2aWV3c1wiIGNsYXNzPVwiY2wtcmV2aWV3XCI+XHJcbiAgICAgIDxoMyA6Y2xhc3M9XCJyZXZpZXcucmV2aWV3ZWUuYXRMZWFzdChzdGFmZlJvbGUpID8gJ3N0YWZmJyA6ICcnXCI+e3tmb3JtYXRUaW1lKHJldmlldy50aW1lKX19IFJldmlldyBieSB7e3Jldmlldy5yZXZpZXdlZS5uYW1lfX1cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImNsLXN1Ym1pdHRlZFwiPnt7c2hvd1N1Ym1pc3Npb25zKHJldmlldyl9fTwvc3Bhbj48L2gzPlxyXG4gICAgICA8cHJlPnt7cmV2aWV3Lm1ldGEucmV2aWV3LnJldmlld319PC9wcmU+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxoMz5SZXZpZXdzIG9mIHRoaXMgdXNlcidzIGFzc2lnbm1lbnQuPC9oMz5cclxuICAgIDxwIHYtaWY9XCJmb3JSZXZpZXdzLmxlbmd0aCAgPT09IDBcIiBjbGFzcz1cImNlbnRlclwiPk5vbmU8L3A+XHJcbiAgICA8ZGl2IHYtZm9yPVwicmV2aWV3IGluIGZvclJldmlld3NcIiBjbGFzcz1cImNsLXJldmlld1wiPlxyXG4gICAgICA8aDMgOmNsYXNzPVwicmV2aWV3LnJldmlld2VyLmF0TGVhc3Qoc3RhZmZSb2xlKSA/ICdzdGFmZicgOiAnJ1wiPnt7Zm9ybWF0VGltZShyZXZpZXcudGltZSl9fVxyXG4gICAgICAgIDxzcGFuIHYtaWY9XCJyZXZpZXcucmV2aWV3ZXIuYXRMZWFzdChzdGFmZlJvbGUpXCI+U3RhZmYgUmV2aWV3PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIHYtZWxzZT5SZXZpZXc8L3NwYW4+IGJ5IHt7cmV2aWV3LnJldmlld2VyLm5hbWV9fVxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2wtc3VibWl0dGVkXCI+e3tzaG93U3VibWlzc2lvbnMocmV2aWV3KX19PC9zcGFuPjwvaDM+XHJcbiAgICAgIDxwcmU+e3tyZXZpZXcubWV0YS5yZXZpZXcucmV2aWV3fX08L3ByZT5cclxuICAgIDwvZGl2PlxyXG5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblx0LyoqXHJcbiAgICogUHJlc2VudCByZXZpZXdzIGJ5IGFuZCBmb3IgYSBtZW1iZXIgYW5kIHRoZSBzdGFmZiByZXZpZXdpbmcgZm9ybS5cclxuICAgKiBAY29uc3RydWN0b3IgUmV2aWV3c0J5Rm9yTWVtYmVyVnVlXHJcbiAgICovXHJcblxyXG4gIGltcG9ydCB7VGltZUZvcm1hdHRlcn0gZnJvbSAnc2l0ZS1jbC9qcy9UaW1lRm9ybWF0dGVyJztcclxuICBpbXBvcnQge0VkaXRvcn0gZnJvbSAnc2l0ZS1jbC9qcy9VSS9FZGl0b3InO1xyXG4gIGltcG9ydCB7TWVtYmVyfSBmcm9tICdjb3Vyc2UtY2wvanMvTWVtYmVycy9NZW1iZXInO1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgXHRwcm9wczogWyd1c2VyJywgJ2Fzc2lnbnRhZyddLFxyXG4gICAgZGF0YTogZnVuY3Rpb24oKSB7XHJcbiAgXHRcdHJldHVybiB7XHJcbiAgICAgICAgZm9yUmV2aWV3czogW10sXHJcbiAgICAgICAgYnlSZXZpZXdzOiBbXSxcclxuICAgICAgICBzdGFmZlJvbGU6IE1lbWJlci5TVEFGRixcclxuICAgICAgICBzdWJtaXNzaW9uczogW11cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHdhdGNoOiB7XHJcbiAgXHRcdHVzZXIoKSB7XHJcbiAgXHRcdFx0dGhpcy5mb3JSZXZpZXdzID0gW107XHJcbiAgXHRcdFx0dGhpcy5ieVJldmlld3MgPSBbXTtcclxuICBcdFx0XHR0aGlzLnN1Ym1pc3Npb25zID0gW107XHJcbiAgXHRcdFx0dGhpcy5mZXRjaCgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW91bnRlZCgpIHtcclxuXHQgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuJHJlZnNbJ2VkaXRvciddO1xyXG5cdCAgICB0aGlzLmVkaXRvciA9IG5ldyBFZGl0b3IoZWxlbWVudCwge1xyXG5cdFx0ICAgIGhlaWdodDogJzEwZW0nLFxyXG5cdFx0ICAgIGNsYXNzZXM6IFsneWVsbG93LXBhZCddXHJcblx0ICAgIH0pO1xyXG5cclxuXHQgICAgdGhpcy5mZXRjaCgpO1xyXG4gICAgfSxcclxuXHQgIG1ldGhvZHM6IHtcclxuICBcdFx0ZmV0Y2goKSB7XHJcbiAgICAgICAgdGhpcy4kc2l0ZS5hcGkuZ2V0KCcvYXBpL3Jldmlldy9yZXZpZXdzLycgKyB0aGlzLmFzc2lnbnRhZyArICcvJyArIHRoaXMudXNlci5tZW1iZXIuaWQsIHt9KVxyXG4gICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UuaGFzRXJyb3IoKSkge1xyXG4gICAgICAgICAgICAgIHRoaXMudGFrZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblx0ICAgICAgICAgICAgdGhpcy4kc2l0ZS50b2FzdCh0aGlzLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG5cdCAgICAgICAgICB0aGlzLiRzaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gIFx0XHR0YWtlKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5nZXREYXRhKCdyZXZpZXdzLWJ5LWZvcicpLmF0dHJpYnV0ZXM7XHJcbiAgICAgICAgbGV0IHN1Ym1pdERhdGEgPSByZXNwb25zZS5nZXREYXRhKCdhc3NpZ25tZW50LXN1Ym1pc3Npb25zJyk7XHJcbiAgICAgICAgaWYoc3VibWl0RGF0YSAhPT0gbnVsbCkge1xyXG5cdCAgICAgICAgdGhpcy5zdWJtaXNzaW9ucyA9IHN1Ym1pdERhdGEuYXR0cmlidXRlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcihsZXQgcmV2aWV3IG9mIGRhdGEuZm9yKSB7XHJcblx0ICAgICAgICByZXZpZXcucmV2aWV3ZXIgPSBuZXcgVXNlcnMuVXNlcihyZXZpZXcucmV2aWV3ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IHJldmlldyBvZiBkYXRhLmJ5KSB7XHJcblx0ICAgICAgICByZXZpZXcucmV2aWV3ZWUgPSBuZXcgVXNlcnMuVXNlcihyZXZpZXcucmV2aWV3ZWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5mb3JSZXZpZXdzID0gZGF0YS5mb3I7XHJcbiAgICAgICAgdGhpcy5ieVJldmlld3MgPSBkYXRhLmJ5O1xyXG4gICAgICB9LFxyXG5cdCAgICBzdWJtaXQoKSB7XHJcblx0XHQgICAgY29uc3QgdGV4dCA9IHRoaXMuZWRpdG9yLnRleHRhcmVhLnZhbHVlLnRyaW0oKTtcclxuXHRcdCAgICBpZih0ZXh0ID09PSAnJykge1xyXG5cdFx0XHQgICAgU2l0ZS50b2FzdCh0aGlzLCAnWW91IG11c3QgZW50ZXIgc29tZSB0ZXh0IHRvIHN1Ym1pdCcpO1xyXG5cdFx0XHQgICAgcmV0dXJuO1xyXG5cdFx0ICAgIH1cclxuXHJcblx0XHQgICAgbGV0IHN1Ym1pc3Npb25zID0ge307XHJcblx0XHQgICAgZm9yKGxldCB0YWcgaW4gdGhpcy5zdWJtaXNzaW9ucykge1xyXG5cdFx0ICAgIFx0Y29uc29sZS5sb2codGhpcy5zdWJtaXNzaW9uc1t0YWddKTtcclxuXHRcdCAgICBcdHN1Ym1pc3Npb25zW3RhZ10gPSB7XHJcblx0XHQgICAgICAgICdpZCc6IHRoaXMuc3VibWlzc2lvbnNbdGFnXVswXS5pZCxcclxuICAgICAgICAgICAgJ2RhdGUnOiB0aGlzLnN1Ym1pc3Npb25zW3RhZ11bMF0uZGF0ZVxyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHRcdCAgICBsZXQgcGFyYW1zID0ge1xyXG5cdFx0XHQgICAgdHlwZTogJ3RleHQvcGxhaW4nLFxyXG5cdFx0XHQgICAgdGV4dDogdGV4dCxcclxuICAgICAgICAgIHN1Ym1pc3Npb25zOiBzdWJtaXNzaW9uc1xyXG5cdFx0ICAgIH1cclxuXHJcblx0XHQgICAgU2l0ZS5hcGkucG9zdChgL2FwaS9yZXZpZXcvc3RhZmZyZXZpZXcvJHt0aGlzLmFzc2lnbnRhZ30vJHt0aGlzLnVzZXIubWVtYmVyLmlkfWAsIHBhcmFtcylcclxuXHRcdFx0ICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdCAgICBpZiAoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcclxuXHRcdFx0XHRcdCAgICB0aGlzLmVkaXRvci50ZXh0YXJlYS52YWx1ZSA9ICcnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXMudGFrZShyZXNwb25zZSk7XHJcblx0XHRcdFx0XHQgICAgU2l0ZS50b2FzdCh0aGlzLCBcIlJldmlldyBzdWNjZXNzZnVsbHkgc2F2ZWQgdG8gdGhlIHNlcnZlclwiKTtcclxuXHRcdFx0XHQgICAgfSBlbHNlIHtcclxuXHRcdFx0XHRcdCAgICBTaXRlLnRvYXN0KHRoaXMsIHJlc3BvbnNlKTtcclxuXHRcdFx0XHQgICAgfVxyXG5cclxuXHRcdFx0ICAgIH0pXHJcblx0XHRcdCAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0ICAgIFNpdGUudG9hc3QodGhpcywgZXJyb3IpO1xyXG5cdFx0XHQgICAgfSk7XHJcblx0ICAgIH0sXHJcblx0XHQgIGZvcm1hdFRpbWUodGltZSkge1xyXG5cdFx0XHQgIHJldHVybiBUaW1lRm9ybWF0dGVyLnJlbGF0aXZlVU5JWCh0aW1lLCBudWxsKTtcclxuXHRcdCAgfSxcclxuXHQgICAgc2hvd1N1Ym1pc3Npb25zKHJldmlldykge1xyXG4gIFx0XHRcdGxldCBzdWJtaXNzaW9ucyA9IHJldmlldy5tZXRhLnJldmlldy5zdWJtaXNzaW9ucztcclxuXHJcblx0XHQgICAgbGV0IHJldCA9ICcnO1xyXG5cdFx0ICAgIGZvcihsZXQgdGFnIGluIHN1Ym1pc3Npb25zKSB7XHJcblx0XHRcdCAgICByZXQgKz0gVGltZUZvcm1hdHRlci5hYnNvbHV0ZVVOSVgoc3VibWlzc2lvbnNbdGFnXS5kYXRlKTtcclxuXHRcdCAgICB9XHJcblxyXG5cdFx0ICAgIGlmKHJldCA9PT0gJycpIHtcclxuXHRcdFx0ICAgIHJldHVybiAnJztcclxuXHRcdCAgICB9XHJcblxyXG5cdFx0ICAgIHJldHVybiAnU3VibWlzc2lvbjogJyArIHJldDtcclxuXHQgICAgfVxyXG5cdCAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZnVsbFwiPlxyXG4gICAgPGRpdiB2LWZvcj1cInN1Ym1pc3Npb24gaW4ganNvbi5zdWJtaXNzaW9uc1wiIGNsYXNzPVwiY2wtc3VibWlzc2lvbi12aWV3XCI+XHJcbiAgICAgIDxoMj57e3N1Ym1pc3Npb24ubmFtZX19PC9oMj5cclxuICAgICAgPHByZSB2LWlmPVwic3VibWlzc2lvbi50eXBlID09PSAndGV4dCdcIiBjbGFzcz1cImNsLXByZXZpZXcgeWVsbG93LXBhZFwiPnt7c3VibWlzc2lvbi50ZXh0fX08L3ByZT5cclxuICAgICAgPGZpZ3VyZSB2LWlmPVwic3VibWlzc2lvbi50eXBlID09PSAnaW1hZ2UnXCIgY2xhc3M9XCJjbC1wcmV2aWV3XCI+PGltZyA6c3JjPVwicHJldmlld0ltZyhzdWJtaXNzaW9uKVwiPjwvZmlndXJlPlxyXG4gICAgICA8cCBjbGFzcz1cImNsLXByZXZpZXctdGltZVwiPnt7Zm9ybWF0VGltZShzdWJtaXNzaW9uLmRhdGUpfX08L3A+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8aDI+UmV2aWV3PC9oMj5cclxuICAgIDxmb3JtIG1ldGhvZD1cInBvc3RcIiBAc3VibWl0LnByZXZlbnQ9XCJzdWJtaXRcIj5cclxuICAgICAgPGRpdiByZWY9XCJlZGl0b3JcIiBjbGFzcz1cInNoYWRvd1wiPjwvZGl2PlxyXG4gICAgICA8cD48aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU3VibWl0IFJldmlld1wiPjwvcD5cclxuICAgIDwvZm9ybT5cclxuXHJcbiAgICA8aDI+UHJldmlvdXMgUmV2aWV3czwvaDI+XHJcbiAgICA8cCBjbGFzcz1cImNsLXJldmlld3Mtbm9uZVwiIHYtaWY9XCJyZXZpZXdpbmcubGVuZ3RoID09PSAwXCI+KioqIE5vbmUgWWV0ICoqKjwvcD5cclxuICAgIDxkaXYgdi1mb3I9XCJyZXZpZXcgaW4gcmV2aWV3aW5nXCIgY2xhc3M9XCJjbC1yZXZpZXdcIj5cclxuICAgICAgPGgzPnt7Zm9ybWF0VGltZShyZXZpZXcudGltZSl9fSBSZXZpZXcgYnkgTWVcclxuICAgICAgPHNwYW4gY2xhc3M9XCJjbC1zdWJtaXR0ZWRcIj57e3Nob3dTdWJtaXNzaW9ucyhyZXZpZXcpfX08L3NwYW4+PC9oMz5cclxuICAgICAgPHByZT57e3Jldmlldy5tZXRhLnJldmlldy5yZXZpZXd9fTwvcHJlPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblx0aW1wb3J0IFVzZXJWdWVCYXNlIGZyb20gJ3VzZXJzLWNsL2pzL1Z1ZS9Vc2VyVnVlQmFzZS52dWUnO1xyXG4gIGltcG9ydCB7RWRpdG9yfSBmcm9tICdzaXRlLWNsL2pzL1VJL0VkaXRvcic7XHJcbiAgaW1wb3J0IHtUaW1lRm9ybWF0dGVyfSBmcm9tICdzaXRlLWNsL2pzL1RpbWVGb3JtYXR0ZXInO1xyXG5cclxuXHRleHBvcnQgZGVmYXVsdCB7XHJcblx0XHQnZXh0ZW5kcyc6IFVzZXJWdWVCYXNlLFxyXG5cdFx0cHJvcHM6IFsnanNvbiddLFxyXG5cdFx0ZGF0YTogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiB7XHJcbiAgICAgICAgcmV2aWV3aW5nOiBbXSxcclxuICAgICAgICBzdWJtaXNzaW9uczoge31cclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdG1vdW50ZWQoKSB7XHJcblx0XHRcdHRoaXMuc2V0VGl0bGUoJ1BlZXIgUmV2aWV3aW5nJyk7XHJcblx0XHRcdHRoaXMucmV2aWV3aW5nID0gdGhpcy5qc29uLnJldmlld2luZztcclxuXHJcblx0XHQgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLiRyZWZzWydlZGl0b3InXTtcclxuICAgICAgdGhpcy5lZGl0b3IgPSBuZXcgRWRpdG9yKGVsZW1lbnQsIHtcclxuICAgICAgICBoZWlnaHQ6ICcxMGVtJyxcclxuICAgICAgICBjbGFzc2VzOiBbJ3llbGxvdy1wYWQnXVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGxldCBzdWJtaXNzaW9ucyA9IHt9O1xyXG4gICAgICBmb3IoY29uc3Qgc3VibWlzc2lvbiBvZiB0aGlzLmpzb24uc3VibWlzc2lvbnMpIHtcclxuICAgICAgICBzdWJtaXNzaW9uc1tzdWJtaXNzaW9uLnRhZ109e1xyXG4gICAgICAgICAgJ2lkJzogc3VibWlzc2lvbi5pZCxcclxuICAgICAgICAgICdkYXRlJzogc3VibWlzc2lvbi5kYXRlXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5zdWJtaXNzaW9ucyA9IHN1Ym1pc3Npb25zO1xyXG5cdFx0fSxcclxuXHRcdG1ldGhvZHM6IHtcclxuXHRcdFx0c3VibWl0KCkge1xyXG4gICAgICAgIGNvbnN0IHRleHQgPSB0aGlzLmVkaXRvci50ZXh0YXJlYS52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgaWYodGV4dCA9PT0gJycpIHtcclxuICAgICAgICAgIFNpdGUudG9hc3QodGhpcywgJ1lvdSBtdXN0IGVudGVyIHNvbWUgdGV4dCB0byBzdWJtaXQnKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICB0eXBlOiAndGV4dC9wbGFpbicsXHJcbiAgICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgICAgc3VibWlzc2lvbnM6IHRoaXMuc3VibWlzc2lvbnNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFNpdGUuYXBpLnBvc3QoYC9hcGkvcmV2aWV3L3Jldmlldy8ke3RoaXMuanNvbi5pZH1gLCBwYXJhbXMpXHJcbiAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5oYXNFcnJvcigpKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5lZGl0b3IudGV4dGFyZWEudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgICB0aGlzLnJldmlld2luZyA9IHJlc3BvbnNlLmdldERhdGEoJ3Jldmlld2luZycpLmF0dHJpYnV0ZXM7XHJcblxyXG4gICAgICAgICAgICAgIFNpdGUudG9hc3QodGhpcywgXCJSZXZpZXcgc3VjY2Vzc2Z1bGx5IHNhdmVkIHRvIHRoZSBzZXJ2ZXJcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBTaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICBmb3JtYXRUaW1lKHRpbWUpIHtcclxuICAgICAgICByZXR1cm4gVGltZUZvcm1hdHRlci5yZWxhdGl2ZVVOSVgodGltZSwgbnVsbCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNob3dTdWJtaXNzaW9ucyhyZXZpZXcpIHtcclxuICAgICAgICBsZXQgcGFzdCA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHN1Ym1pc3Npb25zID0gcmV2aWV3Lm1ldGEucmV2aWV3LnN1Ym1pc3Npb25zO1xyXG4gICAgICAgIGZvcihsZXQgdGFnIGluIHN1Ym1pc3Npb25zKSB7XHJcbiAgICAgICAgXHRpZihzdWJtaXNzaW9uc1t0YWddLmlkICE9PSB0aGlzLnN1Ym1pc3Npb25zW3RhZ10uaWQpIHtcclxuICAgICAgICBcdFx0cGFzdCA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihwYXN0KSB7XHJcbiAgICAgICAgXHRyZXR1cm4gJ0ZvciBhIHBhc3Qgc3VibWlzc2lvbic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0sXHJcbiAgICAgIHByZXZpZXdJbWcoc3VibWlzc2lvbikge1xyXG5cdCAgICAgIHJldHVybiBTaXRlLnJvb3QgKyAnL2NsL3Jldmlldy9pbWcvJyArIHN1Ym1pc3Npb24uaWQ7XHJcbiAgICAgIH1cclxuXHRcdH1cclxuXHR9XHJcbjwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwiY2wtcmV2aWV3c1wiPlxyXG4gICAgPGgzPlJldmlld3Mgb2YgdGhpcyBhc3NpZ25tZW50IGFwcGVhciBoZXJlLjwvaDM+XHJcbiAgICA8cCBjbGFzcz1cImNsLXJldmlld3Mtbm9uZVwiIHYtaWY9XCJyZXZpZXdzLmxlbmd0aCA9PT0gMFwiPioqKiBOb25lIFlldCAqKio8L3A+XHJcbiAgICA8ZGl2IHYtZm9yPVwicmV2aWV3IGluIHJldmlld3NcIiBjbGFzcz1cImNsLXJldmlld1wiPlxyXG4gICAgICA8aDMgOmNsYXNzPVwicmV2aWV3LnJvbGUgIT09IHVuZGVmaW5lZCA/ICdzdGFmZicgOiAnJ1wiPnt7Zm9ybWF0VGltZShyZXZpZXcudGltZSl9fVxyXG4gICAgICAgIDxzcGFuIHYtaWY9XCJyZXZpZXcucm9sZSAhPT0gdW5kZWZpbmVkXCI+U3RhZmYgUmV2aWV3PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIHYtZWxzZT5SZXZpZXc8L3NwYW4+IGJ5IHt7cmV2aWV3LmJ5fX1cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImNsLXN1Ym1pdHRlZFwiPnt7c2hvd1N1Ym1pc3Npb25zKHJldmlldyl9fTwvc3Bhbj48L2gzPlxyXG4gICAgICA8cHJlPnt7cmV2aWV3LnJldmlld319PC9wcmU+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblx0aW1wb3J0IHtUaW1lRm9ybWF0dGVyfSBmcm9tICdzaXRlLWNsL2pzL1RpbWVGb3JtYXR0ZXInO1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgXHRwcm9wczogWydqc29uJ10sXHJcbiAgICBkYXRhOiBmdW5jdGlvbigpIHtcclxuICBcdFx0cmV0dXJuIHtcclxuICBcdFx0XHRhc3NpZ25UYWc6ICcnLFxyXG4gICAgICAgIHJldmlld3M6IFtdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb3VudGVkKCkge1xyXG4gIFx0XHR0aGlzLmFzc2lnblRhZyA9IHRoaXMuanNvbi5hc3NpZ25UYWc7XHJcbiAgXHRcdHRoaXMucmV2aWV3cyA9IHRoaXMuanNvbi5yZXZpZXdzO1xyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgZm9ybWF0VGltZSh0aW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIFRpbWVGb3JtYXR0ZXIucmVsYXRpdmVVTklYKHRpbWUsIG51bGwpO1xyXG4gICAgICB9LFxyXG5cdCAgICBzaG93U3VibWlzc2lvbnMocmV2aWV3KSB7XHJcbiAgICAgIFx0bGV0IHJldCA9ICcnO1xyXG4gICAgICBcdGZvcihsZXQgdGFnIGluIHJldmlldy5zdWJtaXNzaW9ucykge1xyXG4gICAgICBcdFx0cmV0ICs9IFRpbWVGb3JtYXR0ZXIuYWJzb2x1dGVVTklYKHJldmlldy5zdWJtaXNzaW9uc1t0YWddLmRhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYocmV0ID09PSAnJykge1xyXG4gICAgICAgIFx0cmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIFx0cmV0dXJuICdTdWJtaXNzaW9uOiAnICsgcmV0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiA6Y2xhc3M9XCJtYXNrQ2xhc3NcIj48cCB2LWlmPVwic2xvdERlbGF5XCI+PHNsb3Q+PC9zbG90PjwvcD48L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgLyoqXHJcbiAgICogTWFza2luZyBWdWUgY29tcG9uZW50LlxyXG4gICAqXHJcbiAgICogV2hlbiBlbmFibGVkLCBhIHRyYW5zbHVjZW50IG1hc2sgd2l0aCBhbiBvcHRpb25hbCBtZXNzYWdlXHJcbiAgICogaXMgZGlzcGxheWVkIGFuZCBjb250cm9scyBhcmUgZGlzYWJsZWQuXHJcbiAgICpcclxuICAgKiBNdXN0IGJlIGEgY2hpbGQgb2YgYW4gZWxlbWVudCB3aXRoIGEgcG9zaXRpb24gc2V0dGluZ1xyXG4gICAqIGluIENTUy4gV2hlbiBtYXNrIGlzIHRydWUsIHRoZSBpbnRlcmZhY2UgaXMgZGlzYWJsZWQgYnlcclxuICAgKiBhbiBvdmVybGF5IG1hc2suXHJcbiAgICogQGNvbnN0cnVjdG9yIE1hc2tWdWVcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIC8vIEluY2x1ZGUgdGhpcyBjb21wb25lbnRcclxuICAgKiBpbXBvcnQgTWFza1Z1ZSBmcm9tICdzaXRlLWNsL2pzL1Z1ZS9NYXNrLnZ1ZSc7XHJcbiAgICogQGV4YW1wbGVcclxuICAgKiAgICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAqICAgICAgICByZXR1cm4ge1xyXG4gICAqICAgICAgICAgICAgbWFzazogZmFsc2VcclxuICAgKiAgICAgICAgfVxyXG4gICAqICAgICB9LFxyXG4gICAqICAgICBjb21wb25lbnRzOiB7XHJcbiAgICogICAgICBtYXNrVnVlOiBNYXNrVnVlXHJcbiAgICogICAgIH1cclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIDxtYXNrLXZ1ZSA6bWFzaz1cIm1hc2tcIj5TZW5kaW5nIEVtYWlsLi4uPC9tYXNrLXZ1ZT5cclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIHRoaXMubWFzayA9IHRydWU7ICAvLyBFbmFibGUgdGhlIG1hc2tcclxuICAgKiB0aGlzLm1hc2sgPSBmYWxzZTsgLy8gRGlzYWJsZSB0aGUgbWFza1xyXG4gICAqL1xyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgICAgcHJvcHM6IFsnbWFzayddLFxyXG4gICAgICBkYXRhOiBmdW5jdGlvbigpIHtcclxuICAgICAgXHRyZXR1cm4ge1xyXG4gICAgICBcdFx0c2xvdERlbGF5OiB0cnVlLFxyXG4gICAgICAgICAgdGltZXI6IG51bGxcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHdhdGNoOiB7XHJcbiAgICAgIFx0bWFzazogZnVuY3Rpb24oKSB7XHJcbiAgICAgIFx0XHRpZih0aGlzLnRpbWVyICE9PSBudWxsKSB7XHJcbiAgICAgIFx0XHRcdGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgICAgXHRcdFx0dGhpcy50aW1lciA9IG51bGw7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy5zbG90RGVsYXkgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIFx0dGhpcy5zbG90RGVsYXkgPSB0cnVlO1xyXG4gICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBjb21wdXRlZDoge1xyXG4gICAgICAgICAgbWFza0NsYXNzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXNrID8gJ2NsLW1hc2sgbWFzaycgOiAnY2wtbWFzaydcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+IiwiPHNjcmlwdD5cclxuXHQvKipcclxuICAgKiBCYXNlIGNvbXBvbmVudCBmb3IgcGFnZXMuXHJcbiAgICogQGNvbnN0cnVjdG9yIFBhZ2VWdWVCYXNlXHJcbiAgICovXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG5cdCAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAqIFNpdGUgb2JqZWN0XHJcbiAgICAgICAgICAgICAgICogQG1lbWJlcm9mIFBhZ2VWdWVCYXNlXHJcbiAgICAgICAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICogQG1lbWJlciB7U2l0ZX0gc2l0ZVxyXG4gICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgIHNpdGU6IFNpdGUsXHJcblx0ICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICogU2l0ZSByb290IHBhdGggKFNpdGUucm9vdClcclxuICAgICAgICAgICAgICAgKiBAbWVtYmVyb2YgUGFnZVZ1ZUJhc2VcclxuICAgICAgICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IHJvb3RcclxuICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICByb290OiBTaXRlLnJvb3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG5cdCAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBTZXQgdGhlIHBhZ2UgdGl0bGVcclxuICAgICAgICAgICAqIEBtZW1iZXJvZiBQYWdlVnVlQmFzZVxyXG4gICAgICAgICAgICogQGluc3RhbmNlXHJcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcclxuXHQgICAgICAgICAqL1xyXG4gICAgICAgICAgIHNldFRpdGxlKHRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuc2V0VGl0bGUodGl0bGUpO1xyXG4gICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgc2V0TWVudTogZnVuY3Rpb24obWVudSkge1xyXG5cdCAgICAgICAgICAgdGhpcy4kcGFyZW50LnNldE1lbnUobWVudSk7XHJcbiAgICAgICAgICAgfSxcclxuICAgICAgICAgICBnZXRNZW51OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICBcdCByZXR1cm4gdGhpcy4kcGFyZW50LmdldE1lbnUoKTtcclxuICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIGNsZWFyTWVudSgpIHtcclxuICAgICAgICAgICBcdCAgdGhpcy5zZXRNZW51KFtdKTtcclxuICAgICAgICAgICB9LFxyXG5cdCAgICAgICAgIC8qKlxyXG5cdCAgICAgICAgICAqIEFkZCBhbiBvcHRpb24gdG8gdGhlIG5hdjIgbWVudS5cclxuXHQgICAgICAgICAgKiBAcGFyYW0gdGl0bGUgVGl0bGUgb2YgdGhlIG9wdGlvbiB0byBhZGQuXHJcblx0ICAgICAgICAgICogQHBhcmFtIGNsb3N1cmUgRnVuY3Rpb24gdG8gY2FsbCB3aGVuIHNlbGVjdGVkLlxyXG5cdCAgICAgICAgICAqL1xyXG5cdCAgICAgICAgIGFkZE1lbnUodGl0bGUsIGNsb3N1cmUpIHtcclxuXHRcdCAgICAgICAgIGxldCBtZW51ID0gdGhpcy5nZXRNZW51KCk7XHJcblx0XHQgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBjbGljazogY2xvc3VyZVxyXG4gICAgICAgICAgICAgfSk7XHJcblx0XHQgICAgICAgICB0aGlzLnNldE1lbnUobWVudSk7XHJcblx0ICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImZldGNoaW5nXCIgdi1pZj1cImRlbGF5ZWRGZXRjaGluZ1wiPlxyXG4gICAgICA8cD5GZXRjaGluZyBmcm9tIHNlcnZlci4uLjwvcD5cclxuICAgIDwvZGl2PlxyXG4gICAgPHNsb3Qgdi1pZj1cIihmZXRjaGVyID09PSBudWxsIHx8ICFmZXRjaGVyLmZldGNoaW5nKSAmJiAhZmV0Y2hpbmdcIj48L3Nsb3Q+XHJcbiAgICA8cCBjbGFzcz1cIm1vcmVcIiB2LWlmPVwiZmV0Y2hlciAhPT0gbnVsbCAmJiBmZXRjaGVyLm1vcmVcIj48YnV0dG9uIEBjbGljay5wcmV2ZW50PVwiZmV0Y2hNb3JlXCI+TU9SRTwvYnV0dG9uPjwvcD5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgLyoqXHJcbiAgICogQGZpbGVcclxuICAgKiBGZXRjaGVyIGNvbXBvbmVudCBkaXNwbGF5cyBcIkZldGNoaW5nXCIgYW5kIGEgXCJtb3JlXCIgYnV0dG9uLlxyXG4gICAqL1xyXG5cclxuICAvKipcclxuICAgKiBGZXRjaGVyIGZ1bmN0aW9uIHVzZWQgdG8gdXBkYXRlIHRoaXMgb2JqZWN0LlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIGV4cG9ydCBsZXQgRmV0Y2hlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLm1vcmUgPSBmYWxzZTsgICAgICAgLy8gSW5kaWNhdGVzIHRoZXJlIGlzIG1vcmUgdG8gZmV0Y2hcclxuICAgICAgdGhpcy5mZXRjaGluZyA9IGZhbHNlOyAgLy8gU2V0IHRydWUgd2hpbGUgd2UgYXJlIGZldGNoaW5nXHJcbiAgICAgIHRoaXMuZmV0Y2hlZCA9IGZhbHNlOyAgIC8vIFNldCB0cnVlIHdoZW4gd2UgaGF2ZSBmZXRjaGVkIHNvbWV0aGluZy4uLlxyXG5cclxuICAgICAgdGhpcy5zdGFydCA9IGZ1bmN0aW9uKHNpbmdsZSkge1xyXG4gICAgICAgICAgdGhpcy5mZXRjaGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgaWYoc2luZ2xlICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5tb3JlID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZG9uZSA9IGZ1bmN0aW9uKHNpbmdsZSkge1xyXG4gICAgICAgICAgdGhpcy5mZXRjaGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgIGlmKHNpbmdsZSAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuZmV0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHRoaXMubW9yZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5mZXRjaGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5mZXRjaGVkID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgICBwcm9wczoge1xyXG4gICAgICAgIGZldGNoZXI6IHtcclxuICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZldGNoaW5nOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB3YXRjaDoge1xyXG4gICAgICAgICAgJ2ZldGNoZXIuZmV0Y2hpbmcnOiBmdW5jdGlvbih0bywgZnJvbSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuc2V0RmV0Y2hpbmcoKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZldGNoaW5nOiBmdW5jdGlvbih0bywgZnJvbSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuc2V0RmV0Y2hpbmcoKVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBkYXRhOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgc2hvd0ZldGNoaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICBkZWxheWVkRmV0Y2hpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIHRpbWVyOiBudWxsXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgICAgICB0aGlzLnNldEZldGNoaW5nKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgIGZldGNoTW9yZSgpIHtcclxuICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZmV0Y2hNb3JlKCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2V0RmV0Y2hpbmcoKSB7XHJcbiAgICAgICAgICAgICAgLy8gQXJlIHdlIGN1cnJlbnRseSBmZXRjaGluZz9cclxuICAgICAgICAgICAgICBsZXQgc2hvd0ZldGNoaW5nID0gKHRoaXMuZmV0Y2hlciAhPT0gbnVsbCAmJiB0aGlzLmZldGNoZXIuZmV0Y2hpbmcpIHx8IHRoaXMuZmV0Y2hpbmc7XHJcbiAgICAgICAgICAgICAgaWYoc2hvd0ZldGNoaW5nICYmICF0aGlzLnNob3dGZXRjaGluZykge1xyXG4gICAgICAgICAgICAgICAgICAvLyBGZXRjaGluZyBpcyBiZWNvbWluZyBhY3RpdmVcclxuICAgICAgICAgICAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheWVkRmV0Y2hpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZighc2hvd0ZldGNoaW5nICYmIHRoaXMuc2hvd0ZldGNoaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50aW1lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheWVkRmV0Y2hpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdGhpcy5zaG93RmV0Y2hpbmcgPSBzaG93RmV0Y2hpbmc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICB9O1xyXG5cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XHJcblxyXG5AaW1wb3J0ICcuLi8uLi8uLi9zaXRlL3Nhc3MvbW9kdWxlcy9fY29sb3JzJztcclxuXHJcbmRpdi5mZXRjaGluZyB7XHJcbiAgaGVpZ2h0OiAyOHB4O1xyXG4gIG1hcmdpbjogMWVtIDA7XHJcblxyXG4gIHAge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgY29sb3I6ICRjb21wO1xyXG4gICAgcGFkZGluZy10b3A6IDJweDtcclxuICB9XHJcbn1cclxuXHJcbi5tb3JlIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gIGJ1dHRvbiB7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgaGVpZ2h0OiAyOHB4O1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gIH1cclxufVxyXG5cclxuPC9zdHlsZT4iLCI8IS0tXHJcbkBmaWxlXHJcbkJhc2UgY29tcG9uZW50IGZvciBwYWdlcyB0aGF0IGluY2x1ZGVzIHN1cHBvcnQgZm9yIHRoaXMudXNlclxyXG5cclxuUHJvdmlkZXM6XHJcbnNldFRpdGxlXHJcbnRoaXMucm9vdFxyXG4tLT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgICBpbXBvcnQgUGFnZVZ1ZUJhc2UgZnJvbSAnc2l0ZS1jbC9qcy9WdWUvUGFnZVZ1ZUJhc2UudnVlJztcclxuXHJcbiAgICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICAgICAgJ2V4dGVuZHMnOiBQYWdlVnVlQmFzZSxcclxuICAgICAgICBjb21wdXRlZDoge1xyXG4gICAgICAgIFx0dXNlcigpIHtcclxuICAgICAgICBcdFx0cmV0dXJuICB0aGlzLiRzdG9yZS5zdGF0ZS51c2VyLnVzZXJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbjwvc2NyaXB0PiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiZGl2LmNsLXJldmlld2luZyB0ZC5jbC1lbXB0eSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThmN2YzO1xcbn1cXG5cXG5wLmNsLXJldmlld3Mtbm9uZSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogIzAwNzIzZjtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuXFxuZGl2LmNsLXJldmlld3MgaDMge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZDogIzAwNzIzZjtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuZGl2LmNsLXJldmlldyB7XFxuICBtYXJnaW46IDFlbSAwO1xcbn1cXG5cXG5kaXYuY2wtcmV2aWV3IGgzIHtcXG4gIGZvbnQtc2l6ZTogMC44NWVtO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgY29sb3I6ICMwMDcyM2Y7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzAwNzIzZjtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcblxcbmRpdi5jbC1yZXZpZXcgaDMgc3Bhbi5jbC1zdWJtaXR0ZWQge1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgY29sb3I6ICMwMDkwOWU7XFxuICBmb250LXNpemU6IDAuOWVtO1xcbn1cXG5cXG5kaXYuY2wtcmV2aWV3IGgzLnN0YWZmIHtcXG4gIGNvbG9yOiByZWQ7XFxufVxcblxcbmRpdi5jbC1yZXZpZXcgcHJlIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJkaXYuY2wtZWRpdG9yIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1pbi1oZWlnaHQ6IDVlbTtcXG4gIGhlaWdodDogMTBlbTtcXG4gIHBhZGRpbmc6IDA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgbWFyZ2luOiAxZW0gMDtcXG59XFxuXFxuZGl2LmNsLWVkaXRvciB0ZXh0YXJlYSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgcmVzaXplOiBub25lO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbmRpdi5mZXRjaGluZ1tkYXRhLXYtNDNiMjZiY2JdIHtcXG4gIGhlaWdodDogMjhweDtcXG4gIG1hcmdpbjogMWVtIDA7XFxufVxcbmRpdi5mZXRjaGluZyBwW2RhdGEtdi00M2IyNmJjYl0ge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgY29sb3I6ICNjNDE0MjU7XFxuICBwYWRkaW5nLXRvcDogMnB4O1xcbn1cXG4ubW9yZVtkYXRhLXYtNDNiMjZiY2JdIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuLm1vcmUgYnV0dG9uW2RhdGEtdi00M2IyNmJjYl0ge1xcbiAgZm9udC1zaXplOiAwLjhlbTtcXG4gIGhlaWdodDogMjhweDtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwidmFyIG1hcCA9IHtcblx0XCIuL2FmXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hZi5qc1wiLFxuXHRcIi4vYWYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FmLmpzXCIsXG5cdFwiLi9hclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIuanNcIixcblx0XCIuL2FyLWR6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1kei5qc1wiLFxuXHRcIi4vYXItZHouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWR6LmpzXCIsXG5cdFwiLi9hci1rd1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIta3cuanNcIixcblx0XCIuL2FyLWt3LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1rdy5qc1wiLFxuXHRcIi4vYXItbHlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWx5LmpzXCIsXG5cdFwiLi9hci1seS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbHkuanNcIixcblx0XCIuL2FyLW1hXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1tYS5qc1wiLFxuXHRcIi4vYXItbWEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLW1hLmpzXCIsXG5cdFwiLi9hci1zYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItc2EuanNcIixcblx0XCIuL2FyLXNhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1zYS5qc1wiLFxuXHRcIi4vYXItdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXRuLmpzXCIsXG5cdFwiLi9hci10bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItdG4uanNcIixcblx0XCIuL2FyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci5qc1wiLFxuXHRcIi4vYXpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2F6LmpzXCIsXG5cdFwiLi9hei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXouanNcIixcblx0XCIuL2JlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZS5qc1wiLFxuXHRcIi4vYmUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JlLmpzXCIsXG5cdFwiLi9iZ1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmcuanNcIixcblx0XCIuL2JnLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZy5qc1wiLFxuXHRcIi4vYm1cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JtLmpzXCIsXG5cdFwiLi9ibS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm0uanNcIixcblx0XCIuL2JuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibi5qc1wiLFxuXHRcIi4vYm4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JuLmpzXCIsXG5cdFwiLi9ib1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm8uanNcIixcblx0XCIuL2JvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iby5qc1wiLFxuXHRcIi4vYnJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JyLmpzXCIsXG5cdFwiLi9ici5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnIuanNcIixcblx0XCIuL2JzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9icy5qc1wiLFxuXHRcIi4vYnMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JzLmpzXCIsXG5cdFwiLi9jYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY2EuanNcIixcblx0XCIuL2NhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jYS5qc1wiLFxuXHRcIi4vY3NcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NzLmpzXCIsXG5cdFwiLi9jcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3MuanNcIixcblx0XCIuL2N2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jdi5qc1wiLFxuXHRcIi4vY3YuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N2LmpzXCIsXG5cdFwiLi9jeVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3kuanNcIixcblx0XCIuL2N5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jeS5qc1wiLFxuXHRcIi4vZGFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RhLmpzXCIsXG5cdFwiLi9kYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGEuanNcIixcblx0XCIuL2RlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS5qc1wiLFxuXHRcIi4vZGUtYXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWF0LmpzXCIsXG5cdFwiLi9kZS1hdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtYXQuanNcIixcblx0XCIuL2RlLWNoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1jaC5qc1wiLFxuXHRcIi4vZGUtY2guanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWNoLmpzXCIsXG5cdFwiLi9kZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUuanNcIixcblx0XCIuL2R2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kdi5qc1wiLFxuXHRcIi4vZHYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2R2LmpzXCIsXG5cdFwiLi9lbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZWwuanNcIixcblx0XCIuL2VsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbC5qc1wiLFxuXHRcIi4vZW4tYXVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWF1LmpzXCIsXG5cdFwiLi9lbi1hdS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tYXUuanNcIixcblx0XCIuL2VuLWNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1jYS5qc1wiLFxuXHRcIi4vZW4tY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWNhLmpzXCIsXG5cdFwiLi9lbi1nYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tZ2IuanNcIixcblx0XCIuL2VuLWdiLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4taWVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWllLmpzXCIsXG5cdFwiLi9lbi1pZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWUuanNcIixcblx0XCIuL2VuLWlsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pbC5qc1wiLFxuXHRcIi4vZW4taWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWlsLmpzXCIsXG5cdFwiLi9lbi1uelwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tbnouanNcIixcblx0XCIuL2VuLW56LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VvLmpzXCIsXG5cdFwiLi9lby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW8uanNcIixcblx0XCIuL2VzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXMtZG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLWRvLmpzXCIsXG5cdFwiLi9lcy1kby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtZG8uanNcIixcblx0XCIuL2VzLXVzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy11cy5qc1wiLFxuXHRcIi4vZXMtdXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLXVzLmpzXCIsXG5cdFwiLi9lcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMuanNcIixcblx0XCIuL2V0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldC5qc1wiLFxuXHRcIi4vZXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V0LmpzXCIsXG5cdFwiLi9ldVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXUuanNcIixcblx0XCIuL2V1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZmFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZhLmpzXCIsXG5cdFwiLi9mYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmEuanNcIixcblx0XCIuL2ZpXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9maS5qc1wiLFxuXHRcIi4vZmkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZpLmpzXCIsXG5cdFwiLi9mb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZm8uanNcIixcblx0XCIuL2ZvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZnJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLmpzXCIsXG5cdFwiLi9mci1jYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2EuanNcIixcblx0XCIuL2ZyLWNhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNoLmpzXCIsXG5cdFwiLi9mci1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2guanNcIixcblx0XCIuL2ZyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci5qc1wiLFxuXHRcIi4vZnlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2Z5LmpzXCIsXG5cdFwiLi9meS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnkuanNcIixcblx0XCIuL2dkXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nZC5qc1wiLFxuXHRcIi4vZ2QuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dkLmpzXCIsXG5cdFwiLi9nbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2wuanNcIixcblx0XCIuL2dsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nbC5qc1wiLFxuXHRcIi4vZ29tLWxhdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dvbS1sYXRuLmpzXCIsXG5cdFwiLi9nb20tbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ29tLWxhdG4uanNcIixcblx0XCIuL2d1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ndS5qc1wiLFxuXHRcIi4vZ3UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2d1LmpzXCIsXG5cdFwiLi9oZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGUuanNcIixcblx0XCIuL2hlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oZS5qc1wiLFxuXHRcIi4vaGlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hpLmpzXCIsXG5cdFwiLi9oaS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGkuanNcIixcblx0XCIuL2hyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oci5qc1wiLFxuXHRcIi4vaHIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hyLmpzXCIsXG5cdFwiLi9odVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHUuanNcIixcblx0XCIuL2h1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9odS5qc1wiLFxuXHRcIi4vaHktYW1cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h5LWFtLmpzXCIsXG5cdFwiLi9oeS1hbS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHktYW0uanNcIixcblx0XCIuL2lkXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pZC5qc1wiLFxuXHRcIi4vaWQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lkLmpzXCIsXG5cdFwiLi9pc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXMuanNcIixcblx0XCIuL2lzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pcy5qc1wiLFxuXHRcIi4vaXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2l0LmpzXCIsXG5cdFwiLi9pdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQuanNcIixcblx0XCIuL2phXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qYS5qc1wiLFxuXHRcIi4vamEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2phLmpzXCIsXG5cdFwiLi9qdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvanYuanNcIixcblx0XCIuL2p2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qdi5qc1wiLFxuXHRcIi4va2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2thLmpzXCIsXG5cdFwiLi9rYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2EuanNcIixcblx0XCIuL2trXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ray5qc1wiLFxuXHRcIi4va2suanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2trLmpzXCIsXG5cdFwiLi9rbVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva20uanNcIixcblx0XCIuL2ttLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbS5qc1wiLFxuXHRcIi4va25cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tuLmpzXCIsXG5cdFwiLi9rbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva24uanNcIixcblx0XCIuL2tvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rby5qc1wiLFxuXHRcIi4va28uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tvLmpzXCIsXG5cdFwiLi9reVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva3kuanNcIixcblx0XCIuL2t5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4vbGJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xiLmpzXCIsXG5cdFwiLi9sYi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbGIuanNcIixcblx0XCIuL2xvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sby5qc1wiLFxuXHRcIi4vbG8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xvLmpzXCIsXG5cdFwiLi9sdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHQuanNcIixcblx0XCIuL2x0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x2LmpzXCIsXG5cdFwiLi9sdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHYuanNcIixcblx0XCIuL21lXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tZS5qc1wiLFxuXHRcIi4vbWUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21lLmpzXCIsXG5cdFwiLi9taVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWkuanNcIixcblx0XCIuL21pLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21rLmpzXCIsXG5cdFwiLi9tay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWsuanNcIixcblx0XCIuL21sXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbC5qc1wiLFxuXHRcIi4vbWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21sLmpzXCIsXG5cdFwiLi9tblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbW4uanNcIixcblx0XCIuL21uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21yLmpzXCIsXG5cdFwiLi9tci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXIuanNcIixcblx0XCIuL21zXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy5qc1wiLFxuXHRcIi4vbXMtbXlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLW15LmpzXCIsXG5cdFwiLi9tcy1teS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMtbXkuanNcIixcblx0XCIuL21zLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy5qc1wiLFxuXHRcIi4vbXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL210LmpzXCIsXG5cdFwiLi9tdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXQuanNcIixcblx0XCIuL215XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9teS5qc1wiLFxuXHRcIi4vbXkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL215LmpzXCIsXG5cdFwiLi9uYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmIuanNcIixcblx0XCIuL25iLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25lLmpzXCIsXG5cdFwiLi9uZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmUuanNcIixcblx0XCIuL25sXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC5qc1wiLFxuXHRcIi4vbmwtYmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLWJlLmpzXCIsXG5cdFwiLi9ubC1iZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwtYmUuanNcIixcblx0XCIuL25sLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC5qc1wiLFxuXHRcIi4vbm5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25uLmpzXCIsXG5cdFwiLi9ubi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbm4uanNcIixcblx0XCIuL3BhLWluXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wYS1pbi5qc1wiLFxuXHRcIi4vcGEtaW4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BhLWluLmpzXCIsXG5cdFwiLi9wbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGwuanNcIixcblx0XCIuL3BsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcHRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LmpzXCIsXG5cdFwiLi9wdC1iclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQtYnIuanNcIixcblx0XCIuL3B0LWJyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LmpzXCIsXG5cdFwiLi9yb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcm8uanNcIixcblx0XCIuL3JvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcnVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3J1LmpzXCIsXG5cdFwiLi9ydS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcnUuanNcIixcblx0XCIuL3NkXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZC5qc1wiLFxuXHRcIi4vc2QuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NkLmpzXCIsXG5cdFwiLi9zZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2UuanNcIixcblx0XCIuL3NlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2lcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NpLmpzXCIsXG5cdFwiLi9zaS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2kuanNcIixcblx0XCIuL3NrXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zay5qc1wiLFxuXHRcIi4vc2suanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NrLmpzXCIsXG5cdFwiLi9zbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2wuanNcIixcblx0XCIuL3NsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc3FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NxLmpzXCIsXG5cdFwiLi9zcS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3EuanNcIixcblx0XCIuL3NyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci5qc1wiLFxuXHRcIi4vc3ItY3lybFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3ItY3lybC5qc1wiLFxuXHRcIi4vc3ItY3lybC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3ItY3lybC5qc1wiLFxuXHRcIi4vc3IuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3MuanNcIixcblx0XCIuL3NzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcy5qc1wiLFxuXHRcIi4vc3ZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N2LmpzXCIsXG5cdFwiLi9zdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3YuanNcIixcblx0XCIuL3N3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdy5qc1wiLFxuXHRcIi4vc3cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi90YVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGEuanNcIixcblx0XCIuL3RhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90YS5qc1wiLFxuXHRcIi4vdGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RlLmpzXCIsXG5cdFwiLi90ZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGUuanNcIixcblx0XCIuL3RldFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGV0LmpzXCIsXG5cdFwiLi90ZXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RldC5qc1wiLFxuXHRcIi4vdGdcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RnLmpzXCIsXG5cdFwiLi90Zy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGcuanNcIixcblx0XCIuL3RoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90aC5qc1wiLFxuXHRcIi4vdGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RoLmpzXCIsXG5cdFwiLi90bC1waFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGwtcGguanNcIixcblx0XCIuL3RsLXBoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGxoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RsaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGxoLmpzXCIsXG5cdFwiLi90clwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHIuanNcIixcblx0XCIuL3RyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ci5qc1wiLFxuXHRcIi4vdHpsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90emwuanNcIixcblx0XCIuL3R6bC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHpsLmpzXCIsXG5cdFwiLi90em1cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS5qc1wiLFxuXHRcIi4vdHptLWxhdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS1sYXRuLmpzXCIsXG5cdFwiLi90em0tbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLmpzXCIsXG5cdFwiLi91Zy1jblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWctY24uanNcIixcblx0XCIuL3VnLWNuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VrLmpzXCIsXG5cdFwiLi91ay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWsuanNcIixcblx0XCIuL3VyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ci5qc1wiLFxuXHRcIi4vdXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VyLmpzXCIsXG5cdFwiLi91elwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXouanNcIixcblx0XCIuL3V6LWxhdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LWxhdG4uanNcIixcblx0XCIuL3V6LWxhdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LWxhdG4uanNcIixcblx0XCIuL3V6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdmlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3ZpLmpzXCIsXG5cdFwiLi92aS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdmkuanNcIixcblx0XCIuL3gtcHNldWRvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS94LXBzZXVkby5qc1wiLFxuXHRcIi4veC1wc2V1ZG8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi95b1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveW8uanNcIixcblx0XCIuL3lvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS95by5qc1wiLFxuXHRcIi4vemgtY25cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWNuLmpzXCIsXG5cdFwiLi96aC1jbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtY24uanNcIixcblx0XCIuL3poLWhrXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1oay5qc1wiLFxuXHRcIi4vemgtaGsuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC10d1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtdHcuanNcIixcblx0XCIuL3poLXR3LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC10dy5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSB7IC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBpZDtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUgc3luYyByZWN1cnNpdmUgXlxcXFwuXFxcXC8uKiRcIjsiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgW1xuICAgICAgX2MoXCJsYWJlbFwiLCB7IHJlZjogXCJzdHVkZW50cy1vbmx5XCIsIHN0YXRpY1N0eWxlOiB7IGRpc3BsYXk6IFwibm9uZVwiIH0gfSwgW1xuICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgIHZhbHVlOiBfdm0uc3R1ZGVudHMsXG4gICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic3R1ZGVudHNcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJjaGVja2JveFwiIH0sXG4gICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IEFycmF5LmlzQXJyYXkoX3ZtLnN0dWRlbnRzKVxuICAgICAgICAgICAgICA/IF92bS5faShfdm0uc3R1ZGVudHMsIG51bGwpID4gLTFcbiAgICAgICAgICAgICAgOiBfdm0uc3R1ZGVudHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICBjaGFuZ2U6IFtcbiAgICAgICAgICAgICAgZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyICQkYSA9IF92bS5zdHVkZW50cyxcbiAgICAgICAgICAgICAgICAgICQkZWwgPSAkZXZlbnQudGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgJCRjID0gJCRlbC5jaGVja2VkID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoJCRhKSkge1xuICAgICAgICAgICAgICAgICAgdmFyICQkdiA9IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICQkaSA9IF92bS5faSgkJGEsICQkdilcbiAgICAgICAgICAgICAgICAgIGlmICgkJGVsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgJCRpIDwgMCAmJiAoX3ZtLnN0dWRlbnRzID0gJCRhLmNvbmNhdChbJCR2XSkpXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkJGkgPiAtMSAmJlxuICAgICAgICAgICAgICAgICAgICAgIChfdm0uc3R1ZGVudHMgPSAkJGFcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCAkJGkpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KCQkYS5zbGljZSgkJGkgKyAxKSkpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIF92bS5zdHVkZW50cyA9ICQkY1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgX3ZtLnN0dWRlbnRzT25seUNoYW5nZWRcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBfdm0uX3YoXCIgU3R1ZGVudHMgT25seVwiKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwiZmV0Y2hlclwiLFxuICAgICAgICB7IGF0dHJzOiB7IGZldGNoZXI6IF92bS5mZXRjaGVyLCBmZXRjaGluZzogX3ZtLmZldGNoaW5nIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF92bS5fdChcImRlZmF1bHRcIiwgbnVsbCwgeyB1c2VyczogX3ZtLnVzZXJzLCBzdHVkZW50czogX3ZtLnN0dWRlbnRzIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX3ZtLnVzZXJzLmxlbmd0aCA9PSAwXG4gICAgICAgICAgICA/IF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcImNlbnRlcmJveCBjb21wIGNlbnRlclwiIH0sIFtcbiAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgVGhlcmUgYXJlIGN1cnJlbnRseSBubyBtZW1iZXJzIGVucm9sbGVkIGluIHRoaXMgc2VjdGlvbi5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgXSxcbiAgICAgICAgMlxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbnRlbnRcIiB9LCBbXG4gICAgX2MoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBzdGF0aWNDbGFzczogXCJmdWxsIGNsLXJldmlld2luZ1wiIH0sXG4gICAgICBbXG4gICAgICAgIF9jKFwibWFzay12dWVcIiwgeyBhdHRyczogeyBtYXNrOiBfdm0ubWFzayB9IH0sIFtcbiAgICAgICAgICBfdm0uX3YoXCJDb21tdW5pY2F0aW5nIHdpdGggc2VydmVyLi4uXCIpXG4gICAgICAgIF0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcIm1lbWJlcnNmZXRjaGVyXCIsIHtcbiAgICAgICAgICBhdHRyczogeyBmZXRjaGluZzogX3ZtLnJldmlld2luZyA9PT0gbnVsbCB9LFxuICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBrZXk6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICBmbjogZnVuY3Rpb24oZmV0Y2hlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICBfdm0ucmV2aWV3aW5nICE9PSBudWxsICYmIF92bS51c2VyLmF0TGVhc3QoX3ZtLmluc3RydWN0b3IpXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgbWV0aG9kOiBcInBvc3RcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJtaXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmFzc2lnblJldmlld3MoJGV2ZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcImNlbnRlclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiYnV0dG9uXCIsIHsgYXR0cnM6IHsgdHlwZTogXCJzdWJtaXRcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiQXNzaWduIFJldmlld3NcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnJldmlld2VyQ250LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInJldmlld2VyQ250XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJCRzZWxlY3RlZFZhbCA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbCgkZXZlbnQudGFyZ2V0Lm9wdGlvbnMsIGZ1bmN0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG8uc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24obykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX3ZhbHVlXCIgaW4gbyA/IG8uX3ZhbHVlIDogby52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5yZXZpZXdlckNudCA9ICRldmVudC50YXJnZXQubXVsdGlwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICQkc2VsZWN0ZWRWYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICQkc2VsZWN0ZWRWYWxbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbCg2LCBmdW5jdGlvbihudW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9wdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkb21Qcm9wczogeyB2YWx1ZTogbnVtIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKG51bSkpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfdm0ucmV2aWV3aW5nICE9PSBudWxsXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInNtYWxsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0clwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidGhcIiwgW192bS5fdihcIlVzZXJcIildKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLm1heFJldmlld2VyLCBmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcInRoXCIsIFtfdm0uX3YoXCJyZXZpZXdlZVwiKV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLm1heFJldmlld2VlLCBmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcInRoXCIsIFtfdm0uX3YoXCJyZXZpZXdlclwiKV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woZmV0Y2hlci51c2VycywgZnVuY3Rpb24odXNlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ0ZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJhXCIsIHsgYXR0cnM6IHsgdGl0bGU6IHVzZXIubmFtZSB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3ModXNlci51c2VySWQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLm1heFJldmlld2VyLCBmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogX3ZtLmNscyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ucmV2aWV3ZXJbdXNlci5tZW1iZXIuaWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgLSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZGlzcGxheShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaGVyLnVzZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5yZXZpZXdlclt1c2VyLm1lbWJlci5pZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAtIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLm1heFJldmlld2VlLCBmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogX3ZtLmNscyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ucmV2aWV3ZWVbdXNlci5tZW1iZXIuaWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgLSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZGlzcGxheShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaGVyLnVzZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5yZXZpZXdlZVt1c2VyLm1lbWJlci5pZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAtIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSlcbiAgICAgICAgfSlcbiAgICAgIF0sXG4gICAgICAxXG4gICAgKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImNsLXJldmlld3NcIiB9LFxuICAgIFtcbiAgICAgIF9jKFwiaDJcIiwgW192bS5fdihcIlN0YWZmIFJldmlld1wiKV0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImZvcm1cIixcbiAgICAgICAge1xuICAgICAgICAgIGF0dHJzOiB7IG1ldGhvZDogXCJwb3N0XCIgfSxcbiAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgc3VibWl0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgcmV0dXJuIF92bS5zdWJtaXQoJGV2ZW50KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW19jKFwiZGl2XCIsIHsgcmVmOiBcImVkaXRvclwiIH0pLCBfdm0uX3YoXCIgXCIpLCBfdm0uX20oMCldXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiaDNcIiwgW192bS5fdihcIlJldmlld3MgYnkgdGhpcyB1c2VyLlwiKV0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5ieVJldmlld3MubGVuZ3RoID09PSAwXG4gICAgICAgID8gX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2VudGVyXCIgfSwgW192bS5fdihcIk5vbmVcIildKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5fbChfdm0uYnlSZXZpZXdzLCBmdW5jdGlvbihyZXZpZXcpIHtcbiAgICAgICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtcmV2aWV3XCIgfSwgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJoM1wiLFxuICAgICAgICAgICAgeyBjbGFzczogcmV2aWV3LnJldmlld2VlLmF0TGVhc3QoX3ZtLnN0YWZmUm9sZSkgPyBcInN0YWZmXCIgOiBcIlwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmZvcm1hdFRpbWUocmV2aWV3LnRpbWUpKSArXG4gICAgICAgICAgICAgICAgICBcIiBSZXZpZXcgYnkgXCIgK1xuICAgICAgICAgICAgICAgICAgX3ZtLl9zKHJldmlldy5yZXZpZXdlZS5uYW1lKSArXG4gICAgICAgICAgICAgICAgICBcIlxcbiAgICAgIFwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXN1Ym1pdHRlZFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5zaG93U3VibWlzc2lvbnMocmV2aWV3KSkpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwicHJlXCIsIFtfdm0uX3YoX3ZtLl9zKHJldmlldy5tZXRhLnJldmlldy5yZXZpZXcpKV0pXG4gICAgICAgIF0pXG4gICAgICB9KSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImgzXCIsIFtfdm0uX3YoXCJSZXZpZXdzIG9mIHRoaXMgdXNlcidzIGFzc2lnbm1lbnQuXCIpXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmZvclJldmlld3MubGVuZ3RoID09PSAwXG4gICAgICAgID8gX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2VudGVyXCIgfSwgW192bS5fdihcIk5vbmVcIildKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5fbChfdm0uZm9yUmV2aWV3cywgZnVuY3Rpb24ocmV2aWV3KSB7XG4gICAgICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXJldmlld1wiIH0sIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiaDNcIixcbiAgICAgICAgICAgIHsgY2xhc3M6IHJldmlldy5yZXZpZXdlci5hdExlYXN0KF92bS5zdGFmZlJvbGUpID8gXCJzdGFmZlwiIDogXCJcIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5mb3JtYXRUaW1lKHJldmlldy50aW1lKSkgKyBcIlxcbiAgICAgIFwiKSxcbiAgICAgICAgICAgICAgcmV2aWV3LnJldmlld2VyLmF0TGVhc3QoX3ZtLnN0YWZmUm9sZSlcbiAgICAgICAgICAgICAgICA/IF9jKFwic3BhblwiLCBbX3ZtLl92KFwiU3RhZmYgUmV2aWV3XCIpXSlcbiAgICAgICAgICAgICAgICA6IF9jKFwic3BhblwiLCBbX3ZtLl92KFwiUmV2aWV3XCIpXSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBieSBcIiArIF92bS5fcyhyZXZpZXcucmV2aWV3ZXIubmFtZSkgKyBcIlxcbiAgICAgIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtc3VibWl0dGVkXCIgfSwgW1xuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLnNob3dTdWJtaXNzaW9ucyhyZXZpZXcpKSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJwcmVcIiwgW192bS5fdihfdm0uX3MocmV2aWV3Lm1ldGEucmV2aWV3LnJldmlldykpXSlcbiAgICAgICAgXSlcbiAgICAgIH0pXG4gICAgXSxcbiAgICAyXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwicFwiLCBbXG4gICAgICBfYyhcImlucHV0XCIsIHsgYXR0cnM6IHsgdHlwZTogXCJzdWJtaXRcIiwgdmFsdWU6IFwiU3VibWl0IFJldmlld1wiIH0gfSlcbiAgICBdKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250ZW50XCIgfSwgW1xuICAgIF9jKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZnVsbFwiIH0sXG4gICAgICBbXG4gICAgICAgIF92bS5fbChfdm0uanNvbi5zdWJtaXNzaW9ucywgZnVuY3Rpb24oc3VibWlzc2lvbikge1xuICAgICAgICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXN1Ym1pc3Npb24tdmlld1wiIH0sIFtcbiAgICAgICAgICAgIF9jKFwiaDJcIiwgW192bS5fdihfdm0uX3Moc3VibWlzc2lvbi5uYW1lKSldKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBzdWJtaXNzaW9uLnR5cGUgPT09IFwidGV4dFwiXG4gICAgICAgICAgICAgID8gX2MoXCJwcmVcIiwgeyBzdGF0aWNDbGFzczogXCJjbC1wcmV2aWV3IHllbGxvdy1wYWRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKHN1Ym1pc3Npb24udGV4dCkpXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBzdWJtaXNzaW9uLnR5cGUgPT09IFwiaW1hZ2VcIlxuICAgICAgICAgICAgICA/IF9jKFwiZmlndXJlXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtcHJldmlld1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiaW1nXCIsIHsgYXR0cnM6IHsgc3JjOiBfdm0ucHJldmlld0ltZyhzdWJtaXNzaW9uKSB9IH0pXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJjbC1wcmV2aWV3LXRpbWVcIiB9LCBbXG4gICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLmZvcm1hdFRpbWUoc3VibWlzc2lvbi5kYXRlKSkpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF0pXG4gICAgICAgIH0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcImgyXCIsIFtfdm0uX3YoXCJSZXZpZXdcIildKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJmb3JtXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgYXR0cnM6IHsgbWV0aG9kOiBcInBvc3RcIiB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgc3VibWl0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc3VibWl0KCRldmVudClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyByZWY6IFwiZWRpdG9yXCIsIHN0YXRpY0NsYXNzOiBcInNoYWRvd1wiIH0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF92bS5fbSgwKVxuICAgICAgICAgIF1cbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJoMlwiLCBbX3ZtLl92KFwiUHJldmlvdXMgUmV2aWV3c1wiKV0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfdm0ucmV2aWV3aW5nLmxlbmd0aCA9PT0gMFxuICAgICAgICAgID8gX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtcmV2aWV3cy1ub25lXCIgfSwgW1xuICAgICAgICAgICAgICBfdm0uX3YoXCIqKiogTm9uZSBZZXQgKioqXCIpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF92bS5fbChfdm0ucmV2aWV3aW5nLCBmdW5jdGlvbihyZXZpZXcpIHtcbiAgICAgICAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjbC1yZXZpZXdcIiB9LCBbXG4gICAgICAgICAgICBfYyhcImgzXCIsIFtcbiAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uZm9ybWF0VGltZShyZXZpZXcudGltZSkpICsgXCIgUmV2aWV3IGJ5IE1lXFxuICAgIFwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXN1Ym1pdHRlZFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5zaG93U3VibWlzc2lvbnMocmV2aWV3KSkpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcInByZVwiLCBbX3ZtLl92KF92bS5fcyhyZXZpZXcubWV0YS5yZXZpZXcucmV2aWV3KSldKVxuICAgICAgICAgIF0pXG4gICAgICAgIH0pXG4gICAgICBdLFxuICAgICAgMlxuICAgIClcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwicFwiLCBbXG4gICAgICBfYyhcImlucHV0XCIsIHsgYXR0cnM6IHsgdHlwZTogXCJzdWJtaXRcIiwgdmFsdWU6IFwiU3VibWl0IFJldmlld1wiIH0gfSlcbiAgICBdKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImNsLXJldmlld3NcIiB9LFxuICAgIFtcbiAgICAgIF9jKFwiaDNcIiwgW192bS5fdihcIlJldmlld3Mgb2YgdGhpcyBhc3NpZ25tZW50IGFwcGVhciBoZXJlLlwiKV0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5yZXZpZXdzLmxlbmd0aCA9PT0gMFxuICAgICAgICA/IF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXJldmlld3Mtbm9uZVwiIH0sIFtcbiAgICAgICAgICAgIF92bS5fdihcIioqKiBOb25lIFlldCAqKipcIilcbiAgICAgICAgICBdKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5fbChfdm0ucmV2aWV3cywgZnVuY3Rpb24ocmV2aWV3KSB7XG4gICAgICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXJldmlld1wiIH0sIFtcbiAgICAgICAgICBfYyhcImgzXCIsIHsgY2xhc3M6IHJldmlldy5yb2xlICE9PSB1bmRlZmluZWQgPyBcInN0YWZmXCIgOiBcIlwiIH0sIFtcbiAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLmZvcm1hdFRpbWUocmV2aWV3LnRpbWUpKSArIFwiXFxuICAgICAgXCIpLFxuICAgICAgICAgICAgcmV2aWV3LnJvbGUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICA/IF9jKFwic3BhblwiLCBbX3ZtLl92KFwiU3RhZmYgUmV2aWV3XCIpXSlcbiAgICAgICAgICAgICAgOiBfYyhcInNwYW5cIiwgW192bS5fdihcIlJldmlld1wiKV0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIGJ5IFwiICsgX3ZtLl9zKHJldmlldy5ieSkgKyBcIlxcbiAgICAgIFwiKSxcbiAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXN1Ym1pdHRlZFwiIH0sIFtcbiAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uc2hvd1N1Ym1pc3Npb25zKHJldmlldykpKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwicHJlXCIsIFtfdm0uX3YoX3ZtLl9zKHJldmlldy5yZXZpZXcpKV0pXG4gICAgICAgIF0pXG4gICAgICB9KVxuICAgIF0sXG4gICAgMlxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IGNsYXNzOiBfdm0ubWFza0NsYXNzIH0sIFtcbiAgICBfdm0uc2xvdERlbGF5ID8gX2MoXCJwXCIsIFtfdm0uX3QoXCJkZWZhdWx0XCIpXSwgMikgOiBfdm0uX2UoKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICBbXG4gICAgICBfdm0uZGVsYXllZEZldGNoaW5nXG4gICAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmZXRjaGluZ1wiIH0sIFtcbiAgICAgICAgICAgIF9jKFwicFwiLCBbX3ZtLl92KFwiRmV0Y2hpbmcgZnJvbSBzZXJ2ZXIuLi5cIildKVxuICAgICAgICAgIF0pXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgKF92bS5mZXRjaGVyID09PSBudWxsIHx8ICFfdm0uZmV0Y2hlci5mZXRjaGluZykgJiYgIV92bS5mZXRjaGluZ1xuICAgICAgICA/IF92bS5fdChcImRlZmF1bHRcIilcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uZmV0Y2hlciAhPT0gbnVsbCAmJiBfdm0uZmV0Y2hlci5tb3JlXG4gICAgICAgID8gX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwibW9yZVwiIH0sIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5mZXRjaE1vcmUoJGV2ZW50KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW192bS5fdihcIk1PUkVcIildXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSlcbiAgICAgICAgOiBfdm0uX2UoKVxuICAgIF0sXG4gICAgMlxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDNiMjZiY2ImbGFuZz1zY3NzJnNjb3BlZD10cnVlJlwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCI0NTFlYzFhNFwiLCBjb250ZW50LCBmYWxzZSwge30pO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00M2IyNmJjYiZsYW5nPXNjc3Mmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDNiMjZiY2ImbGFuZz1zY3NzJnNjb3BlZD10cnVlJlwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwidmFyIHJlbmRlciwgc3RhdGljUmVuZGVyRm5zXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0NvbnNvbGVDb21wb25lbnRCYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQ29uc29sZUNvbXBvbmVudEJhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxjaGFybFxcXFxEb2N1bWVudHNcXFxcQ2xhc3Nlc1xcXFxDU0UzMzVcXFxcd2ViLW5ld1xcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNjllMzU1YTgnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNjllMzU1YTgnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwidmVuZG9yL2NsL2NvbnNvbGUvanMvQ29uc29sZUNvbXBvbmVudEJhc2UudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ29uc29sZUNvbXBvbmVudEJhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Db25zb2xlQ29tcG9uZW50QmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL01lbWJlcnNGZXRjaGVyQ29tcG9uZW50LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zZWFiNDRkMiZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9NZW1iZXJzRmV0Y2hlckNvbXBvbmVudC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL01lbWJlcnNGZXRjaGVyQ29tcG9uZW50LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcY2hhcmxcXFxcRG9jdW1lbnRzXFxcXENsYXNzZXNcXFxcQ1NFMzM1XFxcXHdlYi1uZXdcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzNlYWI0NGQyJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzNlYWI0NGQyJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9NZW1iZXJzRmV0Y2hlckNvbXBvbmVudC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9M2VhYjQ0ZDImXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignM2VhYjQ0ZDInLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZlbmRvci9jbC9jb3Vyc2UvanMvQ29uc29sZS9NZW1iZXJzL01lbWJlcnNGZXRjaGVyQ29tcG9uZW50LnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL01lbWJlcnNGZXRjaGVyQ29tcG9uZW50LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTWVtYmVyc0ZldGNoZXJDb21wb25lbnQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL01lbWJlcnNGZXRjaGVyQ29tcG9uZW50LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zZWFiNDRkMiZcIiIsImNvbnN0IExPQ0FMX1NUT1JBR0VfU1RVREVOVFNfT05MWSA9ICdjbF9zdHVkZW50c19vbmx5JztcclxuXHJcbi8qKlxyXG4gKiBJdGVtIGluIGxvY2FsIHN0b3JhZ2UgdGhhdCBtYWludGFpbnMgdGhlIHN0YXRlIG9mXHJcbiAqIFwic3R1ZGVudHMgb25seVwiIGluIHRoZSBjb25zb2xlLlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjb25zdCBTdHVkZW50c09ubHkgPSBmdW5jdGlvbigpIHtcclxufVxyXG5cclxuU3R1ZGVudHNPbmx5LmdldCA9IGZ1bmN0aW9uKCkge1xyXG5cdGNvbnN0IGxvY2FsU3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XHJcblx0bGV0IHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX1NUVURFTlRTX09OTFkpO1xyXG5cdHJldHVybiBzID09PSAneWVzJztcclxufVxyXG5cclxuU3R1ZGVudHNPbmx5LnNldCA9IGZ1bmN0aW9uKHN0dWRlbnRzKSB7XHJcblx0Y29uc3QgbG9jYWxTdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcclxuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX1NUVURFTlRTX09OTFksIHN0dWRlbnRzID8gJ3llcycgOiAnbm8nKTtcclxuXHJcbn0iLCIvKipcclxuICogQGZpbGUgTWVtYmVyIG9mIGEgY291cnNlXHJcbiAqIEF0dGFjaGVzIHRvIGEgdXNlciBPYmplY3RcclxuICovXHJcblxyXG5pbXBvcnQge01lbWJlcnNoaXB9IGZyb20gJy4uLy4uLy4uL3VzZXJzL2pzL1VzZXJzL01lbWJlcnNoaXAuanMnO1xyXG5cclxubGV0IE1lbWJlciA9IGZ1bmN0aW9uKGpzb24pIHtcclxuICAgIE1lbWJlcnNoaXAuY2FsbCh0aGlzKTtcclxuXHJcbiAgICBsZXQgcm9sZSA9ICdHJztcclxuXHJcbiAgICBpZihqc29uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmlkID0ganNvbi5pZDtcclxuICAgICAgICB0aGlzLnNlbWVzdGVyID0ganNvbi5zZW1lc3RlcjtcclxuICAgICAgICB0aGlzLnNlY3Rpb24gPSBqc29uLnNlY3Rpb247XHJcbiAgICAgICAgcm9sZSA9IGpzb24ucm9sZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IDA7ICAgIC8vIFN5c3RlbSBtZW1iZXJzaGlwIElEXHJcbiAgICAgICAgdGhpcy5zZW1lc3RlciA9IG51bGw7ICAgLy8gU2VtZXN0ZXIgY29kZVxyXG4gICAgICAgIHRoaXMuc2VjdGlvbiA9IG51bGw7ICAvLyBTZWN0aW9uIElkXHJcbiAgICAgICAgcm9sZSA9IG51bGw7ICAgICAgIC8vIE1lbWJlcnNoaXAgcm9sZVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucm9sZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiByb2xlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0Um9sZSA9IGZ1bmN0aW9uKHJvbGVfKSB7XHJcbiAgICAgICAgcm9sZSA9IHJvbGVfO1xyXG4gICAgfVxyXG59XHJcblxyXG5NZW1iZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShNZW1iZXJzaGlwLnByb3RvdHlwZSk7XHJcbk1lbWJlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNZW1iZXI7XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBjb3Vyc2Ugc2VjdGlvbiBmb3IgYSBtZW1iZXJcclxuICogQHBhcmFtIHN0b3JlIFZ1ZXggc3RvcmVcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5NZW1iZXIucHJvdG90eXBlLmdldFNlY3Rpb24gPSBmdW5jdGlvbihzdG9yZSkge1xyXG4gICAgcmV0dXJuIHN0b3JlLmdldHRlcnNbJ2NvdXJzZS9zZWN0aW9uJ10odGhpcy5zZW1lc3RlciwgdGhpcy5zZWN0aW9uKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCBhbiBhc3NpZ25tZW50IGZvciBhIG1lbWJlclxyXG4gKiBAcGFyYW0gc3RvcmUgVnVleCBzdG9yZVxyXG4gKiBAcGFyYW0gYXNzaWdudGFnIEFzc2lnbm1lbnQgdGFnXHJcbiAqL1xyXG5NZW1iZXIucHJvdG90eXBlLmdldEFzc2lnbm1lbnQgPSBmdW5jdGlvbihzdG9yZSwgYXNzaWdudGFnKSB7XHJcbiAgICBjb25zdCBzZWN0aW9uID0gdGhpcy5nZXRTZWN0aW9uKHN0b3JlKTtcclxuICAgIHJldHVybiBzZWN0aW9uLmdldEFzc2lnbm1lbnQoYXNzaWdudGFnKTtcclxufVxyXG5cclxuXHJcbi8vIFRoZSBwb3NzaWJsZSBtZW1iZXIgcm9sZXNcclxuLy8gTXVzdCBtYXRjaCB2YWx1ZXMgaW4gTWVtYmVyLnBocFxyXG5NZW1iZXIuR1VFU1QgPSAnRyc7ICAgICAvLy88IEd1ZXN0IHVzZXIgdmlzaXRpbmcgdGhlIHNpdGVcclxuTWVtYmVyLlVTRVIgPSAnVSc7ICAgICAgLy8vPCBTdGFuZGFyZCB1c2VyIGZyb20gVXNlciwgZG9uJ3QgdXNlIGZvciBNZW1iZXJcclxuTWVtYmVyLkRST1BQRUQgPSAnRCc7ICAgLy8vPCBVc2VyIGhhcyBkcm9wcGVkIHRoZSBjb3Vyc2VcclxuTWVtYmVyLlNUVURFTlQgPSAnVCc7ICAgLy8vPCBFbnJvbGxlZCBzdHVkZW50IGluIGNvdXJzZVxyXG5NZW1iZXIuU1RBRkYgPSAnUyc7ICAgICAvLy88IEFueSBjb3Vyc2Ugc3RhZmZcclxuTWVtYmVyLkdSQURFUiA9ICdSJzsgICAgLy8vPCBHcmFkZXJzXHJcbk1lbWJlci5UQSA9ICdFJzsgICAgICAgIC8vLzwgVGVhY2hpbmcgYXNzaXN0YW50XHJcbk1lbWJlci5JTlNUUlVDVE9SID0gJ0knOyAgICAvLy88IENvdXJzZSBpbnN0cnVjdG9yXHJcbk1lbWJlci5BRE1JTiA9ICdBJzsgICAgIC8vLzwgQWRtaW5cclxuXHJcbk1lbWJlci5wcm90b3R5cGUuZ2V0Um9sZXMgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCByb2xlcyA9IHt9O1xyXG4gICAgcm9sZXNbTWVtYmVyLkdVRVNUXSA9IHtuYW1lOiAnR3Vlc3QnLCBwcmlvcml0eTogMX07XHJcbiAgICByb2xlc1tNZW1iZXIuRFJPUFBFRF0gPSB7bmFtZTogJ0Ryb3BwZWQnLCBwcmlvcml0eTogMn07XHJcbiAgICByb2xlc1tNZW1iZXIuVVNFUl0gPSB7bmFtZTogJ1VzZXInLCBwcmlvcml0eTogMywgc2tpcDogdHJ1ZX07XHJcbiAgICByb2xlc1tNZW1iZXIuU1RVREVOVF0gPSB7bmFtZTogJ1N0dWRlbnQnLCBwcmlvcml0eTogNH07XHJcbiAgICByb2xlc1tNZW1iZXIuU1RBRkZdID0ge25hbWU6ICdTdGFmZicsIHByaW9yaXR5OiA1LCBza2lwOiB0cnVlfTtcclxuICAgIHJvbGVzW01lbWJlci5HUkFERVJdID0ge25hbWU6ICdHcmFkZXInLCBwcmlvcml0eTogNn07XHJcbiAgICByb2xlc1tNZW1iZXIuVEFdID0ge25hbWU6ICdUZWFjaGluZyBBc3Npc3RhbnQnLCBwcmlvcml0eTogN307XHJcbiAgICByb2xlc1tNZW1iZXIuSU5TVFJVQ1RPUl0gPSB7bmFtZTogJ0luc3RydWN0b3InLCBwcmlvcml0eTogOH07XHJcbiAgICByb2xlc1tNZW1iZXIuQURNSU5dID0ge25hbWU6ICdBZG1pbicsIHByaW9yaXR5OiAxMDB9O1xyXG5cclxuICAgIHJldHVybiByb2xlcztcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7TWVtYmVyfTtcclxuXHJcblxyXG5cclxuIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/c291cmNlTWFwIS4vX3Jldmlldy5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjA5MThmN2M0XCIsIGNvbnRlbnQsIGZhbHNlLCB7fSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuL19yZXZpZXcuc2Nzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuL19yZXZpZXcuc2Nzc1wiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIFRoZSBtYWluIFJldmlldyBzeXN0ZW0gZW50cnkgcG9pbnRcclxuICovXHJcblxyXG4vL1xyXG4vLyBJbnN0YWxsIHRoZSBjb25zb2xlIGNvbXBvbmVudHNcclxuLy9cclxuaW1wb3J0ICcuL19yZXZpZXcuc2Nzcyc7XHJcbmltcG9ydCB7UmV2aWV3Q29uc29sZX0gZnJvbSAnLi9qcy9Db25zb2xlL1Jldmlld0NvbnNvbGUnO1xyXG5pbXBvcnQgUmV2aWV3VnVlIGZyb20gJy4vanMvUmV2aWV3VnVlLnZ1ZSc7XHJcbmltcG9ydCB7UGFnZVZ1ZX0gZnJvbSAnc2l0ZS1jbC9qcy9WdWUvUGFnZVZ1ZSc7XHJcbmltcG9ydCB7SW5saW5lVnVlfSBmcm9tICdzaXRlLWNsL2pzL1Z1ZS9JbmxpbmVWdWUnO1xyXG5cclxuaW1wb3J0IFJldmlld3NWdWUgZnJvbSAnLi9qcy9SZXZpZXdzVnVlLnZ1ZSc7XHJcblxyXG5pZihTaXRlLkNvbnNvbGUgIT09IHVuZGVmaW5lZCkge1xyXG5cdFJldmlld0NvbnNvbGUuc2V0dXAoU2l0ZS5Db25zb2xlKTtcclxufVxyXG5cclxuU2l0ZS5TaXRlLnJlYWR5KCgpID0+IHtcclxuICAgIFBhZ2VWdWUuY3JlYXRlKCdkaXYuY2wtcmV2aWV3JywgJ1JldmlldyBWdWUnLCBSZXZpZXdWdWUpO1xyXG5cdElubGluZVZ1ZS5jcmVhdGUoJ2Rpdi5jbC1yZXZpZXdzJywgUmV2aWV3c1Z1ZSk7XHJcbn0pOyIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBSZXZpZXcgc3lzdGVtIGNvbnNvbGUgY29tcG9uZW50c1xyXG4gKi9cclxuXHJcbmltcG9ydCBSZXZpZXdSZXZpZXdlcnNWdWUgZnJvbSAnLi9SZXZpZXdSZXZpZXdlcnMudnVlJztcclxuaW1wb3J0IFJldmlld3NCeUZvck1lbWJlclZ1ZSBmcm9tICcuL1Jldmlld3NCeUZvck1lbWJlci52dWUnO1xyXG5cclxuZXhwb3J0IGxldCBSZXZpZXdDb25zb2xlID0gZnVuY3Rpb24oKSB7XHJcbn1cclxuXHJcblJldmlld0NvbnNvbGUuc2V0dXAgPSBmdW5jdGlvbihDb25zb2xlKSB7XHJcbiAgICBDb25zb2xlLlJldmlldyA9IHtcclxuICAgICAgICAncmV2aWV3c2J5Zm9yJzogUmV2aWV3c0J5Rm9yTWVtYmVyVnVlXHJcbiAgICB9O1xyXG5cclxuICAgIENvbnNvbGUudGFibGVzLmFkZCh7XHJcbiAgICAgICAgdGl0bGU6ICdSZXZpZXcnLFxyXG4gICAgICAgIG9yZGVyOiAxNixcclxuICAgICAgICBhcGk6ICcvYXBpL3Jldmlldy90YWJsZXMnXHJcbiAgICB9KTtcclxuXHJcbiAgICBDb25zb2xlLmNvbXBvbmVudHMuYWRkUm91dGUoXHJcbiAgICAgICAge3JvdXRlOiAnL3Jldmlldy9yZXZpZXdlcnMvOmFzc2lnbnRhZycsIGNvbXBvbmVudDogUmV2aWV3UmV2aWV3ZXJzVnVlLCBwcm9wczogdHJ1ZX1cclxuICAgICk7XHJcblxyXG4gICAgLy8gQ29uc29sZS5jb21wb25lbnRzLmFkZFJvdXRlKFxyXG4gICAgLy8gICAgIHtyb3V0ZTogJy9xdWl6L3Jlc3VsdC86bWVtYmVyaWQvOmFzc2lnbnRhZy86cXVpenRhZycsIGNvbXBvbmVudDogUXVpelJlc3VsdENvbXBvbmVudCwgcHJvcHM6IHRydWV9XHJcbiAgICAvLyApO1xyXG5cclxuICAgIENvbnNvbGUuY291cnNlLmFzc2lnbm1lbnRMaW5rKCdyZXZpZXcnLCAncmV2aWV3ZXJzJywgJy9yZXZpZXcvcmV2aWV3ZXJzLzphc3NpZ250YWcnKTtcclxufVxyXG5cclxuIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9SZXZpZXdSZXZpZXdlcnMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWJlYzVkZmRjJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1Jldmlld1Jldmlld2Vycy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1Jldmlld1Jldmlld2Vycy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXGNoYXJsXFxcXERvY3VtZW50c1xcXFxDbGFzc2VzXFxcXENTRTMzNVxcXFx3ZWItbmV3XFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCdiZWM1ZGZkYycsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCdiZWM1ZGZkYycsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vUmV2aWV3UmV2aWV3ZXJzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1iZWM1ZGZkYyZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCdiZWM1ZGZkYycsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwidmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1Jldmlld1Jldmlld2Vycy52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXZpZXdSZXZpZXdlcnMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXZpZXdSZXZpZXdlcnMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jldmlld1Jldmlld2Vycy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YmVjNWRmZGMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1Jldmlld3NCeUZvck1lbWJlci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9N2IzNmZlNzYmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcY2hhcmxcXFxcRG9jdW1lbnRzXFxcXENsYXNzZXNcXFxcQ1NFMzM1XFxcXHdlYi1uZXdcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzdiMzZmZTc2JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzdiMzZmZTc2JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9SZXZpZXdzQnlGb3JNZW1iZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTdiMzZmZTc2JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzdiMzZmZTc2Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJ2ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jldmlld3NCeUZvck1lbWJlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jldmlld3NCeUZvck1lbWJlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03YjM2ZmU3NiZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUmV2aWV3VnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00ZWViMzI2MiZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9SZXZpZXdWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9SZXZpZXdWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxjaGFybFxcXFxEb2N1bWVudHNcXFxcQ2xhc3Nlc1xcXFxDU0UzMzVcXFxcd2ViLW5ld1xcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNGVlYjMyNjInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNGVlYjMyNjInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1Jldmlld1Z1ZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NGVlYjMyNjImXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNGVlYjMyNjInLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3VnVlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jldmlld1Z1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jldmlld1Z1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmV2aWV3VnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00ZWViMzI2MiZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUmV2aWV3c1Z1ZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MDk0ZmU0NDcmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUmV2aWV3c1Z1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1Jldmlld3NWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxjaGFybFxcXFxEb2N1bWVudHNcXFxcQ2xhc3Nlc1xcXFxDU0UzMzVcXFxcd2ViLW5ld1xcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMDk0ZmU0NDcnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMDk0ZmU0NDcnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1Jldmlld3NWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTA5NGZlNDQ3JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzA5NGZlNDQ3Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJ2ZW5kb3IvY2wvcmV2aWV3L2pzL1Jldmlld3NWdWUudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmV2aWV3c1Z1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jldmlld3NWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jldmlld3NWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTA5NGZlNDQ3JlwiIiwiLypcclxuICogVXRpbGl0eSBmdW5jdGlvbnMgdG8gZm9ybWF0IHRpbWVzLlxyXG4gKi9cclxuXHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuXHJcbi8qKlxyXG4gKiBVdGlsaXR5IGZ1bmN0aW9ucyB0byBmb3JtYXQgdGltZXMuXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGxldCBUaW1lRm9ybWF0dGVyID0gZnVuY3Rpb24oKSB7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IGEgdGltZSB0byB0aGUgZm9ybWF0IHdlIGRpc3BsYXlcclxuICogVGltZSBpcyByZWxhdGl2ZSB0byBhIHNwZWNpZmllZCB0aW1lIChvciBjdXJyZW50IHRpbWUpXHJcbiAqIEBwYXJhbSB7bW9tZW50fSB0aW1lIFRpbWUgdG8gY29udmVydCAobW9tZW50KVxyXG4gKiBAcGFyYW0ge21vbWVudH0gY3VycmVudFRpbWUgQ3VycmVudCB0aW1lIChtb21lbnQpXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtYXQgTW9tZW50IGZvcm1hdFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuVGltZUZvcm1hdHRlci5yZWxhdGl2ZSA9IGZ1bmN0aW9uKHRpbWUsIGN1cnJlbnRUaW1lLCBmb3JtYXQpIHtcclxuICAgIGlmKGN1cnJlbnRUaW1lID09PSB1bmRlZmluZWQgfHwgY3VycmVudFRpbWUgPT09IG51bGwpIHtcclxuICAgICAgICBjdXJyZW50VGltZSA9IG1vbWVudC5ub3coKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlbGFwc2VkID0gY3VycmVudFRpbWUuZGlmZih0aW1lKTtcclxuXHJcbiAgICBpZihlbGFwc2VkIDwgNjAwMDApIHtcclxuICAgICAgICByZXR1cm4gJzwxIG1pbiBhZ28nO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGVsYXBzZWQgPCAzNjAwMDAwKSB7XHJcbiAgICAgICAgLy8gV2l0aGluIGFuIGhvdXIgYWdvXHJcbiAgICAgICAgY29uc3QgbWlucyA9IE1hdGguZmxvb3IoZWxhcHNlZCAvIDYwMDAwKTtcclxuICAgICAgICByZXR1cm4gJycgKyBtaW5zICsgJyBtaW4gYWdvJztcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICogRGV0ZXJtaW5lIGlmIGl0IHdhcyB0b2RheVxyXG4gICAgICovXHJcbiAgICBpZih0aW1lLmRhdGUoKSA9PT0gY3VycmVudFRpbWUuZGF0ZSgpICYmXHJcbiAgICAgICAgdGltZS5tb250aCgpID09PSBjdXJyZW50VGltZS5tb250aCgpICYmXHJcbiAgICAgICAgdGltZS55ZWFyKCkgPT09IGN1cnJlbnRUaW1lLnllYXIoKSkge1xyXG4gICAgICAgIGxldCBob3VyID0gdGltZS5ob3VyKCk7XHJcbiAgICAgICAgbGV0IGFtID0gJ2FtJztcclxuICAgICAgICBpZihob3VyID09PSAwKSB7XHJcbiAgICAgICAgICAgIGhvdXIgPSAxMjtcclxuICAgICAgICB9IGVsc2UgaWYoaG91ciA9PT0gMTIpIHtcclxuICAgICAgICAgICAgYW0gPSAncG0nXHJcbiAgICAgICAgfSBlbHNlIGlmKGhvdXIgPiAxMikge1xyXG4gICAgICAgICAgICBhbSA9ICdwbSc7XHJcbiAgICAgICAgICAgIGhvdXIgLT0gMTI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtaW51dGUgPSB0aW1lLm1pbnV0ZSgpO1xyXG4gICAgICAgIGlmKG1pbnV0ZSA8IDEwKSB7XHJcbiAgICAgICAgICAgIG1pbnV0ZSA9ICcwJyArIG1pbnV0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBcIlRvZGF5IGF0IFwiICsgaG91ciArICc6JyArIG1pbnV0ZSArIGFtO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZm9ybWF0ID0gJ00tREQtWVlZWSBoOm1tOnNzYSc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRpbWUuZm9ybWF0KGZvcm1hdCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5IGEgVW5peCB0aW1lIGFzIGFuIGFic29sdXRlIHRpbWUuXHJcbiAqIEBwYXJhbSB7aW50fSB0aW1lIFVuaXggdGltZSAoc2Vjb25kcylcclxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdCBNb21lbnQgZm9ybWF0IG9yICdsb25nJyBvciAnc2hvcnQnIGZvciBkYXlzIGluY2x1c2lvbi5cclxuICovXHJcblRpbWVGb3JtYXR0ZXIuYWJzb2x1dGVVTklYID0gZnVuY3Rpb24odGltZSwgZm9ybWF0KSB7XHJcbiAgICBsZXQgdCA9IG1vbWVudC51bml4KHRpbWUpO1xyXG4gICAgaWYoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBmb3JtYXQgPSAnTS1ERC1ZWVlZIGg6bW06c3NhJztcclxuICAgIH0gZWxzZSBpZihmb3JtYXQgPT09ICdzaG9ydCcpIHtcclxuXHQgICAgZm9ybWF0ID0gJ2RkZCwgTS1ERC1ZWVlZIGg6bW06c3NhJztcclxuICAgIH0gZWxzZSBpZihmb3JtYXQgPT09ICdsb25nJykge1xyXG5cdCAgICBmb3JtYXQgPSAnZGRkZCwgTS1ERC1ZWVlZIGg6bW06c3NhJztcclxuICAgIH0gZWxzZSBpZihmb3JtYXQgPT09ICdsb25nLWRhdGUnKSB7XHJcblx0ICAgIGZvcm1hdCA9ICdkZGRkLCBNLURELVlZWVknO1xyXG4gICAgfSBlbHNlIGlmKGZvcm1hdCA9PT0gJ3Nob3J0LXRpbWUnKSB7XHJcblx0ICAgIGZvcm1hdCA9ICdoOm1tYSc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHQuZm9ybWF0KGZvcm1hdCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5IGEgVW5peCB0aW1lIGFzIGEgcmVsYXRpdmUgdGltZS5cclxuICogQHBhcmFtIHtpbnR9IHRpbWUgVW5peCB0aW1lIChzZWNvbmRzKVxyXG4gKiBAcGFyYW0ge2ludH0gY3VycmVudFRpbWUgQ3VycmVudCB0aW1lIGFzIFVOSVggdGltZSAob3B0aW9uYWwpXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtYXQgTW9tZW50IGZvcm1hdCBvciAnbG9uZycgb3IgJ3Nob3J0JyBmb3IgZGF5cyBpbmNsdXNpb24uXHJcbiAqL1xyXG5UaW1lRm9ybWF0dGVyLnJlbGF0aXZlVU5JWCA9IGZ1bmN0aW9uKHRpbWUsIGN1cnJlbnRUaW1lLCBmb3JtYXQpIHtcclxuICAgIGxldCB0ID0gbW9tZW50LnVuaXgodGltZSk7XHJcbiAgICBsZXQgYyA9IGN1cnJlbnRUaW1lICE9PSBudWxsID8gbW9tZW50LnVuaXgoY3VycmVudFRpbWUpIDogbW9tZW50KCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucmVsYXRpdmUodCwgYywgZm9ybWF0KTtcclxufVxyXG4iLCIvKlxyXG4gKiBKYXZhc2NyaXB0IHN1cHBvcnQgZm9yIHRoZSBFZGl0b3JcclxuICovXHJcblxyXG5pbXBvcnQgJy4vX2VkaXRvci5zY3NzJztcclxuaW1wb3J0IFJlc2l6ZXIgZnJvbSAncmVzaXplci1jbCc7XHJcbmltcG9ydCB7RWRpdG9yT3B0aW9uc30gZnJvbSAnLi9FZGl0b3JPcHRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBKYXZhc2NyaXB0IG9iamVjdCBpbiBzdXBwb3J0IG9mIHRleHRhcmVhLWJhc2VkIGVkaXRvclxyXG4gKlxyXG4gKiBJZiBlZGl0b3IgaGFzIHRoZSBjb2RlIHN0eWxlLCBsaW5lIG51bWJlcnMgYXJlIGRpc3BsYXllZC5cclxuICogU2V0IG1lbWJlciAudGFiIHRvIHN1cHBvcnQgc21hcnQgdGFic1xyXG4gKiBTZXQgbWVtYmVyIC5hdXRvSW5kZW50IHRvIHN1cHBvcnQgYXV0b21hdGljIGluZGVudGF0aW9uXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgZm9yIHRoZSB0ZXh0YXJlYSB3ZSBhcmUgdHVybmluZyBpbnRvIGFuIGVkaXRvclxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBPcHRpb25zIHRvIHBhc3MgdG8gdGhlIGVkaXRvclxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBsZXQgRWRpdG9yID0gZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xyXG4gICAgaWYob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG5ldyBFZGl0b3JPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBvcHRpb25zID0gbmV3IEVkaXRvck9wdGlvbnMoSlNPTi5wYXJzZShlbGVtZW50LnRleHRDb250ZW50KSk7XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjbC1lZGl0b3InKTtcclxuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICBjb25zdCByZXNpemVyID0gbmV3IFJlc2l6ZXIoZWxlbWVudCwge1xyXG4gICAgICAgcmVzaXplOiBvcHRpb25zLnJlc2l6ZSxcclxuICAgICAgIGhhbmRsZTogb3B0aW9ucy5oYW5kbGUsXHJcbiAgICAgICBncmFiU2l6ZTogb3B0aW9ucy5ncmFiU2l6ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG4gICAgdGhpcy50ZXh0YXJlYSA9IHRhO1xyXG4gICAgZm9yKGxldCBjbHMgb2Ygb3B0aW9ucy5jbGFzc2VzKSB7XHJcbiAgICAgICAgdGEuY2xhc3NMaXN0LmFkZChjbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKHRhKTtcclxuICAgIHRhLnZhbHVlID0gb3B0aW9ucy52YWx1ZTtcclxuICAgIGlmKG9wdGlvbnMubmFtZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHRhLm5hbWUgPSBvcHRpb25zLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYob3B0aW9ucy5jb2RlKSB7XHJcbiAgICAgICAgdGEuY2xhc3NMaXN0LmFkZCgnY29kZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKG9wdGlvbnMuaGVpZ2h0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBvcHRpb25zLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBpZihvcHRpb25zLm1pbkhlaWdodCAhPT0gbnVsbCkge1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUubWluSGVpZ2h0ID0gb3B0aW9ucy5taW5IZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGEuc3BlbGxjaGVjayA9IG9wdGlvbnMuc3BlbGxjaGVjaztcclxuXHJcbiAgICAvLyBJRTExIGFuZCBzb21lIG9sZGVyIGJyb3dzZXJzIGRvIG5vdCBzdXBwb3J0XHJcbiAgICAvLyB0aGUgaW5zZXJ0VGV4dCBjb21tYW5kLiBUaGlzIGRldGVybWluZXMgaWYgaXRcclxuICAgIC8vIGlzIGF2YWlsYWJsZS4gVGhpcyBtYXkgYmUgcmV2aXNlZCBpdCB0aGUgYXR0ZW1wdCB0b1xyXG4gICAgLy8gdXNlIHRoZW0gZmFpbHMuXHJcbiAgICBsZXQgaW5zZXJ0VGV4dFN1cHBvcnRlZCA9IGRvY3VtZW50LnF1ZXJ5Q29tbWFuZFN1cHBvcnRlZCAoXCJpbnNlcnRUZXh0XCIpO1xyXG4gICAgbGV0IGRlbGV0ZVN1cHBvcnRlZCA9IGRvY3VtZW50LnF1ZXJ5Q29tbWFuZFN1cHBvcnRlZCAoXCJkZWxldGVcIik7XHJcblxyXG4gICAgLy8gU2V0IHRydWUgYWZ0ZXIgd2UgYXV0by1pbmRlbnRcclxuICAgIGxldCBqdXN0SW5kZW50ZWQgPSBmYWxzZTtcclxuICAgIGlmKG9wdGlvbnMudGFiIHx8IG9wdGlvbnMuYXV0b0luZGVudCkge1xyXG4gICAgICAgIHRhLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYob3B0aW9ucy50YWIgJiYgZXZlbnQud2hpY2ggPT09IDkpIHsgIC8vIFRhYiBjaGFyYWN0ZXJcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoIWV2ZW50LnNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiQXRDYXJldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGp1c3RJbmRlbnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHVuVGFiKCk7XHJcbiAgICAgICAgICAgICAgICAgICAganVzdEluZGVudGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihvcHRpb25zLmF1dG9JbmRlbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmKGV2ZW50LndoaWNoID09IDEzKSB7ICAgICAvLyBSZXR1cm4gY2hhcmFjdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBqdXN0SW5kZW50ZWQgPSByZXR1cm5XaXRoSW5kZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGp1c3RJbmRlbnRlZCAmJiBldmVudC53aGljaCA9PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQmFja3NwYWNlIGFmdGVyIHdlIGp1c3QgaW5kZW50ZWQhXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodW5EZW50KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAganVzdEluZGVudGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICogVGhpcyBpcyB0aGUgbWFnaWMgdGhhdCBzeW5jcyB0aGUgYmFja2dyb3VuZCB3aXRoIHRoZVxyXG4gICAgICogbGluZSBudW1iZXJzIGluIGl0LlxyXG4gICAgICovXHJcbiAgICB0YS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCB0b3AgPSB0YS5zY3JvbGxUb3A7XHJcbiAgICAgICAgY29uc3QgbGVmdCA9IHRhLnNjcm9sbExlZnQ7XHJcbiAgICAgICAgdGEuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gLWxlZnQgKyAncHggJyArIC10b3AgKyAncHgnO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICAqIEluc2VydCBhIHRhYiBhdCB0aGUgY3VycmVudCBlZGl0IGxvY2F0aW9uIGluIHRoZSB0ZXh0YXJlYVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB0YWJBdENhcmV0KCkge1xyXG4gICAgICAgIGNvbnN0IGRTZWwgPSB0YTtcclxuXHJcbiAgICAgICAgaWYgKGRTZWwuc2VsZWN0aW9uU3RhcnQgfHwgZFNlbC5zZWxlY3Rpb25TdGFydCA9PSAnMCcpIHtcclxuICAgICAgICAgICAgLy9Gb3IgYnJvd3NlcnMgbGlrZSBGaXJlZm94IGFuZCBXZWJraXQgYmFzZWRcclxuICAgICAgICAgICAgdmFyIHN0YXJ0UG9zID0gZFNlbC5zZWxlY3Rpb25TdGFydDtcclxuICAgICAgICAgICAgdmFyIGVuZFBvcyA9IGRTZWwuc2VsZWN0aW9uRW5kO1xyXG4gICAgICAgICAgICBpZihzdGFydFBvcyA9PSBlbmRQb3MpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRhYmJpbmcgYXQgdGhlIGN1cnJlbnQgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgIHZhciBiZWZvcmUgPSBkU2VsLnZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3BsaXQgPSBiZWZvcmUuc3BsaXQoXCJcXG5cIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGFzdExpbmUgPSBzcGxpdFtzcGxpdC5sZW5ndGgtMV07XHJcbiAgICAgICAgICAgICAgICB2YXIgbGFzdExlbiA9IGxhc3RMaW5lLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHZhciB0b0FkZCA9IG9wdGlvbnMudGFiU2l6ZSAtIChsYXN0TGVuICUgb3B0aW9ucy50YWJTaXplKTtcclxuICAgICAgICAgICAgICAgIHZhciBzcGFjZXMgPSAnJztcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaT0wOyBpPHRvQWRkOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZXMgKz0gJyAnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGluc2VydFRleHQoZFNlbCwgc3BhY2VzKTtcclxuICAgICAgICAgICAgICAgIGRTZWwuc2VsZWN0aW9uU3RhcnQgPSBzdGFydFBvcyArIHRvQWRkO1xyXG4gICAgICAgICAgICAgICAgZFNlbC5zZWxlY3Rpb25FbmQgPSBzdGFydFBvcyArIHRvQWRkO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gVGFiYmluZyBhIHNlbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGRTZWwudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3BsaXQgPSB2YWwuc3BsaXQoXCJcXG5cIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGluZVBvcyA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRmluZCB0aGUgbGluZSB0aGUgc2VsZWN0aW9uIHN0YXJ0cyBvblxyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBsaW5lPTA7IGxpbmUgPCBzcGxpdC5sZW5ndGg7IGxpbmUrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0TGluZVBvcyA9IGxpbmVQb3MgKyBzcGxpdFtsaW5lXS5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHN0YXJ0UG9zID49IGxpbmVQb3MgJiYgc3RhcnRQb3MgPCBuZXh0TGluZVBvcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZVBvcyA9IG5leHRMaW5lUG9zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNwYWNlcyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpPTA7IGk8b3B0aW9ucy50YWJTaXplOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZXMgKz0gJyAnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnNlcnRpb25zID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJbmRlbnQgdW50aWwgd2UgYXJlIGRvbmVcclxuICAgICAgICAgICAgICAgIGZvciggOyBsaW5lIDwgc3BsaXQubGVuZ3RoOyAgbGluZSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZFNlbC5zZWxlY3Rpb25TdGFydCA9IGxpbmVQb3MgKyBpbnNlcnRpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgIGRTZWwuc2VsZWN0aW9uRW5kID0gbGluZVBvcyArIGluc2VydGlvbnM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGluc2VydFRleHQoZFNlbCwgc3BhY2VzKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnNlcnRpb25zICs9IG9wdGlvbnMudGFiU2l6ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dExpbmVQb3MgPSBsaW5lUG9zICsgc3BsaXRbbGluZV0ubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBpZihlbmRQb3MgPD0gbmV4dExpbmVQb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgYXJlIGRvbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsaW5lUG9zID0gbmV4dExpbmVQb3M7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZFNlbC5zZWxlY3Rpb25TdGFydCA9IHN0YXJ0UG9zICsgb3B0aW9ucy50YWJTaXplO1xyXG4gICAgICAgICAgICAgICAgZFNlbC5zZWxlY3Rpb25FbmQgPSBlbmRQb3MgKyBpbnNlcnRpb25zO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRTZWwudmFsdWUgKz0gXCIgXCI7XHJcbiAgICAgICAgICAgIGRTZWwuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAqIEhhbmRsZSB0aGUgU2hpZnQtVEFCIGNvbWJpbmF0aW9uICh1bnRhYmJpbmcpXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHVuVGFiKCkge1xyXG4gICAgICAgIC8vIFNlbGVjdGlvbiBET00gb2JqZWN0XHJcbiAgICAgICAgY29uc3QgZFNlbCA9IHRhO1xyXG5cclxuICAgICAgICB2YXIgc3RhcnRQb3MgPSBkU2VsLnNlbGVjdGlvblN0YXJ0O1xyXG4gICAgICAgIHZhciBlbmRQb3MgPSBkU2VsLnNlbGVjdGlvbkVuZDtcclxuXHJcbiAgICAgICAgLy8gVW50YWJiaW5nIGEgc2VsZWN0aW9uXHJcbiAgICAgICAgdmFyIHZhbCA9IGRTZWwudmFsdWU7XHJcbiAgICAgICAgdmFyIHNwbGl0ID0gdmFsLnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgICAgIHZhciBsaW5lUG9zID0gMDtcclxuXHJcbiAgICAgICAgLy8gRmluZCB0aGUgbGluZSB0aGUgc2VsZWN0aW9uIHN0YXJ0cyBvblxyXG4gICAgICAgIGZvcih2YXIgbGluZT0wOyBsaW5lIDwgc3BsaXQubGVuZ3RoOyBsaW5lKyspIHtcclxuICAgICAgICAgICAgdmFyIG5leHRMaW5lUG9zID0gbGluZVBvcyArIHNwbGl0W2xpbmVdLmxlbmd0aCArIDE7XHJcbiAgICAgICAgICAgIGlmKHN0YXJ0UG9zID49IGxpbmVQb3MgJiYgc3RhcnRQb3MgPCBuZXh0TGluZVBvcykge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGluZVBvcyA9IG5leHRMaW5lUG9zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGRlbGV0aW9ucyA9IDA7XHJcbiAgICAgICAgdmFyIGZpcnN0TGluZSA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIFVuZGVudCB1bnRpbCB3ZSBhcmUgZG9uZVxyXG4gICAgICAgIGZvciggOyBsaW5lIDwgc3BsaXQubGVuZ3RoOyAgbGluZSsrKSB7XHJcbiAgICAgICAgICAgIGZvcih2YXIgc3BhY2VzPTA7ICBzcGFjZXMgPCBvcHRpb25zLnRhYlNpemUgJiYgc3BhY2VzPHNwbGl0W2xpbmVdLmxlbmd0aDsgc3BhY2VzKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHNwbGl0W2xpbmVdW3NwYWNlc10gIT0gJyAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHNwYWNlcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGRTZWwuc2VsZWN0aW9uU3RhcnQgPSBsaW5lUG9zIC0gZGVsZXRpb25zO1xyXG4gICAgICAgICAgICAgICAgZFNlbC5zZWxlY3Rpb25FbmQgPSBsaW5lUG9zIC0gZGVsZXRpb25zICsgc3BhY2VzO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlVGV4dChkU2VsKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0aW9ucyArPSBzcGFjZXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGZpcnN0TGluZSkge1xyXG4gICAgICAgICAgICAgICAgc3RhcnRQb3MgLT0gc3BhY2VzO1xyXG4gICAgICAgICAgICAgICAgaWYoc3RhcnRQb3MgPCBsaW5lUG9zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRQb3MgPSBsaW5lUG9zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmlyc3RMaW5lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG5leHRMaW5lUG9zID0gbGluZVBvcyArIHNwbGl0W2xpbmVdLmxlbmd0aCArIDE7XHJcbiAgICAgICAgICAgIGlmKGVuZFBvcyA8PSBuZXh0TGluZVBvcykge1xyXG4gICAgICAgICAgICAgICAgLy8gV2UgYXJlIGRvbmVcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsaW5lUG9zID0gbmV4dExpbmVQb3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkU2VsLnNlbGVjdGlvblN0YXJ0ID0gc3RhcnRQb3M7XHJcbiAgICAgICAgZFNlbC5zZWxlY3Rpb25FbmQgPSBlbmRQb3MgLSBkZWxldGlvbnM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBJbnNlcnQgYSByZXR1cm4gY2hhcmFjdGVyIGFuZCBlbm91Z2ggc3BhY2VzIHRvIGluZGVudFxyXG4gICAgICogdGhlIHRleHQgc28gYXMgdG8gbWF0Y2ggdGhlIHByZXZpb3VzIGxpbmUuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJldHVybldpdGhJbmRlbnQoKSB7XHJcbiAgICAgICAgLy8gU2VsZWN0aW9uIERPTSBvYmplY3RcclxuICAgICAgICBjb25zdCBkU2VsID0gdGE7XHJcblxyXG4gICAgICAgIC8vIEhvdyBtYW55IHNwYWNlcyB3aWxsIGJlIHB1dCBiZWZvcmUgdGhlIGZpcnN0IG5vbi1zcGFjZT9cclxuICAgICAgICB2YXIgc3BhY2UgPSAwO1xyXG5cclxuICAgICAgICBpZiAoZFNlbC5zZWxlY3Rpb25TdGFydCB8fCBkU2VsLnNlbGVjdGlvblN0YXJ0ID09ICcwJykge1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRQb3MgPSBkU2VsLnNlbGVjdGlvblN0YXJ0O1xyXG4gICAgICAgICAgICB2YXIgZW5kUG9zID0gZFNlbC5zZWxlY3Rpb25FbmQ7XHJcbiAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSBkU2VsLnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgdmFyIGJlZm9yZSA9IGRTZWwudmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKTtcclxuICAgICAgICAgICAgdmFyIGFmdGVyID0gZFNlbC52YWx1ZS5zdWJzdHJpbmcoZW5kUG9zLGRTZWwudmFsdWUubGVuZ3RoKTtcclxuICAgICAgICAgICAgdmFyIHNwbGl0ID0gYmVmb3JlLnNwbGl0KFwiXFxuXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gV2hhdCBpcyB0aGUgbGFzdCBsaW5lIGJlZm9yZSB0aGUgY2FyZXQ/XHJcbiAgICAgICAgICAgIHZhciBsYXN0ID0gc3BsaXRbc3BsaXQubGVuZ3RoLTFdO1xyXG5cclxuICAgICAgICAgICAgZm9yKHZhciBpPTA7IGk8bGFzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYobGFzdC5jaGFyQXQoaSkgIT0gJyAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3BhY2UrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSByZXR1cm5cclxuICAgICAgICAgICAgdmFyIG15VmFsdWUgPSBcIlxcblwiO1xyXG4gICAgICAgICAgICBmb3IoaT0wOyBpPHNwYWNlOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG15VmFsdWUgKz0gJyAnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0KGRTZWwsIG15VmFsdWUpO1xyXG4gICAgICAgICAgICBkU2VsLnNlbGVjdGlvblN0YXJ0ID0gc3RhcnRQb3MgKyBteVZhbHVlLmxlbmd0aDtcclxuICAgICAgICAgICAgZFNlbC5zZWxlY3Rpb25FbmQgPSBzdGFydFBvcyArIG15VmFsdWUubGVuZ3RoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRTZWwudmFsdWUgKz0gXCJcXG5cIjtcclxuICAgICAgICAgICAgZFNlbC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNwYWNlID4gMDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJlbW92ZSB0aGUgbGFzdCB0YWJTaXplIHNwYWNlcyBhdCB0aGUgY3VycmVudCBsb2NhdGlvblxyXG4gICAgICogQHJldHVybiB0cnVlIGlmIHdhcyB1bi1kZW50ZWRcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gdW5EZW50KCkge1xyXG4gICAgICAgIC8vIFNlbGVjdGlvbiBET00gb2JqZWN0XHJcbiAgICAgICAgY29uc3QgZFNlbCA9IHRhO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKGRTZWwuc2VsZWN0aW9uU3RhcnQgfHwgZFNlbC5zZWxlY3Rpb25TdGFydCA9PSAnMCcpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0UG9zID0gZFNlbC5zZWxlY3Rpb25TdGFydDtcclxuICAgICAgICAgICAgdmFyIGVuZFBvcyA9IGRTZWwuc2VsZWN0aW9uRW5kO1xyXG4gICAgICAgICAgICB2YXIgc2Nyb2xsVG9wID0gZFNlbC5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgIHZhciBiZWZvcmUgPSBkU2VsLnZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcyk7XHJcbiAgICAgICAgICAgIHZhciBzcGFjZVN0ciA9ICcnO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxvcHRpb25zLnRhYlNpemU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc3BhY2VTdHIgKz0gJyAnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGJlZm9yZS5sZW5ndGggPj0gb3B0aW9ucy50YWJTaXplICYmXHJcbiAgICAgICAgICAgICAgICBiZWZvcmUuc3Vic3RyKGJlZm9yZS5sZW5ndGgtb3B0aW9ucy50YWJTaXplLCBvcHRpb25zLnRhYlNpemUpID09PSBzcGFjZVN0cikge1xyXG4gICAgICAgICAgICAgICAgZFNlbC5zZWxlY3Rpb25TdGFydCA9IGJlZm9yZS5sZW5ndGggLSBvcHRpb25zLnRhYlNpemU7XHJcbiAgICAgICAgICAgICAgICBkU2VsLnNlbGVjdGlvbkVuZCA9IGJlZm9yZS5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlVGV4dChkU2VsKTtcclxuICAgICAgICAgICAgICAgIGRTZWwuc2VsZWN0aW9uU3RhcnQgPSBiZWZvcmUubGVuZ3RoIC0gb3B0aW9ucy50YWJTaXplO1xyXG4gICAgICAgICAgICAgICAgZFNlbC5zZWxlY3Rpb25FbmQgPSBkU2VsLnNlbGVjdGlvblN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBJbnNlcnQgdGV4dCBpbiBhIHRleHRhcmVhIGF0IHRoZSBjdXJyZW50IHNlbGVjdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIGlzIHByb3ZpZGVkIHRvIGFsbG93IGZvciBmYWxsYmFjayB0byBhIG5vbi11bmRvYWJsZSB2ZXJzaW9uXHJcbiAgICAgKiBmb3IgSW50ZXJuZXQgZXhwbG9yZXIgYW5kIEZpcmVmb3guXHJcbiAgICAgKiBAcGFyYW0gdGV4dGFyZWEgVGV4dGFyZWEgd2UgYXJlIG1vZGlmeWluZ1xyXG4gICAgICogQHBhcmFtIHRleHQgVGV4dCB0byBpbnNlcnRcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaW5zZXJ0VGV4dCh0ZXh0YXJlYSwgdGV4dCkge1xyXG4gICAgICAgIGlmKGluc2VydFRleHRTdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgaWYoIWRvY3VtZW50LmV4ZWNDb21tYW5kKFwiaW5zZXJ0VGV4dFwiLCBmYWxzZSwgdGV4dCkpIHtcclxuICAgICAgICAgICAgICAgIGluc2VydFRleHRTdXBwb3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGluc2VydFRleHQodGV4dGFyZWEsIHRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gQmFja3VwIHZlcnNpb24gZm9yIEludGVybmV0IEV4cGxvcmVyIDExXHJcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0O1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSB0ZXh0YXJlYS5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGV4dGFyZWEudmFsdWU7XHJcbiAgICAgICAgICAgIHRleHRhcmVhLnZhbHVlID0gdmFsdWUuc3Vic3RyaW5nKDAsIHBvcykgKyB0ZXh0ICsgdmFsdWUuc3Vic3RyaW5nKHBvcyk7XHJcbiAgICAgICAgICAgIHRleHRhcmVhLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHRleHRhcmVhLnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAqIERlbGV0ZSB0ZXh0IGluIGEgdGV4dGFyZWEgYXQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgaXMgcHJvdmlkZWQgdG8gYWxsb3cgZm9yIGZhbGxiYWNrIHRvIGEgbm9uLXVuZG9hYmxlIHZlcnNpb25cclxuICAgICAqIGZvciBJbnRlcm5ldCBleHBsb3JlciBhbmQgRmlyZWZveC5cclxuICAgICAqIEBwYXJhbSB0ZXh0YXJlYVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBkZWxldGVUZXh0KHRleHRhcmVhKSB7XHJcbiAgICAgICAgaWYoZGVsZXRlU3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgIGlmKCFkb2N1bWVudC5leGVjQ29tbWFuZChcImRlbGV0ZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlU3VwcG9ydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBkZWxldGVUZXh0KHRleHRhcmVhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEJhY2t1cCB2ZXJzaW9uIGZvciBJbnRlcm5ldCBFeHBsb3JlciAxMVxyXG4gICAgICAgICAgICAvLyBhbmQgRmlyZWZveFxyXG4gICAgICAgICAgICBjb25zdCBzdGFydFBvcyA9IHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0O1xyXG4gICAgICAgICAgICBjb25zdCBlbmRQb3MgPSB0ZXh0YXJlYS5zZWxlY3Rpb25FbmQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbFRvcCA9IHRleHRhcmVhLnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0ZXh0YXJlYS52YWx1ZTtcclxuICAgICAgICAgICAgdGV4dGFyZWEudmFsdWUgPSB2YWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpICsgdmFsdWUuc3Vic3RyaW5nKGVuZFBvcyk7XHJcbiAgICAgICAgICAgIHRleHRhcmVhLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHRleHRhcmVhLnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiLypcclxuICogVmFyaW91cyBpbnRlcmZhY2Ugb3B0aW9ucyB3ZSBjYW4gc2VsZWN0XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEVkaXRvciBpbnRlcmZhY2Ugb3B0aW9ucy5cclxuICpcclxuICogVGhpcyBpcyB1c2VkIGJ5IEVkaXRvciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciB0aGUgZWRpdG9yIG9wdGlvbnMuXHJcbiAqXHJcbiAqIEBwYXJhbSBvcHRpb25zIFVzZXIgcHJvdmlkZWQgb3B0aW9ucyB0aGF0IG92ZXJyaWRlIHRoZSBkZWZhdWx0IHZhbHVlcy5cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgbGV0IEVkaXRvck9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyA/IG9wdGlvbnMgOiB7fTtcclxuXHJcbiAgICAvLy8gT3B0aW9uczogdmVydGljYWwsIGhvcml6b250YWwsIGJvdGhcclxuICAgIHRoaXMucmVzaXplID0gJ3ZlcnRpY2FsJztcclxuXHJcbiAgICAvLy8gVGhlIHJlc2l6aW5nIGhhbmRsZVxyXG4gICAgdGhpcy5oYW5kbGUgPSAnYmFyJztcclxuXHJcbiAgICAvLy8gUmFuZ2UgZm9yIGdyYWJiaW5nXHJcbiAgICB0aGlzLmdyYWJTaXplID0gMTA7XHJcblxyXG4gICAgLy8vIElzIHRoaXMgZm9yIHNvdXJjZSBjb2RlP1xyXG4gICAgdGhpcy5jb2RlID0gZmFsc2U7XHJcblxyXG4gICAgLy8vIEluaXRpYWwgdGV4dGFyZWEgdmFsdWVcclxuICAgIHRoaXMudmFsdWUgPSAnJztcclxuXHJcbiAgICAvLy8gSGVpZ2h0IHZhbHVlIHRvIHVzZVxyXG4gICAgdGhpcy5oZWlnaHQgPSBudWxsO1xyXG5cclxuICAgIC8vLyBOYW1lIGZvciB0aGUgY29udHJvbFxyXG4gICAgdGhpcy5uYW1lID0gbnVsbDtcclxuXHJcbiAgICAvLy8gVXNlIGhhbmRsZSB0aGUgdGFiIGtleT9cclxuICAgIHRoaXMudGFiID0gZmFsc2U7XHJcblxyXG4gICAgLy8vIEF1dG9tYXRpY2FsbHkgaW5kZW50IGNvZGU/XHJcbiAgICB0aGlzLmF1dG9JbmRlbnQgPSBmYWxzZTtcclxuXHJcbiAgICAvLy8gTWluaW11bSBoZWlnaHQgdG8gc2V0XHJcbiAgICB0aGlzLm1pbkhlaWdodCA9IG51bGw7XHJcblxyXG4gICAgLy8vIFNwZWxsY2hlY2sgdGhlIHRleHRhcmVhP1xyXG4gICAgdGhpcy5zcGVsbGNoZWNrID0gZmFsc2U7XHJcblxyXG4gICAgLy8vIFNpemUgb2YgYSB0YWIgc3RvcCBpbiBjaGFyYWN0ZXJzLlxyXG4gICAgdGhpcy50YWJTaXplID0gNDtcclxuXHJcbiAgICAvLy8gQ2xhc3NlcyB0byBhZGQgdG8gdGhlIHRleHRhcmVhXHJcbiAgICB0aGlzLmNsYXNzZXMgPSBbXTtcclxuXHJcbiAgICBmb3IodmFyIHByb3BlcnR5IGluIG9wdGlvbnMpIHtcclxuICAgICAgICBpZihvcHRpb25zLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xyXG4gICAgICAgICAgICBpZighdGhpcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgb3B0aW9uIFwiICsgcHJvcGVydHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXNbcHJvcGVydHldID0gb3B0aW9uc1twcm9wZXJ0eV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuL19lZGl0b3Iuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCIzMzU5N2E5YVwiLCBjb250ZW50LCBmYWxzZSwge30pO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi9fZWRpdG9yLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi9fZWRpdG9yLnNjc3NcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIi8qKlxyXG4gKiBCYXNpYyBWdWUtYmFzZWQgc2l0ZSBpbmxpbmUgY29udGVudCBzdGFydGVyXHJcbiAqIEBjb25zdHJ1Y3RvciBJbmxpbmVWdWVcclxuICovXHJcbmV4cG9ydCBjb25zdCBJbmxpbmVWdWUgPSBmdW5jdGlvbigpIHtcclxufVxyXG5cclxuLypcclxuICpcclxuICogSG93IHRvIHVzZTpcclxuXHJcbiAqIHNpdGUucmVhZHkoKCkgPT4ge1xyXG4gKiAgICBJbmxpbmVWdWUuY3JlYXRlKCdkaXYuY2wtcmV2aWV3cycsIFJldmlld3NWdWUpO1xyXG4gKiB9KTtcclxuICpcclxuICovXHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGlubGluZSBWVUUgY29tcG9uZW50LCByZXBsYWNpbmcgdGhlIHByb3ZpZGVkXHJcbiAqIHNlbGVjdG9yLiBUaGUgc2VsZWN0b3IgaXMgYXNzdW1lZCB0byBjb250YWluIEpTT04gZGF0YSB0aGF0IGlzXHJcbiAqIHRoZW4gcHJvdmlkZWQgdG8gdGhlIGNvbXBvbmVudCBpbiB0aGUganNvbiBwcm9wZXJ0eS5cclxuICpcclxuICogQHBhcmFtIHNlbCBTZWxlY3RvciBmb3IgYSBkaXYgdG8gcmVwbGFjZSB3aXRoIHRoZSB2aWV3LlxyXG4gKiBAcGFyYW0gY29tcG9uZW50IENvbXBvbmVudCB0byBkaXNwbGF5IChWdWUpXHJcbiAqL1xyXG5JbmxpbmVWdWUuY3JlYXRlID0gZnVuY3Rpb24oc2VsLCBjb21wb25lbnQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbCk7XHJcbiAgICBpZihlbGVtZW50ID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB0ZW1wbGF0ZSA9IGA8ZGl2PlxyXG48cGFnZS12dWUgOmpzb249XCJqc29uXCI+PC9wYWdlLXZ1ZT5cclxuPC9kaXY+YDtcclxuXHJcbiAgICBjb25zdCBqc29uID0gSlNPTi5wYXJzZShlbGVtZW50LnRleHRDb250ZW50KTtcclxuXHJcbiAgICBjb25zdCBzdG9yZSA9IFNpdGUuc3RvcmU7XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50cyA9IHtcclxuICAgICAgICAgICAgJ3BhZ2UtdnVlJzogY29tcG9uZW50XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICBuZXcgU2l0ZS5WdWUoe1xyXG4gICAgICAgIGVsOiBlbGVtZW50LFxyXG4gICAgICAgIHN0b3JlLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAganNvbjoganNvblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxyXG4gICAgICAgIGNvbXBvbmVudHM6IGNvbXBvbmVudHMsXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn0iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL01hc2sudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTc4ZDA0ZTAwJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL01hc2sudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9NYXNrLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcY2hhcmxcXFxcRG9jdW1lbnRzXFxcXENsYXNzZXNcXFxcQ1NFMzM1XFxcXHdlYi1uZXdcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzc4ZDA0ZTAwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzc4ZDA0ZTAwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9NYXNrLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03OGQwNGUwMCZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc3OGQwNGUwMCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwidmVuZG9yL2NsL3NpdGUvanMvVnVlL01hc2sudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTWFzay52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL01hc2sudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL01hc2sudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTc4ZDA0ZTAwJlwiIiwiLyoqXHJcbiAqIEJhc2ljIFZ1ZS1iYXNlZCBzaXRlIHBhZ2Ugc3RhcnRlclxyXG4gKlxyXG4gKiBIb3cgdG8gdXNlOlxyXG4gKiBAY29kZVxyXG4gKiBzaXRlLnJlYWR5KCgpID0+IHtcclxuICogICAgUGFnZVZ1ZS5jcmVhdGUoJ2Rpdi5jbC1ncmFkZS1hc3NpZ25tZW50JywgJ0Fzc2lnbm1lbnQgR3JhZGUnLCBHcmFkZUFzc2lnbm1lbnRWdWUpO1xyXG4gKiAgICBQYWdlVnVlLmNyZWF0ZSgnZGl2LmNsLWdyYWRlcycsICdHcmFkZXMnLCBHcmFkZXNWdWUpO1xyXG4gKiB9KTtcclxuICogQGVuZGNvZGVcclxuICpcclxuICogQGNvbnN0cnVjdG9yIFBhZ2VWdWVcclxuICovXHJcbmV4cG9ydCBjb25zdCBQYWdlVnVlID0gZnVuY3Rpb24oKSB7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBwYWdlIGluIGEgZ2l2ZW4gY29tcG9uZW50LCByZXBsYWNpbmcgdGhlIHByb3ZpZGVkXHJcbiAqIHNlbGVjdG9yLiBUaGUgc2VsZWN0b3IgaXMgYXNzdW1lZCB0byBjb250YWluIEpTT04gZGF0YSB0aGF0IGlzXHJcbiAqIHRoZW4gcHJvdmlkZWQgdG8gdGhlIGNvbXBvbmVudCBpbiB0aGUganNvbiBwcm9wZXJ0eS5cclxuICpcclxuICogQHBhcmFtIHNlbCBTZWxlY3RvciBmb3IgYSBkaXYgdG8gcmVwbGFjZSB3aXRoIHRoZSB2aWV3LlxyXG4gKiBAcGFyYW0gdGl0bGUgSW5pdGlhbCB0aXRsZSB0byBhcHBseSB0byB0aGUgcGFnZVxyXG4gKiBAcGFyYW0gY29tcG9uZW50IENvbXBvbmVudCB0byBkaXNwbGF5IChWdWUpXHJcbiAqIEBwYXJhbSBuYXYgT3B0aW9uYWwgbmF2aWdhdGlvbiBjb21wb25lbnQsIGxpa2UgUGFnZU5hdlxyXG4gKi9cclxuUGFnZVZ1ZS5jcmVhdGUgPSBmdW5jdGlvbihzZWwsIHRpdGxlLCBjb21wb25lbnQsIG5hdikge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsKTtcclxuICAgIGlmKGVsZW1lbnQgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG5hdnRhZyA9IG5hdiAhPT0gdW5kZWZpbmVkID8gJzxwYWdlLW5hdiA6bWVudT1cIm1lbnVcIj48L3BhZ2UtbmF2PicgOiAnJztcclxuICAgIGxldCB0ZW1wbGF0ZSA9IGA8ZGl2PjxzaXRlLWhlYWRlciA6dGl0bGU9XCJ0aXRsZVwiPiR7bmF2dGFnfTwvc2l0ZS1oZWFkZXI+XHJcbjxwYWdlLXZ1ZSA6anNvbj1cImpzb25cIj48L3BhZ2UtdnVlPjxzaXRlLWZvb3Rlcj48L3NpdGUtZm9vdGVyPlxyXG48L2Rpdj5gO1xyXG5cclxuICAgIGNvbnN0IEhlYWRlciA9IFNpdGUuaW5mby5oZWFkZXIuY29tcG9uZW50KCk7XHJcbiAgICBjb25zdCBGb290ZXIgPSBTaXRlLmluZm8uZm9vdGVyLmNvbXBvbmVudCgpO1xyXG5cclxuICAgIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKGVsZW1lbnQudGV4dENvbnRlbnQpO1xyXG5cclxuICAgIGNvbnN0IHN0b3JlID0gU2l0ZS5zdG9yZTtcclxuXHJcbiAgICBjb25zdCBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICAgICAnc2l0ZS1oZWFkZXInOiBIZWFkZXIsXHJcbiAgICAgICAgICAgICdzaXRlLWZvb3Rlcic6IEZvb3RlcixcclxuICAgICAgICAgICAgJ3BhZ2UtdnVlJzogY29tcG9uZW50XHJcbiAgICAgICAgfTtcclxuICAgIGlmKG5hdiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29tcG9uZW50c1sncGFnZS1uYXYnXSA9IG5hdjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2l0ZSA9IFNpdGUuU2l0ZTtcclxuXHJcbiAgICBuZXcgU2l0ZS5WdWUoe1xyXG4gICAgICAgIGVsOiBlbGVtZW50LFxyXG4gICAgICAgIHNpdGUsXHJcbiAgICAgICAgc3RvcmUsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgIGpzb246IGpzb24sXHJcbiAgICAgICAgICAgIG1lbnU6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXHJcbiAgICAgICAgY29tcG9uZW50czogY29tcG9uZW50cyxcclxuICAgICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBTZXQgdGhlIHNpdGUgdGl0bGUuIFRoaXMgY2FuIGJlIHVzZWQgZnJvbVxyXG4gICAgICAgICAgICAgKiB0aGUgY2hpbGQgVnVlJ3MgdXNpbmcgdGhpcy4kcGFyZW50LnNldFRpdGxlKCcnKVxyXG4gICAgICAgICAgICAgKiBAbWVtYmVyb2YgUGFnZVZ1ZVxyXG4gICAgICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlIFRpdGxlIHRvIHNldFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc2V0VGl0bGU6IGZ1bmN0aW9uKHRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9IFNpdGUuaW5mby5zaXRlTmFtZSArICcgJyArIHRpdGxlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRNZW51OiBmdW5jdGlvbihtZW51KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnUgPSBtZW51O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRNZW51OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1lbnU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59IiwidmFyIHJlbmRlciwgc3RhdGljUmVuZGVyRm5zXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1BhZ2VWdWVCYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUGFnZVZ1ZUJhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxjaGFybFxcXFxEb2N1bWVudHNcXFxcQ2xhc3Nlc1xcXFxDU0UzMzVcXFxcd2ViLW5ld1xcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMTJiYmFlZjgnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMTJiYmFlZjgnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwidmVuZG9yL2NsL3NpdGUvanMvVnVlL1BhZ2VWdWVCYXNlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BhZ2VWdWVCYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUGFnZVZ1ZUJhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00M2IyNmJjYiZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00M2IyNmJjYiZsYW5nPXNjc3Mmc2NvcGVkPXRydWUmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjQzYjI2YmNiXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcY2hhcmxcXFxcRG9jdW1lbnRzXFxcXENsYXNzZXNcXFxcQ1NFMzM1XFxcXHdlYi1uZXdcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzQzYjI2YmNiJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzQzYjI2YmNiJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00M2IyNmJjYiZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc0M2IyNmJjYicsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwidmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9GZXRjaGVyVnVlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00M2IyNmJjYiZsYW5nPXNjc3Mmc2NvcGVkPXRydWUmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00M2IyNmJjYiZsYW5nPXNjc3Mmc2NvcGVkPXRydWUmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDNiMjZiY2Imc2NvcGVkPXRydWUmXCIiLCIvKipcclxuICogQGZpbGVcclxuICogQSBtZW1iZXJzaGlwIGFzc29jaWF0ZWQgd2l0aCBhIHVzZXIuXHJcbiAqXHJcbiAqIFRoaXMgaXMgYSBiYXNlIG9iamVjdCB0aGF0IHdpbGwgYmUgaW5oZXJpdGVkIGJ5XHJcbiAqIGFjdHVhbCBtZW1iZXJzaGlwIG9iamVjdHMuXHJcbiAqL1xyXG5cclxudmFyIE1lbWJlcnNoaXAgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvLy8gVGhlIFVzZXIgb2JqZWN0IGZvciB0aGlzIG1lbWJlcnNoaXBcclxuICAgIHRoaXMudXNlciA9IG51bGw7XHJcbn1cclxuXHJcbmV4cG9ydCB7TWVtYmVyc2hpcH07XHJcbiIsInZhciByZW5kZXIsIHN0YXRpY1JlbmRlckZuc1xuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Vc2VyVnVlQmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1VzZXJWdWVCYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcY2hhcmxcXFxcRG9jdW1lbnRzXFxcXENsYXNzZXNcXFxcQ1NFMzM1XFxcXHdlYi1uZXdcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJ2M3ZTRlNDllJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJ2M3ZTRlNDllJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIFxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZlbmRvci9jbC91c2Vycy9qcy9WdWUvVXNlclZ1ZUJhc2UudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVXNlclZ1ZUJhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Vc2VyVnVlQmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiXSwic291cmNlUm9vdCI6IiJ9