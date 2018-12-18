<template>
    <v-container>
        <v-layout>
            <v-flex xs12>
                <v-card v-show="!formToCreateIsActive">
                    <v-card-title>
                        <v-icon>
                            assignment
                        </v-icon>
                        Type Of Contracts
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
                        v-show="!creatingContract"
                        :headers="headers"
                        :items="contracts"
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
                                    @click="editContact(props.item)"
                                >
                                    edit
                                </v-icon>
                                <v-icon
                                    small
                                    class="red--text"
                                    @click="removeContract(props.item)"
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
                <v-add-contract v-show="formToCreateIsActive"/> 
                <v-float-button
                    v-show="!formToCreateIsActive"
                    :color="'blue'"
                >
                </v-float-button>
                <v-confirm 
                    :action="action_store"
                    :item="readyToRemove" 
                    :text="messageToConfirm" 
                    :state="showingConfirmationDialog"
                    @confirmation="onRemoveContract">
                </v-confirm>
            </v-flex>
        </v-layout>
    </v-container>
    
</template>
<script>
import AddContract from '../components/contracts/AddContract.vue';
import FloatButon from '../components/buttons/FloatButton.vue';
import ConfirmModal from '../components/modals/Confirm.vue';
export default {
    components: {
        'v-float-button': FloatButon,
        'v-add-contract': AddContract,
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
            showingConfirmationDialog: false,
            creatingContract: false,
            action_store: 'contract/removeContract'
        }
    },
    mounted(){
        this.$store.dispatch('contract/loadContracts');
    },
    methods: {
        editContract(contract){

        },
        removeContract(contract){
            this.readyToRemove = contract;
            this.showingConfirmationDialog = true;
            this.messageToConfirm = `Do you really want to remove this type of contract? ${contract.title}`
        },
        onShowFormToAddNewContract(){
            this.creatingContract = true;
        },
        onRemoveContract(){
            this.readyToRemove = null
            this.showingConfirmationDialog = false;
        }
    },
    computed: {
        contracts(){
            return this.$store.getters['contract/getTypeOfContracts'];
        },
        formToCreateIsActive(){
            return this.$store.getters['getStatusFormToCreate']
        }
    }
}
</script>
