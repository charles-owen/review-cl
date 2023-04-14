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

              <form method="post" @click.prevent="anonymousReviewing">
                <div style=margin-left:10px>
                  <p class="center" style = padding-top:3.5px><label for="anon_checkbox"> Anonymous Reviewing</label>
                    <input type="checkbox" id="anon_checkbox" name="anon_checkbox" style = margin-left:3px v-model="anon">
                  </p>
                </div>
              </form>

            </div>
          </div>
          <table class="small">
            <tr>
              <th class="width38px"></th>
              <th>&#177Reviewee</th>
              <th>&#177Reviewer</th>
              <!--Making it so that clicking the table header for Name sets the name sort key, also make check image pop up-->
              <th title="Sort By Name" alt= "Sort By Name" @click.prevent="setSortBy(SortKey.name)" style="cursor:pointer"><img v-if="sortKey===SortKey.name" :src="check">
                Name</th>
              <th>User ID</th>
              <!--Making it so that clicking the table header for Reviewee sets the reviewee sort key, also make check image pop up-->
              <th title="Sort By Reviewees Needed" alt= "Sort By Reviewees Needed" @click.prevent="setSortBy(SortKey.reviewee)" style="cursor:pointer" v-for="i in maxReviewees"><img v-if="sortKey===SortKey.reviewee" :src="check">
                reviewee</th>
              <!--Making it so that clicking the table header for Reviewer sets the reviewer sort key, also make check image pop up-->
              <th title="Sort By Reviewers Needed" alt= "Sort By Reviewers Needed" @click.prevent="setSortBy(SortKey.reviewer)" style="cursor:pointer" v-for="i in maxReviewers"><img v-if="sortKey===SortKey.reviewer" :src="check">
                reviewer</th>
            </tr>
            <!--Calling sort on the users to make sure it is sorted based on the sort key-->
            <tr v-for="user in sort(fetcher.users)">
              <td>
                <a @click.prevent="maybeIndividualNotification(user.member.id, user.name)" href="javascript:;">
                  <img :src="mail" title="Email" alt="Email">
                </a>
              </td>
              <td :style="{backgroundColor: getBackgroundColor(adjustedMaxValue(fetcher.users, maxReviewers, 'Reviewer') - this.countReviews(fetcher.users, user, 'Reviewer'),adjustedMaxValue(fetcher.users, maxReviewers, 'Reviewer'))}">
                <div class="aligncontrols">
                  <a @click.prevent="reassignDialog(user, 'Reviewee', fetcher.users)" href="javascript:;">
                    <img :src="plus" title="Add Reviewee" alt="Add Reviewee">
                  </a>
                  <a @click.prevent="removeDialog(user, 'Reviewee', fetcher.users)" href="javascript:;">
                    <img :src="remove" title="Remove Reviewee" alt="Remove Reviewee">
                  </a>
                </div>
              </td>
              <td :style="[
                  this.countReviews(fetcher.users, user, 'Reviewee') < adjustedMaxValue(fetcher.users, maxReviewees, 'Reviewee') ?
                  {backgroundColor: getBackgroundColor(adjustedMaxValue(fetcher.users, maxReviewees, 'Reviewee') - this.countReviews(fetcher.users, user, 'Reviewee'),adjustedMaxValue(fetcher.users, maxReviewees, 'Reviewee'))}:{}]">
                <div class="aligncontrols">
                  <a @click.prevent="reassignDialog(user, 'Reviewer', fetcher.users)" href="javascript:;">
                    <img :src="plus" title="Add Reviewer" alt="Add Reviewer">
                  </a>
                  <a @click.prevent="removeDialog(user, 'Reviewer', fetcher.users)" href="javascript:;">
                    <img :src="remove" title="Remove Reviewer" alt="Remove Reviewer">
                  </a>
                </div>
              </td>
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
                <!--Changed ternary operator for count to check if reviewer array has enough entries                -->
                <status-present :assigntag="assigntag" :status-user="displayUser(fetcher.users, reviewers[user.member.id], i-1)" :count="reviewers[user.member.id] !== undefined && i-1 < reviewers.length ? reviewers[user.member.id][i-1][1] : 0"></status-present>
              </td>
              <td v-for="i in maxReviewers" :class="cls(reviewees[user.member.id], i-1)">
                <status-present :assigntag="assigntag" :status-user="displayUser(fetcher.users, reviewees[user.member.id], i-1)" :count="reviewees[user.member.id] !== undefined && i-1 < reviewees.length ? reviewees[user.member.id][i-1][1] : 0"></status-present>
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
import ReviewRemoveVue from './ReviewRemove.vue';
import ReviewReminderVue from './ReviewReminder.vue';


const VueDialog = Site.site.VueDialog;

const SortKey = {
  reviewer: 1,
  reviewee: 2,
  name: 3
}

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
      instructor: Site.Member.INSTRUCTOR, // Enum for instructor permissions
      staff: Site.Member.STAFF, // Enum for staff permissions
      student: Site.Member.STUDENT, // Enum for student permissions
      reviewers: null,  // All of the reviews by member ID
      reviewees: null,  // All of the reviewee by member ID
      maxReviewees: 0,  // Maximum number of reviewees for any reviewer
      maxReviewers: 0,   // Maximum number of reviewers for any reviewee
      mail: Site.root + '/vendor/cl/site/img/mail.png', // Mail icon png
      plus: Site.root + '/vendor/cl/site/img/add-circle.png', // Plus icon png
      remove: Site.root + '/vendor/cl/site/img/x.png', // X (delete) icon png
      check: Site.root + '/cl/img/check16.png', //checkmark icon png
      sortKey: SortKey.name, // set the default sort key value to be name
      SortKey: SortKey, //the SortKey dictionary
      anon: false, //Anonymous Flag
    }
  },
  components: {
    'membersfetcher': MembersFetcherComponent,
    'status-present': StatusPresentVue
  },
  mounted() {
    this.addComponent =
        this.$root.console.components.addNav2Link(this, 'Send Reminders', 1, () => {
          this.maybeSendNotification();
        });
    // Get the member object for the site user
    const member = this.$store.state.user.user.member;

    // Get the course section and the assignmment we are reviewing (so we know the name)
    this.section = this.$store.getters['course/section'](member.semester, member.section);
    this.assignment = this.section.getAssignment(this.assigntag);

    // Set the console page title
    this.setTitle(': ' + this.assignment.shortname + ' Reviewing');

    // Ask the server for the anonymous status for the assignment (if any)
    this.$site.api.get('/api/review/anon_status/' + this.assigntag, {})
        .then((response) => {
          if (!response.hasError()) {
            this.updateAnon(response);
          } else {
            this.$site.toast(this, response);
          }

        })
        .catch((error) => {
          this.$site.toast(this, error);
        });

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
  beforeUnmount() {
    if(this.addComponent) {
      this.$root.console.components.removeNav2(this, this.addComponent);
    }
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
     * Function called when clicking the anonymoys reviewing checkbox, brings up an are you sure dialog box
     */
    anonymousReviewing(){
      if(this.anon === false){
        new this.$site.Dialog.MessageBox('Are you sure?', 'Are you sure you want to enable Anonymous Reviewing? This will make reviewer and reviewee names hidden during peer-reviewing.',
            this.$site.Dialog.MessageBox.OKCANCEL, () => {
              //when they click okay proceed to set the anonymous flag
              this.setAnonymous();
            });
      }
      else{
        new this.$site.Dialog.MessageBox('Are you sure?', 'Are you sure you want to disable Anonymous Reviewing? This will make reviewer and reviewee names visible during peer-reviewing.',
            this.$site.Dialog.MessageBox.OKCANCEL, () => {
              //when they click okay proceed to set the anonymous flag
              this.setAnonymous();
            });
      }
    },

    /**
     * Actually Updating and presisting the anonymous flag in the database and making sure the toggle updates accordingly
     */

    setAnonymous(){
      // Ask the server to set and return the anonymous status for the review assignment
      this.$site.api.post('/api/review/anon_status/' + this.assigntag, {})
          .then((response) => {
            if (!response.hasError()) {
              this.updateAnon(response);
              //if anon is true then toast letting them know it is now enabled
              if(this.anon === true){
                this.$site.toast(this, "Anonymous Reviews Enabled!");
              }
              //otherwise it is disabled
              else{
                this.$site.toast(this, "Anonymous Reviews Disabled!");
              }


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

        //made sure maxReviewers was updating properly
        this.reviewees[reviewee].push([reviewer, cnt]);
        if (this.reviewees[reviewee].length > this.maxReviewers) {
          this.maxReviewers = this.reviewees[reviewee].length;
        }
      }


    },

    /**
     * Update the anonymous flag of the page based on the response given by the server
     * @param response
     */
    updateAnon(response){
      const data = response.getData('anonymous').attributes
      this.anon = data;
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
     * Dialog pop up to confirm user wants to send class wide reminder.
     */
    maybeSendNotification() {
      new this.$site.Dialog.MessageBox('Are you sure?', 'Are you sure you want to send a reminder for reviews to the entire class?',
          this.$site.Dialog.MessageBox.OKCANCEL, () => {
            this.sendNotification();
          });
    },
    /**
     * Uses a message box to edit and send reminder emails to
     * the entire class.
     */
    sendNotification() {
      let site = this.$site;
      //variable for the assignment tag
      let assignTag = this.assigntag;

      let params = {
        memberId: 'null',
        isClass: true
      }
      // Send post request and check for errors, this routes to ReviewApi.php
      site.api.post('/api/review/notify/' + assignTag, params)
          .then((response) => {
            if (!response.hasError()) {
              let notificationsSent = response.getData('notificationsSent').attributes;
              site.toast(this, notificationsSent + " Notifications Sent!");
            } else {
              site.toast(this, response);
            }
          })




    },
    adjustedMaxValue(users, max, role) {
      let countLessThanMax = 0;

      users.forEach(user => {
        const reviewsCount = this.countReviews(users, user, role);
        if (reviewsCount < max) {
          countLessThanMax++;
        }
      });
      if (countLessThanMax < users.length / 2) {
        return max;
      } else {
        return max - 1;
      }
    },
    getBackgroundColor(missing, maxReviews) {
      if (maxReviews === 0){
        return `rgb(255, 255, 255)`;
      }
      // Calculate RGB values
      let r = 255;
      let g = 255 - 75 * (missing/maxReviews);
      let b = 255 - 75 * (missing/maxReviews);

      // Return RGB value as a string
      return `rgb(${r}, ${g}, ${b})`;
    },
    removeDialog(removeUser, type, users)
    {
      let assignedReviews = [];
      if (type === "Reviewee") {
        for (let i = 0; i < this.maxReviewees; i++) {
          if (this.displayUser(users, this.reviewers[removeUser.member.id], i)) {
            assignedReviews.push(this.displayUser(users, this.reviewers[removeUser.member.id], i).name)
          }
        }
      }
      else if (type === "Reviewer") {
        for (let i = 0; i < this.maxReviewers; i++) {
          if (this.displayUser(users, this.reviewees[removeUser.member.id], i)) {
            assignedReviews.push(this.displayUser(users, this.reviewees[removeUser.member.id], i).name)
          }
        }
      }
      let site = this.$site;
      //variable for the assignment tag
      let assignTag = this.assigntag;
      //variable to hold this to call functions within click function
      let tempThis = this;
      let buttons = [{
        contents: "Remove",
        //handler function for action when clicking reassign button
        click: function click(dialog) {
          //getting the select menu
          let selector = document.querySelector('#cl-review-remove-selector')
          //getting the name of the student selected from the drop down menu
          let selected_student = selector.options[selector.selectedIndex].innerHTML;

          //the student who is the reviewer
          var reviewer;
          //the student who is the reviewee
          var reviewee;

          //loop through users and find the user that matches the name selected from drop down
          for(let i = 0; i<users.length; i++){
            if(users[i].name === selected_student){
              //if we are reassigning reviewer
              if(type === "Reviewer"){
                //reviewer is the student selected from drop down menu
                reviewer = users[i];
                //reviewee will be the removeUser
                reviewee = removeUser;
              }
              //if we are reassigning reviewee
              else{
                //reviewer will be the removeUser
                reviewer = removeUser;
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
          site.api.post('/api/review/remove/' + assignTag, params)
              .then((response) => {
                if (!response.hasError()) {
                  site.toast(this, "Removal Complete");
                  //calling take to reflect change when dialog box is closed
                  tempThis.take(response);
                } else {
                  site.toast(this, response);
                }
                dialog.close();
              })

        }




      }];
      new VueDialog(this.$site, {
        title: 'Remove ' + type,
        vue: ReviewRemoveVue,
        data: function () {
          return {
            assignedReviews: assignedReviews,
            removeUser: removeUser,
            removeType: type
          }
        },
        buttons: buttons,
        parent: this
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
    reassignDialog(reassignUser, type, users) {
      let sortedUsers = this.sortUsersByReviewCount(users, reassignUser, type);
      let site = this.$site;
      //variable for the assignment tag
      let assignTag = this.assigntag;

      //variable to hold this to call functions within click function
      let tempThis = this;
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
                  //calling take to reflect change when dialog box is closed
                  tempThis.take(response);
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
            reassignUser: reassignUser,
            assignType: type
          }
        },
        buttons: buttons,
        parent: this
      });
    },
    /**
     * Dialog pop up to confirm user wants to send individual reminder.
     */
    maybeIndividualNotification(memberId, name) {
      new this.$site.Dialog.MessageBox('Are you sure?', 'Are you sure you want to send a reminder to ' + name + '?',
          this.$site.Dialog.MessageBox.OKCANCEL, () => {
            this.individualNotification(memberId);
          });
    },
    /**
     * Handler for sending a reminder to a individual person
     * @param name of person receiving reminder
     * @param email to send reminder to
     */
    individualNotification(memberId){
      let site = this.$site;
      //variable for the assignment tag
      let assignTag = this.assigntag;
      let params = {
        memberId: memberId,
        isClass: false
      }
      // Send post request and check for errors, this routes to ReviewApi.php
      site.api.post('/api/review/notify/' + assignTag, params)
          .then((response) => {
            if (!response.hasError()) {
              let notificationUnavailable = response.getData('notificationUnavailable').attributes;
              let notificationSent = response.getData('notificationsSent').attributes;
              if(notificationUnavailable) {
                site.toast(this, "Notification cancelled: user has not submitted")
              }
              else if(notificationSent == 1) {
                site.toast(this, "Notification sent!");
              }
              else {
                site.toast(this, "Notification cancelled: no reviews need to be done.");
              }

            } else {
              site.toast(this, response);
            }
          })

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
          if(type === "Reviewee") {
            //variable that gets set if there is a duplicate being added to the drop down menu
            let duplicate = false;
            //check to make sure the user is in the reviewers array first(if a student is late added it will be undefined)
            if(this.reviewers[reassignUser.member.id] !== undefined) {
              //loop through the currently assigned reviewees to the reassignedUser(reviewer)
              for (let j = 0; j < this.reviewers[reassignUser.member.id].length; j++) {
                //if the user is already in the list of reviewees set the duplicate flag
                if (users[i].member.id === this.reviewers[reassignUser.member.id][j][0]) {
                  duplicate = true;
                  break;
                }
              }
            }
            //Add the pairing if they are not duplicate
            if(duplicate === false) {
              userCountPairs[users[i].name] = this.countReviews(users, users[i], type);
            }
          }

          if(type === "Reviewer"){
            //variable that gets set if there is a duplicate being added to the drop down menu
            let duplicate = false;
            //check to make sure the user is in the reviewees array first(if a student is late added it will be undefined)
            if(this.reviewees[reassignUser.member.id] !== undefined){
              //loop through the currently assigned reviewers to the reassignedUser(reviewee)
              for(let j = 0; j< this.reviewees[reassignUser.member.id].length;j++){
                //if the user is already in the list of reviewers set the duplicate flag
                if(users[i].member.id === this.reviewees[reassignUser.member.id][j][0]){
                  duplicate = true;
                  break;
                }
              }
            }
            //Add the pairing if they are not duplicate
            if(duplicate === false) {
              userCountPairs[users[i].name] = this.countReviews(users, users[i], type);
            }
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
        for (let i = 0; i < this.maxReviewers; i++) {
          if (this.displayUser(users, this.reviewees[countUser.member.id], i)) {
            count++;
          }
        }
      } else if (type === "Reviewer") {
        for (let i = 0; i < this.maxReviewees; i++) {
          if (this.displayUser(users, this.reviewers[countUser.member.id], i)) {
            count++;
          }
        }
      }
      return count;
    },

    /**
     * sort the unsorted user array on the desired sort key setting
     * @param unsorted_array Array of users that is unsorted
     * @returns sorted_result the result sorted on the desired sort key
     */

    sort(unsorted_array){

      let sorter;

      //keeping track of the unsorted_array of users so we can pass it to countReviews
      let users = unsorted_array;

      //function compares values that are not numbers(ex: names)
      function compare(a, b) {
        if (a > b) {
          return -1;
        }
        if (b > a) {
          return 1;
        }
        return 0;
      }

      //check what the sort key is set to
      switch(this.sortKey) {
          //if name, then run set sorter to run compare on the names
        case SortKey.name:
          sorter = (a, b) => {
            return compare(b.name, a.name);
          };
          break;

          //if reviewer, set sorter to get the number of reviewers assigned to each user and sort
        case SortKey.reviewer:
          sorter = (a, b) => {
            const ret = this.countReviews(users,a,"Reviewee") - this.countReviews(users,b,"Reviewee")
            if(ret !== 0) {
              return ret;
            }
            //if same sort by name
            return compare(b.name, a.name);
          };
          break;

          //if reviewee, set the sorter to get the number of reviewees assigned to each user and sort
        case SortKey.reviewee:
          sorter = (a, b) => {
            const ret =  this.countReviews(users,a,"Reviewer") - this.countReviews(users,b,"Reviewer")
            if(ret !== 0) {
              return ret;
            }
            //if the count is the same sort by name
            return compare(b.name, a.name);
          };
          break;
      }

      //run the .sort() function with the sorter lambda function on the unsorted array
      let sorted_result = unsorted_array.sort(sorter);
      console.log(sorted_result);
      console.log(this.maxReviewers);
      //return the sorted result so the table can be updated accordingly
      return sorted_result;
    },

    /**
     * Function to set the sortKey value based on which header they click
     * @param sorter
     */
    setSortBy(sorter) {
      this.sortKey = sorter;
    },
  },
  computed: {
    adjustedMaxReviewers() {
      const adjustedMax = this.adjustedMaxValue(this.fetcher.users, this.maxReviewers, 'Reviewer');
      console.log('Adjusted Max Reviewers:', adjustedMax);
      return adjustedMax;
    },

    adjustedMaxReviewees() {
      const adjustedMax = this.adjustedMaxValue(this.fetcher.users, this.maxReviewees, 'Reviewee');
      console.log('Adjusted Max Reviewees:', adjustedMax);
      return adjustedMax;
    },
  },

}
</script>

<style scoped>
.aligncenter {
  text-align: center;
}
.width38px {
  min-width: 38px;
}
.aligncontrols {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
