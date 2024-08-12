<template>
    <div class="book td300">
        <router-link :to="`/file?id=${file.id}`" class="content">
            <div class="cover">
                <img :src="file.imageUrl" alt="">
            </div>
            <div class="title">{{ file.title }}</div>
        </router-link>
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
            return {
                ...this.book,
            }
        }
    },
    created() {
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.book {
    height: 280px;
    width: 186px;
    padding: 15px 12px;
    border-radius: 6px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0);

    &:hover {
        box-shadow: 0 0 4px rgba(0, 0, 0, .5);
    }

    .content {
        position: relative;
        display: block;
        height: 100%;


        .cover {
            position: relative;
            width: 162px;
            height: 211px;
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
        }

        .title {
            font-size: 18px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: 500;
            line-height: 25px;
            margin-top: 14px;
            color: #666;
            padding: 0 6px;
        }

    }
}
</style>