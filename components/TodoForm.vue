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

<style lang="scss" scoped>
.add-todo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.add-todo_form {
    width: 70%;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.add-todo--cta {
    padding: 10px 20px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.add-todo--cta:hover {
    background-color: #2980b9;
}
</style>
