<template>
  <footer
    class="footer ssi-light-footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <ul>
          <li>
            <nuxt-link class="nav-link" to="/">
              {{ siteName }}
            </nuxt-link>
          </li>
          <li v-for="(page, index) in pages" :key="index">
            <nuxt-link class="nav-link" :to="page.path">
              {{ page.title }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <div class="copyright text-center">
        &copy; {{ year }}, {{ siteDescription }}
      </div>
    </div>
  </footer>
</template>

<script lang='ts'>
import {Component, Vue, Prop} from 'vue-property-decorator'
import Constants, { IFooterPage } from '~/constants/Constants'

@Component
export default class MainFooter extends Vue {
  @Prop() backgroundColor! : string
  @Prop() type! : String

  year : number = new Date().getFullYear()
  siteName : string = Constants.siteName
  siteDescription : string = Constants.siteDescription
  pages : IFooterPage[] = Constants.pages

}
</script>

<style scoped lang="scss">
@media screen and (max-width: 988px) {
  .footer {
    .container {
      display: flex;
      flex-direction: column;
    }
    nav {
      margin-bottom: 0.5rem;
    }
    nav,
    div {
      display: flex;
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
