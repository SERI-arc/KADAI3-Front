<script setup>
import { computed, onMounted } from 'vue'
import { useNationStore } from '../stores/nation'

const nationStore = useNationStore()

onMounted(() => {
  nationStore.getWentCountry()
})

const count = computed(() => nationStore.count)
const wentCountryList = computed(() => nationStore.wentCountryList)
const searchWentCountry = computed(() => nationStore.searchWentCountry)
const wentCountry = computed(() => nationStore.searchWentCountry)
</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-select
          :items="wentCountryList"
          label="国を選択してください"
          v-model="nationStore.wentCountry"
        >
        </v-select>
      </v-col>
      <v-col cols="2">
        <v-btn class="ml-3" size="large" rounded="pill" @click="searchWentCountry">
          <v-icon icon="mdi-magnify" class="mr-1"></v-icon>
          表示
        </v-btn>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col v-for="favoriteNation in favoriteNations" :key="favoriteNation.name" cols="6">
        <v-card class="d-flex align-center pa-3">
          <v-img :src="favoriteNation.flag" width="100" height="100" class="mr-4" cover></v-img>
          <div class="flex-grow-1 text-left">
            <div class="text-h6">{{ wentCountry }}</div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="auto">お気に入り登録数：{{ count }}か国</v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.map-container {
  margin-top: 30px;
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
}
</style>
