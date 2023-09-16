<template>
  <v-dialog v-model="dialog" :max-width="600" @click:outside="close">
    <v-card>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>
          <slot name="title">
            <span>{{ title }}</span>
          </slot>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <slot name="default" />
      </v-card-text>

      <v-card-actions class="d-flex justify-center py-4">
        <slot name="action" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmationDialog",

  props: {
    title: {
      type: String,
      default: "Подтвердите действие"
    }
  },

  data() {
    return {
      dialog: true
    }
  },

  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>