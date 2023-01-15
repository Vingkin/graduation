<template>
  <div>
    <div class="login-container">
      <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on"
               label-position="left">
        <h3 class="title">智慧系统</h3>
        <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
          <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="username"/>
        </el-form-item>
        <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
          <el-input
            :type="pwdType"
            v-model="loginForm.password"
            name="password"
            auto-complete="on"
            placeholder="password"
            @keyup.enter.native="handleLogin"/>
          <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
            登 录
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" @click="registerVisible = true">
            注 册
          </el-button>
        </el-form-item>
      </el-form>
    </div>


    <el-dialog title="注册" width="34%" :visible.sync="registerVisible">
      <div>
        <el-form :model="form" ref="form" label-width="80px" status-icon>
          <el-form-item
            label="用户名"
            :rules="[
          {required: true,message:'用户名不能为空', trigger: 'blur'},
          {pattern:/^[a-z0-9]{1,}$/,message:'用户名必须为小写字母及数字组合', trigger: 'blur'},
          {min:6,message:'用户名长度至少6位', trigger: 'blur'}
        ]"
            prop="username"
          >
            <el-input maxlength="16" placeholder="建议使用学号作为用户名" v-model="form.username" show-word-limit />
          </el-form-item>

          <el-form-item
            label="密码"
            :rules="[
          {required: true,message:'密码不能为空', trigger: 'blur'},
          {pattern:/^[a-z0-9`~!@#$%^&*()-_+=]{1,}$/,message:'密码必须由大小写字母、数字及特殊符号组合', trigger: 'blur'},
          {max:24,message:'密码长度须小于24位', trigger: 'blur'},
          {min:6,message:'密码长度至少6位', trigger: 'blur'}
        ]"
            prop="password"
          >
            <el-input type="password" v-model="form.password" maxlength="32" />
          </el-form-item>

          <el-form-item
            label="手机号"
            :rules="[
          {required:true,message:'手机号不能为空', trigger: 'blur'},
          {pattern:/^[0-9]{11}$/,message:'号码必须为11位数字', trigger: 'blur'}
        ]"
            prop="phone"
          >
            <el-input v-model="form.phone" maxlength="11" show-word-limit />
          </el-form-item>

          <div style="position:relative; width: 100%; display:flex; justify-content: space-between">
            <div>
              <el-form-item
                label="验证码"
                :rules="[
              {required:true,message:'验证码不能为空', trigger: 'blur'},
              {pattern:/^[0-9]{6}$/,message:'验证码为6位数字', trigger: 'blur'}
            ]"
                prop="code"
              >
                <el-input maxlength="6" v-model="form.code" show-word-limit />
              </el-form-item>
            </div>
            <div>
              <el-button type="primary" @click="sendSms" :loading="smsLoading">{{smsBtnContent}}</el-button>
            </div>
          </div>
          <el-button
            style="width:100%"
            @click="register"
            type="primary"
            :loading="loading"
          >注册</el-button>
        </el-form>
      </div>

<!--      <div slot="footer" class="dialog-footer">
        <el-button @click="registerVisible = false">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import loginApi from '../../api/login'
// import sha1 from 'sha1'

export default {
  name: 'Login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePass = (rule, value, callback) => {
    //   if (value.length < 5) {
    //     callback(new Error('密码不能小于5位'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      registerType: 'primary',
      smsBtnContent: '发送',
      smsLoading: false,
      registerVisible: false,
      cdCount: 0,
      form: {
        username: '',
        password: '',
        phone: '',
        code: ''
      },
      formLabelWidth: '80px',
      loginForm: {
        username: '',
        password: ''
      },
      // loginRules: {
      //   username: [{ required: true, trigger: 'blur', validator: validateUsername }],
      //   password: [{ required: true, trigger: 'blur', validator: validatePass }]
      // },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    sendSms () {
      if (!this.form.phone.match(/[0-9]{11}/)) {
        this.$message({
          type: 'error',
          message: '手机号格式不正确！'
        })
        return
      }
      this.smsLoading = true
      loginApi.sendRegisterSms(this.form.phone).then(res => {
        if (res.code ==! '1001') {
          this.$message({
            type: 'error',
            title: res.data.title,
            message: res.data.message
          })
          this.smsLoading = false
        } else {
          if (res.data === 'Ok') {
            this.$message({
              type: 'success',
              message: '验证码已发送到对应手机，请注意查收。'
            })
            this.cdCount = 60
            let cdTimer = setInterval(() => {
              this.smsBtnContent = `${this.cdCount}s`
              this.cdCount--
              if (this.cdCount === 0) {
                clearInterval(cdTimer)
                this.smsBtnContent = '发送'
                this.smsLoading = false
              }
            }, 1000)
          } else if (res.data === 'LimitExceeded.PhoneNumberDailyLimit') {
            this.$message({
              type: 'error',
              message: '验证码发送次数超过每日上限，请明天再来。'
            })
            this.smsLoading = false
          } else if (res.data === 'LimitExceeded.PhoneNumberOneHourLimit') {
            this.$message({
              type: 'error',
              message: '验证码发送次数超过每小时上限，请1小时后再试。'
            })
            this.smsLoading = false
          } else if (res.data === 'LimitExceeded.PhoneNumberThirtySecondLimit') {
            this.$message({
              type: 'error',
              message: '验证码请求过于频繁，请稍后再试。'
            })
            this.smsLoading = false
          } else if (res.data === 'InvalidParameterValue.IncorrectPhoneNumber') {
            this.$message({
              type: 'error',
              message: '非法的手机号码请求。'
            })
          } else {
            this.$message({
              type: 'error',
              message: '验证码发送失败，请稍后重试。'
            })
            this.cdCount = 60
            let cdTimer = setInterval(() => {
              if (this.cdCount === 0) {
                clearInterval(cdTimer)
                this.smsBtnContent = '发送'
                this.smsLoading = false
                return
              }
              this.cdCount--
              this.smsBtnContent = `${this.cdCount} s`
            }, 1000)
          }
        }
      })
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    register() {
      this.registerVisible = false
      loginApi.register(this.form.username, this.form.password, this.form.phone, this.form.code)
        .then(response => {
          this.$message({
            type: 'success',
            message: response.message
          })
        }).catch(error => {
      })
      this.form.username = ''
      this.form.password = ''
    },
    handleLogin() {
      loginApi.login(this.loginForm.username, this.loginForm.password)
        .then(response => {
          if (response.code === 1001) {
            // window.sessionStorage.setItem("token",response.data.token)
            // window.sessionStorage.setItem("username",response.data.username)
            // window.sessionStorage.setItem("roles",response.data.role)
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
            }).catch(() => {
              this.loading = false
            })
          } else if (response.code === 1002) {
            this.loading = false
          }
        }).catch(error => {
        this.loading = false
      })
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     this.$store.dispatch('Login', this.loginForm).then(() => {
      //       this.loading = false
      //       this.$router.push({ path: this.redirect || '/' })
      //     }).catch(() => {
      //       this.loading = false
      //     })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;

      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
