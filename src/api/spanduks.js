import { mapGetters, mapActions } from 'vuex'

export default {
	computed: {
		...mapGetters({
				user : 'auth/user',
			}),
	},
	

	getSpanduks(){
		let config = {
            headers: {
                'Authorization': 'Bearer ' + this.user.api_token,
            },
        }
		return axios.get('/spanduks', config)
	}
}