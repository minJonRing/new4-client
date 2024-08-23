<template>
  <div class="login" @click.stop>
    <div class="close" @click="handleClose">
      <i class="el-icon-circle-close"></i>
    </div>

    <div class="title">
      账号登录
    </div>
    <el-form ref="form" :model="form" :rules="rules" autocomplete="on" label-position="left" size="normal">
      <el-form-item prop="username">
        <el-input ref="username" v-model="form.username" placeholder="用户名/邮箱" clearable />
      </el-form-item>
      <el-form-item prop="password">
        <el-input :key="passwordType" ref="password" v-model.trim="form.password" :type="passwordType" placeholder="密码"
          name="password" tabindex="2" autocomplete="on" clearable @keyup.native="checkCapslock"
          @blur="capsTooltip = false" @keyup.enter.native="handleLogin">
          <el-button slot="append" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="tip">
          <el-checkbox v-model="remember">记住用户名</el-checkbox>
          <div>
            <router-link to="/register" class="btn">
              立即注册
            </router-link>
            <router-link to="/forget" class="btn">
              忘记密码
            </router-link>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" :loading="loading" type="danger" style="width: 100%" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { title } from '@/settings'
import { blur } from "tqr";
const CryptoJS = require("crypto-js");
export default {
  name: "Login",
  data() {
    return {
      title,
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: blur,
        password: blur,
      },
      remember: false,
      passwordType: "password",
      capsTooltip: false,
      loading: false,
    };
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
    const username = localStorage.getItem('username')
    if (username) {
      this.form.username = username
    }
  },
  mounted() {
    if (this.form.username === "") {
      this.$refs.username.focus();
    } else if (this.form.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // 登录接口
    handleLogin() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          // 调取 登录接口  存储用户登录token
          this.$store
            .dispatch("user/login", {
              ...this.form,
              password: CryptoJS.MD5(this.form.password).toString()
            })
            .then(() => {
              if (this.remember) {
                localStorage.setItem('username', this.form.username)
              }
              this.$router.push({
                path: "/",
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.$emit('close')
    }
  },
};
</script>


<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.login {
  position: absolute;
  top: 240px;
  width: 460px;
  padding: 52px 60px 80px;
  // border: 1px #eee solid;
  // background-color: rgba(255, 255, 255, .7);
  background-color: #fff;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #BC212F;
  }

  .close {
    position: absolute;
    top: 14px;
    right: 16px;
    font-size: 20px;
    color: #B0B0B0;
    cursor: pointer;
    transition-duration: 600ms;

    &:hover {
      color: $themeColor;
    }
  }

  .title {
    font-size: 30px;
    color: #333;
    line-height: 42px;
  }

  .el-form {
    padding-top: 15px;

    .el-form-item {

      margin-bottom: 20px;

      ::v-deep {
        .el-form-item__content {
          .tip {
            display: flex;
            justify-content: space-between;
            user-select: none;

            .btn {
              color: #999;

              &+.btn {
                padding-left: 5px;
              }
            }
          }

          .el-button.btn {
            background-color: #BC212F;
          }
        }
      }
    }
  }
}
</style>
