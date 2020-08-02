<template>
	<div>
		<v-container grid-list-md>
			<v-subheader>
				All Category
			</v-subheader>
			<v-layout row wrap>
				<!-- lakukan perulangan pada properti categories -->
				<v-col v-for="category in categories" xs6 :key="category.id" cols="12" sm="6" md="4">
					<v-card flat :to="'/category/'+ category.slug" max-width="344">
						<v-img v-if="category.image" :src="getImage('/categories/'+category.image)" height="200px">
							<v-container fill-height fluid pa-2>
								<v-layout fill-height>
									<v-flex xs12 align-end flexbox>
										<span class="title white--text text-block text-truncate" v-text="category.name"></span>
									</v-flex>
								</v-layout>
							</v-container>
						</v-img>
					</v-card>
				</v-col>
			</v-layout>
		</v-container>

		<template>
			<div class="text-xs-center">
				<!-- kode untuk link paging halaman -->
				<v-pagination v-model="page" @input="go" :length="lengthPage" :total-visible="5" circle></v-pagination>
			</div>
		</template>

	</div>
</template>
<style scoped>
	.text-block {
		position: absolute;
		bottom: 5px;
		left: 5px;
		background-color: black;
		padding-left: 5px;
		padding-right: 5px;
		opacity: 0.7;
		width: 100%;
	}
</style>

<script>
	export default{
		data (){
			return {
				categories: [],
				page: 1,
				lengthPage: 0,
			}
		},
		methods: {
			// getImage(image){
			// 	if(image!=null && image.length>0){
			// 		return "http://larashop-api.test/images"+ image
			// 	}
			// 	// default image jika tidak ditemukan,
			// 	// letakkan image ini pada folder /public/img di project Vue
			// 	return "/img/unavaible.png"
			// },

			go(){
				let url = '/categories'
				if(this.page>0) url = '/categories?page='+this.page
				this.axios.get(url)
					.then((response)=> {
						let response_data = response.data
						let categories = response_data.data
						this.lengthPage = response_data.meta.last_page //jumlah halaman didapat dari meta endpoint categories
						this.categories = categories //daftar category dari endpoint categories
					})
					.catch((error)=> {
						console.log(error.response)
					})
			},
		},
		created(){
			this.go()
		}
	}
</script>
