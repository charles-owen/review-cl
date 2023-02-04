<template>
  <div class="content">
    <div class="full cl-reviewing">
      <membersfetcher :fetching="reviewers === null">
        <template v-slot="fetcher">
          <div v-if="user.atLeast(instructor)">
            <div style="display: flex; justify-content: center;">
              <form method="post" @submit.prevent="assignReviews">
                <p class="center"><button type="submit">Assign Reviews</button>
                  <select v-model="reviewerCnt">
                    <option v-for="num in 6" :value="num">{{num}}</option>
                  </select>
                </p>
              </form>
              <form method="post" @submit.prevent="sendReminderDialog()">
                <div style=margin-left:10px>
                  <p class="center"><button type="submit">Send Reminder</button>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <table class="small">
            <tr>
              <th>Name</th>
              <th>User ID</th>
              <th v-for="i in maxReviewees">reviewee</th>
              <th v-for="i in maxReviewers">reviewer</th>
            </tr>
            <tr v-for="user in fetcher.users">
              <td class="small">
                <router-link :title="user.name" :to="root + '/cl/console/grading/' + assigntag + '/' + user.member.id">
                  {{user.name}}
                </router-link>
              </td>
              <td>
                <router-link :title="user.name" :to="root + '/cl/console/grading/' + assigntag + '/' + user.member.id">
                  {{user.userId}}
                </router-link>
              </td>
              <td v-for="i in maxReviewees" :class="cls(reviewers[user.member.id], i-1)">
                <status-present :assigntag="assigntag" :status-user="displayUser(fetcher.users, reviewers[user.member.id], i-1)" :count="reviewers[user.member.id] !== undefined ? reviewers[user.member.id][i-1][1] : 0"></status-present>
              </td>
              <td v-for="i in maxReviewers" :class="cls(reviewees[user.member.id], i-1)">
                <status-present :assigntag="assigntag" :status-user="displayUser(fetcher.users, reviewees[user.member.id], i-1)" :count="reviewees[user.member.id] !== undefined ? reviewees[user.member.id][i-1][1] : 0"></status-present>
            </td>
            </tr>
          </table>
        </template>
      </membersfetcher>
    </div>
  </div>
</template>

<script>
import {ConsoleComponentBase} from 'console-cl/index'
import {MembersFetcherComponent} from 'course-cl/js/Console/index'
import StatusPresentVue from './StatusPresent.vue';

/**
 * View for Review assignments. Indicates the assignments of students to review
 * other students and the number of reviews that have been done. Also supports
 * creating new review assignments.
 *
 * /cl/console/review/reviewers/:assignment
 *
 * @constructor ReviewReviewers
 */
export default {
  // This is a standard console comoponent
  'extends': ConsoleComponentBase,
  props: [
      'assigntag'     // The assignment the reviewing is for
  ],
  data: function () {
    return {
      assignment: null, // Object that defines an entire assignment
      reviewerCnt: 2,   // Number of reviewers to assign for each student
      instructor: Site.Member.INSTRUCTOR,
      reviewers: null,  // All of the reviews by member ID
      reviewees: null,  // All of the reviewee by member ID
      maxReviewees: 0,  // Maximum number of reviewees for any reviewer
      maxReviewers: 0   // Maximum number of reviewers for any reviewee
    }
  },
  components: {
    'membersfetcher': MembersFetcherComponent,
    'status-present': StatusPresentVue
  },
  mounted() {
    // Get the member object for the site user
    const member = this.$store.state.user.user.member;

    // Get the course section and the assignmment we are reviewing (so we know the name)
    this.section = this.$store.getters['course/section'](member.semester, member.section);
    this.assignment = this.section.getAssignment(this.assigntag);

    // Set the console page title
    this.setTitle(': ' + this.assignment.shortname + ' Reviewing');

    // Ask the server for the review assignments (if any)
    this.$site.api.get('/api/review/reviewers/' + this.assigntag, {})
        .then((response) => {
          if (!response.hasError()) {
            this.take(response);
          } else {
            this.$site.toast(this, response);
          }

        })
        .catch((error) => {
          this.$site.toast(this, error);
        });

  },
  methods: {
    /**
     * Assign new reviewers. This uses a message box to ensure we
     * really want to do this!
     */
    assignReviews() {
      if (this.maxReviewees > 0 || this.maxReviewers > 0) {
        new this.$site.Dialog.MessageBox('Are you sure?', 'Are you sure you want to assign reviewers? This will replace the existing reviewing assignments.',
            this.$site.Dialog.MessageBox.OKCANCEL, () => {
              this.assignReviewsActual();
            });
      } else {
        this.assignReviewsActual();
      }
    },
    /**
     * Actually tell the server to assign reviewers
     */
    assignReviewsActual() {
      this.reviewers = null;
      this.reviewees = null;
      this.maxReviewees = 0;
      this.maxReviewers = 0;

      let params = {
        cnt: this.reviewerCnt
      }
      this.$site.api.post('/api/review/reviewers/' + this.assigntag, params)
          .then((response) => {
            if (!response.hasError()) {
              this.take(response);
            } else {
              this.$site.toast(this, response);
            }

          })
          .catch((error) => {
            this.$site.toast(this, error);
          });

    },
    /**
     * Take a new supplied server response.
     * @param response Response with all reviewers in it.
     */
    take(response) {
      const data = response.getData('reviewers').attributes

      // For each reviewer and reviewee that we find, we
      // create an array of reviewee and reviewer
      this.reviewers = {}
      this.reviewees = {}

      // This is to keep track of the maximum number of reviewers
      // and reviewees for any member we have so we can create the
      // right number of columns in the results table.
      this.maxReviewees = 0
      this.maxReviewers = 0

      for (let assign of data) {
        const reviewer = +assign[0];
        const reviewee = +assign[1];
        const cnt = +assign[2];

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

    },
    /**
     * Display a user based on the reviewer or reviewee assignments for a user.
     * @param users Collection of all users as fetched from the server
     * @param assign The list is reviewers or reviewees
     * @param i Index into assign for the one we want to display
     * @returns {*|null} User if it exists.
     */
    displayUser(users, assign, i) {
      if (assign === undefined || i >= assign.length) {
        return null;
      }

      for (let user of users) {
        if (user.member.id === assign[i][0]) {
          return user;
        }
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
    cls(assign, i) {
      if (assign === undefined || i >= assign.length) {
        return '';
      }

      return assign[i][1] < 1 ? 'cl-empty' : '';

    },
    /**
     * Uses a message box to edit and send reminder emails to
     * individual students or the entire class.
     */
    sendReminderDialog() {
      let content = '<div>' + "To" + ':\t<select>' +
          '<option>Class</option>' +
          '<option>Students with reviews pending</option>' +
          '</select>\t' + '<br>' + '<br>' +
          '<div>Subject:\n</div>' +
          '<div><textarea style="resize:none" rows="1" cols="38">CSE335 Peer Review Pending</textarea></div>' +
          '<div> <textarea style="resize:none" placeholder="Enter reminder email" rows="6" cols="38">You have a review pending in the peer review system.\n' +
          '\n' + 'Please go to the Peer Reviewing Status Page to see what reviews are pending.</textarea></div>';

      let buttons = [{contents: "Send"}];
      let dialogOptions = {title: "Send Reminder",
                          content: content,
                          buttons: buttons,
                          form: true
      };
      new this.$site.Dialog(dialogOptions);
    }
  }
}
</script>
