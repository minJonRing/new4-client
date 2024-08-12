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
            <el-tree :data="fileDetail.directory" @node-click="handleNodeClick">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span :class="['label', getClass(node)]" :style="getSize(node)">{{ data.label }}</span>
                </span>
            </el-tree>
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

        }
    },
    methods: {
        handleNodeClick(data, node) {
            const { id } = data;
            const { isLeaf } = node;
            if (isLeaf) {
                const { docType, id: bid } = this.fileDetail
                // 跳转查看图片页面
                this.$router.push({ path: `/mirador?type=${docType}&id=${bid}&initPageId=${id}` });
                // const { href } = this.$router.resolve({ path: `/mirador?type=${docType}&id=${bid}&initPageId=${id}` });
                // window.open(href, '_blank');
            }
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