<template>
  <div :class="'sidebar ' +  checkVersion()" class="sidebar">
    <SidebarHeader/>
    <SidebarForm/>
    <nav class="sidebar-nav">
      <div slot="header"></div>
      <ul class="nav">
        <template v-for="(item, index) in navItems">
          <template v-if="item.title">
            <SidebarNavTitle :name="item.name" :classes="item.class" :wrapper="item.wrapper"/>
          </template>
          <template v-else-if="item.divider">
            <li class="divider"></li>
          </template>
          <template v-else>
            <template v-if="item.children">
              <!-- First level dropdown -->
              <SidebarNavDropdown :name="item.name" :url="item.Description.PageLink == 'Empty' ? undefined : item.url" :icon="item.icon" :children="item.children" class="nav-dropdown-lv1" :defaultOpenTree="item.Description.DefaultOpenTree">
                <template v-for="(childL1, index) in item.children">
                  <template v-if="childL1.children">
                    <!-- Second level dropdown -->
                    <SidebarNavDropdown :name="childL1.name" :url="childL1.Description.PageLink == 'Empty' ? undefined : childL1.url" :icon="childL1.icon" :children="childL1.children" class="nav-dropdown-lv2" :defaultOpenTree="childL1.Description.DefaultOpenTree">
                      <li class="nav-item" v-for="(childL2, index) in childL1.children">
                        <SidebarNavLink :name="childL2.name" :url="childL2.Description.PageLink == 'Empty' ? undefined : childL2.url" :icon="childL2.icon" :badge="childL2.badge" :variant="item.variant"/>
                      </li>
                    </SidebarNavDropdown>
                  </template>
                  <template v-else>
                    <SidebarNavItem :classes="item.class">
                      <SidebarNavLink :name="childL1.name" :url="childL1.Description.PageLink == 'Empty' ? undefined : childL1.url" :icon="childL1.icon" :badge="childL1.badge" :variant="item.variant"/>
                    </SidebarNavItem>
                  </template>
                </template>
              </SidebarNavDropdown>
            </template>
            <template v-else>
              <SidebarNavItem :classes="item.class">
                <SidebarNavLink :name="item.name" :url="item.Description.PageLink == 'Empty' ? undefined : item.url" :icon="item.icon" :badge="item.badge" :variant="item.variant"/>
              </SidebarNavItem>
            </template>
          </template>
        </template>
      </ul>
      <slot></slot>
    </nav>
    <SidebarFooter/>
    <SidebarMinimizer/>
  </div>
</template>
<script>
import SidebarFooter from './SidebarFooter'
import SidebarForm from './SidebarForm'
import SidebarHeader from './SidebarHeader'
import SidebarMinimizer from './SidebarMinimizer'
import SidebarNavDropdown from './SidebarNavDropdown'
import SidebarNavLink from './SidebarNavLink'
import SidebarNavTitle from './SidebarNavTitle'
import SidebarNavItem from './SidebarNavItem'
export default {
  name: 'sidebar',
  props: {
    navItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  components: {
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarMinimizer,
    SidebarNavDropdown,
    SidebarNavLink,
    SidebarNavTitle,
    SidebarNavItem
  },
  data () {
    return {
      customStyle: ''
    }
  },
  methods: {
    checkVersion () {
      if (this.$isMobile.iOS() && this.$Utils.getIOSversion() && eval(this.$Utils.getIOSversion() < 11)) {
        return 'sidebar-old'
      }
    }
  },
  created () {
    var version = this.$Utils.getIOSversion()
    // if(version !=-1 && version < 11){
    //   this.customStyle = "height: none; !important"
    // }
  }
}
</script>

<style lang="scss">
  .nav-link {
    cursor:pointer;
  }
</style>

<style lang="scss">
  .sidebar {
    .nav-link {
      font-size: 15px;
      i {
        font-size: 1.2em;
      }
    }
    .nav-dropdown-lv1 {
      .nav-item {
        padding-left: 15px;
        .nav-link {
          padding-left: 15px;
        }
      }
    }
  }
</style>
