<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- 角色列表 -->
    <v-list @edit="edit"></v-list>

    <!-- 添加角色 -->
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  props: [],
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
        isAdd:true
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info.isAdd=true;
      this.info.isshow = true;
    },
    edit(id){
      this.info.isshow=true;
      this.info.isAdd=false;
      this.$refs.add.look(id)
    }
  },
  mounted() {},
};
</script>

<style>
</style>