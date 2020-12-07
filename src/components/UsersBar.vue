<template>
  <v-flex md5>
    <v-dialog v-model="dialogNewUser" persistent width="500px">
      <v-card>
        <v-card-title class="info">
          <span class="white--text">Nuevo Usuario</span>
        </v-card-title>
        <v-list>
          <v-form class="ma-5 mr-5">
            <v-text-field label="Escribe tu nombre aquí." 
                  v-model="newUser.username"></v-text-field>

            <v-text-field label="Escribe tu correo electronico aquí (da igual lo que escribas)." 
                  v-model="newUser.email"></v-text-field>

            <v-text-field label="Dejanos saber algo sobre ti." 
                  v-model="newUser.userstate"></v-text-field>
          </v-form>
          <v-card-actions>
            <v-btn @click="addUser(newUser), dialogNewUser = false" class="ma-3">
              Añadir
            </v-btn>
          </v-card-actions>
        </v-list>
      </v-card>
    </v-dialog>

    <v-card>
      <v-card-title class="success">
        <span class="white--text">Usuarios</span>
      </v-card-title>
      <v-list v-for="(user, index) in users" :key="index">
        <v-list-item @click="consoleLogUser(user.id)">
          <v-list-item-avatar>
            <img :src="require('../assets/profile_photos/'+user.avatar)">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{user.username}}</v-list-item-title>
            <v-list-item-subtitle>{{user.userstate}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
      </v-list>

      <v-card-actions>
        <v-btn text color="info" @click="dialogNewUser = true">
          Añadir usuario
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapState, mapMutations, mapActions } from 'vuex';

  export default Vue.extend({
    name: 'UsersBar',
    computed: {
      ...mapState(['users', 'newUser']),
    },
    methods: {
      ...mapActions({
        consoleLogUser: "consoleLogUserAction",
        addUser: "addUserAction"
      }),
    },
    data() {
      return{
        dialog: false,
        message: '',
        dialogNewUser: false,
        actualUser: 3
      }
    }
  })
</script>
