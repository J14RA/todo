<template>
    <HideFromUser>
        <div class="signup">
            <div class="signup-form">
                <h2 class="signup-form__title">Sign up</h2>
                <form @submit.prevent="handleSignup">
                    <input v-model="email" type="email" placeholder="Email" required class="signup-form__input" />
                    <div class="signup-form__input-wrapper">
                        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password"
                            required class="signup-form__input" />
                        <button type="button" @click="togglePasswordVisibility" class="signup-form__toggle-password">
                            {{ showPassword ? 'Hide' : 'Show' }}
                        </button>
                    </div>
                    <div class="signup-form__input-wrapper">
                        <input :type="showPassword ? 'text' : 'password'" v-model="confirmPassword"
                            placeholder="Confirm Password" required class="signup-form__input" />
                        <button type="button" @click="togglePasswordVisibility" class="signup-form__toggle-password">
                            {{ showPassword ? 'Hide' : 'Show' }}
                        </button>
                    </div>
                    <button type="submit" class="signup-form__cta button">
                        Sign Up
                    </button>
                    <p v-if="authStore.signupError" class="signup-form__error">
                        {{ authStore.signupError }}
                    </p>
                    <p v-if="passwordMismatch" class="signup-form__error">
                        Passwords do not match.
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
const confirmPassword = ref('');
const showPassword = ref(false);
const authStore = useAuthStore();
const passwordMismatch = ref(false);

const handleSignup = async () => {
    if (password.value !== confirmPassword.value) {
        passwordMismatch.value = true;
        return;
    }
    passwordMismatch.value = false;
    await authStore.signup(email.value, password.value);
};

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

definePageMeta({
    middleware: ['guest'],
});
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "assets/mixins" as *;
@use "assets/variables" as *;

.signup {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    &-form {
        width: 50%;
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

        &__title {
            color: $primary-color;
            margin-bottom: 20px;
            text-align: center;
        }

        &__input-wrapper {
            position: relative;
            width: 100%;
            margin-bottom: 10px;
        }

        &__input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        &__toggle-password {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            color: #3498db;
        }

        &__cta {
            width: 100%;
            padding: 10px;
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

        &__error {
            color: #e74c3c;
            text-align: center;
        }
    }
}
</style>
