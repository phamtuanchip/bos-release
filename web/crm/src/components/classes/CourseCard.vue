/**
* CourseCard Component
*
* Created by dbinh on 04/04/2018.
*/

<script>
  export default {
    name: 'CourseCard',
    components: {},
    props: ['viewType', 'isBought', 'course'],
    data () {
      return {
        progress: 20
      }
    },
    methods: {},
    created: function () {},
    watch: {}
  }
</script>

<template>
  <div class="CourseCard__ROOT" :class="viewType">
    <router-link :to="isBought ? '/class/course/learn' : '/class/course/' + course.Id">
      <div class="coursecard__wrapper">
        <div class="course-cover__wrapper">
          <div class="course-cover" :style="`background: url(${course.FriendlyUrl || 'https://prod-discovery.edx-cdn.org/media/course/image/8566d539-69cb-43a5-94c2-000502df1a92-9f5b1b30bc58.small.jpg'})`">
          </div>
        </div>
        <div class="course-brief-info">
          <div style="padding: 0 5px;">
            <div class="course-name">
              {{course.Name || '...'}}
            </div>
            <div class="course-rate" v-if="!isBought">
              <el-rate
                v-model="course.rate"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                class="inline"
              >
              </el-rate>
              <span class="course-rate-number">(7.442)</span>
            </div>
            <div class="course-price" style="font-size: 13px;" v-if="!isBought">
              <div class="course-price-current inline">
                {{course.TotalPages || 0}} <span>đ</span>
              </div>
              <div class="course-price-orig inline" style="font-size: 12px; color: #ccc">
                <strike>{{course.TotalComments || 0}}</strike>
              </div>
            </div>
          </div>
          <div class="course-reputation" style="font-size: 12px;" v-if="!isBought">
            <div class="course-numofview">
              <i class="fa fa-eye" aria-hidden="true"></i>
              456
            </div>
            <div class="course-numoflike">
              <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
              42
            </div>
            <div class="course-numofshare">
              <i class="fa fa-share-alt" aria-hidden="true"></i>
              4
            </div>
          </div>
          <div v-if="isBought" class="mgt5">
            <el-progress :percentage="progress" v-model="progress" :show-text="false"></el-progress>
            <router-link to="/class/course/learn" v-if="!progress || (progress === 0)">
              <el-button type="danger" class="mgt5">
                <strong>Vào học</strong>
              </el-button>
            </router-link>
            <div v-else class="mgt5">
              {{progress}} % hoàn thành
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss">
  .CourseCard__ROOT {
    display: inline-block;
    background: #fff;
    margin-right: 5px;
    margin-bottom: 10px;
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    overflow: hidden;
    &.line {
      width: 100%;
      border-radius: 0;
      margin-bottom: 0;
      font-size: 13px;
      .coursecard__wrapper {
        display: flex !important;
      }
      .course-cover__wrapper {
        margin-right: 10px;
      }
      .course-cover {
        height: 75px;
        width: 75px;
        background-size: cover;
      }
      .course-rate {
        font-size: 12px;
        color: #ccc;
        padding: 0;
        .el-rate__icon {
          font-size: 13px;
        }
      }
    }
    a {
      color: #333;
    }
    .course-rate {
      font-size: 13px;
      color: #ccc;
      padding: 2px 0 5px;
      .el-rate__icon {
        font-size: 16px;
      }
    }
    .course-cover {
      height: 150px;
      width: 200px;
      background-position: center;
    }
    .course-reputation {
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-top: solid 1px #eee;
      margin-top: 2px;
    }
  }
</style>
