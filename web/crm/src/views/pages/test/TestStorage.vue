/**
* TestStorage Component
*
* Created by dbinh on 07/03/2018.
*/

<script>
  import SaleProduct from './SaleProduct'

  export default {
    name: 'TestStorage',
    props: {},
    data () {
      return {
        activeName: 'first'
      }
    },
    components: {
      SaleProduct
    },
    methods: {},
    watch: {}
  }
</script>


<template>
    <div class="TestStorage col-lg-8 block-center pull-none">
      <el-tabs
        v-model="activeName"
        :tab-position="top"
        type="card"
      >
        <el-tab-pane label="Giữ hàng" name="first">
          <h2 class="tac pd10">Giữ hàng - 17000215</h2>
          <SaleProduct type="book"/>
        </el-tab-pane>
        <el-tab-pane label="Xuất bán" name="second">
          <h2 class="tac pd10">Xuất bán - 17000215</h2>
          <SaleProduct type="sell"/>
        </el-tab-pane>
        <el-tab-pane label="Xuất luân chuyển" name="third">
          <h2 class="tac pd10">Xuất luân chuyển - 17000215 - Online</h2>
          <SaleProduct type="exportTransfer"/>
        </el-tab-pane>
        <el-tab-pane label="Nhập luân chuyển" name="fourth">
          <h2 class="tac pd10">Nhập luân chuyển - 17000215 - Online</h2>
          <SaleProduct type="importTransfer"/>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<style scoped>
  .TestStorage {
    background: #fff;
  }
  .block-center {
    margin: 0 auto;
  }
  .pull-none {
    float: none;
  }
</style>
