<template>
    <div class="search-result">
        <div style="padding: 50px 0;">
            <Search v-model="search" @search="handleSearch" topic />
        </div>
        <div class="body">
            <div class="left">
                <div class="card card-2">
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
            </div>
            <div class="right">
                <div class="top">
                    <div class="handle">
                        <div class="t">搜索结果</div>
                        <div class="b">
                            <el-checkbox v-model="checked">查看出版时间不详的文献</el-checkbox>
                        </div>
                    </div>
                    <div ref="echarts" class="echarts"></div>
                </div>
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
                                <div :class="['btn type td300', fileShowType == 1 ? 'active' : '']"
                                    @click="fileShowType = 1">
                                    <i class="iconfont icon-liebiao td300"></i>
                                </div>
                                <div :class="['btn type td300', fileShowType == 2 ? 'active' : '']"
                                    @click="fileShowType = 2">
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
                            :total="pages.pageTotal" :page-sizes="[5, 10, 20, 30, 50]"
                            layout="sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                            @current-change="handleCurrentChange" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Search from '@/components/search/index.vue'

import Book from './type/book.vue'
import BookCard from './type/book.card.vue'
import { ajax } from '@/api/ajax'

import * as echarts from 'echarts';
import { isArray } from 'lodash'
import { mapGetters } from 'vuex'
export default {
    name: 'SearchResult',
    components: {
        Search,
        Book,
        BookCard
    },
    data() {
        return {
            loading: false,
            search: {
                docType: [''],
                retrieval: '',
                content: '',
                redFlag: undefined,
                orderBy: undefined,
                sort: undefined
            },
            list: [],
            fileShowType: 1,
            checked: false,
            maps: [],
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
            // slide 侧边
            slides: {},
            slidesKeys: {
                1: { label: '类型', icon: 'icon-leixing', key: 'docType' },
                2: { label: '关键字', icon: 'icon-zhanneisousuoguanjianci', key: 'key_word' },
                3: { label: '出版者', icon: 'icon-yonghu_yonghu', key: 'publisher' },
                4: { label: '出版地', icon: 'icon-qiye', key: 'place' },
            }
        }
    },
    computed: {
        ...mapGetters(['bookTypeJson'])
    },
    watch: {
        maps() {
            this.handleChangeEcharts()
        },
        checked() {
            this.handleChangeEcharts()
        }
    },
    created() {

    },
    mounted() {
        const { docType, retrieval, content, redFlag, orderBy, sort } = this.$route.query;
        let search = {
            docType,
            content,
            retrieval,
            redFlag,
            orderBy,
            sort
        }
        this.handleSearch(search)
    },
    methods: {
        initCharts({ x, v }) {
            var myChart = echarts.init(this.$refs.echarts);
            var option = {
                color: ['#E9D4B3'],
                grid: {
                    top: '70',
                    left: '70',
                    right: '20',
                    bottom: '30'
                },
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: 'category',
                    data: x
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: v,
                        type: 'bar'
                    }
                ]
            };

            myChart.setOption(option);
        },
        getYear(search) {
            ajax({
                url: `/api/books/booksYear`,
                data: {
                    ...search
                }
            }).then(({ data }) => {
                const { map } = data;
                this.maps = map
            })
        },
        getSlide(search) {

            ajax({
                url: `/api/books/booksCount`,
                data: {
                    ...search
                }
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
                this.slides = obj;
            })
        },
        handleChangeEcharts() {
            let o = {
                x: [],
                v: []
            }
            let num = 0
            this.maps.map(({ year, publishCount }) => {
                if (!this.checked) {
                    if (year) {
                        o.x.push(year)
                        o.v.push(publishCount)
                    }
                } else {
                    if (!year) {
                        num = num + publishCount
                    }
                }
            })

            if (this.checked) {
                o = {
                    x: ['未知'],
                    v: [num]
                }
            }
            this.initCharts(o)
        },
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
            // const { docType } = this.search;
            this.search = {
                ...this.search,
                retrieval: key,
                content: value,
            }
            this.handleSearch()
        },
        handleSearch(search) {
            this.loading = true;
            const { currentPage, pageSize } = this.pages
            const { docType } = this.search;
            const data = search ? search : {
                ...this.search,
                orderBy: this.sortKey[this.sortIndex],
                sort: [undefined, 'ASC', 'DESC'][this.sorts[this.sortIndex]],
                docType: docType.join(),
            }

            ajax({
                url: `/api/books/books`,
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
                this.$nextTick(() => {
                    document.documentElement.scrollTop = 0
                })

            }).finally(() => {
                this.loading = false;
            })

            this.getYear(data)
            this.getSlide(data)
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
            this.handleSearch()
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
    .body {
        display: flex;
        align-items: flex-start;
        width: 1200px;
        margin: 0 auto;

        .left {
            width: 232px;
            margin-right: 14px;
            background-color: #fff;

            .card {
                position: relative;
                border: 1px #EEE solid;

                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background-color: #BC212F;
                }

                &.card-2 {
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
            }
        }

        .right {
            width: 954px;
            background-color: #fff;

            .top {
                position: relative;
                height: 206px;
                margin-bottom: 30px;
                // background-color: #ddd;

                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background-color: #BC212F;
                }

                .handle {
                    position: absolute;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    z-index: 1;
                    padding: 12px 20px;

                    .t {
                        font-size: 24px;
                        color: $themeColor;
                        line-height: 34px;
                        font-weight: 600;
                    }

                    .b {
                        display: flex;
                        align-items: center;
                        color: $themeColor;
                        font-size: 14px;

                        ::v-deep .el-checkbox.is-checked {
                            span {
                                color: $themeColor;
                            }

                            .el-checkbox__inner {
                                background-color: $themeColor;
                                border-color: $themeColor;
                            }
                        }
                    }
                }

                .echarts {
                    height: 100%;
                }
            }

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
                                color: #888;

                                i {
                                    transition-duration: 300ms;
                                }

                                &.active1 {
                                    color: #AA7F3D;

                                    i {
                                        transform-origin: center;
                                        transform: rotate(90deg);
                                    }
                                }

                                &.active2 {
                                    color: #AA7F3D;

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
    }
}
</style>