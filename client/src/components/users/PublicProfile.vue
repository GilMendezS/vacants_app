<template>
    <v-container>
        <v-layout>
            <v-flex offset-xs-6 xs-3>
                <v-card>
                    <v-card-title>
                        <p class="display-2"><v-icon>person</v-icon>{{user.name}} {{user.lastname}}</p>
                    </v-card-title>
                    <v-card-text>
                        <p>
                            <v-icon>email</v-icon> {{user.email}}
                        </p>
                        <p>
                            <v-icon>contact_phone</v-icon> {{user.phone}}
                        </p>
                        <p>
                            <v-icon>assignment</v-icon>About the applicant:  {{description}}
                        </p>
                        <p>
                            Birthdate: {{birthdate}}
                        </p>
                        <p>
                            Still looking for a job: <v-chip class="blue">{{looking}}</v-chip>
                        </p>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import axios from 'axios';
import User from '../../models/user.js';
export default {
    props: ['id'],
    data(){
        return {
            user: new User('','','','','','','','','','','',''),
        }
    },
    mounted(){
        this.getProfile(this.id);
    },
    methods: {
        getProfile(id){
            axios.get(`${this.url}/users/${id}`)
            .then(response => {
                console.log(response)
                this.user = response.data.data;
            })
            .catch(err => {
                this.$store.dispatch('message/addMessage', {
                    message: 'Error loading the information about this user',
                    type: 'error'
                })
            })
        }
    },
    computed:{
        url(){
            return this.$store.getters['url_api'];
        },
        birthdate(){
            return this.user.birthdate ? moment(this.user.birthdate).format('DD/MM/YYYY') : '/ /';
        },
        looking(){
            return this.user.lookingFor ? 'Yes': 'No';
        },
        description(){
            return this.user.description ? this.user.description : 'Without Description...'
        }
    }
}
</script>
