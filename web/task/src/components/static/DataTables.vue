<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Simple" name="first">
      <AdvancedDynamicList :cols="columns" :sourceData="source" ></AdvancedDynamicList>
    </el-tab-pane>
    <el-tab-pane label="Advanced" name="second">Config</el-tab-pane>
  </el-tabs>
</template>
<script>
  import AdvancedDynamicList from '@/components/dynamic/AdvancedDynamicList'
  import mockData from '@/temp'
  export default {
    components: {AdvancedDynamicList},
    data() {
      return {
        activeName: 'first',
         columns: [
        { title: 'User ID', field: 'Index', sortable: true },
        { title: 'Username', field: 'Name',  sortable: true },
        { title: 'Content', field: 'Content', sortable: true },

        ],
        //Id;Index;Name;Content
        source: []
      };
    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      searchData(query){
      return new Promise((resolve, reject) =>{
      //var result = {rows: [], total: 0}
      var taskRequest = {
          RequestClass: "xBase",
          RequestAction: "Request",
          TotalRequests: 1,
          R1_RequestTemplate: "AG_Task_Task.Search",
          R1_RequestDataGroup: "DataGroup.danh-sach-cong-viec.04b66",
          R1_RequestFields: "Id;Index;Name;Content",
          R1_StartIndex: 0,
          R1_EndIndex: query.limit,
          R1_RequestOrderFields:  query.sort + ' ' +  query.order,
        };
        this.$Utils.post(taskRequest).then(taskdata => {
          var taskList = this.$Utils.getDataWithRoot(
            taskdata,
            "R1.Data.TasksDS.Task"
          );
          resolve({rows: taskList, total: taskList.length});
        }),()=>{
          resolve({rows: [], total: 0})
        };

      }
    )
    }
    },
    mounted(){
      console.log(this.source)

    }
  };
</script>
