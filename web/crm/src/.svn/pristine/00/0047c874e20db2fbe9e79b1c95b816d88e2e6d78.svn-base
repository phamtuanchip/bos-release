<template>
  <el-row v-show="isShowBreadScrum">
    <el-col :span="24" v-if="!isMobile" class="breadcrumbEq d-none d-sm-block">
      <el-row type="flex" justify="end">
        <div v-show="isShowViewOption" class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <router-link to="/timeline" class=""><i class="fa fa-list-alt"> </i> <span> Thời gian</span>
          </router-link>
          <router-link
            :to="{ path: '/dynamic/view-all-task-page',
            // query: {PlanStartDateStartValue: dateValString[0], PlanStartDateEndValue: dateValString[1] }
          }"
            class=""><i class="fa fa-table"></i><span> Danh sách</span></router-link>
          <router-link to="/scrumboard" class=""><i class="fa fa-trello"></i><span>  Bảng</span>
          </router-link>
        </div>
        <div class="rightaligndiv col-xs-9 col-sm-9 col-md-9 col-lg-9">
          <el-date-picker
            size="mini"
            v-model="dateVal"
            type="daterange"
            :clearable="false"
            start-placeholder="Bắt đầu"
            end-placeholder="Kết thúc"
            format="dd/MM/yyyy"
            :picker-options="dateOptions">
          </el-date-picker>
          <el-select v-show="this.$router.currentRoute.path !== '/my-view-page'
              && $router.currentRoute.path !== '/task-summary-table'" v-model="selectedWorkers"
                     placeholder="Lọc nhân sự" size="mini" multiple collapse-tags>
            <el-option
              v-for="w in workers"
              :key="w.UserId"
              :label="w.Username"
              :value="w.UserId">
            </el-option>
          </el-select>
          <el-select v-model="valueGroup" placeholder="Chọn phòng ban" @change="changeDeparment()"
                     v-show="$router.currentRoute.path !== '/timeline' && $router.currentRoute.path !== '/scrumboard'">
            <el-option
              v-for="item in ListProject"
              :key="item.GroupId"
              :label="item.GroupName"
              :value="item.GroupId">
            </el-option>
          </el-select>
        </div>
      </el-row>
    </el-col>

    <el-col v-else class="breadcrumbEq d-md-none d-lg-none d-xl-none">
      <el-row class="text-nowrap">

        <el-col :span="2" v-if="isShowViewOption" class="tac" style="margin-top: 3px;">
          <el-dropdown trigger="click" size="mini">
            <span class="el-dropdown-link">
              <i class="fa fa-list-alt" v-if="$route.name === 'TimeLine'"></i>
              <i class="fa fa-trello" v-if="$route.name === 'scrumboard'"></i>
              <i class="fa fa-table" v-if="$route.name === 'DynamicMain2'"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/timeline" class=""><i class="fa fa-list-alt"> </i> <span> Thời gian</span>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link
                  :to="{ path: '/dynamic/view-all-task-page',
                  // query: {PlanStartDateStartValue: dateValString[0], PlanStartDateEndValue: dateValString[1] }
                }"
                  class=""><i class="fa fa-table"></i><span> Danh sách</span></router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/scrumboard" class=""><i class="fa fa-trello"></i><span>  Bảng</span>
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

        <el-col :span="22">
          <el-select v-model="selectedWorkers" placeholder="Nhân sự" size="mini" multiple collapse-tags
                     v-show="$router.currentRoute.path !== '/my-view-page' && $router.currentRoute.path.indexOf('view-all-task-page') === -1
                              && $router.currentRoute.path !== '/task-summary-table'">
            <el-option
              v-for="w in workers"
              :key="w.UserId"
              :label="w.Username"
              :value="w.UserId">
            </el-option>
          </el-select>
          <el-select v-model="valueGroup" placeholder="Phòng ban" size="mini" @change="changeDeparment()" collapse-tags
                     v-show="$router.currentRoute.path !== '/timeline' && $router.currentRoute.path !== '/scrumboard' && $router.currentRoute.path !== '/daily-report'">
            <el-option
              v-for="item in ListProject"
              :key="item.GroupId"
              :label="item.GroupName"
              :value="item.GroupId">
            </el-option>
          </el-select>
          <el-date-picker popper-class="MobileDateRange"
                          size="mini"
                          v-model="dateVal"
                          type="daterange"
                          start-placeholder="Bắt đầu"
                          end-placeholder="Kết thúc"
                          format="dd/MM/yyyy"
                          :picker-options="dateOptions">
          </el-date-picker>
        </el-col>

      </el-row>
    </el-col>

  </el-row>
</template>

<script>
  import Vue from "vue";
  import utilsLibrary from "@/services/utils";

  Vue.use(require("vue-moment"));

  export default {
    props: {
      list: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    computed: {
      dateValString() {
        if (this.dateVal == null) return this.$rootScope.dateFilter;
        return [
          Vue.moment(this.dateVal[0]).format('YYYY-MM-DD') + 'T00:00:00',
          Vue.moment(this.dateVal[1]).format('YYYY-MM-DD') + 'T23:59:59'
          /* Vue.moment(this.dateVal[0]).format(this.requestDatetimeFormat),
          Vue.moment(this.dateVal[1]).format(this.requestDatetimeFormat) */
        ];
        //else return
      }
    },
    watch: {
      "$route.fullPath": function (fullPath) {
        this.isShowBreadScrum =
          this.showBreadScrumList.filter(item => {
            return this.$route.fullPath.indexOf(item) > -1;
          }).length > 0;
        this.isShowViewOption =
          fullPath.indexOf("dynamic/view-all-task-page") > -1 ||
          fullPath.indexOf("scrumboard") > -1 ||
          fullPath.indexOf("timeline") > -1;
        this.$forceUpdate();
      },
      dateVal(val, old) {
        var start, end, type;
        if (val !== null) {
          start = val[0];
          end = val[1];
        } else {
          start = new Date();
          end = new Date();
        }

        start = new Date(
          start.getFullYear() +
          "/" +
          (start.getMonth() + 1) +
          "/" +
          start.getDate() +
          " 00:00:00"
        );
        end = new Date(
          end.getFullYear() +
          "/" +
          (end.getMonth() + 1) +
          "/" +
          end.getDate() +
          " 23:59:59"
        );
        this.$set(this.$rootScope, "dateFilter", [start, end, this.type]);
        //this.$store.commit("setFilter", [start, end, this.type]);
        this.$hub.$emit("datePicked", [start, end, this.type]);
        this.type = "";
      },
      selectedWorkers(val, old) {
        this.$set(this.$rootScope, 'selectedWorkerId', val);
        this.$hub.$emit("workerPicked", val);
      },
      selectedProjects(val, old) {
        this.$set(this.$rootScope, 'selectedProjectId', val);
        this.$hub.$emit("projectPicked", val);
      },
      valueGroup(val, old){
        this.$set(this.$rootScope, 'selectedGroupId', val);
        this.$hub.$emit("groupPicked", val);
      }
    },
    data() {
      var vm = this;
      var firstDayOfWeekCfg = this.$getItemLocalStorage('firstDayOfWeekCfg') ? parseInt(JSON.parse(this.$getItemLocalStorage('firstDayOfWeekCfg')).Value) : 1;
      return {
        projects: [],
        selectedProjects: [],
        firstDayOfWeekCfg: firstDayOfWeekCfg,
        showBreadScrumList: [
          "/daily-report",
          "/dynamic/view-all-task-page",
          // '/task-block-view',
          "/my-view-page",
          "/timeline",
          "/scrumboard",
          "/dynamic/view-all-task-page",
          "/task-summary-table",
        ],
        isMobile: false,
        isShowBreadScrum: false,
        isShowViewOption: true,
        type: "thisweek",
        dateFilter: "",
        selectedWorkers: [],
        workers: [],
        requestDatetimeFormat: "YYYY-MM-DDThh:mm:ss",
        dateOptions: {
          shortcuts: [
            {
              text: "Hôm trước",
              onClick(picker) {
                var yesterday = Vue.moment().subtract(1, "days")._d;
                picker.$emit("pick", [yesterday, yesterday]);
                vm.type = "yesterday";
              }
            },
            {
              text: "Hôm nay",
              onClick(picker) {
                var now = new Date();
                picker.$emit("pick", [now, now]);
                vm.type = "today";
              }
            },
            {
              text: "Hôm sau",
              onClick(picker) {
                var tomorrow = Vue.moment().add(1, "days")._d;
                picker.$emit("pick", [tomorrow, tomorrow]);
                vm.type = "tomorrow";
              }
            },
            {
              text: "Tuần trước",
              onClick(picker) {
                var dateVal = new Date();
                dateVal.setTime(dateVal.getTime() - 3600 * 1000 * 24 * 7);
                var monday = Vue.moment(dateVal)
                  .isoWeekday(firstDayOfWeekCfg)
                  .startOf("isoweek")._d;
                var sunday = Vue.moment(dateVal)
                  .isoWeekday(firstDayOfWeekCfg)
                  .endOf("isoweek")._d;
                picker.$emit("pick", [monday, sunday]);
                vm.type = "lastweek";
              }
            },
            {
              text: "Tuần này",
              onClick(picker) {
                var dateVal = new Date();
                var monday = Vue.moment(dateVal)
                  .isoWeekday(firstDayOfWeekCfg)
                  .startOf("isoweek")._d;
                var sunday = Vue.moment(dateVal)
                  .isoWeekday(firstDayOfWeekCfg)
                  .endOf("isoweek")._d;
                picker.$emit("pick", [monday, sunday]);
                vm.type = "thisweek";
              }
            },
            {
              text: "Tuần sau",
              onClick(picker) {
                var dateVal = new Date();
                dateVal.setTime(dateVal.getTime() + 3600 * 1000 * 24 * 7);
                var monday = Vue.moment(dateVal)
                  .isoWeekday(1)
                  .startOf("isoweek")._d;
                var sunday = Vue.moment(dateVal)
                  .isoWeekday(firstDayOfWeekCfg)
                  .endOf("isoweek")._d;
                picker.$emit("pick", [monday, sunday]);
                vm.type = "nextweek";
              }
            },
            {
              text: "Tháng trước",
              onClick(picker) {
                var dateVal = new Date();
                var start = new Vue.moment().subtract(1, "months").date(1)._d;
                var end = Vue.moment(start).endOf("month")._d;
                picker.$emit("pick", [start, end]);
                vm.type = "lastmonth";
              }
            },
            {
              text: "Tháng này",
              onClick(picker) {
                var dateVal = new Date();
                var start = Vue.moment([
                  dateVal.getFullYear(),
                  dateVal.getMonth()
                ])._d;
                var end = Vue.moment(start).endOf("month")._d;
                picker.$emit("pick", [start, end]);
                vm.type = "thismonth";
              }
            },
            {
              text: "Tháng sau",
              onClick(picker) {
                var dateVal = new Date();
                var start = new Vue.moment().add(1, "months").date(1)._d;
                var end = Vue.moment(start).endOf("month")._d;
                picker.$emit("pick", [start, end]);
                vm.type = "nextmonth";
              }
            }
          ],
          firstDayOfWeek: firstDayOfWeekCfg,
          onPick(data) {
          }
        },
        currentUser: JSON.parse(localStorage.getItem("LoggedOnUser")),
        user: "",
        groups: "",
        ListProject: [],
        valueGroup: "",
        // ListGroup: [],
        currentProject: {},
        dateVal: ""
      };
    },
    methods: {
      changeDeparment() {
        var item = this.ListProject.filter(val => {
          return val.GroupId === this.valueGroup;
        });
        if (item[0]) this.changeProject(item[0]);
      },
      searchDepartment() {
        // var request = {
        //   RequestAction: "SearchUserWithGroups",
        //   IncludedGroupManager: "true",
        //   RequestClass: "BPM",
        //   RequestDataType: "json",
        //   ConditionFields: "IncludedGroupManager;Group;Status;LoginName;UserId",
        //   StaticFields: "UserId;Username;LoginName;Description;Status;",
        //   DynamicFields:
        //     "Avatar;Facebook;Email;Skype;Birthday;Biography;WorkProcess;Telephone",
        //   StructFields:
        //     "GroupRoot;GroupRootName;PhoneId;PhoneGroup;Public;RoleRoot;RoleRootName;GroupManage;Notification",
        //   OrderFields: "LoginName ASC",
        //   GroupType: "1",
        //   UserId: this.currentUser.UserId,
        //   Status: 1
        // };
        // utilsLibrary.post(request).then(data => {
        //   this.ListGroup = utilsLibrary.getDataWithRoot(data, "Data.UserDS.User");
        //   var requestD = {
        //     RequestClass: "BPM",
        //     RequestAction: "SearchGroup",
        //     ConditionFields: "GroupType,Description,Status,GroupId",
        //     StaticFields:
        //       "GroupId;GroupName;Description;GroupParent;Status;GroupPath",
        //     StructFields: "ParentName",
        //     orderFields: "GroupName ASC",
        //     RequestDataType: "json",
        //     // GroupId: this.ListGroup[0].Groups,
        //
        //     Status: 1,
        //     GroupType: 1
        //   });

        var requestD = this.$Lodash.cloneDeep(this.$singleRequest);
        requestD.R1_RequestTemplate = "tblGroup.Search";
        requestD.R1_RequestDataGroup = "DataGroup.quan-ly-du-an.053gf";
        requestD.R1_RequestFields = "GroupId;GroupName;GroupType;GroupParent;GroupPath;Status;Description;Level;LeftIndex;RightIndex;";
        requestD.R1_GroupType = 1;
        requestD.R1_OrderFields= "GroupName ASC";
        requestD.R1_RequestDataType= "json";
        requestD.R1_Status= 1;
        // request.R1_GroupId = (this.$isSystemAdmin()|| this.$isMantisAdmin())?'':dt.Data.UserDS.User.Groups;
        if (!this.$isSystemAdmin() && !this.$isMantisAdmin()){
          requestD.R1_AssignedUser = this.$getItemLocalStorage(this.$localStorageConstant.SessionId);
        }
          utilsLibrary.postCheckResult(requestD).then(dataD => {
            this.ListProject = utilsLibrary.getDataWithRoot(
              dataD,
              "R1.Data.UserDS.Group"
            );
            this.ListProject.unshift({
                GroupId: "",
                GroupName: "Tất cả"
            });
            if (utilsLibrary.isEmpty(this.user.Project)) {
              if (this.user.Project.GroupName) {
                this.currentProject = this.user.Project;
                if (this.ListProject.length > 0) {
                  var depart = this.ListProject.filter(val => {
                    return val.GroupId === this.user.Project.GroupId;
                  });
                  if (depart.length > 0) {
                    //this.valueGroup = this.user.Project.GroupId;
                  } else {
                    this.currentProject = this.ListProject[0];
                    this.valueGroup = this.currentProject.GroupId;
                    this.changeProject(this.ListProject[0]);
                  }
                } else {
                  this.valueGroup = {};
                }
              } else {
                this.currentProject = this.ListProject[0];
                if (this.ListProject.length > 0) {
                  this.valueGroup = this.currentProject.GroupId;
                  this.changeProject(this.ListProject[0]);
                } else {
                  this.valueGroup = {};
                }
              }
            } else if (this.ListProject.length > 0) {
              this.valueGroup = this.ListProject[0].GroupId;
              this.changeProject(this.ListProject[0]);
            } else {
              this.valueGroup = {};
            }
          });
        // });
      },
      changeProject(item) {
        this.currentProject = item;
        this.ProjectId = this.currentProject.GroupId;
        this.user.Project = item;
        this.$setItemLocalStorage(
          this.$localStorageConstant.LoggedOnUser,
          JSON.stringify(this.user)
        );
        this.$rootScope.loggedOnUser = this.$Lodash.cloneDeep(this.user);
        // var request = {
        //   RequestClass: "BPM",
        //   RequestAction: "UpdateUser",
        //   DynamicFields: "Project",
        //   StaticFields: "UserId",
        //   UserId: this.currentUser.UserId,
        //   Project: JSON.stringify(item)
        // };
        // this.$Utils.post(request).then(data => {
        //   /*if (this.$isSafari === true || this.$isMobile.iOS()) {
        //     window.location.reload(true);
        //   } else {
        //     this.$router.go(this.$router.currentRoute);
        //   }*/
        // });
      },
      isLast(index) {
        return index === this.list.length - 1;
      },
      showName(item) {
        if (item.meta && item.meta.label) {
          item = item.meta && item.meta.label;
        }
        if (item.name) {
          item = item.name;
        }
        return item;
      },
      getProject(filter) {
        var request = this.$Lodash.cloneDeep(this.$singleRequest);
        request.R1_RequestTemplate = "tblGroup.Search";
        request.R1_RequestDataGroup = "DataGroup.quan-ly-du-an.053gf";
        request.R1_RequestFields = "GroupId;Tool;TypeName;GroupName;ManagerName;StatusName;StateName;PermitName;Progress;DepartmentName;PlanManHour;ActualManHour;FinishDate;PriorityName;ProductName;StartDate;Version;Code;CreatedBy;Department;GroupId;Manager;ModifiedBy;Priority;PriorityDescription;PriorityId;State;Status;Type;Permit;Describe;Active;ActiveName;ProjectCode;Department;DepartmentName;Manager;ManagerName;Worker;WorkerName;GroupType";
        request.R1_GroupType = 4;
        this.$Utils.postCheckResult(request).then((data) => {
          this.projects = this.$Utils.getDataWithRoot(data.R1, 'Data.UserDS.Group');
          if (filter) {
            this.projects = this.projects.filter(function (item) {
              return item.Name.toLocaleLowerCase().indexOf(filter.toLowerCase()) > -1;
            })
          }
        });
      }
    },
    destroyed() {
      this.$hub.$off("update-default-date-range");
    },

    created() {
      this.user = this.$Lodash.cloneDeep(this.currentUser);
      this.groups = this.$Lodash.cloneDeep(this.currentUser.Groups);
      this.isShowBreadScrum = this.showBreadScrumList.filter(item => {
          return this.$route.fullPath.indexOf(item) > -1;
        }).length > 0;
      this.$hub.$on("update-default-date-range", data => {
      });
      this.$hub.$on("reloadGroup", data => {
        this.searchDepartment();
        //this.$forceUpdate();
      });
      var request = {
        RequestAction: "SearchUsers",
        RequestClass: "BPM",
        RequestDataType: "json",
        ConditionFields: "Status;LoginName;UserId",
        StaticFields: "UserId;Username;LoginName;Status;",
        OrderFields: "LoginName ASC",
        Status: 1
      };
      this.$Utils.post(request).then(data => {
        this.workers = this.$Utils.getDataWithRoot(data, "Data.UserDS.User");
        this.$set(this.$rootScope, 'allUsers', []);

        var user = JSON.parse(
          this.$getItemLocalStorage(this.$localStorageConstant.LoggedOnUser)
        );
        if (user.LoginName !== "superadmin") {
          this.workers = this.workers.filter((el) => {
            return el.LoginName.indexOf("superadmin") === -1;
          });
        }
        this.workers.filter(user=>{
          this.$rootScope.allUsers.push(user.UserId)
        })
        var temp = this.$Lodash.remove(this.workers, (item) => {
          return item.UserId === user.UserId;
        });
        this.workers.unshift(temp[0]);

        var selectedWorkers = {
          UserId: this.workers
            .map(function (elem) {
              return elem.UserId;
            })
            .join(";"),
          Username: "Tất cả nhân sự"
        };
        this.workers.unshift(selectedWorkers);
      });
      //this.getProject()

      this.$rootScope.application = JSON.parse(
        this.$getItemLocalStorage(
          this.$localStorageConstant.Application
        )
      );
      var start = Vue.moment().isoWeekday(this.firstDayOfWeekCfg).startOf("isoweek")._d;
      var end = Vue.moment().isoWeekday(this.firstDayOfWeekCfg).endOf("isoweek")._d;

      this.isMobile = this.$isMobileDevice;
      this.$set(this.$rootScope, "dateFilter", [start, end, this.type]);
      this.dateVal = [start, end];
      this.isShowViewOption =
        this.$route.fullPath.indexOf("dynamic/view-all-task-page") > -1 ||
        this.$route.fullPath.indexOf("scrumboard") > -1 ||
        this.$route.fullPath.indexOf("timeline") > -1;

      this.searchDepartment();
    }

  };
</script>
<style lang="scss">
  .breadcrumbEq {
    background-color: white;
    padding: 1.5px;
    border-bottom: 1px solid #c2cfd6;

    .rightaligndiv {
      text-align: right;
      padding-right: 5px;
    }
    .naviCenter {
      text-align: right;
      padding-right: 5px;
    }

    @media (max-width: 468px) {
      .el-input--mini .el-input__inner {
        width: 170px;
      }

      .el-range-editor--mini.el-input__inner{
        width: 190px;
      }

      @media (max-width: 375px) {
        .el-input--mini .el-input__inner {
          width: 150px;
        }

        .el-range-editor--mini.el-input__inner{
          width: 180px;
        }
      }
    }




  }
</style>
