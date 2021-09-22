<template>
  <div>
    <header>
      <q-toolbar>
        <q-btn label="Home" @click="router.push('/')" flat stretch />
        <q-space />
        <q-btn round flat>
          <q-avatar color="white"
            >JP
            <q-menu>
              <User />
            </q-menu>
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import User from '../components/User.vue';

const router = useRouter();
</script>
<style lang="sass">
header
  background-color: green
  height: 50px
  .q-btn
</style>
