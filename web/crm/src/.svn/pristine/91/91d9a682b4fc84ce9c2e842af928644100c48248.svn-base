<template>
 <div>
<el-row>
     <el-radio v-show="isSystemAdmin" @change="chooseSelect" size="mini" v-model="radio" label="1">Dự án</el-radio>
     <el-radio v-if="isSystemAdmin" @change="chooseSelect" size="mini" v-model="radio" label="4">Vai trò</el-radio>     
   </el-row>
   <ProjectTreeGrid v-if="this.radio == 1" :datasource="groups" :groupRole="groupRole" :group="groupP"  :title="title"/>
   <Parameter settingType="projectPermission" v-if="this.radio === '4'" class="mgt10"></Parameter>
</div>
</template>


<script> 
import ProjectTreeGrid from "@/components/static/ProjectTreeGrid";
import Parameter from '@/components/static/Parameter'
import index from "vue";
const projectRequestFields = "GroupId;CreatedByName;GroupParent;ModifiedByName;Permit;PermitName;Status;SubStatus;SubStatusName;Active;ActiveName;GroupName;Description;ProjectCode;Department;DepartmentName;GroupType;StartDate;FinishDate;"; 
                           //"GroupId;Tool;TypeName;GroupName;SubStatus;SubStatusName;StateName;PermitName;Progress;DepartmentName;PlanManHour;ActualManHour;FinishDate;PriorityName;ProductName;StartDate;Version;Code;CreatedBy;Department;GroupId;Manager;ModifiedBy;Priority;PriorityDescription;PriorityId;State;Status;Type;Permit;Description;Active;ActiveName;ProjectCode;Department;DepartmentName;GroupType;GroupRole;GroupParent;PlanStartDate;DeadLine;";
export default {
  components: { 
    Parameter, 
    ProjectTreeGrid },
  data() {
    return {
      radio: "1",
      isSystemAdmin: this.$isSystemAdmin(),
      isMantisAdmin: this.$isMantisAdmin(),
      groups: [],
      title: "dự án",
      groupt: [],
      groupType: "4",
      groupOri: [],
      groupP: [],
      groupRole: [],
      TreeGrid: [],
      parentgroups: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.init();
    this.$on("reload", data => {
      this.init();
    });
    this.$on("search", data => {
      this.init(data);
    });
  },
  methods: {
    chooseSelect() {
      // if (this.radio !== "3") {
      //   if (this.radio === "1") {
      //     this.title = "phòng ban";
      //     this.groupType = "1";
      //   } else if (this.radio === "2") {
      //     this.groupType = "0";
      //     this.title = "vai trò";
      //   }
      //   this.init();
      // } else {
      // }
    },
    init(data) {
      var ctrl = this;
      var request = this.$Lodash.cloneDeep(this.$singleRequest);
      request.R1_RequestTemplate = "tblGroup.Search";
      request.R1_RequestDataGroup = "DataGroup.quan-ly-du-an.053gf";
      request.R1_RequestFields = projectRequestFields;       
      request.R1_GroupType = this.groupType;      
      request.R1_GroupType += ';5'
     
      this.$Utils.post(request).then(
        response => {
          if (response.success) {
            var fullGroup = this.$Utils.getDataWithRoot(
              response.R1,
              "Data.UserDS.Group"
            ); 
            var groupRole = this.$Lodash.filter(fullGroup, ['GroupType', '5']);            
            var group = this.$Lodash.filter(fullGroup, ['GroupType', '4'])               
            group.forEach(val2 => {
              val2.GroupRole = [];
              groupRole.forEach(val => {
                if (val2.GroupId === val.GroupParent) {
                  val.Name = val.GroupName;
                  val2.GroupRole.push(val);             
                }
              });
            });       
           
                if (!data) {
                  group = group.map(v => {                   
                    v.text = v.GroupName;
                    return v;
                  })                  
                }
                this.groupP = group;
                if (!this.$Utils.isEmpty(group, "length")) {
                  group = [group];
                }
                if (data) {
                  group = group.filter(el=> {
                    return (
                      el.GroupName.toLowerCase().indexOf(data.toLowerCase()) !==
                      -1
                    );
                  });
                }
                this.groupOri = $.makeArray(
                  $.map(group,(val, i)=> {
                    if (!val) return {};
                    else
                      return val                      
                  })
                );
                this.groups = this.$Utils.createCustomTreeFromList(
                  this.groupOri,
                  "GroupId",
                  "GroupParent",
                  "children",
                  { Name: "GroupName", Id: "GroupId" },
                  { type: "group"}
                );
                this.parentgroups = this.$Lodash.cloneDeep(this.groups);

          }
        },
        function(error) {
           console.log(error)
        }
      );
    }
  }
};
</script>
