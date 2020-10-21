<template>
  <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="id" label="菜单编号" sortable width="180">
    </el-table-column>

    <el-table-column prop="title" label="菜单名称" sortable width="180">
    </el-table-column>

    <el-table-column label="菜单图标">
      <template slot-scope="scope">
        <i :class="scope.row.icon"></i>
      </template>
    </el-table-column>

    <el-table-column prop="url" label="菜单地址"> </el-table-column>

    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-button v-if="scope.row.status == 1" type="primary">启用</el-button>
        <el-button v-else type="info">禁用</el-button>
      </template>
    </el-table-column>

    <el-table-column prop="id" label="操作" sortable width="180">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        <del-btn @dele="dele(scope.row.id)"></del-btn>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert.js";
import { reqMenuDel } from "../../../utils/request.js";

export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      relistActions: "menu/relistActions",
    }),
    //删除
    del(id) {
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定按钮
          reqMenuDel(id).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.relistActions();
            } else {
              warningAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    dele(id) {
      //点击确定按钮
      reqMenuDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.relistActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },

  mounted() {
    this.relistActions();
  },
};
</script>

<style>
</style>