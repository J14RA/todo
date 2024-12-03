import { defineStore } from "pinia";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todos: [],
    error: null,
  }),
  actions: {
    // Fetch todos for the current user
    async fetchTodos() {
      this.error = null;
      const { $db, $auth } = useNuxtApp();
      try {
        const todosQuery = query(
          collection($db, "todos"),
          where("userId", "==", $auth.currentUser.uid)
        );
        const snapshot = await getDocs(todosQuery);
        this.todos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        this.error = error.message;
        console.error("Failed to fetch todos:", error);
      }
    },

    // Add a new todo
    async addTodo(text) {
      this.error = null;
      const { $db, $auth } = useNuxtApp();
      const todo = {
        text,
        userId: $auth.currentUser.uid,
        createdAt: new Date().toISOString(), // Add creation timestamp
        completed: false, // Add completed field
      };
      try {
        const docRef = await addDoc(collection($db, "todos"), todo);
        this.todos.unshift({ id: docRef.id, ...todo });
      } catch (error) {
        this.error = error.message;
        console.error("Failed to add todo:", error);
      }
    },
    async toggleCompletion(todo) {
      this.error = null;
      const { $db } = useNuxtApp();
      try {
        const docRef = doc($db, "todos", todo.id);
        await updateDoc(docRef, { completed: !todo.completed });
        const index = this.todos.findIndex((t) => t.id === todo.id);
        if (index !== -1) {
          this.todos[index].completed = !todo.completed;
        }
      } catch (error) {
        this.error = error.message;
      }
    },

    // Delete a todo by ID
    async deleteTodo(id) {
      this.error = null;
      const { $db } = useNuxtApp();
      try {
        const docRef = doc($db, "todos", id);
        await deleteDoc(docRef);
        this.todos = this.todos.filter((todo) => todo.id !== id);
      } catch (error) {
        this.error = error.message;
        console.error("Failed to delete todo:", error);
      }
    },

    // Clear all todos (for UI reset purposes)
    resetTodos() {
      this.todos = [];
    },
  },
});
