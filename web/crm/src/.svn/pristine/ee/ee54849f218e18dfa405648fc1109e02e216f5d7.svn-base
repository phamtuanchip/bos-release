<template>
  <div>
    <el-header v-if="itemSetting.ElementType === 'Header'">{{itemSetting.Caption}}</el-header>
    <label class="el-form--inline" v-else-if="itemSetting.ElementType === 'Label'" :placeholder="itemSetting.Caption"
           size="mini">{{mName}}</label>

    <el-input :clearable="clearable"
              v-else-if="itemSetting.ElementType === 'Text' && itemSetting.FieldColumnType !== 'DateTime'"
              v-model="mName" :placeholder="itemSetting.Caption" size="mini"
              :type="(itemSetting.FieldColumnType == 'Integer' || itemSetting.FieldColumnType == 'Double') ? 'number' : 'text'" :disabled="itemSetting.IsDisabled && $Utils.isEmpty(mName) && mName!='' && itemData.Id  && !$isSystemAdmin() && !$isMantisAdmin()"></el-input>
    <el-input :clearable="clearable"
              v-else-if="itemSetting.ElementType === 'TextArea'"
              v-model="mName" :placeholder="itemSetting.Caption" size="mini"
              :type="'textarea'"  :disabled="itemSetting.IsDisabled && $Utils.isEmpty(mName) && mName!='' && itemData.Id  && !$isSystemAdmin() && !$isMantisAdmin()"></el-input>
    <el-select :clearable="clearable" v-else-if="itemSetting.ElementType === 'Multi'" v-model="mName" multiple
               collapse-tags :placeholder="itemSetting.PlaceHolder ? itemSetting.PlaceHolder : itemSetting.Caption"
               size="mini" :filterable="!$isMobileDevice" :disabled="itemSetting.IsDisabled && $Utils.isEmpty(mName) && mName!='' && itemData.Id  && !$isSystemAdmin() && !$isMantisAdmin()">
      <el-option v-for="option in itemSetting.Data" :key="option[itemSetting.SavedKey]"
                 :label="option[itemSetting.SavedText]" :value="option[itemSetting.SavedKey]"></el-option>
    </el-select>
    <el-date-picker :clearable="clearable" v-model="mName" :format="dateTimeFormat"
                    v-else-if="itemSetting.FieldColumnType === 'DateTime' && itemSetting.DateMode === 'range'"
                    type="daterange"
                    :picker-options="dateOptions"
                    :popper-class="$isMobileDevice ? 'MobileDateRange': ''"
                    start-placeholder="Từ ngày"
                    end-placeholder="Đến ngày"
                    size="mini">
    </el-date-picker>

    <el-date-picker :clearable="clearable"
                    :format="itemSetting.Format? itemSetting.Format : (itemSetting.IncludeTime =='true') ? dateTimeFormat + ' HH:mm' : dateTimeFormat"
                    v-model="mName"
                    v-else-if="itemSetting.FieldColumnType === 'DateTime' && itemSetting.DateMode !== 'range'"
                    :type="itemSetting.IncludeTime =='true' ? 'datetime' : 'date'"
                    :start-placeholder="'Từ ' + itemSetting.Caption"
                    :end-placeholder="'Đến ' + itemSetting.Caption"
                    size="mini" @change="onChange()"  :disabled="itemSetting.IsDisabled && $Utils.isEmpty(mName) && mName!='' && itemData.Id  && !$isSystemAdmin() && !$isMantisAdmin()">
    </el-date-picker>
    <el-select :clearable="clearable" v-else-if="itemSetting.ElementType === 'Select'" v-model="mName"
               :placeholder="itemSetting.PlaceHolder ? itemSetting.PlaceHolder : itemSetting.Caption" size="mini"
               :disabled="itemSetting.IsDisabled && mName!='' && itemData.Id  && !$isSystemAdmin() && !$isMantisAdmin()" :filterable="!$isMobileDevice">
      <el-option v-for="option in itemSetting.Data" :key="option[itemSetting.SavedKey]"
                 :label="option[itemSetting.SavedText]" :value="option[itemSetting.SavedKey]"></el-option>
    </el-select>
    <SelectTree :clearable="clearable" v-else-if="itemSetting.ElementType === 'MultiTree'" :pSetting="itemSetting"
                :datasource="itemSetting.treeData" :selectedValue="mName" :callback="handleChange" :data="itemData"
                :source="itemSetting.sourceData"/>
    <!-- <el-cascader v-else-if="itemSetting.ElementType === 'MultiTree' && itemSetting.Data" expand-trigger="hover" :options="itemSetting.Data" filterable v-model="mName" @change="handleChange">
     itemSetting.ExtraSetting ? JSON.parse(itemSetting.ExtraSetting)['focus'] :
     </el-cascader> -->

    <el-autocomplete auto-complete="on"
                     v-else-if="itemSetting.ElementType === 'Autocomplete'"
                     v-model="mName"
                     :fetch-suggestions="customerSearchAsync"
                     placeholder="Nhập từ khóa tìm kiếm"
                     :trigger-on-focus="(itemSetting.ExtraSetting && $Utils.stringToObject(itemSetting.ExtraSetting)['focus']) ? $Utils.stringToObject(itemSetting.ExtraSetting)['focus'] ==='true' : false"
                       :disabled="itemSetting.IsDisabled && !$isSystemAdmin() && !$isMantisAdmin()"

    >
      <i
        class="fa fa-search"
        slot="suffix"
       >
      </i>
      <template slot-scope="props">
        <el-tooltip class="item" effect="light" placement="left">
          <div slot="content" v-html="props.item.content"></div>
          <span class="label">{{ props.item.label }}</span>
        </el-tooltip>
      </template>
    </el-autocomplete>

    <froala v-else-if="itemSetting.ElementType === 'Html'" :tag="'textarea'" :config="configEditor"
            v-model="mName"></froala>
  </div>
</template>
<script>
  import Vue from 'vue'
  import SelectTree from '@/components/dynamic/SelectTree'
  import utilsLibrary from '@/services/utils'

  Vue.use(require('vue-moment'))
  export default {
    components: {SelectTree},
    props: ['name', 'item', 'data', 'callback', 'formData', 'rules'],
    data () {
      var firstDayOfWeekCfg = this.$getItemLocalStorage('firstDayOfWeekCfg') ? parseInt(JSON.parse(this.$getItemLocalStorage('firstDayOfWeekCfg')).Value) : 1
      return {
        firstDayOfWeekCfg: firstDayOfWeekCfg,
        dateTimeFormat: 'dd/MM/yyyy',
        sourceData: [],
        itemSetting: this.item,
        setting: {},
        dependency: {},
        itemData: this.data,
        mName: '',
        configEditor: this.$froOptions,
        clearable: true,
        eRules: {},
        dateOptions: {
          firstDayOfWeek: firstDayOfWeekCfg,
          shortcuts: [
            {
              text: 'Hôm trước',
              onClick (picker) {
                var now = new Date()
                var end = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + (now.getDate() - 1) + ' 23:59:59')
                var start = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + (now.getDate() - 1) + ' 00:00:00')

                picker.$emit('pick', [start, end])
              }
            }, {
              text: 'Hôm nay',
              onClick (picker) {
                var now = new Date()
                var start = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' 00:00:00')
                var end = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' 23:59:59')

                picker.$emit('pick', [start, end])
              }
            }, {
              text: 'Hôm sau',
              onClick (picker) {
                var now = new Date()
                var start = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + (now.getDate() + 1) + ' 00:00:00')
                var end = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + (now.getDate() + 1) + ' 23:59:59')

                picker.$emit('pick', [start, end])
              }
            }
            , {
              text: 'Tuần trước',
              onClick (picker) {
                var dateVal = new Date()
                dateVal.setTime(dateVal.getTime() - 3600 * 1000 * 24 * 7)
                var monday = Vue.moment(dateVal).isoWeekday(firstDayOfWeekCfg).startOf('isoweek')._d
                var sunday = Vue.moment(dateVal).isoWeekday(firstDayOfWeekCfg).endOf('isoweek')._d

                var start = new Date(monday.getFullYear() + '/' + (monday.getMonth() + 1) + '/' + monday.getDate() + ' 00:00:00')
                var end = new Date(sunday.getFullYear() + '/' + (sunday.getMonth() + 1) + '/' + sunday.getDate() + ' 23:59:59')

                picker.$emit('pick', [start, end])
              }
            }, {
              text: 'Tuần này',
              onClick (picker) {
                var dateVal = new Date()
                var monday = Vue.moment(dateVal).isoWeekday(firstDayOfWeekCfg).startOf('isoweek')._d
                var sunday = Vue.moment(dateVal).isoWeekday(firstDayOfWeekCfg).endOf('isoweek')._d

                var start = new Date(monday.getFullYear() + '/' + (monday.getMonth() + 1) + '/' + monday.getDate() + ' 00:00:00')
                var end = new Date(sunday.getFullYear() + '/' + (sunday.getMonth() + 1) + '/' + sunday.getDate() + ' 23:59:59')

                picker.$emit('pick', [start, end])
              }
            }, {
              text: 'Tuần sau',
              onClick (picker) {
                var dateVal = new Date()
                dateVal.setTime(dateVal.getTime() + 3600 * 1000 * 24 * 7)
                var monday = Vue.moment(dateVal).isoWeekday(firstDayOfWeekCfg).startOf('isoweek')._d
                var sunday = Vue.moment(dateVal).isoWeekday(firstDayOfWeekCfg).endOf('isoweek')._d

                var start = new Date(monday.getFullYear() + '/' + (monday.getMonth() + 1) + '/' + monday.getDate() + ' 00:00:00')
                var end = new Date(sunday.getFullYear() + '/' + (sunday.getMonth() + 1) + '/' + sunday.getDate() + ' 23:59:59')

                picker.$emit('pick', [start, end])
              }
            }, {
              text: 'Tháng trước',
              onClick (picker) {
                var dateVal = new Date()
                var pre = Vue.moment().subtract(1, 'months')._d
                var start = Vue.moment(pre).startOf('month')._d
                var end = Vue.moment(start).endOf('month')._d

                picker.$emit('pick', [start, end])
              }
            }, {
              text: 'Tháng này',
              onClick (picker) {
                var dateVal = new Date()
                var start = Vue.moment([dateVal.getFullYear(), dateVal.getMonth()])._d
                var end = Vue.moment(start).endOf('month')._d

                picker.$emit('pick', [start, end])
              }
            }, {
              text: 'Tháng sau',
              onClick (picker) {
                var dateVal = new Date()
                var next = Vue.moment().add(1, 'months')._d
                var start = Vue.moment(next).startOf('month')._d
                var end = Vue.moment(start).endOf('month')._d

                picker.$emit('pick', [start, end])
              }
            }]
        }
      }
    },
    created () {
      this.eRules = this.rules;
      if (this.itemSetting.FormValidate && this.itemSetting.FormValidate.indexOf('Key=notEmpty') > 0 && this.itemSetting.ParentType == 'Form') {
        this.clearable = false
      }
      setTimeout(function () {
        $('a:contains(\'Unlicensed copy of the Froala Editor\')').remove()
      }, 800)
      if (this.itemSetting.ElementType === 'Multi') {
        this.mName = []
        // console.log(this.itemSetting)
      }

      this.itemSetting.dependencyChange = this.dependencyChange
      this.itemSetting.dataToDefault = this.dataToDefault
      this.itemSetting.setVal = this.setVal
      this.itemSetting.clearData = this.clearData
      this.searchData()

    },
    watch: {
      mName: {
         handler (newVal) {
        if (this.itemSetting.ElementType === 'Select' || this.itemSetting.ElementType === 'Multi' || this.itemSetting.ElementType === 'Radio' || this.itemSetting.ElementType === 'Tree' || this.itemSetting.ElementType === 'MultiTree' || this.itemSetting.ElementType === 'Autocomplete' || this.itemSetting.DynamicText ) {
          this.selectedItemChange(newVal)
        }
        if (this.callback && this.itemSetting.ElementType === 'Label' && this.itemSetting.DynamicText) {
          this.callback({name: this.name, values: this.itemData[this.itemSetting.Name], model: this.itemSetting})
          this.callback({name: this.name, values: this.itemData[this.itemSetting.Name], model: this.itemSetting})
        }
        else if (this.callback) {
          this.callback({name: this.name, values: newVal, model: this.itemSetting})
        }
         }
         ,deep: true
      }
    },
    mounted () {
      this.$hub.$on('clear-input', () => {
        this.mName = []
      })
    },
    methods: {
      customerSearchAsync (queryString, cb) {
        var ctrl = this
        if (queryString && queryString.length > 4) {
          var codeField = this.itemSetting.Code.split('&').reduce((prev, curr) => {
            let temp = curr.split('=')
            prev[temp[0]] = temp[1]
            return prev
          }, {})
          var request = {
            RequestClass: 'xBase',
            RequestAction: 'Request',
            TotalRequests: 1,
            //R1_RequestRootData: this.itemSetting.DataRoot,
            R1_Code: codeField.Code,
            R1_Keyword: queryString,
            R1_RequestDataGroup: codeField.RequestDataGroup,
            R1_RequestTemplate: this.itemSetting.Request,
            R1_RequestFields: codeField.RequestFields,
            R1_StartIndex: 1,
            R1_EndIndex: 100
          }
          if(this.itemSetting.ExtraSetting) {
            var ext = this.$Utils.stringToObject(this.itemSetting.ExtraSetting);
            if(ext['limit'] && isNaN(ext['limit']))
            if(ext['limit'] == -1)
            delete request.R1_EndIndex
            else request.R1_EndIndex = ext['limit']
            if(ext.keyword == "true") {
              delete request.R1_Keyword;
              request["R1_" + this.itemSetting.SavedKey] = queryString;
              request.R1_StartIndex = 1;
              request.R1_EndIndex = 100;
            }
          }
          var result = undefined
          ctrl.itemSetting.Data = [];
          this.$Utils.post(request).then(data => {
            if (data.success) {
              result = this.$Utils.getDataWithRoot(data.R1, this.itemSetting.DataRoot)
              if (result) {

                ctrl.itemSetting.Data = this.$Lodash.cloneDeep(result);
                var links = result.map((v, k) => {
                  v.ori = this.$Lodash.cloneDeep(v);
                  v.label = this.itemSetting.SavedText.replace(/{{([^}]*)}}/g, function (match, $1) {
                    return v[$1] || ''
                  })
                  v.value = v[this.itemSetting.SavedKey]
                  //v.index = v.Id
                  v.content = this.itemSetting.DisplayText.replace(/{{([^}]*)}}/g, function (match, $1) {
                    return v[$1] || ''
                  })
                  /*
                  ctrl.formData.Fields.forEach(field => {
                    if (field.Caption && (!field.ListIsHidden || field.ListIsHidden !== "true")) {

                      if (v[field.Name] && field.FormElementType != 'Html') {
                        v.content += "<strong>" +field.Caption + ": </strong>" + ((field.DynamicText && v[field.DynamicText]) ? v[field.DynamicText] : v[field.Name])+" </br> "
                      }

                    }
                  })
                  */
                  return v;
                })
                cb && cb(links)
              }
            }
          })
        }
      },
      autocompleteSelected(newVal){
        this.selectedItemChange(newVal);
        if (this.callback) {
          this.callback({name: this.name, values: newVal.value, model: this.itemSetting})
        }
      },
      setUpInput (newObj) {
        var ctrl = this
        if (newObj) {
          ctrl.itemData = ctrl.$Lodash.cloneDeep(newObj)
        }
        switch (ctrl.itemSetting.FieldColumnType) {
          case 'DateTime':
            /** định dạng ngày tháng, dựa theo setting lấy theo giá trị tương ứng so với ngày tháng hiện tại */
            var format = ctrl.itemSetting.Format ? ctrl.itemSetting.Format : ('DD/MM/YYYY' + (ctrl.itemSetting.IncludeTime == 'true' ? ' HH:mm' : ''))
            if (utilsLibrary.isEmpty(ctrl.itemData, ctrl.itemSetting.Name)) {
              this.mName = utilsLibrary.formatDateTime(utilsLibrary.stringToDate(ctrl.itemData[ctrl.itemSetting.Name]), format)
            }
            break
          case 'Double':
            /** trường hợp số thực, làm tròn đến 2 ký tự sau dấu ',' */
            if (utilsLibrary.isEmpty(ctrl.itemData, ctrl.itemSetting.Name) && ctrl.itemData[ctrl.itemSetting.Name]) {
              this.mName = parseFloat(ctrl.itemData[ctrl.itemSetting.Name]).toFixed(2)
            } else if (!utilsLibrary.isEmpty(ctrl.itemData, ctrl.itemSetting.Name)) {
              this.mName = parseFloat(0).toFixed(2)
            } else {
              this.mName = parseFloat(ctrl.itemSetting.Default).toFixed(2)
            }
            break
          default:
            if (utilsLibrary.isEmpty(ctrl.itemData, ctrl.itemSetting.Name)) {
              this.mName = ctrl.$Lodash.cloneDeep(ctrl.itemData[ctrl.itemSetting.Name])
              if (utilsLibrary.isEmpty(ctrl.itemData[ctrl.itemSetting.Name + 'Name'])) {
                this.mName = ctrl.$Lodash.cloneDeep(ctrl.itemData[ctrl.itemSetting.Name + 'Name'])
              }
            } else if (ctrl.itemSetting.Default) {
              this.mName = ctrl.$Lodash.cloneDeep(ctrl.itemSetting.Default)
            }
            break
        }
      },
      selectedItemChange (inputData) {
        var object = {}
        if (this.$Utils.isEmpty(inputData)) {
          object = {
            name: this.itemSetting.Name,
            value: inputData,
          }
          if (this.itemSetting.Data && object.value) {
            object.ori = this.itemSetting.Data.filter(val => {
              return val[this.itemSetting.SavedKey] == inputData
            })[0]
          }
          if (this.$Utils.isEmpty(this.itemSetting, 'onChange'))
            this.itemSetting.onChange(object)
        } else {
          inputData = null
        }
      },
      onChange () {
        this.itemSetting.onChange({
          name: this.itemSetting.Name,
          value: this.mName
        })
      },
      handleChange (item) {
        this.mName = this.$Lodash.cloneDeep(item)
      },
      searchData (data) {
        var ctrl = this
        if (ctrl.itemSetting.ElementType === 'Select' || ctrl.itemSetting.ElementType === 'Multi' || ctrl.itemSetting.ElementType === 'Radio' || ctrl.itemSetting.ElementType === 'Tree' || ctrl.itemSetting.ElementType === 'MultiTree' || ctrl.itemSetting.ElementType === 'Autocomplete') {
          var sParms = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest)
          sParms.R1_RequestTemplate = ctrl.itemSetting.Request
          sParms = ctrl.$Utils.updateParamsSingleRequest(sParms, ctrl.$Utils.stringToObject(ctrl.itemSetting.Code))

          if (sParms.R1_ParentCode == 'xSetting.Project.Parameter.Organization.Category'
          // || sParms.R1_ParentCode=='xSetting.Project.Parameter.Organization.Target'
          ) {
            sParms.R1_Keyword = utilsLibrary.isEmpty(ctrl.itemData, 'Project') ? ctrl.itemData.Project : ctrl.$rootScope.loggedOnUser.Project.GroupId
          }

          sParms = ctrl.$Utils.updateParamsSingleRequest(sParms, ctrl.dependency)
          if (ctrl.itemSetting.AssignedField && ctrl.itemSetting.AssignedField != 'false') {
            sParms.R1_AssignedUser = ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.SessionId)
          }
          if (sParms.R1_ParentCode == 'xSetting.Project.Parameter.Organization.Target') {
            sParms.R2_RequestTemplate = ctrl.itemSetting.Request
            sParms.R2_ParentCode = 'xSetting.Project.Parameter.Organization.Target'
            sParms.TotalRequests = 2
          }
          if(ctrl.itemSetting.ElementType === 'Autocomplete'){
            if(ctrl.$Utils.isEmpty(ctrl.itemData, ctrl.itemSetting.Name)){
              if(this.itemSetting.OtherValue) {
                var ext = this.$Utils.stringToObject(this.itemSetting.OtherValue);
                if(ext.keyword == "false") {
                  sParms["R1_" + this.itemSetting.SavedKey] = ctrl.itemData[ctrl.itemSetting.Name];
                } else {
                  sParms.R1_Keyword = ctrl.itemData[ctrl.itemSetting.Name];
                  sParms.R1_StartIndex = 1;
                  sParms.R1_EndIndex = 100;
                }
              } else {
                sParms.R1_Keyword = ctrl.itemData[ctrl.itemSetting.Name];
                sParms.R1_StartIndex = 1;
                sParms.R1_EndIndex = 100;
              }
            } else {
              sParms.R1_StartIndex = 1;
              sParms.R1_EndIndex = 100;
            }
          }
          ctrl.$Utils.post(sParms).then((arrayData) => {
            //begin
             if(arrayData.success) {

            var flag = false;
            if(ctrl.dependency){
              $.each(ctrl.dependency, (k,v) =>{
                if(this.$Utils.isEmpty(k) && this.$Utils.isEmpty(v)){
                  flag = true;
                }
              })
            }
            // ctrl.dataSource = [];
            ctrl.itemSetting.Data = []
            if (sParms.TotalRequests == 2) {
              ctrl.itemSetting.sourceData = ctrl.$Utils.getDataWithRoot(arrayData.R2, ctrl.itemSetting.DataRoot ? ctrl.itemSetting.DataRoot : 'Data')
            }
            arrayData = ctrl.$Utils.getDataWithRoot(arrayData.R1, (ctrl.itemSetting.DataRoot ? ctrl.itemSetting.DataRoot : 'Data'))
            if (sParms.R1_RequestTemplate == 'User') {
              var arrData = ctrl.$Lodash.cloneDeep(arrayData)
              arrayData = []
              if(arrData)
              arrData.forEach((val) => {
                if (ctrl.$rootScope.loggedOnUser.LoginName !== 'superadmin') {
                  if (val.LoginName.indexOf('superadmin') === -1) {
                    arrayData.push(val)
                  }
                }
                else {
                  arrayData.push(val)
                }
                // if(val.LoginName != "superadmin" || ctrl.$rootScope.loggedOnUser.LoginName == "superadmin"){
                //   arrayData.push(val);
                // }
              })
            }
            if (ctrl.itemSetting.ElementType === 'MultiTree' || ctrl.itemSetting.ElementType === 'Multi') {
              // if(arrayData){
              ctrl.itemSetting.Data = arrayData
              if (ctrl.itemSetting.ElementType === 'MultiTree') {
                ctrl.itemSetting.treeData = ctrl.$Utils.createCustomTreeFromList(
                  ctrl.$Lodash.cloneDeep(arrayData),
                  'Id',
                  'ParentId',
                  'children',
                  {Name: 'label', Id: 'value'},
                  {}
                )
              }
              //  else {
              //   ctrl.itemSetting.Data = arrayData;
              // }
              if (ctrl.$Utils.isEmpty(ctrl.itemData, ctrl.itemSetting.Name)) {
                ctrl.mName = ctrl.$Lodash.cloneDeep(ctrl.itemData[ctrl.itemSetting.Name].split(';').filter((el) => {
                  return el && el != ''
                }))
              } else {
                if (ctrl.$Utils.isEmpty(ctrl.itemSetting, 'DefaultValue') && ctrl.itemSetting.DefaultValue != '') {
                  // if(ctrl.itemSetting.DefaultValue.indexOf('id=') != -1){
                  if (ctrl.itemSetting.DefaultValue == 'id={{UserId}}&text={{Username}}')
                    ctrl.itemSetting.DefaultValue = 'id={{UserId|UserInfo}}&text={{Username|UserInfo}}'
                  var objDf = ctrl.$Utils.stringToObject(ctrl.$Utils.expressionToString({}, ctrl.itemSetting.DefaultValue))
                  // var objDf = ctrl.$Utils.stringToObject(ctrl.itemSetting.DefaultValue);
                  ctrl.mName = ctrl.$Lodash.cloneDeep([objDf.id])
                  // } else {
                  //   ctrl.mName = [];
                  // }
                } else {
                  ctrl.mName = []
                  // console.log(ctrl.itemSetting)
                }

              }
              if (ctrl.itemSetting.ElementType === 'Multi') {
                var objVal = ctrl.$Lodash.cloneDeep(ctrl.mName)
                ctrl.mName = []
                $.each(objVal, (key, val) => {
                  var find = arrayData.filter((el) => {
                    return el && el != '' && el[ctrl.itemSetting.SavedKey] == val
                  })
                  if (find && find.length > -1)
                    ctrl.mName.push(val)
                })
              }
              // } else {
              //   ctrl.itemSetting.Data = {}
              // }
              ctrl.$forceUpdate()
            } else {
              if (ctrl.itemSetting.IsTree == 'true') {
                ctrl.formatDataSource(arrayData)
              } else {
                ctrl.itemSetting.Data = arrayData
              }
              if(flag === true && arrayData.length == 1){
                ctrl.mName = arrayData[0][ctrl.itemSetting.SavedKey];
              }
              if (ctrl.$Utils.isEmpty(ctrl.itemData, ctrl.itemSetting.Name)) {
                // var find = arrayData.filter((el) => {
                //   return el && el != '' && el[ctrl.itemSetting.SavedKey] == ctrl.itemData[ctrl.itemSetting.Name];
                // });
                // if(find && find.length > 0)
                ctrl.mName = ctrl.$Lodash.cloneDeep(ctrl.itemData[ctrl.itemSetting.Name])
              } else {
                if (ctrl.$Utils.isEmpty(ctrl.itemSetting, 'DefaultValue') && ctrl.itemSetting.DefaultValue != '') {
                  if (ctrl.itemSetting.DefaultValue.indexOf('id=') != -1) {
                    var objDf = ctrl.$Utils.stringToObject(ctrl.$Utils.expressionToString({}, ctrl.itemSetting.DefaultValue))
                    // var objDf = ctrl.$Utils.stringToObject(ctrl.itemSetting.DefaultValue);
                    ctrl.mName = ctrl.$Lodash.cloneDeep(objDf.id)
                  } else {
                    ctrl.mName = ctrl.$Lodash.cloneDeep(ctrl.itemSetting.DefaultValue)
                  }
                }

              }

              if (ctrl.itemSetting.IsTree == 'true' && (!ctrl.itemSetting.DataRoot || ctrl.itemSetting.DataRoot === 'Data')) {
                var listTree = [];
                ctrl.$Utils.createdListFromDataTree (arrayData, listTree)
                var find = listTree.filter((el) => {
                  return el && el != '' && el[ctrl.itemSetting.SavedKey] == ctrl.mName
                })
                // console.log(arrayData)
              } else {
                var find = arrayData.filter((el) => {
                  return el && el != '' && el[ctrl.itemSetting.SavedKey] == ctrl.mName
                })
              }
              if (!find || find.length == 0)
                ctrl.mName = ''
            }
            // if(ctrl.$Utils.isEmpty(ctrl.itemData, ctrl.itemSetting.Name)){
            //   ctrl.mName = ctrl.$Lodash.cloneDeep(ctrl.itemData[ctrl.itemSetting.Name])
            // }
            ctrl.$forceUpdate()
          }
          //end
          })
        } else {
          if (ctrl.$Utils.isEmpty(ctrl.itemData, ctrl.itemSetting.Name)) {
            if (ctrl.itemSetting.FieldColumnType === 'DateTime') {
              ctrl.mName = new Date(ctrl.$Lodash.cloneDeep(ctrl.itemData[ctrl.itemSetting.Name]))
            } else if (ctrl.itemSetting.ElementType === 'Html') {
              ctrl.mName = ctrl.$Utils.decodeHtmlEntities(ctrl.$Lodash.cloneDeep(ctrl.itemData[ctrl.itemSetting.Name]))
              // }
              // else if(ctrl.itemSetting.ElementType === 'MultiTree'){
              //   ctrl.mName = ctrl.itemData[ctrl.itemSetting.Name].split(';').filter((el) => {
              //     return el && el != '';
              //   });
            } else
              ctrl.mName = ctrl.$Lodash.cloneDeep(ctrl.itemData[ctrl.itemSetting.Name])
          } else {
            if (ctrl.$Utils.isEmpty(ctrl.itemSetting, 'DefaultValue') && ctrl.itemSetting.DefaultValue != '') {
              if (ctrl.itemSetting.FieldColumnType === 'DateTime') {
                var date = new Date()
                switch (ctrl.itemSetting.DefaultValue) {
                  case 'Now':
                    ctrl.mName = date
                    break
                  case "Today":
                    ctrl.mName = []
                    var s = new Date()
                    var e = new Date()
                    e.setHours(23, 59, 59)
                    s.setHours(0, 0, 0)
                    ctrl.mName[0] = s
                    ctrl.mName[1] = e
                    break
                  case 'Week':
                    ctrl.mName = []
                    var dateVal = new Date()
                    var s = Vue.moment(dateVal)
                      .isoWeekday(ctrl.firstDayOfWeekCfg)
                      .startOf('isoweek')._d
                    var e = Vue.moment(dateVal)
                      .isoWeekday(ctrl.firstDayOfWeekCfg)
                      .endOf('isoweek')._d
                    e.setHours(23, 59, 59)
                    s.setHours(0, 0, 0)
                    ctrl.mName[0] = s
                    ctrl.mName[1] = e
                    break
                  case 'Month':
                    ctrl.mName = []
                    var d = new Date(date.getFullYear(), date.getMonth() + 1, 0)
                    d.setHours(23, 59, 59)
                    ctrl.mName[0] = new Date(date.getFullYear(), date.getMonth(), 1)
                    ctrl.mName[1] = d
                    break
                  case 'Year':
                    ctrl.mName = []
                    var d = new Date(date.getFullYear(), 11, 31, 23, 59, 59)
                    ctrl.mName[0] = new Date(date.getFullYear(), 0)
                    ctrl.mName[1] = d
                    break
                  case 'TwoYear':
                    ctrl.mName = []
                    var d = new Date(date.getFullYear(), 11, 31, 23, 59, 59)
                    ctrl.mName[0] = new Date(date.getFullYear() - 1, 0)
                    ctrl.mName[1] = d
                    break
                  case 'LastWeek':
                    ctrl.mName = []
                    var diff = new Date().getDate() - new Date().getDay() + (new Date().getDay() == 0 ? -13 : 1) // adjust when day is sunday
                    var e = new Date() // adjust when day is sunday
                    e.setDate(new Date().getDate() - new Date().getDay() + (new Date().getDay() == 0 ? -13 : 1) + 6)
                    e.setHours(23, 59, 59)
                    var s = new Date()
                    s.setTime(new Date().setDate(diff))
                    s.setHours(0, 0, 0)
                    ctrl.mName[0] = s
                    ctrl.mName[1] = e
                    break
                  case 'LastMonth':
                    ctrl.mName = []
                    var d = new Date(date.getFullYear(), date.getMonth(), 0)
                    d.setHours(23, 59, 59)
                    ctrl.mName[0] = new Date(date.getFullYear(), date.getMonth() - 1, 1)
                    ctrl.mName[1] = d
                    break
                  case 'Dynamic':
                    ctrl.mName = []
                    /** trường hợp cần tính toán dựa trên biểu thức*/
                    if (ctrl.itemSetting.Expression) {
                      if (ctrl.itemSetting.Expression.indexOf('Start') >= 0) {
                        var d = new Date(date.getFullYear(), 11, 31, 23, 59, 59)
                        var objExpression = ctrl.$Utils.stringToObject(ctrl.itemSetting.Expression)
                        $.each(objExpression, function (key, value) {
                          ctrl.model['inputData' + key] = new Date(value)
                        })
                      }
                      if (ctrl.itemSetting.Expression.indexOf('PreDays') >= 0) {
                        var days = ctrl.itemSetting.Expression.split('=')
                        var d = new Date()
                        var e = Vue.moment().subtract(days[1], 'day')._d
                        d.setHours(23, 59, 59)
                        e.setHours(0, 0, 0)
                        ctrl.mName[0] = e
                        ctrl.mName[1] = d
                      }
                      // var arr = ctrl.itemSetting.Expression.split(' '), expression = '';
                      // angular.forEach(arr, function (str) {
                      //   switch (str.trim()) {
                      //     case 'Now':
                      //       expression += date.getTime();
                      //       break;
                      //     case 'Day':
                      //       expression += 1000 * 60 * 60 * 24;
                      //       break;
                      //     case 'Week':
                      //       expression += 1000 * 60 * 60 * 24 * 7;
                      //       break;
                      //     case 'Month':
                      //       expression += 1000 * 60 * 60 * 24 * 30;
                      //       break;
                      //     case 'Year':
                      //       expression += 1000 * 60 * 60 * 24 * 365;
                      //       break;
                      //     default:
                      //       expression += str;
                      //   }
                      // });
                    }
                    // ctrl.model.inputData = new Date(ctrl.$Utils.calculator(expression));
                    break
                  default:
                    ctrl.mName = ctrl.$Utils.stringToDate(ctrl.itemSetting.DefaultValue)
                    break
                }
              } else {
                ctrl.mName = ctrl.$Lodash.cloneDeep(ctrl.itemSetting.DefaultValue)
              }
            }
          }
        }
        // }
        if (ctrl.itemSetting.ElementType === 'Label') {
          ctrl.setUpInput()
        }

      },

      dataToDefault () {
        if (this.itemSetting.ElementType === 'MultiTree' || this.itemSetting.ElementType === 'Multi') {
          if (this.$Utils.isEmpty(this.itemSetting, 'DefaultValue') && this.itemSetting.DefaultValue != '') {
            if (this.itemSetting.DefaultValue.indexOf('id=') != -1) {
              if (this.itemSetting.DefaultValue == 'id={{UserId}}&text={{Username}}')
                this.itemSetting.DefaultValue = 'id={{UserId|UserInfo}}&text={{Username|UserInfo}}'
              var objDf = this.$Utils.stringToObject(this.$Utils.expressionToString({}, this.itemSetting.DefaultValue))
              // var objDf = this.$Utils.stringToObject(this.itemSetting.DefaultValue);
              this.mName = ctrl.$Lodash.cloneDeep([objDf.id])
            } else {
              this.mName = ctrl.$Lodash.cloneDeep([objDf.id])
              //   this.mName = [];
            }
          } else {
            this.mName = this.$Utils.expressionToString({}, this.itemSetting.DefaultValue)
          }

          // } else {
          //   this.itemSetting.Data = {}
          // }
          this.$forceUpdate()
        } else {
          if (this.$Utils.isEmpty(this.itemSetting, 'DefaultValue') && this.itemSetting.DefaultValue != '') {
            if (this.itemSetting.DefaultValue.indexOf('id=') != -1) {
              var objDf = this.$Utils.stringToObject(this.$Utils.expressionToString({}, this.itemSetting.DefaultValue))
              // var objDf = this.$Utils.stringToObject(this.itemSetting.DefaultValue);
              this.mName = ctrl.$Lodash.cloneDeep(objDf.id)
            } else {
              this.mName = this.$Utils.expressionToString({}, this.itemSetting.DefaultValue)
            }
          }

        }
      },

      setVal (newObj) {
        if (this.itemSetting.ElementType === 'MultiTree' || this.itemSetting.ElementType === 'Multi') {
          this.mName = []
          // if(this.$Utils.isEmpty(this.itemSetting, 'DefaultValue')  && this.itemSetting.DefaultValue!= ''){
          //   if(this.itemSetting.DefaultValue.indexOf('id=') != -1){
          //     if(this.itemSetting.DefaultValue == 'id={{UserId}}&text={{Username}}')
          //       this.itemSetting.DefaultValue = 'id={{UserId|UserInfo}}&text={{Username|UserInfo}}'
          //     var objDf = this.$Utils.stringToObject(this.$Utils.expressionToString({}, this.itemSetting.DefaultValue));
          //     // var objDf = this.$Utils.stringToObject(this.itemSetting.DefaultValue);
          //     this.mName = [objDf.id];
          //   } else {
          //     this.mName = this.$Utils.expressionToString({}, this.itemSetting.DefaultValue);
          //   //   this.mName = [];
          //   }
          // } else {
          //   this.mName = [];
          // }
          if (newObj[this.itemSetting.Name]) {
            this.mName = ctrl.$Lodash.cloneDeep([newObj[this.itemSetting.Name]])
          } else {
            this.searchData()
          }

          // } else {
          //   this.itemSetting.Data = {}
          // }
          this.$forceUpdate()
        } else if (this.itemSetting.ElementType === 'Label') {
          this.mName = ''
          if (newObj[this.itemSetting.Name]) {
            this.setUpInput(newObj)
          } else {
            this.searchData()
          }
        } else {
          // if(this.$Utils.isEmpty(this.itemSetting, 'DefaultValue')  && this.itemSetting.DefaultValue!= ''){
          //   if(this.itemSetting.DefaultValue.indexOf('id=') != -1){
          //     var objDf = this.$Utils.stringToObject(this.$Utils.expressionToString({}, this.itemSetting.DefaultValue));
          //     // var objDf = this.$Utils.stringToObject(this.itemSetting.DefaultValue);
          //     this.mName = objDf.id;
          //   } else {
          //     this.mName = this.$Utils.expressionToString({}, this.itemSetting.DefaultValue);
          //   }
          // }
          this.mName = ''
          if (newObj[this.itemSetting.Name]) {
            this.mName = this.$Lodash.cloneDeep(newObj[this.itemSetting.Name])
          } else {
            this.searchData()
          }

        }
      },

      clearData () {        
        if (this.itemSetting.ElementType === 'MultiTree' || this.itemSetting.ElementType === 'Multi') {
          this.mName = []
          this.$forceUpdate()
        } else {
          this.mName = ''
          this.$forceUpdate()
        }
      },

      formatDataSource (arrayData) {
        var ctrl = this
        arrayData = utilsLibrary.createdListFromDataTree(ctrl.$Lodash.cloneDeep(arrayData), [])
        var start = 1
        if (arrayData[0]) {
          start = arrayData[0].Level ? arrayData[0].Level : arrayData[0].level
        }
        arrayData.forEach(function (item) {
          if (item.Level) {
            item.level = item.Level
          }
          if (item.level < start) {
            start = item.level
          }
        })
        ctrl.itemSetting.Data = arrayData
        $.each(arrayData, function (key, data) {
          if (utilsLibrary.isEmpty(ctrl.itemSetting.Data[key], ctrl.itemSetting.SavedText))
            ctrl.itemSetting.Data[key][ctrl.itemSetting.SavedText] = ctrl.createdLevel(data[ctrl.itemSetting.SavedText], data.level, start)
        })
        ctrl.$forceUpdate()
      },

      createdLevel (text, level, start) {
        var str = ''
        if (!start) {
          start = 1
        }
        for (var i = start; i < level; i++) {
          str += '|-- '
        }
        return str + text
      },

      dependencyChange (dependencyObject, dependValue) {
        var ctrl = this;
        if (ctrl.itemSetting.ElementType === 'Select') {
          switch (dependencyObject.DependencyType) {
            case 'DynamicValue':
              /** reset current data, and replace with value in depend object*/
              if (!ctrl.$Utils.isEmpty(ctrl.itemData)
                || ctrl.itemData[dependValue.name] !== ctrl.$Utils.getDataWithRoot(dependValue.value, dependencyObject.SourceField)[0]) {
                ctrl.selectedItemChange()
              }
              if (dependencyObject.TargetKey == 'getGroup') {
                // var requestSearchLink = ctrl.$Lodash.cloneDeep(singleRequest)
                // requestSearchLink.RequestTemplate = 'Permission';
                // requestSearchLink.R1_Parent = ctrl.$Utils.getDataWithRoot(dependValue.value)[0];
                // requestSearchLink.R1_ChildTable = 'tblGroup';
                // requestSearchLink.R1_Code = 'View';
                // ctrl.$Utils.post(requestSearchLink).then(function (link) {
                //   link = ctrl.$Utils.getDataWithRoot(link, 'R1.Data.DataDS.Linked');
                //   ctrl.dependency.UserId = "";
                //   angular.forEach(link, function(value){
                var request = {
                  RequestAction: 'SearchUserWithGroups',
                  IncludedGroupManager: 'true',
                  RequestClass: 'BPM',
                  RequestDataType: 'json',
                  ConditionFields: 'IncludedGroupManager;Group;Status;LoginName',
                  StaticFields: 'UserId;Status;LoginName',
                  // Group: value.Child,
                  Group: ctrl.$Utils.getDataWithRoot(dependValue.value)[0],
                  Status: '1'
                }
                ctrl.$Utils.postCheckResult(request).then((data) => {
                  data = ctrl.$Utils.getDataWithRoot(data, 'Data.UserDS.User')
                  data.forEach((val) => {
                    if (val.UserId && val.UserId != '') {
                      ctrl.dependency.UserId += val.UserId + ';'
                    }
                  })
                })
                // })
                // })
              }
              else {
                if (dependencyObject.SourceKey == 'id') {
                  ctrl.dependency[dependencyObject.TargetKey] = ctrl.$Utils.getDataWithRoot(dependValue.value)[0]
                } else if(dependValue.ori) {
                  ctrl.dependency[dependencyObject.TargetKey] = ctrl.$Utils.getDataWithRoot(dependValue.ori[dependencyObject.SourceKey])[0]
                } else {

                }
              }
              ctrl.searchData()
              break
            case 'Validate':
              /** set current setting validate object with new value*/
              var exist = false
              dependencyObject.Validations.forEach((validateObject) => {
                var keys = validateObject.Value ? validateObject.Value.split(';') : []
                keys.forEach((strKey) => {
                  if (ctrl.$Utils.getDataWithRoot(dependValue.value)[0] == strKey) {
                    exist = true
                    ctrl.itemSetting.Validation = ctrl.$Utils.stringToObject(validateObject.Validate)
                  }
                })
              })
              if (!exist && typeof dependencyObject.ValidationDefault === 'string' && dependencyObject.ValidationDefault != '') {
                ctrl.itemSetting.Validation = ctrl.$Utils.stringToObject(dependencyObject.ValidationDefault)
              }
              break
            case 'ChangeDisplay':
              break
          }
        } else if (ctrl.itemSetting.ElementType === 'Text' || ctrl.itemSetting.ElementType === 'TextArea' || ctrl.itemSetting.ElementType === 'Autocomplete') {
          switch (dependencyObject.DependencyType) {
            case 'DynamicValue':
              /** trường hợp thay đổi dữ liệu, thay đổi giá trị hiện tại bằng giá trị tương ứng trong setting vào dependValue*/
              var value = ''
              switch (ctrl.itemSetting.FieldColumnType) {
                case 'DateTime':
                  /** nếu là ngày tháng thì format lại trước khi hiển thị*/
                  var format = 'DD/MM/YYYY'
                  if (ctrl.$Utils.isEmpty(ctrl.itemSetting.Format)) {
                    /** sử dụng format từ setting nếu có */
                    format = ctrl.itemSetting.Format
                  }
                  if(dependValue.ori)
                    value = dependValue.ori[dependencyObject.SourceKey]
                  else
                    value = dependValue.value[dependencyObject.SourceKey]
                  break
                default:
                  if(dependValue.ori)
                  value = dependValue.ori[dependencyObject.SourceKey]
                  else
                  value = dependValue.value[dependencyObject.SourceKey]
                  break
              }
              ctrl.mName = ctrl.$Lodash.cloneDeep(value)
              break
            case 'Validate':
              /** trường hợp thay đổi giá trị validate*/
              var exist = false
              dependencyObject.Validations.forEach((validateObject) => {
                var keys = validateObject.Value ? validateObject.Value.split(';') : []
                keys.forEach((strKey) => {
                  if (ctrl.$Utils.getDataWithRoot(dependValue.value)[0] == strKey) {
                    exist = true
                    ctrl.itemSetting.FormValidate = validateObject.Validate;
                    if(!ctrl.eRules[ctrl.itemSetting.Name])
                      ctrl.eRules[ctrl.itemSetting.Name] = [
                        {
                          type: ctrl.itemSetting.ElementType === "MultiTree" || ctrl.itemSetting.ElementType === "Multi" ? "array" : "string",
                          required: true,
                          message: 'Trường ' + ctrl.itemSetting.Caption + ' bắt buộc nhập',
                          trigger: "blur"
                        }
                      ];
                    else{
                      // ctrl.eRules[ctrl.itemSetting.Name].forEach((val) =>{
                      //   if(val.required == false){
                      //     val.required = true;
                      //   }
                      // })
                      ctrl.eRules[ctrl.itemSetting.Name].push([
                        {
                          type: ctrl.itemSetting.ElementType === "MultiTree" || ctrl.itemSetting.ElementType === "Multi" ? "array" : "string",
                          required: true,
                          message: 'Trường ' + ctrl.itemSetting.Caption + ' bắt buộc nhập',
                          trigger: "blur"
                        }
                      ]);
                    }
                    ctrl.$hub.$emit("changeValidate", ctrl.eRules);
                  }
                })
                if(exist == false && ctrl.eRules[ctrl.itemSetting.Name]){
                  // ctrl.eRules[ctrl.itemSetting.Name].forEach((val) =>{
                  //   if(val.required == true){
                  //     val.required = false;
                  //   }
                  // })
                  delete ctrl.eRules[ctrl.itemSetting.Name];
                  ctrl.$hub.$emit("changeValidate", ctrl.eRules);
                }
                // ctrl.$hub.$emit("changeValidate", ctrl.eRules);
              })
              if (!exist && typeof dependencyObject.ValidationDefault === 'string' && dependencyObject.ValidationDefault != '') {
                ctrl.itemSetting.FormValidate = dependencyObject.ValidationDefault
              }
              break
            case 'TimeSync':
              var value = ''
              /** nếu là ngày tháng thì format lại trước khi hiển thị*/
              value = ctrl.$Lodash.cloneDeep(dependValue.value)
              // value = value.substring(0, 10);
              // value = new Date(value);
              value = Vue.moment(value, 'YYYY-MM-DD HH:mm').toDate()
              // if(ctrl.$Utils.isEmpty(ctrl.mName) && ctrl.$Utils.formatDateTime(ctrl.$Utils.stringToDate(ctrl.mName), 'HH:mm:ss') == ctrl.$Utils.formatDateTime(ctrl.$Utils.stringToDate(dependValue.value), 'HH:mm:ss') && ctrl.$Utils.isEmpty(dependencyObject.Expression)){
              //     value.setHours(eval(ctrl.$Utils.formatDateTime(ctrl.$Utils.stringToDate(ctrl.mName), 'HH')) + dependencyObject.Expression, ctrl.$Utils.formatDateTime(ctrl.$Utils.stringToDate(ctrl.mName), 'mm'), ctrl.$Utils.formatDateTime(ctrl.$Utils.stringToDate(ctrl.mName), 'ss'));
              // } else
              if (ctrl.$Utils.isEmpty(ctrl.mName) && ctrl.mName != '') {
                value.setHours(ctrl.$Utils.formatDateTime(ctrl.$Utils.stringToDate(ctrl.mName), 'HH'), ctrl.$Utils.formatDateTime(ctrl.$Utils.stringToDate(ctrl.mName), 'mm'), ctrl.$Utils.formatDateTime(ctrl.$Utils.stringToDate(ctrl.mName), 'ss'))
              }
              ctrl.mName = ctrl.$Lodash.cloneDeep(value)
              break
            case 'ChangeDisplay':
              /** trường hợp thay đổi giá trị hiển thị*/
              break
          }
        } else if (ctrl.itemSetting.ElementType === 'Label') {
          if (!ctrl.staticData) {
            ctrl.staticData = ctrl.$Lodash.cloneDeep(ctrl.itemData)
          }
          switch (dependencyObject.DependencyType) {
            /** case change current data*/
            case 'DynamicValue':
              /** define itemData if it doesn't exist*/
              if (!ctrl.$Utils.isEmpty(ctrl.itemData)) {
                ctrl.itemData = {}
              }
              /** reset current data, and replace with value in depend object*/
              if (ctrl.itemData[dependValue.name] !== ctrl.$Utils.getDataWithRoot(dependValue.value)[0]) {
                ctrl.mName = ''
              }
              /**
               * kiểm tra trong setting có biểu thức toán học hay không, nếu có replace các giá trong biểu thức với giá trị cho trước
               *
               * kiểm tra giá trị của source có khác với giá tri trong itemData hay ko, nếu có mới thay đổi giá trị,
               * còn không thì bỏ qua
               */
              if ((ctrl.itemData[dependValue.name] != dependValue.value) || !dependValue.value || dependValue.ori || (dependValue.value && dependValue.value.ori)) {
                /**kiểm tra có biểu thức thì replace các giá trị vào biểu thức, nếu không, hiển thị giá trị của dependValue lên*/
                if (ctrl.$Utils.isEmpty(dependencyObject.Expression)) {
                  var expression = ctrl.$Utils.isEmpty(dependencyObject.Expression) ? ctrl.$Lodash.cloneDeep(dependencyObject.Expression) : '',
                    expressionString = ''
                  while (expression != '') {
                    if (expression.indexOf('{{') >= 0 && expression.indexOf('}}') > expression.indexOf('{{')) {
                      expressionString += expression.substr(0, expression.indexOf('{{'))
                      var key = expression.substr(expression.indexOf('{{') + 2, expression.indexOf('}}') - expression.indexOf('{{') - 2),
                        path = ''
                      /**
                       * chuyển các giá trị của biểu thức thành các giá trị và lưu vàoctrl.objData, object dùng để
                       * lưu các giá trị của các dependValue tương ứng với từng trường Source,
                       * sau đó sẽ replace các giá trị trongctrl.objData vào tên các trường tương ứng trong biểu thức
                       */
                      if (key.indexOf('.') > 0) {
                        /** cắt giá trị key và đường dẫn từ dấu . VD Customer.Id -> key = Customer, path = Id */
                        path = key.substring(key.indexOf('.') + 1, key.length).trim()
                        key = key.substring(0, key.indexOf('.')).trim()
                      }
                      /** replace các giá trị trong dependValue vàoctrl.objData, nếu chưa cóctrl.objData[key] thì khởi tạo rỗng*/
                      if (dependValue.name === key) {
                        if (path == '') {
                          ctrl.objData[key] = dependValue.value
                        } else {
                          if (ctrl.$Utils.isEmpty(dependValue, 'ori.' + path)) {
                            ctrl.objData[key] = ctrl.$Utils.getDataWithRoot(dependValue, 'ori.' + path)[0]
                          } else if (ctrl.$Utils.isEmpty(dependValue, 'value.' + path)) {
                            ctrl.objData[key] = ctrl.$Utils.getDataWithRoot(dependValue, 'value.' + path)[0]
                          }
                           else if (!ctrl.$Utils.isEmpty(ctrl.objData[key])) {
                            ctrl.objData[key] = ''
                          }
                        }
                      }
                      /** chuyển các giá trị thanh biểu thức tương ứng với FieldData của itemSetting*/
                      switch (ctrl.itemSetting.FieldColumnType) {
                        case 'String':
                          expressionString += ctrl.objData[key] ? ctrl.objData[key] : ''
                          break
                        case 'Integer':
                          expressionString += ctrl.objData[key] ? ctrl.objData[key] : 0
                          break
                        case 'Double':
                          expressionString += ctrl.objData[key] ? ctrl.objData[key] : 0
                          break
                        case 'DateTime':
                          break
                      }
                      expression = expression.substr(expression.indexOf('}}') + 2, expression.length)
                    } else {
                      expressionString += expression
                      expression = ''
                    }
                  }
                  /** kiểm tra nếu là dạng số thì hiển thị kết quả sau khi tính toán, nếu không thì hiển thị giá trị*/
                  if (ctrl.itemSetting.FieldColumnType == 'Integer' || ctrl.itemSetting.FieldColumnType == 'Double') {
                    ctrl.itemData[ctrl.itemSetting.Name] = ctrl.$Utils.calculator(expressionString)
                  } else {
                    ctrl.itemData[ctrl.itemSetting.Name] = expressionString
                  }
                } else if (ctrl.$Utils.isEmpty(dependValue, 'ori.' + dependencyObject.SourceKey)) {
                  ctrl.itemData[ctrl.itemSetting.Name] = ctrl.$Utils.getDataWithRoot(dependValue, 'ori.' + dependencyObject.SourceKey)[0]
                } else {
                  ctrl.itemData[ctrl.itemSetting.Name] = ctrl.$Utils.getDataWithRoot(dependValue, 'value.' + dependencyObject.SourceKey)[0]
                }
                // console.log(ctrl.$Lodash.cloneDeep(ctrl.itemData))
                ctrl.itemSetting.setVal(ctrl.itemData)
              } else if (ctrl.$Utils.isEmpty(ctrl.itemData, dependValue.name) && ctrl.itemData[dependValue.name] == dependValue.value.id) {
                ctrl.mName = ctrl.$Lodash.cloneDeep(ctrl.itemData[ctrl.itemSetting.Name])
              }
              break
          }
        } else if (ctrl.itemSetting.ElementType === 'MultiTree') {
          ctrl.dependency = {}
          switch (dependencyObject.DependencyType) {
            case 'DynamicValue':
              if (dependencyObject.TargetKey == 'getGroup') {
                // var requestSearchLink = angular.copy(singleRequest)
                // requestSearchLink.RequestTemplate = 'Permission';
                // requestSearchLink.R1_Parent = ctrl.$Utils.getDataWithRoot(dependValue.value)[0];
                // requestSearchLink.R1_ChildTable = 'tblGroup';
                // requestSearchLink.R1_Code = 'View';
                // ctrl.$Utils.post(requestSearchLink).then(function (link) {
                // link = ctrl.$Utils.getDataWithRoot(link, 'R1.Data.DataDS.Linked')[0];
                ctrl.dependency.Value = ctrl.$Utils.isEmpty(dependValue.value) ? ctrl.$Utils.getDataWithRoot(dependValue.value)[0] : ''
                // angular.forEach(link, function(value){
                //   ctrl.dependency.Value += value.Child + ";"
                // })
                ctrl.searchData()
                if (!ctrl.$Utils.isEmpty(ctrl.itemData)
                  || (ctrl.itemData[dependValue.name] !== ctrl.$Utils.getDataWithRoot(dependValue.value)[0]) || ctrl.mName.length == 0) {
                  ctrl.mName = []
                  ctrl.selectedItemChange()
                }
                // })
              } else if (!ctrl.$Utils.isEmpty(dependValue.value) && ctrl.$Utils.isEmpty(dependValue.ori)) {
                ctrl.dependency[dependencyObject.TargetKey] = ctrl.$Utils.getDataWithRoot(dependValue.ori)[0]
              } else {
                ctrl.dependency[dependencyObject.TargetKey] = ctrl.$Utils.getDataWithRoot(dependValue.value)[0]
              }
              ctrl.searchData()
              if (!ctrl.$Utils.isEmpty(ctrl.itemData)
                || (ctrl.itemData[dependValue.name] !== ctrl.$Utils.getDataWithRoot(dependValue.value)[0]) || ctrl.mName.length == 0) {
                ctrl.mName = []
                ctrl.selectedItemChange()
              }
              break
            case 'Validate':
              /** set current setting validate object with new value*/
              var exist = false
              dependencyObject.Validations.forEach((validateObject) => {
                var keys = validateObject.Value ? validateObject.Value.split(';') : []
                keys.forEach((strKey) => {
                  if (ctrl.$Utils.getDataWithRoot(dependValue.value)[0] == strKey) {
                    exist = true
                    ctrl.itemSetting.FormValidate = validateObject.Validate
                    ctrl.eRules[ctrl.itemSetting.Name].push(
                      {
                        type: ctrl.itemSetting.ElementType === "MultiTree" || ctrl.itemSetting.ElementType === "Multi" ? "array" : "string",
                        required: true,
                        message: 'Trường ' + ctrl.itemSetting.Caption + ' bắt buộc nhập',
                        trigger: "blur"
                      }
                    );
                    // console.log(ctrl.rules)
                  }
                })
              })
              if (!exist && typeof dependencyObject.ValidationDefault === 'string' && dependencyObject.ValidationDefault != '') {
                ctrl.itemSetting.FormValidate = dependencyObject.ValidationDefault
              }
              break
            case 'ChangeDisplay':
              break
          }
        }

        if(dependencyObject.DependencyType == 'ChangeDisplay') {
          // console.log(dependencyObject)
          // console.log(dependValue)
          if(ctrl.itemSetting.FormIsHidden != 'true') {
            if(dependencyObject.CompareValue.split(';').indexOf(dependValue.value) !== -1){
              ctrl.itemSetting.displayControl('hidden');
              ctrl.clearData()
            } else {
              ctrl.itemSetting.displayControl('show')
            }
          } else {
            if(dependencyObject.CompareValue.split(';').indexOf(dependValue.value) === -1){
              ctrl.itemSetting.displayControl('hidden')
              ctrl.clearData()
            } else {
              ctrl.itemSetting.displayControl('show')
            }
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped="true">

  .demo-input-label {
    display: inline-block;
  }
</style>
