<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const handleSubmit = () => {
  router.push({ name: "customerList" })
}
</script>

<template>
  <div class="w-full h-fit flex flex-col justify-center py-4">
    <section class="w-[100%] py-2 mb-5 flex flex-col mt-1">
      <label for="services" class="py-2">Category</label>
      <select
        name="options"
        class="border border-gray-200 outline-none py-3 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in cursor-pointer"
      >
        <option value="option1" selected>Select Option</option>
        <option value="option2">Normal customer</option>
        <option value="option3">Special customer</option>
      </select>
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label for="qrCode" class="py-2">QR Code</label>
      <input
        type="text"
        name="qrCode"
        class="border border-gray-200 outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label for="customername" class="py-2">Customer Name</label>
      <input
        type="text"
        name="customername"
        class="border border-gray-200 outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>

    <section class="w-[100%] py-1 flex flex-col">
      <label for="phonenumber" class="py-2">Mobile phone</label>
      <input
        type="tel"
        name="phonenumber"
        class="border border-gray-200 outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label for="email" class="py-2">Email</label>
      <input
        type="email"
        name="email"
        class="border border-gray-200 outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label class="py-1">Sex</label>
      <div class="w-full flex flex-row space-x-5">
        <label>
          <input type="radio" name="option" value="Male" class="" />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="option"
            value="Female"
            class="cursour-pointer"
          />
          Female
        </label>
        <label>
          <input type="radio" name="option" value="other" class="" />
          Other
        </label>
      </div>
    </section>

    <section class="w-[100%] py-2 mb-5 flex flex-col mt-1">
      <label for="services" class="py-2">Assigned Employee</label>
      <select
        name="options"
        class="border border-gray-200 outline-none py-3 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in cursor-pointer"
      >
        <option value="option1" selected>Select Option</option>
        <option value="option2">Abel Abate</option>
        <option value="option3">John doe</option>
      </select>
    </section>

    <section class="w-[100%] py-1 flex flex-col">
      <label for="remark" class="py-2">Remark</label>
      <input
        type="text"
        name="remark"
        class="border border-gray-200 outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-5 mb-4 flex items-center justify-between mt-1">
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
