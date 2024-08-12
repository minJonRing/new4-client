<template>
  <div :class="['navbar', device]">
    <router-link class="left" to="/">
      <img src="https://www.modernhistory.org.cn/img/logo-home.8823c7e9.png" alt="">
    </router-link>
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <Search class="right-icon hover-effect"></Search>
        <ScreenFull v-if="fullScreen" class="right-icon hover-effect" />
        <!-- <SizeSelect v-if="resize" class="right-icon hover-effect" /> -->
        <div class="user-name">你好，{{ userInfo.nickName || '涂乔荣' }}</div>
      </template>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="userInfo.avatar || headJpg" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/profile">
              个人中心
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 查询 -->
    <SearchBox height="300" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ScreenFull from "./Template/Screenfull";
import SizeSelect from "./Template/SizeSelect";
import Search from "./Template/Search";
import SearchBox from '@/components/search'
import headJpg from '@/assets/head.jpg'
import { ajax } from '@/api/ajax';

export default {
  components: {
    ScreenFull,
    SizeSelect,
    Search,
    SearchBox
  },
  data() {
    return {
      headJpg,
    };
  },
  computed: {
    ...mapGetters([
      "sidebar",
      "avatar",
      "device",
      "fullScreen",
      "menuSearch",
      "resize",
      "errorBtn",
      "userInfo",
      "search"
    ]),
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.navbar {
  height: $headHeight;
  overflow: hidden;
  position: relative;
  background: #981722;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  transition-property: padding;
  transition-duration: 300ms;

  &.mobile {
    padding: 0 6px;

    .left {
      img {
        width: 100%;
        height: auto;
      }
    }
  }

  .left {
    flex-grow: 1;
    display: flex;
    align-items: center;
    height: 100%;
    overflow: hidden;

    img {
      display: block;
      // max-width: 100%;
      height: 90%;
    }
  }

  .right-menu {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    height: 100%;
    line-height: 50px;
    margin-left: 6px;

    &:focus {
      outline: none;
    }

    .right-icon {
      display: flex;
      align-items: center;
      height: 100%;
      font-size: 18px;
      color: #fff;
      padding: 0 8px;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.2);
      }
    }

    .user-name {
      font-size: 14px;
      color: #fff;
      padding: 0 8px;
    }

    .right-menu-item {
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      height: 100%;
      user-select: none;


      .avatar-wrapper {
        position: relative;
        cursor: pointer;
        height: 100%;
        padding: 10px 15px 0 8px;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;

        }

        .el-icon-caret-bottom {
          position: absolute;
          right: 0;
          top: 35px;
          color: #fff;
        }
      }
    }
  }
}
</style>
