import Vue from 'vue'
import Vuex from 'vuex'
import posts from '@/store/modules/post_module'
import {
    POSTS
} from "@/store/consts";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        [POSTS.NAME]: posts
    }
})
