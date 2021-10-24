<template>
  <div>
    <div
      :class="[
        { 'col-md-4': vertical && !tabNavWrapperClasses },
        { 'col-12': centered && !tabNavWrapperClasses },
        tabNavWrapperClasses,
      ]"
    >
      <ul
        class="nav"
        role="tablist"
        v-bind="$attrs"
        :class="[
          tabTypeClass,
          { 'nav-pills-icons': icons },
          { 'nav-pills': pills },
          { 'nav-tabs': !pills },
          { 'flex-column': vertical },
          { 'justify-content-center': centered },
          tabNavClasses,
        ]"
      >
        <li
          v-for="(objTab, index) in tabs"
          :key="index"
          class="nav-item active"
          data-toggle="tab"
          role="tablist"
          aria-expanded="true"
        >
          <a
            data-toggle="tab"
            role="tablist"
            :href="`#${objTab.id}`"
            :aria-expanded="objTab.active"
            class="nav-link"
            :class="{ active: objTab.active, disabled: objTab.disabled }"
            @click.prevent="activateTab(objTab)"
          >
            <tab-item-content :tab="objTab"> </tab-item-content>
          </a>
        </li>
      </ul>
    </div>
    <div
      class="tab-content"
      :class="[
        { 'tab-space': !vertical && !noContentSpace },
        'text-left',
        { 'col-md-8': vertical && !tabContentClasses },
        tabContentClasses,
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Provide,
  Prop,
  Emit,
  Watch,
} from 'vue-property-decorator'

@Component({
  components: {
    TabItemContent: Vue.component('TabItemContent', {
      props: {
        tab: Vue,
      },
      render(createElement) {
        return createElement('div', this.tab.$slots.label)
      },
    }),
  },
})
export default class Tabs extends Vue {
  @Prop({
    default: 'default',
    validator: (value: string) => {
      const acceptedValues: string[] = [
        'primary',
        'info',
        'success',
        'warning',
        'danger',
        'default',
        'neutral',
      ]
      return acceptedValues.includes(value)
    },
  })
  type!: string

  @Prop({ default: '' }) activeTab!: string
  @Prop({ default: '' }) tabNavWrapperClasses!: string | object
  @Prop({ default: '' }) tabNavClasses!: string | object
  @Prop({ default: '' }) tabContentClasses!: string | object
  @Prop() vertical!: boolean
  @Prop() noContentSpace!: boolean
  @Prop() icons!: boolean
  @Prop() value!: string
  @Prop() centered!: boolean
  @Prop({ default: true }) pills!: boolean

  @Provide('addNewTab') addNewTab = this.addTab
  @Provide('removeOldTab') removeOldTab = this.removeTab

  tabs: any[] = []

  get tabTypeClass(): string {
    const baseClass: string = this.pills ? 'pills' : 'tabs'
    if (this.type) {
      return `nav-${baseClass}-${this.type}`
    }
    return ''
  }

  findAndActivateTab(label: any): void {
    const tabToActivate = this.tabs.find((t) => t.label === label)
    if (tabToActivate) {
      this.activateTab(tabToActivate)
    }
  }

  activateTab(tab: any): void {
    if (tab.disabled) {
      return
    }
    this.deactivateTabs()
    tab.active = true
    this.emitInput(tab.label || tab.id)
  }

  @Emit('input')
  emitInput(value: any): any {
    return value
  }

  deactivateTabs(): void {
    this.tabs.forEach((tab) => {
      tab.active = false
    })
  }

  addTab(tab: any): void {
    if (!this.$slots.default) return
    const index = this.$slots.default.indexOf(tab.$vnode)
    if (!this.activeTab && index === 0) {
      tab.active = true
    }
    if (this.activeTab === tab.name) {
      tab.active = true
    }
    this.tabs.splice(index, 0, tab)
  }

  removeTab(tab: any): void {
    const tabs = this.tabs
    const index = tabs.indexOf(tab)
    if (index > -1) {
      tabs.splice(index, 1)
    }
  }

  mounted() {
    this.$nextTick(() => {
      if (this.value) {
        this.findAndActivateTab(this.value)
      }
    })
  }

  @Watch('value')
  handleValueChange(newValue: string): void {
    this.findAndActivateTab(newValue)
  }
}
</script>

<style>
.tab-content.tab-content-padding {
  padding: 20px;
}
</style>
