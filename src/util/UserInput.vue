<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const handleSubmit = () => {
  router.push({ name: "employeeList" })
}
</script>

<template>
  <div class="w-full h-fit flex flex-col justify-center py-4">
    <section class="w-[100%] py-1 flex flex-col">
      <label for="name" class="py-2">username</label>
      <input
        type="text"
        name="name"
        class="border border-gray-200 outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label for="code" class="py-2">Mobile Phone</label>
      <input
        type="tel"
        name="code"
        class="border border-gray-200 outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label for="code" class="py-2">Email</label>
      <input
        type="email"
        name="code"
        class="border border-gray-200 outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label for="code" class="py-2">Role</label>
      <input
        type="text"
        name="code"
        class="border border-gray-200 outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>

    <section class="w-[100%] pt-5 flex items-center justify-between mt-1">
      <button
        class="px-16 py-2 text-gray-900 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-300"
      >
        Cancel
      </button>
      <button
        class="px-16 py-2 bg-blue-500 text-white border border-gray-300 rounded-md cursor-pointer hover:bg-blue-400"
        @click="handleSubmit"
      >
        Submit
      </button>
    </section>
  </div>
</template>
