<template>
    <div class="search-result">
        <div class="file-list">
            <div class="filter">
                <div class="all">
                    资源列表（{{ pages.pageTotal }}）
                </div>
                <div class="lr">
                    <div class="l">
                        <div :class="['btn handle', icons[sorts[0]]]" @click="handleSort(0)">
                            <span>出版时间</span>
                            <i class="el-icon-caret-right"></i>
                        </div>
                        <div :class="['btn handle', icons[sorts[1]]]" @click="handleSort(1)">
                            <span>上传时间</span>
                            <i class="el-icon-caret-right"></i>
                        </div>
                        <div :class="['btn handle', icons[sorts[2]]]" @click="handleSort(2)">
                            <span>下载次数</span>
                            <i class="el-icon-caret-right"></i>
                        </div>
                    </div>
                    <div class="r">
                        <div :class="['btn type td300', fileShowType == 1 ? 'active' : '']" @click="fileShowType = 1">
                            <i class="iconfont icon-liebiao td300"></i>
                        </div>
                        <div :class="['btn type td300', fileShowType == 2 ? 'active' : '']" @click="fileShowType = 2">
                            <i class="iconfont icon-gengduoyingyong td300"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-body" v-loading="loading">
                <div v-show="fileShowType == 1" class="list">
                    <Book v-for="item in list" :key="item.id" :book="item" @setParam="setParam" />
                </div>
                <div v-show="fileShowType == 2" class="list-card">
                    <BookCard v-for="item in list" :key="item.id" :book="item" />
                </div>
            </div>
            <div class="pages">
                <el-pagination background :current-page="pages.currentPage" :page-size="pages.pageSize"
                    :total="pages.pageTotal" :page-sizes="[5, 10, 20, 30, 50]" layout="sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
        </div>
    </div>
</template>

<script>
import Search from '@/components/search/index.vue'

import Book from './type/book.vue'
import BookCard from './type/book.card.vue'
import { ajax } from '@/api/ajax'

import { isArray } from 'lodash'
import { mapGetters } from 'vuex'
import { rulesT } from 'tqr'
export default {
    name: 'SearchResult',
    props: {
        search: rulesT.Object,
        // 赋值的值
        model: rulesT.Object,
    },
    // v-model 双向绑定
    model: {
        prop: "model",
        event: "change",
    },
    components: {
        Search,
        Book,
        BookCard
    },
    data() {
        return {
            loading: false,
            list: [],
            fileShowType: 1,
            // 
            icons: {
                0: '',
                1: 'active1',
                2: 'active2'
            },
            sortIndex: undefined,
            sorts: [0, 0, 0],
            sortKey: { 0: 'publish_time', 1: 'create_time', 2: 'download_sum' },
            pages: {
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0
            },
        }
    },
    computed: {
        ...mapGetters(['bookTypeJson']),
        searchParam: {
            get() {
                return this.model;
            },
            set(data) {
                this.$emit("change", data);
            },
        },
    },
    watch: {
        searchParam() {
            this.handleSearch()
        }
    },
    created() {
    },
    mounted() {
        this.handleSearch()
    },
    methods: {
        handleSort(index) {
            this.sortIndex = index;
            const num = this.sorts[index] + 1;
            const sorts = [0, 0, 0,]
            if (num > 2) {
                sorts[index] = 0;
                this.sortIndex = undefined
            } else {
                sorts[index] = num
            }
            this.sorts = sorts;
            this.handleSearch()
        },

        setParam({ key, value }) {
            this.searchParam = {
                ...this.searchParam,
                retrieval: key,
                content: value,
            }
            this.handleSearch()
        },
        handleSearch() {
            this.loading = true;
            const { currentPage, pageSize } = this.pages
            const { docType } = this.searchParam;

            const data = {
                ...this.searchParam,
                orderBy: this.sortKey[this.sortIndex],
                sort: [undefined, 'ASC', 'DESC'][this.sorts[this.sortIndex]],
                docType: docType.join(),
            }

            ajax({
                url: `/api/topicLibrary/bookList`,
                data: {
                    ...data,
                    total: true,
                    current: currentPage,
                    pageSize
                }
            }).then(({ data }) => {
                const { list, total } = data;
                this.list = list;
                this.pages.pageTotal = total;

            }).finally(() => {
                this.loading = false;
            })

        },
        handleCurrentChange(i) {
            this.pages.currentPage = i
            this.handleSearch()
        },
        handleSizeChange(i) {
            this.pages.pageSize = i
            this.pages.currentPage = 1
            this.handleSearch()
        },
    }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.search-result {
    .file-list {
        .filter {
            display: flex;
            height: 60px;

            .all {
                width: 178px;
                height: 100%;
                background-color: $themeColor;
                color: #fff;
                text-align: center;
                line-height: 60px;
                font-size: 18px;
            }

            .lr {
                display: flex;
                justify-content: space-between;
                flex-grow: 1;
                background-color: #F5F5F5;
                border: 1px #eee solid;

                .l {
                    display: flex;



                    .handle {
                        width: 120px;
                        height: 100%;
                        color: #fff;
                        text-align: center;
                        line-height: 60px;
                        font-size: 18px;
                        color: #AA7F3D;

                        i {
                            transition-duration: 300ms;
                        }

                        &.active1 {
                            i {
                                transform-origin: center;
                                transform: rotate(90deg);
                            }
                        }

                        &.active2 {
                            i {
                                transform-origin: center;
                                transform: rotate(-90deg);
                            }
                        }
                    }
                }

                .r {
                    display: flex;

                    .type {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 60px;
                        height: 100%;

                        .iconfont {
                            font-size: 26px;
                            color: #6C6D6D;
                        }

                        &:hover,
                        &.active {
                            background-color: #fff;
                            color: $themeColor;

                            .iconfont {
                                color: $themeColor;
                            }
                        }
                    }
                }
            }

        }

        .list {
            border-left: 1px #eee solid;
            border-right: 1px #eee solid;
        }

        .list-card {
            display: flex;
            flex-wrap: wrap;
            padding: 15px 12px;
        }

        .pages {
            padding: 60px 0;
        }
    }
}
</style>