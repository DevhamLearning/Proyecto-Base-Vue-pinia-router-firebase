
<template>
  <div>
    <h1>app.vue</h1>
    <nav v-if="!userStore.loadingSession">
      <router-link to="/" v-if="userStore.userData">Home</router-link>
      <router-link to="/Login" v-if="!userStore.userData">Login</router-link>
      <router-link to="/Register" v-if="!userStore.userData">Register</router-link>
      <button @click="userStore.logoutUsuario" v-if="userStore.userData">Logout</button>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>

<script setup>
import { useUserStore } from "./stores/user";
const userStore = useUserStore();
</script>
