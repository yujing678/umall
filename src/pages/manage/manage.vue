<template>
  <div>
    <el-button type="primary" @click="willadd">添加</el-button>
    <!-- 列表页 -->
    <v-list @edit=edit></v-list>
    <!-- 添加页 -->
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
        info:{
            isshow:false,
            isAdd:true
        }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    // 将要添加
    willadd(){
        this.info.isshow=true
    },
    // 编辑
    edit(uid){
        this.info.isAdd=false;
        this.info.isshow=true;
        this.$refs.add.look(uid);
    }
  },
  mounted() {},
};
</script>

<style>
</style>