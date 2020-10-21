<template>
  <el-dialog
    :title="info.isAdd ? '添加角色' : '编辑角色'"
    :visible.sync="info.isshow"
    @closed="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="form.rolename"></el-input>
      </el-form-item>
      <!-- 树形控件 -->
      <el-form-item label="角色权限">
        <el-tree
          :data="menulist"
          show-checkbox
          node-key="id"
          ref="tree"
          :props="{ children: 'children', label: 'title' }"
        >
        </el-tree>
      </el-form-item>

      <!-- 状态 -->
      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
    </el-form>
    <!-- 添加，修改按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="info.isshow = false">取 消</el-button>
      <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
      <el-button type="primary" @click="updata" v-else>修 改</el-button>
    </div>
  </el-dialog>
  <!-- 输入框 -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  addRoleList,
  reqRoleDetail,
  reqRoleUpdata,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: "[]",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      menulist: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "role/reqListAction",
      relistActions: "menu/relistActions",
    }),
    // 弹框消失
    cancel() {
      this.info.isshow = false;
    },
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    // 重置表单
    empty() {
      this.form = {
        rolename: "",
        menus: "[]",
        status: 1,
      };
      // 树形控件设置值
      this.$refs.tree.setCheckedKeys([]);
    },
    // 点击添加按钮
    add() {
      // 树形控件取值
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      console.log(this.form);

      // 发起添加角色请求
      addRoleList(this.form).then((res) => {
        if (res.data.code == 200) {
          // 弹出成功信息
          successAlert(res.data.msg);
          // 弹框消失
          this.cancel();
          // 获取列表数据
          this.reqListAction();
          // 数据重置
          this.empty();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    // 获取一条数据
    look(id) {
      //发请求
      reqRoleDetail(id).then((res) => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          this.form.id = id;
          //给树形控件赋值
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 点击编辑按钮
    updata() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdata(this.form).then((res) => {
        if (res.data.code == 200) {
          // 修改成功弹框提示
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListAction();
        } else {
          // 修改失败弹框提示
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.menulist.length == 0) {
      this.relistActions();
    }
  },
};
</script>

<style>
</style>