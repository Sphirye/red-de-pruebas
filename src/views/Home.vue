<template>
  <v-app class="home">
    <v-main>
      <v-container grid-list-md>
        <v-layout row wrap>
        <FeedComponent/>
        <UsersBarComponent/>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>

</template>

<script lang="ts">
import Vue from 'vue';
import UsersBarComponent from '@/components/UsersBarComponent.vue';
import FeedComponent from '@/components/FeedComponent.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    UsersBarComponent,
    FeedComponent,
  },
});
</script>
