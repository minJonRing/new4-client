<template>
    <div class="img-mirador">
        <div class="body">
            <div class="handle">
                <div class="l">
                    <div class="btn out" @click="handleBack">
                        <i class="el-icon-caret-left"></i>
                        <span>退出阅读</span>
                    </div>
                </div>
                <div v-if="isExitFile" class="r">
                    <!-- <div class="btn">
                        <i class="iconfont icon-download"></i>
                        <span>下载</span>
                    </div>
                    <div class="btn">
                        <i class="iconfont icon-xinxi"></i>
                        <span>纠错</span>
                    </div>
                    <div class="btn">
                        <i class="el-icon-edit-outline"></i>
                        <span>摘录</span>
                    </div> -->
                </div>
            </div>
            <div class="my-read">
                <div v-if="isExitFile" class="has">
                    <div :class="['menu', open ? 'open' : '']">
                        <div class="hand">
                            <div :class="['btn', active === 1 ? 'active' : '']" @click="active = 1">
                                <i class="iconfont icon-menu2"></i>
                            </div>
                            <div :class="['btn', active === 2 ? 'active' : '']" @click="active = 2">
                                <i class="iconfont icon-menu1"></i>
                            </div>
                            <div :class="['btn', active === 3 ? 'active' : '']" @click="active = 3">
                                <i class="iconfont icon-menu"></i>
                            </div>
                        </div>
                        <div class="scroll">
                            <el-tree v-if="active === 1" :data="menu" @node-click="handleNodeClick"></el-tree>
                            <div v-else class="list">
                                <div :class="['item', page == i ? 'active' : '']" v-for="(item, i) in fileList" :key="i"
                                    @click="handleClick(i)">
                                    <img v-if="active === 3" :src="item" alt="">
                                    <div class="text">文件：{{ String(Number(i)).padStart(5, '0') }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <div class="title">
                            <div :class="['btn', open ? 'open' : '']" @click="open = !open">
                                <i class="iconfont icon-ic_open"></i>
                            </div>
                            {{ title }}
                        </div>
                        <canvas class="canvas" :width="open ? 900 : 1080" height="680"></canvas>
                        <div class="page">
                            <el-button type="text" :disabled="!fileList.length || page == 0" @click="handlePrev">
                                <i class="el-icon-d-arrow-left"></i>上一张
                            </el-button>
                            <div>{{ fileList.length ? page + 1 : 0 }}/{{ fileList.length }}</div>
                            <el-button type="text" :disabled="!fileList.length || page == fileList.length - 1"
                                @click="handleNext">
                                下一张<i class="el-icon-d-arrow-right"></i>
                            </el-button>
                        </div>
                    </div>
                </div>
                <Not v-else />
            </div>
        </div>
    </div>
</template>
    
<script>
import { ajax } from '@/api/ajax'
import CanvasMixin from './canvas.js'

import Not from './not.vue'
export default {
    name: "imgMirador",
    mixins: [CanvasMixin],
    components: {
        Not
    },
    data() {
        return {
            initPageId: 0,
            menu: [],
            fileList: [],
            fileIndex: {},
            page: 0,
            // bz
            time: '',
            isAnima: false,
            // 是否存在文件
            isExitFile: true,
            active: 1,
            menuList: [],
            // 展开菜单
            open: false
        }
    },
    computed: {
        title() {
            // const {title} = this.fileList[]
            return null
        }
    },
    watch: {
        open() {
            this.$nextTick(() => {
                this.isExitFile && this.drawImage()
            })

        }
    },
    created() {
        const { type, id, initPageId, time } = this.$route.query;
        if (['ts', 'tp'].includes(type)) {
            this.initPageId = initPageId;
            this.$nextTick(() => {
                this.getDetail(id)
            })
            return;
        }

        if (['bz'].includes(type)) {
            this.time = time;
            this.$nextTick(() => {
                this.getDetailBz(id)
            })
            return;
        }

        if (['da'].includes(type)) {
            this.initPageId = initPageId;
            this.$nextTick(() => {
                this.getDetailDa(id)
            })
            return;
        }

        if (['qk'].includes(type)) {
            this.initPageId = initPageId;
            this.$nextTick(() => {
                this.getDetailQk(id)
            })
            return;
        }



    },
    mounted() {
        requestAnimationFrame(this.animate)
    },
    methods: {
        getDetailBz(id) {
            this.$global.loading = true;
            ajax({
                url: `/api/books/getAllNews`,
                data: {
                    bookId: id
                }
            }).then(({ data }) => {
                const { list } = data;
                const file = [];
                const index = {};
                if (!this.time) {
                    this.time = list[0].date;
                }
                this.menu = list.map(el => {
                    const { id, date, urls } = el;
                    if (date == this.time) {
                        this.initPageId = id;
                    }
                    if (urls) {
                        index[id] = file.length;
                        const urla = urls.split(',')
                        file.push(...urla)
                    }
                    return {
                        ...el,
                        label: date
                    }
                })
                if (!file.length) {
                    this.isExitFile = false;
                    return
                }
                this.fileList = file;
                this.fileIndex = index;
                const ind = index[this.initPageId]
                this.page = ind;
                this.initCanvas(file[ind])
            }).finally(() => {
                this.$global.loading = false;
            })
        },
        getDetailDa(id) {
            this.$global.loading = true;
            ajax({
                url: '/api/books/record/files',
                data: {
                    bookId: id
                }
            }).then(({ data }) => {
                const { list } = data;
                this.menu = list.map(el => {
                    return {
                        ...el,
                        label: el.title
                    }
                })
                const { file, index } = this.filterFile(list);
                if (!file.length) {
                    this.isExitFile = false;
                    return
                }
                if (!this.initPageId) {
                    const keys = Object.keys(index)
                    this.initPageId = keys[0]
                }
                this.fileList = file;
                this.fileIndex = index;
                const ind = index[this.initPageId]
                this.page = ind;
                this.initCanvas(file[ind])
            }).finally(() => {
                this.$global.loading = false;
            })
        },
        getDetailQk(id) {
            this.$global.loading = true;
            ajax({
                url: '/api/books/journal/files',
                data: {
                    bookId: id
                }
            }).then(({ data }) => {
                const { list } = data;
                this.menu = this.filterQk(list)
                const { file, index } = this.filterFile(list);
                if (!file.length) {
                    this.isExitFile = false;
                    return
                }
                if (!this.initPageId) {
                    const keys = Object.keys(index)
                    this.initPageId = keys[0]
                }
                this.fileList = file;
                this.fileIndex = index;
                const ind = index[this.initPageId]
                this.page = ind;
                this.initCanvas(file[ind])
            }).finally(() => {
                this.$global.loading = false;
            })
        },
        filterQk(data) {
            return data.map(el => {
                const { id, title, children } = el
                const obj = {
                    ...el,
                    label: title,
                    children: []
                }
                if (el.children && !!el.children.length) {
                    obj.children = this.filterQk(children)
                }
                return obj
            })
        },
        getDetail(id) {
            this.$global.loading = true;
            ajax({
                url: `/api/books/books/${id}`,
            }).then(({ data }) => {
                const { books } = data;
                const { directory } = books;
                this.menu = directory
                const { file, index } = this.filterFile(directory);

                if (!file.length) {
                    this.isExitFile = false;
                    return
                }
                if (!this.initPageId) {
                    const keys = Object.keys(index)
                    this.initPageId = keys[0] || 0
                }
                this.fileList = file;
                this.fileIndex = index;
                const ind = index[this.initPageId] || 0
                this.page = ind;
                this.initCanvas(file[ind])
            }).finally(() => {
                this.$global.loading = false;
            })
        },
        filterFile(data, file = [], index = {}) {
            for (let i in data) {
                const v = data[i]
                const { children, urls, id } = v;
                if (children && children.length) {
                    this.filterFile(children, file, index)
                } else {
                    if (urls) {
                        index[id] = file.length;
                        const urla = urls.split(',')
                        file.push(...urla)

                    }
                    this.menuList.push(v)
                }
            }
            return {
                file, index
            }
        },
        handleNodeClick(data, node) {
            const { id } = data;
            const { isLeaf } = node;
            if (isLeaf) {
                // 跳转查看图片页面
                const ind = this.fileIndex[id]
                if (ind === undefined) {

                    this.$notify.warning('该条目没有图片文件')
                    return
                }
                this.page = ind
                this.initCanvas(this.fileList[ind])
            }
        },
        handleClick(i) {
            this.page = i + 1
            this.initCanvas(this.fileList[i])
        },
        handlePrev() {
            if (this.page > 0) {
                this.page -= 1;
                this.initCanvas(this.fileList[this.page])
            }
        },
        handleNext() {
            if (this.page < this.fileList.length - 1) {
                this.page += 1;
                this.initCanvas(this.fileList[this.page])
            }
        },
        handleBack() {
            this.$router.back()
        },
        animate(time) {
            if (this.isAnima) {

            }
            requestAnimationFrame(this.animate)
        },
    }
};
</script>
  
<style lang="scss" scoped>
.img-mirador {
    padding: 50px 0;

    .body {
        width: 1200px;
        margin: 0 auto;
        box-shadow: 0 2px 10px rgba(0, 0, 0, .1);

        .handle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 70px;
            background-color: #fff;

            .l {
                height: 100%;

                .btn {
                    font-size: 16px;
                    color: #865A16;
                    line-height: 70px;

                    &.out {
                        padding: 0 20px;
                        height: 100%;
                        border-right: 1px #EEEEEE solid;
                    }
                }
            }

            .r {
                display: flex;

                .btn {
                    font-size: 16px;
                    color: #888;
                    width: 68px;
                    text-align: center;

                    i {
                        padding-right: 3px;
                    }
                }

            }
        }

        .my-read {
            .has {
                display: flex;
                position: relative;
                height: 801px;
                background-color: #fff;
                border-top: 1px #EEEEEE solid;

                .menu {
                    flex-shrink: 0;
                    width: 120px;
                    height: 100%;
                    overflow: auto;
                    // padding: 10px;
                    box-shadow: 2px 0 2px rgba(0, 0, 0, .2);
                    transition-duration: 300ms;

                    .hand {
                        display: flex;
                        justify-content: space-between;
                        height: 60px;
                        border-bottom: 1px #eee solid;
                        padding: 0 20px;
                        margin-bottom: 10px;
                        overflow: hidden;
                        // opacity: 0;

                        .btn {
                            position: relative;
                            display: none;
                            align-items: center;
                            justify-content: center;
                            width: 60px;
                            height: 60px;

                            &::after {
                                content: "";
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                height: 2px;
                                width: 0;
                                background-color: #AA7F3D;
                                transition-duration: 600ms;

                            }

                            .iconfont {
                                font-size: 30px;
                                color: #666;
                                transition-duration: 600ms;

                            }

                            &.active {
                                display: flex;

                                .iconfont {
                                    color: #AA7F3D;
                                }

                                &::after {
                                    width: 100%;
                                }
                            }
                        }
                    }

                    .scroll {
                        height: calc(100% - 70px);

                        .el-tree {
                            ::v-deep .el-tree-node {
                                .el-tree-node__content {
                                    .el-tree-node__label {
                                        overflow: hidden;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                    }
                                }
                            }
                        }

                        .list {
                            .item {
                                display: flex;
                                padding: 8px 8px 8px 16px;
                                cursor: pointer;
                                transition-duration: 600ms;

                                &:hover,
                                &.active {
                                    background-color: #f5f5f5;
                                }

                                img {
                                    display: block;
                                    width: 40px;
                                    height: 50px;
                                    object-fit: cover;
                                }

                                .text {
                                    padding-left: 8px;
                                    font-size: 16px;
                                    color: #333;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                }

                                &+.item {
                                    border-top: 1px #eee solid;
                                }
                            }
                        }
                    }

                    &.open {
                        width: 300px;

                        .hand {

                            // opacity: 1;

                            .btn {
                                display: flex;
                            }
                        }
                    }
                }

                .content {
                    flex-grow: 1;
                    padding: 0;

                    .title {
                        position: relative;
                        height: 60px;
                        box-shadow: 0 2px 2px rgba(0, 0, 0, .2);
                        z-index: 1;

                        .btn {
                            position: relative;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 60px;
                            height: 60px;

                            .iconfont {
                                font-size: 30px;
                                color: #666;
                                transform: matrix(1, 0, 0, 1, 0, 0);
                                transition-duration: 600ms;

                            }

                            &.open {
                                .iconfont {
                                    transform: matrix(-1, 0, 0, 1, 0, 0);
                                }
                            }
                        }
                    }

                    .page {
                        position: relative;
                        height: 60px;
                        box-shadow: 0 -2px 2px rgba(0, 0, 0, .2);
                        z-index: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        .el-button {
                            font-size: 16px;
                            margin: 0 40px;
                        }
                    }

                    .canvas {
                        display: block;
                        width: 100%;
                        height: calc(100% - 120px);
                    }
                }
            }
        }
    }
}
</style>
    