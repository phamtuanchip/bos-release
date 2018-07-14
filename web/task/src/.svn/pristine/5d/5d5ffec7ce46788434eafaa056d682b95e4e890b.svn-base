<template>
  <div class="dynamic-page">
<!--      <div class="title-box py-1 px-3" v-if="pageName">
        <div class="row">
          <h5 class="col m-auto"><i :class="icon" v-if="icon"></i><span>&nbsp;{{pageName}}:</span></h5>
        </div>
      </div> -->
    <div v-if="Setting.IsDashboard =='true'" class="row">
      <div v-for="(moduleGroup, key) in Setting.Groups" :class="'dynamicDashboard col-lg-'+parseInt(moduleGroup.Flex /100 * 12) + ' col-md-'+parseInt(moduleGroup.FlexSM /100 * 12) + ' col-sm-'+parseInt(moduleGroup.FlexXS /100 * 12)">
        <el-card>
          <div v-for="pModule in moduleGroup.Modules" :key="pModule.ModuleCode" v-if="!reportPage && pModule.ModuleType == 'Filter' && pModule.Fields && pModule!=undefined" class="row">
            <DynamicFilter :pSetting="pModule"></DynamicFilter>
          </div>
          <div v-for="pModule in moduleGroup.Modules" :key="pModule.ModuleCode" v-if="!reportPage">
            <DynamicList :pSetting="pModule" :urlData="data.UrlData" v-if="pModule.ModuleType == 'List'" />
            <DynamicForm :pSetting="pModule" v-if="pModule.ModuleType == 'Form'" />
          </div>
          <div v-if="reportPage">
            <DynamicCharts :mSetting="moduleGroup.Modules" :pSetting="currentPage" :mCaption="moduleGroup.Caption" :mIndex="key" v-if="moduleGroup.Modules && moduleGroup.Modules.length > 0"/>
          </div>
        </el-card>
      </div>
    </div>
    <div v-else>
      <div v-for="pModule in formatData" v-bind:key="pModule.ModuleCode" v-if="!reportPage && pModule.ModuleType == 'Filter' && pModule.Fields" class="row">
        <DynamicFilter :pSetting="pModule"></DynamicFilter>
      </div>
      <div v-for="pModule in formatData" v-bind:key="pModule.ModuleCode" v-if="!reportPage">
        <DynamicList :pSetting="pModule" :urlData="data.UrlData" v-if="pModule.ModuleType == 'List'" />
        <DynamicForm :pSetting="pModule" v-if="pModule.ModuleType == 'Form'" />
      </div>
      <div v-if="reportPage">
        <DynamicCharts :mSetting="formatData" :pSetting="currentPage" v-if="formatData && formatData.length > 0"/>
      </div>
    </div>
  </div>
</template>
<script>
import DynamicCharts from "@/components/DynamicCharts";
import DynamicForm from "@/components/dynamic/DynamicForm";
import DynamicList from "@/components/dynamic/DynamicList";
import DynamicFilter from "@/components/dynamic/DynamicFilter";
import DynamicReport from "@/components/dynamic/DynamicReport";
// import DynamicMain from "@/components/dynamic/DynamicMain";

export default {
  components: {
    DynamicCharts,
    DynamicList,
    DynamicForm,
    DynamicFilter,
    // DynamicMain,
    DynamicReport
  },
  props: ['data', 'currentPage'],
  data() {
    return {
      activeName: this.$isMobileDevice ? '' : 'true',
      // currentPage: {},
      pageModules: [],
      pageDescriptions: [],
      listReport: [],
      formatData: [],
      listVal: {},
      objFields: {},
      sortedFilter: [],
      DataList: {},
      searchIndex: 0,
      filter: {},
      formPage: false,
      reportPage: false,
      Setting: {Module: []},
      viewModel: {moduleReady: false, ShowField: []},
    };
  },
  created() {},
  computed: {
      pageName () {
        if(this.currentPage)
         return this.currentPage && this.currentPage.Description ? JSON.parse(this.currentPage.Description).Caption : ""
        else return undefined
      },
      icon (){
        if(this.currentPage)
          return this.currentPage && this.currentPage.Description ? JSON.parse(this.currentPage.Description).MenuIcon : 'fa fa-file-text-o'
        else return undefined
      }
  },
  mounted() {
    this['Setting'] =  this.data
    if(this.Setting.IsDashboard !=='true'){
      delete this.Setting.Groups;
    }
    this.init();

  },
  watch: {
    "$route.params.url": function(newUrl) {
      //alert(newUrl);
      //if ("view-all-task-page" === newUrl) this.$router.push("/tasks")
      //else
      //if ("knowhow-document" === newUrl) this.$router.push("/knowhow-document");
      //else this.init();
    },

  },
  methods: {

    callback() {},

    init() {
      var ctrl = this;
      this.Setting.viewModel = {filter: [], module: []};
      if(this.Setting.IsDashboard == 'true'){
        this.reportClass = 'dashboard-report';
      }
      ctrl.Prefix = ctrl.$isMobile.iOS() ? '/' : '';
      ctrl.ListType = true;
      ctrl.$rootScope.isReport = false;
      ctrl.$rootScope.idReport = undefined;
      // ctrl.loadFilter();
      if (ctrl.$isMobile.Android() || ctrl.$isMobile.BlackBerry() || ctrl.$isMobile.Opera() || ctrl.$isMobile.iOS() && !ctrl.$isMobile.iPad()){
        ctrl.mobileflex = true;
      }
      var CurrentList = JSON.parse(ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.LoggedOnUser)).CurrentList;
      ctrl.CurrentList = ctrl.$Utils.isEmpty(CurrentList) ? CurrentList : 3;
      ctrl.Showa = false;
       ctrl.disPlayHeader = true;
      if (ctrl.Setting.UrlPage == 'dynamic/knowhow-document' && !ctrl.$isMobileDevice) {
        ctrl.Showa = true;
      }else if (ctrl.Setting.UrlPage == 'dynamic/summary-page') {
        ctrl.bttR = true;
      }else{
        ctrl.bttR = false;
        ctrl.Showa = !ctrl.$isMobileDevice;
      }
      if (ctrl.Setting.UrlPage == 'dynamic/knowhow-document' && ctrl.$isMobileDevice) {
        ctrl.disPlayHeader = false;
      }
      ctrl.btt = false;
      if (ctrl.$isMobile.iPad())
        ctrl.Showa = false
      ctrl.ShowList = ctrl.$Lodash.cloneDeep(ctrl.CurrentList);
      if (ctrl.ShowList == 0 && ctrl.Setting.UrlPage == 'dynamic/view-all-task-page') {
        ctrl.ListPage = 'clList';
        ctrl.btt = true;
        ctrl.disPlayHeader = false;
      };
      if (ctrl.ShowList == 1) {
        ctrl.Link = "scrumboard";
      }
       else {
        ctrl.Link = "timeline";
      }
      var url = window.location.href;
      if (url.indexOf('dynamic') > 0) {
        ctrl.ShowList = "0";
      }
      if(ctrl.Setting.DisplayChange == "true" && (ctrl.ShowList == "1" || ctrl.ShowList == "2")) {
        ctrl.filter = [];
      } else {
        var arrGroup = [];
        if (ctrl.$Utils.isEmpty(ctrl.Setting.Groups)) {
          ctrl.Setting.Groups.forEach((listItem) => {
            if (ctrl.$Utils.isEmpty(listItem.listUsers, "0") && JSON.parse(ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.LoggedOnUser)).UserId.indexOf(listItem.listUsers) >= 0) {
              arrGroup.push(listItem);
            } else if (ctrl.$Utils.isEmpty(listItem.UserPermissions, "0")) {
              var flag = false;
              listItem.UserPermissions.forEach((permission) => {
                var Roles = JSON.parse(ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.LoggedOnUser)).Roles;
                Roles.forEach((role) => {
                  if (permission == role.GroupId) {
                    // arrGroup.push(listItem);
                    flag = true;
                  }
                })
                var Groups = JSON.parse(ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.LoggedOnUser)).Groups;
                Groups.forEach((group) => {
                  if (permission == group.GroupId) {
                    // arrGroup.push(listItem);
                    flag = true;
                  }
                })
              })
              if(flag === true) {
                arrGroup.push(listItem);
              }
            } else if (!ctrl.$Utils.isEmpty(listItem.listUsers, "0") || listItem.listUsers == []) {
              arrGroup.push(listItem);
            }
          })
          if (ctrl.Setting.Groups.length > arrGroup.length)
            ctrl.changeGroups = true;
          ctrl.Setting.Groups = arrGroup;
        }
        ctrl.autoLoad();
      }
      ctrl.IosClass = ctrl.$isMobile.iOS() ? 'form-dynamic' : '';
      // setTemplate();
    },


    autoLoad() {
      var ctrl = this;
      ctrl.checkSettingPage().then(() => {
        if (ctrl.$Utils.isEmpty(ctrl.Setting.ExtraSetting) && ctrl.Setting.ExtraSetting !== '') {
          $.each(ctrl.$Utils.stringToObject(ctrl.Setting.ExtraSetting), (key, val) => {
            if (key !== "AdditionConditions")
              ctrl.Setting[key] = val;
          });
        }
        $.each(ctrl.Setting.Module, (key, val) => {
          if (ctrl.$Utils.isEmpty(val, 'DefaultFilter')) {
            if(!ctrl.$Utils.isEmpty(val.Group) || val.Group == '') {
              ctrl.Setting[val.ModuleCode + 'AdditionConditions'] = val.DefaultFilter;
            }
          }
        });
        /** sắp lại thứ tự các module trong page */
        var objComponents = { arrFilter: [], arrModule: [] },
          arrayComponent = [];
        var arrModule = [];
        if (ctrl.$Utils.isEmpty(ctrl.Setting.Groups)) {
          ctrl.Setting.Groups.forEach((listItem) => {
            ctrl.Setting.Module.forEach((module) => {
              if (ctrl.$Utils.isEmpty(module, 'DefaultFilter') && ctrl.$Utils.isEmpty(module.DefaultFilter, listItem.Caption)) {
                  if(!ctrl.Setting[module.ModuleCode + 'AdditionConditions']){
                    ctrl.Setting[module.ModuleCode + 'AdditionConditions'] = {};
                  }
                  ctrl.Setting[module.ModuleCode + 'AdditionConditions'][module.Group] = module.DefaultFilter[listItem.Caption];
              }
              if (listItem.ListModules.indexOf(module.ModuleCode) >= 0 && module.Group !== listItem.Name) {
                var otherModule = ctrl.$Lodash.cloneDeep(module);
                otherModule.Group = listItem.Name;
                arrModule.push(otherModule);
              }


              if (ctrl.$Utils.isEmpty(module.listUsers, "0") && JSON.parse(ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.LoggedOnUser)).UserId.indexOf(module.listUsers) >= 0) {
                arrModule.push(module);
              } else if (ctrl.$Utils.isEmpty(module.UserPermissions, "0")) {
                var flag = false;
                module.UserPermissions.forEach((permission) => {
                  var Roles = JSON.parse(ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.LoggedOnUser)).Roles
                  Roles.forEach((role) => {
                    if (permission === role.GroupId) {
                      // arrModule.push(module);
                    }
                  })
                  var Groups = JSON.parse(ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.LoggedOnUser)).Groups
                  Groups.forEach((group) => {
                    if (permission === group.GroupId) {
                      // arrModule.push(module);
                    }
                  })
                })
                if(flag === true) {
                  arrModule.push(listItem);
                }
              } else if (!ctrl.$Utils.isEmpty(module.listUsers, "0") || module.listUsers == []) {
                arrModule.push(module);
              }
            })
          })
          // arrModule = arrModule.filter((arr, index, self) =>
          //   index !== self.findIndex((t) => (
          //     t.Id === arr.Id
          //   ))
          // )
          ctrl.Setting.Module = arrModule;

        } else {
          var PermitModule = [];
          ctrl.Setting.Module.forEach((module) => {
            if (ctrl.$Utils.isEmpty(module.listUsers, "0") && JSON.parse(ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.LoggedOnUser)).UserId.indexOf(module.listUsers) >= 0) {
              PermitModule.push(module);
            } else if (ctrl.$Utils.isEmpty(module.UserPermissions, "0")) {
              var flag = false;
              module.UserPermissions.forEach((permission) => {
                var Roles = JSON.parse(ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.LoggedOnUser)).Roles
                var Groups = JSON.parse(ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.LoggedOnUser)).Groups
                Roles.forEach((role) => {
                  if (permission == role.GroupId) {
                    PermitModule.push(module);
                  }
                })
                Groups.forEach((group) => {
                  if (permission == group.GroupId) {
                    PermitModule.push(module);
                  }
                })
              })
              if(flag === true) {
                PermitModule.push(listItem);
              }
            } else if (!ctrl.$Utils.isEmpty(module.listUsers, "0") || module.listUsers == []) {
              PermitModule.push(module);
            }
          })
          ctrl.Setting.Module = PermitModule
        }
        var multiFilter = 0;
        ctrl.Setting.Module.forEach((module) => {
          if (module.ModuleType == 'Filter') {
            objComponents.arrFilter.push(module);
            ctrl.Setting.Filter = true;
            multiFilter++;
          } else {
            objComponents.arrModule.push(module);
          }
          if (multiFilter > 1 && ctrl.Setting.IsDashboard != 'true') {
            ctrl.Setting.ReportFilter = 'true';
          }
        });
        if (typeof ctrl.Setting.ModuleOrder === 'string' && ctrl.Setting.ModuleOrder != "") {
          var arrModuleOrder = ctrl.Setting.ModuleOrder.split(';');
          arrModuleOrder.forEach((moduleCode) => {
            for (var i = 0; i < objComponents.arrModule.length; i++) {
              if (moduleCode == objComponents.arrModule[i].ModuleCode) {
                arrayComponent.push(objComponents.arrModule[i]);
                break;
              }
            }
          });
        } else {
          arrayComponent = arrayComponent.concat(objComponents.arrModule);
        }
        if (typeof ctrl.Setting.FilterOrder === 'string' && ctrl.Setting.FilterOrder != "") {
          var arrFilterOrder = ctrl.Setting.FilterOrder.split(';');
          arrFilterOrder.forEach((module) => {
            for (var i = 0; i < objComponents.arrFilter.length; i++) {
              if (module == objComponents.arrFilter[i].ModuleCode) {
                arrayComponent.push(objComponents.arrFilter[i]);
                break;
              }
            }
          });
        } else {
          arrayComponent = arrayComponent.concat(objComponents.arrFilter);
        }
        ctrl.Setting.Module = arrayComponent;
        /** thêm sắp xếp thứ tự cho module và filter*/
        ctrl.loadSettingData(ctrl.Setting.Module, (formatData) => {
          //console.log(formatData)
          formatData.forEach((module) => {
            if (typeof ctrl.Setting[module.Code] === 'string') {
              $.each(ctrl.$Utils.stringToObject(ctrl.Setting[module.Code].replaceAll('+', '&').replaceAll(':', '=')), (key, val) => {
                if (val.indexOf('.EQUALTO') > 0) {
                  val = val.replaceAll('.AND', '&').replaceAll('.EQUALTO', '=');
                }
                module[key] = val;
              });
            }
            if (typeof module.AdditionConditions === 'string') {
              module.AdditionConditions = ctrl.$Utils.stringToObject(module.AdditionConditions, '&', '=');
            } else {
              module.AdditionConditions = [];
            }
            if (ctrl.$Utils.isEmpty(ctrl.Setting[module.Code + 'AdditionConditions']) && ctrl.Setting.IsDashboard != 'true') {
             //console.log(ctrl.Setting[module.Code + 'AdditionConditions'])
              ctrl.Setting[module.Code + 'AdditionConditions'].forEach((val) => {
                // if (ctrl.$Utils.isEmpty(val, 'Value') && val.Value.indexOf("|Url}}") >= 0) {
                //   var exp = val.Value,
                //     returnExpression = '';
                //   var returnExpression = exp.substr(0, exp.indexOf('{{'));
                //   var key = exp.substr(exp.indexOf('{{') + 2, exp.indexOf('}}') - exp.indexOf('{{') - 2);
                //   /** thêm filter dựa vào setting tính từ dấu |, định dạng được xác định bằng dấu : trong chuỗi */
                //   var name = key.substr(0, key.indexOf('|')).trim();
                //   module.AdditionConditions[val.Key] = ctrl.$Utils.stringToObject(ctrl.$route.params.value)[name]
                // } else
                  module.AdditionConditions[val.Key] = val.Value;
              })
              module.AdditionConditions = ctrl.replaceExpression(module.AdditionConditions, {});
            }

            /** thêm cấu hình từ directive cha vào */
            ctrl.Setting.Module.forEach((element) => {
              if (element.ModuleCode == module.Code) {
                if (ctrl.$Utils.isEmpty(element.parentSetting)) {
                  module.parentSetting = element.parentSetting;
                }
              }
            });
            if (ctrl.Setting.directiveType) {
              module.directiveType = ctrl.Setting.directiveType;
              module.place = ctrl.Setting.place;
            }
            ctrl.Setting.Module.forEach((m) => {
              if (m.ModuleCode == module.Code && !ctrl.$Utils.isEmpty(module, 'Group')) {
                module.Group = m.Group;
                if(m.SubElementType){
                  module.ModuleType = m.SubElementType;
                }
              }
            });
            module.LinkedObject = {};
            module.ModuleType = module.ModuleType ? module.ModuleType : module.Value;
            module.getFormData = ctrl.getFormData;
            switch (module.ModuleType) {
              case 'Report':
                // module.AutoSearch = true;
                ctrl.ReportPage = true;
                ctrl.$rootScope.isReport = true;
                ctrl.$rootScope.idReport = 'idReport';
                break;
              case 'Filter':
                module.FilterLink = [];
                if (ctrl.Setting.Pagination == 'true') {
                  module.Pagination = ctrl.Setting.Pagination;
                  module.WeekField = ctrl.Setting.WeekField;
                }
                if (ctrl.$Utils.isEmpty(ctrl.Setting.LimitIndex)) {
                  module.LimitIndex = ctrl.Setting.LimitIndex;
                }
                ctrl.Setting.Module.forEach((m) => {
                  if (m.ModuleCode == module.Code) {
                    module.FilterLink = ctrl.$Utils.isEmpty(m.FilterLink) ? m.FilterLink.split(';') : [];
                  }
                });
                // if (ctrl.Setting.IsDashboard != 'true') {
                //   module.LinkedObject.setFilterSideNav = setFilterSideNav;
                // }
                // module.LinkedObject.returnFilterData = onFilter;
                break;
              case 'Form':
                ctrl.Setting.ShowHeadCaption = 'false';
                module.LinkedObject.closeModal = () => {
                  if (ctrl.$Utils.isEmpty(ctrl.Setting.closeModal)) {
                    ctrl.Setting.closeModal();
                  }
                };
                break;
              case 'List':
                if(ctrl.Setting.LimitIndex){
                  module.LimitIndex = ctrl.Setting.LimitIndex;
                }
                module.LinkedObject.returnItemData = (setting, request) => {
                  ctrl.setModuleData(setting, request)
                };
                // module.LinkedObject.setPagination = (setting, totalRecord) => {
                //   ctrl.setPagination(setting, totalRecord)
                // };
                if(ctrl.Setting.ListCaption == 'true') {
                  module.ListCaption = true;
                }
                module.ShowSearchItem = true;
                module.AutoSearch = true;
                break;
            }
          });
          if(ctrl.ReportPage == true){
            if(ctrl.$Utils.isEmpty(ctrl.$rootScope.modeProject) && ctrl.$rootScope.modeProject.mode == 'MODE_PROJECT'){
              var request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
              request.R1_RequestDataGroup = 'DataGroup.quan-ly-du-an.053gf';
              request.R1_RequestFields = 'GroupId;GroupName;ProjectCode;GroupType;CreatedBy;State;Status;Type';
              request.R1_GroupType = 4;
              request.R1_RequestTemplate = 'tblGroup.Search';
              ctrl.$Utils.post(request).then((data) => {
                ctrl.ListProject = ctrl.$Utils.getDataWithRoot(data.R1, 'Data.UserDS.Group');
                ctrl.ListProject.forEach((value) =>{
                  value.name = value.Name;
                })
                ctrl.LabelProject = "Dự án";
              })
            } else {
              // var request = {
              //   RequestAction: 'SearchUserWithGroups',
              //   IncludedGroupManager: 'true',
              //   RequestClass: 'BPM',
              //   RequestDataType: 'json',
              //   SessionId: ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.SessionId),
              //   ConditionFields: 'IncludedGroupManager;Group;Status;LoginName;UserId',
              //   StaticFields: 'UserId;Username;LoginName;Description;Status;',
              //   DynamicFields: 'Avatar;Facebook;Email;Skype;Birthday;Biography;WorkProcess;Telephone',
              //   StructFields: 'GroupRoot;GroupRootName;PhoneId;PhoneGroup;Public;RoleRoot;RoleRootName;GroupManage;Notification',
              //   OrderFields: 'LoginName ASC',
              //   GroupType: '1',
              //   UserId: ctrl.$rootScope.loggedOnUser.UserId,
              //   Status: 1
              // };
              // ctrl.$Utils.post(request).then((data) => {
              //   ctrl.ListGroupId = ctrl.$Utils.getDataWithRoot(data, 'Data.UserDS.User');
                var requestD = {
                  R1_RequestTemplate : "tblGroup.Search",
                  R1_RequestDataGroup : "DataGroup.quan-ly-du-an.053gf",
                  R1_RequestFields : "GroupId;GroupName;Description;GroupParent;Status;GroupPath",
                  R1_GroupType : 1,
                  R1_OrderFields: 'GroupName ASC',
                  R1_RequestDataType: 'json',
                  R1_AssignedUser : this.$getItemLocalStorage(this.$localStorageConstant.SessionId),

                  // RequestClass: 'BPM',
                  // RequestAction: 'SearchGroup',
                  // SessionId: ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.SessionId),
                  // ConditionFields: 'GroupType,Description,GroupId',
                  // StaticFields: 'GroupId;GroupName;Description;GroupParent;Status;GroupPath',
                  // StructFields: 'ParentName',
                  // orderFields: 'GroupName ASC',
                  // RequestDataType: 'json',
                  // GroupId: ctrl.ListGroupId[0].Groups,
                  // R1_AssignedUser = this.$getItemLocalStorage(this.$localStorageConstant.SessionId);
                  // GroupType: 1
                };
                ctrl.$Utils.postCheckResult(requestD).then((dataD) => {
                  ctrl.ListProject = ctrl.$Utils.getDataWithRoot(dataD, 'UserDS.Group');
                  ctrl.ListProject.forEach((value) =>{
                    value.name = value.GroupName;
                  })
                  ctrl.LabelProject = "Phòng ban";
                })
              // })
            }
          }
          /** sắp xếp lại thứ tự của các module theo filter*/
          var arrModulesOrder = [],
            arrUsedIndex = [];
          $.each(formatData, function(index, module) {
            if (module.ModuleType == 'Filter') {
              arrModulesOrder.push(module);
              arrUsedIndex.push(index);
              /** kiểm tra liên kết của filter đến các form, list, report */
              for (var i = 0; i < formatData.length; i++) {
                var moduleData = ctrl.$Lodash.cloneDeep(formatData[i])
                // if (module.FilterLink.indexOf(formatData[i].Code) >= 0 && module.Group == formatData[i].Group) {
                if (module.FilterLink.indexOf(moduleData.Code) >= 0) {
                  if (ctrl.$Utils.isEmpty(ctrl.Setting[moduleData.Code + 'AdditionConditions']) && ctrl.$Utils.isEmpty(ctrl.Setting[moduleData.Code + 'AdditionConditions'][module.Group])) {
                    var addition = ctrl.$Lodash.cloneDeep(moduleData.AdditionConditions)
                    moduleData.AdditionConditions = {};
                    if(ctrl.Setting[moduleData.Code + 'AdditionConditions'][module.Group]  && ctrl.$Utils.isEmpty(ctrl.Setting[moduleData.Code + 'AdditionConditions'][module.Group])) {
                      moduleData.DefaultFilter = ctrl.Setting[moduleData.Code + 'AdditionConditions'][module.Group];
                      ctrl.Setting[moduleData.Code + 'AdditionConditions'][module.Group].forEach((val) => {
                        if (ctrl.$Utils.isEmpty(val.Key)) {
                          moduleData.AdditionConditions[val.Key] = val.Value;
                        }
                      })
                    }

                    // else if(ctrl.Setting[moduleData.Code + 'AdditionConditions'][module.Group]) {
                    //   moduleData.DefaultFilter = ctrl.Setting[moduleData.Code + 'AdditionConditions'][module.Group];
                    //   ctrl.Setting[moduleData.Code + 'AdditionConditions'][module.Group].forEach((val) => {
                    //     if (ctrl.$Utils.isEmpty(val.Key)) {
                    //       moduleData.AdditionConditions[val.Key] = val.Value;
                    //     }
                    //   })
                    // }
                    $.each(addition, (key, val) => {
                      moduleData.AdditionConditions[key] = val;
                    })
                    moduleData.AdditionConditions = ctrl.replaceExpression(moduleData.AdditionConditions, {});
                  }
                  moduleData.ShowSearchItem = false;
                  /*if(moduleData.ModuleType == "Report")*/
                    moduleData.AutoSearch = false;
                  moduleData.FilterRelative = module.Code;
                  moduleData.Group = module.Group
                  arrModulesOrder.push(moduleData);
                  arrUsedIndex.push(i);
                }
              }
            }
          });

          /** thêm các module ko có liên kết đến filter */
          $.each(formatData, (index, module) => {
            if (arrUsedIndex.indexOf(index) < 0)
              arrModulesOrder.push(module);
          });
          ctrl.Setting.Module = arrModulesOrder;
          arrModulesOrder.forEach((module) => {
            if (ctrl.Setting.IsDetail == 'true') {
              module.IsDetail = 'true';
            }
            if (module.ModuleType == 'Filter') {
              if (ctrl.Setting.IsDashboard == 'true') {
                module.IsDashboard = 'true';
              }
              ctrl.Setting.viewModel.filter.push(module);
            } else
              ctrl.Setting.viewModel.module.push(module);
          });
          ctrl.loadUrlData().then((setting) => {
              this.formatData = setting.Module;
            ctrl.$set(ctrl.Setting, 'Module', setting.Module);
            ctrl.ListDetail = [];
            if (ctrl.Setting.Groups) {
              ctrl.Setting.Groups.forEach((moduleGroup) => {
                moduleGroup.Modules = [];
                moduleGroup.Flex = moduleGroup.Flex == undefined ? parseInt(100 / ctrl.Setting.Groups.length) : moduleGroup.Flex;
                if (ctrl.changeGroups == true) {
                  if (ctrl.Setting.Groups.length <= 4)
                    moduleGroup.Flex = parseInt(100 / ctrl.Setting.Groups.length);
                  else if (ctrl.Setting.Groups.length <= 6)
                    moduleGroup.Flex = 33;
                  else
                    moduleGroup.Flex = 25;
                }

                ctrl.Setting.Module.forEach((value) => {
                  if (['Filter'].indexOf(value.ModuleType) >= 0 && value.Group == moduleGroup.Name) {
                    moduleGroup.ListModules += value.Code + ';';
                    moduleGroup.Filter = value.Code;
                  }
                })
                if (moduleGroup.ListModules) {
                  moduleGroup.ListModules.split(';').forEach((code) => {
                    var object = ctrl.Setting.Module.find((module) => {
                      return code && code == module.Code && (moduleGroup.Name == module.Group);
                    });
                    if (ctrl.$Utils.isEmpty(object) && ctrl.Setting.IsDashboard == 'true') {
                      object.ShowTable = object.DisplayTable ? object.DisplayTable : false;
                      if(object.HideReport) {
                        object.ShowReport = 'false'
                      }
                      object.ReportProportion = '100';
                      object.ShowReportHeader = 'true';
                    }
                    if (ctrl.$Utils.isEmpty(object)) {
                      object.Group = moduleGroup.Name;
                    }
                    if (ctrl.$Utils.isEmpty(object) && object.ModuleType == 'Filter') {
                      moduleGroup.GroupFilter = object;
                    }
                    if(object){
                      object.ModuleCode = object.Code;
                      moduleGroup.Modules.push(object);
                    }

                  });
                  // moduleGroup.Modules.clean();
                }
              });
            } else {
              ctrl.Setting.Groups = [{
                ColumnFlex: 100,
                Flex: 100,
                Modules: ctrl.Setting.Module,
                Caption: 'Default'
              }];
              ctrl.Setting.Module.forEach((object) => {
                if (object.ModuleType == "List" && ctrl.Setting.IsDetail == 'true') {
                  ctrl.ListDetail.push(object)
                }
                if (['Report'].indexOf(object.ModuleType) >= 0 && ctrl.Setting.IsProject == 'true') {
                  // console.log(ctrl.Setting)
                  // object.ShowTable = 'false';
                  object.ShowTable = object.DisplayTable ? object.DisplayTable : false;
                  if(object.HideReport) {
                    object.ShowReport = 'false'
                  }
                  object.ReportProportion = '100';
                  object.ShowReportHeader = 'false';
                  object.Flex = '50'
                  object.IsProject = 'true';
                }
              })
              if (ctrl.Setting.UrlPage == "dynamic/knowhow-document") {
                if (ctrl.isMobile.Android() || ctrl.isMobile.BlackBerry() || ctrl.isMobile.Opera() || ctrl.isMobile.iOS() && !ctrl.isMobile.iPad()) {

                  ctrl.Setting.Groups = [{
                    ColumnFlex: 100,
                    Flex: 100,
                    Modules: ctrl.Setting.Module
                  }];
                } else {

                  ctrl.Setting.Groups = [{
                    ColumnFlex: 75,
                    Flex: 75,
                    Modules: ctrl.Setting.Module
                  }]
                };

              }
            }

            if (ctrl.Setting.Pagination == 'true') {
              // ctrl.Setting.functions.setUpPagination();
            } else {
              // ctrl.Setting.functions.moduleReady();
            }
            // $.each(ctrl.Setting.Groups, (k, group)=>{
            //   if(group.Modules)
            //     $.each(group.Modules,(l,module)=>{
            //       if(module == undefined)
            //         delete group.Modules[l];
            //     });
            // })
            ctrl.Setting = Object.assign({}, ctrl.Setting)
          });
        });
      });
      if(ctrl.Setting.UrlPage == 'dynamic/knowhow-document'){
        ctrl.isDocumentPage = true;
      }
    },

    loadSettingData(moduleArray, callback) {
      var ctrl = this;
      var formatData = [];
      var request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
      request.R1_RequestTemplate = 'SettingNew.SearchSetting';
      request.R1_Code = '';
      moduleArray.forEach((module) => {
        request.R1_Code += module.ModuleCode + ';';
      });
      if (request.R1_Code == '')
        callback(formatData);
      else {
        ctrl.$Utils.post(request).then((data) => {
          data = ctrl.$Utils.getDataWithRoot(data.R1, 'Data.DynamicDS.Setting');
          moduleArray.forEach((module) => {
            if (module.ModuleType == "Report") {
              this.reportPage = true;
            }
            for (var i = 0; i < data.length; i++) {
              if (module.ModuleCode == data[i].Code) {
                if ((['Form', 'Filter', 'List', 'Report'].indexOf(module.ModuleType) != -1 || ['Form', 'Filter', 'List', 'Report'].indexOf(module.SubElementType) != -1) && typeof data[i].Description =="string") {
                  var refModule = data[i];
                  if(refModule.ModuleType != 'Filter'){
                    ctrl.listReport.push({Code: refModule.Code, Name: refModule.Name});
                  }
                  refModule.Description = refModule.Description ? JSON.parse(refModule.Description) : "";
                  if (ctrl.$Utils.isEmpty(refModule, "F1")) {
                    refModule.Description.Fields = '';
                    for (var i = 1; i <= refModule.Description.FCount; i++) {
                      if (refModule['F' + i] != undefined) {
                        refModule.Description.Fields += refModule['F' + i];
                        delete refModule['F' + i];
                      }
                    }

                    refModule.Description.Fields = typeof refModule.Description.Fields ==='string' ? JSON.parse(refModule.Description.Fields) : [];
                  }
                  refModule.Description.Code = refModule.Code;
                  refModule.Description.DataGroup = refModule.Name;
                  refModule.Description.Value = refModule.Value;
                  refModule.Description.ModuleType = module.ModuleType;
                  if (module.ModuleType == "Filter") {
                    if(!refModule.Description.functions){
                      refModule.Description.functions = {};
                    }
                    refModule.Description.functions.onFilter = this.onFilter;
                  }
                  if(module.Layout) {
                    refModule.Description.ModuleLayout = module.Layout
                  }
                  if(module.DisplayTable) {
                    refModule.Description.DisplayTable = module.DisplayTable
                  }
                  if(module.HideReport) {
                    refModule.Description.HideReport = module.HideReport
                  }
                  formatData.push(refModule.Description);
                } else {
                  if (data[i].DisplaySetting != undefined)
                    formatData.push(JSON.parse(data[i].DisplaySetting));
                  break;
                }
              }
            }
          });
          callback(formatData);
        });
      }
    },

    /**
     * Hàm lấy dựa liệu dựa theo setting và đường dẫn URL
     */
    loadUrlData() {
      var ctrl = this;
      return new Promise((resolve, reject) => {
        if (!ctrl.$Utils.isEmpty(ctrl.Setting.AutoLoad, 'length') && ctrl.Setting.AutoLoad != "") {
          ctrl.Setting.AutoLoad = [ctrl.Setting.AutoLoad];
        }

        ctrl.Setting.AutoLoad.forEach((loadFor) => {
          if (ctrl.$Utils.isEmpty(loadFor, "Enable")) {
            // // ctrl.Setting.AutoLoad = ctrl.$Utils.stringToObject(ctrl.Setting.AutoLoad);
            var objModuleFor = {};
            ctrl.Setting.Module.forEach((module) => {
              if (ctrl.$Utils.isEmpty(module) && module.Code == loadFor.Module) {
                objModuleFor = module;
              }
            });
            switch (loadFor.Type) {
              case 'loadDataBase':
                if (!ctrl.$Utils.isEmpty(objModuleFor.Code)) {
                  ctrl.$Utils.showMessage('error', ctrl.$toastMessage.settingTemplateError);
                  return false;
                }
                if (typeof loadFor.OtherCondition ==='string') {
                  $.each(ctrl.$Utils.stringToObject(loadFor.OtherCondition), (key, value) => {
                    loadFor[key] = value;
                  })
                }
                var request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
                request.R1_RequestDataGroup = loadFor.DataGroup ? loadFor.DataGroup : objModuleFor.DataGroup;
                request.R1_RequestTemplate = loadFor.DataSource ? loadFor.DataSource + '.Search' : objModuleFor.DataSource + '.Search';
                if (typeof loadFor.AdditionConditions ==="string") {
                  loadFor.AdditionConditions = ctrl.$Utils.stringToObject(loadFor.AdditionConditions);
                }
                //console.log(loadFor.AdditionConditions)
                /** Thêm điều kiện từ Setting.AdditionConditions */
                $.each(loadFor.AdditionConditions, (key, val) => {
                  request['R1_' + key] = val;
                });
                request.R1_RequestFields = '';
                if (ctrl.$Utils.isEmpty(loadFor.ParentChild) && loadFor.ParentChild == true) {
                  var Links = objModuleFor.Link;
                  if (ctrl.$Utils.isEmpty(Links)) {
                    var SubElementLinks = Links[loadFor.DataGroup]
                    SubElementLinks.forEach((value) => {
                      request.R1_RequestFields += value.Target + ';'
                      objModuleFor.Fields.forEach((field) => {
                        if (field.Name == value.Source && ctrl.$Utils.isEmpty(field, 'DynamicText')) {
                          request.R1_RequestFields += value.Target + 'Name;'
                        }
                      });
                    })
                  }
                } else {
                  objModuleFor.Fields.forEach((field) => {
                    request.R1_RequestFields += field.Name + ';'
                  });
                }
                var conditionObject;
                if (typeof loadFor.Condition ==='string') {
                  conditionObject = {};
                  loadFor.Condition.split(';').forEach((key) => {
                    if (loadFor[key]) {
                      conditionObject[key.trim()] = loadFor[key];
                    }
                  });
                  if (!ctrl.$Utils.isEmpty(objModuleFor.parentSetting)) {
                    objModuleFor.parentSetting = { object: {}, set: { GetFullData: 'false' } }
                  }
                }
                if (ctrl.$Utils.isEmpty(conditionObject)) {
                  request = ctrl.$Utils.updateParamsSingleRequest(request, conditionObject);
                }
                /** chuyển các biến trong parameter sang giá trị*/
                request = ctrl.replaceExpression(request, objModuleFor.parentSetting.object);
                if (loadFor.AssignedUser == true) {
                  request.R1_AssignedUser = ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.SessionId);
                }
                if (ctrl.$isSystemAdmin()) {
                  request.R1_AssignedUser = undefined;
                }
                if (ctrl.Setting.IsDetail != 'true' || (objModuleFor.SubElements && objModuleFor.SubElements.length == 0)) {
                  ctrl.$Utils.postCheckResult(request).then((result) => {
                    if (result.success && result.R1.success) {
                      var rootData = typeof loadFor.RootData ==='string' ? loadFor.RootData : objModuleFor.RootData != "Data.DynamicDS.Setting" ? objModuleFor.RootData : "Data";
                      var data = ctrl.$Utils.getDataWithRoot(result.R1, rootData)[0];
                      if (objModuleFor.RootData == "Data.DynamicDS.Setting" && ctrl.$Utils.isEmpty(result)) {
                        data = ctrl.$Utils.getDataWithRoot(result.R1, objModuleFor.RootData)[0];
                      }
                      result = data;
                      if (ctrl.$Utils.isEmpty(loadFor.ParentChild) && loadFor.ParentChild == true) {
                        var Links = objModuleFor.Link;
                        if (ctrl.$Utils.isEmpty(Links)) {
                          var SubElementLinks = Links[loadFor.DataGroup]
                          if (ctrl.$Utils.isEmpty(SubElementLinks)) {
                            SubElementLinks.forEach((value) => {
                              if (ctrl.$Utils.isEmpty(result[value.Target])) {
                                objModuleFor.parentSetting.object[value.Source] = result[value.Target];
                              }
                              if (ctrl.$Utils.isEmpty(result[value.Target + "Name"])) {
                                objModuleFor.parentSetting.object[value.Source + "Name"] = result[value.Target + "Name"];
                              }
                            });
                          }
                        }
                      } else {
                        $.each(result, (key, val) => {
                          objModuleFor.parentSetting.object[key] = val;
                        });
                      }
                      resolve(ctrl.Setting);
                    } else {
                      ctrl.$Utils.showMessage('error', ctrl.$toastMessage.loadingDataFailed);
                    }
                  });
                } else {
                  $.map(conditionObject, (value, index) => {
                    objModuleFor.parentSetting.object[index] = request["R1_" + index];
                  })
                  resolve(ctrl.Setting);
                }
                break;
              case 'includeUrlData':
                var url = window.location.href;
                if (url.indexOf('?') > 0 && objModuleFor.Code) {
                  var parameter = url.substring(url.indexOf('?') + 1, url.length);
                  parameter = ctrl.$Utils.stringToObject(decodeURIComponent(parameter));
                  objModuleFor.parentSetting = objModuleFor.parentSetting ? objModuleFor.parentSetting : { object: {} };
                  $.each(parameter, (key, val) => {
                    objModuleFor.parentSetting.object[key] = val;
                  });
                }
                resolve(ctrl.Setting);
                break;
            }
          } else {
            resolve(ctrl.Setting);
          }
        })
      })
    },

    setModuleData(setting, request) {
      var ctrl = this;
      if (typeof ctrl.Setting.SetDataSource ==='string' &&
        ctrl.Setting.SetDataSource.indexOf(setting.ModuleCode) &&
        typeof ctrl.Setting.SetDataTarget ==='string') {
        for (var i = 0; i < ctrl.Setting.Module.length; i++) {
          if (ctrl.Setting.Module[i].Code == ctrl.Setting.SetDataTarget && ctrl.$Utils.isEmpty(ctrl.Setting.Module[i].functions.setData)) {
            if (typeof ctrl.Setting.SetDataParentChild ==='string') {
              var Links = setting.Link
              var object = {};
              if (ctrl.$Utils.isEmpty(Links)) {
                var SubElementLinks = Links[ctrl.Setting.TargetCode]
               // console.log(ctrl.Setting.TargetCode)
                if (ctrl.$Utils.isEmpty(SubElementLinks)) {
                  // var fieldLink = SubElementLinks.map(function(elem){return elem.Source}).join(";");
                  var fieldLink = "";
                  SubElementLinks.forEach((value) => {
                    fieldLink += value.Source + ';';
                    fieldLink += value.Source + "Name;";
                  });
                  request.R1_RequestFields += fieldLink;
                  ctrl.$Utils.postCheckResult(request).then(function(result) {
                    if (result.success && result.R1.success) {
                      var item = ctrl.$Utils.getDataWithRoot(result.R1, setting.RootData)[0];
                      if (ctrl.$Utils.isEmpty(item)) {
                        SubElementLinks.forEach((value) => {
                          if (ctrl.$Utils.isEmpty(item[value.Source])) {
                            object[value.Target] = item[value.Source];
                          }
                          if (ctrl.$Utils.isEmpty(item[value.Source + "Name"])) {
                            object[value.Target + "Name"] = item[value.Source + "Name"];
                          }
                        });
                      }
                    } else {
                      ctrl.$Utils.showMessage("error", ctrl.$toastMessage.loadingDataFailed);
                    }
                    ctrl.Setting.Module[i].functions.setData(object);
                  });
                }
              } else {
                ctrl.Setting.Module[i].functions.setData(object);
              }
              //console.log(object)
            } else {
              ctrl.$Utils.postCheckResult(request).then(function(result) {
                if (result.success && result.R1.success) {
                  var item = ctrl.$Utils.getDataWithRoot(result.R1, ctrl.Setting.RootData)[0];
                  ctrl.Setting.Module[i].functions.setData(item);
                } else {
                  ctrl.$Utils.showMessage("error", ctrl.$toastMessage.loadingDataFailed);
                }
              });

            }
            break;
          }
        }
      }
    },

    checkSettingPage() {
      var ctrl = this;
      // var checkPage = $q.defer();
      return new Promise((resolve, reject) => {
        if (ctrl.Setting.Module && ctrl.Setting.Module[0] && ctrl.$Utils.isEmpty(ctrl.Setting.Module[0], 'ModuleCode') && ctrl.Setting.Module[0].ModuleCode.indexOf('Page.') == 0) {
          var exist = false;
          var parentSetting = ctrl.$Lodash.cloneDeep(ctrl.Setting.Module[0].parentSetting);
          // var dynamicMenu = ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.DynamicMenu);
          if (ctrl.$Utils.isEmpty(dynamicMenu)) {
            var menuObject = JSON.parse(dynamicMenu);
            menuObject.urlPage.forEach((page) => {
              if (page.Code == ctrl.Setting.Module[0].ModuleCode) {
                $.each(page, (key,val) => {
                  ctrl.Setting[key] = val;
                });
                exist = true;
                ctrl.Setting.Module = page.children;
                if (ctrl.$Utils.isEmpty(parentSetting)) {
                  ctrl.Setting.Module.forEach((m) => {
                    m.parentSetting = parentSetting;
                  });
                }
                /** chuyển giao diện về dạng module con*/
                ctrl.Setting.directiveType = 'inside';
                ctrl.Setting.place = 'page';
                resolve();
              }
            });
          }
          if (!exist) {
            ctrl.$Utils.showMessage('error', ctrl.$toastMessage.settingTemplateError);
            /** đóng pop-up*/
            if (ctrl.$Utils.isEmpty(ctrl.Setting.closeModal)) {
              ctrl.Setting.closeModal();
            }
            reject();
          }
        } else {
          resolve();
        }
      })
    },

    /**
     * Hàm replace các giá trị trong parameter
     */
    replaceExpression(request, object) {
      var ctrl = this;
      /** replace các giá trị là biến trong parameter với giá trị */
      $.each(request, (paramName, strVal) => {
        strVal = strVal + '';
        if (strVal.indexOf('{{') >= 0 && strVal.indexOf('}}') > strVal.indexOf('{{')) {
          var exp = strVal,
            returnExpression = '';
          while (exp != '') {
            returnExpression += exp.substr(0, exp.indexOf('{{'));
            var key = exp.substr(exp.indexOf('{{') + 2, exp.indexOf('}}') - exp.indexOf('{{') - 2);
            /** thêm filter dựa vào setting tính từ dấu |, định dạng được xác định bằng dấu : trong chuỗi */
            if (key.indexOf('|') > 0) {
              var name = key.substr(0, key.indexOf('|')).trim();
              var value = ctrl.$Utils.getDataWithRoot(object, name)[0];
              var filter = key.substr(key.indexOf('|') + 1, key.length).split(':');
              var type = filter[0].trim();
              var format = filter[1];
              switch (type) {
                /** trường hợp ngày tháng, lấy giá trị ngày tháng hiện tại với định dạng*/
                case 'Date':
                  value = ctrl.$Utils.stringToDate(value);
                  returnExpression += ctrl.$Utils.formatDateTime(value, format);
                  break;
                case 'RangeTime':
                  returnExpression += ctrl.$Utils.getDateTimeByKey(format, undefined, undefined, name);
                  break;
                case 'UserInfo':
                  /** trường hợp lấy thông tin người dùng*/
                  returnExpression += ctrl.$Utils.getUserInfo(name);
                  break;
                case 'Url':
                  /** trường hợp lấy thông tin từ đường dẫn*/
                  if (ctrl.$Utils.isEmpty(ctrl.$route.params, 'value'))
                    returnExpression += ctrl.$Utils.stringToObject(ctrl.$route.params.value)[name];
                  break;value
                default:
                  returnExpression += value;
                  break;
              }
            } else if (ctrl.$Utils.isEmpty(object[key])) {
              returnExpression += object[key];
            }
            exp = exp.substr(exp.indexOf('}}') + 2, exp.length);
          }
          request[paramName] = returnExpression;
        }
      });
      return request;
    },


    /// gọi hàm filter
    onsearch(objSetting, addValue) {
      var ctrl = this;
      if (ctrl.$Utils.isEmpty(objSetting, 'functions.onPagination')) {
        if (ctrl.$Utils.isEmpty(ctrl.filter, 'arrTree')) {
          if (addValue)
            ctrl.getFieldsData(0, [], objSetting, addValue)
          else
            ctrl.getFieldsData(0, [], objSetting, [])
        } else {
          objSetting.functions.onPagination(1, addValue);
        }
      }
    },

    onFilter(arrFilterData, objSetting) {
      var ctrl = this;
      objSetting.FilterLink.forEach(function(code) {
        for (var i = 0; i < ctrl.Setting.Module.length; i++) {
          if (ctrl.Setting.Module[i].Code == code) {
            if (ctrl.$Utils.isEmpty(ctrl.Setting.Module[i], 'functions.search' + ctrl.Setting.Module[i].ModuleType)) {
              ctrl.Setting.Module[i].functions['search' + ctrl.Setting.Module[i].ModuleType](arrFilterData);
            }
            break;
          }
        }
      });
    },

    getFormData(ListSetting){
      var ctrl = this;
      for (var i = 0; i < ctrl.Setting.Module.length; i++) {
        if (ctrl.Setting.Module[i].ModuleType == "Form" && ctrl.Setting.Module[i].Code!=ListSetting.Code) {
          if (ctrl.$Utils.isEmpty(ctrl.Setting.Module[i], 'functions.getobjSourceData')) {
            // return [ctrl.Setting.Module[i].functions['getobjSourceData'](), ctrl.Setting.Module[i]];
            var formData = ctrl.Setting.Module[i].functions['getobjSourceData']();
            if(formData){
              if (ctrl.$Utils.isEmpty(ctrl.Setting.Module[i].Link)) {
                  var Link = ctrl.Setting.Module[i].Link[ListSetting.DataGroup];
                  var item = {};
                  $.each(Link, (key, value) => {
                    if (ctrl.$Utils.isEmpty(formData[value.Source])) {
                      item[value.Target] = formData[value.Source];
                    }
                    if (
                      ctrl.$Utils.isEmpty(formData[value.Source + "Name"])
                    ) {
                      item[value.Target + "Name"] = formData[
                        value.Source + "Name"
                      ];
                    }
                  });
                  return item;
              } else {
                return formData;
              }
            }
          }
          break;
        }
      }
    },

    getFieldsData(intCount, arrResult, objSetting, addValue, callback) {
      var ctrl = this;
      if (intCount < ctrl.filter.arrTree.length) {
        /**
         * kiểm tra element con có hàm getVal hay không
         * nếu có sẽ kiểm tra validate trả về, valid = false thì dừng lại, nếu = true thì thêm kết quả vào mảng
         * nếu không sẽ gọi lại chính nó với intCount tăng lên 1
         */
        if (ctrl.$Utils.isEmpty(ctrl.filter.arrTree[intCount].getVal)) {
          ctrl.filter.arrTree[intCount].getVal(function(returnData) {
            var isOk = true;
            for (var i = 0; i < returnData.length; i++) {
              if (returnData[i].validate) {
                arrResult.unshift(returnData[i]);

              } else {
                isOk = false;
                break;
              }
            }
            if (isOk)
              ctrl.getFieldsData(intCount + 1, arrResult, objSetting, addValue, callback);
          });
        } else
          ctrl.getFieldsData(intCount + 1, arrResult, objSetting, addValue, callback);
      } else {
        ctrl.filter.data = arrResult;
        if (ctrl.Filtersave === true) {
          var dataSave = {};
          ctrl.filter.data.forEach((value) => {
            if (ctrl.$Utils.isEmpty(value, 'value') && value.value !== "") {
              dataSave[value.name] = value.value;
            }
          })
          ctrl.Filtersave = false;
        }
        if (ctrl.Filterlist === true) {
          var dataSave = {};
          ctrl.Filterlist = false;
        }
        if (addValue && addValue.length > 0) {
          addValue.forEach((value) => {
            arrResult.push(value)
          })
        }
        objSetting.functions.onPagination(1, arrResult);
        ctrl.FilterData = arrResult;
      }
    },

  }
};
</script>
<style lang="scss">
  .dynamic-page {
    .el-card__body {
      padding: 3px;
    }

    .dynamicDashboard {
      padding: 15px 5px 0px 5px;
    }

    .header-filter {
      width: 100%;

      .el-collapse-item__header {
        height: 30px;
        line-height: 30px;
        padding-left: 10px;

        .el-collapse-item__arrow {
          line-height: 30px;
        }
      }


      .el-collapse-item__content {
        padding-bottom: 0px;
      }
    }
    .filter__wrapper {
      .el-form-item__content {
        padding: 0 !important;
      }
      .el-form-item {
        margin-bottom: 10px !important;
      }
      .el-form-item__label {
        margin-bottom: 5px !important;
      }
      .el-input__inner {
        border-radius: 3px;
      }
      .list-filter {
        padding: 0 7px;
      }
    }
  }
</style>
