<template>
    <v-container>
        <v-layout>
            <v-flex xs4>
                <v-card>
                    <v-card-title>
                        <h3>Applicants</h3>
                    </v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-tile
                                v-for="item in vacant.applicants"
                                :key="item.title"
                                avatar
                                @click="redirectToProfile(item._id)"
                            >
                                <v-list-tile-action>
                                <v-icon color="orange">remove_red_eye</v-icon>
                                </v-list-tile-action>

                                <v-list-tile-content>
                                <v-list-tile-title v-text=" `${item.name} ${item.lastname}`"></v-list-tile-title>
                                </v-list-tile-content>

                                <v-list-tile-avatar>
                                <img src="/favicon.ico">
                                </v-list-tile-avatar>
                            </v-list-tile>
                    </v-list>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    
    
</template>
<script>
import moment from 'moment';
import RelatedVacants from './RelatedVacants.vue';
import Vacant from '../../models/vacant.js';
export default {
    components: {
        'v-related-vacants': RelatedVacants
    },
    mounted(){
        
    },
    created() {
        
    },
    methods: {
        apply(vacant){
            this.$store.dispatch('vacantStore/apply', vacant._id);
        },
        onSignin(){
            this.$router.push('/signin')
        },
        redirectToProfile(id){
            
        }
    },
    computed: {
        vacant(){
            return this.$store.getters['vacantStore/getCurrentVacant']
        },
        published(){
            return moment(this.vacant.createdAt).format('DD-MM-YYYY')
        },
        last_modification(){
            return moment(this.vacant.updatedAt).format('DD-MM-YYYY')
        },
        applicants(){
            return this.vacant.applicants ? this.vacant.applicants.length : ''
        },
        canNotApply(){
            return this.vacant.applicants && this.user ? this.vacant.applicants.map( a => a._id).includes(this.user._id) : false
        },
        user(){
            return this.$store.getters['user/getAuthenticatedUser'];
        },
        category(){
            return this.vacant.categoryId._id ? this.vacant.categoryId._id : ''
        }
    }
}
</script>

