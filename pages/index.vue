<template>
    <div class="todo-list">
        <TodoForm />
        <TodoList :todos="todoStore.todos" />

    </div>
</template>

<script setup>
import { useTodoStore } from '~/stores/todos';
import TodoForm from '~/components/TodoForm.vue';
import TodoList from '~/components/TodoList.vue';

const todoStore = useTodoStore()

onMounted(async () => {
    todoStore.fetchTodos()
})

definePageMeta({
    middleware: ['auth'],
})

</script>

<style lang="scss" scoped></style>