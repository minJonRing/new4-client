<template>
    <div class="recommend">
        <div class="title">特别推荐</div>
        <div class="relative">
            <div class="swiper">
                <div class="swiper-wrapper">
                    <router-link class="swiper-slide" v-for="(item, index) in list" :key="index"
                        :to="`/file?id=${item.id}`">
                        <div class="img-box">
                            <img :src="item.imageUrl" alt="">
                        </div>
                        <div class="label">{{ item.title }}</div>
                    </router-link>
                </div>
            </div>
            <div class="swiper-button swiper-button-prev"></div><!--左箭头。如果放置在swiper外面，需要自定义样式。-->
            <div class="swiper-button swiper-button-next"></div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters } from "vuex";
import 'swiper/css/swiper.css'
import Swiper from 'swiper'
import { ajax } from '@/api/ajax'
export default {
    name: "Navigation",
    components: {

    },
    data() {
        return {
            mySwiper: null,
            list: []
        };
    },
    computed: {
        ...mapGetters([]),
    },
    created() {

    },
    mounted() {


        this.getData()
    },
    methods: {
        getData() {
            this.$global.loading = true;
            ajax({
                url: `/api/books/recommend`,
            }).then(({ data }) => {
                const { list } = data;
                this.list = [...list, ...list];
                this.$nextTick(() => {
                    this.initSwiper()
                })
            }).finally(() => {
                this.$global.loading = false;
            })
        },
        initSwiper() {
            this.mySwiper = new Swiper('.swiper', {
                navigation: { // 如果需要前进后退按钮
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                // mousewheel: true, // 是否开启鼠标滚轮控制swiper切换 ，默认false
                speed: 600, // 切换速度，自动滑动开始到结束的时间
                grabCursor: true, // 悬浮时鼠标样式切换
                slidesPerView: 5, // slider容器能够同时显示的slides数量，默认为1，auto自动根据slide宽度来设定数量
                slidesPerGroup: 1, // 定义多少slide为一组，默认为1
                spaceBetween: 40, // slide之间的距离
                centerInsufficientSlides: true, // 当slide总数小于slidesPerView时，slide居中
                effect: 'slide', // slide的切换效果，默认为'slide'位移切换，'fade'淡入，'cube'方块，'coverflow'3d流，'flip'3d翻转，'cards'卡片式，'creative'创意性
                autoplay: {
                    delay: 5000, // 多少秒切换一次，默认3000ms
                    disableOnInteraction: false, // 用户操作之后，是否禁止autoplay，默认true，操作包括触碰，拖动，点击pagination
                    waitForTransition: true // 是否等待过渡完成，再开始自动切换的计时，默认true
                },
                loop: true // 循环模式选项
            })
            this.mySwiper.$el.onmouseover = function () { // 鼠标覆盖停止自动切换
                this.mySwiper.autoplay?.stop()
            }
            this.mySwiper.$el.onmouseout = function () { // 鼠标离开开始自动切换
                this.mySwiper.autoplay?.start()
            }

        }
    },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.recommend {
    position: relative;
    width: 1200px;
    margin: 0 auto;


    .title {
        font-size: 26px;
        line-height: 36px;
        color: #333;
        padding: 60px 0 36.5px;
    }

    .relative {
        position: relative;

        .swiper {
            position: relative;
            width: 1000px;
            // height: 276px;
            overflow: hidden;
            margin: 0 auto;


            .swiper-wrapper {
                height: 100%;
                margin: 0 auto;

                .swiper-slide {
                    position: relative;
                    width: 160px;
                    height: 100%;
                    border-radius: 4px;
                    cursor: pointer;
                    overflow: hidden;
                    padding: 5px;
                    transition-duration: 600ms;

                    .img-box {
                        width: 100%;
                        height: 210px;
                        border-radius: 4px;
                        overflow: hidden;

                        img {
                            display: block;
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            image-rendering: auto;
                            transition-duration: 600ms;
                        }
                    }

                    .label {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        padding: 20px 0;
                        text-align: center;
                        font-size: 18px;
                        line-height: 25px;
                        color: #666;
                        transition-duration: 600ms;
                    }

                    &::after {
                        position: absolute;
                        content: "";
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 4px;
                        border: 2px transparent solid;
                        pointer-events: none;
                    }

                    &:hover {
                        // background-color: #fff;

                        // box-shadow: inset 0 0 5px rgba(0, 0, 0, .3);
                        .img-box {
                            img {
                                transform: matrix(1.1, 0, 0, 1.1, 0, 0);
                            }
                        }

                        .label {
                            color: $themeColor;
                        }
                    }

                }
            }
        }

        .swiper-button {
            top: 105px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            // border: 1px #865A16 solid;
            background-color: $themeColor;
            user-select: none;
            opacity: 0;
            transform: matrix(1, 0, 0, 1, 0, -20);
            transition-duration: 300ms;

            &:after {
                font-size: 16px;
                color: #fff;
            }
        }

        &:hover {


            .swiper-button {
                opacity: 1;
                transform: matrix(1, 0, 0, 1, 0, 0);
            }
        }
    }
}
</style>
  