<template>
  <div
    v-show="active"
    :id="id || label"
    class="tab-pane"
    :class="{ active: active }"
    :aria-expanded="active"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'

@Component
export default class Tab extends Vue {
  @Prop() label!: string
  @Prop() id!: string
  @Prop({ default: false }) disabled!: boolean

  @Inject('addNewTab') addNewTab!: Function
  @Inject('removeOldTab') removeOldTab!: Function

  public active: boolean = false

  mounted() {
    this.addNewTab(this)
  }

  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    this.removeOldTab(this)
  }
}
</script>

<style scoped></style>
