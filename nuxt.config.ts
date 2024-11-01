// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
  plugins: ["@/plugins/firebase.client.js", "@/plugins/authSetup.client.js"],
  css: ["@/assets/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
        sass: {
          api: "modern",
        },
      },
    },
  },
});
