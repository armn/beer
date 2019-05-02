<template>
  <div class="beers">
    <div v-for="beer in beers" class="beer" :id="beer.id" :key="beer.id">
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
  name: 'BeersList',

    data () {
      return {
        beers: [],
        term: '',
        isFavorite: false
      }
    },

    created() {

      serverBus.$on('searching', (beers) => {
        this.beers = beers;
      });

    },
    mounted() {
      this.scroll();
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

      getInitialBeers() {
        axios({ method: "GET", "url": "https://api.punkapi.com/v2/beers?page=1&per_page=12" }).then(result => {
          this.beers = result.data;
        }, error => {
          console.error(error);
        });
      },

      favorite(ID) {
        if (!isInArray(ID, store.state.favoriteBeers)) {
          store.state.favoriteBeers.push(ID);
        }
        else {
          store.state.favoriteBeers.splice( store.state.favoriteBeers.indexOf(ID), 1 );
        }
      },

      scroll() {
        var beerPage = 2;
        window.onscroll = () => {
          if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            axios({ method: "GET", "url": "https://api.punkapi.com/v2/beers?page=" + beerPage + "&per_page=12" }).then(result => {
              this.beers.push(...result.data);
            }, error => {
              console.error(error);
            });
            beerPage += 1;
          }
        };
      },
    },
    beforeMount() {
      this.getInitialBeers();
    }

}
</script>

