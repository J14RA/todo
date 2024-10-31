<template>
    <header class="header">
        <NuxtLink to="/">
            <h1 class="header-title">To-Do List</h1>
        </NuxtLink>
    </header>
    <div>
        <HideFromGuest>
            <div class="logout">
                <button @click="handleLogout" class="logout--cta">Logout</button>
            </div>
        </HideFromGuest>
        <HideFromUser>
            <div class="user">
                <NuxtLink to="/login" class="user--cta">Login</NuxtLink>
                <NuxtLink to="/signup" class="user--cta">Sign Up</NuxtLink>
            </div>
        </HideFromUser>
    </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

const handleLogout = async () => {
    await authStore.logout();
};
</script>

<style lang="scss" scoped>
.header {
    background-color: #3498db;
    padding: 20px;
    text-align: center;

    .header-title {
        color: #fff;
        font-size: 2rem;
        margin: 0;
    }
}

button {
    background-color: #e74c3c;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #c0392b;
    }

    &:disabled {
        background-color: #95a5a6;
        cursor: not-allowed;
    }
}

.user--cta {
    color: #3498db;
    text-decoration: none;
    margin-right: 10px;

    &:hover {
        text-decoration: underline;
    }
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.logout,
.user {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
</style>
