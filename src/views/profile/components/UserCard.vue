<template>
  <div class="user-card" style="margin-bottom: 20px">
    <div class="user-profile">
      <el-image class="avatar" :src="userInfo.avatar" fit="fill" :lazy="true" />
      <div class="user-name">
        <div class="box">
          <div class="name" v-show="!modify">{{ userInfo.nickName }}</div>
          <el-input v-show="modify" v-model="name" placeholder="请输入" clearable @blur="handleFocus" />
        </div>
        <el-button type="text" icon="el-icon-edit" @click="modify = !modify"></el-button>
      </div>
    </div>
    <div class="data">
      <el-statistic group-separator="," :precision="0" :value="11" title="收藏"></el-statistic>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      name: '',
      modify: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.name = this.userInfo.nickName
  },
  methods: {
    ...mapActions({ setInfo: 'user/setInfo' }),
    handleFocus() {
      this.modify = false;
      this.setInfo({ ...this.userInfo, nickName: this.name })
    }
  }
};
</script>

<style lang="scss" scoped>
.user-card {
  padding-top: 24px;

  .user-profile {
    .avatar {
      display: block;
      width: 100px;
      height: 100px;
      margin-bottom: 12px;
      border-radius: 10px;
      margin: 0 auto;
    }

    .user-name {
      padding: 12px 0;
      display: flex;
      align-items: center;
      justify-content: center;

      .box {
        padding: 0 6px;

        .el-input {
          width: 120px;
        }
      }

      .el-button {
        font-size: 16px;
        color: #ee0014;
      }
    }
  }

  .data {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .el-statistic {
      width: 60px;
      height: 60px;
    }
  }

}
</style>
