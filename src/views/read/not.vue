<template>
    <div class="not">
        <div class="body">
            <i class="icon el-icon-picture-outline"></i>
            <span class="t">该图书没有上传文件</span>
        </div>
    </div>
</template>
    
<script>
export default {
    name: "Not",
    data() {
        return {

        }
    },
    created() {

    },
    mounted() {

    },
    methods: {


    }
};
</script>
  
<style lang="scss" scoped>
.not {
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;


    .body {
        color: #999;
        text-align: center;

        .icon {
            display: inline-block;
            font-size: 60px;
        }

        .t {
            display: block;
            padding-top: 10px;
            font-size: 20px;

        }
    }
}
</style>
    