/**
* ListFloatMobile Component
*
* Created by dbinh on 03/04/2018.
*/

<script>
  export default {
    name: 'ListFloatMobile',
    components: {},
    props: ['label'],
    data () {
      return {}
    },
    methods: {},
    created: function () {},
    watch: {}
  }
</script>


<template>
    <div class="ListFloatMobile__ROOT">
        <div class="list__label">
          {{label}}
        </div>
      <div class="list__list">
        <slot name="items"></slot>
      </div>
    </div>
</template>

<style lang="scss">
  .ListFloatMobile__ROOT {
    .list__label {
      font-size: 16px;
      color: #333;
      margin-top: 15px;
      margin-bottom: 10px;
    }
    ::-webkit-scrollbar {
      height: 0;
      width: 0;
    }
    .list__list {
      white-space: nowrap;
      overflow-y: scroll;
      > div {
        display: inline-block !important;
      }
    }
  }
</style>
