<template>
  <div class="login">
    <div class="box">
      <h3 class="center">登录</h3>
      <div class="line">
        <el-input placeholder="请输入账号" clearable></el-input>
      </div>
      <div class="line">
        <el-input placeholder="请输入密码" clearable show-password></el-input>
      </div>
      <div class="line center">
          <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    login(){
      this.$router.push("./")
    }
  },
  mounted() {},
};
</script>

<style>
.login{
    width:100vw;
    height:100vh;
    background: linear-gradient(to right,#553443,#303D60);
    position:relative;
}
.box{
    background:white;
    width:300px;
    height:200px;
    border-radius:20px;
    position:absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    padding:20px;
}
.center{
    text-align:center;
}
.line{
    margin-top:10px;
}
.line button{
    width:100%;
}
</style>