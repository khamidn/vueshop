<template>
	<div class="payment">
		<v-subheader>Payment Information</v-subheader>
		<v-card flat>
			<v-container>
			<v-simple-table>
				<tbody>
					<tr>
						<th class="column text-left">Order ID</th><td>{{ payment.order_id}}</td>
					</tr>
					<tr>
						<th class="column text-left">Invoice Number</th><td>{{ payment.invoice_number }}</td>
					</tr>
					<tr>
						<th class="column text-left">Total Bill</th><td>Rp. {{payment.total_bill.toLocaleString('id-ID')}}</td>
					</tr>
				</tbody>
			</v-simple-table>
			</v-container>
		</v-card>

		<v-subheader>Transfer To</v-subheader>
		<v-card flat>
			<v-container>
				<v-simple-table>
					<tbody>
						<tr>
							<td><v-img src="img/bca.png"></v-img></td>
							<td>BCA KCP abc No Rek 123</td>
						</tr>
						<tr>
							<td><v-img src="img/mandiri.png"></v-img></td>
							<td>BANK MANDIRI KCP xyz No Rek 456</td>
						</tr>
					</tbody>
				</v-simple-table>
			</v-container>
		</v-card>

		<v-subheader></v-subheader>
		<v-card>
			<v-container>
				<v-layout row wrap>
					<v-flex xs12 text-center>
						<v-btn color="success" @click="finish">
							Finish	
						</v-btn>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		computed: {
			...mapGetters({
				payment: 'payment',
			}),
		},

		methods: {
			finish(){
				this.$router.push('/')
			}
		}
	}
</script>