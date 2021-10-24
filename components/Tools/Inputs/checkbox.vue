<template>
  <div class="form-check" :class="[{ disabled: disabled }, inlineClass]">
    <label :for="cbId" class="form-check-label">
      <input
        :id="cbId"
        v-model="model"
        :disabled="disabled"
        class="form-check-input"
        type="checkbox"
        @change="$emit('change', model)"
      />
      <span class="form-check-sign"></span>
      <slot>
        <span v-if="inline">&nbsp;</span>
      </slot>
      <slot name="error"></slot>
    </label>
  </div>
</template>

<script lang='ts'>
import {Component, Vue, Prop, Emit} from 'vue-property-decorator'

@Component
export default class Checkbox extends Vue {
  @Prop()
  checked! : any[] | number

  @Prop({default: false})
  disabled! : boolean

  @Prop({default: false})
  inline! : boolean

  @Prop({default: false})
  hasError! : boolean

  cbId : string = '';
  touched : boolean = false;

  get model() : any[] | number {
    return this.checked;
  }

  set model(check) {
    if(!this.touched) {
      this.touched = true;
    }
    this.emitModel(check);
  }

  @Emit("input")
  emitModel(check : any[] | number) : any[] | number {
    return check;
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
