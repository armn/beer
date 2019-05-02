import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

export default new Vuex.Store({
  state: {
    favoriteBeers: []
  },
  mutations: {
  },
  actions: {

  }
})
