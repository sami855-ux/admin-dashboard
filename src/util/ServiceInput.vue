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
      <label for="name" class="py-2 text-[14px]">Category Name</label>
      <input
        type="text"
        name="name"
        class="border border-custom text-[14px] outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label for="code" class="py-2 text-[14px]">Service Code</label>
      <input
        type="text"
        name="code"
        class="border border-custom text-[14px] outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label for="title" class="py-2 text-[14px]">Service Title</label>
      <input
        type="text"
        name="title"
        class="border border-custom text-[14px] outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label for="price" class="py-2 text-[14px]">Price</label>
      <input
        type="number"
        name="price"
        class="border border-custom text-[14px] outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>

    <section class="w-[100%] py-2 mb-5 flex flex-col mt-1">
      <label for="services" class="py-2 text-[14px]">Service Group</label>
      <select
        name="options"
        class="border border-custom text-[14px] bg-color outline-none py-2 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in cursor-pointer"
      >
        <option value="option1" selected>Tegure Korach</option>
        <option value="option2">Yewust srawoch</option>
        <option value="option3">Spa</option>
      </select>
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
