<template>
  <ssi-showcase-card
    :image-url="post.post.imagePath"
    :image-alt="post.post.slug"
    :title="post.post.title"
    :description="post.post.shortDescription"
    :date-text="calculateDate(post.post.dateOfCreate)"
    :comments-text="`${post.countOfEvaluations} yorum`"
    :url="`/yazi/${post.post.slug}`"
    :superhuman="post.superhuman"
    :hashtags="post.post.hashtags"
    :software-languages="post.post.softwareLanguages"
  />
</template>

<script lang='ts'>
import "reflect-metadata";
import {Component, Vue, Prop} from 'vue-property-decorator'
import { inject } from 'inversify-props'
import { PostListModel } from '~/models/post/postListModel'
import { IConstants } from '~/constants/IConstants'
import SsiShowcaseCard from '~/components/Tools/Cards/ssiShowcaseCard.vue'

@Component({
  components: {
    SsiShowcaseCard
  }
})
export default class SsiPostListItem extends Vue {
  @Prop() post! : PostListModel

  @inject("IConstants") private $constants! : IConstants

  calculateDate(stringDate : string) : string {
    const date = new Date(stringDate)
    return `${date.getDate() + 1} ${this.$constants.months[date.getMonth()]} ${date.getUTCFullYear()}, ${this.$constants.days[date.getDay()]}`
  }
}
</script>

<style scoped>

</style>
