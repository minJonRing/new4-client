<template>
    <div class="book-detail">
        <div class="body">
            <div class="head">
                <div class="before">
                    <i class="el-icon-location-outline"></i>
                    <span>当前位置:</span>
                </div>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item to="/searchResult">列表</el-breadcrumb-item>
                    <el-breadcrumb-item :to="`/searchResult?docType=${fileDetail.docType}`">{{ text[fileDetail.docType]
                        }}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ fileDetail.title }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="lr">
                <div class="card l" v-loading="slideLoad">
                    <div class="label pn">相关文献</div>
                    <div class="type" v-for="(item, key) in slide" :key="key">
                        <div class="title">
                            <i :class="['iconfont', iconfont['key']]"></i>
                            <span>{{ text[key] }}</span>
                        </div>
                        <div class="list">
                            <router-link v-for="i in item" :key="i.id" :to="`/file?id=${i.id}`" class="item">
                                <div class="cover">
                                    <img :src="i.imageUrl" alt="">
                                </div>
                                <div class="text">{{ i.title }}</div>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="card r">
                    <div class="label pn">
                        <div class="t">文献信息</div>
                        <div class="s">
                            <i class="iconfont icon-shoucang"></i>
                            <span> 收藏量 : {{ fileDetail.collectSum || 0 }}</span>
                        </div>
                    </div>
                    <Cover :file="fileDetail" />
                    <div style="height: 50px;"></div>
                    <template v-if="over">
                        <MenuTs v-if="fileDetail.docType === 'ts'" :fileDetail="fileDetail" />
                        <MenuBz v-if="fileDetail.docType === 'bz'" :fileDetail="fileDetail" />
                        <MenuTp v-if="fileDetail.docType === 'tp'" :fileDetail="fileDetail" />
                        <MenuDa v-if="fileDetail.docType === 'da'" :fileDetail="fileDetail" />
                        <MenuQk v-if="fileDetail.docType === 'qk'" :fileDetail="fileDetail" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cover from './cover.vue'
import MenuTs from './menu/ts.vue'
import MenuBz from './menu/bz.vue'
import MenuTp from './menu/tp.vue'
import MenuDa from './menu/da/index.vue'
import MenuQk from './menu/qk/index.vue'

import { ajax } from '@/api/ajax'
import { mapGetters } from 'vuex'

export default {
    name: 'BookDetail',
    components: {
        Cover,
        MenuTs,
        MenuBz,
        MenuTp,
        MenuDa,
        MenuQk
    },
    data() {
        return {
            fileDetail: {
            },
            iconfont: {
                ts: 'icon-textbook',
                bz: 'icon-news',
                da: 'icon-yanshoudangan',
                qk: 'icon-zazhiqikan',
                tp: 'icon-xingzhuang-tupian',
            },
            text: {
                ts: '图书',
                bz: '报纸',
                da: '档案',
                qk: '期刊',
                tp: '图片',
            },
            slide: {},
            slideLoad: false
        }
    },
    computed: {
        ...mapGetters(['loading']),
        over() {
            return Object.values(this.fileDetail).length
        }
    },
    watch: {
        '$route.query.id'(id) {
            this.getDetail(id)
            this.getAbout(id)
        }
    },
    created() {
        const { id } = this.$route.query;
        this.getDetail(id)
        this.getAbout(id)
    },
    methods: {
        getDetail(id) {
            this.$global.loading = true;
            ajax({
                url: `/api/books/books/${id}`,
            }).then(({ data }) => {
                const { books } = data;
                this.fileDetail = books;
                console.log(books)
                // fetch(books.imageUrl)
                //     .then(response => {
                //         if (!response.ok) {
                //             throw new Error('网络响应失败');
                //         }
                //         return response.blob();
                //     })
                //     .then(blob => {
                //         this.fileDetail = { ...books, imageUrl: URL.createObjectURL(blob) }
                //     })
                //     .catch(error => {
                //         console.error('获取图片失败:', error);
                //     });

            }).finally(() => {
                this.$global.loading = false;
            })
        },
        getAbout(id) {
            this.slideLoad = true
            ajax({
                url: `/api/books/related/${id}`,
            }).then(({ data }) => {
                const { map } = data;
                const obj = {}
                for (let key in map) {
                    const v = map[key] || []
                    obj[key] = v.slice(0, 6)
                }
                this.slide = obj
            }).finally(() => {
                this.slideLoad = false
            })
        },

    }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.book-detail {
    .body {
        width: 1200px;
        margin: 0 auto;
        padding-bottom: 40px;

        .head {
            display: flex;
            align-items: center;
            font-size: 16px;
            line-height: 22px;
            color: #888;
            padding: 50px 0;

            .before {
                span {
                    padding: 0 6px;
                }
            }

            .el-breadcrumb {
                ::v-deep .el-breadcrumb__item {
                    .el-breadcrumb__inner {
                        position: relative;
                        font-size: 16px;
                        color: #888;

                        &::after {
                            content: "";
                            position: absolute;
                            width: 0;
                            height: 2px;
                            background-color: $themeColor;
                            bottom: -6px;
                            left: 50%;
                            transform: translateX(-50%);
                            transition-duration: 600ms;
                        }

                        &.is-link {
                            &:hover {
                                color: $themeColor;

                                &::after {
                                    width: 100%;
                                }
                            }
                        }
                    }

                    &:last-child {

                        .el-breadcrumb__inner {
                            color: #AA7F3D;
                        }
                    }
                }
            }
        }

        .lr {
            display: flex;
            align-items: flex-start;

            .card {
                position: relative;

                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background-color: #BC212F;
                }

                &.l {
                    width: 232px;
                    margin-right: 14px;
                    background-color: #fff;
                    border-left: 1px #eee solid;
                    border-right: 1px #eee solid;

                    .label {
                        height: 47px;
                        line-height: 46px;
                        font-size: 16px;
                        color: #333;
                        padding: 0 12px;
                        border-bottom: 1px #eee solid;
                        font-weight: 600;
                    }

                    .type {
                        .title {
                            line-height: 46px;
                            padding: 0 12px;
                            font-size: 16px;
                            color: #333;
                            font-weight: 600;

                            .iconfont {
                                margin-right: 3px;
                            }
                        }

                        .list {
                            padding: 0 12px;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;

                            .item {
                                width: 58px;

                                .cover {
                                    position: relative;
                                    width: 100%;
                                    height: 77px;
                                    border-radius: 6px;
                                    overflow: hidden;
                                    border: 1px transparent solid;
                                    box-shadow: 0 4px 16px rgba(66, 21, 21, .1);
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
                                        pointer-events: none;
                                        box-shadow: inset 4px 0 4px rgba(107, 107, 107, .25);
                                    }
                                }

                                .text {
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    text-align: center;
                                    font-size: 12px;
                                    color: #666;
                                    line-height: 17px;
                                    padding: 6px 3px;
                                    transition-duration: 600ms;
                                }

                                &:hover {
                                    .text {
                                        color: #AA7F3D;
                                    }
                                }
                            }
                        }
                    }
                }

                &.r {
                    width: 954px;
                    background-color: #fff;

                    .label {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        height: 60px;
                        border-bottom: 1px #eee solid;
                        padding: 0 22px;

                        .t {
                            font-size: 24px;
                            color: $themeColor;
                        }

                        .s {
                            font-size: 16px;
                            color: #888;
                        }
                    }
                }
            }


        }

    }
}
</style>