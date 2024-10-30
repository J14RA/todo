<template>
    <div>
        <ul class="todo-list_items">
            <li v-for="todo in todos" :key="todo.id" class="todo-list_item">
                <div class="todo-list_card">
                    <input type="checkbox" class="" @change="toggleCompletion(todo)"
                        :checked="todo.completions.includes(today)" />
                    <p class="">
                        <span :class="{ 'line-through': todo.completions.includes(today) }">
                            {{ todo.name }}
                        </span>
                    </p>
                    <button class="todo-list_card--cta" @click="deleteTodo(todo.id)">
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

const props = defineProps({
    todos: Array,
})

const todoStore = useTodoStore()

const deleteTodo = async (id) => {
    await todoStore.deleteTodo(id)
}
const toggleCompletion = async (todo) => {
    await todoStore.toggleCompletion(todo)
}

const today = format(new Date(), 'yyyy-MM-dd')
</script>

<style lang="scss" scoped></style>
