<template>
    <div class="register">

        <Head :right="false" />
        <div class="body">
            <div class="card">
                <div class="title">欢迎注册{{ title }}</div>
                <el-form :model="form" ref="form" :rules="rules" label-width="180px" size="normal">
                    <el-form-item label="账号" prop="username">
                        <el-input v-model.trim="form.username" placeholder="请输入6-16位用户名，只能使用英文字母、数字或下划线，且不以数字开头"
                            clearable show-word-limit maxlength="16" />
                    </el-form-item>
                    <el-form-item label="姓名" prop="nikeName">
                        <el-input v-model.trim="form.nikeName" placeholder="请输入10位以内的姓名" clearable show-word-limit
                            maxlength="10" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input :type="passwordType1" v-model.trim="form.password"
                            placeholder="请输入6-16位密码，包含字母、数字、特殊符号" clearable>
                            <el-button slot="append" @click="showPwd('passwordType1')">
                                <svg-icon :icon-class="passwordType1 === 'password' ? 'eye' : 'eye-open'" />
                            </el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPassword">
                        <el-input :type="passwordType2" v-model.trim="form.checkPassword" placeholder="请再次输入密码"
                            clearable>
                            <el-button slot="append" @click="showPwd('passwordType2')">
                                <svg-icon :icon-class="passwordType2 === 'password' ? 'eye' : 'eye-open'" />
                            </el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model.trim="form.email" placeholder="请输入邮箱" clearable />
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <div class="phone">
                            <el-input v-model.trim="form.phone" placeholder="请输入手机号码" clearable />
                            <div :class="['btn code', isGetCode ? 'active' : '']" @click="handleGetCode">{{ codeName
                                }}{{ isGetCode ? '' : '秒后再次获取' }}
                            </div>
                        </div>
                    </el-form-item>
                    <!-- <el-form-item label="验证码" prop="code">
                        <el-input v-model.trim="form.code" placeholder="请输入动态验证码" clearable />
                    </el-form-item> -->
                    <el-form-item>
                        <div class="btn submit" @click="handleRegister">提交</div>
                        <div class="btn back" @click="handleLogin">返回登录</div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import { title } from '@/settings'
import { blur, blurEmail, blurMobile, blurMobileNotRequired } from "tqr";

import Head from '@/modules/head/index.vue'
import Footer from '@/modules/footer/index.vue'

import { ajax } from '@/api/ajax'
const CryptoJS = require("crypto-js");
export default {
    name: "Register",
    components: {
        Head,
        Footer
    },
    data() {
        return {
            title,
            form: {
                username: "",
                nikeName: "",
                password: "",
                checkPassword: "",
                email: "",
                phone: "",
                code: "",

            },
            rules: {},
            passwordType1: 'password',
            passwordType2: 'password',
            // code
            codeName: '获取验证码',
            outTime: null
        };
    },
    created() {
        this.init()
    },
    computed: {
        isGetCode() {
            return typeof this.codeName === 'string'
        }
    },
    mounted() {
    },
    methods: {
        init() {
            this.rules = {
                username: {
                    required: true,
                    validator: (rule, value, callback) => {
                        const reg1 = /^\D/.test(value)
                        const reg2 = /[a-zA-Z0-9\_].{6,16}/.test(value)
                        if (!value || !reg1 || !reg2) {
                            return callback(new Error('请输入符合格式的账号'));
                        }
                        return new callback();
                    },
                    trigger: "blur"
                },
                nikeName: blur,
                password: {
                    required: true,
                    validator: (rule, value, callback) => {
                        const reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,16}$/.test(value)
                        if (!value || !reg) {
                            return callback(new Error('请输入符合格式的密码'));
                        }
                        return new callback();
                    },
                    trigger: "blur"
                },
                checkPassword: {
                    required: true,
                    validator: (rule, value, callback) => {
                        const reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,16}$/.test(value)
                        if (!value || !reg) {
                            return callback(new Error('请输入符合格式的密码'));
                        }
                        if (value !== this.form.password) {
                            return callback(new Error('2次密码输入不匹配'));
                        }
                        return new callback();
                    },
                    trigger: "blur"
                },
                email: blurEmail,
                phone: blurMobileNotRequired,
                code: blur
            }
        },
        checkCapslock(e) {
            const { key } = e;
            this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
        },
        showPwd(type) {
            if (this[type] === "password") {
                this[type] = "";
            } else {
                this[type] = "password";
            }
        },
        handleGetCode() {
            if (this.isGetCode && this.form.phone.length === 11) {
                this.codeName = 60;
                this.countdown()
            } else {
                this.$notify.warning('手机号不正确')
            }
        },
        countdown() {
            clearTimeout(this.outTime)
            if (this.codeName > 0) {
                this.outTime = setTimeout(() => {
                    this.codeName = this.codeName - 1;
                    this.countdown()
                }, 1000);
            } else {
                this.codeName = '获取验证码'
            }
        },
        // 登录接口
        handleRegister() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    ajax({
                        url: '/api/user/register',
                        type: 'post',
                        data: {
                            ...this.form,
                            password: CryptoJS.MD5(this.form.password).toString(),
                            checkPassword: CryptoJS.MD5(this.form.checkPassword).toString(),
                        }
                    }).then(() => {
                        this.$notify.success('注册成功')
                        this.$nextTick(() => {
                            this.$router.push('/login')
                        })
                    })
                } else {
                    return false;
                }
            });
        },
        handleLogin() {
            this.$router.push('/login')
        }
    },
};
</script>


<style lang="scss" scoped>
.register {

    .body {
        padding: 45px 0 60px;

        .card {
            position: relative;
            width: 1200px;
            margin: 0 auto;
            border: 1px #eee solid;

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
                line-height: 140px;
                text-align: center;
            }

            .el-form {
                width: 700px;
                margin: 0 auto;
                transform: translateX(-90px);

                .el-form-item {
                    ::v-deep .el-form-item__label {
                        font-size: 20px;
                        color: #000;
                        font-weight: normal;
                        padding-right: 30px;
                    }

                    ::v-deep .el-form-item__content {
                        .phone {
                            display: flex;
                            align-items: center;

                            .btn {
                                flex-shrink: 0;
                                width: 120px;
                                height: 40px;
                                background-color: #E9D4B3;
                                text-align: center;
                                line-height: 40px;
                                // font-size: 16px;
                                color: #865A16;
                                margin-left: 30px;
                                pointer-events: none;
                                user-select: none;
                                opacity: 0.7;

                                &.active {
                                    opacity: 1;
                                    pointer-events: auto;
                                }
                            }
                        }

                        .submit {
                            width: 100%;
                            height: 40px;
                            background-color: #BC212F;
                            text-align: center;
                            line-height: 40px;
                            font-size: 16px;
                            color: #fff;
                            border-radius: 4px;
                            margin-bottom: 10px;
                        }

                        .back {
                            width: 100%;
                            height: 40px;
                            background-color: #fff;
                            text-align: center;
                            line-height: 40px;
                            font-size: 16px;
                            color: #333;
                            border-radius: 4px;
                            border: 1px solid #DCDFE6;
                        }
                    }
                }
            }
        }
    }

}
</style>