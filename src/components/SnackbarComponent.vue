<template>
  <v-snackbar v-model="snackbar" timeout="-1" class="">
    <div class="d-flex justify-space-between align-center">
      <span>{{snackbarContent}}</span>
      <v-btn text @click="closeSnackbar()">
        Cerrar
      </v-btn>
    </div>
  </v-snackbar>
</template>

<script lang="ts">
  import Vue from "vue"
  import { mapState, mapMutations, mapActions } from "vuex";

  export default Vue.extend({

    name: "SnackbarComponent",

    computed: {
      ...mapState('UserInterfaceModule', ['snackbar', 'snackbarContent'])
    },

    methods: {
      ...mapActions('UserInterfaceModule', {
        closeSnackbar: 'closeSnackbarAction'
      })
    },
    
    data() {
      return{
      }
    }
  })
</script>
