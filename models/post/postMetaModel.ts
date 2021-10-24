import { MetaModel } from "../meta/metaModel";

export interface PostMetaModel extends MetaModel {
    author: string,
    dateOfCreate: string,
    tags: string[]
}