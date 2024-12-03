<template>
    <form @submit.prevent="handleSubmit" class="add-todo">
        <h1 class="add-todo__title">What are you thinking?</h1>
        <input v-model="name" type="text" placeholder="What's on your mind?" class="add-todo__input" />
        <button type="submit" :disabled="!name.trim()" class="add-todo__cta button">Add to List</button>
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
    } else {
        alert("Please enter a todo before submitting.");
        return;
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
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #2980b9;
        }

        &:disabled {
            background-color: #bdc3c7;
            cursor: not-allowed;
        }
    }
}
</style>
