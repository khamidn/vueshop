<template>
	<div>
		<v-container>
			<h1>Image Cropper</h1>
			<!-- <v-btn class="primary" @click="onPickFile">Upload image</v-btn>
			<input 
			type="file" 
			style="display: none" 
			ref="fileInput" 
			accept="image/*" 
			@change="onFilePicked"
			> -->
			<v-file-input accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Avatar" @change="onFilePicked"></v-file-input>

			<div class="img-container">
				<img :src="imageUrl"/>
			</div>
			<!-- <ImageCropper src="imageUrl"/> -->
			<!-- <ImageCropper src="/namafile"/> -->


			<!--  <div class="img-container">
			 	<img ref="image" src="logo.png">
			 </div>
			<img :src="destination" class="img-preview"> -->
		</v-container>
	</div>
</template>

<script>
	import Cropper from  "cropperjs"
	export default {
		name: 'cropper',
		data: ()=> ({
			cropper: {},
			imageUrl: '',
			imageFile: {},
			// filename: '',
			cropper: {},
			destination:{},

		}),

		// mounted() {
		//       this.image = this.$refs.image
		//       console.log(this.image)
		//       this.cropper = new Cropper(this.image, {
		//         zoomable: false,
		//         scalable: false,
		//         aspectRatio: 1,
		//         crop: ()=>{
		//             const canvas = this.cropper.getCroppedCanvas();
		//             this.destination = canvas.toDataURL("image/png");
		//         }
		//       });

		//       // console.log(this.cropper)
		//     },


		// components: {
		// 	ImageCropper
		// },

		methods: {

			// onPickFile(){
			// 	this.$refs.fileInput.click()
			// },

			onFilePicked(file){
				

				const avatar = file
				let avatarname = avatar.name
				console.log(avatarname)
				// if(filename.lastIndexOf('.') <= 0){
				// 	return alert('Please add as valid file!')
				// }

				// // this.image = this.$refs.image
			 // //    console.log(this.image)
			 // //    this.cropper = new Cropper(this.image, {
			 // //        zoomable: false,
			 // //        scalable: false,
			 // //        aspectRatio: 1,
			 // //        crop: ()=>{
			 // //            const canvas = this.cropper.getCroppedCanvas();
			 // //            this.destination = canvas.toDataURL("image/png");
			 // //        }
			 // //    });

			    const fileReader = new FileReader()
				fileReader.addEventListener('load', () => {
					this.imageUrl = fileReader.result
				})
				fileReader.readAsDataURL(avatar)
				this.imageFile = avatar

			}
		},
	}
</script>

<style scoped>
  .img-container{
    width: 640px;
    height: 480px;
    float: left;
  }

  .img-preview {
    width: 200px;
    height: 200px;
    float: left;
    margin-left: 10px;
  }
  
</style>

