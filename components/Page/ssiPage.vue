<template>
  <div>
    <div
      class='page-header clear-filter'
      :class="{ 'page-header-small': headerSmall }"
      :filter-color='filterColor'
    >
      <parallax
        class='page-header-image'
        :style="
          `background-image:url(${
            !!selfHeaderImage ? selfHeaderImage : 'img/' + headerImage
          }`
        "
      >
      </parallax>
      <slot v-if='selfHeader' name='header' />
      <div v-else class='content-center'>
        <div class='container'>
          <slot v-if='!!!title' name='title' />
          <h1 v-else class='title'>{{ title }}</h1>
          <slot v-if='!!!description' name='description' />
          <div v-else class='text-center'>
            <p>{{ description }}</p>
          </div>
          <slot name='header-extra' />
        </div>
      </div>
    </div>
    <div class='section'>
      <div class='container'>
        <slot name='content' />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import Parallax from '~/components/Tools/Parallax/parallax.vue'

@Component({
  components: {
    Parallax
  }
})
export default class SsiPage extends Vue {
  @Prop({ default: 'primary' }) filterColor?: string
  @Prop() title?: string
  @Prop() description?: string
  @Prop() headerImage?: string
  @Prop({ default: false }) selfHeader!: boolean
  @Prop({ default: false }) headerSmall!: boolean
  @Prop() selfHeaderImage?: string
}
</script>

<style lang='scss'>
$black-color: #2c2c2c;
@mixin linear-gradient($color1, $color2){
  background: $color1; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(90deg, $color1 , $color2); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(90deg, $color1, $color2); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(90deg, $color1, $color2); /* For Firefox 3.6 to 15 */
  background: linear-gradient(0deg, $color1 , $color2); /* Standard syntax */
}
.clear-filter {
  &:after,
  &:before {
    display: none;
  }

  &[filter-color="orange"]{
    @include linear-gradient(rgba($black-color,.20), rgba(224, 23, 3, 0.6));
  }
  &[filter-color="primary"]{
    @include linear-gradient(rgba($black-color,.20), rgba(52, 73, 94, 0.6));
  }
  &[filter-color="green"]{
    @include linear-gradient(rgba($black-color,.20), rgba(65, 184, 131, .5));
  }
  &[filter-color="orange-dark"] {
    @include linear-gradient(rgba($black-color,.60), rgba(224, 23, 3, 0.4));
  }
}
</style>
