<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-app-bar class="bar" style="  background-color: #E6EE9C;">
      <v-app-bar-title class="title" >
        Trip Note
        <nav>
          <RouterLink to="/" class="Link" style=" color:rgba(0,0,0, 0.5)">検索</RouterLink>
          <RouterLink to="/Favorite" class="Link" style=" color:rgba(0,0,0, 0.5)">旅行した国</RouterLink>
          <RouterLink to="/Want" class="Link" style=" color:rgba(0,0,0, 0.5)">行きたい国</RouterLink>
          <RouterLink to="/Hotel" class="Link" style=" color:rgba(0,0,0, 0.5)">ホテル</RouterLink>
        </nav>
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
     <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
.bar {
  position: relative;
  height:60px;
 }

.title{
  color:black;
  float:right;
  font-family: "Luckiest Guy", cursive;
  font-weight: 400;
  font-style: normal
}
nav {
  font-size: 10px;

}
.Link{
  color:black;
}
.v-application{
    font-family: "M Plus 1p" !important;
}

</style>
