<template>
    <HideFromUser>
        <div class="signup">
            <div class="signup-form">
                <h2 class="signup-title">Sign up</h2>
                <form @submit.prevent="handleSignup">
                    <input v-model="email" type="email" placeholder="Email" required class="signup-form_input" />
                    <input v-model="password" type="password" placeholder="Password" required
                        class="signup-form_input" />
                    <button type="submit" class="signup-form_input--cta">
                        Sign Up
                    </button>
                    <p v-if="authStore.signupError" class="error-text">
                        {{ authStore.signupError }}
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

const handleSignup = async () => {
    await authStore.signup(email.value, password.value);
};

definePageMeta({
    middleware: ['guest'],
});
</script>

<style lang="scss" scoped>
.signup {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.signup-form {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.signup-title {
    margin-bottom: 20px;
    text-align: center;
}

.signup-form_input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.signup-form_input--cta {
    width: 100%;
    padding: 10px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.signup-form_input--cta:hover {
    background-color: #2980b9;
}

.error-text {
    color: #e74c3c;
    text-align: center;
}
</style>
