import { ref, computed } from 'vue';

export default function useEditTodo(todosRef) {
    const editingTodoRef = ref(null);   // 当前修改的任务
    let oldTitle = null;  // 缓存之前修改的任务标题

    const editTodo = (todo) => {
        oldTitle = todo.title;
        editingTodoRef.value = todo;
    }

    const doneEdit = (todo, index) => {
        editingTodoRef.value = null;
        const title = todo.title.trim();
        if(title) {
            todo.title = title;
        }else {
            todosRef.value.splice(index, 1);
        }
    }

    const cancelEdit = (todo) => {
        doneEdit();
        todo.title = oldTitle;
    }

    const allDoneRef = computed({
        get() {
            return todosRef.value.every(item => item.completed);
        },
        set(checked) {
            todosRef.value.forEach(item => {
                item.completed = checked;
            });
        }
    });


    return {
        editingTodoRef,
        editTodo,
        doneEdit,
        cancelEdit,
        allDoneRef
    }
}