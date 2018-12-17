<template>
    <v-card
        :hover="hover"
        
    >
        <v-img
          src="https://cdn.dribbble.com/users/473254/screenshots/1890882/ic_launcher_dii-dribble_dribble_dribble.png"
          aspect-ratio="5"
        ></v-img>
        <v-card-title primary-title>
          <div>
              <p><v-icon>domain</v-icon> Company: {{vacant.company}}</p>
              <p><v-icon>portrait</v-icon> Vacant: {{vacant.title}} </p>
                <p>
                    {{vacant.description}}
                </p>
                
            
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Share <v-icon>share</v-icon></v-btn>
          <v-btn flat color="orange">Explore <v-icon>open_in_new</v-icon> </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    props: ['vacant'],
    data(){
        return {
            dark: false,
            flat: false,
            hover: true
        }
    }
}
</script>
<style scoped>
    .bordered-card{
        border: 1px black solid;
    }
</style>


