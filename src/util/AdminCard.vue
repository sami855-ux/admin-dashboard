<script setup>
const { iconName, title, number } = defineProps({
  iconName: String,
  title: String,
  number: String,
})
</script>

<template>
  <div class="w-96 md:w-72 h-36 bg-slate-100 rounded-2xl flex p-5 space-x-2">
    <i :class="`pi ${iconName} text-4xl text-blue-500`"></i>
    <div class="flex flex-col space-y-4 ml-4">
      <h2 class="font-semibold text-3xl pb-2">{{ number }}</h2>
      <p class="text-gray-500">{{ title }}</p>
    </div>
  </div>
</template>
