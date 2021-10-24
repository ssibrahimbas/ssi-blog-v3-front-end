<template>
  <div v-if="posts.length > 0" id="carousel" class="section">
    <h2 class="title text-center">Son Yazılar</h2>
    <div class="container">
      <div class="row justify-content-center">
        <b-carousel
          id="carousel-fade"
          style="text-shadow: 0px 0px 2px #000"
          fade
          indicators
          controls
          img-width="1024"
          img-height="480"
        >
          <nuxt-link
            v-for="(post, index) in posts"
            :key="index"
            :to="'/yazi/' + post.post.slug"
          >
            <b-carousel-slide
              :text="post.post.shortDescription"
              :caption="post.post.title"
              :img-src="API + post.post.imagePath"
              :img-alt="post.post.title"
            ></b-carousel-slide>
          </nuxt-link>
        </b-carousel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Component, Vue } from 'vue-property-decorator'
import { inject } from 'inversify-props'
import { PostListModel } from '@/models/post/postListModel'

import { IPostService } from '@/services/post/IPostService'
import { IConstants } from '~/constants/IConstants'

@Component({})
export default class SsiPostCarousel extends Vue {
  @inject('IPostService') private postService!: IPostService
  @inject('IConstants') private $constants!: IConstants

  posts: PostListModel[] = []
  API: string = process.env.BASE_STATIC_API_URL || ''
  page: number = 1
  rows: number = 20

  created(): void {
    this.getPosts()
  }

  async getPosts(): Promise<void> {
    this.$constants.startLoader(this)
    const data = await this.postService.getAllPosts(this.page, this.rows)
    this.$constants.finishLoader(this)
    this.posts = data.data.result
  }
}
</script>

<style lang="scss" scoped>
$secondary-color: rgba(52, 73, 94, 0.8);

.ssi-carousel-img {
  border-radius: 5px;
}
.carousel-caption {
  h5 {
    border-radius: 5px;
    padding-block: 0.5rem;
    background-color: $secondary-color;
  }
}
</style>
