<template>
    <div>
        <transition-group name="todo" tag="ul" class="todo-list__items">
            <li v-for="todo in sortedTodos" :key="todo.id" class="todo-list__item">
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
        </transition-group>
    </div>
</template>

<script setup>
import { useTodoStore } from '~/stores/todos';
import { format } from 'date-fns';
import { computed, onMounted } from 'vue';

const props = defineProps({
    todos: Array,
});

const todoStore = useTodoStore();

const today = format(new Date(), 'yyyy-MM-dd');

// Sort todos based on completion status
const sortedTodos = computed(() => {
    return [
        ...props.todos
            .filter(todo => !todo.completions.includes(today)) // Unchecked items first
            .sort((a, b) => b.createdAt - a.createdAt),        // Sort newest to oldest
        ...props.todos
            .filter(todo => todo.completions.includes(today))  // Checked items
            .sort((a, b) => b.createdAt - a.createdAt)         // Sort newest to oldest
    ];
});


const deleteTodo = async (id) => {
    await todoStore.deleteTodo(id);
};

const toggleCompletion = async (todo) => {
    await todoStore.toggleCompletion(todo);
};

onMounted(async () => {
    await todoStore.fetchTodos();
});
</script>
<style lang="scss" scoped>
@use "sass:color";

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
    background-color: #f9f9f9;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #f1f1f1;
    }
}

.line-through {
    text-decoration: line-through;
    color: #999;
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

/* Animation classes for <transition-group> */
.todo-enter-active,
.todo-leave-active {
    transition: all 0.5s ease;
}

.todo-enter,
.todo-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.todo-move {
    transition: transform 0.5s ease;
}
</style>
