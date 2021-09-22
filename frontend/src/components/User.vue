<template>
  <q-list style="min-width: 100px">
    <q-item>
      <q-item-section
        ><q-btn label="Manage Account" @click="router.push('/account')" v-close-popup
      /></q-item-section>
    </q-item>
    <q-separator />
    <q-item>
      <q-item-section
        ><q-btn label="Logout" @click="logout"
      /></q-item-section> </q-item
  ></q-list>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();

function logout() {
  localStorage.removeItem('authToken');
  router.push({
    path: '/login',
  });
}
</script>
