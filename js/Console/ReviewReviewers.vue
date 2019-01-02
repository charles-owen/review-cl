<template>
  <div class="content">
    <div class="full cl-reviewing">
      <mask-vue :mask="mask">Communicating with server...</mask-vue>

      <membersfetcher :fetching="reviewing === null">
        <template slot-scope="fetcher">
          <div v-if="reviewing !== null && user.atLeast(instructor)">
            <form method="post" @submit.prevent="assignReviews">
              <p class="center"><button type="submit">Assign Reviews</button>
                <select v-model="reviewerCnt">
                  <option v-for="num in 6" :value="num">{{num}}</option>
                </select>
              </p>
            </form>
          </div>

          <table v-if="reviewing!==null" class="small">
            <tr>
              <th>User</th>
              <th v-for="i in maxReviewer">reviewee</th>
              <th v-for="i in maxReviewee">reviewer</th>
            </tr>
            <tr v-for="user in fetcher.users">
              <td><a :title="user.name">{{user.userId}}</a></td>
              <td v-for="i in maxReviewer" :class="cls(reviewer[user.member.id], i-1)"><span v-html="display(fetcher.users, reviewer[user.member.id], i-1)"></span></td>
              <td v-for="i in maxReviewee" :class="cls(reviewee[user.member.id], i-1)"><span v-html="display(fetcher.users, reviewee[user.member.id], i-1)"></span></td>
            </tr>
          </table>
        </template>
      </membersfetcher>

    </div>
  </div>
</template>

<script>
  import {Member} from 'course-cl/js/Members/Member';
	import MembersFetcherComponent from 'course-cl/js/Console/Members/MembersFetcherComponent.vue';
  import MaskVue from 'site-cl/js/Vue/Mask.vue';

  const ConsoleComponentBase = Site.ConsoleComponentBase;

	export default {
		'extends': ConsoleComponentBase,
		props: ['assigntag'],
		data: function() {
			return {
				assignment: null,
        reviewerCnt: 2,
        reviewing: 'x',
        instructor: Member.INSTRUCTOR,
        reviewer: null,
        reviewee: null,
        maxReviewer: 0,
        maxReviewee: 0,
		    mask: false
			}
		},
		components: {
			'membersfetcher': MembersFetcherComponent,
      maskVue: MaskVue
		},
		mounted() {
			const member = this.$store.state.user.user.member;

			this.section = this.$store.getters['course/section'](member.semester, member.section);
			this.assignment = this.section.getAssignment(this.assigntag);

			this.setTitle(': ' + this.assignment.shortname + ' Reviewing');
      this.mask = true;

      Site.api.get('/api/review/reviewers/' + this.assigntag, {})
        .then((response) => {
        	this.mask = false;
          if (!response.hasError()) {
            this.take(response);
          } else {
            Site.toast(this, response);
          }

        })
        .catch((error) => {
        	this.mask = false;
          Site.toast(this, error);
        });

		},
		methods: {
			assignReviews() {
				this.mask = true;

				let params = {
			    cnt: this.reviewerCnt
				}
				Site.api.post('/api/review/reviewers/' + this.assigntag, params)
				    .then((response) => {
			          this.mask = false;
				        if (!response.hasError()) {
			            this.take(response);
				        } else {
				            Site.toast(this, response);
				        }

				    })
				    .catch((error) => {
			          this.mask = false;
				        Site.toast(this, error);
				    });

      },
      take(response) {
				const data = response.getData('reviewers').attributes;

				this.reviewer = {};
				this.reviewee = {};
	      this.maxReviewer = 0;
	      this.maxReviewee = 0;

				for(let assign of data) {
					const reviewer = assign[0];
					const reviewee = assign[1];
					const cnt = assign[2];

					if(this.reviewer[reviewer] === undefined) {
						this.reviewer[reviewer] = [];
          }

          this.reviewer[reviewer].push([reviewee, cnt]);
					if(this.reviewer[reviewer].length > this.maxReviewer) {
						this.maxReviewer = this.reviewer[reviewer].length;
          }


          if(this.reviewee[reviewee] === undefined) {
            this.reviewee[reviewee] = [];
          }

          this.reviewee[reviewee].push([reviewer, cnt]);
          if(this.reviewee[reviewee].length > this.maxReviewee) {
            this.maxReviewee = this.reviewer[reviewer].length;
          }
        }

      },
      display(users, assign, i) {
				if(assign === undefined || i >= assign.length) {
					return ' ';
        }

        for(let user of users) {
        	if(user.member.id === assign[i][0]) {
        		return `<a title="${user.name}">${user.userId}</a>/${assign[i][1]}`;  // user.userId + '/' + assign[i][1];
          }
        }

        return ' ';
      },
      cls(assign, i) {
        if(assign === undefined || i >= assign.length) {
          return '';
        }

        return assign[i][1] < 1 ? 'cl-empty' : '';

      }
		}
	}
</script>
