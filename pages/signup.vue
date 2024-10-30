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
                        Login
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
import { useAuthStore } from '~/stores/auth';


const email = ref('')
const password = ref('')
const authStore = useAuthStore('')

const handleSignup = async () => {
    await authStore.signup(email.value, password.value)
}

definePageMeta({
    middleware: ['guest'],
})

</script>

<style lang="scss" scoped></style>