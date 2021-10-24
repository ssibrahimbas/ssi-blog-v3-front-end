<template>
  <div class="ssi-search">
    <SsiSearchInput
      :search-text="searchText"
      @change:ssi="searchText = $event.target.value"
      @click:ssi="$emit('search:ssi', $event)"
    ></SsiSearchInput>
    <p v-if="searched">
      Filtreleri sıfırlamak için
      <b class="text-primary" @click="resetSearch">tıklayınız.</b>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import SsiSearchInput from './ssiSearchInput.vue'

@Component({
  components: {
    SsiSearchInput,
  },
})
export default class SsiSearch extends Vue {
  @Prop() searched!: boolean

  searchText: string = ''

  resetSearch(): void {
    this.searchText = ''
    this.emitReset()
  }

  @Emit('reset:ssi')
  emitReset(): void {}
}
</script>

<style lang="scss" scoped>
.ssi-search {
  width: 75%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2rem;
  p {
    margin-top: 1.5rem;
    cursor: default;
    text-align: center;
    .text-primary {
      cursor: pointer;
    }
    & :hover {
      opacity: 0.8;
    }
  }
}
@media screen and (max-width: 700px) {
  .ssi-searchPosts {
    width: 100%;
  }
}
</style>
