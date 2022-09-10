function createStore(initialStore) {
    var state = initialStore || {};
    var list = [];
    function getState(type) {
        return state[type];
    }

    function dispatch(action) {
        if(typeof(action.value) == 'object') {
            for(var prop in action.value) {
                state[action.type][prop] = action.value[prop];
            }
        }else{
            state[action.type] = action.value;
        }
        // 调用之前订阅过的函数
        list.forEach(function(elem){
            elem();
        });
    }

    function subscribe(func) {
        list.push(func);
    }

    return {
        getState: getState,
        dispatch: dispatch,
        subscribe: subscribe
    }
}

// 全局过滤条件
var store = createStore({
    text: '',
    sex: 'a',
    age: {
        low: '',
        high: ''
    }
});