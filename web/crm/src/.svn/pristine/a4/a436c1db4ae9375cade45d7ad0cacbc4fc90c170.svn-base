<template>
  <div class="myView">

    <slick ref="slick" :options="slickOptions" v-if="listStatus && listStatus.length > 0">
      <div class="card" v-for="item in listStatus" :key="item.Id">
        <div class="card-header" :style="item.styleObject">{{item.Name}}</div>
        <div class="card-body text-center">
          <el-tooltip :content="item.Content" placement="top" effect="light">
            <el-progress type="circle" :percentage="item.Percent"
                         :width="$isMobileDevice && !$isMobile.iPad()?50:100"></el-progress>
          </el-tooltip>
        </div>
        <div class="card-footer text-center p-0">
          <a @click="redirectStatus(item.Id)">Xem thêm </a>
        </div>
      </div>
    </slick>

    <div class="row">
      <div class="col-md-8">
        <div v-if="viewModel.map" v-for="group in viewModel.map" :key="group.Id">
          <MyViewBlock v-if="viewModel.dataSource[group.name]"
                       :name="group.name"
                       :display="group.display"
                       :data="viewModel.dataSource[group.name]"
                       :numberIndex="viewModel.numberIndex?viewModel.numberIndex[group.name]:0"
                       :total="viewModel.total?viewModel.total[group.name]:0"
                       :type="group.name"/>
        </div>
      </div>
      <div class="col-md-4">
        <div>
          <MyViewActivity v-if="listTaskTimeline"
                          :name="'Activity'"
                          :display="'Hoạt động'"
                          :data="listTaskTimeline"
                          :numberIndex="0"
                          :total="0"
                          :type="'Activity'"/>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Vue from "vue";
import Slick from "vue-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import MyViewBlock from "@/components/static/MyViewBlock";
import MyViewActivity from "@/components/static/MyViewActivity";
import ShowTaskDetail from "@/components/static/ShowTaskDetail";
const RequestFields =
  "Id;Index;Name;Status;StatusName;PriorityIdName;PriorityId;PlanStartDate;Deadline;Modified;Manager;Worker;WorkerName;TaskRequest;StatusDisplay;StatusDisplayName;TotalDownload;TotalComment;Subscribe;UserList;";
export default {
  inject: [
    "taskDone",
    "formatDate",
    "overHours",
    "listStatus",
    "notDone",
    "getDayName"
  ],
  provide() {
    return {
      showDetailTask: this.showDetailTask
    };
  },
  components: {
    Slick,
    MyViewBlock,
    MyViewActivity
  },

  data() {
    return {
      base: this.$appUri.BaseURL === "/" ? "" : this.$appUri.BaseURL,
      intervalHistory: {},
      showCollapse: true,
      slickOptions: {
        slidesToShow: !this.$isMobileDevice ? 6 : 4,
        slidesToScroll: 1,
        infinite: true
      },
      listStatus: [],
      activeNames: [
        "Knows",
        "Reference",
        "Worker",
        "CreatedBy",
        "Date",
        "Deadline",
        "Resolved",
        "Active",
        "OverDate"
      ],
      redirectUrl: "",
      UserInfor: JSON.parse(this.$Utils.getUserInfo()),
      viewModel: {
        userId: "",
        dataSource: {
          Worker: [],
          CreatedBy: [],
          Resolved: [],
          Date: [],
          Knows: [],
          Manager: [],
          Reference: [],
          Deadline: [],
          OverDate: []
        },
        defaultRecord: 10,
        loading: {},
        limit: {
          Worker: { current: 1, total: 0 },
          CreatedBy: { current: 1, total: 0 },
          Resolved: { current: 1, total: 0 },
          Date: { current: 1, total: 0 },
          Knows: { current: 1, total: 0 },
          Manager: { current: 1, total: 0 },
          Reference: { current: 1, total: 0 },
          Deadline: { current: 1, total: 0 },
          OverDate: { current: 1, total: 0 }
        },
        map: [
          { name: "Knows", label: "Knows", display: " Tôi theo dõi" },
          { name: "Reference", label: "Reference", display: " Tôi liên quan" },
          {
            name: "Worker",
            label: "Worker",
            display: " Tôi nhận (chưa giải quyết)"
          },
          { name: "CreatedBy", label: "CreatedBy", display: " Tôi tạo ra" },
          { name: "Manager", label: "Manager", display: " Tôi quản lý" },
          { name: "Deadline", label: "Worker", display: " Tôi đến hạn" },
          { name: "OverDate", label: "Worker", display: " Tôi quá hạn" },
          { name: "Resolved", label: "Worker", display: " Tôi hoàn thành" },
          { name: "Date", label: "Date", display: " Gần đây" }
        ]
      },
      listTaskTimeline: [],
      idToIndex: [],
      taskIndexTemp: [],
      taskIndexName: [],
      taskIndexContent: [],
      datasource: [],
      listSubscribe: [],
      indexx: 1,
      endIndex: 30,
      viewModelGroup: [],
      listStatuss: [],
      baseList: [],
      lists: [],
      data: [],
      total: 0,
      percent: 0,
      start: "",
      end: "",
      requestDatetimeFormat: "YYYY-MM-DDThh:mm:ss",
      model: {}
    };
  },

  methods: {
    getDataSource(name) {
      return this.viewModel.dataSource[name];
    },
    subscribe(item, isUnsubscribe) {
      var cachedSubscribe = item.Subscribe + "";
      if (isUnsubscribe) {
        item.Subscribe =
          item.Subscribe.split(";")
            .filter(ele => {
              return ele != this.$Utils.getUserInfo("UserId");
            })
            .join(";") + ";";
      } else {
        item.Subscribe =
          (item.Subscribe ? item.Subscribe : "") +
          this.$Utils.getUserInfo("UserId");
      }
      if (!isUnsubscribe) {
        var linkSubcribe = {
          RequestClass: "xBase",
          Parent: item.Id,
          Child: this.$Utils.getUserInfo("UserId"),
          Code: "Subscribe",
          Name: "Subscribe",
          RequestAction: "LinkUserToObject",
          ParentTable: "xObject",
          ChildTable: "tblUser",
          RequestTemplate: "Permission.Insert"
        };
        this.$Utils.post(linkSubcribe).then(ldata => {});

        var linkEmailIns = {
          RequestClass: "xBase",
          Parent: item.Id,
          Child: this.$Utils.getUserInfo("UserId"),
          Code: "Email",
          Name: "Email",
          RequestAction: "LinkUserToObject",
          ParentTable: "xObject",
          ChildTable: "tblUser",
          RequestTemplate: "Permission.Insert"
        };
        this.$Utils.post(linkEmailIns).then(ldata => {});
      } else {
        var linkEmail = {
          RequestAction: "SearchLinked",
          RequestClass: "Addition",
          ConditionFields: "Parent;Code;Child",
          StaticFields: "Code;Child;Parent;Name;Created;Description",
          OrderFields: "Created DESC",
          Parent: item.Id,
          Child: this.$Utils.getUserInfo("UserId"),
          Code: "Subscribe;Email"
        };
        this.$Utils.post(linkEmail).then(result => {
          var arrLink =
            result.TotalCount == 1
              ? [result.Data.DataDS.Linked]
              : result.Data.DataDS.Linked;
          if (arrLink == undefined) return;
          var removeLinks = {
            RequestClass: "xBase",
            RequestAction: "Request",
            TotalRequests: arrLink.length,
            RequestTemplate: "Permission.Remove"
          };
          $.each(arrLink, (key, link) => {
            removeLinks["R" + (key + 1) + "_Id"] = link.Id;
            removeLinks["R" + (key + 1) + "_Parent"] = link.Parent;
            removeLinks["R" + (key + 1) + "_Child"] = link.Child;
            removeLinks["R" + (key + 1) + "_Code"] = link.Code;
          });
          this.$Utils.post(removeLinks).then(data => {});
        });
      }
      var request = {
        RequestClass: "xBase",
        RequestAction: "Request",
        TotalRequests: 1,
        R1_RequestTemplate: "AG_Task_Task.Update",
        R1_RequestDataGroup: "DataGroup.danh-sach-cong-viec.04b66",
        R1_RequestFields: "Id;Subscribe",
        R1_Id: item.Id,
        R1_Subscribe: item.Subscribe
      };
      this.$Utils.post(request).then(data => {
        if (data.success) {
          if (isUnsubscribe) {
            this.viewModel.dataSource["Knows"] = this.viewModel.dataSource[
              "Knows"
            ].filter(ele => {
              return ele.Id != item.Id;
            });
          } else {
            this.viewModel.dataSource["Knows"].push(item);
          }
        } else {
          item.Subscribe = cachedSubscribe;
        }
        this.viewModel.numberIndex["Knows"] = this.viewModel.dataSource[
          "Knows"
        ].length;
        this.viewModel.total["Knows"] = this.viewModel.dataSource[
          "Knows"
        ].length;

        //this.viewModel.dataSource = Object.assign({}, this.viewModel.dataSource);
        this.viewModel.dataSource = JSON.parse(
          JSON.stringify(this.viewModel.dataSource)
        );
        this.listTaskTimeline = JSON.parse(
          JSON.stringify(this.listTaskTimeline)
        );

        this.$forceUpdate();
      });
    },
    redirectStatus(data) {
      // var currentUser = JSON.parse(localStorage.getItem("LoggedOnUser"));
      // var project =
      //   currentUser.Project && currentUser.Project.GroupId
      //     ? currentUser.Project.GroupId
      //     : "";
      var query = {
        Status: data
        // Project: project,
      };

      if (!this.$isMantisAdmin() && !this.$isSystemAdmin()) {
        query;
        query["Worker"] = this.$Utils.getUserInfo("UserId");
        query["WorkerName"] = this.$Utils.getUserInfo("Username");
      }
      this.$router.push({ path: "/dynamic/view-all-task-page", query });
    },
    moment: function(date) {
      return Vue.moment(date);
    },

    next() {
      this.$refs.slick.next();
    },

    prev() {
      this.$refs.slick.prev();
    },

    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
        this.$refs.slick.reSlick();
      });
    },
    showDetailStatus(id) {
      var ctrl = this;
      this.$router.push({
        path: "list",
        query: {
          Status: id,
          PlanStartDateStartValue: ctrl.start,
          PlanStartDateEndValue: ctrl.end,
          Worker:
            !ctrl.$isMantisAdmin() && !ctrl.$isSystemAdmin()
              ? ctrl.UserInfor.UserId
              : "",
          WorkerName:
            !ctrl.$isMantisAdmin() && !ctrl.$isSystemAdmin()
              ? ctrl.UserInfor.Username
              : ""
        }
      });
    },
    showDetailTask(code) {
      var vm = this;
      var filterObject = {};
      $.each(this.model[code], function(k, v) {
        if (vm.$Lodash.isObject(v)) {
          filterObject[k] = vm.$Utils.formatDateTime(v);
        } else if (vm.$Lodash.isString(v) && v != "") {
          filterObject[k] = v;
        }
      });
      if (code != "Date") {
        filterObject.PlanStartDateStartValue = vm.start;
        filterObject.PlanStartDateEndValue = vm.end;
      }
      if (code == "Worker" || code == "CreatedBy") {
        filterObject[code] = this.UserInfor.UserId;
        filterObject[code + "Name"] = this.UserInfor.Username;
      } else if (code == "Deadline") {
        filterObject["Worker"] = vm.UserInfor.UserId;
      } else if (code == "Manager") {
        // $.each(this.viewModel.datasource[code], function(k, v) {
        //   if (!vm.$Utils.isEmpty(filterObject, "Manager")) {
        //     filterObject["Manager"] = "";
        //   }
        //debugger
        filterObject["Manager"] = vm.UserInfor.UserId;
        //});
      } else if (code == "OverDate") {
        filterObject.DeadlineStartValue = new Date();
        filterObject.DeadlineEndValue = vm.end;
      }
      //debugger
      this.$router.push({
        path: "/dynamic/view-all-task-page",
        query: filterObject
      });
    },
    handleChange() {},
    // search history
    /*SearchHistory(s, e) {
      var sessionId = this.$getItemLocalStorage(
        this.$localStorageConstant.SessionId
      );

      var startIndex = s ? s : 0;
      var endIndex = e ? e : this.endIndex;
      var taskRequest = {
        RequestClass: "xBase",
        RequestAction: "Request",
        TotalRequests: 1,
        R1_RequestTemplate: "AG_Task_Task.Search",
        R1_RequestDataGroup: "DataGroup.danh-sach-cong-viec.04b66",
        R1_RequestFields: RequestFields,
        //"Id;Index;Name;Status;Subscribe;PriorityId;PlanStartDate;Deadline;TotalDownload;TotalComment;Project;Modified;UserList;",
        R1_StartIndex: startIndex,
        R1_EndIndex: endIndex,
        R1_RequestOrderFields: "Modified DESC",
        R1_AssignedUser: sessionId
      };
      // if (currentUser.Project.GroupId !== "") {
      //   taskRequest.R1_Project = currentUser.Project.GroupId;
      // } else {
      //   delete taskRequest.R1_Project;
      // }
      this.idToIndex = [];
      this.taskIndexTemp = [];
      this.taskIndexName = [];
      this.taskIndexContent = [];

      this.$Utils.post(taskRequest).then(taskdata => {
        var taskList = this.$Utils.getDataWithRoot(
          taskdata,
          "R1.Data.TasksDS.Task"
        );
        this.viewModel.dataSource.Date = taskList.slice(0, 10);
        this.taskIndexTemp = this.$Lodash
          .chain(taskList)
          .keyBy("Id")
          .value();
        this.idToIndex = Object.keys(this.taskIndexTemp);

        // this.taskIndex = this.taskIndexTemp;
        // this.taskName = this.taskIndexName;
        if (this.idToIndex.length > 0) {
          var requestH = this.$Lodash.cloneDeep(this.$singleRequest);
          requestH.TotalRequests = this.idToIndex.length;
          for (var i = 1; i <= this.idToIndex.length; i++) {
            requestH["R" + i + "_RequestClass"] = "xBase";
            requestH["R" + i + "_RequestAction"] = "Request";
            requestH["R" + i + "_RequestTemplate"] = "ChangedLogs";
            requestH["R" + i + "_SourceId"] = this.idToIndex[i - 1];
            requestH["R" + i + "_StartIndex"] = 0;
            requestH["R" + i + "_EndIndex"] = 1;
            requestH["R" + i + "_Code"] = "ChangedHistory";
            requestH["R" + i + "_RequestOrderFields"] = "Created DESC";
          }

          var temp = [];
          this.$Utils.post(requestH).then(data => {
            for (var i = 1; i <= this.idToIndex.length; i++) {
              var item = this.$Utils.getDataWithRoot(
                data["R" + i],
                "Data.DataDS.Logs"
              );
              if (item[0]) temp.push(item[0]);
            }
            if (
              this.datasource.length == 0 ||
              this.datasource.length != temp.length
            ) {
              this.datasource = temp;
            } else {
              $.each(this.datasource, (key, value) => {
                temp = temp.filter(el => {
                  return (
                    el.Id != value.Id &&
                    new Date(el.Created).getTime() >
                      new Date(value.Created).getTime()
                  );
                });
              });
              if (temp.length > 0) {
                this.datasource = this.datasource.map(ele => {
                  $.each(temp, (key1, value1) => {
                    if (value1.SourceId == ele.SourceId) ele = value1;
                  });
                  return ele;
                });
              } else {
                return;
              }
            }
            var arrLoginNames = [];
            var request = {
              RequestAction: "SearchUsers",
              RequestClass: "BPM",
              RequestDataType: "json",
              StaticFields: "LoginName",
              DynamicFields: "Avatar",
              ConditionFields: "LoginName",
              LoginName: arrLoginNames.toString()
            };
            this.$Utils.post(request).then(users => {
              users = this.$Utils.getDataWithRoot(users, "Data.UserDS.User");
              $.each(this.datasource, (key, source) => {
                $.each(users, (key, user) => {
                  if (user.UserId === source.CreatedBy) {
                    source.Avatar = user.Avatar;
                  }
                });
              });

              this.listTaskTimeline = this.$Lodash.orderBy(
                $.map(this.datasource, (v, i) => {
                  if (this.readHistory(v) == "CREATED") {
                    var type = "Tạo mới";
                  } else if (this.readHistory(v) == "UPDATED") {
                    var type = "Cập nhật";
                  } else if (this.readHistory(v) == "COMMENTED") {
                    var type = "Bình luận";
                  } else if (this.readHistory(v) == "SEEN") {
                    var type = "Đã xem";
                  } else {
                    var type = "Phản hồi";
                  }
                  return this.$Lodash.extend(this.taskIndexTemp[v.SourceId], {
                    Date: v.Created,
                    WorkerName: v.CreatedByName,
                    eType: this.readHistory(v),
                    Avatar: this.loadAvatar(v.Avatar),
                    Type: type
                  });
                }),
                ["Modified"],
                ["desc"]
              );
            });
          });
        } else {
          this.dataSource = [];
          this.listTaskTimeline = [];
        }
      });
    },*/
    IntervalActivity (s, e) {
      // debugger
      var sessionId = this.$getItemLocalStorage(this.$localStorageConstant.SessionId);
      var startIndex = s ? s : 0;
      var endIndex = e ? e : this.endIndex;
      var taskRequest = {
        RequestClass: "xBase",
        RequestAction: "Request",
        TotalRequests: 1,
        R1_RequestTemplate: "AG_Task_Task.Search",
        R1_RequestDataGroup: "DataGroup.danh-sach-cong-viec.04b66",
        R1_RequestFields: RequestFields,
        R1_StartIndex: startIndex,
        R1_EndIndex: endIndex,
        R1_RequestOrderFields: "Modified DESC",
        R1_AssignedUser: sessionId
      };
      this.$Utils.post(taskRequest).then(tasksRes => {
        var tasks = this.$Utils.getDataWithRoot(tasksRes,"R1.Data.TasksDS.Task");
        this.viewModel.dataSource.Date = tasks.slice(0, 10);
        var userIds = [];
        var requestH = this.$Lodash.cloneDeep(this.$singleRequest);

        requestH.TotalRequests = tasks.length;
        for (var i = 1; i <= tasks.length; i++) {
          userIds.push(tasks[i - 1].Id);
          requestH["R" + i + "_RequestClass"] = "xBase";
          requestH["R" + i + "_RequestAction"] = "Request";
          requestH["R" + i + "_RequestTemplate"] = "ChangedLogs";
          requestH["R" + i + "_SourceId"] = tasks[i - 1].Id;
          requestH["R" + i + "_StartIndex"] = 0;
          requestH["R" + i + "_EndIndex"] = 1;
          requestH["R" + i + "_Code"] = "ChangedHistory";
          requestH["R" + i + "_RequestOrderFields"] = "Created DESC";
        }
        var usersObj = {};
        var userReq = {
          RequestAction: "SearchUsers",
          RequestClass: "BPM",
          RequestDataType: "json",
          StaticFields: "UserId",
          DynamicFields: "Avatar",
          ConditionFields: "UserId",
          // UserId: userIds.join(';')
        };
        this.$Utils.post(userReq).then(users => {
          users = this.$Utils.getDataWithRoot(users, "Data.UserDS.User");
          usersObj = this.$Utils.rotateDementionArr(users, 'UserId');
        });
        this.$Utils.post(requestH).then(data => {
          this.listTaskTimeline = [];
          // debugger
          for (var i = 1; i <= tasks.length; i++) {
            var item = this.$Utils.getDataWithRoot(data["R" + i], "Data.DataDS.Logs");
            if (item[0]) {
              var task = tasks[i-1];
              var eType = this.readHistory(item[0]);
              var type = '';
              if (eType == "CREATED") {
                type = "Tạo mới";
              } else if (eType == "UPDATED") {
                type = "Cập nhật";
              } else if (eType == "COMMENTED") {
                type = "Bình luận";
              } else if (eType == "SEEN") {
                type = "Đã xem";
              } else {
                type = "Phản hồi";
              }
              task.Date = item[0].Created;
              task.WorkerName = item[0].CreatedByName;
              task.eType = eType;
              task.Avatar = this.loadAvatar(usersObj[item[0].CreatedBy].Avatar);
              task.Type = type;
            }
            this.listTaskTimeline.push(task);
          }
        });
      });
    },
    loadAvatar(avatar) {
      if (avatar == undefined) avatar = "assets/images/avatars/profile.png";
      avatar = avatar.replace("profile.jpg", "profile.png");
      var strAvatar =
        avatar === "assets/images/avatars/profile.png"
          ? this.$appUri.BaseURL + avatar
          : this.$appUri.BaseURL +
            avatar.replace("/", "") +
            "&Height=50&Width=50";
      return strAvatar;
    },
    readHistory(item) {
      try {
        var colName = JSON.parse(item.Changes)[0].ColumnName;
        if (item.Version == 1) return "CREATED";
        else if (colName === "Comment") return "COMMENTED";
        else if (colName === "Reply") return "REPLIED";
        else if (colName === "Seen") return "SEEN";
        else return "UPDATED";
      } catch (err) {
        return "UPDATED";
      }
    },

    searchData(data) {
      //var ctrl = this;
      var currentUser = JSON.parse(localStorage.getItem("LoggedOnUser"));
      this.lists = this.$Lodash.cloneDeep(this.baseList);
      this.filter = data;
      var statusRequest = {
        RequestClass: "xBase",
        RequestAction: "Request",
        TotalRequests: 1,
        // category
        R1_RequestTemplate: "Setting.SearchBase",
        R1_ParentCode: "xSystem.Setting.xTask.Status"
      };
      this.$Utils.post(statusRequest).then(dt => {
        var listStatus = this.$Utils.getDataWithRoot(
          dt.R1,
          "Data.DynamicDS.Setting"
        );
        this.listStatuss = this.$Utils.getDataWithRoot(
          dt.R1,
          "Data.DynamicDS.Setting"
        );
        var arrTemp = {};
        $.each(listStatus, function(k, v) {
          arrTemp[v.Id] = v.Color;
        });
        var request = this.$Lodash.cloneDeep(this.$singleRequest);
        request.TotalRequests = listStatus.length;
        for (var i = 1; i <= listStatus.length; i++) {
          request["R" + i + "_Status"] = listStatus[i - 1].Id;
          request["R" + i + "_RequestTemplate"] = "AG_Task_Task.Count";
          request["R" + i + "_RequestDataGroup"] =
            "DataGroup.danh-sach-cong-viec.04b66";
          // request['R' + i + '_RequestFields'] = 'PriorityIdName;PlanStartDate;Index;PriorityId;StatusName;';
          request["R" + i + "_PlanStartDateStartValue"] = this.start;
          request["R" + i + "_PlanStartDateEndValue"] = this.end;
          request["R" + i + "_AssignedUser"] = this.$getItemLocalStorage(
            this.$localStorageConstant.SessionId
          );

          if (
            this.$Utils.isEmpty(currentUser.Project, "GroupId") &&
            (!this.$Utils.isEmpty(request["R" + i + "_Project"]) ||
              request["R" + i + "_Project"] === "")
          ) {
            request["R" + i + "_Project"] = currentUser.Project.GroupId;
          }

          if (!this.$isMantisAdmin() && !this.$isSystemAdmin()) {
            request["R" + i + "_Worker"] = currentUser.UserId;
          }
        }

        this.$Utils.post(request).then(data => {
          this.Total = 0;
          this.viewModelGroup = [];
          for (var i = 1; i <= listStatus.length; i++) {
            this.data = this.$Utils.getDataWithRoot(data["R" + i], "Data");
            this.data = parseInt(this.data);
            this.Total += this.data;
          }
          for (var i = 1; i <= listStatus.length; i++) {
            this.data = this.$Utils.getDataWithRoot(data["R" + i], "Data");
            this.data = parseInt(this.data);
            if (this.Total == 0) {
              this.Percent = 0;
            } else {
              this.Percent = parseInt(this.data / this.Total * 100);
            }
            var o = {
              Name: listStatus[i - 1].Name,
              Count: this.data,
              Total: this.Total,
              Id: listStatus[i - 1].Id,
              Color: listStatus[i - 1].Color,
              data: {
                series: [this.Percent, 100 - this.Percent]
              },
              options: {
                donut: true,
                donutWidth: this.obtions,
                showLabel: false,
                width: this.WidthHeight,
                height: this.WidthHeight
              }
            };
            this.viewModelGroup.push(o);
          }
        });
      });
    },
    getComboBox() {
      var requestSearch = this.$Utils.updateParamsSingleRequest(
        this.$Lodash.cloneDeep(this.$singleRequest),
        {
          ParentCode: "xSystem.Setting.xTask.Status",
          RequestOrderFields: "Index ASC",
          RequestTemplate: "Setting.SearchBaseTree"
        }
      );
      this.$Utils.post(requestSearch).then(data => {
        this.viewModel.listStatus = this.$Utils.getDataWithRoot(
          data,
          "R1.Data"
        );
        if (this.viewModel.listStatus.length > 0) {
          this.viewModel.listStatus.unshift({ Id: "", Name: "-Trạng thái-" });
        }
      });
    },
    getTask(type) {
      var currentUser = JSON.parse(localStorage.getItem("LoggedOnUser"));
      var sessionId = this.$getItemLocalStorage(
        this.$localStorageConstant.SessionId
      );
      var arrayMap = this.viewModel.map;
      if (type) {
        arrayMap = [
          arrayMap.find(o => {
            return o.name == type;
          })
        ];
      }
      /*this.arrStatusColor = [];*/
      var request = this.$Lodash.cloneDeep(this.$singleRequest);
      request.TotalRequests = 0;
      $.each(arrayMap, (key, object) => {
        this.viewModel.dataSource[object.name] = [];
        this.viewModel.loading[object.name] = true;
        this.viewModel.numberIndex = {};
        this.viewModel.total = {};
        this.viewModel.Name = {};
        if (!this.viewModel.limit[object.name].current) {
          this.viewModel.limit[object.name].current = 1;
        }
        if (object.name === "Date") return;
        request.TotalRequests++;
        var objectRequest = {
          AssignedUser: sessionId,
          RequestTemplate: "AG_Task_Task.Search",
          RequestDataGroup: "DataGroup.danh-sach-cong-viec.04b66",
          RequestFields: RequestFields,
          // "Id;Index;Name;Status;StatusName;PriorityIdName;PriorityId;PlanStartDate;Deadline;Modified;Manager;Worker;WorkerName;TaskRequest;StatusDisplay;StatusDisplayName;TotalDownload;TotalComment;Subscribe;",
          StartIndex:
            (this.viewModel.limit[object.name].current - 1) *
              this.viewModel.defaultRecord +
            1,
          EndIndex:
            this.viewModel.defaultRecord *
            this.viewModel.limit[object.name].current,
          RequestOrderFields: "Modified DESC"
        };

        if (object.name != "Date") {
          objectRequest.PlanStartDateStartValue = this.$Utils.formatDateTime(
            this.start,
            "YYYY-MM-DDT00:00:00"
          );
          objectRequest.PlanStartDateEndValue = this.$Utils.formatDateTime(
            this.end,
            "YYYY-MM-DDT23:59:59"
          );
        }
        if (object.name === "Deadline") {
          objectRequest.DeadlineStartValue = this.$Utils.formatDateTime(
            new Date()
          );
          objectRequest.DeadlineEndValue = this.$Utils.formatDateTime(
            new Date(),
            "YYYY-MM-DDT23:59:59"
          );
          objectRequest.Status = this.notDone.join(";"); //"db8e700c-78c6-4f35-9477-36e0335888f5;fab4fa55-cf1d-4625-8f65-8b43e832061b;05625d94-3884-4f00-9918-254c1216c6cd;5756c3d9-37a8-4032-bd6c-2a01161b73c7;bbc399a9-a2b4-45ad-b948-32e5623dc021";
        } else if (object.name === "OverDate") {
          objectRequest.DeadlineStartValue = this.$Utils.formatDateTime(
            this.start,
            "YYYY-MM-DDT00:00:00"
          );

          objectRequest.DeadlineEndValue = this.$Utils.formatDateTime(
            new Date()
          );
          objectRequest.Status = this.notDone.join(";"); //"db8e700c-78c6-4f35-9477-36e0335888f5;fab4fa55-cf1d-4625-8f65-8b43e832061b;05625d94-3884-4f00-9918-254c1216c6cd;5756c3d9-37a8-4032-bd6c-2a01161b73c7;bbc399a9-a2b4-45ad-b948-32e5623dc021";
        }
        objectRequest[object.label] = this.UserInfor.UserId;
        if (
          object.name == "Resolved" &&
          (this.$isSystemAdmin() || this.$isMantisAdmin())
        ) {
          objectRequest[object.label] = "";
        }

        var filterObject = {};
        $.each(this.model[object.name], (val, key) => {
          if (this.$Lodash.isObject(key)) {
            filterObject[val] = this.$Utils.formatDateTime(key);
          } else if (this.$Lodash.isString(key)) {
            filterObject[val] = key;
          }
        });

        if (this.$Utils.isEmpty(currentUser.Project, "GroupId")) {
          objectRequest.Project = currentUser.Project.GroupId;
          objectRequest.RequestFields += "Project;ProjectName;";
        }
        request = this.$Utils.updateParamsSingleRequest(
          request,
          filterObject,
          request.TotalRequests
        );
        request = this.$Utils.updateParamsSingleRequest(
          request,
          objectRequest,
          request.TotalRequests
        );

        request.TotalRequests++;

        var objectRequestCount = this.$Lodash.cloneDeep(objectRequest);
        objectRequestCount.RequestTemplate = "AG_Task_Task.Count";
        request = this.$Utils.updateParamsSingleRequest(
          request,
          filterObject,
          request.TotalRequests
        );
        request = this.$Utils.updateParamsSingleRequest(
          request,
          objectRequestCount,
          request.TotalRequests
        );
      });
      this.$Utils.postCheckResult(request).then(data => {
        $.each(arrayMap, (key, object) => {
          if (object.name === "Date") return;
          this.viewModel.loading[object.name] = false;
          this.viewModel.dataSource[object.name] = this.$Utils.getDataWithRoot(
            data,
            "R" + (key * 2 + 1) + ".Data.TasksDS.Task"
          );
          this.viewModel.dataSource[object.name].filter(ele => {
            ele.overHours = this.overHours(ele);
          });
          this.viewModel.limit[object.name].total = Math.ceil(
            this.$Utils.getDataWithRoot(
              data,
              "R" + (key * 2 + 2) + ".Data"
            )[0] / this.viewModel.defaultRecord
          );
          this.viewModel.total[object.name] = this.$Utils.getDataWithRoot(
            data,
            "R" + (key * 2 + 2) + ".Data"
          )[0];
          this.viewModel.numberIndex[object.name] = this.viewModel.dataSource[
            object.name
          ].length;

          if (
            this.$Utils.isEmpty(
              this.viewModel.dataSource[object.name],
              "Name"
            ) &&
            this.viewModel.dataSource[object.name].Name.length > 30
          ) {
            this.viewModel.Name[object.name] =
              this.viewModel.dataSource[object.name].Name.SubString(30) + "...";
          } else {
            this.viewModel.Name[object.name] = this.viewModel.dataSource[
              object.name
            ].Name;
          }

          if (this.viewModel.dataSource[object.name].length < 1) {
            this.viewModel.limit[object.name].current = 0;
          }
        });
      });
    }
  },
  created() {
    this.model = {
      Worker: {
        Status: this.notDone.join(";")
        //"db8e700c-78c6-4f35-9477-36e0335888f5;fab4fa55-cf1d-4625-8f65-8b43e832061b;05625d94-3884-4f00-9918-254c1216c6cd;5756c3d9-37a8-4032-bd6c-2a01161b73c7;bbc399a9-a2b4-45ad-b948-32e5623dc021;"
      },
      Manager: {
        Manager: "Manager"
      },
      CreatedBy: {},
      Resolved: {
        Status: this.taskDone.join(";") //"532e9f1e-f5dc-4e75-b7c9-2bd785bbda67"
      },
      Date: {
        // ModifiedStartValue: this.$Utils.stringToDate(
        //   this.$Utils.getDateTimeByKey("MonthStart")
        // ),
        // ModifiedEndValue: this.$Utils.stringToDate(
        //   this.$Utils.getDateTimeByKey("MonthEnd")
        // )
      },
      Knows: {
        AssignedPermission: "Subscribe"
      },
      Reference: {
        ChosenOne: this.UserInfor.UserId
      },
      Deadline: {
        DeadlineStartValue: this.$Utils.formatDateTime(new Date()),
        DeadlineEndValue: this.$Utils.formatDateTime(
          this.end,
          "YYYY-MM-DDT23:59:59"
        ),
        Status: this.notDone.join(";"),
        //"db8e700c-78c6-4f35-9477-36e0335888f5;fab4fa55-cf1d-4625-8f65-8b43e832061b;05625d94-3884-4f00-9918-254c1216c6cd;5756c3d9-37a8-4032-bd6c-2a01161b73c7;bbc399a9-a2b4-45ad-b948-32e5623dc021;",
        Worker: this.UserInfor.UserId
      },
      OverDate: {
        DeadlineStartValue: this.$Utils.formatDateTime(
          this.end,
          "YYYY-MM-DDT00:00:00"
        ),
        DeadlineEndValue: this.$Utils.formatDateTime(new Date()),
        Status: this.notDone.join(";"),
        //"db8e700c-78c6-4f35-9477-36e0335888f5;fab4fa55-cf1d-4625-8f65-8b43e832061b;05625d94-3884-4f00-9918-254c1216c6cd;5756c3d9-37a8-4032-bd6c-2a01161b73c7;bbc399a9-a2b4-45ad-b948-32e5623dc021;",
        Worker: this.UserInfor.UserId
      }
    };
    // this.viewModel = {
    //   userId: this.UserInfor.UserId,
    //   dataSource: {
    //     Worker: [],
    //     CreatedBy: [],
    //     Resolved: [],
    //     date: [],
    //     Knows: [],
    //     Deadline: [],
    //     OverDate: []
    //   },
    //   defaultRecord: 10,
    //   loading: {},
    //   limit: {
    //     Worker: { current: 1, total: 0 },
    //     Manager: { current: 1, total: 0 },
    //     CreatedBy: { current: 1, total: 0 },
    //     Resolved: { current: 1, total: 0 },
    //     Date: { current: 1, total: 0 },
    //     Knows: { current: 1, total: 0 },
    //     Reference: { current: 1, total: 0 },
    //     Deadline: { current: 1, total: 0 },
    //     OverDate: { current: 1, total: 0 }
    //   },
    //   prefix: "/", //this.$isMobile.iOS() ? '/' : '',
    //   map: [
    //     { name: "Deadline", label: "Worker", display: " Tôi đến hạn" },
    //     { name: "OverDate", label: "Worker", display: " Tôi quá hạn" },
    //     { name: "Knows", label: "Knows", display: " Tôi theo dõi" },
    //     { name: "Manager", label: "Manager", display: " Tôi quản lý" },
    //     //{ name: "Reference", label: "Reference", display: " Tôi liên quan" },
    //     { name: "Worker", label: "Worker", display: " Tôi nhận (chưa giải quyết)" },
    //     { name: "CreatedBy", label: "CreatedBy", display: " Tôi tạo ra" },
    //     { name: "Resolved", label: "Worker", display: "Hoàn thành" },
    //     { name: "Date", label: "Date", display: "Gần đây"}
    //   ],
    //   listStatus: []
    // };
    this.getComboBox();
  },
  watch: {
    viewModelGroup: function(newviewModelGroup) {
      this.listStatus = $.map(newviewModelGroup, (v, i) => {
        return {
          Name: v.Name,
          styleObject: {
            "background-color": v.Color
          },
          Data: v.Count,
          TotalData: v.Total,
          Percent: v.Total == 0 ? 0 : parseInt(v.Count / v.Total * 100),
          Id: v.Id,
          Content: v.Count + "/" + v.Total
        };
      });
    },
    viewModel: function(newviewModel) {
      $.map(newviewModel.map, (v, i) => {
        return {
          Title: v.display,
          Des: "view",
          Conclution:
            newviewModel.numberIndex[v.label] +
            "/" +
            this.viewModel.total[v.label],
          Task: [
            {
              Name: "",
              Index: "",
              Date: "",
              WorkerName: ""
            }
          ]
        };
      });
    }
  },
  destroyed() {
    clearInterval(this.intervalHistory);
    this.$hub.$off("subscribe");
    this.$hub.$off("datePicked");
    this.$hub.$off("groupPicked");
  },
  mounted() {
    var seft = this;
    //this.SearchHistory(0, 30);

    if (this.$rootScope.dateFilter && this.$rootScope.dateFilter.length > 2) {
      this.start =
        Vue.moment(this.$rootScope.dateFilter[0]).format("YYYY-MM-DD") +
        "T00:00:00";
      this.end =
        Vue.moment(this.$rootScope.dateFilter[1]).format("YYYY-MM-DD") +
        "T23:59:59";
    }
    this.$hub.$on("datePicked", data => {
      this.start = Vue.moment(data[0]).format("YYYY-MM-DD") + "T00:00:00";
      this.end = Vue.moment(data[1]).format("YYYY-MM-DD") + "T23:59:59";
      this.searchData();
      this.getTask();
    });
    this.$hub.$on("groupPicked", data => {
      // this.SearchHistory(0, this.endIndex);
      this.IntervalActivity(0, this.endIndex);
      this.searchData();
      this.getTask();
    });
    if (seft.indexx == 1) {
      // seft.SearchHistory();
      seft.IntervalActivity();
    }
    this.intervalHistory = setInterval(() => {
      // seft.SearchHistory(0, seft.endIndex);
      seft.IntervalActivity(0, seft.endIndex);
    }, 30000);
    this.searchData();
    this.getTask();
  }
};
</script>
<style lang="scss">
.myView .el-collapse-item__content {
  padding-bottom: 0px !important;
}

.myView {
  .title-box {
    background-color: #f0f3f5;
    border: 1px solid #c2cfd6;
  }
  .card {
    margin-bottom: 0px;
  }
  .card-body {
    padding: 0em;
  }
}

@media screen and (max-width: 599px) {
  .myView {
    .el-badge__content.is-fixed {
      top: 4px;
      right: 6px;
    }

    .el-badge__content {
      background-color: #f56c6c;
      font-size: 11px;
      height: 15px;
      line-height: 12px;
      padding: 0 4px;
    }
    .card-body {
      padding: 0em;
      font-size: 13px;
    }
    .card-header {
      padding: 0em;
      font-size: 13px;
    }
    .card-footer {
      font-size: 13px;
    }
  }
}

@media screen and (max-width: 768px) {
  .myView .el-collapse-item__content {
    padding-bottom: 0px !important;
  }
  .myView {
    .title-box {
      line-height: 2.5em;
    }
  }
  .myView {
    .el-collapse {
      line-height: 2.5em;
      .el-collapse-item {
        padding-bottom: 0.5em;
        .el-collapse-item__header {
          height: 2.5em;
          line-height: 2.5em;
        }
        .el-collapse-item__arrow {
          line-height: 2.5em;
        }
      }
    }
  }
}

.myView .timeline {
  position: relative;
  padding: 21px 15px 5px;
  margin-top: 4px;
  margin-bottom: 30px;
}

.myView .timeline-avatar {
  width: 40px;
  height: 40px;

  @media (max-width: 768px) {
    @media (min-width: 456px) {
      width: 30px;
      height: 30px;
    }
  }
}

.myView .card-timeline {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 95%;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.14),
    0 2px 2px 0 rgba(0, 0, 0, 0.098), 0 1px 5px 0 rgba(0, 0, 0, 0.084);
}

.myView .text-muted {
  color: #c2cfd6 !important;
}

.myView .timeline .line {
  position: absolute;
  width: 4px;
  display: block;
  background: currentColor;
  top: 0px;
  bottom: 0px;
  margin-left: 25px;
}

.myView .timeline .separator {
  border-top: 1px solid currentColor;
  padding: 5px;
  padding-left: 40px;
  font-style: italic;
  font-size: 0.9em;
  margin-left: 30px;
}

.myView .timeline .line::before {
  top: -4px;
}

.myView .timeline .line::after {
  bottom: -4px;
}

.myView .timeline .line::before,
.myView .timeline .line::after {
  content: "";
  position: absolute;
  left: -4px;
  width: 12px;
  height: 12px;
  display: block;
  border-radius: 50%;
  background: currentColor;
}

.myView .timeline .panel {
  position: relative;
  margin: 10px 0px 21px 65px;
  clear: both;
}

.myView .tl-contentName {
  font-size: 14px;
}

.myView .tl-contentDate {
  font-size: 12px;
}

.myView .timeline .panel::before {
  position: absolute;
  display: block;
  top: 8px;
  left: -24px;
  content: "";
  width: 0px;
  height: 0px;
  border: inherit;
  border-width: 12px;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
}

.myView .contentTask {
  border: 1px solid #c2cfd6 !important;
}

.myView .rightContentTask {
  border-left: 1px solid #63c2de !important;
}

.myView .timeline .panel .panel-heading.icon * {
  font-size: 20px;
  vertical-align: middle;
  line-height: 40px;
}

.myView .timeline .panel .panel-heading.icon {
  position: absolute;
  left: -59px;
  display: block;
  width: 40px;
  height: 40px;
  padding: 0px;
  border-radius: 50%;
  text-align: center;
  float: left;
  background-color: #aaa7c7 !important;
}

/*.myView .el-collapse-item__arrow {*/
/*color: #*/
/*}*/

.myView .scrollActive {
  @media (max-width: 456px) {
    max-height: none;
  }
  max-height: 2000px;
  overflow: auto;
}

.myView .timeline .panel-outline {
  border-color: transparent;
  background: transparent;
  box-shadow: none;
}

.myView .timeline .panel-outline .panel-body {
  padding: 10px 0px;
}

.myView .timeline .panel-outline .panel-heading:not(.icon),
.myView .timeline .panel-outline .panel-footer {
  display: none;
}

.myView .card-header {
  text-align: center;
}

.myView .btn-collapse {
  text-align: end;
  button {
    background-color: #fff;
  }
}

.myView .el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.myView .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.myView .el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.myView .el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.myView .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.myView .boxLeftTask {
  margin: auto !important;
}

.myView .el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.myView .slick-next:before {
  content: ">";
}

.myView .slick-prev:before {
  content: "<";
}

.myView .slick-prev {
  left: -21px;
  background: #ddd !important;
}

.myView .slick-prev:hover {
  background: #b4bccc !important;
}

.myView .slick-next {
  right: -21px;
  background: #ddd !important;
}

.myView .slick-next:hover {
  background: #b4bccc !important;
}

.myView .slick-prev:before,
.myView .slick-next:before {
  font-family: "slick";
  font-size: 20px;
  line-height: 1;
  opacity: 0.75;
  color: white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.myView .slick-prev,
.myView .slick-next {
  font-size: 0;
  line-height: 0;
  position: absolute;
  top: 50%;
  display: block;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  padding: 0;
  cursor: pointer;
  color: transparent;
  border: none;
  outline: none;
  background: transparent;
}

.myView .slick-slider {
  margin: 10px;
}

element.style {
  display: block;
}

slick-theme .slick-next {
  right: -25px;
}

slick-theme .slick-prev,
.slick-next {
  font-size: 0;
  line-height: 0;
  position: absolute;
  top: 50%;
  display: block;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  padding: 0;
  cursor: pointer;
  color: transparent;
  border: none;
  outline: none;
  background: transparent;
}

button {
  align-items: flex-start;
  text-align: center;
  cursor: default;
  color: buttontext;
  background-color: buttonface;
  box-sizing: border-box;
  padding: 2px 6px 3px;
  border-width: 2px;
  border-style: outset;
  border-color: buttonface;
  border-image: initial;
}

user agent stylesheet input,
textarea,
select,
button {
  text-rendering: auto;
  color: initial;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  margin: 0em;
  font: 400 13.3333px Arial;
}

user agent stylesheet input,
textarea,
select,
button,
meter,
progress {
  -webkit-writing-mode: horizontal-tb;
}

user agent stylesheet button {
  -webkit-appearance: button;
}

inherited
  from
  div.slider.one-time.slick-initialized.slick-slider.slick-dotted
  .slick-slider {
  position: relative;
  display: block;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -ms-touch-action: pan-y;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
}
</style>
