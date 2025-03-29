<script setup>
import { RouterView } from "vue-router"

import AdminNavbar from "./Navbar.vue"
import Menu from "./Menu.vue"
</script>

<template>
  <div class="dashboard">
    <Menu />
    <div class="flex flex-col gap-4 content ml-28 md:ml-[320px]">
      <AdminNavbar />
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  gap: 25px;
}
.content {
  flex-grow: 1;
}
</style>
