import POSTS from './posts'
import {getFullName} from "@/store/utils";

const FN_POSTS = getFullName(POSTS)

export {
    POSTS,
    FN_POSTS
}