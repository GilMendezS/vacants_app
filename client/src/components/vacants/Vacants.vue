<template>
    <v-container>
        <v-layout
            text-xs-center
            wrap
        >
        <v-flex xs12>
            <h1>Vacants</h1>
            <v-vacant
                v-for="vacant in vacants"
                :key="vacant._id"
                :vacant="vacant"
             >
            </v-vacant>
        </v-flex>
        <v-float-button
                icon="note_add"
                :color="'blue'"
            >
            </v-float-button>
        </v-layout>
    </v-container>
</template>
<script>
import Vacant from './Vacant.vue';
import FloatButton from '../buttons/FloatButton.vue';
export default {
    components: {
        'v-vacant': Vacant,
        'v-float-button': FloatButton
    },
    mounted(){
        this.getVacants();
    },
    methods: {
        getVacants(){
            this.$store.dispatch('vacantStore/loadVacants');
        }
    },
    computed:{
        url(){
            return this.$store.getters.url_api
        },
        vacants(){
            return this.$store.getters['vacantStore/vacants'];
        }
    }
}
</script>
