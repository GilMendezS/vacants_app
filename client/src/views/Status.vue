<template>
    <v-card>
        <v-card-title>
            <v-icon>
                announcement
            </v-icon>
             Statuses
            <v-spacer></v-spacer>
            <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="statuses"
            :search="search"
        >
            <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.title }}</td>
                <td class="text-xs-left">
                    <v-chip v-if="props.item.active" class="success">
                        Yes
                    </v-chip>
                    <v-chip v-else class="error">
                        No
                    </v-chip>
                </td>
                <td class="justify-center layout px-0">
                    <v-icon
                        small
                        class="mr-2 blue--text"
                        @click="editStatus(props.item)"
                    >
                        edit
                    </v-icon>
                    <v-icon
                        small
                        class="red--text"
                        @click="removeStatus(props.item)"
                    >
                        delete
                    </v-icon>
                </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
    </v-card>
</template>
<script>
export default {
    data(){
        return {
            headers: [
                {
                    text: 'title',
                    value: 'title'
                },
                {
                    text:'Status',
                    value:'active'
                },
                {
                    text:'Actions',
                    name:'actions',
                    sortable:false
                }

            ],
            search: '',
        }
    },
    mounted(){
        console.log('status view')
        this.$store.dispatch('status/loadStatuses');
    },
    methods: {
        editStatus(status){

        },
        removeStatus(status){

        }
    },
    computed: {
        statuses(){
            return this.$store.getters['status/getStatuses'];
        }
    }
}
</script>
