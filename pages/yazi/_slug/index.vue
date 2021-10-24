<template>
  <ssi-page
    :title="pageDetails.title"
    :description="pageDetails.description"
    :self-header-image="API + pageDetails.image"
    filter-color="primary"
    :header-small="false"
  >
    <template #header-extra="">
      <div class="ssi-between">
        <span v-if="!!readTime" class="d-fcenter"
          ><i class="now-ui-icons ui-2_time-alarm"></i> {{ readTime }} dakikalık
          okuma</span
        >
        <span class="text-white">{{ formatDate(pageDetails.date) }}</span>
      </div>
    </template>
    <template #content="">
      <ssi-post-detail
        :slug="slug"
        @pageDetails="setPageDetails"
        @readTime="setReadTime"
        @meta="setMeta"
      />
    </template>
  </ssi-page>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Component, Vue } from 'vue-property-decorator'
import { inject } from 'inversify-props'
import SsiPage from '~/components/Page/ssiPage.vue'
import SsiPostDetail from '~/components/Posts/detail/ssiPostDetail.vue'
import { IConstants } from '~/constants/IConstants'
import { PostMetaModel } from '~/models/post/postMetaModel'

type PageDetails = {
  title: string
  description: string
  image: string | null
  date: string
}

@Component({
  components: {
    SsiPage,
    SsiPostDetail,
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
          hid: 'author',
          name: 'author',
          content: this.meta.author,
        },
        {
          hid: 'og-type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'og-title',
          property: 'og:title',
          content: this.meta.title,
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: this.meta.description,
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
          hid: 'og-url',
          property: 'og:url',
          content: this.meta.url,
        },
        {
          hid: 'og-published_time',
          property: 'og:article:published_time',
          content: this.meta.dateOfCreate,
        },
        {
          hid: 'og-article-author',
          property: 'og:article:author',
          content: this.meta.author,
        },
        {
          hid: 'og-article-tag',
          property: 'og:article:tag',
          content: this.meta.tags.toString(),
        },
      ],
    }
  },
})
export default class Index extends Vue {
  @inject('IConstants') private $constants!: IConstants

  slug: string = this.$route.params.slug

  pageDetails: PageDetails = {
    title: '',
    description: '',
    image: null,
    date: '',
  }

  meta: PostMetaModel = {
    id: -1,
    author: '',
    dateOfCreate: '',
    tags: [],
    title: '',
    description: '',
    imageUrl: '',
    imageAlt: '',
    url: '',
    keywords: '',
  }

  readTime: number = 0

  API: string = process.env.BASE_STATIC_API_URL || ''

  setPageDetails(pageDetails: PageDetails): void {
    this.pageDetails = pageDetails
  }

  setReadTime(time: number): void {
    this.readTime = time
  }

  setMeta(meta: PostMetaModel): void {
    this.meta = meta
  }

  formatDate(date: string): string {
    return this.$constants.formatDate(date)
  }
}
</script>

<style scoped></style>
