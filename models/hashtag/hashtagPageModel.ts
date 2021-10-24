import { MetaModel } from "../meta/metaModel";
import { HashtagModel } from "./hashtagModel";

export interface HashtagPageModel {
    hashtag : HashtagModel;
    meta : MetaModel;
}