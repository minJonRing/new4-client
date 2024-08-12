<template>
    <div :class="['dialog', center ? 'center' : '', active ? 'active' : '']" @click.stop="active = false">
        <slot />
    </div>
</template>
  
<script>
import { rulesT } from 'tqr'
export default {
    name: "Dialog",
    props: {
        // 赋值的值
        model: rulesT.Boolean,
        center: rulesT.Boolean
    },
    data() {
        return {

        };
    },
    // v-model 双向绑定
    model: {
        prop: "model",
        event: "change",
    },
    computed: {
        // 当前页面绑定值
        active: {
            get() {
                return this.model;
            },
            set(data) {
                this.$emit("change", data);
            },
        },
    },

};
</script>
  
  
<style lang="scss" scoped>
.dialog {
    position: fixed;
    display: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 99;

    &.active {
        display: block;

        &.center {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

}
</style>
  