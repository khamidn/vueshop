<template>
	<div>
		<v-container>
			<h1 class="orange--text">Add Product</h1>
			<v-tabs v-model="tab" icons-and-text>
				<v-tab>
					LIST PRODUCT
					<v-icon>list</v-icon>
				</v-tab>
				<v-tab>
					TRASH
					<v-icon>mdi-delete</v-icon>
				</v-tab>
			</v-tabs>

			<v-tabs-items v-model="tab">
				<v-tab-item>
					<v-data-table :headers="headers" :items="products" :search="search" sort-by="name" class="elevation-1">
						<template v-slot:top>
							<v-toolbar flat color="white">
								<v-text-field v-model="search" append-icon="mdi-magnify" label="Search Product" single-line hide-details></v-text-field>
								<v-spacer></v-spacer>
								<v-dialog v-model="dialogProduct" max-width="600px">
									<template v-slot:activator="{ on }">
										<v-btn color="primary" dark class="mb-2" v-on="on">New Product</v-btn>
									</template>
									<v-card>
										<v-card-title>
											<span class="headline">{{ formTitle }}</span>
										</v-card-title>

										<v-card-text>
											<v-container>
												<v-row>
													<v-col cols="12" sm="6" md="6">
														<v-text-field label="Nama Product*"></v-text-field>
													</v-col>
													<v-col cols="12" sm="6" md="6">
														<v-file-input multiple label="Gambar Product*"></v-file-input>
													</v-col>
													<v-col cols="12" sm="12" md="12">
														<v-textarea color="teal" outlined dense rows="10" counter>
															<template v-slot:label>
																<div>
																	Deskripsi Product
																</div>
															</template>
														</v-textarea>
													</v-col>
													<v-col cols="12" sm="6" md="6">
														<v-text-field label="Author*"></v-text-field>
													</v-col>
													<v-col cols="12" sm="6" md="6">
														<v-text-field label="Price* (Rp)"></v-text-field>
													</v-col>
													<v-col cols="12" sm="6" md="6">
														<v-text-field label="Weight*"></v-text-field>
													</v-col>
													<v-col cols="12" sm="6" md="6">
														<v-text-field label="Stock*"></v-text-field>
													</v-col>
												</v-row>
											</v-container>
										</v-card-text>

										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
											<v-btn color="blue darken-1" text>Save</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</v-toolbar>
						</template>

						<template v-slot:item.categories="{item}">
							<span v-for="category in item.categories" :key="category.id">{{category.name}}</span>
						</template>

						<template v-slot:item.actions= "{item}">
							<v-icon small class="mr-2">mdi-pencil</v-icon>
							<v-icon small>mdi-delete</v-icon>
						</template>
					</v-data-table>
				</v-tab-item>
				<v-tab-item>ini tab trash</v-tab-item>
			</v-tabs-items>
			
		</v-container>
	</div>
</template>

<script>
	import {mapGetters, mapAction } from 'vuex'
	export default { 
		data: ()=> ({
			tab: null,
			dialogProduct: false,
			search: '',
			headers:[
				// {text: 'Cover', value:''},
				{text:'Title', value:'title'},
				{text:'Author', value:'author'},
				{text:'Status', value:'status'},
				{text:'Categories', value:'categories'},
				{text:'Stock', value:'stock'},
				{text:'Price', value:'price'},
				{text:'Actions', value:'actions', sortable:false},
			],
			products: [],
			editedIndex: -1,

		}), 

		computed: {
			...mapGetters({
				user : 'auth/user',
			}),

			formTitle () {
				return this.editedIndex === -1 ? 'New Product' : 'Edit Product'
			},
		},

		wathc: {
			dialof(val){
				val || this.close()
			}
		},
		created (){
			this.initialize()
		},

		methods: {
			initialize(){
				let config = {
						headers: {
							'Authorization' : 'Bearer '+ this.user.api_token
						}
				}

				this.axios.get('/add-product',config)
				.then(({data})=> {
					this.products = data.data
				})
			},

			close(){
				this.dialogProduct = false
				setTimeout(()=> {
					this.editedIndex = -1
				}, 300)
			}

		}
	}
</script>