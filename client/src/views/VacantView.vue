<template>
    <div>
        <show-vacant-as-guess ></show-vacant-as-guess>
        <show-vacant-as-owner v-if="isOwner"></show-vacant-as-owner>
    </div>
    
</template>
<script>
import VacantDetails from '../components/vacants/VacantInformation.vue';
import VacantWithExtraDetails from '../components/vacants/VacantAsOwner.vue';
export default {
    props: ['id'],
    components: {
        'show-vacant-as-guess': VacantDetails,
        'show-vacant-as-owner': VacantWithExtraDetails, 
    },
    mounted(){
        this.$store.dispatch('vacantStore/getVacant', this.id)
    },
    computed:{
        vacant(){
            return this.$store.getters['vacantStore/getCurrentVacant'];
        },
        user(){
            return this.$store.getters['user/getAuthenticatedUser'];
        },
        isOwner(){
            if(!this.user){
                return false;
            }
            return this.user._id === this.vacant.creatorId._id;
        }
    }
}
</script>
