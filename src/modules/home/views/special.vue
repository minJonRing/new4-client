<template>
    <div class="special">
        <div class="box">
            <div class="top">
                <div class="title">特色专题库</div>
                <router-link class="more" to="/topic-library">
                    <span>查看全部</span>
                    <i class="el-icon-arrow-right"></i>
                </router-link>
            </div>
            <div class="list">
                <div class="item" v-for="item in list " :key="item.id" @click="handleLink(item)">
                    <div class="cover">
                        <img :src="item.coverUrl" alt="">
                    </div>
                    <div class="base">
                        <div class="title">
                            {{ item.name }}
                        </div>
                        <div class="tip">创建者：{{ item.creator }}</div>
                        <div class="content">
                            {{ item.briefIntroduce }}
                        </div>
                        <div class="number">图书：{{ getCount(item.typeCount) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ajax } from '@/api/ajax'
export default {
    name: "Special",
    components: {

    },
    data() {
        return {
            list: [],
        };
    },
    computed: {
        ...mapGetters([]),
    },
    created() {
        this.getList()
    },
    mounted() {
    },
    methods: {
        getList() {
            ajax({
                url: `/api/topicLibrary`,
                data: {
                    orderBy: 'create_time',
                    sort: 'DESC',
                    current: 1,
                    pageSize: 10
                }
            }).then(({ data }) => {
                const { list, total } = data;
                if (list) {
                    const l = list.slice(0, 4)
                    this.list = l
                }

            }).finally(() => {
                this.loading = false;
            })
        },
        getCount(typeCount) {
            let count = 0;
            typeCount.map(({ count: c }) => {
                count += c
            })
            return count
        },
        handleLink(i) {
            const { id } = i;
            this.$router.push(`/topic?id=${id}`)
        },
        loadImg(e) {
            console.log(e)
        }
    },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.special {
    position: relative;
    // height: 1016px;

    .box {
        width: 1200px;
        margin: 0 auto;

        .top {
            padding: 120px 0 43px;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            // border-bottom: 1px #000 solid;

            .title {
                font-size: 26px;
                line-height: 36px;
                color: #333;
            }

            .more {
                display: flex;
                align-items: center;
                font-size: 18px;
                color: #333;
                line-height: 25px;
                cursor: pointer;
                transition-duration: 600ms;

                .el-icon-arrow-right {
                    font-size: 18px;
                    color: #BC212F;
                    // transform: matrix(1, 0, 0, 1, 5, 0);
                }

                @keyframes rotate {
                    100% {
                        transform: rotateX(360deg);
                    }
                }

                &:hover {
                    color: #BC212F;

                    .el-icon-arrow-right {
                        animation: rotate 2000ms linear infinite;
                    }
                }
            }
        }

        .list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .item {
                position: relative;
                display: flex;
                width: 585px;
                height: 314px;
                background-color: #F2E7D4;
                padding: 28px;
                margin-bottom: 30px;
                cursor: pointer;

                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 2px;
                    height: 100%;
                    background-color: $themeColor;
                    opacity: 1;
                    transition-duration: 600ms;
                }

                &::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: 1px $themeColor solid;
                    opacity: 0;
                    transition-duration: 600ms;
                }

                .cover {
                    flex-shrink: 0;
                    width: 190px;
                    height: 258px;
                    border-radius: 6px;
                    overflow: hidden;
                    user-select: none;
                    box-shadow: 0 4px 4px rgba(0, 0, 0, .25);

                    img {
                        display: block;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        image-rendering: auto;
                    }
                }

                .base {
                    padding-left: 28px;
                    width: calc(100% - 190px);

                    .title {
                        width: 100%;
                        line-height: 31px;
                        font-size: 22px;
                        color: #333;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    .tip {
                        line-height: 17px;
                        font-size: 12px;
                        color: #888;
                        padding: 10px 0;
                    }

                    .content {
                        height: 140px;
                        font-size: 14px;
                        line-height: 20px;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 7;
                    }

                    .number {
                        line-height: 17px;
                        font-size: 12px;
                        color: #888;
                        margin-top: 35px;
                    }
                }

                &:hover {
                    &::before {
                        opacity: 0;
                    }

                    &::after {
                        opacity: 1;
                    }
                }
            }
        }
    }

}
</style>