<template>
  <div class="home">
    <BeersList />
  </div>
</template>

<script>
import BeersList from '@/components/BeersList.vue'

export default {
  name: 'home',
  components: {
    BeersList
  }
}
</script>
