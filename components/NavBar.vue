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
          <button @click="handleLogout" class="header__logout-cta button">
            Logout
          </button>
        </div>
      </HideFromGuest>
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
@use "sass:color";
@use "assets/mixins" as *;
@use "assets/variables" as *;

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

  &__logout {
    display: flex;
    justify-content: flex-end;
    margin-top: 0; // Remove margin-top to align with the title
  }
}
</style>
