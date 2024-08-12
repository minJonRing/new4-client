<template>
    <div class="book">
        <div class="content">
            <div class="cover">
                <router-link :to="`/topic?id=${file.id}`" target="">
                    <img :src="file.coverUrl" alt="">
                </router-link>
            </div>
            <div class="base">
                <div class="label">
                    <router-link class="title btn" :to="`/topic?id=${file.id}`" target="">{{ file.name
                    }}</router-link>
                    <div class="down">收藏量 : {{ file.downloadSum || 0 }}次</div>
                </div>

                <div class="info">
                    <div class="item search">
                        创建人: {{ file.creator }}
                    </div>
                    <div class="item search">
                        创建时间: {{ file.createTime }}
                    </div>
                    <div class="jj">
                        <div class="h">专题库简介: </div><span>{{ file.briefIntroduce || '--' }}</span>
                    </div>
                </div>
                <div class="handle">
                    <router-link class="btn read" :to="`/topic?id=${file.id}`" target="">专题库详情</router-link>
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
                margin-bottom: 10px;

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
                    line-height: 20px;
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

                .jj {
                    display: flex;
                    align-items: flex-start;
                    font-size: 14px;
                    line-height: 20px;

                    .h {
                        flex-shrink: 0;
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
        box-shadow: 0 0 6px rgba(0, 0, 0, .3);
    }
}
</style>