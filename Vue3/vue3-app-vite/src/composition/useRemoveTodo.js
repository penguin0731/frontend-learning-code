
export default function useRemoveTodo(todosRef) {
    const removeTodo = (index) => {
        todosRef.value.splice(index, 1);
    }

    const removeCompleted = () => {
        todosRef.value = todosRef.value.filter(item => !item.completed);
    }

    return {
        removeTodo,
        removeCompleted
    }
}