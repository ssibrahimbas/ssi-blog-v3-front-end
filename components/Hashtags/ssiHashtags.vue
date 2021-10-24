<template>
  <div class="ssi-hashtags">
    <NuxtLink
      v-for="(hashtag, index) in hashtags"
      :key="index"
      class="ssi-hashtag"
      :to="'/yazilar/' + hashtag"
    >
      #{{ hashtag }}
    </NuxtLink>
  </div>
</template>

<script lang='ts'>
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component
export default class SsiHashtags extends Vue {

  @Prop()
  hashtags!: string[]
}
</script>

<style lang='scss' scoped>
$hashtag-bg: #f5f5f5;
$hashtag-opacity: rgba(245, 245, 245, 0.7);
$hashtag-color: #34495E;
$hashtag-hover: #41B883;

.ssi-hashtags {
  width: 100%;
  margin-top: 0.3rem;
  .ssi-hashtag {
    transition: all .5s;
    background-color: $hashtag-bg;
    color: $hashtag-color;
    padding: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    &:not(:last-child) {
      margin-right: 0.5rem;
    }
    &:hover {
      background-color: $hashtag-opacity;
      color: $hashtag-hover;
    }
  }
}
</style>
