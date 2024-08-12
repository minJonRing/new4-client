<template>
  <div class="box">
    <ListProT ref="list" :list="list" :mixinConfig="mixinConfig" :searchParam="searchParam" :tableParam="tableParam"
      :noBtns="['add', 'edit', 'delete']" :otherBtns="otherBtns" :searchFilter="searchFilter" :selection="selection"
      @getData="getData" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { rulesT } from "tqr";

export default {
  name: "List",
  props: {
    noBtns: rulesT.Array,
    otherBtns: rulesT.Array,
    selection: rulesT.Array,
  },
  data() {
    return {
      mixinConfig: {
        url: "/orders",
      },
      list: {},
      // 查询条件
      searchParam: [],
      // 表格表头、数据显示
      tableParam: [],
    };
  },
  computed: {
    ...mapGetters([]),
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.searchParam = [
        {
          label: "订单编号",
          type: "input",
          option: {
            prop: "orderNo",
            initValue: "",
          },
        },
      ];
      this.tableParam = [
        { label: "订单编号", prop: "orderNo" },
        { label: "商品数量", prop: "num" },
        {
          label: "总价（元）", formatter: (row) => {
            return <span style="color:#ff4949">{row.price}</span>

          }
        },
        {
          label: "状态", formatter: (row) => {
            return <el-tag type={['info', 'success'][row.status]}>{['待确认', '完成'][row.status]}</el-tag>

          }
        },
      ];
    },
    // 设置请求数据
    searchFilter(data) {
      return {
        current: data.pageNum
      }
    },
    getData(data) {
      this.$emit("getData", data);
    },
  },
};
</script>
