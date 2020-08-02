<template>
	<div class="about">
		<v-container>
			<v-row>
				<v-col cols="12" sm="6" md="6">
					<!-- <v-row> -->
						<!-- <v-col cols="12"> -->
							<v-card flat class="mx-auto">
								<!-- <ProductZoomer :base-images="images" :base-zoomer-options="zoomerOptions" /> -->
								<v-carousel height="367">
									<v-carousel-item v-for="cover in book.covers" :key="cover.id" :src="getImage('/books/'+cover.file_name)">
									</v-carousel-item>
								</v-carousel>
							</v-card>
						<!-- </v-col> -->
					<!-- </v-row> -->
				</v-col>

				<v-col cols="12" sm="6" md="6">
					<!-- <v-row> -->
						<!-- <v-col cols="12"> -->
							<v-card outlined class="pa-2">
								<v-list-item>
									<v-list-item-content>
										<div class="overline mb-4">
											<template> KATEGORI : 
												<span v-for="category in book.categories" :key="category.id"> {{ category.name }} /</span>
											</template>
										</div>
										<v-list-item-title class="headline mb-1">{{ book.title}}</v-list-item-title>
										<v-list-item-title class="headline mb-1" v-if="book.price" style="color: orange;">
											Rp. {{ book.price.toLocaleString('id-ID')}}
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
								<v-divider />
								<v-simple-table >
									<template v-slot:default>
										<tbody>
											<tr>
												<th class="text-left">Author</th><td>{{ book.author }}</td>
											</tr>
											<tr>
												<th class="text-left">Publisher</th><td>{{ book.publisher }}</td>
											</tr>
											<tr>
												<th class="text-left">Weight</th><td>{{ book.weight }} kg</td>
											</tr>
											<tr>
												<th class="text-left">Stock</th><td>{{ book.stock }}</td>
											</tr>
									</tbody>
									</template>
								</v-simple-table>
								<v-divider/>

								<div class="text-center" style="padding-top: 15px;">
									<v-btn rounded color="primary" @click="buy" :disabled="book.stock==0" dark>
										Add To Cart
									</v-btn>
								</div>

								<v-subheader class="overline"> Description </v-subheader>
								<v-simple-table>
									<template>
										<tbody>
											<tr>
												<td class="text-left">{{ book.description }}</td>
											</tr>
										</tbody>
									</template>
								</v-simple-table>
							</v-card>
						<!-- </v-col> -->
					<!-- </v-row> -->
				</v-col>	
			</v-row>
		</v-container>
	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
	export default {
		data (){
			return {
				book: {},
			};
		},

		methods: {
			...mapActions({
				addCart : 'cart/add',
				setAlert : 'alert/set',
			}),
			buy(){
				this.addCart(this.book)
				this.setAlert({
					status : true,
					text : 'added to cart',
					type : 'success',
				})
			}
		},
		created() {
			let slug = this.$route.params.slug
			this.axios.get('/books/slug/'+slug)
			.then((response)=>{
				let book = response.data.data
				this.book = book
			})
			.catch((error)=>{
				let responses = error.response
				console.log(responses)
			})
		}
	}
</script>