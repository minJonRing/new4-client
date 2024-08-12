<template>
    <div class="menu">
        <div class="handle">
            <div class="label">
                目录
            </div>
            <div :class="['btn', open ? '' : 'open']" @click="open = !open">
                <span>{{ open ? '收起详情' : '展开详情' }}</span>
                <i class="el-icon-caret-bottom td300"></i>
            </div>
        </div>
        <div :class="['menu-body', open ? 'active' : '']">
            <div class="nav">
                <div :class="['btn', active == 1 ? 'active' : '']" @click="active = 1">全部内容</div>
                <!-- <div :class="['btn', active == 2 ? 'active' : '']" @click="active = 2">文件列表</div> -->
            </div>
            <div v-show="active == 1">
                <TablePro v-show="!isTree" :fileDetail="fileDetail" @changeTree="handleTree" />
                <div v-show="isTree">
                    <el-button icon="el-icon-arrow-left" @click="isTree = false"
                        style="font-size:16px;margin-bottom:10px">返回目录</el-button>
                    <el-skeleton v-if="loading" />
                    <el-tree v-else :data="menu" @node-click="handleNodeClick">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span :class="['label', getClass(node)]" :style="getSize(node)">{{ data.label }}</span>
                        </span></el-tree>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { ajax } from '@/api/ajax';
import TablePro from './table.vue'
export default {
    props: {
        fileDetail: {
            type: Object,
            default: () => ({ directory: [] })
        }
    },
    components: {
        TablePro
    },
    data() {
        return {
            open: true,
            active: 1,
            isTree: false,
            menu: [],
            loading: false
        }
    },
    methods: {
        handleNodeClick(data, node) {
            const { id } = data;
            const { isLeaf } = node;
            if (isLeaf) {
                const { docType, id: bid } = this.fileDetail
                // 跳转查看图片页面
                this.$router.push(`/mirador?type=${docType}&id=${bid}&initPageId=${id}`)
            }
        },
        handleTree(i) {
            const { id } = i;
            this.loading = true;
            ajax({
                url: '/api/books/journal',
                data: {
                    bookId: this.fileDetail.id,
                    directoryId: id
                }
            }).then(({ data }) => {
                const { list } = data;
                this.menu = this.filterMenu(list);
            }).finally(() => {
                this.loading = false
            })
            this.isTree = true
        },
        filterMenu(data) {
            return data.map(el => {
                const { title, children } = el;
                const obj = {
                    ...el,
                    label: title,
                    children: []
                }
                if (children && children.length) {
                    obj.children = this.filterMenu(children)
                }
                return obj;
            })
        },
        getSize(node) {
            const { level, isLeaf } = node;
            const key = level === 1 ? 1 : isLeaf ? 3 : 2;
            const size = {
                1: '16px',
                2: '14px',
                3: '12px'
            }
            return { 'font-size': size[key] }
        },
        getClass(node) {
            const { level, isLeaf } = node;
            const key = level === 1 ? 1 : isLeaf ? 3 : 2;
            const cla = {
                1: 'a',
                2: 'b',
                3: 'c'
            }
            return cla[key]
        }
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
                transform: rotate(180deg);
            }

            &.open {
                .td300 {
                    transform: rotate(0);
                }
            }
        }
    }

    .menu-body {
        visibility: hidden;
        height: 0;
        overflow: hidden;

        &.active {
            padding: 24px 22px;
            visibility: inherit;
            height: auto;
        }

        .nav {
            display: flex;
            height: 60px;
            background-color: #f8f8f8;
            margin-bottom: 24px;

            .btn {
                width: 116px;
                line-height: 60px;
                text-align: center;
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

        .el-tree {
            ::v-deep .el-tree-node {
                .el-tree-node__content {
                    margin: 3px 0;

                    .custom-tree-node {


                        .label {
                            position: relative;
                            transition-duration: 600ms;

                            &::after {
                                content: "";
                                position: absolute;
                                top: calc(100% + 5px);
                                left: 0;
                                width: 0;
                                height: 1px;
                                background-color: $themeColor;
                                transition-duration: 600ms;
                            }

                        }

                        .a {
                            color: #333;
                        }

                        .b {
                            color: #666;
                        }

                        .c {
                            color: #999;
                        }
                    }

                    &:hover {
                        .custom-tree-node {
                            .label {
                                &.c {
                                    color: $themeColor;

                                    &::after {
                                        width: 100%;
                                    }
                                }
                            }
                        }
                    }
                }

                &.is-expanded {
                    &>.el-tree-node__content {
                        .custom-tree-node {
                            .label {
                                color: $themeColor;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>