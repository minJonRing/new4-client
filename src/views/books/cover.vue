<template>
    <div class="cover-box">
        <div class="cover">
            <img :src="file.imageUrl" alt="">
        </div>
        <div class="content">
            <div class="title">{{ file.title }}</div>
            <div class="keys">
                关键词 : <span v-for="i in file.keyWords || []" :key="i">{{ i }}</span>
            </div>
            <div class="info">
                <div v-if="['ts', 'bz', 'da', 'qk', 'tp'].includes(file.docType)" class="item search">
                    主要责任者 : <span class="btn">{{ file.firstResponsible }}</span>
                </div>
                <div v-if="['ts'].includes(file.docType)" class="item search">
                    次要责任者 : <span class="btn">{{ file.secondResponsible }}</span>
                </div>
                <div v-if="['ts', 'bz', 'qk'].includes(file.docType)" class="item search">
                    出版者 : <span class="btn">{{ file.publisher }}</span>
                </div>
                <div v-if="['ts', 'bz', 'da', 'qk'].includes(file.docType)" class="item search">
                    出版地 : <span class="btn">{{ file.place }}</span>
                </div>
                <div v-if="['ts', 'bz', 'tp'].includes(file.docType)" class="item">
                    出版时间 : <span class="btn">{{ file.publishTime ? file.publishTime.replace(/(?=T)|(?=\s).+/g,
                        '').replace(/\-/g, ($1, i) => {
                            if (i == 4) {
                                return '年'
                            } else if (i == 7) {
                                return '月'
                            }
                        }) + '日' : '--' }}</span>
                </div>
                <div v-if="['qk'].includes(file.docType)" class="item">
                    出版周期 : <span class="btn">{{ file.publishCycle }}</span>
                </div>
                <div v-if="['ts', 'qk'].includes(file.docType)" class="item">
                    页数 : <span class="btn">{{ cover.page || '--' }}</span>
                </div>
                <div v-if="['da'].includes(file.docType)" class="item">
                    总卷摘要 : <span class="btn">{{ cover.page || '--' }}</span>
                </div>
                <div v-if="['da'].includes(file.docType)" class="item">
                    起讫时间 : <span class="btn">{{ cover.page || '--' }}</span>
                </div>
                <div v-if="['da', 'tp'].includes(file.docType)" class="item">
                    数量 : <span class="btn">{{ cover.page || '--' }}</span>
                </div>
                <div v-if="['tp'].includes(file.docType)" class="item">
                    时间范围 : <span class="btn">{{ cover.page || '--' }}</span>
                </div>
                <div v-if="['tp'].includes(file.docType)" class="item">
                    附注项 : <span class="btn">{{ cover.page || '--' }}</span>
                </div>
            </div>
            <div class="btns">
                <router-link :to="`/mirador?type=${file.docType}&id=${file.id}`" class="btn">开始阅读</router-link>
                <div class="btn btn-info">引用信息</div>
            </div>
        </div>
        <div class="handle">
            <el-tooltip effect="light" :content="isCollect ? '取消收藏' : '收藏'" placement="left">
                <div class="btn" @click="handleUser('sc')">
                    <i :class="['iconfont', isCollect ? 'icon-shoucang' : 'icon-shoucangxiao']"></i>
                </div>
            </el-tooltip>
            <el-tooltip effect="light" content="下载" placement="left">
                <div class="btn" @click="handleUser('xz')">
                    <i class="iconfont icon-download"></i>
                </div>
            </el-tooltip>
            <el-tooltip effect="light" content="纠错" placement="left">
                <div class="btn" @click="handleUser('jc')">
                    <i class="iconfont icon-xinxi"></i>
                </div>
            </el-tooltip>
        </div>
        <!--  -->
        <Dialog v-model="dialog" center>
            <Login style="transform: translateY(-20%);" @close="handleClose" />
        </Dialog>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Dialog from '@/components/dialog'
import Login from '@/components/login'
import { ajax } from '@/api/ajax'
export default {
    name: 'CoverBox',
    props: {
        file: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
        Dialog,
        Login
    },
    data() {
        return {
            cover: {
                title: '飞鸟集',
                aaa: 22,
                type: 'ts'
            },
            dialog: false

        }
    },
    computed: {
        ...mapGetters(['token', 'collect']),
        isCollect() {
            return this.collect.map(({ id }) => id).includes(this.file.id)
        }
    },
    methods: {
        ...mapActions({ setCollect: 'user/setCollect' }),
        handleUser(type) {
            if (this.token) {
                if (['sc'].includes(type)) {
                    this.$global.loading = true;
                    const { id } = this.file
                    ajax({
                        url: this.isCollect ? `/api/collect/${id}` : `/api/collect`,
                        method: this.isCollect ? 'delete' : 'post',
                        data: {
                            bookId: this.file.id,
                            type: 'book'
                        }
                    }).then(({ data }) => {
                        if (this.isCollect) {
                            this.$notify.success('取消收藏成功!')
                            const data = this.collect.filter(({ id: _id }) => _id != id)
                            this.setCollect(data)
                        } else {
                            this.$notify.success('收藏成功!')
                            this.setCollect([...this.collect, this.file])
                        }


                    }).finally(() => {
                        this.$global.loading = false;
                    })
                } else if (['xz'].includes(type)) {
                    this.$global.loading = true;
                    const { id } = this.file
                    ajax({
                        url: `/api/books/download/${id}`,
                    }).then(({ data }) => {
                        const { url } = data;
                        const downloadElement = document.createElement("a");
                        downloadElement.href = "http://1.116.45.32:9966/library" + url;
                        downloadElement.download = "图书.zip";
                        document.body.appendChild(downloadElement);
                        downloadElement.click(); //点击下载
                        document.body.removeChild(downloadElement); //下载完成移除元素
                    }).finally(() => {
                        this.$global.loading = false;
                    })

                } else {
                    this.$notify.warning('功能待开放...')
                }
            } else {
                this.dialog = true
            }
        },
        handleClose() {
            this.dialog = false
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.cover-box {
    position: relative;
    padding: 12px 22px;
    display: flex;

    .cover {
        position: relative;
        width: 278px;
        height: 377px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 16px rgba(66, 21, 21, .1);
        user-select: none;
        border: 1px transparent solid;
        margin-right: 32px;

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            image-rendering: auto;

        }

        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            box-shadow: inset 4px 0 4px rgba(107, 107, 107, .25);
        }
    }

    .content {
        position: relative;
        width: 600px;

        .title {
            font-size: 26px;
            line-height: 36px;
            color: #333;
            font-weight: 600;
        }

        .keys {
            margin: 18px 0 14px;
            font-size: 18px;
            line-height: 22px;
            font-weight: 600;

            span {
                color: #AA7F3D;
            }
        }

        .info {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .item {
                width: 50%;
                height: 20px;
                font-size: 14px;
                color: #333;
                margin-bottom: 14px;

                span {
                    cursor: default;
                }

                &.search {
                    span {
                        cursor: pointer;
                        color: #AA7F3D;
                    }
                }
            }
        }

        .btns {
            position: absolute;
            bottom: 0;
            left: 0;
            display: flex;

            .btn {
                position: relative;
                width: 112px;
                height: 38px;
                text-align: center;
                line-height: 38px;
                font-size: 16px;
                color: #fff;
                background-color: $themeColor;
                cursor: pointer;
                user-select: none;
                transition-duration: 100ms;

                &+.btn {
                    margin-left: 20px;
                }

                &.btn-info {
                    background-color: #fff;
                    color: $themeColor;

                    &::after {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border: 1px $themeColor solid;
                    }
                }


            }
        }
    }

    .handle {
        position: absolute;
        top: 26px;
        right: 22px;
        width: 46px;

        .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 46px;
            border-radius: 50%;
            background-color: rgba(238, 238, 238, .5);
            backdrop-filter: blur(4px);
            margin-bottom: 16px;
            transition-duration: 300ms;

            .iconfont {
                color: #B0B0B0;
                font-size: 24px;

                &.icon-shoucang {
                    color: $themeColor;
                }
            }

            &:hover {

                background-color: $themeColor;

                .iconfont {
                    color: #fff;
                }
            }
        }
    }
}
</style>