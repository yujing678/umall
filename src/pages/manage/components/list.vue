<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户姓名" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <del-btn @dele="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="size"  @current-change="changePage">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqManDel } from "../../../utils/request";

export default {
  props: [],
  components: {},
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      list: "manage/list",
      size:"manage/size",
      total:"manage/total"
    }),
  },
  methods: {
    ...mapActions({
      relistAction: "manage/relistAction",
      reqtotalAction:"manage/reqtotalAction",
      changepageAction:"manage/changepageAction"
    }),
    // 编辑
    edit(uid) {
      this.$emit("edit", uid);
    },
    // 删除
    del(uid) {
      reqManDel(uid).then((res) => {
        if (res.data.code == 200) {
          // 成功弹框
          successAlert(res.data.msg);
          // 重新请求列表
          this.relistAction();
        //   重新请求总数
        this.reqtotalAction()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //改变页码
    changePage(e){
        this.changepageAction(e)
    }
  },
  mounted() {
    //   获取列表
    this.relistAction();
    // 获取总数
    this.reqtotalAction();
  },
};
</script>

<style>
</style>