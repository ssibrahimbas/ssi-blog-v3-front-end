<template>
  <navbar
    position="fixed"
    type="success"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <nuxt-link class="navbar-brand" to="/">
      {{ siteName }}
    </nuxt-link>
    <template slot="navbar-menu">
      <li v-for="(page, index) in pages" :key="index" class="nav-item">
        <nav-link class="nav-link" :to="page.path">
          <i class="now-ui-icons" :class="page.icon"></i>
          <p>{{ page.title }}</p>
        </nav-link>
      </li>
      <template v-if="accounts.length > 0">
        <ssi-nav-social-media
          v-for="(socialMedia, index) in accounts"
          :key="socialMedia.socialMedia.title + index"
          :social-media="socialMedia"
        />
      </template>
    </template>
  </navbar>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { inject } from 'inversify-props'
import Navbar from '~/components/Tools/Navbar/navbar.vue'
import NavLink from '~/components/Tools/Navbar/navLink.vue'
import Constants, { IFooterPage } from '~/constants/Constants'
import { ISuperhumanService } from '~/services/superhuman/ISuperhumanService'
import { SocialMediaListModel } from '~/models/socialMedia/socialMediaListModel'
import SsiNavSocialMedia from '~/components/socialMedia/ssiNavSocialMedia.vue'

@Component({
  components: {
    Navbar,
    NavLink,
    SsiNavSocialMedia,
  },
})
export default class MainNavbar extends Vue {
  @inject('ISuperhumanService') private superhumanService!: ISuperhumanService

  @Prop({ default: false }) transparent!: boolean
  @Prop() colorOnScroll!: number

  siteName: string = Constants.siteName
  accounts: SocialMediaListModel[] = []
  pages: IFooterPage[] = Constants.pages
  superhumanId: number = 5

  async getUserSocialMedias(
    superhumanId: number = this.superhumanId
  ): Promise<void> {
    const data =
      await this.superhumanService.getSuperhumanSocialMediaAccountsBySuperhumanId(
        superhumanId
      )
    this.accounts = data.data.result
  }

  created(): void {
    this.getUserSocialMedias()
  }
}
</script>

<style lang="scss">
.navbar {
  .nav-item {
    margin-right: 0.5rem !important;
    .nav-link {
      color: #ffffff;
      background-color: rgba(255, 255, 255, 0.2) !important;
      border-radius: 5px;
      &:hover {
        background-color: #41b883 !important;
        color: #ffffff;
      }
    }
  }
}
.bg-success {
  background-color: #34495e !important;
}
</style>
