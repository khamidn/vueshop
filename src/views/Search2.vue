<template>
	<v-row justify="center">
		<v-dialog v-model="dialogSearch" fullscreen hide-overlay transition="dialog-bottom-transition">
			<v-card>
				<v-toolbar color="white">
					<v-btn icon @click="backHome()">
						<v-icon>keyboard_backspace</v-icon>
					</v-btn>
					<v-text-field v-model="keyword" @input="doSearch" hide-details text label="Search Furniture" solo-inverted ref="txtSearch"></v-text-field>
				</v-toolbar>
				<v-divider></v-divider>
				<v-subheader v-if="keyword.length>0"> Result Search "{{keyword}}"</v-subheader>
				<v-alert :value="items.length == 0 && keyword.length > 0" color="warning">
					Sorry, but no results were found
				</v-alert>

				<v-list two-line v-if="items.length>0">
					<template v-for="item in items">
						<v-list-item :key="item.id" :to="'/book/'+item.slug">
							<v-list-item-avatar>
								<v-img v-for="(cover, index) in item.covers" :key="cover.id" v-if="index==0" :src="getImage('/books/'+cover.file_name)" height="200px"></v-img>
							</v-list-item-avatar>
							<v-list-item-content>{{item.title}}</v-list-item-content>
						</v-list-item>
						<v-divider></v-divider>
					</template>
					
				</v-list>
			</v-card>
		</v-dialog>
	</v-row>
	<!-- div>
		<v-container> -->
				<!-- <v-toolbar color="white">
					<v-text-field v-model="keyword" @input="doSearch" hide-details text label="Search Furniture" solo-inverted ref="txtSearch"></v-text-field>
				</v-toolbar>
				<v-divider></v-divider>
				<v-subheader v-if="keyword.length>0"> Result Search "{{keyword}}"</v-subheader>
				<v-alert :value="items.length == 0 && keyword.length > 0" color="warning">
					Sorry, but no results were found
				</v-alert>

				<v-list two-line v-if="items.length>0">
					<template v-for="item in items">
						<v-list-item :key="item.id" :to="'/book/'+item.slug">
							<v-list-item-avatar>
								<v-img v-for="(cover, index) in item.covers" :key="cover.id" v-if="index==0" :src="getImage('/books/'+cover.file_name)" height="200px"></v-img>
							</v-list-item-avatar>
							<v-list-item-content>{{item.title}}</v-list-item-content>
						</v-list-item>
						<v-divider></v-divider>
					</template>
					
				</v-list> -->
		<!-- </v-container>
	</div> -->
</template>

<script>
	// import { mapActions} from 'vuex'
	export default{
		name: 'search2',
		data () {
			return {
				dialogSearch: true,
				keyword: '',
				items: [],
			}
		},

		methods: {
			// ...mapActions({

			// }),

			backHome(){
				this.$router.push({path: '/'})
			},

			doSearch(){
				let keyword = this.keyword
				if(keyword.length>0){
					this.axios.get('/books/search/'+keyword)
						.then((response)=>{
							let books = response.data.data
							this.items = books
						})
						.catch((error)=>{
							console.log(error)
						})
				}

			},

			mounted(){
				if(this.$refs.txtSearch != undefined){
					this.$nextTick(()=> this.$refs.txtSearch.focus())
				}
			}
		},
	}
</script>