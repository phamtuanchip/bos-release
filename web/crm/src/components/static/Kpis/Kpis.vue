/**
* Kpis Component
*
* Created by dbinh on 27/03/2018.
*/

<script>
  import CreateEditKpiDialog from './CreateEditKpiDialog'
  import ElTableTreeColumn from  'element-tree-grid'
  import ElTreeGrid from 'element-tree-grid';

  export default {
    name: 'Kpis',
    components: {
      CreateEditKpiDialog,ElTreeGrid,ElTableTreeColumn
    },
    props: {},
    data () {
      return {
        kpis: [],
        showKpiDialog: false,
        kpiDialogType: null,
        kpiEditing: {
          Type: '',
          Status: '',
          Feature: '',
          Manager: '',
          Category: '',
          Categories: '',
          Planned: 0,
          State: 0,
          Priority: 0,
          PlanStartDate: '',
          PlanFinishDate: '',
          Milestone: '',
        },
        keywordSearchKpi: null,
        isSearch: false,
        searchResult: []
      }
    },
    methods: {
      requestGetKpis: function () {
        var taskList = [];
        var taskRequest = this.$Lodash.cloneDeep(this.$singleRequest);
        taskRequest.R1_RequestTemplate = "AG_Task_Task.Search";
        taskRequest.R1_RequestDataGroup = "DataGroup.kpi.03adg";
        taskRequest.R1_RequestFields = "Type;TypeName;Status;StatusName;Category;CategoryName;Categories;CategoriesName;" +
          "FeatureName;Manager;ManagerName;Planned;State;Priority;Milestone;MilestoneName;PlanStartDate;PlanFinishDate;Id;Code;Created;CreatedBy;;CreatedByName;Modified;ModifiedByName;";
        taskRequest.R1_Code = 'KPI';
        this.$Utils.post(taskRequest).then((tasks) => {
          this.kpis = this.$Utils.getDataWithRoot(
            tasks,
            "R1.Data.TasksDS.Task"
          );
          // this.$forceUpdate();
        });
        console.log(taskList)
        return taskList;
      },
      handleCreateKpi: function () {
        this.kpiDialogType = 'create'
        this.showKpiDialog = true
      },
      handleEditKpi: function (id) {
        this.kpiEditing = this.kpis.filter(kpi => kpi.id === id)[0]
        console.log(this.$Lodash.cloneDeep('this.kpiEditing', this.kpiEditing))
        if (!this.kpiEditing) return
        this.kpiDialogType = 'edit'
        this.showKpiDialog = true
      },
      updateKpi: function (kpi) {
        // this.$set(this.kpis, this.kpis.findIndex(_kpi => _kpi.id === kpi.id), kpi)
        this.requestGetKpis();
        this.showKpiDialog = false
        this.kpiEditing = null
        this.$message({
          type: 'success',
          message: 'Đã cập nhật'
        })
      },
      createKpi: function (kpi) {
        // //TODO id test
        // kpi.id = this.$Utils.uuidv4()
        // this.kpis = [
        //   kpi,
        //   ...this.kpis
        // ]
        this.requestGetKpis();
        this.showKpiDialog = false
        this.$message({
          type: 'success',
          message: 'Đã thêm'
        })
      },
      deleteKpi: function (id) {
        console.log('id', id)
        if (!id) return
        this.$confirm('Xóa KPI này?', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Hủy xóa',
          type: 'warning'
        }).then(() => {
          this.kpis = this.kpis.filter(kpi => kpi.id !== id)
          this.$message({
            type: 'success',
            message: 'Đã xóa'
          });
        })
      },
      solveColorProgress (percent = 0) {
        if (percent > 90) {
          return 'full'
        }
        if (percent > 50) {
          return 'medium'
        }
        if (percent > 25) {
          return 'little'
        }
        return 'empty'
      }
    },
    created: function () {
      this.requestGetKpis()
    },
    watch: {
      keywordSearchKpi: function (newval) {
        this.isSearch = newval || newval.trim()
        newval = this.$Utils.removeVNCharacters(newval)
        if (this.isSearch) {
          this.searchResult = this.kpis.filter(ele => {
            let search_data = this.$Utils.removeVNCharacters(Object.values(ele).join('|'))
            return search_data.indexOf(newval) > -1
          })
        } else {
          this.searchResult = this.kpis
        }
      },
      showKpiDialog: function (newVal) {
        if (newVal === false) {
          this.kpiDialogType = null
          this.kpiEditing = null
        }
      }
    }
  }
</script>

<template>
  <div class="Kpis__ROOT">
    <div class="panel__wrapper flex" style="justify-content: space-between">
      <div class="group-button">
        <el-button
          type="primary"
          @click="handleCreateKpi"
        >
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
      <div class="search mgt5 mgb5">
        <el-input
          v-model="keywordSearchKpi"
          prefix-icon="el-icon-search"
          placeholder="Tìm kiếm"
        ></el-input>
      </div>
    </div>
    <el-table
      :data="isSearch ? searchResult : kpis"
      style="width: 100%"
      :highlight-current-row="true"
      stripe
      height="calc(100vh - 150px)"
    >
      <el-table-tree-column prop="Name" label="Tên" levelKey="level" treeKey="Id" parentKey="ParentId"></el-table-tree-column>
      <el-table-column
        type="index"
        width="40"
        align="center"
        header-align="center"
      >
      </el-table-column>

      <el-table-column prop="TypeName" label="Cấp độ"></el-table-column>
      <el-table-column prop="StatusName" label="Đối tượng"></el-table-column>
      <el-table-column prop="FeatureName" label="Lựa chọn KPIs" width="250"></el-table-column>
      <el-table-column prop="ManagerName" label="Đơn vị"></el-table-column>
      <el-table-column prop="Planned" label="KPIs kế hoạch"></el-table-column>
      <el-table-column prop="State" label="KPIs thực tế"></el-table-column>
      <el-table-column prop="Priority" label="Tỷ lệ đạt (%)" width="150px"></el-table-column>
      <el-table-column prop="MilestoneName" label="Loại thời gian"></el-table-column>
      <el-table-column prop="PlanStartDate" label="Thời gian bắt đầu">
        <template slot-scope="{row}">
          {{new Date(row.PlanStartDate).toLocaleDateString()}}
        </template>
      </el-table-column>
      <el-table-column prop="PlanFinishDate" label="Thời gian kết thúc">
        <template slot-scope="{row}">
          {{new Date(row.PlanFinishDate).toLocaleDateString()}}
        </template>
      </el-table-column>
      <el-table-column label="Hành động" fixed="right">
        <template slot-scope="scope">
          <el-button @click="handleEditKpi(scope.row.id)">
            <i class="fa fa-pencil"></i>
          </el-button>
          <el-button
            type="danger"
            @click="deleteKpi(scope.row.id)"
            style="margin: 3px 0;"
          >
            <i class="fa fa-trash"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="dialog__wrapper">
      <el-dialog
        :title="kpiDialogType === 'edit' ? 'Chỉnh sửa KPI': 'Tạo mới KPI'"
        :visible.sync="showKpiDialog"
        :width="$isMobileDevice ? '100%' : '70%'"
      >
        <CreateEditKpiDialog
          :key="kpiEditing && kpiEditing.id"
          :type="kpiDialogType"
          :kpi="kpiEditing"
          :onCreate="createKpi"
          :onEdit="updateKpi"
          :onCancelCreate="() => {showKpiDialog = false}"
          :onCancelEdit="() => {showKpiDialog = false}"
        />
      </el-dialog>
    </div>
  </div>
</template>

<style scope lang="scss">
  .el-progress .el-progress__text {
    font-size: 12.4px !important;
  }
  .el-progress {
    &.full {
      .el-progress-bar__inner {
        background: #67c23a;
      }
    }
    &.medium {
      .el-progress-bar__inner {
        background: #409eff;
      }
    }
    &.little {
      .el-progress-bar__inner {
        background: #ffc441;
      }
    }
    &.empty {
      .el-progress-bar__inner {
        background: #f56c6c;
      }
    }
  }
</style>
