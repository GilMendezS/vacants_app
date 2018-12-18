<template>
    <v-container>
        <v-layout>
            <v-card xs12>
                <v-card-text>
                    <h4><v-icon>library_books</v-icon> Related Vacants...</h4>
                    <v-flex xs12 v-for="vacant in relatedVacants" :key="vacant.id">
                        <v-card >
                            <v-card-title>
                                {{vacant.title}}
                            </v-card-title>
                            <v-card-text>
                                <p><v-icon>attach_money</v-icon>   Salary: {{vacant.salary}}</p>
                                <a @click="seeDetails(vacant)">See more</a>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-card-text>
            </v-card>
            
        </v-layout>
    </v-container>
    
   
</template>

<script>
export default {
    props: ['category', 'except'],
    methods: {
        seeDetails(vacant){
            this.$store.dispatch('vacantStore/getVacant', vacant._id);
            this.$router.push({
                name:'vacant-details',
                params: {
                    id: vacant._id
                }
            })
        }
    },
    computed: {
        vacants(){
            return this.$store.getters['vacantStore/getVacants'];
        },
        relatedVacants(){
            const self = this;
            return this.vacants.filter( v => {
                
                if(this.user){
                    const applied = v.applicants.includes(this.user._id)
                    if(!applied && self.category === v.categoryId && v._id !== this.except){
                        return v;
                    }
                }
                else {
                    if(self.category === v.categoryId && v._id !== this.except){
                        return v;
                    }
                }
                
            })       
        },
        user(){
            return this.$store.getters['user/getAuthenticatedUser'];
        }
    }
}
</script>
