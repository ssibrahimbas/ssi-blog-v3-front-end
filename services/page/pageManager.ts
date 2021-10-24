import axios, { AxiosInstance } from 'axios'
import { injectable } from 'inversify-props'
import { IPageService } from '~/services/page/IPageService'
import { ObjectResponseModel } from '~/models/response/objectResponseModel'
import { PageModel } from '~/models/page/pageModel'

@injectable()
export class PageManager implements IPageService {
  $axios : AxiosInstance = axios;

  BASE_API: string = process.env.BASE_API_URL || ''
  API: string = this.BASE_API + '/pages'

  async getPageById(Id: number): Promise<ObjectResponseModel<PageModel>> {
    const data = await this.$axios.get<ObjectResponseModel<PageModel>>(`${this.API}/getbyId?Id=${Id}`);
    return data.data;
  }

  async getPageByName(name: string): Promise<ObjectResponseModel<PageModel>> {
    const data = await this.$axios.get<ObjectResponseModel<PageModel>>(`${this.API}/getByName?name=${name}`);
    return data.data;
  }
}
