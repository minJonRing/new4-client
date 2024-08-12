<template>
    <div class="cover-box">
        <div class="cover">
            <img :src="file.coverUrl" alt="">
        </div>
        <div class="content">
            <div class="title">{{ file.name }}</div>
            <div class="info">
                <div class="item">
                    创建者 : <span class="btn">{{ file.creator }}</span>
                </div>
                <div class="item">
                    创建时间 : <span class="btn">{{ file.createTime }}</span>
                </div>
                <div class="item">
                    图书 : <span class="btn">{{ file.typeCount }}</span>
                </div>
                <div class="jj">
                    <div class="h">专题库简介：</div><span>{{ file.briefIntroduce || '--' }}</span>
                </div>
            </div>
        </div>
        <div class="handle">
            <el-tooltip effect="light" :content="isCollect ? '取消收藏' : '收藏'" placement="left">
                <div class="btn" @click="handleUser('sc')">
                    <i :class="['iconfont', isCollect ? 'icon-shoucang' : 'icon-shoucangxiao']"></i>
                </div>
            </el-tooltip>
        </div>
        <!--  -->
        <Dialog v-model="show" center>
            <Login style="transform: translateY(-20%);" />
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
            },
            show: false

        }
    },
    computed: {
        ...mapGetters(['token', 'collectTopic']),
        isCollect() {
            return this.collectTopic.map(({ id }) => id).includes(this.file.id)
        }
    },
    methods: {
        ...mapActions({ setCollectTopic: 'user/setCollectTopic' }),
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
                            type: 'topic'
                        }
                    }).then(({ data }) => {
                        if (this.isCollect) {
                            this.$notify.success('取消收藏成功!')
                            const data = this.collectTopic.filter(({ id: _id }) => _id != id)
                            this.setCollectTopic(data)
                        } else {
                            this.$notify.success('收藏成功!')
                            this.setCollectTopic([...this.collectTopic, this.file])
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
                this.show = true
            }
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
            margin-bottom: 20px;
        }

        .info {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .item {
                width: 50%;
                height: 20px;
                font-size: 14px;
                line-height: 20px;
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

        .jj {
            width: 100%;
            display: flex;
            align-items: flex-start;
            font-size: 14px;
            line-height: 20px;

            .h {
                flex-shrink: 0;
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