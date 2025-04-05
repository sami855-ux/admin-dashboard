<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const handleSubmit = () => {
  router.push({ name: "employeeList" })
}
</script>

<template>
  <div class="w-full h-fit flex flex-col justify-center">
    <section class="w-[100%] py-1 flex flex-col">
      <label for="name" class="py-2 text-[14px]">Category Title</label>
      <input
        type="text"
        name="name"
        class="border border-custom text-[14px] outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>

    <section class="w-[100%] pt-5 flex items-center justify-between mt-1">
      <button
        class="px-14 py-1 text-[14px] text-custom border border-custom rounded-md cursor-pointer hover:bg-custom"
      >
        Cancel
      </button>
      <button
        class="px-14 py-1 text-[14px] bg-blue-500 text-custom border border-custom rounded-md cursor-pointer hover:bg-blue-400"
        @click="handleSubmit"
      >
        Submit
      </button>
    </section>
  </div>
</template>
