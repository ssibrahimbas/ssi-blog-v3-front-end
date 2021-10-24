import { SoftwareLanguageModel } from "../softwareLanguage/softwareLanguageModel";

export interface PostModel {
  id : number,
  superhumanId : number,
  title : string,
  shortDescription: string,
  slug: string,
  imagePath : string,
  hashtags: string[],
  softwareLanguages: SoftwareLanguageModel[] | null,
  markdownUrl : string,
  documentUrl : string | null,
  dateOfCreate: string,
  status : boolean
}
