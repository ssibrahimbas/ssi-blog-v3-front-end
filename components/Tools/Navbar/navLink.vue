<template>
  <component
    :is="componentType"
    :to="to"
    class="dropdown-item"
    @click.native.stop="closeNav"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'

@Component
export default class NavLink extends Vue {
  @Prop({ default: undefined })
  to?: string | undefined

  @Inject()
  closeNavbar?: Function

  @Inject()
  closeDropDown?: Function

  get componentType(): string {
    return this.to ? 'nuxtLink' : 'a'
  }

  closeNav(): void {
    if (this.closeNavbar) {
      this.closeNavbar()
    }
    if (this.closeDropDown) {
      this.closeDropDown()
    }
  }
}
</script>

<style scoped></style>
