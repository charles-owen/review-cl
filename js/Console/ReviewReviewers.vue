<template>
  <div class="content">
    <div class="full cl-reviewing">
      <membersfetcher :fetching="reviewers === null">
        <template v-slot="fetcher">
          <div v-if="user.atLeast(instructor)">
            <form method="post" @submit.prevent="assignReviews">
              <p class="center"><button type="submit">Assign Reviews</button>
                <select v-model="reviewerCnt">
                  <option v-for="num in 6" :value="num">{{num}}</option>
                </select>
              </p>
            </form>
          </div>

          <table class="small">
            <tr>
              <th>Name</th>
              <th>User ID</th>
              <th v-for="i in maxReviewees">reviewee</th>
              <th v-for="i in maxReviewers">reviewer</th>
              <th>Email</th>
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
              <td v-for="i in maxReviewees" :class="cls(reviewers[user.member.id], i-1)" align="center">
                <a v-if="!displayUser(fetcher.users, reviewers[user.member.id], i-1)" @click.default="reassignDialog(user.name, 'Reviewee')" onmouseover="this.style.opacity=.5" onmouseout="this.style.opacity=1">
                  <img src="../../../site/img/add-circle.png">
                </a>
                <status-present :assigntag="assigntag" :status-user="displayUser(fetcher.users, reviewers[user.member.id], i-1)" :count="reviewers[user.member.id] !== undefined ? reviewers[user.member.id][i-1][1] : 0"></status-present>
              </td>
              <td v-for="i in maxReviewers" :class="cls(reviewees[user.member.id], i-1)" align="center">
                <a v-if="!displayUser(fetcher.users, reviewees[user.member.id], i-1)" @click.default="reassignDialog(user.name, 'Reviewer')" onmouseover="this.style.opacity=.5" onmouseout="this.style.opacity=1">
                  <img src="../../../site/img/add-circle.png">
                </a>
                <status-present :assigntag="assigntag" :status-user="displayUser(fetcher.users, reviewees[user.member.id], i-1)" :count="reviewees[user.member.id] !== undefined ? reviewees[user.member.id][i-1][1] : 0"></status-present>
              </td>
              <td align = "center">
                <a  @click.default="individualReminder(user.name, user.email)" onmouseover="this.style.opacity=.5" onmouseout="this.style.opacity=1">
                  <img src = ../../../site/img/send.png>
                </a>
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
    reassignDialog(name, type) {
      let contentString = '<p>Student: ' + name + '</p>' +
          '<div>' + type + ':\t<select>' +
          '<option>Doe, John</option>' +
          '<option>Roe, Jane</option>' +
          '</select>\t' +
          '<button>Reassign</button></div>' +
          '<br>' +
          '<div>Send Reminder:    <textarea style="resize:none" placeholder="Enter reminder text"></textarea></div>';
      let buttons = [{contents: "Send",
                      click: "emailFunc()"}]
      let dialogOptions = {title: 'Reassign ' + type,
                            content: contentString,
                            buttons: buttons};
      new this.$site.Dialog(dialogOptions);
    },
    /**
     * Handler for sending a reminder to a individual person
     * @param name of person receiving reminder
     * @param email to send reminder to
     */
    individualReminder(name, email){
      let site = this.$site;
      let contentString = '<p>To: ' + name + '</p>' +
          '<div>Subject: \t<input id="cl-review-notify-individual-subject" placeholder="Email Subject"></input>\t</div>'+
          '<br'+
          '<div>Send Reminder: \t<textarea id="cl-review-notify-individual-body" style="resize:none" placeholder="Enter reminder text" rows="6" cols="30"></textarea>\t</div>';

      new this.$site.Dialog({
        title: 'Individual Reminder ',
        content: contentString,
        buttons: [{
          contents: "Send",
          // Handler function for when someone clicks send on the dialog box
          click: function click(dialog) {
            // Grab the subject/body from the html and put it in params json object
            let subject = document.querySelector('#cl-review-notify-individual-subject').value;
            let body = document.querySelector('#cl-review-notify-individual-body').value;
            let params = {
              name: name,
              mailto: email,
              subject: subject,
              body: body
            }
            // Send post request and check for errors, this routes to ReviewApi.php
            site.api.post('/api/review/notify', params)
                .then((response) => {
                  if (!response.hasError()) {
                    site.toast(this, "Notification sent!");
                  } else {
                    site.toast(this, response);
                  }
                  dialog.close();
                })

          }
        }]
      });

    }

  }
}
</script>
