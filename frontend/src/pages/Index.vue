<template>
  <div>
    <div>Hallo {{ user.email }}</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { api } from '../boot/axios';
import jwtDecode from 'jwt-decode';

let user = ref('');

onMounted(async () => {
  const decodedToken = jwtDecode(
    JSON.parse(localStorage.getItem('authToken'))
  );
  user.value = await (await api.get(`/${decodedToken.id}`)).data;
});
</script>
