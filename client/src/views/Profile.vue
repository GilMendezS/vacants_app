<template>
    <v-container>
        <v-layout>
            <v-flex xs12>
                <v-tabs
                    centered
                    color="blue"
                    dark
                    icons-and-text
                >
                    <v-tabs-slider color="yellow"></v-tabs-slider>

                    <v-tab href="#tab-1">
                    Profile
                    <v-icon>person</v-icon>
                    </v-tab>

                    <v-tab href="#tab-2">
                    Published
                    <v-icon>assignment</v-icon>
                    </v-tab>

                    <v-tab href="#tab-3">
                    Applied
                    <v-icon>done</v-icon>
                    </v-tab>
                    <v-tab-item        
                        id="tab-1"
                    >
                        <v-card>
                            <v-card-title>
                                <h3 class="display-2">  {{fullname | capitalizedWord}}</h3>
                            </v-card-title>
                            <v-card-text>
                                <p><v-icon>email</v-icon> Email: {{profile.email}}</p>
                                <p>
                                    Phones:
                                    <v-chip v-for="phone in profile.phones" :key="phone">
                                        {{phone}}
                                    </v-chip>
                                </p>
                                <p>
                                    <v-checkbox
                                    v-model="profile.lookingFor"
                                    label="Are you looking for a job?"
                                    ></v-checkbox>
                                </p>
                                <p>
                                    <v-icon>date_range</v-icon>  Account created: {{createdAt}}
                                </p>
                            </v-card-text>
                            <v-card-actions>

                            </v-card-actions>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item id="tab-2">
                        <v-card>
                            <v-card-title>
                                Published vacants: {{profile.published.length}}
                            </v-card-title>
                            <v-card-text>
                                <v-list two-line>
                                    <template v-for="(item) in profile.published">
                                        <v-list-tile
                                        :key="item.title"
                                        avatar
                                        @click="showVacant(vacant)"
                                        >
                                        <v-list-tile-avatar>
                                            <img src="favicon.ico">
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                            <v-list-tile-sub-title v-html="item.company"></v-list-tile-sub-title>
                                        </v-list-tile-content>
                                        </v-list-tile>
                                    </template>
                                    </v-list>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item id="tab-3">
                        <v-card>
                            <v-card-title>
                                Applied vacants: {{profile.applied.length}}
                            </v-card-title>
                            <v-card-text>
                                <v-list two-line>
                                    <template v-for="(item) in profile.applied">
                                        <v-list-tile
                                        :key="item.title"
                                        avatar
                                        @click="showVacant(vacant)"
                                        >
                                        <v-list-tile-avatar>
                                            <img src="favicon.ico">
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                            <v-list-tile-sub-title v-html="item.company"></v-list-tile-sub-title>
                                        </v-list-tile-content>
                                        </v-list-tile>
                                    </template>
                                    </v-list>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-flex>
            
        </v-layout>
    </v-container>
</template>
<script>
import moment from 'moment';
export default {
    data(){
        return {
            active: true,
            tabs: ['Your Profile', 'Published Vacants', 'Applied']
        }
    },
    mounted(){
        this.$store.dispatch('user/loadProfile')
    },
    methods: {
        showVacant(vacant){
            console.log(vacant)
        }
    },
    computed: {
        profile(){
            return this.$store.getters['user/getProfile'];
        },
        fullname(){
            return this.profile ? `${this.profile.name} ${this.profile.lastname}` : ''
        },
        createdAt(){
            return this.profile.createdAt ? moment(this.profile.createdAt).format('DD-MM-YYYY') : '- - -';
        }
    },
    filters: {
        capitalizedWord(value){
            if(!value){
                return ''
            }
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }
}
</script>

