/**
* CategoryPage Component
*
* Created by dbinh on 04/04/2018.
*/

<script>
  import ListFloatMobile from './ListFloatMobile'
  import CourseCard from './CourseCard'
  import api from '@/services/api'

  export default {
    name: 'CategoryPage',
    components: {
      ListFloatMobile,
      CourseCard
    },
    props: {},
    data () {
      return {
        categoryId: null,
        courses: []
      }
    },
    methods: {
      getCoursesInCategory (categoryId) {
        api.Course.getCoursesInCategory(categoryId)
          .then(courses => {
            console.log('courses', courses)
            this.courses = courses
          })
      }
    },
    created: function () {
      this.categoryId = this.$route.params['Id']
      this.getCoursesInCategory(this.categoryId)
    },
    watch: {}
  }
</script>

<template>
    <div class="CategoryPage__ROOT">
        <ListFloatMobile label="Khóa học phổ biến">
          <template slot="items">
            <CourseCard :course="course" v-for="course in courses"/>
          </template>
        </ListFloatMobile>
        <ul class="list-subcategories list-unstyled">
          <li>
            <i class="fa fa-google-wallet" aria-hidden="true"></i>
            Quản trị
          </li>
        </ul>
        <div class="list-courses">
          <!--<CourseCard viewType="line"/>-->
        </div>
    </div>
</template>

<style lang="scss" scoped>
  .CategoryPage__ROOT {
    padding: 10px;
    .list-subcategories {
      i.fa {
        width: 25px;
      }
    }
  }
</style>
