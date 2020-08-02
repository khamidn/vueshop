<template>
  <v-app>
    <!-- Header -->
    <!-- toolbar vuetify dengan warna primary -->
    <v-app-bar app absolute color="white">
      <!-- header bagian kiri -->
      <v-app-bar-nav-icon @click.stop = "drawer = !drawer" v-if="((user.roles == admin) && !guest) "></v-app-bar-nav-icon>
      <!-- <v-app-bar-nav-icon @click.stop = "drawer = !drawer"></v-app-bar-nav-icon> -->
      <!-- header bagian tengah -->
      <!-- <v-toolbar-title class="white--text">Kayumo</v-toolbar-title> -->

      <!-- <v-img :src="require('@/assets/logo1.svg')" class="mr-3 hidden-xs-only" contain max-width="52" width="100%"></v-img> -->
      <v-img :src="require('@/assets/kayumo-logo-light.png')" contain max-width="128" width="100%"></v-img>

      <!-- separator supaya header bagian kanan posisinya rata kanan -->
      <v-spacer></v-spacer>

      <div>
        <v-tabs class="hiddeb-sm-and-down" optional color="orange darken-3"> 
          <v-tab v-for="(item, index) in items" :key="'menu-'+index" :to="item.route" v-if="!item.auth || (item.auth && !guest)">
            {{ item.title }}
          </v-tab>
        </v-tabs>
      </div>

      <v-spacer></v-spacer>
      <!-- <v-btn icon @click="cart()">
        <v-badge left overlap color="orange" :content="countCart" :value="countCart">
          <span slot="badge" v-if="countCart>0"> {{ countCart }} </span>
          <v-icon>shopping_cart</v-icon>
        </v-badge>
      </v-btn> -->

      <v-btn icon @click="search2()">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <!-- Dropdown menu carts -->
      <v-menu offset-y v-if="user.roles==customer || guest">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-badge left overlap color="orange" :count="countCart" :value="countCart">
              <span slot="badge" v-if="countCart>0"> {{ countCart }} </span>
              <v-icon>shopping_cart</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list @click="">
          <v-list-item>
            <v-list-item-title>Your Shopping Cart</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>

          <div v-if="countCart === 0">
            <v-list-item class="pa-2 text-center">
              <v-list-item-content>
                <v-alert color="success" icon="mdi-cart-off">Keranjang belanja anda masih kosong</v-alert>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>

            <template>
              <div class="pa-2 text-center">
                <!-- <v-btn color="orange" rounded dark> -->
                  <v-btn color="orange" rounded dark :to="'/books'">
                  <v-icon>mdi-shopping</v-icon> &nbsp;
                  Shopping Now
                </v-btn>
              </div>
            </template>
          </div>

          <div v-else>
            <v-list-item  v-for="item in carts" :key="item.id">
              <v-list-item-avatar>
                <v-img v-for="cover, jumlahCart in item.covers" :key="cover.id" v-if="jumlahCart==0" :src="getImage('/books/'+cover.file_name)"></v-img>
              </v-list-item-avatar>

              <v-list-item-content style="max-width: 250px;">
                 <v-list-item-title class="d-inline-block text-truncate" style="max-width: 250px;" v-html="item.title"></v-list-item-title>
                
                  <v-list-item-subtitle style="max-width: 250px;">
                    Rp. {{ item.price.toLocaleString('id-ID') }}
                    ({{ item.weight }} Kg)
                    <span style="float:right"></span>
                    <v-btn icon small rounded depressed @click.stop="removeCart(item)">
                      <v-icon dark color="error">remove_circle</v-icon>
                    </v-btn>
                    {{ item.quantity }}
                    <v-btn icon small rounded depressed @click.stop="addCart(item)">
                      <v-icon dark color="success">add_circle</v-icon>
                    </v-btn>
                  </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  Total Price ({{ totalQuantity }} item)
                </v-list-item-title>
                <v-list-item-subtitle>
                  Rp. {{ totalPrice.toLocaleString('id-ID')}}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
              <template>
                <div class="pa-2 text-center">
                  <v-btn color="orange" rounded dark @click="checkout">
                    <v-icon>check_circle</v-icon> &nbsp;
                    Checkout
                  </v-btn>
                </div>
              </template>
          </div>

        </v-list>
      </v-menu>

      <!-- Dropdown menu akun -->
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-account</v-icon>
            </v-btn>          
        </template>

        <v-list @click="">

          <div v-if="guest">
              <v-list-item @click="register()">
                <v-list-item-icon>
                  <v-icon>edit</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Register <span class="font-weight-bold orange--text"> GRATIS</span></v-list-item-title>
                  <!-- <v-btn class="ma-2" rounded dark color="warning" v-if="guest" @click="register()">Register</v-btn> -->
                </v-list-item-content>      
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="login()">
                <v-list-item-icon>
                  <v-icon>mdi-forward</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Login</v-list-item-title>
                </v-list-item-content>
                <!-- <v-btn class="ma-2" rounded dark color="warning" v-if="guest" @click="login()">Login</v-btn> -->
              </v-list-item>
          </div>

          <div v-if="!guest">
            <v-list-item>
              <v-list-item-avatar>
                <v-img :src="getImage('/users/'+user.avatar)"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>

            <!-- <v-list-item v-for="(item,index) in itemsAccount" :key="'menu-'+index"" :to="item.route" v-if="!item.auth || (item.auth && !guest)">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->

            <v-list-item :to="'/profile'">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-icon>
                <v-icon>mdi-lock</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Password</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item :to="'my-order'" v-if="user.roles==customer">
              <v-list-item-icon>
                <v-icon>mdi-shopping</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>My Order</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            

            <v-divider></v-divider>

            <!-- <template> -->
                <div class="pa-2 text-center">
                  <v-btn rounded color="red" dark @click="logout();">
                    <v-icon left>mdi-lock</v-icon>
                    Logout
                  </v-btn>
                </div>
            <!-- </template> -->

            </div>
        </v-list>
      </v-menu>
      

      <!-- kolom pencarian di bawah header -->
      <!-- <v-text-field @click="search()" slot="extension" hide-details append-icon="mdi-microphone" flat label="Search Furniture" prepend-inner-icon="mdi-magnify" solo-inverted></v-text-field> -->
    </v-app-bar>

    <!-- Sidebar -->

    <v-card>
      <v-navigation-drawer app v-model="drawer" v-if="!guest">
      
      <!-- <div class="pa-2" v-if="guest">
          <v-btn depressed block rounded color="primary" class="mb-1" @click="register()">
            Register
            <v-icon right dark>person_add</v-icon>
          </v-btn>
       
          <v-btn block rounded depressed color="success" class="mb-1" @click="login()">
            Login
            <v-icon right dark>lock_open</v-icon>
          </v-btn>
      </div> -->

      <!-- <v-list-item v-if="!guest">
        <v-list-item-avatar>
          <v-img :src="getImage('/users/'+user.avatar)"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list shaped>
          <v-list-item v-for="(item, index) in items" :key="'menu-'+index" :to="item.route" v-if="!item.auth || (item.auth && !guest)">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>

      <template v-slot:append v-if="!guest">
        <div class="pa-2">
          <v-btn block color="red" dark @click.stop="logout();">
            <v-icon left>mdi-lock</v-icon>
            Logout
          </v-btn>
        </div>
      </template> -->
      <div class="pa-2 text-center">
        <span>ADMIN ONLY</span>  
      </div>
      <v-divider></v-divider>

      <v-list shaped>
          <v-list-item v-for="(item, index) in itemsAdmin" :key="'menu-'+index" :to="item.route">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
      
    </v-navigation-drawer>
  </v-card>

  <c-alert />
  <!-- Dynamic Component -->
  <keep-alive>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <component :is="currentComponent"></component>
      </v-dialog>
  </keep-alive>

  <!-- <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <search />
  </v-dialog> -->

    <!-- Component utama -->
    <v-content>
      <v-container>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>

    <!--Footer -->
    <v-footer dark app padless extended>
      <v-flex xs12>
        <v-card flat tile class="orange darken-3 lighten-1 white--text text-center">

          <v-layout justify-center row wrap>
            <v-flex secondry darken 2 py-3 text-xs-center white--text xs12>
              &copy; {{ new Date().getFullYear() }} -- Kayumo
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-footer>

  </v-app>
</template>


<script >
  import {mapActions, mapGetters } from 'vuex'
  // import ProductZoomer from 'vue-product-zoomer'
  export default {
    name: 'App',
    watch: {
      '$route' (to, from) {
        document.title = to.meta.title || 'Kayumo'
      }
    },
    components: {
     CAlert: () => import('@/components/CAlert.vue'),
     Search: () => import('@/views/Search.vue'),
     Login: () => import('@/components/Login.vue'),
     Register: () => import('@/views/Register.vue'),
     Cart: ()=> import('@/views/Cart.vue'),
    },
    data:()=> ({
      drawer: false,
      items:[
        {title: 'Home', route: '/'},
        // {title: 'Profile', icon: 'mdi-account', route:'/profile', auth:true },
        // {title: 'My Order', icon:'mdi-shopping', route:'/my-order', auth: true},
        {title: 'Category', route:'/categories'},
        {title: 'Product', route:'/books'},
        {title: 'About', route:'/about'},
        {title: 'Contact', route:'/contact'},
        // {title: 'Register',  route:'/register', guest:true},
        // {title: 'Login', guest:true},
      ],
      itemsAccount:[
        {title: 'Profile', icon:'mdi-account', route:'/profile', auth:true},
        {title: 'My Order', icon:'mdi-shopping', route:'/my-order', auth:true},
      ],

      itemsAdmin: [
        {title: 'Add Product', icon: 'store_mall_directory', route: '/add-product'},
        {title: 'Add Category', icon: 'category', route: '/add-category'},
        {title: 'Sales', icon: 'list', route: '/sales', route: '/sales'},
        {title: 'Spanduk', icon: 'photo_size_select_actual', route: '/spanduk'},
        {title: 'About Company', icon: 'storefront', route: '/about-company'},
        {title: 'Setting Contact', icon: 'local_phone', route: '/setting-contact'},
        

      ],

      admin:'["ADMIN"]',
      customer: '["CUSTOMER"]',
    }),

    computed:{
      isHome() {
        return (this.$route.path==='/')
      },
      ...mapGetters({
        carts             : 'cart/carts',
        countCart         : 'cart/count',
        totalPrice        : 'cart/totalPrice',
        totalQuantity     : 'cart/totalQuantity',
        totalWeight       : 'cart/totalWeight',
        statusDialog      : 'dialog/status',
        currentComponent  : 'dialog/component',
        user              : 'auth/user',
        guest             : 'auth/guest',
      }),

      dialog: {
        get(){
          return this.statusDialog
        },
        set(value){
          this.setStatusDialog(value)
        }
      },

    },

    methods: {
      ...mapActions({
        setStatusDialog : 'dialog/setStatus',
        setComponent    : 'dialog/setComponent',
        setAuth         : 'auth/set',
        setAlert        : 'alert/set',
        addCart         : 'cart/add',
        removeCart      : 'cart/remove',
        setCart         : 'cart/set',
      }),

      //fungsi untuk menampilkan konten login
      login(){
        this.setStatusDialog(true)
        this.setComponent('login')

      },

      register(){
        this.setStatusDialog(true)
        this.setComponent('register')
      },

      logout(){
        let config = {
          headers: {
            'Authorization': 'Bearer ' + this.user.api_token,
          },
        }

        this.axios.post('/logout', {}, config)
          .then((response) => {
            this.setAuth({}) //kosongkan auth ketika logout
            this.setAlert({
                status : true,
                text : 'logout successfully',
                type : 'success',
            })
          })
          .catch((error)=> {
            let responses = error.response
            this.setAlert({
              status: true,
              text : responses.data.message,
              type : 'error'
            })
          })

          this.$router.push({ path: '/' })
      },

      // cart(){
      //   this.setStatusDialog(true)
      //   this.setComponent('cart')

      // },

      checkout(){
        this.$router.push({path: '/checkout'})
      },

      shoppingNow(){
        this.$router.push({path: '/books'})
      },

      //fungsi untuk menampilkan konten search
      // search(){
      //   this.setStatusDialog(true)
      //   this.setComponent('search')
      // },
      search2(){
        this.$router.push({ path: '/search2'})
      }
    },

    created(){
      
      // let roles = this.user.roles
      // this.admin = roles
      let admin = this.admin
      let customer = this.customer

      // if(admin == this.user.roles){
      //   alert(admin)
      // }
      // else if(customer == this.user.roles){
      //   alert(customer)
      // }

      // else{
      //   alert('hanya pengunjung biasa')
      // }
    }

  }
</script>


