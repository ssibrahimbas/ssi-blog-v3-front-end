import axios, { AxiosInstance } from 'axios'
import { injectable } from 'inversify-props'
import { IProjectService } from '~/services/project/IProjectService'
import { PaginationResponseModel } from '~/models/response/paginationResponseModel'
import { ProjectListModel } from '~/models/project/projectListModel'

@injectable()
export class ProjectManager implements IProjectService {
  $axios: AxiosInstance = axios;

  BASE_API: string = process.env.BASE_API_URL || ''
  API: string = this.BASE_API + "/projects"

  async getAllProjectsBySuperhumanId(superhumanId: number, page: number, rows: number): Promise<PaginationResponseModel<ProjectListModel>> {
    const res = await this.$axios.get<PaginationResponseModel<ProjectListModel>>(this.API + `/GetAllBySuperhumanId?superhumanId=${superhumanId}&page=${page}&rows=${rows}`);
    return res.data;
  }

  async getAllProjectsBySuperhumanIdAndIsOpenSource(superhumanId: number, page: number, rows: number): Promise<PaginationResponseModel<ProjectListModel>> {
    const res = await this.$axios.get<PaginationResponseModel<ProjectListModel>>(this.API + `/GetAllBySuperhumanIdAndOpenSource?superhumanId=${superhumanId}&page=${page}&rows=${rows}`);
    return res.data;
  }

  async getAllProjectsBySearchValue(searchValue: string, page: number, rows: number): Promise<PaginationResponseModel<ProjectListModel>> {
    const res = await this.$axios.get<PaginationResponseModel<ProjectListModel>>(this.API + `/GetAllBySearchValue?searchValue=${searchValue}&page=${page}&rows=${rows}`)
    return res.data;
  }

  async getAllProjectsBySoftwareLanguage(softwareLanguage: number, page: number, rows: number): Promise<PaginationResponseModel<ProjectListModel>> {
    const res = await this.$axios.get<PaginationResponseModel<ProjectListModel>>(this.API + `/GetAllBySoftwareLanguage?softwareLanguage=${softwareLanguage}&page=${page}&rows=${rows}`)
    return res.data;
  }

  async getAllProjectsBySuperhumanIdAndSoftwareLanguageAndIsOpenSource(superhumanId: number, softwareLanguage: number, page: number, rows: number): Promise<PaginationResponseModel<ProjectListModel>> {
    const res = await this.$axios.get<PaginationResponseModel<ProjectListModel>>(this.API + `/GetAllBySuperhumanIdAndSoftwareLanguageAndOpenSource?superhumanId=${superhumanId}&softwareLanguage=${softwareLanguage}&page=${page}&rows=${rows}`)
    return res.data;
  }
}
