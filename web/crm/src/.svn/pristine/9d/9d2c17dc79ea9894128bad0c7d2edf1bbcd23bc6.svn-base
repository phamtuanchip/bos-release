<template>
    <div >
    <el-form   :inline="true" >
             
              <el-form-item :label="item.label"  v-if="item.type != 'keyword'"  v-for="item in filters" :key="item.Id">
                 <el-date-picker v-if="item.type == 'daterange'" v-model="item.value" type="daterange" format='dd/MM/yyyy'></el-date-picker>
                  <el-select clearable v-if="item.type == 'select'" v-model="item.value" :placeholder="item.label">
                  <el-option v-for="option in item.data" :key="option.Id" :label="option.Name" :value="option.Id"></el-option>
                </el-select>
 
              </el-form-item>
             
            </el-form>
             <el-button @click="executeFilter">Lọc</el-button>
             </div>
</template>
<script>
export default {
    props: ['filters'],
  
    methods: {
        executeFilter(){
             
             this.$hub.$emit('filterUpdated', this.filters)
        }
    }
}
</script>
