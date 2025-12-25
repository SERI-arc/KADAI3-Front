import { defineStore } from 'pinia'
import axios from 'axios'

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
    region: 'japaneast',
    endpoint: 'https://api.cognitive.microsofttranslator.com/',
    wentCountry: '',
    wentCountryList: [],
    wentFlag: '',
    wentComment: ' ',
    wentArea: '',
  }),

  getters: {
    count(state) {
      return state.wentCountryList.length
    },
  },

  actions: {
    async getCountry() {
      while (this.num < 195) {
        const res1 = await axios.get(
          'https://restcountries.com/v3.1/independent?status=true&fields=name',
        )
        this.country = res1.data[`${this.num}`].name.common
        this.countryList.push(this.country)
        this.num++
      }
      this.countryList.sort()
    },
    async translate(text) {
      try {
        const response = await axios.post(
          `${this.endpoint}translate?api-version=3.0&from=en&to=ja`,
          [{ Text: text }],
          {
            headers: {
              'Ocp-Apim-Subscription-Key': this.apiKey,
              'Ocp-Apim-Subscription-Region': this.region,
              'Content-Type': 'application/json',
            },
          },
        )
        this.capitalLists = response.data[0].translations[0].text
        return this.capitalLists
      } catch (error) {
        console.error('Translation API Error:', error)
      }
    },
    async searchCountry() {
      const res1 = await axios.get(`https://restcountries.com/v3.1/name/${this.countries}`)
      console.log(res1)
      this.nation = res1.data[0].translations.jpn.official
      this.capitalList = res1.data[0].capital
      this.population = res1.data[0].population
      this.population = this.population.toLocaleString()
      this.flag = res1.data[0].flags.png
      this.area = res1.data[0].region
      console.log(this.area)
      console.log(this.capitalList)
      this.capitalLists = await this.translate(this.capitalList[0])
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
    },

    async getWentCountry() {
      const res3 = await axios.get(
        'https://m3h-serita-kadai3.greensea-425e64c6.japaneast.azurecontainerapps.io/api/WENT/SELECT',
      )
      this.wentCountryList = res3.data
    },

    async searchWentCountry() {
      const res4 = await axios.get(
        `https://m3h-serita-kadai3.greensea-425e64c6.japaneast.azurecontainerapps.io/api/WENTName/SELECT?Nation=${this.wentCountry}`,
      )
      this.wentCountry = res4.data.nation
      this.wentArea = res4.data.region
      this.wentComment = res4.data.comment
      this.wentFlag = res4.data.flag
    },
  },
})
