<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card :disabled="loading">
          <v-card-title>
            <h3>{{id ? 'Редактирование' : 'Создание'}} статьи</h3>
          </v-card-title>

          <v-card-text>
            <v-text-field
                :loading="loading"
                outlined
                placeholder="Введите название статьи"
                hide-details
                dense
                v-model="article_name"
            />
          </v-card-text>

          <v-card-actions>
            <v-btn
                outlined
                :disabled="!article_name"
                color="primary"
                @click="inputData"
            >
              Сохранить
            </v-btn>
            <v-btn
                outlined
                :disabled="!article_name"
                color="primary"
                :to="{name: 'articles'}"
            >
              Отмена
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {FN_POSTS} from "@/store/consts";

export default {
  name: "ArticlesEdit",

  data() {
    return {
      article_name: "",
      loading: false
    }
  },

  mounted() {
    this.fetchData()
  },

  computed: {
    ...mapGetters({
      articleData: FN_POSTS.GET_POST_DATA
    }),
    id() {
      return this.$route.params.id
    }
  },

  methods: {
    ...mapActions({
      fetchArticles: FN_POSTS.FETCH_POSTS_DATA,
      fetchArticle: FN_POSTS.FETCH_POST_DATA,
      updateArticle: FN_POSTS.UPDATE_POST_DATA,
      createArticle: FN_POSTS.STORE_POST_DATA,
    }),
    async fetchData() {
      if (!this.id) {
        return;
      }

      this.loading = true
      await this.fetchArticle(this.id)
      this.article_name = this.articleData.data.name
      this.loading = false
    },
    async inputData() {
      if (this.article_name) {
        this.loading = true
        const data = {
          name: this.article_name
        }
        this.id
            ? await this.updateArticle({id: this.id, data})
            : await this.createArticle(data)
        this.loading = false
      }
      this.$router.push({name: 'articles'})
    }
  }
}
</script>