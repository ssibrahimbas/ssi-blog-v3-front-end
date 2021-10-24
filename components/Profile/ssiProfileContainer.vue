<template>
  <div class="container">
    <div class="photo-container">
      <img :src="API + image" alt="" />
    </div>
    <h3 class="title">{{ name }}</h3>
    <p class="category">{{ about }}</p>
    <div class="content">
      <div class="social-description">
        <h2>{{ countOfEducations }}</h2>
        <p>Eğitim</p>
      </div>
      <div class="social-description">
        <h2>{{ countOfExperiences }}</h2>
        <p>Deneyim</p>
      </div>
      <div class="social-description">
        <h2>{{ countOfCertificates }}</h2>
        <p>Sertifika</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component
export default class SsiProfileContainer extends Vue {
  @Prop() image! : string
  @Prop() name! : string
  @Prop() about!: string
  @Prop() countOfExperiences! : number
  @Prop() countOfEducations! : number
  @Prop() countOfCertificates! : number

  API : string = process.env.BASE_STATIC_API_URL || ''

}
</script>

<style scoped>

</style>
