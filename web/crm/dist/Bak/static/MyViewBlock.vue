<template>
  <el-table v-if="data.length > 0"
    :show-header="false"
    :data="data"
    border
    style="width: 100%"
     stripe>
    <el-table-column label="Mã" :width =  "$isMobileDevice ?  '65': actionWith" fixed="left">
      <template slot-scope="scope">
          <span :style="'text-decoration:' + (taskDone.indexOf(scope.row.Status) >-1 ? 'line-through' : '')">
          {{scope.row.Index}}
          </span>
            <i class="fa fa-square pl-2" :style="'color:' + statusColors[scope.row.Status.toUpperCase()]"></i>
            <i  :class="'fa ' + listPriority[scope.row.PriorityId].Value + ' pl-2'" ></i>
            <a href="javascript:void(0)"  v-if="!$isMobileDevice" class="fa fa-pencil pl-2" @click="showTaskDetail(scope.row)"></a>
            <i v-if="scope.row.TotalDownload && !$isMobileDevice" class="fa fa-paperclip" >{{scope.row.TotalDownload}}</i>
            <i v-if="scope.row.TotalComment && !$isMobileDevice" class="fa fa-comments-o" >{{scope.row.TotalComment}}</i>
            <i v-if="!$isMobileDevice" class="fa fa-clock-o" :style="parseFloat(scope.row.overHours+ '')<0?'color: red':'' ">{{scope.row.overHours}}</i>
      </template>
    </el-table-column>
    <el-table-column label="Tên">
      <template slot-scope="scope">
          <a href="javascript:void(0)" @click="showTaskDetail(scope.row)">
              <span :style="'text-decoration:' + (taskDone.indexOf(scope.row.Status) >-1 ? 'line-through' : '')">
                {{scope.row.Name}}
              </span>
          </a>
          <div>
            {{formatDate(scope.row.PlanStartDate)}}&nbsp;|&nbsp;{{scope.row.WorkerName}}
            <i v-if="$isMobileDevice" class="fa fa-clock-o" :style="parseFloat(scope.row.overHours+ '')<0?'color: red':'' ">{{scope.row.overHours}}</i>
            <i v-if="scope.row.TotalDownload && $isMobileDevice" class="fa fa-paperclip" >{{scope.row.TotalDownload}}</i>
            <i v-if="scope.row.TotalComment && $isMobileDevice" class="fa fa-comments-o" >{{scope.row.TotalComment}}</i>
         </div>
      </template>
    </el-table-column>

  </el-table>
</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
  import ShowTaskDetail from "@/components/static/ShowTaskDetail";
  export default {
      inject:[
    'taskDone', 'formatDate', 'statusColors', 'priorityColors', 'listStatus', 'listPriority'
  ],
    props:['data'],
    methods: {
      showTaskDetail(item, flag) {
        if (flag) {
          this.$set(item, 'activeName', flag);
          this.$hub.$emit(
            "set-modal-data",
            'Chi tiết công việc',
            "60%",
            true,
            "center",
            ShowTaskDetail,
            true,
            "",
            item
          );
        } else {
          this.$hub.$emit(
            "set-modal-data",
            'Chi tiết công việc',
            "60%",
            true,
            "center",
            ShowTaskDetail,
            true,
            "",
            item
          );
        }

      }
    },

    data() {
      return {
       pecent:10,
       actionWith : (window.innerWidth / 100)*12,
       nameWith : (window.innerWidth / 100) - this.actionWith
      }
    }
  }
</script>
