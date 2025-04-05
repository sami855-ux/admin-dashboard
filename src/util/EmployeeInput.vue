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
      <label for="firstname" class="py-2 text-[14px]">First Name</label>
      <input
        type="text"
        name="firstname"
        class="border border-custom-two text-[14px] outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label for="middleName" class="py-2 text-[14px]">Middle Name</label>
      <input
        type="text"
        name="middleName"
        class="border border-gray-200 text-[14px] outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label for="lastName" class="py-2 text-[14px]">Last Name</label>
      <input
        type="text"
        name="lastName"
        class="border border-gray-200 text-[14px] outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label for="phonenumber" class="py-2 text-[14px]">Mobile phone</label>
      <input
        type="tel"
        name="phonenumber"
        class="border border-gray-200 text-[14px] outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label for="email" class="py-2 text-[14px]">Email</label>
      <input
        type="email"
        name="email"
        class="border border-gray-200 text-[14px] outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-1 flex flex-col">
      <label class="py-1 text-[14px]">Sex</label>
      <div class="w-full flex flex-row space-x-5">
        <label class="text-[14px]">
          <input type="radio" name="option" value="Male" class="text-[14px]" />
          Male
        </label>
        <label class="text-[14px]">
          <input
            type="radio"
            name="option"
            value="Female"
            class="cursour-pointer text-[14px]"
          />
          Female
        </label>
        <label class="text-[14px]">
          <input type="radio" name="option" value="other" class="text-[14px]" />
          Other
        </label>
      </div>
    </section>
    <section class="w-[100%] py-2 flex flex-col mt-1">
      <label for="birthDate" class="py-2 text-[14px]">Birth Date</label>
      <input
        type="date"
        name="birthDate"
        class="border border-gray-200 text-[14px] outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-2 flex flex-col mt-1">
      <label for="joinedDate" class="py-2 text-[14px]">Joined Date</label>
      <input
        type="date"
        name="joinedDate"
        class="border border-gray-200 text-[14px] outline-none py-1 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in"
      />
    </section>
    <section class="w-[100%] py-2 mb-5 flex flex-col mt-1">
      <label for="services" class="py-2 text-[14px]">Service</label>
      <select
        name="options"
        class="border border-gray-200 text-[14px] outline-none py-2 rounded-md px-2 active:border-blue-500 focus:border-blue-500 transition ease-in cursor-pointer"
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
