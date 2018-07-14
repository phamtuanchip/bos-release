<template>
   
        <el-table  
         
          border
          :max-height="height"
          :data="tblData" empty-text="Không có dữ liệu"
          style="width: 100%; "
          height="250">
          <el-table-column
            prop="Index"
            label="Mã"
            width="65">
          </el-table-column>
          <el-table-column
            prop="Name"
            label="Tên công việc"
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="PlanManHour"
            label="Ước tính">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="Thao tác"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.row, listTaskToSend)"
                type="text"
                size="small">
                Xóa
              </el-button>
            </template>
          </el-table-column>
        </el-table>
                   
       
</template>

<script>
  
  export default {
    inject:[
     'statusColors',
     'priorityColors',
     'taskDone'
    ], 
    props : ['tblData', 'id', 'height', 'type'],
    data(){
      return {
       listTaskToSend : []
        
      }
    },
    methods: {
      deleteRow(data, rows) {
       rows.splice(data, 1);
      //this.listTaskToBuild.push(data);
       this.$hub.$emit('restore', data) 
      }
    },
    created(){
      this.listTaskToSend = this.tblData
      /*
      this.$hub.$on('update', (data)=> {
        console.log(this.type)
      })
      */
    }
  }
</script>
<style lang="scss" scoped>
  
</style>


 