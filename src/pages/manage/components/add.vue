<template>
  <el-dialog
    :title="info.isAdd ? '添加管理员' : '编辑管理员'"
    :visible.sync="info.isshow"
    @closed="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属角色">
        <el-select v-model="form.roleid" placeholder="请选择所属角色">
          <el-option
            v-for="item in rolelist"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名">
        <el-input v-model="form.username" value=""></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="form.password" value=""></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添加</el-button
        >
        <el-button type="primary" v-else @click="updata">修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqManAdd, reqManDetail, reqManUpdata } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      form: {
        roleid: 0,
        username: "",
        password: "",
        status: 1,
      },
      isshow: true,
    };
  },

  computed: {
    ...mapGetters({
      list: "manage/list",
      rolelist: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      relistAction: "manage/relistAction",
      roleListAction: "role/reqListAction",
      reqtotalAction:"manage/reqtotalAction"
    }),
    // 重置表单
    empty() {
      this.form = {
        roleid: 0,
        username: "",
        password: "",
        status: 1,
      };
    },
    // 表单消失
    cansole() {
      this.info.isshow = false;
    },
    // 添加
    add() {
      // 发起添加请求
      reqManAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 成功弹框
          successAlert(res.data.msg);
          // 重置表单
          this.empty();
          // 弹框消失
          this.cansole();
          // 重新渲染页面
          this.relistAction();
          // 重新获取页码总数
          this.reqtotalAction()
        }
      });
    },
    // 查询一条数据
    look(uid) {
      reqManDetail(uid).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.password = "";
        }
      });
    },
    // 关闭表单弹框
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //点击修改
    updata() {
      reqManUpdata(this.form).then((res) => {
        if (res.data.code == 200) {
          // 弹出成功弹框
          successAlert(res.data.msg);
          // 重置表单
          this.empty();
          // 表单弹框消失
          this.cansole();
          // 重新获取列表
          this.relistAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.rolelist.length == 0) {
      this.roleListAction();
    }
  },
};
</script>

<style>
</style>