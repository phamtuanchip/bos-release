/**
* CategoryCard Component
*
* Created by dbinh on 04/04/2018.
*/

<script>
  export default {
    name: 'CategoryCard',
    components: {},
    props: {
      category: {
        type: Object,
        required: true
      }
    },
    data () {
      return {}
    },
    methods: {},
    created: function () {},
    watch: {}
  }
</script>

<template>
    <div class="CategoryCard__ROOT">
        <router-link :to="`/class/category/${category.Id}`">
          <div class="category__item">
            {{category.Name}}
          </div>
        </router-link>
    </div>
</template>

<style lang="scss">
  .CategoryCard__ROOT {
    margin-right: 20px;
    .category__item {
      padding: 0 10px;
      height: 70px;
      background-image: url('https://prod-discovery.edx-cdn.org/media/course/image/7b3e45ca-d79b-48e3-9b78-4e91f4209e3b-510ed648e647.small.jpg'), linear-gradient(90deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8));
      display: flex;
      justify-content: center;
      align-items: center;
      font-size:  20px;
      font-weight: bold;
      color: #fff;
      border-radius: 3px;
      overflow: hidden;
    }
  }
</style>

