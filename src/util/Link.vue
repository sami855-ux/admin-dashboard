<script setup>
import { RouterLink } from "vue-router"

const { path, name, iconName, isLargeScreen, handleMenu } = defineProps({
  path: {
    type: String,
    default: "/admin",
  },
  name: {
    type: String,
    default: "Overview",
  },
  iconName: String,
  isLargeScreen: {
    type: Boolean,
    default: false,
  },
  handleMenu: {
    type: Function,
    default: () => {},
  },
})
</script>

<template>
  <RouterLink
    class="link flex items-center space-x-2.5 relative"
    :to="path"
    @click="
      () => {
        if (isLargeScreen) return

        handleMenu()
      }
    "
  >
    <i :class="`pi ${iconName} `"></i>
    <p class="text-gray-900 text-[13px] block">{{ name }}</p>
  </RouterLink>
</template>
