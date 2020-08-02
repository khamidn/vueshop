<template>
	<div>
		<v-container>
			<v-card flat>
				<form v-model="valid">
					<!-- <v-container> -->
						<h1 class="orange--text">Setting Contact</h1>
						<v-row>
							
								<v-col cols="12" sm="6" md="6">
									<v-text-field v-model="email" :rules="emailRules" label="Email" placeholder="kayumo@email.com" outlined dense></v-text-field>
								</v-col>
								<v-col cols="12" sm="6" md="6">
									<v-text-field v-model="phone" :rules="phoneRules" label="Phone/WhatsApp" placeholder="+62 123 0000 4567" outlined dense></v-text-field>
								</v-col>
						</v-row>
						<v-row>
							<v-col cols="12" sm="12" md="12">
								<v-text-field v-model="address" :rules="addressRules" label="Address" placeholder="Jl. Raya No. 2" outlined dense></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12" sm="4" md="4">
								<v-select 
								v-model="province_id" 
								:items="provinces" 
								item-text="province" 
								item-value="id" 
								label="Provinsi" 
								outlined 
								dense>
								</v-select>
							</v-col>
							<v-col cols="12" sm="4" md="4">
								<v-select 
								v-model="city_id" 
								v-if="province_id>=0" 
								:items="citiesByProvince"
								item-value="id" 
								label="City/Districts" 
								outlined 
								dense
								>
									<!-- ditampilkan di kolom sudah dipilih -->
									<template slot='selection' slot-scope='{ item }'>
										{{ item.type }} - {{ item.city }} 
									</template>
									<!-- ditampilkan daftar kota berdasarkan provinsi yang dipilih -->
									<template slot='item' slot-scope='{ item }'>
										{{ item.type }} - {{ item.city }} 									
									</template>
								</v-select>
							</v-col>
							<v-col cols="12" sm="4" md="4">
								<v-text-field v-model="postal_code" :rules="postal_codeRules" label="Postal Code" outlined dense></v-text-field>
								<!-- <div> -->
									<small class="grey--text">Input the postal code, according to the city/district where you live</small>
								<!-- </div> -->
							</v-col>
						</v-row>

						<v-row>
							<v-col cols="12" sm="12" md="12">
								<v-card-actions>
									<!-- <v-btn text @click="resetForm">CANCEL</v-btn> -->
									<v-spacer></v-spacer>
									<v-btn :disabled="!valid" text color="primary" @click="saveContact">SAVE</v-btn>
								</v-card-actions>
							</v-col>
						</v-row>
							
						
					<!-- </v-container> -->
					
				</form>
			</v-card>
		</v-container>
	</div>
	
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		data: ()=> ({
			valid: true,
			email: '',
			emailRules: [
				v => !!v || 'E-mail is required.',
                v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'E-mail must be valid'
			],
			phone: '',
			phoneRules: [
				v => !!v || 'Phone is required',
                v => v.length <= 12 || 'Phone max 12 number',
			],
			address: '',
			addressRules: [
				v => !!v || 'Address is required',
                v => v.length <= 255 || 'Address max 255 characters',
			],
			postal_code: '',
			postal_codeRules: [
				v => !!v || 'Postal Code is required',
                v => v.length <= 5 || 'Phone max 5 number',
			],			 


			province_id: 0,
			city_id: 0,
			nameProvince:'',
			nameCity: '',
			postalCode: '',
		}),

		computed: {
			...mapGetters({
				user 		: 'auth/user',
				contact 	: 'contact/contact',
				provinces	: 'region/provinces',
				cities		: 'region/cities',
			}),

			// provinces(){
			// 	return this.contact.filter((contact)=> {
			// 		 let province_id = contact.province_id
					
			// 	})
			// },

			// provinces(){
			// 	this.province_id = this.contact.province_id
			// },


			citiesByProvince(){
				
				let province_id = this.province_id
				return this.cities.filter((city)=> {
					if (city.province_id == province_id) return city
				})
			},
		},

		methods: {
			...mapActions({
				setAlert		: 'alert/set',
				setContact 		: 'contact/setContact',
				setProvinces	: 'region/setProvinces',
				setCities		: 'region/setCities'
			}),

			saveContact(){
				let formData = new FormData()
				formData.set('email',this.email)
				formData.set('phone',this.phone)
				formData.set('address',this.address)
				formData.set('province_id',this.province_id)
				formData.set('city_id',this.city_id)
				formData.set('postal_code',this.postal_code)

				let config = {
					headers: {
						'Authorization': 'Bearer ' + this.user.api_token,
					},
				}

				this.axios.post('/update-contact-company', formData, config)
					.then((response)=>{
						let { data } = response
						this.setContact(data.data)
						this.setAlert({
	                        status  : true,
	                        text    : data.message,
	                        color   : 'success',
                    	})

					})
					.catch((error)=>{
						let { data } = error
	                    this.setAlert({
	                        status  : true,
	                        text    : data.message,
	                        color   : 'success' 
	                    })
					})
				// this.$router.replace({ path: '/home' })
			}
		},

		created(){


			this.email = this.contact.email
			this.phone = this.contact.phone
			this.address = this.contact.address
			this.province_id = this.contact.province_id
			this.city_id = this.contact.city_id
			this.postal_code = this.contact.postal_code



			// if(this.contact && this.contact.length == 0){
				this.axios.get('/contact')
					.then((response)=> {
						let { data } = response.data
						this.setContact(data)
					})
			// }

			// if(this.provinces){
				this.axios.get('/provinces')
					.then((response)=> {
						let { data } = response.data
						this.setProvinces(data)
					})
				this.axios.get('/cities')
					.then((response)=> {
						let { data } = response.data
						this.setCities(data)
					})
			// }

			// return this.contact.filter((contact)=> {
				
			// })

		}

	}
</script>

