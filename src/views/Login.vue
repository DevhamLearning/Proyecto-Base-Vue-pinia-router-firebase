<template>
    <h1>Autenticar Usuario</h1>
    <form @submit.prevent="handleSubmit">
        <input type="email" placeholder="ingrese Email" v-model="email">
        <input type="password" placeholder="ingrese contraseña" v-model="password">
        <button type="submit"> Verificar Usuario </button>
    </form>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";
import router from "../router";
import { async } from "@firebase/util";

const userStore = useUserStore();
const email = ref('andres@test.com')
const password = ref('clave2020')

const handleSubmit = async () => {
    if (!email.value || password.value < 5) {
        return alert('Ingrese email y contraseña tiene que ser mayor a 5 caracteres');
    }
    await userStore.LoginUsuario(email.value, password.value);
    //console.log(email.value);
    //console.log(this.userData);
    console.log("Validando registro");
}
</script>