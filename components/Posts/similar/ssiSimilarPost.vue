<template>
  <div class="ssi-similar-post">
    <p class="text-primary ssi-link" @click="goToPostDetail">
      <i class="now-ui-icons" :class="icons[position]"></i>
      <span>{{ title }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class SsiSimilarPost extends Vue {
  @Prop() title!: string
  @Prop() slug!: string
  @Prop() position!: string

  icons: any = {
    right: 'arrows-1_minimal-right',
    left: 'arrows-1_minimal-left',
  }

  goToPostDetail(): void {
    this.$router.push({
      path: `/yazi/${this.slug}`,
    })
  }
}
</script>

<style lang="scss" scoped>
$similar-post-bg: #f5f5f5;
$similar-post-opacity: rgba(245, 245, 245, 0.7);
$similar-post-color: #212529;
$similar-post-hover: #41b883;

.ssi-similar-post {
  width: 45%;
  transition: opacity 0.3s;
  i {
    margin-right: 0.5rem;
  }
  p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
  }
  &:hover {
    opacity: 0.8;
  }
}
</style>
