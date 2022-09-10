import { ref, watchEffect } from 'vue';
import * as todoStorage from '../util/todoStorage.js';

export default function useTodoList() {
    let todosRef = ref(todoStorage.fetch());
    window.todosRef = todosRef;
    watchEffect(() => { // 类似watch 监听todosRef.value
        todoStorage.saveTask(todosRef.value);
    })

    return {
        todosRef
    }
}