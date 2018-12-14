<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vacants</span>
        <span class="font-weight-light">APP</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        target="_blank"
        @click="onShowLogin"
      >
        <span class="mr-2">Sign In</span>
        <v-icon>lock_open</v-icon>
      </v-btn>
      <v-btn
        flat
        target="_blank"
      >

        <span class="mr-2">Sign Up</span>
        <v-icon>person_add</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  
  data () {
    return {
      
    }
  },
  methods: {
    onShowLogin(){
      console.log('show form login')
      this.$router.push('/signin')
    }
  }
  
}
</script>
