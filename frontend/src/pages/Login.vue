<template>
  <div class="row justify-center items-center">
    <q-card>
      <q-form @submit="login">
        <q-input v-model="email" label="E-Mail" filled />
        <q-input v-model="password" label="Password" type="password" filled />
        <div>
          <q-btn label="Login" type="submit" />
        </div> </q-form
    ></q-card>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { api } from '../boot/axios';

const router = useRouter();

const email = ref('');
const password = ref('');

function login() {
  api
    .post('/login', {
      email: email.value,
      password: password.value,
    })
    .then(response => {
      if (response.data.authToken) {
        localStorage.setItem(
          'authToken',
          JSON.stringify(response.data.authToken)
        );
      }
      router.push({
        path: '/',
      });
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
</script>
