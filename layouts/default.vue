<template>
  <div>
    <main-navbar
      :color-on-scroll='400'
    />

      <nuxt />


    <main-footer
      background-color='white'
    />
  </div>

</template>

<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator'

import MainNavbar from '~/layouts/mainNavbar.vue'
import MainFooter from '~/layouts/mainFooter.vue'

@Component({
  components: {
    MainNavbar,
    MainFooter
  }
})
export default class Default extends Vue {
  mounted(){
    document.body.classList.add("sidebar-collapse");
  }

}
</script>

<style scoped>

</style>
