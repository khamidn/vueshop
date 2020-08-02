export default {
	namespaced: true,
	state: {
		contact: {},

	},

	mutations: {
		setContact: (state, payload) => {
			state.contact = payload
		}
	},

	actions: {
		setContact: ({commit}, payload) => {
			commit('setContact', payload)
		}
	},

	getters: {
		contact: state => state.contact,
	}
}