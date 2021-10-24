<template>
  <div
    class="item"
    :class="classes"
    data-toggle="tooltip"
    :data-placement="placement"
    :title="title"
    @click="clickEmit"
  >
    <i v-if="icon" class="now-ui-icons" :class="icon"></i>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class SsiTooltip extends Vue {
  @Prop({ required: true }) title!: string
  @Prop({ required: false }) icon!: string
  @Prop({ required: false, default: 'ssi-open-source-badge text-primary' }) classes!: string | object | object[]
  @Prop({ required: false, default: 'top' }) placement!: string

  @Emit("click:ssi")
  clickEmit() : void {};
}
</script>

<style scoped></style>
