<template lang="md">
    <div v-html="$md.render(markdownText)"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'

@Component
export default class SsiMarkdown extends Vue {
  @Prop({ required: false, default: false }) calculateReadTime!: boolean
  @Prop({ required: true }) url!: string

  markdownText: string = ''

  wordsPerMinute: number = 260
  markdownFilterRegex: RegExp = /\w+/g

  async getMarkdown(): Promise<void> {
    const res = await fetch(this.url)
    this.markdownText = await res.text()
  }

  calculateReadingTime(content: string): void {
    if (!content) return
    const wordCount: number = content.split(this.markdownFilterRegex).length
    this.emitReadingTime(Math.ceil(wordCount / this.wordsPerMinute))
  }

  @Emit('readingTime')
  emitReadingTime(readingTime: number): number {
    return readingTime
  }

  @Watch('url')
  handleUrl(newUrl: string): void {
    if (newUrl) {
      this.getMarkdown()
    }
  }

  @Watch('markdownText')
  handleMarkdownText(text: string): void {
    if (!this.calculateReadTime) return
    this.calculateReadingTime(text)
  }

  created(): void {
    if (this.url) {
      this.getMarkdown()
    }
  }
}
</script>

<style scoped></style>
