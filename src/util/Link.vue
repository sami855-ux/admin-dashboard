<script setup>
import { RouterLink } from "vue-router"

const { path, name, iconName, collapse } = defineProps({
  path: {
    type: String,
    default: "/admin",
  },
  name: {
    type: String,
    default: "Overview",
  },
  iconName: String,
})
</script>

<template>
  <RouterLink
    class="link flex items-center justify-center md:justify-start space-x-2.5 relative"
    :to="path"
  >
    <i :class="`pi ${iconName} text-xl`"></i>
    <p class="text-gray-900 pt-1 hidden md:block">{{ name }}</p>
  </RouterLink>
</template>
