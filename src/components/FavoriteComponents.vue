<script setup>
import { computed ,watch,onMounted} from 'vue'
import { useNationStore } from '../stores/nation'

const nationStore = useNationStore()

const wentCountryList = computed(() => nationStore.wentCountryList)
const selectWentCountry = computed(() => nationStore.selectWentCountry)
const wentArea = computed(() => nationStore.wentArea)
const wentComment = computed(() => nationStore.wentComment)
const wentCountries = computed(() => nationStore.wentCountries)
const wentFlag = computed(() => nationStore.wentFlag)
const registerWentCountryList = computed(() => nationStore. registerWentCountryList)

onMounted(() => {
  nationStore.searchWentCountry()
})

watch(registerWentCountryList.value,()=>{
  nationStore.searchWentCountry()
})

</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-select
          :items="wentCountryList"
          label="国を選択してください"
          v-model="nationStore.wentCountry"
        ><option v-for="wentCountryLists in wentCountryList.nation" v-bind:key="wentCountryLists.nation">{wentCountryLists}</option>
        </v-select>
      </v-col>
      <v-col cols="2">
        <v-btn class="ml-3" size="large" rounded="pill" @click="selectWentCountry">
          <v-icon icon="mdi-magnify" class="mr-1"></v-icon>
          表示
        </v-btn>
      </v-col>
    </v-row>
    <v-row dense align="center" justify="center">
      <v-col cols="12">
        <v-row align="center" justify="center">
         <v-card variant="elevated" elevation="5"
          color="#FAFAFA" class="w-50" rounded="x1" align="center" justify="center"  v-if="wentCountries!=''">
        <div class="d-flex justify-center" >
          <v-card color="#FAFAFA"
            variant="flat">
           <v-img :src="`${ wentFlag }`"></v-img>
           <v-card-text>国名：{{wentCountries}}</v-card-text>
           <v-card-text>地域：{{wentArea}}</v-card-text>
           <v-card-text>コメント：{{wentComment}}</v-card-text>
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
