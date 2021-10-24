<template>
  <li class="nav-item">
    <a
      class="nav-link"
      rel="tooltip"
      :title="socialMedia.socialMedia.title"
      data-placement="bottom"
      :href="'https://'+socialMedia.socialMedia.url"
      target="_blank"
    >
      <i class="fab" :class="organizations[socialMedia.organization.name]"></i>
      <p class="d-lg-none d-xl-none">{{socialMedia.organization.name}}</p>
    </a>
  </li>
</template>

<script lang='ts'>
import {Component, Vue, Prop} from 'vue-property-decorator'
import { SocialMediaListModel } from '~/models/socialMedia/socialMediaListModel'

@Component
export default class SsiNavSocialMedia extends Vue {
  @Prop() socialMedia! : SocialMediaListModel

  organizations : object = {
    linkedin: "fab fa-linkedin",
    github: "fab fa-github",
  }
}
</script>

<style scoped>

</style>
