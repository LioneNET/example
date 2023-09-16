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
        post: {
            data: {}
        },
    },

    mutations: {
        [POSTS.SET_POSTS_DATA](state, payload) {
            state.posts = payload;
        },
        [POSTS.SET_POST_DATA](state, payload) {
            state.post = payload;
        }
    },

    actions: {
        async [POSTS.FETCH_POSTS_DATA]({ commit }, data) {
            const response = await jsonApi.get('article', {
                params: data
            });
            commit(POSTS.SET_POSTS_DATA, response.data);
        },
        async [POSTS.FETCH_POST_DATA]({ commit }, id) {
            const response = await jsonApi.get(`article/${id}`);
            commit(POSTS.SET_POST_DATA, response.data);
        },
        async [POSTS.UPDATE_POST_DATA](_, {id, data}) {
            await jsonApi.post(`article/${id}`, {
                ...data,
                _method: "PUT"
            });
        },
        async [POSTS.STORE_POST_DATA](_, data) {
            await jsonApi.post(`article`, data);
        },
        async [POSTS.DELETE_POST_DATA](_, id) {
            await jsonApi.post(`article/${id}`, {
                _method: "DELETE"
            });
        },
    },

    getters: {
        [POSTS.GET_POSTS_DATA](state) {
            return state.posts;
        },
        [POSTS.GET_POST_DATA](state) {
            return state.post;
        },
    }
}