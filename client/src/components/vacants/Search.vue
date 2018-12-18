<template>
    <v-container>
        <v-layout row>
            <v-flex xs6 offset-xs3>
                <v-card :hover="hover" class="mt-4 pt-4 pl-4 pb-4 pr-4" light >
                    <v-card-title>
                        Find you next job! 
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-input prepend-icon="create"></v-input>
                            <v-text-field
                                label="Write what are you loooking for...."
                                v-model="search"
                            >
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="">
                        <v-btn class="blue white--text" @click="onSearch" :disabled="!search">
                            Search <v-icon>search</v-icon>
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
            hover: true
        }
    },
    methods: {
        onSearch(){
            this.$store.dispatch('vacantStore/filterVacants')
        }
    },
    computed: {
        search:{
            get(){
                return this.$store.getters['vacantStore/getSearch'];    
            },
            set(value){
                this.$store.dispatch('vacantStore/modifySearch', value)
            }
        }
    }

}
</script>
