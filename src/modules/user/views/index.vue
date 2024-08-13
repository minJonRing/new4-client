<template>
    <div class="user">
        <div class="body">
            <div class="head">
                <div class="left">
                    <div class="name">{{ userInfo.username }}</div>
                    <div class="flex flex-mid flex-center " style="height: 40px;">
                        <el-input v-if="change" v-model="username" placeholder="请输入" clearable>
                            <el-button slot="append" icon="el-icon-edit" @click="change = false" />
                        </el-input>
                        <div v-else class="change-name btn" @click="handleChangeName">
                            <span>修改昵称</span>
                            <i class="el-icon-edit"></i>
                        </div>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="right">
                    <div class="t">
                        <div class="item">
                            账号状态：{{ userInfo.isDeleted ? '禁用' : '正常' }}
                        </div>
                        <div class="item">
                            手机号：{{ userInfo.phone || '未填写' }}
                        </div>
                        <div class="item">
                            邮箱：{{ userInfo.email || '未填写' }}
                        </div>
                    </div>
                    <div class="handle">
                        <div class="l">
                            <div class="item">
                                <i class="el-icon-star-off"></i>
                                <span>收藏：</span>
                                <div class="b">{{ collect.length }}</div>
                            </div>
                            <!-- <div class="item">
                                <i class="el-icon-chat-dot-square"></i>
                                <span>纠错：</span>
                                <div class="b">0</div>
                            </div>
                            <div class="item">
                                <i class="el-icon-bottom"></i>
                                <span>已下载：</span>
                                <div class="b">0</div>
                            </div> -->
                        </div>
                        <div class="btn" @click="modify = true">修改密码</div>
                    </div>
                </div>
            </div>
            <div class="operate">
                <div v-for="(item) in operate" :key="item.label"
                    :class="['btn', operateIndex == item.value ? 'active' : '']" @click="handleOperate(item)">
                    {{ item.label }}
                </div>
            </div>
            <div class="tabs">
                <At v-if="operateIndex === 'collect'" />
                <Topic v-if="operateIndex === 'topic'" />
            </div>
        </div>
        <!-- 修改密码 -->
        <el-dialog title="修改密码" :visible.sync="modify" width="400px">
            <Modify ref="modify" />
            <span slot="footer">
                <el-button @click="modify = false">取消</el-button>
                <el-button class="theme-btn" @click="handleModify">确认修改</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { ajax } from '@/api/ajax';
import { mapGetters } from "vuex";
import At from './compoments/a.vue'
import Topic from './compoments/topic.vue'
import Modify from './modify.vue'
export default {
    name: "List",
    components: {
        At,
        Topic,
        Modify
    },
    data() {
        return {
            change: false,
            username: '',
            // 
            operate: [
                { label: '我的收藏', value: 'collect', data: null },
                { label: '我的专题库', value: 'topic', data: null },
                // { label: '我的摘录', data: null },
                // { label: '我的共享', data: null },
                // { label: '我的纠错', data: null },
            ],
            operateIndex: 'collect',
            modify: false
        };
    },
    computed: {
        ...mapGetters(['userInfo', 'collect']),
    },
    created() {

    },
    methods: {
        handleChangeName() {
            this.username = this.userInfo.username;
            this.change = true
        },
        handleOperate(i) {
            const { value } = i
            if (!value) {
                this.$notify.info('功能待开放...')
                return
            }
            this.operateIndex = value
        },
        handleModify() {
            this.$refs.modify.handleRegister((data) => {
                this.$global.loading = true;
                ajax({
                    url: '/api/user/changePass',
                    method: 'post',
                    data,
                }).then(() => {
                    this.$notify.success('密码修改成功!')
                    this.modify = false;
                }).finally(() => {
                    this.$global.loading = false;
                })
            })
        }
    },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.user {
    padding: 50px 0;
    background-color: #f5f5f5;

    .body {
        width: 1200px;
        margin: 0 auto;

        .head {
            border: 1px #eee solid;
            padding: 15px 0;
            background-color: #fff;
            display: flex;

            .left {
                flex-shrink: 0;
                padding: 0 50px;
                text-align: center;
                width: 260px;

                .name {
                    font-size: 26px;
                    line-height: 36px;
                }

                .change-name {
                    font-size: 14px;
                    color: #aaa;
                    line-height: 24px;
                    text-align: center;
                }
            }

            .divider {
                width: 1px;
                background-color: #EEEEEE;
            }

            .right {
                flex-grow: 1;
                padding: 0 50px;

                .t {
                    display: flex;

                    .item {
                        font-size: 16px;
                        color: #333;
                        line-height: 22px;

                        &+.item {
                            padding-left: 40px;
                        }
                    }
                }

                .handle {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-top: 20px;

                    .l {
                        display: flex;

                        .item {
                            display: flex;
                            align-items: center;
                            font-size: 16px;
                            color: #333;
                            line-height: 22px;

                            i {
                                font-size: 16px;
                            }

                            span {
                                padding: 0 3px;
                            }

                            .b {
                                color: $themeColor;
                                font-size: 26px;
                                line-height: 32px;
                            }

                            &+.item {
                                margin-left: 70px;
                            }
                        }
                    }

                    .btn {
                        width: 112px;
                        height: 36px;
                        text-align: center;
                        line-height: 36px;
                        font-size: 16px;
                        color: #ffff;
                        background-color: $themeColor;
                        cursor: pointer;
                        user-select: none;
                        transition-duration: 100ms;
                    }
                }
            }
        }

        .operate {
            width: 1200px;
            margin: 40px auto 10px;
            display: flex;
            background-color: #eee;

            .btn {
                padding: 0 38px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                color: #666;
                font-size: 18px;
                transition-duration: 600ms;

                &.active,
                &:hover {
                    background-color: $themeColor;
                    color: #fff;
                }

            }
        }

        .tabs {
            width: 1200px;
            margin: 0 auto;
            background-color: #fff;
            border-top: 1px $themeColor solid;
        }
    }
}
</style>