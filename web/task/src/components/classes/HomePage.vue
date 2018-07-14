/**
* Home Component
*
* Created by dbinh on 04/04/2018.
*/

<script>
  import ListFloatMobile from './ListFloatMobile'
  import CourseCard from './CourseCard'
  import CategoryCard from './CategoryCard'
  import api from '@/services/api'

  export default {
    name: 'Home',
    components: {
      ListFloatMobile,
      CourseCard,
      CategoryCard
    },
    props: {},
    data () {
      return {
        categories: []
      }
    },
    methods: {
      getCategory () {
        api.requestSetting('xSetting.Project.Parameter.Category')
          .then(categories => {
            categories = categories.filter(ctg => ctg.Level === '5')
            this.categories = categories
          })
      }
    },
    created: function () {
      this.getCategory()
    },
    watch: {}
  }
</script>

<template>
    <div class="Home__ROOT">
        <div class="top-courses">
          <ListFloatMobile label="Top khóa học">
            <template slot="items">
              <CourseCard :course="{Name: 'Blockchain 1'}"/>
              <CourseCard :course="{Name: 'Blockchain 2'}"/>
              <CourseCard :course="{Name: 'Blockchain 3'}"/>
            </template>
          </ListFloatMobile>
        </div>
      <!-- category-->
      <div class="categories">
        <ListFloatMobile label="Danh mục">
          <template slot="items">
            <CategoryCard :category="category" v-for="category in categories"/>
          </template>
        </ListFloatMobile>
      </div>
    </div>
</template>

<style lang="scss" scoped>
  .Home__ROOT {
    padding: 0 10px;
  }
</style>
