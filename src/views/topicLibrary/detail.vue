<template>
    <div class="book-detail">
        <div class="body">
            <div class="head">
                <div class="before">
                    <i class="el-icon-location-outline"></i>
                    <span>当前位置:</span>
                </div>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item to="/topic-library">专题库</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ fileDetail.name }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="lr">
                <div class="card l" v-loading="slideLoad">
                    <div class="label pn">相关文献</div>
                    <div class="item" v-for="(item, index) in slides" :key="index">
                        <div class="title">
                            <i :class="['iconfont', slidesKeys[index].icon]"></i>
                            <span>{{ slidesKeys[index].label }}</span>
                        </div>
                        <div class="list">
                            <div class="again btn" v-for="(i, j) in item" :key="j"
                                @click="handleAgain(slidesKeys[index].key, i.keyWord)">
                                {{
                                    index ==
                                        1 ? bookTypeJson[i.keyWord] : i.keyWord }}（{{ i.count }}）</div>
                        </div>
                    </div>
                </div>
                <div class="card r">
                    <div class="label pn">
                        <div class="t">专题库信息</div>
                        <div class="s">
                            <i class="iconfont icon-shoucang"></i>
                            <span> 收藏量 : {{ fileDetail.collectSum || 0 }}</span>
                        </div>
                    </div>
                    <Cover :file="fileDetail" />
                    <template v-if="over">
                        <List v-model="search" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cover from './cover.vue';

import { ajax } from '@/api/ajax'
import { mapGetters } from 'vuex'
import { isArray } from 'lodash'

import List from './list'
export default {
    name: 'BookDetail',
    components: {
        Cover,
        List
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
            search: {
                id: null,
                content: "",
                retrieval: "",
                orderBy: undefined,
                sort: undefined,
                docType: []
            },
            // slide 侧边
            slides: {},
            slidesKeys: {
                1: { label: '类型', icon: 'icon-leixing', key: 'docType' },
                2: { label: '关键字', icon: 'icon-zhanneisousuoguanjianci', key: 'key_word' },
                3: { label: '出版者', icon: 'icon-yonghu_yonghu', key: 'publisher' },
                4: { label: '出版地', icon: 'icon-qiye', key: 'place' },
            },
            slideLoad: false
        }
    },

    computed: {
        ...mapGetters(['loading', 'bookType', 'bookTypeJson']),
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
        this.search.id = id;
        this.getDetail(id)
        this.getAbout(id)
    },
    methods: {
        getDetail(id) {
            this.$global.loading = true;
            ajax({
                url: `/api/topicLibrary/${id}`,
            }).then(({ data }) => {
                const { topicLibrary, typeCount } = data;
                let count = 0;
                const fileDetail = { ...topicLibrary, typeCount: 0 }

                if (typeCount && !!typeCount.length) {
                    typeCount.map(el => {
                        count += el.count
                    })
                    fileDetail.typeCount = count
                }
                this.fileDetail = fileDetail

            }).finally(() => {
                this.$global.loading = false;
            })
        },
        getAbout(id) {
            this.slideLoad = true
            ajax({
                url: `/api/topicLibrary/count/${id}`,
            }).then(({ data }) => {
                const obj = {}
                const s = {
                    typeCount: 1,
                    keyWordCount: 2,
                    publisherCount: 3,
                    placeCount: 4,
                }
                for (let key in data) {
                    const k = s[key]
                    if (k) {
                        const v = data[key]
                        if (k) {
                            if (isArray(v)) {
                                obj[k] = data[key]
                            } else {
                                const arr = []
                                for (let key in v) {
                                    if (key) {
                                        arr.push({
                                            keyWord: key,
                                            count: v[key]
                                        })
                                    }

                                }
                                obj[k] = arr
                            }
                        }
                    }

                }
                this.slides = obj;
            }).finally(() => {
                this.slideLoad = false
            })
        },
        handleAgain(key, v) {
            if (key === 'docType') {
                this.search = {
                    ...this.search,
                    docType: [v],
                }
            } else {
                this.search = {
                    ...this.search,
                    retrieval: key,
                    content: v,
                }
            }
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

                    .item {
                        padding: 12px;
                        border-top: 1px #EEEEEE solid;

                        .title {
                            font-size: 16px;
                            color: #333;
                            line-height: 22px;
                            height: 22px;
                            font-weight: 600;

                            span {
                                padding-left: 5px;
                            }
                        }

                        .list {
                            padding-left: 25px;


                            .again {
                                position: relative;
                                width: 100%;
                                margin-top: 6px;
                                font-size: 14px;
                                color: #888888;
                                height: 22px;
                                line-height: 22px;
                                border-color: $themeColor;
                                padding-left: 16px;

                                &:before {
                                    content: '';
                                    position: absolute;
                                    top: 7px;
                                    left: 0;
                                    width: 8px;
                                    height: 8px;
                                    border-radius: 50%;
                                    border: 1px $themeColor solid;
                                }

                                &::after {
                                    content: '';
                                    position: absolute;
                                    top: 9px;
                                    left: 2px;
                                    width: 4px;
                                    height: 4px;
                                    border-radius: 50%;
                                    background-color: $themeColor ;
                                }

                                &:hover {
                                    color: $themeColor;
                                }
                            }

                            // .el-radio-group {
                            //     ::v-deep .el-radio {
                            //         width: 100%;
                            //         margin-top: 6px;

                            //         .el-radio__label {
                            //             line-height: 22px;
                            //         }

                            //         &.is-checked {
                            //             .el-radio__input {
                            //                 .el-radio__inner {
                            //                     border-color: $themeColor;
                            //                     background-color: $themeColor;
                            //                 }
                            //             }

                            //             .el-radio__label {
                            //                 color: $themeColor;
                            //             }
                            //         }

                            //     }
                            // }
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