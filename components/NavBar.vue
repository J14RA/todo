<template>
    <header class="header">
        <div class="header__left">
            <NuxtLink to="/">
                <h1 class="header__title">To-Do List</h1>
            </NuxtLink>
        </div>
        <div class="header__right">
            <HideFromGuest>
                <div class="header__logout">
                    <button @click="handleLogout" class="header__logout-cta button">Logout</button>
                </div>
            </HideFromGuest>
            <HideFromUser>
                <div class="header__user">
                    <NuxtLink to="/login" class="header__user-cta">Login</NuxtLink>
                    <NuxtLink to="/signup" class="header__user-cta">Sign Up</NuxtLink>
                </div>
            </HideFromUser>
        </div>
    </header>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
const handleLogout = async () => {
    await authStore.logout();
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $primary-color;
    padding: 20px;

    &__title {
        color: $text-color;
        font-size: 2rem;
        margin: 0;
    }

    &__left,
    &__right {
        display: flex;
        align-items: center;
    }

    &__user,
    &__logout {
        display: flex;
        justify-content: flex-end;
        margin-top: 0; // Remove margin-top to align with the title
    }

    &__user-cta,
    &__logout-cta {
        color: $text-color;
        text-decoration: none;
        margin-right: 10px;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
