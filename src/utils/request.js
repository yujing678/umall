import axios from 'axios'
import qs from 'qs'
import Vue from "vue"

// 开发环境
Vue.prototype.$imgPre="http://localhost:3000"
let baseUrl="/api";

// 打包后
// Vue.prototype.$imgPre=""
// let baseUrl="";

// 响应拦截
axios.interceptors.response.use(res=>{
    console.group("=======本次请求路径是："+res.config.url)
    console.log(res);
    console.groupEnd()

    return res;
})

// =====菜单添加=====
export const reqMenuAdd=(params)=>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:"post",
        data:qs.stringify(params)
    })
}

// =====菜单列表=====
export const reqMenuList=()=>{
    return axios({
        url:baseUrl+"/api/menulist",
        method:"get",
        params:{
            istree:true
        }
    })
}
// =======菜单删除======
export const reqMenuDel=(id)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data:qs.stringify({id})
    })
}
// ========获取1条菜单==========
export const reqMenuDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:"get",
        params:{id}
    })
}
// ========修改菜单=========
export const reqMenuUpdata=(params)=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(params)
    })
}

/*********角色管理***************/
//角色列表
export const reqRoleList=()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:"get"
    })
}
// 角色添加
export const addRoleList=(params)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:"post",
        data:qs.stringify(params)
    })
}
// 获取一条数据
export const reqRoleDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:"get",
        params:{id}
    })
}
// 角色删除
export const reqRoledel=(id)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data:qs.stringify({id})
    })
} 
// 角色修改
export const reqRoleUpdata=(params)=>{
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:qs.stringify(params)
    })
}
// ============管理员管理============
// 管理员添加
export const reqManAdd=(params)=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:"post",
        data:qs.stringify(params)
    })
}
// 管理员列表
export const reqManList=(params)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
        params:params
    })
}
// 获取一条管理员信息
export const reqManDetail=(uid)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params:{uid}
    })
}
// 管理员修改
export const reqManUpdata=(params)=>{
    return axios({
        url:baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(params)
    })
}
// 管理员删除
export const reqManDel=(uid)=>{
    return axios({
        url:baseUrl+"/api/userdelete",
        method:"post",
        data:qs.stringify({uid})
    })
}
// 管理员总数
export const reqManSum=()=>{
    return axios({
        url:baseUrl+"/api/usercount",
        method:"get"
    })
}
// =========商品分类=========
// 商品分类添加
export const reqCateAdd=(params)=>{
    let data=new FormData()
    // data.append("pid",1)
    // data.append("catename","123")
    // data.append("img",File)
    // data.append("status",1)
    for(let i in params){
        data.append(i,params[i])
    }
    return axios({
        url:baseUrl+"/api/cateadd",
        method:"post",
        data:data
    })
}
// 商品分类列表
// params:{istree:true,pid:0}
export const reqCateList=(params)=>{
    return axios({
        url:baseUrl+"/api/catelist",
        method:"get",
        params:params
    })
}
// 获取一条商品分类信息
export const reqCateDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/cateinfo",
        method:"get",
        params:{id}
    })
}
// 商品分类修改
export const reqCateUpdata=(params)=>{
    let data=new FormData()
    // data.append("pid",1)
    // data.append("catename","123")
    // data.append("img",File)
    // data.append("status",1)
    for(let i in params){
        data.append(i,params[i])
    }
    return axios({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data:data
    })
}
// 商品分类删除
export const reqCateDel=(id)=>{
    return axios({
        url:baseUrl+"/api/catedelete",
        method:"post",
        data:qs.stringify({id})
    })
}
/*********商品规格管理***************/
//添加
export const reqSpecsAdd = (params) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(params)
    })
}

//管理员总数
export const reqSpecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
    })
}

//列表 params={page:1,size:10}
export const reqSpecsList = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: params
    })
}
//删除
export const reqSpecsDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

//1条
export const reqSpecsDetail = (id) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改
export const reqSpecsUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(params)
    })
}