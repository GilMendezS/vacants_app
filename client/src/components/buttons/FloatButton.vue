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
        <v-icon>{{showIcon}}</v-icon>
    </v-btn>
</template>
<script>
export default {
    props: ['color', 'icon'],
    methods: {
        onShowForm(){
            this.$store.dispatch('showFormToCreate')
        }
    },
    computed: {
        showIcon(){
            return this.icon ? this.icon : 'add';
        }
    }
}
</script>

