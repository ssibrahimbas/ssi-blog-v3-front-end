import { PaginationResponseModel } from '~/models/response/paginationResponseModel'
import { ProjectListModel } from '~/models/project/projectListModel'

export interface IProjectService {
  getAllProjectsBySuperhumanId(superhumanId: number, page: number, rows: number): Promise<PaginationResponseModel<ProjectListModel>>;
  getAllProjectsBySuperhumanIdAndIsOpenSource(superhumanId: number, page: number, rows: number): Promise<PaginationResponseModel<ProjectListModel>>;
  getAllProjectsBySearchValue(searchValue: string, page: number, rows: number): Promise<PaginationResponseModel<ProjectListModel>>;
  getAllProjectsBySoftwareLanguage(softwareLanguage: number, page: number, rows: number): Promise<PaginationResponseModel<ProjectListModel>>
  getAllProjectsBySuperhumanIdAndSoftwareLanguageAndIsOpenSource(superhumanId: number, softwareLanguage: number, page: number, rows: number): Promise<PaginationResponseModel<ProjectListModel>>
}
