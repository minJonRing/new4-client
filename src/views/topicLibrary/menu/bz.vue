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
            <div class="time year">
                <div class="title">年份</div>
                <div class="scroll">
                    <div class="list">
                        <div :class="['item', year === item ? 'active' : '']" v-for="item in years" :key="item"
                            @click="handleYear(item)">{{ item }}</div>
                    </div>
                </div>
            </div>
            <div class="time month">
                <div class="title">月份</div>
                <div class="scroll">
                    <div class="list">
                        <div :class="['item', bindMonthClass(item)]" v-for="item in months" :key="item"
                            @click="handleMonth(item)">{{ item }}</div>
                    </div>
                </div>
            </div>
            <div class="date">
                <div class="th">
                    <div class="td">周日</div>
                    <div class="td">周一</div>
                    <div class="td">周二</div>
                    <div class="td">周三</div>
                    <div class="td">周四</div>
                    <div class="td">周五</div>
                    <div class="td">周六</div>
                </div>
                <div class="tr">
                    <div :class="['td', bindClass(item, i)]" v-for="(item, i) in days" :key="i"
                        @click="handleNodeClick(item)">{{ item }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ajax } from '@/api/ajax';
export default {
    props: {
        fileDetail: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            open: true,
            years: [],
            year: '',
            months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',],
            monthCan: [],
            month: '',
            days: [],
            dayCan: ['1', '22', '23', '24']
        }
    },
    created() {
        const { directory } = this.fileDetail;
        if (directory) {
            const { years, months } = directory[0] || {};
            this.years = years;
            this.year = years?.[0]

            this.monthCan = months;
            this.month = months?.[0]
            this.handleGetDay()
        }

    },
    methods: {
        bindMonthClass(item) {
            return `${this.month === item ? 'active' : ''} ${this.monthCan.includes(item) ? 'can' : ''}`
        },
        bindClass(item, i) {
            const m = i % 7;
            return `${m ? 'ml' : ''} ${i > 6 ? 'mt' : ''} ${this.dayCan.includes(item) ? 'can' : ''}`
        },
        handleYear(data) {
            this.year = data;
            this.$global.loading = true
            ajax({
                url: '/api/books/getMonth',
                data: {
                    bookId: this.fileDetail.id,
                    year: data
                }
            }).then(({ data }) => {
                const { list } = data;
                this.month = list?.[0]
                this.monthCan = list;
                this.handleGetDay()
            }).finally(() => {
                this.$global.loading = false
            })

        },
        handleMonth(data) {
            if (this.monthCan.includes(data)) {
                this.month = data;
                this.handleGetDay()
            }
        },
        handleGetDay() {
            let year = +this.year;
            let month = +this.month;
            const day = new Date(year, month, 0).getDate()
            let m = month - 1
            const week = new Date(year, m, 1).getDay();
            // days
            const days = []
            days.push(...new Array(week).fill(''))
            for (let i = 1; i <= day; i++) {
                const d = i < 10 ? '0' + i : i + ''
                days.push(d)
            }
            this.days = days;
            ajax({
                url: '/api/books/news',
                data: {
                    bookId: this.fileDetail.id,
                    year: this.year,
                    month: this.month
                }
            }).then(({ data }) => {
                const { list } = data;
                this.dayCan = list.map(({ day }) => day)
            })
        },
        handleNodeClick(data) {
            if (this.dayCan.includes(data)) {
                const { docType, id } = this.fileDetail
                // 跳转查看图片页面
                this.$router.push(`/mirador?type=${docType}&id=${id}&time=${this.year}-${this.month}-${data}`)
            }
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
        padding: 24px 22px;
        display: flex;
        justify-content: space-between;
        visibility: hidden;
        height: 0;
        overflow: hidden;

        &.active {
            visibility: inherit;
            height: auto;
        }

        .time {
            width: 130px;

            .title {
                height: 70px;
                text-align: center;
                line-height: 70px;
                font-size: 20px;
                color: #333;
                background-color: #e9e9e9;
            }

            .scroll {
                margin-top: 10px;
                height: 551px;
                overflow: auto;

                .list {
                    .item {
                        height: 45px;
                        text-align: center;
                        line-height: 45px;
                        font-size: 20px;
                        color: #999;
                        background-color: #f8f8f8;
                        cursor: not-allowed;
                        transition-duration: 600ms;

                        &~.item {
                            margin-top: 1px;
                        }
                    }
                }
            }

            &.year {
                .scroll {
                    .list {
                        .item {
                            background-color: #E9D4B3;
                            color: #865A16;
                            cursor: pointer;

                            &.active,
                            &:hover {
                                background-color: $themeColor;
                                color: #fff;
                            }

                            &:hover {
                                opacity: 0.7;
                            }
                        }
                    }
                }
            }

            &.month {
                .scroll {
                    .list {
                        .item {
                            &.can {
                                background-color: #E9D4B3;
                                color: #865A16;
                                cursor: pointer;

                                &:hover {
                                    opacity: 0.7;
                                    background-color: $themeColor;
                                    color: #fff;
                                }
                            }

                            &.active {
                                background-color: $themeColor;
                                color: #fff;
                            }


                        }
                    }
                }

            }
        }

        .date {
            width: 622px;

            .th {
                display: flex;

                .td {
                    width: 90px;
                    height: 70px;
                    text-align: center;
                    line-height: 70px;
                    font-size: 20px;
                    color: #333;
                    background-color: #e9e9e9;

                }
            }

            .tr {
                display: flex;
                flex-wrap: wrap;
                margin-top: 10px;

                .td {
                    width: 88px;
                    height: 78px;
                    text-align: center;
                    line-height: 78px;
                    font-size: 20px;
                    color: #333;
                    background-color: #f8f8f8;
                    cursor: not-allowed;

                    &.ml {
                        margin-left: 1px;
                    }

                    &.mt {
                        margin-top: 1px;
                    }

                    &.can {
                        background-color: #E9D4B3;
                        color: #865A16;
                        cursor: pointer;

                        &:hover {
                            opacity: 0.7;
                            background-color: $themeColor;
                            color: #fff;
                        }
                    }

                    &.active {
                        background-color: $themeColor;
                        color: #fff;
                    }
                }
            }
        }

    }
}
</style>