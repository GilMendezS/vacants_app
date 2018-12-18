<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <v-icon>
                            add_circle
                        </v-icon>
                        <v-spacer/>
                        Add Status(project)
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-input
                                prepend-icon="create"
                            >
                                Title
                            </v-input>
                            <v-text-field
                                label="Title"
                                v-model="status.title"
                            >
                            </v-text-field>
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
import Status from '../../models/status.js'
export default {
    data(){
        return {
            status: new Status('', '', ''),
        }
    },
    methods: {
        onSubmit(){
            this.$store.dispatch('status/addStatus', this.status)
        },
        cancelCreating(){
            this.$store.dispatch('hideFormToCreate')
        }
    },
    computed: {
        invalidForm(){
            return this.status.title == ''
        }
    }
}
</script>

