/**
* ClassLayout Component
*
* Created by dbinh on 03/04/2018.
*/

<script>
  export default {
    name: 'ClassLayout',
    components: {},
    props: {},
    data () {
      return {}
    },
    methods: {
      mobileSidebarToggle (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-mobile-show')
      },
      toggleSearchContent (e) {
        e.preventDefault()
        console.log('call')
        document.getElementById('searchContent').classList.toggle('collapse')
      }
    },
    created: function () {
      document.addEventListener('click', function (e) {
        if (!e.target.classList.contains('navbar-toggler-icon')) {
          document.body.classList.remove('sidebar-mobile-show')
        }
      })
    },
    watch: {}
  }
</script>

<template>
  <div class="app ClassLayout__ROOT">
    <header class="app-header navbar">
      <button type="button" class="navbar-toggler mobile-sidebar-toggler d-lg-none" @click="mobileSidebarToggle">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a href="#/class" class="navbar-brand" target="_self"></a>

      <div class="navbar-nav navbar-search">
        <button class="navbar-toggler" type="button" @click="toggleSearchContent">
          <i class="icon-magnifier icons font-xl mgr10"></i>
        </button>
      </div>
    </header>
    <!-- Search -->
    <div class="collapse navbar-collapse" id="searchContent">
      <div class="flex search-content__wrapper">
        <button class="btn btn-o" style="" @click="toggleSearchContent">
          <i class="fa fa-arrow-left"></i>
        </button>
        <el-input
          placeholder="Tìm kiếm"
        ></el-input>
      </div>
    </div>

    <div class="app-body">
      <div class="sidebar">
        <nav class="sidebar-nav">
          <div class="sidebar-header">
            <div class="avatar">
              <img src="http://config.mn.com.vn/Download.ashx?Id=acf74877-24a2-4282-8b1c-2d4ccad714cf&Height=50&Width=50" alt="" class="img-avatar">
            </div>
            <span class="mgl10">Dinh Binh</span>
          </div>
          <ul class="nav">
            <li class="nav-item">
              <div><a href="#/class/" class="router-link-exact-active open active nav-link"><i class="fa fa-th-large" aria-hidden="true"></i> Các khóa học
                <span class="badge badge-primary">NEW</span></a></div>
            </li>
            <li class="nav-item">
              <div>
                <a href="#/class/my-course" class="nav-link">
                  <i class="fa fa-play-circle" aria-hidden="true"></i>
                  Khóa học của tôi
                </a>
              </div>
            </li>
            <li class="nav-item">
              <div>
                <a href="#/class" class="nav-link">
                  <i class="fa fa-history" aria-hidden="true"></i>
                  Lịch sử
                </a>
              </div>
            </li>
            <div class="line"></div>
            <div class="nav-setting">
              <li class="nav-item ">
                <a href="#/">Cài đặt</a>
              </li>
              <li class="nav-item">
                <a href="#/">Hỗ trợ</a>
              </li>
              <li class="nav-item">
                <a href="#/">Đăng xuất</a>
              </li>
              <li class="nav-item">
                <a href="#/class/login">Đăng nhập</a>
              </li>
              <li class="nav-item">
                <a href="#/class/register">Đăng ký</a>
              </li>
            </div>
          </ul>
        </nav>
      </div>
      <!-- MAIN -->
      <main class="main">
        <router-view :key="$route.fullPath"></router-view>
      </main>
    </div>
  </div>
</template>

<style lang="scss">
  .ClassLayout__ROOT {
    .app-body .sidebar {
      height: 100% !important;
      background: #fff;
      .nav-item, .nav-link {
        background: #fff;
        color: #333;
        font-size: 14px;
        a {
          color: #333;
        }
      }
      .line {
        width: 100%;
        border-bottom: solid 1px #eee;
        margin: 7px 0;
      }
    }
    #searchContent {
      top: 0;
      z-index: 9999;
      width: calc(100% - 10px);
      position: fixed;
      height: 50px;
      margin: 9px 5px;
      input[type="text"] {
        border-radius: 3px !important;
        height: 35px;
      }
      .search-content__wrapper {
        border: solid 1px #ddd;
        border-radius: 3px;
        overflow: hidden;
        .btn {
          background: #fff;
        }
        input {
          border: none;
        }
      }
    }
    .sidebar-header {
      background: #ff6161;
      color: #fff;
    }
    .nav-setting .nav-item {
      padding: 5px 15px;
    }
    .sidebar .nav-link:hover i {
      color: #333;
    }
  }
</style>
