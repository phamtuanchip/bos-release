<template>
  <router-link tag="li" class="nav-item nav-dropdown" :to="mainUrl" disabled exact v-if="!url" :class="defaultOpenTree == 'true' ? 'open' : ''">
    <div class="nav-link nav-dropdown-toggle" @click="handleClick"><i :class="icon"></i> {{name}}</div>
    <ul class="nav-dropdown-items">
      <slot></slot>
    </ul>
  </router-link>
  <router-link tag="li" class="nav-item nav-dropdown" :to="mainUrl" :class="defaultOpenTree == 'true' ? 'open' : ''" exact v-else>
    <div class="nav-link nav-dropdown-toggle"><i :class="icon"></i> {{name}}</div>
    <div class="b-toggle nav-link nav-dropdown-toggle" @click="handleClick"></div>
    <ul class="nav-dropdown-items">
      <slot></slot>
    </ul>
  </router-link>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    children: {
      type: Array,
      default: []
    },
    defaultOpenTree: {
      type: String
    }
  },
  methods: {
    handleClick (e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    }
  },
  computed: {
    mainUrl () {
      let childFounded = this.children.reduce((prev, curr) => {
        if (curr.url === this.$route.fullPath) {
          prev.push(curr)
          return prev
        }
        if (curr.children) {
          prev = prev.concat(curr.children.filter(child => child.url === this.$route.fullPath))
          return prev
        }
        return prev
      }, [])[0]
      return childFounded ? childFounded.url : '#'
    }
  }
}
</script>
<style lang="scss">
  .b-toggle{
    position: absolute !important;
    top: 10px;
    right: 0px;
  }
</style>
