<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const handleBack = () => {
  router.go(-1)
}
</script>

<template>
  <main class="">
    <h1 class="text-center text-3xl pt-20">Not found</h1>
    <p
      class="py-2 cursor-pointer text-blue-600 text-center"
      @click="handleBack"
    >
      Go back
    </p>
  </main>
</template>
