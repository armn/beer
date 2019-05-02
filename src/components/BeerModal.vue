<template>
    <div class="modal-wrapper beer-modal" v-if="visible">
        <div class="close-modal" @click="hide">✖</div>
        <div class="beer-info"  v-for="value in selectedBeer">
            <div class="beer-modal-image">
                <img :src="value.image_url"  />
            </div>
            <h1>{{value.name }}</h1>
            <h2>{{value.tagline}}</h2>
            <span class="beer-line"></span>
            <p class="beer-properties">
                <strong>IBU: </strong> <span>{{value.ibu}} </span>
                <strong>ABV: </strong> <span>{{value.abv}} </span>
                <strong>EBC: </strong> <span>{{value.ebc}} </span>
            </p>
            <p class="beer-description">{{value.description}}</p>
            <div class="best-served">
              <strong>Best served with:</strong>
                <ul>
                    <li v-for="pairing in value.food_pairing">
                        {{pairing}}
                    </li>
                </ul>
            </div>
            <div style="clear:both;"></div>
        </div>
    </div>
</template>

<script>
  import Modal from '../modal.js';
  import axios from 'axios';
  export default {
    data() {
      return {
        visible: false,
        selectedBeer: []
      }
    },
    methods: {
      hide() {
        this.visible = false;
      },

      show(beerID) {
        this.visible = true;
        axios({ method: "GET", "url": "https://api.punkapi.com/v2/beers/" + beerID }).then(result => {
          this.selectedBeer = result.data;
        }, error => {
          console.error(error);
        });


      },
    },

    beforeMount() {
      Modal.EventBus.$on('show', (params) => {
        this.show(params)
      })
    }
  }
</script>

<style scoped lang="scss">
    .modal-wrapper {
        padding: 20px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        max-width: 100%;
        background: white;
        height: 500px;
        z-index: 1000;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        color: grey;
        overflow: auto;

        @media (max-width: 640px) {
            top: 0;
            left: 0;
            transform: none;
            height: 100%;
        }

    }
    .close-modal {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 20px;
        color: gray;
        cursor: pointer;
        &:hover {
            color: black;
         }
        }
    .beer-modal-image {
        width: 150px;
        height: 450px;
        max-width: 100%;
        float: left;
        margin: 0 20px 10px 0;
        text-align: center;
        img {
            max-width: 100%;
            max-height: 300px;
            text-align: center;
        }

        @media (max-width: 640px) {
            width: 30px;
            height: 120px;

            img {

            }

        }
    }
    .beer-modal {
        h1 {
            color: orange;
            margin: 0;
        }
        h2 {
            color: grey;
            font-weight: normal;
            margin: 5px 0 0 0;
            font-size: 18px;
        }
    }
    .beer-info {
        text-align: left;
    }
    .beer-properties {
        color: grey;
    }
    .beer-line {
        width: 90px;
        height: 4px;
        background-color: blueviolet;
        display: inline-block;
    }
    .beer-description {
        margin-top: 20px;
        color: grey;
    }
    ul {
        list-style-position: inside;
        margin: 5px 0 15px 0;
        padding-left: 15px;
    }
</style>