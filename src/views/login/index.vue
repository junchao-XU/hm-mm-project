<template>
  <div class="login-container">
    <div class="loginBox">
      <el-form ref="LoginForm" class="login-form" :rules="loginRules" :model="loginForm">
        <div class="title-container">
          <div class="logoInfo clearfix">
            <em class="logo" />
            <span>用户登录</span>
          </div>
        </div>
        <!-- 表单 -->
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input v-model="loginForm.username" placeholder="请输入用户名" />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input ref="password" v-model="loginForm.password" placeholder="请输入密码" :type="passwordType" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-button type="primary" style="width:100%; height: 50px;font-size: 22px;; margin-bottom:30px;" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import Shajs from 'jssha'
const shajs = new Shajs('SHA-256', 'TEXT', { encoding: 'UTF8' })
import { loginApi } from '@/api/user'
export default {
  data() {
    return {
      loginForm: {
        username: 'root@admin.com',
        password: '123456'
      },
      // 验证
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }

        ],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }, { min: 6, max: 16, message: '长度应为6-16位', trigger: ['blur'] }]
      },
      loading: false,
      passwordType: 'password'
    }
  },
  methods: {
    // 是否显示密码
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 点击登录
    login() {
      this.$refs.LoginForm.validate(isOk => {
        if (!isOk) return false
        shajs.update(this.loginForm.password)
        const password = shajs.getHash('HEX')
        loginApi({ username: this.loginForm.username, password }).then(({ token }) => {
          this.$store.commit('user/SET_TOKEN', token)
          this.$router.push('/')
        })
      })
    }
  }
}
</script>

<style lang="scss">

$bg:#283443;
$light_gray: #68b0fe;  // 将输入框颜色改成蓝色
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
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
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

   .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
     .el-form-item__error {
       color: red
     }
  }
</style>

<style lang="scss" scoped>
$dark_gray:#889aa4;
.login-container{
  position: fixed;
    height: 100%;
    width: 100%;
    background-color: #2d3a4b;
    background: url(../../assets/common/bg.2f46505a.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
     }
    .loginBox{
      height: 100%;
    width: 100%;
    background: url(../../assets/common/logingBg.989212c0.png) no-repeat 100% 100%;
    position: relative;
    }
    .login-form{
      position: absolute;
    left: 20%;
    top: 50%;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: -200px 0 0 0;
    background: #f5f5f5;
    }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
    .title-container{
      position: relative;
      .logoInfo{
        padding-bottom: 15px;
      .logo{
    background: url(../../assets/common/下载.png) no-repeat;
    display: inline-block;
    width: 35px;
    height: 26px;
    float: left;
      }
      span{
        font-size: 22px;
    padding: 0 10px;
    float: left;
    }
  }
  }

</style>
