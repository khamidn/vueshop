<template>
	<div>
		<v-container>
			<h1 class="orange--text">GET IN TOUCH</h1>
			<v-row>
				<v-col col="12" md="6" sm="6">
					<!-- <v-card> -->
						<v-list two-line>
							<v-list-item>
								<v-list-item-icon>
									<v-icon color="orange">mdi-message-text</v-icon>
								</v-list-item-icon>

								<v-list-item-content>
									<v-list-item-title>
										{{contact.email}}
									</v-list-item-title>
									<v-list-item-subtitle>
										Email
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>

							<v-divider inset></v-divider>	

							<v-list-item>
								<v-list-item-icon>
									<v-icon color="orange">mdi-phone</v-icon>
								</v-list-item-icon>

								<v-list-item-content>
									<v-list-item-title>
										{{ contact.phone}}
									</v-list-item-title>
									<v-list-item-subtitle>
										Phone/WhatsApp
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>

							<v-divider inset></v-divider>

							<v-list-item>
								<v-list-item-icon>
									<v-icon color="orange">mdi-map-marker</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title>
										{{contact.address}}
										<p style="margin-bottom: 0px">
											<span :items="kotaCompany">{{typeCity}} - {{nameCity}}, </span>
											<span :items="provinsiCompany">{{nameProvince}}, </span>
											<span> {{ contact.postal_code}}</span>
										</p>
									</v-list-item-title>
									<v-list-item-subtitle>
										Address
									</v-list-item-subtitle>
								</v-list-item-content>	
							</v-list-item>
						</v-list>
					<!-- </v-card> -->
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		data: ()=> ({
			// contact: []
			typeCity: '',
            nameCity:'',
            nameProvince: '',
			
		}),

		computed: {
			...mapGetters({
				contact 	: 'contact/contact',
				provinces   : 'region/provinces',
       			cities      : 'region/cities',
			}),

			kotaCompany(){
				// return this.contact.filter((contact)=> {
				return this.cities.filter((city)=>{
						if(this.contact.city_id == city.id){
							this.typeCity = city.type
							this.nameCity = city.city
						} return city	
					})		
				// })
			},

			provinsiCompany(){
				// return this.contact.filter((contact)=> {
				return this.provinces.filter((province)=> {
						if(this.contact.province_id==province.id){
							this.nameProvince = province.province
						} return province
					})
				// })
			}


		},

		methods: {
			...mapActions({
				setContact		: 'contact/setContact',
				setProvinces  	: 'region/setProvinces',
        		setCities     	: 'region/setCities',
			}),
		},

		created(){

				if(this.contact && this.contact.length==0){
					this.axios.get('/contact')
						.then((response)=> {
							let { data } = response.data
							this.setContact(data)	
						})
				}

				 if(this.provinces && this.provinces.length==0){
		            this.axios.get('/provinces')
			            .then((response) => {
			                let { data } = response.data
			                this.setProvinces(data)
			                
			                
			            })
		            this.axios.get('/cities')
			            .then((response) => {
			                let { data } = response.data
			                this.setCities(data)
			            })
		        }
		}
	}
</script>