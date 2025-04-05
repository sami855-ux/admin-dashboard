<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue"
import { useRouter } from "vue-router"

import User from "../../assets/user.png"
import Theme from "../../util/Theme.vue"

const isModalOpen = ref(false)
const isDarkMode = ref(false)
const router = useRouter()

const handleEdit = () => {
  router.push("/admin/editprofile")
  isModalOpen.value = false
}
const handleLogout = () => {
  router.push("/")
  isModalOpen.value = false
}

const handleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

const handleDarkMode = () => {
  console.log("Dark mode toggled", isDarkMode.value)
  isDarkMode.value = !isDarkMode.value
  applyTheme(!isDarkMode.value)
}

const applyTheme = (dark) => {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light")
}

const bodyClickHandler = (event) => {
  const el = event.target

  if (isModalOpen.value) {
    console.log(el)

    const modalLayout = document.querySelector(".modalLayout")

    if (modalLayout && !modalLayout.contains(el)) {
      console.log("Closing modal")
      isModalOpen.value = false
    }
  }
}

onMounted(() => {
  document.body.addEventListener("click", bodyClickHandler)
  // window.addEventListener("scroll", (e) => {
  //   handleModal()
  // })
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")
  isDarkMode.value = darkQuery.matches

  // listen for changes if system preference changes later
  darkQuery.addEventListener("change", (e) => {
    isDarkMode.value = e.matches
  })
})

onBeforeUnmount(() => {
  document.body.removeEventListener("click", bodyClickHandler)
  // window.removeEventListener("scroll")
})
</script>

<template>
  <div
    class="w-[95vw] lg:w-[79vw] h-16 header-custom items-center flex justify-end py-5"
  >
    <div class="w-fit h-full flex items-center space-x-10">
      <div
        class="relative w-fit h-full flex items-center border-r border-gray-500"
      >
        <i
          class="pi pi-bell text-custom mr-10 cursor-pointer font-bold hover:text-orange-600 transition ease-in-out duration-300"
        ></i>
      </div>
      <div
        class="w-fit h-full flex items-center space-x-3 relative modalLayout"
      >
        <img
          :src="User"
          alt="Image of the user"
          class="w-7 h-7 mr-7 rounded-full cursor-pointer modalLayout border border-gray-50 hover:border-orange-600 transition ease-in-out duration-300"
          @click="handleModal"
        />

        <Theme :isDarkMode="isDarkMode" :handleDarkMode="handleDarkMode" />
        <!-- Modal -->
        <div
          :class="`${
            isModalOpen
              ? 'opacity-100 top-[55px] visible'
              : 'opacity-0 top-[35px] invisible'
          } fixed modalLayout w-52 lg:w-66 h-[220px] lg:h-[240px] bg-custom top-[35px] right-10 rounded-lg transition-all duration-500 ease-in-out transform flex items-center flex-col p-2 lg:p-5`"
          id="modal"
        >
          <i
            class="pi pi-times text-sm cursor-pointer text-custom absolute right-3 top-3"
            @click="handleModal"
          ></i>
          <img
            :src="User"
            alt="Image of the user"
            class="w-10 h-10 rounded-full"
          />
          <p class="py-1 text-[14px] text-custom mb-3 border-b border-gray-300">
            Samuel Tale Dejene
          </p>
          <p class="py-1 text-center text-[13px] text-custom">
            samitale86@gmail.com
          </p>
          <p class="py-1 text-center text-[13px] text-custom">+251978109304</p>
          <p class="text-[13px] text-custom">Admin</p>
          <div class="w-full flex items-center justify-center space-x-4 mt-3">
            <span
              class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-200"
            >
              <i
                class="pi pi-pencil text-[13px] cursor-pointer text-custom"
                @click="handleEdit"
              ></i>
            </span>
            <span
              class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-200"
            >
              <i
                class="pi pi-sign-out text-[13px] cursor-pointer text-custom"
                @click="handleLogout"
              ></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
