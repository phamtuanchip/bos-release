/**
* LearnCoursePage Component
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
    name: 'LearnCoursePage',
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
        course: {},
        activeTab: 'first'
      }
    },
    methods: {
      addVideoLinkToPlayer (link) {
        if (!link) return
        link = link.replace(/&lt;p&gt;/g, '')
        console.log('link', link)
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
            return this.getLesson(courseId)
          })
          .finally(() => {
            this.loading = false
          })
      },
      getLesson (courseId) {
        return new Promise((resolve, reject) => {
          api.Course.getLessonInCourse(courseId)
            .then(lessons => {
              console.log('lessons', lessons)
              this.lessons = lessons
              resolve(lessons)
            })
        })
      },
      handleClickLesson (lesson) {
        if (lesson.FileTypeName === 'video-youtube') {
          this.addVideoLinkToPlayer(lesson.Description)
        }
      }
    },
    created: function () {
      this.courseId = this.$route.params['Id']
      this.getCourse(this.courseId)
    },
    watch: {}
  }
</script>

<style lang="scss">
  .LearnCoursePage__ROOT {
    background: #fff;
    .course-more {
      li {
        a {
          color: #333;
        }
        padding:  10px 0;
      }
    }
    .video-js {
      width: 100%;
      height: 200px;
    }
  }
</style>

<template>
  <div class="LearnCoursePage__ROOT" v-if="!loading">
        <div class="player__wrapper">
          <video-player
            class="video-player-box"
            :options="playerOptions"
          ></video-player>
          <div class="pd10">
            <div style="font-size: 16px;">
              {{course.Name}}
            </div>
            <div class="author opaque">
              {{course.Author}}
            </div>
          </div>
        </div>
        <div class="course-index pd10">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="Bài học" name="first">
              <ul class="list-unstyled">
                <li class="flex" v-for="lesson in lessons" @click="handleClickLesson(lesson)">
                  <div class="lesson-index" style="width: 35px; text-align: center;">
                    1
                  </div>
                  <div class="lesson-info">
                    <div class="lesson-name">
                      {{lesson.Name}}
                    </div>
                    <div class="lesson-type opaque small">
                      {{lesson.FileTypeName}}
                    </div>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="Thêm" name="second">
              <ul class="list-unstyled course-more">
                <li>
                  <router-link to="/">
                    Về khóa học
                  </router-link>
                </li>
                <li>
                  <router-link to="/">
                    Tài nguyên
                  </router-link>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
    </div>
  <div v-else>
    Loading...
  </div>
</template>
