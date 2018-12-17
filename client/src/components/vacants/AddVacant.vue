<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <v-icon>
                            note_add
                        </v-icon>
                        <v-spacer/>
                        Add Vacant
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <!--title-->
                            <v-input
                                prepend-icon="create"
                            >
                                Title
                            </v-input>
                            <v-text-field
                                label="Title"
                                v-model="vacant.title"
                            >
                            </v-text-field>
                            <!--company-->
                            <v-input
                                prepend-icon="business"
                            >
                                Company
                            </v-input>
                            <v-text-field
                                label="company"
                                v-model="vacant.company"
                            >
                            </v-text-field>
                            
                            <!--salary-->
                            <v-input
                                prepend-icon="attach_money"
                            >
                                Salary
                            </v-input>
                            <v-text-field
                                label="salary"
                                v-model="vacant.salary"
                            >
                            </v-text-field>
                            <v-textarea
                                prepend-icon="description"
                                v-model="vacant.description"
                                name="description"
                                label="Type a description about the vacant"
                                hint="Description..."
                            >
                            </v-textarea>
                            <!--categories-->
                            <v-select
                                append-icon="layers"
                                v-model="vacant.categoryId"
                                :items="categories"
                                item-text="title"
                                item-value="_id"
                                label="Select a category"
                                persistent-hint
                                
                                single-line
                            ></v-select>
                            <v-select
                                append-icon="style"
                                v-model="vacant.statusId"
                                :items="statuses"
                                item-text="title"
                                item-value="_id"
                                label="Select an status"
                                persistent-hint
                                single-line
                            ></v-select>
                            <v-select
                                append-icon="assignment"
                                v-model="vacant.contractId"
                                :items="typeOfContracts"
                                item-text="title"
                                item-value="_id"
                                label="Select a type contract"
                                persistent-hint
                                single-line
                            ></v-select>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            class="blue white--text"
                            @click="onSubmit"
                            :disabled="invalidForm"
                        >
                        Add <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn
                            @click="cancelCreating"
                            class="red white-text"
                        >
                            Cancel <v-icon>cancel</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    
</template>
<script>
import Vacant from '../../models/vacant.js'
export default {
    data(){
        return {
            vacant: new Vacant('', '', '','', '', '', '' ,'', ''),
        }
    },
    mounted(){
        this.$store.dispatch('status/loadStatuses');
        this.$store.dispatch('contract/loadContracts');
        this.$store.dispatch('category/loadCategories');
    },
    methods: {
        onSubmit(){
            this.$store.dispatch('vacantStore/addVacant', this.vacant);
        },
        cancelCreating(){
            this.$store.dispatch('hideFormToCreate');
            this.$router.push('/vacants');
        }
    },
    computed: {
        invalidForm(){
            return this.vacant.title == '';
        },
        categories(){
            return this.$store.getters['category/getCategories'];
        },
        statuses(){
            return this.$store.getters['status/getStatuses'];
        },
        typeOfContracts(){
            return this.$store.getters['contract/getTypeOfContracts'];
        }
    },
    watch: {
        
    }
}
</script>

