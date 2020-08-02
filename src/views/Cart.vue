<template>
	<v-card>
		<v-toolbar dark color="primary">
			<v-btn icon dark @click="close">
				<v-icon>close</v-icon>
			</v-btn>
			<v-toolbar-title>Your Shopping Cart</v-toolbar-title>
			<v-spacer />
		</v-toolbar>
		<v-divider></v-divider>
		<div v-if="countCart === 0">
			<v-alert color="success" icon="mdi-cart-off">Keranjang belanja kosong</v-alert>
		</div>
		<div v-else>
			<v-list three-line >
				<template v-for="item in carts">
					<v-list-item :key="item.id">

						<v-list-item-avatar>
							<!-- <v-img :src="getImage('/books/'+item.covers)"></v-img> -->
							<v-img v-for="(cover, jumlah) in item.covers" :key="cover.id" v-if="jumlah==0" :src="getImage('/books/'+cover.file_name)"></v-img>
						</v-list-item-avatar>
						
						<v-list-item-content>
							<v-list-item-title v-html="item.title"></v-list-item-title>
							<v-list-item-subtitle>
								Rp. {{ item.price.toLocaleString('id-ID') }}
								({{ item.weight }} Kg)
								<span style="float:right"></span>
								<v-btn icon small rounded depressed @click.stop="removeCart(item)">
									<v-icon dark color="error">remove_circle</v-icon>
								</v-btn>
								{{ item.quantity }}
								<v-btn icon small rounded depresed @click.stop="addCart(item)">
									<v-icon dark color="success">add_circle</v-icon>
								</v-btn>
							</v-list-item-subtitle>
							<v-list-item-subtitle>
								<v-divider/>
							</v-list-item-subtitle>
						</v-list-item-content>

						<!-- <v-list-item-action>
							<v-list-item-action-text>{{ item.weight }} kg</v-list-item-action-text>
						</v-list-item-action> -->
					</v-list-item>		
				</template>
			</v-list>

			<v-card>
				<v-card-text>
					<v-layout wrap>
						<v-flex xs6 pa-1>
							Total Price ({{ totalQuantity }} items)
							<div class="title">Rp. {{ totalPrice.toLocaleString('id-ID')}}</div>
						</v-flex>

						<v-flex pa-1 xs6 text-right>
							<v-btn color="orange" dark @click="checkout">
								<v-icon>check_circle</v-icon> &nbsp;
								Checkout
							</v-btn>
						</v-flex>
					</v-layout>
				</v-card-text>
			</v-card>

		</div>
	</v-card>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		name: 'cart',
		computed: {
			...mapGetters({
				carts 			: 'cart/carts',
				countCart		: 'cart/count',
				totalPrice		: 'cart/totalPrice',
				totalQuantity	: 'cart/totalQuantity',
				totalWeight		: 'cart/totalWeight',
			}),
		},

		methods: {
			...mapActions({
				setStatusDialog		: 'dialog/setStatus',
				setAlert			: 'alert/set',
				addCart				: 'cart/add',
				removeCart			: 'cart/remove',
				setCart				: 'cart/set',
			}),

			
			checkout(){
				this.close()
				this.$router.push({path: '/checkout'})
			},

			close() {
				this.setStatusDialog(false)
			},
		},
		
	}
</script>