import { defineStore } from "pinia";
import { format } from "date-fns";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todos: [],
    error: null,
  }),
  actions: {
    async fetchTodos() {
      this.error = null;
      const { $db, $auth } = useNuxtApp();
      try {
        const todosQuery = query(
          collection($db, "todos"), // Ensure this matches your Firestore collection name
          where("userId", "==", $auth.currentUser.uid)
        );
        const snapshot = await getDocs(todosQuery);
        this.todos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        this.error = error.message;
        console.log(this.error);
      }
    },
    async addTodo(name) {
      this.error = null;
      const { $db, $auth } = useNuxtApp();
      const todo = {
        name,
        completions: [],
        userId: $auth.currentUser.uid,
      };
      try {
        const docRef = await addDoc(collection($db, "todos"), todo); // Ensure this matches your Firestore collection name
        this.todos.push({ id: docRef.id, ...todo });
      } catch (error) {
        this.error = error.message;
      }
    },
    async updateTodo(id, updates) {
      this.error = null;
      const { $db } = useNuxtApp();
      try {
        const docRef = doc($db, "todos", id); // Ensure this matches your Firestore collection name
        await updateDoc(docRef, updates);
        const index = this.todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          this.todos[index] = { ...this.todos[index], ...updates };
        }
      } catch (error) {
        this.error = error.message;
      }
    },
    async deleteTodo(id) {
      const { $db } = useNuxtApp();
      try {
        const docRef = doc($db, "todos", id); // Ensure this matches your Firestore collection name
        await deleteDoc(docRef);
        this.todos = this.todos.filter((todo) => todo.id !== id);
      } catch (error) {
        this.error = error.message;
      }
    },
    toggleCompletion(todo) {
      const today = format(new Date(), "yyyy-MM-dd");
      if (todo.completions.includes(today)) {
        todo.completions = todo.completions.filter((date) => date !== today);
      } else {
        todo.completions.push(today);
      }
      this.updateTodo(todo.id, {
        completions: todo.completions,
      });
    },
    resetTodos() {
      this.todos = [];
    },
  },
});
