<script setup>
import { ref } from "vue"

import User from "../../assets/user.png"

const isModalOpen = ref(false)

const handleModal = () => {
  isModalOpen.value = !isModalOpen.value
}
</script>

<template>
  <div
    class="w-[80vw] h-20 items-center flex border-b border-gray-200 justify-between mt-4 py-3"
  >
    <div class="w-66 h-full flex items-center space-x-2.5">
      <i class="pi pi-search text-xl text-gray-600"></i>
      <input
        type="text"
        placeholder="You can search anything"
        class="w-full py-2 px-2 outline-none text-[15px]"
      />
    </div>
    <div class="w-fit h-full flex items-center space-x-10">
      <div
        class="relative w-fit h-[50%] flex items-center border-r border-gray-500"
      >
        <i
          class="pi pi-bell text-xl text-gray-600 mr-10 cursor-pointer font-bold"
        ></i>
      </div>
      <div class="w-fit h-full flex items-center space-x-3 relative">
        <img
          :src="User"
          alt="Image of the user"
          class="w-10 h-10 rounded-full cursor-pointer"
          @click="handleModal"
        />
        <p class="text-gray-800 pr-9 cursor-pointer" @click="handleModal">
          Samuel Tale
        </p>
        <i
          class="pi pi-angle-down text-xl cursor-pointer"
          @click="handleModal"
        ></i>

        <!-- Modal -->
        <div
          :class="`${
            isModalOpen ? 'opacity-100 right-0' : 'opacity-0 right-[-100%] '
          } fixed w-72 h-[280px] bg-slate-50/90 top-[85px] right-4 rounded-md transition-all duration-300 ease-in-out transform border border-gray-200 flex items-center flex-col p-2 `"
        >
          <i
            class="pi pi-times text-sm cursor-pointer text-gray-700 absolute right-3 top-3"
            @click="handleModal"
          ></i>
          <img
            :src="User"
            alt="Image of the user"
            class="w-16 h-16 rounded-full"
          />
          <p class="py-1 text-lg mb-3">Samuel Tale Dejene</p>
          <p class="py-1 text-center text-sm text-gray-700">
            samitale86@gmail.com
          </p>
          <p class="py-1 text-center text-sm text-gray-700">+251978109304</p>
          <p class="text-sm text-gray-700">Admin</p>
          <div class="w-full flex items-center justify-center space-x-4 mt-8">
            <span
              class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200"
            >
              <i class="pi pi-pencil text-sm cursor-pointer text-gray-900"></i>
            </span>
            <span
              class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200"
            >
              <i
                class="pi pi-sign-out text-sm cursor-pointer text-gray-900"
              ></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
