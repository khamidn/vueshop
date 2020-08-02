<template>
	<div>
		<!-- Bagian pertama yaitu category -->
		<v-container grid-list-md>
			<!-- <v-subheader>
				Random Category
				<v-spacer></v-spacer> -->
				<!-- link ke route categories yang nantinya akan kita definisikan routing dan componentnya -->
				<!-- <router-link to="/categories">See All</router-link>
			</v-subheader> -->

			<!-- <v-layout row wrap>
				
				<v-flex v-for="category in categories" xs6 :key="category.id">
					<v-card :to="'/category/'+ category.slug">
						
						<v-img :src="getImage('/categories/'+category.image)" height="150px" class="white--text">
							<v-container fill-height fluid pa-2>
								<v-layout fill-height>
									<v-flex xs12 align-end flexbox>
										
										<span class="title white--text text-block" v-text="category.name"></span>
									</v-flex>
								</v-layout>
							</v-container>
						</v-img>
					</v-card>
				</v-flex>
			</v-layout> -->
			<v-layout row wrap>
				<v-col cols="12" sm="12" md="12">
					<v-card flat class="mx-auto">
					<v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
						<v-carousel-item  
							v-for="spanduk in spanduks" 
							:key="spanduk.id" 
							:src="getImage('/spanduks/'+spanduk.image_spanduk)"
							:lazy-src="getImage('/spanduks/'+spanduk.image_spanduk)"
						>
							<!-- <template v-slot:placeholder>
								<v-row class="fill-height ma-0" align="center" justify="center">
									<v-progress-circular indeterminate color="orange darken-3"></v-progress-circular>
								</v-row>
							</template>
							<v-row class="fill-height" align="center" justify="center">
								<div class="display-3 text-block white--text text-center" >{{ category.name }}</div>
							</v-row> -->
						</v-carousel-item>
					</v-carousel>
					</v-card>
			</v-col>
			</v-layout>
		</v-container>

		<!-- Bagian kedua yaitu Book -->
		<v-container grid-list-md>
			<v-subheader>
				Top Furnitures
				<v-spacer></v-spacer>
				<!-- link ke route books yang nantinya akan kita definisikan routing dan componentnya -->
				<router-link to="/books">See All</router-link>
			</v-subheader>

			<v-layout row wrap>
				<v-col v-for="(book, index) in books" :key="index" cols="12" sm="6" md="4">
					<v-card flat outlined :to="'/book/'+ book.slug" class="mx-auto" max-width="344">
						<v-img 
							v-for="(cover, jumlah) in book.covers" 
							:key="cover.id" v-if="jumlah==0" 
							:src="getImage('/books/'+cover.file_name)" 
							:lazy-src="getImage('/books/'+cover.file_name)"
							height="200px"
						>
							<template v-slot:placeholder>
								<v-row class="fill-height ma-0" align="center" justify="center">
									<v-progress-circular indeterminate color="orange darken-3"></v-progress-circular>
								</v-row>
							</template>
						</v-img>
						<v-card-title>
							<span class="text-truncate font-regular">{{ book.title}}</span>
						</v-card-title>
						<v-card-subtitle class="font-weight-black">Rp. {{ book.price.toLocaleString('id-ID')}}</v-card-subtitle>
					</v-card>
				</v-col>
			</v-layout>
		</v-container>
	</div>
</template>

<!-- <style scoped>
	/*mengatur posisi judul*/
	.text-block{
		position: absolute;
		background-color: black;
		opacity: 0.7;
		height: 70px;
		width: 100%;
	}
</style> -->


<script>
	export default{
		data: () => ({
			categories: [], //kita definisikan sebagai array kosong
			books: [],
			spanduks: [],
		}),

		created(){
			// let count = 4
			// request ke endpoint category random dengan parameter count-4
			// this.axios.get('/categories/random/'+count)
			// 	.then((response) =>{
			// 		let categories = response.data.data
					// ketika dapat datanya maka nilainya dimasukkan ke dalam properti data categories
				// 	this.categories = categories
				// })
				// .catch((error)=>{
				// 	let responses = error.response
				// 	console.log(responses)
				// })
			this.axios.get('/spanduks')
			.then(({ data }) => {
				this.spanduks = data.data
			})

			let count = 6
			// request ke endpoint top book dengan parameter count = 8
			this.axios.get('/books/top/'+count)
				.then((response) =>{
					let books = response.data.data
					this.books = books
				})
				.catch((error) =>{
					let responses = error.response
					console.log(responses)
				})
		}
	}
</script>

