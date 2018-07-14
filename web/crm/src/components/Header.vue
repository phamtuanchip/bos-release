<template>
  <div>
    <header class="app-header navbar">
      <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" style="padding: 0.25rem 0.75rem" type="button" @click="mobileSidebarToggle">
        <span class="navbar-toggler-icon"></span>
      </button>
      <strong  id="nav-label" class="navbar-toggler mobile-sidebar-toggler d-lg-none mobile-icon navbar-brand " style="padding: 0.25rem 0.75rem">
        <!-- <span class="navbar-toggler-icon"></span> -->CRM & Sales Tracking
      </strong>
      <b-link class="navbar-brand d-md-down-none" to="/"></b-link>
      <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!--
      <i  id="nav-back"  class="fa-lg icon-arrow-left-circle" @click="back()" v-if="!isHome && $isMobile.iOS()"></i>
       --> 
      <b-nav is-nav-bar :class="isMobile ? '' :'ml-auto' " >
        <b-nav-item class="d-md-down-none" v-if="searchParams.length > 0" v-show="false" >
          <el-select v-model="selectedSearchParam" value-key="Id" >
            <el-option
              v-for="t in searchParams"
              :key="t.Id"
              :label="t.Name"
              :value="t">
            </el-option>
          </el-select>
        </b-nav-item>
        <b-nav-item class="d-md-down" v-if="searchParams.length > 0">
        
        <div class="navbar-collapse" id="searchContent">
          <div class="flex search-content__wrapper">
             <el-autocomplete auto-complete="on"
                           v-model="keyword"
                           :fetch-suggestions="customerSearchAsync"
                           :placeholder="!isMobile ? 'Nhập từ khóa tìm kiếm' : ''"
                           :trigger-on-focus="false"
                           @select="handleDetail"                         
                >
                  
                <i v-if="!isMobile" id="nav-search" slot="suffix" class="font-xl" @click="toggleSearchContent"></i>
                <template slot-scope="props">
                    <el-tooltip class="item" effect="light" placement="left">
                      <div slot="content" v-html="props.item.content"></div>
                      <div class="value"><span v-if="props.item.Name">{{ props.item.Name }}&nbsp</span><span v-if="props.item.Phone">{{ props.item.Phone }}</span></div>
                      <!--
                      <span class="link">{{ props.item.Phone }} - {{ props.item.CompanyName }}</span>
                      -->
                    </el-tooltip>
                    
                </template>
              </el-autocomplete>
          </div>
        </div>
         
        </b-nav-item>
        <b-nav-item >
        <!--  
        <i id="nav-search" class="icon-magnifier icons font-xl mgr10" @click="toggleSearchContent"></i>
        -->
        </b-nav-item>
        <b-nav-item @click="addNewContact" class="d-md-down-none">
          <el-tooltip class="item" effect="dark" content="Thêm liên hệ" placement="top">
            <i class="fa-lg icon-plus"></i>
          </el-tooltip>
        </b-nav-item>
        <b-nav-item v-if="isManage" @click="addNewUser" class="d-md-down-none">
          <el-tooltip class="item" effect="dark" content="Thêm người dùng" placement="top">
            <i class="fa-lg icon-user-follow"></i>
          </el-tooltip>
        </b-nav-item>
<!--         <b-nav-item style="max-width: 120px;">
          <el-select v-model="valueGroup" placeholder="Chọn phòng ban" @change="changeDeparment()">
            <el-option
              v-for="item in ListProject"
              :key="item.GroupId"
              :label="item.GroupName"
              :value="item.GroupId">
            </el-option>
          </el-select>
        </b-nav-item> -->
        <b-nav-item>
          <UserDropdown :loggedUser="user"/>
        </b-nav-item>
        <b-nav-item>
          <ActivityDropdown :datasource="activities" :unread="getCount"/>
        </b-nav-item>
        <!-- <b-nav-item class="d-md-down-none">
          <i class="icon-flag-vn">vn</i>
        </b-nav-item> -->
      </b-nav>
    </header>
  </div>
</template>
<script>
  import UserDropdown from "@/components/static/UserDropdown";
  import ActivityDropdown from "@/components/static/ActivityDropdown";
  import utilsLibrary from "@/services/utils";
  import DynamicPage from "@/components/dynamic/DynamicPage";
  import UserInfo from "@/components/static/UserInfo";
  export default {
    name: "header",
    components: {
      UserDropdown: UserDropdown,
      ActivityDropdown: ActivityDropdown,
      UserInfo
    },
    props: ["currentUser"],
    data() {
      return {
        isShowSearch:true,
        ListField: {},
        searchParamSettings: {},
        searchParams: [],
        selectedSearchParam:{},
        isHome: false,
        isManage: this.$isSystemAdmin() || this.$isMantisAdmin(),
        links: [],
        keyword: "",
        timeout: null,
        user: this.currentUser,
        valueGroup: "",
        groups: this.currentUser.Groups,
        itemgroup: "",
        activities: [],
        itemlist: [],
        sender: "",
        isAvatar: true,
        users: [],
        mscount: 0,
        currentProject: {},
        ProjectId: "",
        ListGroup: [],
        ListProject: [],
        sessionId: "",
        isMobile: false,
        myDevice: "",
        getCount : "0",
        lstAction: {}
      };
    },
    methods: {
      back() {
        window.history.back();
      },
      toggleSearchContent () {

        //$("#nav-search").toggle();
        //$("#searchContent").toggle();
        if(this.isMobile) {
          if(this.isShowSearch) {
            $('#nav-label').toggle()
            $("#searchContent").find("input[type=text]").focus()
          }
        // $("#searchContent").find("input[type=text]").focus()
          else {
            $("#searchContent").find("input[type=text]").blur()
            
          } 
          //$("#searchContent").find("input[type=text]").blur()
          this.isShowSearch =! this.isShowSearch
        }
      },
      getRequest() {return {
        RequestAction: 'SearchUserWithGroups',
        IncludedGroupManager: 'true',
        RequestClass: 'BPM',
        RequestDataType: 'json',
        ConditionFields: 'UserId',
        SessionId: this.$getItemLocalStorage(this.$localStorageConstant.SessionId),
        UserId: this.currentUser.UserId,
        StaticFields: 'Description;'
      }},
      onUpdateMsCount() {
        var request = {
          RequestAction: "SearchUserWithGroups",
          IncludedGroupManager: "true",
          RequestClass: "BPM",
          RequestDataType: "json",
          ConditionFields: "UserId",
          UserId: this.currentUser.UserId,
          StaticFields: "Description;"
        };
        this.$Utils.post(request).then(data => {
          data = this.$Utils.getDataWithRoot(data, "Data.UserDS.User");
          var description = JSON.parse(data[0].Description);
          if (description.NotiCount && this.mscount !== parseInt(description.NotiCount)) {
            this.mscount = parseInt(description.NotiCount);
            this.playAudio().then(()=>{
            }).catch((error)=> {
               console.log('play audio error ', error)
            });
          }
        });
        if (this.$myDevice == "isMobileApp") {
          this.$cordovaPushV5.setBadgeNumber(this.mscount).then((result)=> {
            console.log(result)
          }, function(err) {
            console.log(err)
          });
        }
      },
      playAudio() {
        var audio = new Audio(
          this.$appUri.BaseURL != "/"
            ? [this.$appUri.BaseURL + "assets/alert.mp3"]
            : "assets/alert.mp3"
        );
        return audio.play();
      },

      /* changeGroup() {
          this.groups.forEach(item => {
            if (this.valueGroup == item.GroupId) {
              this.itemgroup = item;
              this.changUser(item);
            }
          });
          this.$router.go();
        }, */
      changeDeparment() {
        var item = this.ListProject.filter(val => {
          return val.GroupId === this.valueGroup;
        });
        if (item[0]) this.changeProject(item[0]);
      },
      searchDeparment() {
        var request = {
          RequestAction: "SearchUserWithGroups",
          IncludedGroupManager: "true",
          RequestClass: "BPM",
          RequestDataType: "json",
          ConditionFields: "IncludedGroupManager;Group;Status;LoginName;UserId",
          StaticFields: "UserId;Username;LoginName;Description;Status;",
          DynamicFields:
            "Avatar;Facebook;Email;Skype;Birthday;Biography;WorkProcess;Telephone",
          StructFields:
            "GroupRoot;GroupRootName;PhoneId;PhoneGroup;Public;RoleRoot;RoleRootName;GroupManage;Notification",
          OrderFields: "LoginName ASC",
          GroupType: "1",
          UserId: this.currentUser.UserId,
          Status: 1
        };
        utilsLibrary.post(request).then(data => {
          this.ListGroup = utilsLibrary.getDataWithRoot(data, "Data.UserDS.User");
          var requestD = {
            RequestClass: "BPM",
            RequestAction: "SearchGroup",
            ConditionFields: "GroupType,Description,Status,GroupId",
            StaticFields:
              "GroupId;GroupName;Description;GroupParent;Status;GroupPath",
            StructFields: "ParentName",
            orderFields: "GroupName ASC",
            RequestDataType: "json",
            GroupId: this.ListGroup[0].Groups,
            Status: 1,
            GroupType: 1
          };
          utilsLibrary.postCheckResult(requestD).then(dataD => {
            this.ListProject = utilsLibrary.getDataWithRoot(
              dataD,
              "UserDS.Group"
            );
            if (utilsLibrary.isEmpty(this.user.Project)) {
              if (this.user.Project.GroupName) {
                this.currentProject = this.user.Project;
                if (this.ListProject.length > 0) {
                  var depart = this.ListProject.filter(val => {
                    return val.GroupId === this.user.Project.GroupId;
                  });
                  if (depart.length > 0) {
                    this.valueGroup = this.user.Project.GroupId;
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
        });
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
        var request = {
          RequestClass: "BPM",
          RequestAction: "UpdateUser",
          DynamicFields: "Project",
          StaticFields: "UserId",
          UserId: this.currentUser.UserId,
          Project: JSON.stringify(item)
        };
        utilsLibrary.post(request).then(data => {
          this.$router.go(this.$router.currentRoute);
        });
      },
      changUser(item) {
        var reqUpdateUser = {
          RequestClass: "BPM",
          RequestAction: "UpdateUser",
          DynamicFields: "Project",
          StaticFields: "UserId",
          UserId: this.user.UserId,
          Project: {
            Description: item.Description,
            GroupId: item.GroupId,
            GroupName: item.GroupName,
            GroupPath: item.GroupPath,
            Status: item.Status
          }
        };
        this.$Utils.post(reqUpdateUser).then(response => {
          if (response.success) {
          }
        });
        var request = {
          RequestClass: "BPM",
          RequestAction: "UpdateUser",
          StructFields:
            "GroupRoot;GroupRootName;PhoneId;PhoneGroup;Public;RoleRoot;RoleRootName;Notification",
          StaticFields: "UserId;Username;LoginName;Description;Status;",
          DynamicFields:
            "Facebook;Email;Skype;Birthday;Biography;WorkProcess;Telephone",
          UserId: this.user.UserId,
          GroupRoot: item.GroupId,
          GroupRootName: item.GroupName
        };
        this.$Utils.post(request).then(response => {
        });
      },
      initialize(url, soa, user) {
        var request = {
          RequestClass: "xBase",
          RequestAction: "Request",
          TotalRequests: 1,
          R1_RequestTemplate: "SettingNew.SearchSetting",
          R1_IncludedNestedSetParent: true,
          R1_Code: "PushServer"
        };
        this.$Utils.post(request).then(data => {
          if (this.$Utils.isEmpty(data)) {
            data = this.$Utils.getDataWithRoot(data.R1, "Data.DynamicDS.Setting");
            //console.log('data apiUrl ', data)
            //var apiUrl = "http://localhost:46658/";
            var apiUrl = data[0] === undefined ? "http://hub.mn.com.vn/" : data[0].Value;

            /* TODO: for test only
              $rootScope.PushServer = angular.copy(apiUrl);
              apiUrl = "http://localhost:46658/";
               apiUrl = "http://hub-test.mn.com.vn/";
               apiUrl = "http://localhost:46658/";
               apiUrl = "http://localhost:51801/";
               soa = "http://localhost:3000";

                 var LoggedOnUser = JSON.parse(
                   this.$getItemLocalStorage(this.$localStorageConstant.LoggedOnUser)
                 );

                 var connection2 = $.hubConnection(apiUrl + "signalr", {
                   useDefaultPath: false
                 });
                 connection2.qs = { url: url, soa: soa, user: user };
                 var proxy2 = connection2.createHubProxy("Messenger");
                  proxy2.on('serverTime',time =>{
                   this.serverTime = time;
                 })
                connection2
                   .start()
                   .done(() => {
                     console.log("connected 2 success!");
                   }).fail(()=>{
                        console.log("connected 2 fail!");
                   });
                   */

            this.$hub.connection = $.hubConnection(apiUrl + "signalr", {
              useDefaultPath: false
            });
            this.$hub.connection.qs = {url: url, soa: soa, user: user};
            this.$hub.proxy = this.$hub.connection.createHubProxy("Messenger");
            var lstGroupId = [];
            $.each(this.user.Groups, (key, value) => {
              if (value) {
                lstGroupId.push(value.GroupId);
              }
            });
            /*
                this.$hub.proxy.on("broadcastMessage", (uid, msg) => {
                  this.$notify.info({
                    title: "Info111111",
                    message: msg
                  });
                }); */
            this.$hub.proxy.on("updateNotificationCountNumber", count => {
              this.mscount = count;
              if (this.$myDevice === "isMobileApp") {
                this.$cordovaPushV5.setBadgeNumber(this.mscount).then(function (result) {
                }, function (err) {
                });
              }
            });
            this.$hub.proxy.on("updateSystemNotification", (uid, msg) => {
              this.itemlist = [];
              this.reloadNotification();
              this.onUpdateMsCount();
            });
            this.$hub.proxy.on("updateGroupNotification", (uid, msg) => {
              //console.log('updateGroupNotification ', uid, msg)
              this.itemlist = [];
              this.reloadNotification();
              this.onUpdateMsCount();
            });
            this.$hub.proxy.on("updateIndividualNotification", (uid, msg) => {
              //console.log('updateIndividualNotification ', uid, msg)
              var notification = JSON.parse(msg);
              var id = JSON.parse(notification.c).id;
              var idf = JSON.stringify(this.itemlist).indexOf(id);
              if (idf === -1) {
                this.itemlist = [];
                this.reloadNotification();
                this.onUpdateMsCount();
              }
            });
            this.$hub.connection
              .start()
              .done(() => {
                console.log("connected success!");
                this.$hub.proxy.invoke("joinGroup", url);
                $.each(lstGroupId, (key, value) => {
                  var gname = url + "/" + value;
                  this.$hub.proxy.invoke("joinGroup", gname);
                });
              })
              .fail(function (e) {
                console.log("error !!!!!" + e);
              });
          } else {
            console.log("no hub no connect");
          }
        });
      },
      addNewUser(e) {
        this.$hub.$emit(
          "set-modal-data",
          "Tạo người dùng",
          "80%",
          true,
          "center",
          UserInfo,
          true,
          "",
          {action: "insert", scope: null}
        );
      },
      getDayAgo(item) {
        if (item != undefined) {
          var dateNow = this.$Utils.formatDateTime(Date.Now, "DD/MM/YYYY");
          if (dateNow === this.$Utils.formatDateTime(item, "DD/MM/YYYY")) {
            var date = new Date();
            var currentDate = new Date(item);
            var t = date - currentDate;
            if (Math.round(t / 60 / 60 / 1000) > 0) {
              return Math.round(t / 60 / 60 / 1000) + " giờ trước ";
            } else if (Math.round(t / 60 / 1000) <= 0) {
              return "Vừa xong";
            } else {
              return Math.round(t / 60 / 1000) + " phút trước";
            }
          }

          var diff = Math.round(
            Math.abs((new Date() - new Date(item)) / (24 * 60 * 60 * 1000))
          );
          return diff + " ngày trước";
        } else {
          return "";
        }
      },
      addNewTask(e) {
        this.$router.push("/dynamic/task-report-page");
      },
      addNewContact(e) {
        this.$router.push("/dynamic/them-khach-hang");
      },
      sidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle("sidebar-hidden");
      },
      sidebarMinimize(e) {
        e.preventDefault();
        document.body.classList.toggle("sidebar-minimized");
      },
      mobileSidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle("sidebar-mobile-show");
      },
      asideToggle(e) {
        e.preventDefault();
        document.body.classList.toggle("aside-menu-hidden");
      },
      loadAll() {
        return [];
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
      querySearchAsync(queryString, cb) {
        if (queryString !== "" && queryString.length > 4) {
          var request = {
            RequestClass: "xBase",
            RequestAction: "Request",
            TotalRequests: 1,
            R1_RequestTemplate: "AG_Task_Task.Search",
            R1_RequestDataGroup: "DataGroup.danh-sach-cong-viec.04b66",
            R1_RequestFields: "Id;Index;Name",
            R1_RequestOrderFields: "Created DESC",
            R1_AssignedUser: this.sessionId,
            R1_Keyword: queryString,
            R1_StartIndex: 1,
            R1_EndIndex: 10
          };

          this.$Utils.post(request).then(data => {
            if (data.success) {
              var tasks = data.R1.Data.TasksDS.Task;
              if (tasks) {
                var links = tasks.map((v, k) => {
                  return {value: v.Name, index: v.Index};
                });
                cb(links);
              }
            }
          });
        }
      },
      customerSearchAsync(queryString, cb) {
         var searchParam = this.searchParamSettings[this.selectedSearchParam.Value];
         //console.log('searchParam', searchParam);
        if (queryString !== "" && queryString.length > 4 && searchParam) {
          var request = {
           RequestClass:'xBase',
            RequestAction:'Request',
            TotalRequests:1,
            R1_RequestTemplate:searchParam.Template,
            R1_RequestDataGroup:searchParam.DataGroup,
            R1_RequestFields:searchParam.RequestFields,
            R1_Keyword: queryString,
            R1_StartIndex:1,
            R1_EndIndex:10
          };
          $.each(searchParam.RequestCode, (key, val)=>{
            if(key && key.trim() != "") {
              request["R1_"+ key] = val;
              request.R1_RequestFields += key + ";";
            }
          })
          var result = undefined;
          this.$Utils.post(request).then(data =>     {
            if (data.success) {
               result = this.$Utils.getDataWithRoot(data.R1, searchParam.RootData);

              if (result) {
                var links = result.map((v, k) => {

                   v.value = v.Name;
                   v.index = v.Id;
                   v.link = searchParam.Link;
                   v.content = "";

                   $.each(searchParam.ListField, (index, element) => {
                     if(element.Caption && (!element.ListIsHidden || element.ListIsHidden != "true")) {
                          if(v[element.Name] && element.FormElementType != 'Html') {
                            v.content += "<strong>" +element.Caption + ": </strong>" + (element.DynamicText ? v[element.DynamicText] : v[element.Name])+" </br> ";
                          }
                      }
                   })
                  return v;
                });
                cb(links);
              }
            }
          });
        }
      },
      createFilter(queryString) {
        return link => {
          return (
            link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          );
        };
      },
      handleSelect(item) {

        //console.log(item)
        var key = this.selectedSearchParam;
        // console.log(key)
        switch (key.value) {
          case "contact":
              this.$router.push("/"+key.link+"/Id=" + item.index);
              this.keyword = "";
            break;
            case "lead":
              this.$router.push("/"+key.link+"/LeadId=" + item.index);
              this.keyword = "";
            break;
            case "activity":
              this.$router.push("/"+key.link+"/ActivityId=" + item.index);
              this.keyword = "";
            break;

          default:
            break;
        }

        //alert(item);
      },
      handleDetail(result){
         var item = this.$Lodash.cloneDeep(result);
        delete item.link;
        delete item.content;
        delete item.value;
        delete item.index;
        var list = this.selectedSearchParam;
        var listSetting = this.searchParamSettings[list.Value];
        if(result.link) {
          switch (result.link.ButtonType) {
            case 'Popup':
                 var dataToPass = {
                Name: 'AG_Task_Task',
                Code: result.link.PopupModule,
                Description: {DataSource: ""}
              };
              var data = {
                "url": 'task-report-page',
                "RootData": listSetting.RootData,
                "DataSource": listSetting.RootData,
                "DataGroup": result.link.DataGroup,
                "ElementType": "Popup",
                "ModuleCode": dataToPass.Code,
                "parentSetting": {
                  "object": item,
                  "set": {
                    "ElementType": "Popup",
                    "GetFullData": "true"
                  },
                  "isCall": true,
                  "loadCalendar": true
                },
                "ModuleType": "Form"
              }
              //this.$hub.$emit("open-modal");
              this.$hub.$emit(
                "set-modal-data",
                result.link.Caption + " " + list.Name,
                "60%",
                true,
                "center",
                DynamicPage,
                true,
                '',  {
            Template: 'Modal',
            Module: [data]
          }, false
              );
              break;
            default:
              //console.log(result.link)
              if(result && result.link && result.link.Redirect) {
                var link = result.link.Redirect.replaceAll('{{Id}}', item.Id)
                // console.log(link)
                this.$router.push("/"+link)
              }
              break;
          }
        }
      },
      onDeviceReady() {
        var vm = this;
        var options = {
          android: {
            icon: "icon",
            senderID: "68497599090"
          },
          ios: {
            alert: "true",
            badge: "true",
            sound: "true"
          },
          windows: {}
        };

        document.addEventListener("pause", () => {
          document.addEventListener("resume", () =>{
            //this.reloadSignalR()
            this.$cordovaPushV5.initialize(options).then(() => {
              // start listening for new notifications
              this.$cordovaPushV5.onNotification();
              // start listening for errors
              this.$cordovaPushV5.onError();
            });

            utilsLibrary.post(vm.getRequest()).then((data) => {
              data = utilsLibrary.getDataWithRoot(data, 'Data.UserDS.User');
              var description = JSON.parse(data[0].Description);
              this.mscount = parseInt(description.NotiCount);

              this.$cordovaPushV5.setBadgeNumber(this.mscount).then(function(result) {}, function(err) {});
            });
            this.reloadNotification();
          }, false);
        }, false);
      },
      reloadNotification() {
        var request = {
          RequestClass: "xBase",
          RequestAction: "Request",
          TotalRequests: 1,
          R1_RequestTemplate: "SendMessage.Search",
          R1_Receiver: this.currentUser.UserId,
          R1_StartIndex: 1,
          R1_EndIndex: 5,
          R1_Name: "InstantMessage",
          R1_RequestOrderFields: "Created DESC"
        };

        this.$Utils.post(request).then(response => {
          if(response.success)
          if (response.R1.success) {
            this.itemlist = this.$Utils.getDataWithRoot(
              response.R1,
              "Data.ConversationDS.Message"
            ); // response.data.R1.Data.ConversationDS.Message;
          }
        });
      },
      reloadSignalR(){
         var baseURL =
          this.$appUri.BaseURL !== "/"
            ? this.$appUri.BaseURL.substring(0, this.$appUri.BaseURL.length - 1)
            : window.origin;
        var lstGroupId = [];
            $.each(this.user.Groups, (key, value) => {
              if (value) {
                lstGroupId.push(value.GroupId);
              }
            });
         this.$hub.connection
              .start()
              .done(() => {
                console.log("Reconnedted success!");
                this.$hub.proxy.invoke("joinGroup", baseURL);
                $.each(lstGroupId, (key, value) => {
                  var gname = baseURL + "/" + value;
                  this.$hub.proxy.invoke("joinGroup", gname);
                });
              })
              .fail(function (e) {
                console.log("error !!!!!" + e);
              });
      }
    },
    destroyed() {
      this.$hub.$off("update-task-callback");
      this.$hub.$off("$cordovaPushV5:notificationReceived");
      this.$hub.$off("$cordovaPushV5:errorOcurred");
        $('#searchContent').find('input').off("focus")
        $('#searchContent').find('input').off("blur")
    },
    mounted() {
      this.isMobile = this.$isMobileDevice;
      //this.selectedSearchParam = this.searchParams[0];
      // console.log(this.isMobile)
      if (this.isMobile) {
        var vm = this;
        $(document).ready(function() {
          // console.log("ready")
          setTimeout(() => {
            $('#searchContent').find('input').on("focus", () => {
              console.log("focus")
              //vm.toggleSearchContent()
              if (vm.$isMobile.iOS() && vm.myDevice === "isMobileApp") {
                var $body = $('body');
                $body.addClass('fixfixed');
              }
              $('#nav-label').toggle()
              // $('#nav-back').toggle()

              $('#searchContent').css("width", "100%");
            });
          }, 100);
          setTimeout(() => {
            $('#searchContent').find('input').on("blur", () => {
              //console.log("blur")
              if (vm.$isMobile.iOS() && vm.myDevice === "isMobileApp") {
                var $body = $('body');
                $body.removeClass('fixfixed');
              }
              $('#searchContent').css("width", "32px")
              setTimeout(() => {
                $('#nav-label').toggle()
                //$('#nav-back').toggle()
              }, 600);
            });
          }, 100);
          // if (this.$isMobile.iOS() && this.myDevice === "isMobileApp") {

          //     /* cache dom referencess */ 
          //     var $body = $('body'); 

          //     /* bind events */
          //     $(document)
          //     .on('focus', 'input', function(e) {
          //         console.log('focus on input');
          //         $body.addClass('fixfixed');
          //     })
          //     .on('blur', 'input', function(e) {
          //         console.log('blur out of input');
          //         $body.removeClass('fixfixed');
          //     });

          // }
        })

      }

      this.myDevice = this.$myDevice;
      this.isHome = this.$router.currentRoute.path === this.$appUri.BaseRedirect;
      this.$hub.$on("$cordovaPushV5:notificationReceived", (data) => {
        if (this.myDevice === "isMobileApp" && data.count) {
          this.$cordovaPushV5.setBadgeNumber(data.count);
        }
        if (this.myDevice === "isMobileApp") {
          this.$cordovaPushV5.finish();
        }
      });

      if (this.myDevice === "isMobileApp") {
        document.addEventListener("deviceready", this.onDeviceReady, false);
      }

      // triggered every time error occurs
      this.$hub.$on("$cordovaPushV5:errorOcurred", (e) => {
        console.log(e);
      });
      this.$hub.$on("reloadGroup", data => {
        this.searchDeparment();
        //this.$forceUpdate();
      });
      this.$nextTick(
        function () {
          this.$hub.$on("update-task-callback", data => {
            //alert(JSON.stringify(data));
          });
          this.$hub.$on(
            "$cordovaPushV5:notificationReceived",
            (data) => {
            }
          );
          this.$hub.$on("$cordovaPushV5:errorOcurred", (e) => {
          });
        }.bind(this)
      );
      //this.links = this.loadAll();
      //this.currentUser = JSON.parse(localStorage.getItem("LoggedOnUser"));
      this.sessionId = this.$getItemLocalStorage(
        this.$localStorageConstant.SessionId
      );
      this.searchDeparment();
      this.reloadNotification();
      this.$hub.$on("notification", data => {
        this.proxy.invoke();
      });
      var LoggedOnUser = JSON.parse(
        this.$getItemLocalStorage(this.$localStorageConstant.LoggedOnUser)
      );
      var noti = this.$getItemLocalStorage(
        this.$localStorageConstant.Notification
      );
      if (noti && noti.constructor === String) {
        var baseURL =
          this.$appUri.BaseURL !== "/"
            ? this.$appUri.BaseURL.substring(0, this.$appUri.BaseURL.length - 1)
            : window.origin;
        var post = JSON.parse(noti).Port;
        var SOA = baseURL + ":" + post;
      } else {
        var baseURL =
          this.$appUri.BaseURL !== "/"
            ? this.$appUri.BaseURL.substring(0, this.$appUri.BaseURL.length - 1)
            : window.origin;
        var SOA = "http://localhost:8080";
      }
      this.sender = JSON.stringify({
        i: LoggedOnUser.UserId,
        a: LoggedOnUser.LoginName,
        n: LoggedOnUser.Username,
        g: "",
        p: this.$Utils.isEmpty(post) ? post : "",
        c: "10",
        e: baseURL
      });
      if (LoggedOnUser.Avatar === "assets/images/avatars/profile.png") {
        this.isAvatar = false;
      } else {
        this.isAvatar = true;
      }

      var request = {
          RequestClass: "xBase",
          RequestAction: "Request",
          TotalRequests: 1,
          R1_RequestTemplate: "SettingNew.SearchSetting",
          R1_IncludedNestedSetParent: true,
          R1_Code: "ActiveNotification"
        };
      this.$Utils.post(request).then(data => {
          if (this.$Utils.isEmpty(data)) {
            data = this.$Utils.getDataWithRoot(data.R1, "Data.DynamicDS.Setting");
            if(data.length == 0 || data.Value == 'true'){
              this.initialize(baseURL, SOA, this.sender);
              this.onUpdateMsCount();
            }
          }
      })
      // if (this.mscount > 99) {
      //   this.mscount = "99+";
      // }
      
    },
    created() {
       var request = {
          RequestClass: "xBase",
          RequestAction: "Request",
          TotalRequests: 1,
          R1_RequestTemplate: "SettingNew.SearchSetting",
          //R1_IncludedNestedSetParent: true,
          R1_Level: 6,
          R1_ParentCode: "xSetting.Project.Tools.PushNotification"
    };
      this.$Utils.post(request).then(data => {
          if(data.success) {
          var codes = this.$Utils.getDataWithRoot(data.R1, 'Data.DynamicDS.Setting')
          codes.forEach(ele => {
            this.lstAction[ele.Name] = ele;
          });
          }
          //console.log(1, this.$Lodash.cloneDeep(this.lstAction));
      })

      var searchConfig = {
            RequestClass:'xBase',
            RequestAction:'Request',
            TotalRequests:1,
            R1_RequestTemplate:'Setting.SearchBase',
            R1_ParentCode:'xSetting.Project.Tools.QuickSearch'
          }
            this.$Utils.post(searchConfig).then(data => {
            if (data.success) {
              this.searchParams = this.$Utils.getDataWithRoot(data.R1, 'Data.DynamicDS.Setting');
              //console.log(this.searchParams);
              this.selectedSearchParam = this.searchParams[0];
            }
            })
    },

    watch: {
      selectedSearchParam : function(newVal){
        //this.keyword = "";
        //this.links = [];
        var ListField = "";
        var listRequest = {
            RequestClass:'xBase',
            RequestAction:'Request',
            TotalRequests:1,
            R1_RequestTemplate:'SettingNew.SearchSetting',
            R1_Code: newVal.Value
          }
          this.$Utils.post(listRequest).then(data => {
            if (data.success) {

             var result = this.$Utils.getDataWithRoot(data.R1, 'Data.DynamicDS.Setting')[0];
            //result = JSON.parse()

            var des = JSON.parse(result.Description);
            if(des.FCount && des.FCount > 0){
              for (let index = 1; index <= des.FCount; index++) {
                //console.log(result['F' + index])
                if(result['F' + index]){
                 if (index == 1)
                  ListField = "";
                  ListField += result['F' + index]
                }
              }
              result.ListField = JSON.parse(ListField);
              result.RequestFields = result.ListField.map(ele => {
                 return ele.Name;
               }).join(";");
               result.RequestFields += ";Keyword;";
              result.Link = des.Buttons[0];
              result.RootData =  des.RootData;
              result.RequestCode = this.$Utils.stringToObject(des.AdditionConditions);
              result.Template = des.DataSource+".Search";
              this.searchParamSettings[result.Code] = result;
              //console.log(this.searchParamSettings)

            }

            }

          })
           return false;
      },
      mscount : function(newVal) {
        //console.log('this.mscount', newVal);
        if (newVal > 999) this.getCount = "999+";
        if (isNaN(newVal)) this.getCount = "0";
        else this.getCount = newVal;
        //return this.mscount;
      },
      $route(to, from) {
        this.isHome = to.path === this.$appUri.BaseRedirect;
      },
      // '$router.currentRoute.path' : function(newPath) {
      //   this.isHome = (newPath === '/my-view-page')
      // },
      itemlist: function (newitemlist) {
        this.activities = [];
        $.each(newitemlist, (key, value) => {
          if (value) {
            var temp = this.$Utils.jsonParse(value.Body);
            if (utilsLibrary.isEmpty(temp)) {
              var task = {};
              task.Name = temp.Name;
              if (this.$Utils.isEmpty(temp, "Content")) {
                var cmtContent = temp.Content;
              }
              var user = JSON.parse(value.Description);

              user.avatar = user.avatar.replace("profile.jpg", "profile.png");
              var strAvatar =
                user.avatar === "assets/images/avatars/profile.png"
                  ? user.avatar
                  : user.avatar.replace("/", "") + "&Height=50&Width=50";
              var url =    (this.lstAction[temp.action] && this.lstAction[temp.action].Value)  ? this.lstAction[temp.action].Value : "";
                 url = url.replace("{{index}}",temp.index)
                 url = url.replace("{{id}}",temp.DocumentId)

              var notificationitem = {
                Id: temp.id,
                Name: value.From,
                Task: task,
                Date: this.getDayAgo(value.Date),
                Active: "",
                Action: (this.lstAction[temp.action] && this.lstAction[temp.action].Description) ? this.lstAction[temp.action].Description : "",
                ActionClass: temp.action,
                Index: temp.index,
                Avatar: this.$appUri.BaseURL + strAvatar,
                type: temp.action,
                IdMessage: value.Id,
                link: url,
                DocumentId: temp.DocumentId,
                Content: temp.Content
              };
              if (
                temp.action === "DocumentInsert" ||
                temp.action === "DocumentUpdate"
              ) {
                notificationitem.DocumentId = temp.DocumentId;
              }
              if (utilsLibrary.isEmpty(cmtContent)) {
                notificationitem.Content = cmtContent;
              }
              //console.log(this.activities, '---', notificationitem.Id)
              var idf = JSON.stringify(this.activities).indexOf(
                notificationitem.Id
              );
              //console.log("idf  " ,idf)
              if (idf === -1) {
                if (value.State == 4) {
                  notificationitem.Active = "";
                } else {
                  notificationitem.Active = "isActive";
                }
                this.activities.push(notificationitem);
              }
            }
          }
        });
      }
    }
  };
</script>
<style lang="scss" scoped>

  .app-header {
    .mobile-icon {
      width:170px !important;
      padding: 0px !important;
      position: unset !important;
      background-position: left  !important;
      margin-left:-48px !important;
      background-size: 50px auto !important;
      
    }
    #nav-label {
      padding-left: 45px !important;
      padding-top: 20px !important;
      font-size: 13px;
    }
  }
  
    
  .app-header.navbar {
     .nav-item {
       min-width: 24px;
     }
     }
  .el-input--suffix  {
    .el-input__inner {
       margin: 0px !important;
    }
  }     
  @media (max-width: 599px) {
    #searchContent{
      width: 32px;
    }
    .app-header {
      .nav-item {
        min-width: 24px !important;
      }
    }
    .app-header.navbar .nav-item {
      min-width: 0px;
    } 
     .el-autocomplete {
              
              width: calc(100vw - 200px) !important;
     }
      
     .app-header.navbar{
          min-width: 0px !important;
          padding: 0px !important;             
         .nav-item  {
           .nav-item  {
            min-width: 38px !important; 
           }
            min-width: 0px !important;
            .nav-link {
              min-width: 0px !important;
              margin: 0px  !important;
              .avatar{
                 margin: 0px  !important;
              }  

            }
          }
     } 
    
    .app-header .navbar-nav .dropdown-menu-right {
      right: -10px;
    }
    .app-header.navbar {
      padding: 0 10px 0px 0px;
      //height: 40px;
    }
    .dropdownactivity {
      .dropdown-menu-right {
        width: 100vw !important;
        height: 100vh !important;
      }
      .content {
        height: calc(100vh - 110px) !important;
      }
    }
  }
</style>
