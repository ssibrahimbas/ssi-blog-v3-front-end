<template>
  <a
    :href="'https://'+socialMedia.socialMedia.url"
    class="btn btn-default btn-round btn-lg btn-icon"
    rel="tooltip"
    :title="socialMedia.socialMedia.title"
    target="_blank"
  >
    <i class="fab" :class="organizations[socialMedia.organization.name]"></i>
  </a>
</template>

<script lang='ts'>
import {Component, Vue, Prop} from 'vue-property-decorator'
import { SocialMediaListModel } from '~/models/socialMedia/socialMediaListModel'

@Component
export default class SsiSocialMediaListItem extends Vue {
  @Prop() socialMedia! : SocialMediaListModel

  organizations : any = {
    linkedin: "fab fa-linkedin",
    github: "fab fa-github",
  }

}
</script>

<style scoped>

</style>
