<template>
  <div class="block">
    <el-pagination
      :small="isMobile"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currPage"
      :page-size="pagesize"
      :page-sizes="pagesizes"
      :layout="layout"
      :total="totalPage">
    </el-pagination>
  </div>


</template>
<script>
  export default {
    props: ['totalPage', 'currentPage', 'pagesize' , 'callback', 'pagesizes', 'sizeChanged' ],

    methods: {
      handleSizeChange(val) {
        if(this.sizeChanged) this.sizeChanged(val)
      },
      handleCurrentChange(val) {
        if(this.callback) this.callback(val)
      }
    },
    data() {
      return {
        isMobile: this.$isMobileDevice,
        //layout: this.isMobile ? "total, prev, pager, next" : "total, prev, pager, next, jumper"
        layout: this.pagesizes ? "total, prev, pager, next, sizes" : "total, prev, pager, next",
        currPage: 1,
      };
    },
    mounted() {
      this.currPage = this.currentPage
    },
    created() {

    },
    watch: {

    }
  }
</script>

<style lang="scss">
  .el-pagination {
    float: right;
  }
</style>
