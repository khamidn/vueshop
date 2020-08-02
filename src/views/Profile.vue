<template>
    <v-card>
        <v-toolbar>
        <h1 class="font-weight-bold">Profil Saya</h1>
        <template  v-slot:extension>
            <v-tabs v-model="tabs" left>
                <v-tab v-for="n in items" :key="n">
                    {{ n }}
                </v-tab>
            </v-tabs>
        </template>
        </v-toolbar>

        <v-tabs-items v-model="tabs">
            <v-tab-item>
                <v-card flat>
                    <!-- <v-card-title class="headline">Menu 1</v-card-title> -->
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="3" md="3">
                                <div class="text-center">
                                    <v-avatar class="profile" color="grey" size="164" justify="center">
                                        <v-img :src="getImage('/users/'+user.avatar)"></v-img>
                                    </v-avatar>
                                </div>

                                <v-card-actions class="justify-center">
                                    <v-btn color="success" dark @click="gantiFoto=true">
                                        Ganti Foto
                                    </v-btn>
                                </v-card-actions>

                            </v-col>
                            <v-col cols="12" sm="4" md="4">
                                <!-- <v-form ref="form" lazy-validation>
                                     <v-text-field label="Name" v-model="name" required></v-text-field>
                                     <v-text-field label="Email" v-model="email" required></v-text-field>
                                </v-form> -->
                                <v-list two-line>
                                    <v-list-item @click="">
                                        <v-list-item-icon>
                                            <v-icon color="indigo">mdi-account</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>{{user.name}}</v-list-item-title>
                                            <v-list-item-subtitle>Nama</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>

                                    <v-list-item @click="">
                                        <v-list-item-icon>
                                            <v-icon color="indigo">mdi-mail</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>{{user.email}}</v-list-item-title>
                                            <v-list-item-subtitle>Email</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                                <v-card-actions>
                                    <v-btn color="success" dark @click="editKontak=true">
                                        <!-- <v-icon>mdi-content-save</v-icon> &nbsp; -->
                                        Edit
                                    </v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                    </v-container>
                    
                </v-card>
            </v-tab-item>

            <v-tab-item>
                <v-card flat>
                    <!-- <v-card-title class="headline">Menu 2</v-card-title> -->
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-list two-line>
                                    <v-list-item @click="">
                                        <v-list-item-icon>
                                            <v-icon color="indigo">mdi-phone</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>{{user.phone}}</v-list-item-title>
                                            <v-list-item-subtitle>Phone</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item @click="">
                                        <v-list-item-icon>
                                            <v-icon color="indigo">mdi-map-marker</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>{{user.address}}
                                                <p style="margin-bottom: 0px;">
                                                    <span :items="kotaUser">{{typeCity}} - {{nameCity}}</span>, <span :items="provinsiUser">{{nameProvince}}</span>
                                                </p>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>Address</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                                <v-card-actions>
                                    <v-btn color="success" dark @click="editAlamat=true">
                                        Edit
                                    </v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-tab-item>
        </v-tabs-items>

        <!-- Dialog Ganti Foto Profil -->
        <template>
            <v-layout row justify="center">
                <v-dialog v-model="gantiFoto" scrollable max-width="500px">
                    <v-card>
                        <v-card-title class="headline">Ganti Foto Profilmu</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                 <v-file-input :rules="avatarRules" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Avatar" @change="onFileSelected"></v-file-input>

                                 <v-divider></v-divider>
                                 <div class="text-center">
                                    <p>Preview Avatar</p>
                                     <v-avatar color="grey" size="164">
                                        <v-img :src="imageUrl"/>    
                                     </v-avatar>
                                </div>

                                 <!-- <vue-avatar></vue-avatar> -->
                            </v-form>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="cancelGantiFoto">Cancel</v-btn>
                            <v-btn color="blue darken-1" text :disabled="!valid" @click="saveFoto">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
        </template>

        <!-- Dialog Edit Informasi Kontak -->
        <template>
            <v-layout row justify="center">
                <v-dialog v-model="editKontak" scrollable max-width="800px">
                    <v-card>
                        <v-card-title class="headline">Edit Informasi Kontak</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                
                                 <v-text-field :rules="nameRules" label="Name" v-model="name" prepend-icon="mdi-account" required></v-text-field>
                                 <v-text-field :rules="emailRules" label="Email" v-model="email" prepend-icon="mdi-mail" required></v-text-field>
                                 
                                 <!-- <v-text-field v-model="password" :append-icon="showPassword ? 'visibility' : 'visibility_off'" :rules="passwordRules" :type="showPassword ? 'text' : 'password'" label="Password" prepend-icon="mdi-key" hint="At least 6 characters" counter @click:append="showPassword = !showPassword"></v-text-field> -->
                            </v-form>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="editKontak= false">Close</v-btn>
                            <v-btn color="blue darken-1" text :disabled="!valid" @click="saveKontak">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
        </template>

        <!-- Dialog Edit Alamat Penagihan/Alamat Pengiriman -->
        <template>
            <v-layout row justify="center">
                <v-dialog v-model="editAlamat" scrollable max-width="800px">
                    <v-card>
                        <v-card-title class="headline">Edit Alamat Penagihan/Alamat Pengiriman</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-textarea label="Address" v-model="address" :rules="addressRules" auto-grow rows="3" counter></v-textarea>
                                    <v-text-field label="Phone" v-model="phone" :rules="phoneRules" counter></v-text-field>
                                    <v-select v-model="province_id" :items="provinces" item-text="province" item-value="id" label="Province"></v-select> 
                                    <v-select v-model="city_id" v-if="province_id>=0" :items="citiesByProvince" item-text="city" item-value="id" label="City">
                                        <!-- ditampilkan di kolom sudah dipilih -->
                                        <template slot='selection' slot-scope='{ item }'>
                                            {{ item.type }} - {{ item.city }} 
                                        </template>
                                        <!-- ditampilkan daftar kota berdasarkan provinsi yang dipilih -->
                                        <template slot='item' slot-scope='{ item }'>
                                            {{ item.type }} - {{ item.city }}                                   
                                        </template>
                                    </v-select> 
                                </v-form>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="editAlamat=false">Close</v-btn>
                            <v-btn color="blue darken-1" text :disabled="!valid" @click="saveAlamat">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
        </template>
    </v-card>
</template>

<script>
    import { mapGetters, mapActions} from 'vuex'
    export default {
        data (){
            return {
                // user: {},
                valid: true,
                tabs: null,
                items: [
                    'Informasi Kontak', 'Alamat Penagihan/Alamat Pengiriman'
                ],
                showPassword:false,
                password:'',
                passwordRules: [
                    v => (v && v.length >= 6 ) || 'Min 6 characters',
                ],
                avatar: null,
                avatarRules: [
                    v => !!v || 'Avatar is required',
                    v => !v || v.type == 'image/jpeg'|| v.type== 'image/png'|| 'The image format must be png/jpeg',
                    v => !v || v.size < 2000000 || 'Avatar size should be less than 2 MB!',
                ],
                name: '',
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 255) || 'Name must be less than 255 characters',
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required.',
                    v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'E-mail must be valid'
                ],
                address:'',
                addressRules: [
                    v => !!v || 'Address is required',
                    v => v.length <= 255 || 'Address max 255 characters',
                ],
                phone: '',
                phoneRules: [
                    v => !!v || 'Phone is required',
                    v => v.length <= 12 || 'Phone max 12 number',
                ],
                province_id: 0,
                city_id: 0,
                typeCity: '',
                nameCity:'',
                nameProvince:'',
                gantiFoto: false,
                editKontak: false,
                editAlamat: false,
                imageUrl:'',
                imageFile: {},
            }
        },
        computed: {
            ...mapGetters({
                user        : 'auth/user',
                provinces   : 'region/provinces',
                cities      : 'region/cities',
            }),
            citiesByProvince(){
                let province_id = this.province_id
                return this.cities.filter((city) => {           
                    if (city.province_id==province_id) return city
                })
            },

            kotaUser(){
                return this.cities.filter((city) => {
                    if (this.user.city_id==city.id){
                        this.typeCity = city.type
                        this.nameCity = city.city
                    }
                })
            },

            provinsiUser(){
                // let province_id = this.province_id
                return this.provinces.filter((province)=>{
                    if(this.user.province_id==province.id){
                        this.nameProvince=province.province
                    }
                })
            }
        },
        methods: {
            ...mapActions({
                setAlert      : 'alert/set',
                setAuth       : 'auth/set',
                setProvinces  : 'region/setProvinces',
                setCities     : 'region/setCities',

            }),

            cancelGantiFoto(){
                // this.$refs.form.reset()
                this.gantiFoto = false
            },

            onFileSelected(file){
                this.avatar = file

                const fileAvatar = file
                let avatarname = fileAvatar.name
                const fileReader = new FileReader()
                    fileReader.addEventListener('load', () => {
                        this.imageUrl = fileReader.result
                    })
                    fileReader.readAsDataURL(fileAvatar)
                    this.imageFile = fileAvatar
                    this.avatar = fileAvatar
                
                // console.log(this.avatar)
                },


            saveFoto(){
                this.gantiFoto = false
                
                let avatar = this.avatar
                let formData = new FormData()
                formData.set('avatar', this.avatar)

                 let config = {
                    headers: {
                        'Authorization': 'Bearer ' + this.user.api_token,
                    },
                }

                this.axios.post('/update-foto-profil', formData, config)
                .then((response)=>{
                    let { data } = response
                    this.setAuth(data.data)
                    this.setAlert({
                        status  : true,
                        text    : data.message,
                        color   : 'success',
                    })

                })
                .catch((error)=>{
                    let { data } = error
                    this.setAlert({
                        status  : true,
                        text    : data.message,
                        color   : 'success',
                    })
                })
            },

            saveKontak(){
                this.editKontak = false
                let name = this.name
                let email = this.email
                let formData = new FormData()
                formData.set('name',this.name)
                formData.set('email', this.email)

                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + this.user.api_token,
                    },
                }

                this.axios.post('/update-informasi-kontak', formData, config)
                .then((response)=>{
                    let { data } = response
                    this.setAuth(data.data)
                    this.setAlert({
                        status  : true,
                        text    : data.message,
                        color   : 'success',
                    })
                })
                .catch((error)=>{
                    let { data } = error
                    this.setAlert({
                        status  : true,
                        text    : data.message,
                        color   : 'success',
                    })
                })
            },

            saveAlamat(){
                this.editAlamat = false
                let formData = new FormData()
                formData.set('address', this.address)
                formData.set('phone', this.phone)
                formData.set('province_id', this.province_id)
                formData.set('city_id', this.city_id)

                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + this.user.api_token,
                    },
                }

                this.axios.post('/update-shipping', formData, config)
                .then((response)=>{
                    let { data } = response
                    this.setAuth(data.data)
                    this.setAlert({
                        status  : true,
                        text    : data.message,
                        color   : 'success',
                    })
                })
                .catch((error)=>{
                    let { data } = error
                    this.setAlert({
                        status  : true,
                        text    : data.message,
                        color   : 'success' 
                    })
                })
            }, 


        },

        created() {
            this.name = this.user.name
            this.email = this.user.email
            this.address = this.user.address
            this.phone = this.user.phone
            this.province_id = this.user.province_id
            this.city_id = this.user.city_id
            
            
            // if(this.provinces && this.provinces.length==0){
                this.axios.get('/provinces')
                .then((response)=>{
                    let {data} = response.data
                    this.setProvinces(data)
                })
                this.axios.get('/cities')
                .then((response)=> {
                    let {data} = response.data
                    this.setCities(data)
                })
            // }
        },
    }
</script>