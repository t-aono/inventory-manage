<template>
  <v-card
    class="mx-auto mt-10"
    max-width="500"
  >
    <v-card-text>
      <v-list-item-title class="text-h5 mt-3 ml-3">
        商品編集 
      </v-list-item-title>

      <v-row>
        <v-col cols="10" md="8" class="mx-auto my-3">
          <v-text-field label="商品名" v-model="product"></v-text-field>
        </v-col>
      </v-row>

      <v-alert v-show="error" dense outlined type="error">
        {{ error }}
      </v-alert>

      <v-card-actions>
        <v-btn text color="info accent-4" @click="create" v-if="isNew">
          <v-icon>mdi-playlist-plus</v-icon>
          <span class="mx-2">登録</span>
        </v-btn>
        <v-btn text color="info accent-4" @click="update" v-else>
          <v-icon>mdi-refresh</v-icon>
          <span class="mx-2">更新</span>
        </v-btn>
        <v-btn text color="info accent-4" href="/stock">
          <v-icon>mdi-undo-variant</v-icon>
          <span class="mx-2">戻る</span>
        </v-btn>
      </v-card-actions>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  mounted() {
    if (this.$route.params.id > 0) {
      const data = this.$store.getters["stock/getDataById"](Number(this.$route.params.id));
      this.product = data.product;
    }
  },
  data() {
    return {
      product: '',
      isNew: (this.$route.params.id > 0) ? false : true,
      error: ''
    }
  },
  methods: {
    create() {
      // チェック
      if (!this.checkData()) return;
      // 登録
      this.$store.dispatch('stock/createProduct', {
        product: this.product,
      });
    },
    update() {
      // チェック
      if (!this.checkData()) return;
      // 更新
      this.$store.dispatch('stock/updateProduct', {
        id: this.$route.params.id,
        product: this.product,
      });
    },
    checkData() {
      if (!this.product) {
        this.error = '入力してください。';
        return false;
      }
      return true;
    }
  }
}
</script>