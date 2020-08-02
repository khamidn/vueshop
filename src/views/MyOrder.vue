<template>
  <!-- <div>
    <v-subheader>Histori Belanja</v-subheader>  
    <v-card flat>
        <v-container>
            <v-simple-table>
            <tbody>
            <tr v-for="item in items" :key="item.id">
                <td>
                    Invoice: {{ item.invoice_number }}
                    <div class="primary--text title">Rp. {{ item.total_price.toLocaleString('id-ID') }}</div>
                    <small>date: {{ item.updated_at }}. courier: {{ item.courier_service }}</small>
                </td>
                <td>
                    {{ item.status }}
                </td>
            </tr>
            </tbody>
            </v-simple-table>
        </v-container>
    </v-card>
  </div> -->

  <v-card>
    <v-card-title>
      My Order
      <v-spacer></v-spacer>
      <!-- <v-text-field v-model="search" append-icon="mdi-magnify" label="search" single-line hide-details></v-text-field> -->
    </v-card-title>
    <!-- <v-data-table :headers="headers" :items="desserts" :search="search"></v-data-table> -->
    <v-simple-table fixed-header height="300px">
      <template v:slot:default>
        <thead>
          <tr>
            <th class="text-left">Order Date</th>
            <th class="text-left">Invoice Number</th>
            <th class="text-left">Courier</th>
            <th class="text-left">Total Price</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{item.updated_at}}</td>
            <td>{{item.invoice_number}}</td>
            <td>{{ item.courier_service }}</td>
            <td>Rp. {{item.total_price.toLocaleString('id-ID')}}</td>
            <td>{{item.status}}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        items: '',
      }
    },
    computed: {
      ...mapGetters({
        user    : 'auth/user',
      })
    },
    methods: {
      ...mapActions({
          setAlert  : 'alert/set',
      }),
    },
    mounted(){
      let config = {
        headers: {
            'Authorization': 'Bearer ' + this.user.api_token,
        },
      }
      this.axios.get('/my-order',config)
        .then((response) => {
          let { data } = response.data
          this.items = data
        })
        .catch((error) => {
          let {data} = error.response
          this.setAlert({
              status : true,
              text  : data.message,
              color  : 'error',
          })
        })
    }
  }
</script>