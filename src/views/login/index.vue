<template>
  <div class="login">

    <Head :right="false" />
    <div class="card">
      <div class="title">
        欢迎使用
      </div>
      <el-form ref="form" :model="form" :rules="rules" autocomplete="on" label-position="left" size="normal">
        <el-form-item prop="username">
          <el-input ref="username" v-model="form.username" placeholder="账号" clearable />
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
  </div>
</template>

<script>
import { title } from '@/settings'
import { blur } from "tqr";
import Head from '@/modules/head/index.vue'

import { ajax } from '@/api/ajax'

export default {
  name: "Login",
  components: {
    Head
  },
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
            .dispatch("user/login", this.form)
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
  },
};
</script>


<style lang="scss" scoped>
.login {
  position: relative;
  height: 100%;
  width: 100%;
  background: url('../../assets//login.png');
  overflow: hidden;
  background-size: cover;
  background-origin: content;

  .card {
    position: absolute;
    top: 240px;
    right: 360px;
    width: 460px;
    padding: 0 60px 80px;
    border: 1px #eee solid;
    background-color: #fff;
    // background-color: rgba(255, 255, 255, .5);
    // backdrop-filter: blur(6px);

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #BC212F;
    }

    .title {
      font-size: 30px;
      color: #333;
      line-height: 80px;
    }

    .el-form {
      .el-form-item {
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

}
</style>
