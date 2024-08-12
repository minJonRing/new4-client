<template>
    <div class="a">
        <div class="head">
            <div class="label">我的收藏</div>
            <!-- <div class="btn">新建</div> -->
        </div>
        <div class="search">
            <el-form :model="search" ref="form" inline size="normal">
                <el-form-item label="文献名称">
                    <el-input v-model="search.title" placeholder="情输入" clearable />
                </el-form-item>
                <el-form-item label="文献类型">
                    <el-select v-model="search.docType" value-key="value" multiple collapse-tags placeholder="请选择" clearable
                        filterable>
                        <el-option v-for="item in bookType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <div class="btn" @click="handleSearch">查询</div>
                    <div class="btn re" @click="handleReset">重置</div>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="table" border stripe>
            <el-table-column prop="title" label="文献名称" min-width="100">
                <template slot-scope="{row}">
                    <router-link v-if="row.creator" :to="`/topic?id=${row.id}`" style="color: #1890ff;">{{ row.name
                    }}</router-link>
                    <router-link v-else :to="`/file?id=${row.id}`" style="color: #1890ff;">{{ row.title }}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="docType" label="文献类型" :formatter="(row) => {
                return this.bookTypeJson[row.docType]
            }" />
            <el-table-column label="操作" width="120">
                <template slot-scope="{row}">
                    <el-popconfirm title="取消删除？" placement="top" @confirm="handleCancel(row)">
                        <el-button slot="reference" type="text" style="color: red">
                            取消收藏
                        </el-button>
                    </el-popconfirm>
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
import { mapGetters, mapActions } from "vuex";
import { ajax } from '@/api/ajax'
export default {
    name: "List",
    props: {
    },
    data() {
        return {
            search: {
                title: '',
                docType: []
            },
            initSearch: {
                title: '',
                docType: []
            },
            table: [],
            pages: {
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0
            }
        };
    },
    computed: {
        ...mapGetters(['bookType', 'bookTypeJson', 'collect']),
    },
    watch: {
        collect() {
            this.handleSearch()
        }
    },
    created() {
        this.handleSearch()
    },
    methods: {
        ...mapActions({ setCollect: 'user/setCollect' }),
        handleCancel(i) {
            const { id, creator } = i
            this.$global.loading = true;
            ajax({
                url: `/api/collect/${id}`,
                method: 'delete',
                data: {
                    type: 'book'
                }
            }).then(() => {
                this.$notify.success('取消收藏成功!')
                const data = this.collect.filter(({ id: _id }) => _id != id)
                this.setCollect(data)

            }).finally(() => {
                this.$global.loading = false;
            })
        },
        query() {
            const param = {
                search: this.search,
                initTable: this.collect,
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
        handleSearch() {
            this.pages.currentPage = 1;
            this.query();
        },
        handleReset() {
            this.search = { ...this.initSearch };
            this.handleSearch()
        },
        tableFilter(param) {
            const { search, initTable } = param;
            const { title, docType } = search;
            return {
                initTable: initTable.filter(({ title: _title, docType: _docType }) => {
                    let isT = true;
                    let isD = true;
                    const t = new RegExp(title)
                    isT = t.test(_title)
                    if (docType.length) {
                        isD = docType.includes(_docType)
                    }
                    return isT && isD
                })
            }
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
    },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.a {
    width: 100%;
    padding: 30px 40px;

    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .label {
            font-size: 26px;
            line-height: 38px;
            color: #333;
            font-weight: 600;
        }

        .btn {
            width: 128px;
            height: 38px;
            background-color: $themeColor;
            color: #fff;
            font-size: 16px;
            text-align: center;
            line-height: 38px;
        }
    }

    .search {
        padding: 20px 0 2px;

        .btn {
            display: inline-block;
            width: 112px;
            height: 40px;
            border: 1px $themeColor solid;
            color: #fff;
            background-color: $themeColor ;
            text-align: center;
            line-height: 38px;

            &.re {
                background-color: #fff;
                color: $themeColor;
            }

            &+.btn {
                margin-left: 10px;
            }
        }
    }

    .pages {
        padding: 30px 0;
    }
}
</style>
  