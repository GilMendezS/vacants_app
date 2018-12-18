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
                                <div v-show="!editing">
                                    <p><v-icon>email</v-icon> Email: {{profile.email}}</p>
                                    <p>
                                        Phone:
                                        <v-chip >
                                            {{profile.phone}}
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
                                </div>
                                <div v-show="editing">
                                    <v-form>
                                        <v-input prepend-icon="create"></v-input>
                                        <v-text-field
                                            v-model="user.name"
                                            label="Name"
                                        >
                                        </v-text-field>
                                        <v-input prepend-icon="create"></v-input>
                                        <v-text-field
                                            v-model="user.lastname"
                                            label="Lastname"
                                        >
                                        </v-text-field>
                                        <v-input prepend-icon="email"></v-input>
                                        <v-text-field
                                            v-model="user.email"
                                            label="Email"
                                        >
                                        </v-text-field>
                                        <v-input prepend-icon="contact_phone"></v-input>
                                        <v-text-field
                                            v-model="user.phone"
                                            label="Phone"
                                        >
                                        </v-text-field>
                                        <v-input prepend-icon="how_to_reg"></v-input>
                                        <v-textarea 
                                            outline
                                            name="input-7-4"
                                            label="Write a description about you..."
                                            v-model="user.description">
                                        </v-textarea>
                                        
                                        <v-date-picker v-model="user.birthdate" :landscape="landscape" :reactive="reactive"></v-date-picker>
                                        <v-checkbox
                                            v-model="checkbox"
                                            label="Change Password?"
                                            required
                                            >
                                        </v-checkbox>
                                        <v-text-field :type="'password'" v-model="new_password" v-show="checkbox"></v-text-field>
                                    </v-form>
                                </div>
                                
                            </v-card-text>
                            <v-card-actions>
                                <v-btn v-show="!editing" @click="onEdit" color="blue white--text">Edit <v-icon>create</v-icon></v-btn>
                                <v-btn class="cyan white--text" v-show="editing" @click="onUpdate">Update <v-icon>refresh</v-icon></v-btn>
                                <v-btn class="red white--text" v-show="editing" @click="editing = false">Cancel <v-icon>clear</v-icon></v-btn>
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
                                        @click="showVacant(item)"
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
                                        @click="showVacant(item)"
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
import User from '../models/user.js';
export default {
    data(){
        return {
            active: true,
            tabs: ['Your Profile', 'Published Vacants', 'Applied'],
            editing: false,
            user: new User('','','','','','',false,'','','','',''),
            landscape: true,
            reactive: true,
            birthdate: '',
            checkbox: false,
            new_password: ''
        }
    },
    mounted(){
        this.$store.dispatch('user/loadProfile')
    },
    methods: {
        onEdit(){
            this.editing = true;
        },
        showVacant(vacant){
            this.$router.push({
                name: 'vacant-details', 
                params: {
                    id: vacant._id
                }
            })
        },
        onUpdate(){
            this.user.birthdate = this.birthdate;
            const data = {}
            data.name = this.user.name;
            data.lastname = this.user.lastname;
            data.email = this.user.email;
            if(this.checkbox){
                data.password = this.new_password;
            }
            data.phone = this.user.phone;
            data.birthdate = this.user.birthdate;
            data.description = this.user.description;
            data._id = this.user._id;
            this.$store.dispatch('user/updateUser', data);
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
    watch: {
        profile(){
            this.user = this.profile;
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

