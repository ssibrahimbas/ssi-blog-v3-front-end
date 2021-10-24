<template>
  <ssi-page
    :header-small="false"
    header-image="bg8.jpg"
    :title="pageDetails.title"
    :description="pageDetails.description"
  >
    <template #content>
      <ssi-project-list />
      <ssi-subscriber-form id="subscribe-project" />
    </template>
  </ssi-page>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Component, Vue } from 'vue-property-decorator'
import { inject } from 'inversify-props'
import SsiPage from '~/components/Page/ssiPage.vue'
import SsiProjectList from '~/components/Projects/ssiProjectList.vue'
import { IConstants } from '~/constants/IConstants'
import SsiSubscriberForm from '~/components/Subscriber/ssiSubscriberForm.vue'
import { IPageService } from '~/services/page/IPageService'
import { MetaModel } from '~/models/meta/metaModel'

type PageDetail = {
  title: string
  description: string
}

@Component({
  components: {
    SsiPage,
    SsiProjectList,
    SsiSubscriberForm,
  },
  head(this: Index) {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.meta.description,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.meta.keywords,
        },
        {
          hid: 'og-title',
          property: 'og:title',
          content: this.meta.title,
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: this.meta.url,
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: process.env.BASE_STATIC_API_URL + this.meta.imageUrl,
        },
        {
          hid: 'og-image-alt',
          property: 'og:image:alt',
          content: this.meta.imageAlt,
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: this.meta.description,
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: this.meta.url,
        },
      ],
    }
  },
})
export default class Index extends Vue {
  @inject('IConstants') $constants!: IConstants
  @inject('IPageService') $pageService!: IPageService

  pageName: string = this.$constants.projectsPage.name

  pageDetails: PageDetail = {
    title: this.$constants.projectsPage.title,
    description: this.$constants.projectsPage.description,
  }

  meta: MetaModel = {
    id: -1,
    title: '',
    description: '',
    author: '',
    imageUrl: '',
    imageAlt: '',
    url: '',
    keywords: '',
  }

  async getPageDetails(): Promise<void> {
    const data = await this.$pageService.getPageByName(this.pageName)
    this.meta = data.data
  }

  created(): void {
    this.getPageDetails()
  }
}
</script>

<style scoped></style>
