import { defineStore } from "pinia";
import { useTodoStore } from "@/stores/todos";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loginError: null,
    signupError: null,
    initialAuthValueReady: false,
  }),

  actions: {
    setupAuthListener() {
      const { $auth } = useNuxtApp();

      if ($auth) {
        onAuthStateChanged($auth, (user) => {
          this.user = user || null;
          this.initialAuthValueReady = true;
        });
      } else {
        console.error("Firebase Auth is not initialized");
      }
    },

    // signup
    async signup(email, password) {
      const { $auth } = useNuxtApp();

      this.signupError = null;

      try {
        const cred = await createUserWithEmailAndPassword(
          $auth,
          email,
          password
        );
      } catch (error) {
        this.signupError = error.message;
      }
    },

    // logout
    async logout() {
      const { $auth } = useNuxtApp();
      const todoStore = useTodoStore();

      await signOut($auth);
      todoStore.resetTodos();
    },

    // login
    async login(email, password) {
      const { $auth } = useNuxtApp();
      this.loginError = null;
      try {
        const cred = await signInWithEmailAndPassword($auth, email, password);
        this.user = cred.user;
      } catch (error) {
        this.loginError = "Invalid email or password. Please try again.";
      }
    },
  },
});
