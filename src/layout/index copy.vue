<template>
  <div :class="classObj" class="app-wrapper">
    <div v-loading.lock="loading" class="main-container">
      <div class="fixed-header">
        <Navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Settings } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    Settings,
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      device: (state) => state.app.device,
    }),
    ...mapGetters(["loading"]),
    classObj() {
      return {
        mobile: this.device === "mobile",
      };
    },
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  padding-top: 60px;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
}
</style>
