<template>
    <form @submit.prevent="handleSubmit" class="add-todo">
        <h2 class="add-todo__title">What are you thinking?</h2>
        <input v-model="name" type="text" placeholder="Enter a new to-do item..." class="add-todo__input" />
        <button type="submit" class="add-todo__cta">Add to List</button>
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

<style lang="scss" scoped>
@use "sass:color";
@use "assets/mixins" as *;
@use "assets/variables" as *;

.add-todo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    &__title {
        margin-bottom: 10px;
        font-size: 1.5rem;
        text-align: center;
    }

    &__input {
        width: 70%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    &__cta {
        padding: 10px 20px;
        background-color: #3498db;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #2980b9;
        }
    }
}
</style>
