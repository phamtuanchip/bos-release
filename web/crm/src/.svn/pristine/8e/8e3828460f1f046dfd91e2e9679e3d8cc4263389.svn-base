/**
* RegisterMobile.vue Component
*
* Created by dbinh on 03/04/2018.
*/

<script>
  import api from '@/services/api'

  export default {
    name: 'RegisterMobile.vue',
    components: {},
    props: {},
    data () {
      return {
        form: {}
      }
    },
    methods: {
      signUp () {
        this.validateRegisterForm(() => {
          let {userName, password, email, base} = this.form
          this.requestSignUp(userName, password, email, base)
            .then(() => {
              this.$message({
                type: 'success',
                message: 'Tạo tài khoản thành công'
              })
              setTimeout(function () {
                window.location.href = '/#/login-mobile'
              }, 2000)
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: 'Lỗi khi tạo tài khoản'
              })
            })
        })
      },
      validateRegisterForm (callback) {
        this.$refs['registerForm'].validate((valid) => {
          if (valid) {
            callback && callback()
          }
        })
      },
      requestSignUp (loginName, password, email) {
        return api.User.signUp(loginName, loginName, password, email)
      },
      requestSignIn (loginName, password) {
        return new Promise((resolve, reject) => {
          this.$Utils.login()
        })
      }
    },
    created: function () {},
    watch: {}
  }
</script>

<template>
    <div class="RegisterMobile.vue__ROOT">
      <div class="app flex-row align-items-center login-page" @keyup.enter="signUp">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="card-group">
                <div class="card">
                  <div class="card-body">
                    <el-form :model="form" ref="registerForm">
                      <!-- <img src=""> -->
                      <h1>Đăng ký</h1>
                      <el-form-item
                        prop="username"
                      >
                        <div class="input-group mb-2">
                          <span class="input-group-addon"><i class="icon-user"></i></span>
                          <el-input type="text" class="form-control" placeholder="Tên đăng nhập" v-model="form.userName"></el-input>
                        </div>
                      </el-form-item>

                      <el-form-item
                        prop="email"
                        :rules="[
                          { required: true, message: 'Vui lòng nhập Email'},
                          { type: 'email', message: 'Nhập đúng định dạng Email', trigger: 'blur, change'}
                       ]">
                        <div class="input-group mb-2">
                          <span class="input-group-addon">
                            <i class="fa fa-envelope-o" aria-hidden="true"></i>
                          </span>
                          <el-input class="form-control" placeholder="Email" v-model="form.email"></el-input>
                        </div>
                      </el-form-item>

                      <el-form-item
                        prop="password"
                      >
                        <div class="input-group mb-2">
                          <span class="input-group-addon"><i class="icon-lock"></i></span>
                          <el-input type="password" class="form-control" placeholder="Mật khẩu" v-model="form.password"></el-input>
                        </div>
                      </el-form-item>

                      <el-form-item
                          prop="base"
                          :rules="[{ required: true, message: 'Vui lòng nhập địa chỉ trang'}]"
                      >
                        <div class="input-group">
                          <span class="input-group-addon"><i class="fa fa-globe"></i></span>
                          <el-input  class="form-control" placeholder="Địa chỉ trang chủ" v-model="form.base"></el-input>
                        </div>
                      </el-form-item>



                      <div class="row">
                        <div class="col-6">
                          <button  type="button" class="btn btn-primary px-4"  @click="signUp" >Đăng ký</button>
                        </div>
                        <div class="col-6 text-right">
                          <span>Đã có tài khoản? </span>
                          <button type="button" class="btn btn-link px-0">
                            <router-link to="/login-mobile">
                              Đăng nhập
                            </router-link>
                          </button>
                        </div>
                      </div>
                    </el-form>
                  </div>
                </div>
              </div>
              <div class="card-footer p-4"><div class="row"><div class="col-6"><button type="button" class="btn btn btn-facebook btn-secondary btn-block"><span>facebook</span></button></div> <div class="col-6"><button type="button" class="btn btn btn-google-plus btn-secondary btn-block"><span>Google</span></button></div></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
