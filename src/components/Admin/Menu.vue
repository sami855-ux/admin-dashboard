<script setup>
import { reactive } from "vue"
import { RouterLink } from "vue-router"

import Link from "../..//util/Link.vue"
import Logo from "../../assets/logo1.png"

const state = reactive({
  transactionBtn: false,
  registrationBtn: false,
})

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
</script>

<template>
  <div
    class="fixed w-[100px] md:w-[285px] h-screen flex flex-col items-center py-10 bg-slate-100 transition-all duration-500 ease-in-out"
    id="menu"
  >
    <div class="w-full h-40 flex items-center justify-center flex-col">
      <img :src="Logo" alt="Logo for the Mo Spa" class="w-20 h-20" />
      <h2 class="font-bold text-gray-800 pt-2">Mo Spa</h2>
      <p class="py-2 text-sm text-gray-700 hidden md:flex">Admin dashboard</p>
    </div>
    <div :class="`w-full max-h-[75vh] px-4 mt-8 overflow-scroll`">
      <p class="text-gray-600 text-[15px] hidden md:flex">Main-menu</p>
      <ul class="w-full h-fit flex flex-col my-2 pl-1">
        <Link path="/admin/dashboard" iconName="pi-home" name="Overview" />
      </ul>
      <ul class="w-full h-fit flex flex-col my-2 pl-1 space-y-1">
        <li
          class="link flex items-center relative justify-center md:justify-between cursor-pointer"
          @click="handleTransactionBtn"
        >
          <div class="w-fit h-full flex items-center space-x-2.5">
            <i class="pi pi-wallet text-xl"></i>
            <p class="text-gray-900 pt-1 hidden md:flex">Transaction</p>
          </div>
          <span class="hidden md:flex">
            <i
              :class="`hidden pi ${
                !state.transactionBtn ? 'pi-angle-right' : 'pi-angle-down'
              }  text-xl text-gray-800 pt-1 cursor-pointer mr-2 `"
            ></i>
          </span>
        </li>
        <!-- Sub-menu for Transaction -->
        <div
          v-if="state.transactionBtn"
          class="w-full h-fit bg-gray-100 md:px-5"
        >
          <ul class="w-full h-fit flex flex-col my-1 md:pl-1">
            <RouterLink
              class="link flex items-center md:space-x-2.5 relative"
              to="/"
            >
              <p class="text-gray-900 pt-1">Pending Transaction</p>
            </RouterLink>
            <RouterLink
              class="link flex items-center space-x-2.5 relative"
              to="/"
              @click="handleClick"
            >
              <p class="text-gray-900 pt-1">Completed Transaction</p>
            </RouterLink>
          </ul>
        </div>
        <li
          class="link flex items-center relative justify-center md:justify-between cursor-pointer"
          @click="handleRegistrationBtn"
        >
          <div class="w-fit h-full flex items-center space-x-2.5">
            <i class="pi pi-user-plus text-xl"></i>
            <p class="text-gray-900 pt-1 hidden md:flex">Registration</p>
          </div>

          <span class="hidden md:flex">
            <i
              :class="`pi ${
                !state.registrationBtn ? 'pi-angle-right' : 'pi-angle-down'
              }  text-xl text-gray-800 pt-1 cursor-pointer mr-2`"
            ></i>
          </span>
        </li>
        <!-- Sub-menu for registration -->
        <div
          v-if="state.registrationBtn"
          class="w-full h-fit bg-gray-100 md:px-5"
        >
          <ul class="w-full h-fit flex flex-col items-center my-1 pl-1">
            <RouterLink
              class="link flex items-center md:space-x-2.5 relative"
              to="/"
              @click="handleClick"
            >
              <p class="text-gray-900 pt-1">Employee List</p>
            </RouterLink>
            <RouterLink
              class="link flex items-center space-x-2.5 relative"
              to="/"
              @click="handleClick"
            >
              <p class="text-gray-900 pt-1">Customer List</p>
            </RouterLink>
            <RouterLink
              class="link flex items-center space-x-2.5 relative"
              to="/"
              @click="handleClick"
            >
              <p class="text-gray-900 pt-1">Service List</p>
            </RouterLink>
            <RouterLink
              class="link flex items-center space-x-2.5 relative"
              to="/"
              @click="handleClick"
            >
              <p class="text-gray-900 pt-1">Category List</p>
            </RouterLink>
          </ul>
        </div>

        <!-- /sub menu ends -->

        <Link path="/report" iconName="pi-file" name="Report" />
        <Link path="/backup" iconName="pi-download" name="Backup" />
      </ul>

      <ul class="w-full h-fit flex flex-col my-2 pl-1">
        <Link path="/users" iconName="pi-users" name="Users" />

        <Link path="/logout" iconName="pi-sign-out" name="Logout" />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.link {
  width: 100%;
  height: 54px;
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
  background: linear-gradient(to bottom, rgb(61, 178, 240), rgb(25, 77, 199));
}
.link:hover {
  background-color: #c7d8f1;
}
</style>
