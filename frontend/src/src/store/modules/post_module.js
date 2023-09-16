import {POSTS} from '@/store/consts'
import jsonApi from "@/api";

export default {
    namespaced: true,

    state: {
        posts: {
            data: [],
            meta: {
                page: 1,
                per_page: "15",
                current_page: 1,
                total: 0,
            },
        },
    },

    mutations: {
        [POSTS.SET_POSTS_DATA](state, payload) {
            state.posts = payload;
        }
    },

    actions: {
        async [POSTS.FETCH_POSTS_DATA]({ commit }, data) {
            const response = await jsonApi.get('posts', data);
            commit(POSTS.SET_POSTS_DATA, response.data);
        },
    },

    getters: {
        [POSTS.GET_POSTS_DATA](state) {
            return state.posts;
        },
    }
}