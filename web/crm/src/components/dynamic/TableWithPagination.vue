/**
* TableWithPagination Component
*
* Created by dbinh on 26/01/2018.
*/

<template>
  <div class="block">
    <template>
      {{this.$slots}}
    </template>
    <div>
      {{data.length}}
    </div>
    <el-pagination
      :layout="layout"
      @size-change="size-change"
      @current-change="current-change"
      :current-page="current-page"
      :page-size="page-size"
      :total="data.length"
    >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'TableWithPagination',
    props: {
      'current-change': [Function],
      'current-page': {},
      data: [Array, []],
      layout: {
        default: 'total, prev, pager, next'
      },
      'page-size': {},
      'size-change': [Function]
    },
    data () {
      return {}
    },
    methods: {},
    watch: {}
  }
</script>

<style lang="scss" scoped>

</style>
