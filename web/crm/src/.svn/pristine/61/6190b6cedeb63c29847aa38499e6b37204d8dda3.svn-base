<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card-group">
            <div class="card p-4">
              <div class="card-body">
                <h1>Quên mật khẩu</h1>
                <p class="text-muted">Khôi phục mật khẩu</p>
                <div class="input-group">
                  <span class="input-group-addon"><i class="icon-user"></i></span>
                  <input type="text" class="form-control" placeholder="Tên đăng nhập" v-model="checkuser">
                </div>
                <div class="mb-2" style="color:red">{{ user_msg }}</div>

                <div class="input-group">
                  <span class="input-group-addon"><i class="icon-envelope"></i></span>
                  <input type="email" class="form-control" placeholder="Thư điện tử" v-model="checkemail">
                                 
                </div>
                
                   <div class="mb-2" style="color:red">{{ email_msg }}</div>    
                
                 <div class="input-group" v-if="$isMobileDevice" >
                  <span class="input-group-addon"><i class="fa fa-globe"></i></span>
                  <input type="text" class="form-control" placeholder="Địa chỉ trang chủ" v-model="baseUrl">
                </div>
                <div class="mb-2" style="color:red" v-if="$isMobileDevice" >{{ url_msg }}</div>
                <span style="color:red" v-show="warning" >Lỗi, vui lòng kiểm tra lại thông tin!</span>
                <span style="color:green" v-show="warning2" >Mật khẩu mới đã được gửi qua hòm thư của bạn!</span>
                <div class="row">
                  <div class="col-6">
                    <button type="button" class="btn btn-primary px-4" v-on:click="sendEmail()">Gửi</button>
                  </div>
                  <div class="col-6 text-right">
                    <button type="button" class="btn btn-link px-0"><router-link to="/login">Quay lại đăng nhập</router-link></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import router from "@/./router";

export default {
  data() {
    return {
      user: {
        Username: "",
        Password: "",
        Email: "",
        base: "",
        authenticated: false
      },
      params: {
        RequestClass: "BPM",
        RequestAction: "SignIn"
      },
      checkemail: "",
      email_msg: "",
      user_msg: "",
      url_msg: "",
      msg1: true,
      checkuser: "",
      base: "",
      baseUrl: "",
      warning: false,
      warning2: false
    };
  },
 
  methods: {
    valid_email(value) {     
      value = value.trim();
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.email_msg = "";
        return true;
      } else {
        this.email_msg = "Email không đúng định dạng";
        return false;
      }
    },
    check_user(value) {      
      value = value.trim();
      if (!value || value.trim() === "") {
        this.user_msg = "Tài khoản không được để trống";
        return false;
      } else if (value.indexOf(" ") >= 0) {
        this.user_msg = "Tài khoản không đúng định dạng";
        return false;
      }
      this.user_msg = "";
      return true;
    },
    check_url(value) {    
      value = value.trim();
      if (
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
          value
        )
      ) {
        this.url_msg = "";
        return true;
      } else {
        this.url_msg = "Địa chỉ trang không đúng định dạng";
        return false;
      }
    },
    showInfor(succecss) {
      console.log(succecss.constructor)
       this.warning2 = succecss;
       this.warning = !succecss;
    },
    sendEmail() {
     var valided = false ; 
     valided = (this.check_user(this.checkuser) &&  this.valid_email(this.checkemail));
     if(this.$isMobileDevice) valided =  this.check_url(this.baseUrl);
     if(valided) {
         var params = {
        RequestClass: "BPM",
        RequestAction: "RecoverPassword",
        Account: this.checkuser,
        Email: this.checkemail,
        Code: "Notification.email-thong-bao-quen-mat-khau.06b86"
      };
      this.warning = false;
      this.warning2 = false;
      if(this.$isMobileDevice) {  
          if (this.baseUrl.toLowerCase().indexOf("http") == -1) {
              this.base =  "http://" + this.baseUrl + "/xRequest.ashx";           
            } else {
              this.base =  this.baseUrl + "/xRequest.ashx";         
          }      
         this.$Utils.post(params, true, this.base).then(data => {
           this.showInfor(data.success);
         });
      } else {
        this.$Utils.post(params).then(data => {
          this.showInfor(data.success);
        });
      }
       
        
      }
    }
  },
  watch: {
    checkemail: function(value) {
      this.valid_email(value);
    },
    checkuser: function(value) {
      this.check_user(value);
    },
    baseUrl: function(value) {
      this.check_url(value);
    }
  },
  mounted() {
    // this.checkemail = this.user.Email;
    // this.checkuser = this.user.Username;
    // this.baseUrl = this.user.base;
  }
};
</script>
