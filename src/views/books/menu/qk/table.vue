<template>
    <div class="table">
        <div class="item" v-for="(item, key) in table" :key="key">
            <!-- <div class="title">{{ fileDetail.title }}</div> -->
            <div class="body">
                <div class="year">{{ key }}</div>
                <div class="list">
                    <div :class="['case btn', active == i.id ? 'active' : '', setClass(j)]" v-for="(i, j) in item"
                        :key="i.id" @click="handleClick(i)">{{
                            i.directory }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ajax } from '@/api/ajax'
export default {
    props: {
        fileDetail: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {

            table: {},
            active: 0
        }
    },
    created() {
        this.table = this.fileDetail.directory[0]
    },
    methods: {
        setClass(i) {
            const ind = i % 3;
            return `${ind ? 'ml' : ''} ${i > 2 ? 'mt' : ''}`
        },
        handleClick(i) {
            this.active = i.id;
            this.$emit('changeTree', i)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.table {
    .item {
        padding: 12px 0;
        background-color: #f8f8f8;
        border: 1px #EEEEEE solid;
        padding: 24px;

        .title {
            font-size: 20px;
            color: #333333;
            text-align: center;
            line-height: 1;
            padding-bottom: 24px;
        }

        .body {
            display: flex;
            align-items: flex-start;

            .year {
                flex-shrink: 0;
                font-size: 18px;
                color: #333;
                line-height: 40px;
                height: 40px;
                width: 50px;
                text-align: center;
                overflow: hidden;
                margin-right: 10px;
            }

            .list {
                flex-grow: 1;
                display: flex;
                flex-wrap: wrap;

                .case {
                    width: 260px;
                    height: 40px;
                    background-color: #E9D4B3;
                    text-align: center;
                    line-height: 40px;
                    font-size: 16px;
                    color: #865A16;
                    transition-duration: 600ms;

                    &.ml {
                        margin-left: 10px;
                    }

                    &.mt {
                        margin-top: 10px;
                    }

                    &.active,
                    &:hover {
                        background-color: $themeColor;
                        color: #fff;
                    }
                }
            }
        }

        &+.item {
            margin-top: 24px;
        }
    }
}
</style>