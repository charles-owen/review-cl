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
                <a v-if="!displayUser(fetcher.users, reviewers[user.member.id], i-1) && !user.atLeast(staff) && user.atLeast(student)" @click.default="reassignDialog(user, 'Reviewee', fetcher.users, i)" onmouseover="this.style.opacity=.5" onmouseout="this.style.opacity=1">
                  <img src="../../../site/img/add-circle.png">
                </a>
                <status-present :assigntag="assigntag" :status-user="displayUser(fetcher.users, reviewers[user.member.id], i-1)" :count="reviewers[user.member.id] !== undefined ? reviewers[user.member.id][i-1][1] : 0"></status-present>
              </td>
              <td v-for="i in maxReviewers" :class="cls(reviewees[user.member.id], i-1)" align="center">
                <a v-if="!displayUser(fetcher.users, reviewees[user.member.id], i-1) && !user.atLeast(staff) && user.atLeast(student)" @click.default="reassignDialog(user, 'Reviewer', fetcher.users, i)" onmouseover="this.style.opacity=.5" onmouseout="this.style.opacity=1">
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
import ReviewReassignVue from './ReviewReassign.vue';

const VueDialog = Site.site.VueDialog;

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
      staff: Site.Member.STAFF,
      student: Site.Member.STUDENT,
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
        return 'td.cl-reviews-none';
      }

      return assign[i][1] < 1 ? 'cl-empty' : '';

    },
    /**
     * Uses a message box to edit and send reminder emails to
     * individual students or the entire class.
     */
    sendReminderDialog() {
      let site = this.$site;
      let content = '<div>' + "To Class" + '<br>' + '<br>' +
          '<div>Subject:\n</div>' +
          '<div><textarea id="cl-review-notify-class-subject" style="resize:none" rows="1" cols="38">CSE335 Peer Review Pending</textarea></div>' +
          '<div> <textarea id="cl-review-notify-class-body" style="resize:none" placeholder="Enter reminder email" rows="6" cols="38">You have a review pending in the peer review system.\n' +
          '\n' + 'Please go to the Peer Reviewing Status Page to see what reviews are pending.</textarea></div>';


      new this.$site.Dialog({
        title: 'Send Reminder',
        content: content,
        buttons: [{
          contents: "Send",
          // Handler function for when someone clicks send on the dialog box
          click: function click(dialog) {
            // Grab the subject/body from the html and put it in params json object
            let subject = document.querySelector('#cl-review-notify-class-subject').value;
            let body = document.querySelector('#cl-review-notify-class-body').value;
            let params = {
              name: 'Class',
              mailto: 'Class',
              subject: subject,
              body: body,
              isClass: true
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
        }],
        form: true
      });


    },
    /**
     * Bring up reassign dialog box. This box allows us to assign a reviewer/reviewee where there
     * is an empty slot. The users in the drop-down menu are sorted by fewest assigned reviewees/reviewers.
     * @param reassignUser User who is having a reviewer/reviewee reassigned to them
     * @param type Type of dialog box to bring up (depends on whether symbol was clicked in reviewer or reviewee column
     * @param users Array of users in the class
     * @param reviewIndex Index in the reviewee/reviewer column that was clicked.
     */
    reassignDialog(reassignUser, type, users, reviewIndex) {
      let sortedUsers = this.sortUsersByReviewCount(users, reassignUser, type);
      let contentString = '<p>Student: ' + reassignUser.name + '</p>' + '<div>' + type + ':\t<select id = "cl-review-reassign-selector">';
      for (let i = 0; i < sortedUsers.length; i++) {
        contentString += '<option>' + sortedUsers[i] + '</option>';
      }
      contentString += '</select>';

      //variable for the site
      let site = this.$site;
      //variable for the assignment tag
      let assignTag = this.assigntag;

      let buttons = [{
        contents: "Reassign",
        //handler function for action when clicking reassign button
        click: function click(dialog) {
          //getting the select menu
          let selector = document.querySelector('#cl-review-reassign-selector')
          //getting the name of the student selected from the drop down menu
          let selected_student = selector.options[selector.selectedIndex].innerHTML;

          //the student who will be the reviewer
          var reviewer;
          //the student who will be the reviewee
          var reviewee;

          //loop through users and find the user that matches the name selected from drop down
          for(let i = 0; i<users.length; i++){
            if(users[i].name === selected_student){
              //if we are reassigning reviewer
              if(type === "Reviewer"){
                //reviewer is the student selected from drop down menu
                reviewer = users[i];
                //reviewee will be the reassignUser
                reviewee = reassignUser;
              }
              //if we are reassigning reviewee
              else{
                //reviewer will be the reassignUser
                reviewer = reassignUser;
                //reviewee is the student selected from drop down menu
                reviewee = users[i];
              }
            }
          }

          //params for that will be fed to the api call
          let params = {
            reviewer: reviewer,
            reviewee: reviewee
          }

          // Send post request and check for errors, this routes to ReviewApi.php
          site.api.post('/api/review/reassign/' + assignTag, params)
              .then((response) => {
                if (!response.hasError()) {
                  site.toast(this, "Reassignment Made");
                } else {
                  site.toast(this, response);
                }
                dialog.close();
              })

        }

      }];

      new VueDialog(this.$site, {
        title: 'Reassign ' + type,
        vue: ReviewReassignVue,
        data: function () {
          return {
            sortedUsers: sortedUsers,
            reassignUser: reassignUser
          }
        },
        buttons: buttons,
        parent: this
      });
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
              body: body,
              isClass: false
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
    },
    /**
     * Return an array of users in the class sorted by number of reviewers/reviewees (least to most) they have assigned
     * excluding reassignUser and non-students.
     * @param users Array of users in the class
     * @param reassignUser User to exclude from sorted array
     * @param type Type of button clicked from dialog (determines whether to check reviewers or reviewees array)
     * @returns {string[]} Array of users sorted by number of reviewers or reviewees
     */
    sortUsersByReviewCount(users, reassignUser, type) {
      let userCountPairs = {};
      for (let i = 0; i < users.length; i++) {
        if (users[i].name != reassignUser.name && !users[i].atLeast(this.staff) && users[i].atLeast(this.student)){
          //if the user is already at the maximum reviewees dont add the to the drop down list
          if(type === "Reviewee" && this.countReviews(users, users[i], type) < this.maxReviewees) {
            userCountPairs[users[i].name] = this.countReviews(users, users[i], type);
          }
          //if the user is already at the maximum reviewers dont add the to the drop down list
          if(type === "Reviewer" && this.countReviews(users, users[i], type) < this.maxReviewers){
            userCountPairs[users[i].name] = this.countReviews(users, users[i], type);
          }
        }
      }
      var items = Object.keys(userCountPairs).map(
          (key) => { return [key, userCountPairs[key]] });
      items.sort(
          (first, second) => { return first[1] - second[1] }
      );
      var keys = items.map(
          (e) => { return e[0] });
      return keys;
    },
    /**
     * Get the number of reviewers/reviewees assigned to this user
     * @param users Array of users
     * @param countUser User to find reviewer/reviewee count for
     * @param type String indicating whether to search for reviewers or reviewees
     * @returns {number} Number of reviewers/reviewees assigned to this user
     */
    countReviews(users, countUser, type) {
      let count = 0;
      if (type === "Reviewee") {
        for (let i = 0; i < this.maxReviewees; i++) {
          if (this.displayUser(users, this.reviewees[countUser.member.id], i)) {
            count++;
          }
        }
      } else if (type === "Reviewer") {
        for (let i = 0; i < this.maxReviewers; i++) {
          if (this.displayUser(users, this.reviewers[countUser.member.id], i)) {
            count++;
          }
        }
      }
      return count;
    },
  }
}
</script>
