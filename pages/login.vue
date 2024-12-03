<template>
    <HideFromUser>
        <div class="login container">
            <div class="login-form">
                <h2 class="login-title">Login</h2>
                <form @submit.prevent="handleLogin">
                    <input v-model="email" type="email" placeholder="Email" required class="login-form_input" />
                    <input v-model="password" type="password" placeholder="Password" required
                        class="login-form_input" />
                    <button type="submit" class="login-form_input--cta">
                        Login
                    </button>
                    <p v-if="authStore.loginError" class="error-text">
                        {{ authStore.loginError }}
                    </p>
                    <p class="signup-text">
                        Don't have an account? <NuxtLink to="/signup" class="signup-link">Sign Up</NuxtLink>
                    </p>
                </form>
            </div>
        </div>
    </HideFromUser>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();

const handleLogin = async () => {
    await authStore.login(email.value, password.value);
};

definePageMeta({
    middleware: ['guest'],
});
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "assets/mixins" as *;
@use "assets/variables" as *;

.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    &-title {
        color: $primary-color;
        margin-bottom: 20px;
        text-align: center;
    }

    &-form {
        width: 30rem;
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    &-form_input {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    &-form_input--cta {
        width: 100%;
        padding: 10px;
        background-color: #3498db;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        :hover {
            background-color: #2980b9;
        }
    }

}

.error-text {
    color: #e74c3c;
    text-align: center;
}

.signup-text {
    color: black;
    text-align: center;
    margin-top: 10px;
}

.signup-link {
    color: #3498db;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
}
</style>
