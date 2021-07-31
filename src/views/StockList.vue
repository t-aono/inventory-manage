<template>
  <v-card
    class="mx-auto mt-10"
    max-width="1000"
  >
    <v-card-text>
      <v-list-item-title class="text-h5 mt-3 ml-5">
        <v-icon>mdi-package-variant-closed</v-icon>
        <span class="mx-2">在庫管理</span>
      </v-list-item-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="info accent-4">
          <router-link to="/stock-edit/0">
            <v-icon>mdi-plus-circle-outline</v-icon>商品追加
          </router-link>
        </v-btn>
      </v-card-actions>

      <v-row>
        <v-col cols="10" sm="6" md="4" class="ml-5">
          <v-text-field label="商品検索" v-model="search"></v-text-field>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="products"
        :items-per-page="15"
        :search="search"
        class="elevation-1 mx-5 mb-5"
      >
        <template v-slot:[`item.id`]="{ item }">
          <v-btn text color="info accent-4">
            <router-link :to="{name: 'stock-edit', params: { id: item.id }}">
              <v-icon>mdi-pencil-outline</v-icon>編集
            </router-link>
          </v-btn>
          <v-btn text color="info accent-4" @click="deleteorder(item.id)">
            <v-icon>mdi-trash-can-outline</v-icon>削除
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('stock/fetchData');
    this.products = this.$store.getters['stock/getProducts'];
  },
  data() {
    return {
      search: '',
      headers: [
        {
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '商品名', value: 'product' },
        { text: '個数', value: 'amount' },
        { text: '', value: 'id' },
      ],
      products: []
    }
  },
  methods: {
    deleteorder(id) {
      if (confirm('削除しますか？')) {
        this.$store.dispatch('stock/deleteProduct', { id });
      }
    }
  }
}
</script>