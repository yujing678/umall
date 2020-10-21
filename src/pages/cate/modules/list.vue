<template>
  <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    :tree-props="{ children: 'children' }"
  >
    <el-table-column prop="id" label="分类编号"></el-table-column>
    <el-table-column prop="catename" label="分类名称"></el-table-column>
    <el-table-column prop="img" label="图片">
      <template slot-scope="scope">
        <img :src="$imgPre + scope.row.img" class="img" />
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
        <el-button type="info" v-else> 禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <del-btn @dele="del(scope.row.id)"></del-btn>
      </template>
    </el-table-column>
  </el-table>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert,warningAlert } from '../../../utils/alert';
import {reqCateDel} from "../../../utils/request"
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },

  methods: {
    ...mapActions({
      relistAction: "cate/relistAction",
    }),
    // 编辑
    edit(id) {
      this.$emit("edit",id);
    },
  //  删除
  del(id){
    reqCateDel(id).then(res=>{
      if(res.data.code==200){
        // 成功弹框
      successAlert(res.data.msg)
      // 重新渲染列表
      this.relistAction()
      }else{
        warningAlert(res.data.msg)
      }
    })
  }
  },
  mounted() {
    this.relistAction();
  },
};
</script>

<style scoped>
.img {
  width: 100px;
  height: 100px;
}
</style>