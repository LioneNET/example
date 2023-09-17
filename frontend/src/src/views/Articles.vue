<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h3>Статьи</h3>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12" style="position: sticky; top: 0; z-index: 2; background-color: white;">
                  <v-text-field
                      outlined
                      placeholder="Введите название статьи"
                      hide-details
                      dense
                      @input.native="onSearch"
                      :loading="loading"
                  >
                    <template v-slot:append-outer>
                      <v-btn
                          height="40"
                          style="margin-top: -8px;"
                          outlined
                          color="primary"
                          :to="{name: 'create'}"
                      >
                        Добавить
                      </v-btn>
                    </template>
                  </v-text-field>
              </v-col>

              <v-col cols="12">
                <v-data-table
                    :loading="loading"
                    :headers="headers"
                    :items="articlesData.data"
                    :server-items-length="articlesData.meta.total"
                    :page="articlesData.meta.current_page"
                    :items-per-page="parseInt(articlesData.meta.per_page)"
                    :options.sync="options"
                    :footer-props="{
                      'items-per-page-options': [10],
                    }"
                >
                  <template v-slot:item.actions="{item}">
                    <div class="d-flex justify-end">
                      <v-btn icon small color="primary" :to="{ name: 'edit', params: {id: item.id} }">
                        <v-icon small>mdi mdi-file-edit-outline</v-icon>
                      </v-btn>
                      <v-btn icon class="ml-2" small color="error" @click="delete_id = item.id">
                        <v-icon small>mdi-close</v-icon>
                      </v-btn>
                    </div>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <ConfirmationDialog
        v-if="delete_id"
        @close="delete_id = false"
    >
      <h3 class="pt-3 text-center">Вы действительно хотите удалить эту статью?</h3>
      <template v-slot:action>
        <v-btn outlined small color="primary" @click="onDelete">Подтвердить</v-btn>
      </template>
    </ConfirmationDialog>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {FN_POSTS} from "@/store/consts";
import ConfirmationDialog from "@/components/ConfirmationDialog";

export default {
  name: "Articles",
  components: {ConfirmationDialog},
  data() {
    return {
      loading: false,
      delete_id: false,
      search_text: "",
      options: {},
      headers: [
        {
          text: "ИД",
          value: "id",
          sortable: false,
          width: 80
        },
        {
          text: "Заколовок",
          value: "name",
          sortable: false,
        },
        {
          text: "",
          value: "actions",
          sortable: false,
          width: 337
        }
      ]
    }
  },

  watch: {
    options: {
      handler() {
        this.fetchData();
      },
      deep: true,
    },
  },

  computed: {
    ...mapGetters({
      articlesData: FN_POSTS.GET_POSTS_DATA
    })
  },

  methods: {
    ...mapActions({
      fetchArticles: FN_POSTS.FETCH_POSTS_DATA,
      deleteArticle: FN_POSTS.DELETE_POST_DATA,
    }),

    onSearch({target}) {
      clearTimeout(this.IDtimer)
      this.IDtimer = setTimeout(() => {
        this.search_text = target.value
        this.fetchData()
      }, 400)
    },

    async fetchData() {
      this.loading = true
      await this.fetchArticles({
        name: this.search_text,
        page: this.options.page
      })
      this.loading = false
    },

    async onDelete() {
      this.loading = true;
      await this.deleteArticle(this.delete_id)
      await this.fetchData()
      this.delete_id = false
      this.loading = false;
    }
  }
}
</script>

<style scoped>

</style>