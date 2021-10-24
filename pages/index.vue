<template>
  <ssi-page
    :header-small="false"
    header-image="bg1.jpg"
    :title="pageDetails.title"
    :description="pageDetails.description"
  >
    <template #content>
      <ssi-post-carousel />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
        aliquam corporis cupiditate eius ex facere impedit obcaecati officiis.
        Dignissimos enim eos magnam quae! Aliquam, consequatur cum debitis
        dolore, ea eius eos explicabo facilis, fugit ipsam laborum libero minus
        nemo quasi sequi voluptate voluptatibus! Assumenda beatae cupiditate
        delectus deleniti deserunt dolores doloribus dolorum, eum hic in
        incidunt laboriosam magnam magni nostrum placeat quasi ratione sequi!
        Adipisci deleniti nulla optio, sint veniam voluptatibus? Commodi, minus
        voluptates. Accusantium adipisci atque cumque dolor dolorem eveniet
        impedit in, natus perferendis praesentium quaerat rem sit tempore
        veniam, vero voluptate voluptatum! Assumenda doloribus eaque maxime
        pariatur ratione? Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Alias commodi corporis dolorem, doloremque eligendi impedit nisi
        recusandae sapiente veritatis. At aut autem blanditiis consectetur
        consequuntur debitis, dignissimos distinctio doloribus dolorum ipsa
        iusto nostrum odio quam quis voluptatibus. Dignissimos dolore, doloribus
        ex fugiat harum iste laboriosam minima minus natus, perspiciatis,
        quaerat quibusdam repudiandae temporibus. Aliquid atque cumque dicta
        facilis ipsa. Alias animi consequuntur cum cumque cupiditate debitis
        delectus deserunt, doloribus, eos error facilis fuga hic id illo iure
        iusto maiores maxime modi molestiae mollitia nam officia omnis optio,
        pariatur quam quia quod recusandae rerum saepe similique suscipit totam
        ut velit. Magni?
      </p>
    </template>
  </ssi-page>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Vue, Component } from 'vue-property-decorator'
import { inject } from 'inversify-props'
import SsiPostCarousel from '~/components/Posts/carousel/ssiPostCarousel.vue'
import SsiPage from '~/components/Page/ssiPage.vue'
import { IHomePage } from '~/constants/Constants'
import { IConstants } from '~/constants/IConstants'
@Component({
  components: { SsiPage, SsiPostCarousel },
})
export default class Index extends Vue {
  @inject('IConstants') $constants!: IConstants

  pageDetails: IHomePage = this.$constants.homePage
}
</script>
