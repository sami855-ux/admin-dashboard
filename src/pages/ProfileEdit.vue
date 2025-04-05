<script setup>
import EditProfileInput from "../util/EditProfileInput.vue"
import { useRouter } from "vue-router"
const router = useRouter()
</script>

<template>
  <div class="w-[80vw] h-fit">
    <span
      @click="router.back(-1)"
      class="w-10 cursor-pointer h-10 rounded-full flex items-center justify-center py-4 border border-gray-300 hover:bg-gray-200 transition duration-75"
    >
      <i class="pi pi-angle-left text-xl"></i>
    </span>
    <p class="text-semibold text-lg py-4">Dashboard - Profile Edit</p>
    <div class="w-[80%]">
      <EditProfileInput />
    </div>
  </div>
</template>
