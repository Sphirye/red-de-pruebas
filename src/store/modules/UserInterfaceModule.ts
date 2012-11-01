export default {
	namespaced: true,
	state: {
    snackbar: false,
    snackbarContent: "",
    dialogNewUser: false,
    postDropdownList: [
      {name: "Editar", icon: "mdi-lead-pencil"},
      {name: "Eliminar",  icon: "mdi-comment-remove-outline"}
    ],
	},
	mutations: {
    closeSnackbar(state){
      state.snackbar = false
      state.snackbarContent = ""
    },
    postDropdown(state, payload){
      function identifyButton(buttonName: string) {
        return (payload.payload.button.name == buttonName)
      }
      if (identifyButton("Eliminar")){
        const index = payload.rootState.FeedModule.posts.findIndex(post => post.id == payload.payload.post.id)
        payload.rootState.FeedModule.posts.splice(index, 1)
        console.log(`Se elimino el post ${payload.payload.post.id}`)
      }
      if(identifyButton("Editar")){
        if (payload.payload.post.userId == payload.rootState.UsersModule.selectedUserId){
          payload.rootState.FeedModule.editPostObject.model = payload.payload.post.content
          payload.rootState.FeedModule.editPostObject.postId = payload.payload.post.id
          payload.rootState.FeedModule.editPostObject.dialog = true
        } else {
          alert("Este post/comentario no te pertenece.")
        }
      }
    },
    openDialogPushUser(state) {
      state.dialogNewUser = true
    }
	},
	actions: {
    closeSnackbarAction({ commit }){
      commit("closeSnackbar")
    },
    postDropdownAction({ commit, rootState }, payload){
      commit("postDropdown", {payload, rootState})
    },
    openDialogPushUserAction({ commit }) {
      commit("openDialogPushUser")
    }
	},
	getters: {
	}
}