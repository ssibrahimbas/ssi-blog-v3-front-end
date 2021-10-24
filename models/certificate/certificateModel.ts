export interface CertificateModel {
  id : number,
  superhumanId : number,
  organizationId : number,
  title : string,
  dateOfReceipt: string,
  dateOfExpiration : string,
  isExpirationDate : boolean,
  qualificationIdentity : string,
  qualificationUrl : string,
  documentUrl : string
}
