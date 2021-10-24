<template>
  <div class="progress-container progress-base" :class="`progress-${type}`">
    <span class="progress-badge">
      <slot name="label">
        {{ label }}
      </slot>
    </span>
    <div class="progress" :style="`height: ${height}px`">
      <div
        class="progress-bar"
        :class="computedClasses"
        role="progressbar"
        :aria-valuenow="value"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="`width: ${value}%;`"
      >
        <slot>
          <span v-if="showValue" class="progress-value" > {{ value }}% </span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component
export default class Progress extends Vue {
  @Prop({default: false}) striped! : boolean
  @Prop({default: false}) showValue! : boolean
  @Prop({default: false}) animated! : boolean
  @Prop() label? : string
  @Prop({default: 1}) height! : number
  @Prop({default: 'default'}) type! : string
  @Prop({default: 0}) value! : number

  get computedClasses() : object[] {
    return [
      { 'progress-bar-striped': this.striped },
      { 'progress-bar-animated': this.animated }
    ];
  }
}

</script>

<style scoped>

</style>
