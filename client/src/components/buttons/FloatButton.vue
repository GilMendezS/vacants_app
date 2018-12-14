<template>
    <v-btn
        :color="color"
        dark
        small
        absolute
        bottom
        right
        fab
        @click="onShowForm"
    >
        <v-icon>add</v-icon>
    </v-btn>
</template>
<script>
export default {
    props: ['color'],
    methods: {
        onShowForm(){
            this.$store.dispatch('showFormToCreate')
        }
    }
}
</script>

