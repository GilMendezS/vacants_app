<template>
    <v-container>
        <v-layout row wrap >
            <v-flex xs12 md6 offset-md3>
                <v-card >
                <v-card-title
                    class="headline blue white--text"
                    >
                    
                    <h3> SignUp</h3>
                    <v-spacer/>
                    <v-icon>
                        person_add
                    </v-icon>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-input prepend-icon="border_color">
                            Name
                        </v-input>
                        <v-text-field
                            label="Name"
                            v-model="user.name"
                        >
                        </v-text-field>
                        <v-input prepend-icon="border_color">
                            LastName
                        </v-input>
                        <v-text-field
                            label="LastName"
                            v-model="user.lastname"
                        >
                        </v-text-field>
                        <v-input
                            prepend-icon="email"
                        >
                            Email
                        </v-input>
                        <v-text-field
                            label="Email"
                            v-model="user.email"
                        >
                        </v-text-field>
                        <v-input
                            prepend-icon="work"
                        >
                            Company
                        </v-input>
                        <v-text-field
                            label="Company"
                            v-model="user.company"
                        >
                        </v-text-field>
                        <v-input
                            prepend-icon="vpn_key"
                        >
                            Password
                        </v-input>
                        <v-text-field
                            :type="'password'"
                            label="Password"
                            v-model="user.password"
                        >

                        </v-text-field>
                        <v-checkbox
                            v-model="user.lookingFor"
                            label="Looking for a job?"
                            required    
                        ></v-checkbox>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        class="blue white--text"
                        @click="onSubmit"
                        :disabled="invalidForm"
                    >
                    Sign up 
                    <v-icon>
                        done
                    </v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
            </v-flex>
            
        </v-layout>
    </v-container>
</template>
<script>
import User from '../../models/user.js';
export default {
    data(){
        return {
            user: new User('','','','','','',false,'','','')
        }
    },
    methods: {
        onSubmit(){
            this.$store.dispatch('user/signup', this.user)
        }
    },
    computed: {
        invalidForm(){
            return this.user.email == '' || this.user.password == ''
                || this.user.name == '' || this.user.lastname == ''
        }
    }
}
</script>
