<template>
  <div>
    <div style="background: #fff; padding: 5px;">
      <router-link to="/setting-users" class="col-sm-5 text-right "><i class="icon-user mgr5"></i>Tài khoản</router-link>

      <router-link to="/setting-group-project" class="col-sm-5 text-right"><i class="icon-people mgr5"></i>Phòng ban & Dự án
      </router-link>

      <router-link to="/setting-ui" class="col-sm-5 text-right"><i class="icon-screen-desktop mgr5"></i>Giao diện</router-link>

      <router-link to="/setting-param" class="col-sm-5 text-right">
        <i class="fa fa-sliders" aria-hidden="true"></i>
        Tham số
      </router-link>
    </div>
    <router-view></router-view>
    <!--
    <el-tabs :tab-position="tabPosition" >

        <el-tab-pane label="Tài khoản">
          <span slot="label"><i class="icon-user"></i>Tài khoản</span>
          <SettingUsers />
        </el-tab-pane>
        <el-tab-pane label="Phòng ban & dự án"> <span slot="label"><i class="icon-people"></i>Phòng ban & Dự án</span>
          <SettingGroupAndProject />
        </el-tab-pane>
        <el-tab-pane label=""><span slot="label"><i class="icon-screen-desktop"></i>Giao diện</span>
           <SettingUI />
        </el-tab-pane>
      </el-tabs>
      -->
  </div>

</template>

<script>

  import SettingUsers from "@/components/static/SettingUsers.vue";
  import SettingGroupAndProject from "@/components/static/SettingGroupAndProject.vue";
  import SettingUI from "@/components/static/SettingUI.vue";

  export default {
    components: {
      SettingUsers, SettingGroupAndProject, SettingUI
    },
    data() {
      return {
        activeName: 'first',
        tabPosition: 'top'
      }
    },
    methods: {},
    created() {

    }
  }
</script>

<style lang="scss" scoped>
  .col-sm-5 {
    padding: 0 5px 0 5px;
  }
</style>
