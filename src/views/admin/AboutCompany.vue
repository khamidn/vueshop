<template>
	<div>
		<v-container>
			<v-card flat>
				<form v-model="valid">
					<!-- <v-container> -->
						<h1 class="orange--text">About Company</h1>
						<v-row>
							<v-col cols="12" md="9" sm="9">
								<v-text-field v-model="title" label="Title" placeholder="About Kayumo" outlined dense prepend-icon="title"></v-text-field>
								<v-file-input accept="image/png, image/jpeg, image/bmp" outlined dense placeholder="Pick an image/logo your company (Untuk hasil yg optimal, gunakan gambar landscape)" @change="onFileSelected" prepend-icon="mdi-camera">
									<template v-slot:label>
										<div>
											File Gambar <small>(Optional)</small>
										</div>
									</template>
								</v-file-input>
								<!-- <div>
									<p class="caption orange--text" style="margin-bottom: 0px;">Untuk hasil yg optimal, gunakan gambar landscape</p>
								</div> -->
							</v-col>
							<v-col cols="12" md="3" sm="3">
								<v-card outlined>
									<!-- <v-avatar color="grey" tile height="120px" width="200px"> -->
										<div v-if="imageUrl!=''" align="center" justify="center">
											<v-img :src="imageUrl" height="120px" width="200px"/>
										</div>
										<div v-else align="center" justify="center">
											<v-img
											:rules="imageRules" 
											:src="getImage('/abouts/'+about.image_company)" 
											:lazy-src="getImage('/abouts/'+about.image_company)"
											height="120px"
											width="200px"
											>
												<template v-slot:placeholder>
													<v-row class="fill-height ma-0" align="center" justify="center">
														<v-progress-circular indeterminate color="orange darken-3"></v-progress-circular>
													</v-row>
												</template>
											</v-img>
										</div>
																			
									<!-- </v-avatar> -->
									
								</v-card>
							</v-col>
						</v-row>

						<v-row>
							<v-col cols="12" sm="12" md="12">
								<v-textarea v-model="description" color="teal" outlined dense rows="20" counter>
									<template v-slot:label>
										<div>
											Deskripsi About Company
										</div>
									</template>
								</v-textarea>
							</v-col>
							<v-col cols="12" sm="12" md="12">
								<v-card-actions>
									<!-- <v-btn text @click="resetForm">CANCEL</v-btn> -->
									<v-spacer></v-spacer>
									<v-btn :disabled="!valid" @click="saveAbout" text color="primary">Save</v-btn>
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
			title: '',
			description: '',
			image: '',
			imageRules: [
                    v => !v || v.type == 'image/jpeg'|| v.type== 'image/png'|| 'The image format must be png/jpeg',
                    v => !v || v.size < 2000000 || 'Avatar size should be less than 2 MB!',
                ],
			about: {},
			imageUrl:'',
			imageFile: {},


		}),

		computed: {
			...mapGetters({
				user : 'auth/user',
			})
		},

		methods: {
			...mapActions({
				setAlert : 'alert/set',
			}),

			onFileSelected(file){
				this.image = file

				const fileImageCompany = file
				let nameImage = fileImageCompany.name
				const fileReader = new FileReader()
					fileReader.addEventListener('load', () => {
						this.imageUrl = fileReader.result
					})

					fileReader.readAsDataURL(fileImageCompany)
					this.imageFile = fileImageCompany



			},

			saveAbout(){
				
				let formData = new FormData()
				formData.set('title', this.title)
				formData.set('image', this.image)
				formData.set('description', this.description)

				 let config = {
                    headers: {
                        'Authorization': 'Bearer ' + this.user.api_token,
                    },
                }

				this.axios.post('/update-about-company', formData, config)
				.then((response)=>{
                    let { data } = response
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
                        color   : 'success',
                    })
                })
			},
		},

		created(){
			this.axios.get('/about')
				.then((response)=>{
					let about = response.data.data
					this.about = about
					this.title = this.about.title
					this.description = this.about.description

				})
		}
	}
</script>