<template>
  <div
    class="form-check form-check-radio"
    :class="[inlineClass, { disabled: disabled }]"
  >
    <label :for="cbId" class="form-check-label">
      <input
        :id="cbId"
        v-model="model"
        class="form-check-input"
        type="radio"
        :disabled="disabled"
        :value="label"
      />
      <span class="form-check-sign"> </span>
      <slot></slot>
    </label>
  </div>
</template>

<script lang='ts'>
import {Vue, Component, Prop, Emit} from 'vue-property-decorator'

@Component
export default class Radio extends Vue {
  @Prop()
  label! : string | number

  @Prop({default: false})
  disabled? : boolean

  @Prop()
  value! : string | number

  @Prop({default: false})
  inline? : boolean

  cbId : string = '';

  get model() : string | number {
    return this.value;
  }

  set model(value : string | number) {
    this.emitModel(value);
  }

  @Emit("input")
  emitModel(value : string | number) : string | number {
    return value;
  }

  get inlineClass() : string {
    if(this.inline) {
      return 'form-check-inline';
    }
    return '';
  }

  created(){
    this.cbId = Math.random()
      .toString(16)
      .slice(2);
  }
}
</script>

<style scoped>

</style>
