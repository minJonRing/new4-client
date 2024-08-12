<template>
    <div class="search">
        <div class="content">
            <div class="mid">
                <div class="input">
                    <el-input v-model="searchData.name" size="medium" clearable placeholder="请输入专题库名称" />
                </div>
                <el-button type="primary" size="medium" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" size="medium" @click="handleTopic">图书列表</el-button>
            </div>
            <!-- <el-radio-group v-model="searchData.retrieval">
                <el-radio v-for="item in typeList" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group> -->
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { rulesT } from 'tqr'
export default {
    props: {
        model: rulesT.Any,
    },
    data() {
        return {
            typeList: [
                { value: '', label: '全部' },
                { value: 'name', label: '名称' },
                { value: 'creator', label: '创建人' },
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
            this.$router.push('/searchResult')
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
                    font-size: 18px;
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