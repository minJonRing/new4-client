<template>
    <div class="search">
        <div class="content" @click.stop>
            <el-row class="row-1">
                <el-col :sx="24" :md="24">
                    <div class="flex">
                        <div class="input">
                            <el-select v-model="form.retrieval" size="medium" filterable>
                                <el-option v-for="item in typeList" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input v-model="form.content" size="medium" clearable placeholder="查询内容" />
                            <el-button type="primary" size="medium" icon="el-icon-search"
                                @click="handleSearch">搜索</el-button>
                        </div>
                        <el-button class="ztk" type="primary" size="medium"
                            @click="handleSearchTopicLibrary">专题库</el-button>
                    </div>
                </el-col>
            </el-row>
            <!-- <el-row>
                <el-col :sx="24" :md="24">
                    <el-checkbox-group v-model="form.docType" @change="handleChange">
                        <el-checkbox v-for="item in checkList" :key="item.value" :label="item.value">{{ item.label
                        }}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row> -->

        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    props: {
        height: String,
        default: '200'
    },
    data() {
        return {
            form: {
                retrieval: '',
                content: '',
                docType: ['']
            },
            typeList: [
                { value: '', label: '全部' },
                { value: 'title', label: '题名' },
                { value: 'keyWords', label: '关键词' },
                { value: 'responsible', label: '责任者' },
                { value: 'publisher', label: '出版者' },
                { value: 'place', label: '出版地' },
            ]
        }
    },
    computed: {
        ...mapGetters(['search', 'bookType']),
        option() {
            return {
                height: this.height + 'px'
            }
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
            const { retrieval, content, docType } = this.form
            this.$router.push(`/searchResult?docType=${docType.join()}&retrieval=${retrieval}&content=${content}`)
        },
        handleChange(e) {
            const len = e.length;
            if (len > 1) {
                const last = e.indexOf('')
                if (len === last + 1) {
                    this.form.docType = ['']
                } else if (last > -1) {
                    this.form.docType = e.filter(i => i != '')
                }
            }
            if (!e.length) {
                this.form.docType = ['']
            }
        },
        handleSearchTopicLibrary() {
            this.$router.push(`/topic-library`)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.search {
    width: 1200px;
    display: flex;
    align-items: center;

    .content {
        // background-color: rgba(255, 255, 255, .2);
        // backdrop-filter: blur(4px);
        padding: 24px;
        border-radius: 6px;

        .row-1 {
            width: 800px;
            height: 70px;
            background-color: #fff;
            margin-bottom: 12px;

            .input {
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                width: 100%;
                user-select: none;


                ::v-deep .el-select {
                    width: 115px;
                    flex-shrink: 0;

                    .el-input {
                        width: 100%;


                        input {
                            border: none;
                            font-weight: bold;
                        }

                    }
                }

                ::v-deep .el-input {
                    flex-grow: 1;

                    input {
                        border: none;
                        border-left: 1px $themeColor solid;
                        border-radius: 0;
                    }
                }

                .el-button {
                    flex-shrink: 0;
                    width: 125px;
                    height: 70px;
                    font-size: 18px;
                    border-radius: 0;
                    background-color: $themeColor;
                    border: none;

                    &:hover {
                        background-color: #bb3b46;
                    }

                    &:active {
                        background-color: $themeColor;
                    }
                }
            }

            .ztk {
                flex-shrink: 0;
                width: 125px;
                height: 70px;
                font-size: 18px;
                border-radius: 0;
                background-color: #E9D4B3;
                color: #865A16;
                border: none;

                &:hover {
                    background-color: #ebe1d1;
                }

                &:active {
                    background-color: #E9D4B3;
                }
            }
        }

        .el-checkbox-group {
            width: 100%;

            .el-checkbox {
                ::v-deep {
                    .el-checkbox__label {
                        color: #333;
                    }
                }

                &.is-checked {
                    ::v-deep {
                        .el-checkbox__inner {
                            background-color: $themeColor;
                            border-color: $themeColor;
                        }
                    }
                }
            }
        }
    }

}
</style>