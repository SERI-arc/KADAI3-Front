import { defineStore } from 'pinia'
import axios from 'axios'
import { trunkSelectStrategy } from 'vuetify/lib/composables/nested/selectStrategies'

export const useNationStore = defineStore('nation', {
  state: () => ({
    country: [''],
    countryList: [],
    num: 0,
    countries: '',
    flag: '',
    nation: '',
    comment: ' ',
    capitalList: [],
    capitalLists: '',
    population: '',
    area: '',
    wentCountry: '',
    wentCountries:'',
    wentCountryList: [],
    wentFlag: '',
    wentComment: ' ',
    wentArea: '',
    selectArea:'',
    areaCountryList:[],
    areaCountryNum:0,
    areaCountryListNum:0,
    wantCountry:'',
    wantCountryList:[],
    wantFlag: '',
    wantComment: ' ',
    wantArea: '',
    hotelList:[],
    hotelNum:0,
    i:0,
    searchHotelNum:0,
    selectHotelNum:0,
    selectHotelListNum:0,
    selectHotelList:[],
    watchHotelList:[]
  }),

  getters: {
    count(state) {
      return state.wentCountryList.length
    },
  },

  actions: {
    async getCountry() {
      while (this.num < 195) {
        const res = await axios.get(
          'https://restcountries.com/v3.1/independent?status=true&fields=name',
        )
        this.country = res.data[`${this.num}`].name.common
        this.countryList.push(this.country)
        this.num++
      }
      this.countryList.sort()
    },

    async searchCountry() {
      const res = await axios.get(`https://restcountries.com/v3.1/name/${this.countries}`)
      console.log(res)
      this.nation = res.data[0].translations.jpn.official
      this.capitalList = res.data[0].capital
      this.population = res.data[0].population
      this.population = this.population.toLocaleString()
      this.flag = res.data[0].flags.png
      this.area = res.data[0].region
      this.capitalLists = this.capitalList[0]
    },

    async registerWant() {
      await axios.post(
        'https://m3h-serita-kadai3.greensea-425e64c6.japaneast.azurecontainerapps.io/api/WANT/INSERT',
        {
          Nation: this.nation,
          Capital: this.capitalLists,
          Region: this.area,
          Flag: this.flag,
          Comment: this.comment,
        },
      )
      if(this.wantCountryList.includes(this.nation)){
        console.log("重複しています")
      }else{
      this.wantCountryList.push(this.nation)
      this.wantCountryList.sort()
      }
    },

    async selectWantCountry() {
      const res = await axios.get(
        `https://m3h-serita-kadai3.greensea-425e64c6.japaneast.azurecontainerapps.io/api/WANT/SELECT?Nation=${this.wantCountry}`,
      )
      this.wantCountry = res.data.NationList[0]?.nation??''
      this.wantArea = res.data.NationList[0]?.region??''
      this.wantComment = res.data.NationList[0]?.comment??''
      this.wantFlag = res.data.NationList[0]?.flag??''
    },

    async registerWent() {
      await axios.post(
        'https://m3h-serita-kadai3.greensea-425e64c6.japaneast.azurecontainerapps.io/api/WENT/INSERT',
        {
          Nation: this.nation,
          Capital: this.capitalLists,
          Region: this.area,
          Flag: this.flag,
          Comment: this.comment,
        },
      )
      if(this.wentCountryList.includes(this.nation)){
        console.log("重複しています")
      }else{
        this.wentCountryList.push(this.nation)
        this.wentCountryList.sort()
      }
    },

    async selectWentCountry() {
      console.log(this.wentCountry)
      const res = await axios.get(
        `https://m3h-serita-kadai3.greensea-425e64c6.japaneast.azurecontainerapps.io/api/WENT/SELECT?Nation=${this.wentCountry}`,
      )
      console.log(res)
      this.wentCountries = res.data.NationList[0]?.Nation??''
      this.wentArea = res.data.NationList[0]?.Region??''
      this.wentComment = res.data.NationList[0]?.Comment??''
      this.wentFlag = res.data.NationList[0]?.Flag??''
      console.log(this.wentCountry)
    },


    async selectArea(){
      const res= await axios.get(
        `https://m3h-serita-kadai3.greensea-425e64c6.japaneast.azurecontainerapps.io/api/AREA/SELECT?Area=${this.selectArea}`
      )
        this.areaCountryNum=res.data.NationList.length
        console.log(res)
        this.areaCountryList = []
        this.areaCountryListNum=0
      while(this.areaCountryListNum<this.areaCountryNum){
        const areaCountry={
        ID:this.areaCountryListNum,
        Country : res.data.NationList[0]?.nation??'',
        Area :res.data.NationList[0]?.region??'',
        Comment :res.data.NationList[0]?.comment??'',
        Flag : res.data.NationList[0]?.flag??''
      }
          this.areaCountryList.push(areaCountry)
          this.areaCountryListNum++
      }
    },

     async searchHotel(){
      console.log(this.wantCountry)
      const apiKey=import.meta.env.VITE_API_KEY;
      const res =await axios.post(
       `https://places.googleapis.com/v1/places:searchText`,
        {
          textQuery: `hotel ${this.wantCountry}`,
          includedType: 'hotel'
        },
        {
          headers:{
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': `${apiKey}`,
            'X-Goog-FieldMask':'places.displayName,places.formattedAddress,places.priceLevel,places.rating,places.photos.authorAttributions.photoUri,places.websiteUri'
          }
        }
      )
       this.hotelNum=res.data.places.length
        console.log(res)
        console.log(this.hotelNum)
        this.hotelList = []
        this.searchHotelNum=0
        while(this.searchHotelNum<this.hotelNum){
        const hotel = {
          ID:this.searchHotelNum,
          hotelName: res.data.places[this.searchHotelNum]?.displayName?.text??'',
          hotelReview: res.data.places[this.searchHotelNum]?.rating??'',
          hotelPhotos: res.data.places[this.searchHotelNum]?.photos[0]?.authorAttributions[0]?.photoUri??'',
          hotelUrl: res.data.places[this.searchHotelNum]?.websiteUri??'',
          hotelCountry:this.wantCountry
        }
        this.hotelList.push(hotel)
        this.searchHotelNum++
      }
      console.log(this.hotelList)
    },
    async registerHotel(hotelName,hotelReview,hotelPhotos,hotelUrl) {
      const watchHotel={
      watchHotelName:hotelName,
      watchHotelReview:hotelReview,
      watchHotelPhotos:hotelPhotos,
      watchHotelUrl:hotelUrl
      }
      await axios.post(
        'https://m3h-serita-kadai3.greensea-425e64c6.japaneast.azurecontainerapps.io/api/HOTEL/INSERT',
        {
          HotelName:hotelName,
          Review:hotelReview,
          Photos:hotelPhotos,
          Link:hotelUrl,
          HotelCountry:this.wantCountry
        },
      )
        this.watchHotelList.push(watchHotel)
        console.log(this.watchHotelList)
    },

    async selectHotel() {
      const res = await axios.get(
        `https://m3h-serita-kadai3.greensea-425e64c6.japaneast.azurecontainerapps.io/api/HOTEL/SELECT`,
      )
      console.log(res)
      this.selectHotelListNum=res.data.HotelList.length
      this.selectHotelNum=0
      while(this.selectHotelNum<this.selectHotelListNum){
      const hotel = {
          ID:res.data.HotelList[this.selectHotelNum]?.ID??'',
          hotelName: res.data.HotelList[this.selectHotelNum]?.HotelName??'',
          hotelReview: res.data.HotelList[this.selectHotelNum]?.Review??'',
          hotelPhotos: res.data.HotelList[this.selectHotelNum]?.Photos??'',
          hotelUrl: res.data.HotelList[this.selectHotelNum]?.Link??'',
        }

          this.selectHotelList.push(hotel)
          this.selectHotelNum++
          console.log(this.watchHotelList)
      }
    }
}
})
