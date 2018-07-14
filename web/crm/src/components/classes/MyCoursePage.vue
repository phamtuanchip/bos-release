/**
* MyCourse Component
*
* Created by dbinh on 04/04/2018.
*/

<script>
  import CourseCard from './CourseCard'
  export default {
    name: 'MyCourse',
    components: {
      CourseCard
    },
    props: {},
    data () {
      return {}
    },
    methods: {},
    created: function () {},
    watch: {}
  }
</script>

<style lang="less" scoped>

</style>

<template>
    <div class="MyCourse__ROOT">
        <CourseCard
          :isBought="true"
          viewType="line"
          :course="{Name: 'Blockchain 1'}"
        />
    </div>
</template>
