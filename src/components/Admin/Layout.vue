<script setup>
import { RouterView } from "vue-router"

import AdminNavbar from "./Navbar.vue"
import Menu from "./Menu.vue"
</script>

<template>
  <div class="dashboard">
    <Menu />
    <div
      class="w-[77vw] lg:w-full flex flex-col gap-2 content mx-10 lg:px-0 lg:ml-[260px]"
    >
      <AdminNavbar />
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  gap: 5px;
}
.content {
  flex-grow: 1;
}
</style>
