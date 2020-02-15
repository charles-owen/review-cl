<template>
  <div class="content">
    <div class="full cl-reviewing">

      <membersfetcher :fetching="reviewer === null">
        <template slot-scope="fetcher">
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
              <th>User</th>
              <th v-for="i in maxReviewer">reviewee</th>
              <th v-for="i in maxReviewee">reviewer</th>
            </tr>
            <tr v-for="user in fetcher.users">
              <td>
                <router-link :title="user.name" :to="root + '/cl/console/grading/' + assigntag + '/' + user.member.id">
                  {{user.userId}}
                </router-link>
              </td>
              <td v-for="i in maxReviewer" :class="cls(reviewer[user.member.id], i-1)">
                <status-present :assigntag="assigntag" :status-user="displayUser(fetcher.users, reviewer[user.member.id], i-1)" :count="reviewer[user.member.id][i-1][1]"></status-present>
              </td>
              <td v-for="i in maxReviewee" :class="cls(reviewee[user.member.id], i-1)">
                <status-present :assigntag="assigntag" :status-user="displayUser(fetcher.users, reviewee[user.member.id], i-1)" :count="reviewer[user.member.id][i-1][1]"></status-present>
            </td>
            </tr>
          </table>
        </template>
      </membersfetcher>

    </div>
  </div>
</template>

<script>

  import StatusPresentVue from './StatusPresent.vue';

  export default {
    'extends': Site.Site.ConsoleComponentBase,
    props: ['assigntag'],
    data: function () {
      return {
        assignment: null,
        reviewerCnt: 2,
        reviewing: 'x',
        instructor: Site.Site.Member.INSTRUCTOR,
        reviewer: null,
        reviewee: null,
        maxReviewer: 0,
        maxReviewee: 0
      }
    },
    components: {
      'membersfetcher': Site.MembersFetcherComponentVue,
      'status-present': StatusPresentVue
    },
    mounted() {
      const member = this.$store.state.user.user.member;

      this.section = this.$store.getters['course/section'](member.semester, member.section);
      this.assignment = this.section.getAssignment(this.assigntag);

      this.setTitle(': ' + this.assignment.shortname + ' Reviewing');

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
      assignReviews() {
        if(this.maxReviewer > 0 || this.maxReviewee > 0) {
          new this.$site.Dialog.MessageBox('Are you sure?', 'Are you sure you want to assign reviewers? This will replace the existing reviewing assignments.',
                  this.$site.Dialog.MessageBox.OKCANCEL, () => {
                    this.assignReviewsActual();
                  });
        } else {
          this.assignReviewsActual();
        }
      },
      assignReviewsActual() {
        this.reviewer = null;
        this.reviewee = null;
        this.maxReviewer = 0;
        this.maxReviewee = 0;

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
      take(response) {
        const data = response.getData('reviewers').attributes;

        this.reviewer = {};
        this.reviewee = {};
        this.maxReviewer = 0;
        this.maxReviewee = 0;

        for (let assign of data) {
          const reviewer = assign[0];
          const reviewee = assign[1];
          const cnt = assign[2];

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

      },
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
      cls(assign, i) {
        if (assign === undefined || i >= assign.length) {
          return '';
        }

        return assign[i][1] < 1 ? 'cl-empty' : '';

      }
    }
  }
</script>
