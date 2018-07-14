<template>
     <div>
      <el-row>   
          <el-col :span="18">
         <div v-for="item in tabFilter" :key="item.Id">
    
         <el-input  v-if="item.type == 'text'"
            placeholder="Tìm kiếm"
            v-model="filterText">
         </el-input>
          <el-select @change="handleFilterChange" clearable v-if="item.type == 'select'" v-model="item.value" :placeholder="item.label">
                  <el-option v-for="option in item.data" :key="option.Id" :label="option.Name" :value="option.Id"></el-option>
                </el-select>

         
         </div>     
         </el-col>
         <el-col :span="6">
<i :class="isExpanded ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" @click="expand">{{ isExpanded ? 'Thu gọn' : 'Mở rộng' }}</i>
</el-col>
</el-row>
 
    <el-tree 
    ref="tree" 
    :default-expand-all="isExpanded"
    highlight-current 
    empty-text="Không có dữ liệu" 
    :expand-on-click-node="false"
    :data="myData" 
    :props="defaultProps" 
    :filter-node-method="filterNode"
    @node-click="handleNodeClick">
    </el-tree>
     </div>
     
</template>
<script>
export default {
  props: ["treeData", "tabFilter"],
  data() {
    return {
      isFilterSelect : false,  
      myData: this.treeData,
      isExpanded: false,  
      filterText: "",
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  watch: {
    filterText(val) {
      this.isFilterSelect = false  
      this.$refs.tree.filter(val);
    },
    // treeData(newVal) {
    //     this.myData = newVal;
    // }
  },

  methods: {
    expand(){
        this.isExpanded=!this.isExpanded;
         this.$refs.tree.$data.store.defaultExpandAll = this.isExpanded;
        //this.$refs.tree.$data.data = this.$Lodash.cloneDeep(this.treeData) //Object.assign({},this.treeData)
        this.myData = JSON.parse(JSON.stringify(this.treeData));
        //this.$set(this.$refs.tree,this.treeData);
         
         
    } , 
    filterNode(value, data) {
       // console.log('value', value)
       //console.log ('Value ',data.Value)
      if (!value) return true;
      if(this.isFilterSelect)
      return data.Value.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      else
      return data.label.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },
    
    handleFilterChange(item) {
        this.isFilterSelect = true
        this.$refs.tree.filter(item);
         //console.log(item)
    },
    handleNodeClick(item) {
        this.$hub.$emit('nodeSelected', item)
    }
  }
};
</script>
