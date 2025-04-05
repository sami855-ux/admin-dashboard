<script setup>
import { RouterLink } from "vue-router"
import { watch, ref, onMounted, onBeforeUnmount } from "vue"

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
  },
  handleMenu: {
    type: Function,
    default: () => {},
  },
})

const screenWidth = ref(window.innerWidth)

const handleClick = () => {
  if (screenWidth.value < 1024) {
    handleMenu()
  }
}

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  screenWidth.value = window.innerWidth
  window.addEventListener("resize", updateScreenWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenWidth)
})
</script>

<template>
  <RouterLink
    class="link flex items-center space-x-2.5 relative"
    :to="path"
    @click="handleClick"
  >
    <i :class="`pi ${iconName} text-custom`"></i>
    <p class="text-custom text-[14px] block">{{ name }}</p>
  </RouterLink>
</template>
