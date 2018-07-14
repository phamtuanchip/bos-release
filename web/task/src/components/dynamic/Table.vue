<template>
    <el-table
    :data="data"
    style="width: 100%">
    <el-table-column v-if="tableConfig.length > 0"
     type="index"
    ></el-table-column>
    <el-table-column v-for="item in tableConfig"  :key="item.Id" 
         :prop="item"
         :label="item"
     >
    </el-table-column>
    <!-- <el-table-column
      prop="date"
      label="Date"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="Address">
    </el-table-column> -->
  </el-table>
</template>
<script>
export default {
  props: ["data"],
  methods: {
    indexMethod(index) {
      return index;
    }
  },
  computed: {
    tableConfig() {
        return this.data[0] ? Object.keys(this.data[0]) : []
    //   return Object.keys(this.$Lodash
    //     .chain(this.data)
    //     .keyBy("Name")
    //     .value());
    }
  },
  created() {
    // this.$hub.$on('tabSelectd', tab =>{
    //     console.log(tab)
    // })
    // this.$hub.$on('nodeSelected', node =>{
    //      console.log(node)
    // })
    // this.$hub.$on('filterUpdated', filter =>{
    //      console.log(filter)
    // })
  }
};
</script>
