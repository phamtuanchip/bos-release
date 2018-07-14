<template>
    <div class="gantt-header">
        <div class="gantt-header-navigator">
          
                <div class="InlineFilter mt-2" v-if="!$isMobileDevice">
                     <ProjectFilter :onChangeWorker="onChangeWorker"
                      :onChangeDate="onChangeDate"
                      :onChangeStatus="onChangeStatus"
                      :onChangeActive="onChangeActive"
                      :onChangeDueDate="onChangeDueDate"
                      :onChangeOverDue="onChangeOverDue"
                      :onResetFilter="resetFilter" 
                      :onCloseFilter="closeFilter"                           
                      :workers="users"
                      :status="status" ></ProjectFilter>
               </div>
                <div v-if="$isMobileDevice" class="gantt-header-today">
                 <i class="AdvFilter fa fa-filter" v-b-modal.GanttFilter></i>
                </div>
               <b-modal class="chartFilter text-primary" id="GanttFilter" ref="GanttFilter" title="Bộ lọc"  header-bg-variant="primary" hide-footer>
                <template>
                    <ProjectFilter :onChangeWorker="onChangeWorker"
                      :onChangeDate="onChangeDate"
                      :onChangeStatus="onChangeStatus"
                      :onChangeActive="onChangeActive"
                      :onChangeDueDate="onChangeDueDate"
                      :onChangeOverDue="onChangeOverDue"
                      :onResetFilter="resetFilter" 
                      :onCloseFilter="closeFilter"                           
                      :workers="users"
                      :status="status" ></ProjectFilter>
                </template>
               </b-modal>

            <div v-if="$isMobileDevice" class="gantt-header-today">
                <i :class="(isShowTask ? 'fa fa-window-maximize fa-lg' : 'fa fa-columns fa-lg')" @click="switchView"></i>
            </div>    
            <div class="gantt-header-today">
                 <!--<button @click="onView">-->
                   <!--Tuần-->
                <!--</button>-->
                 <!--<button @click="onView">-->
                  <!--Tháng-->
                <!--</button>-->
                  
                <el-button type="text" @click="onToday">
                   Hôm nay
                </el-button>
            </div>
            <div class="gantt-header-arrow">
                <i class="fa fa-arrow-circle-o-left fa-lg"  @click="onPrev"></i>
                <i class="fa fa-arrow-circle-o-right fa-lg" @click="onNext"></i>
            </div>
        </div>
    </div>
</template>
<script>
import ProjectFilter from "@/components/static/ProjectFilter";
export default {
  components: { ProjectFilter },
  name: "ganttHeader",
  props: {
    baseList: {
      type: Array,
      default() {
        return [];
      }
    },
    workers: {
      type: Array,
      default() {
        return [];
      }
    },
    status: {
      type: Object,
      default() {
        return [];
      }
    },
    active: {
      type: Array,
      default() {
        return [
          { Id: "", Name: "Tất cả" },
          { Id: "1", Name: "Đang hoạt động" },
          { Id: "0", Name: "Không hoạt động" }
        ];
      }
    },
    onChangeOverDue: {
      type: Function
    },
    onResetFilter: {
      type: Function
    },
    onChangeDueDate: {
      type: Function
    },
    onChangeActive: {
      type: Function
    },
    onChangeStatus: {
      type: Function
    },
    onChangeProject: {
      type: Function
    },
    onChangeWorker: {
      type: Function
    },
    onChangeDate: {
      type: Function
    },
    onView: {
      type: Function
    },
    onToday: {
      type: Function
    },
    onPrev: {
      type: Function
    },
    onNext: {
      type: Function
    },
    switchView: {
      type: Function
    },
    isShowTask: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  data() {
    return {
      VersionProject: [],
      WorkerProject: [],
      StatusTask: [],
      DateProject: true,
      DueDate: false,
      OverDue: false,
      UserActive: "",
      users: []
    };
  },
  methods: {
    closeFilter() {
      this.$refs.GanttFilter.hide();
    },
    resetFilter() {
      this.DateProject = true;
      this.WorkerProject = "";
      this.StatusTask = "";
      this.DueDate = false;
      this.OverDue = false;
      this.UserActive = "";
      this.onResetFilter(
        this.DateProject,
        this.WorkerProject,
        this.StatusTask,
        this.DueDate,
        this.OverDue,
        this.UserActive
      );
    }
  },
  watch: {
    workers: {
      handler: function(after, before) {
        this.users = after;
      },
      deep: true
    }
  }
};
</script>
<style>
.gantt-header {
  display: flex;
  width: 100%;
  height: 45px;
  line-height: 45px;
  background: #f3f4f5;
  box-sizing: border-box;
  border-left: 2px solid #dcdee2;
  padding: 0 10px;
}
/* .gantt-header .Status {
  width: 100px !important;
} */

.gantt-header-navigator {
  color: #8d919a;
  right: 10px;
  position: absolute;
  display: inline-flex;
}
.gantt-header-navigator > div {
  margin-right: 10px;
}
.gantt-header-navigator > div:last-child {
  margin-right: 0;
}
.gantt-header-arrow button {
  margin-left: 0;
}
</style>
