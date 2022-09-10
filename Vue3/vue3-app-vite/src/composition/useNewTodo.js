import { ref } from 'vue';
import { generateId } from '../util/todoStorage.js';

export default function useNewTodo(todosRef) {
    let newTodoRef = ref('');
    let addTodo = () => {
        const value = newTodoRef.value && newTodoRef.value.trim();
        if(!value) return;

        let todo = {
            id: generateId(),
            title: value,
            completed: false
        }
        todosRef.value.push(todo);
        newTodoRef.value = '';
    }

    return {
        newTodoRef,
        addTodo
    }
}