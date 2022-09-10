const LOCAL_KEY = 'todomvc';

/**
 * 获取目前所有任务
 */
export function fetch() {
    const result = localStorage.getItem(LOCAL_KEY);
    return result ? JSON.parse(result) : [];
}

/**
 * 保存所有任务
 * @param {*} todos 任务数组
 */
export function saveTask(todos) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
}

/**
 * 生成一个任务的唯一编号，时间戳+4位随机数
 */
export function generateId() {
    return Date.now() + Math.random().toString(16).substr(2, 4);
}

/**
 * 筛选任务列表
 * @param {*} todos 任务列表
 * @param {*} visibility 筛选项
 */
export function filter(todos, visibility = 'all') {
    if(visibility == 'all') {
        return todos;
    }else if(visibility == 'active') {
        return todos.filter(item => !item.completed);
    }else if(visibility == 'completed') {
        return todos.filter(item => item.completed);
    }
    throw new Error('invalid visibility value');
}