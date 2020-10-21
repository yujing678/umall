<template>
  <el-dialog
    :title="info.isadd ? '添加菜单' : '编辑菜单'"
    :visible.sync="info.isshow"
    @closed="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="菜单名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="上级菜单">
        <el-select
          v-model="form.pid"
          placeholder="请选择上级菜单"
          @change="changepid"
        >
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option
            v-for="item in list"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="菜单类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1" disabled>目录</el-radio>
          <el-radio :label="2" disabled>菜单</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="form.type == 1" label="菜单图标">
        <el-select v-model="form.icon">
          <el-option v-for="item in icons" :key="item" :value="item">
            <i :class="item"></i>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.type == 2" label="菜单地址">
        <el-select v-model="form.url" placeholder="请选择上级菜单">
          <el-option
            v-for="item in indexrouters"
            :key="item.path"
            :label="item.name"
            :value="'/' + item.path"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="add" v-if="info.isadd"
          >添加</el-button
        >
        <el-button type="primary" @click="updata" v-else>修改</el-button>
        <el-button @click="canle">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { indexrouters } from "../../../router/index";
import {
  reqMenuAdd,
  reqMenuDetail,
  reqMenuUpdata
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  components: {},

  data() {
    return {
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      icons: [
        "el-icon-s-tools",
        "el-icon-user",
        "el-icon-camera",
        "el-icon-message-solid",
      ],
      indexrouters: indexrouters,
    };
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
    // 添加
    add() {
         this.empty()
      reqMenuAdd(this.form).then((res) => {
        //成功
        if (res.data.code == 200) {
          // 弹框
          successAlert(res.data.msg);
          // 添加的弹框消失
          this.canle();
          // 重置表单
          this.empty();
          // 更新列表
          this.relistActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 重置
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    // 取消
    canle() {
      this.info.isshow = false;
    },
    // 编辑关闭时清空，添加不清空
    close(){
      //如果是添加开的弹框，就什么都不做；如果是编辑开的弹框，就清除form
      if(!this.info.isadd){
        this.empty()
      }
    },
    changepid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    // 添加数据
    look(id) {
      reqMenuDetail(id).then((res) => {
        if (res.data.code == 200) {
          // form此时没收到id
          this.form = res.data.list;
          // 修改时id是必填的，所以给form添加id
          this.form.id = id;
        } else {
          warningAlert(rs.data.list);
        }
      });
    },
    // 修改
    updata() {
      reqMenuUpdata(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.canle();
          this.empty();
          this.relistActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },

  mounted() {},
};
</script>

<style>
</style>