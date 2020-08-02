<template>
	<div>
		<v-container>
			<h1 class="orange--text">ABOUT KAYUMO</h1>
			<v-row>
				<v-col cols="12" sm="5" md="5">
					<v-card flat tile class="pa-2">
						<!-- <v-card-content> -->
							<div align="center" justify="center">
								<v-img 
									:src="getImage('/abouts/'+image)" 
									:lazy-src="getImage('/abouts/'+image)"
									width="500px"
									height="300px"
									aspect-ratio="1"
									>

									<template v-slot:placeholder>
										<v-row class="fill-height ma-0" align="center" justify="center">
											<v-progress-circular indeterminate color="orange darken-3"></v-progress-circular>
										</v-row>
										
									</template>
								</v-img>
							</div>
						<!-- </v-card-content> -->
					</v-card>
					
					
					
				</v-col>
				<v-col cols="12" sm="7" md="7">
					<v-card flat tile class="pa-2">
						<v-card-text class="black--text">
							<p>{{description}}</p>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
	export default {
		data: () => ({
			about: {},
			description: '',
			image: '',
		}),

		created(){
			this.axios.get('/about')
			.then((response)=>{
				let about = response.data.data
				this.about = about
				this.image = about.image_company
				this.description = about.description
			})
			.catch((error)=> {
				let responses = error.response
				console.log(responses)
			})
		}
	}
</script>


<!-- <v-card flat tile class="pa-2">
							<v-avatar flat tile height="300" width="500">
								<v-img :src="require('@/assets/kayumo-logo-light-500-300.png')"></v-img>
							</v-avatar>
					</v-card> -->

<!-- <template>
	<div>
		<v-container>
			<h1>About Kayumo</h1>
			<v-card flat>
				<v-list two-line>
					<v-list-item>
						<v-list-item-avatar tile height="300" width="500">
							<v-img :src="require('@/assets/kayumo-logo-light-500-300.png')"></v-img>
						</v-list-item-avatar>
						<v-list-item-content>
							<p>
							Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
							</p>

							<p>
							Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
							</p>

							<p>
							Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
							</p>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-card>
		</v-container>
	</div>
</template> -->