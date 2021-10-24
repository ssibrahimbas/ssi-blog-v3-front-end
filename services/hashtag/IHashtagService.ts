import { HashtagPageModel } from "~/models/hashtag/hashtagPageModel";
import { ObjectResponseModel } from "~/models/response/objectResponseModel";

export interface IHashtagService {
    getMetaData(hashtag: string): Promise<ObjectResponseModel<HashtagPageModel>>;
}