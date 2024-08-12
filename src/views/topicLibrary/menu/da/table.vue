<template>
    <div class="table">
        <div class="search">
            <el-form :model="search" ref="form" inline size="normal">
                <el-form-item>
                    <div class="flex">
                        <el-select v-model="search.retrieval" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input v-model="search.content" placeholder="亲输入" clearable style="margin-left: 10px;" />
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                    <el-button disabled>批量导出</el-button>
                </el-form-item>
            </el-form>

        </div>
        <el-table :data="table" border stripe>
            <el-table-column type="selection" width="55" />
            <el-table-column prop="archiveNumber" label="档案编号">
                <template slot-scope="{row}">
                    <router-link :to="`/mirador?type=${fileDetail.docType}&id=${fileDetail.id}&initPageId=${row.id}`"
                        style="color:#AA7F3D">{{
                            row.archiveNumber }}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="题名">
                <template slot-scope="{row}">
                    <router-link :to="`/mirador?type=${fileDetail.docType}&id=${fileDetail.id}&initPageId=${row.id}`"
                        style="color:#AA7F3D">{{
                            row.title }}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="responsible" label="责任者" />
            <el-table-column prop="keyWords" label="关键词" />
            <el-table-column prop="roundup" label="摘要" />
            <el-table-column prop="time" label="起讫时间" width="180" />
            <el-table-column prop="pages" label="页数" width="50" />
            <el-table-column label="操作" width="80">
                <!-- <template slot-scope="scope"> -->
                <template>
                    <el-button type="text" disabled>导出</el-button>
                </template>
            </el-table-column>

        </el-table>
        <div class="pages">
            <el-pagination background :current-page="pages.currentPage" :page-size="pages.pageSize" :total="pages.pageTotal"
                :page-sizes="[5, 10, 20, 30, 50]" layout="sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script>
import { ajax } from '@/api/ajax'
export default {
    props: {
        bookId: {
            type: Number,
            default: () => 0
        },
        currentIds: {
            type: Array,
            default: () => ([])
        },
        fileDetail: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            initTable: [],
            initFilterTable: [],
            search: {
                retrieval: '',
                content: ''
            },
            options: [
                { value: '', label: '全部' },
                { value: 'archiveNumber', label: '档案编号' },
                { value: 'title', label: '题名' },
                { value: 'keyWords', label: '关键词' },
            ],
            table: [],
            pages: {
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0
            }
        }
    },
    watch: {
        currentIds(data) {
            this.filterTable()
            this.query()
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            ajax({
                url: '/api/books/record',
                data: {
                    bookId: this.bookId
                }
            }).then(({ data }) => {
                const { list } = data;
                this.initTable = list.map(el => ({
                    ...el, time: el.time.replace(/\,/g, '至')
                }));
                this.filterTable()
                this.query()
            }).finally(() => {
            })
        },
        filterTable() {
            const ids = this.currentIds;
            this.initFilterTable = this.initTable.filter(({ directoryId }) => {
                if (ids && ids.length) {
                    return ids.includes(directoryId)
                }
                return true
            })
        },
        query() {
            const param = {
                search: this.search,
                initTable: this.initFilterTable,
            };
            // 分页
            const { currentPage, pageSize } = this.pages;
            const start = (currentPage - 1) * pageSize;
            const end = currentPage * pageSize;
            // 获取匹配的数据
            const { initTable } = this.tableFilter(param);
            // 获取当前的数据
            this.table = initTable.slice(start, end);
            this.pages.pageTotal = initTable.length;
        },
        tableFilter(param) {
            const { search, initTable } = param;
            const { retrieval, content } = search;
            return {
                initTable: initTable.filter(({ archiveNumber, title, keyWords }) => {
                    let isT = true;
                    const t = new RegExp(content)
                    if (!retrieval) {
                        if (content) {
                            isT = t.test(archiveNumber) || t.test(title) || t.test(keyWords)
                        }
                    } else {
                        if (retrieval === 'archiveNumber') {
                            isT = t.test(archiveNumber)
                        } else if (retrieval === 'title') {
                            isT = t.test(title)
                        } else if (retrieval === 'keyWords') {
                            isT = t.test(keyWords)
                        }
                    }
                    return isT
                })
            }
        },
        handleSearch() {
            this.pages.currentPage = 1;
            this.query();
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

.table {
    .pages {
        padding: 12px 0;
    }
}
</style>