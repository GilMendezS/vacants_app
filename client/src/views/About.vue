<template>
  <v-container>
    <v-layout row>
      <v-flex xs7 >
        <v-card>
          <v-card-title>
            <h1>Vacants App</h1>
          </v-card-title>
          <v-card-text>
            <h1>{{github.name}}</h1>
            <h3><v-icon right >email</v-icon>
              Email: gilberto.mendez.santiz@gmail.com</h3>
            <h3>From: {{github.location}}</h3>
            <h3>This project was created using:</h3> <v-spacer></v-spacer>
            <v-chip v-for="item in items" :key="item">
              <v-avatar class="teal"></v-avatar>
                {{item}}
            </v-chip>
          </v-card-text>
          <v-card-actions>
            <br>
            <v-btn
              color="blue"
              class="white--text"
              :href="github.html_url"
            >
              Github
              <v-icon right dark>launch</v-icon>
            </v-btn>
            <v-btn
              color="blue"
              class="white--text"
              href="https://www.linkedin.com/in/gilberto-m%C3%A9ndez-87564513a/"
            >
              Linkedin
              <v-icon right dark>launch</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex offset-xs1 xs4>
        <h3>Last projects in Github</h3>
        
            <v-card v-for="repo in repositories" :key="repo.id" hover="hover" class="mt-3">
              <v-card-title>
                <a :href="repo.html_url">{{repo.name}}</a>
              </v-card-title>
              <v-card-text>
                {{repo.description | shortText}}
              </v-card-text>
              <v-card-actions>
                <v-btn class="orange white--text" :href="repo.html_url">More <v-icon>remove_red_eye</v-icon></v-btn>
              </v-card-actions>
            </v-card>
   
        
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios';
export default {
  data(){
    return {
      hover: true,
      offsetTop: 0,
      items: [
        'NodeJS',
        'ExpresJs',
        'MongoDb',
        'Mongoose',
        'JWT',
        'BCRYPT',
        'ResFulltAPI',
        'VueJs2',
        'Vuex',
        'Vue-Router',
        'Vuetify',
      ],
      github: null,
      repositories: []
    }
  },
  mounted(){
    axios.get('https://api.github.com/users/GilMendezS')
    .then(response => {
      
      this.github = response.data;
      this.getRepositories(response.data.repos_url);
    })
  },
  methods: {
    getRepositories(url){
      axios.get(url)
      .then(response => {
        this.repositories = response.data;
      })
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    }
  },
  filters: {
    shortText(value){
      if(!value){
        return '';
      }
      return value.slice(0,20)
    }
  }
}
</script>

