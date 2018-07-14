<template>
  <div class="EditProject">
    <el-row>
    <el-col :span="FormCelSpan">  
    <el-form :model="model">
      <el-form-item prop="GroupName" :rules="{
          required: true, message: 'Tên bắt buộc phải có', trigger: 'blur'
        }" label="Tên dự án">
        <el-input v-model="model.GroupName" placeholder="Tên dự án"></el-input>
      </el-form-item>
      
          <el-form-item prop="ProjectCode" :rules="{
            required: true, message: 'Mã bắt buộc phải có', trigger: 'blur'
          }" label="Mã dự án">
            <el-input v-model="model.ProjectCode" placeholder="Mã dự án"></el-input>
          </el-form-item>
          <el-form-item  label="Phòng ban" :rules="{
            required: true, message: 'Tên bắt buộc nhập', trigger: 'blur'
          }" >
            <el-select v-model="model.Department" placeholder="Phòng ban" style="width: 100%" filterable multiple >
              <el-option v-for="item in ListGroup"
                         :key="item.GroupId"
                         :label="item.GroupName"
                         :value="item.GroupId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="Description" label="Mô tả" :rules="{
            required: true, message: 'Mô tả bắt buộc nhập', trigger: 'blur'
          }">
        <el-input type="textarea"
                  :rows="2"
                  placeholder="Mô tả"
                  v-model="model.Description">
        </el-input>
      </el-form-item>
          <el-row>
            <el-col :span="$isMobileDevice ? 24 : 12 ">
              <el-form-item prop="StartDate" label="Ngày bắt đầu">
                <el-date-picker
                  size="mini"
                  v-model="model.StartDate"           
                  :clearable="true"           
                  format="dd/MM/yyyy"
                  >
                </el-date-picker>  
              </el-form-item>
            </el-col>
             <el-col :span="$isMobileDevice ? 24 : 12">  
              <el-form-item prop="FinishDate" label="Ngày kết thúc">
                <el-date-picker
                  size="mini"
                  v-model="model.FinishDate"           
                  :clearable="true"           
                  format="dd/MM/yyyy"
                  >
                </el-date-picker>  
              </el-form-item>
             </el-col> 
         </el-row>
          <el-row>
            
             <el-col :span="$isMobileDevice ? 24 : 12">  
              <el-form-item label="Trạng thái">
                <el-select v-model="model.SubStatus"  clearable placeholder="Trạng thái" style="width: 100%">
                  <el-option v-for="item in ListStatus"
                            :key="item.Id"
                            :label="item.Name"
                            :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="$isMobileDevice ? 24 : 12">  
              <el-form-item label="Quyền xem" >          
                  <el-select v-model="model.Permit" style="width: 100%" clearable >
                    <el-option v-for="item in ListPermit"
                              :key="item.Id"
                              :label="item.Name"
                              :value="item.Id">
                    </el-option>
                  </el-select>
               </el-form-item>
              </el-col>
          </el-row>
        
        
          <el-form-item  prop="Active">            
            <el-checkbox v-model="model.Active" true-label="1" false-label="0" >Kích hoạt</el-checkbox>
          </el-form-item>
    
        <el-form-item label="Vai trò sử dụng">
          <el-select class="w-100" multiple clearable filterable value-key="Name" v-model="GroupRoles">
           <el-option v-for="item in groupRoleTemp" :label="item.Caption" :value="item" :key="item.Name"></el-option>
          </el-select>
        </el-form-item>
        <template v-for="item in GroupRoles" v-if="GroupRoles.length > 0">
            <el-form-item  :label="item.Caption" :key="item.Id" >              
              <el-select v-model="model[item.Value]" filterable :placeholder="item.Caption" style="width: 100%" multiple >
                <el-option v-for="item in ListUser"
                           :key="item.UserId"
                           :label="item.Username"
                           :value="item.UserId">
                </el-option>
              </el-select>
            </el-form-item>
         
        </template>
      
      
      <el-form-item>
        <el-button type="primary" @click="checkExits()">Lưu</el-button>
        <el-button @click="closeForm()">Đóng</el-button>
      </el-form-item>
    </el-form>
    </el-col>
    <el-col :span="TreeCelSpan">
      
      <ProjectCategories :data="model" v-if="model.GroupId" />
    
     
    </el-col>
    </el-row>
  </div>
</template>
<script>
import Vue from "vue";
import ProjectCategories from "@/components/static/ProjectCategories.vue";
const privateStatus = "4e5c6049-41c2-4abd-b9de-6b32beb22490";
const projectRequestFields =
  "GroupId;CreatedByName;GroupParent;ModifiedByName;Permit;PermitName;Status;SubStatus;SubStatusName;Active;ActiveName;GroupName;Description;ProjectCode;Department;DepartmentName;GroupType;StartDate;FinishDate;";
//"GroupId;Tool;TypeName;GroupName;ProjectCode;SubStatus;SubStatusName;StateName;PermitName;Progress;DepartmentName;PlanManHour;ActualManHour;FinishDate;PriorityName;ProductName;StartDate;Version;Code;CreatedBy;Department;GroupId;ModifiedBy;Priority;PriorityDescription;PriorityId;State;Status;Type;Permit;Description;Active;ActiveName;Department;DepartmentName;GroupType;GroupParent;PlanStartDate;DeadLine;Permit";

export default {
  props: ["data"],
  components: { ProjectCategories },
  data() {
    return {
      DisplayPermit: true,
      textarea: "",
      ListPermit: [],
      ListStatus: [],
      ListUser: [],
      ListGroup: [],
      dataToPass: {},
      groupRoleTemp: [],
      GroupRoles: [],
      ListGroupId: {},
      model: {
        Name: "",
        ProjectCode: "",
        SubStatus: "",
        Active: true,
        Permit: "",
        StartDate: "",
        FinishDate: "",
        Department: [],
        Description: "",
        GroupId: undefined,
        Status: 1
      }
    };
  },
  computed: {
    FormCelSpan() {
      return 24;
      var isAddNew =
        this.model.GroupId == undefined || this.model.GroupId == "";
      if (this.$isMobileDevice) return 24;
      else if (!isAddNew) return 12;
      else return 24;
    },
    TreeCelSpan() {
      return 24;
      var isAddNew =
        this.model.GroupId == undefined || this.model.GroupId == "";
      if (this.$isMobileDevice) return 0;
      else if (!isAddNew) return 12;
      else return 0;
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    closeForm() {
      this.$hub.$emit("close-modal");
    },
    checkExits() {
      var isAddNew =
        this.model.GroupId == undefined || this.model.GroupId == "";
      if (
        !this.model.GroupName ||
        this.model.GroupName == null ||
        this.model.GroupName.trim() == ""
      ) {
        this.$Utils.showMessage("error", "Tên dự án cần phải có");
        return;
      }
      var request = this.$Lodash.cloneDeep(this.$singleRequest);
      request.R1_RequestTemplate = "tblGroup.Search";
      request.R1_RequestDataGroup = "DataGroup.quan-ly-du-an.053gf";
      request.R1_RequestFields = projectRequestFields;
      request.R1_GroupType = "4";
      this.$Utils.post(request).then(data => {
        var ListProject = this.$Utils.getDataWithRoot(
          data.R1,
          "Data.UserDS.Group"
        );
        if (isAddNew) {
          ListProject = ListProject.filter(el => {
            return (
              (this.model.GroupName &&
                this.model.GroupName.toLowerCase() ===
                  el.GroupName.toLowerCase()) ||
              this.model.ProjectCode == el.ProjectCode
            );
          });
          if (ListProject.length > 0) {
            this.$Utils.showMessage("error", "Dự án hoặc mã dự án đã tồn tại");
            return;
          }
          //this.save();
        } else {
          ListProject = ListProject.filter(ek => {
            return (
              this.model.GroupName.toLowerCase() ==
                ek.GroupName.toLowerCase() && this.model.GroupId != ek.GroupId
            );
          });
          if (ListProject.length > 0) {
            this.$Utils.showMessage("error", "Dự án đã tồn tại");
            return;
          }
        }
        this.save();
      });
    },
    save() {
      //console.log('this.model ', this.model)
      var saveAble = true;
      if (!this.$Utils.isEmpty(this.model.GroupName)) {
        this.$Utils.showMessage("error", "Tên dự án bắt buộc nhập");
        saveAble = false;
      } else if (
        !this.$Utils.isEmpty(this.model.ProjectCode) ||
        this.model.ProjectCode.trim() === ""
      ) {
        this.$Utils.showMessage("error", "Mã dự án bắt buộc nhập");
        saveAble = false;
      } else if (
        !this.$Utils.isEmpty(this.model.Department) ||
        this.model.Department.length == 0
      ) {
        this.$Utils.showMessage("error", "Phòng ban bắt buộc nhập");
        saveAble = false;
      } else if (
        !this.$Utils.isEmpty(this.model.Description) ||
        this.model.Description.length == 0
      ) {
        this.$Utils.showMessage("error", "Mô tả bắt buộc nhập");
        saveAble = false;
      }
      if (saveAble) {
        if (this.$Utils.isEmpty(this.model.StartDate)) {
          this.model.StartDate =
            Vue.moment(this.model.StartDate).format("YYYY-MM-DD") + "T00:00:00";
        }
        if (this.$Utils.isEmpty(this.model.FinishDate)) {
          this.model.FinishDate =
            Vue.moment(this.model.FinishDate).format("YYYY-MM-DD") +
            "T23:59:59";
        }

        var Department = this.$Lodash.cloneDeep(this.model.Department);
        this.model.DepartmentName = "";
        this.model.Department = "";
        Department.forEach(value => {
          var objDepartment = this.ListGroup.filter(el => {
            return el.GroupId == value;
          });
          this.model.DepartmentName += objDepartment[0].GroupName + ";";
          this.model.Department += value + ";";
        });
        if (this.$Utils.isEmpty(this.model.SubStatus)) {
          var objStatus = this.ListStatus.filter(el => {
            return el.Id == this.model.SubStatus;
          });
          if (objStatus[0] && objStatus[0].Name)
            this.model.SubStatusName = objStatus[0].Name;
        }
        // if (
        //   this.$Utils.isEmpty(this.model.Active) &&
        //   this.model.ActiveName == true
        // ) {
        //   this.model.ActiveName = "1";
        //   this.model.Active = "1";
        // } else {
        //   this.model.ActiveName = "0";
        //   this.model.Active = "0";
        // }
        this.UpdateProject();
      }
    },
    UpdateProject(group) {
      var ctrl = this;
      var request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
      request.R1_RequestTemplate = "tblGroup.Update";
      request.R1_RequestDataGroup = "DataGroup.quan-ly-du-an.053gf";
      request.R1_RequestFields = projectRequestFields;
      request.R1_GroupType = 4;
      request.R1_Status = 1;
      request.R1_ModifiedByName = JSON.parse(
        ctrl.$Utils.getUserInfo()
      ).Username;
      if (ctrl.model.GroupId == undefined || ctrl.model.GroupId == "") {
        request.R1_RequestTemplate = "tblGroup.Insert";
        request.R1_CreatedByName = JSON.parse(
          ctrl.$Utils.getUserInfo()
        ).Username;
      }
      if (this.$Utils.isEmpty(this.model.StartDate)) {
        this.model.StartDate =
          Vue.moment(this.model.StartDate).format("YYYY-MM-DD") + "T00:00:00";
      }
      if (this.$Utils.isEmpty(this.model.FinishDate)) {
        this.model.FinishDate =
          Vue.moment(this.model.FinishDate).format("YYYY-MM-DD") + "T23:59:59";
      }
      request = ctrl.$Utils.updateParamsSingleRequest(request, ctrl.model);
      // console.log(request)
      ctrl.$Utils.post(request).then(data => {
        if (data.success) {
          ctrl.$Utils.showMessage("success", "Cập nhật thành công.");
          //Insert current user to project
          if (request.R1_RequestTemplate == "tblGroup.Insert") {
            var req = {
              RequestAction: "InsertUserGroup",
              RequestClass: "BPM",
              UserId: ctrl.$Utils.getUserInfo("UserId"),
              GroupId: data.R1.Data
            };
            ctrl.$Utils.post(req).then(dataS => {
              //console.info('tblGroup InsertUserGroup', dataS)
            });
            //Insert admin user to project
            ctrl.ListUser.filter(user => {
              if (user.Groups.indexOf(ctrl.$supervisor) != -1) {
                var req = {
                  RequestAction: "InsertUserGroup",
                  RequestClass: "BPM",
                  UserId: user.UserId,
                  GroupId: data.R1.Data
                };
                ctrl.$Utils.post(req).then(dataS => {
                  // console.info('admin tblGroup InsertUserGroup', dataS)
                });
              }
            });

            //Insert user in selected group to project
            if (ctrl.model.Department) {
              ctrl.model.Department.split(";").forEach(val => {
                if (val && val != "") {
                  // if project is private insert only leader of group
                  if (ctrl.model.Permit == privateStatus) {
                    var request = this.$Lodash.cloneDeep(this.$singleRequest);
                    request.R1_RequestTemplate = "tblGroup.Search";
                    request.R1_RequestDataGroup =
                      "DataGroup.quan-ly-du-an.053gf";
                    request.R1_RequestFields =
                      "GroupId;GroupName;GroupType;GroupParent;ProjectCode;CreatedBy;State;Status;Type";
                    request.R1_GroupType = "2";
                    request.R1_GroupParent = val;
                    this.$Utils.post(request).then(dt => {
                      var db = this.$Utils.getDataWithRoot(
                        dt.R1,
                        "Data.UserDS.Group"
                      );
                      if (db) {
                        ctrl.ListUser.filter(user => {
                          if (
                            user.UserId != ctrl.$Utils.getUserInfo("UserId") &&
                            user.Groups.indexOf(val) != -1 &&
                            user.Groups.indexOf(ctrl.$supervisor) == -1
                          ) {
                            if (user.Groups && user.Groups.length > 0) {
                              var groupAndRoles = user.Groups.split(";");
                              groupAndRoles.forEach(ele => {
                                var role = ctrl.$Lodash.find(db, {
                                  GroupId: ele
                                });
                                if (
                                  role &&
                                  role.GroupParent === val &&
                                  role.GroupName === "Leader" &&
                                  role.GroupType === "2"
                                ) {
                                  var req = {
                                    RequestAction: "InsertUserGroup",
                                    RequestClass: "BPM",
                                    UserId: user.UserId,
                                    GroupId: data.R1.Data
                                  };
                                  ctrl.$Utils.post(req).then(dataS => {
                                    //console.info(user.Username + ' Department InsertUserGroup ', dataS)
                                  });
                                }
                              });
                            }
                          }
                        });
                      }
                    });
                  } else {
                    // if project is public insert all member of group
                    ctrl.ListUser.filter(user => {
                      if (
                        user.UserId != ctrl.$Utils.getUserInfo("UserId") &&
                        user.Groups.indexOf(val) != -1 &&
                        user.Groups.indexOf(ctrl.$supervisor) == -1
                      ) {
                        var req = {
                          RequestAction: "InsertUserGroup",
                          RequestClass: "BPM",
                          UserId: user.UserId,
                          GroupId: data.R1.Data
                        };
                        ctrl.$Utils.post(req).then(dataS => {
                          //console.info(user.Username + ' Department InsertUserGroup ', dataS)
                        });
                      }
                    });
                  }
                }
              });
            }
            $.each(ctrl.GroupRoles, (key, value) => {
              var createNew = {
                R1_Status: 1,
                RequestAction: "Request",
                RequestClass: "xBase",
                TotalRequests: 1,
                R1_RequestTemplate: "OrgnizationInsert",
                R1_GroupParent: data.R1.Data,
                R1_GroupName: value.Name,
                R1_GroupType: 5,
                R1_Description: value.Caption
              };
              ctrl.$Utils.post(createNew).then(newData => {
                var urequest = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
                urequest.R1_RequestTemplate = "tblGroup.Update";
                urequest.R1_RequestDataGroup = "DataGroup.quan-ly-du-an.053gf";
                urequest.R1_RequestFields = "GroupId;" + value.Name + ";";
                urequest["R1_" + value.Name] = newData.R1.Data;
                urequest.R1_GroupId = data.R1.Data;
                ctrl.$Utils.post(urequest).then(dataS => {
                  //console.info('tblGroup.Update', dataS)
                });
                if (ctrl.model[value.Value]) {
                  ctrl.model[value.Value].forEach(val => {
                    if (val && val != "") {
                      var user = this.$Lodash.find(this.ListUser, {
                        UserId: val
                      });
                      console.log(user)
                      if (user && user.Groups.indexOf(val) == -1) {
                        var req = {
                          RequestAction: "InsertUserGroup",
                          RequestClass: "BPM",
                          UserId: val,
                          GroupId: data.R1.Data
                        };
                        ctrl.$Utils.post(req).then(dataS => {
                          console.info('data InsertUserGroup ',dataS)
                        });
                      }

                      var req = {
                        RequestAction: "InsertUserGroup",
                        RequestClass: "BPM",
                        UserId: val,
                        GroupId: newData.R1.Data
                      };
                      ctrl.$Utils.post(req).then(dataS => {
                        console.info('newData InsertUserGroup ',dataS)
                      });
                    }
                  });
                }
                // Update left index and right index
                var requestP = {
                  RequestClass: "BPM",
                  RequestAction: "UpdateGroupForNestedSet"
                };
                ctrl.$Utils.post(requestP).then(dataS => {
                  //console.info("UpdateGroupForNestedSet ", dataS);
                });
              });
            });
          } else {
            var arrgroup = [];
            $.each(ctrl.GroupRoles, (key, value) => {
              arrgroup.push(value.Name);
              if (Object.keys(ctrl.ListGroupId).indexOf(value.Name) == -1) {
                var createNew = {
                  R1_Status: 1,
                  RequestAction: "Request",
                  RequestClass: "xBase",
                  TotalRequests: 1,
                  R1_RequestTemplate: "OrgnizationInsert",
                  R1_GroupParent: data.R1.Data,
                  R1_GroupName: value.Name,
                  R1_GroupType: 5,
                  R1_Description: value.Caption
                };
                ctrl.$Utils.post(createNew).then(newData => {
                  ctrl.ListGroupId[value.Name] = newData.R1.Data;
                  ctrl.updateUserLink(key, value, data);
                });
                var requestP = {
                  RequestClass: "BPM",
                  RequestAction: "UpdateGroupForNestedSet"
                  // SessionId: sessionId
                };
                ctrl.$Utils.post(requestP).then(() => {});
              } else {
                ctrl.updateUserLink(key, value, data);
              }
            });
            $.each(ctrl.ListGroupId, (key, value) => {
              if (arrgroup.indexOf(key) == -1) {
                var removeGroup = {
                  RequestAction: "DeleteGroup",
                  RequestClass: "BPM",
                  ConditionFields: "GroupId;",
                  GroupId: value
                };
                ctrl.$Utils.post(removeGroup).then(newData => {});
              }
            });
          }
          ctrl.data.search();
          ctrl.closeForm();
          // }
        } else {
          ctrl.$Utils.showMessage("error", ctrl.toastMessage.updateItemFailed);
        }
      });
    },
    updateUserLink(key, value, data) {
      var ctrl = this;
      var addNew = this.$Lodash.difference(
        ctrl.model[value.Value],
        ctrl.model["old_" + value.Value]
      );
      var remove = this.$Lodash.difference(
        ctrl.model["old_" + value.Value],
        ctrl.model[value.Value]
      );
      remove.map(user => {
        if (ctrl.ListGroupId[value.Name]) {
          var req = {
            RequestAction: "DeleteUserGroup",
            RequestClass: "BPM",
            UserId: user,
            GroupId: ctrl.data.user.GroupId
            // SessionId: sessionId
          };
          ctrl.$Utils.post(req).then(dataS => {});

          var req = {
            RequestAction: "DeleteUserGroup",
            RequestClass: "BPM",
            UserId: user,
            GroupId: ctrl.ListGroupId[value.Name]
            // SessionId: sessionId
          };
          ctrl.$Utils.post(req).then(dataS => {});
        }
      });
      addNew.map(user => {
        if (ctrl.ListGroupId[value.Name]) {           
          var req = {
            RequestAction: "InsertUserGroup",
            RequestClass: "BPM",
            UserId: user,
            GroupId: ctrl.data.user.GroupId
            // SessionId: sessionId
          };
          ctrl.$Utils.post(req).then(dataS => {
             //console.log('add to project' +dataS)
          });
          var req = {
            RequestAction: "InsertUserGroup",
            RequestClass: "BPM",
            UserId: user,
            GroupId: ctrl.ListGroupId[value.Name]
            // SessionId: sessionId
          };
          ctrl.$Utils.post(req).then(dataS => {
             //console.log('add to project role' +dataS)
          });
        }
      });
    },
    Delete(val) {
      if (val) {
        DeleteGroup(val.GroupId);
        if (val.children) {
          $.each(value.children, (key2, value2) => {
            Delete(value2);
          });
        }
      } else return;
    },
    DeleteGroup(groupid) {
      var requestD = {
        RequestAction: "DeleteGroup",
        RequestClass: "BPM",
        ConditionFields: "GroupId",
        GroupId: groupid,
        SessionId: this.$getItemLocalStorage(
          this.$localStorageConstant.SessionId
        )
      };
      this.$Utils.post(requestD).then(data => {});
    },
    checkPermit(val) {
      this.DisplayPermit = val.Id === privateStatus;
    },
    checkWorker(item) {
      if (item.length >= this.model.Department.length) {
        var listDepartment = "";
        item.forEach(department => {
          listDepartment += department + ";";
        });
        var request = {
          RequestAction: "SearchUserWithGroups",
          IncludedGroupManager: "true",
          RequestClass: "BPM",
          RequestDataType: "json",
          SessionId: this.$getItemLocalStorage(
            this.$localStorageConstant.SessionId
          ),
          ConditionFields: "IncludedGroupManager;Group;Status",
          StaticFields: "UserId;Username;LoginName;Description;Status;",
          OrderFields: "LoginName ASC",
          Group: listDepartment,
          Status: 1
        };
        this.$Utils.post(request).then(data => {
          data = this.$Utils.getDataWithRoot(data, "Data.UserDS.User");
          this.ListWorker = data;
          if (!this.isSystemAdmin)
            this.ListWorker = this.ListWorker.filter(el => {
              if (el.Groups) {
                return JSON.stringify(el.Groups).indexOf("superadmin") == -1;
              }
            });

          this.ListWorker.forEach(item => {
            $.each(this.GroupRoles, (key, value) => {
              if (
                (!this.data.user[value.Name] &&
                  this.$Utils.isEmpty(objGroup[value.Value]) &&
                  objGroup[value.Value].indexOf(item.UserId) > -1) ||
                item.Groups.indexOf(this.data.user[value.Name]) > -1
              ) {
                this.model[value.Value].push(item.UserId);
              }
            });
          });
        });
      }
    }
  },
  created() {
    var ctrl = this;
    ctrl.dataToPass = ctrl.data;
    var pro = ctrl.dataToPass.user;
    //console.log(pro)
    if (pro && pro.GroupName) {
      if (this.$Utils.isEmpty(pro.StartDate)) {
        ctrl.model.StartDate = new Date(pro.StartDate);
      }
      if (this.$Utils.isEmpty(pro.FinishDate)) {
        ctrl.model.FinishDate = new Date(pro.FinishDate);
      }
      ctrl.model.GroupId = pro.GroupId;
      ctrl.model.GroupName = pro.GroupName;
      ctrl.model.ProjectCode = pro.ProjectCode;
      ctrl.model.SubStatus = pro.SubStatus;
      ctrl.model.Active = pro.Active;
      // if (pro.Active === "0") {
      //   ctrl.model.Active = false;
      // } else {
      //   ctrl.model.Active = true;
      // }
      ctrl.model.Status = pro.Status;
      ctrl.model.Department = pro.Department;
      ctrl.model.Description = pro.Description;
    }

    ctrl.DisplayPermit = false;
    ctrl.viewModel = { Data: { Fields: [] } };
    if (ctrl.model.Permit === privateStatus) {
      ctrl.DisplayPermit = true;
    }
    // if (ctrl.model.Active == false) ctrl.model.Active = 0;
    // else if (ctrl.model.Active == true) {
    //   ctrl.model.Active = 1;
    // }
    var request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
    request.R1_RequestTemplate = "Setting.SearchSetting";
    request.R1_ParentCode = "xSetting.Project.Parameter.ProjectPermit";
    request.R2_RequestTemplate = "Setting.SearchSetting";
    request.R2_ParentCode = "xSetting.Project.Parameter.ProjectStatus";
    request.TotalRequests = 2;
    ctrl.$Utils.post(request).then(data => {
      ctrl.ListPermit = ctrl.$Utils.getDataWithRoot(
        data.R1,
        "Data.DynamicDS.Setting"
      );
      ctrl.ListPermit.forEach(item => {
        if (ctrl.data.user && item.Id == ctrl.data.user.Permit) {
          ctrl.model.Permit = item;
        }
      });
      ctrl.ListStatus = ctrl.$Utils.getDataWithRoot(
        data.R2,
        "Data.DynamicDS.Setting"
      );
    });
    var Department = ctrl.$Lodash.cloneDeep(ctrl.model.Department);
    ctrl.model.Department = [];
    var groupRequest = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
    groupRequest.R1_RequestTemplate = "OrgnizationList";
    groupRequest.R1_GroupType = 1;
    groupRequest.R1_Status = 1;
    ctrl.$Utils.post(groupRequest).then(group => {
      ctrl.ListGroup = ctrl.$Utils.getDataWithRoot(
        group.R1,
        "Data.UserDS.Group"
      );
      $.each(ctrl.ListGroup, (key, value) => {
        var childRank = value.Level;
        ctrl.ListGroup[key].text = "";
        while (childRank > 1) {
          ctrl.ListGroup[key].text += "|-- ";
          childRank--;
        }
        ctrl.ListGroup[key].text += value.GroupName;
        if (ctrl.$Utils.isEmpty(Department) && typeof Department === "string") {
          Department.split(";").forEach(key => {
            if (key != "" && key == value.GroupId) {
              ctrl.model.Department.push(value.GroupId);
            }
          });
        }
      });
    });
    var roleRequest = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
    roleRequest.R1_RequestTemplate = "Setting.SearchSetting";
    roleRequest.R1_ParentCode =
      "xSetting.Default.Permissions.RoleProjectTemplate";
    ctrl.$Utils.post(roleRequest).then(roleData => {
      ctrl.groupRoleTemp = ctrl.$Utils.getDataWithRoot(
        roleData.R1,
        "Data.DynamicDS.Setting"
      );
      ctrl.groupRoleTemp.forEach(val => {
        this.$set(ctrl.model, val.Value, []);
        this.$set(ctrl.model, "old_" + val.Value, []);
      });
      ctrl.listWorker = [];
      var request = {
        RequestClass: "BPM",
        RequestAction: "SearchUserWithGroups",
        StaticFields: "UserId;Username;LoginName;Status",
        ConditionFields: "IncludedGroupManager;Group;Status;LoginName",
        IncludedGroup: true,
        Status: 1,
        RequestDataType: "json",
        SessionId: ctrl.$getItemLocalStorage(
          ctrl.$localStorageConstant.SessionId
        )
      };
      ctrl.$Utils.post(request).then(data => {
        data = ctrl.$Utils.getDataWithRoot(data, "Data.UserDS.User");
        ctrl.ListUser = [];
        data.forEach(item => {
          if (
            (!ctrl.$isSystemAdmin() && item.LoginName != "superadmin") ||
            ctrl.$isSystemAdmin()
          ) {
            ctrl.ListUser.push(item);
          }
        });
        if (
          ctrl.dataToPass.user &&
          ctrl.dataToPass.user.GroupRole &&
          ctrl.dataToPass.user.GroupRole.length > 0
        ) {
          ctrl.groupRoleTemp.forEach(val => {
            ctrl.dataToPass.user.GroupRole.forEach(item => {
              ctrl.ListGroupId[item.GroupName] = item.GroupId;
              if (val.Name == item.GroupName) {
                data.forEach(zItem => {
                  if (
                    ctrl.$Utils.isEmpty(item.GroupId) &&
                    zItem.Groups.indexOf(item.GroupId) > -1
                  ) {
                    if (
                      (!ctrl.$isSystemAdmin() &&
                        zItem.LoginName != "superadmin") ||
                      ctrl.$isSystemAdmin()
                    ) {
                      if (!ctrl.model[val.Value]) {
                        ctrl.model[val.Value] = [];
                      }
                      ctrl.model[val.Value].push(zItem.UserId);
                      ctrl.model["old_" + val.Value].push(zItem.UserId);
                    }
                  }
                });
                ctrl.GroupRoles.push(val);
              }
            });
          });
        }
      });

      ctrl.$forceUpdate();
    });
  }
};
</script>

 