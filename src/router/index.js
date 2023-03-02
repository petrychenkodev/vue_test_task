import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../components/Welcome.vue";

const routes = [
  { path: "/", name: "welcome", component: Welcome },
  {
    path: "/userDetails/:id",
    name: "userDetails",
    component: () => import("../components/UserDetails.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
