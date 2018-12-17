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
        @click="onShowVacants"
      >
        <span class="mr-1">Vacants</span>
        <v-icon>assignment</v-icon>
      </v-btn>
      <v-btn
        flat
        target="_blank"
        @click="onShowStatuses"
      >
        <span class="mr-1">Statuses</span>
        <v-icon>announcement</v-icon>
      </v-btn>
      <v-btn
        v-if="!currentUser"
        flat
        target="_blank"
        @click="onShowLogin"
      >
        <span class="mr-1">Sign In</span>
        <v-icon>lock_open</v-icon>
      </v-btn>
      <v-btn
        v-if="!currentUser"
        flat
        @click="onShowSignupForm"
        target="_blank"
      >
        <span class="mr-1">Sign Up</span>
        <v-icon>person_add</v-icon>
      </v-btn>
      <v-btn
        v-if="currentUser"
        flat
        @click="onSignOut"
        target="_blank"
      >
        <v-icon>power_settings_new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-message/>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Message from './components/messages/Message.vue';
export default {
  name: 'App',
  components: {
    'v-message': Message
  },
  created(){
    const token = localStorage.getItem('jwt');
    if(token){
      this.$router.push('/vacants')
      this.$store.dispatch('user/syncToken', token)
    }
  }
  ,
  watch: {
    currentUser(){
      if(!this.currentUser){
        this.$router.push('/signin')    
      }
      else {
        this.$router.push('vacants')
      }
    }
  },
  methods: {
    onShowLogin(){
      this.$router.push('/signin')
    },
    onShowSignupForm(){
      this.$router.push('/signup')
    },
    onShowStatuses(){
      this.$router.push('/statuses')
    },
    onSignOut(){
      this.$store.dispatch('user/signoutUser')
    },
    onShowVacants(){
      this.$router.push('vacants');
    }
  },
  computed: {
    currentUser(){
      return this.$store.getters['user/getToken'];
    }
  }
  
}
</script>
