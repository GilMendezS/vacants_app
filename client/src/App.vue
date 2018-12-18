<template>
  <v-app>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="headline text-uppercase" @click="goToHome">
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
        <v-icon>assignment_ind</v-icon>
      </v-btn>
      <v-btn
        v-if="currentUser"
        flat
        target="_blank"
        @click="onShowTypeOfContracts"
      >
        <span class="mr-1">Type of Contracts</span>
        <v-icon>assignment</v-icon>
      </v-btn>
      <v-btn
        v-if="currentUser"
        flat
        target="_blank"
        @click="onShowStatuses"
      >
        <span class="mr-1">Statuses</span>
        <v-icon>announcement</v-icon>
      </v-btn>
      <v-btn
        v-if="currentUser"
        flat
        target="_blank"
        @click="onShowCategories"
      >
        <span class="mr-1">Categories</span>
        <v-icon>layers</v-icon>
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
      <!--MENU-->
      <v-menu :nudge-width="100" v-if="currentUser">
        <v-toolbar-title slot="activator">
          <v-icon>person_pin</v-icon>
        </v-toolbar-title>

        <v-list>
          <v-list-tile
            @click="showProfile"
          >
            <v-list-tile-title >Profile <v-icon>person</v-icon></v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            @click="onSignOut"
          >
            <v-list-tile-title >Signout <v-icon>power_settings_new</v-icon></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn
        flat
        @click="showAbout"
        target="_blank"
      >
        <span class="mr-1"></span>
        <v-icon>info</v-icon>
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
  data(){
    return {
      items: [
        {title: 'My Profile', action:"showProfile"},
        {
          title: 'SignOut', action:'onSignOut'
        }
      ]
    }
  },
  created(){
    const token = localStorage.getItem('jwt');
    const user = localStorage.getItem('user');
    if(token && user){
      this.$store.dispatch('user/syncToken', token)
      this.$store.dispatch('user/syncUser', JSON.parse(user))
    }
  }
  ,
  watch: {
    currentUser(){
      const token = localStorage.getItem('jwt');
      if(!this.currentUser && !token){
        this.$router.push('/signin')    
      }
    }
  },
  methods: {
    goToHome(){
      this.$router.push('/vacants')
    },
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
      this.$router.push('/vacants');
    },
    onShowCategories(){
      this.$router.push('/categories');
    },
    onShowTypeOfContracts(){
      this.$router.push('/contracts');
    },
    showProfile(){
      this.$router.push('/profile')
    },
    showAbout(){
      this.$router.push('/about')
    }
  },
  computed: {
    currentUser(){
      return this.$store.getters['user/getToken'];
    }
  }
  
}
</script>
