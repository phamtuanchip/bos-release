<template>
  <div v-if="isExternalLink">
    <router-link tag="a" :to="url" :class="classList" exact>
      <i :class="icon"></i> {{name}}
      <b-badge v-if="badge && badge.text" :variant="badge.variant">{{badge.text}}</b-badge>
    </router-link>
  </div>
  <div v-else>
    <router-link @click.native="clickHandler" tag="a" :to="url" :class="classList" exact>
      <i :class="icon"></i> {{name}}
      <b-badge v-if="badge && badge.text" :variant="badge.variant">{{badge.text}}</b-badge>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'sidebar-nav-link',
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
      badge: {
        type: Object,
        default: () => {}
      },
      variant: {
        type: String,
        default: ''
      }
    },
    computed: {
      classList () {
        return [
          'nav-link',
          this.linkVariant
        ]
      },
      linkVariant () {
        return this.variant ? `nav-link-${this.variant}` : ''
      },
      isExternalLink () {
        if (this.url.substring(0, 4) === 'http') {
          return true
        } else {
          return false
        }
      }
    },
    methods:{
      clickHandler(value){
        if(this.$isMobileDevice){
          document.body.classList.toggle("sidebar-mobile-show");
        }
      }
    }
  }
</script>
