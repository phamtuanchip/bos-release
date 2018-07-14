<template>
  <div>
    <el-form :inline="!$isMobileDevice" label-width="120px">      
      <div v-if="!['appInfo', 'rolePermission', 'projectPermission'].includes(settingType)">
        <el-form-item label="Loại tham số:">
          <el-select v-model="selectedCode" @change="handleCodeChange" clearable placeholder="Chọn">
            <el-option v-for="item in codes"
                       :key="item.value"
                       :label="settingType != 'default' ? item.Name : item.label"
                       :value="settingType != 'default' ? item.Code : item.value">
            </el-option>
          </el-select>

          <div v-if="settingType === 'crm'" class="d-inline">
            <el-tooltip class="item" effect="dark" content="Thêm mới Loại tham số" placement="top-start">
              <el-button type="text" @click="handleAddNewCode">
                <i class="icon-plus"></i>
              </el-button>
            </el-tooltip>
          </div>

        </el-form-item>

        <el-form-item v-if="settingType != 'tool'" label="Tham số:">
          <el-select v-model="selectedParam" @change="handleParamChange" clearable placeholder="Chọn">
            <el-option v-for="item in params"
                       :key="item.Id"
                       :label="item.Name"
                       :value="item.Code"
            >
            </el-option>
          </el-select>

          <div v-if="settingType === 'crm' && selectedCode" class="d-inline">
            <el-tooltip class="item" effect="dark" content="Thêm mới Tham số" placement="top-start">
              <el-button type="text" @click="handleAddNewParam">
                <i class="icon-plus"></i>
              </el-button>
            </el-tooltip>
          </div>
        </el-form-item>
      </div>
    </el-form>

    <div>
      <el-row class="mgb10">
        <el-col :span="12">
          <el-button @click="handleAddNewValue" v-if="isAddAble">
            <i class="fa fa-plus" aria-hidden="true"></i>
            Thêm giá trị
          </el-button>
        </el-col>
        <el-col :span="12" class="pull-right">
          <el-input
            v-model="keywordSearchTable"
            prefix-icon="el-icon-search"
            placeholder="Tìm kiếm"
          ></el-input>
        </el-col>
        <div class="clearfix"></div>
      </el-row>
    </div>

    <table
      class="table table-condensed"
    >
      <thead>
      <tr>
        <th></th>
        <th>#</th>
        <th>Tham số</th>
        <th>Tên hiển thị</th>
        <th>Mã</th>
        <th>Giá trị</th>
        <th>Mô tả</th>
        <th>Xử lý</th>
      </tr>
      </thead>

      <draggable v-model="searchResult" :options="{handle:'.handleIcon'}" :element="'tbody'" @end="onDragEnd">

        <tr :id="module.Id" :key="module.Id" v-for="(module, index) in searchResult" class="hoverdragable">
          <td style="text-align: center; cursor: pointer;" class="handleIcon">
            <i class="fa fa-bars" aria-hidden="true" style="font-size: 20px; pointer-events: none; color: #999"></i>
          </td>
          <td>{{index + 1}}</td>
          <td>
            <div>
              <span >{{module.Name}}</span>
            </div>
          </td>
          <td>
            <div>
              <span >{{module.Caption}}</span>
            </div>
          </td>
          <td>
            <div>
              <span>{{module.Code}}</span>
            </div>
          </td>
          <td>
            <div>
              <span>{{module.Value}}</span>
            </div>
          </td>
          <td>
            <div>
              <span>{{module.Description}}</span>
            </div>
          </td>
          <td style="display: flex;">
            <el-button size="mini"
                       @click="handleEdit(index, module)" icon="el-icon-edit"></el-button>
            <el-button size="mini"
                       @click="handleDelete($index, module)" icon="el-icon-delete"></el-button>
          </td>
        </tr>
      </draggable>
    </table>
  </div>
</template>
<script>
  import ParameterSetting from '@/components/static/ParameterSetting'
  import ParameterAddingDialog from '@/components/static/ParameterAddingDialog'
  import utilsLibrary from '@/services/utils'
  import Vue from 'vue'
  import draggable from 'vuedraggable'

  export default {
    components: {
      ParameterSetting,
      ParameterAddingDialog,
      draggable
    },
    props: ['settingType'],
    data () {
      return {
        isAddAble: false,
        isSearch: false,
        keywordSearchTable: null,
        codes: [],
        selectedCode: '',
        params: [],
        selectedParam: '',
        selectedParamId: '',
        dataTable: [],
        searchResult: [],
        sessionId: ''
      }
    },
    mounted () {
      var request = {
          RequestClass: 'xBase',
          RequestAction: 'Request',
          TotalRequests: 1,
          R1_RequestTemplate: 'SettingNew.SearchSetting',
          R1_IncludedNestedSetParent: false,
          //R1_Level: 5,
          //R1_ParentCode: 'xSetting.Project.Parameter.CRM2',
          //SessionId: this.sessionId
        }

      if (this.settingType === 'crm') {
        request['R1_Level'] = 5;
        request['R1_ParentCode'] = 'xSetting.Project.Parameter.CRM2';
        this.$Utils.post(request).then(data => {
          this.codes = this.$Utils.getDataWithRoot(data.R1, 'Data.DynamicDS.Setting')
        })
      } else if(this.settingType === 'tool') {
        request['R1_Level'] = 4;
        request['R1_ParentCode'] = 'xSetting.Project.Tools';
        this.$Utils.post(request).then(data => {
          this.codes = this.$Utils.getDataWithRoot(data.R1, 'Data.DynamicDS.Setting')
        })

      } else if(this.settingType === 'default')  {
        this.codes = [{
          value: 'xSystem.Setting.xTask',
          label: 'Tham số công việc'
        },
        {
          value: 'xSetting.Project.Parameter.DocumentView',
          label: 'Tham số tài liệu'
        }]
      }
    },
    methods: {
      onDragEnd () {
        let data = arguments[0]
        let dragEl = data.item
        let newIndex = data['newIndex']
        let nextEl = data.target.children[newIndex + 1]
        let isBefore = true
        if (!nextEl) {
          nextEl = data.target.children[data.target.children.length - 2]
          isBefore = false
        }
        this.changePosition(isBefore, dragEl.id, nextEl.id)
      },
      handleAddNewCode (el) {
        var data = {
          parent: {
            Code: 'xSetting.Project.Parameter.CRM2'
          },
          type: 'Parameter.AddNewCode'
        }
        this.showAddingDialog(data)
      },
      handleAddNewParam (el) {
        var data = {
          parent: this.codes.filter(codeObj => codeObj.Code === this.selectedCode)[0],
          type: 'Parameter.AddNewParam'
        }
        this.showAddingDialog(data)
      },
      handleAddNewValue () {
        var data = {
          parent: this.params.filter(param => param.Code === this.selectedParam)[0],
          type: 'Parameter.AddNewValue'
        }
        this.showAddingDialog(data)
      },
      handleCodeChange (value) {
        this.selectedParam = ''
        this.selectedParamId = ''
        this.dataTable = []
        if (value === undefined || value == null || value === '') {
          this.params = []
        } else {
          this.loadCodes(value)
        }

      },
      handleParamChange (value) {
        if (value === undefined || value === null || value === '') {
          this.reload()
          this.isAddAble = false
          this.selectedParamId = ''
        } else {
          this.loadParams(value)
          this.selectedParamId = this.params.filter(ele => {
            return ele.Code === value
          })[0].Id
          this.isAddAble = true
        }
      },
      loadCodes (newCode) {
        var level = 0;
        switch (this.settingType) {
          case "default": level = 5;
            break;
           case "crm": level = 6;
            break;
            case "tool": level = 5;
            break;
          default:
            break;
        }
        var request = {
          RequestClass: 'xBase',
          RequestAction: 'Request',
          TotalRequests: 1,
          R1_RequestTemplate: 'SettingNew.SearchSetting',
          R1_IncludedNestedSetParent: false,
          R1_Level: level,
          R1_ParentCode: newCode,
          SessionId: this.sessionId
        }

        this.$Utils.post(request).then(data => {
          data = this.$Utils.getDataWithRoot(
            data.R1,
            'Data.DynamicDS.Setting'
          )
          if(this.settingType === 'tool')
          this.dataTable = data;
          else this.params = data
          if (newCode === 'xSystem.Setting.xTask') {
            this.params.push({Name: 'Độ ưu tiên', Code: 'TaskPriority'})
          }
        })
      },
      loadParams (newParam) {
        if (!newParam) return
        if (newParam === 'TaskPriority') {
          var request1 = {
            RequestClass: 'xBase',
            RequestAction: 'Request',
            TotalRequests: 1,
            R1_RequestTemplate: 'xEdu.TaskPriority',
            R1_Code: newParam
          }
          utilsLibrary.post(request1).then(data => {
            var lstParameter = utilsLibrary.getDataWithRoot(
              data.R1,
              'Data.DocumentDS.Document'
            )
            $.each(lstParameter, (key, item) => {
              item.Color = item.Lead
            })
            this.dataTable = lstParameter
          })
        } else {
          var request = {
            RequestClass: 'xBase',
            RequestAction: 'Request',
            TotalRequests: 1,
            R1_RequestTemplate: 'SettingNew.SearchSetting',
            R1_IncludedNestedSetParent: false,
            R1_ParentCode: newParam,
            SessionId: this.sessionId
          }
          this.$Utils.post(request).then(data => {
            this.dataTable = this.$Utils.getDataWithRoot(
              data.R1,
              'Data.DynamicDS.Setting'
            )
          })
        }
      },
      reload () {
        this.dataTable = []
      },
      searchData () {
        this.loadParams(this.selectedParam)
      },
      handleEdit (index, row) {
        var data = {
          paramtypes: this.codes,
          parameter: row,
          selectedParam: this.selectedParam
        }
        this.showdialog(data)
      },
      handleDelete (index, row) {
        var vm = this
        vm
          .$confirm(
            'Hành động này không thể hoàn tác. Bạn thực sự muốn xóa bản ghi này?',
            'Cảnh Báo',
            {
              confirmButtonText: 'Xóa',
              cancelButtonText: 'Bỏ qua',
              type: 'warning'
            }
          )
          .then(() => {
            if (vm.selectedParam !== 'TaskPriority') {
              vm.deleteSetting(row)
            } else {
              vm.deletePriority(row)
            }
          })
          .catch(() => {})
      },
      deleteSetting (row) {
        var vm = this
        var request = {
          RequestClass: 'xBase',
          RequestAction: 'Request',
          TotalRequests: 1,
          R1_RequestTemplate: 'SettingNew.Delete',
          R1_Id: row.Id
        }
        vm.$Utils.post(request).then((data) => {
          if (data.success) {
            vm.$Utils.showMessage('success', 'Xóa Thành công')
            vm.searchData()
          } else {
            vm.$Utils.showMessage('error', 'Có lỗi xảy ra')
          }
        })
      },
      deletePriority (row) {
        var vm = this
        var request = {
          RequestClass: 'xBase',
          RequestAction: 'Request',
          TotalRequests: 1,
          R1_RequestTemplate: 'xEdu.TaskPriority.Delete',
          R1_RequestFields: 'Code; Name; Description; Id',
          R1_Id: row.Id
        }
        utilsLibrary.post(request).then((data) => {
          if (data.success) {
            utilsLibrary.showMessage('success', 'Xóa thành công')
            vm.searchData()
          } else {
            utilsLibrary.showMessage('success', 'Không thể xóa bản ghi này')
          }
        })
      },
      showdialog (data) {
        this.$hub.$emit(
          'set-modal-data',
          'Thông tin thiết lập',
          '50%',
          true,
          'left',
          ParameterSetting,
          true,
          '',
          data
        )
      },
      showAddingDialog (data) {
        this.$hub.$emit(
          'set-modal-data',
          'Thông tin tạo mới',
          '50%',
          true,
          'left',
          ParameterAddingDialog,
          true,
          '',
          data
        )
      },
      changePosition (isBefore, dropId, nextId) {
        var request = this.$Lodash.cloneDeep(this.$singleRequest)
        request.R1_RequestTemplate = 'Setting.MoveNode'
        request.R1_Id = dropId
        request.R1_ReferenceId = nextId
        request.R1_NestedSetType = isBefore ? 'MoveToBeforeAnother' : 'MoveToAfterAnother'
        this.$Utils.post(request).then((data) => {
          // this.$Utils.showLoading('stop');
          // this.getAllLevel(option.afterParent.Level, option.data)
          // this.inputData.push()
        })
      }
    },
    created () {
      this.sessionId = this.$getItemLocalStorage(
        this.$localStorageConstant.SessionId
      )
      this.$hub.$on('loadParameter', data => {
        this.searchData()
      })

      this.$hub.$on('Parameter.AddNewCode', code => {
        if (this.settingType === 'crm') {
          this.codes.push(code)
          this.selectedCode = code.Code
          this.handleCodeChange(this.selectedCode)
        }
      })

      this.$hub.$on('Parameter.AddNewParam', newParam => {
        if (this.settingType === 'crm') {
          this.params.push(newParam)
          this.selectedParam = newParam.Code
          this.handleParamChange(this.selectedParam)
        }
      })

      this.$hub.$on('Parameter.AddNewValue', newValue => {
        this.searchData()
      })

      if (this.settingType === 'appInfo') {
        this.params = [{
          Code: 'xSetting.Default.AppInfo'
        }]
        this.selectedParam = this.params[0].Code
        this.handleParamChange(this.selectedParam)
      }

      if (this.settingType === 'rolePermission') {
        this.params = [{
          Code: 'xSetting.Default.Permissions.RoleTemplate'
        }]
        this.selectedParam = this.params[0].Code
        this.handleParamChange(this.selectedParam)
      }
      if (this.settingType === 'projectPermission') {
        this.params = [{
          Code: 'xSetting.Default.Permissions.RoleProjectTemplate'
        }]
        this.selectedParam = this.params[0].Code
        this.handleParamChange(this.selectedParam)
      }
    },
    watch: {
      'selectedParam': function (val) {
        if (!val) {
          this.isAddAble = false
        }
      },
      'keywordSearchTable': function (newVal) {
        this.isSearch = newVal || newVal.trim()
        newVal = this.$Utils.removeVNCharacters(newVal)
        if (this.isSearch) {
          this.searchResult = this.dataTable.filter(ele => {
            let search_data = this.$Utils.removeVNCharacters(Object.values(ele).join('|'))
            return search_data.indexOf(newVal) > -1
          })
        } else {
          this.searchResult = this.dataTable
        }
      },
      'dataTable': function (newVal) {
        this.searchResult = newVal
      }
    },
    destroyed () {
      this.$hub.$off('loadParameter')
      this.$hub.$off('Parameter.AddNewCode')
      this.$hub.$off('Parameter.AddNewParam')
      this.$hub.$off('Parameter.AddNewValue')
    }
  }
</script>
<style scoped lang="scss">
  thead {
    background: #fff;
  }

  tr.hoverdragable {
    background: #fff;
    &.gu-mirror {
      display: table;
    }
  }
  .el-button--text{
    color: #333;
    font-size: 14px;
  }
</style>
