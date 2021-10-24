<template>
  <component
    :is="tag"
    class="btn"
    :class="classes"
    :type="nativeType"
    @click="handleClick"
  >
    <span v-if="$slots.label" class="btn-label">
      <slot name="label"></slot>
    </span>
    <slot></slot>
    <span v-if="$slots.labelRight" class="btn-label btn-label-right">
      <slot name="labelRight"></slot>
    </span>
  </component>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class Button extends Vue {
  @Prop({ default: 'button' })
  tag!: string

  @Prop({ default: 'default' })
  type!: string

  @Prop({ default: 'button' })
  nativeType!: string

  @Prop({ default: false, required: false })
  round!: boolean

  @Prop({default: true, required: false })
  center!: boolean;

  @Prop({ default: false })
  simple!: boolean

  @Prop({ default: false, required: false })
  block!: boolean

  @Prop({ default: false })
  social!: boolean

  @Prop({ default: false })
  link!: boolean

  @Prop({ default: false })
  icon!: boolean

  @Prop({ default: false })
  wide!: boolean

  @Prop()
  size!: string

  get classes(): any[] {
    const btnClasses: any[] = [
      { 'btn-simple': this.simple },
      { 'btn-icon': this.icon },
      { 'btn-round': this.round },
      { 'btn-center' : this.center },
      { 'btn-block': this.block },
      { 'btn-social': this.social },
      { 'btn-link': this.link },
      { 'btn-wd': this.wide },
      `btn-${this.type}`,
    ]
    if (this.size) {
      btnClasses.push(`btn-${this.size}`)
    }
    return btnClasses
  }

  @Emit('click')
  handleClick(event: Event): Event {
    return event
  }
}
</script>

<style scoped></style>
