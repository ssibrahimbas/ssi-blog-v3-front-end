<template>
  <ssi-tooltip
    :title="tooltipText"
    classes="text-primary ssi-badge"
    @click:ssi="clickEmit"
  >
    <img
      v-if="!isIcon"
      :src="API + imageUrl"
      :alt="title"
      class="ssi-badge-image"
      :class="{ raised: imageRaised }"
      :width="imageWidth"
      :height="imageHeight"
    />
    <i v-else :class="icon"></i>
    <span v-if="isText" class="ssi-badge-title">
      {{ title }}
    </span>
  </ssi-tooltip>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import SsiTooltip from '~/components/Tools/Tooltip/ssiTooltip.vue'

@Component({
  components: {
    SsiTooltip,
  },
})
export default class SsiBadge extends Vue {
  @Prop({ required: false, default: false }) isIcon!: boolean
  @Prop({ required: false, default: false }) isText!: boolean
  @Prop({ required: false }) title!: string
  @Prop({ required: false }) imageUrl!: string
  @Prop({ required: false }) icon!: string
  @Prop({ required: true }) tooltipText!: string
  @Prop({ required: false, default: 36 }) imageWidth!: number | string
  @Prop({ required: false, default: 36 }) imageHeight!: number | string
  @Prop({ required: false, default: true }) imageRaised!: boolean

  API: string = process.env.BASE_STATIC_API_URL || ''

  @Emit('click:ssi')
  clickEmit(): void {}
}
</script>

<style scoped></style>
