import POSTS from './posts'
import {getFullName} from "@/store/utils";

// для удобства обращения к модулям, созаем именованный роут
const FN_POSTS = getFullName(POSTS)

export {
    //обращаемся к константам внутри модуля
    POSTS,
    //используем именованный путь
    FN_POSTS
}