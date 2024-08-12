<template>
    <div class="head">
        <div class="box">
            <router-link to="/" class="logo">
                <img :src="logo" alt="">
            </router-link>
            <template v-if="right">
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
            </template>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Footer',
    props: {
        right: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters(['userInfo', 'logo']),
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
    }
}
</script>

<style lang="scss" scoped>
.head {
    background-image: url(../../assets/head.png);
    height: 142px;
    background-size: cover;
    background-position: center;
    user-select: none;

    .box {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .logo {
            height: 100%;
            display: flex;
            align-items: center;

            img {
                display: block;
                max-height: 100%;
            }
        }

        .no-login {
            display: flex;

            .btn {
                width: 112px;
                height: 38px;
                text-align: center;
                line-height: 38px;
                font-size: 16px;
                color: #BC212F;
                background-color: #fff;
                cursor: pointer;
                user-select: none;
                transition-duration: 100ms;

                &+.btn {
                    margin-left: 20px;
                }

                &.register {
                    background-color: #E9D4B3;
                    color: #865A16;
                }
            }
        }

        .login {
            display: flex;
            align-items: center;
            font-size: 16px;
            line-height: 22px;
            color: #fff;

            .user-center {
                padding: 0 30px;
                transition-duration: 300ms;

                &:hover {
                    color: #E9D4B3;
                }
            }

            .out {
                cursor: pointer;
                transition-duration: 300ms;

                span {
                    padding-left: 5px;
                }

                &:hover {
                    color: #E9D4B3;
                }
            }
        }

    }
}
</style>