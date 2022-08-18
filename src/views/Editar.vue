<template>
    <div>
        <h4>Editar id: route.params {{ route.params.id }}</h4>
        <form @submit.prevent="handleSubmit">
            <input type="text" size="60" placeholder="Ingrese URL" v-model="url">
            <button type="submit">Editar</button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDatabaseStore } from "../stores/database";

const databaseStore = useDatabaseStore();
const route = useRoute();
const router = useRouter();


const handleSubmit = () => {
    databaseStore.updateUrl(route.params.id, url.value);
}

const url = ref('')

onMounted(async () => {
    url.value = await databaseStore.leerUrl(route.params.id);
});

</script>