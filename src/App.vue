<template>
  <v-app>
    <v-main>
      <SnackbarComponent/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import SnackbarComponent from './components/SnackbarComponent.vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'App',
  computed: {
  },
  components: {
    SnackbarComponent
  },

  data: () => ({
    //
  }),
});
</script>
