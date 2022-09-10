<template>
  <div class="wrapper">
    <!-- <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main" v-show="todosRef.length > 0">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          v-model="allDoneRef"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            v-for="(item, index) in filteredTodosRef"
            :key="item.id"
            :class="{
              completed: item.completed,
              editing: item == editingTodoRef,
            }"
            class="todo"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="item.completed" />
              <label @dblclick="editTodo(item)">{{ item.title }}</label>
              <button @click="removeTodo(index)" class="destroy"></button>
            </div>
            <input
              v-model="item.title"
              @blur="doneEdit"
              @keyup.enter="doneEdit(item, index)"
              @keyup.esc="cancelEdit(item)"
              class="edit"
              type="text"
            />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todosRef.length > 0">
        <span class="todo-count">
          <strong>{{ remaingRef }}</strong>
          <span>item{{ remaingRef > 1 ? "s" : "" }} left</span>
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibilityRef == 'all' }"
              >All</a
            >
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibilityRef == 'active' }"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibilityRef == 'completed' }"
              >Completed</a
            >
          </li>
        </ul>
        <button
          class="clear-completed"
          v-show="completedRef > 0"
          @click="removeCompleted"
        >
          Clear completed
        </button>
      </footer>
    </section> -->
  </div>
</template>

<script>
import useTodoList from "./composition/useTodoList.js";
import useNewTodo from "./composition/useNewTodo.js";
import useFilter from "./composition/useFilter.js";
import useEdit from "./composition/useEditTodo.js";
import useRemove from "./composition/useRemoveTodo.js";

export default {
  setup() {
    const { todosRef } = useTodoList();
    return {
      todosRef,
      ...useNewTodo(todosRef),
      ...useFilter(todosRef),
      ...useEdit(todosRef),
      ...useRemove(todosRef),
    };
  },
};
</script>
