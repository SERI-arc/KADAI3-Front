<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-app-bar class="bar">
      <v-app-bar-title class="title"
        >旅行先管理App
      </v-app-bar-title>
        <nav>
          <RouterLink to="/" class="Link">検索</RouterLink>
          <RouterLink to="/Favorite" class="Link">旅行した国</RouterLink>
          <RouterLink to="/Want" class="Link">行きたい国</RouterLink>
          <RouterLink to="/Hotel" class="Link">ホテル</RouterLink>
        </nav>
    </v-app-bar>
    <v-main>
     <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
.bar {
  position: relative;
}
.title{
  color:black;
  float:right;
}
nav {
  font-size: 12px;
  text-align: center;
  float:right;
}
.Link{
  color:black;
}
</style>
