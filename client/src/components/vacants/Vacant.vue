<template>
    <v-card
        :hover="hover"
        
    >
        <v-img
          src="https://cdn.dribbble.com/users/473254/screenshots/1890882/ic_launcher_dii-dribble_dribble_dribble.png"
          aspect-ratio="5"
        ></v-img>
        <v-card-title primary-title>
            <h3><v-icon>portrait</v-icon> Vacant: {{vacant.title}}</h3>
        </v-card-title>
        <v-card-text>
            <p class="text-xs-left"><v-icon>domain</v-icon> Company: {{vacant.company}}</p>
            <p class="text-xs-left">Description: {{vacant.description | shortText}}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="orange">Share <v-icon>share</v-icon></v-btn>
          <v-btn flat color="orange" @click="showDetails(vacant)">Explore <v-icon>open_in_new</v-icon> </v-btn>
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
    },
    methods: {
        showDetails(vacant){
            this.$router.push({
                name: 'vacant-details',
                params: {
                    id: vacant._id
                }
            })
        }
    },
    filters: {
        shortText(value){
            if(!value){
                return ''
            }
            return value.substring(0,50);
        }
    }
}
</script>
<style scoped>
    .bordered-card{
        border: 1px black solid;
    }
</style>


