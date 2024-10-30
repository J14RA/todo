import { useAuthStore } from "@/stores/auth";

const PROTECTED_ROUTES = ["/"];
const GUEST_ONLY_ROUTES = ["/login", "/signup"];

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  const router = useRoute();

  authStore.setupAuthListener();

  const redirecUser = () => {
    const { path } = router.currentRouter.value;

    if (authStore.user) {
      if (GUEST_ONLY_ROUTES.includes(path)) {
        router.push("/");
      }
    }

    if (authStore.user) {
      if (PROTECTED_ROUTES.includes(path)) {
        router.push("/login");
      }
    }
  };
  watch(
    () => authStore.user,
    () => redirectUser()
  );
});
