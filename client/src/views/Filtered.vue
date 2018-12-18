<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <h4 class="display-1 mt-4 mb-4">Results of you search: {{search}}</h4>
                <h3>Total: {{search.length}}</h3>
                <v-vacant v-for="vacant in filteredVacants" :vacant="vacant" :key="vacant._id">
                </v-vacant>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Vacant from '../components/vacants/Vacant.vue';
export default {
    components: {
        'v-vacant': Vacant
    },
    computed: {
        search(){
            return this.$store.getters['vacantStore/getSearch'];
        },
        filteredVacants(){
            return this.$store.getters['vacantStore/getFilteredVacants'];
        }
    }
}
</script>
