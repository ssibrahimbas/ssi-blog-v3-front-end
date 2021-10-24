<template>
  <div class="ssi-info-card">
    <div class="ssi-media">
      <img alt="" :src="API + image" />
    </div>
    <div class="ssi-content">
      <h3>
        {{ title }}
        <small v-if="titleDesc" class="text-muted">{{ titleDesc }}</small>
      </h3>
      <p>{{ description }}</p>
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SsiInfoCard extends Vue {
  @Prop()
  image!: string

  @Prop()
  title!: string

  @Prop()
  titleDesc!: string

  @Prop()
  description!: string

  API: string = process.env.BASE_STATIC_API_URL || ''
}
</script>

<style lang="scss" scoped>
.ssi-info-card {
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-inline: auto;
  margin-bottom: 3rem;
  justify-content: center;
  .ssi-media {
    width: 100px;
    object-fit: cover;
    margin-right: 2rem;
    img {
      border-radius: 50%;
    }
  }
  .ssi-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      margin-block: 0.3rem;
      font-weight: 500;
    }
    p {
      margin-bottom: 0.2rem;
    }
    .ssi-date {
      font-style: italic;
      font-size: 1.1em;
    }
  }
}
</style>
