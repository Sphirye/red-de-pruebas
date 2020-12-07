<template>
  <v-app class="home">
    <v-main>
      <v-container grid-list-md>
        <v-layout row wrap>
        <Feed/>
        <UsersBar/>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>

</template>

<script lang="ts">
import Vue from 'vue';
import UsersBar from '@/components/UsersBar.vue'; // @ is an alias to /src
import Feed from '@/components/Feed.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    UsersBar,
    Feed,
  },
});
</script>
