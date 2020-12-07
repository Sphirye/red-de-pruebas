<template>
   <v-flex md7>
      <v-card class='ma-3 pa-3'>
        <v-form>
          <v-text-field label='¿Que estas pensando?'
          v-model='newPost.content'></v-text-field>

          <v-btn block class='info' @click='sendPost(newPost)'>
              Publicar
            <v-icon class='ma-2'>mdi-send</v-icon>
          </v-btn>
        </v-form>
      </v-card>

      <!--Post-->
      <v-card v-for='(post, index) in posts.slice().reverse()' class='ma-5' :key='index'>
         <v-card-title class='info white--text'>
            <v-avatar fab small>
               <img :src='require("../assets/profile_photos/"+getUserById(post.userId).avatar)'>
            </v-avatar>
            <span class='ml-2'>{{getUserById(post.userId).username}}</span>
            <v-spacer></v-spacer>

            <!--Dropdown del post, ya despues lo implementaré para comentarios tambien-->
            <v-menu offset-y>
              <template v-slot:activator='{ on, attrs }'>
                <v-btn icon v-bind='attrs' v-on='on'>
                   <v-icon class='white--text'>
                      mdi-dots-vertical
                   </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item-group>
                  <v-list-item v-for='button in postDropdownList'>
                    <v-list-item-icon>
                      <v-icon>{{button.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content @click='postDropdownActions({button, post})'>
                      <v-list-item-title>
                        {{button.name}}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>

        </v-card-title>

        <v-card-text class='mt-5'>
            {{post.content}}
        </v-card-text>

        <v-divider></v-divider>

        <!--Barrita con botones para interactuar en el post (de momento solo funciona el de comentar)-->
        <v-flex class='d-flex justify-space-around'>
            <v-btn icon @click=''>
               <v-icon> mdi-heart-outline </v-icon>
            </v-btn>

            <v-btn icon @click='post.replyBox = !post.replyBox'>
               <v-icon> mdi-message-outline </v-icon>
            </v-btn>

            <v-btn icon>
               <v-icon> mdi-share-outline </v-icon>
            </v-btn>
        </v-flex>

          <!--Caja de cometarios, solo se muestra si presionas el boton de comentar post-->
          <v-list v-if='post.replyBox'>

            <div v-for='(reply, index) in replys' :key='index'>
              <div v-if='(reply.postId == post.id)'>
                <v-divider></v-divider>

                <!--Comentario-->
                <v-list-item>
                  <v-list-item-avatar>
                    <img :src='require("../assets/profile_photos/"+getUserById(reply.userId).avatar)'>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class='d-flex justify-space-between align-center'>
                      <v-flex class='d-flex align-center justify-space-between'>
                        <span>{{getUserById(reply.userId).username}}</span>
                      </v-flex>
                    </v-list-item-title>
                    <span class='subtitle-1 text--secondary'>{{reply.content}}</span>
                  </v-list-item-content>
                </v-list-item>

              </div>
            </div>
            <v-divider></v-divider>

            <!--Caja para comentar-->
            <v-list-item>
              <v-list-item-avatar>
                <img :src='require("../assets/profile_photos/"+getUserById(selectedUserId).avatar)'>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-textarea
                  label='Escribe un comentario.'
                  counter
                  maxlength='200'
                  v-model='newReply.content'
                ></v-textarea>
                <div>
                  <v-btn icon class='float-right' @click='sendReply(post.id, newReply)'>
                    <v-icon color='info'>mdi-send</v-icon>
                  </v-btn>
                </div>
              </v-list-item-content>
            </v-list-item>

          </v-list>
      </v-card>

      <!--Snackbar, el contenido en ella cambia con la funcion correspondiente-->
      <v-snackbar v-model='snackbar' timeout='-1' class=''>
        <div class='d-flex justify-space-between align-center'>
          <span>{{snackbarContent}}</span>
          <v-btn text @click='closeSnackbar()'>
            Cerrar
          </v-btn>
        </div>
      </v-snackbar>

      <!--Dialog para editar un post, pienso que debería cambiarle el nombre a ese editPostObject-->
      <v-dialog v-model="editPostObject.dialog" max-width="500px" persistent>
        <v-card>
          <v-card-title>
            Editar
          </v-card-title>

          <v-container>
            <v-textarea v-model="editPostObject.model" required>
            </v-textarea>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon color="info" @click="editPostAction()">
                mdi-send
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

   </v-flex>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';

  export default {
    name: 'Feed',
    computed: {
      ...mapState([
        'users',  'newUser', 'selectedUserId',
        'posts',  'newPost', 
        'replys', 'newReply',
        'snackbar', 'snackbarContent',
        'editPostObject',
        'postDropdownList',
      ]),
      ...mapGetters(['getUserById']),
    },
    methods: {
      ...mapActions({
        sendPost: 'sendPostAction',
        sendReply: 'sendReplyAction',
        closeSnackbar: 'closeSnackbarAction',
        postDropdownActions: 'postDropdownActions',
        editPostAction: 'editPostAction'
      })
    },
    data() {
      return{
      }
    }
  }
</script>