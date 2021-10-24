<template>
  <transition name="bounce">
    <div v-if="visible" class="alert" :class="[`alert-${type}`]" role="alert">
      <slot v-if="!dismissible"></slot>
      <div v-else class="container">
        <slot></slot>
        <slot name="dismiss-icon">
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="dismissAlert"
          >
            <span aria-hidden="true">
              <i class="now-ui-icons ui-1_simple-remove"></i>
            </span>
          </button>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Alert extends Vue {
  @Prop({ default: 'default' }) type!: string
  @Prop({ default: false }) dismissible!: boolean
  @Prop({ default: true }) setTimeout!: boolean
  @Prop({ default: 4000 }) expiresIn!: number
  @Prop({ default: false }) show!: boolean

  visible: boolean = false

  dismissAlert(): void {
    this.visible = false
  }

  tryAutoDismiss() {
    if (this.setTimeout) {
      setTimeout(() => {
        this.dismissAlert()
      }, this.expiresIn)
    }
  }

  created(): void {
    this.visible = this.show
    this.tryAutoDismiss()
  }

  @Watch('show')
  handleShowChange(newValue: boolean): void {
    this.visible = newValue
    this.tryAutoDismiss()
  }
}
</script>

<style lang="scss" scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s ease-out both;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse ease-in both;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
