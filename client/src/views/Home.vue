<template>
  <v-parallax
      dark
      src="./images/bg.jpg"
    >
      <v-layout
        align-center
        column
        justify-center
      >
        <h1 class="display-3 mb-3 mt-4 ">MEVN </h1>
          <v-search></v-search>
      </v-layout>
    </v-parallax>
</template>

<script>
  import Search from '../components/vacants/Search.vue'

  export default {
    components: {
      'v-search': Search
    }
  }
</script>
