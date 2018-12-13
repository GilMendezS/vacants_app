<template>
    <v-card :dark="dark" :flat="flat" class="bordered-card mb-3">
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0"> Company: {{vacant.company}}</h3>
                <h4>{{vacant.title}}</h4>
                <div>
                    {{vacant.description}}
                </div>
            
            </div>
        </v-card-title>

        <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">See details</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    props: ['vacant'],
    data(){
        return {
            dark: false,
            flat: false
        }
    }
}
</script>
<style scoped>
    .bordered-card{
        border: 1px black solid;
    }
</style>


