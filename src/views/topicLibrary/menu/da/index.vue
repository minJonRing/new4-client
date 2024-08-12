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
            <div class="nav">
                <div :class="['btn', active == 1 ? 'active' : '']" @click="active = 1">档案系列</div>
                <div :class="['btn', active == 2 ? 'active' : '']" @click="active = 2">文件列表</div>
            </div>
            <el-tree v-show="active == 1" :data="fileDetail.directory" :expand-on-click-node="false"
                @node-click="handleNodeClick"></el-tree>
            <TablePro v-show="active == 2" :bookId="fileDetail.id" :currentIds="currentIds" :fileDetail="fileDetail" />
        </div>
    </div>
</template>

<script>
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
            currentIds: [],
            active: 1
        }
    },
    methods: {
        handleNodeClick(data, node) {
            const { id, children } = data;
            let ids = [];
            if (children && !!children.length) {
                this.getIds(children, ids)
            } else {
                ids.push(id)
            }
            this.currentIds = ids;
            this.active = 2;
        },
        getIds(children, ids = []) {
            children.map(({ id, children }) => {
                if (!children || !children.length) {
                    ids.push(id)
                } else {
                    this.getIds(children, ids)
                }
            })
            return ids
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
            }

            &.open {
                .td300 {
                    transform: rotate(180deg);
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

                    .el-tree-node__label {
                        font-size: 16px;
                        transition-duration: 600ms;
                    }
                }

                &.is-expanded {
                    &>.el-tree-node__content {
                        .el-tree-node__label {
                            color: $themeColor;
                        }
                    }
                }
            }
        }
    }
}
</style>