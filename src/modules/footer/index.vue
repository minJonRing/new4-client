<template>
    <div class="footer">
        <div class="box">
            <div class="top">
                <div class="logo">
                    <img :src="Logo" alt="" />
                </div>
                <div class="mid">
                    <div class="ider"></div>
                    <div class="item">
                        <div class="label">首页</div>
                        <div class="list">
                            <router-link to="/user">
                                <a class="i">个人中心</a>
                            </router-link>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">相关链接</div>
                        <div class="list">
                            <a class="i" v-for="item in links" :key="item.link" :href="item.url" target="_blank">{{
                                item.label
                            }}</a>
                        </div>
                    </div>
                </div>
                <div class="code">
                    <img :src="code" alt="" />
                </div>
            </div>
            <div class="dvider"></div>
            <div class="icp">
                上海市新四军暨中华抗日根据地历史研究会主办
            </div>
        </div>
    </div>
</template>

<script>
import Logo from '@/assets/f-logo.png'
import { ajax } from '@/api/ajax'
import { mapActions } from 'vuex'
export default {
    name: 'Footer',
    data() {
        return {
            Logo,
            code: '',
            links: []
        }
    },
    computed: {

    },
    created() {
        this.getData()
    },
    methods: {
        ...mapActions({ setLogo: 'user/setLogo' }),
        getData() {
            this.$global.loading = true;
            ajax({
                url: `/api/books/link`,
                data: {
                    total: true,
                    pageNum: 1,
                    pageSize: 50
                }
            }).then(({ data }) => {
                const { list } = data;
                this.links = list.filter(({ type }) => type == 3)
                const code = list.filter(({ type }) => type == 2)
                if (!!code.length) {
                    this.code = code[0].url
                }
                const logo = list.filter(({ type }) => type == 1)
                if (!!logo.length) {
                    this.setLogo(logo[0].url)
                }

            }).finally(() => {
                this.$global.loading = false;
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.footer {
    background-image: url(../../assets/footer.png);
    height: 388px;
    background-size: cover;
    background-position: center;

    .box {
        width: 1200px;
        margin: 0 auto;
        padding-top: 62px;


        .top {
            display: flex;
            height: 116px;

            .logo {
                flex-shrink: 0;
                height: 100%;
                width: 160px;

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }

            .mid {
                display: flex;
                flex-grow: 1;

                .ider {
                    width: 1px;
                    height: 100%;
                    background-color: #ECAAA9;
                    margin: 0 60px;
                }

                .item {
                    color: #fff;

                    .label {
                        font-size: 22px;
                        line-height: 31px;
                    }

                    .list {
                        padding-top: 14px;

                        .i {
                            display: inline-block;
                            width: 160px;
                            font-size: 18px;
                            line-height: 25px;
                            margin-bottom: 17px;
                            transition-duration: 300ms;

                            &:hover {
                                // color: rgb(0, 65, 131);
                                text-decoration: underline;
                            }
                        }
                    }

                    &+.item {
                        .list {
                            width: 480px;
                            font-size: 0;
                        }
                    }

                }
            }

            .code {
                flex-shrink: 0;
                width: 116px;
                height: 100%;
                overflow: hidden;
                background-color: #fff;

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .dvider {
            margin: 80px 0 48px;
            width: 100%;
            height: 1px;
            background-color: #ECAAA9;
        }

        .icp {
            text-align: center;
            font-size: 18px;
            line-height: 25px;
            color: #fff;
        }
    }
}
</style>