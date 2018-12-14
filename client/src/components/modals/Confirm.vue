<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="state"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline red"
          primary-title
        >
          Confirm
        </v-card-title>

        <v-card-text>
          {{text}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            
          <v-spacer></v-spacer>
          <v-btn
            flat
            color="red"
            @click="sendConfirmation"
          >
            Cancelar 
            <v-icon >
                cancel
            </v-icon>

          </v-btn>
          <v-btn
            color="primary"
            @click="sendConfirmation"
            flat
          >
            Continue <v-icon>done</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
    props: ['text','state', 'item'],
    data(){
        return {
            
        }
    },
    methods: {
        sendConfirmation(){
            this.$store.dispatch('status/removeStatus', this.item._id);
            this.$emit('confirmation')
        }
    }
}
</script>
