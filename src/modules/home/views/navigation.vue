<template>
    <div class="navigation">
        <div class="list">
            <router-link class="item td300" v-for="item in bookType" :key="item.id"
                :to="`/searchResult?docType=${item.value}`">
                <i :class="['iconfont', iconfont[item.value]]"></i>
                <span>{{ item.label }}</span>
            </router-link>
        </div>
    </div>
</template>
  
<script>
import { mapGetters } from "vuex";
export default {
    name: "Navigation",
    data() {
        return {
            navigation: [],
            iconfont: {
                'ts': 'icon-textbook',
                'bz': 'icon-news',
                'da': 'icon-yanshoudangan',
                'qk': 'icon-zazhiqikan',
                'tp': 'icon-xingzhuang-tupian',
                'sp': 'icon-shipinbofang',
                'yp': 'icon-yinpin',
            }
        };
    },
    computed: {
        ...mapGetters(['bookType']),
    },
    created() {
        this.navigation = [
            { id: 1, label: '图书' },
            { id: 2, label: '报纸' },
            { id: 3, label: '档案' },
            { id: 4, label: '期刊' },
            { id: 5, label: '图片' },
        ]
        console.log(this.bookType)
    },
    methods: {

    },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.navigation {
    background-color: #E9D4B3;
    height: 104px;

    .list {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        .item {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 185px;
            color: #333;
            font-size: 20px;
            // padding: 0 60px;
            // font-weight: bold;
            cursor: pointer;
            user-select: none;
            transition-duration: 300ms;

            .iconfont {
                font-size: 20px;
                padding-right: 5px;
            }

            &::after {
                content: "";
                position: absolute;
                width: 0;
                height: 2px;
                background-color: $themeColor;
                transition-duration: 600ms;
                top: 70px;
                left: 50%;
                transform: translateX(-50%);
            }

            &:hover {
                color: $themeColor;
                background-color: #f3e8d7;

                &::after {
                    width: 70px;
                }
            }
        }
    }
}
</style>
  