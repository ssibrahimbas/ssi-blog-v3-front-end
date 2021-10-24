<template>
  <div>
    <ssi-markdown
      :calculate-read-time="true"
      :url="markdownUrl"
      @readingTime="$emit('readTime', $event)"
    ></ssi-markdown>
    <p v-if="post" class="text-muted text-right">
      {{ formatDate(post.post.dateOfCreate) }}
    </p>
    <div class="mt-4">
      <ssi-hashtags v-if="post" :hashtags="post.post.hashtags" />
    </div>
    <div v-if="post && !!post.recentPosts" class="similar-posts">
      <ssi-similar-post
        v-for="(recentPost, index) in post.recentPosts.slice(0, 2).reverse()"
        :key="index"
        :title="recentPost.title"
        :slug="recentPost.slug"
        :position="index % 2 === 0 ? 'left' : 'right'"
      />
    </div>
    <div class="ssi-profile-card">
      <ssi-profile-card
        v-if="post && !!post.superhuman"
        :name="post.superhuman.fullName"
        :image="post.superhuman.profileImage"
        url="/profilim"
        :about="post.superhuman.about"
      />
    </div>

    <ssi-evaluation-list v-if="post" :post-id="post.post.id" />

    <ssi-evaluation-form v-if="post" :post-id="post.post.id" />
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import { inject } from 'inversify-props'
import SsiMarkdown from '~/components/Tools/Markdown/ssiMarkdown.vue'
import SsiHashtags from '~/components/Hashtags/ssiHashtags.vue'
import SsiSimilarPost from '~/components/Posts/similar/ssiSimilarPost.vue'
import SsiProfileCard from '~/components/Tools/Cards/ssiProfileCard.vue'
import SsiEvaluationList from '~/components/Evaluations/ssiEvaluationList.vue'
import SsiEvaluationForm from '~/components/Evaluations/ssiEvaluationForm.vue'
import { IPostService } from '~/services/post/IPostService'
import { PostDetailModel } from '~/models/post/postDetailModel'
import { PostMetaModel } from '~/models/post/postMetaModel'
import { IConstants } from '~/constants/IConstants'

type PageDetail = {
  title: string
  description: string
  date: string
  image: string
}

@Component({
  components: {
    SsiHashtags,
    SsiSimilarPost,
    SsiProfileCard,
    SsiEvaluationList,
    SsiEvaluationForm,
    SsiMarkdown,
  },
})
export default class SsiPostDetail extends Vue {
  @Prop() slug!: string

  @inject('IPostService') private $postService!: IPostService
  @inject('IConstants') private $constants!: IConstants

  API: string = process.env.BASE_STATIC_API_URL || ''
  post!: PostDetailModel
  markdownUrl: string = ''

  async getPostBySlug(slug: string = this.slug): Promise<void> {
    if (!slug) return
    this.$constants.startLoader(this);
    const data = await this.$postService.getOnePostBySlug(slug)
    this.$constants.finishLoader(this);
    if (!data.success) return
    this.post = data.data
    this.emitMeta({
      author: data.data.superhuman.fullName,
      dateOfCreate: data.data.post.dateOfCreate,
      tags: data.data.post.hashtags,
      title: data.data.meta.title,
      description: data.data.meta.description,
      imageUrl: data.data.meta.imageUrl,
      imageAlt: data.data.meta.imageAlt,
      url: data.data.meta.url,
      keywords: data.data.meta.keywords,
      id: data.data.meta.id,
    })
    this.emitPageDetails({
      title: data.data.post.title,
      description: data.data.post.shortDescription,
      date: data.data.post.dateOfCreate,
      image: data.data.post.imagePath,
    })
    this.markdownUrl = this.API + data.data.post.markdownUrl
  }

  @Emit('pageDetails')
  emitPageDetails(pageDetail: PageDetail): PageDetail {
    return pageDetail
  }

  @Emit('meta')
  emitMeta(meta: PostMetaModel): PostMetaModel {
    return meta
  }

  @Watch('slug')
  handleSlug(newSlug: string): void {
    this.getPostBySlug(newSlug)
  }

  formatDate(date: string): string {
    return this.$constants.formatDate(date)
  }

  created(): void {
    this.getPostBySlug(this.slug)
  }
}
</script>

<style lang="scss">
.similar-posts {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 3rem;
  margin-bottom: 2rem;
  .ssi-similar-post {
    &:nth-child(2n) {
      p {
        justify-content: flex-end !important;
      }
    }
  }
}
.ssi-profile-card {
  margin-block: 2rem;
}
</style>
