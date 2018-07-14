/**
* Targets Component
*
* Created by dbinh on 27/03/2018.
*/

<script>
  import api from '@/services/api'
  import CreateEditTargetDialog from './CreateEditTargetDialog'

  const TARGET_EXP = {
    department: 'company',
    indicator: 'total_lead',
    unit: 'lead',
    fomular: `COUNT('lead')`
  }
  export default {
    name: 'Targets',
    components: {
      CreateEditTargetDialog
    },
    props: {},
    data () {
      return {
        targets: [],
        showTargetDialog: false,
        targetDialogType: null,
        targetEditing: null,
        keywordSearchTarget: null,
        isSearch: false,
        searchResult: []
      }
    },
    methods: {
      requestGetTargets: function () {
        api.getTarget()
          .then(data => {
            this.targets = data
          })
      },
      handleCreateTarget: function () {
        this.targetDialogType = 'create'
        this.showTargetDialog = true
      },
      handleEditTarget: function (id) {
        this.targetEditing = this.targets.filter(target => target.Id === id)[0]
        if (!this.targetEditing) return
        this.targetDialogType = 'edit'
        this.showTargetDialog = true
      },
      updateTarget: function (target) {
        this.$set(this.targets, this.targets.findIndex(_target => _target.id === target.id), target)
        this.showTargetDialog = false
        this.targetEditing = null
        this.$message({
          type: 'success',
          message: 'Đã cập nhật'
        });
      },
      createTarget: function (target) {
        this.targets = [
          target,
          ...this.targets,
        ]
        this.showTargetDialog = false
        this.$message({
          type: 'success',
          message: 'Đã thêm'
        });
      },
      deleteTarget: function (id) {
        console.log('id', id)
        if (!id) return
        this.$confirm('Xóa Mục tiêu này?', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Hủy xóa',
          type: 'warning'
        }).then(() => {
          api.deleteTarget(id)
            .then(isSuccess => {
              this.targets = this.targets.filter(target => target.Id !== id)
              this.$message({
                type: 'success',
                message: 'Đã xóa'
              });
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: 'Lỗi khi xóa'
              });
            })
        })
      }
    },
    created: function () {
      this.targets = this.requestGetTargets()
    },
    watch: {
      keywordSearchTarget: function (newval) {
        this.isSearch = newval || newval.trim()
        newval = this.$Utils.removeVNCharacters(newval)
        if (this.isSearch) {
          this.searchResult = this.targets.filter(ele => {
            let search_data = this.$Utils.removeVNCharacters(Object.values(ele).join('|'))
            return search_data.indexOf(newval) > -1
          })
        } else {
          this.searchResult = this.targets
        }
      },
      showTargetDialog: function (newVal) {
        if (newVal === false) {
          this.targetDialogType = null
          this.targetEditing = null
        }
      }
    }
  }
</script>

<template>
    <div class="Targets__ROOT">
      <div class="panel__wrapper flex" style="justify-content: space-between">
        <div class="group-button">
          <el-button
            type="primary"
            @click="handleCreateTarget"
          >
            <i class="el-icon-plus"></i>
          </el-button>
        </div>
        <div class="search mgt5 mgb5">
          <el-input
            v-model="keywordSearchTarget"
            prefix-icon="el-icon-search"
            placeholder="Tìm kiếm"
          ></el-input>
        </div>
      </div>
      <el-table
        :data="isSearch ? searchResult : targets"
        style="width: 100%"
        stripe
      >
        <el-table-column
          type="index"
          width="40"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column prop="TypeName" label="Bộ phận"></el-table-column>
        <el-table-column prop="Description" label="Chỉ số"></el-table-column>
        <el-table-column prop="ManagerName" label="Đơn vị"></el-table-column>
        <el-table-column prop="Categories" label="Công thức"></el-table-column>
        <el-table-column label="Hành động">
          <template slot-scope="scope">
            <el-button @click="handleEditTarget(scope.row.Id)">Sửa</el-button>
            <el-button
              type="danger"
              @click="deleteTarget(scope.row.Id)"
            >Xóa</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="dialog__wrapper">
        <el-dialog
          :title="targetDialogType === 'edit' ? 'Chỉnh sửa mục tiêu': 'Tạo mới mục tiêu'"
          :visible.sync="showTargetDialog"
          :width="$isMobileDevice ? '100%' : '70%'"
        >
          <CreateEditTargetDialog
            :key="targetEditing && targetEditing.id"
            :type="targetDialogType"
            :target="targetEditing"
            :onCreate="createTarget"
            :onEdit="updateTarget"
            :onCancelCreate="() => {showTargetDialog = false}"
            :onCancelEdit="() => {showTargetDialog = false}"
          />
        </el-dialog>
      </div>
    </div>
</template>
