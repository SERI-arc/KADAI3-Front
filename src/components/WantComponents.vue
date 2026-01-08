<script setup>
import { computed } from 'vue'
import { useNationStore } from '../stores/nation'

const nationStore = useNationStore()

const wantCountryList = computed(() => nationStore.wantCountryList)
const searchHotel = computed(() => nationStore.searchHotel)
const hotelList =computed(() => nationStore.hotelList)
const registerHotel = computed(() => nationStore.registerHotel)


</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-select
          :items="wantCountryList"
          label="国を選択してください"
          v-model="nationStore.wantCountry">
        </v-select>
      </v-col>
      <v-col cols="2">
        <v-btn class="ml-3" size="large" rounded="pill" @click="searchHotel">
          <v-icon icon="mdi-magnify" class="mr-1"></v-icon>
          ホテル検索
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="hotelLists in hotelList" v-bind:key=hotelLists.ID cols="12">
        <v-row dense align="center" justify="center">
          <v-card variant="elevated" elevation="5" color="#FAFAFA" class="w-50" rounded="x1" align="center" justify="center">
            <div class="d-flex ">
            <v-card color="#FAFAFA" variant="flat">
              <v-img :src="`${hotelLists.hotelPhotos}`"></v-img>
              <v-card-text >ホテル名：{{hotelLists.hotelName}}</v-card-text>
              <v-card-text >評価：{{hotelLists.hotelReview}}</v-card-text>
              <v-card-text v-bind:href="`${hotelLists.hotelUrl}`">公式サイト:{{ hotelLists.hotelUrl }}</v-card-text>
              <v-btn class="ml-3" size="large" rounded="pill" @click="registerHotel(`${ hotelLists.hotelName }`,`${hotelLists.hotelReview}`,`${hotelLists.hotelPhotos}`,`${hotelLists.hotelUrl}`)">
                <v-icon icon="mdi-magnify" class="mr-1"></v-icon>
                お気に入り登録
             </v-btn>
            </v-card>
            </div>
         </v-card>
        </v-row>
      </v-col>
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
