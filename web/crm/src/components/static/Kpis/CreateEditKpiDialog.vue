/**
* CreateEditKpiDialog Component
*
* Created by dbinh on 27/03/2018.
*/

<script>
  export default {
    name: 'CreateEditKpiDialog',
    components: {},
    props: {
      onCreate: Function,
      onCancelCreate: Function,
      onEdit: Function,
      onCancelEdit: Function,
      type: {
        type: String,
        default:
          () => 'create',
        validator:
          (val) => ['edit', 'create'].indexOf(val) !== -1
      },
      kpi: {
        type: Object
      }
    },
    data () {
      var kpiCache = this.type === 'edit' && this.kpi ? {...this.kpi} : {};
      var form = this.$Lodash.cloneDeep(kpiCache);
      console.log('form', form)
      // form.Categories=form.Categories.

      return {
        kpiForm: form,
        kpiFormTemp: {},
        kpiCache: kpiCache,
        params : {
            targetObjs: [],
            levels: [],
            categories: [],
            indicators: [],
            units: [],
            cycle_times: [],
        },
        rules: {
          Type: [
            { required: true, message: 'Cấp độ bắt buộc có', trigger: 'blur' }
          ],
          Status: [
            { required: true, message: 'Đối tượng bắt buộc có', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      validateTaskForm: function (callback) {
        this.$refs['kpiForm'].validate((valid) => {
          if (valid) {
            callback && callback()
          } else {
            return false
          }
        })
      },
      handleCreateTask: function () {
        this.validateTaskForm(() => {
          this.kpiFormTemp = JSON.parse(JSON.stringify(this.kpiForm));
          var request = {
            RequestClass: 'xBase',
            RequestAction: 'Request',
            TotalRequests: 1,
            R1_RequestTemplate: "AG_Task_Task.Insert",
            R1_RequestDataGroup: 'DataGroup.kpi.03adg',
            R1_RequestFields: "Type;TypeName;Status;StatusName;Category;CategoryName;Categories;CategoriesName;" +
            "FeatureName;Manager;ManagerName;Planned;State;Priority;Milestone;MilestoneName;PlanStartDate;PlanFinishDate;Id;Code;Created;CreatedBy;;CreatedByName;Modified;ModifiedByName;",
            R1_Code:'KPI',
            R1_CreatedByName: JSON.parse(localStorage.getItem("LoggedOnUser")).Username,
            R1_ModifiedByName: JSON.parse(localStorage.getItem("LoggedOnUser")).Username,
          }
          $.each(this.kpiForm, (k,v)=>{
            if(this.$Utils.isEmpty(v) &&  v!=''){
              if(v.constructor === Object){
                request['R1_'+k] = v.value;
                request['R1_'+k+'Name'] = v.label;
              }else if(v.constructor === Array){
                var tmp ="";
                var tmpName ="";
                $.each(v, (index, value)=>{
                  tmp+=value.value+";";
                  tmpName+=value.label+";";
                })
                request['R1_'+k] = tmp;
                request['R1_'+k+'Name'] = tmpName;
              }else if(v.constructor === String){
                request['R1_'+k] = v;
              }
            }
          })
          request.R1_PlanStartDate= this.$Utils.formatDateTime(request.R1_PlanStartDate);
          request.R1_PlanFinishDate= this.$Utils.formatDateTime(request.R1_PlanFinishDate);
          this.$Utils.post(request).then(data => {
            console.log('data', data)
          });

          this.kpiForm = {}
          this.onCreate(this.kpiFormTemp)
        })
      },
      handleCancelCreate: function () {
        this.onCancelCreate()
      },
      handleEditTask: function () {
        this.validateTaskForm(() => {
          this.kpiFormTemp = JSON.parse(JSON.stringify(this.kpiForm));
          var request = {
            RequestClass: 'xBase',
            RequestAction: 'Request',
            TotalRequests: 1,
            R1_RequestTemplate: "AG_Task_Task.Update",
            R1_RequestDataGroup: 'DataGroup.kpi.03adg',
            R1_RequestFields: "Type;TypeName;Status;StatusName;Category;CategoryName;Categories;CategoriesName;" +
            "FeatureName;Manager;ManagerName;Planned;State;Priority;Milestone;MilestoneName;PlanStartDate;PlanFinishDate;Id;Code;Created;CreatedBy;;CreatedByName;Modified;ModifiedByName;",
            R1_Code:'KPI',
            R1_ModifiedByName: JSON.parse(localStorage.getItem("LoggedOnUser")).Username,
          }
          $.each(this.kpiForm, (k,v)=>{
            if(this.$Utils.isEmpty(v) &&  v!=''){
              if(v.constructor === Object){
                request['R1_'+k] = v.value;
                request['R1_'+k+'Name'] = v.label;
              }else if(v.constructor === Array){
                var tmp ="";
                var tmpName ="";
                $.each(v, (index, value)=>{
                  tmp+=value.value+";";
                  tmpName+=value.label+";";
                })
                request['R1_'+k] = tmp;
                request['R1_'+k+'Name'] = tmpName;
              }else if(v.constructor === String){
                request['R1_'+k] = v;
              }
            }
          })
          request.R1_PlanStartDate= this.$Utils.formatDateTime(request.R1_PlanStartDate);
          request.R1_PlanFinishDate= this.$Utils.formatDateTime(request.R1_PlanFinishDate);
          $.each(this.kpiCache, (k, v)=>{
            if(v == request['R1_'+k]){
              delete request['R1_'+k];
            }
            // else{
            //   // ghi lịch sử tại đây
            // }
          })
          this.$Utils.post(request).then(data => {
            console.log('data', data)
          });

          this.kpiForm = {}
          this.onCreate(this.kpiFormTemp)
        })
      },
      handleCancelEdit: function () {
        this.onCancelEdit()
      },
      getAllParameters(){
        var request = this.$Lodash.cloneDeep(this.$singleRequest);
        request.TotalRequests = 4;
        //params.levels
        request.R1_RequestTemplate = "Setting.SearchBase";
        request.R1_ParentCode = "xSetting.Project.Parameter.KPI.Level";
        //params.categories
        request.R2_RequestTemplate = "Setting.SearchBase";
        request.R2_ParentCode = "xSetting.Project.Parameter.KPI.Category";
        //params.units
        request.R3_RequestTemplate = "Setting.SearchBase";
        request.R3_ParentCode = "xSetting.Project.Parameter.KPI.Unit";
        //params.cycle_times
        request.R4_RequestTemplate = "Setting.SearchBase";
        request.R4_ParentCode = "xSetting.Project.Parameter.KPI.TimeType";
        //params.groups
        var requestGroup = {
          RequestAction: "SearchGroup",
          RequestClass: "BPM",
          RequestDataType: "json",
          ConditionFields: "Status;GroupType",
          Status: "1",
          GroupType: 1,
          StaticFields: "GroupId;GroupName;Description;GroupParent;GroupType;LeftIndex",
          // Order:'LeftIndex ASC'
        };
        //params.usser
        var requestUser = {
          RequestClass: "BPM",
          RequestAction: "SearchUsers",
          TotalRequests: 1,
          StaticFields: "UserId;Username;LoginName;Status",
          ConditionFields: "Status",
          Status: 1
        };
        this.$Utils.post(request).then(data => {
          this.params.levels = this.$Utils.getDataWithRoot(data.R1, "Data.DynamicDS.Setting").map(item => (
            {
              ...item,
              value: item.Code,
              label: item.Name
            }
          ))
          this.params.categories = this.$Utils.getDataWithRoot(data.R2, "Data.DynamicDS.Setting").map(item => (
            {
              ...item,
              value: item.Code,
              label: item.Name
            }
          ))
          this.params.units = this.$Utils.getDataWithRoot(data.R3, "Data.DynamicDS.Setting").map(item => (
            {
              ...item,
              value: item.Code,
              label: item.Name
            }
          ))
          this.params.cycle_times = this.$Utils.getDataWithRoot(data.R4, "Data.DynamicDS.Setting").map(item => (
            {
              ...item,
              value: item.Code,
              label: item.Name
            }
          ))
        });

        this.$Utils.post(requestGroup).then(data => {
          // console.log('data', data)
          this.params.groups = this.$Utils.getDataWithRoot(data, "UserDS.Group").map(item => (
            {
              ...item,
              value: item.GroupId,
              label: item.GroupName
            }
          ));
          this.params.targetObjs.push({
            label: 'Đơn vị',
            value: 'groups',
            options: this.params.groups
          })
        });
        this.$Utils.post(requestUser).then(response => {
          this.params.users = response.Data.UserDS.User.map(item => (
            {
              ...item,
              value: item.UserId,
              label: item.Username
            }
          ));
          this.params.targetObjs.push({
            label: 'Cá nhân',
            value: 'users',
            options: this.params.users
          })
        });
      }
    },
    created: function () {
      this.getAllParameters();
    },
    computed: {
    },
    watch: {}
  }
</script>

<style scoped>

</style>

<template>
  <div class="CreateEditKpiDialog__ROOT">
    <el-form :model="kpiForm" label-width="120px" ref="kpiForm" :rules="rules" :label-position="$isMobileDevice ? 'top' : 'right'">

      <el-form-item label="Cấp độ" prop="Type" value-key="value">
        <el-select v-model="kpiForm.Type" placeholder="Cấp độ">
          <el-option
            v-for="item in params.levels"
            :key="item.value"
            :label="item.label"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Đối tượng" prop="Status" value-key="value">
        <el-select v-model="kpiForm.Status" placeholder="Đối tượng">
          <el-option-group
            v-for="group in params.targetObjs"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>


      <el-form-item label="Chịu trách nhiệm" prop="Category" value-key="value">
        <el-select v-model="kpiForm.Category" placeholder="Chịu trách nhiệm" clearable>
          <el-option
            v-for="item in params.users"
            :key="item.value"
            :label="item.label"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Chịu trách nhiệm" prop="Categories" value-key="value">
        <el-select v-model="kpiForm.Categories" placeholder="Chịu trách nhiệm" clearable multiple>
          <el-option
            v-for="item in params.users"
            :key="item.value"
            :label="item.label"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Lựa chọn KPIs" prop="Feature" value-key="value">
        <el-select v-model="kpiForm.Feature" placeholder="Lựa chọn KPIs">
          <el-option
            v-for="item in params.categories"
            :key="item.value"
            :label="item.label"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Đơn vị tính" prop="Manager" value-key="value">
        <el-select v-model="kpiForm.Manager" placeholder="Đơn vị tính">
          <el-option
            v-for="item in params.units"
            :key="item.value"
            :label="item.label"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="KPIs kế hoạch" prop="Planned">
        <el-input
          v-model="kpiForm.Planned"
          placeholder="KPIs kế hoạch"
        ></el-input>
      </el-form-item>

      <el-form-item label="KPIs thực tế" prop="State">
        <el-input
          v-model="kpiForm.State"
          placeholder="KPIs thực tế"
        ></el-input>
      </el-form-item>

      <el-form-item label="Tỉ lệ đạt" prop="Priority">
        <el-input
          v-model="kpiForm.Priority"
          placeholder="Tỉ lệ đạt"
        ></el-input>
      </el-form-item>

      <el-form-item label="Loại thời gian" prop="Milestone" value-key="value">
        <el-select v-model="kpiForm.Milestone" placeholder="Loại thời gian">
          <el-option
            v-for="item in params.cycle_times"
            :key="item.value"
            :label="item.label"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Thời gian bắt đầu" prop="start_time">
        <el-date-picker
          v-model="kpiForm.PlanStartDate"
          type="date"
          format="dd/MM/yyyy"
          placeholder="Thời gian bắt đầu">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="Thời gian kết thúc" prop="end_time">
        <el-date-picker
          v-model="kpiForm.PlanFinishDate"
          type="date"
          format="dd/MM/yyyy"
          placeholder="Thời gian kết thúc">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <div class="group-button" v-if="type === 'create'">
          <el-button
            type="primary"
            @click="handleCreateTask"
          >
            Tạo mới
          </el-button>
          <el-button @click="handleCancelCreate">Hủy</el-button>
        </div>

        <div class="group-button tac" v-if="type === 'edit'">
          <el-button
            type="primary"
            @click="handleEditTask"
            v-if="type === 'edit'"
          >
            Cập nhật
          </el-button>
          <el-button @click="handleCancelEdit">Hủy</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
