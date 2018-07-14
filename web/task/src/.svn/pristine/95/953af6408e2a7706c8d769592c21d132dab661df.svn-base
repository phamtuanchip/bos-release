<template>
<el-form label-width="130px">
  <el-form-item label="Chọn công thức">
     <el-select v-model="Calculator" placeholder="Chọn" >
            <el-option
              v-for="w in comboCalculator"
              :key="w.Id"
              :label="w.Name"
              :value="w.Code">
            </el-option>
     </el-select>
  </el-form-item>
   <el-button @click="Calculate()" v-if="Calculator">Tính toán</el-button>
   <el-button @click="excuteUpdate()" v-if="IsExcute">Cập nhật</el-button>
</el-form>
</template>

<script>
import utilsLibrary from '@/services/utils'
export default {
data(){
  return {
    Calculator: undefined,
    IsExcute: false,
    DataSetting: {},
    objSetting: {},
    SumFields: [],
    MinFields: [],
    CountFields: [],
    AverageFields: [],
    ExpressionFields: [],
    calculatorRequest: [],
    rootData: [],
    Index: 0,
    Increased: 100,
    comboCalculator: [],


  }
},
mounted(){
  this.init();
},
 methods: {

     Calculate() {
      var ctrl = this;
      var request = this.$Lodash.cloneDeep(this.$singleRequest);
      request.R1_RequestTemplate = 'Setting.SearchBase';
      request.R1_Code = ctrl.Calculator;
      utilsLibrary.post(request).then((data)=> {
        ctrl.DataSetting = utilsLibrary.getDataWithRoot(data.R1, 'Data.DynamicDS.Setting')[0];
        ctrl.objSetting = utilsLibrary.stringToObject(this.$Lodash.cloneDeep(ctrl.DataSetting.Description));
        if (utilsLibrary.isEmpty(ctrl.objSetting.Sum)) {
          ctrl.SumFields = utilsLibrary.stringToObject(ctrl.objSetting.Sum.replaceAll('+', '&').replaceAll(':', '='));
        }
        if (utilsLibrary.isEmpty(ctrl.objSetting.Count)) {
          ctrl.CountFields = utilsLibrary.stringToObject(ctrl.objSetting.Count.replaceAll('+', '&').replaceAll(':', '='))
        }
        if (utilsLibrary.isEmpty(ctrl.objSetting.Min)) {
          ctrl.MinFields = utilsLibrary.stringToObject(ctrl.objSetting.Min.replaceAll('+', '&').replaceAll(':', '='))
        }
        if (utilsLibrary.isEmpty(ctrl.objSetting.Max)) {
          ctrl.MaxFields = utilsLibrary.stringToObject(ctrl.objSetting.Max.replaceAll('+', '&').replaceAll(':', '='))
        }
        if (utilsLibrary.isEmpty(ctrl.objSetting.Average)) {
          ctrl.AverageFields = utilsLibrary.stringToObject(ctrl.objSetting.Average.replaceAll('+', '&').replaceAll(':', '='))
        }
        if (utilsLibrary.isEmpty(ctrl.objSetting.Expression)) {
          ctrl.ExpressionFields = utilsLibrary.stringToObject(ctrl.objSetting.Expression.replaceAll('+', '&').replaceAll(':', '='))
        }
        var multiRequest = this.$Lodash.cloneDeep(this.$singleRequest);
        multiRequest.R1_RequestTemplate = ctrl.objSetting.RRequestTemplate + ".Search";
        multiRequest.R1_RequestDataGroup = ctrl.objSetting.RRequestDataGroup;
        multiRequest.R1_RequestFields = ctrl.objSetting.RRequestFields;
        multiRequest.R1_Code = ctrl.objSetting.RCode;
        // multiRequest.R2_RequestTemplate = "Setting.Datagroup.FieldsSetting";
        // multiRequest.R2_ParentCode = ctrl.objSetting.RRequestDataGroup;
        multiRequest.TotalRequests = 1;
        ctrl.startLoading = utilsLibrary.showLoading('start');
        utilsLibrary.post(multiRequest).then((multiData)=> {
          ctrl.rootData = utilsLibrary.getDataWithRoot(multiData.R1, ctrl.objSetting.RDataSource);
          // ctrl.Datagroups =  utilsLibrary.getDataWithRoot(multiData.R2, "Data.DynamicDS.Setting");
          ctrl.mathIndex = 0
          ctrl.rootLength = ctrl.rootData.length;
          if (ctrl.rootData.length != 0) {
            ctrl.calculatorRequest = [];
            $.each(ctrl.rootData, (key, rootData)=> {
              this.createCalculatorRequest(rootData, key);
            })
          } else {
            utilsLibrary.showLoading('stop', ctrl.startLoading);
            utilsLibrary.showMessage('error', 'Không có dữ liệu!');
          }
        })
      });
    },

     createCalculatorRequest(data, index) {
       var ctrl = this;
      var value = data;
      $.each(ctrl.objSetting.RFields.split(';'), (key, set)=> {
        value[set] = 0;
      })
      var childRequest = this.$Lodash.cloneDeep(this.$singleRequest);
      childRequest.TotalRequests = 0;
      for (var i = 1; i <= ctrl.objSetting.R; i++) {
        childRequest["R" + i + "_RequestTemplate"] = ctrl.objSetting["R" + i + "RequestTemplate"] + ".Search";
        childRequest["R" + i + "_RequestDataGroup"] = ctrl.objSetting["R" + i + "RequestDataGroup"];
        childRequest["R" + i + "_RequestFields"] = ctrl.objSetting["R" + i + "RequestFields"];
        childRequest["R" + i + "_Code"] = ctrl.objSetting["R" + i + "Code"];
        childRequest.TotalRequests++;
        $.each(ctrl.objSetting["R" + i + "RequestFields"].split(';'), (key, field)=> {
          if (utilsLibrary.isEmpty(ctrl.objSetting["R" + i + field]) && field != "Code") {
            if (utilsLibrary.isEmpty(ctrl.objSetting["R" + i + "OriField"]) && ctrl.objSetting["R" + i + "OriField"].split(';').indexOf(field) !== -1) {
              childRequest["R" + i + "_" + field] = ctrl.objSetting["R" + i + field];
            } else
              childRequest["R" + i + "_" + field] = value[ctrl.objSetting["R" + i + field]];
          }
        })
        if (utilsLibrary.isEmpty(ctrl.objSetting["R" + i + "DateTime"])) {
          var objDateTime = utilsLibrary.stringToObject(ctrl.objSetting["R" + i + "DateTime"].replaceAll(':', '='))
          $.each(objDateTime, (key, field)=> {
            if (utilsLibrary.isEmpty(value[field])) {
              var startValue = new Date(value[field]);
              var endValue = new Date(value[field]);
              endValue.setHours(23, 59, 59)
              startValue.setHours(0, 0, 0)
              childRequest["R" + i + "_" + key + 'StartValue'] = utilsLibrary.formatDateTime(startValue);
              childRequest["R" + i + "_" + key + 'EndValue'] = utilsLibrary.formatDateTime(endValue);
            }
          })
        }
        if (utilsLibrary.isEmpty(ctrl.objSetting["R" + i + "SearchField"]) && !utilsLibrary.isEmpty(childRequest["R" + i + "_" + ctrl.objSetting["R" + i + "SearchField"]])) {
          childRequest["R" + i + "_" + ctrl.objSetting["R" + i + "SearchField"]] = NaN;
        }
      }
      ctrl.calculatorRequest.push(childRequest)
      // if (ctrl.mathIndex < ctrl.rootLength - 1) {
      // if (index < 100) {
      // ctrl.mathIndex++;
      // index++;
      // createCalculatorRequest(data, index);
      // }
      if (index == ctrl.rootData.length - 1) {
        // utilsLibrary.showLoading('stop');
        // utilsLibrary.showMessage('success', 'Tính toán thành công!');
        // ctrl.IsExcute = true;
        var Excute = 0;
        $.each(ctrl.calculatorRequest, (keyRequest, cRequest)=> {
          ctrl.calculatorProcessing(cRequest, ctrl.rootData[keyRequest], keyRequest)
        })

      }
    },

     calculatorProcessing(childRequest, value) {
       var ctrl = this;
      utilsLibrary.post(childRequest).then((childData)=> {
        for (var i = 1; i <= ctrl.objSetting.R; i++) {
          ctrl["DataR" + i] = utilsLibrary.getDataWithRoot(childData["R" + i], ctrl.objSetting["R" + i + "DataSource"]);
          $.each(ctrl["DataR" + i], (key1, childField)=> {
            $.each(ctrl.SumFields, (key, sum)=> {
              if(!value[key] || isNaN(parseInt(value[key]))) {
                value[key] = 0
              }
              if (utilsLibrary.isEmpty(childField[sum])) {
                value[key] = parseInt(value[key]) + parseInt(childField[sum])
              }
            })
            $.each(ctrl.CountFields, (key, count)=> {
              if(count.indexOf("!!") >= 0 && !utilsLibrary.isEmpty(compareValue)){
                var compareValue = "";
              }
              if (utilsLibrary.isEmpty(ctrl.objSetting["R" + i])) {
                $.each(ctrl.objSetting["R" + i].split(';'), (key2, CFields)=> {
                  if (count.indexOf("!!") == -1 && utilsLibrary.isEmpty(childField[count]) && CFields == key) {
                    value[key] = parseInt(value[key]) + 1;
                  } else if(utilsLibrary.isEmpty(compareValue) && utilsLibrary.isEmpty(childField[count.split("!!")[0]]) && CFields == key){
                    if(compareValue.indexOf(childField[count.split("!!")[1]]) == -1){
                      value[key] = parseInt(value[key]) + 1;
                      compareValue += childField[count.split("!!")[1]] + ";";
                    }
                  }
                })
              }
            })
            $.each(ctrl.MinFields, (key, min)=> {
              if (utilsLibrary.isEmpty(childField[min])){
                if(value[min] == 0){
                  value[min] = childField[min]
                } else if(value[min] > childField[min]) {
                  value[min] = childField[min]
                }
              }
            })
            $.each(ctrl.MaxFields, (key, max)=> {
              if (utilsLibrary.isEmpty(childField[max])){
                if(value[max] == 0){
                  value[max] = childField[max]
                } else if(value[max] > childField[max]) {
                  value[max] = childField[max]
                }
              }
            })
            $.each(ctrl.AverageFields, (key, average)=> {
              if(utilsLibrary.isEmpty(value[key]) && value[key] == 0){
                value[key] = {sum: 0,count: 0};
              }
              if (utilsLibrary.isEmpty(childField[average])) {
                value[key].sum = parseInt(value[key].sum) + parseInt(childField[average]);
              }
              if (utilsLibrary.isEmpty(ctrl.objSetting["R" + i])) {
                $.each(ctrl.objSetting["R" + i].split(';'), (key4, CFields)=> {
                  if (utilsLibrary.isEmpty(childField[average]) && CFields == key) {
                    value[key].count = parseInt(value[key].count) + 1;
                  }
                })
              }
            })
          })
        }
        if (utilsLibrary.isEmpty(ctrl.objSetting.ExtraFields)) {
          var keyExtra = ctrl.objSetting.ExtraFields.split('|');
          var valueExtra = utilsLibrary.stringToObject(ctrl.objSetting.ExtraValue.replaceAll('+', '&').replaceAll(':', '='));
          $.each(valueExtra, (KExtra, VExtra)=> {
            if (KExtra == value[keyExtra[0]]) {
              var objExtra = VExtra.split('|');
              value[keyExtra[0]] = objExtra[0];
              value[keyExtra[1]] = objExtra[1];
            } else if (utilsLibrary.isEmpty(ctrl.objSetting.ExtraRequest)) {
              value[keyExtra[0]] = 0;
              value[keyExtra[1]] = 0;
              var Extra = 0
              $.each(ctrl["Data" + ctrl.objSetting.ExtraRequest], (key5, childField)=> {
                if (utilsLibrary.isEmpty(childField[ctrl.objSetting.ExtraCondition])) {
                  Extra = parseInt(Extra) + 1;
                }
              })
              var valueExtraAfter = utilsLibrary.stringToObject(ctrl.objSetting.ExtraValueAfter.replaceAll('+', '&').replaceAll(':', '='));
              $.each(valueExtraAfter, (KExtraAfter, VExtraAfter)=> {
                if (KExtraAfter == Extra) {
                  var objExtraAfter = VExtraAfter.split('|');
                  value[keyExtra[0]] = objExtraAfter[0];
                  value[keyExtra[1]] = objExtraAfter[1];
                }
              })
              if (utilsLibrary.isEmpty(valueExtraAfter.ELSE) && value[keyExtra[1]] == 0) {
                var objExtraAfter = valueExtraAfter.ELSE.split('|');
                value[keyExtra[0]] = objExtraAfter[0];
                value[keyExtra[1]] = objExtraAfter[1];
              }
            }
          })
          if (utilsLibrary.isEmpty(valueExtra.ELSE) && value[keyExtra[1]] == 0) {
            var objExtra = valueExtra.ELSE.split('|');
            value[keyExtra[0]] = objExtra[0];
            value[keyExtra[1]] = objExtra[1];
          }
        }
        var objRequest = {};
        $.each(value, (updateKey, updateField)=> {
          if(utilsLibrary.isEmpty(updateField, 'sum') && utilsLibrary.isEmpty(updateField, 'count')){
            updateField = updateField.sum/updateField.count;
          }
          objRequest[updateKey] = updateField;
        })
        $.each(ctrl.ExpressionFields, (key, expression)=> {
          var exp = expression, replacedExpression = '';
          while (exp != '') {
            if (exp.indexOf('{{') >= 0 && exp.indexOf('}}') > exp.indexOf('{{')) {
              replacedExpression += exp.substr(0, exp.indexOf('{{'));
              var ekey = exp.substr(exp.indexOf('{{') + 2, exp.indexOf('}}') - exp.indexOf('{{') - 2);
              /** thêm filter dựa vào setting tính từ dấu |, định dạng được xác định bằng dấu : trong chuỗi */
              var name = this.$Lodash.cloneDeep(ekey), evalue = '';
              if (ekey.indexOf('.') > 0) {
                name = ekey.substr(0, ekey.indexOf('.')).trim();
                evalue = ekey.substr(ekey.indexOf('.') + 1, ekey.length).trim();
              }
              var exist = false;
              for (var i = 0; i < objRequest.length; i++) {
                if (key == name) {
                    if (utilsLibrary.isEmpty(objRequest[i])) {
                    replacedExpression += objRequest[i];
                  }
                  exist = true;
                }
              }
              if (!exist) {
                if (utilsLibrary.isEmpty(objRequest, name)) {
                  replacedExpression += objRequest[name];
                  exist = true;
                }
              }
              /** kiểm tra nếu không tồn tại giá trị và đối với loại là số thì replace biến = 0*/
              if (!exist) {
                  replacedExpression += 0;
              }
              exp = exp.substr(exp.indexOf('}}') + 2, exp.length);
            }
            else {
              replacedExpression += exp;
              exp = '';
            }
          /** Kiểm tra các trường hợp của FieldData để tính toán */
            /** trường hợp là integer chuyển các phần từ rỗng thành 0, cộng chuỗi
             * các phần tử để tạo thành biểu thức toán học*/
            objRequest[key] = 0;
            if (replacedExpression !== '' && exp == '') {
              // * gọi hàm tính toán biểu thức toán học
              replacedExpression = replacedExpression.replaceAll(".DIVIDES", "(").replaceAll(".DIVIDEE", ")");
              objRequest[key] = utilsLibrary.calculator(replacedExpression);
            }
          }
        })
        objRequest.RequestTemplate = ctrl.objSetting.RRequestTemplate + ".Update";
        // objRequest.ConditionFields = "Id";
        // objRequest.StaticFields = "";
        // objRequest.StructFields = "";
        // objRequest.DynamicFields = "";
        // angular.forEach(ctrl.Datagroups, function(item){
        //   angular.forEach(ctrl.objSetting.RRequestFields.split(";"), function(value){
        //     if(value == item.Name){
        //       if(item.FieldStorageType!="Condition"){
        //         objRequest[item.FieldStorageType+"Fields"] += item.Name+";";
        //       }
        //       if(item.FieldStorageType == "DateTime"){
        //         objRequest[item.Name+"ColumnType"] = 3
        //       } else if (item.FieldStorageType == "Integer") {
        //         objRequest[item.Name+"ColumnType"] = 1
        //       } else if (item.FieldStorageType == "Double") {
        //         objRequest[item.Name+"ColumnType"] = 2
        //       } else {
        //         objRequest[item.Name+"ColumnType"] = 0
        //       }
        //     }
        //   })
        // })
        objRequest.RequestDataGroup = ctrl.objSetting.RRequestDataGroup;
        objRequest.RequestFields = ctrl.objSetting.RRequestFields;
        ctrl.ListExcuteRequests.push(objRequest);
        if (ctrl.mathIndex < ctrl.rootLength - 1) {
          // if (index < 10) {
          ctrl.mathIndex++;
          // createCalculatorRequest(data, index);
        }
        else {
          console.log(ctrl.ListExcuteRequests)
          utilsLibrary.showLoading('stop', ctrl.startLoading);
          utilsLibrary.showMessage('success', 'Tính toán thành công!');
          ctrl.IsExcute = true;
        }

      })
    },

     excuteUpdate() {
      var ctrl = this;
      ctrl.listLogs = {Success: 0, Failed: 0, Message: '', Updated: 0};
      ctrl.createUpdateRequest();
    },

     createUpdateRequest() {
      var ctrl = this;
      var isFinished = false;
      var request = this.$Lodash.cloneDeep(this.$singleRequest);
      request.TotalRequests = 0;
      var index = ctrl.Index;
      for (var i = 0; i < ctrl.Increased; i++) {
        if ((index + i) < ctrl.ListExcuteRequests.length) {
          ctrl.Index = index + i;
          request.TotalRequests++;
          request = utilsLibrary.updateParamsSingleRequest(request, ctrl.ListExcuteRequests[ctrl.Index], request.TotalRequests);
        }
        else
          break;
      }
      utilsLibrary.post(request).then(function (result) {
        if (result.success) {
          if (result.success == true) {
            ctrl.listLogs.Updated = ctrl.listLogs.Updated + ctrl.Increased
          } else {
            ctrl.listLogs.Failed = ctrl.listLogs.Failed + ctrl.Increased
          }
          if (ctrl.Index == ctrl.ListExcuteRequests.length - 1)
            isFinished = true;
          else
            ctrl.Index++;
          if (!isFinished) {
            ctrl.listLogs.Success = ctrl.listLogs.Success + ctrl.Increased;
            ctrl.createUpdateRequest();
          } else {
            ctrl.Index = 0;
            ctrl.listLogs.Success = ctrl.ListExcuteRequests.length;
            utilsLibrary.showMessage('success', 'Cập nhật thành công!');
          }
        }
      });
    },

     init() {
      var ctrl = this;
      ctrl.ListExcuteRequests = [];
      ctrl.SumFields = {};
      ctrl.CountFields = {};
      ctrl.Index = 0;
      ctrl.Increased = 100;
      var request = this.$Lodash.cloneDeep(this.$singleRequest);
      request.R1_RequestTemplate = 'Setting.SearchBase';
      request.R1_ParentCode = 'xSetting.Project.Calculator';
      utilsLibrary.post(request).then((data)=> {
        ctrl.comboCalculator = utilsLibrary.getDataWithRoot(data.R1, 'Data.DynamicDS.Setting');
      })
    }


 }

}
</script>
