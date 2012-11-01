import Vue from 'vue'
import Vuex from 'vuex'

import tareas from './modules/tareas.ts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { 
    posts: [
      {
        userId: 1,
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo ratione quisquam esse recusandae exercitationem, ut, non? Recusandae inventore magnam, mollitia sequi vero, porro sint veniam assumenda sed doloribus ut! Minus?',
        id: 1,
        replyBox: false
      },
      {
        userId: 3,
        content: 'Math-shrine denim assault range-rover monofilament dome assassin sunglasses table dolphin j-pop post-uplink beef noodles rifle. Gang smart-Legba long-chain hydrocarbons shanty town girl modem sentient 3D-printed. Claymore mine cyber--space courier papier-mache urban augmented reality hacker A.I. youtube post. Assassin tiger-team sensory ablative narrative futurity free-market papier-mache fetishism construct smart-geodesic tube lights bridge woman. ',
        id: 2,
        replyBox: false
      },
      {
        userId: 5,
        content: 'Faded physical market realism smart-Tokyo shanty town rebar neon fluidity corrupted range-rover hotdog semiotics. Rain katana free-market sentient singularity camera hacker bridge. Singularity receding range-rover alcohol modem denim sensory. Kanji wristwatch corporation cartel shoes industrial grade nodal point-ware human sentient media dead gang garage voodoo god weathered free-market. Assassin hacker crypto-carbon Shibuya car meta-sunglasses assault render-farm math-denim long-chain hydrocarbons. ',
        id: 3,
        replyBox: false
      },
      {
        userId: 2,
        content: 'Faded physical market realism smart-Tokyo shanty town rebar neon fluidity corrupted range-rover hotdog semiotics. Rain katana free-market sentient singularity camera hacker bridge. Singularity receding range-rover alcohol modem denim sensory. Kanji wristwatch corporation cartel shoes industrial grade nodal point-ware human sentient media dead gang garage voodoo god weathered free-market. Assassin hacker crypto-carbon Shibuya car meta-sunglasses assault render-farm math-denim long-chain hydrocarbons. ',
        id: 4,
        replyBox: false
      }//Deposito de posts
    ],
    replys: [
      {
        userId: 1,
        postId: 1,
        content: 'Le pertenezco al post con id 1',
        id: 1
      },
      {
        userId: 2,
        postId: 2,
        content: 'Le pertenezco al post con id 2',
        id: 2
      },
      {
        userId: 3,
        postId: 3,
        content: 'Le pertenezco al post con id 3',
        id: 3
      },
      {
        userId: 4,
        postId: 4,
        content: 'Le pertenezco al post con id 4',
        id: 4
      },
      {
        userId: 5,
        postId: 4,
        content: 'Le pertenezco al post con id 4',
        id: 5
      },//Deposito de comentarios
    ],
    users: [
      {
        username: 'Reimu Hakurei',
        email: 'user1@gmail.com',
        avatar: 'user_1.png',
        userstate: 'Agradecido con el de arriba',
        id: 1
      },
      {
        username: 'Sakuya Izayoi',
        email: 'user2@gmail.com',
        avatar: 'user_2.png',
        userstate: 'Estoy lol XD',
        id: 2
      },
      {
        username: 'Giorno Giovanna',
        email: 'user3@gmail.com',
        avatar: 'user_3.png',
        userstate: '',
        id: 3
      },
      {
        username: 'Kira Yoshikage',
        email: 'user4@gmail.com',
        avatar: 'user_4.png',
        userstate: 'Viva la musica disco',
    
        id: 4
      },
      {
        username: 'Usagi Tsukino',
        email: 'user5@gmail.com',
        avatar: 'user_5.png',
        userstate: 'No seas trolo man',
        id: 5
      },
      {
        username: 'Remilia Scarlet',
        email: 'user6@gmail.com',
        avatar: 'user_6.png',
        userstate: 'Lorem ipsum',
        id: 6
      }//Deposito de usuarios
    ],
    selectedUserId: 2,  //Aquí se deposita el usuario "actual".
    newUser: {
      username: '',
      email: '',
      avatar: '',
      userstate: ''//Usuario flotante
    },
    newReply: {
      userId: '',
      content: ''//Comentario flotante
    },
    newPost: {  //Post flotante
      userId: '',
      content: '',
      id: ''
    },
    snackbar: false,
    snackbarContent: '',
    editPostObject: {
      dialog: false,
      model: '',
      postId: undefined,
    },
    postDropdownList: [  //Lista de botones que irían sobre un dropdown en un post
      {name: 'Editar', icon: 'mdi-lead-pencil'},
      {name: 'Eliminar',  icon: 'mdi-comment-remove-outline'}
    ],
  },
  getters: {
    getUserById: (state) => (userId: number) => {
      let filtro = state.users.filter(user => user.id == userId)
      return filtro[0]
    }
  },
  mutations: {
    consoleLogUser(state, userId: number){
      state.selectedUserId = userId
      console.log(userId)
    },

    addUser(state, newUser: object){
      const user: object = {
        username: newUser.username,
        email: newUser.email,
        userstate: newUser.userstate,
        avatar: "user_1.png"  //El avatar por el momento es estatico
      }

      state.form.newUser.username    = ''
      state.form.newUser.email     = ''
      state.form.newUser.userstate  = ''
      state.form.newUser.avatar     = ''

      state.users.push(user)
    },

    //actualPostId = post al que le pertenece el comentario.
    sendReply(state, actualPostId) {
      const asignId: number = state.selectedUserId

      const reply = {
        userId: asignId,
        content: state.newReply.content,
        id: state.replys.length + 1,
        postId: actualPostId
      }

      if (state.newReply.content == ''){
        state.snackbar = true
        state.snackbarContent = 'No puedes enviar comentarios en blanco.'
      } else {
        state.replys.push(reply)
        state.snackbar = true
        state.snackbarContent = 'Tu comentario fue enviado.'
        state.newReply.content = ''
      }

      console.log(asignId)
    },

    sendPost(state){ 
      const asignId: number = state.selectedUserId

      const post = {
        userId: asignId,
        content: state.newPost.content,
        id: state.posts.length + 1,
        replyBox: false
      }

      //Asegurar que el post enviado no esta en blanco
      if (state.newPost.content == ''){
        state.snackbar = true
        state.snackbarContent = 'No puedes enviar publicaciones en blanco.'
      } else {
        state.posts.push(post)
        state.snackbar = true
        state.snackbarContent = 'Tu publicación fue enviada.'
        state.newPost.content = ''
      }

      console.log(asignId)
    },

    //Cerrar snackbar, me da un error (setter) si no hago esto, ya despues lo resolvere.
    closeSnackbar(state){
      state.snackbar = false
      state.snackbarContent = ''
    },

    //Esta mutation tiene lugar cuando clickeas algun botón en las opciones de un post.
    //payload aquí debe tener dos parametros: 
    //  1: el objeto del boton que fue presionado
    //  2: el post al que le pertenece el boton que fue presionado
    postDropdown(state, payload){
      //Funcion para idetificar el boton presionado.
      function identifyButton(buttonName: string) {
        return (payload.button.name == buttonName)
      }

      //Al presionar Eliminar:
      if (identifyButton('Eliminar')){
        //Hallar el post correspondiente comparando su ID 
        const index = state.posts.findIndex(post => post.id == payload.post.id)

        //Remover el post
        state.posts.splice(index, 1)

        console.log(`Se elimino el post ${payload.post.id}`)
      }

      //Al presionar Editar:
      if(identifyButton('Editar')){
        if (payload.post.userId == state.selectedUserId){
          state.editPostObject.model = payload.post.content
          state.editPostObject.postId = payload.post.id
          state.editPostObject.dialog = true
        } else {
          alert('Este post/comentario no te pertenece.')
        }
      }
    },


    editPost(state){
      //Hallar el post correspondiente comparando su ID
      const index = state.posts.findIndex(post => post.id == state.editPostObject.postId)

      //Asegurar que el post editado no esta en blanco
      if (state.editPostObject.model != ''){ 
        //Editar el post correspondiente y devolver el post flotante a su estado inicial
        state.posts[index].content = state.editPostObject.model
        state.editPostObject.model = ''
        state.editPostObject.postId = undefined
        state.editPostObject.dialog = false
      }
    }
  },
  actions: {  //No se que coño hice aquí.
    consoleLogUserAction({ commit }, message){
      commit('consoleLogUser', message)
    },
    addUserAction({ commit }, floatUser){
      commit('addUser', floatUser)
    },
    sendPostAction({ commit }){
      commit('sendPost')
    },
    sendReplyAction({commit}, actualPostId){
      commit('sendReply', actualPostId)
    },
    closeSnackbarAction({ commit }){
      commit('closeSnackbar')
    },
    postDropdownActions({ commit }, payload){
      commit('postDropdown', payload)
    },
    editPostAction({ commit }, payload){
      commit('editPost', payload)
    }
  },
  modules: {
    tareas
  }
})
