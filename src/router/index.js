import { createRouter, createWebHistory } from "vue-router"

import Login from "../pages/Login.vue"
import NotFound from "../pages/NotFound.vue"
import AdminDashboard from "../pages/AdminDashboard.vue"
import AdminLayout from "../components/Admin/Layout.vue"

const router = createRouter({
  history: createWebHistory(import.meta.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login page",
      component: Login,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminLayout,
      children: [
        {
          path: "dashboard",
          name: "adminDashboard",
          component: AdminDashboard,
        },
      ],
    },

    {
      path: "/catchAll(.*)",
      name: "Not found page",
      component: NotFound,
    },
  ],
})

export default router
