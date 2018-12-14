<template>
    <v-btn
        :color="color"
        dark
        small
        absolute
        bottom
        right
        fab
    >
        <v-icon>add</v-icon>
    </v-btn>
</template>
<script>
export default {
    props: ['color'],
}
</script>

