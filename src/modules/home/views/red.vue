<template>
    <div class="red">
        <div class="box">
            <div class="top">
                <div class="title">红色文献</div>
                <router-link class="more" to="/searchResult?redFlag=true">
                    <span>查看全部</span>
                    <i class="el-icon-arrow-right"></i>
                </router-link>
            </div>
            <div class="list">
                <router-link class="item" v-for="item in list " :key="item.id" :to="`/file?id=${item.id}`">
                    <div class="cover">
                        <img :src="item.imageUrl" alt="">
                    </div>
                    <div class="base">
                        <div class="title">
                            {{ item.title }}
                        </div>
                        <div class="t">出版时间：{{ item.publishTime }}</div>
                        <div class="t">出版地：{{ item.place || '--' }}</div>
                        <div class="t">类型：{{ bookTypeJson[item.docType] }}</div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { ajax } from '@/api/ajax'
import { mapGetters } from 'vuex';
export default {
    name: "News",
    components: {

    },
    data() {
        return {
            list: [],
        };
    },
    computed: {
        ...mapGetters(['bookTypeJson'])
    },
    created() {
        this.getData()
    },
    mounted() {
    },
    methods: {
        getData() {
            this.$global.loading = true;
            ajax({
                url: `/api/books/redLiterature`,
                data: {
                    type: 2
                }
            }).then(({ data }) => {
                const { list } = data;
                if (list) {
                    this.list = list.slice(0, 4)
                }

            }).finally(() => {
                this.$global.loading = false;
            })
        },
    },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.red {
    position: relative;
    background-image: url('../../../assets/home/red-background.png');
    background-size: cover;
    height: 770px;

    // background-position: center;
    .box {
        width: 1200px;
        margin: 0 auto;

        .top {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            padding: 60px 0 50px;

            .title {
                font-size: 26px;
                line-height: 36px;
                color: #fff;
            }

            .more {
                display: flex;
                align-items: center;
                font-size: 18px;
                color: #fff;
                line-height: 25px;
                cursor: pointer;
                transition-duration: 600ms;

                .el-icon-arrow-right {
                    font-size: 18px;
                    color: #fff;
                    // transform: matrix(1, 0, 0, 1, 5, 0);
                }

                @keyframes rotate {
                    100% {
                        transform: rotateX(360deg);
                    }
                }

                &:hover {
                    letter-spacing: 2px;

                    .el-icon-arrow-right {
                        animation: rotate 2000ms linear infinite;
                    }
                }
            }
        }

        .list {
            display: flex;
            justify-content: space-between;

            .item {
                position: relative;
                width: 278px;
                height: 552px;
                background-color: #fff;
                padding: 30px 30px 0;
                transition-duration: 600ms;

                &::before {
                    content: "";
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: calc(100% - 4px);
                    height: calc(100% - 4px);
                    // top: 0;
                    // left: 0;
                    // width: 100%;
                    // height: 100%;
                    border: 2px $themeColor solid;
                    z-index: 1;
                    opacity: 0;
                    transition-duration: 600ms;
                }

                .cover {
                    position: relative;
                    width: 218px;
                    height: 296px;
                    border-radius: 6px;
                    overflow: hidden;
                    box-shadow: 0 4px 16px rgba(66, 21, 21, .3);
                    user-select: none;

                    img {
                        display: block;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        image-rendering: auto;

                    }

                    &::after {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        box-shadow: inset 4px 0 4px rgba(107, 107, 107, 1), ;
                    }
                }

                .base {
                    padding-top: 20px;

                    .title {
                        height: 62px;
                        line-height: 31px;
                        font-size: 22px;
                        color: #666;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        margin-bottom: 20px;
                        transition-duration: 600ms;
                    }

                    .t {
                        font-size: 16px;
                        line-height: 25px;
                        color: #666;
                        transition-duration: 600ms;

                        &+.t {
                            margin-top: 10px;
                        }
                    }
                }

                &:hover {

                    // background-color: rgba(255, 255, 255, .7);
                    // backdrop-filter: blur(6px);
                    &::before {
                        opacity: 1;
                    }

                    .base {

                        .title,
                        .t {
                            color: $themeColor;
                        }
                    }
                }
            }
        }
    }

}
</style>