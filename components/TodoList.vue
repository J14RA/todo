<template>
    <div>
        <ul class="todo-list__items">
            <li v-for="todo in todos" :key="todo.id" class="todo-list__item">
                <div class="todo-list__card">
                    <input type="checkbox" @change="toggleCompletion(todo)"
                        :checked="todo.completions.includes(today)" />
                    <p>
                        <span :class="{ 'line-through': todo.completions.includes(today) }">
                            {{ todo.name }}
                        </span>
                    </p>
                    <button class="todo-list__cta" @click="deleteTodo(todo.id)">
                        Delete
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useTodoStore } from '~/stores/todos';
import { format } from 'date-fns';
import { onMounted } from 'vue';

const props = defineProps({
    todos: Array,
});

const todoStore = useTodoStore();

const deleteTodo = async (id) => {
    await todoStore.deleteTodo(id);
};

const toggleCompletion = async (todo) => {
    await todoStore.toggleCompletion(todo);
};

const today = format(new Date(), 'yyyy-MM-dd');

onMounted(async () => {
    await todoStore.fetchTodos();
});
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "assets/mixins" as *;
@use "assets/variables" as *;

.todo-list__items {
    list-style-type: none;
    padding: 0;
}

.todo-list__item {
    margin-bottom: 10px;
}

.todo-list__card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.line-through {
    text-decoration: line-through;
}

.todo-list__cta {
    background-color: #e74c3c;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #c0392b;
    }
}
</style>
