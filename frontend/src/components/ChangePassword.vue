<template>
  <div>
    <q-input v-model="password" label="New Password" filled />
    <q-input v-model="passwordConfirm" label="Confirm New Password" filled />
    <q-btn label="Change E-Mail" @click="changePassword" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { api } from '../boot/axios';
import jwtDecode from 'jwt-decode';

const password = ref('');
const passwordConfirm = ref('');

function changePassword() {
  if (password.value === passwordConfirm.value) {
    const decodedToken = jwtDecode(
      JSON.parse(localStorage.getItem('authToken'))
    );
    api
      .patch(`/${decodedToken.id}`, {
        password: password.value,
      })
      .then(response => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
</script>
