<template>
    <h1>Register</h1>
    <!-- <button @click="userStore.registerUser('Ignacio Alvarado')">Acceder</button>-->

    <form @submit.prevent="handleSubmit">
        <input type="email" placeholder="ingrese Email" v-model="email">
        <input type="password" placeholder="ingrese contraseña" v-model="password">
        <button type="submit" :disabled="userStore.loadingUser"> Crear Usuario </button>
    </form>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { async } from "@firebase/util";

const userStore = useUserStore();
const email = ref('andres@test.com')
const password = ref('clave2020')

const handleSubmit = async() => {
    if(!email.value || password.value < 5) {
        return alert('Ingrese email y contraseña tiene que ser mayor a 5 caracteres');
    }
    console.log(email.value);
    console.log(password.value);
    console.log("Procesando registro");
    await userStore.registroUsuario(email.value, password.value);
}
</script>