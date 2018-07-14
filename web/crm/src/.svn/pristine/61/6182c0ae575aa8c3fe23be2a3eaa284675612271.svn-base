<template>
  <div class="dynamic-chart">
    <div class="row">
      <div v-for="item in moduleSetting"  :class="'col-md-' + (objLayout[item.Code] ? objLayout[item.Code] : 12)">
        <div :class="'page-header mb-2 '+ (isDashboard?'dashboard':'')" v-if="item.ModuleType == 'Filter'">
          <div class="title-box py-1 pl-2 pr-4">
            <div :class="!isDashboard?'':''" class="flex" style="align-items: center;">
              <!-- <h5 v-if="!isDashboard" class="" style="font-size: 16px; flex: 2"><i class="fa fa-line-chart"></i><span>  Báo cáo</span></h5> -->
              <div class="text-right pr-0  flex-end" style="align-items: end; padding-left: 5px; flex:10; align-items: center;">
                <div v-if="isDashboard" class="text-left dashboard-caption inline-block w100p">
                  <strong>{{mCaption}}</strong>
                </div>
                <div v-if="!isDashboard" class="quick-filter__wrapper inline-block w100p">
                  <DynamicFilter
                    :pSetting="item"
                    :isQuickFilter="true"
                  ></DynamicFilter>
                </div>
                <el-button class="btn btn-link btn-dashboard" v-b-modal="mSetting[0].Caption + item.Code + '.chartFilter'" style="vertical-align: top; padding: 0;color:#fff;" v-if="isDashboard" type='text'>
                  <i class="fa fa-filter fa-lg"></i>
                </el-button>
                <el-tooltip class="item" effect="dark" content="Lọc nâng cao" placement="bottom" v-else>                     
                  <el-button style="padding-right:7px;padding-left:7px;line-height:12px;margin-top:10px;margin-left: 10px;" v-b-modal="mSetting[0].Caption + item.Code + '.chartFilter'"  class='fa fa-filter btn-dashboard'></el-button>  
                </el-tooltip>
              </div>
              <b-modal class="chartFilter text-primary" :id="mSetting[0].Caption  + item.Code + '.chartFilter'" ref="chartFilter" title="Bộ lọc"  header-bg-variant="primary" hide-footer>
                <template>
                  <div>
                   <DynamicFilter
                     :pSetting="item"
                     :isInModal="true"
                   ></DynamicFilter>
                  </div>
                </template>
              </b-modal>
            </div>

            <div class="clearfix"></div>

          </div>

        </div>
      <!-- </div> -->
    
      <!-- <div v-for="item in moduleSetting" v-if="item.ModuleType != 'Filter'"> -->
        <div v-else>
          <b-card>

            <Report
              :Setting="item"
              :Filter="filter"
              :SearchIndex="searchIndex"
              :FilterSetting="objfilterSetting" v-if="item.ReportType !=  'LiveLine'"
            ></Report>
            <LiveLine :chartInfo="item" v-if="item.ReportType ==  'LiveLine'"></LiveLine>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Report from './dynamic/DynamicReport';
  import LiveLine from '@/components/dynamic/report/livelines';
  import SelectTree from '@/components/dynamic/SelectTree'
  import DynamicFilter from "@/components/dynamic/DynamicFilter";

  Vue.component('Report', Report)
  export default {
    components: {SelectTree, DynamicFilter, LiveLine},
    props: ['mSetting', 'pSetting', 'mCaption', 'mIndex'],
    data() {
      var firstDayOfWeekCfg = this.$getItemLocalStorage('firstDayOfWeekCfg')? parseInt(JSON.parse(this.$getItemLocalStorage('firstDayOfWeekCfg')).Value): 1;
      return {
        isDashboard: this.pSetting.Description && this.pSetting.Description.indexOf('"IsDashboard":"true"') > -1,
        firstDayOfWeekCfg: firstDayOfWeekCfg,
        filter: {},
        PlanStartDate: [],
        arrReport: [],
        listWorkers: [],
        ListProject: [],
        listVersionProjects: [],
        searchIndex: 0,
        objLayout: {},
        dateOptions: {
          shortcuts: [
            {
              text: 'Hôm trước',
              onClick(picker) {
                var now = new Date();
                var end = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + (now.getDate() - 1) + ' 23:59:59');
                var start = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + (now.getDate() - 1) + ' 00:00:00');

                picker.$emit('pick', [start, end]);
              }
            }, {
              text: 'Hôm nay',
              onClick(picker) {
                var now = new Date();
                var start = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' 00:00:00');
                var end = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' 23:59:59');

                picker.$emit('pick', [start, end]);
              }
            }, {
              text: 'Hôm sau',
              onClick(picker) {
                var now = new Date();
                var start = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + (now.getDate() + 1) + ' 00:00:00');
                var end = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + (now.getDate() + 1) + ' 23:59:59');

                picker.$emit('pick', [start, end]);
              }
            }
            , {
              text: 'Tuần trước',
              onClick(picker) {
                var dateVal = new Date();
                dateVal.setTime(dateVal.getTime() - 3600 * 1000 * 24 * 7);
                var monday = Vue.moment(dateVal).isoWeekday(firstDayOfWeekCfg).startOf('isoweek')._d;
                var sunday = Vue.moment(dateVal).isoWeekday(firstDayOfWeekCfg).endOf('isoweek')._d;

                var start = new Date(monday.getFullYear() + '/' + (monday.getMonth() + 1) + '/' + monday.getDate() + ' 00:00:00');
                var end = new Date(sunday.getFullYear() + '/' + (sunday.getMonth() + 1) + '/' + sunday.getDate() + ' 23:59:59');


                picker.$emit('pick', [start, end]);
              }
            }, {
              text: 'Tuần này',
              onClick(picker) {
                var dateVal = new Date();
                var monday = Vue.moment(dateVal).isoWeekday(firstDayOfWeekCfg).startOf('isoweek')._d;
                var sunday = Vue.moment(dateVal).isoWeekday(firstDayOfWeekCfg).endOf('isoweek')._d;

                var start = new Date(monday.getFullYear() + '/' + (monday.getMonth() + 1) + '/' + monday.getDate() + ' 00:00:00');
                var end = new Date(sunday.getFullYear() + '/' + (sunday.getMonth() + 1) + '/' + sunday.getDate() + ' 23:59:59');


                picker.$emit('pick', [start, end]);
              }
            }, {
              text: 'Tuần sau',
              onClick(picker) {
                var dateVal = new Date();
                dateVal.setTime(dateVal.getTime() + 3600 * 1000 * 24 * 7);
                var monday = Vue.moment(dateVal).isoWeekday(firstDayOfWeekCfg).startOf('isoweek')._d;
                var sunday = Vue.moment(dateVal).isoWeekday(firstDayOfWeekCfg).endOf('isoweek')._d;

                var start = new Date(monday.getFullYear() + '/' + (monday.getMonth() + 1) + '/' + monday.getDate() + ' 00:00:00');
                var end = new Date(sunday.getFullYear() + '/' + (sunday.getMonth() + 1) + '/' + sunday.getDate() + ' 23:59:59');


                picker.$emit('pick', [start, end]);
              }
            }, {
              text: 'Tháng trước',
              onClick(picker) {
                var dateVal = new Date();
                var pre = Vue.moment().subtract(1, 'months')._d;
                var start = Vue.moment(pre).startOf('month')._d;
                var end = Vue.moment(start).endOf('month')._d;

                picker.$emit('pick', [start, end]);
              }
            }, {
              text: 'Tháng này',
              onClick(picker) {
                var dateVal = new Date();
                var start = Vue.moment([dateVal.getFullYear(), dateVal.getMonth()])._d;
                var end = Vue.moment(start).endOf('month')._d;

                picker.$emit('pick', [start, end]);
              }
            }, {
              text: 'Tháng sau',
              onClick(picker) {
                var dateVal = new Date();
                var next = Vue.moment().add(1, 'months')._d;
                var start = Vue.moment(next).startOf('month')._d;
                var end = Vue.moment(start).endOf('month')._d;

                picker.$emit('pick', [start, end]);
              }
            }]
        },
        filterSetting: [],
        objfilterSetting: {},
        moduleSetting: [],
        // arrFilter: [],
        quickFilterSetting: {},
        quickFilterModel: {}
      }
    },
    methods: {
      // handleChange(value) {
      // }
      // getProject() {
      //   var params = {
      //     RequestAction: 'SearchUserWithGroups',
      //     IncludedGroupManager: 'true',
      //     RequestClass: 'BPM',
      //     RequestDataType: 'json',
      //     ConditionFields: 'IncludedGroupManager;Group;Status;LoginName;UserId',
      //     StaticFields: 'UserId;Username;LoginName;Description;Status;',
      //     DynamicFields: 'Avatar;Facebook;Email;Skype;Birthday;Biography;WorkProcess;Telephone',
      //     StructFields: 'GroupRoot;GroupRootName;PhoneId;PhoneGroup;Public;RoleRoot;RoleRootName;GroupManage;Notification',
      //     OrderFields: 'LoginName ASC',
      //     GroupType: '1',
      //     UserId: JSON.parse(localStorage.getItem('LoggedOnUser'))['UserId'],
      //   }
      //   this.$Utils.post(params).then(data => {
      //     data = this.$Utils.getDataWithRoot(data, 'Data.UserDS.User')[0];
      //     var requestD = {
      //       RequestClass: 'BPM',
      //       RequestAction: 'SearchGroup',
      //       ConditionFields: 'GroupType,Description,GroupId',
      //       StaticFields: 'GroupId;GroupName;Description;GroupParent;Status;GroupPath',
      //       StructFields: 'ParentName',
      //       orderFields: 'GroupName ASC',
      //       RequestDataType: 'json',
      //       GroupId: data.Groups,
      //       GroupType: 1
      //     };
      //     this.$Utils.postCheckResult(requestD).then(dataD => {
      //       this.ListProject = this.$Utils.getDataWithRoot(dataD, 'UserDS.Group');
      //     })
      //   })
      // },
      // getWorker() {
      //   var params = this.$Lodash.cloneDeep(this.$singleRequest)
      //   params.R1_RequestTemplate = 'User'
      //   params.R1_limit = 1000
      //   params.R1_page = 1
      //   params.R1_start = 0
      //   params.R1_Status = 1
      //   this.$Utils.post(params).then(data => {
      //     this.listWorkers = this.$Utils.getDataWithRoot(data.R1, 'Data.UserDS.User');
      //   })
      // },
      // getVersionProject() {
      //   var params = this.$Lodash.cloneDeep(this.$singleRequest)
      //   params.R1_RequestDataGroup = 'DataGroup.quan-ly-du-an.053gf'
      //   params.R1_RequestFields = 'Id;Name;ProjectCode;Code;CreatedBy;State;Status;Type'
      //   params.R1_Code = 'Project'
      //   params.R1_RequestTemplate = 'xDocument_Document.Search'
      //   this.$Utils.post(params).then(data => {
      //     this.listVersionProjects = this.$Utils.getDataWithRoot(data.R1, 'Data.DocumentDS.Document');
      //   })
      // },
      // search() {
      //   this.searchIndex++;
      //   this.$refs.chartFilter.hide();
      // },
      // clearInput() {
      //   this.filter = {};
      //   this.PlanStartDate = [];
      // },
      // handleChangeQuickFilter (time_range) {
      //   let arrFilterData = []
      //   for (var k in time_range) {
      //     arrFilterData.push({
      //       name: k,
      //       value: time_range[k]
      //     })
      //   }
      //   this.onFilter(arrFilterData, true)
      // },
      onFilter(arrFilterData, Setting) {
        // if (!Setting) {
        //   this.time_range_type = null
        // }
        var ctrl = this;
        this.filter = {};
        this.filter.FilterCode = Setting.Code
        arrFilterData.forEach(val => {
          if(val.name && val.name!="")
            this.filter[val.name] = val.value;
        })
        ctrl.objfilterSetting = Setting;
        this.searchIndex++;
        // this.$refs['chartFilter'][0].hide();
        if(ctrl.$refs['chartFilter'] && ctrl.$refs['chartFilter'].length){
          ctrl.$refs['chartFilter'].forEach(fil =>{
            fil.hide();
          })
        }
      },

      replaceExpression(strVal, object) {
        var ctrl = this;
        /** replace các giá trị là biến trong parameter với giá trị */
        // $.each(request, (paramName, strVal) => {
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
            strVal = returnExpression;
          }
        // });
        return strVal;
      }
    },
    watch: {
      // PlanStartDate: function (date) {
      //   var s = '',
      //     e = '';
      //   if (this.$Utils.isEmpty(date, '0')) {
      //     s = date[0];
      //     s.setHours(0, 0, 0);
      //     this.filter['PlanStartDateStartValue'] = this.$Utils.formatDateTime(s)
      //   }
      //   if (this.$Utils.isEmpty(date, '1')) {
      //     e = date[1];
      //     e.setHours(23, 59, 59);
      //     this.filter['PlanStartDateEndValue'] = this.$Utils.formatDateTime(e);
      //   }
      // }
    },
    created () {
      var ctrl = this;
      ctrl.filterSetting = ctrl.mSetting.filter((el) => {
        return el.ModuleType == 'Filter';
        ;
      });
      var index = 0;
      ctrl.filterSetting.forEach(filter => {
        ctrl.quickFilterSetting[filter.Code] = filter.Groups[0] && filter.Groups[0]['children'] || []
        filter.functions = {
          onFilter: ctrl.onFilter,
          // UrlData:  ctrl.Setting.UrlData
        }
        index ++;
      })
      // ctrl.filterSetting = ctrl.arrFilter
      // ctrl.getProject();
      // ctrl.getWorker();
      // ctrl.getVersionProject();
      var dateVal = new Date();
      var monday = Vue.moment(dateVal).isoWeekday(ctrl.firstDayOfWeekCfg).startOf('isoweek')._d;
      var sunday = Vue.moment(dateVal).isoWeekday(ctrl.firstDayOfWeekCfg).endOf('isoweek')._d;
      var start = new Date(monday.getFullYear() + '/' + (monday.getMonth() + 1) + '/' + monday.getDate() + ' 00:00:00');
      var end = new Date(sunday.getFullYear() + '/' + (sunday.getMonth() + 1) + '/' + sunday.getDate() + ' 23:59:59');
      ctrl.PlanStartDate = [start, end]
      var request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
      request.R1_RequestTemplate = 'SettingNew.SearchSetting';
      //request.R1_Code = ctrl.reportCode;
      request.R1_Id = ctrl.pSetting.Id;
      // request.R1_Id = 'ba09b34a-a169-4180-ab14-7fc5115f8eee';
      ctrl.$Utils.post(request).then(data => {
        data = ctrl.$Utils.getDataWithRoot(data.R1, 'Data.DynamicDS.Setting')[0];
        if (data) {
          var listModule = ctrl.$Utils.jsonParse(data.Value);
          if(ctrl.isDashboard){
            listModule =  ctrl.mSetting;
          }

          var pageDescription =  ctrl.$Utils.jsonParse(data.Description);
          // console.log(ctrl.mIndex)
          // console.log(pageDescription)
          if(ctrl.$Utils.isEmpty(pageDescription, 'ModuleOrder'))
            var ModuleOrder = pageDescription.ModuleOrder.split(';');
          else if(ctrl.$Utils.isEmpty(pageDescription.Groups)  && ctrl.$Utils.isEmpty(pageDescription.Groups[ctrl.mIndex]) && ctrl.$Utils.isEmpty(pageDescription.Groups[ctrl.mIndex], 'ModuleOrder'))
            var ModuleOrder = pageDescription.Groups[ctrl.mIndex].ModuleOrder.split(';');
          else if(ctrl.$Utils.isEmpty(pageDescription.Groups) && ctrl.$Utils.isEmpty(pageDescription.Groups[ctrl.mIndex]))
            var ModuleOrder = pageDescription.Groups[ctrl.mIndex].ListModules.split(';');
          var listReport = "";
          var listFilter = "";
          if (listModule) {
            $.each(listModule, (key, value) => {
              if (value.ModuleType == 'Report') {
                ctrl.objLayout[value.Code] = value.ModuleLayout
                if (ctrl.$Utils.isEmpty(value.listUsers, "0") && JSON.parse(ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.LoggedOnUser)).UserId.indexOf(value.listUsers) >= 0) {
                  listReport += value.ModuleCode + ";";
                } else if (ctrl.$Utils.isEmpty(value.UserPermissions, "0")) {
                  value.UserPermissions.forEach((permission) => {
                    var Roles = JSON.parse(ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.LoggedOnUser)).Roles;
                    Roles.forEach((role) => {
                      if (permission == role.GroupId) {
                        listReport += value.ModuleCode + ";";
                      }
                    })
                    var Groups = JSON.parse(ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.LoggedOnUser)).Groups;
                    Groups.forEach((group) => {
                      if (permission == group.GroupId) {
                        listReport += value.ModuleCode + ";";
                      }
                    })
                  })
                } else if (!ctrl.$Utils.isEmpty(value.listUsers, "0") || value.listUsers == []) {
                  listReport += value.ModuleCode + ";";
                }
                // listReport += value.ModuleCode + ";";
              } else if (value.ModuleType == 'Filter') {
                listFilter += value.ModuleCode + ";";
              }
            })
            if(listReport) {
              var reportRequest = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
              reportRequest.R1_RequestTemplate = 'SettingNew.SearchSetting';
              reportRequest.R1_Code = listReport;
              reportRequest.R1_AssignedUser = ctrl.$getItemLocalStorage(
                 ctrl.$localStorageConstant.SessionId
              )
              ctrl.$Utils.post(reportRequest).then(rdata => {
                rdata = ctrl.$Utils.getDataWithRoot(rdata.R1, 'Data.DynamicDS.Setting');
                var objReport = {};
                $.each(rdata, (key, value) => {
                  value.Value = ctrl.$Utils.jsonParse(value.Value);
                  var des = ctrl.$Utils.jsonParse(value.Description);
                  delete value.Description;
                  $.each(des, function (k, val) {
                    value[k] = val;
                  })
                  // if(key == 1)
                  if(!ModuleOrder){
                    ctrl.arrReport.push(value)
                  }
                  objReport[value.Code] = value
                })
                if(ModuleOrder)
                  ModuleOrder.forEach(module =>{
                    if(ctrl.$Utils.isEmpty(objReport[module]) && module!=''){
                      ctrl.arrReport.push(objReport[module])
                    }
                  })
                 $.each(listModule, (key, value) => {
                    $.each(ctrl.arrReport, (akey, aval) => {
                      aval.IsDashBoard=ctrl.isDashboard;
                      if(aval.Code == value.ModuleCode) {
                        ctrl.arrReport[akey].ShowTable = value.ShowTable;
                        if(value.HideReport) {
                          ctrl.arrReport[akey].ShowReport = 'false'
                        }
                        if (ctrl.$Utils.isEmpty(value, 'DefaultFilter')) {
                            if(!aval.AdditionConditions) {
                              ctrl.arrReport[akey].AdditionConditions = "";
                            }
                            value.DefaultFilter.forEach(fil => {
                              ctrl.arrReport[akey].AdditionConditions += "&" + fil.Key + "=" + fil.Value
                            })
                            ctrl.arrReport[akey].AdditionConditions = ctrl.replaceExpression(ctrl.arrReport[akey].AdditionConditions, {})
                          }
                        }
                    })
                 })
                 // moduleSetting
                 var objSetting = {}
                 ctrl.filterSetting.forEach(filter => {
                    objSetting[filter.Code] = [];
                    objSetting[filter.Code].push(filter)
                    $.each(ctrl.arrReport, (key, value) => {
                      if(filter.FilterLink.indexOf(value.Code) !== -1 && value.Code!=''){
                        value.FilterCode = filter.Code;
                        objSetting[filter.Code].push(value)
                      }
                    })
                    ctrl.moduleSetting = ctrl.moduleSetting.concat(objSetting[filter.Code])
                 })
              })

            } else {
              ctrl.$Utils.showMessage("error", ctrl.$toastMessage.settingTemplateError);
            }
            

            /** Lấy dữ liệu filter
            var filterRequest = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
            filterRequest.R1_RequestTemplate = 'SettingNew.SearchSetting';
            filterRequest.R1_Code = listFilter;
            ctrl.$Utils.post(filterRequest).then(fdata => {
              fdata = ctrl.$Utils.getDataWithRoot(fdata.R1, 'Data.DynamicDS.Setting');

              $.each(fdata, (key, value) => {
                value.Value = ctrl.$Utils.jsonParse(value.Value);
                var des = ctrl.$Utils.jsonParse(value.Description);
                delete value.Description;

                if (ctrl.$Utils.isEmpty(value, "F1")) {
                    des.Fields = "";
                    for (var i = 1; i <= des.FCount; i++) {
                      if (value["F" + i] != undefined) {
                        des.Fields += value["F" + i];
                        delete value["F" + i];
                      }
                    }

                    des.Fields =
                      typeof des.Fields === "string"
                        ? JSON.parse(des.Fields)
                        : [];
                  }
                  des.Code = value.Code;
                  des.DataGroup = value.Name;
                  des.Value = value.Value;
                  des.ModuleType = module.ModuleType;
                  if (typeof des.AdditionConditions ==='string') {
                    des.AdditionConditions = ctrl.$Utils.stringToObject(des.AdditionConditions, '&', '=');

                  }

                  $.each(des, function (k, val) {
                    value[k] = val;
                  })
                console.log(value)
                // if(key == 1)
                // ctrl.arrReport.push(value)
              })


            })
            */
          }
        }
      })
    }
  }
</script>

<style lang="scss">
  .dashboard{
    /*height: 30px;*/
    font-size: 11px;
    margin-bottom: 0.2rem !important;
    .btn-dashboard {
      padding: 0.01rem 0.1rem !important;
      .el-button:focus, .el-button:hover {
        border: none;
        backgroundd: none;
      }
    }

    .dashboard-caption {
      display: table;
      table-layout: fixed;
      width: 100%;
      white-space: nowrap;

      * {
        display: table-cell;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .dynamic-chart {
    .card {
      margin-bottom: 5px;
    }
    .chartFilter .modal-dialog {
      position: fixed;
      right: 0;
      margin: 0;
      height: 100%;
    }

    .title-box {
      /*background-color: #f0f3f5;*/
      background-color: #fff;
      border: 1px solid #c2cfd6;
    }

    .dashboard {
      .title-box {
        background-color: #f50808;
        border: 1px solid #c2cfd6;
        color: #fff;
        font-size:17px;
      }
    }

    .chartFilter .modal-dialog .modal-content {
      height: 100%;
    }
    .quick-filter__wrapper {
      .el-main{
        overflow-y: hidden;
      }
      .el-date-editor {
        display: flex;
      }
    }
  }
</style>

<style scoped>
  .row {
    align-items: center;
  }
  @media screen and (min-width: 1024px){
    .title-box{
      padding: 0 1rem !important;
    }
  }
</style>
