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
exports.push([module.i, "div.fetching[data-v-43b26bcb] {\n  height: 28px;\n  margin: 1em 0;\n}\ndiv.fetching p[data-v-43b26bcb] {\n  text-align: center;\n  font-style: italic;\n  color: #c41425;\n  padding-top: 2px;\n}\n.more[data-v-43b26bcb] {\n  text-align: center;\n}\n.more button[data-v-43b26bcb] {\n  font-size: 0.8em;\n  height: 28px;\n  margin: 0;\n}\n\n", ""]);

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
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
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
                                }),
                                0
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
/*
 * The main Review system entry point
 */
//
// Install the console components
//







if (Site.Site.console !== undefined) {
  _js_Console_ReviewConsole__WEBPACK_IMPORTED_MODULE_1__["ReviewConsole"].setup(Site.Site.console);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1tuYW1lXS92ZW5kb3IvY2wvY29uc29sZS9qcy9Db25zb2xlQ29tcG9uZW50QmFzZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdL3ZlbmRvci9jbC9jb3Vyc2UvanMvQ29uc29sZS9NZW1iZXJzL01lbWJlcnNGZXRjaGVyQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly9bbmFtZV0vdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1Jldmlld1Jldmlld2Vycy52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdzQnlGb3JNZW1iZXIudnVlIiwid2VicGFjazovL1tuYW1lXS92ZW5kb3IvY2wvcmV2aWV3L2pzL1Jldmlld1Z1ZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3c1Z1ZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdL3ZlbmRvci9jbC9zaXRlL2pzL1Z1ZS9NYXNrLnZ1ZSIsIndlYnBhY2s6Ly9bbmFtZV0vdmVuZG9yL2NsL3NpdGUvanMvVnVlL1BhZ2VWdWVCYXNlLnZ1ZSIsIndlYnBhY2s6Ly9bbmFtZV0vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9GZXRjaGVyVnVlLnZ1ZSIsIndlYnBhY2s6Ly9bbmFtZV0vdmVuZG9yL2NsL3VzZXJzL2pzL1Z1ZS9Vc2VyVnVlQmFzZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3Jldmlldy9fcmV2aWV3LnNjc3MiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3NpdGUvanMvVUkvX2VkaXRvci5zY3NzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWU/OGU4MCIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL2NvdXJzZS9qcy9Db25zb2xlL01lbWJlcnMvTWVtYmVyc0ZldGNoZXJDb21wb25lbnQudnVlP2E3NzciLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1Jldmlld1Jldmlld2Vycy52dWU/YWYxMiIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZT9hZWUyIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3VnVlLnZ1ZT81MDU4Iiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3c1Z1ZS52dWU/NDNkZiIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvc2l0ZS9qcy9WdWUvTWFzay52dWU/OWM0NSIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTGliL0ZldGNoZXJWdWUudnVlP2U3MjUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9GZXRjaGVyVnVlLnZ1ZT83YTAwIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9jb25zb2xlL2pzL0NvbnNvbGVDb21wb25lbnRCYXNlLnZ1ZSIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvY29uc29sZS9qcy9Db25zb2xlQ29tcG9uZW50QmFzZS52dWU/ODhkMSIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvY291cnNlL2pzL0NvbnNvbGUvTWVtYmVycy9NZW1iZXJzRmV0Y2hlckNvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL2NvdXJzZS9qcy9Db25zb2xlL01lbWJlcnMvTWVtYmVyc0ZldGNoZXJDb21wb25lbnQudnVlPzhjYzUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL2NvdXJzZS9qcy9Db25zb2xlL01lbWJlcnMvTWVtYmVyc0ZldGNoZXJDb21wb25lbnQudnVlP2YyYWYiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL2NvdXJzZS9qcy9Db25zb2xlL01lbWJlcnMvU3R1ZGVudHNPbmx5LmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9jb3Vyc2UvanMvTWVtYmVycy9NZW1iZXIuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3Jldmlldy9fcmV2aWV3LnNjc3M/NTVhNSIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvcmV2aWV3L2luZGV4LmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdDb25zb2xlLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdSZXZpZXdlcnMudnVlIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdSZXZpZXdlcnMudnVlP2Q2M2IiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9Db25zb2xlL1Jldmlld1Jldmlld2Vycy52dWU/ZWM0YSIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZSIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZT81OTRlIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdzQnlGb3JNZW1iZXIudnVlP2JjMDkiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdWdWUudnVlIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3VnVlLnZ1ZT82MTY0Iiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3VnVlLnZ1ZT9iMzNkIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3c1Z1ZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdzVnVlLnZ1ZT80Y2MwIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9yZXZpZXcvanMvUmV2aWV3c1Z1ZS52dWU/NTVmMCIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvc2l0ZS9qcy9UaW1lRm9ybWF0dGVyLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9zaXRlL2pzL1VJL0VkaXRvci5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvc2l0ZS9qcy9VSS9FZGl0b3JPcHRpb25zLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9zaXRlL2pzL1VJL19lZGl0b3Iuc2Nzcz8yYWViIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9zaXRlL2pzL1Z1ZS9JbmxpbmVWdWUuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3NpdGUvanMvVnVlL01hc2sudnVlIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9zaXRlL2pzL1Z1ZS9NYXNrLnZ1ZT9mYzQ1Iiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9zaXRlL2pzL1Z1ZS9NYXNrLnZ1ZT85YWQ2Iiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9zaXRlL2pzL1Z1ZS9QYWdlVnVlLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9zaXRlL2pzL1Z1ZS9QYWdlVnVlQmFzZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3NpdGUvanMvVnVlL1BhZ2VWdWVCYXNlLnZ1ZT8xMThhIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9GZXRjaGVyVnVlLnZ1ZT83MjY4Iiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWU/NDk3YiIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTGliL0ZldGNoZXJWdWUudnVlPzJmMTIiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL1VzZXJzL01lbWJlcnNoaXAuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL1Z1ZS9Vc2VyVnVlQmFzZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL1Z1ZS9Vc2VyVnVlQmFzZS52dWU/YjZlMSJdLCJuYW1lcyI6WyJMT0NBTF9TVE9SQUdFX1NUVURFTlRTX09OTFkiLCJTdHVkZW50c09ubHkiLCJnZXQiLCJsb2NhbFN0b3JhZ2UiLCJ3aW5kb3ciLCJzIiwiZ2V0SXRlbSIsInNldCIsInN0dWRlbnRzIiwic2V0SXRlbSIsIk1lbWJlciIsImpzb24iLCJNZW1iZXJzaGlwIiwiY2FsbCIsInJvbGUiLCJ1bmRlZmluZWQiLCJpZCIsInNlbWVzdGVyIiwic2VjdGlvbiIsInNldFJvbGUiLCJyb2xlXyIsInByb3RvdHlwZSIsIk9iamVjdCIsImNyZWF0ZSIsImNvbnN0cnVjdG9yIiwiZ2V0U2VjdGlvbiIsInN0b3JlIiwiZ2V0dGVycyIsImdldEFzc2lnbm1lbnQiLCJhc3NpZ250YWciLCJHVUVTVCIsIlVTRVIiLCJEUk9QUEVEIiwiU1RVREVOVCIsIlNUQUZGIiwiR1JBREVSIiwiVEEiLCJJTlNUUlVDVE9SIiwiQURNSU4iLCJnZXRSb2xlcyIsInJvbGVzIiwibmFtZSIsInByaW9yaXR5Iiwic2tpcCIsIlNpdGUiLCJjb25zb2xlIiwiUmV2aWV3Q29uc29sZSIsInNldHVwIiwicmVhZHkiLCJQYWdlVnVlIiwiUmV2aWV3VnVlIiwiSW5saW5lVnVlIiwiUmV2aWV3c1Z1ZSIsIkNvbnNvbGUiLCJSZXZpZXciLCJSZXZpZXdzQnlGb3JNZW1iZXJWdWUiLCJ0YWJsZXMiLCJhZGQiLCJ0aXRsZSIsIm9yZGVyIiwiYXBpIiwiY29tcG9uZW50cyIsImFkZFJvdXRlIiwicm91dGUiLCJjb21wb25lbnQiLCJSZXZpZXdSZXZpZXdlcnNWdWUiLCJwcm9wcyIsImNvdXJzZSIsImFzc2lnbm1lbnRMaW5rIiwiVGltZUZvcm1hdHRlciIsInJlbGF0aXZlIiwidGltZSIsImN1cnJlbnRUaW1lIiwiZm9ybWF0IiwibW9tZW50Iiwibm93IiwiZWxhcHNlZCIsImRpZmYiLCJtaW5zIiwiTWF0aCIsImZsb29yIiwiZGF0ZSIsIm1vbnRoIiwieWVhciIsImhvdXIiLCJhbSIsIm1pbnV0ZSIsImFic29sdXRlVU5JWCIsInQiLCJ1bml4IiwicmVsYXRpdmVVTklYIiwiYyIsIkVkaXRvciIsImVsZW1lbnQiLCJvcHRpb25zIiwiRWRpdG9yT3B0aW9ucyIsIkpTT04iLCJwYXJzZSIsInRleHRDb250ZW50IiwiY2xhc3NMaXN0Iiwic3R5bGUiLCJkaXNwbGF5IiwicmVzaXplciIsIlJlc2l6ZXIiLCJyZXNpemUiLCJoYW5kbGUiLCJncmFiU2l6ZSIsInRhIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidGV4dGFyZWEiLCJjbGFzc2VzIiwiY2xzIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJ2YWx1ZSIsImNvZGUiLCJoZWlnaHQiLCJtaW5IZWlnaHQiLCJzcGVsbGNoZWNrIiwiaW5zZXJ0VGV4dFN1cHBvcnRlZCIsInF1ZXJ5Q29tbWFuZFN1cHBvcnRlZCIsImRlbGV0ZVN1cHBvcnRlZCIsImp1c3RJbmRlbnRlZCIsInRhYiIsImF1dG9JbmRlbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJ3aGljaCIsInByZXZlbnREZWZhdWx0Iiwic2hpZnRLZXkiLCJ0YWJBdENhcmV0IiwidW5UYWIiLCJyZXR1cm5XaXRoSW5kZW50IiwidW5EZW50IiwidG9wIiwic2Nyb2xsVG9wIiwibGVmdCIsInNjcm9sbExlZnQiLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJkU2VsIiwic2VsZWN0aW9uU3RhcnQiLCJzdGFydFBvcyIsImVuZFBvcyIsInNlbGVjdGlvbkVuZCIsImJlZm9yZSIsInN1YnN0cmluZyIsInNwbGl0IiwibGFzdExpbmUiLCJsZW5ndGgiLCJsYXN0TGVuIiwidG9BZGQiLCJ0YWJTaXplIiwic3BhY2VzIiwiaSIsImluc2VydFRleHQiLCJ2YWwiLCJsaW5lUG9zIiwibGluZSIsIm5leHRMaW5lUG9zIiwiaW5zZXJ0aW9ucyIsImZvY3VzIiwiZGVsZXRpb25zIiwiZmlyc3RMaW5lIiwiZGVsZXRlVGV4dCIsInNwYWNlIiwiYWZ0ZXIiLCJsYXN0IiwiY2hhckF0IiwibXlWYWx1ZSIsInNwYWNlU3RyIiwic3Vic3RyIiwidGV4dCIsImV4ZWNDb21tYW5kIiwicG9zIiwicHJvcGVydHkiLCJoYXNPd25Qcm9wZXJ0eSIsIkVycm9yIiwic2VsIiwicXVlcnlTZWxlY3RvciIsInRlbXBsYXRlIiwiVnVlIiwiZWwiLCJkYXRhIiwibWV0aG9kcyIsIm5hdiIsIm5hdnRhZyIsIkhlYWRlciIsImluZm8iLCJoZWFkZXIiLCJGb290ZXIiLCJmb290ZXIiLCJzaXRlIiwibWVudSIsInNldFRpdGxlIiwic2l0ZU5hbWUiLCJzZXRNZW51IiwiZ2V0TWVudSIsInVzZXIiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RBO0FBRUE7QUFDQSxvRkFEQTtBQUVBO0FBQ0E7Ozs7OztBQU1BLFdBUEEsbUJBT0EsS0FQQSxFQU9BLEtBUEEsRUFPQSxPQVBBLEVBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQVhBOztBQWFBOzs7Ozs7QUFNQSxlQW5C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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ2UsZ0Y7Ozs7Ozs7Ozs7OztBQ2pDZjtBQUFBO0FBQUEsd0NBQXFNLENBQWdCLHFQQUFHLEVBQUMsQyIsImZpbGUiOiJyZXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJSZXZpZXdcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiUmV2aWV3XCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCI8IS0tXHJcbkBmaWxlXHJcbkJhc2UgY29tcG9uZW50IGZvciBjb25zb2xlIHBhZ2VzLlxyXG5cclxuUHJvdmlkZXM6XHJcbm5hdjIgbWVudSBzdXBwb3J0IHdpdGggYXV0b21hdGljIHJlbW92YWwuXHJcbi0tPlxyXG5cclxuPHNjcmlwdD5cclxuICAgIGltcG9ydCBVc2VyVnVlQmFzZSBmcm9tICd1c2Vycy1jbC9qcy9WdWUvVXNlclZ1ZUJhc2UudnVlJztcclxuXHJcbiAgICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICAgICdleHRlbmRzJzogVXNlclZ1ZUJhc2UsXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQWRkIGFuIG9wdGlvbiB0byB0aGUgbmF2MiBtZW51LlxyXG4gICAgICAgICAgICogQHBhcmFtIHRpdGxlIFRpdGxlIG9mIHRoZSBvcHRpb24gdG8gYWRkLlxyXG4gICAgICAgICAgICogQHBhcmFtIG9yZGVyIE9yZGVyIGluIHRoZSBtZW51LlxyXG4gICAgICAgICAgICogQHBhcmFtIGNsb3N1cmUgRnVuY3Rpb24gdG8gY2FsbCB3aGVuIHNlbGVjdGVkLlxyXG4gICAgICAgICAgICovXHJcbiAgICAgICAgICBhZGROYXYyKHRpdGxlLCBvcmRlciwgY2xvc3VyZSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLiRzaXRlLmNvbnNvbGUuY29tcG9uZW50cy5hZGROYXYyTGluayh0aGlzLCB0aXRsZSwgb3JkZXIsIGNsb3N1cmUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50czEucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBBZGQgYW4gb3B0aW9uIHRvIHRoZSBuYXYyIG1lbnUgdGhhdCBpcyBhIHJvdXRlciBsaW5rXHJcbiAgICAgICAgICAgKiBAcGFyYW0gdGl0bGUgVGl0bGUgb2YgdGhlIG9wdGlvbiB0byBhZGQuXHJcbiAgICAgICAgICAgKiBAcGFyYW0gb3JkZXIgT3JkZXIgaW4gdGhlIG1lbnUuXHJcbiAgICAgICAgICAgKiBAcGFyYW0gbGluayBMaW5rIHdpdGhvdXQgU2l0ZS5yb290XHJcbiAgICAgICAgICAgKi9cclxuICAgICAgICAgIGFkZE5hdjJMaW5rKHRpdGxlLCBvcmRlciwgbGluaykge1xyXG4gICAgICAgICAgICAgIHRoaXMuYWRkTmF2Mih0aXRsZSwgb3JkZXIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goU2l0ZS5yb290ICsgbGluayk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgIHJlbW92ZU5hdjIoaXRlbSkge1xyXG4gICAgICAgICAgICAgIGxldCBpID0gdGhpcy5jb21wb25lbnRzMS5pbmRleE9mKGl0ZW0pO1xyXG4gICAgICAgICAgICAgIGlmKGkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMxLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgICB0aGlzLiRzaXRlLmNvbnNvbGUuY29tcG9uZW50cy5yZW1vdmVOYXYyKHRoaXMsIGl0ZW0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBjcmVhdGVkKCkge1xyXG4gICAgICBcdHRoaXMuY29tcG9uZW50czEgPSBbXTtcclxuICAgICAgfSxcclxuICAgICAgYmVmb3JlRGVzdHJveSgpIHtcclxuICAgICAgXHR0aGlzLiRzaXRlLmNvbnNvbGUuY29tcG9uZW50cy5yZW1vdmVOYXYyKHRoaXMsIHRoaXMuY29tcG9uZW50czEpO1xyXG4gICAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXY+XHJcbiAgICAgIDxsYWJlbCBzdHlsZT1cImRpc3BsYXk6bm9uZVwiIHJlZj1cInN0dWRlbnRzLW9ubHlcIiA+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHYtbW9kZWw9XCJzdHVkZW50c1wiIEBjaGFuZ2U9XCJzdHVkZW50c09ubHlDaGFuZ2VkXCI+IFN0dWRlbnRzIE9ubHk8L2xhYmVsPlxyXG4gICAgICA8ZmV0Y2hlciA6ZmV0Y2hlcj1cImZldGNoZXJcIiA6ZmV0Y2hpbmc9XCJmZXRjaGluZ1wiPlxyXG4gICAgICAgIDxzbG90IDp1c2Vycz1cInVzZXJzXCIgOnN0dWRlbnRzPVwic3R1ZGVudHNcIj48L3Nsb3Q+XHJcbiAgICAgICAgPHAgdi1pZj1cInVzZXJzLmxlbmd0aCA9PSAwXCIgY2xhc3M9XCJjZW50ZXJib3ggY29tcCBjZW50ZXJcIj5cclxuICAgICAgICAgIFRoZXJlIGFyZSBjdXJyZW50bHkgbm8gbWVtYmVycyBlbnJvbGxlZCBpbiB0aGlzIHNlY3Rpb24uPC9wPlxyXG4gICAgICA8L2ZldGNoZXI+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gICAgaW1wb3J0IHttYXBTdGF0ZX0gZnJvbSAndnVleCc7XHJcbiAgICBpbXBvcnQgRmV0Y2hlclZ1ZSBmcm9tICd1c2Vycy1jbC9qcy9MaWIvRmV0Y2hlclZ1ZS52dWUnO1xyXG4gICAgaW1wb3J0IHtNZW1iZXJ9IGZyb20gJy4uLy4uL01lbWJlcnMvTWVtYmVyJ1xyXG4gICAgaW1wb3J0IHtTdHVkZW50c09ubHl9IGZyb20gJy4vU3R1ZGVudHNPbmx5JztcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1lbWJlciBmZXRjaGVyIGNvbXBvbmVudCB0aGF0IGNhbiBiZSB1c2VkIGJ5IHZpZXdzLlxyXG4gICAgICpcclxuICAgICAqIEBjb25zdHJ1Y3RvciBNZW1iZXJzRmV0Y2hlckNvbXBvbmVudFZ1ZVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICAgICAgLy8gSWYgdGhlIGZldGNoaW5nIHZhbHVlIGl0IHRydWUsIHRoZSB1c2luZyBjbGllbnRcclxuICAgICAgICAvLyBpcyBmZXRjaGluZyBtb3JlIHRoYW4ganVzdCB0aGUgbWVtYmVyc2hpcCBhbmQgd2Ugd2lsbFxyXG4gICAgICAgIC8vIHdhaXQgZm9yIHRoYXQgYXMgd2VsbC5cclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBmZXRjaGluZzoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3R1ZGVudHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc3R1ZGVudHNFbGVtZW50OiBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgICAgZmV0Y2hNb3JlKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ21lbWJlcnMvbW9yZScpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQWRkIFwiU3R1ZGVudHMgT25seVwiIHRvIHRoZSBtZW51IGJhclxyXG4gICAgICAgICAgICAgKiBAbWVtYmVyb2YgTWVtYmVyc0ZldGNoZXJDb21wb25lbnRWdWVcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGFkZFN0dWRlbnRzT25seSgpIHtcclxuICAgICAgICAgICAgXHR0aGlzLnN0dWRlbnRzID0gU3R1ZGVudHNPbmx5LmdldCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy4kcmVmc1snc3R1ZGVudHMtb25seSddO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBleHRyYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5jbC1zZWN0aW9uLWNvbXBvbmVudCBzcGFuLmV4dHJhJyk7XHJcbiAgICAgICAgICAgICAgICBleHRyYS5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc3R1ZGVudHNFbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3R1ZGVudHNPbmx5Q2hhbmdlZCgpIHtcclxuICAgICAgICAgICAgXHRTdHVkZW50c09ubHkuc2V0KHRoaXMuc3R1ZGVudHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wdXRlZDogbWFwU3RhdGUoe1xyXG4gICAgICAgICAgICB1c2VycyhzdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3R1ZGVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUubWVtYmVycy51c2Vycy5maWx0ZXIoKHVzZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVzZXIucm9sZSgpID09PSBNZW1iZXIuU1RVREVOVFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUubWVtYmVycy51c2VycztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmV0Y2hlcjogc3RhdGUgPT4gc3RhdGUubWVtYmVycy5mZXRjaGVyXHJcblxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGNvbXBvbmVudHM6IHtcclxuICAgICAgICAgICAgJ2ZldGNoZXInOiBGZXRjaGVyVnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb3VudGVkKCkge1xyXG5cdCAgICAgICAgdGhpcy5zdHVkZW50cyA9IFN0dWRlbnRzT25seS5nZXQoKTtcclxuICAgICAgICAgICAgY29uc3QgbWVtYmVyID0gdGhpcy4kc3RvcmUuc3RhdGUudXNlci51c2VyLm1lbWJlcjtcclxuICAgICAgICAgICAgbGV0IHF1ZXJ5ID0ge1xyXG4gICAgICAgICAgICAgICAgc2VtZXN0ZXI6IG1lbWJlci5zZW1lc3RlcixcclxuICAgICAgICAgICAgICAgIHNlY3Rpb246IG1lbWJlci5zZWN0aW9uXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnbWVtYmVycy9xdWVyeScsIHF1ZXJ5KTtcclxuICAgICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ21lbWJlcnMvZmV0Y2gnKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTdHVkZW50c09ubHkoKTtcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiZWZvcmVEZXN0cm95KCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0dWRlbnRzRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc3R1ZGVudHNFbGVtZW50KTtcclxuICAgICAgICAgICAgbGV0IGV4dHJhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdi5jbC1zZWN0aW9uLWNvbXBvbmVudCBzcGFuLmV4dHJhJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImZ1bGwgY2wtcmV2aWV3aW5nXCI+XHJcbiAgICAgIDxtYXNrLXZ1ZSA6bWFzaz1cIm1hc2tcIj5Db21tdW5pY2F0aW5nIHdpdGggc2VydmVyLi4uPC9tYXNrLXZ1ZT5cclxuXHJcbiAgICAgIDxtZW1iZXJzZmV0Y2hlciA6ZmV0Y2hpbmc9XCJyZXZpZXdpbmcgPT09IG51bGxcIj5cclxuICAgICAgICA8dGVtcGxhdGUgc2xvdC1zY29wZT1cImZldGNoZXJcIj5cclxuICAgICAgICAgIDxkaXYgdi1pZj1cInJldmlld2luZyAhPT0gbnVsbCAmJiB1c2VyLmF0TGVhc3QoaW5zdHJ1Y3RvcilcIj5cclxuICAgICAgICAgICAgPGZvcm0gbWV0aG9kPVwicG9zdFwiIEBzdWJtaXQucHJldmVudD1cImFzc2lnblJldmlld3NcIj5cclxuICAgICAgICAgICAgICA8cCBjbGFzcz1cImNlbnRlclwiPjxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkFzc2lnbiBSZXZpZXdzPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8c2VsZWN0IHYtbW9kZWw9XCJyZXZpZXdlckNudFwiPlxyXG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHYtZm9yPVwibnVtIGluIDZcIiA6dmFsdWU9XCJudW1cIj57e251bX19PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDx0YWJsZSB2LWlmPVwicmV2aWV3aW5nIT09bnVsbFwiIGNsYXNzPVwic21hbGxcIj5cclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgIDx0aD5Vc2VyPC90aD5cclxuICAgICAgICAgICAgICA8dGggdi1mb3I9XCJpIGluIG1heFJldmlld2VyXCI+cmV2aWV3ZWU8L3RoPlxyXG4gICAgICAgICAgICAgIDx0aCB2LWZvcj1cImkgaW4gbWF4UmV2aWV3ZWVcIj5yZXZpZXdlcjwvdGg+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDx0ciB2LWZvcj1cInVzZXIgaW4gZmV0Y2hlci51c2Vyc1wiPlxyXG4gICAgICAgICAgICAgIDx0ZD48YSA6dGl0bGU9XCJ1c2VyLm5hbWVcIj57e3VzZXIudXNlcklkfX08L2E+PC90ZD5cclxuICAgICAgICAgICAgICA8dGQgdi1mb3I9XCJpIGluIG1heFJldmlld2VyXCIgOmNsYXNzPVwiY2xzKHJldmlld2VyW3VzZXIubWVtYmVyLmlkXSwgaS0xKVwiPjxzcGFuIHYtaHRtbD1cImRpc3BsYXkoZmV0Y2hlci51c2VycywgcmV2aWV3ZXJbdXNlci5tZW1iZXIuaWRdLCBpLTEpXCI+PC9zcGFuPjwvdGQ+XHJcbiAgICAgICAgICAgICAgPHRkIHYtZm9yPVwiaSBpbiBtYXhSZXZpZXdlZVwiIDpjbGFzcz1cImNscyhyZXZpZXdlZVt1c2VyLm1lbWJlci5pZF0sIGktMSlcIj48c3BhbiB2LWh0bWw9XCJkaXNwbGF5KGZldGNoZXIudXNlcnMsIHJldmlld2VlW3VzZXIubWVtYmVyLmlkXSwgaS0xKVwiPjwvc3Bhbj48L3RkPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICA8L3RlbXBsYXRlPlxyXG4gICAgICA8L21lbWJlcnNmZXRjaGVyPlxyXG5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBpbXBvcnQge01lbWJlcn0gZnJvbSAnY291cnNlLWNsL2pzL01lbWJlcnMvTWVtYmVyJztcclxuXHRpbXBvcnQgQ29uc29sZUNvbXBvbmVudEJhc2UgZnJvbSAnY29uc29sZS1jbC9qcy9Db25zb2xlQ29tcG9uZW50QmFzZS52dWUnO1xyXG5cdGltcG9ydCBNZW1iZXJzRmV0Y2hlckNvbXBvbmVudCBmcm9tICdjb3Vyc2UtY2wvanMvQ29uc29sZS9NZW1iZXJzL01lbWJlcnNGZXRjaGVyQ29tcG9uZW50LnZ1ZSc7XHJcbiAgaW1wb3J0IE1hc2tWdWUgZnJvbSAnc2l0ZS1jbC9qcy9WdWUvTWFzay52dWUnO1xyXG5cclxuXHRleHBvcnQgZGVmYXVsdCB7XHJcblx0XHQnZXh0ZW5kcyc6IENvbnNvbGVDb21wb25lbnRCYXNlLFxyXG5cdFx0cHJvcHM6IFsnYXNzaWdudGFnJ10sXHJcblx0XHRkYXRhOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRhc3NpZ25tZW50OiBudWxsLFxyXG4gICAgICAgIHJldmlld2VyQ250OiAyLFxyXG4gICAgICAgIHJldmlld2luZzogJ3gnLFxyXG4gICAgICAgIGluc3RydWN0b3I6IE1lbWJlci5JTlNUUlVDVE9SLFxyXG4gICAgICAgIHJldmlld2VyOiBudWxsLFxyXG4gICAgICAgIHJldmlld2VlOiBudWxsLFxyXG4gICAgICAgIG1heFJldmlld2VyOiAwLFxyXG4gICAgICAgIG1heFJldmlld2VlOiAwLFxyXG5cdFx0ICAgIG1hc2s6IGZhbHNlXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRjb21wb25lbnRzOiB7XHJcblx0XHRcdCdtZW1iZXJzZmV0Y2hlcic6IE1lbWJlcnNGZXRjaGVyQ29tcG9uZW50LFxyXG4gICAgICBtYXNrVnVlOiBNYXNrVnVlXHJcblx0XHR9LFxyXG5cdFx0bW91bnRlZCgpIHtcclxuXHRcdFx0Y29uc3QgbWVtYmVyID0gdGhpcy4kc3RvcmUuc3RhdGUudXNlci51c2VyLm1lbWJlcjtcclxuXHJcblx0XHRcdHRoaXMuc2VjdGlvbiA9IHRoaXMuJHN0b3JlLmdldHRlcnNbJ2NvdXJzZS9zZWN0aW9uJ10obWVtYmVyLnNlbWVzdGVyLCBtZW1iZXIuc2VjdGlvbik7XHJcblx0XHRcdHRoaXMuYXNzaWdubWVudCA9IHRoaXMuc2VjdGlvbi5nZXRBc3NpZ25tZW50KHRoaXMuYXNzaWdudGFnKTtcclxuXHJcblx0XHRcdHRoaXMuc2V0VGl0bGUoJzogJyArIHRoaXMuYXNzaWdubWVudC5zaG9ydG5hbWUgKyAnIFJldmlld2luZycpO1xyXG4gICAgICB0aGlzLm1hc2sgPSB0cnVlO1xyXG5cclxuICAgICAgU2l0ZS5hcGkuZ2V0KCcvYXBpL3Jldmlldy9yZXZpZXdlcnMvJyArIHRoaXMuYXNzaWdudGFnLCB7fSlcclxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBcdHRoaXMubWFzayA9IGZhbHNlO1xyXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5oYXNFcnJvcigpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFrZShyZXNwb25zZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBTaXRlLnRvYXN0KHRoaXMsIHJlc3BvbnNlKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgXHR0aGlzLm1hc2sgPSBmYWxzZTtcclxuICAgICAgICAgIFNpdGUudG9hc3QodGhpcywgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHRcdH0sXHJcblx0XHRtZXRob2RzOiB7XHJcblx0XHRcdGFzc2lnblJldmlld3MoKSB7XHJcblx0XHRcdFx0dGhpcy5tYXNrID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0bGV0IHBhcmFtcyA9IHtcclxuXHRcdFx0ICAgIGNudDogdGhpcy5yZXZpZXdlckNudFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRTaXRlLmFwaS5wb3N0KCcvYXBpL3Jldmlldy9yZXZpZXdlcnMvJyArIHRoaXMuYXNzaWdudGFnLCBwYXJhbXMpXHJcblx0XHRcdFx0ICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHQgICAgICAgICAgdGhpcy5tYXNrID0gZmFsc2U7XHJcblx0XHRcdFx0ICAgICAgICBpZiAoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcclxuXHRcdFx0ICAgICAgICAgICAgdGhpcy50YWtlKHJlc3BvbnNlKTtcclxuXHRcdFx0XHQgICAgICAgIH0gZWxzZSB7XHJcblx0XHRcdFx0ICAgICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCByZXNwb25zZSk7XHJcblx0XHRcdFx0ICAgICAgICB9XHJcblxyXG5cdFx0XHRcdCAgICB9KVxyXG5cdFx0XHRcdCAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcblx0XHRcdCAgICAgICAgICB0aGlzLm1hc2sgPSBmYWxzZTtcclxuXHRcdFx0XHQgICAgICAgIFNpdGUudG9hc3QodGhpcywgZXJyb3IpO1xyXG5cdFx0XHRcdCAgICB9KTtcclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHRha2UocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRjb25zdCBkYXRhID0gcmVzcG9uc2UuZ2V0RGF0YSgncmV2aWV3ZXJzJykuYXR0cmlidXRlcztcclxuXHJcblx0XHRcdFx0dGhpcy5yZXZpZXdlciA9IHt9O1xyXG5cdFx0XHRcdHRoaXMucmV2aWV3ZWUgPSB7fTtcclxuXHQgICAgICB0aGlzLm1heFJldmlld2VyID0gMDtcclxuXHQgICAgICB0aGlzLm1heFJldmlld2VlID0gMDtcclxuXHJcblx0XHRcdFx0Zm9yKGxldCBhc3NpZ24gb2YgZGF0YSkge1xyXG5cdFx0XHRcdFx0Y29uc3QgcmV2aWV3ZXIgPSBhc3NpZ25bMF07XHJcblx0XHRcdFx0XHRjb25zdCByZXZpZXdlZSA9IGFzc2lnblsxXTtcclxuXHRcdFx0XHRcdGNvbnN0IGNudCA9IGFzc2lnblsyXTtcclxuXHJcblx0XHRcdFx0XHRpZih0aGlzLnJldmlld2VyW3Jldmlld2VyXSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMucmV2aWV3ZXJbcmV2aWV3ZXJdID0gW107XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy5yZXZpZXdlcltyZXZpZXdlcl0ucHVzaChbcmV2aWV3ZWUsIGNudF0pO1xyXG5cdFx0XHRcdFx0aWYodGhpcy5yZXZpZXdlcltyZXZpZXdlcl0ubGVuZ3RoID4gdGhpcy5tYXhSZXZpZXdlcikge1xyXG5cdFx0XHRcdFx0XHR0aGlzLm1heFJldmlld2VyID0gdGhpcy5yZXZpZXdlcltyZXZpZXdlcl0ubGVuZ3RoO1xyXG4gICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICBpZih0aGlzLnJldmlld2VlW3Jldmlld2VlXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV2aWV3ZWVbcmV2aWV3ZWVdID0gW107XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy5yZXZpZXdlZVtyZXZpZXdlZV0ucHVzaChbcmV2aWV3ZXIsIGNudF0pO1xyXG4gICAgICAgICAgaWYodGhpcy5yZXZpZXdlZVtyZXZpZXdlZV0ubGVuZ3RoID4gdGhpcy5tYXhSZXZpZXdlZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1heFJldmlld2VlID0gdGhpcy5yZXZpZXdlcltyZXZpZXdlcl0ubGVuZ3RoO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIGRpc3BsYXkodXNlcnMsIGFzc2lnbiwgaSkge1xyXG5cdFx0XHRcdGlmKGFzc2lnbiA9PT0gdW5kZWZpbmVkIHx8IGkgPj0gYXNzaWduLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuICcgJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcihsZXQgdXNlciBvZiB1c2Vycykge1xyXG4gICAgICAgIFx0aWYodXNlci5tZW1iZXIuaWQgPT09IGFzc2lnbltpXVswXSkge1xyXG4gICAgICAgIFx0XHRyZXR1cm4gYDxhIHRpdGxlPVwiJHt1c2VyLm5hbWV9XCI+JHt1c2VyLnVzZXJJZH08L2E+LyR7YXNzaWduW2ldWzFdfWA7ICAvLyB1c2VyLnVzZXJJZCArICcvJyArIGFzc2lnbltpXVsxXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAnICc7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNscyhhc3NpZ24sIGkpIHtcclxuICAgICAgICBpZihhc3NpZ24gPT09IHVuZGVmaW5lZCB8fCBpID49IGFzc2lnbi5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhc3NpZ25baV1bMV0gPCAxID8gJ2NsLWVtcHR5JyA6ICcnO1xyXG5cclxuICAgICAgfVxyXG5cdFx0fVxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwiY2wtcmV2aWV3c1wiPlxyXG4gICAgPGgyPlN0YWZmIFJldmlldzwvaDI+XHJcbiAgICA8Zm9ybSBtZXRob2Q9XCJwb3N0XCIgQHN1Ym1pdC5wcmV2ZW50PVwic3VibWl0XCI+XHJcbiAgICAgIDxkaXYgcmVmPVwiZWRpdG9yXCI+PC9kaXY+XHJcbiAgICAgIDxwPjxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJTdWJtaXQgUmV2aWV3XCI+PC9wPlxyXG4gICAgPC9mb3JtPlxyXG5cclxuICAgIDxoMz5SZXZpZXdzIGJ5IHRoaXMgdXNlci48L2gzPlxyXG4gICAgPHAgdi1pZj1cImJ5UmV2aWV3cy5sZW5ndGggID09PSAwXCIgY2xhc3M9XCJjZW50ZXJcIj5Ob25lPC9wPlxyXG4gICAgPGRpdiB2LWZvcj1cInJldmlldyBpbiBieVJldmlld3NcIiBjbGFzcz1cImNsLXJldmlld1wiPlxyXG4gICAgICA8aDMgOmNsYXNzPVwicmV2aWV3LnJldmlld2VlLmF0TGVhc3Qoc3RhZmZSb2xlKSA/ICdzdGFmZicgOiAnJ1wiPnt7Zm9ybWF0VGltZShyZXZpZXcudGltZSl9fSBSZXZpZXcgYnkge3tyZXZpZXcucmV2aWV3ZWUubmFtZX19XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjbC1zdWJtaXR0ZWRcIj57e3Nob3dTdWJtaXNzaW9ucyhyZXZpZXcpfX08L3NwYW4+PC9oMz5cclxuICAgICAgPHByZT57e3Jldmlldy5tZXRhLnJldmlldy5yZXZpZXd9fTwvcHJlPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8aDM+UmV2aWV3cyBvZiB0aGlzIHVzZXIncyBhc3NpZ25tZW50LjwvaDM+XHJcbiAgICA8cCB2LWlmPVwiZm9yUmV2aWV3cy5sZW5ndGggID09PSAwXCIgY2xhc3M9XCJjZW50ZXJcIj5Ob25lPC9wPlxyXG4gICAgPGRpdiB2LWZvcj1cInJldmlldyBpbiBmb3JSZXZpZXdzXCIgY2xhc3M9XCJjbC1yZXZpZXdcIj5cclxuICAgICAgPGgzIDpjbGFzcz1cInJldmlldy5yZXZpZXdlci5hdExlYXN0KHN0YWZmUm9sZSkgPyAnc3RhZmYnIDogJydcIj57e2Zvcm1hdFRpbWUocmV2aWV3LnRpbWUpfX1cclxuICAgICAgICA8c3BhbiB2LWlmPVwicmV2aWV3LnJldmlld2VyLmF0TGVhc3Qoc3RhZmZSb2xlKVwiPlN0YWZmIFJldmlldzwvc3Bhbj5cclxuICAgICAgICA8c3BhbiB2LWVsc2U+UmV2aWV3PC9zcGFuPiBieSB7e3Jldmlldy5yZXZpZXdlci5uYW1lfX1cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImNsLXN1Ym1pdHRlZFwiPnt7c2hvd1N1Ym1pc3Npb25zKHJldmlldyl9fTwvc3Bhbj48L2gzPlxyXG4gICAgICA8cHJlPnt7cmV2aWV3Lm1ldGEucmV2aWV3LnJldmlld319PC9wcmU+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdC8qKlxyXG4gICAqIFByZXNlbnQgcmV2aWV3cyBieSBhbmQgZm9yIGEgbWVtYmVyIGFuZCB0aGUgc3RhZmYgcmV2aWV3aW5nIGZvcm0uXHJcbiAgICogQGNvbnN0cnVjdG9yIFJldmlld3NCeUZvck1lbWJlclZ1ZVxyXG4gICAqL1xyXG5cclxuICBpbXBvcnQge1RpbWVGb3JtYXR0ZXJ9IGZyb20gJ3NpdGUtY2wvanMvVGltZUZvcm1hdHRlcic7XHJcbiAgaW1wb3J0IHtFZGl0b3J9IGZyb20gJ3NpdGUtY2wvanMvVUkvRWRpdG9yJztcclxuICBpbXBvcnQge01lbWJlcn0gZnJvbSAnY291cnNlLWNsL2pzL01lbWJlcnMvTWVtYmVyJztcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gIFx0cHJvcHM6IFsndXNlcicsICdhc3NpZ250YWcnXSxcclxuICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xyXG4gIFx0XHRyZXR1cm4ge1xyXG4gICAgICAgIGZvclJldmlld3M6IFtdLFxyXG4gICAgICAgIGJ5UmV2aWV3czogW10sXHJcbiAgICAgICAgc3RhZmZSb2xlOiBNZW1iZXIuU1RBRkYsXHJcbiAgICAgICAgc3VibWlzc2lvbnM6IFtdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB3YXRjaDoge1xyXG4gIFx0XHR1c2VyKCkge1xyXG4gIFx0XHRcdHRoaXMuZm9yUmV2aWV3cyA9IFtdO1xyXG4gIFx0XHRcdHRoaXMuYnlSZXZpZXdzID0gW107XHJcbiAgXHRcdFx0dGhpcy5zdWJtaXNzaW9ucyA9IFtdO1xyXG4gIFx0XHRcdHRoaXMuZmV0Y2goKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vdW50ZWQoKSB7XHJcblx0ICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLiRyZWZzWydlZGl0b3InXTtcclxuXHQgICAgdGhpcy5lZGl0b3IgPSBuZXcgRWRpdG9yKGVsZW1lbnQsIHtcclxuXHRcdCAgICBoZWlnaHQ6ICcxMGVtJyxcclxuXHRcdCAgICBjbGFzc2VzOiBbJ3llbGxvdy1wYWQnXVxyXG5cdCAgICB9KTtcclxuXHJcblx0ICAgIHRoaXMuZmV0Y2goKTtcclxuICAgIH0sXHJcblx0ICBtZXRob2RzOiB7XHJcbiAgXHRcdGZldGNoKCkge1xyXG4gICAgICAgIHRoaXMuJHNpdGUuYXBpLmdldCgnL2FwaS9yZXZpZXcvcmV2aWV3cy8nICsgdGhpcy5hc3NpZ250YWcgKyAnLycgKyB0aGlzLnVzZXIubWVtYmVyLmlkLCB7fSlcclxuICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcclxuICAgICAgICAgICAgICB0aGlzLnRha2UocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgICAgIHRoaXMuJHNpdGUudG9hc3QodGhpcywgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuXHQgICAgICAgICAgdGhpcy4kc2l0ZS50b2FzdCh0aGlzLCBlcnJvcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICBcdFx0dGFrZShyZXNwb25zZSkge1xyXG4gICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZ2V0RGF0YSgncmV2aWV3cy1ieS1mb3InKS5hdHRyaWJ1dGVzO1xyXG4gICAgICAgIGxldCBzdWJtaXREYXRhID0gcmVzcG9uc2UuZ2V0RGF0YSgnYXNzaWdubWVudC1zdWJtaXNzaW9ucycpO1xyXG4gICAgICAgIGlmKHN1Ym1pdERhdGEgIT09IG51bGwpIHtcclxuXHQgICAgICAgIHRoaXMuc3VibWlzc2lvbnMgPSBzdWJtaXREYXRhLmF0dHJpYnV0ZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IobGV0IHJldmlldyBvZiBkYXRhLmZvcikge1xyXG5cdCAgICAgICAgcmV2aWV3LnJldmlld2VyID0gbmV3IFVzZXJzLlVzZXIocmV2aWV3LnJldmlld2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCByZXZpZXcgb2YgZGF0YS5ieSkge1xyXG5cdCAgICAgICAgcmV2aWV3LnJldmlld2VlID0gbmV3IFVzZXJzLlVzZXIocmV2aWV3LnJldmlld2VlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZm9yUmV2aWV3cyA9IGRhdGEuZm9yO1xyXG4gICAgICAgIHRoaXMuYnlSZXZpZXdzID0gZGF0YS5ieTtcclxuICAgICAgfSxcclxuXHQgICAgc3VibWl0KCkge1xyXG5cdFx0ICAgIGNvbnN0IHRleHQgPSB0aGlzLmVkaXRvci50ZXh0YXJlYS52YWx1ZS50cmltKCk7XHJcblx0XHQgICAgaWYodGV4dCA9PT0gJycpIHtcclxuXHRcdFx0ICAgIFNpdGUudG9hc3QodGhpcywgJ1lvdSBtdXN0IGVudGVyIHNvbWUgdGV4dCB0byBzdWJtaXQnKTtcclxuXHRcdFx0ICAgIHJldHVybjtcclxuXHRcdCAgICB9XHJcblxyXG5cdFx0ICAgIGxldCBzdWJtaXNzaW9ucyA9IHt9O1xyXG5cdFx0ICAgIGZvcihsZXQgdGFnIGluIHRoaXMuc3VibWlzc2lvbnMpIHtcclxuXHRcdCAgICBcdGNvbnNvbGUubG9nKHRoaXMuc3VibWlzc2lvbnNbdGFnXSk7XHJcblx0XHQgICAgXHRzdWJtaXNzaW9uc1t0YWddID0ge1xyXG5cdFx0ICAgICAgICAnaWQnOiB0aGlzLnN1Ym1pc3Npb25zW3RhZ11bMF0uaWQsXHJcbiAgICAgICAgICAgICdkYXRlJzogdGhpcy5zdWJtaXNzaW9uc1t0YWddWzBdLmRhdGVcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIH1cclxuXHJcblx0XHQgICAgbGV0IHBhcmFtcyA9IHtcclxuXHRcdFx0ICAgIHR5cGU6ICd0ZXh0L3BsYWluJyxcclxuXHRcdFx0ICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICBzdWJtaXNzaW9uczogc3VibWlzc2lvbnNcclxuXHRcdCAgICB9XHJcblxyXG5cdFx0ICAgIFNpdGUuYXBpLnBvc3QoYC9hcGkvcmV2aWV3L3N0YWZmcmV2aWV3LyR7dGhpcy5hc3NpZ250YWd9LyR7dGhpcy51c2VyLm1lbWJlci5pZH1gLCBwYXJhbXMpXHJcblx0XHRcdCAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuXHRcdFx0XHQgICAgaWYgKCFyZXNwb25zZS5oYXNFcnJvcigpKSB7XHJcblx0XHRcdFx0XHQgICAgdGhpcy5lZGl0b3IudGV4dGFyZWEudmFsdWUgPSAnJztcclxuXHRcdFx0XHRcdCAgICB0aGlzLnRha2UocmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0ICAgIFNpdGUudG9hc3QodGhpcywgXCJSZXZpZXcgc3VjY2Vzc2Z1bGx5IHNhdmVkIHRvIHRoZSBzZXJ2ZXJcIik7XHJcblx0XHRcdFx0ICAgIH0gZWxzZSB7XHJcblx0XHRcdFx0XHQgICAgU2l0ZS50b2FzdCh0aGlzLCByZXNwb25zZSk7XHJcblx0XHRcdFx0ICAgIH1cclxuXHJcblx0XHRcdCAgICB9KVxyXG5cdFx0XHQgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdCAgICBTaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcclxuXHRcdFx0ICAgIH0pO1xyXG5cdCAgICB9LFxyXG5cdFx0ICBmb3JtYXRUaW1lKHRpbWUpIHtcclxuXHRcdFx0ICByZXR1cm4gVGltZUZvcm1hdHRlci5yZWxhdGl2ZVVOSVgodGltZSwgbnVsbCk7XHJcblx0XHQgIH0sXHJcblx0ICAgIHNob3dTdWJtaXNzaW9ucyhyZXZpZXcpIHtcclxuICBcdFx0XHRsZXQgc3VibWlzc2lvbnMgPSByZXZpZXcubWV0YS5yZXZpZXcuc3VibWlzc2lvbnM7XHJcblxyXG5cdFx0ICAgIGxldCByZXQgPSAnJztcclxuXHRcdCAgICBmb3IobGV0IHRhZyBpbiBzdWJtaXNzaW9ucykge1xyXG5cdFx0XHQgICAgcmV0ICs9IFRpbWVGb3JtYXR0ZXIuYWJzb2x1dGVVTklYKHN1Ym1pc3Npb25zW3RhZ10uZGF0ZSk7XHJcblx0XHQgICAgfVxyXG5cclxuXHRcdCAgICBpZihyZXQgPT09ICcnKSB7XHJcblx0XHRcdCAgICByZXR1cm4gJyc7XHJcblx0XHQgICAgfVxyXG5cclxuXHRcdCAgICByZXR1cm4gJ1N1Ym1pc3Npb246ICcgKyByZXQ7XHJcblx0ICAgIH1cclxuXHQgIH1cclxuICB9XHJcbjwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImZ1bGxcIj5cclxuICAgIDxkaXYgdi1mb3I9XCJzdWJtaXNzaW9uIGluIGpzb24uc3VibWlzc2lvbnNcIiBjbGFzcz1cImNsLXN1Ym1pc3Npb24tdmlld1wiPlxyXG4gICAgICA8aDI+e3tzdWJtaXNzaW9uLm5hbWV9fTwvaDI+XHJcbiAgICAgIDxwcmUgdi1pZj1cInN1Ym1pc3Npb24udHlwZSA9PT0gJ3RleHQnXCIgY2xhc3M9XCJjbC1wcmV2aWV3IHllbGxvdy1wYWRcIj57e3N1Ym1pc3Npb24udGV4dH19PC9wcmU+XHJcbiAgICAgIDxmaWd1cmUgdi1pZj1cInN1Ym1pc3Npb24udHlwZSA9PT0gJ2ltYWdlJ1wiIGNsYXNzPVwiY2wtcHJldmlld1wiPjxpbWcgOnNyYz1cInByZXZpZXdJbWcoc3VibWlzc2lvbilcIj48L2ZpZ3VyZT5cclxuICAgICAgPHAgY2xhc3M9XCJjbC1wcmV2aWV3LXRpbWVcIj57e2Zvcm1hdFRpbWUoc3VibWlzc2lvbi5kYXRlKX19PC9wPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGgyPlJldmlldzwvaDI+XHJcbiAgICA8Zm9ybSBtZXRob2Q9XCJwb3N0XCIgQHN1Ym1pdC5wcmV2ZW50PVwic3VibWl0XCI+XHJcbiAgICAgIDxkaXYgcmVmPVwiZWRpdG9yXCIgY2xhc3M9XCJzaGFkb3dcIj48L2Rpdj5cclxuICAgICAgPHA+PGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlN1Ym1pdCBSZXZpZXdcIj48L3A+XHJcbiAgICA8L2Zvcm0+XHJcblxyXG4gICAgPGgyPlByZXZpb3VzIFJldmlld3M8L2gyPlxyXG4gICAgPHAgY2xhc3M9XCJjbC1yZXZpZXdzLW5vbmVcIiB2LWlmPVwicmV2aWV3aW5nLmxlbmd0aCA9PT0gMFwiPioqKiBOb25lIFlldCAqKio8L3A+XHJcbiAgICA8ZGl2IHYtZm9yPVwicmV2aWV3IGluIHJldmlld2luZ1wiIGNsYXNzPVwiY2wtcmV2aWV3XCI+XHJcbiAgICAgIDxoMz57e2Zvcm1hdFRpbWUocmV2aWV3LnRpbWUpfX0gUmV2aWV3IGJ5IE1lXHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiY2wtc3VibWl0dGVkXCI+e3tzaG93U3VibWlzc2lvbnMocmV2aWV3KX19PC9zcGFuPjwvaDM+XHJcbiAgICAgIDxwcmU+e3tyZXZpZXcubWV0YS5yZXZpZXcucmV2aWV3fX08L3ByZT5cclxuICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCBVc2VyVnVlQmFzZSBmcm9tICd1c2Vycy1jbC9qcy9WdWUvVXNlclZ1ZUJhc2UudnVlJztcclxuICBpbXBvcnQge0VkaXRvcn0gZnJvbSAnc2l0ZS1jbC9qcy9VSS9FZGl0b3InO1xyXG4gIGltcG9ydCB7VGltZUZvcm1hdHRlcn0gZnJvbSAnc2l0ZS1jbC9qcy9UaW1lRm9ybWF0dGVyJztcclxuXHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0J2V4dGVuZHMnOiBVc2VyVnVlQmFzZSxcclxuXHRcdHByb3BzOiBbJ2pzb24nXSxcclxuXHRcdGRhdGE6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4ge1xyXG4gICAgICAgIHJldmlld2luZzogW10sXHJcbiAgICAgICAgc3VibWlzc2lvbnM6IHt9XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRtb3VudGVkKCkge1xyXG5cdFx0XHR0aGlzLnNldFRpdGxlKCdQZWVyIFJldmlld2luZycpO1xyXG5cdFx0XHR0aGlzLnJldmlld2luZyA9IHRoaXMuanNvbi5yZXZpZXdpbmc7XHJcblxyXG5cdFx0ICBjb25zdCBlbGVtZW50ID0gdGhpcy4kcmVmc1snZWRpdG9yJ107XHJcbiAgICAgIHRoaXMuZWRpdG9yID0gbmV3IEVkaXRvcihlbGVtZW50LCB7XHJcbiAgICAgICAgaGVpZ2h0OiAnMTBlbScsXHJcbiAgICAgICAgY2xhc3NlczogWyd5ZWxsb3ctcGFkJ11cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBsZXQgc3VibWlzc2lvbnMgPSB7fTtcclxuICAgICAgZm9yKGNvbnN0IHN1Ym1pc3Npb24gb2YgdGhpcy5qc29uLnN1Ym1pc3Npb25zKSB7XHJcbiAgICAgICAgc3VibWlzc2lvbnNbc3VibWlzc2lvbi50YWddPXtcclxuICAgICAgICAgICdpZCc6IHN1Ym1pc3Npb24uaWQsXHJcbiAgICAgICAgICAnZGF0ZSc6IHN1Ym1pc3Npb24uZGF0ZVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuc3VibWlzc2lvbnMgPSBzdWJtaXNzaW9ucztcclxuXHRcdH0sXHJcblx0XHRtZXRob2RzOiB7XHJcblx0XHRcdHN1Ym1pdCgpIHtcclxuICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy5lZGl0b3IudGV4dGFyZWEudmFsdWUudHJpbSgpO1xyXG4gICAgICAgIGlmKHRleHQgPT09ICcnKSB7XHJcbiAgICAgICAgICBTaXRlLnRvYXN0KHRoaXMsICdZb3UgbXVzdCBlbnRlciBzb21lIHRleHQgdG8gc3VibWl0Jyk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgdHlwZTogJ3RleHQvcGxhaW4nLFxyXG4gICAgICAgICAgdGV4dDogdGV4dCxcclxuICAgICAgICAgIHN1Ym1pc3Npb25zOiB0aGlzLnN1Ym1pc3Npb25zXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBTaXRlLmFwaS5wb3N0KGAvYXBpL3Jldmlldy9yZXZpZXcvJHt0aGlzLmpzb24uaWR9YCwgcGFyYW1zKVxyXG4gICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UuaGFzRXJyb3IoKSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuZWRpdG9yLnRleHRhcmVhLnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZXZpZXdpbmcgPSByZXNwb25zZS5nZXREYXRhKCdyZXZpZXdpbmcnKS5hdHRyaWJ1dGVzO1xyXG5cclxuICAgICAgICAgICAgICBTaXRlLnRvYXN0KHRoaXMsIFwiUmV2aWV3IHN1Y2Nlc3NmdWxseSBzYXZlZCB0byB0aGUgc2VydmVyXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIFNpdGUudG9hc3QodGhpcywgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCBlcnJvcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgICAgZm9ybWF0VGltZSh0aW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIFRpbWVGb3JtYXR0ZXIucmVsYXRpdmVVTklYKHRpbWUsIG51bGwpO1xyXG4gICAgICB9LFxyXG4gICAgICBzaG93U3VibWlzc2lvbnMocmV2aWV3KSB7XHJcbiAgICAgICAgbGV0IHBhc3QgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBzdWJtaXNzaW9ucyA9IHJldmlldy5tZXRhLnJldmlldy5zdWJtaXNzaW9ucztcclxuICAgICAgICBmb3IobGV0IHRhZyBpbiBzdWJtaXNzaW9ucykge1xyXG4gICAgICAgIFx0aWYoc3VibWlzc2lvbnNbdGFnXS5pZCAhPT0gdGhpcy5zdWJtaXNzaW9uc1t0YWddLmlkKSB7XHJcbiAgICAgICAgXHRcdHBhc3QgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYocGFzdCkge1xyXG4gICAgICAgIFx0cmV0dXJuICdGb3IgYSBwYXN0IHN1Ym1pc3Npb24nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgICBwcmV2aWV3SW1nKHN1Ym1pc3Npb24pIHtcclxuXHQgICAgICByZXR1cm4gU2l0ZS5yb290ICsgJy9jbC9yZXZpZXcvaW1nLycgKyBzdWJtaXNzaW9uLmlkO1xyXG4gICAgICB9XHJcblx0XHR9XHJcblx0fVxyXG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cImNsLXJldmlld3NcIj5cclxuICAgIDxoMz5SZXZpZXdzIG9mIHRoaXMgYXNzaWdubWVudCBhcHBlYXIgaGVyZS48L2gzPlxyXG4gICAgPHAgY2xhc3M9XCJjbC1yZXZpZXdzLW5vbmVcIiB2LWlmPVwicmV2aWV3cy5sZW5ndGggPT09IDBcIj4qKiogTm9uZSBZZXQgKioqPC9wPlxyXG4gICAgPGRpdiB2LWZvcj1cInJldmlldyBpbiByZXZpZXdzXCIgY2xhc3M9XCJjbC1yZXZpZXdcIj5cclxuICAgICAgPGgzIDpjbGFzcz1cInJldmlldy5yb2xlICE9PSB1bmRlZmluZWQgPyAnc3RhZmYnIDogJydcIj57e2Zvcm1hdFRpbWUocmV2aWV3LnRpbWUpfX1cclxuICAgICAgICA8c3BhbiB2LWlmPVwicmV2aWV3LnJvbGUgIT09IHVuZGVmaW5lZFwiPlN0YWZmIFJldmlldzwvc3Bhbj5cclxuICAgICAgICA8c3BhbiB2LWVsc2U+UmV2aWV3PC9zcGFuPiBieSB7e3Jldmlldy5ieX19XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjbC1zdWJtaXR0ZWRcIj57e3Nob3dTdWJtaXNzaW9ucyhyZXZpZXcpfX08L3NwYW4+PC9oMz5cclxuICAgICAgPHByZT57e3Jldmlldy5yZXZpZXd9fTwvcHJlPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCB7VGltZUZvcm1hdHRlcn0gZnJvbSAnc2l0ZS1jbC9qcy9UaW1lRm9ybWF0dGVyJztcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gIFx0cHJvcHM6IFsnanNvbiddLFxyXG4gICAgZGF0YTogZnVuY3Rpb24oKSB7XHJcbiAgXHRcdHJldHVybiB7XHJcbiAgXHRcdFx0YXNzaWduVGFnOiAnJyxcclxuICAgICAgICByZXZpZXdzOiBbXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW91bnRlZCgpIHtcclxuICBcdFx0dGhpcy5hc3NpZ25UYWcgPSB0aGlzLmpzb24uYXNzaWduVGFnO1xyXG4gIFx0XHR0aGlzLnJldmlld3MgPSB0aGlzLmpzb24ucmV2aWV3cztcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIGZvcm1hdFRpbWUodGltZSkge1xyXG4gICAgICAgIHJldHVybiBUaW1lRm9ybWF0dGVyLnJlbGF0aXZlVU5JWCh0aW1lLCBudWxsKTtcclxuICAgICAgfSxcclxuXHQgICAgc2hvd1N1Ym1pc3Npb25zKHJldmlldykge1xyXG4gICAgICBcdGxldCByZXQgPSAnJztcclxuICAgICAgXHRmb3IobGV0IHRhZyBpbiByZXZpZXcuc3VibWlzc2lvbnMpIHtcclxuICAgICAgXHRcdHJldCArPSBUaW1lRm9ybWF0dGVyLmFic29sdXRlVU5JWChyZXZpZXcuc3VibWlzc2lvbnNbdGFnXS5kYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHJldCA9PT0gJycpIHtcclxuICAgICAgICBcdHJldHVybiAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICBcdHJldHVybiAnU3VibWlzc2lvbjogJyArIHJldDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgOmNsYXNzPVwibWFza0NsYXNzXCI+PHAgdi1pZj1cInNsb3REZWxheVwiPjxzbG90Pjwvc2xvdD48L3A+PC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIC8qKlxyXG4gICAqIE1hc2tpbmcgVnVlIGNvbXBvbmVudC5cclxuICAgKlxyXG4gICAqIFdoZW4gZW5hYmxlZCwgYSB0cmFuc2x1Y2VudCBtYXNrIHdpdGggYW4gb3B0aW9uYWwgbWVzc2FnZVxyXG4gICAqIGlzIGRpc3BsYXllZCBhbmQgY29udHJvbHMgYXJlIGRpc2FibGVkLlxyXG4gICAqXHJcbiAgICogTXVzdCBiZSBhIGNoaWxkIG9mIGFuIGVsZW1lbnQgd2l0aCBhIHBvc2l0aW9uIHNldHRpbmdcclxuICAgKiBpbiBDU1MuIFdoZW4gbWFzayBpcyB0cnVlLCB0aGUgaW50ZXJmYWNlIGlzIGRpc2FibGVkIGJ5XHJcbiAgICogYW4gb3ZlcmxheSBtYXNrLlxyXG4gICAqIEBjb25zdHJ1Y3RvciBNYXNrVnVlXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiAvLyBJbmNsdWRlIHRoaXMgY29tcG9uZW50XHJcbiAgICogaW1wb3J0IE1hc2tWdWUgZnJvbSAnc2l0ZS1jbC9qcy9WdWUvTWFzay52dWUnO1xyXG4gICAqIEBleGFtcGxlXHJcbiAgICogICAgICBkYXRhOiBmdW5jdGlvbigpIHtcclxuICAgKiAgICAgICAgcmV0dXJuIHtcclxuICAgKiAgICAgICAgICAgIG1hc2s6IGZhbHNlXHJcbiAgICogICAgICAgIH1cclxuICAgKiAgICAgfSxcclxuICAgKiAgICAgY29tcG9uZW50czoge1xyXG4gICAqICAgICAgbWFza1Z1ZTogTWFza1Z1ZVxyXG4gICAqICAgICB9XHJcbiAgICogQGV4YW1wbGVcclxuICAgKiA8bWFzay12dWUgOm1hc2s9XCJtYXNrXCI+U2VuZGluZyBFbWFpbC4uLjwvbWFzay12dWU+XHJcbiAgICogQGV4YW1wbGVcclxuICAgKiB0aGlzLm1hc2sgPSB0cnVlOyAgLy8gRW5hYmxlIHRoZSBtYXNrXHJcbiAgICogdGhpcy5tYXNrID0gZmFsc2U7IC8vIERpc2FibGUgdGhlIG1hc2tcclxuICAgKi9cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICAgIHByb3BzOiBbJ21hc2snXSxcclxuICAgICAgZGF0YTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIFx0cmV0dXJuIHtcclxuICAgICAgXHRcdHNsb3REZWxheTogdHJ1ZSxcclxuICAgICAgICAgIHRpbWVyOiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB3YXRjaDoge1xyXG4gICAgICBcdG1hc2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICBcdFx0aWYodGhpcy50aW1lciAhPT0gbnVsbCkge1xyXG4gICAgICBcdFx0XHRjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XHJcbiAgICAgIFx0XHRcdHRoaXMudGltZXIgPSBudWxsO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuc2xvdERlbGF5ID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBcdHRoaXMuc2xvdERlbGF5ID0gdHJ1ZTtcclxuICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgY29tcHV0ZWQ6IHtcclxuICAgICAgICAgIG1hc2tDbGFzczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFzayA/ICdjbC1tYXNrIG1hc2snIDogJ2NsLW1hc2snXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICB9XHJcbjwvc2NyaXB0PiIsIjxzY3JpcHQ+XHJcblx0LyoqXHJcbiAgICogQmFzZSBjb21wb25lbnQgZm9yIHBhZ2VzLlxyXG4gICAqIEBjb25zdHJ1Y3RvciBQYWdlVnVlQmFzZVxyXG4gICAqL1xyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgICAgICBkYXRhOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuXHQgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgKiBTaXRlIG9iamVjdFxyXG4gICAgICAgICAgICAgICAqIEBtZW1iZXJvZiBQYWdlVnVlQmFzZVxyXG4gICAgICAgICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAqIEBtZW1iZXIge1NpdGV9IHNpdGVcclxuICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICBzaXRlOiBTaXRlLFxyXG5cdCAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAqIFNpdGUgcm9vdCBwYXRoIChTaXRlLnJvb3QpXHJcbiAgICAgICAgICAgICAgICogQG1lbWJlcm9mIFBhZ2VWdWVCYXNlXHJcbiAgICAgICAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSByb290XHJcbiAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgcm9vdDogU2l0ZS5yb290XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuXHQgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogU2V0IHRoZSBwYWdlIHRpdGxlXHJcbiAgICAgICAgICAgKiBAbWVtYmVyb2YgUGFnZVZ1ZUJhc2VcclxuICAgICAgICAgICAqIEBpbnN0YW5jZVxyXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXHJcblx0ICAgICAgICAgKi9cclxuICAgICAgICAgICBzZXRUaXRsZSh0aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnNldFRpdGxlKHRpdGxlKTtcclxuICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIHNldE1lbnU6IGZ1bmN0aW9uKG1lbnUpIHtcclxuXHQgICAgICAgICAgIHRoaXMuJHBhcmVudC5zZXRNZW51KG1lbnUpO1xyXG4gICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgZ2V0TWVudTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgXHQgcmV0dXJuIHRoaXMuJHBhcmVudC5nZXRNZW51KCk7XHJcbiAgICAgICAgICAgfSxcclxuICAgICAgICAgICBjbGVhck1lbnUoKSB7XHJcbiAgICAgICAgICAgXHQgIHRoaXMuc2V0TWVudShbXSk7XHJcbiAgICAgICAgICAgfSxcclxuXHQgICAgICAgICAvKipcclxuXHQgICAgICAgICAgKiBBZGQgYW4gb3B0aW9uIHRvIHRoZSBuYXYyIG1lbnUuXHJcblx0ICAgICAgICAgICogQHBhcmFtIHRpdGxlIFRpdGxlIG9mIHRoZSBvcHRpb24gdG8gYWRkLlxyXG5cdCAgICAgICAgICAqIEBwYXJhbSBjbG9zdXJlIEZ1bmN0aW9uIHRvIGNhbGwgd2hlbiBzZWxlY3RlZC5cclxuXHQgICAgICAgICAgKi9cclxuXHQgICAgICAgICBhZGRNZW51KHRpdGxlLCBjbG9zdXJlKSB7XHJcblx0XHQgICAgICAgICBsZXQgbWVudSA9IHRoaXMuZ2V0TWVudSgpO1xyXG5cdFx0ICAgICAgICAgbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgY2xpY2s6IGNsb3N1cmVcclxuICAgICAgICAgICAgIH0pO1xyXG5cdFx0ICAgICAgICAgdGhpcy5zZXRNZW51KG1lbnUpO1xyXG5cdCAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJmZXRjaGluZ1wiIHYtaWY9XCJkZWxheWVkRmV0Y2hpbmdcIj5cclxuICAgICAgPHA+RmV0Y2hpbmcgZnJvbSBzZXJ2ZXIuLi48L3A+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxzbG90IHYtaWY9XCIoZmV0Y2hlciA9PT0gbnVsbCB8fCAhZmV0Y2hlci5mZXRjaGluZykgJiYgIWZldGNoaW5nXCI+PC9zbG90PlxyXG4gICAgPHAgY2xhc3M9XCJtb3JlXCIgdi1pZj1cImZldGNoZXIgIT09IG51bGwgJiYgZmV0Y2hlci5tb3JlXCI+PGJ1dHRvbiBAY2xpY2sucHJldmVudD1cImZldGNoTW9yZVwiPk1PUkU8L2J1dHRvbj48L3A+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIC8qKlxyXG4gICAqIEBmaWxlXHJcbiAgICogRmV0Y2hlciBjb21wb25lbnQgZGlzcGxheXMgXCJGZXRjaGluZ1wiIGFuZCBhIFwibW9yZVwiIGJ1dHRvbi5cclxuICAgKi9cclxuXHJcbiAgLyoqXHJcbiAgICogRmV0Y2hlciBmdW5jdGlvbiB1c2VkIHRvIHVwZGF0ZSB0aGlzIG9iamVjdC5cclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKi9cclxuICBleHBvcnQgbGV0IEZldGNoZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdGhpcy5tb3JlID0gZmFsc2U7ICAgICAgIC8vIEluZGljYXRlcyB0aGVyZSBpcyBtb3JlIHRvIGZldGNoXHJcbiAgICAgIHRoaXMuZmV0Y2hpbmcgPSBmYWxzZTsgIC8vIFNldCB0cnVlIHdoaWxlIHdlIGFyZSBmZXRjaGluZ1xyXG4gICAgICB0aGlzLmZldGNoZWQgPSBmYWxzZTsgICAvLyBTZXQgdHJ1ZSB3aGVuIHdlIGhhdmUgZmV0Y2hlZCBzb21ldGhpbmcuLi5cclxuXHJcbiAgICAgIHRoaXMuc3RhcnQgPSBmdW5jdGlvbihzaW5nbGUpIHtcclxuICAgICAgICAgIHRoaXMuZmV0Y2hpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgIGlmKHNpbmdsZSAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMubW9yZSA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmRvbmUgPSBmdW5jdGlvbihzaW5nbGUpIHtcclxuICAgICAgICAgIHRoaXMuZmV0Y2hpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICBpZihzaW5nbGUgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgICB0aGlzLmZldGNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnJlc2V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB0aGlzLm1vcmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuZmV0Y2hpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuZmV0Y2hlZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgICAgcHJvcHM6IHtcclxuICAgICAgICBmZXRjaGVyOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmZXRjaGluZzoge1xyXG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgd2F0Y2g6IHtcclxuICAgICAgICAgICdmZXRjaGVyLmZldGNoaW5nJzogZnVuY3Rpb24odG8sIGZyb20pIHtcclxuICAgICAgICAgICAgICB0aGlzLnNldEZldGNoaW5nKClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmZXRjaGluZzogZnVuY3Rpb24odG8sIGZyb20pIHtcclxuICAgICAgICAgICAgICB0aGlzLnNldEZldGNoaW5nKClcclxuICAgICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZGF0YTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgIHNob3dGZXRjaGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgZGVsYXllZEZldGNoaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICB0aW1lcjogbnVsbFxyXG4gICAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtb3VudGVkKCkge1xyXG4gICAgICAgICAgdGhpcy5zZXRGZXRjaGluZygpO1xyXG4gICAgICB9LFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgICBmZXRjaE1vcmUoKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmZldGNoTW9yZSgpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHNldEZldGNoaW5nKCkge1xyXG4gICAgICAgICAgICAgIC8vIEFyZSB3ZSBjdXJyZW50bHkgZmV0Y2hpbmc/XHJcbiAgICAgICAgICAgICAgbGV0IHNob3dGZXRjaGluZyA9ICh0aGlzLmZldGNoZXIgIT09IG51bGwgJiYgdGhpcy5mZXRjaGVyLmZldGNoaW5nKSB8fCB0aGlzLmZldGNoaW5nO1xyXG4gICAgICAgICAgICAgIGlmKHNob3dGZXRjaGluZyAmJiAhdGhpcy5zaG93RmV0Y2hpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gRmV0Y2hpbmcgaXMgYmVjb21pbmcgYWN0aXZlXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXllZEZldGNoaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYoIXNob3dGZXRjaGluZyAmJiB0aGlzLnNob3dGZXRjaGluZykge1xyXG4gICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudGltZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXllZEZldGNoaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRoaXMuc2hvd0ZldGNoaW5nID0gc2hvd0ZldGNoaW5nO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgfTtcclxuXHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxyXG5cclxuQGltcG9ydCAnLi4vLi4vLi4vc2l0ZS9zYXNzL21vZHVsZXMvX2NvbG9ycyc7XHJcblxyXG5kaXYuZmV0Y2hpbmcge1xyXG4gIGhlaWdodDogMjhweDtcclxuICBtYXJnaW46IDFlbSAwO1xyXG5cclxuICBwIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgIGNvbG9yOiAkY29tcDtcclxuICAgIHBhZGRpbmctdG9wOiAycHg7XHJcbiAgfVxyXG59XHJcblxyXG4ubW9yZSB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG5cclxuICBidXR0b24ge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGhlaWdodDogMjhweDtcclxuICAgIG1hcmdpbjogMDtcclxuICB9XHJcbn1cclxuXHJcbjwvc3R5bGU+IiwiPCEtLVxyXG5AZmlsZVxyXG5CYXNlIGNvbXBvbmVudCBmb3IgcGFnZXMgdGhhdCBpbmNsdWRlcyBzdXBwb3J0IGZvciB0aGlzLnVzZXJcclxuXHJcblByb3ZpZGVzOlxyXG5zZXRUaXRsZVxyXG50aGlzLnJvb3RcclxuLS0+XHJcblxyXG48c2NyaXB0PlxyXG4gICAgaW1wb3J0IFBhZ2VWdWVCYXNlIGZyb20gJ3NpdGUtY2wvanMvVnVlL1BhZ2VWdWVCYXNlLnZ1ZSc7XHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgICAgICdleHRlbmRzJzogUGFnZVZ1ZUJhc2UsXHJcbiAgICAgICAgY29tcHV0ZWQ6IHtcclxuICAgICAgICBcdHVzZXIoKSB7XHJcbiAgICAgICAgXHRcdHJldHVybiAgdGhpcy4kc3RvcmUuc3RhdGUudXNlci51c2VyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG48L3NjcmlwdD4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImRpdi5jbC1yZXZpZXdpbmcgdGQuY2wtZW1wdHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZjdmMztcXG59XFxuXFxucC5jbC1yZXZpZXdzLW5vbmUge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6ICMwMDcyM2Y7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcblxcbmRpdi5jbC1yZXZpZXdzIGgzIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJhY2tncm91bmQ6ICMwMDcyM2Y7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcblxcbmRpdi5jbC1yZXZpZXcge1xcbiAgbWFyZ2luOiAxZW0gMDtcXG59XFxuXFxuZGl2LmNsLXJldmlldyBoMyB7XFxuICBmb250LXNpemU6IDAuODVlbTtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiAjMDA3MjNmO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMwMDcyM2Y7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG5cXG5kaXYuY2wtcmV2aWV3IGgzIHNwYW4uY2wtc3VibWl0dGVkIHtcXG4gIGZsb2F0OiByaWdodDtcXG4gIGNvbG9yOiAjMDA5MDllO1xcbiAgZm9udC1zaXplOiAwLjllbTtcXG59XFxuXFxuZGl2LmNsLXJldmlldyBoMy5zdGFmZiB7XFxuICBjb2xvcjogcmVkO1xcbn1cXG5cXG5kaXYuY2wtcmV2aWV3IHByZSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiZGl2LmNsLWVkaXRvciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtaW4taGVpZ2h0OiA1ZW07XFxuICBoZWlnaHQ6IDEwZW07XFxuICBwYWRkaW5nOiAwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIG1hcmdpbjogMWVtIDA7XFxufVxcblxcbmRpdi5jbC1lZGl0b3IgdGV4dGFyZWEge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHJlc2l6ZTogbm9uZTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG59XFxuXFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJkaXYuZmV0Y2hpbmdbZGF0YS12LTQzYjI2YmNiXSB7XFxuICBoZWlnaHQ6IDI4cHg7XFxuICBtYXJnaW46IDFlbSAwO1xcbn1cXG5kaXYuZmV0Y2hpbmcgcFtkYXRhLXYtNDNiMjZiY2JdIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGNvbG9yOiAjYzQxNDI1O1xcbiAgcGFkZGluZy10b3A6IDJweDtcXG59XFxuLm1vcmVbZGF0YS12LTQzYjI2YmNiXSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi5tb3JlIGJ1dHRvbltkYXRhLXYtNDNiMjZiY2JdIHtcXG4gIGZvbnQtc2l6ZTogMC44ZW07XFxuICBoZWlnaHQ6IDI4cHg7XFxuICBtYXJnaW46IDA7XFxufVxcblxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsInZhciBtYXAgPSB7XG5cdFwiLi9hZlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYWYuanNcIixcblx0XCIuL2FmLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hZi5qc1wiLFxuXHRcIi4vYXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLmpzXCIsXG5cdFwiLi9hci1kelwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItZHouanNcIixcblx0XCIuL2FyLWR6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1kei5qc1wiLFxuXHRcIi4vYXIta3dcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWt3LmpzXCIsXG5cdFwiLi9hci1rdy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIta3cuanNcIixcblx0XCIuL2FyLWx5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1seS5qc1wiLFxuXHRcIi4vYXItbHkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWx5LmpzXCIsXG5cdFwiLi9hci1tYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbWEuanNcIixcblx0XCIuL2FyLW1hLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1tYS5qc1wiLFxuXHRcIi4vYXItc2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXNhLmpzXCIsXG5cdFwiLi9hci1zYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItc2EuanNcIixcblx0XCIuL2FyLXRuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci10bi5qc1wiLFxuXHRcIi4vYXItdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXRuLmpzXCIsXG5cdFwiLi9hci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIuanNcIixcblx0XCIuL2F6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hei5qc1wiLFxuXHRcIi4vYXouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2F6LmpzXCIsXG5cdFwiLi9iZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmUuanNcIixcblx0XCIuL2JlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZS5qc1wiLFxuXHRcIi4vYmdcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JnLmpzXCIsXG5cdFwiLi9iZy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmcuanNcIixcblx0XCIuL2JtXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibS5qc1wiLFxuXHRcIi4vYm0uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JtLmpzXCIsXG5cdFwiLi9iblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm4uanNcIixcblx0XCIuL2JuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibi5qc1wiLFxuXHRcIi4vYm9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JvLmpzXCIsXG5cdFwiLi9iby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm8uanNcIixcblx0XCIuL2JyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ici5qc1wiLFxuXHRcIi4vYnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JyLmpzXCIsXG5cdFwiLi9ic1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnMuanNcIixcblx0XCIuL2JzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9icy5qc1wiLFxuXHRcIi4vY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NhLmpzXCIsXG5cdFwiLi9jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY2EuanNcIixcblx0XCIuL2NzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jcy5qc1wiLFxuXHRcIi4vY3MuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NzLmpzXCIsXG5cdFwiLi9jdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3YuanNcIixcblx0XCIuL2N2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jdi5qc1wiLFxuXHRcIi4vY3lcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N5LmpzXCIsXG5cdFwiLi9jeS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3kuanNcIixcblx0XCIuL2RhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kYS5qc1wiLFxuXHRcIi4vZGEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RhLmpzXCIsXG5cdFwiLi9kZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUuanNcIixcblx0XCIuL2RlLWF0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1hdC5qc1wiLFxuXHRcIi4vZGUtYXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWF0LmpzXCIsXG5cdFwiLi9kZS1jaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtY2guanNcIixcblx0XCIuL2RlLWNoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1jaC5qc1wiLFxuXHRcIi4vZGUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLmpzXCIsXG5cdFwiLi9kdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZHYuanNcIixcblx0XCIuL2R2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kdi5qc1wiLFxuXHRcIi4vZWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VsLmpzXCIsXG5cdFwiLi9lbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZWwuanNcIixcblx0XCIuL2VuLWF1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1hdS5qc1wiLFxuXHRcIi4vZW4tYXUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWF1LmpzXCIsXG5cdFwiLi9lbi1jYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tY2EuanNcIixcblx0XCIuL2VuLWNhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1jYS5qc1wiLFxuXHRcIi4vZW4tZ2JcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWdiLmpzXCIsXG5cdFwiLi9lbi1nYi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tZ2IuanNcIixcblx0XCIuL2VuLWllXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pZS5qc1wiLFxuXHRcIi4vZW4taWUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWllLmpzXCIsXG5cdFwiLi9lbi1pbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWwuanNcIixcblx0XCIuL2VuLWlsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pbC5qc1wiLFxuXHRcIi4vZW4tbnpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLW56LmpzXCIsXG5cdFwiLi9lbi1uei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tbnouanNcIixcblx0XCIuL2VvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lby5qc1wiLFxuXHRcIi4vZW8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VvLmpzXCIsXG5cdFwiLi9lc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMuanNcIixcblx0XCIuL2VzLWRvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy1kby5qc1wiLFxuXHRcIi4vZXMtZG8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLWRvLmpzXCIsXG5cdFwiLi9lcy11c1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtdXMuanNcIixcblx0XCIuL2VzLXVzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy11cy5qc1wiLFxuXHRcIi4vZXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLmpzXCIsXG5cdFwiLi9ldFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXQuanNcIixcblx0XCIuL2V0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldC5qc1wiLFxuXHRcIi4vZXVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V1LmpzXCIsXG5cdFwiLi9ldS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXUuanNcIixcblx0XCIuL2ZhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mYS5qc1wiLFxuXHRcIi4vZmEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZhLmpzXCIsXG5cdFwiLi9maVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmkuanNcIixcblx0XCIuL2ZpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9maS5qc1wiLFxuXHRcIi4vZm9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZvLmpzXCIsXG5cdFwiLi9mby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZm8uanNcIixcblx0XCIuL2ZyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci5qc1wiLFxuXHRcIi4vZnItY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNhLmpzXCIsXG5cdFwiLi9mci1jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2EuanNcIixcblx0XCIuL2ZyLWNoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jaC5qc1wiLFxuXHRcIi4vZnItY2guanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNoLmpzXCIsXG5cdFwiLi9mci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnIuanNcIixcblx0XCIuL2Z5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9meS5qc1wiLFxuXHRcIi4vZnkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2Z5LmpzXCIsXG5cdFwiLi9nZFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2QuanNcIixcblx0XCIuL2dkLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nZC5qc1wiLFxuXHRcIi4vZ2xcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dsLmpzXCIsXG5cdFwiLi9nbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2wuanNcIixcblx0XCIuL2dvbS1sYXRuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nb20tbGF0bi5qc1wiLFxuXHRcIi4vZ29tLWxhdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dvbS1sYXRuLmpzXCIsXG5cdFwiLi9ndVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ3UuanNcIixcblx0XCIuL2d1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ndS5qc1wiLFxuXHRcIi4vaGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hlLmpzXCIsXG5cdFwiLi9oZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGUuanNcIixcblx0XCIuL2hpXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oaS5qc1wiLFxuXHRcIi4vaGkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hpLmpzXCIsXG5cdFwiLi9oclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHIuanNcIixcblx0XCIuL2hyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oci5qc1wiLFxuXHRcIi4vaHVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h1LmpzXCIsXG5cdFwiLi9odS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHUuanNcIixcblx0XCIuL2h5LWFtXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oeS1hbS5qc1wiLFxuXHRcIi4vaHktYW0uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h5LWFtLmpzXCIsXG5cdFwiLi9pZFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaWQuanNcIixcblx0XCIuL2lkLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pZC5qc1wiLFxuXHRcIi4vaXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lzLmpzXCIsXG5cdFwiLi9pcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXMuanNcIixcblx0XCIuL2l0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC5qc1wiLFxuXHRcIi4vaXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2l0LmpzXCIsXG5cdFwiLi9qYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvamEuanNcIixcblx0XCIuL2phLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qYS5qc1wiLFxuXHRcIi4vanZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2p2LmpzXCIsXG5cdFwiLi9qdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvanYuanNcIixcblx0XCIuL2thXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rYS5qc1wiLFxuXHRcIi4va2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2thLmpzXCIsXG5cdFwiLi9ra1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2suanNcIixcblx0XCIuL2trLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ray5qc1wiLFxuXHRcIi4va21cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ttLmpzXCIsXG5cdFwiLi9rbS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva20uanNcIixcblx0XCIuL2tuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbi5qc1wiLFxuXHRcIi4va24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tuLmpzXCIsXG5cdFwiLi9rb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva28uanNcIixcblx0XCIuL2tvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rby5qc1wiLFxuXHRcIi4va3VcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t1LmpzXCIsXG5cdFwiLi9rdS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva3UuanNcIixcblx0XCIuL2t5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4va3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t5LmpzXCIsXG5cdFwiLi9sYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbGIuanNcIixcblx0XCIuL2xiLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sYi5qc1wiLFxuXHRcIi4vbG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xvLmpzXCIsXG5cdFwiLi9sby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbG8uanNcIixcblx0XCIuL2x0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x0LmpzXCIsXG5cdFwiLi9sdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHYuanNcIixcblx0XCIuL2x2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdi5qc1wiLFxuXHRcIi4vbWVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21lLmpzXCIsXG5cdFwiLi9tZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWUuanNcIixcblx0XCIuL21pXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21pLmpzXCIsXG5cdFwiLi9ta1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWsuanNcIixcblx0XCIuL21rLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tay5qc1wiLFxuXHRcIi4vbWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21sLmpzXCIsXG5cdFwiLi9tbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWwuanNcIixcblx0XCIuL21uXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbW4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21uLmpzXCIsXG5cdFwiLi9tclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXIuanNcIixcblx0XCIuL21yLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tci5qc1wiLFxuXHRcIi4vbXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tcy1teVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMtbXkuanNcIixcblx0XCIuL21zLW15LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy1teS5qc1wiLFxuXHRcIi4vbXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXQuanNcIixcblx0XCIuL210LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tdC5qc1wiLFxuXHRcIi4vbXlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL215LmpzXCIsXG5cdFwiLi9teS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXkuanNcIixcblx0XCIuL25iXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25iLmpzXCIsXG5cdFwiLi9uZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmUuanNcIixcblx0XCIuL25lLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uZS5qc1wiLFxuXHRcIi4vbmxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ubC1iZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwtYmUuanNcIixcblx0XCIuL25sLWJlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC1iZS5qc1wiLFxuXHRcIi4vbmwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ublwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbm4uanNcIixcblx0XCIuL25uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubi5qc1wiLFxuXHRcIi4vcGEtaW5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BhLWluLmpzXCIsXG5cdFwiLi9wYS1pbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGEtaW4uanNcIixcblx0XCIuL3BsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcGwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BsLmpzXCIsXG5cdFwiLi9wdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3B0LWJyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQtYnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LWJyLmpzXCIsXG5cdFwiLi9wdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3JvLmpzXCIsXG5cdFwiLi9ydVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcnUuanNcIixcblx0XCIuL3J1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ydS5qc1wiLFxuXHRcIi4vc2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NkLmpzXCIsXG5cdFwiLi9zZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2QuanNcIixcblx0XCIuL3NlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NlLmpzXCIsXG5cdFwiLi9zaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2kuanNcIixcblx0XCIuL3NpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zaS5qc1wiLFxuXHRcIi4vc2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NrLmpzXCIsXG5cdFwiLi9zay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2suanNcIixcblx0XCIuL3NsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NsLmpzXCIsXG5cdFwiLi9zcVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3EuanNcIixcblx0XCIuL3NxLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcS5qc1wiLFxuXHRcIi4vc3JcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zci1jeXJsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci1jeXJsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3IuanNcIixcblx0XCIuL3NzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcy5qc1wiLFxuXHRcIi4vc3MuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NzLmpzXCIsXG5cdFwiLi9zdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3YuanNcIixcblx0XCIuL3N2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdi5qc1wiLFxuXHRcIi4vc3dcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi9zdy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3cuanNcIixcblx0XCIuL3RhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90YS5qc1wiLFxuXHRcIi4vdGEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RhLmpzXCIsXG5cdFwiLi90ZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGUuanNcIixcblx0XCIuL3RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZS5qc1wiLFxuXHRcIi4vdGV0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZXQuanNcIixcblx0XCIuL3RldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGV0LmpzXCIsXG5cdFwiLi90Z1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGcuanNcIixcblx0XCIuL3RnLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90Zy5qc1wiLFxuXHRcIi4vdGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RoLmpzXCIsXG5cdFwiLi90aC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGguanNcIixcblx0XCIuL3RsLXBoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGwtcGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsLXBoLmpzXCIsXG5cdFwiLi90bGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsaC5qc1wiLFxuXHRcIi4vdGxoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ci5qc1wiLFxuXHRcIi4vdHIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RyLmpzXCIsXG5cdFwiLi90emxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bC5qc1wiLFxuXHRcIi4vdHpsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90emwuanNcIixcblx0XCIuL3R6bVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLmpzXCIsXG5cdFwiLi90em0tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0tbGF0bi5qc1wiLFxuXHRcIi4vdHptLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0uanNcIixcblx0XCIuL3VnLWNuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWctY24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VnLWNuLmpzXCIsXG5cdFwiLi91a1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWsuanNcIixcblx0XCIuL3VrLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ay5qc1wiLFxuXHRcIi4vdXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VyLmpzXCIsXG5cdFwiLi91ci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXIuanNcIixcblx0XCIuL3V6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdXotbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXotbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LmpzXCIsXG5cdFwiLi92aVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdmkuanNcIixcblx0XCIuL3ZpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS92aS5qc1wiLFxuXHRcIi4veC1wc2V1ZG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi94LXBzZXVkby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveC1wc2V1ZG8uanNcIixcblx0XCIuL3lvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS95by5qc1wiLFxuXHRcIi4veW8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3lvLmpzXCIsXG5cdFwiLi96aC1jblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtY24uanNcIixcblx0XCIuL3poLWNuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1jbi5qc1wiLFxuXHRcIi4vemgtaGtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC1oay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtaGsuanNcIixcblx0XCIuL3poLXR3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC10dy5qc1wiLFxuXHRcIi4vemgtdHcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLXR3LmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIHsgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIGlkO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIHJlY3Vyc2l2ZSBeXFxcXC5cXFxcLy4qJFwiOyIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICBbXG4gICAgICBfYyhcImxhYmVsXCIsIHsgcmVmOiBcInN0dWRlbnRzLW9ubHlcIiwgc3RhdGljU3R5bGU6IHsgZGlzcGxheTogXCJub25lXCIgfSB9LCBbXG4gICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgdmFsdWU6IF92bS5zdHVkZW50cyxcbiAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzdHVkZW50c1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImNoZWNrYm94XCIgfSxcbiAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgY2hlY2tlZDogQXJyYXkuaXNBcnJheShfdm0uc3R1ZGVudHMpXG4gICAgICAgICAgICAgID8gX3ZtLl9pKF92bS5zdHVkZW50cywgbnVsbCkgPiAtMVxuICAgICAgICAgICAgICA6IF92bS5zdHVkZW50c1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb246IHtcbiAgICAgICAgICAgIGNoYW5nZTogW1xuICAgICAgICAgICAgICBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgJCRhID0gX3ZtLnN0dWRlbnRzLFxuICAgICAgICAgICAgICAgICAgJCRlbCA9ICRldmVudC50YXJnZXQsXG4gICAgICAgICAgICAgICAgICAkJGMgPSAkJGVsLmNoZWNrZWQgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSgkJGEpKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgJCR2ID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgJCRpID0gX3ZtLl9pKCQkYSwgJCR2KVxuICAgICAgICAgICAgICAgICAgaWYgKCQkZWwuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAkJGkgPCAwICYmIChfdm0uc3R1ZGVudHMgPSAkJGEuY29uY2F0KFskJHZdKSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQkaSA+IC0xICYmXG4gICAgICAgICAgICAgICAgICAgICAgKF92bS5zdHVkZW50cyA9ICQkYVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDAsICQkaSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jb25jYXQoJCRhLnNsaWNlKCQkaSArIDEpKSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgX3ZtLnN0dWRlbnRzID0gJCRjXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBfdm0uc3R1ZGVudHNPbmx5Q2hhbmdlZFxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIF92bS5fdihcIiBTdHVkZW50cyBPbmx5XCIpXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJmZXRjaGVyXCIsXG4gICAgICAgIHsgYXR0cnM6IHsgZmV0Y2hlcjogX3ZtLmZldGNoZXIsIGZldGNoaW5nOiBfdm0uZmV0Y2hpbmcgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX3ZtLl90KFwiZGVmYXVsdFwiLCBudWxsLCB7IHVzZXJzOiBfdm0udXNlcnMsIHN0dWRlbnRzOiBfdm0uc3R1ZGVudHMgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfdm0udXNlcnMubGVuZ3RoID09IDBcbiAgICAgICAgICAgID8gX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2VudGVyYm94IGNvbXAgY2VudGVyXCIgfSwgW1xuICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICBUaGVyZSBhcmUgY3VycmVudGx5IG5vIG1lbWJlcnMgZW5yb2xsZWQgaW4gdGhpcyBzZWN0aW9uLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICBdLFxuICAgICAgICAyXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29udGVudFwiIH0sIFtcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcImZ1bGwgY2wtcmV2aWV3aW5nXCIgfSxcbiAgICAgIFtcbiAgICAgICAgX2MoXCJtYXNrLXZ1ZVwiLCB7IGF0dHJzOiB7IG1hc2s6IF92bS5tYXNrIH0gfSwgW1xuICAgICAgICAgIF92bS5fdihcIkNvbW11bmljYXRpbmcgd2l0aCBzZXJ2ZXIuLi5cIilcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwibWVtYmVyc2ZldGNoZXJcIiwge1xuICAgICAgICAgIGF0dHJzOiB7IGZldGNoaW5nOiBfdm0ucmV2aWV3aW5nID09PSBudWxsIH0sXG4gICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihmZXRjaGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgIF92bS5yZXZpZXdpbmcgIT09IG51bGwgJiYgX3ZtLnVzZXIuYXRMZWFzdChfdm0uaW5zdHJ1Y3RvcilcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBtZXRob2Q6IFwicG9zdFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1pdDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uYXNzaWduUmV2aWV3cygkZXZlbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2VudGVyXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJidXR0b25cIiwgeyBhdHRyczogeyB0eXBlOiBcInN1Ym1pdFwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJBc3NpZ24gUmV2aWV3c1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucmV2aWV3ZXJDbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicmV2aWV3ZXJDbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkJHNlbGVjdGVkVmFsID0gQXJyYXkucHJvdG90eXBlLmZpbHRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCRldmVudC50YXJnZXQub3B0aW9ucywgZnVuY3Rpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gby5zZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbihvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfdmFsdWVcIiBpbiBvID8gby5fdmFsdWUgOiBvLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnJldmlld2VyQ250ID0gJGV2ZW50LnRhcmdldC5tdWx0aXBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJCRzZWxlY3RlZFZhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJCRzZWxlY3RlZFZhbFswXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKDYsIGZ1bmN0aW9uKG51bSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib3B0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRvbVByb3BzOiB7IHZhbHVlOiBudW0gfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MobnVtKSldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF92bS5yZXZpZXdpbmcgIT09IG51bGxcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwic21hbGxcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ0aFwiLCBbX3ZtLl92KFwiVXNlclwiKV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0ubWF4UmV2aWV3ZXIsIGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwidGhcIiwgW192bS5fdihcInJldmlld2VlXCIpXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0ubWF4UmV2aWV3ZWUsIGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwidGhcIiwgW192bS5fdihcInJldmlld2VyXCIpXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChmZXRjaGVyLnVzZXJzLCBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0clwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImFcIiwgeyBhdHRyczogeyB0aXRsZTogdXNlci5uYW1lIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyh1c2VyLnVzZXJJZCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0ubWF4UmV2aWV3ZXIsIGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBfdm0uY2xzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5yZXZpZXdlclt1c2VyLm1lbWJlci5pZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAtIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5kaXNwbGF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoZXIudXNlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnJldmlld2VyW3VzZXIubWVtYmVyLmlkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpIC0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0ubWF4UmV2aWV3ZWUsIGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBfdm0uY2xzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5yZXZpZXdlZVt1c2VyLm1lbWJlci5pZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAtIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5kaXNwbGF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoZXIudXNlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnJldmlld2VlW3VzZXIubWVtYmVyLmlkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpIC0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdKVxuICAgICAgICB9KVxuICAgICAgXSxcbiAgICAgIDFcbiAgICApXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHsgc3RhdGljQ2xhc3M6IFwiY2wtcmV2aWV3c1wiIH0sXG4gICAgW1xuICAgICAgX2MoXCJoMlwiLCBbX3ZtLl92KFwiU3RhZmYgUmV2aWV3XCIpXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwiZm9ybVwiLFxuICAgICAgICB7XG4gICAgICAgICAgYXR0cnM6IHsgbWV0aG9kOiBcInBvc3RcIiB9LFxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICBzdWJtaXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICByZXR1cm4gX3ZtLnN1Ym1pdCgkZXZlbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbX2MoXCJkaXZcIiwgeyByZWY6IFwiZWRpdG9yXCIgfSksIF92bS5fdihcIiBcIiksIF92bS5fbSgwKV1cbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJoM1wiLCBbX3ZtLl92KFwiUmV2aWV3cyBieSB0aGlzIHVzZXIuXCIpXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmJ5UmV2aWV3cy5sZW5ndGggPT09IDBcbiAgICAgICAgPyBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJjZW50ZXJcIiB9LCBbX3ZtLl92KFwiTm9uZVwiKV0pXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLl9sKF92bS5ieVJldmlld3MsIGZ1bmN0aW9uKHJldmlldykge1xuICAgICAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjbC1yZXZpZXdcIiB9LCBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImgzXCIsXG4gICAgICAgICAgICB7IGNsYXNzOiByZXZpZXcucmV2aWV3ZWUuYXRMZWFzdChfdm0uc3RhZmZSb2xlKSA/IFwic3RhZmZcIiA6IFwiXCIgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uZm9ybWF0VGltZShyZXZpZXcudGltZSkpICtcbiAgICAgICAgICAgICAgICAgIFwiIFJldmlldyBieSBcIiArXG4gICAgICAgICAgICAgICAgICBfdm0uX3MocmV2aWV3LnJldmlld2VlLm5hbWUpICtcbiAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtc3VibWl0dGVkXCIgfSwgW1xuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLnNob3dTdWJtaXNzaW9ucyhyZXZpZXcpKSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJwcmVcIiwgW192bS5fdihfdm0uX3MocmV2aWV3Lm1ldGEucmV2aWV3LnJldmlldykpXSlcbiAgICAgICAgXSlcbiAgICAgIH0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiaDNcIiwgW192bS5fdihcIlJldmlld3Mgb2YgdGhpcyB1c2VyJ3MgYXNzaWdubWVudC5cIildKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uZm9yUmV2aWV3cy5sZW5ndGggPT09IDBcbiAgICAgICAgPyBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJjZW50ZXJcIiB9LCBbX3ZtLl92KFwiTm9uZVwiKV0pXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLl9sKF92bS5mb3JSZXZpZXdzLCBmdW5jdGlvbihyZXZpZXcpIHtcbiAgICAgICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtcmV2aWV3XCIgfSwgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJoM1wiLFxuICAgICAgICAgICAgeyBjbGFzczogcmV2aWV3LnJldmlld2VyLmF0TGVhc3QoX3ZtLnN0YWZmUm9sZSkgPyBcInN0YWZmXCIgOiBcIlwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLmZvcm1hdFRpbWUocmV2aWV3LnRpbWUpKSArIFwiXFxuICAgICAgXCIpLFxuICAgICAgICAgICAgICByZXZpZXcucmV2aWV3ZXIuYXRMZWFzdChfdm0uc3RhZmZSb2xlKVxuICAgICAgICAgICAgICAgID8gX2MoXCJzcGFuXCIsIFtfdm0uX3YoXCJTdGFmZiBSZXZpZXdcIildKVxuICAgICAgICAgICAgICAgIDogX2MoXCJzcGFuXCIsIFtfdm0uX3YoXCJSZXZpZXdcIildKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIGJ5IFwiICsgX3ZtLl9zKHJldmlldy5yZXZpZXdlci5uYW1lKSArIFwiXFxuICAgICAgXCIpLFxuICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJjbC1zdWJtaXR0ZWRcIiB9LCBbXG4gICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uc2hvd1N1Ym1pc3Npb25zKHJldmlldykpKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInByZVwiLCBbX3ZtLl92KF92bS5fcyhyZXZpZXcubWV0YS5yZXZpZXcucmV2aWV3KSldKVxuICAgICAgICBdKVxuICAgICAgfSlcbiAgICBdLFxuICAgIDJcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJwXCIsIFtcbiAgICAgIF9jKFwiaW5wdXRcIiwgeyBhdHRyczogeyB0eXBlOiBcInN1Ym1pdFwiLCB2YWx1ZTogXCJTdWJtaXQgUmV2aWV3XCIgfSB9KVxuICAgIF0pXG4gIH1cbl1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbnRlbnRcIiB9LCBbXG4gICAgX2MoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBzdGF0aWNDbGFzczogXCJmdWxsXCIgfSxcbiAgICAgIFtcbiAgICAgICAgX3ZtLl9sKF92bS5qc29uLnN1Ym1pc3Npb25zLCBmdW5jdGlvbihzdWJtaXNzaW9uKSB7XG4gICAgICAgICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtc3VibWlzc2lvbi12aWV3XCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJoMlwiLCBbX3ZtLl92KF92bS5fcyhzdWJtaXNzaW9uLm5hbWUpKV0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIHN1Ym1pc3Npb24udHlwZSA9PT0gXCJ0ZXh0XCJcbiAgICAgICAgICAgICAgPyBfYyhcInByZVwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXByZXZpZXcgeWVsbG93LXBhZFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3Moc3VibWlzc2lvbi50ZXh0KSlcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIHN1Ym1pc3Npb24udHlwZSA9PT0gXCJpbWFnZVwiXG4gICAgICAgICAgICAgID8gX2MoXCJmaWd1cmVcIiwgeyBzdGF0aWNDbGFzczogXCJjbC1wcmV2aWV3XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJpbWdcIiwgeyBhdHRyczogeyBzcmM6IF92bS5wcmV2aWV3SW1nKHN1Ym1pc3Npb24pIH0gfSlcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXByZXZpZXctdGltZVwiIH0sIFtcbiAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uZm9ybWF0VGltZShzdWJtaXNzaW9uLmRhdGUpKSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXSlcbiAgICAgICAgfSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiaDJcIiwgW192bS5fdihcIlJldmlld1wiKV0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcImZvcm1cIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhdHRyczogeyBtZXRob2Q6IFwicG9zdFwiIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBzdWJtaXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zdWJtaXQoJGV2ZW50KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcImRpdlwiLCB7IHJlZjogXCJlZGl0b3JcIiwgc3RhdGljQ2xhc3M6IFwic2hhZG93XCIgfSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX3ZtLl9tKDApXG4gICAgICAgICAgXVxuICAgICAgICApLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcImgyXCIsIFtfdm0uX3YoXCJQcmV2aW91cyBSZXZpZXdzXCIpXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF92bS5yZXZpZXdpbmcubGVuZ3RoID09PSAwXG4gICAgICAgICAgPyBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJjbC1yZXZpZXdzLW5vbmVcIiB9LCBbXG4gICAgICAgICAgICAgIF92bS5fdihcIioqKiBOb25lIFlldCAqKipcIilcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX3ZtLl9sKF92bS5yZXZpZXdpbmcsIGZ1bmN0aW9uKHJldmlldykge1xuICAgICAgICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXJldmlld1wiIH0sIFtcbiAgICAgICAgICAgIF9jKFwiaDNcIiwgW1xuICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5mb3JtYXRUaW1lKHJldmlldy50aW1lKSkgKyBcIiBSZXZpZXcgYnkgTWVcXG4gICAgXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtc3VibWl0dGVkXCIgfSwgW1xuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLnNob3dTdWJtaXNzaW9ucyhyZXZpZXcpKSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwicHJlXCIsIFtfdm0uX3YoX3ZtLl9zKHJldmlldy5tZXRhLnJldmlldy5yZXZpZXcpKV0pXG4gICAgICAgICAgXSlcbiAgICAgICAgfSlcbiAgICAgIF0sXG4gICAgICAyXG4gICAgKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJwXCIsIFtcbiAgICAgIF9jKFwiaW5wdXRcIiwgeyBhdHRyczogeyB0eXBlOiBcInN1Ym1pdFwiLCB2YWx1ZTogXCJTdWJtaXQgUmV2aWV3XCIgfSB9KVxuICAgIF0pXG4gIH1cbl1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHsgc3RhdGljQ2xhc3M6IFwiY2wtcmV2aWV3c1wiIH0sXG4gICAgW1xuICAgICAgX2MoXCJoM1wiLCBbX3ZtLl92KFwiUmV2aWV3cyBvZiB0aGlzIGFzc2lnbm1lbnQgYXBwZWFyIGhlcmUuXCIpXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLnJldmlld3MubGVuZ3RoID09PSAwXG4gICAgICAgID8gX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtcmV2aWV3cy1ub25lXCIgfSwgW1xuICAgICAgICAgICAgX3ZtLl92KFwiKioqIE5vbmUgWWV0ICoqKlwiKVxuICAgICAgICAgIF0pXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLl9sKF92bS5yZXZpZXdzLCBmdW5jdGlvbihyZXZpZXcpIHtcbiAgICAgICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtcmV2aWV3XCIgfSwgW1xuICAgICAgICAgIF9jKFwiaDNcIiwgeyBjbGFzczogcmV2aWV3LnJvbGUgIT09IHVuZGVmaW5lZCA/IFwic3RhZmZcIiA6IFwiXCIgfSwgW1xuICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uZm9ybWF0VGltZShyZXZpZXcudGltZSkpICsgXCJcXG4gICAgICBcIiksXG4gICAgICAgICAgICByZXZpZXcucm9sZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgID8gX2MoXCJzcGFuXCIsIFtfdm0uX3YoXCJTdGFmZiBSZXZpZXdcIildKVxuICAgICAgICAgICAgICA6IF9jKFwic3BhblwiLCBbX3ZtLl92KFwiUmV2aWV3XCIpXSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgYnkgXCIgKyBfdm0uX3MocmV2aWV3LmJ5KSArIFwiXFxuICAgICAgXCIpLFxuICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtc3VibWl0dGVkXCIgfSwgW1xuICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5zaG93U3VibWlzc2lvbnMocmV2aWV3KSkpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJwcmVcIiwgW192bS5fdihfdm0uX3MocmV2aWV3LnJldmlldykpXSlcbiAgICAgICAgXSlcbiAgICAgIH0pXG4gICAgXSxcbiAgICAyXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgY2xhc3M6IF92bS5tYXNrQ2xhc3MgfSwgW1xuICAgIF92bS5zbG90RGVsYXkgPyBfYyhcInBcIiwgW192bS5fdChcImRlZmF1bHRcIildLCAyKSA6IF92bS5fZSgpXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIFtcbiAgICAgIF92bS5kZWxheWVkRmV0Y2hpbmdcbiAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZldGNoaW5nXCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJwXCIsIFtfdm0uX3YoXCJGZXRjaGluZyBmcm9tIHNlcnZlci4uLlwiKV0pXG4gICAgICAgICAgXSlcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAoX3ZtLmZldGNoZXIgPT09IG51bGwgfHwgIV92bS5mZXRjaGVyLmZldGNoaW5nKSAmJiAhX3ZtLmZldGNoaW5nXG4gICAgICAgID8gX3ZtLl90KFwiZGVmYXVsdFwiKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5mZXRjaGVyICE9PSBudWxsICYmIF92bS5mZXRjaGVyLm1vcmVcbiAgICAgICAgPyBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJtb3JlXCIgfSwgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmZldGNoTW9yZSgkZXZlbnQpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBbX3ZtLl92KFwiTU9SRVwiKV1cbiAgICAgICAgICAgIClcbiAgICAgICAgICBdKVxuICAgICAgICA6IF92bS5fZSgpXG4gICAgXSxcbiAgICAyXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00M2IyNmJjYiZsYW5nPXNjc3Mmc2NvcGVkPXRydWUmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjQ1MWVjMWE0XCIsIGNvbnRlbnQsIGZhbHNlLCB7fSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQzYjI2YmNiJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00M2IyNmJjYiZsYW5nPXNjc3Mmc2NvcGVkPXRydWUmXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJ2YXIgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnNcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vQ29uc29sZUNvbXBvbmVudEJhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Db25zb2xlQ29tcG9uZW50QmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXGNoYXJsXFxcXERvY3VtZW50c1xcXFxDbGFzc2VzXFxcXENTRTMyMFxcXFx3ZWJcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzY5ZTM1NWE4JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzY5ZTM1NWE4JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIFxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZlbmRvci9jbC9jb25zb2xlL2pzL0NvbnNvbGVDb21wb25lbnRCYXNlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0NvbnNvbGVDb21wb25lbnRCYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ29uc29sZUNvbXBvbmVudEJhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9NZW1iZXJzRmV0Y2hlckNvbXBvbmVudC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9M2VhYjQ0ZDImXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vTWVtYmVyc0ZldGNoZXJDb21wb25lbnQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9NZW1iZXJzRmV0Y2hlckNvbXBvbmVudC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXGNoYXJsXFxcXERvY3VtZW50c1xcXFxDbGFzc2VzXFxcXENTRTMyMFxcXFx3ZWJcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzNlYWI0NGQyJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzNlYWI0NGQyJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9NZW1iZXJzRmV0Y2hlckNvbXBvbmVudC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9M2VhYjQ0ZDImXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignM2VhYjQ0ZDInLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZlbmRvci9jbC9jb3Vyc2UvanMvQ29uc29sZS9NZW1iZXJzL01lbWJlcnNGZXRjaGVyQ29tcG9uZW50LnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL01lbWJlcnNGZXRjaGVyQ29tcG9uZW50LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTWVtYmVyc0ZldGNoZXJDb21wb25lbnQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL01lbWJlcnNGZXRjaGVyQ29tcG9uZW50LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zZWFiNDRkMiZcIiIsImNvbnN0IExPQ0FMX1NUT1JBR0VfU1RVREVOVFNfT05MWSA9ICdjbF9zdHVkZW50c19vbmx5JztcclxuXHJcbi8qKlxyXG4gKiBJdGVtIGluIGxvY2FsIHN0b3JhZ2UgdGhhdCBtYWludGFpbnMgdGhlIHN0YXRlIG9mXHJcbiAqIFwic3R1ZGVudHMgb25seVwiIGluIHRoZSBjb25zb2xlLlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjb25zdCBTdHVkZW50c09ubHkgPSBmdW5jdGlvbigpIHtcclxufVxyXG5cclxuU3R1ZGVudHNPbmx5LmdldCA9IGZ1bmN0aW9uKCkge1xyXG5cdGNvbnN0IGxvY2FsU3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XHJcblx0bGV0IHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX1NUVURFTlRTX09OTFkpO1xyXG5cdHJldHVybiBzID09PSAneWVzJztcclxufVxyXG5cclxuU3R1ZGVudHNPbmx5LnNldCA9IGZ1bmN0aW9uKHN0dWRlbnRzKSB7XHJcblx0Y29uc3QgbG9jYWxTdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcclxuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX1NUVURFTlRTX09OTFksIHN0dWRlbnRzID8gJ3llcycgOiAnbm8nKTtcclxuXHJcbn0iLCIvKipcclxuICogQGZpbGUgTWVtYmVyIG9mIGEgY291cnNlXHJcbiAqIEF0dGFjaGVzIHRvIGEgdXNlciBPYmplY3RcclxuICovXHJcblxyXG5pbXBvcnQge01lbWJlcnNoaXB9IGZyb20gJy4uLy4uLy4uL3VzZXJzL2pzL1VzZXJzL01lbWJlcnNoaXAuanMnO1xyXG5cclxubGV0IE1lbWJlciA9IGZ1bmN0aW9uKGpzb24pIHtcclxuICAgIE1lbWJlcnNoaXAuY2FsbCh0aGlzKTtcclxuXHJcbiAgICBsZXQgcm9sZSA9ICdHJztcclxuXHJcbiAgICBpZihqc29uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmlkID0ganNvbi5pZDtcclxuICAgICAgICB0aGlzLnNlbWVzdGVyID0ganNvbi5zZW1lc3RlcjtcclxuICAgICAgICB0aGlzLnNlY3Rpb24gPSBqc29uLnNlY3Rpb247XHJcbiAgICAgICAgcm9sZSA9IGpzb24ucm9sZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IDA7ICAgIC8vIFN5c3RlbSBtZW1iZXJzaGlwIElEXHJcbiAgICAgICAgdGhpcy5zZW1lc3RlciA9IG51bGw7ICAgLy8gU2VtZXN0ZXIgY29kZVxyXG4gICAgICAgIHRoaXMuc2VjdGlvbiA9IG51bGw7ICAvLyBTZWN0aW9uIElkXHJcbiAgICAgICAgcm9sZSA9IG51bGw7ICAgICAgIC8vIE1lbWJlcnNoaXAgcm9sZVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucm9sZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiByb2xlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0Um9sZSA9IGZ1bmN0aW9uKHJvbGVfKSB7XHJcbiAgICAgICAgcm9sZSA9IHJvbGVfO1xyXG4gICAgfVxyXG59XHJcblxyXG5NZW1iZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShNZW1iZXJzaGlwLnByb3RvdHlwZSk7XHJcbk1lbWJlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNZW1iZXI7XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBjb3Vyc2Ugc2VjdGlvbiBmb3IgYSBtZW1iZXJcclxuICogQHBhcmFtIHN0b3JlIFZ1ZXggc3RvcmVcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5NZW1iZXIucHJvdG90eXBlLmdldFNlY3Rpb24gPSBmdW5jdGlvbihzdG9yZSkge1xyXG4gICAgcmV0dXJuIHN0b3JlLmdldHRlcnNbJ2NvdXJzZS9zZWN0aW9uJ10odGhpcy5zZW1lc3RlciwgdGhpcy5zZWN0aW9uKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCBhbiBhc3NpZ25tZW50IGZvciBhIG1lbWJlclxyXG4gKiBAcGFyYW0gc3RvcmUgVnVleCBzdG9yZVxyXG4gKiBAcGFyYW0gYXNzaWdudGFnIEFzc2lnbm1lbnQgdGFnXHJcbiAqL1xyXG5NZW1iZXIucHJvdG90eXBlLmdldEFzc2lnbm1lbnQgPSBmdW5jdGlvbihzdG9yZSwgYXNzaWdudGFnKSB7XHJcbiAgICBjb25zdCBzZWN0aW9uID0gdGhpcy5nZXRTZWN0aW9uKHN0b3JlKTtcclxuICAgIHJldHVybiBzZWN0aW9uLmdldEFzc2lnbm1lbnQoYXNzaWdudGFnKTtcclxufVxyXG5cclxuXHJcbi8vIFRoZSBwb3NzaWJsZSBtZW1iZXIgcm9sZXNcclxuLy8gTXVzdCBtYXRjaCB2YWx1ZXMgaW4gTWVtYmVyLnBocFxyXG5NZW1iZXIuR1VFU1QgPSAnRyc7ICAgICAvLy88IEd1ZXN0IHVzZXIgdmlzaXRpbmcgdGhlIHNpdGVcclxuTWVtYmVyLlVTRVIgPSAnVSc7ICAgICAgLy8vPCBTdGFuZGFyZCB1c2VyIGZyb20gVXNlciwgZG9uJ3QgdXNlIGZvciBNZW1iZXJcclxuTWVtYmVyLkRST1BQRUQgPSAnRCc7ICAgLy8vPCBVc2VyIGhhcyBkcm9wcGVkIHRoZSBjb3Vyc2VcclxuTWVtYmVyLlNUVURFTlQgPSAnVCc7ICAgLy8vPCBFbnJvbGxlZCBzdHVkZW50IGluIGNvdXJzZVxyXG5NZW1iZXIuU1RBRkYgPSAnUyc7ICAgICAvLy88IEFueSBjb3Vyc2Ugc3RhZmZcclxuTWVtYmVyLkdSQURFUiA9ICdSJzsgICAgLy8vPCBHcmFkZXJzXHJcbk1lbWJlci5UQSA9ICdFJzsgICAgICAgIC8vLzwgVGVhY2hpbmcgYXNzaXN0YW50XHJcbk1lbWJlci5JTlNUUlVDVE9SID0gJ0knOyAgICAvLy88IENvdXJzZSBpbnN0cnVjdG9yXHJcbk1lbWJlci5BRE1JTiA9ICdBJzsgICAgIC8vLzwgQWRtaW5cclxuXHJcbk1lbWJlci5wcm90b3R5cGUuZ2V0Um9sZXMgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCByb2xlcyA9IHt9O1xyXG4gICAgcm9sZXNbTWVtYmVyLkdVRVNUXSA9IHtuYW1lOiAnR3Vlc3QnLCBwcmlvcml0eTogMX07XHJcbiAgICByb2xlc1tNZW1iZXIuRFJPUFBFRF0gPSB7bmFtZTogJ0Ryb3BwZWQnLCBwcmlvcml0eTogMn07XHJcbiAgICByb2xlc1tNZW1iZXIuVVNFUl0gPSB7bmFtZTogJ1VzZXInLCBwcmlvcml0eTogMywgc2tpcDogdHJ1ZX07XHJcbiAgICByb2xlc1tNZW1iZXIuU1RVREVOVF0gPSB7bmFtZTogJ1N0dWRlbnQnLCBwcmlvcml0eTogNH07XHJcbiAgICByb2xlc1tNZW1iZXIuU1RBRkZdID0ge25hbWU6ICdTdGFmZicsIHByaW9yaXR5OiA1LCBza2lwOiB0cnVlfTtcclxuICAgIHJvbGVzW01lbWJlci5HUkFERVJdID0ge25hbWU6ICdHcmFkZXInLCBwcmlvcml0eTogNn07XHJcbiAgICByb2xlc1tNZW1iZXIuVEFdID0ge25hbWU6ICdUZWFjaGluZyBBc3Npc3RhbnQnLCBwcmlvcml0eTogN307XHJcbiAgICByb2xlc1tNZW1iZXIuSU5TVFJVQ1RPUl0gPSB7bmFtZTogJ0luc3RydWN0b3InLCBwcmlvcml0eTogOH07XHJcbiAgICByb2xlc1tNZW1iZXIuQURNSU5dID0ge25hbWU6ICdBZG1pbicsIHByaW9yaXR5OiAxMDB9O1xyXG5cclxuICAgIHJldHVybiByb2xlcztcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7TWVtYmVyfTtcclxuXHJcblxyXG5cclxuIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/c291cmNlTWFwIS4vX3Jldmlldy5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjA5MThmN2M0XCIsIGNvbnRlbnQsIGZhbHNlLCB7fSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuL19yZXZpZXcuc2Nzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuL19yZXZpZXcuc2Nzc1wiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiLypcclxuICogVGhlIG1haW4gUmV2aWV3IHN5c3RlbSBlbnRyeSBwb2ludFxyXG4gKi9cclxuXHJcbi8vXHJcbi8vIEluc3RhbGwgdGhlIGNvbnNvbGUgY29tcG9uZW50c1xyXG4vL1xyXG5pbXBvcnQgJy4vX3Jldmlldy5zY3NzJztcclxuaW1wb3J0IHtSZXZpZXdDb25zb2xlfSBmcm9tICcuL2pzL0NvbnNvbGUvUmV2aWV3Q29uc29sZSc7XHJcbmltcG9ydCBSZXZpZXdWdWUgZnJvbSAnLi9qcy9SZXZpZXdWdWUudnVlJztcclxuaW1wb3J0IHtQYWdlVnVlfSBmcm9tICdzaXRlLWNsL2pzL1Z1ZS9QYWdlVnVlJztcclxuaW1wb3J0IHtJbmxpbmVWdWV9IGZyb20gJ3NpdGUtY2wvanMvVnVlL0lubGluZVZ1ZSc7XHJcblxyXG5pbXBvcnQgUmV2aWV3c1Z1ZSBmcm9tICcuL2pzL1Jldmlld3NWdWUudnVlJztcclxuXHJcbmlmKFNpdGUuU2l0ZS5jb25zb2xlICE9PSB1bmRlZmluZWQpIHtcclxuXHRSZXZpZXdDb25zb2xlLnNldHVwKFNpdGUuU2l0ZS5jb25zb2xlKTtcclxufVxyXG5cclxuU2l0ZS5TaXRlLnJlYWR5KCgpID0+IHtcclxuICAgIFBhZ2VWdWUuY3JlYXRlKCdkaXYuY2wtcmV2aWV3JywgJ1JldmlldyBWdWUnLCBSZXZpZXdWdWUpO1xyXG5cdElubGluZVZ1ZS5jcmVhdGUoJ2Rpdi5jbC1yZXZpZXdzJywgUmV2aWV3c1Z1ZSk7XHJcbn0pOyIsIlxyXG5cclxuaW1wb3J0IFJldmlld1Jldmlld2Vyc1Z1ZSBmcm9tICcuL1Jldmlld1Jldmlld2Vycy52dWUnO1xyXG5pbXBvcnQgUmV2aWV3c0J5Rm9yTWVtYmVyVnVlIGZyb20gJy4vUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZSc7XHJcblxyXG4vKipcclxuICogUmV2aWV3IHN5c3RlbSBjb25zb2xlIGNvbXBvbmVudHNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgbGV0IFJldmlld0NvbnNvbGUgPSBmdW5jdGlvbigpIHtcclxufVxyXG5cclxuUmV2aWV3Q29uc29sZS5zZXR1cCA9IGZ1bmN0aW9uKENvbnNvbGUpIHtcclxuICAgIENvbnNvbGUuUmV2aWV3ID0ge1xyXG4gICAgICAgICdyZXZpZXdzYnlmb3InOiBSZXZpZXdzQnlGb3JNZW1iZXJWdWVcclxuICAgIH07XHJcblxyXG4gICAgQ29uc29sZS50YWJsZXMuYWRkKHtcclxuICAgICAgICB0aXRsZTogJ1JldmlldycsXHJcbiAgICAgICAgb3JkZXI6IDcwLFxyXG4gICAgICAgIGFwaTogJy9hcGkvcmV2aWV3L3RhYmxlcydcclxuICAgIH0pO1xyXG5cclxuICAgIENvbnNvbGUuY29tcG9uZW50cy5hZGRSb3V0ZShcclxuICAgICAgICB7cm91dGU6ICcvcmV2aWV3L3Jldmlld2Vycy86YXNzaWdudGFnJywgY29tcG9uZW50OiBSZXZpZXdSZXZpZXdlcnNWdWUsIHByb3BzOiB0cnVlfVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBDb25zb2xlLmNvbXBvbmVudHMuYWRkUm91dGUoXHJcbiAgICAvLyAgICAge3JvdXRlOiAnL3F1aXovcmVzdWx0LzptZW1iZXJpZC86YXNzaWdudGFnLzpxdWl6dGFnJywgY29tcG9uZW50OiBRdWl6UmVzdWx0Q29tcG9uZW50LCBwcm9wczogdHJ1ZX1cclxuICAgIC8vICk7XHJcblxyXG4gICAgQ29uc29sZS5jb3Vyc2UuYXNzaWdubWVudExpbmsoJ3JldmlldycsICdyZXZpZXdlcnMnLCAnL3Jldmlldy9yZXZpZXdlcnMvOmFzc2lnbnRhZycpO1xyXG59XHJcblxyXG4iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1Jldmlld1Jldmlld2Vycy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YmVjNWRmZGMmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUmV2aWV3UmV2aWV3ZXJzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUmV2aWV3UmV2aWV3ZXJzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcY2hhcmxcXFxcRG9jdW1lbnRzXFxcXENsYXNzZXNcXFxcQ1NFMzIwXFxcXHdlYlxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnYmVjNWRmZGMnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnYmVjNWRmZGMnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1Jldmlld1Jldmlld2Vycy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YmVjNWRmZGMmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignYmVjNWRmZGMnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZlbmRvci9jbC9yZXZpZXcvanMvQ29uc29sZS9SZXZpZXdSZXZpZXdlcnMudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmV2aWV3UmV2aWV3ZXJzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmV2aWV3UmV2aWV3ZXJzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXZpZXdSZXZpZXdlcnMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWJlYzVkZmRjJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9SZXZpZXdzQnlGb3JNZW1iZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTdiMzZmZTc2JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1Jldmlld3NCeUZvck1lbWJlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1Jldmlld3NCeUZvck1lbWJlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXGNoYXJsXFxcXERvY3VtZW50c1xcXFxDbGFzc2VzXFxcXENTRTMyMFxcXFx3ZWJcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzdiMzZmZTc2JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzdiMzZmZTc2JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9SZXZpZXdzQnlGb3JNZW1iZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTdiMzZmZTc2JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzdiMzZmZTc2Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJ2ZW5kb3IvY2wvcmV2aWV3L2pzL0NvbnNvbGUvUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jldmlld3NCeUZvck1lbWJlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jldmlld3NCeUZvck1lbWJlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmV2aWV3c0J5Rm9yTWVtYmVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03YjM2ZmU3NiZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUmV2aWV3VnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00ZWViMzI2MiZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9SZXZpZXdWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9SZXZpZXdWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxjaGFybFxcXFxEb2N1bWVudHNcXFxcQ2xhc3Nlc1xcXFxDU0UzMjBcXFxcd2ViXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc0ZWViMzI2MicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc0ZWViMzI2MicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vUmV2aWV3VnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00ZWViMzI2MiZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc0ZWViMzI2MicsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwidmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdWdWUudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmV2aWV3VnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmV2aWV3VnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXZpZXdWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTRlZWIzMjYyJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9SZXZpZXdzVnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wOTRmZTQ0NyZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9SZXZpZXdzVnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUmV2aWV3c1Z1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXGNoYXJsXFxcXERvY3VtZW50c1xcXFxDbGFzc2VzXFxcXENTRTMyMFxcXFx3ZWJcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzA5NGZlNDQ3JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzA5NGZlNDQ3JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9SZXZpZXdzVnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wOTRmZTQ0NyZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCcwOTRmZTQ0NycsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwidmVuZG9yL2NsL3Jldmlldy9qcy9SZXZpZXdzVnVlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jldmlld3NWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXZpZXdzVnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXZpZXdzVnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wOTRmZTQ0NyZcIiIsIi8qXHJcbiAqIFV0aWxpdHkgZnVuY3Rpb25zIHRvIGZvcm1hdCB0aW1lcy5cclxuICovXHJcblxyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG4vKipcclxuICogVXRpbGl0eSBmdW5jdGlvbnMgdG8gZm9ybWF0IHRpbWVzLlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBsZXQgVGltZUZvcm1hdHRlciA9IGZ1bmN0aW9uKCkge1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCBhIHRpbWUgdG8gdGhlIGZvcm1hdCB3ZSBkaXNwbGF5XHJcbiAqIFRpbWUgaXMgcmVsYXRpdmUgdG8gYSBzcGVjaWZpZWQgdGltZSAob3IgY3VycmVudCB0aW1lKVxyXG4gKiBAcGFyYW0ge21vbWVudH0gdGltZSBUaW1lIHRvIGNvbnZlcnQgKG1vbWVudClcclxuICogQHBhcmFtIHttb21lbnR9IGN1cnJlbnRUaW1lIEN1cnJlbnQgdGltZSAobW9tZW50KVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybWF0IE1vbWVudCBmb3JtYXRcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcblRpbWVGb3JtYXR0ZXIucmVsYXRpdmUgPSBmdW5jdGlvbih0aW1lLCBjdXJyZW50VGltZSwgZm9ybWF0KSB7XHJcbiAgICBpZihjdXJyZW50VGltZSA9PT0gdW5kZWZpbmVkIHx8IGN1cnJlbnRUaW1lID09PSBudWxsKSB7XHJcbiAgICAgICAgY3VycmVudFRpbWUgPSBtb21lbnQubm93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZWxhcHNlZCA9IGN1cnJlbnRUaW1lLmRpZmYodGltZSk7XHJcblxyXG4gICAgaWYoZWxhcHNlZCA8IDYwMDAwKSB7XHJcbiAgICAgICAgcmV0dXJuICc8MSBtaW4gYWdvJztcclxuICAgIH1cclxuXHJcbiAgICBpZihlbGFwc2VkIDwgMzYwMDAwMCkge1xyXG4gICAgICAgIC8vIFdpdGhpbiBhbiBob3VyIGFnb1xyXG4gICAgICAgIGNvbnN0IG1pbnMgPSBNYXRoLmZsb29yKGVsYXBzZWQgLyA2MDAwMCk7XHJcbiAgICAgICAgcmV0dXJuICcnICsgbWlucyArICcgbWluIGFnbyc7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAqIERldGVybWluZSBpZiBpdCB3YXMgdG9kYXlcclxuICAgICAqL1xyXG4gICAgaWYodGltZS5kYXRlKCkgPT09IGN1cnJlbnRUaW1lLmRhdGUoKSAmJlxyXG4gICAgICAgIHRpbWUubW9udGgoKSA9PT0gY3VycmVudFRpbWUubW9udGgoKSAmJlxyXG4gICAgICAgIHRpbWUueWVhcigpID09PSBjdXJyZW50VGltZS55ZWFyKCkpIHtcclxuICAgICAgICBsZXQgaG91ciA9IHRpbWUuaG91cigpO1xyXG4gICAgICAgIGxldCBhbSA9ICdhbSc7XHJcbiAgICAgICAgaWYoaG91ciA9PT0gMCkge1xyXG4gICAgICAgICAgICBob3VyID0gMTI7XHJcbiAgICAgICAgfSBlbHNlIGlmKGhvdXIgPT09IDEyKSB7XHJcbiAgICAgICAgICAgIGFtID0gJ3BtJ1xyXG4gICAgICAgIH0gZWxzZSBpZihob3VyID4gMTIpIHtcclxuICAgICAgICAgICAgYW0gPSAncG0nO1xyXG4gICAgICAgICAgICBob3VyIC09IDEyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWludXRlID0gdGltZS5taW51dGUoKTtcclxuICAgICAgICBpZihtaW51dGUgPCAxMCkge1xyXG4gICAgICAgICAgICBtaW51dGUgPSAnMCcgKyBtaW51dGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gXCJUb2RheSBhdCBcIiArIGhvdXIgKyAnOicgKyBtaW51dGUgKyBhbTtcclxuICAgIH1cclxuXHJcbiAgICBpZihmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGZvcm1hdCA9ICdNLURELVlZWVkgaDptbTpzc2EnO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aW1lLmZvcm1hdChmb3JtYXQpO1xyXG59XHJcblxyXG4vKipcclxuICogRGlzcGxheSBhIFVuaXggdGltZSBhcyBhbiBhYnNvbHV0ZSB0aW1lLlxyXG4gKiBAcGFyYW0ge2ludH0gdGltZSBVbml4IHRpbWUgKHNlY29uZHMpXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtYXQgTW9tZW50IGZvcm1hdCBvciAnbG9uZycgb3IgJ3Nob3J0JyBmb3IgZGF5cyBpbmNsdXNpb24uXHJcbiAqL1xyXG5UaW1lRm9ybWF0dGVyLmFic29sdXRlVU5JWCA9IGZ1bmN0aW9uKHRpbWUsIGZvcm1hdCkge1xyXG4gICAgbGV0IHQgPSBtb21lbnQudW5peCh0aW1lKTtcclxuICAgIGlmKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZm9ybWF0ID0gJ00tREQtWVlZWSBoOm1tOnNzYSc7XHJcbiAgICB9IGVsc2UgaWYoZm9ybWF0ID09PSAnc2hvcnQnKSB7XHJcblx0ICAgIGZvcm1hdCA9ICdkZGQsIE0tREQtWVlZWSBoOm1tOnNzYSc7XHJcbiAgICB9IGVsc2UgaWYoZm9ybWF0ID09PSAnbG9uZycpIHtcclxuXHQgICAgZm9ybWF0ID0gJ2RkZGQsIE0tREQtWVlZWSBoOm1tOnNzYSc7XHJcbiAgICB9IGVsc2UgaWYoZm9ybWF0ID09PSAnbG9uZy1kYXRlJykge1xyXG5cdCAgICBmb3JtYXQgPSAnZGRkZCwgTS1ERC1ZWVlZJztcclxuICAgIH0gZWxzZSBpZihmb3JtYXQgPT09ICdzaG9ydC10aW1lJykge1xyXG5cdCAgICBmb3JtYXQgPSAnaDptbWEnO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0LmZvcm1hdChmb3JtYXQpO1xyXG59XHJcblxyXG4vKipcclxuICogRGlzcGxheSBhIFVuaXggdGltZSBhcyBhIHJlbGF0aXZlIHRpbWUuXHJcbiAqIEBwYXJhbSB7aW50fSB0aW1lIFVuaXggdGltZSAoc2Vjb25kcylcclxuICogQHBhcmFtIHtpbnR9IGN1cnJlbnRUaW1lIEN1cnJlbnQgdGltZSBhcyBVTklYIHRpbWUgKG9wdGlvbmFsKVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybWF0IE1vbWVudCBmb3JtYXQgb3IgJ2xvbmcnIG9yICdzaG9ydCcgZm9yIGRheXMgaW5jbHVzaW9uLlxyXG4gKi9cclxuVGltZUZvcm1hdHRlci5yZWxhdGl2ZVVOSVggPSBmdW5jdGlvbih0aW1lLCBjdXJyZW50VGltZSwgZm9ybWF0KSB7XHJcbiAgICBsZXQgdCA9IG1vbWVudC51bml4KHRpbWUpO1xyXG4gICAgbGV0IGMgPSBjdXJyZW50VGltZSAhPT0gbnVsbCA/IG1vbWVudC51bml4KGN1cnJlbnRUaW1lKSA6IG1vbWVudCgpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnJlbGF0aXZlKHQsIGMsIGZvcm1hdCk7XHJcbn1cclxuIiwiLypcclxuICogSmF2YXNjcmlwdCBzdXBwb3J0IGZvciB0aGUgRWRpdG9yXHJcbiAqL1xyXG5cclxuaW1wb3J0ICcuL19lZGl0b3Iuc2Nzcyc7XHJcbmltcG9ydCBSZXNpemVyIGZyb20gJ3Jlc2l6ZXItY2wnO1xyXG5pbXBvcnQge0VkaXRvck9wdGlvbnN9IGZyb20gJy4vRWRpdG9yT3B0aW9ucyc7XHJcblxyXG4vKipcclxuICogSmF2YXNjcmlwdCBvYmplY3QgaW4gc3VwcG9ydCBvZiB0ZXh0YXJlYS1iYXNlZCBlZGl0b3JcclxuICpcclxuICogSWYgZWRpdG9yIGhhcyB0aGUgY29kZSBzdHlsZSwgbGluZSBudW1iZXJzIGFyZSBkaXNwbGF5ZWQuXHJcbiAqIFNldCBtZW1iZXIgLnRhYiB0byBzdXBwb3J0IHNtYXJ0IHRhYnNcclxuICogU2V0IG1lbWJlciAuYXV0b0luZGVudCB0byBzdXBwb3J0IGF1dG9tYXRpYyBpbmRlbnRhdGlvblxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IGZvciB0aGUgdGV4dGFyZWEgd2UgYXJlIHR1cm5pbmcgaW50byBhbiBlZGl0b3JcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgT3B0aW9ucyB0byBwYXNzIHRvIHRoZSBlZGl0b3JcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgbGV0IEVkaXRvciA9IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuICAgIGlmKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG9wdGlvbnMgPSBuZXcgRWRpdG9yT3B0aW9ucyhvcHRpb25zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG5ldyBFZGl0b3JPcHRpb25zKEpTT04ucGFyc2UoZWxlbWVudC50ZXh0Q29udGVudCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY2wtZWRpdG9yJyk7XHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgY29uc3QgcmVzaXplciA9IG5ldyBSZXNpemVyKGVsZW1lbnQsIHtcclxuICAgICAgIHJlc2l6ZTogb3B0aW9ucy5yZXNpemUsXHJcbiAgICAgICBoYW5kbGU6IG9wdGlvbnMuaGFuZGxlLFxyXG4gICAgICAgZ3JhYlNpemU6IG9wdGlvbnMuZ3JhYlNpemVcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcclxuICAgIHRoaXMudGV4dGFyZWEgPSB0YTtcclxuICAgIGZvcihsZXQgY2xzIG9mIG9wdGlvbnMuY2xhc3Nlcykge1xyXG4gICAgICAgIHRhLmNsYXNzTGlzdC5hZGQoY2xzKTtcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZCh0YSk7XHJcbiAgICB0YS52YWx1ZSA9IG9wdGlvbnMudmFsdWU7XHJcbiAgICBpZihvcHRpb25zLm5hbWUgIT09IG51bGwpIHtcclxuICAgICAgICB0YS5uYW1lID0gb3B0aW9ucy5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKG9wdGlvbnMuY29kZSkge1xyXG4gICAgICAgIHRhLmNsYXNzTGlzdC5hZGQoJ2NvZGUnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZihvcHRpb25zLmhlaWdodCAhPT0gbnVsbCkge1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYob3B0aW9ucy5taW5IZWlnaHQgIT09IG51bGwpIHtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLm1pbkhlaWdodCA9IG9wdGlvbnMubWluSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHRhLnNwZWxsY2hlY2sgPSBvcHRpb25zLnNwZWxsY2hlY2s7XHJcblxyXG4gICAgLy8gSUUxMSBhbmQgc29tZSBvbGRlciBicm93c2VycyBkbyBub3Qgc3VwcG9ydFxyXG4gICAgLy8gdGhlIGluc2VydFRleHQgY29tbWFuZC4gVGhpcyBkZXRlcm1pbmVzIGlmIGl0XHJcbiAgICAvLyBpcyBhdmFpbGFibGUuIFRoaXMgbWF5IGJlIHJldmlzZWQgaXQgdGhlIGF0dGVtcHQgdG9cclxuICAgIC8vIHVzZSB0aGVtIGZhaWxzLlxyXG4gICAgbGV0IGluc2VydFRleHRTdXBwb3J0ZWQgPSBkb2N1bWVudC5xdWVyeUNvbW1hbmRTdXBwb3J0ZWQgKFwiaW5zZXJ0VGV4dFwiKTtcclxuICAgIGxldCBkZWxldGVTdXBwb3J0ZWQgPSBkb2N1bWVudC5xdWVyeUNvbW1hbmRTdXBwb3J0ZWQgKFwiZGVsZXRlXCIpO1xyXG5cclxuICAgIC8vIFNldCB0cnVlIGFmdGVyIHdlIGF1dG8taW5kZW50XHJcbiAgICBsZXQganVzdEluZGVudGVkID0gZmFsc2U7XHJcbiAgICBpZihvcHRpb25zLnRhYiB8fCBvcHRpb25zLmF1dG9JbmRlbnQpIHtcclxuICAgICAgICB0YS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG9wdGlvbnMudGFiICYmIGV2ZW50LndoaWNoID09PSA5KSB7ICAvLyBUYWIgY2hhcmFjdGVyXHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCFldmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYkF0Q2FyZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBqdXN0SW5kZW50ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1blRhYigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGp1c3RJbmRlbnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYob3B0aW9ucy5hdXRvSW5kZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZihldmVudC53aGljaCA9PSAxMykgeyAgICAgLy8gUmV0dXJuIGNoYXJhY3RlclxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAganVzdEluZGVudGVkID0gcmV0dXJuV2l0aEluZGVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihqdXN0SW5kZW50ZWQgJiYgZXZlbnQud2hpY2ggPT0gOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEJhY2tzcGFjZSBhZnRlciB3ZSBqdXN0IGluZGVudGVkIVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHVuRGVudCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGp1c3RJbmRlbnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAqIFRoaXMgaXMgdGhlIG1hZ2ljIHRoYXQgc3luY3MgdGhlIGJhY2tncm91bmQgd2l0aCB0aGVcclxuICAgICAqIGxpbmUgbnVtYmVycyBpbiBpdC5cclxuICAgICAqL1xyXG4gICAgdGEuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9wID0gdGEuc2Nyb2xsVG9wO1xyXG4gICAgICAgIGNvbnN0IGxlZnQgPSB0YS5zY3JvbGxMZWZ0O1xyXG4gICAgICAgIHRhLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IC1sZWZ0ICsgJ3B4ICcgKyAtdG9wICsgJ3B4JztcclxuICAgIH0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAgKiBJbnNlcnQgYSB0YWIgYXQgdGhlIGN1cnJlbnQgZWRpdCBsb2NhdGlvbiBpbiB0aGUgdGV4dGFyZWFcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gdGFiQXRDYXJldCgpIHtcclxuICAgICAgICBjb25zdCBkU2VsID0gdGE7XHJcblxyXG4gICAgICAgIGlmIChkU2VsLnNlbGVjdGlvblN0YXJ0IHx8IGRTZWwuc2VsZWN0aW9uU3RhcnQgPT0gJzAnKSB7XHJcbiAgICAgICAgICAgIC8vRm9yIGJyb3dzZXJzIGxpa2UgRmlyZWZveCBhbmQgV2Via2l0IGJhc2VkXHJcbiAgICAgICAgICAgIHZhciBzdGFydFBvcyA9IGRTZWwuc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICAgICAgICAgIHZhciBlbmRQb3MgPSBkU2VsLnNlbGVjdGlvbkVuZDtcclxuICAgICAgICAgICAgaWYoc3RhcnRQb3MgPT0gZW5kUG9zKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUYWJiaW5nIGF0IHRoZSBjdXJyZW50IGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICB2YXIgYmVmb3JlID0gZFNlbC52YWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNwbGl0ID0gYmVmb3JlLnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxhc3RMaW5lID0gc3BsaXRbc3BsaXQubGVuZ3RoLTFdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxhc3RMZW4gPSBsYXN0TGluZS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9BZGQgPSBvcHRpb25zLnRhYlNpemUgLSAobGFzdExlbiAlIG9wdGlvbnMudGFiU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3BhY2VzID0gJyc7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGk9MDsgaTx0b0FkZDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VzICs9ICcgJztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpbnNlcnRUZXh0KGRTZWwsIHNwYWNlcyk7XHJcbiAgICAgICAgICAgICAgICBkU2VsLnNlbGVjdGlvblN0YXJ0ID0gc3RhcnRQb3MgKyB0b0FkZDtcclxuICAgICAgICAgICAgICAgIGRTZWwuc2VsZWN0aW9uRW5kID0gc3RhcnRQb3MgKyB0b0FkZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFRhYmJpbmcgYSBzZWxlY3Rpb25cclxuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkU2VsLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNwbGl0ID0gdmFsLnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpbmVQb3MgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIGxpbmUgdGhlIHNlbGVjdGlvbiBzdGFydHMgb25cclxuICAgICAgICAgICAgICAgIGZvcih2YXIgbGluZT0wOyBsaW5lIDwgc3BsaXQubGVuZ3RoOyBsaW5lKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dExpbmVQb3MgPSBsaW5lUG9zICsgc3BsaXRbbGluZV0ubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBpZihzdGFydFBvcyA+PSBsaW5lUG9zICYmIHN0YXJ0UG9zIDwgbmV4dExpbmVQb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVQb3MgPSBuZXh0TGluZVBvcztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzcGFjZXMgPSAnJztcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaT0wOyBpPG9wdGlvbnMudGFiU2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VzICs9ICcgJztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5zZXJ0aW9ucyA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSW5kZW50IHVudGlsIHdlIGFyZSBkb25lXHJcbiAgICAgICAgICAgICAgICBmb3IoIDsgbGluZSA8IHNwbGl0Lmxlbmd0aDsgIGxpbmUrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRTZWwuc2VsZWN0aW9uU3RhcnQgPSBsaW5lUG9zICsgaW5zZXJ0aW9ucztcclxuICAgICAgICAgICAgICAgICAgICBkU2VsLnNlbGVjdGlvbkVuZCA9IGxpbmVQb3MgKyBpbnNlcnRpb25zO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbnNlcnRUZXh0KGRTZWwsIHNwYWNlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0aW9ucyArPSBvcHRpb25zLnRhYlNpemU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRMaW5lUG9zID0gbGluZVBvcyArIHNwbGl0W2xpbmVdLmxlbmd0aCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZW5kUG9zIDw9IG5leHRMaW5lUG9zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGFyZSBkb25lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGluZVBvcyA9IG5leHRMaW5lUG9zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGRTZWwuc2VsZWN0aW9uU3RhcnQgPSBzdGFydFBvcyArIG9wdGlvbnMudGFiU2l6ZTtcclxuICAgICAgICAgICAgICAgIGRTZWwuc2VsZWN0aW9uRW5kID0gZW5kUG9zICsgaW5zZXJ0aW9ucztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkU2VsLnZhbHVlICs9IFwiIFwiO1xyXG4gICAgICAgICAgICBkU2VsLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBIYW5kbGUgdGhlIFNoaWZ0LVRBQiBjb21iaW5hdGlvbiAodW50YWJiaW5nKVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB1blRhYigpIHtcclxuICAgICAgICAvLyBTZWxlY3Rpb24gRE9NIG9iamVjdFxyXG4gICAgICAgIGNvbnN0IGRTZWwgPSB0YTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0UG9zID0gZFNlbC5zZWxlY3Rpb25TdGFydDtcclxuICAgICAgICB2YXIgZW5kUG9zID0gZFNlbC5zZWxlY3Rpb25FbmQ7XHJcblxyXG4gICAgICAgIC8vIFVudGFiYmluZyBhIHNlbGVjdGlvblxyXG4gICAgICAgIHZhciB2YWwgPSBkU2VsLnZhbHVlO1xyXG4gICAgICAgIHZhciBzcGxpdCA9IHZhbC5zcGxpdChcIlxcblwiKTtcclxuICAgICAgICB2YXIgbGluZVBvcyA9IDA7XHJcblxyXG4gICAgICAgIC8vIEZpbmQgdGhlIGxpbmUgdGhlIHNlbGVjdGlvbiBzdGFydHMgb25cclxuICAgICAgICBmb3IodmFyIGxpbmU9MDsgbGluZSA8IHNwbGl0Lmxlbmd0aDsgbGluZSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXh0TGluZVBvcyA9IGxpbmVQb3MgKyBzcGxpdFtsaW5lXS5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICBpZihzdGFydFBvcyA+PSBsaW5lUG9zICYmIHN0YXJ0UG9zIDwgbmV4dExpbmVQb3MpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxpbmVQb3MgPSBuZXh0TGluZVBvcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBkZWxldGlvbnMgPSAwO1xyXG4gICAgICAgIHZhciBmaXJzdExpbmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBVbmRlbnQgdW50aWwgd2UgYXJlIGRvbmVcclxuICAgICAgICBmb3IoIDsgbGluZSA8IHNwbGl0Lmxlbmd0aDsgIGxpbmUrKykge1xyXG4gICAgICAgICAgICBmb3IodmFyIHNwYWNlcz0wOyAgc3BhY2VzIDwgb3B0aW9ucy50YWJTaXplICYmIHNwYWNlczxzcGxpdFtsaW5lXS5sZW5ndGg7IHNwYWNlcysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihzcGxpdFtsaW5lXVtzcGFjZXNdICE9ICcgJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihzcGFjZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBkU2VsLnNlbGVjdGlvblN0YXJ0ID0gbGluZVBvcyAtIGRlbGV0aW9ucztcclxuICAgICAgICAgICAgICAgIGRTZWwuc2VsZWN0aW9uRW5kID0gbGluZVBvcyAtIGRlbGV0aW9ucyArIHNwYWNlcztcclxuICAgICAgICAgICAgICAgIGRlbGV0ZVRleHQoZFNlbCk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGlvbnMgKz0gc3BhY2VzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihmaXJzdExpbmUpIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0UG9zIC09IHNwYWNlcztcclxuICAgICAgICAgICAgICAgIGlmKHN0YXJ0UG9zIDwgbGluZVBvcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9zID0gbGluZVBvcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZpcnN0TGluZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBuZXh0TGluZVBvcyA9IGxpbmVQb3MgKyBzcGxpdFtsaW5lXS5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICBpZihlbmRQb3MgPD0gbmV4dExpbmVQb3MpIHtcclxuICAgICAgICAgICAgICAgIC8vIFdlIGFyZSBkb25lXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGluZVBvcyA9IG5leHRMaW5lUG9zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZFNlbC5zZWxlY3Rpb25TdGFydCA9IHN0YXJ0UG9zO1xyXG4gICAgICAgIGRTZWwuc2VsZWN0aW9uRW5kID0gZW5kUG9zIC0gZGVsZXRpb25zO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICogSW5zZXJ0IGEgcmV0dXJuIGNoYXJhY3RlciBhbmQgZW5vdWdoIHNwYWNlcyB0byBpbmRlbnRcclxuICAgICAqIHRoZSB0ZXh0IHNvIGFzIHRvIG1hdGNoIHRoZSBwcmV2aW91cyBsaW5lLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZXR1cm5XaXRoSW5kZW50KCkge1xyXG4gICAgICAgIC8vIFNlbGVjdGlvbiBET00gb2JqZWN0XHJcbiAgICAgICAgY29uc3QgZFNlbCA9IHRhO1xyXG5cclxuICAgICAgICAvLyBIb3cgbWFueSBzcGFjZXMgd2lsbCBiZSBwdXQgYmVmb3JlIHRoZSBmaXJzdCBub24tc3BhY2U/XHJcbiAgICAgICAgdmFyIHNwYWNlID0gMDtcclxuXHJcbiAgICAgICAgaWYgKGRTZWwuc2VsZWN0aW9uU3RhcnQgfHwgZFNlbC5zZWxlY3Rpb25TdGFydCA9PSAnMCcpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0UG9zID0gZFNlbC5zZWxlY3Rpb25TdGFydDtcclxuICAgICAgICAgICAgdmFyIGVuZFBvcyA9IGRTZWwuc2VsZWN0aW9uRW5kO1xyXG4gICAgICAgICAgICB2YXIgc2Nyb2xsVG9wID0gZFNlbC5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgIHZhciBiZWZvcmUgPSBkU2VsLnZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcyk7XHJcbiAgICAgICAgICAgIHZhciBhZnRlciA9IGRTZWwudmFsdWUuc3Vic3RyaW5nKGVuZFBvcyxkU2VsLnZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHZhciBzcGxpdCA9IGJlZm9yZS5zcGxpdChcIlxcblwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFdoYXQgaXMgdGhlIGxhc3QgbGluZSBiZWZvcmUgdGhlIGNhcmV0P1xyXG4gICAgICAgICAgICB2YXIgbGFzdCA9IHNwbGl0W3NwbGl0Lmxlbmd0aC0xXTtcclxuXHJcbiAgICAgICAgICAgIGZvcih2YXIgaT0wOyBpPGxhc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKGxhc3QuY2hhckF0KGkpICE9ICcgJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNwYWNlKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgcmV0dXJuXHJcbiAgICAgICAgICAgIHZhciBteVZhbHVlID0gXCJcXG5cIjtcclxuICAgICAgICAgICAgZm9yKGk9MDsgaTxzcGFjZTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBteVZhbHVlICs9ICcgJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5zZXJ0VGV4dChkU2VsLCBteVZhbHVlKTtcclxuICAgICAgICAgICAgZFNlbC5zZWxlY3Rpb25TdGFydCA9IHN0YXJ0UG9zICsgbXlWYWx1ZS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGRTZWwuc2VsZWN0aW9uRW5kID0gc3RhcnRQb3MgKyBteVZhbHVlLmxlbmd0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkU2VsLnZhbHVlICs9IFwiXFxuXCI7XHJcbiAgICAgICAgICAgIGRTZWwuZm9jdXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzcGFjZSA+IDA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZW1vdmUgdGhlIGxhc3QgdGFiU2l6ZSBzcGFjZXMgYXQgdGhlIGN1cnJlbnQgbG9jYXRpb25cclxuICAgICAqIEByZXR1cm4gdHJ1ZSBpZiB3YXMgdW4tZGVudGVkXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHVuRGVudCgpIHtcclxuICAgICAgICAvLyBTZWxlY3Rpb24gRE9NIG9iamVjdFxyXG4gICAgICAgIGNvbnN0IGRTZWwgPSB0YTtcclxuXHJcblxyXG4gICAgICAgIGlmIChkU2VsLnNlbGVjdGlvblN0YXJ0IHx8IGRTZWwuc2VsZWN0aW9uU3RhcnQgPT0gJzAnKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGFydFBvcyA9IGRTZWwuc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICAgICAgICAgIHZhciBlbmRQb3MgPSBkU2VsLnNlbGVjdGlvbkVuZDtcclxuICAgICAgICAgICAgdmFyIHNjcm9sbFRvcCA9IGRTZWwuc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICB2YXIgYmVmb3JlID0gZFNlbC52YWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpO1xyXG4gICAgICAgICAgICB2YXIgc3BhY2VTdHIgPSAnJztcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8b3B0aW9ucy50YWJTaXplOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHNwYWNlU3RyICs9ICcgJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihiZWZvcmUubGVuZ3RoID49IG9wdGlvbnMudGFiU2l6ZSAmJlxyXG4gICAgICAgICAgICAgICAgYmVmb3JlLnN1YnN0cihiZWZvcmUubGVuZ3RoLW9wdGlvbnMudGFiU2l6ZSwgb3B0aW9ucy50YWJTaXplKSA9PT0gc3BhY2VTdHIpIHtcclxuICAgICAgICAgICAgICAgIGRTZWwuc2VsZWN0aW9uU3RhcnQgPSBiZWZvcmUubGVuZ3RoIC0gb3B0aW9ucy50YWJTaXplO1xyXG4gICAgICAgICAgICAgICAgZFNlbC5zZWxlY3Rpb25FbmQgPSBiZWZvcmUubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZVRleHQoZFNlbCk7XHJcbiAgICAgICAgICAgICAgICBkU2VsLnNlbGVjdGlvblN0YXJ0ID0gYmVmb3JlLmxlbmd0aCAtIG9wdGlvbnMudGFiU2l6ZTtcclxuICAgICAgICAgICAgICAgIGRTZWwuc2VsZWN0aW9uRW5kID0gZFNlbC5zZWxlY3Rpb25TdGFydDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogSW5zZXJ0IHRleHQgaW4gYSB0ZXh0YXJlYSBhdCB0aGUgY3VycmVudCBzZWxlY3Rpb24uXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBpcyBwcm92aWRlZCB0byBhbGxvdyBmb3IgZmFsbGJhY2sgdG8gYSBub24tdW5kb2FibGUgdmVyc2lvblxyXG4gICAgICogZm9yIEludGVybmV0IGV4cGxvcmVyIGFuZCBGaXJlZm94LlxyXG4gICAgICogQHBhcmFtIHRleHRhcmVhIFRleHRhcmVhIHdlIGFyZSBtb2RpZnlpbmdcclxuICAgICAqIEBwYXJhbSB0ZXh0IFRleHQgdG8gaW5zZXJ0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGluc2VydFRleHQodGV4dGFyZWEsIHRleHQpIHtcclxuICAgICAgICBpZihpbnNlcnRUZXh0U3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgIGlmKCFkb2N1bWVudC5leGVjQ29tbWFuZChcImluc2VydFRleHRcIiwgZmFsc2UsIHRleHQpKSB7XHJcbiAgICAgICAgICAgICAgICBpbnNlcnRUZXh0U3VwcG9ydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpbnNlcnRUZXh0KHRleHRhcmVhLCB0ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEJhY2t1cCB2ZXJzaW9uIGZvciBJbnRlcm5ldCBFeHBsb3JlciAxMVxyXG4gICAgICAgICAgICBjb25zdCBwb3MgPSB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gdGV4dGFyZWEuc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRleHRhcmVhLnZhbHVlO1xyXG4gICAgICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IHZhbHVlLnN1YnN0cmluZygwLCBwb3MpICsgdGV4dCArIHZhbHVlLnN1YnN0cmluZyhwb3MpO1xyXG4gICAgICAgICAgICB0ZXh0YXJlYS5mb2N1cygpO1xyXG4gICAgICAgICAgICB0ZXh0YXJlYS5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBEZWxldGUgdGV4dCBpbiBhIHRleHRhcmVhIGF0IHRoZSBjdXJyZW50IHNlbGVjdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIGlzIHByb3ZpZGVkIHRvIGFsbG93IGZvciBmYWxsYmFjayB0byBhIG5vbi11bmRvYWJsZSB2ZXJzaW9uXHJcbiAgICAgKiBmb3IgSW50ZXJuZXQgZXhwbG9yZXIgYW5kIEZpcmVmb3guXHJcbiAgICAgKiBAcGFyYW0gdGV4dGFyZWFcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZGVsZXRlVGV4dCh0ZXh0YXJlYSkge1xyXG4gICAgICAgIGlmKGRlbGV0ZVN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICBpZighZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJkZWxldGVcIikpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZVN1cHBvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlVGV4dCh0ZXh0YXJlYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBCYWNrdXAgdmVyc2lvbiBmb3IgSW50ZXJuZXQgRXhwbG9yZXIgMTFcclxuICAgICAgICAgICAgLy8gYW5kIEZpcmVmb3hcclxuICAgICAgICAgICAgY29uc3Qgc3RhcnRQb3MgPSB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcclxuICAgICAgICAgICAgY29uc3QgZW5kUG9zID0gdGV4dGFyZWEuc2VsZWN0aW9uRW5kO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSB0ZXh0YXJlYS5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGV4dGFyZWEudmFsdWU7XHJcbiAgICAgICAgICAgIHRleHRhcmVhLnZhbHVlID0gdmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKSArIHZhbHVlLnN1YnN0cmluZyhlbmRQb3MpO1xyXG4gICAgICAgICAgICB0ZXh0YXJlYS5mb2N1cygpO1xyXG4gICAgICAgICAgICB0ZXh0YXJlYS5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIi8qXHJcbiAqIFZhcmlvdXMgaW50ZXJmYWNlIG9wdGlvbnMgd2UgY2FuIHNlbGVjdFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBFZGl0b3IgaW50ZXJmYWNlIG9wdGlvbnMuXHJcbiAqXHJcbiAqIFRoaXMgaXMgdXNlZCBieSBFZGl0b3IgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgdGhlIGVkaXRvciBvcHRpb25zLlxyXG4gKlxyXG4gKiBAcGFyYW0gb3B0aW9ucyBVc2VyIHByb3ZpZGVkIG9wdGlvbnMgdGhhdCBvdmVycmlkZSB0aGUgZGVmYXVsdCB2YWx1ZXMuXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGxldCBFZGl0b3JPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgPyBvcHRpb25zIDoge307XHJcblxyXG4gICAgLy8vIE9wdGlvbnM6IHZlcnRpY2FsLCBob3Jpem9udGFsLCBib3RoXHJcbiAgICB0aGlzLnJlc2l6ZSA9ICd2ZXJ0aWNhbCc7XHJcblxyXG4gICAgLy8vIFRoZSByZXNpemluZyBoYW5kbGVcclxuICAgIHRoaXMuaGFuZGxlID0gJ2Jhcic7XHJcblxyXG4gICAgLy8vIFJhbmdlIGZvciBncmFiYmluZ1xyXG4gICAgdGhpcy5ncmFiU2l6ZSA9IDEwO1xyXG5cclxuICAgIC8vLyBJcyB0aGlzIGZvciBzb3VyY2UgY29kZT9cclxuICAgIHRoaXMuY29kZSA9IGZhbHNlO1xyXG5cclxuICAgIC8vLyBJbml0aWFsIHRleHRhcmVhIHZhbHVlXHJcbiAgICB0aGlzLnZhbHVlID0gJyc7XHJcblxyXG4gICAgLy8vIEhlaWdodCB2YWx1ZSB0byB1c2VcclxuICAgIHRoaXMuaGVpZ2h0ID0gbnVsbDtcclxuXHJcbiAgICAvLy8gTmFtZSBmb3IgdGhlIGNvbnRyb2xcclxuICAgIHRoaXMubmFtZSA9IG51bGw7XHJcblxyXG4gICAgLy8vIFVzZSBoYW5kbGUgdGhlIHRhYiBrZXk/XHJcbiAgICB0aGlzLnRhYiA9IGZhbHNlO1xyXG5cclxuICAgIC8vLyBBdXRvbWF0aWNhbGx5IGluZGVudCBjb2RlP1xyXG4gICAgdGhpcy5hdXRvSW5kZW50ID0gZmFsc2U7XHJcblxyXG4gICAgLy8vIE1pbmltdW0gaGVpZ2h0IHRvIHNldFxyXG4gICAgdGhpcy5taW5IZWlnaHQgPSBudWxsO1xyXG5cclxuICAgIC8vLyBTcGVsbGNoZWNrIHRoZSB0ZXh0YXJlYT9cclxuICAgIHRoaXMuc3BlbGxjaGVjayA9IGZhbHNlO1xyXG5cclxuICAgIC8vLyBTaXplIG9mIGEgdGFiIHN0b3AgaW4gY2hhcmFjdGVycy5cclxuICAgIHRoaXMudGFiU2l6ZSA9IDQ7XHJcblxyXG4gICAgLy8vIENsYXNzZXMgdG8gYWRkIHRvIHRoZSB0ZXh0YXJlYVxyXG4gICAgdGhpcy5jbGFzc2VzID0gW107XHJcblxyXG4gICAgZm9yKHZhciBwcm9wZXJ0eSBpbiBvcHRpb25zKSB7XHJcbiAgICAgICAgaWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcclxuICAgICAgICAgICAgaWYoIXRoaXMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIG9wdGlvbiBcIiArIHByb3BlcnR5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzW3Byb3BlcnR5XSA9IG9wdGlvbnNbcHJvcGVydHldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG4iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi9fZWRpdG9yLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIGFkZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKS5kZWZhdWx0XG52YXIgdXBkYXRlID0gYWRkKFwiMzM1OTdhOWFcIiwgY29udGVudCwgZmFsc2UsIHt9KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/c291cmNlTWFwIS4vX2VkaXRvci5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/c291cmNlTWFwIS4vX2VkaXRvci5zY3NzXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCIvKipcclxuICogQmFzaWMgVnVlLWJhc2VkIHNpdGUgaW5saW5lIGNvbnRlbnQgc3RhcnRlclxyXG4gKiBAY29uc3RydWN0b3IgSW5saW5lVnVlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgSW5saW5lVnVlID0gZnVuY3Rpb24oKSB7XHJcbn1cclxuXHJcbi8qXHJcbiAqXHJcbiAqIEhvdyB0byB1c2U6XHJcblxyXG4gKiBzaXRlLnJlYWR5KCgpID0+IHtcclxuICogICAgSW5saW5lVnVlLmNyZWF0ZSgnZGl2LmNsLXJldmlld3MnLCBSZXZpZXdzVnVlKTtcclxuICogfSk7XHJcbiAqXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBpbmxpbmUgVlVFIGNvbXBvbmVudCwgcmVwbGFjaW5nIHRoZSBwcm92aWRlZFxyXG4gKiBzZWxlY3Rvci4gVGhlIHNlbGVjdG9yIGlzIGFzc3VtZWQgdG8gY29udGFpbiBKU09OIGRhdGEgdGhhdCBpc1xyXG4gKiB0aGVuIHByb3ZpZGVkIHRvIHRoZSBjb21wb25lbnQgaW4gdGhlIGpzb24gcHJvcGVydHkuXHJcbiAqXHJcbiAqIEBwYXJhbSBzZWwgU2VsZWN0b3IgZm9yIGEgZGl2IHRvIHJlcGxhY2Ugd2l0aCB0aGUgdmlldy5cclxuICogQHBhcmFtIGNvbXBvbmVudCBDb21wb25lbnQgdG8gZGlzcGxheSAoVnVlKVxyXG4gKi9cclxuSW5saW5lVnVlLmNyZWF0ZSA9IGZ1bmN0aW9uKHNlbCwgY29tcG9uZW50KSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWwpO1xyXG4gICAgaWYoZWxlbWVudCA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGVtcGxhdGUgPSBgPGRpdj5cclxuPHBhZ2UtdnVlIDpqc29uPVwianNvblwiPjwvcGFnZS12dWU+XHJcbjwvZGl2PmA7XHJcblxyXG4gICAgY29uc3QganNvbiA9IEpTT04ucGFyc2UoZWxlbWVudC50ZXh0Q29udGVudCk7XHJcblxyXG4gICAgY29uc3Qgc3RvcmUgPSBTaXRlLnN0b3JlO1xyXG5cclxuICAgIGNvbnN0IGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgICAgICdwYWdlLXZ1ZSc6IGNvbXBvbmVudFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgbmV3IFNpdGUuVnVlKHtcclxuICAgICAgICBlbDogZWxlbWVudCxcclxuICAgICAgICBzdG9yZSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGpzb246IGpzb25cclxuICAgICAgICB9LFxyXG4gICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcclxuICAgICAgICBjb21wb25lbnRzOiBjb21wb25lbnRzLFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9NYXNrLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03OGQwNGUwMCZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9NYXNrLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vTWFzay52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXGNoYXJsXFxcXERvY3VtZW50c1xcXFxDbGFzc2VzXFxcXENTRTMyMFxcXFx3ZWJcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzc4ZDA0ZTAwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzc4ZDA0ZTAwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9NYXNrLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03OGQwNGUwMCZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc3OGQwNGUwMCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwidmVuZG9yL2NsL3NpdGUvanMvVnVlL01hc2sudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTWFzay52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL01hc2sudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL01hc2sudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTc4ZDA0ZTAwJlwiIiwiLyoqXHJcbiAqIEJhc2ljIFZ1ZS1iYXNlZCBzaXRlIHBhZ2Ugc3RhcnRlclxyXG4gKlxyXG4gKiBIb3cgdG8gdXNlOlxyXG4gKiBAY29kZVxyXG4gKiBzaXRlLnJlYWR5KCgpID0+IHtcclxuICogICAgUGFnZVZ1ZS5jcmVhdGUoJ2Rpdi5jbC1ncmFkZS1hc3NpZ25tZW50JywgJ0Fzc2lnbm1lbnQgR3JhZGUnLCBHcmFkZUFzc2lnbm1lbnRWdWUpO1xyXG4gKiAgICBQYWdlVnVlLmNyZWF0ZSgnZGl2LmNsLWdyYWRlcycsICdHcmFkZXMnLCBHcmFkZXNWdWUpO1xyXG4gKiB9KTtcclxuICogQGVuZGNvZGVcclxuICpcclxuICogQGNvbnN0cnVjdG9yIFBhZ2VWdWVcclxuICovXHJcbmV4cG9ydCBjb25zdCBQYWdlVnVlID0gZnVuY3Rpb24oKSB7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBwYWdlIGluIGEgZ2l2ZW4gY29tcG9uZW50LCByZXBsYWNpbmcgdGhlIHByb3ZpZGVkXHJcbiAqIHNlbGVjdG9yLiBUaGUgc2VsZWN0b3IgaXMgYXNzdW1lZCB0byBjb250YWluIEpTT04gZGF0YSB0aGF0IGlzXHJcbiAqIHRoZW4gcHJvdmlkZWQgdG8gdGhlIGNvbXBvbmVudCBpbiB0aGUganNvbiBwcm9wZXJ0eS5cclxuICpcclxuICogQHBhcmFtIHNlbCBTZWxlY3RvciBmb3IgYSBkaXYgdG8gcmVwbGFjZSB3aXRoIHRoZSB2aWV3LlxyXG4gKiBAcGFyYW0gdGl0bGUgSW5pdGlhbCB0aXRsZSB0byBhcHBseSB0byB0aGUgcGFnZVxyXG4gKiBAcGFyYW0gY29tcG9uZW50IENvbXBvbmVudCB0byBkaXNwbGF5IChWdWUpXHJcbiAqIEBwYXJhbSBuYXYgT3B0aW9uYWwgbmF2aWdhdGlvbiBjb21wb25lbnQsIGxpa2UgUGFnZU5hdlxyXG4gKi9cclxuUGFnZVZ1ZS5jcmVhdGUgPSBmdW5jdGlvbihzZWwsIHRpdGxlLCBjb21wb25lbnQsIG5hdikge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsKTtcclxuICAgIGlmKGVsZW1lbnQgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG5hdnRhZyA9IG5hdiAhPT0gdW5kZWZpbmVkID8gJzxwYWdlLW5hdiA6bWVudT1cIm1lbnVcIj48L3BhZ2UtbmF2PicgOiAnJztcclxuICAgIGxldCB0ZW1wbGF0ZSA9IGA8ZGl2PjxzaXRlLWhlYWRlciA6dGl0bGU9XCJ0aXRsZVwiPiR7bmF2dGFnfTwvc2l0ZS1oZWFkZXI+XHJcbjxwYWdlLXZ1ZSA6anNvbj1cImpzb25cIj48L3BhZ2UtdnVlPjxzaXRlLWZvb3Rlcj48L3NpdGUtZm9vdGVyPlxyXG48L2Rpdj5gO1xyXG5cclxuICAgIGNvbnN0IEhlYWRlciA9IFNpdGUuaW5mby5oZWFkZXIuY29tcG9uZW50KCk7XHJcbiAgICBjb25zdCBGb290ZXIgPSBTaXRlLmluZm8uZm9vdGVyLmNvbXBvbmVudCgpO1xyXG5cclxuICAgIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKGVsZW1lbnQudGV4dENvbnRlbnQpO1xyXG5cclxuICAgIGNvbnN0IHN0b3JlID0gU2l0ZS5zdG9yZTtcclxuXHJcbiAgICBjb25zdCBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICAgICAnc2l0ZS1oZWFkZXInOiBIZWFkZXIsXHJcbiAgICAgICAgICAgICdzaXRlLWZvb3Rlcic6IEZvb3RlcixcclxuICAgICAgICAgICAgJ3BhZ2UtdnVlJzogY29tcG9uZW50XHJcbiAgICAgICAgfTtcclxuICAgIGlmKG5hdiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29tcG9uZW50c1sncGFnZS1uYXYnXSA9IG5hdjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2l0ZSA9IFNpdGUuU2l0ZTtcclxuXHJcbiAgICBuZXcgU2l0ZS5WdWUoe1xyXG4gICAgICAgIGVsOiBlbGVtZW50LFxyXG4gICAgICAgIHNpdGUsXHJcbiAgICAgICAgc3RvcmUsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgIGpzb246IGpzb24sXHJcbiAgICAgICAgICAgIG1lbnU6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXHJcbiAgICAgICAgY29tcG9uZW50czogY29tcG9uZW50cyxcclxuICAgICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBTZXQgdGhlIHNpdGUgdGl0bGUuIFRoaXMgY2FuIGJlIHVzZWQgZnJvbVxyXG4gICAgICAgICAgICAgKiB0aGUgY2hpbGQgVnVlJ3MgdXNpbmcgdGhpcy4kcGFyZW50LnNldFRpdGxlKCcnKVxyXG4gICAgICAgICAgICAgKiBAbWVtYmVyb2YgUGFnZVZ1ZVxyXG4gICAgICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlIFRpdGxlIHRvIHNldFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc2V0VGl0bGU6IGZ1bmN0aW9uKHRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9IFNpdGUuaW5mby5zaXRlTmFtZSArICcgJyArIHRpdGxlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRNZW51OiBmdW5jdGlvbihtZW51KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnUgPSBtZW51O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRNZW51OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1lbnU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59IiwidmFyIHJlbmRlciwgc3RhdGljUmVuZGVyRm5zXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1BhZ2VWdWVCYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUGFnZVZ1ZUJhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxjaGFybFxcXFxEb2N1bWVudHNcXFxcQ2xhc3Nlc1xcXFxDU0UzMjBcXFxcd2ViXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcxMmJiYWVmOCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcxMmJiYWVmOCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJ2ZW5kb3IvY2wvc2l0ZS9qcy9WdWUvUGFnZVZ1ZUJhc2UudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUGFnZVZ1ZUJhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9QYWdlVnVlQmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQzYjI2YmNiJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQzYjI2YmNiJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiNDNiMjZiY2JcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxjaGFybFxcXFxEb2N1bWVudHNcXFxcQ2xhc3Nlc1xcXFxDU0UzMjBcXFxcd2ViXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc0M2IyNmJjYicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc0M2IyNmJjYicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDNiMjZiY2Imc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNDNiMjZiY2InLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDNiMjZiY2ImbGFuZz1zY3NzJnNjb3BlZD10cnVlJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDNiMjZiY2ImbGFuZz1zY3NzJnNjb3BlZD10cnVlJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQzYjI2YmNiJnNjb3BlZD10cnVlJlwiIiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIEEgbWVtYmVyc2hpcCBhc3NvY2lhdGVkIHdpdGggYSB1c2VyLlxyXG4gKlxyXG4gKiBUaGlzIGlzIGEgYmFzZSBvYmplY3QgdGhhdCB3aWxsIGJlIGluaGVyaXRlZCBieVxyXG4gKiBhY3R1YWwgbWVtYmVyc2hpcCBvYmplY3RzLlxyXG4gKi9cclxuXHJcbnZhciBNZW1iZXJzaGlwID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8vIFRoZSBVc2VyIG9iamVjdCBmb3IgdGhpcyBtZW1iZXJzaGlwXHJcbiAgICB0aGlzLnVzZXIgPSBudWxsO1xyXG59XHJcblxyXG5leHBvcnQge01lbWJlcnNoaXB9O1xyXG4iLCJ2YXIgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnNcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vVXNlclZ1ZUJhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Vc2VyVnVlQmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXGNoYXJsXFxcXERvY3VtZW50c1xcXFxDbGFzc2VzXFxcXENTRTMyMFxcXFx3ZWJcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJ2M3ZTRlNDllJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJ2M3ZTRlNDllJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIFxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZlbmRvci9jbC91c2Vycy9qcy9WdWUvVXNlclZ1ZUJhc2UudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVXNlclZ1ZUJhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Vc2VyVnVlQmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiXSwic291cmNlUm9vdCI6IiJ9