<template>
  <div class="dynamic-report">
    <!-- <b-card class="md-hue-2" v-if="reports['ShowReportHeader'] != 'false'"> -->
    <div class="row reports-header">
      <h4 v-if="isHiddenCaption || reports['FormRequest']"
          class="card-title col-md reports-title">{{reports.Caption}}</h4>
      <!-- <div class="md-toolbar-tools col-md-1 text-right"> -->
      <button class="primary"
              type="button"
              v-on:click="refreshReport()"
              v-if="reports['FormRequest'] && !ShowTree">
        Mở rộng
      </button>
      <button class="md-raised md-warn md-button md-default-theme md-ink-ripple blue-500-bg"
              type="button"
              v-on:click="refreshReport()"
              v-if="reports['FormRequest'] && ShowTree">
        Thu gọn
      </button>
      <!-- </div> -->
    </div>
    <!-- </b-card> -->
    <div class="text-center"
         v-if="dataBinding!=''">{{dataBinding}}</div>
    <div v-if="dataBinding==''" class="row">
      <h4 class="card-title col-md-12 reports-title" v-if="!Setting.IsDashBoard  && !reports['FormRequest']">{{reports.Caption}}</h4>
      <div :class="'table-responsive col-md-' + Math.ceil((Setting.TableProportion/100) * 12)"
           v-if="reports['ShowTable']!==false && reports['ShowTable']!='false'">
        <table class="table report-table table-bordered table-hover"
               width="100%"
               v-if="!reports['viewModel']['isLoading'] && !reports['viewModel']['reportNull']">
          <thead>
            <tr v-for="head in reports['formatData']['reportDataTable']['tableTH']">
              <th v-for="v in head"
                  :rowspan="v.rowspan"
                  class="text-center secondary-text"
                  :colspan="v.colspan">
                {{v.value}}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row,key) in reports['formatData']['reportDataTable']['tableTB']"
                :class="(key == reports['formatData']['reportDataTable']['tableTB'].length - 1 && reports.HideTotal!='true') ? 'TotalRow' : ''">
              <td v-for="(v,k) in row"
                  :colspan="v.colspan"
                  :class="k>0 ? 'text-right': ''">
                {{dynamicDataFilter(v.value, v.setting)}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-for="gObj in reports['formatData']['gObject']"
           v-if="!reports['viewModel']['isLoading'] && !reports['viewModel']['reportNull'] && reports['viewModel']['reportReady'] && gObj['Display']" :class="'col-md-' + Math.floor((Setting.ReportProportion/100) * 12)">
        <MainChart :Setting="gObj"></MainChart>
      </div>
    </div>
    <!-- {{reports['formatData']['gObject']}} -->
  </div>

</template>

<script>
import Vue from 'vue'
import MainChart from './report/main';
// loadFunnel(Highcharts);
Vue.component('MainChart', MainChart)
export default {
	props: ['Setting', 'Filter', 'SearchIndex', 'FilterSetting'],
	data() {
		return{
		  	isHiddenCaption: false,
			reports: this.$Lodash.cloneDeep(this.Setting),
			listSearchCondition: [],
		    objSourceData: {},
		    fields: {},
		    filterReady: false,
		    dataBinding: 'Đang tải ...',
		    dynamicDataFilter: this.$Utils.dynamicDataFilter,
		    rangePeriod: this.Setting.rangePeriod ? this.Setting.rangePeriod : 3,
		    reportCaption: this.$Lodash.cloneDeep(this.Setting.Caption),
		}
	},
	methods: {
		formatCaption(filter) {
			var ctrl = this;
			var val = ctrl.$Lodash.cloneDeep(ctrl.reportCaption);
			var returnExpression = "";
			if (val.indexOf('{{') >= 0 && val.indexOf('}}') > val.indexOf('{{')) {
			  returnExpression += val.substr(0, val.indexOf('{{'));
	          var key = val.substr(val.indexOf('{{') + 2, val.indexOf('}}') - val.indexOf('{{') - 2);
	          if (key.indexOf('|') > 0) {
	            var type = key.substring(key.indexOf('|') + 1, key.length).trim(), fil = '';
	            key = key.substring(0, key.indexOf('|')).trim();
	            if (type.indexOf(':') > 0) {
	              fil = type.substring(type.indexOf(':') + 1, type.length).trim();
	              type = type.substring(0, type.indexOf(':')).trim();
	            }
				if(filter[key + "StartValue"] && filter[key + "EndValue"]) {
					var now = new Date();
					var start = ctrl.$Utils.formatDateTime(filter[key + "StartValue"], 'YYYY/M/D')
					var end = ctrl.$Utils.formatDateTime(filter[key + "EndValue"], 'YYYY/M/D')
					var firstDayOfWeekCfg = this.$getItemLocalStorage('firstDayOfWeekCfg')? parseInt(JSON.parse(this.$getItemLocalStorage('firstDayOfWeekCfg')).Value): 1;

					var preweek = new Date();
					preweek.setTime(preweek.getTime() - 3600 * 1000 * 24 * 7)
					var premonday = Vue.moment(preweek).isoWeekday(firstDayOfWeekCfg).startOf('isoweek')._d;
                	var presunday = Vue.moment(preweek).isoWeekday(firstDayOfWeekCfg).endOf('isoweek')._d;

                	var monday = Vue.moment(now).isoWeekday(firstDayOfWeekCfg).startOf('isoweek')._d;
                	var sunday = Vue.moment(now).isoWeekday(firstDayOfWeekCfg).endOf('isoweek')._d;

                	var nextweek = new Date();
					nextweek.setTime(nextweek.getTime() + 3600 * 1000 * 24 * 7)
                	var nextmonday = Vue.moment(nextweek).isoWeekday(firstDayOfWeekCfg).startOf('isoweek')._d;
                	var nextsunday = Vue.moment(nextweek).isoWeekday(firstDayOfWeekCfg).endOf('isoweek')._d;

					if(end == now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + (now.getDate() - 1) && 
						start == now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + (now.getDate() - 1)){
						returnExpression += 'ngày hôm trước';
					} else
					if(end == now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() && 
						start == now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate()){
						returnExpression += 'ngày hôm nay';
					} else
					if(end == now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + (now.getDate() + 1) && 
						start == now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + (now.getDate() + 1)){
						returnExpression += 'ngày hôm sau';
					} else
					if(end == presunday.getFullYear() + '/' + (presunday.getMonth() + 1) + '/' + presunday.getDate() && 
						start == premonday.getFullYear() + '/' + (premonday.getMonth() + 1) + '/' + premonday.getDate()){
						returnExpression += 'tuần trước';
					} else
					if(end == sunday.getFullYear() + '/' + (sunday.getMonth() + 1) + '/' + sunday.getDate() && 
						start == monday.getFullYear() + '/' + (monday.getMonth() + 1) + '/' + monday.getDate()){
						returnExpression += 'tuần này';
					} else
					if(end == nextsunday.getFullYear() + '/' + (nextsunday.getMonth() + 1) + '/' + nextsunday.getDate() && 
						start == nextmonday.getFullYear() + '/' + (nextmonday.getMonth() + 1) + '/' + nextmonday.getDate()){
						returnExpression += 'tuần sau';
					} else
					if(start == now.getFullYear() + '/' + (now.getMonth()) + '/' + new Date(now.getFullYear(), now.getMonth() - 1, 1).getDate() && 
						end == now.getFullYear() + '/' + (now.getMonth()) + '/'  + new Date(now.getFullYear(), now.getMonth(), 0).getDate()){
						returnExpression += 'tháng trước';
					} else
					if(start == now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + new Date(now.getFullYear(), now.getMonth(), 1).getDate() && 
						end == now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()){
						returnExpression += 'tháng này';
					} else
					if(start == now.getFullYear() + '/' + (now.getMonth() + 2) + '/' + new Date(now.getFullYear(), now.getMonth() + 1, 1).getDate() && 
						end == now.getFullYear() + '/' + (now.getMonth() + 2) + '/' + new Date(now.getFullYear(), now.getMonth() + 2, 0).getDate()){
						returnExpression += 'tháng sau';
					} else
					// if(start == end && end == ctrl.$Utils.formatDateTime(new Date, 'DD/MM/YYYY')) {
					// 	returnExpression += 'ngày hôm nay';
					// } else
					if(end == ctrl.$Utils.formatDateTime(new Date, 'YYYY/M/D')) {
						var date2 = new Date;
						var date1 = new Date(filter[key + "StartValue"]);
						var timeDiff = Math.abs(date2.getTime() - date1.getTime());
						returnExpression += Math.ceil(timeDiff / (1000 * 3600 * 24)) + ' ngày gần nhất'
					} else 
						returnExpression += 'từ ngày ' + ctrl.$Utils.formatDateTime(start, 'DD/MM/YYYY') + ' đến ngày ' + ctrl.$Utils.formatDateTime(end, 'DD/MM/YYYY')
				} else {
					returnExpression += type;
				}
	          }
	          returnExpression += val.substr(val.indexOf('}}') + 2, val.length);
	          ctrl.reports.Caption = returnExpression;
	        }
		},
		getReportSetting(settingParam) {
			var ctrl = this;
	      	var data = {R1Data: ctrl.reports['Value']}
		    if(ctrl.Setting.TimePeriod == "true"){
		    	for(var i=2; i<=ctrl.rangePeriod; i++){
		    		data['R' + i + 'Data'] = ctrl.reports['Value'];
		    	}

		      	// data.R3Data = ctrl.reports['Value'];
		    }
	      var returnData = {};
	      if(ctrl.reports['Value'].indexOf('ProjectCategoriesLevel') != -1){
	        ctrl.ProjectReport = true;
	      }
	      /** tạo object cấu hình dựa trên Code và Description của mỗi object con*/
	      $.each(data, (key, RData) => {
	        var settings = {}, fields = {};
	        $.each(RData, (ksetting, setting) => {
	          if ((typeof setting.Description) == 'string' && setting.Description.indexOf('=') > 0) {
	            setting.Description = ctrl.$Utils.stringToObject(setting.Description);
	          }
	          settings[setting.Code] = ctrl.$Lodash.cloneDeep(setting);
	          if (setting.Code == 'Fields') {
	            $.each(setting.Description, (key, value) => {
	              fields[key] = {};
	              fields[key].count = parseInt(value);
	            });
	            fields.T = {};
	          }
	        });
	        $.each(fields, (key, val) => {
	          for (var i = 1; i < val.count + 1; i++) {
	            val[key + i] = {};
	            if (ctrl.$Utils.isEmpty(settings[key + i], 'Description')) {
	              val[key + i] = settings[key + i].Description;
	              val[key + i].Name = settings[key + i].Name;
	            }
	          }
	        });
	        returnData[key] = fields;
	      });
	      return returnData;
	    },
	    mergeReportData(inputData) {
	    	var ctrl = this;
	      	return new Promise((resolve, reject) => {
	      	var reportData = {}
	      	$.each(inputData, (key, val) => {
	      	  	var formatData = inputData[key].formatData;
	      	  	reportData[key] = ctrl.seriesReport(ctrl.fields[key + 'Data'], formatData.arrData, inputData[key].valueReport)
	      	})

	        /** nếu chỉ có 1 bảng thì lấy dữ liệu cho báo cáo chính*/
	        resolve(reportData);
		      // }
		      // return deferred.promise;
		  	})
	    },
	    getDataTemplate(reportParams, type) {
	    	var ctrl = this;
	      return new Promise((resolve, reject) => {
	        // if (!ctrl.$Utils.isSystemAdmin() && !ctrl.$Utils.isMantisAdmin() && ctrl.reports['IsProject']!=  'true' && ctrl.$Utils.isEmpty(ctrl.$rootScope.loggedOnUser.Project, 'GroupId') && !ctrl.$Utils.isEmpty(reportParams['R1_Project'])) {
	        //   reportParams['R1_Project'] = ctrl.$rootScope.loggedOnUser.Project.GroupId;
	        //   reportParams.R1_RequestFields += 'Project;';
	        // }
	        if (!ctrl.$isSystemAdmin() && !ctrl.$isMantisAdmin() && ctrl.reports.IsProject!=  'true' && ctrl.$Utils.isEmpty(ctrl.$rootScope.loggedOnUser.Project, 'GroupId') && !ctrl.$Utils.isEmpty(reportParams['R1_Project'])) {
	          reportParams['R1_Project'] = ctrl.$rootScope.loggedOnUser.Project.GroupId;
	          // reportParams.R1_RequestFields += 'Project;';
	        }
	        delete reportParams['R1_ProjectName']
	        if(reportParams['R1_VersionProject']){
	          ctrl.hasProject = true;
	        }
	        delete reportParams.R1_FilterCode;
	        ctrl.$Utils.post(reportParams).then(results => {
	          if (results.success) {
	            /** kiểm tra dữ liệu lấy về có rỗng không, nếu rỗng thông báo lỗi*/
	            var error = false, returnData = {};
	            if (!ctrl.$Utils.isEmpty(results.R1, 'Data.DynamicDS.Report')) {
	              // reject(toastMessage.reportNull);
	              reject();
	              return false;
	            }
	            if(ctrl.Setting.TimePeriod == "true"){
	            	if (!results['R1'].success || ctrl.$Utils.getDataWithRoot(results['R1'], 'Data.DynamicDS.Report').length == 0) {
		                error = true;
		            }
	            } else {
	            	for (var i = 1; i <= reportParams.TotalRequests; i++) {
		              if (!results['R' + i].success || ctrl.$Utils.getDataWithRoot(results['R' + i], 'Data.DynamicDS.Report').length == 0) {
		                error = true;
		              }
		            }
	            }
	            if (error) {
	            	reject();
	              // reject(toastMessage.reportNull);
	              return false;
	            }
	            /** format lại dữ liệu cho mỗi kế quả từ R1, R2, R3... */
	            for (var key = 1; key <= reportParams.TotalRequests; key++) {
	              var fields = ctrl.$Lodash.cloneDeep(ctrl.fields['R' + key + 'Data']);
	              results['R' + key] = ctrl.$Utils.getDataWithRoot(results, 'R' + key + '.Data.DynamicDS')[0] ? ctrl.$Utils.getDataWithRoot(results, 'R' + key + '.Data.DynamicDS')[0] : {Report: []};;
	              if (!Array.isArray(results['R' + key].Report)) {
	                results['R' + key].Report = [results['R' + key].Report];
	              }
	              /** format X to array*/
	              if(ctrl.$Utils.isEmpty(ctrl.reports['FormRequest']) && ctrl.ShowTree == false && results){
	                // fields.X.count = 1;
	                if (ctrl.$Utils.isEmpty(results, 'R' + key) && !Array.isArray(results['R' + key]['X1'])) {
	                  results['R' + key]['X1'] = [results['R' + key]['X1']];
	                }
	                if (fields.X['X1'].Format && ctrl.$Utils.isEmpty(results, 'R' + key)) {
	                  $.each(results['R' + key]['X1'], (kX, xF) => {
	                    var object = {0: xF.Name ? xF.Name : xF.Value};
	                    xF.Name = ctrl.$Utils.expressionToString(object, fields.X['X1'].Format);
	                  })
	                }
	              }
	              else if(fields && fields.X){
	                for (var x = 1; x <= fields.X.count; x++) {
	                  // if(ctrl.$Utils.isEmpty(ctrl.reports['FormRequest']) && ctrl.ShowTree == false && x > 1){
	                  //   delete results['R' + key]['X' + x];
	                  // } else{
	                    if (!Array.isArray(results['R' + key]['X' + x])) {
	                      results['R' + key]['X' + x] = [results['R' + key]['X' + x]];
	                    }
	                    if (fields.X['X' + x].Format) {
	                      $.each(results['R' + key]['X' + x], (kX, xF) => {
	                        var object = {0: xF.Name ? xF.Name : xF.Value};
	                        xF.Name = ctrl.$Utils.expressionToString(object, fields.X['X' + x].Format);
	                      })
	                    }
	                  // }

	                }
	              }
	              /** format Y to array*/
	              if(fields && fields.Y){
	              	for (var y = 1; y <= fields.Y.count; y++) {
		                if (!Array.isArray(results['R' + key]['Y' + y])) {
		                  results['R' + key]['Y' + y] = [results['R' + key]['Y' + y]];
		                }
		                if (fields.Y['Y' + y].Format) {
		                  $.each(results['R' + key]['Y' + y], (kY, yF) => {
		                    var object = {0: yF.Name ? yF.Name : yF.Value};
		                    yF.Name = ctrl.$Utils.expressionToString(object, fields.Y['Y' + y].Format);
		                  })
		                }
		              }
	              }
	              if (ctrl.$Utils.isEmpty(ctrl.reports, 'AdvanceSetting.ReportOrderBy')) {
	                var sortBy = '', sortType = 1;
	                if (ctrl.$Utils.isEmpty(ctrl.reports, 'AdvanceSetting.ReportOrderByType', true) == 'DESC') {
	                  sortType = -1;
	                }
	                ctrl.reports['ReportOrder'] = ctrl.reports['AdvanceSetting']['ReportOrderBy'] + " " + ctrl.reports['AdvanceSetting']['ReportOrderByType'];
	                $.each(fields,(kF, field) => {
	                  $.each(field, (k, f) => {
	                    if (f.Name == ctrl.reports['AdvanceSetting']['ReportOrderBy']) {
	                      sortBy = k;
	                    }
	                  })
	                });
	                if (results['R' + key][sortBy]) {
	                  results['R' + key][sortBy].sort(function (rA, rB) {
	                    var vA = rA.Name ? rA.Name : rA.Value, vB = rB.Name ? rB.Name : rB.Value;
	                    if (vA > vB) {
	                      return sortType;
	                    } else if (vA < vB) {
	                      return -1 * sortType;
	                    }
	                    return 0;
	                  });
	                }
	              }
	              /**
	               *  thêm dữ liệu vào return data
	               * formatData: danh sách các tiêu đề
	               * valueReport: mảng các object gồm giá trị của X, Y, V... và ids
	               */
	              returnData['R' + key] = {
	                formatData: ctrl.formatData(fields, ctrl.$Lodash.cloneDeep(results['R' + key])),
	                valueReport: ctrl.valueReports(fields, ctrl.$Lodash.cloneDeep(results['R' + key])),
	              }
	            }
	            resolve(returnData);
	          } else {
	            reject();
	          }
	        });
	      });
	    },
	    formatData(fields, reportData) {
	    	var ctrl = this;
	      /** tạo danh sách các tiêu đề từ dữ liệu */
	      var arrData = [], tmp;
	      if(fields && fields.X){
		      for (var i = 1; i <= fields.X.count; i++) {
		        tmp = reportData['X' + i] ? ctrl.$Lodash.cloneDeep(reportData['X' + i]) : {};
		        $.each(reportData['X' + i], (key, rep) => {
		          if (rep && (rep.Value || rep.Name)) {
		            tmp[key].name = rep.Name ? rep.Name : rep.Value;
		            if (fields.X['X' + i].Prefix) {
		              tmp[key].name = fields.X['X' + i].Prefix + ' ' + tmp[key].name;
		            }
		            switch (fields.X['X' + i].DataType) {
		              case 'DateTime':
		                if (fields.X['X' + i].FormatValue) {
		                  if (fields.X['X' + i].FormatValue == 'Age') {
		                    var value = ctrl.$Utils.stringToDate(tmp[key].name, 'YYYY');
		                      var ageDate = new Date(Date.now() - value.getTime());
		                      if(ageDate.getUTCFullYear() > 1970){
		                        tmp[key].name = Math.abs(ageDate.getUTCFullYear() - 1970)
		                      } else {
		                        tmp[key].name = ctrl.$Utils.formatDateTime(ctrl.$Utils.stringToDate(tmp[key].name), "DD/MM/YYYY");
		                      }
		                  } else {
		                    tmp[key].name = ctrl.$Utils.formatDateTime(ctrl.$Utils.stringToDate(tmp[key].name), fields.X['X' + i].FormatValue);
		                  }
		                }
		                break;
		            }
		            reportData['X' + i][key].name = tmp[key].name;
		          } else {
		            if (!ctrl.$Utils.isEmpty(tmp[key], 'name')) {
		              tmp[key] = {};
		            }
		            tmp[key].name = ctrl.$defaultUndefined;
		            tmp[key].Value = ctrl.$defaultUndefined;
		          }
		        });
		        arrData.push(tmp);
		      }
		  }
		  if(fields && fields.Y){
		      for (i = 1; i <= fields.Y.count; i++) {
		        tmp = reportData['Y' + i] ? ctrl.$Lodash.cloneDeep(reportData['Y' + i]) : {};
		        $.each(reportData['Y' + i], (key, rep) => {
		          if (rep && (rep.Value || rep.Name)) {
		            tmp[key].name = rep.Name ? rep.Name : rep.Value;
		            switch (fields.Y['Y' + i].DataType) {
		              case 'DateTime':
		                if (fields.Y['Y' + i].FormatValue) {
		                  if (fields.Y['Y' + i].FormatValue == 'Age') {
		                    var value = ctrl.$Utils.stringToDate(tmp[key].name, 'YYYY');
		                    var ageDate = new Date(Date.now() - value.getTime());
		                    tmp[key].name = Math.abs(ageDate.getUTCFullYear() - 1970)
		                  } else {
		                    tmp[key].name = ctrl.$Utils.formatDateTime(ctrl.$Utils.stringToDate(tmp[key].name), fields.Y['Y' + i].FormatValue);
		                  }
		                }
		                break;
		            }
		            reportData['Y' + i][key].name = tmp[key].name;
		          } else {
		            if (!ctrl.$Utils.isEmpty(tmp[key])) {
		              tmp[key] = {};
		            }
		            tmp[key].name = ctrl.$defaultUndefined;
		            tmp[key].Value = ctrl.$defaultUndefined;
		          }
		        });
		        arrData.push(tmp);
		      }
		  }
	      /** arrDataReturn: danh sách các tiêu đề*/
	      var arrDataReturn = ctrl.$Lodash.cloneDeep(arrData), category = [];
	    //   if (arrData.length > 0) {
	    //     var lastData = [];
	    //     for (var i = 0; i < arrData[arrData.length - 1].length; i++) {
	    //       if (arrData[arrData.length - 1][i].Name) {
	    //         lastData.push(arrData[arrData.length - 1][i].Name);
	    //       } else {
	    //         lastData.push(arrData[arrData.length - 1][i].Value);
	    //       }
	    //     }
	    //     for (var i = arrData.length - 1; i >= 0; i--) {
	    //       if (i == arrData.length - 1) {
	    //         arrData[i] = lastData;
	    //       }
	    //       if (i == 0) {
	    //         category = arrData[0];
	    //         break;
	    //       } else {
	    //         for (var j = 0; j < arrData[i - 1].length; j++) {
	    //           arrData[i - 1][j].categories = arrData[i];
	    //         }
	    //       }
	    //     }
	    // }
		    ctrl.categoryReport =  ()=> {
	        var arrData = [];
	        if(fields && fields.X)
		        for (var i = 1; i <= fields.X.count; i++) {
		          arrData.push(reportData['X' + i]);
		        }
		    if(fields && fields.Y)
		        for (var i = 1; i <= fields.Y.count; i++) {
		          arrData.push(reportData['Y' + i]);
		        }
	        if (arrData.length > 0) {
	          var lastData = [];
	          $.each(arrData, (key, arr) => {
	            if((arrData.length > 1 && key != 0) || arrData.length == 1 || (arrData.length > 1 && fields.V.count == 1)){
	              $.each(arr, (kO, obj) => {
	                if (obj && obj.name) {
	                  lastData.push(obj.name);
	                } else {
	                  lastData.push(ctrl.$defaultUndefined);
	                }
	              });
	            }
	          });
	          for (var i = arrData.length - 1; i >= 0; i--) {
	            if (i == arrData.length - 1) {
	              arrData[i] = lastData;
	            }
	            if (i == 0) {
	              category = arrData;
	              break;
	            } else if(arrData[i - 1]) {
	              for (var j = 0; j < arrData[i - 1].length; j++) {
	                if(arrData[i - 1][j])
	                  arrData[i - 1][j].categories = arrData[i];
	              }
	            }
	          }
	        }
	        return category;
	      };
	      return {category: ctrl.categoryReport(), arrData: arrDataReturn};
	    },
	    valueReports(fields, reportData) {
	    	var ctrl = this;
	      var valueReport = [];
	      var arrData = [];
	      $.each(reportData.Report, (kR, report) => {
	        /** thêm defaultUndefined vào các dữ liệu trả về thiếu giá trị X, Y*/
	        if (ctrl.$Utils.isEmpty(report)) {
	          var tmpData = {};
	          if (fields && fields.V && fields.V.count > 0) {
	            for (var j = 1; j <= fields.V.count; j++) {
	              tmpData['V' + j] = report['V' + j];
	              if(ctrl.$Utils.isEmpty(report['V' + j]) && report['V' + j]!=0){
	              }
	            }
	          }
	          var ids = [];
	          if (fields && fields.X && fields.X.count > 0) {
	            for (var j = 1; j <= fields.X.count; j++) {
	              var tmp = report['X' + j] ? report['X' + j] : ctrl.$defaultUndefined;
	              tmpData['X' + j] = tmp;
	              ids.push(tmp);
	            }
	          }
	          if (fields && fields.Y && fields.Y.count > 0) {
	            for (var j = 1; j <= fields.Y.count; j++) {
	              var tmp = report['Y' + j] ? report['Y' + j] : ctrl.$defaultUndefined;
	              tmpData['Y' + j] = tmp;
	              arrData.push(tmp);
	              ids.push(tmp);
	            }
	          }
	          tmpData.ids = ids;
	          valueReport.push(tmpData);
	        }
	      });
	      return valueReport;
	    },
	    seriesReport(fields, arrData, valueReport) {
	    	var ctrl = this;
	        if(ctrl.$Utils.isEmpty(ctrl.reports['FormRequest'])){
	          var arrayValue = [], total = 1, div = 1, count = 0;
	          for (var i = 0; i < arrData.length; i++) {
	            total = total * arrData[i].length;
	          }
	          for (var i = 0; i < total; i++) {
	            arrayValue[i] = [];
	          }
	          for (var i = 0; i < arrData.length; i++) {
	            for (var l = 0; l < div; l++) {
	              while (count < total) {
	                for (var j = 0; j < arrData[i].length; j++) {
	                  for (var k = j * total / arrData[i].length; k < (j + 1) * (total / arrData[i].length); k++) {
	                    if(arrayValue[k + l * total].length > 0){
	                      $.each(ctrl.object, (key, item) => {
	                        if(item.ParentId == arrayValue[k + l * total][arrayValue[k + l * total].length -1] && arrData[i][j].Value == item.Id){
	                          arrayValue[k + l * total].push(arrData[i][j].Value);
	                        }
	                      })
	                    } else if(ctrl.$Utils.isEmpty(arrData[i][j].Value)) {
	                      arrayValue[k + l * total].push(arrData[i][j].Value);
	                    }
	                    count++;
	                  }
	                }
	              }
	              count = 0;
	            }
	            div = div * arrData[i].length;
	            total = total / arrData[i].length;
	          }
	            var arraySeries = [];
	            for (var v = 0; v < fields.V.count; v++) {
	              var arrayResult = [];
	              var fieldSetting = fields.V['V' + (v + 1)];
	              for (var i = 0; i < arrayValue.length; i++) {
	                if (valueReport) {
	                  arrayResult.push(ctrl.checkExist(arrayValue[i], v + 1, valueReport));
	                } else {
	                  arrayResult.push(0);
	                }
	              }
	              fieldSetting.FieldColumnType = fieldSetting.DataType;
	              if (!fieldSetting.FieldColumnType || fieldSetting.FieldColumnType == 'String') {
	                fieldSetting.FieldColumnType = 'Integer';
	              }
	              arraySeries[v] = {
	                data: arrayResult,
	                name: fieldSetting.ReportCaption,
	                key: fieldSetting.Name,
	                setting: fieldSetting
	              };
	              ctrl.reports['formatData']['seriesNumber']++;
	            }
	          ctrl.arrayValue = arrayValue;
	          ctrl.valueReport = valueReport;
	          return arraySeries;
	      }
	      else {
	        var arrayValue = [], total = 1, div = 1, count = 0;
	        for (var i = 0; i < arrData.length; i++) {
	          total = total * arrData[i].length;
	        }
	        for (var i = 0; i < total; i++) {
	          arrayValue[i] = [];
	        }
	        for (var i = 0; i < arrData.length; i++) {
	          for (var l = 0; l < div; l++) {
	            while (count < total) {
	              for (var j = 0; j < arrData[i].length; j++) {
	                for (var k = j * total / arrData[i].length; k < (j + 1) * (total / arrData[i].length); k++) {
	                  arrayValue[k + l * total].push(arrData[i][j].Value);
	                  count++;
	                }
	              }
	            }
	            count = 0;
	          }
	          div = div * arrData[i].length;
	          total = total / arrData[i].length;
	        }
	        var arraySeries = [];
	        for (var v = 0; v < fields.V.count; v++) {
	          var arrayResult = [];
	          var fieldSetting = fields.V['V' + (v + 1)];
	          for (var i = 0; i < arrayValue.length; i++) {
	            if (valueReport) {
	              arrayResult.push(ctrl.checkExist(arrayValue[i], v + 1, valueReport));
	            } else {
	              arrayResult.push(0);
	            }
	          }
	          fieldSetting.FieldColumnType = fieldSetting.DataType;
	          if (!fieldSetting.FieldColumnType || fieldSetting.FieldColumnType == 'String') {
	            fieldSetting.FieldColumnType = 'Integer';
	          }
	          arraySeries[v] = {
	            data: arrayResult,
	            name: fieldSetting.ReportCaption,
	            key: fieldSetting.Name,
	            setting: fieldSetting
	          };
	          ctrl.reports['formatData']['seriesNumber']++;
	        }
	      return arraySeries;
	        /** thêm dữ liệu lấy từ V */
	      }
	    },
	    checkExist(array, v, valueReport) {
	    	var ctrl = this;
	      var result = 0;
	      for (var i = 0; i < valueReport.length; i++) {
	        var condition = valueReport[i].ids.join();
	        if (Array.isArray(array)) {
	          if (condition.toLowerCase() === array.join().toLowerCase()) {
	            if (valueReport[i]['V' + v]) {
	              result = parseFloat(valueReport[i]['V' + v]);
	            }
	            break;
	          }
	        }
	      }
	      return result;
	    },
	    formatReportExpression(seriesGroup) {
	    	var ctrl = this;
		    return new Promise((resolve, reject) => {
		      if (ctrl.$Utils.isEmpty(ctrl.reports['Fields']['Calculators'])) {
		        $.each(ctrl.reports['Fields']['Calculators'], (kE, expressionSetting) => {
		          if (ctrl.$Utils.isEmpty(expressionSetting.Expression)) {
		            var series = {
		              data: [],
		              code: expressionSetting.Name,
		              name: expressionSetting.ReportCaption ? expressionSetting.ReportCaption : expressionSetting.Caption,
		              key: expressionSetting.Name,
		              setting: expressionSetting
		            };
		            series.setting.FieldColumnType = 'Double';
		            var exp = ctrl.$Lodash.cloneDeep(expressionSetting.Expression), formatExpression = '';
		            	$.each(seriesGroup, (key, value) =>{
		            		for (var i = 0; i < value[0].data.length; i++) {
				              var object = {};
				              $.each(value, (kS,ser) => {
				                object[ser.key] = ser.data[i];
				              });
				              var result = ctrl.$Utils.calculator(ctrl.$Utils.expressionToString(object, exp));
				              if (result + '' == 'Infinity' || result + '' == 'NaN') {
				                result = 0;
				              }
				              series.data.push(result);
				            }
				            value.push(series);
				            if (typeof ctrl.reports['ReportOrder'] == 'string') {
				              var paraSort = ctrl.reports['ReportOrder'].split(' ')[0],
				                typeSort = ctrl.reports['ReportOrder'].split(' ')[1];
				              ctrl.sortIndex = [];
				              typeSort = (typeSort.trim() == 'DESC') ? 1 : -1;
				              if (series.key == paraSort) {
				                ctrl.sortIndex = ctrl.$Utils.sortWithIndexes(ctrl.$Lodash.cloneDeep(series.data), typeSort, ctrl.reports['RecordLimit']);
				              }
				            }
		            	})
		          }
		        });
		      }
		      resolve(seriesGroup);
		      // return deferred.promise;
	  		})
	   	},
	   	createChartData(categories, series) {
	   		var ctrl = this;
	      /** kiểm tra nếu có setting ko hiển thị bảng thống kê thì dừng lại */
	      if (ctrl.reports['ShowReport'] != "true") {
	        return false;
	      }
	      ctrl.reports['formatData']['gObject'] = [];
	      if (ctrl.$Utils.isEmpty(ctrl.reports, "EnableDataSeries") && ctrl.reports['EnableDataSeries']== "true") {
	        var listChart = [];
	        $.each(ctrl.reports['Fields']['Series'], (kC, chart) => {
	          listChart.push(chart);
	        });
	        $.each(listChart, (kC, chart) => {
	          group = {
	            Name: chart.Name,
	            chartData: {categories: categories, series: []},
	            Caption: chart.Caption,
	            Chart: chart.ReportType ? chart.ReportType : 'Column',
	            ColumnFlex: chart.ReportProportion ? chart.ReportProportion : ctrl.reports['ReportProportion'],
	            Percentage: ctrl.reports['Percentage'],
	            Display: chart.Enabled
	          };
	          for (var i = 0; i < series.length; i++) {
	            if (series[i].key == chart.Name && chart.Enabled == true) {
	              group.chartData.series.push(series[i]);
	            }
	          }
	          ctrl.reports['formatData']['gObject'].push(group);
	        });
	      }
	      else {
	        if (ctrl.fields.R1Data.Y && ctrl.fields.R1Data.Y.count > 0) {
	          var cateData = [], seriesData = [];
	          $.each(categories, (kC, cate) => {
	            cateData.push(cate.name);
	          });
	          for (var i = cateData.length; i < categories[0].categories.length; i++) {
	            seriesData.push({
	              name: categories[0].categories[i],
	              data: [],
	              setting: ctrl.$Lodash.cloneDeep(series[0].setting)
	            });
	          }
	          var count = 0;
	          for (i = 0; i < cateData.length; i++) {
	            $.each(seriesData, (kS, ser) => {
	              ser.data.push(series[0].data[count]);
	              count++;
	            });
	          }
	          series = seriesData;
	          categories = cateData;
	        }
	        ctrl.reports['formatData']['gObject'].push({
	          chartData: {categories: categories, series: series},
	          attr: {},
	          Caption: ctrl.reports['Caption'],
	          Chart: ctrl.reports['ReportType'] ? ctrl.reports['ReportType'] : 'column',
	          ColumnFlex: ctrl.reports['ReportProportion'],
	          Percentage: ctrl.reports['Percentage'],
	          Display: true
	        });
	      }
	      if (ctrl.reports['ReportType'] == 'General') {
	        var group = {
	          chartData: [],
	          Caption: ctrl.reports['Caption'],
	          Chart: 'General',
	          ColumnFlex: ctrl.reports['ReportProportion'],
	          Display: true
	        };
	        $.each(ctrl.reports['formatData']['gObject'], (kO, object) => {
	          object.Display = false;
	          group.chartData.push(object);
	        });
	        ctrl.reports['formatData']['gObject'].push(group);
	      } else {
	        $.each(ctrl.reports['formatData']['gObject'], (kO, object) => {
	          var gObjectFormat = ctrl.$Lodash.cloneDeep(object), hide = [];
	          gObjectFormat.chartData.categories = [];
	          $.each(gObjectFormat.chartData.series, (kS, ser) => {
	            ser.data = [];
	          });
	          $.each(object.chartData.categories, (key, tb) => {
	            var hidden = true;
	            for (var i = 0; i < object.chartData.series.length; i++) {
	              if (object.chartData.series[i].data[key] && object.chartData.series[i].data[key] != 0) {
	                hidden = false;
	                break;
	              }
	            }
	            if (!hidden) {
	              hide.push(key);
	            }
	          });
	          $.each(hide, (k, i) => {
	            gObjectFormat.chartData.categories.push(object.chartData.categories[i]);
	            $.each(gObjectFormat.chartData.series, (key, ser) => {
	              ser.data.push(object.chartData.series[key].data[i]);
	            });
	          });
	        });
	      }
	      if (ctrl.fields.R1Data.X.count < 2) {
	        /** remove all 0 column*/
	        $.each(ctrl.reports['formatData']['gObject'], (index, object) => {
	          var gObjectFormat = ctrl.$Lodash.cloneDeep(object), show = [];
	          gObjectFormat.chartData.categories = [];
	          $.each(gObjectFormat.chartData.series, (kS, ser) => {
	            ser.data = [];
	          });
	          $.each(object.chartData.categories, (key, tb) => {
	            var hidden = true;
	            for (var i = 0; i < object.chartData.series.length; i++) {
	              if (object.chartData.series[i].data[key] && object.chartData.series[i].data[key] != 0) {
	                hidden = false;
	                break;
	              }
	            }
	            if (!hidden) {
	              show.push(key);
	            }
	          });
	          $.each(show, (k, i) => {
	            gObjectFormat.chartData.categories.push(object.chartData.categories[i]);
	            $.each(gObjectFormat.chartData.series, (key, ser) => {
	              ser.data.push(object.chartData.series[key].data[i]);
	            });
	          });
	          ctrl.reports['formatData']['gObject'][index] = gObjectFormat;
	        });
	      }
	      if(ctrl.reports['ShowTable'] == false && ctrl.dataBinding == 'Đang tải ...'){
	      	ctrl.dataBinding = '';
	      }
	      ctrl.reports['viewModel']['reportReady'] = true;
	    },

	    createTableData(formatData, seriesReport) {
		    var formatD = this.$Lodash.cloneDeep(formatData)
		    // formatData = formatData.R1.formatData
	        var extra = {
	        	tableTB: {},
	        	tableTH: {}
	        }
		    var ctrl = this;
		    var Index = 0;
		    $.each(formatD, (Rkey, val) => {
		        Index++;
		        formatData = val.formatData
		        var valueReport = val.valueReport
		        // console.log(this.$Lodash.cloneDeep(formatData))
		        ctrl.reports.EnablePercentageColumn = ctrl.reports.EnablePercentageColumn == "true" || ctrl.reports.EnablePercentageColumn == true ? true : false;
		        formatData.arrData[0].push({
		            name: 'Tổng'
		        });
		        var percentageColumn = {};
		        if (this.reports.EnablePercentageColumn) {
		            percentageColumn = {
		                'data': [],
		                key: this.reports.PercentageColumnName
		            };
		            $.each(seriesReport[Rkey], (k, v) => {
		                if (v.key === this.reports.PercentageColumnName) {
		                    // seriesReport[seriesReport.length] = {'arrData':[]};
		                    $.each(seriesReport[Rkey][seriesReport.length - 1].data, (key, val) => {
		                        percentageColumn.data.push({
		                            name: this.reports.PercentageColumnName,
		                            value: val * 100 / v.data[v.data.length - 1]
		                        });
		                    });
		                }
		            });
		        }
		        var total = seriesReport[Rkey].length,
		            tableValue = {
		                head: [],
		                body: []
		            },
		            arrBodyData = [];
		        if (ctrl.fields[Rkey + 'Data'].X.count < 2 && ctrl.fields[Rkey + 'Data'].Y.count == 0) {
		            tableValue.head[0] = [{
		                rowspan: 1,
		                level: 0,
		                value: ctrl.fields[Rkey + 'Data'].X.X1.ReportCaption
		            }];
		            $.each(ctrl.reports['Fields']['Table'], (kT, tableGroup) => {
		                if (tableGroup.Display == true) {
		                    for (var i = 0; i < seriesReport[Rkey].length; i++) {
		                        if (tableGroup.Name == seriesReport[Rkey][i].key) {
		                            tableValue.head[0].push({
		                                value: seriesReport[Rkey][i].name,
		                                colspan: 1,
		                                level: 0,
		                            });
		                            arrBodyData.push(seriesReport[Rkey][i]);
		                        }
		                    }
		                }
		            });
		            total = arrBodyData.length;
		        } else {
		            // arrBodyData = seriesReport[Rkey];
		            var arrDisplay = []
		            $.each(ctrl.reports['Fields']['Table'], (kT, tableGroup) => {
		                if (tableGroup.Display == true) {
		                    for (var i = 0; i < seriesReport[Rkey].length; i++) {
		                        if (tableGroup.Name == seriesReport[Rkey][i].key) {
		                            // tableValue.head[0].push({
		                            //     value: seriesReport[Rkey][i].name,
		                            //     colspan: 1,
		                            //     level: 0,
		                            // });
		                            arrBodyData.push(seriesReport[Rkey][i]);
		                            arrDisplay.push(seriesReport[Rkey][i].key);
		                        }
		                    }
		                }
		            });
		            total = arrDisplay.length
		            var arr = [{
		                value: ctrl.fields[Rkey + 'Data'].X.X1.ReportCaption,
		                level: 0,
		                rowspan: formatData.arrData.length - ctrl.fields[Rkey + 'Data'].X.count > 1 ? formatData.arrData.length - ctrl.fields[Rkey + 'Data'].X.count : (ctrl.fields[Rkey + 'Data'].Y.count == 1 && ctrl.fields[Rkey + 'Data'].V.count > 1) ? 2 : ''
		            }];
		            if (ctrl.fields[Rkey + 'Data'].Y && ctrl.fields[Rkey + 'Data'].Y.count > 0) {
		                for (var i = ctrl.fields[Rkey + 'Data'].X.count; i < formatData.arrData.length; i++) {
		                    total = total * formatData.arrData[i].length;
		                }
		                var div = total;
		                /** multi Y report code*/
		                if (ctrl.fields[Rkey + 'Data'].Y.count == 1) {
		                	var fieldTable = ctrl.fields[Rkey + 'Data'].V;
		                	if (ctrl.Setting.Fields.Calculators.length > 0) {
                                // col.child = [];
                                $.each(ctrl.Setting.Fields.Calculators, (kv, v) => {
                                	fieldTable[v.Name] = v;
                               	})
                            }
		                    for (var i = ctrl.fields[Rkey + 'Data'].X.count; i < formatData.arrData.length; i++) {
		                        var count = 0;
		                        div = div / formatData.arrData[i].length;
		                        while (count < total) {
		                            $.each(formatData.arrData[i], (kE, element) => {
		                                var col = {
		                                    value: element.name,
		                                    level: 0,
		                                    colspan: div
		                                }
		                                if (ctrl.fields[Rkey + 'Data'].V.count > 1) {
		                                    col.child = [];
		                                    var subChild = {};
		                                    $.each(fieldTable, (kv, v) => {
		                                        if (v.ReportCaption && v.ReportCaption != "" && arrDisplay.indexOf(v.Name) !== -1) {
		                                            var childCol = {
		                                                value: v.ReportCaption,
		                                                level: 0,
		                                                colspan: 1
		                                            }
		                                            subChild[arrDisplay.indexOf(v.Name)] = (childCol)
		                                        }
		                                    })
		                                    col.child = ctrl.$Lodash.values(subChild)
		                                }
		                                // if (ctrl.Setting.Fields.Calculators.length > 0) {
		                                //     // col.child = [];
		                                //     $.each(ctrl.Setting.Fields.Calculators, (kv, v) => {
		                                //         if (v.ReportCaption && v.ReportCaption != "" && arrDisplay.indexOf(v.Name) !== -1) {
		                                //             var childCol = {
		                                //                 value: v.ReportCaption,
		                                //                 level: 0,
		                                //                 colspan: 1
		                                //             }
		                                //             col.child.push(childCol)
		                                //         }
		                                //     })

		                                // }
		                                arr.push(col);
		                                count += div;
		                            });
		                        }
		                    }
		                } else if (ctrl.fields[Rkey + 'Data'].Y.count > 1) {
		                    for (var i = ctrl.fields[Rkey + 'Data'].X.count; i < formatData.arrData.length; i++) {
		                        var arrX = [],
		                            count = 0;
		                        div = div / formatData.arrData[i].length;
		                        while (count < total) {
		                            $.each(formatData.arrData[i], (kE, element) => {
		                                if (ctrl.$Utils.isEmpty(element.Name))
		                                    arrX.push({
		                                        value: element.name,
		                                        level: 0,
		                                        colspan: div
		                                    });
		                                count += div;
		                            });
		                        }
		                        if (arrX.length > 0)
		                            tableValue.head.push(arrX);
		                    }
		                }
		            } else {
		                for (var i = 0; i < seriesReport[Rkey].length; i++) {
		                	if(seriesReport[Rkey][i].setting && arrDisplay.indexOf(seriesReport[Rkey][i].setting.Name) !== -1)
		                    arr.push({
		                        value: seriesReport[Rkey][i].name,
		                        colspan: 1,
		                        level: 0,
		                        setting: seriesReport[Rkey][i].setting
		                    });
		                }
		            }
		            if (ctrl.fields[Rkey + 'Data'].Y && ctrl.fields[Rkey + 'Data'].Y.count > 1) {
		                $.each(arr, (kA, ar) => {
		                    tableValue.head[0].unshift(ar);
		                })
		            } else {
		                tableValue.head.unshift(arr);
		                var addarr = [];
		                arr.forEach(aval => {
		                    if (aval.child && aval.child.length > 0) {
		                        aval.child.forEach(avc => {
		                            addarr.push(avc)
		                        })
		                    }
		                })
		                if (addarr.length > 0) {
		                    tableValue.head.push(addarr)
		                }

		            }
		        }
		        var level = ctrl.fields[Rkey + 'Data'].X.count - 1,
		            arrayRow = [];
		        if (ctrl.$Utils.isEmpty(ctrl.reports['FormRequest'])) {
		            var newArr = {}
		            if (ctrl.ShowTree == true) {
		                for (var i = ctrl.fields[Rkey + 'Data'].X.count - 1; i >= 0; i--) {
		                    $.each(ctrl.object, (kR, row) => {
		                        $.each(formatData.arrData[i], (key, child) => {
		                            if (ctrl.$Utils.isEmpty(formatData.arrData[i - 1]) && ctrl.$Utils.isEmpty(child, 'Value') && row.Id == child.Value) {
		                                $.each(formatData.arrData[i - 1], (pkey, parent) => {
		                                    if (row.ParentId == parent.Value) {
		                                        if (!ctrl.$Utils.isEmpty(newArr, child.Value)) {
		                                            child.level = level;
		                                            newArr[child.Value] = child;
		                                        }
		                                        if (!ctrl.$Utils.isEmpty(newArr, parent.Value)) {
		                                            parent.level = level - 1;
		                                            newArr[parent.Value] = parent;
		                                            newArr[parent.Value].children = [];
		                                        }
		                                        if (ctrl.$Utils.isEmpty(newArr[parent.Value], 'children')) {
		                                            newArr[parent.Value].children.push(newArr[child.Value]);
		                                        }
		                                    }
		                                })
		                            } else {
		                                if (!ctrl.$Utils.isEmpty(newArr, child.Value)) {
		                                    child.level = level;
		                                    newArr[child.Value] = child;
		                                }
		                            }
		                        })
		                    })
		                    level--;
		                }
		            } else {
		                for (var i = ctrl.fields[Rkey + 'Data'].X.count - 1; i >= 0; i--) {
		                    $.each(formatData.arrData[i], (key, child) => {
		                        if (!ctrl.$Utils.isEmpty(newArr, child.Value)) {
		                            child.level = level;
		                            newArr[child.Value] = child;
		                        }
		                    })
		                    level--;
		                }
		            }

		            var sArr = ctrl.$Lodash.cloneDeep(newArr);
		            newArr = [];
		            $.each(sArr, (key, value) => {
		                if (value.level == 0) {
		                    newArr.push(value)
		                }
		            })
		            var tArr = {};
		            ctrl.$Utils.readSettingNode(newArr, tArr)
		            var totalArr = {
		                name: "Tổng"
		            }
		            tArr["Tổng"] = totalArr
		            $.each(tArr, (key, value) => {
		                var arr = [];
		                var nlevel = ctrl.$Lodash.cloneDeep(value.level)
		                while (nlevel > 0) {
		                    value.name = " -- " + value.name
		                    nlevel--;
		                }
		                var x = [{
		                    value: value.name,
		                    level: value.level,
		                    colspan: 1
		                }];
		                if (ctrl.$Utils.isEmpty(ctrl.fields[Rkey + 'Data'].Y)) {
		                    $.each(formatData.arrData[ctrl.fields[Rkey + 'Data'].X.count], (yKey, yValue) => {
		                        var totalValue = 0
		                        var valueLevel = value.level + 1;
		                        $.each(valueReport, (kR, rValue) => {
		                            if (rValue["Y1"] == yValue.Value && rValue["X1"] != '[Không xác định]' && rValue["X" + valueLevel] == value.Value) {
		                                totalValue = totalValue + eval(rValue["V1"])
		                            }
		                        })
		                        var totalField = {
		                            value: totalValue
		                        }
		                        x.push(totalField)
		                    })
		                    arr.push(x);
		                    arr = arrayRow.concat(ctrl.$Lodash.cloneDeep(arr));
		                    arrayRow = ctrl.$Lodash.cloneDeep(arr);
		                } else {
		                    for (var j = 0; j < total; j++) {
		                        var totalValue = 0
		                        var valueLevel = value.level + 1;
		                        $.each(valueReport, (kR, rValue) => {
		                            if (rValue["X1"] != '[Không xác định]' && rValue["X" + valueLevel] == value.Value) {
		                                totalValue = totalValue + eval(rValue["V1"])
		                            }
		                        })
		                        var totalField = {
		                            value: totalValue
		                        }
		                        x.push(totalField)
		                    }
		                    arr.push(x);
		                    arr = arrayRow.concat(ctrl.$Lodash.cloneDeep(arr));
		                    arrayRow = ctrl.$Lodash.cloneDeep(arr);
		                }
		            })
		        } else {
		            for (var i = ctrl.fields[Rkey + 'Data'].X.count - 1; i >= 0; i--) {
		                var arr = [];
		                var newArr = []
		                $.each(formatData.arrData[i], (key, child) => {
		                    var x = [{
		                        value: child.name,
		                        level: level,
		                        colspan: 1
		                    }];
		                    for (var j = 0; j < total; j++) {
		                        if (i < ctrl.fields[Rkey + 'Data'].X.count - 1 && !(i == 0 && key == formatData.arrData[0].length - 1)) {
		                            x.push({});
		                        }
		                    }
		                    arr.push(x);

		                    /** nếu là phần tử tổng thì bỏ qua*/
		                    if (!(i == 0 && key == formatData.arrData[0].length - 1)) {
		                        arr = arr.concat(ctrl.$Lodash.cloneDeep(arrayRow));
		                    }
		                });
		                level--;
		                arrayRow = ctrl.$Lodash.cloneDeep(arr);
		            }
		        }
		        tableValue.body = arrayRow;
		        if (!ctrl.$Utils.isEmpty(ctrl.fields[Rkey + 'Data'].Y)) {
		            ctrl.fields[Rkey + 'Data'].Y.count = 0;
		        }
		        var percentageGroupIndex = 0;
		        var percentageColIndex = 0;
		        var count = 0;
		        if (!ctrl.$Utils.isEmpty(ctrl.reports['FormRequest'])) {
		            $.each(tableValue.body, (index, childArray) => {
		                if (childArray.length == 1 || index == tableValue.body.length - 1) {

		                    for (var i = 0; i < total / arrBodyData.length; i++) {
		                        $.each(arrBodyData, (idx, childVal) => {
		                            childArray.push({
		                                value: childVal.data[count],
		                                level: 0,
		                                colspan: 1,
		                                setting: arrBodyData[idx].setting
		                            });
		                            if (ctrl.reports.EnablePercentageColumn && childVal.key === ctrl.reports.PercentageColumnName) {
		                                percentageGroupIndex = i;
		                                childArray.push({
		                                    value: percentageColumn.data[count].value,
		                                    level: 0,
		                                    colspan: 1,
		                                    setting: {
		                                        DataType: "Double",
		                                        FieldColumnType: "Double",
		                                        // Name:"ProductCount",
		                                        // OrderDirection:"DESC",
		                                        // ReportCaption:"Số lượng",
		                                        // StorageType:"Struct",
		                                        // SummaryType:"Sum",
		                                        // Top:"10"
		                                    }
		                                });
		                                percentageColIndex = childArray.length - 1;
		                            }

		                        });
		                        count++;
		                    }
		                }
		            });
		        }
		        var clearArr = [];
		        // console.log(ctrl.$Lodash.cloneDeep(tableValue.body))
		        if (ctrl.fields[Rkey + 'Data'].X.count == 1) {
		            $.each(tableValue.body, (kR, row) => {
		                var hidden = true;
		                for (var i = 1; i < row.length; i++) {
		                    if (row[i].value && row[i].value != 0 && row[i].value != '0.0%') {
		                        hidden = false;
		                        break;
		                    }
		                }
		                if (!hidden) {
		                    clearArr.push(row)
		                }
		            });
		            extra['tableTB'][Rkey] = clearArr;
		            // if (!ctrl.reports['formatData']['reportDataTable']['tableTB']) {
		            //     ctrl.reports['formatData']['reportDataTable']['tableTB'] = []
		            // }
		            // $.each(clearArr, (ka, ca) => {
		            //     var po = ctrl.$Lodash.cloneDeep(ca)
		            //     $.each(po, (kz, cz) => {
		            //         if ((kz + 2) == po.length) {
		            //             for (var i = 1; i < 3; i++) {
		            //                 console.log(Index)
		            //                 console.log(cz)
		            //                 var unit = ctrl.$Lodash.cloneDeep(po[po.length - 1])
		            //                 if (Index != i) {
		            //                     unit.value = 0;
		            //                 }
		            //                 ca.push(ctrl.$Lodash.cloneDeep(unit))
		            //             }
		            //         }
		            //     })
		            //     ctrl.reports['formatData']['reportDataTable']['tableTB'].push(ca)
		            // })
		            // console.log(ctrl.reports['formatData']['reportDataTable']['tableTB'])
		        } else
		            extra['tableTB'][Rkey] = tableValue.body;
		        if (extra['tableTB']['R1'].length <= 0)
		            ctrl.reports['viewModel']['reportNull'] = true;
		        extra['tableTH'][Rkey] = tableValue.head;
		        var arrSource = [];
		        $.each(extra['tableTB'][Rkey], (kS, source) => {
		            var item = {};
		            $.each(source, (index, itemSource) => {
		                item['value' + index] = itemSource.value;
		                if (itemSource.setting != undefined && itemSource.setting != null) {
		                    var setting = itemSource.setting;
		                    var value = itemSource.value;
		                    switch (setting.FieldColumnType) {
		                        case 'Integer':
		                            if (value != '' && !isNaN(value)) {
		                                value = parseFloat(ctrl.$Utils.formatNumber(value)).toFixed(0);
		                            }
		                            break;
		                        case 'Double':
		                            if (value != '' && !isNaN(value)) {
		                                var formated = false;
		                                if (setting.FormatValue) {
		                                    var afterDecimal = 0;
		                                    afterDecimal = setting.FormatValue.substring(setting.FormatValue.indexOf('.') + 1, setting.FormatValue.indexOf('f'));
		                                    afterDecimal = afterDecimal == '' ? 0 : afterDecimal;
		                                    value = (value == 0) ? 0 : parseFloat(ctrl.$Utils.formatNumber(value)).toFixed(afterDecimal);
		                                    formated = true;
		                                }
		                                if (typeof setting.Format == 'string') {
		                                    setting.Format = setting.Format.replaceAll('{{0', '{{' + setting.Name);
		                                    var object = {};
		                                    object[setting.Name] = value;
		                                    value = ctrl.$Utils.expressionToString(object, setting.Format);
		                                    formated = true;
		                                }
		                                if (!formated) {
		                                    value = parseFloat(ctrl.$Utils.formatNumber(value)).toFixed(0);
		                                }
		                            }
		                            break;
		                        case 'DateTime':
		                            if (value != undefined || value != '') {
		                                var date = ctrl.$Utils.stringToDate(value);
		                                var format;
		                                if (ctrl.$Utils.isEmpty(setting.Format))
		                                    format = setting.Format;
		                                value = ctrl.$Utils.formatDateTime(date, format);
		                            }
		                            break;
		                    }
		                    item['value' + index] = value;
		                }
		            })
		            arrSource.push(item);
		        })
		        var arrColumns = [];
		        $.each(tableValue.head, (headIndex, head) => {
		            $.each(head, (itemIndex, field) => {
		                field.mData = 'value' + (headIndex + itemIndex);
		                field.sTitle = field.value;
		                field.defaultContent = '';
		                arrColumns.push(field);
		            });
		        });
		        if (ctrl.reports.EnablePercentageColumn) {
		            tableValue.head[percentageGroupIndex].splice(percentageColIndex, 0, {
		                defaultContent: "",
		                level: 0,
		                mData: "value" + percentageColIndex,
		                rowspan: 1,
		                sTitle: ctrl.reports.PercentageColumnName,
		                value: ctrl.reports.PercentageDisplayName,
		            });
		        }
		        ctrl.ListColumns = arrColumns;
		    })
			if(ctrl.Setting.TimePeriod == "true"){
				var obj = {};
				$.each(extra['tableTB'], (ke,fe) =>{
					// console.log(fe);
					$.each(fe, (kc,vc) =>{
						$.each(vc, (kgc,vgc) =>{
							// console.log(vgc);
							if(kgc == 0){
								if(!obj[vgc.value]) {
									obj[vgc.value] = [];
									obj[vgc.value].push(vgc)
								}
								// obj[vgc.value].push()
							} else {
								vgc.TrueColumn = ke + (kgc - 1);
								obj[vc[0].value].push(vgc)
							}
						})
					})
				})
				ctrl.reports['formatData']['reportDataTable']['tableTB'] = [];
				ctrl.reports['formatData']['reportDataTable']['tableTH'] = [];
				// console.log(ctrl.fields['R1Data'].V.count)
				$.each(obj, (ke,fe) =>{
					// $.each(fe, (kc,vc) =>{
					// 	console.log(vc)
					// })
					// console.log
					var pv = ctrl.$Lodash.cloneDeep(fe);
					if(ke != "Tổng"){
						var zIndex = 0;
						for(var i = 1; i <= ctrl.rangePeriod;i++){
							var countJ = ctrl.fields['R1Data'].V.count + ctrl.Setting.Fields.Calculators.length
							for(var j = 0; j < countJ; j++) {
								zIndex ++

								if(fe[zIndex] && fe[zIndex].TrueColumn != ("R" + i) + j) {
									var objZ = ctrl.$Lodash.cloneDeep(fe[zIndex]);
									objZ.TrueColumn = ("R" + i) + j;
									objZ.value = 0;
									fe.splice(zIndex, 0, objZ);
								}
								else if(!fe[zIndex]) {
									var objZ = ctrl.$Lodash.cloneDeep(fe[zIndex - 1]);
									objZ.TrueColumn = ("R" + i) + j;
									objZ.value = 0;
									fe.push(objZ);
								}
								fe[i].setting.ReportCaption = ("R" + i) + j;
							}
						}
						// console.log(fe)
						ctrl.reports['formatData']['reportDataTable']['tableTB'].push(fe);
					}
				})
				ctrl.reports['formatData']['reportDataTable']['tableTB'].push(obj["Tổng"]);
				var tableTH = [];
				extra['tableTH']['R1'][0][0].rowspan = 2
				// ctrl.reports['formatData']['reportDataTable']['tableTH'] = extra['tableTH']['R1']
				var head = [];
				var subhead = [];
				head.push(extra['tableTH']['R1'][0][0])
				for(var i = 1; i <= ctrl.rangePeriod;i++){
					var title = ''
					if(ctrl.Setting.TimeStart == "days"){
						title = ctrl.$Utils.formatDateTime(ctrl.reportParams['R' + i + "_" + ctrl.Setting.TimeBindingField + 'StartValue'], 'DD/MM')
					} else
					if(ctrl.Setting.TimeStart == "weeks"){
						title = "Tuần " + Vue.moment(ctrl.$Utils.formatDateTime(ctrl.reportParams['R' + i + "_" + ctrl.Setting.TimeBindingField + 'StartValue'], 'MM-DD-YYYY')).isoWeek()
						// ctrl.$Utils.formatDateTime(ctrl.reportParams['R' + i + "_" + ctrl.Setting.TimeBindingField + 'StartValue'], 'DD/MM')
					} else
					if(ctrl.Setting.TimeStart == "months"){
						title = "Tháng " +ctrl.$Utils.formatDateTime(ctrl.reportParams['R' + i + "_" + ctrl.Setting.TimeBindingField + 'StartValue'], 'MM')
					}
					// else if(ctrl.Setting.TimeStart != "years") {
					// 	title = ctrl.$Utils.formatDateTime(ctrl.reportParams['R' + i + "_" + ctrl.Setting.TimeBindingField + 'StartValue'], 'DD/MM') + ' - ' + ctrl.$Utils.formatDateTime(ctrl.reportParams['R' + i + "_" + ctrl.Setting.TimeBindingField + 'EndValue'], 'DD/MM')
					// }
					 else {
						title = "Năm " +ctrl.$Utils.formatDateTime(ctrl.reportParams['R' + i + "_" + ctrl.Setting.TimeBindingField + 'StartValue'], 'YYYY')
					}
					if(ctrl.fields['R1Data'].V.count > 1){
						head.push({
			                defaultContent: "",
			                level: 0,
			                colspan: ctrl.fields['R1Data'].V.count,
			                sTitle: title,
			                value: title,
			            });
					} else if(ctrl.Setting.Fields.Calculators.length > 0){
						head.push({
			                defaultContent: "",
			                level: 0,
			                colspan: ctrl.fields['R1Data'].V.count + ctrl.Setting.Fields.Calculators.length,
			                sTitle: title,
			                value: title,
			            });
					} else {
						subhead.push({
			                defaultContent: "",
			                level: 0,
			                colspan: ctrl.fields['R1Data'].V.count,
			                sTitle: title,
			                value: title,
			            });
					}
		        }
		        var count = (ctrl.fields['R1Data'].V.count > 1 || ctrl.Setting.Fields.Calculators.length > 0) ? ctrl.rangePeriod : 1;
		        for(var i = 1; i <= count;i++) {
			        $.each(extra['tableTH']['R1'][0], (ke,fe) =>{
						if(ke !== 0){
								if(ctrl.fields['R1Data'].V.count == 1 && ctrl.Setting.Fields.Calculators.length == 0) {
									fe.colspan = ctrl.rangePeriod;
								}
								tableTH.push(fe);
							}
						// 	fe.rowspan = 2;
						// }
						// else{
							// fe.colspan = 3

					})
				}
				if(ctrl.fields['R1Data'].V.count > 1 || ctrl.Setting.Fields.Calculators.length > 0) {
					ctrl.reports['formatData']['reportDataTable']['tableTH'].push(head)
					ctrl.reports['formatData']['reportDataTable']['tableTH'].push(tableTH)
				} else {
					head = head.concat(tableTH)
					ctrl.reports['formatData']['reportDataTable']['tableTH'].push(head)
					ctrl.reports['formatData']['reportDataTable']['tableTH'].push(subhead)
				}
			} else {
				ctrl.reports['formatData']['reportDataTable']['tableTB'] = extra['tableTB']['R1']
				ctrl.reports['formatData']['reportDataTable']['tableTH'] = extra['tableTH']['R1']
			}

			// console.log(extra['tableTH']['R1'])

		    // console.log('xxx',tableValue)
		    ctrl.setTableAndChartWidth();
		},
	    formatClass(row, data, index) {
	      $.each(ctrl.ListColumns, (columnIndex, column) => {
	        if (columnIndex > 0)
	          $('td', row).eq(columnIndex).addClass('text-right');
	      });
	    },
	    refreshReport(searchCondition) {
	    	var ctrl = this;
	    ctrl.isHiddenCaption = !ctrl.Setting.IsDashBoard;
	      if(ctrl.$Utils.isEmpty(ctrl.reports['FormRequest'])){
	        if(ctrl.$Utils.isEmpty(searchCondition)){
	          ctrl.searchCondition = ctrl.$Lodash.cloneDeep(searchCondition);
	          ctrl.ShowTree = false;
	        } else if(ctrl.$Utils.isEmpty(ctrl.searchCondition)){
	          ctrl.ShowTree = !ctrl.ShowTree ? true : false;
	          ctrl.dataBinding = 'Đang tải ...'
	          searchCondition = ctrl.$Lodash.cloneDeep(ctrl.searchCondition);
	        } else {
	        	ctrl.ShowTree = !ctrl.ShowTree ? true : false;
	        }
	      }
	      if (!ctrl.$Utils.isEmpty(ctrl.fields.R1Data)) {
	        ctrl.searchCondition = searchCondition;
	        ctrl.research = true;
	        return false;
	      } else if (ctrl.research) {
	        searchCondition = ctrl.$Lodash.cloneDeep(ctrl.searchCondition);
	        ctrl.searchCondition = null;
	        ctrl.research = false;
	      }
	      /** format lại giá trị hiện tại về rỗng*/
	      // ctrl.defaultViewModel();
	      /** tạo request search*/
	      var reportParams = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
	      reportParams.TotalRequests = 0;
	        reportParams.TotalRequests++;
	        reportParams['R' + reportParams.TotalRequests + '_Template'] = ctrl.reports['Code'];
	        reportParams['R' + reportParams.TotalRequests + '_RequestTemplate'] = ctrl.reports['DataSource'] + '.Report'
	        reportParams['R' + reportParams.TotalRequests + '_RequestDataGroup'] = ctrl.reports['Name'];
	        // reportParams['R' + reportParams.TotalRequests + '_PlanStartDateStartValue'] = "2017-08-28T00:00:00";
	        // reportParams['R' + reportParams.TotalRequests + '_PlanStartDateEndValue'] = "2017-09-03T23:59:59";
	        if (ctrl.reports['AssignedUser'] == "true") {
	          reportParams['R' + reportParams.TotalRequests + '_AssignedUser'] = localStorage.getItem('SessionId');
	        }
	        if (ctrl.$Utils.isEmpty(ctrl.reports['AdditionConditions'])) {
	          ctrl.reports['AdditionConditions'] = typeof ctrl.reports['AdditionConditions'] =='string' ? ctrl.$Utils.stringToObject(ctrl.reports['AdditionConditions']) : ctrl.reports['AdditionConditions'];
	          $.each(ctrl.reports['AdditionConditions'], (key, value) => {
	            if (value.indexOf('!!') >= 0) {
	              var valueDate = value.split('!!');
	              var item = valueDate[0];
	              var format = valueDate[1];
	              if (item == "RangeTime") {
	                ctrl.reports['AdditionConditions'][key] = ctrl.$Utils.getDateTimeByKey(format);
	              }
	            }
	          })
	          reportParams = ctrl.$Utils.updateParamsSingleRequest(reportParams, ctrl.reports['AdditionConditions'], reportParams.TotalRequests);
	        }
	        if (ctrl.$Utils.isEmpty(ctrl.reports, 'AdvanceSetting.AdditionConditions')) {
	          var obj = ctrl.$Utils.stringToObject(ctrl.reports['AdvanceSetting']['AdditionConditions'], '+', '.COMPARE');
	          reportParams = ctrl.$Utils.updateParamsSingleRequest(reportParams, obj, reportParams.TotalRequests);
	        }

	        if (ctrl.$Utils.isEmpty(ctrl.reports, 'AdditionConditions')) {
	          // var obj = ctrl.$Utils.stringToObject(ctrl.reports['AdditionConditions'], '&', '=');
	          $.each(ctrl.reports['AdditionConditions'], (key, item) => {
	            if (ctrl.$Utils.isEmpty(item) && item.indexOf("RangeTime!!") >= 0) {
	              ctrl.reports['AdditionConditions'][key + "StartValue"] = ctrl.$Utils.getDateTimeByKey(item.split("!!")[1] + "Start");
	              ctrl.reports['AdditionConditions'][key + "EndValue"] = ctrl.$Utils.getDateTimeByKey(item.split("!!")[1] + "End");
	              delete ctrl.reports['AdditionConditions'][key]
	            }
	          })
	          reportParams = ctrl.$Utils.updateParamsSingleRequest(reportParams, ctrl.reports['AdditionConditions'], reportParams.TotalRequests);
	        }
	        /** add search condition from filter*/
	        $.each(searchCondition, (kC, condition) => {
	          if (ctrl.$Utils.isEmpty(condition, "setting") && condition.setting.ElementType == "MultiTree") {
	            $.each(condition.value.split(";"), (key, divine) => {
	              if (ctrl.$Utils.isEmpty(divine) && divine != "") {
	                var level = key + 1
	                reportParams['R1_' + condition.name + "Level" + level] = divine;
	                reportParams['R2_' + condition.name + "Level" + level] = divine;
	                delete reportParams['R1_' + condition.name];
	                delete reportParams['R2_' + condition.name];
	              }
	            })
	          } else if (ctrl.$Utils.isEmpty(condition) && condition !== '' && typeof condition === 'string') {
	            reportParams['R' + reportParams.TotalRequests + '_' + kC] = condition;
	          } else if (ctrl.$Utils.isEmpty(condition) && Array.isArray(condition) && condition.length > 0) {
	            reportParams['R' + reportParams.TotalRequests + '_' + kC] = condition.join(';');
	          }
	        });
	      /** chuyển các giá trị trong request có định dạng là biến về dữ liệu tương ứng, phân biệt bằng {{param}} */
	      $.each(reportParams, (paramKey, val) => {
	        val = val + '';
	        if (val.indexOf('{{') >= 0 && val.indexOf('}}') > val.indexOf('{{')) {
	          var key = val.substr(val.indexOf('{{') + 2, val.indexOf('}}') - val.indexOf('{{') - 2);
	          if (key.indexOf('|') > 0) {
	            var type = key.substring(key.indexOf('|') + 1, key.length).trim(), fil = '';
	            key = key.substring(0, key.indexOf('|')).trim();
	            if (type.indexOf(':') > 0) {
	              fil = type.substring(type.indexOf(':') + 1, type.length).trim();
	              type = type.substring(0, type.indexOf(':')).trim();
	            }
	            if (key == 'Date') {
	              val = new Date;
	            } else {
	              val = reportParams[paramKey.substring(0, 3) + key];
	            }
	            switch (type) {
	              case 'DateTime':
	                /**trường hợp ngày tháng*/
	                var date = ctrl.$Utils.stringToDate(val);
	                switch (fil) {
	                  case 'StartDay':
	                    // reportParams[paramKey] = ctrl.$Utils.stringToDate(ctrl.$Utils.getDateTimeByKey('WeekStart'));
	                    break;
	                  case 'EndDay':
	                    break;
	                  case 'StartWeek':
	                    reportParams[paramKey] = ctrl.$Utils.getDateTimeByKey('WeekStart');
	                    break;
	                  case 'EndWeek':
	                    reportParams[paramKey] = ctrl.$Utils.getDateTimeByKey('WeekEnd');
	                    break;
	                  case 'StartMonth':
	                    reportParams[paramKey] = ctrl.$Utils.getDateTimeByKey('MonthStart');
	                    break;
	                  case 'EndMonth':
	                    reportParams[paramKey] = ctrl.$Utils.getDateTimeByKey('MonthEnd');
	                    break;
	                  case 'StartYear':
	                    reportParams[paramKey] = ctrl.$Utils.getDateTimeByKey('YearStart');
	                    break;
	                  case 'EndYear':
	                    reportParams[paramKey] = ctrl.$Utils.getDateTimeByKey('YearEnd');
	                    break;
	                }
	                break;
	            }
	          } else {
	            if (key == paramKey.substring(paramKey.indexOf('_') + 1, paramKey.length)) {
	              reportParams[paramKey] = '';
	            } else {
	              reportParams[paramKey] = reportParams[paramKey.substring(0, paramKey.indexOf('_') + 1) + key];
	            }
	          }
	        }
	      });

	      /**
	       * gọi đến function lấy dữ liệu báo cáo
	       * reportParams: request search dữ liệu
	       * arrayFields: danh sách cấu hình các field X, Y, V... cho báo cáo chính và các báo cáo phụ
	       *
	       * resultData: dữ liệu trả về gồm R1{formatData: danh sách các tiêu đề, valueReport: giá trị của X, Y, V}, R2, R3...
	       */
	       // console.log(reportParams)
	       // console.log(ctrl.Setting)
	       if(ctrl.Setting.TimePeriod == "true"){
	       	var rParams = ctrl.$Lodash.cloneDeep(reportParams);
	       	reportParams = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
	       	var obj = {};
	       	$.each(rParams, (k,r) => {
	       		if(k.indexOf('R1_') !== -1){
	       			obj[k.replaceAll('R1_', '')] = r;
	       		}
	       	})
	       	reportParams.TotalRequests = ctrl.rangePeriod;
	       	if(ctrl.$Utils.isEmpty(rParams["R1_" + ctrl.Setting.TimeBindingField + 'StartValue'])) {
	       		var setDate = ctrl.$Lodash.cloneDeep(rParams["R1_" + ctrl.Setting.TimeBindingField + 'StartValue']);
	       	}
       		for(var i = 1; i <= ctrl.rangePeriod; i++){
       			reportParams = ctrl.$Utils.updateParamsSingleRequest(reportParams, obj, i);
       			var startDate = new Date();
       			var endDate = new Date();
       			if(ctrl.$Utils.isEmpty(setDate)) {
       				startDate = new Date(setDate);
       				endDate = new Date(setDate);
       			}
       			// if(ctrl.Setting.TimeStart == "days"){
       			// 	startDate.setHours(0, 0, 0, 0)
        		// 	reportParams['R' + i + "_" + ctrl.Setting.TimeBindingField + 'StartValue'] = ctrl.$Utils.formatDateTime(Vue.moment(startDate).subtract(i - ctrl.Setting.TimeInterval, ctrl.Setting.TimeStart).toDate());
        		// 	endDate.setHours(23, 59, 59, 999)
			       //  reportParams['R' + i + "_" + ctrl.Setting.TimeBindingField + 'EndValue'] = ctrl.$Utils.formatDateTime(Vue.moment(endDate).subtract(i - ctrl.Setting.TimeInterval, ctrl.Setting.TimeStart).toDate());
       			// }
       			switch (ctrl.Setting.TimeStart) {
       				case 'days':
       					startDate.setHours(0, 0, 0, 0)
	        			reportParams['R' + i + "_" + ctrl.Setting.TimeBindingField + 'StartValue'] = ctrl.$Utils.formatDateTime(Vue.moment(startDate).subtract((i * ctrl.Setting.TimeInterval) - ctrl.Setting.TimeInterval, ctrl.Setting.TimeStart).toDate());
	        			endDate.setHours(23, 59, 59, 999)
				        reportParams['R' + i + "_" + ctrl.Setting.TimeBindingField + 'EndValue'] = ctrl.$Utils.formatDateTime(Vue.moment(endDate).subtract((i * ctrl.Setting.TimeInterval) - ctrl.Setting.TimeInterval, ctrl.Setting.TimeStart).toDate());
				        break;
				    case 'weeks':
       					startDate.setHours(0, 0, 0, 0)
	        			reportParams['R' + i + "_" + ctrl.Setting.TimeBindingField + 'StartValue'] = ctrl.$Utils.formatDateTime(Vue.moment(startDate).subtract((i * ctrl.Setting.TimeInterval) - ctrl.Setting.TimeInterval, 'weeks').startOf('isoweek').toDate());
	        			endDate.setHours(23, 59, 59, 999)
				        reportParams['R' + i + "_" + ctrl.Setting.TimeBindingField + 'EndValue'] = ctrl.$Utils.formatDateTime(Vue.moment(endDate).subtract((i * ctrl.Setting.TimeInterval) - ctrl.Setting.TimeInterval, 'weeks').endOf('isoweek').toDate());
				        break;
				    case 'months':
       					startDate.setHours(0, 0, 0, 0)
	        			reportParams['R' + i + "_" + ctrl.Setting.TimeBindingField + 'StartValue'] = ctrl.$Utils.formatDateTime(new Date(startDate.getFullYear(), startDate.getMonth() - ((i * ctrl.Setting.TimeInterval) - ctrl.Setting.TimeInterval), 1));
	        			endDate.setHours(23, 59, 59, 999)
				        reportParams['R' + i + "_" + ctrl.Setting.TimeBindingField + 'EndValue'] = ctrl.$Utils.formatDateTime(new Date(endDate.getFullYear(), endDate.getMonth() - ((i * ctrl.Setting.TimeInterval) - ctrl.Setting.TimeInterval - 1), 0, 23, 59, 59));
				        break;
				    case 'years':
       					startDate.setHours(0, 0, 0, 0)
	        			reportParams['R' + i + "_" + ctrl.Setting.TimeBindingField + 'StartValue'] = ctrl.$Utils.formatDateTime(Vue.moment(startDate).subtract((i * ctrl.Setting.TimeInterval) - ctrl.Setting.TimeInterval, 'years').startOf('year').toDate());
	        			endDate.setHours(23, 59, 59, 999)
				        reportParams['R' + i + "_" + ctrl.Setting.TimeBindingField + 'EndValue'] = ctrl.$Utils.formatDateTime(Vue.moment(endDate).subtract((i * ctrl.Setting.TimeInterval) - ctrl.Setting.TimeInterval, 'years').endOf('year').toDate());
				        break;
       			}
       		}
	      }
	      ctrl.reportParams = reportParams;
	      ctrl.getDataTemplate(reportParams).then( resultData => {
	        // console.log(resultData)
	        /**
	         * gọi đến hàm lọc các dữ liệu cho báo cáo phụ theo setting
	         * resultData: dữ liệu được trả về từ hàm trên
	         * arrayFields: cấu hình các fields X, Y, V
	         *
	         * extraData: mảng các dữ liệu từ báo cáo phụ, trả về mảng rỗng nếu không có báo cáo phụ
	         */
	        ctrl.mergeReportData(resultData).then(reportData => {
	          /** tạo danh sách các hàng chỉ hiển thị dựa trên category và ctrl.categoryDisplay */
	          if (ctrl.$Utils.isEmpty(ctrl.categoriesDisplay && ctrl.categoriesDisplay.length > 0)) {
	            var categoriesIndex = {index: [], cate: []};
	            $.each(ctrl.categoriesDisplay, (kC, category) => {
	              $.each(resultData.R1.formatData.category[0], (index, cat) => {
	                if (category == cat.name) {
	                  categoriesIndex.index.push(index);
	                  categoriesIndex.cate.push(cat);
	                }
	              });
	            });
	            resultData.R1.formatData.category[0] = categoriesIndex.cate;
	            $.each(resultData.R1.formatData.arrData[0], (k, val) => {
	              if (categoriesIndex.index.indexOf(k) < 0) {
	                resultData.R1.formatData.arrData[0][k] = undefined;
	              }
	            });
	            resultData.R1.formatData.arrData[0].clean();
	            	$.each(reportData, (key, value) => {
			            $.each(value, (kS, series) => {
			              $.each(series.data, (k, val) => {
			                if (categoriesIndex.index.indexOf(k) < 0) {
			                  series.data[k] = undefined;
			                }
			              });
			              $.each(categoriesIndex.index, (kI, ind) => {
			                if (!series.data[ind]) {
			                  series.data[ind] = 0;
			                }
			              });
			              series.data.clean();
			            });
			        })
	          }
	          var rD = ctrl.$Lodash.cloneDeep(reportData);
	          ctrl.formatReportExpression(rD).then(seriesGroup => {
	            if (ctrl.$Utils.isEmpty(ctrl.sortIndex) && ctrl.sortIndex.length > 0) {
	            	$.each(seriesGroup, (key, value) => {
		              $.each(value, (kS, ser) => {
		                var data = [];
		                $.each(ctrl.sortIndex, (kI, index) => {
		                  data.push(ser.data[index]);
		                });
		                ser.data = data;
		              });
		            });
	              var cateData = [], arrData = [];
	              $.each(ctrl.sortIndex, (kI, index) => {
	                cateData.push(resultData.R1.formatData.category[0][index]);
	                arrData.push(resultData.R1.formatData.arrData[0][index]);
	              });
	              resultData.R1.formatData.category[0] = cateData;
	              resultData.R1.formatData.arrData[0] = arrData;
	            }
	            ctrl.reports['viewModel']['isLoading'] = false;
	            /** tạo dữ liệu cho biểu đồ */
	            ctrl.createChartData(ctrl.$Lodash.cloneDeep(resultData.R1.formatData.category[0]), ctrl.$Lodash.cloneDeep(seriesGroup.R1));
	            /** tạo dữ liệu cho bảng */
	            if(ctrl.reports['ShowTable'] != false){
	            	if(ctrl.reports.HideTotal!="true"){
	            		$.each(seriesGroup, (key, value) => {
			              $.each(value, (kS, series) => {
			              	$.each(ctrl.fields, (kf, vf) => {
			              		if (resultData.R1.formatData.arrData.length > vf.X.count) {

				                  var jump = 1;
				                  for (var i = vf.X.count; i <= resultData.R1.formatData.arrData.length - vf.X.count; i++) {
				                    jump = jump * resultData.R1.formatData.arrData[i].length;
				                  }
				                  for (var i = 0; i < jump; i++) {
				                    var count = i, total = 0;
				                    while (count <= series.data.length) {
				                      if (ctrl.$Utils.isEmpty(series.data[count])) {
				                        total += parseInt(series.data[count]);
				                      }
				                      count += jump;
				                    }
				                    ctrl.reports.Fields.V.forEach(v =>{
					                  	if(v.Name == series.setting.Name) {
					                  		switch(v.TotalType) {
					                  			case "Average":
					                  				if(series.data.length > 0)
					                  					total = (total * jump)/series.data.length;
					                  				series.data.push(total);
					                  				break;
					                  			case "None":

					                  				break;
					                  			default:
					                  				series.data.push(total);
					                  				break;
					                  		}
					                  	}
					                  })
				                    // series.data.push(total);
				                  }
				                } else {
				                  var total = 0;
				                  var ser = ctrl.$Lodash.cloneDeep(series);
				                  $.each(ser.data, (kV, val) => {
				                    total += val;
				                  });
				                  ctrl.reports.Fields.V.forEach(v =>{
				                  	if(v.Name == ser.setting.Name) {
				                  		switch(v.TotalType) {
				                  			case "Average":
				                  				if(ser.data.length > 0)
				                  					total = total/ser.data.length;
				                  				series.data.push(total);
				                  				break;
				                  			case "None":

				                  				break;
				                  			default:
				                  				series.data.push(total);
				                  				break;
				                  		}
				                  	}
				                  })
				                  // if(ser.setting && ser.setting.SummaryType == "Average") {
				                  // 	if(ser.data.length > 0)
				                  // 		total = total/ser.data.length;
				                  // }
				                  // series.data.push(total);
				                }
			              	})

			              });
			            })
		          }
	              // ctrl.createTableData(resultData.R1.formatData, seriesGroup);
	              ctrl.createTableData(resultData, seriesGroup);
	            }
	          });
	        // }, () => {
	        //   ctrl.reports['viewModel']['reportNull'] = true;
	        //   ctrl.reports['viewModel']['isLoading'] = false;
	        ctrl.isHiddenCaption = false;
	        });
	      }, msg => {
	        ctrl.reports['viewModel']['reportNull'] = true;
	        ctrl.reports['viewModel']['isLoading'] = false;
	        ctrl.dataBinding = 'Không có dữ liệu!';
	        ctrl.isHiddenCaption = true;
	      });
	    },
	    setTableAndChartWidth() {
	    	var ctrl = this;
	          if (ctrl.reports['TableProportion']) {
	            ctrl.reports['viewModel']['flexTable'] = ctrl.reports['TableProportion'];
	          } else if (ctrl.$Utils.isEmpty(ctrl.reports['formatData'], 'reportDataTable.tableTB')) {
	            if (ctrl.reports['formatData']['reportDataTable']['tableTB'].length > 0) {
	              if (ctrl.reports['formatData']['reportDataTable']['tableTB'][0].length >= 6) {
	                ctrl.reports['viewModel']['classTable'] = '100';
	                if (ctrl.reports['formatData']['gObject'].length == 1) {
	                  ctrl.reports['formatData']['gObject'][0]['ColumnFlex'] = ctrl.reports['ReportProportion'];
	                }
	              } else if (ctrl.$Utils.isEmpty(ctrl.reports['formatData']['gObject'][0])) {
	                ctrl.reports['formatData']['gObject'][0]['ColumnFlex'] = ctrl.reports['ReportProportion'];
	              }
	            } else {
	              ctrl.reports['viewModel']['reportNull'] = true;
	            }
	          }
	          ctrl.dataBinding = '';
	        }

		},
	watch: {
		SearchIndex: function(val){
			var ctrl = this;
		//	console.log(ctrl.$Lodash.cloneDeep(ctrl.Filter))
			//console.log(ctrl.Filter)
			if(ctrl.Setting.FilterCode && ctrl.Filter.FilterCode == ctrl.Setting.FilterCode){
				// delete ctrl.Filter.FilterCode;
				ctrl.dataBinding = 'Đang tải ...'
				ctrl.reports['viewModel']['reportNull'] = false;
				if(ctrl.FilterSetting.DataGroup != ctrl.Setting.Name){
					if((ctrl.$Utils.isEmpty(ctrl.FilterSetting.LinkFieldFilter) && ctrl.$Utils.isEmpty(ctrl.FilterSetting.LinkFieldFilter[ctrl.Setting.Name])) || (ctrl.$Utils.isEmpty(ctrl.FilterSetting.Link) && ctrl.$Utils.isEmpty(ctrl.FilterSetting.Link[ctrl.Setting.Name]))) {
						var linkedFilter = {};
						if(ctrl.$Utils.isEmpty(ctrl.FilterSetting.LinkFieldFilter) && ctrl.$Utils.isEmpty(ctrl.FilterSetting.LinkFieldFilter[ctrl.Setting.Name])){
							ctrl.FilterSetting.LinkFieldFilter[ctrl.Setting.Name].forEach(filter => {
								$.each(ctrl.Filter, (key, val) => {
									if(key == filter.Source) {
										linkedFilter[filter.Target] = val
									} else
									if(key == filter.Source + 'StartValue') {
										linkedFilter[filter.Target + 'StartValue'] = val
									} else 
									if(key == filter.Source + 'EndValue') {
										linkedFilter[filter.Target + 'EndValue'] = val
									}
								})
							})
						}
						if(ctrl.$Utils.isEmpty(ctrl.FilterSetting.Link) && ctrl.$Utils.isEmpty(ctrl.FilterSetting.Link[ctrl.Setting.Name])) {
							ctrl.FilterSetting.Link[ctrl.Setting.Name].forEach(filter => {
								$.each(ctrl.Filter, (key, val) => {
									if(key == filter.Source) {
										linkedFilter[filter.Target] = val
									} else
									if(key == filter.Source + 'StartValue') {
										linkedFilter[filter.Target + 'StartValue'] = val
									} else 
									if(key == filter.Source + 'EndValue') {
										linkedFilter[filter.Target + 'EndValue'] = val
									}
								})
							})
						}
					}
					ctrl.refreshReport(linkedFilter);
					ctrl.formatCaption(linkedFilter);
				} else {
					ctrl.refreshReport(ctrl.Filter);
					ctrl.formatCaption(ctrl.Filter);
				}
			} else if(!ctrl.FilterSetting) {
				this.dataBinding = 'Đang tải ...'
				this.reports['viewModel']['reportNull'] = false;
	            this.refreshReport(this.Filter);
			}
        },
	},
	created(){
		// console.log(this.Filter)
		var ctrl = this;
		ctrl.reports['viewModel'] = {
            isLoading: true,
            flexTable: 33,
            flexChart: 66,
            reportError: false,
            reportNull: false,
            reportName: ctrl.$Utils.isEmpty(ctrl.reports, 'Caption') ? ctrl.reports['Caption'] : '',
            reportReady: false
          };
          ctrl.$set(ctrl.reports, 'formatData', {
            gObject: [],
            tableValue: {head: [], body: []},
            reportDataTable: {tableTHG: [], tableTH: [], tableTB: []},
            chartData: {categories: [], series: []},
            seriesNumber: 0
          });
		if(ctrl.$isMobileDevice == true){
        ctrl.MobileClass = "mobile";
      }
      if (ctrl.$Utils.isEmpty(ctrl.reports['AdvanceSetting'])) {
      	if(typeof ctrl.reports['AdvanceSetting'] === 'string') {
      		ctrl.reports['AdvanceSetting'] = ctrl.$Utils.stringToObject(ctrl.reports['AdvanceSetting'])
      	}
        // if (ctrl.reports['AdvanceSetting']['Value']) {
        //   $.each(ctrl.$Utils.stringToObject(ctrl.reports['AdvanceSetting']['Value']), (k, v) => {
        //     ctrl.reports['AdvanceSetting'][k] = v;
        //   });
        // }
        // if (ctrl.reports['AdvanceSetting']['ExtraSetting']) {
        //   $.each(ctrl.$Utils.stringToObject(ctrl.reports['AdvanceSetting']['ExtraSetting']), (k, v) => {
        //     if (v.indexOf('.EQUALTO') >= 0) {
        //       v = v.replaceAll('.EQUALTO', '=').replaceAll('.AND', '&');
        //     }
        //     ctrl.reports['AdvanceSetting'][k] = v;
        //   })
        // }
      }
      if(ctrl.$Utils.isEmpty(ctrl.reports['FormRequest'])){
        ctrl.ShowTree = false;
        var request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
        request.R1_RequestTemplate = ctrl.reports['FormRequest'];
        request = ctrl.$Utils.updateParamsSingleRequest(request, ctrl.$Utils.stringToObject(ctrl.reports['FormCode']));
        ctrl.$Utils.post(request).then(result => {
          ctrl.object = ctrl.$Utils.getDataWithRoot(result, 'R1.' + ctrl.reports['FormDataRoot']);
        })
      }
      /**
       * Tạo request lấy setting báo cáo từ máy chủ
       *
       * error: biến dùng để kiểm tra có lỗi trong setting lấy dữ liệu
       */
      var paramSettings = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
      paramSettings.RequestTemplate = 'Setting.Report.SearchList';
      paramSettings.TotalRequests = 1;
      paramSettings.R1_ParentCode = ctrl.reports['Code'];
      ctrl.fields = ctrl.getReportSetting(paramSettings);
      // if (ctrl.reports['AutoSearch'] || ctrl.research) {
      // var searchCondition = {};
      // searchCondition['PlanStartDateStartValue'] = ctrl.$Utils.getDateTimeByKey('WeekStart')
      // searchCondition['PlanStartDateEndValue'] = ctrl.$Utils.getDateTimeByKey('WeekEnd')
      if(ctrl.Setting.FilterCode && ctrl.Filter.FilterCode == ctrl.Setting.FilterCode)
      	ctrl.refreshReport(ctrl.Filter);
      else if(!ctrl.FilterSetting)
      	ctrl.refreshReport(ctrl.Filter);
	  if(ctrl.Setting.IsDashBoard === true){
	  	this.Setting.ReportProportion = 100;
	  	this.Setting.TableProportion = 100;
	  }
      if(ctrl.Setting.IsDashBoard === true || ctrl.Setting.RealTime === 'true'){
      	ctrl.setInterval = setInterval(() =>{
			ctrl.reports['viewModel']['reportNull'] = false;
	        if(ctrl.FilterSetting.DataGroup != ctrl.Setting.Name){
				if((ctrl.$Utils.isEmpty(ctrl.FilterSetting.LinkFieldFilter) && ctrl.$Utils.isEmpty(ctrl.FilterSetting.LinkFieldFilter[ctrl.Setting.Name])) || (ctrl.$Utils.isEmpty(ctrl.FilterSetting.Link) && ctrl.$Utils.isEmpty(ctrl.FilterSetting.Link[ctrl.Setting.Name]))) {
					var linkedFilter = {};
					if(ctrl.$Utils.isEmpty(ctrl.FilterSetting.LinkFieldFilter) && ctrl.$Utils.isEmpty(ctrl.FilterSetting.LinkFieldFilter[ctrl.Setting.Name])){
						ctrl.FilterSetting.LinkFieldFilter[ctrl.Setting.Name].forEach(filter => {
							$.each(ctrl.Filter, (key, val) => {
								if(key == filter.Source) {
									linkedFilter[filter.Target] = val
								} else
								if(key == filter.Source + 'StartValue') {
									linkedFilter[filter.Target + 'StartValue'] = val
								} else 
								if(key == filter.Source + 'EndValue') {
									linkedFilter[filter.Target + 'EndValue'] = val
								}
							})
						})
					}
					if(ctrl.$Utils.isEmpty(ctrl.FilterSetting.Link) && ctrl.$Utils.isEmpty(ctrl.FilterSetting.Link[ctrl.Setting.Name])) {
						ctrl.FilterSetting.Link[ctrl.Setting.Name].forEach(filter => {
							$.each(ctrl.Filter, (key, val) => {
								if(key == filter.Source) {
									linkedFilter[filter.Target] = val
								} else
								if(key == filter.Source + 'StartValue') {
									linkedFilter[filter.Target + 'StartValue'] = val
								} else 
								if(key == filter.Source + 'EndValue') {
									linkedFilter[filter.Target + 'EndValue'] = val
								}
							})
						})
					}
				}
				ctrl.refreshReport(linkedFilter);
				ctrl.formatCaption(linkedFilter);
			} else {
				ctrl.refreshReport(ctrl.Filter);
				ctrl.formatCaption(ctrl.Filter);
			}
	    }, 30000);
      }

      // if(ctrl.Filter)
        // ctrl.refreshReport(ctrl.$Utils.getDataWithRoot(ctrl.reports, 'parentSetting.set.ParentFilterCondition'));
      // }
	},
	destroyed() {
	    clearInterval(this.setInterval);
	},
}
</script>

<style lang="scss">
	.dynamic-report {
		.reports-header {
			white-space:nowrap;
			flex-wrap: nowrap;
		}
		.reports-title {
			white-space: nowrap;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    color: #333;
		    padding-left: 20px;
		}


		.md-toolbar-tools {
			button {
				padding: 0px;
			}
		}

		table.report-table {
	      tbody
	      tr.TotalRow td {
	        font-weight: bold;
	        background: #fff;
	        color: #ff0000;
	        padding-left: 25px !important;
	      }

	      tbody td:first-child {
	        padding-left: 25px !important;
	        white-space: nowrap;
	      }
	    }
	}
	.dynamicDashboard {
		.reports-title {
			white-space: normal;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    color: #333;
		    padding-left: 20px;
		    font-size: 16px;
    		text-align: center;
		}
	}
</style>
