<!--suppress ALL -->
<template>

  <div class="report-form">

    <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item>
        <el-button @click="back" >Quay lại</el-button>
        <el-button type="primary" @click="openPermissionSelector()" v-if="!isNew" >Cấp phép</el-button>
        <el-button type="primary" @click="save('ruleForm')">Lưu</el-button>
      </el-form-item>
      <el-form-item label="Tên">
        <el-input v-model="model.Description.Caption"></el-input>
      </el-form-item>

      <el-form-item label="Mô tả">
        <el-input type='textarea' v-model="model.Description.More"></el-input>
      </el-form-item>
      <el-col :span="6">
        <el-form-item label="">
          <label>Hiển thị tiêu đề</label>
          <el-switch v-model="model.Description.ShowReportHeader" :active-value="true"></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="">
          <label>Lấy theo quyền</label>
          <el-switch v-model="model.Description.AssignedUser" :active-value="true"></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="Chu kỳ (s)">
        <!-- <label>Email gửi</label> -->
          <el-input v-model="model.Description.Duration"  type="number"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="Số phần tử">
        <!-- <label>Email gửi</label> -->
          <el-input v-model="model.Description.Display" type="number"></el-input>
        </el-form-item>
      </el-col>
      <el-form-item label="Cấu hình request">
        <el-input type='textarea' v-model="model.Description.RequestTemplate"></el-input>
      </el-form-item>
      <el-form-item label="Cấu hình thêm">
        <el-input type='textarea' v-model="model.Description.AdvanceSetting"></el-input>
      </el-form-item>

    </el-form>
  </div>

</template>
<script>
  import Vue from 'vue';
  // import VueDragula from 'vue-dragula';
  import PermissionSelector from '@/components/static/PermissionSelector';
  import ReportElement from "@/components/static/advance/ReportElement";
  import ElSwitch from "element-ui/packages/switch/src/component";

  // Vue.use(VueDragula);

  export default {
    props: ['selectedItem', 'isShow', 'isNew', 'closeCallback'],
    components:{
      ElSwitch, PermissionSelector, ReportElement},
    data() {

      return {
        ListTableFields: [],
        listDisplay: [],
        DataGroupTree: [],
        selectedDataGroups: [],
        model: {
          Description: {

          },
          PathById: ''
        },
        viewModel: {
          Group: 'X',
          ListDataGroups: [],
          ListOrderFields: [],          
        },
        tableTField: {
          Code: '',
          Name: '',
          Description: ''
        },
        listSelectedButtons: [],
        CurrentDataGroup: {},
        options: [],
        ruleForm: {
          name: '',

        },
        rules: {
          name: [
            {
              required: true,
              message: "Please input Activity name",
              trigger: "blur"
            }
          ]
        }
      };
    },

    created() {
      Vue.vueDragula.options('fieldsBag', {
        direction: 'vertical'
      })

    },
    mounted() {
     // alert(this.selectedItem);
      var ctrl = this;
      ctrl.bindEditor();
      // Vue.vueDragula.eventBus.$on('drop', function (args) {
      //   if(args[2].id == "row_V"){
      //     var selectedField = {};
      //     if(args[3].id == "row_X"){
      //       selectedField = ctrl.model.Description.Fields.X[eval(args[1].attributes.value.value)]
      //       ctrl.insertValueField(selectedField);
      //       ctrl.insertOrderField(selectedField);
      //     } else if(args[3].id == "row_Y") {
      //       selectedField = ctrl.model.Description.Fields.Y[eval(args[1].attributes.value.value)]
      //       ctrl.insertValueField(selectedField);
      //       ctrl.insertOrderField(selectedField);
      //     }

      //   } else if(args[3].id == "row_V") {
      //     var selectedField = ctrl.model.Description.Fields.V[eval(args[1].attributes.value.value)];
      //     ctrl.ListTableFields = ctrl.ListTableFields.filter((el) => {
      //       return el.value != selectedField.Name;
      //     });
      //     ctrl.listSelectedButtons = ctrl.listSelectedButtons.filter((el) => {
      //       return el != selectedField.Name;
      //     });
      //     ctrl.model.Description.Fields.Table = ctrl.model.Description.Fields.Table.filter((el) => {
      //       return el.Name != selectedField.Name;
      //     });
      //     ctrl.model.Description.Fields.Series = ctrl.model.Description.Fields.Series.filter((el) => {
      //       return el.Name != selectedField.Name;
      //     });
      //   }
      // })       
    },     
    methods: {
      // addTField() {
      //   var ctrl = this;
      //   ctrl.model.Description.Fields.T.push(ctrl.tableTField);
      //   ctrl.tableTField = {
      //     Code: '',
      //     Name: '',
      //     Description: ''
      //   }
      // },
      // confirmDelete(ev, item, index) {
      //   this.$Utils
      //     .showConfirm(
      //       "Cảnh báo",
      //       this.$toastMessage.oneWayAction + this.$toastMessage.deleteSettingWarning
      //     )
      //     .then(() => {
      //         this.requestByAction(index);
      //     });
      // },
      // requestByAction(index) {
      //   this.model.Description.Fields.T.splice(index, 1);
      // },
      // editDetail(){
      //    let route = this.$router.resolve("/settings/" + this.selectedItem.Code);
      //    window.open(route.href, '_blank');
      // },
      openPermissionSelector() {
        this.$hub.$emit(
          "set-modal-data",
          'Cấp quyền',
          "60%",
          true,
          "center",
          PermissionSelector,
          false,
          '',
          this.selectedItem.Id
        );
      },
      // checkedField(ev) {
      //   var ctrl = this;
      //   $.each(ctrl.ListTableFields, (key, value) =>{
      //     if(ctrl.listSelectedButtons.indexOf(value.value) != -1){
      //       ctrl.ListTableFields[key].checked = true;
      //     } else {
      //       ctrl.ListTableFields[key].checked = false;
      //     }
      //   })
      // },
      bindEditor() {
        var ctrl = this;
        // var arrSettings = [
        //   // {Id: $state.params.id},
        //   {ParentCode: 'xSetting.Default.Project.Report.ReportType'},
        //   {ParentCode: 'xSetting.Default.Project.Report.DisplayType'},
        //   {ParentCode: 'xSetting.Project.DataGroup'}
        //   // {ParentCode: 'xSetting.Default.Project.DataGroup.DataSource'}
        // ]
        // var request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
        // request.TotalRequests = 0;
        // arrSettings.forEach(function (item) {
        //   request.TotalRequests++;
        //   item.RequestTemplate = 'SettingNew.SearchSetting';
        //   request = ctrl.$Utils.updateParamsSingleRequest(request, item, request.TotalRequests);
        // })
        // ctrl.$Utils.postCheckResult(request).then(function (result) {
        //   ctrl.viewModel.ListReportTypes = ctrl.$Utils.getDataWithRoot(result.R1, 'Data.DynamicDS.Setting');
        //   ctrl.viewModel.ListDisplayProportions = ctrl.$Utils.getDataWithRoot(result.R2, 'Data.DynamicDS.Setting');
        //   ctrl.viewModel.ListDataGroups = ctrl.$Utils.getDataWithRoot(result.R3, 'Data.DynamicDS.Setting');
        //   // ctrl.viewModel.ListDataSource = ctrl.$Lodash.uniqBy(ctrl.$Utils.getDataWithRoot(result.R4, 'Data.DynamicDS.Setting'), 'Name');
        //   ctrl.DataGroupTree = ctrl.$Utils.createCustomTreeFromList(
        //     ctrl.$Lodash.cloneDeep(ctrl.viewModel.ListDataGroups),
        //     "Id",
        //     "ParentId",
        //     "children",
        //     { "Caption" : "label", Id : "value" },
        //     {}
        //   );

        //   // var currentObject = ctrl.$Utils.getDataWithRoot(result.R1, 'Data.DynamicDS.Setting')[0];
          var currentObject = ctrl.$Lodash.cloneDeep(ctrl.selectedItem);
          if (!ctrl.$Utils.isEmpty(currentObject)) {
            ctrl.$Utils.showMessage('error', 'Không có cấu hình báo cáo!');
            return;
          }
          currentObject.Description = JSON.parse(currentObject.Description);
          if(currentObject.Description.RequestTemplate)
            // currentObject.Description.RequestTemplate = JSON.stringify(currentObject.Description.RequestTemplate);
        //   // console.log(' currentObject.Description ', currentObject.Description)
          $.each(currentObject.Description, function (key, value) {
            if (value == 'true')
              currentObject.Description[key] = true;
            else if (value == 'false')
              currentObject.Description[key] = false;
          });

        //   // var arrTypes = ['X', 'Y', 'V', 'T', 'Table'];
        //   // arrTypes.forEach(function (type) {
        //   //   currentObject.Description.Fields[type].forEach(function (item) {
        //   //     var listItem = {
        //   //       label: item.Caption,
        //   //       value: item.Name
        //   //     };
        //   //     if (type == 'Table' && item.Display)
        //   //       listItem.checked = true;
        //   //     if(ctrl.$Utils.isEmpty(ctrl['List' + type + 'Fields'])){
        //   //       ctrl['List' + type + 'Fields'].push(listItem);
        //   //       if(listItem.checked){
        //   //         ctrl.listSelectedButtons.push(listItem.value)
        //   //       }
        //   //     }

        //   //     ctrl.insertOrderField(item);
        //   //   });
        //   // })
          ctrl.model = currentObject;
        //   //console.log(ctrl.model)
        //   if(ctrl.model.Name){
        //     ctrl.viewModel.ListDataGroups.forEach(item => {
        //       var ret = true;
        //       if(item.Code === ctrl.model.Name){
        //         ctrl.selectedDataGroups = [item.ParentId, item.Id];
        //         // ctrl.$set(ctrl, 'selectedDataGroups', tmp);
        //         ctrl.handleChange(ctrl.selectedDataGroups);
        //         ret = false;
        //       }
        //       return ret;
        //     })
        //     // ctrl.handleChange(ctrl.model.Name)
        //   }

        //   // bindListDataGroups();
        // });
      },
      // insertOrderField(field) {
      //   var ctrl = this;
      //   var isExist = false;
      //   ctrl.viewModel.ListOrderFields.forEach(function (orderField) {
      //     if (orderField.Name == field.Name)
      //       isExist = true
      //   })
      //   if (!isExist)
      //     ctrl.viewModel.ListOrderFields.push(field);
      // },
      back(){
        //this.$router.push('/lists')
        this.resetForm('ruleForm');
        if(this.closeCallback) this.closeCallback();

      },
      // handleChange(value) {
      //   var dataGroup = this.viewModel.ListDataGroups.filter((el) => {
      //     return el.Id == value[value.length - 1];
      //   })[0];
      //   this.model.Name = dataGroup.Code
      //   if(typeof dataGroup.Description === 'string')
      //    dataGroup.Description = JSON.parse(dataGroup.Description);
      //   dataGroup.Fields = '';
      //   for (var i = 1; i <= dataGroup.Description.FCount; i++) {
      //     if (dataGroup['F' + i] != undefined)
      //       dataGroup.Fields += dataGroup['F' + i];
      //   }
      //   // this.model.Description.DataGroupCaption = dataGroup.Caption;
      //   // this.model.Description.RootData = dataGroup.Description.RootData;
      //   // this.model.Description.DataSource = dataGroup.Description.DataSource;
      //   // this.model.Description.AdditionConditions = dataGroup.Description.AdditionConditions;
      //   dataGroup.Fields = JSON.parse(dataGroup.Fields);
      //   //console.log(dataGroup.Fields)
      //   this.viewModel.ListReportFields = dataGroup.Fields.filter((el) => {
      //     return el.ReportIsUsed == 'true';
      //   });
      // },
      // showFieldDetail(type, value, current, index) {
      //   var dataToPass = {
      //     value: value,
      //     model: this.model,
      //     bindField: this.bindField,
      //     CurrentGroup: this.$Utils.isEmpty(current) ? current : 'V',
      //     index: this.$Utils.isEmpty(index) ? index : this.model.Description.Fields.V.length - 1
      //   }
      //   this.$hub.$emit(
      //     "set-modal-data",
      //     'Thông tin',
      //     "60%",
      //     true,
      //     "center",
      //     ReportElement,
      //     false,
      //     '',
      //     dataToPass
      //   );
      // },
      addGroupFields() {
        this.data.push({
          key: this.data.length,
          label: `grouped-fields`,
          type: "GROUPFIELD",
          disabled: true
        });
        this.value3.push(this.data.length);
      },
      // renderFunc(h, option) {
      //   return (<span > {option.type}-{option.key}-{option.label}</span>);
      // },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // addField() {
      //   var addField = this.viewModel.ListReportFields.filter((el) => {
      //     return el.Name == this.viewModel.Field;
      //   })[0];
      //   console.log(addField);
      //   var add = {
      //     "Caption": addField.Caption,
      //     "Name": addField.Name,
      //     "DataType": addField.FieldColumnType,
      //     "StorageType": addField.FieldStorageType,
      //   }
      //   if(addField.DataSource){
      //     add.DataSource = addField.DataSource
      //   }
      //   if(this.viewModel.Group == 'V'){
      //     add.SummaryType = "Count";
      //   }
      //   this.model.Description.Fields[this.viewModel.Group].push(add)
      //   this.viewModel.Field = undefined;

      //   this.model.Description.Fields.Table.push({
      //     Caption: addField.Caption,
      //     Name: addField.Name,
      //     Type: 'Field'
      //   });

      //   this.model.Description.Fields.Series.push({
      //     Caption: addField.Caption,
      //     Name: addField.Name,
      //     ReportType: 'Column',
      //     Enabled: false
      //   });
      // },

      // addField() {
      //   var ctrl = this;
      //   if (ctrl.viewModel.Field != '' && ctrl.viewModel.Field != null) {
      //     var selectedField = '';
      //     ctrl.viewModel.ListReportFields.forEach(function (field) {
      //       if (field.Name == ctrl.viewModel.Field) {
      //         selectedField = {
      //           Caption: field.Caption,
      //           Name: field.Name,
      //           DataType: field.FieldColumnType,
      //           StorageType: field.FieldStorageType
      //         };
      //         if(ctrl.viewModel.Group == 'V'){
      //           selectedField.SummaryType = "Count";
      //         }
      //         if (field.DataSource != undefined)
      //           selectedField.DataSource = field.DataSource;
      //       }
      //     });

      //     var exist = false;
      //     ctrl.model.Description.Fields[ctrl.viewModel.Group].forEach(function (field) {
      //       if (field.Name == selectedField.Name)
      //         exist = true;
      //     });

      //     if (!exist) {
      //       if(!ctrl['List' + ctrl.viewModel.Group + 'Fields']) {
      //         ctrl['List' + ctrl.viewModel.Group + 'Fields'] = [];
      //       }
      //       ctrl['List' + ctrl.viewModel.Group + 'Fields'].push({
      //         label: selectedField.Caption,
      //         value: selectedField.Name
      //       });
      //       ctrl.model.Description.Fields[ctrl.viewModel.Group].push(selectedField);

      //       if (ctrl.viewModel.Group == 'V')
      //         ctrl.insertValueField(selectedField);
      //       ctrl.insertOrderField(selectedField);
      //     }
      //     else
      //       ctrl.$Utils.showMessage('error', 'Trường dữ liệu đã được thêm vào');
      //   }
      //   else
      //     ctrl.$Utils.showMessage('error', 'Hãy chọn 1 trường dữ liệu');
      //   ctrl.viewModel.Field = '';
      // },

      // insertValueField(field) {
      //   var ctrl = this;
      //   ctrl.ListTableFields.push({label: field.Caption, value: field.Name, checked: true});
      //   ctrl.listSelectedButtons.push(field.Name);
      //   ctrl.model.Description.Fields.Table.push({
      //     Caption: field.Caption,
      //     Name: field.Name,
      //     Type: 'Field'
      //   });

      //   ctrl.model.Description.Fields.Series.push({
      //     Caption: field.Caption,
      //     Name: field.Name,
      //     ReportType: 'Column',
      //     Enabled: false
      //   });
      // },

      // bindField(communication, CurrentGroup) {
      //   var ctrl = this;
      //   if (communication.item.Type == 'Calculator') {
      //     if (communication.action == 'edit') {
      //       // $.each(ctrl.model.Description.Fields.V, function (index, item) {
      //         // if (item.Name == communication.item.Name) {
      //           // ctrl.model.Description.Fields.V[index] = communication.item;
      //           ctrl.model.Description.Fields.V[communication.index] = communication.item;
      //           ctrl.$set(ctrl.model.Description.Fields.V, communication.index, communication.item)
      //           // ctrl.ListVFields.updateAt({
      //           //   label: communication.item.ReportCaption,
      //           //   value: communication.item.Name
      //           // }, index);
      //         // }
      //       // })
      //     }
      //     else {
      //       ctrl.model.Description.Fields.V.push(communication.item);
      //       ctrl.insertValueField(communication.item);
      //     }
      //   }
      //   else{
      //     ctrl.model.Description.Fields[CurrentGroup][communication.index] = communication.item;
      //     ctrl.$set(ctrl.model.Description.Fields[CurrentGroup], communication.index, communication.item)
      //   }
      // },

      // onDragEnd() {
      //   var ctrl = this;
      //   var listItem = [];
      //   $.each(ctrl.model.Description.Fields, function(key, value){
      //     if(key == "X" || key == "Y" || key == "V"){
      //       value.forEach(function(zValue){
      //         listItem.push(zValue)
      //       })
      //     }
      //   })
      //   ctrl.model.Description.Fields["X"] = []
      //   ctrl.model.Description.Fields["Y"] = []
      //   ctrl.model.Description.Fields["V"] = []
      //   listItem.forEach(function(item){
      //     ctrl.ListXFields.items.forEach(function(Xitem){
      //       if(Xitem.value == item.Name) {
      //         ctrl.model.Description.Fields["X"].push(item);
      //       }
      //     })
      //     ctrl.ListYFields.items.forEach(function(Yitem){
      //       if(Yitem.value == item.Name) {
      //         ctrl.model.Description.Fields["Y"].push(item);
      //       }
      //     })
      //     ctrl.ListVFields.items.forEach(function(Vitem){
      //       if(Vitem.value == item.Name) {
      //         ctrl.model.Description.Fields["V"].push(item);
      //       }
      //     })
      //   })
      // },
      // removeField(selectedIndex, CurrentGroup) {

      //   var ctrl = this;
      //   var selectedField = ctrl.$Lodash.cloneDeep(ctrl.model.Description.Fields[CurrentGroup][selectedIndex])
      //   ctrl.model.Description.Fields[CurrentGroup].splice(selectedIndex, 1);
      //   if (CurrentGroup == 'V') {
      //     ctrl.model.Description.Fields.Table.splice(selectedIndex, 1);
      //     ctrl.model.Description.Fields.Series.splice(selectedIndex, 1);
      //     //console.log(ctrl.viewModel.ListOrderFields)
      //     $.each(ctrl.viewModel.ListOrderFields, function (index, field) {
      //       if (field.Name == selectedField.Name)
      //         ctrl.viewModel.ListOrderFields.splice(index, 1);
      //     });
      //     $.each(ctrl.ListTableFields, function (index, field) {
      //       if (field.value == selectedField.Name)
      //         ctrl.ListTableFields.splice(index, 1);
      //     });
      //   }
      // },
      bindSavedData() {
        var ctrl = this;
        // ctrl.onDragEnd()
        var savedData = ctrl.$Lodash.cloneDeep(ctrl.model);
        savedData.Caption = savedData.Description.Caption;
        // ctrl.viewModel.ListDataGroups.forEach(function (dataGroup) {
        //   if (dataGroup.Code == ctrl.model.Name) {
        //     var refDataGroup = ctrl.$Lodash.cloneDeep(dataGroup);
        //     refDataGroup.Description = refDataGroup.Description;
            savedData.Name = savedData.Code;
        //     savedData.Description.DataGroupCaption = refDataGroup.Caption;
        //     savedData.Description.DataSource = refDataGroup.Description.DataSource;
        //     savedData.Description.AdditionConditions = refDataGroup.Description.AdditionConditions;
        //   }
        // });

        // var arrTypes = ['X', 'Y', 'V', 'T', 'Table'];
        // arrTypes.forEach(function (type) {
        //   $.each(ctrl.model.Description.Fields[type], function (orderIndex, orderField) {
        //     $.each(savedData.Description.Fields[type], function (index, field) {
        //       if (field.Name == orderField.value)
        //         savedData.Description.Fields[type].move(index, orderIndex);
        //     })
        //   });
        // })

        // savedData.Description.Fields.Calculators = [];
        // $.each(savedData.Description.Fields.V, function (index, item) {
        //   if (item.Type == 'Calculator')
        //     savedData.Description.Fields.Calculators.push(item);
        // })

        // var refVFields = ctrl.$Lodash.cloneDeep(savedData.Description.Fields.V);
        // savedData.Description.Fields.Calculators.forEach(function (calculator) {
        //   $.each(savedData.Description.Fields.V, function (index, vField) {
        //     if (vField && calculator.Name == vField.Name)
        //       savedData.Description.Fields.V.splice(index, 1);
        //   });
        // })

        // ctrl.model.Description.RequestTemplate = JSON.parse(ctrl.model.Description.RequestTemplate)
        savedData.Value = [
          {Name: 'Fields', Code: 'Fields', Description: ''},
          {Name: 'Table', Code: 'Table', Description: (savedData.Description.DataSource == 'AG_Task_Target' ? 'AG_Task_Task' : savedData.Description.DataSource)}
        ]
        // var numbT = 0
        // valueReport.forEach(function (item) {
        //   if(item.Code.indexOf('T') !== -1 && item.Code!='Table') {
        //     savedData.Value.push(item)
        //     numbT ++;
        //   }
        // }) 

        // arrTypes = ['X', 'Y', 'V', 'T'];
        // arrTypes.forEach(function (type) {
        //   savedData.Value[0].Description += type + '=' + savedData.Description.Fields[type].length + '&';
        //   $.each(savedData.Description.Fields[type], function (index, item) {
        //     var objField = {Name: item.Name, Code: type + (index + 1)};
        //     if (type == 'T')
        //       objField.Description = item.Description;
        //     else {
        //       var objDescription = {
        //         DataType: item.DataType,
        //         StorageType: item.StorageType,
        //         DatePart: item.DatePart,
        //         FormatValue: item.FormatValue,
        //         DataSource: item.DataSource,
        //         SummaryType: item.SummaryType ? item.SummaryType : 'Count',
        //         ReportCaption: item.ReportCaption ? item.ReportCaption : item.Caption
        //       };
        //       if(item.ParentColumn && item.ParentColumn!=""){
        //         objDescription.ParentColumn = item.ParentColumn;
        //       }
        //       if(item.Percentage && item.Percentage != '') {
        //         objDescription.Percentage = item.Percentage;
        //       } 
        //       if(item.Color && item.Color != '') {
        //         objDescription.Color = item.Color;
        //       } 
        //       if (ctrl.$Utils.isEmpty(savedData.Description.OrderBy) && item.Name == savedData.Description.OrderBy) {
        //         objDescription.OrderDirection = savedData.Description.OrderDirection;
        //         if (ctrl.$Utils.isEmpty(savedData.Description.Top))
        //           objDescription.Top = savedData.Description.Top;
        //       }
        //       objField.Description = ctrl.$Utils.objectToString(objDescription);
        //     }
        //     savedData.Value.push(objField);
        //   });
        // });
       
        // savedData.PathById = this.model.PathById;
        // if(this.model.Description.EnableRawSQL){
        //   savedData.PathByName = 'true';
        // } else {
        //   savedData.PathByName = 'false';
        // }
        // savedData.Description.Fields.V = refVFields;
        // var checkedItems = ctrl.ListTableFields;
        // savedData.Description.Fields.Table.forEach((field) => {
        //   field.Display = false;
        //   checkedItems.forEach(function (item) {
        //     if (item.value == field.Name && item.checked === true)
        //       field.Display = true;
        //     else if (item.value == field.Name && item.checked === false)
        //       field.Display = false;

        //   })
        // })

        $.each(savedData.Description, function (key, value) {
          if (value == true & !ctrl.$isNumeric(savedData.Description[key]))
            savedData.Description[key] = 'true';
          if (value == false && value != '')
            savedData.Description[key] = 'false';
        });
        savedData.Description.ModuleType = 'Report';
        savedData.RequestTemplate = 'SettingNew.Update';
        savedData.Description = JSON.stringify(savedData.Description);
        // savedData.Value = JSON.stringify(savedData.Value);
        return savedData;
      },

      save() {
        var ctrl = this;
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            if (ctrl.model.Description.IsT) {
              ctrl.$Utils.showConfirm('Thông báo', 'Biểu đồ bạn đang chỉnh sửa có cấu hình nâng cao, xin vui lòng liên hệ với quản trị viên để sửa trực tiếp trong cấu hình.');
              return false;
            }
            var savedData = ctrl.bindSavedData();
            var action = 'edit';
            var request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
            request = ctrl.$Utils.updateParamsSingleRequest(request, savedData);
            ctrl.$Utils.postCheckResult(request).then(function (data) {
              if (data.success)
                ctrl.$Utils.showMessage('success', ctrl.$toastMessage.updateItemPre + ctrl.$toastMessage.updateItemSuf);
              else
                ctrl.$Utils.showMessage('error', ctrl.$toastMessage.updateItemFailed);
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        })
      },

      // handleChange(){},
      onClick(){}
    }
  };
</script>
<style lang="scss" >
  .report-form{
    .container {
      height: 300px;
      background: #fff;
      border: 1px solid #c2cfd6;
    }

    .el-collapse-item__wrap {
      background-color: none !important;
    }

    .bButton {
      height:75px
    }
    .el-form-item {
      margin-bottom: 2px;


    }
    .el-cascader--mini {
      width: 100%;
    }
    .el-select{
      width: 100%;
    }
    .el-form-item--mini {
      .el-form-item__label {
        line-height: 16px;
        padding: 0px !important;
      }
    }
    .card {
      height: 300px;
    }

  }
</style>
