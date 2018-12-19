<template>
    <v-form>
        <v-input
            prepend-icon="create"
        >
            Title
        </v-input>
        <v-text-field
            label="Title"
            v-model="job.title"
        >
        </v-text-field>
        <v-input
            prepend-icon="domain"
        >
            Company
        </v-input>
        <v-text-field
            label="Title"
            v-model="job.company"
        >
        </v-text-field>
        
        <v-input
            prepend-icon="date_range"
        >
            Start Date
        </v-input>
        <v-date-picker 
            v-model="job.start_date" 
            :landscape="landscape" 
            :reactive="reactive">
        </v-date-picker>
        <v-input
            prepend-icon="date_range"
        >
            End Date
        </v-input>
        <v-date-picker 
            v-model="job.end_date" 
            :landscape="landscape" 
            :reactive="reactive">
        </v-date-picker>
        <v-checkbox
            v-model="job.current_job"
            label="Current Job?"
            >
        </v-checkbox>
        <v-btn :disabled="invalidForm" @click="onSubmit" color="blue">Add<v-icon>done</v-icon></v-btn>
    </v-form>
</template>

<script>
import Job from '../../models/job.js';
export default {
    data(){
        return {
            job: new Job('','','',false,'',''),
            landscape: true,
            reactive: true
        }
    },
    methods: {
        onSubmit(){
            this.$store.dispatch('job/addJob', this.job)
        }
    },
    computed: {
        invalidForm(){
            return this.job.title == '' || this.job.company == ''
                || this.job.start_dat == ''
        },
        user(){
            return this.$store.getters['user/getProfile'];
        }
    }
}
</script>
