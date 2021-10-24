import { ListResponseModel } from '~/models/response/listResponseModel'
import { CertificateListModel } from '~/models/certificate/certificateListModel'

export interface ICertificateService {
  getAllCertificatesBySuperhumanId(superhumanId : number) : Promise<ListResponseModel<CertificateListModel>>;
}
