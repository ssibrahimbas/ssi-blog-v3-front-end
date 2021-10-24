<template>
  <div :style="styles">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator'

function debounce(func : any, wait : number, immediate : any | undefined) {
  let timeout : any;
  return function() {
    const context = window
    const args = arguments
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

@Component
export default class Parallax extends Vue {
  styles : object = {};
  debounceTimeout : number = 6;

  handleScroll(scrollVal : number) {
    const oVal : number = scrollVal / 3;
    this.styles = {
      transform: `translate3d(0, ${oVal}px,0)`
    };
  }

  checkForParallax(scrollVal : number) {
    const fn = debounce(
      () => this.handleScroll(scrollVal),
      this.debounceTimeout, null
    );
    fn();
  }

  mounted() {
    const self = this;
    window.addEventListener('scroll', function() {
      const scrollVal = this.scrollY;
      self.checkForParallax(scrollVal);
    });
  }

}
</script>

<style scoped>

</style>
