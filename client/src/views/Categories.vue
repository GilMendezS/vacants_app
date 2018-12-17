<template>
    <v-container>
        <v-layout>
            <v-flex xs12>
                <v-card v-show="!formToCreateIsActive">
                    <v-card-title>
                        <v-icon>
                            layers
                        </v-icon>
                        Categories
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
                        v-show="!creatingCategory"
                        :headers="headers"
                        :items="categories"
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
                                    @click="editCategory(props.item)"
                                >
                                    edit
                                </v-icon>
                                <v-icon
                                    small
                                    class="red--text"
                                    @click="removeCategory(props.item)"
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
                <v-add-category v-show="formToCreateIsActive"/> 
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
                    @modalClosed="onModalClosed"
                    @confirmation="onConfirmation"
                    >
                </v-confirm>
            </v-flex>
        </v-layout>
    </v-container>
    
</template>
<script>
import AddCategory from '../components/categories/AddCategory.vue';
import FloatButon from '../components/buttons/FloatButton.vue';
import ConfirmModal from '../components/modals/Confirm.vue';
export default {
    components: {
        'v-float-button': FloatButon,
        'v-add-category': AddCategory,
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
            creatingCategory: false,
            action_store: 'category/removeCategory'
        }
    },
    mounted(){
        this.$store.dispatch('category/loadCategories');
    },
    methods: {
        onModalClosed(){
            this.showingConfirmationDialog = false;
        },
        onConfirmation(){
            this.showingConfirmationDialog = false;
        },
        editCategory(category){

        },
        removeCategory(category){
            this.readyToRemove = category;
            this.showingConfirmationDialog = true;
            this.messageToConfirm = `Do you really want to remove this category? ${category.title}`
        },
        onShowFormToAddNewCategory(){
            this.creatingCategory = true;
        },
        onRemoveCategory(){
            this.readyToRemove = null
            this.showingConfirmationDialog = false;
        }
    },
    computed: {
        categories(){
            return this.$store.getters['category/getCategories'];
        },
        formToCreateIsActive(){
            return this.$store.getters['getStatusFormToCreate']
        }
    }
}
</script>
