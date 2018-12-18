<template>
    <v-container v-if="displayingMessage">
        <v-layout row>
            <v-flex xs11>
                <v-alert
                :value="displayingMessage"
                :type="type"
                transition="scale-transition"
                >
                    {{message}}
                    
                </v-alert>
                
            </v-flex>
            <v-flex xs1>
                <v-icon @click="closeAlertMessage" right="right" color="red">
                    cancel
                </v-icon>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data(){
        return {
            timeout: 3000,
            show: false,
            right: true
        }
    },
    computed: {
        displayingMessage(){
            return this.$store.getters['message/getStateMessage'];
        },
        type(){
            return this.$store.getters['message/getTypeMessage'];
        },
        message(){
            return this.$store.getters['message/getMessage']
        }
    },
    methods: {
        closeAlertMessage(){
            this.$store.dispatch('message/removeMessage')
        }
    }
}
</script>
<style scoped>
    .float-right{
        float: right !important;
        position: absolute;
    }
</style>

