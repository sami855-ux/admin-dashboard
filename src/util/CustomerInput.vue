<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const handleSubmit = () => {
  router.push({ name: "customerList" })
}
</script>

<template>
  <div class="w-full h-fit flex flex-col justify-center">
    <section class="w-[100%] mb-2 flex flex-col mt-1">
      <label for="services" class="py-2 text-[14px]">Category</label>
      <select
        name="options"
        class="border bg-color border-custom text-[14px] outline-none py-2 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in cursor-pointer"
      >
        <option value="option1" selected>Select Option</option>
        <option value="option2">Normal customer</option>
        <option value="option3">Special customer</option>
      </select>
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label for="qrCode" class="py-2 text-[14px]">QR Code</label>
      <input
        type="text"
        name="qrCode"
        class="border border-custom text-[14px] outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label for="customername" class="py-2 text-[14px]">Customer Name</label>
      <input
        type="text"
        name="customername"
        class="border border-custom text-[14px] outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>

    <section class="w-[100%] py-1 flex flex-col">
      <label for="phonenumber" class="py-2 text-[14px]">Mobile phone</label>
      <input
        type="tel"
        name="phonenumber"
        class="border border-custom text-[14px] outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label for="email" class="py-2 text-[14px]">Email</label>
      <input
        type="email"
        name="email"
        class="border border-custom text-[14px] outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label class="py-1 text-[14px]">Sex</label>
      <div class="w-full flex flex-row space-x-5">
        <label class="text-[14px]">
          <input type="radio" name="option" value="Male" class="" />
          Male
        </label>
        <label class="text-[14px]">
          <input
            type="radio"
            name="option"
            value="Female"
            class="cursour-pointer"
          />
          Female
        </label>
        <label class="text-[14px]">
          <input type="radio" name="option" value="other" class="" />
          Other
        </label>
      </div>
    </section>

    <section class="w-[100%] py-2 mb-5 flex flex-col mt-1">
      <label for="services" class="py-2 text-[14px]">Assigned Employee</label>
      <select
        name="options"
        class="border bg-color border-custom text-[14px] outline-none py-2 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in cursor-pointer"
      >
        <option value="option1" selected>Select Option</option>
        <option value="option2">Abel Abate</option>
        <option value="option3">John doe</option>
      </select>
    </section>

    <section class="w-[100%] py-1 flex flex-col">
      <label for="remark" class="py-2 text-[14px]">Remark</label>
      <input
        type="text"
        name="remark"
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
