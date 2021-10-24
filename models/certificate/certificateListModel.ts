import { CertificateModel } from '~/models/certificate/certificateModel'
import { OrganizationModel } from '~/models/organization/organizationModel'

export interface CertificateListModel {
  certificate : CertificateModel,
  organization : OrganizationModel
}
