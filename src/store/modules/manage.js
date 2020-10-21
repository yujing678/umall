import { reqManList } from "../../utils/request";
import { reqManSum } from "../../utils/request";
const state = {
    list: [],
    // 每一页数量
    size: 2,
    // 总数
    total: 0,
    // 页码
    page: 1,
}
const mutations = {
    // 改变列表
    changeList(state, arr) {
        state.list = arr;
    },
    // 改变总数
    changeTotal(state, total) {
        state.total = total
    },
    // 改变页码
    changePage(state, page) {
        state.page = page
    }
}

const actions = {
    relistAction(context) {
        // 获取列表
        reqManList({ size: context.state.size, page: context.state.page }).then(res => {
            let list = res.data.list ? res.data.list : []
            // 获取列表时，如果取到了空数组，那么有可能是最后一页没有数据了，判断如果页码大于一，就应当展示前一页的内容，让page-1，并且重新获取列表
            if(list.length==0&&context.state.page>1){
                context.commit("changePage",context.state.page-1)
                context.dispatch("relistAction")
                return
            }
            context.commit("changeList", list)
        })
    },
    reqtotalAction(context) {
        // 获取总数
        reqManSum().then(res => {
            let total = res.data.list[0].total
            context.commit("changeTotal", total)
        })
    },
    // 组件修改了页码
    changepageAction(context,page) {
        // 改变页码
        context.commit("changePage",page)
        // 重新获取列表
        context.dispatch('relistAction')
    }
}

const getters = {
        list(state) {
            return state.list
        },
        size(state) {
            return state.size
        },
        total(state) {
            return state.total
        },
        page(state) {
            return state.page
        }
    }

export default{
        state,
        mutations,
        actions,
        getters,
        namespaced: true
    }