<template>
    <div class="search">
        <div class="content">
            <el-checkbox-group v-model="searchData.docType" @change="handleChange">
                <el-checkbox-button v-for="item in checkList" :key="item.value" :label="item.value">{{ item.label
                }}</el-checkbox-button>
            </el-checkbox-group>
            <div class="mid">
                <div class="input">
                    <el-input v-model="searchData.content" size="medium" clearable placeholder="请输入您想查询的内容" />
                </div>
                <el-button type="primary" size="medium" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button v-if="topic" type="primary" size="medium" @click="handleTopic">专题库</el-button>
            </div>
            <el-radio-group v-model="searchData.retrieval">
                <el-radio v-for="item in typeList" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { rulesT } from 'tqr'
export default {
    props: {
        model: rulesT.Any,
        topic: rulesT.Boolean
    },
    data() {
        return {
            typeList: [
                { value: '', label: '全部' },
                { value: 'title', label: '题名' },
                { value: 'key_word', label: '关键词' },
                { value: 'responsible', label: '责任者' },
                { value: 'publisher', label: '出版者' },
                { value: 'place', label: '出版地' },
            ]
        }
    },
    // v-model 双向绑定
    model: {
        prop: "model",
        event: "change",
    },
    computed: {
        ...mapGetters(['search', 'bookType']),
        // 当前页面绑定值
        searchData: {
            get() {
                return this.model;
            },
            set(data) {
                this.$emit("change", data);
            },
        },
        checkList() {
            return [{ value: '', label: '全部' }, ...this.bookType]
        }
    },
    methods: {
        ...mapActions({ toggleSearch: 'app/toggleSearch' }),
        click() {
            this.toggleSearch(false)

        },
        handleSearch() {
            // this.toggleSearch(false)
            // this.$router.push('/searchResult')
            this.$emit('search')
        },
        handleChange(e) {
            const len = e.length;
            if (len > 1) {
                const last = e.indexOf('');
                if (len === last + 1) {
                    this.searchData = {
                        ...this.searchData,
                        docType: ['']
                    }

                } else if (last > -1) {
                    this.searchData = {
                        ...this.searchData,
                        docType: e.filter(i => i != '')
                    }
                }
            }
            if (!e.length) {
                this.searchData = {
                    ...this.searchData,
                    docType: ['']
                }
            }
        },
        handleTopic() {
            this.$router.push('/topic-library')
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.search {
    width: 100%;
    // background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    .content {

        .el-checkbox-group {
            ::v-deep .el-checkbox-button {
                width: 78px;
                height: 40px;
                margin-right: 3px;


                .el-checkbox-button__inner {
                    width: 100%;
                    height: 100%;
                    border-radius: 0;
                    line-height: 40px;
                    padding: 0;
                    font-size: 18px;
                    color: #333;
                    border: none;
                    background-color: #eee;
                    box-shadow: 0 0 0 #fff;
                }

                &.is-checked {
                    .el-checkbox-button__inner {
                        color: #fff;
                        background-color: $themeColor;
                    }
                }
            }
        }

        .mid {
            display: flex;
            align-items: center;
            justify-content: center;
            user-select: none;
            height: 70px;
            padding: 9px 0;

            .input {
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px $themeColor solid;
                overflow: hidden;
                height: 100%;
                background-color: #fff;

                ::v-deep .el-input {
                    width: 610px;
                    font-size: 18px;

                    input {
                        border: none;
                        border-radius: 0;
                    }
                }

            }

            .el-button {
                width: 125px;
                height: 100%;
                border-radius: 0;
                background-color: $themeColor;
                border-color: $themeColor;
                font-size: 18px;

                &:hover {
                    background-color: #bb3b46;
                    border-color: #bb3b46;
                }

                &:active {
                    background-color: $themeColor;
                    border-color: $themeColor;
                }
            }
        }

        .el-radio-group {

            ::v-deep .el-radio {
                font-size: 0;

                .el-radio__input {
                    vertical-align: middle;

                    .el-radio__inner {
                        width: 14px;
                        height: 14px;
                        background-color: #fff;
                        border: 1px #666 solid;

                        &::after {
                            width: 8px;
                            height: 8px;
                            background-color: transparent;
                        }
                    }
                }

                .el-radio__label {
                    vertical-align: middle;
                    font-size: 16px;
                    color: #666;
                }

                &.is-checked {
                    .el-radio__input {
                        .el-radio__inner {
                            border-color: $themeColor;

                            &::after {
                                background-color: $themeColor;
                            }
                        }
                    }

                    .el-radio__label {
                        color: $themeColor;
                    }
                }
            }
        }
    }

}
</style>