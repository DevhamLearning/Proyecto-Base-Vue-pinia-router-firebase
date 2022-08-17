<template>
    <h1>Home - {{ userStore.userData }}</h1>
    <h1>email: {{ userStore.userData?.email }}</h1>
</template>

<script setup>
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
</script>