/**
* CoursePage Component
*
* Created by dbinh on 04/04/2018.
*/

<script>
  import {videoPlayer} from 'vue-video-player'
  import 'video.js/dist/video-js.css'
  import video from 'videojs-youtube'
  import videojs from 'video.js'
  import api from '@/services/api'

  export default {
    name: 'CoursePage',
    components: {
      videoPlayer
    },
    props: {},
    data () {
      return {
        loading: true,
        playerOptions: {
          controls: true,
          techOrder: ['flash', 'html5', 'youtube'],
          sourceOrder: true,
          flash: {hls: {withCredentials: false}},
          html5: {hls: {withCredentials: false}},
          sources: []
        },
        course: {}
      }
    },
    methods: {
      addVideoLinkToPlayer (link) {
        this.playerOptions.sources.push({
          withCredentials: false,
          type: 'video/youtube',
          src: link
        })
      },
      getCourse (courseId) {
        api.Course.getCourse(courseId)
          .then(course => {
            this.course = course
            this.addVideoLinkToPlayer(course.SourceUrl)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    created: function () {
      this.courseId = this.$route.params['Id']
      this.getCourse(this.courseId)
    },
    watch: {}
  }
</script>

<template>
    <div class="CoursePage__ROOT" v-if="!loading">
      <div class="section-top">
          <h3>{{course.Name}}</h3>
          <div class="description">
            {{course.Description}}
          </div>
          <div class="tags">
            <el-tag size="mini" class="tag--circle">4,7</el-tag>
            <el-tag size="mini" class="tag--circle">29.220 học viên</el-tag>
            <el-tag size="mini" class="tag--circle">2.5 giờ</el-tag>
          </div>
        </div>

      <div class="video-preview">
        <div class="block-center" style="width: 85%;">
          <video-player
            class="video-player-box"
            :options="playerOptions"
            style="width: 100%"
          ></video-player>
        </div>
      </div>

      <div style="padding: 0 10px;">
        <div class="course-price">
          <div class="course-price-current inline">
            {{course.TotalPages}} <span>đ</span>
          </div>
          <div class="course-price-orig inline" style="font-size: 15px; color: #ccc">
            <strike>{{course.TotalComments}}</strike>
          </div>
        </div>

        <div class="group-button mgb15">
          <router-link :to="`/class/course/learn/${course.Id}`">
            <div class="btn btn-block btn-danger">
              Mua khóa học
            </div>
          </router-link>
        </div>

        <el-card class="box-card mgb15">
          <div class="block-label">
            Khóa học này bao gồm
          </div>
          <ul class="list-unstyled">
            <li>
              <i class="fa fa-youtube-play" aria-hidden="true"></i>
              2.5 giờ học
            </li>
            <li>
              <i class="fa fa-bolt" aria-hidden="true"></i>
              5 bài tập
            </li>
            <li>
              <i class="fa fa-file-text-o" aria-hidden="true"></i>
              Tài liệu hỗ trợ
            </li>
          </ul>
        </el-card>

        <el-card class="box-card mgb15">
          <div class="block-label">
            Bạn sẽ được học những gì?
          </div>
          <ul class="list-unstyled">
            <li>
              <i class="fa fa-check" aria-hidden="true"></i>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, harum.
            </li>
            <li>
              <i class="fa fa-check" aria-hidden="true"></i>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, harum.
            </li>
            <li>
              <i class="fa fa-check" aria-hidden="true"></i>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, harum.
            </li>
          </ul>
        </el-card>

        <el-card class="box-card mgb15">
          <div class="block-label">
            Mô tả
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium adipisci aliquam aperiam asperiores, blanditiis eos et illum ipsum iste libero necessitatibus, obcaecati quae quas quasi ratione repellat rerum similique soluta, vero? Adipisci, asperiores assumenda enim nesciunt perferendis sunt voluptas.</p>
        </el-card>

        <el-card class="box-card mgb15 course-author__wrapper">
          <div class="block-label">
            Tạo bởi Nguyễn Quang Đông
          </div>
          <div class="flex">
            <div class="user-avatar mgr10">
              <img src="http://config.mn.com.vn/Download.ashx?Id=acf74877-24a2-4282-8b1c-2d4ccad714cf&Height=50&Width=50" alt="">
            </div>
            <ul class="list-unstyled">
              <li>
                30.845 học sinh
              </li>
              <li>
                4 khóa học
              </li>
              <li>
                4.7 điểm đánh giá
              </li>
            </ul>
          </div>
        </el-card>

        <el-card class="box-card mgb15 course-rating">
          <div class="block-label">
            Học viên đánh giá
          </div>
          <div>
            <span>4,7</span> điểm đánh giá
          </div>
          <div>
            <div class="rating__item">
              <el-rate
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
              </el-rate>
              <div class="rating__content">
                good
              </div>
              <div class="rating__by">
                Dinh Binh <span>cách đây 12 giờ</span>
              </div>
            </div>
            <div class="rating__item">
              <el-rate
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
              </el-rate>
              <div class="rating__content">
                good
              </div>
              <div class="rating__by">
                Dinh Binh <span>cách đây 12 giờ</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
</template>

<style lang="scss">
  .CoursePage__ROOT {
    .block-label {
      font-weight: bold;
      margin: 5px 0 10px;
    }
    .el-card__body {
      padding: 10px;
    }
    .box-card i.fa {
      width: 20px;
    }
    .section-top {
      background-image: url('https://prod-discovery.edx-cdn.org/media/course/image/8566d539-69cb-43a5-94c2-000502df1a92-9f5b1b30bc58.small.jpg'), linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8));
      background-blend-mode: multiply;
      color: #fff;
      padding: 10px;
      padding-bottom: 100px;
    }
    .video-preview {
      margin-top: -75px;
      .video-js {
        width: 100%;
      }
    }
    .course-price {
      font-size: 20px;
      padding: 10px 0;
      color: #000;
      .course-price-orig{
        font-weight: bold;
      }
    }
    .course-rating {
      .rating__item {
        margin-bottom: 15px;
      }
    }
    .tag--circle {
      background: transparent;
      border-radius: 20px;
      color: #fff;
    }
  }
</style>
