<template>
    <div class="menu">
        <div class="handle">
            <div class="label">
                文献目录
            </div>
            <div :class="['btn', open ? '' : 'open']" @click="open = !open">
                <span>{{ open ? '收起详情' : '展开详情' }}</span>
                <i class="el-icon-caret-bottom td300"></i>
            </div>
        </div>
        <div :class="['menu-body', open ? 'active' : '']">
            <div class="menu-handle">
                <div class="btns">
                    <div :class="['btn', active === 1 ? 'active' : '']" @click="active = 1">缩略图展示</div>
                    <div :class="['btn', active === 2 ? 'active' : '']" @click="active = 2">列表展示</div>
                </div>
                <div class="search">
                    <el-input v-model="label" placeholder="请输入检索内容" clearable></el-input>
                    <div class="btn" @click="handleSearch">搜索</div>
                </div>
            </div>
            <div class="table">
                <div v-if="active === 1" class="card-list">
                    <div :class="['card', bindClass(index)]" v-for="(item, index) in table" :key="index"
                        @click="handleLink(item)">
                        <img :src="item.urls" />
                        <div class="label">{{ item.label }}</div>
                    </div>
                </div>
                <el-table v-else :data="table" border stripe>
                    <el-table-column prop="label" label="名称">
                        <template slot-scope="{row}">
                            <el-button type="text" @click="handleLink(row)">{{ row.label }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="generateName" label="拍摄者" />
                    <el-table-column prop="photoTime" label="拍摄时间" />
                    <el-table-column prop="place" label="拍摄地" />
                </el-table>
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
export default {
    props: {
        fileDetail: {
            type: Object,
            default: () => ({ directory: [] })
        }
    },
    data() {
        return {
            open: true,
            list: [],
            table: [],
            label: '',
            active: 1,
            // page
            pages: {
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0
            }
        }
    },
    created() {
        const { directory } = this.fileDetail;
        this.list = directory.map(el => {
            const { urls } = el;
            const urla = urls.split(',')
            return { ...el, urls: urla[0] }
        })
        this.query()
    },
    methods: {
        bindClass(index) {
            const ind = index % 3;
            return `${ind ? 'ml' : ''} ${index >= 3 ? 'mt' : ''}`
        },
        handleLink(data) {
            const { id } = data;
            const { docType, id: bid } = this.fileDetail;
            // 跳转查看图片页面
            this.$router.push(`/mirador?type=${docType}&id=${bid}&initPageId=${id}`)

        },
        query() {
            const param = {
                search: { label: this.label },
                initTable: this.list,
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
        tableFilter(param) {
            const { search, initTable } = param;
            const { label } = search;
            return {
                initTable: initTable.filter(({ label: _label }) => {
                    let isT = true;
                    const t = new RegExp(label)
                    isT = t.test(_label)
                    return isT
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
    }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.menu {
    padding-bottom: 12px;

    .handle {
        display: flex;
        justify-content: space-between;
        padding: 0 22px;

        .label {
            line-height: 34px;
            font-size: 24px;
            color: $themeColor;
        }

        .btn {
            line-height: 34px;
            font-size: 16px;
            color: #AA7F3D;

            .td300 {
                margin-left: 3px;
            }

            &.open {
                .td300 {
                    transform: rotate(180deg);
                }
            }
        }
    }

    .menu-body {
        padding: 24px 22px;
        visibility: hidden;
        height: 0;

        &.active {
            visibility: inherit;
            height: auto;
        }

        .menu-handle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 60px;
            background-color: #f8f8f8;
            --h: 60px;


            .btns {
                display: flex;
                height: 100%;

                .btn {
                    width: 130px;
                    height: 100%;
                    text-align: center;
                    line-height: var(--h);
                    font-size: 18px;
                    color: #AA7F3D;
                    transition-duration: 600ms;

                    &:hover,
                    &.active {
                        color: #fff;
                        background-color: $themeColor;
                    }
                }
            }

            .search {
                display: flex;
                align-items: center;
                height: 50px;

                ::v-deep .el-input {
                    width: 240px;
                    height: 100%;
                    border: 1px #865A16 solid;

                    input {
                        height: 100%;
                        line-height: 48px;
                        border: none;
                    }
                }

                .btn {
                    width: 90px;
                    height: 100%;
                    text-align: center;
                    line-height: 50px;
                    font-size: 18px;
                    color: #865A16;
                    background-color: #E9D4B3;
                    transition-duration: 600ms;
                    margin-left: 12px;
                }
            }
        }

        .table {
            padding: 12px 0;

            .el-table {}

            .card-list {
                display: flex;
                flex-wrap: wrap;

                .card {
                    width: 290px;
                    background-color: #F8F8F8;
                    border-radius: 1px #EEEEEE solid;
                    padding: 18px 24px 0;
                    cursor: pointer;

                    img {
                        display: block;
                        width: 100%;
                        height: 190px;
                        object-fit: cover;
                        image-rendering: auto;
                    }

                    .label {
                        width: 100%;
                        line-height: 25px;
                        text-align: center;
                        font-size: 18px;
                        color: #666;
                        padding: 20px 0;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    &.ml {
                        margin-left: 20px;
                    }

                    &.mt {
                        margin-top: 20px;
                    }
                }
            }
        }
    }
}
</style>