<template>
    <div
      v-show="show"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      :aria-hidden="!show"
      :class="[
        { 'show d-block': show },
        { 'd-none': !show },
        { 'modal-mini': type === 'mini' }
      ]"
      @click.self="closeModal"
    >
      <div
        class="modal-dialog"
        :class="[{ 'modal-notice': type === 'notice' }, modalClasses]"
      >
        <div class="modal-content">
          <slot name="base-content">
            <div class="modal-header" :class="headerClasses">
              <slot name="close-button">
                <button
                  v-if="showClose"
                  type="button"
                  data-dismiss="modal"
                  :aria-hidden="!show"
                  class="close"
                  @click="closeModal"
                >
                  <i class="now-ui-icons ui-1_simple-remove"></i>
                </button>
              </slot>
              <slot name="header"></slot>
            </div>

            <div class="modal-body" :class="bodyClasses">
              <slot></slot>
            </div>

            <div class="modal-footer" :class="footerClasses">
              <slot name="footer"></slot>
            </div>
          </slot>
        </div>
      </div>
    </div>
</template>

<script lang='ts'>
import {Component, Vue, Prop, Emit, Watch} from "vue-property-decorator";

@Component
export default class Modal extends Vue {
  @Prop({default: false}) show! : boolean
  @Prop({default: true}) showClose! : boolean
  @Prop({default: ''}) type! : string
  @Prop() modalClasses? : object | string
  @Prop() headerClasses? : object | string
  @Prop() bodyClasses? : object | string
  @Prop() footerClasses? : object | string
  @Prop({default: 500}) animationDuration! : number

  closeModal() : void {
    this.emitUpdateShow(false);
    this.emitClose();
  }

  @Emit("update:show")
  emitUpdateShow(value : boolean) : boolean {
    return value;
  }

  @Emit('close')
  emitClose(){
    return null;
  }

  @Watch("show")
  handleShowChange(newValue : boolean) {
    if(process.server) return;
    const documentClasses = document.body.classList;
    if(newValue) {
      documentClasses.add("modal-open");
    } else {
      documentClasses.remove('modal-open');
    }
  }

}
</script>

<style>
.modal.show {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
