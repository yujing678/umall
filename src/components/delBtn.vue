<template>
  <el-button @click="del" type="danger">
    删除
  </el-button>
</template>

<script>
export default {
  methods:{
    del(){
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定按钮
            this.$emit("dele")
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }
  }
}
</script>

<style>

</style>