  <template>
    <a @click.prevent="select">{{display()}}</a>
  </template>

  <script>
  //  import MenuVue from 'site-cl/js/UI/Menu.vue';
    const MenuVue = Site.Site.MenuVue;
    export default {
        props: ['id', 'time', 'author', 'width', 'height', 'submission_id', 'svg'], // 'assigntag', 'tag', 'submission', 'analysis', 'type'],
        emits: ['show'],
        data: function() {
            return {
                root: Site.root,
              toDownload: null
            }
        },
        components: {
            menuVue: MenuVue
        },
        mounted() { },
        methods: {
            formatTime(time) {
                return this.$site.TimeFormatter.relativeUNIX(time, null);
            },
            display() {
                return `${this.ordinalToCardinal(this.id + 1)} annotation ${this.formatTime(this.time)} by ${this.author}`;
            },
            ordinalToCardinal(ord) {
              console.log(ord, ord % 100 in [11, 12, 13]);
              if ([11, 12, 13].includes(ord % 100)) return `${ord}th`;
              switch (ord % 10) {
                case 1:
                  return `${ord}st`;
                case 2:
                  return `${ord}nd`;
                case 3:
                  return `${ord}rd`;
                default:
                  return `${ord}th`;
              }
            },
            select() {
                this.$emit('show', this.svg, this.width, this.height, this.$site.root + '/cl/course/submission/view/' + this.submission_id);
            },
        }

    }

  </script>