<template>
  <div>
    <el-tabs v-model="activeName" :tab-position="tabPosition">
      <el-tab-pane label="Người dùng" name="first">
        <UIUsers/>
        <!-- Phân quyền task -->
      </el-tab-pane>
      <el-tab-pane label="Phân quyền task" name="second">
        <FormCfg v-if="activeName==='second'" :selectedItem="taskFormSettings"/>
      </el-tab-pane>

      <el-tab-pane label="Phân quyền tài liệu" name="third">
        <FormCfg v-if="activeName==='third'" :selectedItem="docFormSettings"/>
      </el-tab-pane>

      <el-tab-pane label="Phân quyền CRM" name="fourth">
        <el-tabs
            v-model="activeNameCRM"
            tab-position="top"
            type="border-card"
            v-if="activeName==='fourth'"
        >
          <el-tab-pane label="Contact" name="CRM.contact">
            <FormCfg v-if="activeNameCRM==='CRM.contact'" :selectedItem="crmContactFormSettings"/>
          </el-tab-pane>
          <el-tab-pane label="Lead" name="CRM.lead">
            <FormCfg v-if="activeNameCRM==='CRM.lead'" :selectedItem="crmLeadFormSettings"/>
          </el-tab-pane>
          <el-tab-pane label="Activity" name="CRM.activity">
            <FormCfg v-if="activeNameCRM==='CRM.activity'" :selectedItem="crmActivityFormSettings"/>
          </el-tab-pane>
          <el-tab-pane label="Order" name="CRM.order">
            <FormCfg v-if="activeNameCRM==='CRM.order'" :selectedItem="crmOrderFormSettings"/>
          </el-tab-pane>
          <el-tab-pane label="Product" name="CRM.product">
            <FormCfg v-if="activeNameCRM==='CRM.product'" :selectedItem="crmProductFormSettings"/>
          </el-tab-pane>
        </el-tabs>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import UserInfo from '@/components/static/UserInfo'
  import ChangeThePassword from '@/components/static/ChangeThePassword'
  import FormCfg from '@/components/static/advance/Form'
  import UIUsers from '@/components/static/advance/Users'
  import API from '@/services/api'

  export default {
    components: {
      UserInfo,
      ChangeThePassword,
      FormCfg,
      UIUsers
    },
    data () {
      return {
        taskFormSettings: {},
        docFormSettings: {},
        activeName: 'first',
        tableData: [],
        temp: [],
        centerDialogVisible: false,
        tabPosition: 'top',
        valueAction: 'Hoạt động',
        valueNotAction: '',
        searchInput: '',
        crmContactFormSettings: {},
        crmLeadFormSettings: {},
        crmOrderFormSettings: {},
        crmActivityFormSettings: {},
        crmProductFormSettings: {},
        activeNameCRM: 'CRM.contact',
        appInfo: {}
      }
    },
    watch: {
      searchInput: function (newVal) {
        if (newVal == null || newVal.trim() == '') {
          this.tableData = this.temp
        } else {
          this.tableData = this.tableData.filter(ele => {
            return ele.Username.toLowerCase().indexOf(newVal.toLowerCase()) > -1
          })
        }
      }
    },
    methods: {
      async getAppInfoParameter () {
        await API.requestSetting('xSetting.Default.AppInfo')
          .then(data => {
            let appInfoObj = data.reduce((prev, curr) => {
              prev[curr.Code] = curr
              return prev
            }, {})
            this.appInfo = appInfoObj
          })
      },
      search (ten, rows) {
        rows.filter(row => {
          return row.Username.indexOf(ten) > -1
        })
      },
      changePass (index, rows) {
        var user = rows[index]
        this.$hub.$emit(
          'set-modal-data',
          'Thay đổi mật khẩu',
          '70%',
          true,
          'center',
          ChangeThePassword,
          false,
          '',
          user
        )
      },
      editUser (index, rows) {
        var user = rows[index]
        this.$hub.$emit(
          'set-modal-data',
          'Sửa thông tin người dùng',
          '80%',
          true,
          'center',
          UserInfo,
          true,
          '',
          {action: 'edit', item: this.userModel}
        )
      },
      indexMethod (index) {
        return index + 1
      },
      getUsers () {
        var request = {
          RequestAction: 'SearchUserWithGroups',
          IncludedGroupManager: true,
          RequestClass: 'BPM',
          RequestDataType: 'json',
          ConditionFields: 'IncludedGroupManager;Group;Status;LoginName;UserId',
          StaticFields: 'UserId;Username;LoginName;Description;Status;',
          DynamicFields: 'Avatar;Facebook;Email;Skype;Birthday;Biography;WorkProcess;Telephone',
          StructFields: 'GroupRoot;GroupRootName;PhoneId;PhoneGroup;Public;RoleRoot;RoleRootName;GroupManage;Notification',
          OrderFields: 'LoginName ASC',
          GroupType: 1,
          Status: 1
        }
        this.$Utils.post(request)
          .then(response => {
            this.tableData = this.$Utils.getDataWithRoot(response, 'Data.UserDS.User') // response.data.Data.UserDS.User;
            this.temp = this.tableData
          }, (response) => {
          })
      },
      getTaskDocumentFormSetting () {
        var request = {
          RequestClass: 'xBase',
          RequestAction: 'Request',
          TotalRequests: 2,
          R1_RequestTemplate: 'SettingNew.SearchSetting',
          R1_ParentCode: 'xSetting.Project.Form',
          R1_Level: 4,
          R1_Code: this.appInfo['xSetting.Default.AppInfo.PermissionTask'].Value,
          R2_RequestTemplate: 'SettingNew.SearchSetting',
          R2_ParentCode: 'xSetting.Project.Form',
          R2_Level: 4,
          R2_Code: this.appInfo['xSetting.Default.AppInfo.PermissionDocument'].Value,
          SessionId: this.sessionId
        }
        this.$Utils.post(request).then(response => {
          this.taskFormSettings = this.$Utils.getDataWithRoot(response.R1, 'Data.DynamicDS.Setting')[0]
          this.docFormSettings = this.$Utils.getDataWithRoot(response.R2, 'Data.DynamicDS.Setting')[0]
        })
      },
      getCRMFormSetting () {
        var request = {
          RequestClass: 'xBase',
          RequestAction: 'Request',
          TotalRequests: 5,
          R1_RequestTemplate: 'SettingNew.SearchSetting',
          R1_Code: this.appInfo['xSetting.Default.AppInfo.PermissionCRMContact'].Value,
          R2_RequestTemplate: 'SettingNew.SearchSetting',
          R2_Code: this.appInfo['xSetting.Default.AppInfo.PermissionCRMLead'].Value,
          R3_RequestTemplate: 'SettingNew.SearchSetting',
          R3_Code: this.appInfo['xSetting.Default.AppInfo.PermissionCRMOrder'].Value,
          R4_RequestTemplate: 'SettingNew.SearchSetting',
          R4_Code: this.appInfo['xSetting.Default.AppInfo.PermissionCRMActivity'].Value,
          R5_RequestTemplate: 'SettingNew.SearchSetting',
          R5_Code: this.appInfo['xSetting.Default.AppInfo.PermissionCRMProduct'].Value
        }
        console.log('this.appInfo', this.appInfo)
        this.$Utils.post(request).then(response => {
          this.crmContactFormSettings = this.$Utils.getDataWithRoot(response.R1, 'Data.DynamicDS.Setting')[0]
          this.crmLeadFormSettings = this.$Utils.getDataWithRoot(response.R2, 'Data.DynamicDS.Setting')[0]
          this.crmOrderFormSettings = this.$Utils.getDataWithRoot(response.R3, 'Data.DynamicDS.Setting')[0]
          this.crmActivityFormSettings = this.$Utils.getDataWithRoot(response.R4, 'Data.DynamicDS.Setting')[0]
          this.crmProductFormSettings = this.$Utils.getDataWithRoot(response.R5, 'Data.DynamicDS.Setting')[0]
        })
      }
    },

    created () {
      this.getAppInfoParameter()
        .then(() => {
          this.getTaskDocumentFormSetting()
          this.getCRMFormSetting()
        })
      this.getUsers()
    }
  }
</script>

<style lang="scss" scoped>
  .el-table th {
    background-color: #3e4548;
    color: #fff;
  }

  .el-table--border td, .el-table--border th {
    border-right: 2px solid #f2f3f4;
  }

  .el-dialog--center .el-dialog__header {
    padding-top: 10px;
    background-color: #3e4548;
    color: #fff;
  }

  .el-tabs__header {
    margin: 0 0 5px !important;
  }
</style>
