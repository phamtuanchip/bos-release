<template>
 
    <el-row v-if="!$isMobileDevice">
    <el-col :span="!$isMobileDevice ? 6 :  24">
        <el-tabs type="card" @tab-click="handleClick"  >
                <el-tab-pane v-for="tab in myTabs" :label="tab.label">
                <Tree :filters="filter" :treeData="tab.children" :tabFilter ="tab.filters" />
                </el-tab-pane>
        </el-tabs>
    </el-col>
    <el-col :span="!$isMobileDevice? 18 : 24">
        <el-row>
             <el-col :span="24">
            <Form :filters="myFilter"  />
             </el-col>
        </el-row>
        <el-row>       
             <el-col :span="24"> 
        <!-- <Table :data="myTable" /> -->
        <DailyTable :id="'categoryTable'" :tblData="myTable" :isShowIndex="true" :checkReadUnread="true" :isHideSummary="true"/>
             </el-col>
        </el-row>
    </el-col>
    </el-row>
    <div v-else> 
         <el-row>
        <el-col :span="!$isMobileDevice ? 6 :  24">
        <el-tabs type="card" @tab-click="handleClick"  >
                <el-tab-pane v-for="tab in myTabs" :label="tab.label">
                <Tree :filters="filter" :treeData="tab.children" :tabFilter ="tab.filters" />
                </el-tab-pane>
        </el-tabs>
    </el-col>
    <el-col :span="!$isMobileDevice? 18 : 24">
        <el-row>
             <el-col :span="24">
            <Form :filters="myFilter" />
             </el-col>
        </el-row>
        <el-row>       
             <el-col :span="24"> 
        <!-- <Table :data="myTable" /> -->
        <DailyTable :id="'categoryTable'" :tblData="myTable" :isShowIndex="true" :checkReadUnread="true" :isHideSummary="true"/>
             </el-col>
        </el-row>
    </el-col>
    </el-row>
    </div>
</template>

<script>
import Tree from '@/components/dynamic/Tree'
import Form from '@/components/dynamic/Filter'
import Table from '@/components/dynamic/Table'
import DailyTable from "@/components/DailyTable";
export default {
      components: {
      Tree, Form, Table, DailyTable
    },
    props: ['tabs','filter', 'dataTable', 'request'],
    data(){
        return {
        selectedNode: [],
        isCollapse: false,
        myRequest: this.request,
        myFilter: this.filter,
        myTabs: this.tabs,
        myTable: this.dataTable
        }

    },
    watch:{
        tabs(newVal) {
            this.myTabs = newVal;
        },
        filter(newVal){
            this.myFilter = newVal;
        }
    },
    methods: {
        handleClick(tab, event) {
            this.$hub.$emit('tabSelectd',tab)
        },
        executeFiler(){
            let filter = this.myFilter;
             $.each(filter,(key, ele)=>{
                      
                      if(ele.type === 'keyword') {
                          if( this.selectedNode != "") {
                          this.myRequest['R1_'+ ele.name] = this.selectedNode.join(';') ;
                          this.myRequest['R2_'+ ele.name] = this.selectedNode.join(';') ;
                          } else {
                               delete this.myRequest['R1_'+ ele.name]
                               delete this.myRequest['R2_'+ ele.name]
                          }
                      } else if (ele.type === 'daterange') {
                          if(ele.value!= null && ele.value[0] != null && ele.value[1] != null) {
                          this.myRequest['R1_'+ ele.name + 'StartValue'] = this.$Utils.formatDateTime(ele.value[0])
                          this.myRequest['R1_'+ ele.name + 'EndValue']  = this.$Utils.formatDateTime(ele.value[1])
                          
                          this.myRequest['R2_'+ ele.name + 'StartValue'] = this.$Utils.formatDateTime(ele.value[0])
                          this.myRequest['R2_'+ ele.name + 'EndValue']  = this.$Utils.formatDateTime(ele.value[1])
                          } else {
                           delete this.myRequest['R1_'+ ele.name] ;  
                           delete this.myRequest['R2_'+ ele.name] ;
                          }                        
                      } else {
                        if(ele.value != "") {
                            this.myRequest['R1_'+ ele.name] =  ele.value;  
                            this.myRequest['R2_'+ ele.name] =  ele.value;
                        } else {
                            delete this.myRequest['R1_'+ ele.name]
                            delete this.myRequest['R2_'+ ele.name]
                        }
                      }
                 })
                 console.log(this.myRequest)
            this.$Utils.post(this.myRequest).then(response => {
                this.myTable = this.$Utils.getDataWithRoot(response.R1, "Data.TasksDS.Task")
                console.log(response)
            })
        }
    },
    created(){
        this.$hub.$on('tabSelectd', tab =>{
           // console.log(tab)
        })
        this.$hub.$on('nodeSelected', node =>{
            // console.log(node)
             this.selectedNode = [node.Id];
             this.executeFiler()

        })
        this.$hub.$on('filterUpdated', filter =>{ 
            this.myFilter = filter;              
            this.executeFiler();
        })
    }

}
</script>
