<template lang="html">
  <div id="grouptreegrid mt-2" class="GroupTreeGrid">
    <el-row>
      <el-col  :span="12">
        <el-button size="mini" @click="showCreatedDepartment()" icon="fa fa-plus"/>
      </el-col>
      <el-col :span="12">
          <el-input placeholder="Nhập từ khóa" v-model="searchText" class="input-with-select" suffix-icon="el-icon-search"/>
      </el-col>
    </el-row>

    <el-table :data="datasource" border>
      <el-table-tree-column prop="label" label="Tên" levelKey="level" treeKey="Id" parentKey="ParentId">
      </el-table-tree-column>
      <el-table-column prop="code" label="Mã" :show-overflow-tooltip="true" width="150px">
      </el-table-column>
      <el-table-column prop="des" label="Mô tả" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="user" label="Nhân sự" :show-overflow-tooltip="true" width="350px">
        <template slot-scope="scope">
          <el-tag size="mini" v-for="user in (groupsUserData[scope.row.Id] && groupsUserData[scope.row.Id].slice(0, 10))" :key="user.UserId">
            {{user && user.Username}}
          </el-tag>
          <el-tag v-if="groupsUserData[scope.row.Id] && groupsUserData[scope.row.Id].length > 10">...</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Hành động" width="150px">
        <template slot-scope="scope">
          <div style="text-align: center">
            <el-button type="" icon="el-icon-edit" @click="showCreatedDepartment(scope.row)"/>
            <el-button type="" icon="el-icon-delete" @click="onDelete(scope.row)"/>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ElTableTreeColumn from 'element-tree-grid'
import ElTreeGrid from 'element-tree-grid'
import ShowCrDepartment from '@/components/static/ShowCrDepartment'
import API from '@/services/api'

export default {
  name: 'example',
  components: {
    ElTreeGrid,
    ElTableTreeColumn
  },
  props: ['datasource', 'group', 'checkRadio', 'title'],
  data () {
    return {
      searchText: '',
      props: {
        stripe: true,
        border: true,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: false,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false,
        datasource: []
      },
      groupsUserData: {},
      columns: [
        {
          label: 'Tên',
          prop: 'label',
          minWidth: '100px'
        },
        {
          label: 'Mã',
          prop: 'code',
          minWidth: '50px'
        },
        {
          label: 'Mô tả',
          prop: 'des'
        },
        {
          label: 'Nhân sự',
          prop: 'user'
        }
      ],
      listSystemUser: []
    }
  },
  watch: {
    searchText: function (newVal) {
      this.$parent.$emit('search', this.searchText)
    }
  },
  computed: {
    propList () {
      return Object.keys(this.props).map(item => ({
        name: item
      }))
    }
  },
  methods: {
    search (event) {},
    reload () {
      this.$parent.$emit('reload')
      this.getGroupObjAttachUser()
    },
    onDelete (data) {
      var ctrl = this
      var sessionId = this.$getItemLocalStorage(
        this.$localStorageConstant.SessionId
      )
      var item = data
      this.$confirm('Bạn chắc chắn muốn xóa ' + this.title + ' ' + item.label, 'Cảnh báo', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Bỏ qua',
        type: 'warning'
      }).then(() => {
        var request = this.$Lodash.cloneDeep(this.$singleRequest)
        request.R1_RequestTemplate = 'OrgnizationList'
        request.R1_GroupParent = item.Id
        this.$Utils.post(request).then(rdata => {
          rdata = this.$Utils.getDataWithRoot(rdata, 'R1.Data.UserDS.Group')
          var arrDelete = rdata
          var deleteRequest = {}
          arrDelete.push(item)
          $.each(arrDelete, (k, value) => {
            if (value.Id !== item.Id) {
              deleteRequest = {
                RequestAction: 'DeleteGroup',
                RequestClass: 'BPM',
                ConditionFields: 'GroupId;',
                GroupId: value.GroupId,
                SessionId: sessionId
              }
              ctrl.$Utils.post(deleteRequest).then(dldata => {
              })
            } else {
              deleteRequest = {
                RequestAction: 'DeleteGroup',
                RequestClass: 'BPM',
                ConditionFields: 'GroupId;',
                GroupId: item.Id,
                SessionId: sessionId
              }
              ctrl.$Utils.post(deleteRequest).then(data => {
                if (data.success) {
                  ctrl.reload()
                  ctrl.$message({
                    type: 'success',
                    message: 'Xóa thành công'
                  })
                  this.$hub.$emit('reloadGroup', 'Reload')
                } else {
                  ctrl.$message({
                    type: 'danger',
                    message: 'Xóa không thành công!'
                  })
                }
              })
            }
          })
        })
      }).catch(() => {
        /* this.$message({
            type: 'info',
            message: 'Hủy xóa!'
          }); */
        });
      },
      showCreatedDepartment(row){
        var titleDialog = "Thêm mới " + this.title;
        var dataToPass = {
          treeSrc: this.datasource,
          groupP:this.group,
          callback: this.reload,
          checkGroup: this.checkRadio,
          groupRole: row && row.groupRole ? row.groupRole : [],

        };
        if(row !== undefined){
          dataToPass.item = row;
          titleDialog = "Chỉnh sửa " + this.title;
        }
        this.$hub.$emit(
        "set-modal-data",
          titleDialog,
        "60%",
        true,
        'center',
        ShowCrDepartment,
        true,
        'showCreatedDepartment',
        dataToPass
      )
    },
    async getUsers () {
      return API.requestGetUser()
        .then(users => {
          this.listSystemUser = users
          return users
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    buildGroupObjAttachUser () {
      let groupObj = {}
      this.listSystemUser.forEach(user => {
        let listGroup = user.Groups ? user.Groups.split(';') : []
        listGroup.forEach(groupId => {
          groupObj[groupId] = this.$Utils.pushWithCheckUnique(groupObj[groupId], user)
        })
      })
      this.groupsUserData = groupObj
      return groupObj
    },
    getGroupObjAttachUser () {
      this.getUsers()
        .then(() => {
          this.buildGroupObjAttachUser()
        })
    }
  },
  created () {
    this.getGroupObjAttachUser()
  }
}
</script>

<style scoped>

</style>

<style lang="scss">
  .GroupTreeGrid {
    .el-table .cell {
      white-space: pre-wrap !important;
    }
    .el-tag--mini {
      margin-right: 3px;
    }
  }
  .grouptreegrid {
    * {
      margin: 0;
      padding: 0;
    }
    .switch-list {
      margin: 20px 0;
      list-style: none;
      overflow: hidden;
    }
    .switch-item {
      margin: 20px;
      float: left;
    }
    .crDepartment{
      background-color: #fff;
    }
    .showCreatedDepartment .el-dialog__header {
      text-align: left;
      background-color: #5090C1;
      color: #fff;
      font-size: 20px;
    }
    .showCreatedDepartment .el-dialog__header .el-dialog__title {
      color: #fff
    }

    .showCreatedDepartment .el-dialog__footer {
      text-align:right
    }

    .showCreatedDepartment .el-dialog__headerbtn .el-dialog__close {
      color: #fff
    }
  }
</style>

