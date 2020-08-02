<template>
      <vue-avatar
        :width=400
        :height=400
        ref="vueavatar"
        @vue-avatar-editor:image-ready="onImageReady"
        image="https://vuejs.org/images/logo.png"
      >
      </vue-avatar>
      <br>
      <vue-avatar-scale
        ref="vueavatarscale"
        @vue-avatar-editor-scale:change-scale="onChangeScale"
        :width=250
        :min=1
        :max=3
        :step=0.02
      >
      </vue-avatar-scale>
      <br>
      <img src="" id="img-1">
      <button v-on:click="saveClicked">Click</button>
</template>

<script>
  import VueAvatar from '../vue-avatar-edito/src/components/VueAvatar.vue'
  import VueAvatarScale from '../vue-avatar-edito/src/components/VueAvatarScale.vue'

    components: {
      VueAvatar,
      VueAvatarScale
    },
    methods:{
      onChangeScale (scale) {
          this.$refs.vueavatar.changeScale(scale)
      },
      saveClicked(){
        var img = this.$refs.vueavatar.getImageScaled()
        // use img
      },
      onImageReady(scale){
        this.$refs.vueavatarscale.setScale(scale)
      }
    }
  })

</script>
