<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-app-bar style="background-color: rgb(128, 128, 128)" class="bar">
      <v-app-bar-title
        class="text-white"
        style="position: absolute; left: 50%; transform: translateX(-50%)"
        >旅行先管理App</v-app-bar-title
      >
    </v-app-bar>
    <v-main>
     <RouterView />
    </v-main>

    <nav>
      <RouterLink to="/">検索</RouterLink>
      <RouterLink to="/Favorite">旅行した国</RouterLink>
    </nav>
  </v-app>
</template>

<style scoped>
.bar {
  position: relative;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}
</style>
