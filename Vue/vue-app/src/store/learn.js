export default {
    namespaced: true,
    state: {
        courseName: '高数',
        price: 20
    },
    getters: {
        coursePrice (state) {
            return '￥' + state.price;
        }
    },
    mutations: {
        changePrice (state, {price}) {
            state.price = price;
        }
    },
    actions: {}
}