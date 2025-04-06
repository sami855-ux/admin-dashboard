<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from "vue"
import { RouterLink } from "vue-router"
import { useRouter } from "vue-router"

import Link from "../..//util/Link.vue"
import Logo from "../../assets/logo1.png"

const state = reactive({
  transactionBtn: false,
  registrationBtn: false,
  isLargeScreen: true,
})
const screenWidth = ref(window.innerWidth)

const router = useRouter()

const handleTransactionBtn = () => {
  state.transactionBtn = !state.transactionBtn
  state.registrationBtn = false
}
const handleRegistrationBtn = () => {
  state.registrationBtn = !state.registrationBtn
  state.transactionBtn = false
}
const handleCollapse = () => {
  state.transactionBtn = false
  state.registrationBtn = false
}
const handleMenu = () => {
  state.isLargeScreen = !state.isLargeScreen
  if (state.isLargeScreen) {
    state.transactionBtn = false
    state.registrationBtn = false
  }
}

const logout = () => {
  router.push({ name: "Loginpage" })
}
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth

  if (screenWidth.value < 1024) {
    state.isLargeScreen = false
  } else {
    state.isLargeScreen = true
  }
  console.log(state.isLargeScreen)
}

onMounted(() => {
  screenWidth.value = window.innerWidth
  if (screenWidth.value < 1024) {
    state.isLargeScreen = false
  } else {
    state.isLargeScreen = true
  }
  window.addEventListener("resize", updateScreenWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenWidth)
})
</script>

<template>
  <div
    :class="`${
      state.isLargeScreen ? 'w-[240px] bg-custom ' : 'w-20'
    } fixed h-screen transition-all duration-500 ease-in-out z-50`"
  >
    <div
      :class="`${
        state.isLargeScreen ? 'hidden' : 'flex'
      } w-16 h-16  flex items-center justify-center relative z-100`"
    >
      <span
        className="w-10 h-10 rounded-full bg-color flex items-center justify-center"
      >
        <i
          class="pi pi-bars cursor-pointer hover:text-gray-600 transition ease-in-out"
          @click="handleMenu"
        ></i>
      </span>
    </div>

    <!-- Overlay -->
    <teleport to="body">
      <div
        v-if="state.isLargeScreen"
        class="fixed top-0 left-0 w-screen h-screen bg-black/50 z-40 lg:hidden"
        @click="handleMenu"
      />
    </teleport>
    <div
      :class="`${
        state.isLargeScreen ? 'left-0' : 'left-[-100%]'
      } fixed z-50 w-[240px] text-custom h-screen flex-col items-center py-2 transition-all duration-500 ease-in-out `"
    >
      <i
        class="pi pi-times cursor-pointer text-gray-950 lg:invisible hover:text-gray-600 transition ease-in-out relative left-3 top-2"
        @click="handleMenu"
      ></i>
      <div
        class="w-full h-16 flex items-center justify-center flex-row space-x-2"
      >
        <img :src="Logo" alt="Logo for the Mo Spa" class="w-14 h-14" />
        <div class="">
          <h2 class="font-bold pt-1 text-[15px] text-custom">Mo Spa</h2>
          <p class="text-[12px] text-custom flex">Admin dashboard</p>
        </div>
      </div>
      <div :class="`w-full max-h-[75vh] px-4 mt-8 overflow-scroll`">
        <p class="text-custom text-[13px] flex">Main-menu</p>
        <ul class="w-full h-fit flex flex-col my-1 pl-1">
          <Link
            path="/admin/dashboard"
            iconName="pi-home"
            name="Overview"
            :isLargeScreen="state.isLargeScreen"
            :handleMenu="handleMenu"
          />
        </ul>
        <ul class="w-full h-fit flex flex-col pl-1 space-y-1">
          <li
            class="link flex items-center relative justify-between cursor-pointer"
            @click="handleTransactionBtn"
          >
            <div class="w-fit h-full flex items-center space-x-2.5">
              <i class="pi pi-wallet"></i>
              <p class="text-custom pt-1 flex text-[13px]">Transaction</p>
            </div>
            <span class="flex">
              <i
                :class="`hidden pi ${
                  !state.transactionBtn ? 'pi-angle-right' : 'pi-angle-down'
                }   text-custom pt-1 cursor-pointer mr-2 `"
              ></i>
            </span>
          </li>
          <!-- Sub-menu for Transaction -->
          <div
            v-if="state.transactionBtn"
            class="w-full h-fit bg-custom md:px-5"
            @click="
              () => {
                if (screenWidth > 1024) return

                handleMenu()
              }
            "
          >
            <ul class="w-full h-fit flex flex-col my-1 pl-2">
              <RouterLink
                class="link flex items-center space-x-2 relative"
                to="/admin/pending"
              >
                <p class="text-custom text-[13px]">Pending Transaction</p>
              </RouterLink>
              <RouterLink
                class="link flex items-center space-x-2 relative"
                to="/admin/completed"
                @click="handleClick"
              >
                <p class="text-custom text-[13px]">Completed Transaction</p>
              </RouterLink>
            </ul>
          </div>
          <li
            class="link flex items-center relative justify-between cursor-pointer"
            @click="handleRegistrationBtn"
          >
            <div class="w-fit h-full flex items-center space-x-2.5">
              <i class="pi pi-user-plus"></i>
              <p class="text-custom text-[13px] pt-1 flex">Registration</p>
            </div>

            <span class="flex">
              <i
                :class="`pi ${
                  !state.registrationBtn ? 'pi-angle-right' : 'pi-angle-down'
                }   text-custom pt-1 cursor-pointer mr-2`"
              ></i>
            </span>
          </li>
          <!-- Sub-menu for registration -->
          <div
            v-if="state.registrationBtn"
            class="w-full h-fit bg-custom md:px-5"
            @click="
              () => {
                if (screenWidth > 1024) return
                handleMenu()
              }
            "
          >
            <ul class="w-full h-fit flex flex-col items-center my-1 pl-2">
              <RouterLink
                class="link flex items-center md:space-x-2.5 relative"
                to="/admin/employee"
                @click="handleClick"
              >
                <p class="text-custom pt-1 text-[13px]">Employee List</p>
              </RouterLink>
              <RouterLink
                class="link flex items-center space-x-2.5 relative"
                to="/admin/customer"
                @click="handleClick"
              >
                <p class="text-custom pt-1 text-[13px]">Customer List</p>
              </RouterLink>
              <RouterLink
                class="link flex items-center space-x-2.5 relative"
                to="/admin/service"
                @click="handleClick"
              >
                <p class="text-custom pt-1 text-[13px]">Service List</p>
              </RouterLink>
              <RouterLink
                class="link flex items-center space-x-2.5 relative"
                to="/admin/catagory"
                @click="handleClick"
              >
                <p class="text-custom pt-1 text-[13px]">Category List</p>
              </RouterLink>
            </ul>
          </div>

          <!-- /sub menu ends -->

          <Link
            path="/admin/report"
            :isLargeScreen="state.isLargeScreen"
            iconName="pi-file"
            name="Report"
            :handleMenu="handleMenu"
          />
          <Link
            path="/admin/backup"
            :isLargeScreen="state.isLargeScreen"
            iconName="pi-download"
            name="Backup"
            :handleMenu="handleMenu"
          />
        </ul>

        <ul class="w-full h-fit flex flex-col my-2 pl-1">
          <Link
            path="/admin/users"
            :isLargeScreen="state.isLargeScreen"
            iconName="pi-users"
            name="Users"
            :handleMenu="handleMenu"
          />
          <span @click="logout">
            <Link
              path="admin/logout"
              :isLargeScreen="state.isLargeScreen"
              iconName="pi-sign-out"
              name="Logout"
              :handleMenu="handleMenu"
            />
          </span>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.link {
  width: 100%;
  height: 45px;
  padding-block: 8px;
  transition: all 0.2s ease;
  padding-inline: 5px;
  border-radius: 5px;
}
.link.router-link-exact-active::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 5px;
  height: 100%;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  background: linear-gradient(to bottom, rgb(61, 139, 240), rgb(16, 128, 226));
}

.link.router-link-exact-active i {
  color: rgb(249, 237, 234);
}

.link:hover {
  background-color: #aad1f5; /* Light theme hover color */
}

/* Dark theme hover */
[data-theme="dark"] .link:hover {
  background-color: #26374e; /* Dark theme hover color (change as needed) */
}
</style>
