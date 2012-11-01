import Vue from "vue"
import Vuex from "vuex"

import FeedModule from "./modules/FeedModule"
import UsersModule from "./modules/UsersModule"
import UserInterfaceModule from "./modules/UserInterfaceModule"

Vue.use(Vuex)

export default new Vuex.Store({
	getters: {
		getUserById: (state) => (userId: number) => {
			let filtro = state.usersModule.users.filter(user => user.id == userId)
			console.log(filtro)
			return filtro[0]
		}
	},
	modules: {
		FeedModule,
		UsersModule,
		UserInterfaceModule,
	},
})
