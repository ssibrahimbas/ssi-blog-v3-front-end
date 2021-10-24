<template>
  <div class="button-container">
    <a href="#subscribe" class="btn btn-primary btn-round btn-lg">{{
        followText
      }}</a>
    <template v-if="accounts.length > 0">
      <ssi-social-media-list-item
        v-for="(socialMedia, index) in accounts"
        :key="index"
        :social-media="socialMedia"
      />
    </template>
  </div>
</template>

<script lang='ts'>
import 'reflect-metadata'
import { Component, Vue } from 'vue-property-decorator'
import {inject} from 'inversify-props'
import SsiSocialMediaListItem from '~/components/socialMedia/ssiSocialMediaListItem.vue'
import { ISuperhumanService } from '~/services/superhuman/ISuperhumanService'
import { SocialMediaListModel } from '~/models/socialMedia/socialMediaListModel'

@Component({
  components: {
    SsiSocialMediaListItem
  }
})
export default class SsiSocialMediaList extends Vue {
  @inject("ISuperhumanService") private $superhumanService! : ISuperhumanService

  superhumanId : number = 5;

  accounts : SocialMediaListModel[] = [];
  followText: string = "Takip Et";

  async getSuperhumanSocialAccounts(superhumanId : number = this.superhumanId) : Promise<void> {
    const data = await this.$superhumanService.getSuperhumanSocialMediaAccountsBySuperhumanId(superhumanId);
    if(!data.success) return;
    this.accounts = data.data.result;
  }

  created(){
    this.getSuperhumanSocialAccounts();
  }

}
</script>

<style scoped>

</style>
