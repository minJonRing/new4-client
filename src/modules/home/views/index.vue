<template>
  <div class="home">
    <div class="head">
      <div class="w1200 m-auto">
        <img class="block" :src="Logo" alt="logo">
        <!-- <div class="login">
          <div class="not">
            <router-link to="/login" class="btn">
              登录
            </router-link>
            <router-link to="/register" class="btn register">
              注册
            </router-link>
            
          </div>
          <div class="already"></div>
        </div> -->
        <div v-if="isLogin" class="login">
          <div class="name">您好，{{ userInfo.nickName || userInfo.username }}</div>
          <router-link to="/user">
            <div class="btn user-center">个人中心</div>
          </router-link>
          <div class="btn out" @click="handleOut">
            <i class="el-icon-switch-button"></i>
            <span>退出登录</span>
          </div>
        </div>
        <div v-else class="no-login">
          <router-link to="/login" class="btn">
            登录
          </router-link>
          <router-link to="/register" class="btn register">
            注册
          </router-link>
        </div>
      </div>
    </div>
    <div class="carousel">
      <Carousel />
      <Search />
    </div>
    <Navigation />
    <Recommend />
    <News />
    <Red />
    <Special />
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from '@/assets/logo.png'
import Carousel from './carousel.vue'
import Search from './search.vue'
import Navigation from './navigation.vue'
import Recommend from './recommend.vue'
import News from './news.vue'
import Red from './red.vue'
import Special from './special.vue'
import Footer from '@/modules/footer/index.vue'
export default {
  name: "Home",
  components: {
    Carousel,
    Search,
    Navigation,
    Recommend,
    News,
    Red,
    Special,
    Footer
  },
  data() {
    return {
      Logo
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    isLogin() {
      return !!Object.keys(this.userInfo).length
    }
  },
  created() {
  },
  methods: {
    handleOut() {
      this.$store
        .dispatch("user/logout")
        .then(() => {
          this.$notify.success('退出登录成功！')
          this.$router.push({
            path: "/",
          });
        })
    }
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.home {
  background-color: #f5f5f5;

  .head {
    height: 142px;

    .w1200 {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .no-login {
        display: flex;
        align-items: center;
        height: 100%;

        .btn {
          width: 112px;
          height: 38px;
          text-align: center;
          line-height: 38px;
          font-size: 12px;
          color: $themeColor;
          background-color: #fff;
          cursor: pointer;
          user-select: none;

          &+.btn {
            margin-left: 20px;
          }

          &.register {
            background-color: $themeColor;
            color: #fff;
          }
        }
      }

      .login {
        display: flex;
        align-items: center;
        font-size: 16px;
        line-height: 22px;
        color: $themeColor;

        .user-center {
          padding: 0 30px;
          transition-duration: 300ms;
        }

        .out {
          cursor: pointer;
          transition-duration: 300ms;

          span {
            padding-left: 5px;
          }

        }
      }
    }
  }

  .carousel {
    position: relative;
    height: 540px;

    .search {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9;
    }
  }
}
</style>
