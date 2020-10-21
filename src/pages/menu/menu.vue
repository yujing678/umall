<template>
  <div>
    <el-button type="primary" @click="willadd">添加</el-button>
    <!-- 菜单列表 -->
    <v-list @edit="edit"></v-list>
    <!-- 菜单添加表单 -->
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
        isadd:true
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willadd() {
      this.info.isshow = true;
    },
    edit(id){
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.add.look(id);
    }
  },
  mounted() {},
};
</script>

<style>
</style>