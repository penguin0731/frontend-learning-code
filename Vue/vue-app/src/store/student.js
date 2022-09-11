export default {
    state: {
        name: 'cxj',
        age: 18,
        studentList: []
      },
      getters: {
        person(state) {
          return `姓名：${state.name} 年龄：${state.age}`;
        },
        newStudentList(state, getters) {
          return state.studentList.map(item => `姓名：${item.name} 年龄：${item.age} ${getters.person}`);
        }
      },
      mutations: {
        // mutations里不能写异步代码
        changeStudentList(state, { tempObj, name }) {
          state.studentList.push(tempObj);
          state.name = name;
        }
      },
      actions: {
        // actions里可以执行异步代码
        // ctx是store的镜像 ,因为只用到commit,可以将其解构出来,即{ commit }
        changeStudentList(ctx, payload) {
          // 执行mutations里的changeStudentList
          setTimeout(() => {
            ctx.commit('changeStudentList', payload);
          }, 1000);
        }
      }
}