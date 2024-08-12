<template>
    <div class="news">
        <div class="top">
            <div class="title">最新上架</div>
            <router-link class="more" to="/searchResult?orderBy=create_time&sort=DESC">
                <span>查看更多</span>
                <i class="el-icon-arrow-right"></i>
            </router-link>
        </div>
        <div class="list">
            <router-link class="item" v-for="item in list1" :key="item.id" :to="`/file?id=${item.id}`">
                <div class="img-box">
                    <img :src="item.imageUrl" alt="">
                </div>
                <div class="label">{{ item.title }}</div>
            </router-link>
        </div>
        <div class="list">
            <router-link class="item" v-for="item in list2" :key="item.id" :to="`/file?id=${item.id}`">
                <div class="img-box">
                    <img :src="item.imageUrl" alt="">
                </div>
                <div class="label">{{ item.title }}</div>
            </router-link>
        </div>
    </div>
</template>
  
<script>
import { mapGetters } from "vuex";
import { ajax } from '@/api/ajax'
export default {
    name: "News",
    components: {

    },
    data() {
        return {
            list1: [],
            list2: []
        };
    },
    computed: {
        ...mapGetters([]),
    },
    created() {

    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            this.$global.loading = true;
            ajax({
                url: `/api/books/newBooks`,
            }).then(({ data }) => {
                const { list } = data;
                this.list1 = list.slice(0, 6)
                this.list2 = list.slice(6, 12)
            }).finally(() => {
                this.$global.loading = false;
            })
        },
    },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.news {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    padding-top: 36.5px;
    padding-bottom: 100px;

    .top {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        padding: 60px 0 36.5px;

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
        justify-content: space-between;

        .item {
            width: 170px;
            padding: 5px;
            border-radius: 4px;
            transition-duration: 300ms;

            .img-box {
                width: 100%;
                height: 210px;
                border-radius: 4px;
                overflow: hidden;

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    image-rendering: auto;
                    transition-duration: 600ms;
                }
            }

            .label {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                padding: 20px 0;
                text-align: center;
                font-size: 18px;
                line-height: 25px;
                color: #666;
                transition-duration: 600ms;
            }

            &:hover {
                // background-color: #fff;
                // box-shadow: 1px 1px 6px rgba(0, 0, 0, .3);

                .img-box {
                    img {
                        transform: matrix(1.1, 0, 0, 1.1, 0, 0);
                    }
                }

                .label {
                    color: $themeColor;
                }
            }
        }

        &+.list {
            margin-top: 43px;
        }
    }
}
</style>
  