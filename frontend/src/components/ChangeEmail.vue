<template>
  <div>
    <q-input v-model="email" label="New Mail" filled />
    <q-btn label="Change E-Mail" @click="changeEmail" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { api } from '../boot/axios';
import jwtDecode from 'jwt-decode';

const email = ref('');

function changeEmail() {
  const decodedToken = jwtDecode(JSON.parse(localStorage.getItem('authToken')));
  api
    .patch(`/${decodedToken.id}`, {
      email: email.value,
    })
    .then(response => {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
}
</script>
