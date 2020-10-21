<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" @click="willadd">添加</el-button>
    <!-- 列表 -->
    <v-list @edit="edit"></v-list>
    <!-- 添加弹框 -->
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./modules/list";
import vAdd from "./modules/add";

export default {
  props: [],
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isAdd: true,
        isshow: false,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    // 将要添加
    willadd() {
      this.info.isshow = true;
    },
    // 编辑
    edit(id) {
      this.info.isshow = true;
      this.info.isAdd = false;
      this.$refs.add.look(id)

    },
  },
  mounted() {},
};
</script>

<style>
</style>