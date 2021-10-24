<template>
  <NuxtLink :to="url" class="ssi-profile-card">
    <div class="team-player">
      <img
        :src="API + image"
        :alt="name"
        class="rounded-circle img-fluid img-raised"
      />
    </div>
    <div class="ssi-profile-content">
      <h4 class="title">{{ name }}</h4>
      <p class="category text-primary">{{ about }}</p>
    </div>
  </NuxtLink>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class SsiProfileCard extends Vue {
  @Prop()
  name!: string

  @Prop()
  image!: string

  @Prop()
  url!: string

  @Prop()
  about!: string

  API: string = process.env.BASE_STATIC_API_URL || ''
}
</script>

<style lang="scss" scoped>
$secondary-color: #34495e !default;

a {
  text-decoration: none !important;
}
.ssi-profile-card {
  width: 90%;
  margin-inline: auto;
  padding: 1rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .team-player {
    img {
      width: 90px;
      height: 90px;
      object-fit: cover;
    }
  }
  .ssi-profile-content {
    display: flex;
    margin-left: 2.5rem;
    flex-direction: column;
    h4,
    p {
      margin: 0;
      padding: 0;
    }
    h4 {
      color: $secondary-color;
    }
    p {
      text-align: center;
    }
  }
}
</style>
