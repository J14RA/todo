<template>
    <div class="container">
        <transition-group name="todo" tag="ul" class="todo-list__items">
            <li v-for="todo in sortedTodos" :key="todo.id" class="todo-list__item">
                <div class="todo-list__card card">
                    <input type="checkbox" :checked="todo.completed" @change="toggleCompletion(todo)" />
                    <p>
                        <span :class="{ 'line-through': todo.completed }">
                            {{ todo.text }} - <small>{{ todo.createdAt }}</small>
                        </span>
                    </p>
                    <button class="todo-list__cta button" @click="deleteTodo(todo.id)">
                        Delete
                    </button>
                </div>
            </li>
        </transition-group>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useTodoStore } from "~/stores/todos";

const todoStore = useTodoStore();

// Fetch todos on mount
onMounted(async () => {
    await todoStore.fetchTodos();
});

// Delete a todo
const deleteTodo = async (id) => {
    await todoStore.deleteTodo(id);
};

// Toggle completion status
const toggleCompletion = async (todo) => {
    await todoStore.toggleCompletion(todo);
};

// Sort todos by completion status and creation time
const sortedTodos = computed(() => {
    return [
        ...todoStore.todos
            .filter((todo) => !todo.completed)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        ...todoStore.todos
            .filter((todo) => todo.completed)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    ];
});
</script>

<style lang="scss" scoped>
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
