<template>
  <div :class="classObj" class="app-wrapper">
    <div v-loading.lock="loading" class="main-container">

      <Head />
      <app-main />
      <Footer />
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Settings } from "./components";
import { mapState, mapGetters } from "vuex";
import Head from '@/modules/head/index.vue'
import Footer from '@/modules/footer/index.vue'
export default {
  name: "Layout",
  components: {
    Head,
    Footer,
    AppMain
  },
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
}
</style>
