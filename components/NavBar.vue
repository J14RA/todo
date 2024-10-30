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
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

const handleLogout = async () => {
    await authStore.logout();
};
</script>

<style lang="sass" scoped></style>
