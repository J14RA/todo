<template>
    <HideFromUser>


        <div class="login">
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
                </form>
            </div>

        </div>
    </HideFromUser>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';


const email = ref('')
const password = ref('')
const authStore = useAuthStore('')

const handleLogin = async () => {
    await authStore.login(email.value, password.value)
}

definePageMeta({
    middleware: ['guest'],
})

</script>

<style lang="scss" scoped></style>