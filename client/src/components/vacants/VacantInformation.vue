<template>
    <v-container>
        <v-layout>
            <v-flex xs8>
                
                <v-card>
                    <v-img
                    src="https://cdn.dribbble.com/users/473254/screenshots/1890882/ic_launcher_dii-dribble_dribble_dribble.png"
                    aspect-ratio="5"
                    >
                    </v-img>
                    <v-card-title primary-title>
                        <h1>Vacant: {{vacant.title}}</h1>                           
                    </v-card-title>
                    <v-card-text>
                        <h3><v-icon>domain</v-icon>Company: {{vacant.company}}</h3>
                        <p>
                            {{vacant.description}}
                        </p>
                        <p>
                            <v-icon>attach_money</v-icon> Salary: {{vacant.salary}}
                        </p>
                        <p> <v-icon>date_range</v-icon> Published: {{published}}</p>
                        <p><v-icon>update</v-icon> Last modificafion: {{last_modification}}</p>
                        <p><v-icon>people</v-icon> Applicants: {{applicants}}</p>
                        <p><v-icon>star</v-icon> Status: {{vacant.statusId.title}}</p>
                        <p><v-icon>layers</v-icon> Category: {{vacant.categoryId.title}}</p>
                        <p><v-icon>description</v-icon> Type Of Contract: {{vacant.contractId.title}}</p>
                        <p><v-icon>person</v-icon>Published by: {{vacant.creatorId.name}} - {{vacant.creatorId.email}}</p>
                    </v-card-text>

                    <v-card-actions>
                    <v-btn flat color="blue">Share <v-icon>share</v-icon></v-btn>
                    <v-btn v-if="!canNotApply" flat color="blue" @click="apply(vacant)">Apply <v-icon>done</v-icon> </v-btn>
                    <v-btn v-else flat  color="green" aria-disabled="true">You already Apply to this vacant<v-icon>done</v-icon> </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex xs4>
                <v-related-vacants
                    :category="category"
                    :except="vacant._id"
                >
                </v-related-vacants>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import moment from 'moment';
import RelatedVacants from './RelatedVacants.vue';
import Vacant from '../../models/vacant.js';
export default {
    props: ['id'],
    components: {
        'v-related-vacants': RelatedVacants
    },
    mounted(){
        this.$store.dispatch('vacantStore/getVacant', this.id)
    },
    created() {
        
    },
    methods: {
        apply(vacant){
            this.$store.dispatch('vacantStore/apply', vacant._id);
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
            return this.vacant.applicants ? this.vacant.applicants.map( a => a._id).includes(this.user._id) : false
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

