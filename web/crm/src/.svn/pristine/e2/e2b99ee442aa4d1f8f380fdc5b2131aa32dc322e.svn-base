<template>
  <div>
    <el-tabs :tab-position="tabPosition" v-model="activeName">
      <el-tab-pane label="Tham số TASK" name="first">
        <Parameter settingType="default"></Parameter>
      </el-tab-pane>
<!--       <el-tab-pane label="Tham số CRM" name="second">
        <Parameter settingType="crm"></Parameter>
      </el-tab-pane> -->
      <el-tab-pane v-if="$isSystemAdmin()" label="Tham số hệ thống" name="third">
        <Parameter settingType="tool"></Parameter>
      </el-tab-pane>
      <el-tab-pane v-if="$isSystemAdmin()" label="Thông tin Ứng dụng" name="fourth">
        <Parameter settingType="appInfo"></Parameter>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Parameter from '@/components/static/Parameter'

  export default {
    components: {
      Parameter
    },
    data () {
      return {
        activeName: 'first',
        tabPosition: 'top',
        options: [{
          value: 'Tham số công việc',
          label: 'Tham số công việc'
        }, {
          value: 'Tham số tài liệu',
          label: 'Tham số tài liệu'
        }],
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
