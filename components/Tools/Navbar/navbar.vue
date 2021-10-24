<template>
  <nav :class="classes" class="navbar">
    <div class="container">
      <div class="navbar-translate">
        <slot v-bind="slotData"></slot>
        <navbar-toggle-button
          :toggled="showMenu"
          @click.native.stop="toggle"
        ></navbar-toggle-button>
      </div>
      <div
        v-if="$slots['navbar-menu'] || $scopedSlots['navbar-menu']"
        id="navigation"
        v-click-outside="close"
        class="navbar-collapse collapse"
        :style="menuImage ? `background: url(${menuImage}) 0% 0% / cover;` : ''"
        :class="[
          { show: showMenu },
          { 'has-image': menuImage },
          navMenuClasses
        ]"
        data-color="orange"
      >
        <slot name="before-menu"></slot>
        <ul class="navbar-nav" :class="menuClasses">
          <slot name="navbar-menu" v-bind="slotData"></slot>
        </ul>
        <slot name="after-menu"></slot>
      </div>
    </div>
  </nav>
</template>

<script lang='ts'>
import {Component, Vue, Prop, Provide, Emit} from 'vue-property-decorator'
import NavbarToggleButton from "~/components/Tools/Navbar/navbarToggleButton.vue";

let resizeTimeout : any;
function resizeThrottler(actualResizeHandler : any) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

@Component({
  components: { NavbarToggleButton }
})
export default class Navbar extends Vue {
  @Prop({default: false}) transparent? : boolean
  @Prop({default: 'relative'}) position?: string
  @Prop() menuClasses? : string | object | string[] | object[]
  @Prop({default: 0}) colorOnScroll! : number
  @Prop({default: 'white'}) type? : string
  @Prop({default: ''}) navMenuClasses? : string
  @Prop({default: 'lg'}) expand? : string | boolean
  @Prop() menuImage? : string
  @Provide('CloseNavbar') closeNavbar = this.close

  showMenu : any = false;
  extraNavClasses : string = '';
  currentScrollValue : number = 0;

  get slotData() : object {
      return {
        toggle: this.toggle,
        open: this.open,
        close: this.close,
        isToggled : this.showMenu
      }
  }

  get classes() : [{ 'navbar-transparent': 0 | undefined | boolean }, { [p: string]: boolean }, string, string, string] {
    const color : string = `bg-${this.type}`;
    let navPosition : string = `navbar-${this.position}`;
    const colorOnScrollTransparent : 0 | undefined | boolean = this.colorOnScroll && this.currentScrollValue < this.colorOnScroll;
    if(this.position === 'fixed') {
      navPosition = 'fixed-top';
    }
    return [
      {
        'navbar-transparent' : this.transparent || colorOnScrollTransparent
      },
      {
        [color] : !this.transparent && this.colorOnScroll === 0
      },
      this.expand ? `navbar-expand-${this.expand}` : '',
      navPosition,
      this.extraNavClasses
    ];
  }

  setNav(value : boolean) : void {
    if(process.server) return;
    const html : HTMLElementTagNameMap["html"] | null = document.querySelector<"html">('html');
    if(!html) {
    return;
    }
    const htmlClasses : DOMTokenList = html.classList;
    if(value) {
      htmlClasses.add("nav-open");
    }else {
      htmlClasses.remove("nav-open");
    }
    const isOpen : boolean = htmlClasses.contains("nav-open");
    const eventToTrigger : string = isOpen ? 'open' : 'close';
    this.showMenu = isOpen;
    this.emitEventToTrigger(eventToTrigger);
  }

  @Emit()
  emitEventToTrigger(value : string) : string {
    return value;
  }

  toggle() : void {
    this.setNav(!this.showMenu);
  }

  open() : void {
    this.setNav(true);
  }

  close() : void {
    if(this.showMenu) {
      this.setNav(false);
    }
  }

  handleScroll() : void {
    if(process.server) return;
    const scrollValue : number = document.body.scrollTop || document.documentElement.scrollTop;
    this.currentScrollValue = scrollValue;
    if(this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
      this.extraNavClasses = `bg-${this.type}`;
    }else  if (this.extraNavClasses) {
        this.extraNavClasses = '';
      }
  }

  scrollListener() : void {
    resizeThrottler(this.handleScroll);
  }

  mounted() {
    document.addEventListener('scroll', this.scrollListener);
  }

  beforeDestroy() {
    if(process.server) return;
    document.removeEventListener('scroll', this.scrollListener);
  }

}
</script>

<style scoped>

</style>
