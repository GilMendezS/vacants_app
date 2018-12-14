<template>
    <v-container>
        <v-layout>
            <v-flex xs12>
                <v-alert
                    v-model="displayingMessage"
                    transition="scale-transition"
                    :type="type"
                    outline
                    dismissible
                >
                    {{message}}                    
                </v-alert>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    computed: {
        displayingMessage(){
            return this.$store.getters['message/getStateMessage'];
        },
        type(){
            return this.$store.getters['message/getType'];
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

