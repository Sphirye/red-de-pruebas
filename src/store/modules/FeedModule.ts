export default {
	namespaced: true,
	state: {
		posts: [
      {
        userId: 1,
        content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo ratione quisquam esse recusandae exercitationem, ut, non? Recusandae inventore magnam, mollitia sequi vero, porro sint veniam assumenda sed doloribus ut! Minus?",
        id: 1,
        replyBox: false
      },
      {
        userId: 3,
        content: "Math-shrine denim assault range-rover monofilament dome assassin sunglasses table dolphin j-pop post-uplink beef noodles rifle. Gang smart-Legba long-chain hydrocarbons shanty town girl modem sentient 3D-printed. Claymore mine cyber--space courier papier-mache urban augmented reality hacker A.I. youtube post. Assassin tiger-team sensory ablative narrative futurity free-market papier-mache fetishism construct smart-geodesic tube lights bridge woman. ",
        id: 2,
        replyBox: false
      },
      {
        userId: 5,
        content: "Faded physical market realism smart-Tokyo shanty town rebar neon fluidity corrupted range-rover hotdog semiotics. Rain katana free-market sentient singularity camera hacker bridge. Singularity receding range-rover alcohol modem denim sensory. Kanji wristwatch corporation cartel shoes industrial grade nodal point-ware human sentient media dead gang garage voodoo god weathered free-market. Assassin hacker crypto-carbon Shibuya car meta-sunglasses assault render-farm math-denim long-chain hydrocarbons. ",
        id: 3,
        replyBox: false
      },
      {
        userId: 2,
        content: "Faded physical market realism smart-Tokyo shanty town rebar neon fluidity corrupted range-rover hotdog semiotics. Rain katana free-market sentient singularity camera hacker bridge. Singularity receding range-rover alcohol modem denim sensory. Kanji wristwatch corporation cartel shoes industrial grade nodal point-ware human sentient media dead gang garage voodoo god weathered free-market. Assassin hacker crypto-carbon Shibuya car meta-sunglasses assault render-farm math-denim long-chain hydrocarbons. ",
        id: 4,
        replyBox: false
      }
    ],
    newPost: {
      userId: "",
      content: "",
      id: ""
    },

    replys: [
      {
        userId: 1,
        postId: 1,
        content: "Le pertenezco al post con id 1",
        id: 1
      },
      {
        userId: 2,
        postId: 2,
        content: "Le pertenezco al post con id 2",
        id: 2
      },
      {
        userId: 3,
        postId: 3,
        content: "Le pertenezco al post con id 3",
        id: 3
      },
      {
        userId: 4,
        postId: 4,
        content: "Le pertenezco al post con id 4",
        id: 4
      },
      {
        userId: 5,
        postId: 4,
        content: "Le pertenezco al post con id 4",
        id: 5
      },
    ],
    newReply: {
      userId: "",
      content: ""
    },
    editPostObject: {
      dialog: false,
      model: "",
      postId: undefined,
    },
	},

	mutations: {
		sendPost(state, rootState){ 
      const post = {
        userId: rootState.UsersModule.selectedUserId,
        content: state.newPost.content,
        id: state.posts.length + 1,
        replyBox: false
      }

      if (state.newPost.content == ""){
        rootState.UserInterfaceModule.snackbar = true
        rootState.UserInterfaceModule.snackbarContent = "No puedes enviar publicaciones en blanco."
      } else {
        state.posts.push(post)
        rootState.UserInterfaceModule.snackbar = true
        rootState.UserInterfaceModule.snackbarContent = "Tu publicación fue enviada."
        state.newPost.content = ""
      }
    },

		sendReply(state, payload) {
      const reply = {
        userId: payload.rootState.UsersModule.selectedUserId,
        content: state.newReply.content,
        id: state.replys.length + 1,
        postId: payload.actualPostId
      }

      if (state.newReply.content == ""){
        payload.rootState.UserInterfaceModule.snackbar = true
        payload.rootState.UserInterfaceModule.snackbarContent = "No puedes enviar comentarios en blanco."
      } else {
        state.replys.push(reply)
        payload.rootState.UserInterfaceModule.snackbar = true
        payload.rootState.UserInterfaceModule.snackbarContent = "Tu comentario fue enviado."
        state.newReply.content = ""
      }
    },

    editPost(state){
      const index = state.posts.findIndex(post => post.id == state.editPostObject.postId)
      if (state.editPostObject.model != ""){ 
        state.posts[index].content = state.editPostObject.model
        state.editPostObject.model = ""
        state.editPostObject.postId = undefined
        state.editPostObject.dialog = false
      }
    }
	},

	actions: {
		sendPostAction({ commit, rootState }) {
      commit("sendPost", rootState)
    },
    sendReplyAction({ commit, rootState }, actualPostId: any) {
      commit("sendReply", {actualPostId, rootState })
    },
    editPostAction({ commit, rootState}, payload) {
      commit("editPost", rootState.UsersModule.selectedUserId)
    }
	},

	getters: {
	}
}