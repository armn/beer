<template>
  <div class="beers">
    <div v-for="beer in beers" class="beer" :id="beer.id" v-if="isThisFavorite(beer.id)">
      <div class="favorite-beer" v-on:click="favorite(beer.id)" v-bind:class="isThisFavorite(beer.id)"></div>
      <div class="beer-mask" @click="showModal(beer.id)">
        <div class="beer-image">
          <img :src="beer.image_url" :alt="beer.name" />
        </div>
        <h1 class="beer-name">{{ beer.name }}</h1>
        <p class="beer-tagline">{{ beer.tagline }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { serverBus } from '../main.js';
  import  store  from "../store.js";


  function isInArray(value, array) {
    return array.indexOf(value) > -1;
  }



  export default {
    name: 'Favorites',

    data () {
      return {
        beers: [],
        term: '',
        isFavorite: false,
        favoriteBeersQuery: ''
      }
    },


    created() {
      serverBus.$on('searching', (beers) => {
        this.beers = beers;
      });
    },
    methods: {
      isThisFavorite(beerID) {
        if (isInArray(beerID, store.state.favoriteBeers)) {
          return "favorited";
        }
        else {
          return false;
        }
      },
      showModal(beerID) {
        this.$modal.show(beerID)
      },

      getFavoriteBeers() {
        let favoriteBeersQuery = store.state.favoriteBeers.join("|");
        axios({ method: "GET", "url": "https://api.punkapi.com/v2/beers?ids=" + favoriteBeersQuery + ""}).then(result => {
          this.beers = result.data;
        }, error => {
          console.error(error);
        });
      },

      favorite(ID) {
        console.log(ID);
        if (!isInArray(ID, store.state.favoriteBeers)) {
          store.state.favoriteBeers.push(ID);
        }
        else {
          store.state.favoriteBeers.splice( store.state.favoriteBeers.indexOf(ID), 1 );
        }
      },

    },
    beforeMount() {
      this.getFavoriteBeers();
    }

  }
</script>
