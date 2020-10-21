<template>
  <el-table :data="list" style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    :tree-props="{ children: 'children' }">
    <el-table-column prop="id" label="角色编号" width="180"> </el-table-column>
    <el-table-column prop="rolename" label="角色名称" width="180">
    </el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
        <el-button type="info" v-else>禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <del-btn @dele="dele(scope.row.id)"></del-btn>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from '../../../utils/alert';
import { reqRoledel } from "../../../utils/request";

export default {
  props: [],
  components: {},
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "role/reqListAction",
    }),
    // 点击编辑
    edit(id) {
      this.$emit("edit",id);
    },
    // 点击删除,点击确定按钮
    dele(id){
      reqRoledel(id).then(res=>{
        if(res.data.code==200){
          // 删除成功弹框
          successAlert(res.data.msg);
          this.reqListAction();
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    this.reqListAction();
  },
};
</script>

<style>
</style>