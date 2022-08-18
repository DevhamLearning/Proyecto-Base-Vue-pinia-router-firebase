
import { useDatabaseStore } from '../stores/database';

<template>
    <div>

        <!--<h1>Home - {{ userStore.userData }}</h1>-->
        <h1>email: {{ userStore.userData?.email }}</h1>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="url" v-model.trimp="url" />
            <button type="submit" :disabled="databaseStore.loadingDoc">Agregar</button>
        </form>
        <ul v-if="!databaseStore.loading">
            <li v-for="item of databaseStore.documents" :key="item.id">
                {{ item.id }} <br />
                {{ item.name }} <br />
                {{ item.short }}
                <div>
                    <button @click="databaseStore.deleteUrl(item.id)" :disabled="databaseStore.loadingDoc">
                        Eliminar
                    </button>
                    <button @click="router.push(`/editar/${item.id}`)">
                        Editar
                    </button>
                </div>
            </li>
        </ul>
        <div v-else>loading...</div>
    </div>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const databaseStore = useDatabaseStore();
const router = useRouter();

const url = ref("");
const handleSubmit = async () => {
    await databaseStore.addUrl(url.value);
    console.log("agregado", url.value);
};

onBeforeMount(async () => {
    await databaseStore.getUrls();
});
</script>