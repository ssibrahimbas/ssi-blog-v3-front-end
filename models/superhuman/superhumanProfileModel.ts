import { MetaModel } from '~/models/meta/metaModel'

export interface SuperhumanProfileModel {
  meta: MetaModel;
  fullName: string;
  about: string;
  description: string;
  profileImage: string;
  dateOfBirth: string;
}