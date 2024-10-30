<template>
    <form @submit.prevent="handleSubmit" class="add-todo">
        <input v-model="name" type="text" placeholder="Enter a new to do list..." class="add-todo_form" />
        <button type="submit" class="add-todo--cta">Add to List</button>
    </form>
</template>

<script setup>
import { ref } from "vue";
import { useTodoStore } from '~/stores/todos';

const name = ref("");
const todoStore = useTodoStore();

const handleSubmit = async () => {
    if (name.value.trim()) {
        await todoStore.addTodo(name.value);
        name.value = "";
    }
};
</script>

<style lang="scss" scoped></style>
