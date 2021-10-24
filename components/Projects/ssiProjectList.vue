<template>
  <div v-if="projects.length > 0" class="ssi-projects">
    <SsiSearch
      :searched="!all"
      @search:ssi="searchProject"
      @reset:ssi="resetSearch"
    />
    <ssi-pagination-header
      :active-page="activePage"
      :row-per-page="rowPerPage"
      :total-row="fitRows"
      type="proje"
    ></ssi-pagination-header>
    <div class="ssi-project-list">
      <ssi-project-list-item
        v-for="(project, index) in projects"
        :key="index"
        :project="project"
      />
    </div>
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
import { Component, Vue, Watch } from 'vue-property-decorator'
import { inject } from 'inversify-props'
import Pagination from '~/components/Tools/Pagination/pagination.vue'
import SsiProjectListItem from '~/components/Projects/ssiProjectListItem.vue'
import { IProjectService } from '~/services/project/IProjectService'
import { ProjectListModel } from '~/models/project/projectListModel'
import { PaginationModel } from '~/models/response/paginationModel'
import SsiPaginationHeader from '~/components/Tools/Pagination/ssiPaginationHeader.vue'
import { PaginationResponseModel } from '~/models/response/paginationResponseModel'
import SsiSearch from '~/components/Tools/Search/ssiSearch.vue'
import { IConstants } from '~/constants/IConstants'

@Component({
  components: {
    Pagination,
    SsiProjectListItem,
    SsiPaginationHeader,
    SsiSearch,
  },
})
export default class SsiProjectList extends Vue {
  @inject('IProjectService') private $projectService!: IProjectService
  @inject('IConstants') private $constants!: IConstants

  projects: ProjectListModel[] = []
  pagination: PaginationModel = {
    prevPages: [],
    nextPages: [],
  }

  all: boolean = true
  activePage: number = 0
  rowPerPage: number = 10
  fitRows: number | undefined = 0
  totalRows: number = 0
  pageCount: number = 0
  superhumanId: number = 5
  searchText: string = ''
  searched: boolean = false

  async getAllProjects(page: number, rows: number): Promise<void> {
    this.$constants.startLoader(this)
    const data = await this.$projectService.getAllProjectsBySuperhumanId(
      this.superhumanId,
      page,
      rows
    )
    this.$constants.finishLoader(this)
    if (!data.success) return
    this.setProjectDetail(data, false)
  }

  async searchProject(
    searchText: string,
    page: number | undefined = 1,
    row: number | undefined = 10
  ): Promise<void> {
    if (!searchText) {
      if (!this.all) {
        return this.getAllProjects(1, this.rowPerPage)
      }
      return
    }
    this.searchText = searchText
    this.$constants.startLoader(this)
    const data = await this.$projectService.getAllProjectsBySearchValue(
      searchText,
      page,
      row
    )
    this.$constants.finishLoader(this)
    if (!data.success) return
    this.setProjectDetail(data, true)
  }

  setProjectDetail(
    projectDetail: PaginationResponseModel<ProjectListModel>,
    isSearched: boolean
  ): void {
    this.projects = projectDetail.data.result
    this.pagination = projectDetail.data.pagination
    this.activePage = projectDetail.data.page
    this.fitRows = projectDetail.data.fitRows
    this.all = !isSearched
    this.totalRows = projectDetail.data.rows
    this.calculatePageCount()
  }

  calculatePageCount(): void {
    let rate: number = this.totalRows / this.rowPerPage
    if (rate === 0 && this.totalRows > 0) {
      rate = 1
    }
    this.pageCount = Math.ceil(rate)
  }

  resetSearch(): void {
    this.getAllProjects(1, this.rowPerPage)
    this.all = true
  }

  @Watch('activePage')
  handlePageChange(page: number): void {
    if (!this.all) {
      this.searchProject(this.searchText, page, this.rowPerPage)
    } else {
      this.getAllProjects(page, this.rowPerPage)
    }
  }

  created(): void {
    this.getAllProjects(this.activePage + 1, this.rowPerPage)
  }
}
</script>

<style lang="scss" scoped>
.ssi-projects {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  width: 80%;
  margin-inline: auto;
  .ssi-pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
