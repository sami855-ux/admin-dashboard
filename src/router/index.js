import { createRouter, createWebHistory } from "vue-router"

import Login from "../pages/Login.vue"
import NotFound from "../pages/NotFound.vue"
import AdminDashboard from "../pages/AdminDashboard.vue"
import AdminLayout from "../components/Admin/Layout.vue"
import PendingTransaction from "../pages/PendingTransaction.vue"
import CompletedTransaction from "../pages/CompletedTransaction.vue"
import EmployeeList from "../pages/EmployeeList.vue"
import CustomerList from "../pages/CustomerList.vue"
import ServiceList from "../pages/ServiceList.vue"
import CatagoryList from "../pages/CatagoryList.vue"
import Report from "../pages/Report.vue"
import Backup from "../pages/Backup.vue"
import Users from "../pages/Users.vue"
import ProfileEdit from "../pages/ProfileEdit.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Loginpage",
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
        {
          path: "pending",
          name: "pendingTransaction",
          component: PendingTransaction,
        },
        {
          path: "completed",
          name: "completedTransaction",
          component: CompletedTransaction,
        },
        {
          path: "employee",
          name: "employeeList",
          component: EmployeeList,
        },
        {
          path: "customer",
          name: "customerList",
          component: CustomerList,
        },
        {
          path: "service",
          name: "ServiceList",
          component: ServiceList,
        },
        {
          path: "catagory",
          name: "catagoryList",
          component: CatagoryList,
        },
        {
          path: "report",
          name: "Report",
          component: Report,
        },
        {
          path: "backup",
          name: "Backup",
          component: Backup,
        },
        {
          path: "users",
          name: "Users",
          component: Users,
        },
        {
          path: "editprofile",
          name: "EditProfile",
          component: ProfileEdit,
        },
      ],
    },

    {
      path: "/:pathMatch(.*)*",
      name: "NotFoundPage",
      component: NotFound,
    },
  ],
})

export default router
