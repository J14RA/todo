import { defineStore } from "pinia";
import { useNuxtApp } from "#app";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loginError: null,
    signupError: null,
    initialAuthValuerReady: false,
  }),
  actions: {
    setupAuthListener() {
      if (process.client) {
        const { $auth } = useNuxtApp();
        if ($auth) {
          onAuthStateChanged($auth, (user) => {
            this.user = user || null;
            console.log("user state change:", this.user);
            this.initialAuthValueReady = true;
          });
        } else {
          console.error("Firebase Auth is not initialized");
        }
      }
    },
    async signup(email, password) {
      if (process.client) {
        const { $auth } = useNuxtApp();
        this.signupError = null;

        try {
          await createUserWithEmailAndPassword($auth, email, password);
        } catch (error) {
          this.signupError = error.message;
        }
      }
    },
    async logout() {
      if (process.client) {
        const { $auth } = useNuxtApp();
        const todoStore = useTodoStore();

        await signOut($auth);
        todoStore.resetHabits();
      }
    },
    async login(email, password) {
      if (process.client) {
        const { $auth } = useNuxtApp();
        this.loginError = null;

        try {
          await signInWithEmailAndPassword($auth, email, password);
        } catch (error) {
          this.loginError = error.message;
        }
      }
    },
  },
});
