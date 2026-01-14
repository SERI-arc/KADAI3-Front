<script setup>
import { computed,watch,onMounted } from 'vue'
import { useNationStore } from '../stores/nation'

const nationStore = useNationStore()
const selectHotelList =computed(() => nationStore.selectHotelList)


onMounted(() => {
  nationStore.selectHotel()
})
const watchHotelList =computed(() => nationStore.watchHotelList)

watch(watchHotelList.value,()=>{
  nationStore.selectHotel()
})




</script>

<template>
  <v-container>
    <v-row>
      <v-col v-for="selectHotelLIsts in selectHotelList" v-bind:key=selectHotelLIsts.ID cols="6">
        <v-row dense align="center" justify="center">
          <v-card variant="elevated" elevation="5" color="#FAFAFA" class="w-80" rounded="x1">
            <div class="d-flex ">
              <v-card color="#FAFAFA" variant="flat">
                <v-img :src="`${selectHotelLIsts.hotelPhotos}`" ></v-img>
                <v-card-text >{{selectHotelLIsts.hotelName}}</v-card-text>
                <v-card-text >評価：{{selectHotelLIsts.hotelReview}}</v-card-text>
                <v-card-text>
                <v-btn  v-bind:href="`${selectHotelLIsts.hotelUrl}`" text min-height="30" width="1000" class="x-small post-link align-center">
                  <span class="url">公式サイト</span>
                </v-btn>
              </v-card-text>
              </v-card>
            </div>
          </v-card>
        </v-row>
     </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.url {
  display: inline-block;;
  padding: 2px 8px;
  border-radius: 5px;
  max-width: calc(100% - 30px);
  height: inherit !important;
}

</style>
