import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keyword: '',
    list: [],
    size: 5,
    nowPage: 1,
    totalPage: 1,
    count: null,
    showModal: false,
    editStu: {},
  },
  mutations: {
    setList (state, list) {
      state.list = list
    },
    setCount (state, count) {
      state.count = count;
      state.totalPage = Math.ceil(count / state.size);
    },
    setModal (state, boolean) {
      state.showModal = boolean;
    },
    setEditStu (state, editStu) {
      state.editStu = editStu;
    },
    setNowPage (state, n) {
      switch (n) {
        // 上一页
        case -1:
            state.nowPage > 1 ? state.nowPage-- : "";
          break;
        // 下一页
        case 0:
            state.nowPage < state.totalPage ? state.nowPage++ : "";
          break;
        default:
            state.nowPage = n;
      }
    },
    setKeyWord (state, value) {
      state.keyword = value;
      // 每次搜索都要将当前页数调回第一页
      state.nowPage = 1;
    }
  },
  actions: {
    getList ({ commit, state }) {
      api.findByPage(state.nowPage, state.size).then(res => {
        commit('setList', res.data.data.findByPage);
        commit('setCount', res.data.data.cont);
      });
    },
    updateStu ({ commit, state }, stu) {
      return api.updateStu(stu).then(res => {
        if(res.data.status == 'success') {
          commit('setModal', false);
          Object.assign(state.editStu, stu);
          return {
            msg: res.data.msg,
            status: 'success'
          }
        }else {
          return {
            msg: res.data.msg,
            status: res.data.status
          }
        }
      });
    },
    turnPage ({ commit, dispatch, state }, n) {
      commit('setNowPage', n);
      if(state.keyword) {
        dispatch('search', {
          page: state.nowPage,
          size: state.size,
        })
      }else {
        dispatch('getList')
      }
    },
    searchValue ({ dispatch, commit, state }, value) {
      commit('setKeyWord', value);
      if(value == '') {
        return dispatch('getList');
      }else {
        return dispatch('search', {
          page: state.nowPage,
          size: state.size,
          search: state.keyword
        })
      }
    },
    search ({ commit }, data) {
      return api.searchStu(data).then(res => {
        console.log(res);
        commit('setList', res.data.data.searchList);
        commit('setCount', res.data.data.cont);
        return {
          status: 'success',
          msg: '查找成功'
        }
      })
    },
    delStu ({ dispatch, state }, sNo) {
      return api.delBySno(sNo).then(res => {
        // 判断删除的数据是否是最后一页的唯一一个
        if(state.totalPage == Math.ceil((state.count - 1) / state.size)) {
          dispatch('turnPage', state.nowPage);
        }else {
          // 如果是，则返回上一页的数据
          dispatch('turnPage', -1);
        }
        return {
          status: 'success',
          msg: '删除成功'
        }
      })
    }
  }
})
