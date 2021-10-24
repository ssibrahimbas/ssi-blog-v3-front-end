<template>
  <component
    :is="tag"
    v-click-outside="closeDropDown"
    class="dropdown"
    :class="[
      { show: isOpen },
      { dropdown: direction === 'down' },
      { dropup: direction === 'up' },
    ]"
    aria-haspopup="true"
    :aria-expanded="isOpen"
    @click="toggleDropDown"
  >
    <slot name="title">
      <a
        class="dropdown-toggle nav-link"
        :class="{ 'no-caret': hideArrow }"
        data-toggle="dropdown"
      >
        <i :class="icon"></i>
        <span class="no-icon">{{ title }}</span>
      </a>
    </slot>
    <ul
      class="dropdown-menu"
      :class="[
        { 'dropdown-menu-right': position === 'right' },
        { show: isOpen },
      ]"
    >
      <slot></slot>
    </ul>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide, Emit } from 'vue-property-decorator'

@Component
export default class DropDown extends Vue {
  @Prop({ default: 'down' }) direction!: string
  @Prop() title!: string
  @Prop() icon!: string
  @Prop() position!: string
  @Prop() hideArrow!: string
  @Prop({ default: 'li' }) tag!: string

  isOpen: boolean = false

  @Provide('closeDropDown') closeDropDown = this.close

  toggleDropDown(): void {
    this.isOpen = !this.isOpen
    this.emitChange(this.isOpen)
  }

  close(): void {
    this.isOpen = false
    this.emitChange(this.isOpen)
  }

  @Emit('change')
  emitChange(value: boolean): boolean {
    return value
  }
}
</script>

<style scoped>
.dropdown {
  list-style-type: none;
}

.dropdown .dropdown-toggle {
  cursor: pointer;
}
</style>
