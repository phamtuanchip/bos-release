<template>
  <div>
    <code>query: {{ query }}</code>
    <datatable v-bind="$data" />
  </div>
</template>
<script>
import Vue from 'vue'
//import mockData from '@/temp'
import Datatable from 'vue2-datatable-component'
Vue.use(Datatable)

export default {
  props: ['cols'],
  data: () => ({
    columns: [],
    data: [],
    total: 0,
    query: {},
    source: []
  }),
  watch: {
    query: {
      handler (query) {
          console.log(query)
          this.searchData(query).then((response)=>{
            this.data = response.rows;
            this.total = response.total;
          });


       /*  this.source(query).then(({ rows, total }) => {
          this.data = rows
          this.total = total
        }) */
      },
      deep: true
    }
  },
  created(){
    this.columns = this.cols;
    //this.source = this.dataSource;
  },
  methods:{
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
  }
}
</script>
