<template>
  <div v-if="posts.length > 0" class="ssi-post-list">
    <SsiSearch
      :searched="searched"
      @search:ssi="searchPosts"
      @reset:ssi="resetSearch"
    ></SsiSearch>
    <ssi-pagination-header
      :active-page="activePage"
      :row-per-page="rowPerPage"
      :total-row="fitRows || totalRows"
    ></ssi-pagination-header>
    <ssi-post-list-item
      v-for="(post, index) in posts"
      :key="index"
      :post="post"
    />
    <div class="ssi-pagination">
      <pagination
        v-if="pageCount > 0"
        v-model="activePage"
        type="primary"
        :page-count="pageCount"
      >
      </pagination>
    </div>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { inject } from 'inversify-props'
import { IPostService } from '~/services/post/IPostService'
import { PostListModel } from '~/models/post/postListModel'
import { PaginationModel } from '~/models/response/paginationModel'
import Pagination from '~/components/Tools/Pagination/pagination.vue'
import SsiPostListItem from '~/components/Posts/ssiPostListItem.vue'
import SsiPaginationHeader from '~/components/Tools/Pagination/ssiPaginationHeader.vue'
import SsiSearch from '~/components/Tools/Search/ssiSearch.vue'

@Component({
  components: {
    Pagination,
    SsiPostListItem,
    SsiPaginationHeader,
    SsiSearch,
  },
})
export default class SsiPostList extends Vue {
  @Prop({ required: false }) subject!: string
  @inject('IPostService') private $postService!: IPostService

  searched: boolean = false
  posts: PostListModel[] = []

  pagination: PaginationModel = {
    nextPages: [],
    prevPages: [],
  }

  activePage: number = 0
  totalPosts: number = 0
  fitRows: number | undefined = 0
  rowPerPage: number = 20
  pageCount: number = 0
  searchText: string = ''

  async getAllPosts(page: number, row: number): Promise<void> {
    const data = await this.$postService.getAllPosts(page, row)
    if (!data.success) return
    this.posts = data.data.result
    this.activePage = data.data.page
    this.fitRows = data.data.fitRows
    this.totalPosts = data.data.rows
    this.pagination = data.data.pagination
    this.calculatePageCount()
  }

  async searchPosts(
    searchText: string,
    page: number = 1,
    row: number = this.rowPerPage
  ): Promise<void> {
    if (!searchText) return
    this.searchText = searchText
    const data = await this.$postService.getAllPostsBySearchedValue(
      searchText,
      page,
      row
    )
    if (!data.success) return
    this.searched = true
    this.posts = data.data.result
    this.activePage = data.data.page
    this.fitRows = data.data.fitRows
    this.totalPosts = data.data.rows
    this.pagination = data.data.pagination
    this.calculatePageCount()
  }

  resetSearch(): void {
    this.getAllPosts(1, this.rowPerPage)
    this.searched = false
  }

  loadPage(): void {
    if (this.subject) {
      let subject = ''
      if (this.subject.startsWith('#')) {
        subject = this.subject
      } else {
        subject = `#${this.subject}`
      }
      this.searchPosts(subject, 1, this.rowPerPage)
    } else {
      this.getAllPosts(1, this.rowPerPage)
    }
  }

  calculatePageCount(): void {
    let rate: number = this.totalPosts / this.rowPerPage
    if (rate === 0 && this.totalPosts > 0) {
      rate = 1
    }
    this.pageCount = Math.ceil(rate)
  }

  @Watch('activePage')
  handleActivePage(newPage: number): void {
    if (this.searched) {
      this.searchPosts(this.searchText, newPage, this.rowPerPage)
    } else {
      this.getAllPosts(newPage, this.rowPerPage)
    }
  }

  @Watch('subject')
  handleSubject(): void {
    this.loadPage()
  }

  created(): void {
    this.loadPage()
  }
}
</script>

<style lang="scss" scoped>
.ssi-post-list {
  width: 100%;
  display: flex;
  flex-direction: column;

  .ssi-pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
