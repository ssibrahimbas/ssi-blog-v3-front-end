<template>
  <ul class="pagination" :class="paginationClass">
    <li
      class="page-item prev-page"
      :class="[{ disabled: value === 1 }, prevItemClasses]"
    >
      <a class="page-link" aria-label="Previous" @click="prevPage">
        <slot name="prev">»</slot>
      </a>
    </li>
    <li
      v-for="item in range(minPage, maxPage)"
      :key="item"
      class="page-item"
      :class="[{ active: value === item }, itemClasses]"
    >
      <a class="page-link" @click="changePage(item)">{{ item }}</a>
    </li>
    <li
      class="page-item page-pre next-page"
      :class="[{ disabled: value === totalPages }, nextItemClasses]"
    >
      <a class="page-link" aria-label="Next" @click="nextPage">
        <slot name="next">»</slot>
      </a>
    </li>
  </ul>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'

@Component
export default class Pagination extends Vue {
  @Prop({default: 'primary'}) type! : string
  @Prop({default: 0}) pageCount!: number
  @Prop({default : 10}) perPage! : number
  @Prop({default : 0}) total! : number
  @Prop({default : 1}) value! : number
  @Prop() prevItemClasses? : string | object
  @Prop() itemClasses? : string | object
  @Prop() nextItemClasses? : string | object

  get paginationClass() : string {
    return `pagination-${this.type}`;
  }

  get totalPages() : number {
    if (this.pageCount > 0) return this.pageCount;
    if (this.total > 0) {
      return Math.ceil(this.total / this.perPage);
    }
    return 1;
  }

  get pagesToDisplay() : number {
    if (this.totalPages > 0 && this.totalPages < this.defaultPagesToDisplay) {
      return this.totalPages;
    }
    return this.defaultPagesToDisplay;
  }

  get minPage(): number {
    if (this.value >= this.pagesToDisplay) {
      const pagesToAdd = Math.floor(this.pagesToDisplay / 2);
      const newMaxPage = pagesToAdd + this.value;
      if (newMaxPage > this.totalPages) {
        return this.totalPages - this.pagesToDisplay + 1;
      }
      return this.value - pagesToAdd;
    } else {
      return 1;
    }
  }

  get maxPage() : number {
    if (this.value >= this.pagesToDisplay) {
      const pagesToAdd = Math.floor(this.pagesToDisplay / 2);
      const newMaxPage = pagesToAdd + this.value;
      if (newMaxPage < this.totalPages) {
        return newMaxPage;
      } else {
        return this.totalPages;
      }
    } else {
      return this.pagesToDisplay;
    }
  }

  defaultPagesToDisplay: number = 5;

  range(min: number, max : number) : number[] {
    const arr : number[] = [];
    for (let i = min; i <= max; i++) {
      arr.push(i);
    }
    return arr;
  }

  changePage(item: any) : void {
    this.emitInput(item);
  }

  nextPage() : void {
    if (this.value < this.totalPages) {
      this.emitInput(this.value + 1);
    }
  }

  prevPage() : void {
    if (this.value > 1) {
      this.emitInput(this.value - 1);
    }
  }

  @Emit('input')
  emitInput(value : number) : number {
    return value;
  }

  @Watch("perPage")
  handlePerPageChange() {
    this.emitInput(1);
  }

  @Watch("total")
  handleTotalChange() {
    this.emitInput(1);
  }

}
</script>

<style scoped>

</style>
