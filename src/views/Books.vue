<template>
	<div>
		<v-container grid-list-md>
			<v-subheader>
				All Books
			</v-subheader>
			<v-layout row wrap>
				<v-col v-for="(book, index) in books" :key="index" cols="12" sm="6" md="4">
					<v-card flat outlined :to="'/book/'+ book.slug" class="mx-auto" max-width="344">
						<!-- <v-img :src="getImage('/books/'+book.cover)" height="200px"></v-img> -->
						<v-img v-for="(cover, jumlah) in book.covers" :key="cover.id" v-if="jumlah==0" :src="getImage('/books/'+cover.file_name)" height="200px"></v-img>
							<v-card-title>
								<span class="text-truncate font-regular">{{ book.title }}</span>
							</v-card-title>
							<v-card-subtitle class="font-weight-black">Rp. {{ book.price.toLocaleString('id-ID') }}</v-card-subtitle>
					</v-card>
				</v-col>
			</v-layout>
		</v-container>
		<template>
			<div class="text-xs-center">
				<v-pagination v-model="page" @input="go" :length="lengthPage" :total-visible="5" circle></v-pagination>
			</div>
		</template>
	</div>
</template>

<!-- <style scoped>
	.text-block{
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
 -->
<script>
	export default{
		data (){
			return {
				books: [],
				page: 1,
				lengthPage: 0
			}
		},

		methods: {
			go(){
				let url = '/books'
				if(this.page>0) url ='/books?page='+this.page
				this.axios.get(url)
					.then((response)=> {
						let response_data = response.data
						let books = response_data.data
						this.lengthPage = response_data.meta.last_page
						this.books = books
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