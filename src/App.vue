<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'App',
  computed: {
    ...mapState(['posts'])
  },
  components: {
    //HelloWorld,
  },

  data: () => ({
    //
  }),
});
</script>
