export default {
	namespaced: true,
	state: {
		users: [
      {
        username: "Reimu Hakurei",
        email: "user1@gmail.com",
        avatar: "user_1.png",
        userstate: "Agradecido con el de arriba",
        id: 1
      },

      {
        username: "Sakuya Izayoi",
        email: "user2@gmail.com",
        avatar: "user_2.png",
        userstate: "Estoy lol XD",
        id: 2
      },
      {
        username: "Giorno Giovanna",
        email: "user3@gmail.com",
        avatar: "user_3.png",
        userstate: "",
        id: 3
      },
      {
        username: "Kira Yoshikage",
        email: "user4@gmail.com",
        avatar: "user_4.png",
        userstate: "Viva la musica disco",
        id: 4
      },
      {
        username: "Usagi Tsukino",
        email: "user5@gmail.com",
        avatar: "user_5.png",
        userstate: "No seas trolo man",
        id: 5
      },
      {
        username: "Remilia Scarlet",
        email: "user6@gmail.com",
        avatar: "user_6.png",
        userstate: "Lorem ipsum",
        id: 6
      }
    ],

    newUser: {
      username: "",
      email: "",
      avatar: "",
      userstate: ""
    },

    selectedUserId: 2,
	},
	mutations: {
		pintarUsuario(state, rootState){
		},
		addUser(state, rootState){
			const newUser = state.newUser

      const user: object = {
        username: newUser.username,
        email: newUser.email,
        userstate: newUser.userstate,
        avatar: "user_1.png"								//De momento, el avatar es estatico
      }

			console.log(user)

			if ((user.username != "") && (user.email != "")) {
	      newUser.username = ""
	      newUser.email = ""
	      newUser.userstate = ""
	      newUser.avatar = ""

	      state.users.push(user)
				rootState.UserInterfaceModule.dialogNewUser = false
			}
    },

    consoleLogUser(state, userId: number){
      state.selectedUserId = userId
      console.log(`Ahora estas participando como el usuario ${state.selectedUserId}`)
    },
	},
	actions: {
		pintarUsuarioAction( { state, commit, rootState }) {
			commit("pintarUsuario", rootState)
		},
		consoleLogUserAction( { commit }, message) {
      commit("consoleLogUser", message)
    },
    addUserAction( { commit, rootState }) {
      commit("addUser", rootState)
    },
	},
	getters: {
    getUserById: (state) => (userId: number) => {
      let filtro = state.users.filter(user => user.id == userId)
      return filtro[0]
    }
	}
}