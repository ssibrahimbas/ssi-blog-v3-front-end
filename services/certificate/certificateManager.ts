import axios, { AxiosInstance } from 'axios'
import { injectable } from 'inversify-props'
import { ICertificateService } from '~/services/certificate/ICertificateService'
import { ListResponseModel } from '~/models/response/listResponseModel'
import { CertificateListModel } from '~/models/certificate/certificateListModel'

@injectable()
export class CertificateManager implements ICertificateService {
    $axios : AxiosInstance = axios;

  BASE_API : string = process.env.BASE_API_URL || ''
  API : string = this.BASE_API + "/certificates"

  async getAllCertificatesBySuperhumanId(superhumanId: number = 5): Promise<ListResponseModel<CertificateListModel>> {
    const res = await this.$axios.get<ListResponseModel<CertificateListModel>>(this.API + `/GetAllBySuperhumanId?superhumanId=${superhumanId}`);
    return res.data;
  }
}
