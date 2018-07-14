<template>
  <div>
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="Trang">
        <UIPage/>
        <!--<Groups/>-->
      </el-tab-pane>
      <el-tab-pane label="Báo cáo">
        <UIReport/>
      </el-tab-pane>
      <el-tab-pane label="Danh sách">
        <UIList/>
      </el-tab-pane>
      <el-tab-pane label="Bộ lọc">
        <UIFilter/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import GroupCategories from '@/components/static/GroupCategories.vue'
  import ProjectCategories from '@/components/static/ProjectCategories.vue'
  import UIList from '@/components/static/advance/Lists.vue'
  import UIFilter from '@/components/static/advance/Filters.vue'
  import UIPage from '@/components/static/advance/Pages.vue'
  import UIReport from '@/components/static/advance/Reports.vue'

  export default {
    components: {
      GroupCategories, ProjectCategories,
      UIPage, UIReport, UIList, UIFilter
    },
    data () {
      return {
        activeName: 'first',
        tabPosition: 'top',
        value4: ''
      }
    },
    methods: {},
    mounted () {
    },
    destroyed () {
    },
    created: function () {

    }
  }
</script>

<style scoped>

</style>
