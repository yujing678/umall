<template>
  <el-dialog
    :title="info.isAdd ? '添加分类' : '编辑分类'"
    :visible.sync="info.isshow"
    @closed="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="上级分类">
        <el-select v-model="form.pid" placeholder="请选择">
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类名称">
        <el-input v-model="form.catename"></el-input>
      </el-form-item>

      <el-form-item label="图片" v-if="form.pid!=0">
        <!-- 当两次选择同一张图片时，target.file不会发生改变，只有改变了才能引起函数执行，并且target.file不是变量无法清空，因此要让弹框消失时，div节点也消失，再次出现时，出现的是新的input -->
        <div v-if="info.isshow" class="my-upload" @change="getfile">
          <h3>+</h3>
          <img v-if="imgUrl" :src="imgUrl">
          <input type="file" class="my-input">
        </div>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" v-if="info.isAdd" @click="add">添加</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from '../../../utils/alert';
import { reqCateAdd,reqCateDetail,reqCateUpdata } from "../../../utils/request";

export default {
  props: ["info"],
  data() {
    return {
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      },
      imgUrl:""
    };
  },
  computed: {
    ...mapGetters({
      list:"cate/list"
    }),
  },
  methods: {
    ...mapActions({
        relistAction:"cate/relistAction",
    }),
   
    
    // 获取文件
    getfile(e){
      let file=e.target.files[0]
      this.imgUrl = URL.createObjectURL(file)
      this.form.img=file

      // 1.条件判断，文件大小不能超过2M，1M=1024KB 1KB=1024B
      if(file.size>2*1024*1024){
        warningAlert("文件大小不可超过2M");
        this.empty();
        return;
      }
      // 2.文件格式必须是图片
      let imgExtArr=[".jpg",".png",".jpeg",".gif"];
      let extname=file.name.slice(file.name.lastIndexOf("."));
      if(!imgExtArr.some((item)=>item==extname)){
        warningAlert("上传文件格式错误");
         this.empty();
        return;
      }
      
    },

     //   点击添加按钮
     add(){
      //  console.log(this.form)
       reqCateAdd(this.form).then(res=>{
         if(res.data.code==200){
          //  弹出成功弹框
          successAlert(res.data.msg)
          // 重置表单
          this.empty()
          // 弹框消失
          this.cansole()
          // 列表数据重新刷新
           this.relistAction()
         }else{
           warningAlert(res.data.msg)
         }
       })
     },

    // 添加弹框消失
    cansole(){
      this.info.isshow=false;
    },

    // 重置表单
    empty() {
      this.form = {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
      this.imgUrl=""
    },
    // 解决编辑》取消》添加的bug
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    // 查看一条数据
    look(id){
      reqCateDetail(id).then(res=>{
        if(res.data.code==200){
          this.form=res.data.list;
          this.form.id=id;
          this.imgUrl=this.$imgPre+this.form.img;
        }else{
          warningAlert(res.data.msg)
        }
      })
    },
    // 修改数据
    update(){
       reqCateUpdata(this.form).then(res=>{
         if(res.data.code==200){
          //  成功弹框
          successAlert(res.data.msg)
          // 弹框消失
          this.cansole()
          // 表单重置
          this.empty()
          // 重新渲染列表
          this.relistAction()
         }else{
           warningAlert(res.data.msg)
         }
       })
    }
  },
  mounted(){
    
  }
};
</script>

<style scoped>
.my-upload{
  width:150px;
  height:150px;
  border:1px dashed #ccc;
  position: relative;
}
.my-upload h3{
  text-align:center;
  line-height:150px;
  font-size:30px;
  font-weight:400
  }
.my-upload .my-input{
width:100%;
height:100%;
position: absolute;
left:0;
top:0;
opacity:0;
cursor: pointer;
}
.my-upload img{
  width:100%;
  height:100%;
  position:absolute;
  top:0;
  left:0;
}
</style>