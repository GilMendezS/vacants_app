<template>
    <v-container>
        <v-layout>
            <v-flex xs12>
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
                    <v-add-status /> 
                    <v-float-button
                        :color="'blue'"
                    >
                    </v-float-button>
                </v-card>
                <v-confirm :item="readyToRemove" 
                    :text="messageToConfirm" 
                    :state="showingConfirmationDialog"
                    @confirmation="onRemoveStatus">
                </v-confirm>
            </v-flex>
        </v-layout>
    </v-container>
    
</template>
<script>
import AddStatus from '../components/statuses/AddStatus.vue';
import FloatButon from '../components/buttons/FloatButton.vue';
import ConfirmModal from '../components/modals/Confirm.vue';
export default {
    components: {
        'v-float-button': FloatButon,
        'v-add-status': AddStatus,
        'v-confirm': ConfirmModal
    },
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
            messageToConfirm: '',
            readyToRemove: null,
            showingConfirmationDialog: false
        }
    },
    mounted(){
        this.$store.dispatch('status/loadStatuses');
    },
    methods: {
        editStatus(status){

        },
        removeStatus(status){
            this.readyToRemove = status;
            this.showingConfirmationDialog = true;
            this.messageToConfirm = `Do you really want to remove this status? ${status.title}`
        },
        onRemoveStatus(){
            this.readyToRemove = null
            this.showingConfirmationDialog = false;

        }
    },
    computed: {
        statuses(){
            return this.$store.getters['status/getStatuses'];
        }
    }
}
</script>
