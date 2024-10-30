import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyAdsHc1znyW7ILMIDHe99K2glcRQCE9WdE",
    authDomain: "todo-list-45584.firebaseapp.com",
    projectId: "todo-list-45584",
    storageBucket: "todo-list-45584.appspot.com",
    messagingSenderId: "137584188536",
    appId: "1:137584188536:web:2a2620272981492690a18d",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  return {
    provide: {
      db,
      auth,
    },
  };
});
