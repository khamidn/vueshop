<template>
	<div>
		<v-container>
			<h1 class="orange--text">Spanduk</h1>
			<v-tabs v-model="tab" icons-and-text>
				<v-tab>
					LIST SPANDUK
					<v-icon>list</v-icon>
				</v-tab>
				<v-tab>
					TRASH
					<v-icon>mdi-delete</v-icon>
				</v-tab>
			</v-tabs>

			<v-tabs-items v-model="tab">
				<v-tab-item>
					<v-data-table :headers="headers" :items="spanduks"  :search="search" sort-by="Tanggal & Waktu Upload" soclass="elevation-1">
						<!-- <template v-slot:item.image_spanduk="{ item }">
							<v-card outlined flat class="pa-2" height="125px" width="300px">
										<v-img :src="getImage('/spanduks/'+ item.image_spanduk)" height="100px" width="300px"  ></v-img>
							</v-card>
						</template> -->

						<template v-slot:top>

							<v-toolbar flat color="white">
								<!-- <v-toolbar-title>List Spanduk Kayumo</v-toolbar-title>
								<v-divider class="mx-4" inset vertical></v-divider>
								<v-spacer></v-spacer> -->
								<v-text-field v-model="search" append-icon="mdi-magnify" label="Search Spanduk" single-line hide-details></v-text-field>
								<v-spacer></v-spacer>
								<v-dialog v-model="dialogBanner" max-width="600px">
								
									<template v-slot:activator="{ on }">
										<v-btn color="primary" dark class="mb-2" v-on="on">New Spanduk</v-btn>
									</template>
									<v-card>
										<v-form  v-model="valid">

											<v-card-title>
												<span class="headline">{{ formTitle }}</span>
											</v-card-title>
											<v-divider></v-divider>

											<v-card-text>
												<v-container>
													
														<v-row>
															<v-col cols="12" sm="12" md="12">
																<div v-if="imageUrl!=''" align="center" justify="center">
																	<v-avatar tile color="grey" height="100px" width="300">
																		<v-img :src="imageUrl"></v-img>
																	</v-avatar>
																</div>
																<div v-else align="center" justify="center">
																	<v-avatar tile color="grey" height="100px" width="300px">
																		<v-img v-if="editedIndex > -1 " :src="getImage('/spanduks/'+editedItem.image_spanduk)"></v-img>
																	</v-avatar>
																</div>
															</v-col>
														</v-row>
														<v-row>
															<v-col cols="12" sm="6" md="6">
																<v-text-field v-model="editedItem.name" :rules="nameRules" label="Name*"></v-text-field>
															</v-col>
															<v-col cols="12" sm="6" md="6">

																 <div v-if="editedIndex > -1">
								                                    <v-file-input :rules="imageRules" accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera"
								                                      @change="onFileSelected">
								                                      <template v-slot:label>
								                                        <div>
								                                          Image Spanduk
								                                        </div>
								                                      </template>
								                                    </v-file-input>
								                                  </div>
								                                  <div v-else>
								                                    <v-file-input :rules="imageRulesCreate" accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera" @change="onFileSelected">
								                                      <template v-slot:label>
								                                        <div>Image Spanduk*</div>
								                                      </template>
								                                    </v-file-input>
								                                  </div>
																
																<!-- <v-file-input :rules="imageRules" accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera" @change="onFileSelected">
																	<template v-slot:label>
																		<div>
																			Spanduk Image
																		</div>
																	</template>
																</v-file-input> -->
															</v-col>
															<v-col cols="12" sm="6" md="6">
																<v-text-field v-model="editedItem.creator" :rules="creatorRules" label="Creator*"></v-text-field>
															</v-col>
															<!-- <v-col cols="12" sm="6" md="4">
																<v-text-field v-model="editedItem.finish" label="Finish"></v-text-field>
															</v-col> -->
															<v-col cols="12" sm="6" md="6">
																<v-text-field v-model="editedItem.category" :rules="categoryRules" label="Category*"></v-text-field>
															</v-col>
														</v-row>
													
												</v-container>
												<small>*indicated required field</small>
											</v-card-text>
											<v-divider></v-divider>

											<v-card-actions>
												<v-spacer></v-spacer>
												<v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
												<v-btn :disabled="!valid"color="blue darken-1" text @click="save">Save</v-btn>
											</v-card-actions>
										</v-form>
									</v-card>
								
								</v-dialog>	
							</v-toolbar>
						</template>

						<template v-slot:item.actions="{ item }">
					      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
					      <v-icon small @click="deleteItem(item)" >mdi-delete</v-icon>
					    </template>

						<template v-slot:no-data> 
							<v-btn color="primary" @click="initialize">Reset</v-btn>
						</template>
					</v-data-table>

					<template>
						<v-layout row justify-center>
							<v-dialog v-model="dialogConfirm" persistent max-width="290px"> 
								<v-card>
									<v-card-title class="headline">Confirmation!</v-card-title>
									<v-card-text>Are you sure, you want to delete this item?</v-card-text>
									<v-card-actions>
										<v-btn color="warning" @click="cancel">Cancel</v-btn>
										<v-spacer></v-spacer>
										<v-btn color="success" @click="deleted"> Yes</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</v-layout>
					</template>
				</v-tab-item>

				<v-tab-item>
					<v-data-table :headers="headersTrash" :items="trash" :search="searchTrash" sort-by="name" class="elevation-1">
						<template v-slot:top>
							<v-text-field v-model="searchTrash" append-icon="mdi-magnify" label="Search Spanduk In Trash" single-line hide-details></v-text-field>
						</template>

						<template v-slot:item.actions="{item}">
							<v-icon medium class="mr-2" @click="restoreItem(item)">restore_from_trash</v-icon>
							<v-icon medium @click="deletePermanentItem(item)" >delete_forever</v-icon>
						</template>

						<template v-slot:no-data>
							<v-btn color="primary" @click="trashList">Reset</v-btn>
						</template>
					</v-data-table>

					<template>
						<v-layout row justify-center>
							<v-dialog v-model="dialogRestore" persistent max-width="290">
								<v-card>
									<v-card-title class="headline">Restore</v-card-title>
									<v-card-text>Are you sure, you want to restore this item?</v-card-text>
									<v-card-actions>
										<v-btn color="warning" @click="dialogRestore=false">Cancel</v-btn>
										<v-spacer></v-spacer>
										<v-btn color="success" @click="restore">Yes</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>

							<v-dialog v-model="dialogDeletePermanent" persistent max-width="290">
								<v-card>
									<v-card-title class="headline">Delete Permanent</v-card-title>
									<v-card-text>Are you sure, you want to restore this item?</v-card-text>
									<v-card-actions>
										<v-btn color="warning" @click="dialogDeletePermanent=false">Cancel</v-btn>
										<v-spacer></v-spacer>
										<v-btn color="success" @click="deletePermanent">Yes</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</v-layout>
					</template>
				</v-tab-item>
			</v-tabs-items>

		</v-container>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		data: () => ({
			tab: null,
			dialogBanner: false,
			dialogConfirm:false,
			search: '',
			valid: true,
			headers: [

				{ text: 'Name', value: 'name'},
				// { text: 'Image', value: 'image_spanduk' },
				{ text: 'Creator', value: 'creator' },
				{ text: 'Category', value: 'category'},
				{ text: 'Tanggal & Waktu Upload', value: 'created_at'},
				{ text: 'Actions', sortable: false, value: 'actions' },
			],

			spanduks: [],
			editedIndex: -1,
			editedItem: {
				name: '',
				image_spanduk: '',
				creator: '',
				category: '',
			},
			defaultItem: {
				name: '',
				image_spanduk: '',
				creator: '',
				category: '',
			},
			image: '',
			imageUrl: '',
			imageFile: {},
			nameRules: [
				V => !!V || 'Name is required',
				v => (v && v.length <= 255) || 'Name must be less than 255 characters',
			],
			imageRules: [
                v => !v || v.type == 'image/jpeg'|| v.type== 'image/png'|| 'The image format must be png/jpeg',
                v => !v || v.size < 2000000 || 'Avatar size should be less than 2 MB!',
			],
			imageRulesCreate:[
				v => !!v || 'Image is required',
        		v => !v || v.type == 'image/jpeg' || v.type == 'image/png' || v.type == 'image/bnp' || 'The image format must be png/jpeg/bmp'
			],
			creatorRules: [
				V => !!V || 'Creator is required',
				v => (v && v.length <= 255) || 'Creator must be less than 255 characters',
			],
			categoryRules: [
				V => !!V || 'Category is required',
				v => (v && v.length <= 255) || 'Category must be less than 255 characters',
			],

			dialogRestore: false,
			dialogDeletePermanent: false,
			headersTrash: [
				{ text: 'Name', value: 'name'},
				// { text: 'Image', value: 'image_spanduk' },
				{ text: 'Creator', value: 'creator' },
				{ text: 'Category', value: 'category'},
				{ text: 'Tanggal & Waktu Upload', value: 'created_at'},
				{ text: 'Actions', sortable: false, value: 'actions' },
			],
			searchTrash: '',
			trash: [],
			dialogTrashIndex: '',
			restoredItem: {},
			deletedPermanentItem: {},
		}),

		computed: {
			...mapGetters({
				user : 'auth/user',
			}),

			formTitle () {
				return this.editedIndex === -1 ? 'New Spanduk' : 'Edit Spanduk'
			},
		},

		watch: {
			dialog (val){
				val || this.close()
			},
		},

		created () {
			this.initialize()
			this.trashList()
		},

		methods: {
			...mapActions({
				setAlert : 'alert/set',
			}),

			initialize () {
				// this.banners
				// let config = {
    //                 headers: {
    //                     'Authorization': 'Bearer ' + this.user.api_token,
    //                 },
    //             }

				return this.axios.get('/spanduks')
				.then((response)=> {
					let response_data = response.data.data
					let spanduks = response.data.data
					this.spanduks = spanduks
				})
			},

			editItem (item) {
				this.editedIndex = this.spanduks.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialogBanner = true
			},

			deleteItem (item) {
				this.deleteIndex = this.spanduks.indexOf(item)
				this.deletedItem = Object.assign({}, item)
				this.dialogConfirm = true
			},

			close(){
				this.dialogBanner = false
				setTimeout(()=> {
					this.editedItem = Object.assign({}, this.defaultItem)
					this.editedIndex = -1
				}, 300)
			},

			cancel(){
				this.dialogConfirm = false
			},

			onFileSelected(file){
				this.image = file

				const fileSpanduk = file
				let nameImage = fileSpanduk.name
				const fileReader = new FileReader()
					fileReader.addEventListener('load', ()=> {
						this.imageUrl = fileReader.result
					})

					fileReader.readAsDataURL(fileSpanduk)
					this.imageFile = fileSpanduk
			},

			deleted(){
				let config = {
						headers: {
							'Authorization': 'Bearer ' + this.user.api_token,
						},
					}

				this.axios.delete('/spanduks/delete/'+ this.deletedItem.id, config)
				.then((response)=> {
					let data  = response.data
					this.setAlert({
						status 	: true,
						text 	: data.message,
						type 	: 'success',
					})
					this.trash.push(this.deletedItem)
					this.spanduks.splice(this.deleteIndex,1)
					this.dialogConfirm = false

				})
				.catch((error)=>{
					let responses = error.response
					this.setAlert({
						status 	: true,
						text 	: responses.data.message,
						type 	: 'error',
					})
				})
			},

			save (){


				if(this.editedIndex > -1){

					let formData = new FormData()
					formData.set('name',this.editedItem.name)
					formData.set('image_spanduk',this.image)
					formData.set('creator',this.editedItem.creator)
					formData.set('category',this.editedItem.category)

					let config = {
						headers: {
							'Authorization': 'Bearer ' + this.user.api_token,
						},
					}

					this.axios.post('/spanduks/update/'+ this.editedItem.id, formData, config)
					.then(({ data })=> {
						this.setAlert({
							status 	: true,
							text 	: data.message,
							type 	: data.status,
						})
						Object.assign(this.spanduks[this.editedIndex], this.editedItem)
						this.close()
					})
					.catch((error)=> {
						let responses = error.response
						this.setAlert({
							status 	: true,
							text 	: responses.data.message,
							type 	: responses.data.status,
						})
						this.close()
					})
				}
				else{
					
						let formData = new FormData()
						formData.set('name',this.editedItem.name)
						formData.set('image_spanduk',this.image)
						formData.set('creator',this.editedItem.creator)
						formData.set('category',this.editedItem.category)

						let config = {
							headers: {
								'Authorization': 'Bearer ' + this.user.api_token,
							},
						}

						this.axios.post('/spanduks/create', formData, config)
							.then(({ data })=> {
								this.setAlert({
									status: true,
									text: data.message,
									type: 'success',
								})
								this.spanduks.push(this.editedItem)
							  	this.close()
							})
							.catch((error)=> {
								console.log(error)
								let responses = error.response
								this.setAlert({
									status: true,
									text: responses.data.message,
									type: 'error',
								})
								this.close()
							})
					
					// console.log(this.editedItem)
					// console.log(this.banners.push(this.editedItem))
					// console.log(this.editedItem.name)
					// console.log(this.editedItem.creator)	
					// console.log(this.editedItem.category)
					// this.close()
				}
				//this.close()

			},

			//Controller Trash

			trashList(){
				let config = {
					headers: {
						'Authorization': 'Bearer ' + this.user.api_token
					}
				}

				this.axios.get('/spanduks/trash',config)
				.then(({data})=> {
					this.trash = data.data
				})
			},

			restoreItem(item){
				this.restoreIndex = this.trash.indexOf(item)
				this.spanduksIndex = this.spanduks.indexOf(item)
				this.restoredItem = Object.assign({}, item)
				this.dialogRestore = true
			},
			restore(){
				let config = {
					headers: {
						'Authorization': 'Bearer ' + this.user.api_token
					}
				}

				this.axios.get('/spanduks/restore/'+this.restoredItem.id, config)
				.then((response)=>{
					let data = response.data
					this.setAlert({
						status : true,
						text : data.message,
						type: 'success'
					})
					this.spanduks.push(this.restoredItem)
					this.trash.splice(this.restoreIndex,1)
					this.dialogRestore = false
				})
				
			},
			deletePermanentItem(item){
				this.deletedPermanentIndex = this.trash.indexOf(item)
				this.deletedPermanentItem = Object.assign({},item)
				this.dialogDeletePermanent = true
			},
			deletePermanent(){

				let config = {
					headers: {
						'Authorization': 'Bearer ' + this.user.api_token
					}
				}

				this.axios.delete('/spanduks/delete-permanent/'+ this.deletedPermanentItem.id, config)
				.then((response)=>{
					let data = response.data
					this.setAlert({
						status: true,
						text: data.message,
						type: 'success'
					})
					this.trash.splice(this.deletedPermanentIndex,1)
					this.dialogDeletePermanent = false
				})
				.catch((error)=>{
					let responses = error.response
					this.setAlert({
						status: true,
						text: responses.data.message,
						type: 'error'
					})
				})
			}
		},
	}
</script>