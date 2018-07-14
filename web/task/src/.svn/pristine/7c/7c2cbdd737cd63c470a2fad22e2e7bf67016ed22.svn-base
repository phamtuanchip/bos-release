<template>
  <footer class="app-footer" v-if="!$isMobileDevice || ($isMobileDevice && $route.fullPath.indexOf('scrumboard') == -1 &&
        $route.fullPath.indexOf('timeline') == -1)">
    <div id="ToTop" v-on:click="backToTop()">
      <el-tooltip v-if="!$isMobileDevice" content="Trở lên trên" placement="top">
        <el-button size="small" icon="icon-arrow-up"></el-button>
      </el-tooltip>
        <el-button v-else size="small" icon="icon-arrow-up"></el-button>
    </div>
      <span v-html="VersionDetail"></span>

  </footer>
</template>
<script>
  import api from '../services/api'
export default {
  name: 'footer',
  data () {
    return {
      VersionDetail: null
    }
  },
  methods:{
    backToTop(){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    requestGetAppVersionDetail() {
      var appInfo = JSON.parse(localStorage.getItem("AppInfo"));
      appInfo.forEach(item => {
        if(item.Name === "VersionDetail"){
          this.VersionDetail = item.Description;
        }
      })
    }
  },
  created: function () {
    this.requestGetAppVersionDetail()
  }
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if(document.getElementById("ToTop")!=undefined){
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("ToTop").style.display = "block";
    } else {
      document.getElementById("ToTop").style.display = "none";
    }
  }
}
</script>
<style lang="scss">
 .app-footer {
   flex: 0;
 }
  #ToTop {
    display: none;
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 99;
    cursor: pointer;
    opacity: 0.8;
    :hover {
      background-color: gray;
    }
  }
</style>
