<template>
       <el-collapse v-model="activeNames" >
            <el-collapse-item :name="name">
              <template slot="title">
                <div class="title-box"><i class="fa fa-2x fa-clock-o ml-3 mr-3"></i><span class="h4">Hoạt động</span></div>
              </template>
              <div class="row">
                <div class="scrollActive">
                  <div class="timeline">
                    <div>
                      <div class="line text-muted"></div>
                      <article v-if="myData" class="panel panel-primary" v-for="item in myData" :key="item.Id">
                        <!-- Icon -->
                        <div class="panel-heading icon">
                          <i v-if="item.eType == 'CREATED'" class="fa fa-lg fa-calendar-plus-o"></i>
                          <i v-if="item.eType == 'UPDATED'" class="fa fa-lg fa-calendar-check-o"></i>
                          <i v-if="item.eType == 'COMMENTED'" class="fa fa-lg fa-commenting-o"></i>
                          <i v-if="item.eType == 'REPLIED'" class="fa fa-lg fa-comments-o"></i>
                          <i v-if="item.eType == 'SEEN'" class="fa fa-lg fa-eye"></i>
                        </div>
                        <!-- /Icon -->
                        <div class="card-timeline">
                          <div class="row m-0 p-0">
                            <div class="col-3 pl-1 text-center mt-3">
                              <img class="timeline-avatar rounded-circle" :alt="item.WorkerName"  :src="item.Avatar">
                            </div>
                            <div class="col-9 pl-0">
                              <div class="tl-contentName">
                                <span>{{item.WorkerName}} <b>{{item.Type}} </b>({{item.eType}})</span>
                                &nbsp; &nbsp;

                              </div>
                              <div class="tl-contentDate">{{getDayName(item.Modified)}}</div>
                            </div>
                            <div class="m-2">
                              <a href="javascript:void(0)" @click="showTaskDetail(item)">
                                <span :style="'text-decoration:' + (taskDone.indexOf(item.Status) >-1 ? 'line-through' : '')">
                                  {{item.Name}}
                                </span>
                              </a>
                            </div>
                            <div class="m-2">
                               <span style="cursor: pointer">
                                  <i class="fa fa-flag-o " v-if="!(item.Subscribe && item.Subscribe.indexOf($Utils.getUserInfo('UserId'))!=-1)" @click="subscribeMe(item, false)" style="cursor: pointer"></i>
                                  <i class="fa fa-flag-o "  v-else style="color: red" @click="subscribeMe(item, true)"></i>
                                </span>
                               <i class="fa fa-clock-o pl-2" :style="parseFloat(overHours(item)+ '')<0?'color: red':'' ">{{overHours(item)}}</i>
                               <el-badge v-if="item.TotalDownload"  :value="item.TotalDownload" :max="99">
                               <i class="fa fa-paperclip pl-2" ></i>
                               </el-badge>
                               <el-badge v-if="item.TotalComment" :value="item.TotalComment" :max="99">
                               <i  class="fa fa-comments-o pl-2" ></i>
                               </el-badge>
                                <el-badge v-if="item.UserList" :value="totalView(item.UserList)" :max="99">
                                  <i  class="fa fa-eye pl-2" ></i>
                                </el-badge>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>

              </div>
            </el-collapse-item>
          </el-collapse>
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
  inject: [
    "taskDone",
    "statusColors",
    "priorityColors",
    "listStatus",
    "listPriority",
    "subscribeMe",
    "getDayName",
    "formatDate",
    "overHours",
    "totalView"
  ],
  props: ["name", "display", "data", "type", "numberIndex", "total"],
  methods: {
    showTaskDetail(item, flag) {
      if (flag) {
        this.$set(item, "activeName", flag);
        this.$hub.$emit(
          "set-modal-data",
          "Chi tiết công việc",
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
          "Chi tiết công việc",
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
      myData: [],
      activeNames: [this.name],
      pecent: 10,
      actionWith: window.innerWidth / 100 * 12,
      nameWith: window.innerWidth / 100 - this.actionWith
    };
  },
  watch: {
    data: function(newVal) {
      this.myData = newVal;
    }
  },
  created() {
    this.$hub.$on("subscribe", item => {
      this.myData = this.myData.map(ele => {
        if (ele.Id == item.task.Id) ele = item.task;
        return ele;
      });
    });
  }
};
</script>
