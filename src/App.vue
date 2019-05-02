<template>

  <div id="app">
    <app-modal/>
    <header>
      <div id="nav">
      <router-link to="/" :key="$route.fullPath">Home</router-link>
      <router-link to="/favorites">Favorites</router-link>
    </div>
    <h1>The Beer Bank</h1>
    <p>Find your favorite beer here</p>

      <input type="search" placeholder="Search for a beer name" v-model="value" @keyup.enter="searchBeers(value)" />


    </header>

    <div class="content">
    <router-view/>
    </div>

  </div>
</template>



<script>
  import axios from "axios";
  import { serverBus } from './main';

  export default {
    props: {
      value: {
        default: ''
      }
    },
    data: function() {
      return {
      beers: [],
      //favoriteBeers: []
      }
    },
    watch: {
      value: function(val) {
        this.searchTerm = val
      },
      searchTerm: function(val) {
        this.$emit('input', val)
      }
    },
    methods: {
      searchBeers(value) {
        value = value.replace(/ /g,"_");
        console.log('searching for ' + value);
        axios({ method: "GET", "url": "https://api.punkapi.com/v2/beers?beer_name=" + value}).then(result => {
          serverBus.$emit('searching', result.data);
        }, error => {
          console.error(error);
        });

      },




    }
  }

</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
  body {
    background: #f4f4f4;
    margin: 0;
  }
  header {
    background: orange;
    padding: 10px 15px;
    color: white;
    height: 180px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;

    h1 {
      margin: 0;
    }

    p {
      margin: 10px 0 15px 0;
    }

    input {
      width: 100%;
      max-width: 900px;
      padding: 10px;
      border: none;

      &:focus {
        outline: 1px solid orange;
      }
    }
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#nav {
  display: flex;
  justify-content: flex-end;
  a {
    text-transform: uppercase;
    color: white;
    padding: 0 5px;
    text-decoration: none;

    &.router-link-exact-active {
      font-weight: bold;
    }
  }
}

  .content {
    max-width: 1180px;
    margin: 220px auto 15px auto;
  }

  .beers {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
  }
  .beer {
    width: 33%;
    max-width: 360px;
    position: relative;
    margin: 15px 0;
    background: white;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 0 15px 0 rgba(0,0,0,0.3);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-radius: 3px;
    backface-visibility: hidden;
    -webkit-font-smoothing: subpixel-antialiased;

    &:hover {
      box-shadow: 0 0 20px 0 rgba(0,0,0,0.5);
      transform: scale(1.01);
    }


    @media (max-width: 1024px) {
      width: 50%;
    }

    @media (max-width: 768px) {
      width: 100%;
    }

  }

  .beer-name {
    color: orange;
    font-size: 20px;
    margin: 10px 0 5px 0;
  }

  .beer-tagline {
    color: #bfbfbf;
    font-size: 14px;
    margin: 0;
  }

  .beer-image img {
    height: 200px;
  }

  .favorite-beer {
    position: absolute;
    right: 15px;
    top: 5px;
    font-size: 36px;
    &::after {
      content: '☆';
    }

    &:hover, &.favorited {
      &::after {
        content: '★';
        color: orange;
      }
    }
  }
</style>
