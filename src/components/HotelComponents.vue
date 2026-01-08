<script setup>
import { computed,watch,onMounted } from 'vue'
import { useNationStore } from '../stores/nation'

const nationStore = useNationStore()

onMounted(() => {
  nationStore.selectHotel()
})
const watchHotelList =computed(() => nationStore.watchHotelList)

watch(watchHotelList.value,()=>{
  nationStore.selectHotel()
})

const count = computed(() => nationStore.count)
const selectHotelList =computed(() => nationStore.selectHotelList)

//const selectHotel = computed(() => nationStore.selectHotel)


</script>

<template>
  <v-container>
    <v-row>
      <v-col v-for="selectHotelLIsts in selectHotelList" v-bind:key=selectHotelLIsts.ID cols="12">
        <v-row dense align="center" justify="center">
          <v-card variant="elevated" elevation="5" color="#FAFAFA" class="w-50" rounded="x1">
            <div class="d-flex ">
              <v-card color="#FAFAFA" variant="flat">
                <v-img :src="`${selectHotelLIsts.hotelPhotos}`" ></v-img>
                <v-card-text >ホテル名：{{selectHotelLIsts.hotelName}}</v-card-text>
                <v-card-text >評価：{{selectHotelLIsts.hotelReview}}</v-card-text>
                <v-card-text v-bind:href="`${selectHotelLIsts.hotelUrl}`">公式サイト:{{ selectHotelLIsts.hotelUrl }}</v-card-text>
              </v-card>
            </div>
          </v-card>
        </v-row>
     </v-col>
    </v-row>
    <v-row align="center" justify="center">
    <v-col cols="auto">お気に入り登録数：{{ count }}か国</v-col>
    </v-row>
  </v-container>
</template>

