<template>
    <v-container>
        <v-layout row wrap >
            <v-flex xs12 md6 offset-md3>
                <v-card >
                <v-card-title
                    class="headline blue white--text"
                    >
                    <v-icon>
                        account_circle
                    </v-icon>
                    <h3>Login</h3>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-input
                            prepend-icon="email"
                        >
                            Email
                        </v-input>
                        <v-text-field
                            label="Email"
                            v-model="email"
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
                            v-model="password"
                        >

                        </v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        class="blue white--text"
                        @click="onSubmit"
                        :disabled="invalidLogin"
                    >
                    Sign in
                    </v-btn>
                </v-card-actions>
            </v-card>
            </v-flex>
            
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data(){
        return {
            password: '',
            email: ''
        }
    },
    methods: {
        onSubmit(){
            this.$store.dispatch('user/signin', {
                email: this.email,
                password: this.password
            })
        }
    },
    computed: {
        invalidLogin(){
            return this.email == '' || this.password == ''
        }
    }
}
</script>
