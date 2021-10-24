import { MetaModel } from '~/models/meta/metaModel'
import { SoftwareLanguageModel } from "~/models/softwareLanguage/softwareLanguageModel";

export interface SoftwareLanguageDetailModel {
    softwareLanguage: SoftwareLanguageModel,
    meta: MetaModel,
}