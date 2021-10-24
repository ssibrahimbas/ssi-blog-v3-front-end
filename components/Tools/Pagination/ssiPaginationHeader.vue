<template>
  <div class="ssi-pagination-header">
    <p v-if="totalRow > 0" class="text-muted text-center">
      {{ betweenMessage }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class SsiPaginationHeader extends Vue {
  @Prop({ required: true }) totalRow!: number
  @Prop({ required: true }) activePage!: number
  @Prop({ required: true }) rowPerPage!: number
  @Prop({ required: false, default: 'yazı' }) type!: string

  betweenMessage: string = ''

  calculateActiveRowBetween(
    totalRow: number,
    activePage: number,
    rowPerPage: number
  ): void {
    let activeBetweenStart: number = rowPerPage * (activePage - 1)
    if (activeBetweenStart === 0) {
      activeBetweenStart = 1
    }
    let activeBetweenEnd: number = rowPerPage * activePage
    if (activeBetweenEnd > totalRow) {
      activeBetweenEnd = totalRow
    }
    this.betweenMessage =
      totalRow +
      ' ' +
      this.type +
      ' arasından ' +
      activeBetweenStart +
      ' - ' +
      activeBetweenEnd +
      ' arası gösteriliyor'
  }

  @Watch('totalRow')
  handleTotalRow(newValue: number): void {
    this.calculateActiveRowBetween(newValue, this.activePage, this.rowPerPage)
  }

  @Watch('activePage')
  handleActivePage(newValue: number): void {
    this.calculateActiveRowBetween(this.totalRow, newValue, this.rowPerPage)
  }

  @Watch('rowPerPage')
  handleRowPerPage(newValue: number): void {
    this.calculateActiveRowBetween(this.totalRow, this.activePage, newValue)
  }

  created(): void {
    this.calculateActiveRowBetween(
      this.totalRow,
      this.activePage,
      this.rowPerPage
    )
  }
}
</script>

<style scoped>
.ssi-pagination-header {
  margin-bottom: 2rem;
}
</style>
