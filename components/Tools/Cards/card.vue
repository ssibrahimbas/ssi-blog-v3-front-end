<template>
  <div
    class="card"
    :class="[
      { 'card-plain': plain },
      { 'card-raised': raised },
      { [`card-${type}`]: type }
    ]"
    :data-background-color="color"
  >
    <h6 v-if="$slots.category || category" class="card-category">
      {{ category }}
    </h6>
    <div v-if="$slots.image" class="card-image">
      <slot name="image"></slot>
    </div>

    <div v-if="$slots.avatar" class="card-avatar">
      <slot name="avatar"></slot>
    </div>

    <div v-if="$slots.info" class="info">
      <slot name="info"></slot>
    </div>

    <div
      v-if="$slots.header || title"
      class="card-header"
      :class="headerClasses"
    >
      <slot name="header">
        <h1 v-if="title" class="card-title">{{ title }}</h1>
        <h3 v-if="subTitle" class="card-category">{{ subTitle }}</h3>
        <p v-if="description" class="card-description">{{ description }}</p>
      </slot>
    </div>
    <div v-if="$slots.default" class="card-body" :class="cardBodyClasses">
      <slot></slot>
    </div>

    <slot name="raw-content"></slot>

    <hr v-if="$slots.footer && !noFooterLine" />
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Card extends Vue {

  @Prop()
  type?: string

  @Prop()
  title!: string

  @Prop()
  subTitle!: string

  @Prop()
  category?: string

  @Prop()
  color?: string

  @Prop()
  description! : string

  @Prop({default: false})
  noFooterLine? : boolean

  @Prop({default: false})
  plain? : boolean

  @Prop({default: false})
  raised? : boolean

  @Prop()
  cardBodyClasses : string | object | string[] | undefined

  @Prop()
  headerClasses : string | object | string[] | undefined

}
</script>

<style scoped>

</style>
