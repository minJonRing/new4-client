<template>
    <div class="book">
        <div class="content">
            <div class="cover">
                <router-link :to="`/file?id=${file.id}`" target="">
                    <img :src="file.imageUrl" alt="">
                </router-link>
            </div>
            <div class="base">
                <div class="label">
                    <router-link class="title btn" :to="`/file?id=${file.id}`" target="">{{ file.title
                    }}</router-link>
                    <div class="down">下载了 : {{ file.downloadSum || 0 }}次</div>
                </div>
                <div class="keys">
                    关键词 : <span class="btn" v-for="i in file.keyWords || []" @click="handleSearch('keyWords', i)"
                        :key="i">{{ i }}</span>
                </div>
                <div class="info">
                    <div v-if="['ts', 'bz', 'da', 'qk', 'tp'].includes(file.docType)" class="item search">
                        主要责任者 : <span class="btn" v-for="i in file.firstResponsible || []" :key="i"
                            @click="handleSearch('responsible', i)">{{
                                i }}</span>
                    </div>
                    <div v-if="['ts'].includes(file.docType)" class="item search">
                        次要责任者 : <span class="btn" v-for="i in file.secondResponsible || []" :key="i"
                            @click="handleSearch('responsible', i)">{{
                                i }}</span>
                    </div>
                    <div v-if="['ts', 'bz', 'qk'].includes(file.docType)" class="item search">
                        出版者 : <span class="btn" @click="handleSearch('publisher', file.publisher)">{{ file.publisher
                        }}</span>
                    </div>
                    <div v-if="['ts', 'bz', 'da', 'qk'].includes(file.docType)" class="item search">
                        出版地 : <span class="btn" @click="handleSearch('place', file.place)">{{ file.place
                        }}</span>
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
                        页数 : <span class="btn">{{ file.page || '--' }}</span>
                    </div>
                    <div v-if="['da'].includes(file.docType)" class="item">
                        总卷摘要 : <span class="btn">{{ file.page || '--' }}</span>
                    </div>
                    <div v-if="['da'].includes(file.docType)" class="item">
                        起讫时间 : <span class="btn">{{ file.page || '--' }}</span>
                    </div>
                    <div v-if="['da', 'tp'].includes(file.docType)" class="item">
                        数量 : <span class="btn">{{ file.page || '--' }}</span>
                    </div>
                    <div v-if="['tp'].includes(file.docType)" class="item">
                        时间范围 : <span class="btn">{{ file.page || '--' }}</span>
                    </div>
                    <div v-if="['tp'].includes(file.docType)" class="item">
                        附注项 : <span class="btn">{{ file.page || '--' }}</span>
                    </div>
                </div>
                <div class="handle">
                    <router-link class="btn" :to="`/file?id=${file.id}`" target="">查看详情</router-link>
                    <!-- <div class="btn read">开始阅读</div> -->
                    <router-link class="btn read" :to="`/mirador?type=${file.docType}&id=${file.id}`">开始阅读</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'Footer',
    props: {
        book: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
        }
    },
    computed: {
        file() {
            const { firstResponsible, secondResponsible } = this.book;
            return {
                ...this.book,
                firstResponsible: (firstResponsible || '').replace(/\,|\，/g, ',').split(','),
                secondResponsible: (secondResponsible || '').replace(/\,|\，/g, ',').split(','),
            }
        }
    },
    created() {
    },
    methods: {
        handleSearch(key, value) {
            this.$emit('setParam', { key, value })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.book {
    height: 275px;
    border-bottom: 1px #eee solid;
    padding: 30px 22px;
    transition-duration: 300ms;

    .content {
        position: relative;
        display: flex;
        width: 100%;

        .cover {
            flex-shrink: 0;
            position: relative;
            width: 162px;
            height: 215px;
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0 4px 16px rgba(66, 21, 21, .1);
            user-select: none;

            border: 1px transparent solid;

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

            margin-right: 18px;
        }

        .base {
            position: relative;
            flex-grow: 1;
            width: 728px;


            .label {
                display: flex;
                color: #333;
                line-height: 34px;
                height: 34px;

                .title {
                    flex-grow: 1;
                    font-size: 24px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    padding-right: 20px;
                    font-weight: 500;
                }

                .down {
                    flex-shrink: 0;
                    font-size: 16px;
                    font-weight: 600;
                }
            }

            .keys {
                line-height: 30px;
                font-weight: 600;
                font-size: 18px;
                margin-bottom: 10px;


                span {
                    position: relative;
                    color: #AA7F3D;
                    letter-spacing: 1px;

                    &+span {
                        padding-left: 10px;


                        &::after {
                            content: ',';
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 10px;
                            height: 100%;
                            text-align: center;
                            line-height: 1;
                            color: #000;
                            font-size: 20px;
                        }
                    }
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
                    margin-bottom: 10px;

                    span {
                        cursor: default;
                    }

                    &.search {
                        span {
                            position: relative;
                            cursor: pointer;
                            color: #AA7F3D;

                            &+span {
                                padding-left: 10px;

                                &::after {
                                    content: ',';
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 10px;
                                    height: 100%;
                                    text-align: center;
                                    line-height: 0.4;
                                    color: #000;
                                    font-size: 20px;
                                }
                            }
                        }
                    }
                }
            }


        }

        .handle {
            position: absolute;
            bottom: 0;
            right: 0;
            display: flex;

            .btn {
                width: 112px;
                height: 38px;
                text-align: center;
                line-height: 38px;
                font-size: 16px;
                color: #865A16;
                background-color: #E9D4B3;
                cursor: pointer;
                user-select: none;
                transition-duration: 100ms;

                &+.btn {
                    margin-left: 20px;
                }

                &.read {
                    background-color: $themeColor;
                    color: #fff;
                }
            }
        }
    }

    &:hover {
        // box-shadow: 0 0 6px rgba(0, 0, 0, .3);
    }
}
</style>