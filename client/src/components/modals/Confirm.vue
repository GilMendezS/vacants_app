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
            @click="modalClosed"
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
    props: ['text','state', 'item', 'action'],
    data(){
        return {
            
        }
    },
    methods: {
        sendConfirmation(){
            this.$store.dispatch(this.action, this.item._id);
            this.$emit('confirmation')
        },
        modalClosed(){
          this.$emit('modalClosed')
        }
    }
}
</script>
