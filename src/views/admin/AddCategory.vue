<template>
	<div>
		<v-container>
			<h1 class="orange--text">Add Category</h1>

      <v-tabs v-model="tab" icons-and-text>
        <v-tab>
          LIST KATEGORI
          <v-icon>list</v-icon>
        </v-tab>
        <v-tab>
          TRASH
          <v-icon>mdi-delete</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
            <v-data-table :headers="headers" :items="categorys" :search="searchCategory" class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat color="white">
                 <!--  <v-toolbar-title>List Category Product</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer> -->
                  <v-text-field v-model="searchCategory" append-icon="mdi-magnify" label="Search Category" single-line hide-details></v-text-field>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialogCategory" max-width="600px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark class="mb-2" v-on="on">New Category</v-btn>
                    </template>
                    <v-card>
                      <v-form v-model="valid">
                        <v-card-title>
                          <span class="headline">{{ formTitle}}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            
                              <v-row>
                                <v-col cols="12" sm="12" md="12">
                                  <div v-if="imageUrl!=''" align="center" justify="center">
                                    <v-avatar tile color="grey" height="100px" width="300px">
                                      <v-img :src="imageUrl"></v-img>
                                    </v-avatar>
                                  </div>
                                  <div v-else align="center" jutify="center">
                                    <v-avatar tile color="grey" height="100px" width="300px">
                                      <v-img v-if="editedIndex > -1"  :src="getImage('/categories/'+ editedItem.image)"></v-img>
                                    </v-avatar>
                                  </div>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field  :rules="nameRules" v-model="editedItem.name" label="name*"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <div v-if="editedIndex > -1">
                                    <v-file-input :rules="imageRules" accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera"
                                      @change="onFileSelected">
                                      <template v-slot:label>
                                        <div>
                                          Image
                                        </div>
                                      </template>
                                    </v-file-input>
                                  </div>
                                  <div v-else>
                                    <v-file-input :rules="imageRulesCreate" accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera" @change="onFileSelected">
                                      <template v-slot:label>
                                        <div>Image*</div>
                                      </template>
                                    </v-file-input>
                                  </div>
                                </v-col>
                              </v-row>
                            
                            
                          </v-container>
                          <small>*indicates required field</small>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                          <v-btn :disabled="!valid" color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
              </template>

              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
          </v-data-table>

          <template>
            <v-layout row justify-center>
              <v-dialog v-model="dialogDelete" persistent max-width="290px">
                <v-card>
                  <v-card-title class="headline">Delete Category</v-card-title>
                  <v-card-text>Are you sure, you want to delete this item?</v-card-text>
                  <v-card-actions>
                    <v-btn color="warning" @click="cancelDelete">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="deleted">Yes</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </template>
        </v-tab-item>


        <v-tab-item >
          <v-data-table :headers="headeresTrash" :items="trash" :search="searchTrash" sort-by="name" class="elevation-1">
            <template v-slot:top>
               <v-text-field v-model="searchTrash" append-icon="mdi-magnify" label="Search Category In Trash" single-line hide-details></v-text-field>
            </template>

            <template v-slot:item.actions="{ item } ">
              <v-icon medium class="mr-2" @click="restoreItem(item)">restore_from_trash</v-icon>
              <v-icon medium @click="deletePermanentItem(item)">delete_forever</v-icon>
            </template>

            <template v-slot:no-data>
              <v-btn color="primary" @click="trashList">Reset</v-btn>
            </template>
          </v-data-table>

          <template>
            <v-layout row justify-center>
              <v-dialog v-model="dialogRestore" persistent max-width="290">
                <v-card>
                  <v-card-title class="headline"> Restore</v-card-title>
                  <v-card-text>Are you sure, you want to restore this item?</v-card-text>
                  <v-card-actions>
                    <v-btn color="warning" @click="dialogRestore=false">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="restore">Yes</v-btn>
                  </v-card-actions> 
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialogDeletePermanent" persistent max-width="290">
                <v-card>
                  <v-card-title class="headline">Delete Permanent</v-card-title>
                  <v-card-text>Are sure, you want to delete permanent this item?</v-card-text>
                  <v-card-actions>
                    <v-btn color="warning" @click="dialogDeletePermanent=false">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="deletePermanent">Yes</v-btn>
                  </v-card-actions> 
                </v-card>
              </v-dialog>
            </v-layout>
          </template>


        </v-tab-item>
      </v-tabs-items>

			
		</v-container>
	</div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
	export default {
		data: () => ({
      tab:null,
			valid: true,
			dialogCategory: false,
      dialogDelete: false,
			searchCategory: '',
			headers: [
			{ text: 'Name', value: 'name' },
			{	text: 'Status', value: 'status'},
			{	text: 'Actions', value: 'actions', sortable: false}	
			],
			categorys: [],
			editedIndex: -1,
			editedItem: {
				name: '',
			},
			defaultItem: {
				name: '',
			},
      image: '',
			imageUrl:'',
      imageFile: {},
			nameRules:[
				v => !!v || 'Name is required',
				v => (v && v.length <= 255) || 'Name must be less than 255 characters'
			],
			imageRules:[
				v => !v || v.type == 'image/jpeg' || v.type == 'image/png' || v.type == 'image/bmp' || 'The image format must be png/jpeg/bmp'
			],
      imageRulesCreate: [
        v => !!v || 'Image is required',
        v => !v || v.type == 'image/jpeg' || v.type == 'image/png' || v.type == 'image/bnp' || 'The image format must be png/jpeg/bmp'
      ],

      dialogRestore : false,
      dialogDeletePermanent : false, 
      headeresTrash: [
        {text:'Name', value:'name'},
        {text:'Status', value:'status'},
        {text:'Actions', value:'actions', sortable: false},
      ],
      searchTrash:'',
      trash: [],
      dialodTrashIndex: '',
      restoredItem: {},
      deletedPermanentItem: {},

		}),

		computed: {
      ...mapGetters({
          user : 'auth/user',
      }),

			formTitle() {
				return this.editedIndex === -1 ? 'New Category' : 'Edit Category'
			},
		},

		watch: {
			dialog (val) {
				val || this.close()
			},
		},

		created () {
			this.initialize()
      this.trashList()
		},

		methods: {
      ...mapActions ({
          setAlert : 'alert/set',
      }),

			initialize () {
        let config = {
          headers: {
              'Authorization': 'Bearer ' + this.user.api_token,
            },
        }
				this.axios.get('/categories/show-add-category', config)
				.then(({ data })=>{
					this.categorys = data.data
				})
			},

			editItem (item){
				this.editedIndex = this.categorys.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialogCategory = true
			},

			deleteItem (item){
				// const index = this.categorys.indexOf(item)
				// confirm('Are you sure, you want to delete this item?') && this.categorys.splice(index,1)
        this.deleteIndex =this.categorys.indexOf(item)
        this.deletedItem = Object.assign({}, item)
        this.dialogDelete = true
			},

      cancelDelete(){
        this.dialogDelete = false
      },

			close () {
				this.dialogCategory = false
				setTimeout(()=> {
					this.editedItem = Object.assign({}, this.defaultItem)
					this.editedIndex = -1
				}, 300)

			},

      onFileSelected(file){
        this.image = file
        const fileCategory = file
        let nameImage = fileCategory.name
        const fileReader = new FileReader()
          fileReader.addEventListener('load', ()=> {
            this.imageUrl = fileReader.result
          })
          fileReader.readAsDataURL(fileCategory)
          this.imageFile = fileCategory
      },

      deleted (){
        let config = {
            headers: {
              'Authorization': 'Bearer ' + this.user.api_token,
            },
          }

        this.axios.delete('/categories/delete/'+ this.deletedItem.id, config)
        .then((response)=>{
          let data = response.data
          this.setAlert({
            status: true,
            text: data.message,
            type: 'success'
          })
          this.trash.push(this.deletedItem)
          this.categorys.splice(this.deleteIndex,1)
          this.dialogDelete = false
        })
        .catch((error)=>{
          let responses = error.response
          this.setAlert({
            status: true,
            text: responses.data.message,
            type: 'error'
          })
        })
      },


			save () {
				// this.$refs.form.validate()
				if(this.editedIndex > -1){
          let formData = new FormData()
          formData.set('name',this.editedItem.name)
          formData.set('image_category',this.image)

          let config = {
            headers: {
              'Authorization': 'Bearer ' + this.user.api_token,
            }
          }

         this.axios.post('/categories/update/'+ this.editedItem.id, formData, config)
         .then(({data})=> {
          this.setAlert({
            status : true,
            text : data.message,
            type : data.status,
          })
          // Object.assign(this.categorys[this.editedIndex], this.editedItem)
          this.close()
         })
         .catch((error)=> {
          let responses = error.response
          this.setAlert({
            status : true,
            text : responses.data.message,
            type : responses.data.status,
          })
         })
         this.close()



					// Object.assign(this.categorys[this.editedIndex], this.editedItem)
				}
				else {
					this.categorys.push(this.editedItem)
				}
				this.close()
			},

      //Controller Trash
      trashList(){
        let config = {
          headers: {
            'Authorization': 'Bearer ' + this.user.api_token,
          }
        }

        return this.axios.get('/categories/trash',config)
        .then(({ data })=> {
          this.trash = data.data
        })

      },

      restoreItem(item){
        this.restoreIndex = this.trash.indexOf(item)
        this.categorysIndex = this.categorys.indexOf(item)
        this.restoredItem = Object.assign({},item)
        this.dialogRestore = true
      },

      restore(){
        let config = {
          headers: {
            'Authorization': 'Bearer ' + this.user.api_token,
          }
        }

        this.axios.get('/categories/restore/'+ this.restoredItem.id, config)
        .then((response)=> {
          let data = response.data
          this.setAlert({
            status : true,
            text : data.message,
            type : 'success'
          })

          this.categorys.push(this.restoredItem)
          this.trash.splice(this.restoreIndex,1)
          this.dialogRestore = false
        })
       
      },

      deletePermanentItem(item){
        this.deletedPermanentIndex = this.trash.indexOf(item)
        this.deletedPermanentItem = Object.assign({}, item)
        this.dialogDeletePermanent = true
      },

      deletePermanent(){

        let config = {
          headers: {
            'Authorization': 'Bearer ' + this.user.api_token,
          }
        }

        this.axios.delete('/categories/delete-permanent/'+ this.deletedPermanentItem.id, config)
        .then((response)=> {
          let data = response.data
          this.setAlert({
            status: true,
            text : data.message,
            type: 'success'
          })
          this.trash.splice(this.deletedPermanentIndex,1)
          this.dialogDeletePermanent = false
        })
        .catch((error)=> {
          let responses = error.response
          this.setAlert({
            status: true,
            text: responses.data.message,
            type: 'error'
          })
        })
      }

		}
	}
</script>