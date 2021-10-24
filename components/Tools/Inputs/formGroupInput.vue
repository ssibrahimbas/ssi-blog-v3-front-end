<template>
  <div
    class="form-group"
    :class="[
      { 'input-group': hasIcon },
      { 'has-danger': error },
      { 'input-group-focus': focused },
      { 'has-label': label || $slots.label }
    ]"
  >
    <slot name="label">
      <label v-if="label" class="control-label" :class="labelClasses">
        {{ label }}
        <span v-if="required">*</span>
      </label>
    </slot>

    <div :class="[{ 'input-group': hasIcon }]">
      <slot name="addonLeft">
        <div v-if="addonLeftIcon" class="input-group-prepend">
          <i class="input-group-text" :class="addonLeftIcon"></i>
        </div>
      </slot>
      <slot>
        <input
          :value="value"
          v-bind="$attrs"
          class="form-control"
          :class="[{ valid: value && !error }, inputClasses]"
          aria-describedby="addon-right addon-left"
          v-on="listeners"
        />
      </slot>
      <slot name="addonRight">
        <span
          v-if="addonRightIcon"
          class="input-group-addon input-group-append"
        >
          <i class="input-group-text" :class="addonRightIcon"></i>
        </span>
      </slot>

      <slot name="infoBlock"></slot>
    </div>
    <slot name="helpBlock">
      <div
        v-if="error"
        class="text-danger invalid-feedback"
        style="display: block;"
        :class="{ 'mt-2': hasIcon }"
      >
        {{ error }}
      </div>
    </slot>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class FormGroupInput extends Vue {
  @Prop({default : false})
  required?: boolean

  @Prop()
  label! : string

  @Prop()
  error? : string

  @Prop()
  labelClasses? : string

  @Prop()
  inputClasses? : string

  @Prop({default : ''})
  value! : string

  @Prop()
  addonRightIcon? : string

  @Prop()
  addonLeftIcon? : string

  focused : boolean = false;

  get listeners() {
    return {
      ...this.$listeners,
      input: this.updateValue,
      focus: this.onFocus,
      blur: this.onBlur
    }
  }

  get hasIcon(){
    const {addonRight, addonLeft} = this.$slots;
    return (
      addonRight !== undefined ||
      addonLeft !== undefined ||
      this.addonRightIcon !== undefined ||
      this.addonLeftIcon !== undefined
    );
  }

  @Emit("input")
  updateValue(event : { target: HTMLInputElement }) : string {
    return event.target.value;
  }

  @Emit("focus")
  onFocus(value : any) : any {
    this.focused = true;
    return value;
  }

  @Emit("blur")
  onBlur(value : any) : any {
    this.focused = false;
    return value;
  }

}
</script>

<style scoped>

</style>
