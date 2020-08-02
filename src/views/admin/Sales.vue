<template>
	<div>
		<v-container>
			<h1 class="orange--text"> Sales </h1>
			<v-data-table :headers="headers" :items="sales"  :search="search" sort-by="name" class="elevation-1">
				<template v-slot:top>
					<v-toolbar flat color="white">
						<v-toolbar-title>List The Sales of Kayumo</v-toolbar-title>
						<v-divider class="mx-4" inset vertical></v-divider>
						<v-spacer></v-spacer>
						<v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
						<!-- <v-spacer></v-spacer> -->
						<v-dialog v-model="dialogSales" max-width="500px">
							<!-- <template v-slot:activator="{ on }">
								<v-btn color="primary" dark class="mb-2" v-on="on">New Sales</v-btn>
							</template> -->
							<v-card>
								<v-card-title>
									<span class="headline">{{ formTitle }}</span>
								</v-card-title>

								<v-card-text>
									<v-container>
										<v-row>
											<v-col cols="12" sm="6" md="4">
												<v-text-field v-model="editedItem.invoiceNumber" label="Invoice Number"></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field v-model="editedItem.idCustomer" label="ID Customer"></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field v-model="editedItem.price" label="Price"></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field v-model="editedItem.courierService" label="Courier Service"></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field v-model="editedItem.statusOrder" label="Status Order"></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field v-model="editedItem.dateOrder" label="Date Order"></v-text-field>
											</v-col>
										</v-row>
									</v-container>
								</v-card-text>

								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
									<v-btn color="blue darken-1" text @click="save">Save</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>	
					</v-toolbar>
				</template>

				<template v-slot:item.actions="{ item }">
			      <v-icon
			        small
			        class="mr-2"
			        @click="editItem(item)"
			      >
			        mdi-pencil
			      </v-icon>
			      <v-icon
			        small
			        @click="deleteItem(item)"
			      >
			        mdi-delete
			      </v-icon>
			    </template>

				<template v-slot:no-data> 
					<v-btn color="primary" @click="initialize">Reset</v-btn>
				</template>
			</v-data-table>
		</v-container>
	</div>
</template>

<script>

	export default {
		data: ()=> ({
			dialogSales: false,
			search: '',
			headers: [
				{	text: 'Invoice Number', align: 'start', sortable: false, value: 'invoiceNumber'},
				{	text: 'ID Customer', sortable: false, value: 'idCustomer'},
				{	text: 'Price', value: 'price'},
				{	text: 'Courier Service', value: 'courierService'},
				{	text: 'Status Order', value: 'statusOrder'},
				{	text: 'Date Order', value: 'dateOrder'},
				{	text: 'Actions', value: 'actions', sortable: false}
			],
			sales: [],
			editedIndex: -1,
			editedItem: {
				invoiceNumber: 0,
				idCustomer: 0,
				price: '',
				courierService: 0,
				statusOrder: 0,
				dateOrder: 0,
			},
			defaultItem: {
				invoiceNumber: 0,
				idCustomer: 0,
				price: '',
				courierService: 0,
				statusOrder: 0,
				dateOrder: 0,	
			}
		}),

		computed: {
			formTitle () {
				return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
			},
		},

		watch: {
			dialog (val){
				val || this.close()
			},
		},

		created () {
			this.initialize()
		},

		methods: {
			initialize() {
				this.sales = [
					{
						invoiceNumber: 1234567890,
						idCustomer: 1,
						price: 'Rp. 300.000',
						courierService: 'jne-REG',
						statusOrder: 'SUBMIT',
						dateOrder: '2/4/2020',
					},
					{
						invoiceNumber: 1234567891,
						idCustomer: 2,
						price: 'Rp. 200.000',
						courierService: 'tiki-REG',
						statusOrder: 'SUBMIT',
						dateOrder: '2/4/2020',
					},
				]
			},

			editItem (item) {
				this.editedIndex = this.sales.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialogSales = true
			},

			deleteItem (item) {
				const index = this.sales.indexOf(item)
				confirm('Are you sure want to delete this item?') && this.sales.splice(index,1)
			},

			close(){
				this.dialogSales = false
				setTimeout(()=> {
					this.editedItem = Object.assign({}, this.defaultItem)
					this.editedIndex = -1
				}, 300)
			},

			save () {
				if (this.editedIndex > -1){
					Object.assign(this.sales[this.editedIndex], this.editedItem)
				}

				else {
					this.sales.push(this.editedItem)
				}

				this.close()
			},

		},
	}

</script>